/**
 * Armazenamento de arquivos (vídeos, legendas, imagens) no IndexedDB deste navegador.
 * Com login ativo, a sincronização registra um adaptador de nuvem: os arquivos também vão para o
 * Supabase Storage e são baixados quando faltam neste aparelho.
 */

export interface NuvemArquivos {
  enviar(id: string, blob: Blob): Promise<void>;
  baixar(id: string): Promise<Blob | undefined>;
  apagar(id: string): Promise<void>;
}
let nuvem: NuvemArquivos | null = null;
export function setNuvemArquivos(n: NuvemArquivos | null) { nuvem = n; }
/** Arquivos maiores que isto ficam só neste aparelho (limite do plano gratuito do armazenamento). */
export const LIMITE_NUVEM = 10 * 1024 * 1024;

const DB = 'aulaviva-files';
const STORE = 'files';

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function putFile(id: string, blob: Blob): Promise<void> {
  await putLocal(id, blob);
  if (nuvem && blob.size <= LIMITE_NUVEM) nuvem.enviar(id, blob).catch(() => { /* fica local; tenta de novo na próxima sincronização */ });
}

async function putLocal(id: string, blob: Blob): Promise<void> {
  const db = await open();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put(blob, id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getFile(id: string): Promise<Blob | undefined> {
  const local = await getLocal(id);
  if (local || !nuvem) return local;
  const remoto = await nuvem.baixar(id).catch(() => undefined);
  if (remoto) await putLocal(id, remoto).catch(() => {});
  return remoto;
}

async function getLocal(id: string): Promise<Blob | undefined> {
  const db = await open();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE).objectStore(STORE).get(id);
    req.onsuccess = () => resolve(req.result as Blob | undefined);
    req.onerror = () => reject(req.error);
  });
}

export async function deleteFile(id: string): Promise<void> {
  if (nuvem) nuvem.apagar(id).catch(() => {});
  const db = await open();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export function download(filename: string, content: string | Blob, mime = 'text/plain;charset=utf-8') {
  const blob = typeof content === 'string' ? new Blob([content], { type: mime }) : content;
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Gera WebVTT a partir das cenas (início acumulado pela duração de cada cena). */
export function scenesToVtt(scenes: { captions: string; durationSec: number }[]): string {
  const ts = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}.000`;
  };
  let t = 0;
  const cues = scenes.map((sc, i) => {
    const start = t;
    t += Math.max(1, sc.durationSec);
    return `${i + 1}\n${ts(start)} --> ${ts(t)}\n${sc.captions.trim() || '…'}`;
  });
  return `WEBVTT\n\n${cues.join('\n\n')}\n`;
}
