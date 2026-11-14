import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronLeft, ChevronRight, Lightbulb, Plus, Trash2 } from 'lucide-react';
import { Modal, PageHead, toast } from '../components/ui';
import { LESSONS, THEME_DATES, findLesson, refPath } from '../content';
import { actions, uid, useApp } from '../store/store';

const MONTHS = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function Calendar() {
  const s = useApp();
  const today = new Date();
  const [ym, setYm] = useState({ y: today.getFullYear(), m: today.getMonth() });
  const [sel, setSel] = useState(iso(today));
  const [add, setAdd] = useState(false);
  const [form, setForm] = useState({ title: '', lessonId: '', time: '08:00', turmaId: s.activeTurmaId });
  const first = new Date(ym.y, ym.m, 1);
  const startPad = first.getDay();
  const days = new Date(ym.y, ym.m + 1, 0).getDate();
  const cells = Array.from({ length: startPad + days }, (_, i) => (i < startPad ? null : new Date(ym.y, ym.m, i - startPad + 1)));
  const themeFor = (d: string) => THEME_DATES.filter((t) => t.date === d.slice(5));
  const agendaFor = (d: string) => s.agenda.filter((a) => a.date === d);
  const lessons = [...s.myLessons, ...LESSONS];
  const shift = (n: number) => { const d = new Date(ym.y, ym.m + n, 1); setYm({ y: d.getFullYear(), m: d.getMonth() }); };
  const upcoming = THEME_DATES.filter((t) => t.date.slice(0, 2) === String(ym.m + 1).padStart(2, '0') || t.date.slice(0, 2) === String(((ym.m + 1) % 12) + 1).padStart(2, '0'));

  return (
    <div className="stack">
      <PageHead kicker="Calendário temático" title="Planejamento antecipado" sub="Datas do calendário escolar com sugestões de aulas, e a sua agenda por turma." />
      <div className="split">
        <section className="panel">
          <div className="row between mb">
            <button className="btn icon ghost" onClick={() => shift(-1)} aria-label="Mês anterior"><ChevronLeft /></button>
            <h2 style={{ margin: 0, textTransform: 'capitalize' }}>{MONTHS[ym.m]} {ym.y}</h2>
            <button className="btn icon ghost" onClick={() => shift(1)} aria-label="Próximo mês"><ChevronRight /></button>
          </div>
          <div role="grid" aria-label="Calendário" className="keep-cols" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map((d) => <div key={d} className="xs muted center" role="columnheader">{d}</div>)}
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const k = iso(d);
              const th = themeFor(k);
              const ag = agendaFor(k);
              const isSel = k === sel;
              return (
                <button key={i} role="gridcell" aria-selected={isSel} aria-label={`${d.getDate()} de ${MONTHS[d.getMonth()]}${th.length ? `, ${th.map((t) => t.title).join(', ')}` : ''}${ag.length ? `, ${ag.length} aula(s)` : ''}`}
                  onClick={() => setSel(k)} className="panel tight" style={{ minHeight: 74, padding: 6, textAlign: 'left', cursor: 'pointer', color: 'var(--text)', borderColor: isSel ? 'var(--cyan)' : k === iso(today) ? 'var(--violet-2)' : undefined, display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span className="small" style={{ fontWeight: 800 }}>{d.getDate()}</span>
                  {th.slice(0, 1).map((t) => <span key={t.id} className="xs" style={{ color: 'var(--amber)', lineHeight: 1.15 }}>★ <span className="desktop-only">{t.title}</span></span>)}
                  {ag.length > 0 && <span className="xs" style={{ color: 'var(--cyan)' }}>● {ag.length} <span className="desktop-only">aula(s)</span></span>}
                </button>
              );
            })}
          </div>
        </section>
        <aside className="stack">
          <section className="panel stack-sm">
            <div className="panel-title"><CalendarDays /><h3 style={{ margin: 0 }}>{new Date(sel + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</h3></div>
            {themeFor(sel).map((t) => (
              <div key={t.id} className="panel tight" style={{ borderColor: 'var(--amber)' }}>
                <strong>★ {t.title}</strong><p className="small" style={{ margin: '4px 0' }}>{t.description}</p>
                <ul className="clean stack-sm">{t.suggestions.map((sg, i) => <li key={i} className="small"><Lightbulb size={13} /> {sg.ref ? <Link to={refPath(sg.ref)}>{sg.label}</Link> : sg.label}</li>)}</ul>
              </div>
            ))}
            {agendaFor(sel).length === 0 && <p className="small muted">Nenhuma aula agendada.</p>}
            {agendaFor(sel).map((a) => {
              const l = a.lessonId ? findLesson(a.lessonId, s.myLessons) : undefined;
              return (
                <div key={a.id} className="list-item" style={{ margin: 0 }}>
                  <span className="badge cyan">{a.time}</span>
                  <span className="grow small"><strong>{a.title}</strong><br /><span className="muted">{s.turmas.find((t) => t.id === a.turmaId)?.name}</span>{l && <><br /><Link to={`/aulas/${l.id}/aplicar`}>Abrir aula</Link></>}</span>
                  <button className="btn icon ghost" aria-label="Remover da agenda" onClick={() => actions.removeAgenda(a.id)}><Trash2 size={15} /></button>
                </div>
              );
            })}
            <button className="btn primary" onClick={() => setAdd(true)}><Plus /> Agendar neste dia</button>
          </section>
          <section className="panel">
            <h3>Próximas datas temáticas</h3>
            <ul className="clean stack-sm">{upcoming.map((t) => <li key={t.id} className="small"><span className="badge amber">{t.date.split('-').reverse().join('/')}</span> {t.title}</li>)}</ul>
            {upcoming.length === 0 && <p className="small muted">Sem datas cadastradas neste período.</p>}
          </section>
        </aside>
      </div>
      <Modal open={add} onClose={() => setAdd(false)} title="Agendar aula">
        <div className="stack">
          <label className="field"><span>Aula do planejador (opcional)</span><select className="input" value={form.lessonId} onChange={(e) => setForm({ ...form, lessonId: e.target.value, title: lessons.find((l) => l.id === e.target.value)?.title ?? form.title })}><option value="">— Sem plano vinculado —</option>{lessons.map((l) => <option key={l.id} value={l.id}>{l.title}</option>)}</select></label>
          <label className="field"><span>Título</span><input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
          <div className="grid g2">
            <label className="field"><span>Turma</span><select className="input" value={form.turmaId} onChange={(e) => setForm({ ...form, turmaId: e.target.value })}>{s.turmas.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
            <label className="field"><span>Horário</span><input className="input" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
          </div>
          <button className="btn primary" disabled={!form.title.trim()} onClick={() => { actions.addAgenda({ id: uid('ag'), turmaId: form.turmaId, lessonId: form.lessonId || undefined, title: form.title.trim(), date: sel, time: form.time }); setAdd(false); setForm({ ...form, title: '', lessonId: '' }); toast('Aula agendada'); }}>Agendar</button>
        </div>
      </Modal>
    </div>
  );
}
