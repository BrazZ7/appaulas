/**
 * Sincronização com o Supabase: os dados do professor (turmas, diário, provas, planejamentos…)
 * ficam na tabela `dados_professor` e os arquivos no bucket `arquivos`.
 *
 * - Cada alteração marca os dados como “pendentes” e é enviada ~2,5 s depois.
 * - Ao entrar (ou voltar para a aba), o app confere a versão na nuvem e baixa se outro aparelho salvou depois.
 * - `versao` faz controle otimista: um aparelho só grava se a nuvem ainda está na versão que ele conhece.
 * - Quando dados da nuvem substituem alterações locais não enviadas, uma cópia local é guardada antes.
 */
import { useSyncExternalStore } from 'react';
import { supabase } from './auth';
import { setNuvemArquivos } from './files';
import { normalizar, store, type AppState } from '../store/store';

export interface SyncMeta {
  /** Versão da nuvem que este aparelho conhece (null = nunca sincronizou). */
  versao: number | null;
  /** Há alterações locais ainda não enviadas. */
  sujo: boolean;
  /** Quando os dados locais foram alterados pela última vez. */
  modificadoEm?: string;
  ultimaSync?: string;
}

export interface Remoto { versao: number; atualizadoEm: string }

export type Decisao = 'criar' | 'enviar' | 'baixar' | 'nada';

/**
 * Decide o que fazer comparando o que este aparelho sabe com o que está na nuvem.
 * Conflito (os dois mudaram): vence a alteração mais recente.
 */
export function decidir(meta: SyncMeta, remoto: Remoto | null): Decisao {
  if (!remoto) return 'criar';
  if (meta.versao === remoto.versao) return meta.sujo ? 'enviar' : 'nada';
  // A nuvem tem uma versão que este aparelho não conhece.
  if (!meta.sujo) return 'baixar';
  if (meta.versao === null) return 'baixar'; // primeiro acesso em um aparelho que já tinha dados: a nuvem prevalece (com cópia local guardada)
  return (meta.modificadoEm ?? '') > remoto.atualizadoEm ? 'enviar' : 'baixar';
}

/** Remove campos que só fazem sentido neste aparelho. */
export function paraNuvem(s: AppState): AppState {
  return { ...s, recent: [] };
}

// ───────────── Estado observável (para o indicador na tela) ─────────────

export type SyncStatus = 'desligado' | 'sincronizando' | 'salvo' | 'pendente' | 'offline' | 'erro';
let status: SyncStatus = 'desligado';
let detalhe = '';
const ouvintes = new Set<() => void>();
const setStatus = (s: SyncStatus, d = '') => { status = s; detalhe = d; snap = { status, detalhe, ultimaSync: meta?.ultimaSync }; ouvintes.forEach((f) => f()); };
let snap: { status: SyncStatus; detalhe: string; ultimaSync?: string } = { status, detalhe };
export function useSync() {
  return useSyncExternalStore((f) => { ouvintes.add(f); return () => ouvintes.delete(f); }, () => snap, () => snap);
}

// ───────────── Controle ─────────────

let uid: string | null = null;
let meta: SyncMeta = { versao: null, sujo: false };
let timer: ReturnType<typeof setTimeout> | undefined;
let aplicandoRemoto = false;
let rodando: Promise<void> | null = null;
let desinscrever: (() => void) | null = null;

const metaKey = () => `aulaviva:sync:${uid}`;
const salvarMeta = () => { try { localStorage.setItem(metaKey(), JSON.stringify(meta)); } catch { /* sem armazenamento */ } };
function lerMeta(): SyncMeta {
  try { const raw = localStorage.getItem(metaKey()); if (raw) return JSON.parse(raw) as SyncMeta; } catch { /* ignora */ }
  return { versao: null, sujo: false };
}

export function copiasLocais(): { chave: string; quando: string }[] {
  if (!uid) return [];
  const pre = `aulaviva:copia:${uid}:`;
  const out: { chave: string; quando: string }[] = [];
  try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k?.startsWith(pre)) out.push({ chave: k, quando: k.slice(pre.length) }); } } catch { /* ignora */ }
  return out.sort((a, b) => b.quando.localeCompare(a.quando));
}

function guardarCopia() {
  if (!uid) return;
  try {
    const antigas = copiasLocais();
    for (const c of antigas.slice(2)) localStorage.removeItem(c.chave); // mantém as 3 mais recentes
    localStorage.setItem(`aulaviva:copia:${uid}:${new Date().toISOString()}`, store.exportJson());
  } catch { /* sem espaço: segue */ }
}

export function restaurarCopia(chave: string) {
  const raw = localStorage.getItem(chave);
  if (!raw) throw new Error('Cópia não encontrada.');
  store.importJson(raw); // marca como alteração local e será enviada
}

