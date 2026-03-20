-- ============================================================
-- PMVM - Agregar rol admin
-- Ejecutar DESPUÉS de schema.sql
-- ============================================================

-- 1. Agregar columna role a profiles
alter table public.profiles
  add column if not exists role text
  check (role in ('client', 'admin'))
  default 'client';

-- 2. Políticas para que el admin pueda ver TODOS los datos
-- (los clientes solo ven los suyos gracias a las políticas anteriores)

-- Admin puede ver todos los perfiles
create policy "admin_profiles_select" on public.profiles
  for select using (
    auth.uid() = id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede ver todas las rutinas
create policy "admin_routines_select" on public.routines
  for select using (
    auth.uid() = client_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede crear/editar rutinas
create policy "admin_routines_insert" on public.routines
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_routines_update" on public.routines
  for update using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede ver todos los ejercicios
create policy "admin_routine_exercises_select" on public.routine_exercises
  for select using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_routine_exercises_insert" on public.routine_exercises
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_routine_exercises_update" on public.routine_exercises
  for update using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_routine_exercises_delete" on public.routine_exercises
  for delete using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede ver todo el progreso
create policy "admin_progress_select" on public.progress
  for select using (
    auth.uid() = client_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_progress_insert" on public.progress
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Admin puede ver y enviar mensajes a cualquier cliente
create policy "admin_messages_select" on public.messages
  for select using (
    auth.uid() = client_id
    or exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "admin_messages_insert" on public.messages
  for insert with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- ============================================================
-- IMPORTANTE: Después de correr esto, asignar rol admin a vos
-- Reemplazá 'TU-USER-ID' con tu UUID de Supabase Auth
-- Lo encontrás en: Authentication → Users → tu email → User UID
-- ============================================================

-- update public.profiles set role = 'admin' where id = 'TU-USER-ID';
