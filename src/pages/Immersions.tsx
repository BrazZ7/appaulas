import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen, Check, ChevronLeft, ChevronRight, ClipboardList, Flag, Map, MessageCircle, Monitor, Play, Printer,
  Square, SquareCheck, Users, User, Volume2, VolumeX, Hammer, Library, Save,
} from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Notice, PageHead, Steps, Tabs, anosLabel, minutes, toast } from '../components/ui';
import { IMMERSIONS, SUBJECT_MAP } from '../content';
import { actions, useApp } from '../store/store';
import { speak, speechAvailable, stopSpeaking } from '../lib/speech';

export default function Immersions() {
  const themes = Array.from(new Set(IMMERSIONS.map((i) => i.theme)));
  const [theme, setTheme] = useState('');
  const shown = IMMERSIONS.filter((i) => !theme || i.theme === theme);
  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="hero" style={{ minHeight: 230 }}>
        <Art id="hero-imersoes" fill eager decorative />
        <div className="hero-content">
          <div className="kicker">Imersões culturais e temáticas</div>
          <h1>Histórias que nos conectam</h1>
          <p className="muted" style={{ margin: 0 }}>Experiências com narrativa, cenários, escolhas da turma e conversa — no projetor, em grupos ou sem nenhum dispositivo dos alunos.</p>
        </div>
      </section>
      <div className="row" role="group" aria-label="Filtrar por tema">
        <button className={`chip ${!theme ? 'on' : ''}`} aria-pressed={!theme} onClick={() => setTheme('')}>Todos os temas</button>
        {themes.map((t) => <button key={t} className={`chip ${theme === t ? 'on' : ''}`} aria-pressed={theme === t} onClick={() => setTheme(t)}>{t}</button>)}
      </div>
      <div className="grid auto-fill">
        {shown.map((i) => {
          const ready = i.status === 'disponivel';
          const body = (
            <>
              <Art id={i.artId} ratio={16 / 9} decorative />
              <div className="card-body">
                <div className="row between nowrap">
                  <span className={`badge ${ready ? 'cyan' : 'amber'}`}>{ready ? i.kicker || 'Imersão' : 'Em preparo'}</span>
                  {ready && <FavButton k={`imm:${i.id}`} title={i.title} />}
                </div>
                <h3>{i.title}</h3>
                <p className="small muted" style={{ margin: 0 }}>“{i.openingQuestion}”</p>
                <div className="xs muted" style={{ marginTop: 'auto' }}>{i.theme}{ready ? ` · ${minutes(i.durationMin)} · ${anosLabel(i.anos)}` : ''}</div>
              </div>
            </>
          );
          return ready ? (
            <Link key={i.id} to={`/imersoes/${i.id}`} className="card-link">{body}</Link>
          ) : (
            <div key={i.id} className="card-link card-disabled" aria-label={`${i.title} — em preparo`}>{body}</div>
          );
        })}
      </div>
    </div>
  );
}

type ScriptTab = 'antes' | 'durante' | 'depois';

