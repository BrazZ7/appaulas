import { useEffect, useMemo, useState } from 'react';
import { Link, useBlocker, useNavigate, useParams } from 'react-router-dom';
import {
  Accessibility, ArrowDown, ArrowUp, BookOpen, Captions, ChevronLeft, Clock, Copy, Download, GripVertical, Pencil, Play,
  Plus, Printer, Save, Trash2, Type, Users, WifiOff, Wand2, X,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Modal, Notice, Switch, toast } from '../components/ui';
import { GAME_ACTIVITIES, IMMERSIONS, PROJECTS, SIMULATIONS, STORIES, SUBJECTS, findLesson } from '../content';
import { BLOCK_META, duplicateLesson, lessonToMarkdown, newBlock, newLesson, scaleDurations, totalMinutes } from '../lib/lesson';
import { download } from '../lib/files';
import { actions, useApp } from '../store/store';
import type { BlockKind, Difficulty, Lesson, LessonBlock, Resource, ResourceRef, SubjectId } from '../types/models';
import { DIFF_LABEL, RESOURCE_LABEL } from './Library';

const REFS: { label: string; options: { ref: ResourceRef; title: string }[] }[] = [
  { label: 'Histórias', options: STORIES.map((x) => ({ ref: { type: 'story', id: x.id }, title: x.title })) },
  { label: 'Jogos', options: GAME_ACTIVITIES.map((x) => ({ ref: { type: 'game', id: x.id }, title: x.title })) },
  { label: 'Simulações', options: SIMULATIONS.map((x) => ({ ref: { type: 'simulation', id: x.id }, title: x.title })) },
  { label: 'Imersões', options: IMMERSIONS.filter((i) => i.status === 'disponivel').map((x) => ({ ref: { type: 'immersion', id: x.id }, title: x.title })) },
  { label: 'Projetos', options: PROJECTS.map((x) => ({ ref: { type: 'project', id: x.id }, title: x.title })) },
];

function ListEditor({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="field">
      <span>{label}</span>
      <ul className="clean stack-sm">
        {items.map((it, i) => (
          <li key={i} className="row nowrap">
            <input className="input" value={it} placeholder={placeholder} aria-label={`${label} ${i + 1}`} onChange={(e) => onChange(items.map((x, k) => (k === i ? e.target.value : x)))} />
            <button className="btn icon ghost" aria-label={`Remover item ${i + 1} de ${label}`} onClick={() => onChange(items.filter((_, k) => k !== i))}><X /></button>
          </li>
        ))}
      </ul>
      <button className="btn sm ghost" style={{ alignSelf: 'flex-start' }} onClick={() => onChange([...items, ''])}><Plus /> Adicionar</button>
    </div>
  );
}

export default function LessonEditor() {
  const { id } = useParams();
  const s = useApp();
  // reinicia o editor ao trocar de aula (mas não quando “nova” vira a URL da aula salva)
  const key = id && s.myLessons.some((m) => m.id === id) ? 'saved' : id ?? 'nova';
  return <Editor key={key === 'saved' ? `s-${id}` : key} id={id} />;
}

