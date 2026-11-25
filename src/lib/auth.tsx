import { createContext, useContext } from 'react';
import { createClient, type Session, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Login com Supabase. Só fica ativo quando VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY
 * estão configuradas (na Vercel). Sem elas, o app continua no modo demonstrativo.
 * A chave “anon/publishable” é pública por natureza; a proteção dos dados é feita pelo RLS no banco.
 */
const url = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const chave = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

export const authEnabled = Boolean(url && chave);
export const supabase: SupabaseClient | null = authEnabled
  ? createClient(url!, chave!, { auth: { flowType: 'implicit', detectSessionInUrl: true, persistSession: true, autoRefreshToken: true } })
  : null;

export const CHECKOUT_URL = ((import.meta.env.VITE_CHECKOUT_URL as string | undefined) ?? '').trim();

export interface Perfil {
  id: string;
  email: string;
  nome: string | null;
  role: 'superadmin' | 'assinante';
  status: 'ativo' | 'atrasado' | 'inativo';
  origem: string;
}

export interface AuthInfo {
  ativo: boolean;
  session: Session | null;
  perfil: Perfil | null;
  /** áreas liberadas para a conta (já expandidas: "tudo" vira todas) */
  areas: string[];
  sair: () => Promise<void>;
  /** relê os acessos (depois de uma compra, por exemplo) */
  recarregarAreas: () => Promise<void>;
}

export const AuthContext = createContext<AuthInfo>({ ativo: false, session: null, perfil: null, areas: [], sair: async () => {}, recarregarAreas: async () => {} });
export const useAuth = () => useContext(AuthContext);

/**
 * Áreas liberadas a partir dos acessos da conta.
 * Superadmin e plano "tudo" liberam todas. Conta ativa sem nenhum acesso registrado
 * é assinante antigo do Ensinaê: libera só a Sala de Aula (mesma regra de public.tem_area no banco).
 */
export function calcularAreas(perfil: Perfil | null, acessos: { areas: string[]; status: string }[], todas: string[]): string[] {
  if (!perfil) return [];
  if (perfil.role === 'superadmin') return todas;
  const ativos = acessos.filter((a) => a.status === 'ativo' || a.status === 'atrasado');
  if (!acessos.length) return temAcesso(perfil) ? ['sala'] : [];
  const lista = new Set(ativos.flatMap((a) => a.areas));
  if (lista.has('tudo')) return todas;
  return todas.filter((a) => lista.has(a));
}

/** Só em desenvolvimento: ?areas=foco,tea na URL simula uma conta com essas áreas no modo demonstrativo. */
function areasSimuladas(): string[] | null {
  if (!import.meta.env.DEV || typeof window === 'undefined') return null;
  const m = window.location.href.match(/[?&]areas=([a-z,]*)/);
  return m ? m[1].split(',').filter(Boolean) : null;
}

export function useAreas() {
  const auth = useContext(AuthContext);
  const sim = !auth.ativo ? areasSimuladas() : null;
  if (sim) return { tem: (area: string) => sim.includes(area), areas: sim, familiaApenas: !sim.includes('sala') };
  return {
    /** sem login configurado (modo demonstrativo) tudo fica aberto para navegar */
    tem: (area: string) => !auth.ativo || auth.areas.includes(area),
    areas: auth.areas,
    familiaApenas: auth.ativo && !auth.areas.includes('sala'),
  };
}

export const temAcesso = (p: Perfil | null) => !!p && (p.role === 'superadmin' || p.status === 'ativo' || p.status === 'atrasado');
