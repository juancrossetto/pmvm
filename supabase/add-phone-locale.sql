-- ============================================================
-- PMVM - Migración: teléfono en perfiles + locale en suscripciones
-- Ejecutar en: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- 1. Asegurarse de que profiles tiene la columna phone
--    (ya está en schema.sql, pero por si acaso)
alter table public.profiles
  add column if not exists phone text;

-- 2. Actualizar el trigger handle_new_user para guardar el teléfono
--    desde los metadatos del usuario al registrarse
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'phone'
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        phone     = excluded.phone;
  return new;
end;
$$ language plpgsql security definer;

-- 3. Agregar columna locale a subscriptions
--    (para guardar el idioma del usuario al momento de la compra)
alter table public.subscriptions
  add column if not exists locale text default 'es';

-- ============================================================
-- LISTO. Verificar con:
--   select column_name from information_schema.columns
--   where table_name = 'subscriptions' and column_name = 'locale';
-- ============================================================