function Editor({ id }: { id?: string }) {
  const s = useApp();
  const nav = useNavigate();
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const initial = useMemo<Lesson>(() => {
    const found = id ? findLesson(id, s.myLessons) : undefined;
    if (found) return found.origin === 'pessoal' ? structuredClone(found) : duplicateLesson(found, s.user.id);
    return newLesson(s.user.id, turma?.ano ?? 7);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  const [l, setL] = useState<Lesson>(initial);
  const [dirty, setDirty] = useState(false);
  const [open, setOpen] = useState<string | null>(l.blocks[0]?.id ?? null);
  const [drag, setDrag] = useState<number | null>(null);
  const [scaleOpen, setScaleOpen] = useState(false);
  const [target, setTarget] = useState(l.durationMin);
  const set = (p: Partial<Lesson>) => { setL((x) => ({ ...x, ...p })); setDirty(true); };
  const setBlock = (bid: string, p: Partial<LessonBlock>) => set({ blocks: l.blocks.map((b) => (b.id === bid ? { ...b, ...p } : b)) });
  const total = totalMinutes(l.blocks);
  const blocker = useBlocker(({ currentLocation, nextLocation }) => dirty && currentLocation.pathname !== nextLocation.pathname);
  useEffect(() => {
    const h = (e: BeforeUnloadEvent) => { if (dirty) e.preventDefault(); };
    window.addEventListener('beforeunload', h);
    return () => window.removeEventListener('beforeunload', h);
  }, [dirty]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= l.blocks.length || from === to) return;
    const b = [...l.blocks];
    const [x] = b.splice(from, 1);
    b.splice(to, 0, x);
    set({ blocks: b });
  };
  const save = (go?: string) => {
    const cleaned: Lesson = { ...l, durationMin: total, objectives: l.objectives.filter((o) => o.trim()), materials: l.materials.filter((o) => o.trim()), adaptations: l.adaptations.filter((o) => o.trim()), observeLearning: l.observeLearning.filter((o) => o.trim()) };
    if (!cleaned.title.trim()) { toast('Dê um título à aula'); return; }
    actions.saveLesson(cleaned);
    setL(cleaned);
    setDirty(false);
    toast('Aula salva');
    if (go) setTimeout(() => nav(go), 0);
    else if (id !== cleaned.id) setTimeout(() => nav(`/aulas/${cleaned.id}/editar`, { replace: true }), 0);
  };
  const toggleArr = <T,>(arr: T[], v: T) => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
  const fromLibrary = id && !s.myLessons.some((m) => m.id === id) && findLesson(id, []);

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row between">
        <div>
          <Link to="/aulas" className="small"><ChevronLeft size={14} /> Planejador</Link>
          <h1 style={{ margin: 0 }}>Sua aula, <span className="grad-text">do seu jeito</span></h1>
          <p className="muted" style={{ margin: 0 }}>Planeje, adapte e acompanhe. Arraste os blocos para reorganizar.</p>
        </div>
        <div className="row">
          {dirty ? <span className="badge amber">Alterações não salvas</span> : <span className="badge green">Salvo</span>}
          <button className="btn primary" onClick={() => save()}><Save /> Salvar planejamento</button>
        </div>
      </div>
      {fromLibrary && <Notice kind="info">Você está editando uma <strong>cópia</strong> da aula da biblioteca. O original continua disponível para todos.</Notice>}

      <div className="split">
        <div className="stack">
          <section className="panel">
            <div className="grid" style={{ gridTemplateColumns: 'minmax(0,240px) 1fr', gap: 18 }}>
              <Art id={l.artId} ratio={4 / 3} decorative style={{ borderRadius: 14 }} className="desktop-only" />
              <div className="stack-sm">
                <label className="field"><span>Título</span><input className="input" style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-head)' }} value={l.title} onChange={(e) => set({ title: e.target.value })} /></label>
                <label className="field"><span>Resumo</span><textarea className="input" rows={2} value={l.summary} onChange={(e) => set({ summary: e.target.value })} /></label>
                <div className="row">
                  <span className="chip"><Clock /> {total} min</span>
                  <label className="row small" style={{ gap: 6 }}>Ano
                    <select className="input" style={{ width: 'auto' }} value={l.anos[0] ?? 7} onChange={(e) => { const a = Number(e.target.value); set({ anos: [a], etapa: a <= 5 ? 'fundamental1' : 'fundamental2' }); }}>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => <option key={a} value={a}>{a}º ano</option>)}</select>
                  </label>
                  <label className="row small" style={{ gap: 6 }}>Dificuldade
                    <select className="input" style={{ width: 'auto' }} value={l.difficulty} onChange={(e) => set({ difficulty: e.target.value as Difficulty })}>{Object.entries(DIFF_LABEL).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
                  </label>
                </div>
                <div className="row" style={{ gap: 6 }} role="group" aria-label="Matérias">
                  {SUBJECTS.filter((x) => x.status === 'disponivel').map((sub) => (
                    <button key={sub.id} className={`chip xs ${l.subjects.includes(sub.id) ? 'on' : ''}`} aria-pressed={l.subjects.includes(sub.id)} style={{ padding: '4px 10px' }} onClick={() => set({ subjects: toggleArr<SubjectId>(l.subjects, sub.id) })}>{sub.name}</button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="panel" aria-label="Blocos da aula">
            <div className="row between mb"><h2 style={{ margin: 0 }}>Blocos da aula</h2><span className={`small ${total !== l.durationMin ? '' : 'muted'}`}>Total: <strong>{total} min</strong></span></div>
            <ol className="clean stack-sm">
              {l.blocks.map((b, i) => {
                const meta = BLOCK_META[b.kind];
                const isOpen = open === b.id;
                return (
                  <li key={b.id} draggable onDragStart={() => setDrag(i)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag !== null) move(drag, i); setDrag(null); }}
                    className="panel tight" style={{ padding: 0, borderColor: isOpen ? meta.color : undefined, opacity: drag === i ? 0.5 : 1 }}>
                    <div className="row nowrap" style={{ padding: '10px 12px' }}>
                      <GripVertical className="faint desktop-only" style={{ cursor: 'grab' }} aria-hidden />
                      <span className="icon-tile" style={{ background: `${meta.color}33`, width: 40, height: 40 }}><span className="xs" style={{ fontWeight: 800, color: meta.color }}>{i + 1}</span></span>
                      <button className="grow" style={{ background: 'none', border: 0, textAlign: 'left', color: 'var(--text)', cursor: 'pointer', padding: 0 }} onClick={() => setOpen(isOpen ? null : b.id)} aria-expanded={isOpen}>
                        <strong>{b.title}</strong> <span className="small muted">· {b.minutes} min</span>
                        <div className="xs" style={{ color: meta.color }}>{meta.label}{b.resourceRef ? ' · com recurso' : ''}{b.offlineAlternative ? ' · alternativa off-line' : ''}</div>
                      </button>
                      <button className="btn icon ghost" aria-label={`Mover ${b.title} para cima`} disabled={i === 0} onClick={() => move(i, i - 1)}><ArrowUp /></button>
                      <button className="btn icon ghost" aria-label={`Mover ${b.title} para baixo`} disabled={i === l.blocks.length - 1} onClick={() => move(i, i + 1)}><ArrowDown /></button>
                      <button className="btn icon ghost" aria-label={`Duplicar ${b.title}`} onClick={() => { const c = { ...b, id: `${b.id}-c${Date.now() % 1000}` }; const arr = [...l.blocks]; arr.splice(i + 1, 0, c); set({ blocks: arr }); }}><Copy /></button>
                      <button className="btn icon ghost" aria-label={`Remover ${b.title}`} onClick={() => set({ blocks: l.blocks.filter((x) => x.id !== b.id) })}><Trash2 /></button>
                    </div>
                    {isOpen && (
                      <div className="stack-sm" style={{ padding: '0 14px 14px' }}>
                        <div className="grid" style={{ gridTemplateColumns: '1fr 110px 170px', gap: 10 }}>
                          <label className="field"><span>Título</span><input className="input" value={b.title} onChange={(e) => setBlock(b.id, { title: e.target.value })} /></label>
                          <label className="field"><span>Minutos</span><input className="input" type="number" min={1} max={240} value={b.minutes} onChange={(e) => setBlock(b.id, { minutes: Math.max(1, Number(e.target.value)) })} /></label>
                          <label className="field"><span>Tipo</span><select className="input" value={b.kind} onChange={(e) => setBlock(b.id, { kind: e.target.value as BlockKind })}>{Object.entries(BLOCK_META).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}</select></label>
                        </div>
                        <label className="field"><span>O que fazer</span><textarea className="input" rows={3} value={b.instructions} onChange={(e) => setBlock(b.id, { instructions: e.target.value })} placeholder={meta.hint} /></label>
                        <label className="field"><span>Recurso do Ensinaê</span>
                          <select className="input" value={b.resourceRef ? `${b.resourceRef.type}:${b.resourceRef.id}` : ''} onChange={(e) => { const [t, rid] = e.target.value.split(':'); setBlock(b.id, { resourceRef: e.target.value ? { type: t as ResourceRef['type'], id: rid } : undefined }); }}>
                            <option value="">Nenhum</option>
                            {REFS.map((g) => <optgroup key={g.label} label={g.label}>{g.options.map((o) => <option key={o.ref.id} value={`${o.ref.type}:${o.ref.id}`}>{o.title}</option>)}</optgroup>)}
                          </select>
                        </label>
                        <label className="field"><span><WifiOff size={13} /> Alternativa sem internet / sem dispositivos dos alunos</span><textarea className="input" rows={2} value={b.offlineAlternative ?? ''} onChange={(e) => setBlock(b.id, { offlineAlternative: e.target.value })} /></label>
                        <label className="field"><span>Notas para o professor</span><input className="input" value={b.teacherNotes ?? ''} onChange={(e) => setBlock(b.id, { teacherNotes: e.target.value })} /></label>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
            <div className="mt">
              <span className="label">Adicionar bloco</span>
              <div className="row mt" style={{ gap: 6, marginTop: 8 }}>
                {(Object.keys(BLOCK_META) as BlockKind[]).map((k) => (
                  <button key={k} className="chip" style={{ borderColor: `${BLOCK_META[k].color}99` }} onClick={() => { const nb = newBlock(k); set({ blocks: [...l.blocks, nb] }); setOpen(nb.id); }}><Plus /> {BLOCK_META[k].label}</button>
                ))}
              </div>
            </div>
          </section>

          <section className="panel stack">
            <h2 style={{ margin: 0 }}>Objetivos, materiais e avaliação</h2>
            <div className="grid g2">
              <ListEditor label="Objetivos" items={l.objectives} onChange={(v) => set({ objectives: v })} placeholder="Ao final, os estudantes…" />
              <ListEditor label="Materiais" items={l.materials} onChange={(v) => set({ materials: v })} />
              <ListEditor label="Como observar a aprendizagem" items={l.observeLearning} onChange={(v) => set({ observeLearning: v })} />
              <ListEditor label="Adaptações" items={l.adaptations} onChange={(v) => set({ adaptations: v })} />
            </div>
            <label className="field"><span>Público</span><input className="input" value={l.audience} onChange={(e) => set({ audience: e.target.value })} placeholder="Ex.: 7º ano, turma com leitores em diferentes níveis" /></label>
            <hr className="sep" />
            <h3 style={{ margin: 0 }}>Atividade imprimível</h3>
            <label className="field"><span>Título da atividade</span><input className="input" value={l.activity.title} onChange={(e) => set({ activity: { ...l.activity, title: e.target.value } })} /></label>
            <div className="grid g2">
              <ListEditor label="Instruções / questões" items={l.activity.instructions} onChange={(v) => set({ activity: { ...l.activity, instructions: v } })} />
              <ListEditor label="Gabarito (folha separada)" items={l.activity.answerKey ?? []} onChange={(v) => set({ activity: { ...l.activity, answerKey: v } })} />
            </div>
          </section>
        </div>

        <aside className="stack">
          <section className="panel stack-sm">
            <div className="panel-title"><Accessibility /><h2 style={{ fontSize: '1.25rem' }}>Adaptar para a turma</h2></div>
            <p className="xs muted" style={{ margin: 0 }}>Turma ativa: <strong>{turma?.name}</strong> ({turma?.students.length} estudantes)</p>
            <span className="label">Recursos que a aula usa</span>
            <div className="row" style={{ gap: 6 }}>
              {(Object.keys(RESOURCE_LABEL) as Resource[]).map((r) => (
                <button key={r} className={`chip xs ${l.resources.includes(r) ? 'on' : ''}`} style={{ padding: '4px 9px' }} aria-pressed={l.resources.includes(r)} onClick={() => set({ resources: toggleArr(l.resources, r) })}>{RESOURCE_LABEL[r]}</button>
              ))}
            </div>
            <div className="setting-row"><BookOpen size={18} /><span>Nível de leitura</span>
              <select className="input" style={{ width: 'auto' }} value={s.settings.readingLevel} onChange={(e) => actions.setSettings({ readingLevel: e.target.value as typeof s.settings.readingLevel })}><option value="padrao">Padrão</option><option value="simplificado">Um parágrafo por vez</option><option value="ampliado">Ampliado</option></select></div>
            <div className="setting-row"><Captions size={18} /><span>Legendas</span><Switch hideLabel label="Legendas" checked={s.settings.captions} onChange={(v) => actions.setSettings({ captions: v })} /></div>
            <div className="setting-row"><Type size={18} /><span>Fonte ampliada</span><Switch hideLabel label="Fonte ampliada" checked={s.settings.fontScale > 1} onChange={(v) => actions.setSettings({ fontScale: v ? 1.15 : 1 })} /></div>
            <div className="setting-row"><WifiOff size={18} /><span>Atividade sem internet</span><Switch hideLabel label="Atividade sem internet" checked={l.resources.includes('sem-internet')} onChange={(v) => set({ resources: v ? [...l.resources, 'sem-internet'] : l.resources.filter((x) => x !== 'sem-internet') })} /></div>
            {l.resources.includes('sem-internet') && l.blocks.some((b) => b.resourceRef && !b.offlineAlternative) && (
              <Notice>{l.blocks.filter((b) => b.resourceRef && !b.offlineAlternative).length} bloco(s) com recurso digital ainda sem alternativa off-line.</Notice>
            )}
            <button className="btn outline" onClick={() => { setTarget(l.durationMin); setScaleOpen(true); }}><Wand2 /> Ajustar tempo da aula</button>
          </section>
          <section className="panel stack-sm">
            <button className="btn primary block" onClick={() => save(`/aulas/${l.id}/aplicar`)}><Play /> Salvar e aplicar</button>
            <button className="btn outline block" onClick={() => save(`/aulas/${l.id}/imprimir`)}><Printer /> Salvar e imprimir kit</button>
            <button className="btn outline block" onClick={() => save(`/aulas/${l.id}`)}><Users /> Salvar e ver plano</button>
            <button className="btn ghost block" onClick={() => download(`${l.title}.md`, lessonToMarkdown(l), 'text/markdown;charset=utf-8')}><Download /> Exportar materiais (.md)</button>
          </section>
        </aside>
      </div>

      <Modal open={scaleOpen} onClose={() => setScaleOpen(false)} title="Ajustar tempo da aula">
        <div className="stack">
          <p className="small muted">Redistribui os minutos proporcionalmente entre os blocos (mínimo de 2 min cada). Confira a prévia antes de aplicar — é uma regra simples, não IA.</p>
          <label className="field"><span>Duração desejada (min)</span><input className="input" type="number" min={10} max={240} value={target} onChange={(e) => setTarget(Number(e.target.value))} /></label>
          <table className="data"><thead><tr><th>Bloco</th><th>Atual</th><th>Prévia</th></tr></thead>
            <tbody>{scaleDurations(l.blocks, target).map((b, i) => <tr key={b.id}><td>{b.title}</td><td className="num">{l.blocks[i].minutes}</td><td className="num"><strong>{b.minutes}</strong></td></tr>)}</tbody>
          </table>
          <button className="btn primary" onClick={() => { set({ blocks: scaleDurations(l.blocks, target) }); setScaleOpen(false); }}><Pencil /> Aplicar ajuste</button>
        </div>
      </Modal>
      <Modal open={blocker.state === 'blocked'} onClose={() => blocker.reset?.()} title="Sair sem salvar?">
        <p>Há alterações não salvas nesta aula.</p>
        <div className="row"><button className="btn primary" onClick={() => { save(); blocker.proceed?.(); }}><Save /> Salvar e sair</button><button className="btn danger" onClick={() => blocker.proceed?.()}>Descartar</button><button className="btn ghost" onClick={() => blocker.reset?.()}>Continuar editando</button></div>
      </Modal>
    </div>
  );
}
