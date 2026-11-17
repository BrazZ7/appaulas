/** Cliente Supabase com a chave secreta — usado SOMENTE nas funções do servidor (/api). */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { Admin } from './cakto';

export function env(nome: string): string {
  return (process.env[nome] ?? '').trim();
}

export function supabaseAdmin(): SupabaseClient {
  const url = env('SUPABASE_URL') || env('VITE_SUPABASE_URL');
  const chave = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !chave) throw new Error('SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY precisam estar configurados na Vercel');
  return createClient(url, chave, { auth: { persistSession: false, autoRefreshToken: false } });
}

/** Endereço público do site (para o link do e-mail de convite). */
export function siteUrl(): string {
  const u = env('SITE_URL') || (env('VERCEL_PROJECT_PRODUCTION_URL') ? `https://${env('VERCEL_PROJECT_PRODUCTION_URL')}` : '');
  return u.replace(/\/$/, '');
}

export function adminSupabase(sb: SupabaseClient): Admin {
  return {
    async registrarEvento(pedidoId, evento, email, payload) {
      const { error } = await sb.from('cakto_eventos').insert({ pedido_id: pedidoId, evento, email, payload });
      if (!error) return true;
      if (error.code === '23505') {
        // reentrega: só ignora se já foi processado com sucesso; se falhou no meio, processa de novo
        const { data } = await sb.from('cakto_eventos').select('processado').eq('pedido_id', pedidoId).eq('evento', evento).maybeSingle();
        return !data?.processado;
      }
      throw new Error(`registrar evento: ${error.message}`);
    },
    async finalizarEvento(pedidoId, evento, resultado) {
      await sb.from('cakto_eventos').update({ processado: true, resultado }).eq('pedido_id', pedidoId).eq('evento', evento);
    },
    async buscarPerfil(email) {
      const { data, error } = await sb.from('profiles').select('id, role, status').eq('email', email).maybeSingle();
      if (error) throw new Error(`buscar perfil: ${error.message}`);
      return data as { id: string; role: 'superadmin' | 'assinante'; status: string } | null;
    },
    async convidar(email, nome) {
      const { data, error } = await sb.auth.admin.inviteUserByEmail(email, {
        data: { nome: nome ?? undefined },
        redirectTo: `${siteUrl()}/?acesso=convite`,
      });
      if (error || !data.user) throw new Error(`convidar: ${error?.message ?? 'sem usuário'}`);
      return data.user.id;
    },
    async atualizarPerfil(id, dados) {
      const { error } = await sb.from('profiles').update(dados).eq('id', id);
      if (error) throw new Error(`atualizar perfil: ${error.message}`);
    },
  };
}
