import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Ban, CheckCircle2, Mail, RefreshCw, Search, Shield, UserPlus } from 'lucide-react';
import { Notice, PageHead, toast } from '../components/ui';
import { authEnabled, supabase, useAuth, type Perfil } from '../lib/auth';

interface Linha extends Perfil { cakto_pedido: string | null; ultimo_evento: string | null; criado_em: string; atualizado_em: string }
interface Evento { id: number; evento: string; email: string | null; resultado: string | null; recebido_em: string }

const STATUS_LABEL = { ativo: 'Ativo', atrasado: 'Atrasado', inativo: 'Inativo' } as const;

export default function Admin() {
  const { perfil, session } = useAuth();
  const [linhas, setLinhas] = useState<Linha[]>([]);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'' | Perfil['status']>('');
  const [novoEmail, setNovoEmail] = useState('');
  const [novoNome, setNovoNome] = useState('');
  const [ocupado, setOcupado] = useState(false);

  const carregar = useCallback(async () => {
    if (!supabase) return;
    const [{ data: p }, { data: e }] = await Promise.all([
      supabase.from('profiles').select('id, email, nome, role, status, origem, cakto_pedido, ultimo_evento, criado_em, atualizado_em').order('criado_em', { ascending: false }),
      supabase.from('cakto_eventos').select('id, evento, email, resultado, recebido_em').order('recebido_em', { ascending: false }).limit(30),
    ]);
    setLinhas((p as Linha[]) ?? []);
    setEventos((e as Evento[]) ?? []);
  }, []);
  useEffect(() => { carregar(); }, [carregar]);

  const lista = useMemo(() => linhas.filter((l) => (!filtro || l.status === filtro) && (!busca || `${l.email} ${l.nome ?? ''}`.toLowerCase().includes(busca.toLowerCase()))), [linhas, busca, filtro]);
  const contagem = useMemo(() => ({
    ativo: linhas.filter((l) => l.status === 'ativo' && l.role !== 'superadmin').length,
    atrasado: linhas.filter((l) => l.status === 'atrasado').length,
    inativo: linhas.filter((l) => l.status === 'inativo').length,
  }), [linhas]);

  if (!authEnabled) return <div className="empty">O login ainda não foi configurado. Veja <code>docs/LOGIN_E_CAKTO.md</code>.</div>;
  if (perfil?.role !== 'superadmin') return <div className="empty">Área restrita ao superadmin. <Link to="/">Voltar</Link></div>;

  const api = async (corpo: Record<string, string>) => {
    setOcupado(true);
    try {
      const r = await fetch('/api/admin', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token}` }, body: JSON.stringify(corpo) });
      const j = await r.json().catch(() => ({ mensagem: 'Resposta inválida do servidor' }));
      toast(j.mensagem ?? (r.ok ? 'Feito' : 'Erro'));
      if (r.ok) await carregar();
      return r.ok;
    } finally { setOcupado(false); }
  };
  const mudarStatus = async (l: Linha, status: Perfil['status']) => {
    const { error } = await supabase!.from('profiles').update({ status, observacao: `alterado manualmente por ${perfil.email}` }).eq('id', l.id);
    if (error) toast(error.message); else { toast(status === 'ativo' ? 'Acesso liberado' : 'Acesso bloqueado'); carregar(); }
  };

  return (
    <div className="stack">
      <PageHead kicker="Superadmin" title="Assinantes e acessos" sub="Contas criadas pela Cakto ou manualmente. O status muda sozinho com os eventos de compra, renovação, cancelamento, reembolso e chargeback." actions={<button className="btn sm" onClick={carregar}><RefreshCw /> Atualizar</button>} />
      <div className="grid g4">
        {[['Ativos', contagem.ativo, 'var(--green)'], ['Em atraso', contagem.atrasado, 'var(--amber)'], ['Inativos', contagem.inativo, 'var(--red)'], ['Total de contas', linhas.length, 'var(--cyan)']].map(([l, n, c]) => (
          <div key={String(l)} className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800, color: String(c) }}>{n as number}</div><span className="small muted">{l as string}</span></div>
        ))}
      </div>

      <section className="panel stack-sm">
        <div className="panel-title"><UserPlus /><h2 style={{ fontSize: '1.15rem', margin: 0 }}>Criar acesso manual</h2></div>
        <p className="xs muted" style={{ margin: 0 }}>Para cortesias, parcerias ou testes. A pessoa recebe um e-mail para criar a senha.</p>
        <form className="row" onSubmit={async (e) => { e.preventDefault(); if (await api({ acao: 'convidar', email: novoEmail, nome: novoNome })) { setNovoEmail(''); setNovoNome(''); } }}>
          <input className="input" style={{ flex: '2 1 220px' }} type="email" required placeholder="email@exemplo.com" value={novoEmail} onChange={(e) => setNovoEmail(e.target.value)} aria-label="E-mail" />
          <input className="input" style={{ flex: '1 1 160px' }} placeholder="Nome (opcional)" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} aria-label="Nome" />
          <button className="btn primary" disabled={ocupado} type="submit"><Mail /> Enviar convite</button>
        </form>
      </section>

      <section className="panel stack-sm">
        <div className="row between">
          <label className="row nowrap" style={{ flex: '1 1 260px' }}><Search size={18} /><input className="input" placeholder="Buscar por e-mail ou nome" value={busca} onChange={(e) => setBusca(e.target.value)} aria-label="Buscar" /></label>
          <select className="input" style={{ width: 'auto' }} value={filtro} onChange={(e) => setFiltro(e.target.value as typeof filtro)} aria-label="Filtrar status">
            <option value="">Todos</option><option value="ativo">Ativos</option><option value="atrasado">Em atraso</option><option value="inativo">Inativos</option>
          </select>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data">
            <thead><tr><th>E-mail</th><th>Nome</th><th>Status</th><th>Origem</th><th>Último evento</th><th>Desde</th><th>Ações</th></tr></thead>
            <tbody>
              {lista.map((l) => (
                <tr key={l.id}>
                  <td>{l.email} {l.role === 'superadmin' && <span className="badge"><Shield size={11} /> superadmin</span>}</td>
                  <td>{l.nome ?? '—'}</td>
                  <td><span className={`badge ${l.status === 'ativo' ? 'green' : l.status === 'atrasado' ? 'amber' : 'red'}`}>{STATUS_LABEL[l.status]}</span></td>
                  <td>{l.origem}</td>
                  <td className="xs">{l.ultimo_evento ?? '—'}</td>
                  <td className="xs">{new Date(l.criado_em).toLocaleDateString('pt-BR')}</td>
                  <td>
                    {l.role !== 'superadmin' && (
                      <div className="row" style={{ gap: 4 }}>
                        {l.status !== 'ativo'
                          ? <button className="btn sm" onClick={() => mudarStatus(l, 'ativo')}><CheckCircle2 /> Liberar</button>
                          : <button className="btn sm danger" onClick={() => { if (confirm(`Bloquear o acesso de ${l.email}?`)) mudarStatus(l, 'inativo'); }}><Ban /> Bloquear</button>}
                        <button className="btn sm ghost" disabled={ocupado} onClick={() => api({ acao: 'reenviar', email: l.email })} title="Reenviar e-mail para criar senha"><Mail /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {lista.length === 0 && <div className="empty">Nenhuma conta encontrada.</div>}
        </div>
      </section>

      <section className="panel">
        <h2 style={{ fontSize: '1.15rem' }}>Últimos eventos da Cakto</h2>
        {eventos.length === 0 ? <Notice kind="info">Nenhum evento recebido ainda. Use “Testar webhook” no painel da Cakto para conferir a conexão.</Notice> : (
          <ul className="clean stack-sm">{eventos.map((e) => <li key={e.id} className="small row nowrap"><span className="badge cyan">{e.evento}</span><span className="grow">{e.email ?? '—'} · <span className="muted">{e.resultado ?? 'processando'}</span></span><span className="xs faint">{new Date(e.recebido_em).toLocaleString('pt-BR')}</span></li>)}</ul>
        )}
      </section>
    </div>
  );
}
