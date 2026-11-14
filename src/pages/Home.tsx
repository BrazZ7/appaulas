import { Link, useNavigate } from 'react-router-dom';
import {
  Accessibility, ArrowRight, Bookmark, CalendarDays, Captions, ChevronRight, Clock, Compass, Contrast, Gamepad2,
  Play, Plus, Sparkles, Type, Users, Volume2, NotebookPen, Pencil, Lightbulb,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Bar, Switch, minutes } from '../components/ui';
import { actions, useApp } from '../store/store';
import { LESSONS, PROJECTS, SUBJECTS, THEME_DATES, buildIndex, findLesson, IMMERSIONS } from '../content';

function upcomingDates(n: number) {
  const today = new Date();
  const md = (d: Date) => `${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const t = md(today);
  const sorted = [...THEME_DATES].sort((a, b) => a.date.localeCompare(b.date));
  const after = sorted.filter((d) => d.date >= t);
  return [...after, ...sorted.filter((d) => d.date < t)].slice(0, n);
}

function fmtDay(iso: string) {
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 864e5).toISOString().slice(0, 10);
  if (iso === today) return 'Hoje';
  if (iso === tomorrow) return 'Amanhã';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit' });
}

export default function Home() {
  const s = useApp();
  const nav = useNavigate();
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const today = new Date().toISOString().slice(0, 10);
  const agenda = s.agenda.filter((a) => a.date >= today).slice(0, 4);
  const next = agenda.find((a) => a.turmaId === s.activeTurmaId) ?? agenda[0];
  const nextLesson = next?.lessonId ? findLesson(next.lessonId, s.myLessons) : LESSONS.find((l) => next && l.title.toLowerCase().includes(next.title.toLowerCase().split(' ')[0]));

  // Continuidade: aula com progresso de aplicação mais recente, senão a última editada
  const progressEntries = Object.entries(s.applyProgress).sort((a, b) => b[1].updatedAt.localeCompare(a[1].updatedAt));
  const contLesson = progressEntries.length ? findLesson(progressEntries[0][0], s.myLessons) : s.myLessons[0];
  const contProg = contLesson && s.applyProgress[contLesson.id];
  const contPct = contLesson && contProg ? Math.round((contProg.done.length / contLesson.blocks.length) * 100) : 0;

  const index = buildIndex(s.myLessons);
  const favs = s.favorites.map((k) => index.find((e) => e.key === k)).filter(Boolean).slice(0, 5);
  const hour = new Date().getHours();
  const greet = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  const st = s.settings;

  return (
    <div className="split-wide">
      <div className="stack" style={{ gap: 20 }}>
        <div className="anim-in">
          <p className="muted" style={{ margin: 0, fontSize: '1.1rem' }}>👋 {greet}, professora {s.user.displayName}{turma ? ` · ${turma.name}` : ''}</p>
          <h1 style={{ margin: 0 }}>Sua próxima aula <span className="grad-text">começa aqui</span></h1>
        </div>

        <section className="hero anim-in" aria-label="Destaque">
          <Art id="hero-inicio" fill eager decorative />
          <div className="hero-content">
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem,3vw,2.6rem)', fontWeight: 700 }}>
              Uma aula.<br /><em className="grad-text">Muitas descobertas.</em>
            </h2>
            <p className="muted" style={{ margin: 0 }}>Escolha um tema, adapte para a turma e conduza com histórias, jogos e simulações.</p>
            <div className="row">
              <Link className="btn primary" to="/imersoes"><Compass /> Explorar imersões <ArrowRight /></Link>
              <Link className="btn violet" to="/aulas/nova"><Plus /> Criar aula</Link>
            </div>
          </div>
        </section>

        <nav aria-label="Matérias" className="row" style={{ gap: 10 }}>
          {SUBJECTS.filter((x) => x.status === 'disponivel').slice(0, 7).map((sub) => (
            <Link key={sub.id} to={`/materias/${sub.id}`} className="chip" style={{ borderColor: `${sub.color}88`, padding: '9px 16px', fontSize: '.95rem' }}>
              <span aria-hidden style={{ width: 9, height: 9, borderRadius: 3, background: sub.color }} /> {sub.name}
            </Link>
          ))}
          <Link to="/materias" className="chip">Todas <ChevronRight /></Link>
        </nav>

        <div className="grid g3">
          <Link to={contLesson ? (contProg ? `/aulas/${contLesson.id}/aplicar` : `/aulas/${contLesson.id}/editar`) : '/aulas/nova'} className="card-link panel" style={{ padding: 18 }}>
            <div className="row nowrap"><Play color="var(--cyan)" /><h3 style={{ margin: 0 }}>Continue sua aula</h3><ChevronRight style={{ marginLeft: 'auto' }} /></div>
            {contLesson ? (
              <>
                <p className="muted small" style={{ margin: '6px 0 10px' }}>{contLesson.title}</p>
                <div className="row nowrap"><div className="grow"><Bar value={contPct} label="Progresso da aula" /></div><span className="small num">{contPct}%</span></div>
                <span className="xs faint">{contProg ? `${contProg.done.length} de ${contLesson.blocks.length} etapas aplicadas` : 'Planejamento salvo — ainda não aplicado'}</span>
              </>
            ) : (
              <p className="muted small" style={{ margin: '6px 0 0' }}>Você ainda não tem aulas em andamento. Comece um planejamento — ele fica salvo neste navegador.</p>
            )}
          </Link>
          <Link to="/jogos" className="card-link panel" style={{ padding: 18 }}>
            <div className="row nowrap"><Users color="var(--violet-2)" /><h3 style={{ margin: 0 }}>Missão em equipe</h3><ChevronRight style={{ marginLeft: 'auto' }} /></div>
            <p className="muted small" style={{ margin: '6px 0 0' }}>Jogos cooperativos prontos, com equipes, rodadas e modo projetor — sem ranking individual.</p>
          </Link>
          <Link to="/calendario" className="card-link panel" style={{ padding: 18 }}>
            <div className="row nowrap"><CalendarDays color="var(--green)" /><h3 style={{ margin: 0 }}>Calendário temático</h3><ChevronRight style={{ marginLeft: 'auto' }} /></div>
            <p className="muted small" style={{ margin: '6px 0 0' }}>Próximo: <strong>{upcomingDates(1)[0]?.title}</strong> ({upcomingDates(1)[0]?.date.split('-').reverse().join('/')}).</p>
          </Link>
        </div>

        {next && (
          <section className="panel glow-violet" style={{ padding: 0, overflow: 'hidden' }} aria-label="Próxima aula">
            <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 300px) 1fr', gap: 0 }}>
              <Art id={nextLesson?.artId ?? 'imm-afro'} ratio={16 / 10} decorative className="desktop-only" />
              <div style={{ padding: 22 }} className="stack">
                <span className="badge"><CalendarDays size={14} /> Próxima aula · {fmtDay(next.date)} {next.time}</span>
                <h2 style={{ margin: 0 }}>{nextLesson?.title ?? next.title}</h2>
                <div className="row small muted">
                  {nextLesson && <span className="row" style={{ gap: 6 }}><Clock size={16} /> {minutes(nextLesson.durationMin)}</span>}
                  <span>{s.turmas.find((t) => t.id === next.turmaId)?.name}</span>
                </div>
                <div className="row">
                  {nextLesson ? (
                    <>
                      <Link className="btn primary" to={`/aulas/${nextLesson.id}/aplicar`}><Play /> Abrir aula</Link>
                      <Link className="btn outline" to={`/aulas/${nextLesson.id}`}><Pencil /> Ver plano</Link>
                    </>
                  ) : (
                    <Link className="btn primary" to="/calendario"><NotebookPen /> Vincular um plano</Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        <section aria-labelledby="atalhos">
          <h2 id="atalhos" className="sr-only">Atalhos</h2>
          <div className="grid g4">
            {[
              { to: '/aulas/nova', icon: Plus, label: 'Criar aula', sub: 'Blocos reorganizáveis' },
              { to: '/jogos', icon: Gamepad2, label: 'Iniciar jogo', sub: 'Sala de jogos' },
              { to: '/imersoes', icon: Compass, label: 'Abrir imersão', sub: 'Culturas e temas' },
              { to: '/historias', icon: Sparkles, label: 'Contar história', sub: 'Narrativas com escolhas' },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="list-item card-link" style={{ flexDirection: 'row', margin: 0 }}>
                <span className="icon-tile"><a.icon /></span>
                <span><strong>{a.label}</strong><br /><span className="xs muted">{a.sub}</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="sugestoes">
          <div className="row between"><h2 id="sugestoes">Sugestões temáticas</h2><Link to="/calendario" className="small">Ver calendário →</Link></div>
          <div className="grid g3">
            {upcomingDates(3).map((d) => (
              <article key={d.id} className="panel tight stack-sm">
                <span className="badge cyan" style={{ alignSelf: 'flex-start' }}>{d.date.split('-').reverse().join('/')}</span>
                <h3 style={{ margin: 0 }}>{d.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{d.description}</p>
                {d.suggestions[0] && <p className="xs" style={{ margin: 0 }}><Lightbulb size={13} /> {d.suggestions[0].label}</p>}
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="projetos">
          <h2 id="projetos">Projetos interdisciplinares</h2>
          {PROJECTS.map((p) => (
            <Link key={p.id} to={`/projetos/${p.id}`} className="card-link" style={{ flexDirection: 'row' }}>
              <Art id={p.artId} ratio={16 / 10} decorative style={{ width: 'min(260px, 38%)', flex: 'none' }} />
              <div className="card-body">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Missão interdisciplinar · {p.totalLessons} aulas</span>
                <h3>{p.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>{p.drivingQuestion}</p>
              </div>
            </Link>
          ))}
        </section>
      </div>

      <aside className="stack" style={{ gap: 18 }}>
        <section className="panel" aria-labelledby="agenda-t">
          <div className="panel-title"><CalendarDays /><h2 id="agenda-t" style={{ fontSize: '1.2rem' }}>Sua agenda</h2><Link to="/calendario" className="right small">Ver agenda →</Link></div>
          {agenda.length === 0 && <p className="muted small">Nada agendado. Adicione aulas pelo calendário.</p>}
          <ol className="clean stack-sm">
            {agenda.map((a, i) => (
              <li key={a.id} className={i === 0 ? 'panel tight glow' : 'list-item'} style={{ margin: 0, display: 'block' }}>
                <div className="xs" style={{ color: i === 0 ? 'var(--cyan)' : 'var(--muted)', fontWeight: 700 }}>{fmtDay(a.date)} · {a.time} · {s.turmas.find((t) => t.id === a.turmaId)?.name}</div>
                <div style={{ fontWeight: 700 }}>{a.title}</div>
              </li>
            ))}
          </ol>
        </section>

        <section className="panel" aria-labelledby="incl-t">
          <div className="panel-title"><Accessibility /><h2 id="incl-t" style={{ fontSize: '1.2rem' }}>Aprendizagem inclusiva</h2></div>
          <p className="small muted">Ajustes aplicados em todo o AulaViva, inclusive no modo projetor.</p>
          <div className="setting-row"><Type size={18} /><span>Fonte ampliada</span><Switch hideLabel label="Fonte ampliada" checked={st.fontScale > 1} onChange={(v) => actions.setSettings({ fontScale: v ? 1.15 : 1 })} /></div>
          <div className="setting-row"><Volume2 size={18} /><span>Texto simplificado</span><Switch hideLabel label="Texto simplificado" checked={st.readingLevel === 'simplificado'} onChange={(v) => actions.setSettings({ readingLevel: v ? 'simplificado' : 'padrao' })} /></div>
          <div className="setting-row"><Contrast size={18} /><span>Alto contraste</span><Switch hideLabel label="Alto contraste" checked={st.highContrast} onChange={(v) => actions.setSettings({ highContrast: v })} /></div>
          <div className="setting-row"><Captions size={18} /><span>Legendas em vídeos</span><Switch hideLabel label="Legendas em vídeos" checked={st.captions} onChange={(v) => actions.setSettings({ captions: v })} /></div>
          <Link to="/ajustes" className="small">Mais ajustes (movimento, modo simples) →</Link>
        </section>

        <section className="panel" aria-labelledby="fav-t">
          <div className="panel-title"><Bookmark /><h2 id="fav-t" style={{ fontSize: '1.2rem' }}>Favoritos</h2></div>
          {favs.length === 0 && <p className="small muted">Use o marcador nos cards para salvar aqui.</p>}
          <ul className="clean stack-sm">
            {favs.map((f) => f && (
              <li key={f.key}><button className="btn ghost sm block" style={{ justifyContent: 'flex-start' }} onClick={() => nav(f.path)}><span className="badge cyan">{f.kind}</span> {f.title}</button></li>
            ))}
          </ul>
        </section>

        {s.recent.length > 0 && (
          <section className="panel" aria-labelledby="rec-t">
            <div className="panel-title"><Clock /><h2 id="rec-t" style={{ fontSize: '1.2rem' }}>Abertos recentemente</h2></div>
            <ul className="clean stack-sm">
              {s.recent.slice(0, 5).map((r) => (
                <li key={r.key}><Link to={r.path} className="small">{r.kind} · {r.title}</Link></li>
              ))}
            </ul>
          </section>
        )}

        <section className="panel" aria-labelledby="imm-t">
          <div className="panel-title"><Compass /><h2 id="imm-t" style={{ fontSize: '1.2rem' }}>Imersões disponíveis</h2></div>
          <ul className="clean stack-sm">
            {IMMERSIONS.filter((i) => i.status === 'disponivel').map((i) => (
              <li key={i.id}><Link to={`/imersoes/${i.id}`}>{i.title}</Link> <span className="xs muted">· {i.theme}</span></li>
            ))}
          </ul>
        </section>
      </aside>
    </div>
  );
}
