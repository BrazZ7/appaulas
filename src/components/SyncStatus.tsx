/** Indicador e painel da sincronização com a nuvem. */
import { useState } from 'react';
import { Cloud, CloudOff, CloudUpload, History, RefreshCw, TriangleAlert } from 'lucide-react';
import { authEnabled } from '../lib/auth';
import { copiasLocais, restaurarCopia, sincronizar, useSync, type SyncStatus } from '../lib/sync';
import { toast } from './ui';

const INFO: Record<SyncStatus, { texto: string; cor: string }> = {
  desligado: { texto: 'Sincronização desligada', cor: 'var(--muted)' },
  sincronizando: { texto: 'Sincronizando…', cor: 'var(--cyan, #22d3ee)' },
  salvo: { texto: 'Tudo salvo na nuvem', cor: 'var(--green, #4ade80)' },
  pendente: { texto: 'Alterações aguardando envio', cor: 'var(--amber, #fbbf24)' },
  offline: { texto: 'Sem internet — salvo neste aparelho', cor: 'var(--amber, #fbbf24)' },
  erro: { texto: 'Não foi possível sincronizar', cor: 'var(--red, #fb7185)' },
};

function Icone({ s }: { s: SyncStatus }) {
  if (s === 'sincronizando') return <RefreshCw className="spin" />;
  if (s === 'pendente') return <CloudUpload />;
  if (s === 'offline' || s === 'desligado') return <CloudOff />;
  if (s === 'erro') return <TriangleAlert />;
  return <Cloud />;
}

export function SyncBadge() {
  const { status, detalhe } = useSync();
  if (!authEnabled || status === 'desligado') return null;
  const i = INFO[status];
  return (
    <button className="btn icon ghost hide-mobile" onClick={() => void sincronizar()} title={`${i.texto}${detalhe ? ` (${detalhe})` : ''} — clique para sincronizar agora`} aria-label={i.texto} style={{ color: i.cor }}>
      <Icone s={status} />
    </button>
  );
}

export function SyncPainel() {
  const { status, detalhe, ultimaSync } = useSync();
  const [copias, setCopias] = useState(() => copiasLocais());
  if (!authEnabled) return null;
  const i = INFO[status];
  return (
    <div className="stack-sm">
      <div className="row nowrap" style={{ color: i.cor }}><Icone s={status} /> <strong>{i.texto}</strong></div>
      <p className="small" style={{ margin: 0 }}>Com sua conta, turmas, diário (chamada e notas), provas, planejamentos, desafios e imagens enviadas ficam guardados na nuvem e aparecem em qualquer computador ou celular em que você entrar. As alterações são enviadas automaticamente alguns segundos depois.</p>
      {ultimaSync && <span className="xs muted">Última sincronização: {new Date(ultimaSync).toLocaleString('pt-BR')}</span>}
      {detalhe && status !== 'salvo' && <span className="xs" style={{ color: 'var(--red, #fb7185)' }}>{detalhe}</span>}
      <div className="row">
        <button className="btn" onClick={() => { void sincronizar().then(() => setCopias(copiasLocais())); }}><RefreshCw /> Sincronizar agora</button>
      </div>
      {copias.length > 0 && (
        <details>
          <summary className="small"><History size={14} /> Cópias guardadas antes de receber dados da nuvem ({copias.length})</summary>
          <p className="xs muted">Quando outro aparelho salvou depois e este tinha alterações não enviadas, guardamos uma cópia aqui antes de atualizar.</p>
          <ul className="clean stack-sm">
            {copias.map((c) => (
              <li key={c.chave} className="row between nowrap small">
                <span>{new Date(c.quando).toLocaleString('pt-BR')}</span>
                <button className="btn sm" onClick={() => { if (confirm('Restaurar esta cópia? Ela substituirá os dados atuais e será enviada à nuvem.')) { try { restaurarCopia(c.chave); toast('Cópia restaurada'); } catch (e) { alert((e as Error).message); } } }}>Restaurar</button>
              </li>
            ))}
          </ul>
        </details>
      )}
      <p className="xs faint" style={{ margin: 0 }}>Arquivos acima de 10 MB (como vídeos longos do Estúdio) ficam apenas neste aparelho.</p>
    </div>
  );
}