export function ImmersionPage() {
  const { id } = useParams();
  const s = useApp();
  const imm = IMMERSIONS.find((i) => i.id === id);
  const prog = (imm && s.immersions[imm.id]) || { chapter: -1, choices: {}, checklist: {}, notes: '' };
  const [tab, setTab] = useState<ScriptTab>('antes');
  const [reading, setReading] = useState(false);
  const [paraIdx, setParaIdx] = useState(0);
  const level = s.settings.readingLevel;
  useEffect(() => { if (imm) actions.visit({ key: `imm:${imm.id}`, title: imm.title, path: `/imersoes/${imm.id}`, kind: 'Imersão' }); }, [imm]);
  useEffect(() => () => stopSpeaking(), []);
  useEffect(() => setParaIdx(0), [prog.chapter]);

  if (!imm) return <div className="empty">Imersão não encontrada. <Link to="/imersoes">Voltar</Link></div>;
  if (imm.status !== 'disponivel') return <div className="empty"><h2>{imm.title}</h2><p>Esta imersão está em preparo.</p><Link to="/imersoes" className="btn">Ver imersões disponíveis</Link></div>;

  const ch = prog.chapter >= 0 ? imm.chapters[prog.chapter] : null;
  const setChapter = (n: number) => { stopSpeaking(); setReading(false); actions.setImmersion(imm.id, { chapter: n }); };
  const paragraphs = ch ? (level === 'simplificado' ? ch.paragraphs.slice(0, paraIdx + 1) : ch.paragraphs) : [];
  const readAloud = () => {
    if (reading) { stopSpeaking(); setReading(false); return; }
    const text = ch ? `${ch.title}. ${ch.paragraphs.join(' ')}` : `${imm.openingQuestion} ${imm.summary}`;
    if (speak(text, () => setReading(false))) setReading(true);
  };
  const checkKey = (t: ScriptTab, i: number) => `${t}-${i}`;

  return (
    <div className="stack has-print" style={{ gap: 18 }}>
      <PageHead
        kicker={`${imm.kicker || 'Imersão'} · ${imm.theme}`}
        title={imm.title}
        sub={<>{imm.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')} · {anosLabel(imm.anos)} · {minutes(imm.durationMin)}</>}
        actions={<><FavButton k={`imm:${imm.id}`} title={imm.title} /><Link to="/imersoes" className="btn ghost sm"><ChevronLeft /> Imersões</Link></>}
      />

      <div className="split">
        <div className="stack">
          <section className="panel" style={{ padding: 0, overflow: 'hidden', position: 'relative' }} aria-label="Cena da imersão">
            <Art key={ch?.artId ?? imm.artId} id={ch?.artId ?? imm.artId} ratio={16 / 8} eager sizes="(max-width: 760px) 85vw, 900px" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,10,34,.75) 0%, rgba(6,10,34,0) 40%, rgba(6,10,34,.9) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 20, left: 24, right: 24 }}>
              <h2 style={{ fontSize: 'clamp(1.3rem,2.4vw,2.2rem)', margin: 0 }}>{ch ? ch.title : imm.title}</h2>
              <p style={{ maxWidth: 520, margin: '6px 0 0' }}>{ch ? `Capítulo ${prog.chapter + 1} de ${imm.chapters.length}` : imm.summary}</p>
            </div>
            <div className="panel tight" style={{ position: 'absolute', left: 16, right: 16, bottom: 16, background: 'rgba(10,14,46,.85)' }}>
              <div className="row nowrap" style={{ alignItems: 'flex-start' }}>
                <span className="row small desktop-only" style={{ gap: 6, flex: 'none', paddingTop: 2 }}><Map size={18} /> Mapa da história</span>
                <div className="grow"><Steps items={imm.chapters.map((c, i) => `${i + 1}. ${c.title.replace(/^\s*\d+[.)]\s*/, '')}`)} current={prog.chapter} /></div>
                <Flag className="desktop-only" color="var(--violet-2)" />
              </div>
            </div>
          </section>

          <div className="row">
            {prog.chapter < 0 ? (
              <button className="btn primary lg" onClick={() => setChapter(0)}><Play /> Iniciar imersão</button>
            ) : (
              <>
                <button className="btn" onClick={() => setChapter(prog.chapter - 1)} disabled={prog.chapter < 0}><ChevronLeft /> {prog.chapter === 0 ? 'Abertura' : 'Anterior'}</button>
                <button className="btn primary" onClick={() => setChapter(Math.min(prog.chapter + 1, imm.chapters.length))} disabled={prog.chapter >= imm.chapters.length}>{prog.chapter === imm.chapters.length - 1 ? 'Conversa final' : 'Próximo capítulo'} <ChevronRight /></button>
              </>
            )}
            <button className="btn outline" onClick={() => actions.setSettings({ projector: true })}><Monitor /> Modo projetor</button>
            {speechAvailable() && <button className="btn outline" onClick={readAloud} aria-pressed={reading}>{reading ? <VolumeX /> : <Volume2 />} {reading ? 'Parar leitura' : 'Ler em voz alta'}</button>}
            <label className="row small" style={{ gap: 8 }}>
              <BookOpen size={18} /> Apresentação do texto
              <select className="input" style={{ width: 'auto' }} value={level} onChange={(e) => actions.setSettings({ readingLevel: e.target.value as typeof level })}>
                <option value="padrao">Padrão</option>
                <option value="simplificado">Um parágrafo por vez</option>
                <option value="ampliado">Texto ampliado</option>
              </select>
            </label>
          </div>

          {prog.chapter < 0 && (
            <section className="panel stack">
              <div className="kicker violet">Pergunta de abertura</div>
              <h2 style={{ fontSize: 'clamp(1.4rem,2.2vw,2rem)' }}>{imm.openingQuestion}</h2>
              <div className={`prose ${level === 'ampliado' ? 'prose-lg' : ''}`}>{imm.context.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div className="grid g2">
                <div><h3>Diversidade interna</h3><ul className="bullets small">{imm.diversity.map((d, i) => <li key={i}>{d}</li>)}</ul></div>
                <div><h3>Protagonismo hoje</h3><ul className="bullets small">{imm.contemporary.map((d, i) => <li key={i}>{d}</li>)}</ul></div>
              </div>
            </section>
          )}

          {ch && (
            <section className="panel stack anim-in" key={ch.id} aria-live="polite">
              <div className={`prose ${level === 'ampliado' ? 'prose-lg' : ''}`} style={level === 'ampliado' ? { fontSize: '1.3rem' } : undefined}>
                {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {level === 'simplificado' && paraIdx < ch.paragraphs.length - 1 && (
                <button className="btn sm" style={{ alignSelf: 'flex-start' }} onClick={() => setParaIdx(paraIdx + 1)}>Continuar lendo <ChevronRight /></button>
              )}
              <div>
                <h3>Pontos para explorar</h3>
                <ul className="bullets">{ch.explore.map((e, i) => <li key={i}>{e}</li>)}</ul>
              </div>
              {ch.classChoice && (
                <div className="panel tight glow-violet stack-sm">
                  <div className="kicker violet">Escolha da turma</div>
                  <strong>{ch.classChoice.prompt}</strong>
                  <div className="row">
                    {ch.classChoice.options.map((o, i) => (
                      <button key={i} className={`btn ${prog.choices[ch.id] === i ? 'primary' : 'outline'}`} aria-pressed={prog.choices[ch.id] === i} onClick={() => actions.setImmersion(imm.id, { choices: { ...prog.choices, [ch.id]: i } })}>
                        {o.label}
                      </button>
                    ))}
                  </div>
                  {prog.choices[ch.id] !== undefined && <div className="feedback ok">{ch.classChoice.options[prog.choices[ch.id]].outcome}</div>}
                </div>
              )}
            </section>
          )}

          {prog.chapter >= imm.chapters.length && (
            <section className="panel stack anim-in">
              <div className="kicker violet">Conversa final</div>
              <ol className="stack-sm" style={{ fontSize: '1.15rem' }}>{imm.finalConversation.map((q, i) => <li key={i}>{q}</li>)}</ol>
              <Notice kind="info">Registre falas importantes da turma nas anotações ao lado — elas podem ir para o portfólio.</Notice>
            </section>
          )}

          <div className="grid g3">
            <section className="panel stack-sm">
              <div className="panel-title"><Hammer /><h3>Atividade prática</h3></div>
              <strong>{imm.practicalActivity.title}</strong>
              <p className="xs muted" style={{ margin: 0 }}>Materiais: {imm.practicalActivity.materials.join(', ')}</p>
              <ol className="small" style={{ paddingLeft: 18, margin: 0 }}>{imm.practicalActivity.steps.map((st, i) => <li key={i}>{st}</li>)}</ol>
            </section>
            <section className="panel stack-sm">
              <div className="panel-title"><Users /><h3>Desafios</h3></div>
              <span className="label"><User size={13} /> Individuais</span>
              <ul className="bullets small">{imm.challenges.individual.map((c, i) => <li key={i}>{c}</li>)}</ul>
              <span className="label"><Users size={13} /> Coletivos</span>
              <ul className="bullets small">{imm.challenges.coletivo.map((c, i) => <li key={i}>{c}</li>)}</ul>
            </section>
            <section className="panel stack-sm">
              <div className="panel-title"><Printer /><h3>Material imprimível</h3></div>
              <strong>{imm.printable.title}</strong>
              <ul className="bullets small">{imm.printable.items.slice(0, 4).map((c, i) => <li key={i}>{c}</li>)}</ul>
              <button className="btn sm" onClick={() => window.print()}><Printer /> Imprimir roteiro</button>
            </section>
          </div>

          <section className="panel">
            <div className="panel-title"><Library /><h3>Referências e orientações pedagógicas</h3></div>
            <div className="grid g2">
              <ul className="bullets small">{imm.references.map((r, i) => <li key={i}>{r.url ? <a href={r.url} target="_blank" rel="noreferrer">{r.label}</a> : r.label}{r.note ? <span className="muted"> — {r.note}</span> : null}</li>)}</ul>
              <ul className="bullets small">{imm.pedagogicalNotes.map((n, i) => <li key={i}>{n}</li>)}</ul>
            </div>
          </section>
        </div>

        <aside className="stack">
          <section className="panel">
            <div className="panel-title"><ClipboardList /><h2 style={{ fontSize: '1.25rem' }}>Roteiro do professor</h2></div>
            <Tabs<ScriptTab> label="Momento" value={tab} onChange={setTab} items={[{ id: 'antes', label: 'Antes' }, { id: 'durante', label: 'Durante' }, { id: 'depois', label: 'Depois' }]} />
            <ul className="clean stack-sm mt">
              {imm.teacherScript[tab].map((item, i) => {
                const k = checkKey(tab, i);
                const on = !!prog.checklist[k];
                return (
                  <li key={k}>
                    <button className="row nowrap btn ghost block" style={{ justifyContent: 'flex-start', textAlign: 'left', whiteSpace: 'normal', fontWeight: 500, fontFamily: 'var(--font-body)' }} aria-pressed={on} onClick={() => actions.setImmersion(imm.id, { checklist: { ...prog.checklist, [k]: !on } })}>
                      {on ? <SquareCheck color="var(--cyan)" /> : <Square />} <span style={on ? { textDecoration: 'line-through', opacity: 0.7 } : undefined}>{item}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
          <section className="panel glow-violet">
            <div className="row" style={{ color: 'var(--cyan)', fontWeight: 700 }}><MessageCircle /> Pergunta para conversar</div>
            <p style={{ fontFamily: 'var(--font-head)', fontSize: '1.45rem', fontWeight: 600, margin: '10px 0 0' }}>{imm.openingQuestion}</p>
          </section>
          <section className="panel stack-sm">
            <label className="field">
              <span>Anotações da aplicação</span>
              <textarea className="input" rows={5} value={prog.notes} onChange={(e) => actions.setImmersion(imm.id, { notes: e.target.value })} placeholder="Falas da turma, dúvidas, ideias para a próxima aula…" />
            </label>
            <button className="btn sm" disabled={!prog.notes.trim()} onClick={() => {
              actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: 'registro', title: `Registro — ${imm.title}`, content: prog.notes, sourceRef: { type: 'immersion', id: imm.id } });
              toast('Registro salvo no portfólio da turma');
            }}><Save /> Salvar no portfólio</button>
            <span className="xs faint"><Check size={12} /> Anotações e checklist salvos automaticamente neste navegador.</span>
          </section>
        </aside>
      </div>

      <div className="print-only print-doc">
        <h1>{imm.title}</h1>
        <p><strong>Pergunta de abertura:</strong> {imm.openingQuestion}</p>
        <h2>{imm.printable.title}</h2>
        <ol>{imm.printable.items.map((c, i) => <li key={i}>{c}</li>)}</ol>
        <h2>Atividade prática — {imm.practicalActivity.title}</h2>
        <ol>{imm.practicalActivity.steps.map((c, i) => <li key={i}>{c}</li>)}</ol>
        <h2>Conversa final</h2>
        <ol>{imm.finalConversation.map((c, i) => <li key={i}>{c}</li>)}</ol>
      </div>
    </div>
  );
}
