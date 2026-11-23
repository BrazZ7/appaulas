/** Desafios do professor: missões curtas com checklist, registro e reflexão. */
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ChevronLeft, Flag, Lightbulb, NotebookPen, RotateCcw, Target } from 'lucide-react';
import { Bar, toast } from '../components/ui';
import { DESAFIOS_PROFESSOR, findDesafioProfessor, type AreaDesafio } from '../content/desafiosProfessor';
import { actions, now, useApp } from '../store/store';

export function DesafiosProfessorLista() {
  const s = useApp();
  const [area, setArea] = useState<AreaDesafio | ''>('');
  const areas = Array.from(new Set(DESAFIOS_PROFESSOR.map((d) => d.area)));
  const lista = DESAFIOS_PROFESSOR.filter((d) => !area || d.area === area);
  const feitos = DESAFIOS_PROFESSOR.filter((d) => s.desafiosProfessor[d.id]?.concluidoAt).length;
  return (
    <section className="stack">
      <div className="row between">
        <div>
          <h2 style={{ margin: 0 }}><Target size={20} /> Desafios do professor</h2>
          <p className="small muted" style={{ margin: 0 }}>Missões de uma a quatro semanas para experimentar uma prática na sua sala, registrar e refletir.</p>
        </div>
        <span className="badge green">{feitos} de {DESAFIOS_PROFESSOR.length} concluídos</span>
      </div>
      <div className="row" role="group" aria-label="Área">
        <button className={`chip ${!area ? 'on' : ''}`} aria-pressed={!area} onClick={() => setArea('')}>Todas</button>
        {areas.map((a) => <button key={a} className={`chip ${area === a ? 'on' : ''}`} aria-pressed={area === a} onClick={() => setArea(a)}>{a}</button>)}
      </div>
      <div className="grid g3">
        {lista.map((d) => {
          const p = s.desafiosProfessor[d.id];
          const pct = p ? Math.round((p.checks.filter(Boolean).length / d.passos.length) * 100) : 0;
          return (
            <Link key={d.id} to={`/formacao/desafios/${d.id}`} className="panel tight stack-sm" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="row between nowrap"><span className="badge">{d.area}</span>{p?.concluidoAt ? <span className="badge green">Concluído</span> : p ? <span className="badge amber">Em andamento</span> : <span className="xs muted">{d.nivel}</span>}</div>
              <strong>{d.title}</strong>
              <span className="small muted">{d.porque.slice(0, 120)}{d.porque.length > 120 ? '…' : ''}</span>
              <span className="xs muted">{d.duracao} · {d.passos.length} passos</span>
              {p && <Bar value={pct} label={`Progresso ${pct}%`} />}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export function DesafioProfessorPage() {
  const { id } = useParams();
  const s = useApp();
  const d = findDesafioProfessor(id ?? '');
  if (!d) return <div className="empty">Desafio não encontrado. <Link to="/formacao">Voltar</Link></div>;
  const p = s.desafiosProfessor[d.id];
  const checks = d.passos.map((_, i) => p?.checks[i] ?? false);
  const feitos = checks.filter(Boolean).length;
  const set = (x: Parameters<typeof actions.setDesafioProfessor>[1]) => actions.setDesafioProfessor(d.id, x);
  return (
    <div className="stack">
      <Link to="/formacao" className="small"><ChevronLeft size={14} /> Formação do professor</Link>
      <div className="row between">
        <div className="stack-sm">
          <span className="badge" style={{ alignSelf: 'flex-start' }}>{d.area} · {d.nivel} · {d.duracao}</span>
          <h1 style={{ margin: 0 }}>{d.title}</h1>
        </div>
        {!p ? <button className="btn primary" onClick={() => { set({ startedAt: now() }); toast('Desafio aceito! Bom trabalho.'); }}><Flag /> Aceitar desafio</button>
          : p.concluidoAt ? <span className="badge green"><CheckCircle2 size={14} /> Concluído em {new Date(p.concluidoAt).toLocaleDateString('pt-BR')}</span>
            : <span className="badge amber">Em andamento desde {new Date(p.startedAt).toLocaleDateString('pt-BR')}</span>}
      </div>
      <section className="panel stack-sm"><h3 style={{ margin: 0 }}><Lightbulb size={18} /> Por que fazer</h3><p style={{ margin: 0 }}>{d.porque}</p>{d.dica && <p className="small muted" style={{ margin: 0 }}><strong>Dica:</strong> {d.dica}</p>}</section>
      <div className="split-wide">
        <section className="panel stack-sm">
          <div className="row between"><h3 style={{ margin: 0 }}>Passos</h3><span className="small muted">{feitos}/{d.passos.length}</span></div>
          <Bar value={(feitos / d.passos.length) * 100} label="Progresso" />
          <ul className="clean stack-sm">
            {d.passos.map((t, i) => (
              <li key={i}><label className="row nowrap list-item" style={{ margin: 0, alignItems: 'flex-start', cursor: 'pointer' }}>
                <input type="checkbox" checked={checks[i]} onChange={(e) => set({ checks: checks.map((c, k) => (k === i ? e.target.checked : c)) })} style={{ marginTop: 4 }} />
                <span style={{ textDecoration: checks[i] ? 'line-through' : undefined, opacity: checks[i] ? 0.7 : 1 }}>{t}</span>
              </label></li>
            ))}
          </ul>
        </section>
        <aside className="stack">
          <section className="panel stack-sm">
            <h3 style={{ margin: 0 }}><NotebookPen size={18} /> Registro</h3>
            <p className="xs muted" style={{ margin: 0 }}>O que observar: {d.evidencias.join(' · ')}</p>
            <textarea className="input" rows={5} value={p?.registro ?? ''} onChange={(e) => set({ registro: e.target.value })} placeholder="Anote o que aconteceu na sala…" />
          </section>
          <section className="panel stack-sm">
            <h3 style={{ margin: 0 }}>Reflexão</h3>
            <ul className="bullets small" style={{ margin: 0 }}>{d.reflexao.map((r) => <li key={r}>{r}</li>)}</ul>
            <textarea className="input" rows={5} value={p?.reflexao ?? ''} onChange={(e) => set({ reflexao: e.target.value })} placeholder="O que eu aprendi e o que vou manter…" />
          </section>
        </aside>
      </div>
      <div className="row">
        {p && !p.concluidoAt && <button className="btn primary" disabled={feitos < d.passos.length} title={feitos < d.passos.length ? 'Marque todos os passos para concluir' : undefined} onClick={() => { set({ concluidoAt: now() }); toast('Desafio concluído — parabéns!'); }}><CheckCircle2 /> Concluir desafio</button>}
        {p && <button className="btn ghost" onClick={() => { if (confirm('Recomeçar este desafio? O registro e a reflexão serão apagados.')) actions.setDesafioProfessor(d.id, null); }}><RotateCcw /> Recomeçar</button>}
      </div>
      <p className="xs muted">Seus registros ficam salvos neste navegador e servem para você acompanhar a sua própria prática.</p>
    </div>
  );
}
