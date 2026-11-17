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
  sair: () => Promise<void>;
}

export const AuthContext = createContext<AuthInfo>({ ativo: false, session: null, perfil: null, sair: async () => {} });
export const useAuth = () => useContext(AuthContext);

export const temAcesso = (p: Perfil | null) => !!p && (p.role === 'superadmin' || p.status === 'ativo' || p.status === 'atrasado');
