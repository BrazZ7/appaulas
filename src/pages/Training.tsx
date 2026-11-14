import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronLeft, CircleAlert, CircleDot, Clock, GraduationCap, NotebookPen, Printer, RotateCcw, User } from 'lucide-react';
import { Art } from '../components/Art';
import { PageHead, minutes } from '../components/ui';
import { MICRO_IMMERSIONS } from '../content';
import { actions, now, useApp } from '../store/store';

export default function Training() {
  const s = useApp();
  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="hero" style={{ minHeight: 230 }}>
        <Art id="hero-formacao" fill eager decorative />
        <div className="hero-content">
          <div className="kicker"><GraduationCap size={14} /> Formação do professor</div>
          <h1>Aprender fazendo</h1>
          <p className="muted" style={{ margin: 0 }}>Microimersões com situações simuladas de sala: escolha como agir, veja as consequências, reflita e leve um roteiro aplicável.</p>
        </div>
      </section>
      <div className="grid auto-fill">
        {MICRO_IMMERSIONS.map((t) => {
          const ready = t.status === 'disponivel';
          const prog = s.training[t.id];
          const body = (
            <>
              <Art id={t.artId} ratio={16 / 9} decorative />
              <div className="card-body">
                <div className="row between nowrap"><span className={`badge ${ready ? '' : 'amber'}`}>{ready ? 'Microimersão' : 'Em preparo'}</span>{prog?.finished && <span className="badge green">Concluída</span>}</div>
                <h3>{t.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{t.summary}</p>
                {ready && <span className="xs muted" style={{ marginTop: 'auto' }}><Clock size={12} /> {minutes(t.durationMin)} · {t.topic}</span>}
              </div>
            </>
          );
          return ready ? <Link key={t.id} to={`/formacao/${t.id}`} className="card-link">{body}</Link> : <div key={t.id} className="card-link card-disabled">{body}</div>;
        })}
      </div>
    </div>
  );
}

const Q = {
  construtiva: { label: 'Escolha construtiva', color: 'var(--green)', icon: CheckCircle2 },
  parcial: { label: 'Escolha parcial', color: 'var(--amber)', icon: CircleDot },
  arriscada: { label: 'Escolha arriscada', color: 'var(--red)', icon: CircleAlert },
};

