import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  BookOpen, ChevronLeft, Download, Drama, Lightbulb, Lock, MessageCircle, Monitor, Pencil, RotateCcw, Search, Sparkles,
  Undo2, Volume2, VolumeX, FlaskConical, Palette, Users,
} from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Modal, Notice, PageHead, Tabs, anosLabel, minutes, toast } from '../components/ui';
import { STORIES, SUBJECT_MAP } from '../content';
import { actions, useApp } from '../store/store';
import { choicesFor, choose, describeCondition, sceneDepths, startRun, undo, visibleParagraphs } from '../engine/story';
import { speak, speechAvailable, stopSpeaking } from '../lib/speech';
import type { Production } from '../types/models';

export default function Stories() {
  return (
    <div className="stack">
      <PageHead kicker="Histórias interativas" title="Narrativas com escolhas" sub="O professor lê ou projeta; a turma decide os caminhos. Cada escolha muda a história de forma perceptível — e pode virar escrita, teatro ou desenho." />
      <div className="grid auto-fill">
        {STORIES.map((st) => (
          <Link key={st.id} to={`/historias/${st.id}`} className="card-link">
            <Art id={st.artId} ratio={16 / 9} decorative />
            <div className="card-body">
              <div className="row between nowrap"><span className="badge cyan">{st.subjects.map((x) => SUBJECT_MAP[x]?.name).join(' · ')}</span><FavButton k={`story:${st.id}`} title={st.title} /></div>
              <h3>{st.title}</h3>
              <p className="small muted" style={{ margin: 0 }}>{st.subtitle}</p>
              <p className="small" style={{ margin: 0 }}>{st.summary}</p>
              <div className="xs muted" style={{ marginTop: 'auto' }}>{minutes(st.durationMin)} · {anosLabel(st.anos)} · {Object.values(st.scenes).filter((x) => x.ending).length} finais possíveis</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

type LabTab = 'leitura' | 'escrita' | 'teatro';
const ICONS = [Search, Users, Map2, Lightbulb];
function Map2(props: React.SVGProps<SVGSVGElement>) { return <BookOpen {...(props as object)} />; }

export function StoryPlayer() {
  const { id } = useParams();
  const s = useApp();
  const story = STORIES.find((x) => x.id === id);
  const [tab, setTab] = useState<LabTab>('leitura');
  const [reading, setReading] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const [hypo, setHypo] = useState('');
  const [draft, setDraft] = useState('');
  const [draftKind, setDraftKind] = useState<Production['kind']>('final-alternativo');
  const [showPath, setShowPath] = useState(false);
  const depths = useMemo(() => (story ? sceneDepths(story) : {}), [story]);
  useEffect(() => { if (story) actions.visit({ key: `story:${story.id}`, title: story.title, path: `/historias/${story.id}`, kind: 'História' }); }, [story]);
  useEffect(() => () => stopSpeaking(), []);
  if (!story) return <div className="empty">História não encontrada. <Link to="/historias">Voltar</Link></div>;

  const run = s.storyRuns[story.id] ?? startRun(story);
  const scene = story.scenes[run.sceneId];
  const paragraphs = visibleParagraphs(scene, run);
  const choices = choicesFor(scene, run);
  const speaker = story.characters.find((c) => c.id === scene.speakerId);
  const maxDepth = Math.max(...Object.values(depths));
  const curDepth = depths[scene.id] ?? 0;
  const chapterLabels = ['O encontro', 'A pista', 'Os caminhos', 'O final possível'];
  const chapter = scene.ending ? 3 : Math.min(2, Math.floor((curDepth / Math.max(1, maxDepth)) * 3));
  const prods = s.productions.filter((p) => p.sourceRef?.type === 'story' && p.sourceRef.id === story.id);
  const count = (k: Production['kind']) => prods.filter((p) => p.kind === k).length + (k === 'hipotese' ? run.hypotheses.length : 0);

  const doChoose = (choiceId: string) => {
    stopSpeaking(); setReading(false);
    const c = scene.choices.find((x) => x.id === choiceId)!;
    actions.saveStoryRun(choose(story, run, choiceId), story.id);
    setLast(c.consequence);
  };
  const restart = () => { stopSpeaking(); setLast(null); actions.saveStoryRun(null, story.id); };
  const read = () => {
    if (reading) { stopSpeaking(); setReading(false); return; }
    if (speak(`${scene.title}. ${paragraphs.join(' ')}`, () => setReading(false))) setReading(true);
  };
  const saveHypothesis = () => {
    if (!hypo.trim()) return;
    actions.saveStoryRun({ ...run, hypotheses: [...run.hypotheses, { sceneId: scene.id, text: hypo.trim() }] }, story.id);
    setHypo('');
    toast('Hipótese registrada');
  };
  const saveDraft = () => {
    actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: draftKind, title: `${story.title} — ${draftKind === 'final-alternativo' ? 'final alternativo' : draftKind}`, content: draft, sourceRef: { type: 'story', id: story.id } });
    setDraft('');
    toast('Produção salva no portfólio');
  };
  const saveClassProduction = () => {
    const content = [
      `Caminho percorrido:`, ...run.path.map((p, i) => `${i + 1}. ${p.label} → ${p.consequence}`),
      scene.ending ? `Final: ${scene.ending.title}` : `Parou em: ${scene.title}`,
      run.hypotheses.length ? `\nHipóteses da turma:\n${run.hypotheses.map((h) => `• ${h.text}`).join('\n')}` : '',
    ].join('\n');
    actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: 'registro', title: `${story.title} — percurso da turma`, content, sourceRef: { type: 'story', id: story.id } });
    toast('Percurso salvo no portfólio da turma');
  };

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row between">
        <div>
          <div className="kicker violet">{story.subjects.map((x) => SUBJECT_MAP[x]?.name).join(' e ')} · história imersiva</div>
          <h1 style={{ margin: 0 }}><Sparkles color="var(--violet-2)" /> {story.title}</h1>
        </div>
        <div className="row">
          <Link to="/historias" className="btn ghost sm"><ChevronLeft /> Histórias</Link>
          <button className="btn outline sm" onClick={() => actions.setSettings({ projector: true })}><Monitor /> Projetar</button>
        </div>
      </div>

      <div className="split">
        <div className="stack">
          <section className="panel" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
            <Art id={scene.artId ?? story.artId} ratio={16 / 8} eager />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(6,10,34,0) 45%, rgba(6,10,34,.92))', pointerEvents: 'none' }} />
            <h2 style={{ position: 'absolute', left: 24, bottom: 14, right: 24, fontSize: 'clamp(1.4rem,2.6vw,2.3rem)', margin: 0, textShadow: '0 2px 14px #000' }}>{scene.title}</h2>
          </section>

          {last && <div className="feedback ok" role="status"><strong>Consequência:</strong> {last}</div>}

          <section className="panel stack anim-in" key={scene.id} aria-live="polite">
            {speaker && <span className="badge" style={{ alignSelf: 'flex-start', background: `${speaker.color}33`, borderColor: speaker.color }}>{speaker.name}</span>}
            <div className="prose prose-lg" style={s.settings.readingLevel === 'ampliado' ? { fontSize: '1.35rem' } : undefined}>
              {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            {scene.pauseQuestion && (
              <div className="panel tight row nowrap" style={{ borderColor: 'rgba(176,124,255,.5)' }}>
                <MessageCircle color="var(--violet-2)" style={{ flex: 'none' }} />
                <div><span className="xs kicker violet">Pausa para conversar</span><div style={{ fontWeight: 700 }}>{scene.pauseQuestion}</div></div>
              </div>
            )}
            {scene.ending ? (
              <div className="panel glow stack-sm">
                <span className="badge cyan" style={{ alignSelf: 'flex-start' }}>Final {scene.ending.tone}</span>
                <h3 style={{ fontSize: '1.4rem' }}>{scene.ending.title}</h3>
                <p style={{ margin: 0 }}>{scene.ending.reflection}</p>
                <div className="row">
                  <button className="btn primary" onClick={restart}><RotateCcw /> Recomeçar e buscar outro final</button>
                  <button className="btn" onClick={() => setTab('escrita')}><Pencil /> Criar outro final</button>
                </div>
              </div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))` }}>
                {choices.map(({ choice, locked }, i) => {
                  const Icon = ICONS[i % ICONS.length];
                  return (
                    <button key={choice.id} className={`btn lg ${i % 2 ? 'outline' : 'outline-cyan'}`} style={{ whiteSpace: 'normal', textAlign: 'left', justifyContent: 'flex-start' }} disabled={locked} onClick={() => doChoose(choice.id)} title={locked && choice.requires ? describeCondition(choice.requires, story) : undefined}>
                      {locked ? <Lock /> : <Icon />}
                      <span>{choice.label}{locked && choice.requires && <span className="xs" style={{ display: 'block', fontWeight: 500 }}>{describeCondition(choice.requires, story)}</span>}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="panel" aria-label="Progresso e contribuições">
            <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,1fr) auto', gap: 20, alignItems: 'center' }}>
              <div>
                <div className="row small" style={{ fontWeight: 700, marginBottom: 10 }}><BookOpen size={18} /> Progresso da história</div>
                <ol className="steps clean" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {chapterLabels.map((l, i) => (
                    <li key={l} className={`step ${i < chapter ? 'done' : i === chapter ? 'current' : ''}`}><span className="dot" />Cap. {i + 1}<br />{l}</li>
                  ))}
                </ol>
              </div>
              <div>
                <div className="row small" style={{ fontWeight: 700, marginBottom: 10 }}><Users size={18} /> Contribuições da turma <span className="badge">{count('hipotese') + count('final-alternativo') + count('teatro') + count('desenho')}</span></div>
                <div className="row" style={{ gap: 8 }}>
                  <span className="chip"><MessageCircle /> {count('hipotese')} hipóteses</span>
                  <span className="chip"><Pencil /> {count('final-alternativo')} finais</span>
                  <span className="chip"><Drama /> {count('teatro')} cenas</span>
                </div>
              </div>
              <button className="btn primary" onClick={saveClassProduction}><Download /> Salvar produção da turma</button>
            </div>
          </section>
        </div>

        <aside className="panel stack">
          <div className="panel-title"><FlaskConical /><h2 style={{ fontSize: '1.3rem' }}>Laboratório de narrativas</h2></div>
          <Tabs<LabTab> label="Ferramentas" value={tab} onChange={setTab} items={[
            { id: 'leitura', label: 'Leitura', icon: <BookOpen size={16} /> },
            { id: 'escrita', label: 'Escrita', icon: <Pencil size={16} /> },
            { id: 'teatro', label: 'Teatro', icon: <Drama size={16} /> },
          ]} />
          {tab === 'leitura' && (
            <div className="stack-sm">
              {speechAvailable() ? (
                <button className="btn outline-cyan block" onClick={read} aria-pressed={reading}>{reading ? <VolumeX /> : <Volume2 />} {reading ? 'Parar narração' : 'Escutar narração'}</button>
              ) : <Notice>Este navegador não oferece leitura em voz alta.</Notice>}
              <div className="panel tight">
                <span className="label">Estado da história</span>
                <ul className="clean stack-sm mt" style={{ marginTop: 8 }}>
                  {story.stats.map((st) => (
                    <li key={st.id} className="row between"><span>{st.label}</span><strong className="num">{run.stats[st.id]}</strong></li>
                  ))}
                </ul>
                <span className="xs faint">Valores mudam com as escolhas e liberam (ou bloqueiam) caminhos.</span>
              </div>
              <label className="field">
                <span><Lightbulb size={14} /> Trabalhar inferência — hipótese da turma</span>
                <textarea className="input" rows={3} value={hypo} onChange={(e) => setHypo(e.target.value)} placeholder={scene.hypothesisPrompt ?? 'O que vocês acham que vai acontecer? Por quê?'} />
              </label>
              <button className="btn sm" onClick={saveHypothesis} disabled={!hypo.trim()}>Registrar hipótese</button>
              {run.hypotheses.length > 0 && (
                <ul className="bullets small">{run.hypotheses.map((h, i) => <li key={i}>{h.text} <span className="faint xs">({story.scenes[h.sceneId]?.title})</span></li>)}</ul>
              )}
              <div className="row">
                <button className="btn ghost sm" onClick={() => { actions.saveStoryRun(undo(story, run), story.id); setLast(null); }} disabled={!run.path.length}><Undo2 /> Voltar uma escolha</button>
                <button className="btn ghost sm" onClick={() => setShowPath(true)} disabled={!run.path.length}>Ver caminho</button>
                <button className="btn ghost sm" onClick={restart}><RotateCcw /> Recomeçar</button>
              </div>
            </div>
          )}
          {tab === 'escrita' && (
            <div className="stack-sm">
              <p className="small muted">{story.followUps.escrita}</p>
              <label className="field">
                <span>Tipo de produção</span>
                <select className="input" value={draftKind} onChange={(e) => setDraftKind(e.target.value as Production['kind'])}>
                  <option value="final-alternativo">Final alternativo</option>
                  <option value="texto">Texto livre / continuação</option>
                </select>
              </label>
              <textarea className="input" rows={8} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Escrevam aqui, coletivamente ou por grupo…" aria-label="Texto da produção" />
              <button className="btn primary" disabled={!draft.trim()} onClick={saveDraft}><Pencil /> Criar outro final</button>
            </div>
          )}
          {tab === 'teatro' && (
            <div className="stack-sm">
              <h3><Drama size={18} /> Do texto à cena</h3>
              <p className="small">{story.followUps.teatro}</p>
              <h3><Palette size={18} /> Desenho</h3>
              <p className="small">{story.followUps.desenho}</p>
              <label className="field"><span>Registro da apresentação</span>
                <textarea className="input" rows={4} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Quem participou, que cena foi encenada, o que a turma percebeu…" />
              </label>
              <div className="row">
                <button className="btn sm" disabled={!draft.trim()} onClick={() => { setDraftKind('teatro'); actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: 'teatro', title: `${story.title} — cena`, content: draft, sourceRef: { type: 'story', id: story.id } }); setDraft(''); toast('Cena registrada'); }}>Registrar cena</button>
                <button className="btn sm" disabled={!draft.trim()} onClick={() => { actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: 'desenho', title: `${story.title} — desenho`, content: draft, sourceRef: { type: 'story', id: story.id } }); setDraft(''); toast('Desenho registrado'); }}>Registrar desenho</button>
              </div>
            </div>
          )}
          <hr className="sep" />
          <details>
            <summary className="small" style={{ cursor: 'pointer', fontWeight: 700 }}>Guia do professor</summary>
            <ul className="bullets small mt">{story.teacherGuide.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </details>
          <details>
            <summary className="small" style={{ cursor: 'pointer', fontWeight: 700 }}>Personagens</summary>
            <ul className="clean stack-sm mt">{story.characters.map((c) => <li key={c.id} className="small"><strong style={{ color: c.color }}>{c.name}</strong> — {c.description}</li>)}</ul>
          </details>
        </aside>
      </div>

      <Modal open={showPath} onClose={() => setShowPath(false)} title="Caminho da turma">
        <ol className="stack-sm">{run.path.map((p, i) => <li key={i}><strong>{p.label}</strong><br /><span className="small muted">{p.consequence}</span></li>)}</ol>
      </Modal>
    </div>
  );
}
