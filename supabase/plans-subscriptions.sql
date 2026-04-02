-- ============================================================
-- PMVM - Planes y Suscripciones
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. PLANES (definición de productos)
create table if not exists public.plans (
  id           text primary key,          -- 'monthly' | 'quarterly' | 'semiannual'
  name         text not null,             -- 'Plan Mensual'
  description  text,
  price_ars    numeric(10,2) not null,    -- precio en pesos argentinos
  duration_days int not null,             -- 30 | 90 | 180
  active       boolean default true,
  created_at   timestamptz default now()
);

-- Insertar los 3 planes
insert into public.plans (id, name, description, price_ars, duration_days) values
  ('monthly',    'Plan Mensual',   'Acceso completo por 30 días. Rutinas personalizadas + seguimiento.',    10000, 30),
  ('quarterly',  'Plan Trimestral','Acceso completo por 90 días. Ahorrás $10.000 vs. mes a mes.',           20000, 90),
  ('semiannual', 'Plan Semestral', 'Acceso completo por 180 días. El mejor valor para tu transformación.', 30000, 180)
on conflict (id) do update set
  price_ars = excluded.price_ars,
  duration_days = excluded.duration_days,
  name = excluded.name;


-- 2. SUSCRIPCIONES (compras de usuarios)
create table if not exists public.subscriptions (
  id               uuid default gen_random_uuid() primary key,
  user_id          uuid references auth.users(id) on delete cascade not null,
  plan_id          text references public.plans(id) not null,
  status           text check (status in ('pending', 'active', 'expired', 'cancelled')) default 'pending',
  -- Mercado Pago
  mp_payment_id    text,                  -- ID del pago en MP
  mp_preference_id text,                  -- ID de la preferencia MP
  mp_status        text,                  -- approved | pending | rejected
  -- Fechas
  started_at       timestamptz,           -- cuando se activó (pago aprobado)
  expires_at       timestamptz,           -- started_at + duration_days
  created_at       timestamptz default now()
);


-- 3. RLS para suscripciones
alter table public.plans          enable row level security;
alter table public.subscriptions  enable row level security;

-- Plans: cualquiera puede leer (son públicos)
create policy "plans_public_read" on public.plans
  for select using (true);

-- Subscriptions: el usuario solo ve las suyas
create policy "subscriptions_select" on public.subscriptions
  for select using (auth.uid() = user_id);

-- El service_role (server-side) puede insertar/actualizar (para el webhook de MP)
create policy "subscriptions_service_insert" on public.subscriptions
  for insert with check (true);
create policy "subscriptions_service_update" on public.subscriptions
  for update using (true);


-- 4. Función para verificar si un usuario tiene suscripción activa
create or replace function public.get_active_subscription(p_user_id uuid)
returns table (
  id               uuid,
  plan_id          text,
  plan_name        text,
  status           text,
  started_at       timestamptz,
  expires_at       timestamptz,
  days_remaining   int,
  total_days       int
) as $$
begin
  return query
  select
    s.id,
    s.plan_id,
    p.name as plan_name,
    s.status,
    s.started_at,
    s.expires_at,
    greatest(0, extract(day from (s.expires_at - now()))::int) as days_remaining,
    p.duration_days as total_days
  from public.subscriptions s
  join public.plans p on p.id = s.plan_id
  where s.user_id = p_user_id
    and s.status = 'active'
    and s.expires_at > now()
  order by s.expires_at desc
  limit 1;
end;
$$ language plpgsql security definer;

-- 5. Trigger: marcar suscripciones vencidas automáticamente
create or replace function public.expire_subscriptions()
returns void as $$
begin
  update public.subscriptions
  set status = 'expired'
  where status = 'active' and expires_at < now();
end;
$$ language plpgsql security definer;