function agendar(ms = 2500) {
  clearTimeout(timer);
  timer = setTimeout(() => { void sincronizar(); }, ms);
}

async function lerRemoto(): Promise<Remoto | null> {
  const { data, error } = await supabase!.from('dados_professor').select('versao, atualizado_em').eq('user_id', uid!).maybeSingle();
  if (error) throw error;
  return data ? { versao: Number(data.versao), atualizadoEm: data.atualizado_em as string } : null;
}

async function executar(tentativa = 0): Promise<void> {
  if (!supabase || !uid) return;
  if (typeof navigator !== 'undefined' && navigator.onLine === false) { setStatus('offline'); return; }
  setStatus('sincronizando');
  const remoto = await lerRemoto();
  const d = decidir(meta, remoto);
  const agora = new Date().toISOString();
  if (d === 'nada') { meta.ultimaSync = agora; salvarMeta(); setStatus('salvo'); return; }
  if (d === 'baixar') {
    const { data, error } = await supabase.from('dados_professor').select('dados, versao, atualizado_em').eq('user_id', uid).single();
    if (error) throw error;
    if (meta.sujo || meta.versao === null) guardarCopia(); // nunca troca dados locais sem guardar uma cópia
    aplicandoRemoto = true;
    try { store.replace(normalizar(data.dados as AppState)); } finally { aplicandoRemoto = false; }
    meta = { versao: Number(data.versao), sujo: false, ultimaSync: agora };
    salvarMeta();
    setStatus('salvo');
    return;
  }
  const dados = paraNuvem(store.get());
  if (d === 'criar') {
    const { error } = await supabase.from('dados_professor').insert({ user_id: uid, dados, versao: 1, atualizado_em: agora });
    if (error) { if (tentativa < 1 && error.code === '23505') return executar(tentativa + 1); throw error; }
    meta = { versao: 1, sujo: false, ultimaSync: agora };
  } else {
    const base = remoto!.versao;
    const { data, error } = await supabase.from('dados_professor').update({ dados, versao: base + 1, atualizado_em: agora }).eq('user_id', uid).eq('versao', base).select('versao');
    if (error) throw error;
    if (!data?.length) { if (tentativa < 2) return executar(tentativa + 1); throw new Error('Outro aparelho está salvando ao mesmo tempo.'); }
    meta = { versao: base + 1, sujo: false, ultimaSync: agora };
  }
  salvarMeta();
  setStatus('salvo');
}

/** Sincroniza agora (evita duas execuções simultâneas). */
export function sincronizar(): Promise<void> {
  if (rodando) { agendar(1500); return rodando; }
  rodando = executar()
    .catch((e: unknown) => { setStatus(meta.sujo ? 'pendente' : 'erro', (e as Error)?.message ?? 'Falha ao sincronizar'); agendar(30000); })
    .finally(() => { rodando = null; });
  return rodando;
}

const aoFocar = () => { if (document.visibilityState === 'visible') void sincronizar(); };
const aoVoltarOnline = () => void sincronizar();

/** Liga a sincronização para a conta (chamado depois de store.setScope). */
export async function iniciarSync(userId: string) {
  if (!supabase) return;
  if (uid === userId && desinscrever) return;
  pararSync();
  uid = userId;
  meta = lerMeta();
  setNuvemArquivos({
    enviar: async (id, blob) => { const { error } = await supabase!.storage.from('arquivos').upload(`${uid}/${id}`, blob, { upsert: true, contentType: blob.type || undefined }); if (error) throw error; },
    baixar: async (id) => { const { data, error } = await supabase!.storage.from('arquivos').download(`${uid}/${id}`); if (error) return undefined; return data ?? undefined; },
    apagar: async (id) => { await supabase!.storage.from('arquivos').remove([`${uid}/${id}`]); },
  });
  desinscrever = store.subscribe(() => {
    if (aplicandoRemoto) return;
    meta.sujo = true;
    meta.modificadoEm = new Date().toISOString();
    salvarMeta();
    setStatus('pendente');
    agendar();
  });
  document.addEventListener('visibilitychange', aoFocar);
  window.addEventListener('online', aoVoltarOnline);
  await sincronizar();
}

export function pararSync() {
  desinscrever?.();
  desinscrever = null;
  clearTimeout(timer);
  document.removeEventListener('visibilitychange', aoFocar);
  window.removeEventListener('online', aoVoltarOnline);
  setNuvemArquivos(null);
  uid = null;
  setStatus('desligado');
}

/** Envia pendências antes de sair da conta. */
export async function enviarPendencias() {
  if (meta.sujo) { clearTimeout(timer); await sincronizar(); }
}
