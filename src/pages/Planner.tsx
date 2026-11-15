import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  CalendarPlus, ChevronLeft, Clock, Copy, Download, Eye, Lock, Pencil, Play, Plus, Printer, Share2, Trash2, Users, WifiOff,
} from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Modal, Notice, PageHead, anosLabel, minutes, toast } from '../components/ui';
import { LESSONS, SUBJECT_MAP, findLesson, refPath, refTitle } from '../content';
import { unnum, BLOCK_META, duplicateLesson, lessonToMarkdown } from '../lib/lesson';
import { download } from '../lib/files';
import { actions, uid, useApp } from '../store/store';
import { can } from '../store/permissions';
import type { Lesson } from '../types/models';
import { DIFF_LABEL, RESOURCE_LABEL } from './Library';

function LessonRow({ l }: { l: Lesson }) {
  const s = useApp();
  const nav = useNavigate();
  const mine = l.origin === 'pessoal';
  const prog = s.applyProgress[l.id];
  return (
    <article className="card-link" style={{ flexDirection: 'row', alignItems: 'stretch' }}>
      <Art id={l.artId} ratio={4 / 3} decorative style={{ width: 130, flex: 'none' }} className="desktop-only" />
      <div className="card-body">
        <div className="row between nowrap">
          <div className="row" style={{ gap: 6 }}>
            <span className={`badge ${mine ? 'cyan' : ''}`}>{mine ? 'Minha aula' : 'Biblioteca'}</span>
            {mine && l.sharing === 'escola' && <span className="badge green"><Share2 size={11} /> Compartilhada com a escola</span>}
            {prog && <span className="badge amber">{prog.done.length}/{l.blocks.length} etapas aplicadas</span>}
          </div>
          <FavButton k={`lesson:${l.id}`} title={l.title} />
        </div>
        <Link to={`/aulas/${l.id}`} style={{ color: 'var(--text)', textDecoration: 'none' }}><h3>{l.title}</h3></Link>
        <p className="small muted" style={{ margin: 0 }}>{l.summary}</p>
        <div className="row xs muted"><Clock size={12} /> {minutes(l.durationMin)} · {anosLabel(l.anos)} · {l.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')}</div>
        <div className="row" style={{ gap: 6, marginTop: 4 }}>
          <Link className="btn sm primary" to={`/aulas/${l.id}/aplicar`}><Play /> Aplicar</Link>
          {mine ? <Link className="btn sm" to={`/aulas/${l.id}/editar`}><Pencil /> Editar</Link> : null}
          <button className="btn sm" onClick={() => { const c = duplicateLesson(l, s.user.id); actions.saveLesson(c); toast(mine ? 'Aula duplicada' : 'Cópia criada na sua biblioteca'); nav(`/aulas/${c.id}/editar`); }}><Copy /> {mine ? 'Duplicar' : 'Copiar e adaptar'}</button>
          <Link className="btn sm ghost" to={`/aulas/${l.id}/imprimir`}><Printer /> Imprimir</Link>
        </div>
      </div>
    </article>
  );
}

export default function Lessons() {
  const s = useApp();
  const [tab, setTab] = useState<'minhas' | 'biblioteca' | 'escola'>(s.myLessons.length ? 'minhas' : 'biblioteca');
  const [q, setQ] = useState('');
  const role = s.user.role;
  const shared = s.myLessons.filter((l) => l.sharing === 'escola');
  const list = (tab === 'minhas' ? s.myLessons : tab === 'escola' ? shared : LESSONS).filter((l) => !q || l.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="stack">
      <PageHead kicker="Planejador de aulas" title="Biblioteca de aulas" sub="Monte aulas por blocos, adapte para a turma e aplique no projetor, em grupos ou sem dispositivos."
        actions={can(role, 'lesson.create') && <Link className="btn primary" to="/aulas/nova"><Plus /> Criar aula</Link>} />
      <div className="row between">
        <div className="tabs" role="tablist" aria-label="Coleções" style={{ flex: '0 1 auto' }}>
          {([['minhas', `Minhas aulas (${s.myLessons.length})`], ['biblioteca', `Biblioteca Ensinaê (${LESSONS.length})`], ['escola', `Modelos da escola (${shared.length})`]] as const).map(([id, label]) => (
            <button key={id} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        <input className="input" style={{ maxWidth: 280 }} placeholder="Filtrar por título" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filtrar aulas" />
      </div>
      {tab === 'escola' && <Notice kind="info">Modelos compartilhados com a escola. No modo demonstrativo, “escola” significa os perfis deste navegador; em produção, o acesso seria controlado por organização no servidor.</Notice>}
      {list.length === 0 && <div className="empty">{tab === 'minhas' ? <>Você ainda não tem aulas próprias. <Link to="/aulas/nova">Crie uma</Link> ou copie uma aula da biblioteca.</> : 'Nada por aqui.'}</div>}
      <div className="grid g2">{list.map((l) => <LessonRow key={l.id} l={l} />)}</div>
    </div>
  );
}

export function LessonView() {
  const { id } = useParams();
  const s = useApp();
  const nav = useNavigate();
  const l = findLesson(id ?? '', s.myLessons);
  const [agenda, setAgenda] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime] = useState('08:00');
  const [turmaId, setTurmaId] = useState(s.activeTurmaId);
  useEffect(() => { if (l) actions.visit({ key: `lesson:${l.id}`, title: l.title, path: `/aulas/${l.id}`, kind: 'Aula' }); }, [l]);
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const missing = useMemo(() => (l && turma ? l.resources.filter((r) => ['projetor', 'computador-unico', 'dispositivos-grupo', 'dispositivos-individuais'].includes(r) && !turma.resources.includes(r)) : []), [l, turma]);
  if (!l) return <div className="empty">Aula não encontrada. <Link to="/aulas">Voltar</Link></div>;
  const mine = l.origin === 'pessoal';

  return (
    <div className="stack" style={{ gap: 18 }}>
      <Link to="/aulas" className="small"><ChevronLeft size={14} /> Planejador</Link>
      <div className="split">
        <div className="stack">
          <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div className="grid" style={{ gridTemplateColumns: 'minmax(0,300px) 1fr', gap: 0 }}>
              <Art id={l.artId} ratio={4 / 3} decorative className="desktop-only" />
              <div style={{ padding: 22 }} className="stack-sm">
                <div className="row" style={{ gap: 6 }}><span className={`badge ${mine ? 'cyan' : ''}`}>{mine ? 'Minha aula' : 'Biblioteca Ensinaê'}</span><span className="badge">{DIFF_LABEL[l.difficulty]}</span></div>
                <h1 style={{ margin: 0 }}>{l.title}</h1>
                <div className="row" style={{ gap: 8 }}>
                  {l.subjects.map((x) => <span key={x} className="chip xs">{SUBJECT_MAP[x]?.name}</span>)}
                  <span className="chip xs"><Clock /> {minutes(l.durationMin)}</span>
                  <span className="chip xs"><Users /> {anosLabel(l.anos)}</span>
                </div>
                <p className="muted" style={{ margin: 0 }}>{l.summary}</p>
                <p className="small" style={{ margin: 0 }}><strong>Público:</strong> {l.audience}</p>
              </div>
            </div>
          </section>

          {missing.length > 0 && (
            <Notice><strong>{turma?.name}</strong> não tem: {missing.map((r) => RESOURCE_LABEL[r]).join(', ')}. Cada etapa abaixo traz uma alternativa sem dispositivos.</Notice>
          )}

          <section className="panel">
            <h2>Etapas da aula</h2>
            <ol className="clean stack-sm">
              {l.blocks.map((b, i) => (
                <li key={b.id} className="list-item" style={{ margin: 0, alignItems: 'flex-start', borderLeft: `4px solid ${BLOCK_META[b.kind].color}` }}>
                  <span className="badge num" style={{ minWidth: 30, justifyContent: 'center' }}>{i + 1}</span>
                  <div className="grow stack-sm">
                    <div className="row between"><strong>{b.title}</strong><span className="xs muted">{BLOCK_META[b.kind].label} · {b.minutes} min</span></div>
                    <p className="small" style={{ margin: 0 }}>{b.instructions}</p>
                    {b.resourceRef && <Link to={refPath(b.resourceRef)} className="small">→ Abrir recurso: {refTitle(b.resourceRef)}</Link>}
                    {b.offlineAlternative && <p className="xs muted" style={{ margin: 0 }}><WifiOff size={12} /> {b.offlineAlternative}</p>}
                    {b.teacherNotes && <p className="xs faint" style={{ margin: 0 }}>Nota: {b.teacherNotes}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {l.activity.title && (
            <section className="panel">
              <h2>Atividade: {l.activity.title}</h2>
              <ol className="stack-sm">{l.activity.instructions.map((x, i) => <li key={i}>{unnum(x)}</li>)}</ol>
              {l.activity.answerKey?.length ? <details className="mt"><summary style={{ cursor: 'pointer' }}><Eye size={14} /> Gabarito (impresso em folha separada)</summary><ul className="bullets small mt">{l.activity.answerKey.map((x, i) => <li key={i}>{unnum(x)}</li>)}</ul></details> : null}
            </section>
          )}
        </div>

        <aside className="stack">
          <section className="panel stack-sm">
            <Link className="btn primary lg block" to={`/aulas/${l.id}/aplicar`}><Play /> Aplicar aula</Link>
            <div className="grid g2" style={{ gap: 8 }}>
              <Link className="btn outline" to={`/aulas/${l.id}/imprimir`}><Printer /> Imprimir kit</Link>
              {mine ? <Link className="btn outline" to={`/aulas/${l.id}/editar`}><Pencil /> Editar</Link> : <button className="btn outline" onClick={() => { const c = duplicateLesson(l, s.user.id); actions.saveLesson(c); nav(`/aulas/${c.id}/editar`); }}><Copy /> Adaptar</button>}
              <button className="btn outline" onClick={() => setAgenda(true)}><CalendarPlus /> Agendar</button>
              <button className="btn outline" onClick={() => download(`${l.title}.md`, lessonToMarkdown(l), 'text/markdown;charset=utf-8')}><Download /> Exportar</button>
            </div>
            {mine && (
              <>
                <label className="field mt"><span>Compartilhamento</span>
                  <select className="input" value={l.sharing ?? 'privado'} onChange={(e) => { actions.saveLesson({ ...l, sharing: e.target.value as Lesson['sharing'] }); toast('Compartilhamento atualizado'); }}>
                    <option value="privado">Privado (só eu)</option><option value="escola">Modelo para a escola (leitura)</option>
                  </select>
                </label>
                <span className="xs faint"><Lock size={11} /> Outros professores podem copiar, mas não editar o seu original.</span>
                <button className="btn sm ghost" onClick={() => download(`${l.title}.json`, JSON.stringify(l, null, 2), 'application/json')}>Exportar JSON (backup)</button>
                <button className="btn sm danger" onClick={() => { if (confirm('Excluir esta aula?')) { actions.deleteLesson(l.id); nav('/aulas'); } }}><Trash2 /> Excluir</button>
              </>
            )}
          </section>
          <section className="panel"><h3>Objetivos</h3><ul className="bullets small">{l.objectives.filter(Boolean).map((x, i) => <li key={i}>{x}</li>)}</ul></section>
          <section className="panel"><h3>Materiais</h3><ul className="bullets small">{l.materials.map((x, i) => <li key={i}>{x}</li>)}</ul></section>
          <section className="panel"><h3>Como observar a aprendizagem</h3><ul className="bullets small">{l.observeLearning.map((x, i) => <li key={i}>{x}</li>)}</ul></section>
          <section className="panel"><h3>Adaptações</h3><ul className="bullets small">{l.adaptations.map((x, i) => <li key={i}>{x}</li>)}</ul></section>
          {l.skills.length > 0 && <section className="panel"><h3>Habilidades trabalhadas</h3><ul className="bullets small">{l.skills.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <p className="xs faint mt">Códigos da BNCC não foram atribuídos automaticamente. Confira o alinhamento em basenacionalcomum.mec.gov.br.</p></section>}
        </aside>
      </div>

      <Modal open={agenda} onClose={() => setAgenda(false)} title="Agendar aula">
        <div className="stack">
          <label className="field"><span>Turma</span><select className="input" value={turmaId} onChange={(e) => setTurmaId(e.target.value)}>{s.turmas.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
          <div className="grid g2"><label className="field"><span>Data</span><input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label><label className="field"><span>Horário</span><input className="input" type="time" value={time} onChange={(e) => setTime(e.target.value)} /></label></div>
          <button className="btn primary" onClick={() => { actions.addAgenda({ id: uid('ag'), turmaId, lessonId: l.id, title: l.title, date, time }); setAgenda(false); toast('Aula adicionada à agenda'); }}>Adicionar à agenda</button>
        </div>
      </Modal>
    </div>
  );
}
