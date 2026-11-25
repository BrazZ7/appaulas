-- ═══════════════════════════════════════════════════════════════════════
-- Ensinaê — áreas liberadas por produto (Área Família + Sala de Aula)
-- Rode depois de schema.sql. Pode ser rodado de novo sem perder dados.
-- ═══════════════════════════════════════════════════════════════════════

-- Um registro por conta e produto comprado na Cakto: quais áreas ele libera e se está ativo.
-- Áreas: foco, emocoes, colorir, reforco, dezmin, coragem, tea, pranchas, historias, conversas,
-- avd, aee, sala (plataforma do professor) e tudo (plano Tudo Liberado).
create table if not exists public.acessos (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  produto text not null,
  areas text[] not null default '{}',
  status text not null default 'ativo' check (status in ('ativo', 'atrasado', 'inativo')),
  cakto_pedido text,
  cakto_assinatura text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  unique (user_id, produto)
);

drop trigger if exists acessos_touch on public.acessos;
create trigger acessos_touch before update on public.acessos
  for each row execute function public.touch_updated_at();

alter table public.acessos enable row level security;

drop policy if exists "acessos: ler os próprios" on public.acessos;
create policy "acessos: ler os próprios" on public.acessos for select using (user_id = auth.uid());
drop policy if exists "acessos: superadmin lê" on public.acessos;
create policy "acessos: superadmin lê" on public.acessos for select using (public.is_superadmin());
drop policy if exists "acessos: superadmin gerencia" on public.acessos;
create policy "acessos: superadmin gerencia" on public.acessos for all using (public.is_superadmin()) with check (public.is_superadmin());

-- A conta pode abrir esta área? Superadmin abre tudo. Conta ativa sem nenhum registro em acessos
-- é assinante antigo do Ensinaê: abre só a Sala de Aula.
create or replace function public.tem_area(area text)
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_superadmin()
    or exists (
      select 1 from public.acessos x
      where x.user_id = auth.uid() and x.status in ('ativo', 'atrasado')
        and (area = any (x.areas) or 'tudo' = any (x.areas))
    )
    or (area = 'sala' and exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.status in ('ativo', 'atrasado')
        and not exists (select 1 from public.acessos y where y.user_id = p.id)
    ));
$$;

-- PDFs das áreas: bucket privado, uma pasta por área (ex.: foco/kit-foco-105-atividades.pdf).
insert into storage.buckets (id, name, public, file_size_limit)
values ('conteudo', 'conteudo', false, 52428800)
on conflict (id) do nothing;

drop policy if exists "conteudo: quem tem a área lê" on storage.objects;
create policy "conteudo: quem tem a área lê" on storage.objects for select to authenticated
  using (bucket_id = 'conteudo' and public.tem_area((storage.foldername(name))[1]));
drop policy if exists "conteudo: superadmin envia" on storage.objects;
create policy "conteudo: superadmin envia" on storage.objects for insert to authenticated
  with check (bucket_id = 'conteudo' and public.is_superadmin());
drop policy if exists "conteudo: superadmin atualiza" on storage.objects;
create policy "conteudo: superadmin atualiza" on storage.objects for update to authenticated
  using (bucket_id = 'conteudo' and public.is_superadmin());
drop policy if exists "conteudo: superadmin apaga" on storage.objects;
create policy "conteudo: superadmin apaga" on storage.objects for delete to authenticated
  using (bucket_id = 'conteudo' and public.is_superadmin());
