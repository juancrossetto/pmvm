-- ============================================================
-- PMVM - Schema de base de datos para Supabase
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. PERFILES DE USUARIOS
-- Extiende la tabla auth.users de Supabase con datos extra
create table if not exists public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  phone       text,
  goal        text,                      -- objetivo del cliente (ej: "bajar 5kg")
  created_at  timestamptz default now()
);

-- Trigger: crea el perfil automáticamente cuando se registra un usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- 2. RUTINAS
create table if not exists public.routines (
  id            uuid default gen_random_uuid() primary key,
  client_id     uuid references auth.users(id) on delete cascade not null,
  name          text not null,
  description   text,
  days_per_week int default 3,
  active        boolean default true,
  created_at    timestamptz default now()
);

-- 3. EJERCICIOS DENTRO DE UNA RUTINA
create table if not exists public.routine_exercises (
  id          uuid default gen_random_uuid() primary key,
  routine_id  uuid references public.routines(id) on delete cascade not null,
  name        text not null,
  sets        int,
  reps        text,           -- puede ser "8-10" o "al fallo"
  rest_secs   int,
  notes       text,
  order_index int default 0,
  created_at  timestamptz default now()
);


-- 4. PROGRESO / MÉTRICAS
create table if not exists public.progress (
  id               uuid default gen_random_uuid() primary key,
  client_id        uuid references auth.users(id) on delete cascade not null,
  weight_kg        numeric(5,2),
  body_fat_pct     numeric(4,1),
  muscle_mass_kg   numeric(5,2),
  notes            text,
  created_at       timestamptz default now()
);


-- 5. MENSAJES (chat trainer ↔ cliente)
create table if not exists public.messages (
  id           uuid default gen_random_uuid() primary key,
  client_id    uuid references auth.users(id) on delete cascade not null,
  content      text not null,
  sender_role  text check (sender_role in ('client', 'trainer')) not null,
  read         boolean default false,
  created_at   timestamptz default now()
);


-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- Cada cliente solo puede ver sus propios datos
-- ============================================================

alter table public.profiles         enable row level security;
alter table public.routines         enable row level security;
alter table public.routine_exercises enable row level security;
alter table public.progress         enable row level security;
alter table public.messages         enable row level security;

-- Profiles: el usuario solo ve/edita su propio perfil
create policy "profiles_select" on public.profiles
  for select using (auth.uid() = id);
create policy "profiles_update" on public.profiles
  for update using (auth.uid() = id);

-- Routines: el cliente solo ve sus rutinas
create policy "routines_select" on public.routines
  for select using (auth.uid() = client_id);

-- Routine exercises: el cliente ve los ejercicios de sus rutinas
create policy "routine_exercises_select" on public.routine_exercises
  for select using (
    exists (
      select 1 from public.routines r
      where r.id = routine_exercises.routine_id
        and r.client_id = auth.uid()
    )
  );

-- Progress: el cliente solo ve su propio progreso
create policy "progress_select" on public.progress
  for select using (auth.uid() = client_id);

-- Messages: el cliente ve y puede crear sus mensajes
create policy "messages_select" on public.messages
  for select using (auth.uid() = client_id);
create policy "messages_insert" on public.messages
  for insert with check (auth.uid() = client_id and sender_role = 'client');
create policy "messages_update_read" on public.messages
  for update using (auth.uid() = client_id);


-- ============================================================
-- REALTIME para mensajes (chat en tiempo real)
-- ============================================================
alter publication supabase_realtime add table public.messages;


-- ============================================================
-- DATOS DE PRUEBA (opcional - borrar en producción)
-- IMPORTANTE: Primero crear el usuario desde Supabase Auth,
-- luego reemplazar 'TU-USER-ID-AQUI' con el UUID real.
-- ============================================================

/*
-- Ejemplo de rutina de prueba:
insert into public.routines (client_id, name, description, days_per_week, active)
values (
  'TU-USER-ID-AQUI',
  'Fuerza + Hipertrofia',
  'Rutina de 4 días enfocada en ganar masa muscular.',
  4,
  true
);

-- Ejemplo de progreso:
insert into public.progress (client_id, weight_kg, body_fat_pct, muscle_mass_kg, notes)
values (
  'TU-USER-ID-AQUI',
  80.5,
  18.2,
  42.0,
  'Primera medición'
);
*/
