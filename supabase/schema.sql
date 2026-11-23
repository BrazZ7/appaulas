-- ═══════════════════════════════════════════════════════════════════════
-- Ensinaê — banco de dados (Supabase / Postgres)
-- Rode este arquivo inteiro uma vez em: Supabase → SQL Editor → New query → Run.
-- Pode ser rodado de novo sem perder dados (usa IF NOT EXISTS / OR REPLACE).
-- ═══════════════════════════════════════════════════════════════════════

-- Perfis: um por usuário do Supabase Auth.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  nome text,
  role text not null default 'assinante' check (role in ('superadmin', 'assinante')),
  -- ativo: acesso liberado · atrasado: pagamento em atraso (acesso mantido) · inativo: sem acesso
  status text not null default 'inativo' check (status in ('ativo', 'atrasado', 'inativo')),
  origem text not null default 'cakto' check (origem in ('cakto', 'manual', 'superadmin')),
  cakto_pedido text,
  cakto_produto text,
  cakto_assinatura text,
  ultimo_evento text,
  observacao text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

-- Registro de todos os eventos da Cakto (auditoria e deduplicação).
create table if not exists public.cakto_eventos (
  id bigint generated always as identity primary key,
  pedido_id text not null,
  evento text not null,
  email text,
  processado boolean not null default false,
  resultado text,
  payload jsonb not null,
  recebido_em timestamptz not null default now(),
  unique (pedido_id, evento)
);

-- Cria o perfil automaticamente quando um usuário é criado no Auth.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, nome)
  values (new.id, lower(new.email), coalesce(new.raw_user_meta_data ->> 'nome', new.raw_user_meta_data ->> 'name'))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Mantém atualizado_em.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.atualizado_em = now(); return new; end;
$$;
drop trigger if exists profiles_touch on public.profiles;
create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Superadmin? (security definer evita recursão nas políticas)
create or replace function public.is_superadmin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'superadmin');
$$;

-- ───────── Segurança por linha (RLS) ─────────
alter table public.profiles enable row level security;
alter table public.cakto_eventos enable row level security;

drop policy if exists "perfil: ler o próprio" on public.profiles;
create policy "perfil: ler o próprio" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "perfil: superadmin lê todos" on public.profiles;
create policy "perfil: superadmin lê todos" on public.profiles
  for select using (public.is_superadmin());

drop policy if exists "perfil: superadmin altera" on public.profiles;
create policy "perfil: superadmin altera" on public.profiles
  for update using (public.is_superadmin()) with check (public.is_superadmin());

drop policy if exists "eventos: superadmin lê" on public.cakto_eventos;
create policy "eventos: superadmin lê" on public.cakto_eventos
  for select using (public.is_superadmin());

-- Usuários comuns não alteram o próprio perfil (status/role vêm só da Cakto ou do superadmin).
-- Inserções e alterações do webhook usam a chave secreta no servidor, que ignora o RLS.

-- ───────── Sincronização dos dados do professor (diário, provas, planejamentos…) ─────────
-- Um registro por conta com todo o estado do app em JSON. `versao` evita que um aparelho
-- sobrescreva sem saber uma alteração feita em outro (controle otimista).
create table if not exists public.dados_professor (
  user_id uuid primary key references auth.users (id) on delete cascade,
  dados jsonb not null,
  versao bigint not null default 1,
  atualizado_em timestamptz not null default now()
);
alter table public.dados_professor enable row level security;

drop policy if exists "dados: dono lê" on public.dados_professor;
create policy "dados: dono lê" on public.dados_professor for select using (user_id = auth.uid());
drop policy if exists "dados: dono cria" on public.dados_professor;
create policy "dados: dono cria" on public.dados_professor for insert with check (user_id = auth.uid());
drop policy if exists "dados: dono altera" on public.dados_professor;
create policy "dados: dono altera" on public.dados_professor for update using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Arquivos enviados (imagens das provas, legendas, vídeos curtos): bucket privado, uma pasta por conta.
insert into storage.buckets (id, name, public, file_size_limit)
values ('arquivos', 'arquivos', false, 10485760)
on conflict (id) do nothing;

drop policy if exists "arquivos: dono lê" on storage.objects;
create policy "arquivos: dono lê" on storage.objects for select to authenticated
  using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "arquivos: dono envia" on storage.objects;
create policy "arquivos: dono envia" on storage.objects for insert to authenticated
  with check (bucket_id = 'arquivos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "arquivos: dono atualiza" on storage.objects;
create policy "arquivos: dono atualiza" on storage.objects for update to authenticated
  using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = auth.uid()::text);
drop policy if exists "arquivos: dono apaga" on storage.objects;
create policy "arquivos: dono apaga" on storage.objects for delete to authenticated
  using (bucket_id = 'arquivos' and (storage.foldername(name))[1] = auth.uid()::text);