export function TrainingPage() {
  const { id } = useParams();
  const s = useApp();
  const t = MICRO_IMMERSIONS.find((x) => x.id === id);
  useEffect(() => { if (t) actions.visit({ key: `train:${t.id}`, title: t.title, path: `/formacao/${t.id}`, kind: 'Formação' }); }, [t]);
  if (!t) return <div className="empty">Microimersão não encontrada. <Link to="/formacao">Voltar</Link></div>;
  if (t.status !== 'disponivel') return <div className="empty"><h2>{t.title}</h2><p>Em preparo.</p><Link className="btn" to="/formacao">Voltar</Link></div>;

  const prog = s.training[t.id] ?? { path: [], finished: false, updatedAt: now() };
  // percorre o caminho salvo
  let nodeId = t.startNodeId;
  const history: { nodeId: string; option: number }[] = [];
  for (const step of prog.path) { history.push(step); nodeId = t.nodes[step.nodeId].options[step.option].to; }
  const node = t.nodes[nodeId];
  const last = history[history.length - 1];
  const lastOpt = last ? t.nodes[last.nodeId].options[last.option] : null;
  const choose = (i: number) => {
    const path = [...prog.path, { nodeId, option: i }];
    const next = t.nodes[t.nodes[nodeId].options[i].to];
    actions.setTraining(t.id, { path, finished: !!next.end, updatedAt: now() });
  };
  const note = s.trainingNotes[t.id] ?? '';

  return (
    <div className="stack has-print" style={{ gap: 18 }}>
      <PageHead kicker={`Microimersão · ${t.topic}`} title={t.title} sub={t.summary} actions={<Link to="/formacao" className="btn ghost sm"><ChevronLeft /> Formação</Link>} />
      <div className="split">
        <div className="stack">
          {prog.path.length === 0 && (
            <section className="panel prose">{t.intro.map((p, i) => <p key={i}>{p}</p>)}</section>
          )}
          {lastOpt && (
            <div className="feedback" style={{ borderColor: Q[lastOpt.quality].color, background: 'rgba(255,255,255,.03)' }} role="status">
              <div className="row nowrap" style={{ color: Q[lastOpt.quality].color, fontWeight: 800 }}>{(() => { const I = Q[lastOpt.quality].icon; return <I size={18} />; })()} {Q[lastOpt.quality].label}</div>
              <p style={{ margin: '6px 0 0' }}>{lastOpt.feedback}</p>
            </div>
          )}
          <section className="panel stack anim-in" key={nodeId} aria-live="polite">
            {node.speaker && <span className="badge" style={{ alignSelf: 'flex-start' }}><User size={13} /> {node.speaker}</span>}
            <p className="prose-lg" style={{ margin: 0 }}>{node.situation}</p>
            {node.end ? (
              <div className="panel glow stack-sm">
                <h3>{node.end.title}</h3>
                <p style={{ margin: 0 }}>{node.end.reflection}</p>
                <button className="btn" style={{ alignSelf: 'flex-start' }} onClick={() => actions.setTraining(t.id, null)}><RotateCcw /> Viver a situação de novo, com outras escolhas</button>
              </div>
            ) : (
              <div className="stack-sm">
                <span className="label">O que você faz?</span>
                {node.options.map((o, i) => (
                  <button key={i} className="btn outline" style={{ justifyContent: 'flex-start', textAlign: 'left', whiteSpace: 'normal', fontWeight: 600, fontFamily: 'var(--font-body)' }} onClick={() => choose(i)}>
                    <ArrowRight size={16} /> {o.label}
                  </button>
                ))}
              </div>
            )}
          </section>
          {history.length > 0 && (
            <details className="panel tight"><summary style={{ cursor: 'pointer', fontWeight: 700 }}>Seu percurso ({history.length} decisões)</summary>
              <ol className="stack-sm mt">{history.map((h, i) => { const o = t.nodes[h.nodeId].options[h.option]; return <li key={i} className="small"><span style={{ color: Q[o.quality].color }}>●</span> {o.label}</li>; })}</ol>
              <button className="btn ghost sm" onClick={() => actions.setTraining(t.id, null)}><RotateCcw /> Recomeçar</button>
            </details>
          )}
          {node.end && (
            <section className="panel">
              <h3>Perguntas para reflexão</h3>
              <ol className="stack-sm">{t.reflectionQuestions.map((q, i) => <li key={i}>{q}</li>)}</ol>
            </section>
          )}
        </div>
        <aside className="stack">
          <section className="panel stack-sm">
            <div className="panel-title"><NotebookPen /><h3 style={{ margin: 0 }}>Minhas anotações</h3></div>
            <textarea className="input" rows={7} value={note} onChange={(e) => actions.setTrainingNote(t.id, e.target.value)} placeholder="O que eu levo para a minha sala? Que frase vou usar? O que quero evitar?" aria-label="Anotações" />
            <span className="xs faint">Salvas automaticamente neste navegador.</span>
          </section>
          <section className="panel">
            <div className="row between"><h3 style={{ margin: 0 }}>Roteiro aplicável</h3><button className="btn sm ghost" onClick={() => window.print()}><Printer /> Imprimir</button></div>
            {t.script.map((sc) => (
              <div key={sc.title} className="mt"><strong>{sc.title}</strong><ul className="bullets small">{sc.steps.map((x, i) => <li key={i}>{x}</li>)}</ul></div>
            ))}
          </section>
        </aside>
      </div>
      <div className="print-only print-doc">
        <h1>{t.title} — roteiro aplicável</h1>
        {t.script.map((sc) => <div key={sc.title}><h2>{sc.title}</h2><ul>{sc.steps.map((x, i) => <li key={i}>{x}</li>)}</ul></div>)}
        <h2>Perguntas para reflexão</h2><ol>{t.reflectionQuestions.map((q, i) => <li key={i}>{q}</li>)}</ol>
        {note && <><h2>Minhas anotações</h2><p style={{ whiteSpace: 'pre-wrap' }}>{note}</p></>}
      </div>
    </div>
  );
}
