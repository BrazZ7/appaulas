import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, ExternalLink, Monitor, Pause, Play, RotateCcw, Ticket, WifiOff } from 'lucide-react';
import { Bar, Notice, toast } from '../components/ui';
import { findLesson, refPath, refTitle } from '../content';
import { BLOCK_META } from '../lib/lesson';
import { actions, useApp } from '../store/store';

export default function LessonApply() {
  const { id } = useParams();
  const s = useApp();
  const l = findLesson(id ?? '', s.myLessons);
  const prog = (l && s.applyProgress[l.id]) || { done: [] as string[], current: 0, updatedAt: '' };
  const [left, setLeft] = useState(0);
  const [running, setRunning] = useState(false);
  const [offline, setOffline] = useState(false);
  const idx = Math.min(prog.current, (l?.blocks.length ?? 1) - 1);
  const b = l?.blocks[idx];
  useEffect(() => { if (b) { setLeft(b.minutes * 60); setRunning(false); } }, [b?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!running || left <= 0) return;
    const t = window.setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => window.clearTimeout(t);
  }, [running, left]);
  useEffect(() => { if (l) actions.visit({ key: `lesson:${l.id}`, title: l.title, path: `/aulas/${l.id}/aplicar`, kind: 'Aula' }); }, [l]);
  if (!l || !b) return <div className="empty">Aula não encontrada. <Link to="/aulas">Voltar</Link></div>;

  const go = (n: number) => actions.setApplyProgress(l.id, { ...prog, current: Math.max(0, Math.min(l.blocks.length - 1, n)) });
  const toggleDone = () => {
    const done = prog.done.includes(b.id) ? prog.done.filter((x) => x !== b.id) : [...prog.done, b.id];
    actions.setApplyProgress(l.id, { done, current: done.includes(b.id) && idx < l.blocks.length - 1 ? idx + 1 : idx });
  };
  const meta = BLOCK_META[b.kind];
  const allDone = prog.done.length === l.blocks.length;

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row between hide-projector">
        <div>
          <Link to={`/aulas/${l.id}`} className="small"><ChevronLeft size={14} /> Plano da aula</Link>
          <h1 style={{ margin: 0 }}>{l.title}</h1>
        </div>
        <div className="row">
          <button className={`btn sm ${offline ? 'violet' : 'outline'}`} aria-pressed={offline} onClick={() => setOffline(!offline)}><WifiOff /> Versão sem dispositivos</button>
          <button className="btn sm primary" onClick={() => actions.setSettings({ projector: true })}><Monitor /> Projetar</button>
        </div>
      </div>

      <nav aria-label="Etapas da aula" className="row" style={{ gap: 6 }}>
        {l.blocks.map((x, i) => (
          <button key={x.id} className={`chip ${i === idx ? 'on' : ''}`} aria-current={i === idx ? 'step' : undefined} onClick={() => go(i)} style={{ borderColor: BLOCK_META[x.kind].color }}>
            {prog.done.includes(x.id) ? <Check size={14} color="var(--green)" /> : <span className="num xs">{i + 1}</span>} {x.title}
          </button>
        ))}
      </nav>
      <Bar value={prog.done.length} max={l.blocks.length} label="Etapas concluídas" />

      <div className="split">
        <section className="panel stack anim-in" key={b.id} style={{ borderTop: `4px solid ${meta.color}`, minHeight: 320 }}>
          <div className="row between"><span className="badge" style={{ borderColor: meta.color }}>{meta.label} · etapa {idx + 1} de {l.blocks.length}</span><span className="small muted">{b.minutes} min previstos</span></div>
          <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.6rem)' }}>{b.title}</h2>
          <p className="prose-lg" style={{ whiteSpace: 'pre-wrap' }}>{offline && b.offlineAlternative ? b.offlineAlternative : b.instructions}</p>
          {offline && !b.offlineAlternative && <Notice>Esta etapa não tem alternativa sem dispositivos registrada. Edite a aula para incluir uma.</Notice>}
          {b.resourceRef && !offline && <Link to={refPath(b.resourceRef)} className="btn outline-cyan lg" style={{ alignSelf: 'flex-start' }}><ExternalLink /> Abrir: {refTitle(b.resourceRef)}</Link>}
          {b.kind === 'avaliacao' && <Link to={`/turmas/${s.activeTurmaId}?aba=avaliacao&aula=${l.id}`} className="btn violet" style={{ alignSelf: 'flex-start' }}><Ticket /> Abrir bilhete de saída</Link>}
          {b.teacherNotes && <p className="small muted hide-projector">Nota: {b.teacherNotes}</p>}
          <div className="row" style={{ marginTop: 'auto' }}>
            <button className="btn" onClick={() => go(idx - 1)} disabled={idx === 0}><ChevronLeft /> Anterior</button>
            <button className={`btn ${prog.done.includes(b.id) ? 'ghost' : 'primary'}`} onClick={toggleDone}><Check /> {prog.done.includes(b.id) ? 'Desmarcar etapa' : 'Concluir etapa'}</button>
            <button className="btn" onClick={() => go(idx + 1)} disabled={idx === l.blocks.length - 1}>Próxima <ChevronRight /></button>
          </div>
        </section>
        <aside className="stack">
          <section className="panel center stack-sm">
            <span className="label">Tempo da etapa</span>
            <div className="num" style={{ fontSize: '3.2rem', fontWeight: 800, color: left <= 60 ? 'var(--amber)' : 'var(--cyan)' }}>{left < 0 ? '0:00' : `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')}`}</div>
            {left <= 0 && <span className="small" role="status">Tempo previsto encerrado.</span>}
            <div className="row" style={{ justifyContent: 'center' }}>
              <button className="btn primary" onClick={() => setRunning(!running)}>{running ? <><Pause /> Pausar</> : <><Play /> Iniciar</>}</button>
              <button className="btn ghost" onClick={() => { setLeft(b.minutes * 60); setRunning(false); }} aria-label="Reiniciar tempo"><RotateCcw /></button>
            </div>
          </section>
          <section className="panel hide-projector">
            <h3>Objetivos</h3>
            <ul className="bullets small">{l.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul>
            <h3 className="mt">Observar</h3>
            <ul className="bullets small">{l.observeLearning.map((o, i) => <li key={i}>{o}</li>)}</ul>
          </section>
          {allDone && (
            <section className="panel glow stack-sm">
              <strong>Aula concluída! 🎉</strong>
              <span className="small">Registre observações e evidências enquanto estão frescas.</span>
              <Link className="btn primary" to={`/turmas/${s.activeTurmaId}?aba=avaliacao&aula=${l.id}`}>Registrar na turma</Link>
              <button className="btn ghost sm" onClick={() => { actions.setApplyProgress(l.id, null); toast('Progresso reiniciado'); }}>Reiniciar progresso</button>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
