import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowDown, ArrowUp, Check, Printer, ChevronLeft, ChevronRight, Lightbulb, Monitor, Pause, Play, RotateCcw, Timer, Trophy, Users, X, Save,
} from 'lucide-react';
import { Art, Sprite } from '../components/Art';
import { SPRITES, teamEmblem } from '../content/art-links';
import { ItemIcon } from '../components/ItemIcon';
import { Bar, Notice, Switch, anosLabel, minutes, toast } from '../components/ui';
import { GAME_ACTIVITIES, SUBJECT_MAP } from '../content';
import {
  FORMAT_LABEL, buildMemoryDeck, checkClassification, checkClueAnswer, checkSequence, isMemoryMatch, roundCount, shuffle,
  shuffleNotIdentity, summarize, type MemoryCard,
} from '../engine/games';
import { actions, now, uid, useApp } from '../store/store';
import type {
  ClassifyContent, CluesContent, GameActivity, GameSession, MatchContent, MemoryContent, QuizContent, SequenceContent, Team,
} from '../types/models';

const TEAM_COLORS = ['#a855f7', '#22d3ee', '#4ade80', '#fbbf24', '#f472b6', '#60a5fa'];

interface Ctl {
  onResult: (itemId: string, correct: boolean, attempts: number) => void;
  onDone: () => void;
  seed: number;
}

// ───────────── Quiz ─────────────
function QuizGame({ c, onResult, onDone, seed }: Ctl & { c: QuizContent }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const q = c.questions[i];
  // alternativas embaralhadas a cada partida: evita que a posição da resposta vire “pista”
  const order = useMemo(() => shuffle(q.options.map((_, k) => k), seed + i * 13), [q, seed, i]);
  const correct = picked === q.correct;
  const answer = (o: number) => {
    if (revealed) return;
    const a = attempts + 1;
    setPicked(o);
    setAttempts(a);
    if (o === q.correct) { setRevealed(true); onResult(q.id, true, a); }
  };
  const giveUp = () => { setRevealed(true); setPicked(q.correct); onResult(q.id, false, attempts); };
  const next = () => {
    if (i + 1 >= c.questions.length) return onDone();
    setI(i + 1); setPicked(null); setAttempts(0); setRevealed(false);
  };
  return (
    <div className="stack">
      <div className="xs muted">Pergunta {i + 1} de {c.questions.length}</div>
      <h2 style={{ fontSize: 'clamp(1.3rem,2.2vw,1.9rem)' }}>{q.prompt}</h2>
      <div className="grid g2">
        {order.map((idx, pos) => {
          const o = q.options[idx];
          const state = revealed && idx === q.correct ? 'ok' : picked === idx && !correct ? 'no' : '';
          return (
            <button key={idx} className={`btn lg ${state === 'ok' ? 'primary' : 'outline'}`} style={{ justifyContent: 'flex-start', whiteSpace: 'normal', textAlign: 'left', ...(state === 'no' ? { borderColor: 'var(--red)' } : {}) }} onClick={() => answer(idx)} disabled={revealed && idx !== q.correct}>
              <span className="badge">{String.fromCharCode(65 + pos)}</span> {o}
            </button>
          );
        })}
      </div>
      {picked !== null && !correct && !revealed && (
        <div className="feedback no row between">
          <span>Ainda não. Conversem: o que essa alternativa deixa de considerar?</span>
          <button className="btn sm ghost" onClick={giveUp}>Mostrar resposta</button>
        </div>
      )}
      {revealed && (
        <div className={`feedback ${correct && attempts > 0 ? 'ok' : 'no'}`}>
          <strong>{correct ? (attempts === 1 ? 'Acertaram de primeira!' : 'Chegaram lá juntos!') : 'Resposta:'}</strong> {q.explanation}
        </div>
      )}
      {revealed && <button className="btn primary" style={{ alignSelf: 'flex-end' }} onClick={next}>{i + 1 >= c.questions.length ? 'Ver resumo' : 'Próxima pergunta'} <ChevronRight /></button>}
    </div>
  );
}

// ───────────── Pistas / escape ─────────────
function CluesGame({ c, onResult, onDone }: Ctl & { c: CluesContent }) {
  const [i, setI] = useState(-1);
  const [val, setVal] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState(false);
  const [solved, setSolved] = useState(false);
  const [wrong, setWrong] = useState(false);
  if (i < 0) return (
    <div className="stack">
      <p className="prose-lg">{c.intro}</p>
      <button className="btn primary lg" style={{ alignSelf: 'flex-start' }} onClick={() => setI(0)}>Abrir a primeira pista <ChevronRight /></button>
    </div>
  );
  if (i >= c.steps.length) return (
    <div className="stack">
      <h2>🔓 Escaparam!</h2>
      <p className="prose-lg">{c.finale}</p>
      <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={onDone}>Ver resumo</button>
    </div>
  );
  const st = c.steps[i];
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (solved || !val.trim()) return;
    const a = attempts + 1;
    setAttempts(a);
    if (checkClueAnswer(val, st.answers)) { setSolved(true); setWrong(false); onResult(st.id, true, a); }
    else setWrong(true);
  };
  const reveal = () => { setSolved(true); setVal(st.answers[0]); onResult(st.id, false, attempts); };
  const next = () => { setI(i + 1); setVal(''); setAttempts(0); setHint(false); setSolved(false); setWrong(false); };
  return (
    <div className="stack">
      <div className="row">{c.steps.map((s2, k) => <span key={s2.id} className={`badge ${k < i ? 'cyan' : k === i ? '' : 'amber'}`}>{k < i ? '🔓' : '🔒'} {k + 1}</span>)}</div>
      <div className="panel tight"><span className="kicker violet">Pista {i + 1}</span><p className="prose-lg" style={{ margin: '6px 0 0' }}>{st.clue}</p></div>
      <h2 style={{ fontSize: '1.4rem' }}>{st.question}</h2>
      <form className="row" onSubmit={submit}>
        <input className="input" style={{ flex: '1 1 220px', fontSize: '1.2rem' }} value={val} onChange={(e) => { setVal(e.target.value); setWrong(false); }} aria-label="Resposta" disabled={solved} autoFocus />
        <button className="btn primary" type="submit" disabled={solved}>Testar</button>
        {!hint && !solved && <button type="button" className="btn ghost" onClick={() => setHint(true)}><Lightbulb /> Dica</button>}
      </form>
      {hint && !solved && <div className="notice info"><Lightbulb size={18} /> {st.hint}</div>}
      {wrong && <div className="feedback no row between"><span>Ainda não abre. Revejam a pista com calma.</span>{attempts >= 2 && <button className="btn sm ghost" onClick={reveal}>Revelar</button>}</div>}
      {solved && <div className="feedback ok"><strong>Cadeado aberto!</strong> {st.explanation}</div>}
      {solved && <button className="btn primary" style={{ alignSelf: 'flex-end' }} onClick={next}>{i + 1 >= c.steps.length ? 'Abrir a última porta' : 'Próxima pista'} <ChevronRight /></button>}
    </div>
  );
}

// ───────────── Memória ─────────────
function MemoryGame({ c, onResult, onDone, seed }: Ctl & { c: MemoryContent }) {
  const deck = useMemo(() => buildMemoryDeck(c, seed), [c, seed]);
  const [open, setOpen] = useState<MemoryCard[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [misses, setMisses] = useState<Record<string, number>>({});
  const [lastPair, setLastPair] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const flip = (card: MemoryCard) => {
    if (open.length === 2 || matched.includes(card.pairId) || open.some((o) => o.key === card.key)) return;
    const next = [...open, card];
    setOpen(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (isMemoryMatch(a, b)) {
        setMatched((m) => [...m, a.pairId]);
        setLastPair(a.pairId);
        onResult(a.pairId, true, (misses[a.pairId] ?? 0) + 1);
        setOpen([]);
      } else {
        setMisses((m) => ({ ...m, [a.pairId]: (m[a.pairId] ?? 0) + 1, [b.pairId]: (m[b.pairId] ?? 0) + 1 }));
        timer.current = window.setTimeout(() => setOpen([]), 1300);
      }
    }
  };
  const pair = c.pairs.find((p) => p.id === lastPair);
  const done = matched.length === c.pairs.length;
  return (
    <div className="stack">
      <div className="row between"><span className="small muted">{matched.length} de {c.pairs.length} pares</span></div>
      <div className="grid keep-cols" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 10 }}>
        {deck.map((card) => {
          const up = matched.includes(card.pairId) || open.some((o) => o.key === card.key);
          return (
            <button key={card.key} onClick={() => flip(card)} className={`panel tight pop mem-card ${up ? 'up' : ''}`} aria-label={up ? card.text : 'Carta virada'} aria-pressed={up}
              style={{ borderColor: matched.includes(card.pairId) ? 'var(--cyan)' : undefined, background: matched.includes(card.pairId) ? 'rgba(46,230,214,.16)' : up ? 'rgba(139,92,246,.28)' : undefined }}>
              {up && card.art ? (
                <>
                  <Art id={card.art} fill decorative sizes="200px" />
                  <span className="mem-label">{card.text}</span>
                </>
              ) : up ? <span className="mem-text">{card.text}</span> : <span aria-hidden className="mem-back" />}
            </button>
          );
        })}
      </div>
      {pair && <div className="feedback ok"><strong>{pair.a} ↔ {pair.b}:</strong> {pair.explanation}</div>}
      {done && <button className="btn primary" style={{ alignSelf: 'flex-end' }} onClick={onDone}>Ver resumo <ChevronRight /></button>}
    </div>
  );
}

// ───────────── Sequência ─────────────
function SequenceGame({ c, onResult, onDone, seed }: Ctl & { c: SequenceContent }) {
  const [order, setOrder] = useState(() => shuffleNotIdentity(c.items, seed));
  const [attempts, setAttempts] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof checkSequence> | null>(null);
  const [drag, setDrag] = useState<number | null>(null);
  const move = (from: number, to: number) => {
    if (to < 0 || to >= order.length) return;
    const n = [...order];
    const [x] = n.splice(from, 1);
    n.splice(to, 0, x);
    setOrder(n);
    setResult(null);
  };
  const check = () => {
    const r = checkSequence(c.items.map((x) => x.id), order.map((x) => x.id));
    const a = attempts + 1;
    setAttempts(a);
    setResult(r);
    if (r.allCorrect) onResult('sequencia', true, a);
  };
  return (
    <div className="stack">
      <h2 style={{ fontSize: '1.4rem' }}>{c.prompt}</h2>
      <p className="xs muted">Use as setas (ou arraste) para reorganizar. Depois, verifiquem.</p>
      <ol className="clean stack-sm">
        {order.map((it, idx) => {
          const ok = result?.positions[idx];
          return (
            <li key={it.id} draggable onDragStart={() => setDrag(idx)} onDragOver={(e) => e.preventDefault()} onDrop={() => { if (drag !== null) move(drag, idx); setDrag(null); }}
              className="list-item" style={{ margin: 0, borderColor: result ? (ok ? 'var(--green)' : 'var(--red)') : undefined }}>
              <span className="badge num">{idx + 1}</span>
              {it.artId && (SPRITES.has(it.artId) ? <Sprite id={it.artId} size={56} /> : <Art id={it.artId} ratio={4 / 3} decorative sizes="120px" style={{ width: 96, flex: 'none', borderRadius: 10 }} />)}
              <div className="grow"><strong>{it.label}</strong>{result?.allCorrect && <div className="xs muted">{it.detail}</div>}</div>
              {result && (ok ? <Check color="var(--green)" aria-label="posição correta" /> : <X color="var(--red)" aria-label="posição incorreta" />)}
              <button className="btn icon ghost" aria-label={`Subir ${it.label}`} onClick={() => move(idx, idx - 1)} disabled={idx === 0}><ArrowUp /></button>
              <button className="btn icon ghost" aria-label={`Descer ${it.label}`} onClick={() => move(idx, idx + 1)} disabled={idx === order.length - 1}><ArrowDown /></button>
            </li>
          );
        })}
      </ol>
      {result && !result.allCorrect && <div className="feedback no">{result.correctCount} de {order.length} na posição certa. O que precisa acontecer antes do quê?</div>}
      {result?.allCorrect && <div className="feedback ok"><strong>Sequência correta!</strong> {c.explanation}</div>}
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        {!result?.allCorrect && <button className="btn primary" onClick={check}>Verificar ordem</button>}
        {!result?.allCorrect && attempts >= 2 && <button className="btn ghost" onClick={() => { setOrder([...c.items]); onResult('sequencia', false, attempts); setResult(checkSequence(c.items.map((x) => x.id), c.items.map((x) => x.id))); }}>Mostrar ordem</button>}
        {result?.allCorrect && <button className="btn primary" onClick={onDone}>Ver resumo <ChevronRight /></button>}
      </div>
    </div>
  );
}

// ───────────── Classificação ─────────────
function ClassifyGame({ c, onResult, onDone, seed }: Ctl & { c: ClassifyContent }) {
  const items = useMemo(() => shuffle(c.items, seed), [c, seed]);
  const [place, setPlace] = useState<Record<string, string | undefined>>({});
  const [sel, setSel] = useState<string | null>(items[0]?.id ?? null);
  const [checked, setChecked] = useState(false);
  const [round, setRound] = useState(1);
  const res = checkClassification(c.items, place);
  const put = (cat: string) => {
    if (!sel) return;
    const n = { ...place, [sel]: cat };
    setPlace(n);
    setChecked(false);
    setSel(items.find((it) => !n[it.id])?.id ?? null);
  };
  const check = () => {
    setChecked(true);
    if (res.complete) for (const r of res.results) if (r.correct) onResult(r.id, true, round);
    if (res.complete && res.correctCount === c.items.length) return;
    setRound(round + 1);
  };
  const retry = () => {
    const keep: Record<string, string | undefined> = {};
    for (const r of res.results) if (r.correct) keep[r.id] = r.placed;
    setPlace(keep);
    setChecked(false);
    setSel(items.find((it) => !keep[it.id])?.id ?? null);
  };
  const allOk = checked && res.correctCount === c.items.length;
  const unplaced = items.filter((it) => !place[it.id]);
  return (
    <div className="stack">
      <h2 style={{ fontSize: '1.35rem' }}>{c.prompt}</h2>
      {unplaced.length > 0 && (
        <div>
          <span className="label">1. Escolham um item</span>
          <div className="row mt" style={{ marginTop: 8 }}>
            {unplaced.map((it) => <button key={it.id} className={`chip ${sel === it.id ? 'on' : ''}`} aria-pressed={sel === it.id} onClick={() => setSel(it.id)} style={{ fontSize: '.95rem', padding: it.sprite ? '4px 14px 4px 6px' : '8px 14px' }}>{it.sprite ? <Sprite id={it.sprite} size={40} /> : <ItemIcon id={it.id} />}{it.label}</button>)}
          </div>
          <span className="label" style={{ display: 'block', marginTop: 12 }}>2. Coloquem na categoria</span>
        </div>
      )}
      <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(170px, 1fr))` }}>
        {c.categories.map((cat) => (
          <div key={cat.id} className="panel tight stack-sm">
            <button className="btn outline-cyan block" onClick={() => put(cat.id)} disabled={!sel} style={cat.sprite ? { flexDirection: 'column', gap: 4, padding: '10px' } : undefined}>{cat.sprite && <Sprite id={cat.sprite} size={64} />}{cat.label}</button>
            {cat.description && <span className="xs muted">{cat.description}</span>}
            <ul className="clean stack-sm">
              {c.items.filter((it) => place[it.id] === cat.id).map((it) => {
                const ok = checked ? it.category === cat.id : undefined;
                return (
                  <li key={it.id} className="small" style={{ padding: '6px 8px', borderRadius: 8, background: 'rgba(255,255,255,.05)', border: `1px solid ${ok === undefined ? 'transparent' : ok ? 'var(--green)' : 'var(--red)'}` }}>
                    <button className="btn ghost sm" style={{ padding: 0, whiteSpace: 'normal', textAlign: 'left', fontWeight: 600 }} onClick={() => { if (!allOk) { setPlace({ ...place, [it.id]: undefined }); setSel(it.id); setChecked(false); } }} title="Remover da categoria">{it.label}</button>
                    {checked && <div className="xs muted">{it.explanation}</div>}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {checked && !allOk && <div className="feedback no">{res.correctCount} de {c.items.length} corretos. Leiam as explicações e tentem de novo os que ficaram vermelhos.</div>}
      {allOk && <div className="feedback ok"><strong>Tudo classificado!</strong> Peçam para cada equipe explicar um dos critérios.</div>}
      <div className="row" style={{ justifyContent: 'flex-end' }}>
        {!checked && <button className="btn primary" onClick={check} disabled={!res.complete}>Verificar ({res.placedCount}/{c.items.length})</button>}
        {checked && !allOk && <button className="btn primary" onClick={retry}><RotateCcw /> Tentar os incorretos</button>}
        {checked && !allOk && <button className="btn ghost" onClick={() => { for (const r of res.results) if (!r.correct) onResult(r.id, false, round); onDone(); }}>Encerrar</button>}
        {allOk && <button className="btn primary" onClick={onDone}>Ver resumo <ChevronRight /></button>}
      </div>
    </div>
  );
}

// ───────────── Associação ─────────────
function MatchGame({ c, onResult, onDone, seed }: Ctl & { c: MatchContent }) {
  const lefts = useMemo(() => shuffle(c.pairs, seed), [c, seed]);
  const rights = useMemo(() => shuffle(c.pairs, seed + 7), [c, seed]);
  const [left, setLeft] = useState<string | null>(null);
  const [done, setDone] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [tries, setTries] = useState<Record<string, number>>({});
  const [last, setLast] = useState<string | null>(null);
  const pick = (rightId: string) => {
    if (!left) return;
    const t = (tries[left] ?? 0) + 1;
    setTries({ ...tries, [left]: t });
    if (left === rightId) { setDone([...done, left]); onResult(left, true, t); setLast(left); setLeft(null); setWrong(null); }
    else { setWrong(rightId); }
  };
  const lp = c.pairs.find((p) => p.id === last);
  return (
    <div className="stack">
      <h2 style={{ fontSize: '1.35rem' }}>{c.prompt}</h2>
      <div className="grid g2">
        <div className="stack-sm">
          {lefts.map((p) => (
            <button key={p.id} className={`btn ${done.includes(p.id) ? 'primary' : left === p.id ? 'violet' : 'outline'}`} disabled={done.includes(p.id)} aria-pressed={left === p.id} onClick={() => { setLeft(p.id); setWrong(null); }} style={{ justifyContent: 'flex-start', whiteSpace: 'normal' }}>{p.left}</button>
          ))}
        </div>
        <div className="stack-sm">
          {rights.map((p) => (
            <button key={p.id} className={`btn ${done.includes(p.id) ? 'primary' : 'outline-cyan'}`} disabled={done.includes(p.id) || !left} onClick={() => pick(p.id)} style={{ justifyContent: 'flex-start', whiteSpace: 'normal', ...(wrong === p.id ? { borderColor: 'var(--red)' } : {}) }}>{p.right}</button>
          ))}
        </div>
      </div>
      {!left && done.length < c.pairs.length && <p className="xs muted">Escolham um item da coluna da esquerda.</p>}
      {wrong && <div className="feedback no">Essa ligação não funciona. Como vocês poderiam conferir?</div>}
      {lp && <div className="feedback ok"><strong>{lp.left} ↔ {lp.right}:</strong> {lp.explanation}</div>}
      {done.length === c.pairs.length && <button className="btn primary" style={{ alignSelf: 'flex-end' }} onClick={onDone}>Ver resumo <ChevronRight /></button>}
    </div>
  );
}

function Board({ g, ctl }: { g: GameActivity; ctl: Ctl }) {
  const c = g.content;
  switch (c.kind) {
    case 'quiz': return <QuizGame c={c} {...ctl} />;
    case 'pistas': return <CluesGame c={c} {...ctl} />;
    case 'memoria': return <MemoryGame c={c} {...ctl} />;
    case 'sequencia': return <SequenceGame c={c} {...ctl} />;
    case 'classificacao': return <ClassifyGame c={c} {...ctl} />;
    case 'associacao': return <MatchGame c={c} {...ctl} />;
  }
}

// ───────────── Sala ─────────────
export default function GameRoom() {
  const { id } = useParams();
  return <GameRoomInner key={id} id={id} />;
}

function GameRoomInner({ id }: { id?: string }) {
  const s = useApp();
  const g = GAME_ACTIVITIES.find((x) => x.id === id);
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const [phase, setPhase] = useState<'setup' | 'play' | 'summary'>('setup');
  const [cooperative, setCooperative] = useState(true);
  const [noRanking, setNoRanking] = useState(true);
  const [timerOn, setTimerOn] = useState(false);
  const [timerSec, setTimerSec] = useState(60);
  const [left, setLeft] = useState(60);
  const [paused, setPaused] = useState(false);
  const [mode, setMode] = useState<GameSession['mode']>('projetor');
  const [teams, setTeams] = useState<Team[]>(() =>
    (turma?.groups.length ? turma.groups.slice(0, 4) : [{ id: 'a', name: 'Equipe A', studentIds: [] }, { id: 'b', name: 'Equipe B', studentIds: [] }])
      .map((gr, i) => ({ id: gr.id, name: gr.name, color: TEAM_COLORS[i % TEAM_COLORS.length], memberIds: gr.studentIds })),
  );
  const [session, setSession] = useState<GameSession | null>(null);
  const [seed, setSeed] = useState(() => Date.now() % 100000);
  const [turn, setTurn] = useState(0);

  useEffect(() => { if (g) actions.visit({ key: `game:${g.id}`, title: g.title, path: `/jogos/${g.id}`, kind: 'Jogo' }); }, [g]);
  useEffect(() => {
    if (phase !== 'play' || !timerOn || paused || left <= 0) return;
    const t = window.setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timerOn, paused, left]);

  if (!g) return <div className="empty">Jogo não encontrado. <Link to="/jogos">Voltar</Link></div>;
  const total = roundCount(g.content);

  const start = () => {
    const sess: GameSession = { id: uid('gs'), activityId: g.id, turmaId: turma?.id, mode, cooperative, teams, startedAt: now(), rounds: [], transport: 'local' };
    setSession(sess);
    setSeed(Date.now() % 100000);
    setTurn(0);
    setLeft(timerSec);
    setPaused(false);
    setPhase('play');
  };
  const onResult = (itemId: string, correct: boolean, attempts: number) => {
    setSession((ss) => ss && { ...ss, rounds: [...ss.rounds.filter((r) => r.itemId !== itemId), { itemId, correct, attempts, teamId: teams[turn % teams.length]?.id }] });
    setTurn((t) => t + 1);
    setLeft(timerSec);
  };
  const finish = () => {
    if (!session) return;
    const done = { ...session, finishedAt: now() };
    setSession(done);
    actions.saveGameSession(done);
    setPhase('summary');
  };
  const currentTeam = teams[turn % teams.length];
  const sum = session ? summarize(session.rounds) : null;

  return (
    <div className="stack" style={{ gap: 16 }}>
      <div className="row between">
        <div>
          <Link to="/jogos" className="small"><ChevronLeft size={14} /> Sala de jogos</Link>
          <div className="kicker">{FORMAT_LABEL[g.format]} · {g.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')}</div>
          <h1 style={{ margin: 0 }}>{g.title}</h1>
        </div>
        <div className="row">
          <span className="badge amber" title="Sem servidor: a partida acontece neste dispositivo">Modo local</span>
          <button className="btn outline sm" onClick={() => actions.setSettings({ projector: !s.settings.projector })}><Monitor /> {s.settings.projector ? 'Sair do projetor' : 'Modo projetor'}</button>
        </div>
      </div>

      {phase === 'setup' && (
        <div className="split">
          <div className="stack">
            <section className="panel" style={{ padding: 0, overflow: 'hidden' }}>
              <Art id={g.artId} ratio={21 / 8} decorative sizes="(max-width: 760px) 85vw, 900px" />
              <div style={{ padding: 20 }}>
                <p>{g.description}</p>
                <h3>Instruções para a turma</h3>
                <ol className="stack-sm prose-lg">{g.instructions.map((x, i) => <li key={i}>{x}</li>)}</ol>
                <p className="xs muted">{minutes(g.durationMin)} · {anosLabel(g.anos)} · {total} rodada(s)</p>
              </div>
            </section>
            <section className="panel">
              <div className="panel-title"><Users /><h2 style={{ fontSize: '1.2rem' }}>Formação de equipes</h2><span className="right xs muted">{turma ? `Grupos de ${turma.name}` : 'Sem turma ativa'}</span></div>
              <div className="grid g2">
                {teams.map((t, i) => (
                  <div key={t.id} className="panel tight row nowrap" style={{ borderColor: t.color, background: `${t.color}1f` }}>
                    {teamEmblem(t.name) && <Sprite id={teamEmblem(t.name)!} size={48} />}
                    <input className="input" value={t.name} aria-label={`Nome da equipe ${i + 1}`} onChange={(e) => setTeams(teams.map((x) => (x.id === t.id ? { ...x, name: e.target.value } : x)))} />
                    <span className="xs muted" style={{ whiteSpace: 'nowrap' }}>{t.memberIds.length} pessoas</span>
                    <button className="btn icon ghost" aria-label={`Remover ${t.name}`} disabled={teams.length <= 1} onClick={() => setTeams(teams.filter((x) => x.id !== t.id))}><X /></button>
                  </div>
                ))}
              </div>
              <div className="row mt">
                <button className="btn sm" disabled={teams.length >= 6} onClick={() => setTeams([...teams, { id: uid('t'), name: `Equipe ${String.fromCharCode(65 + teams.length)}`, color: TEAM_COLORS[teams.length % 6], memberIds: [] }])}>+ Equipe</button>
                {turma && <button className="btn sm ghost" onClick={() => {
                  const ids = shuffle(turma.students.map((x) => x.id), Date.now() % 9999);
                  setTeams(teams.map((t, i) => ({ ...t, memberIds: ids.filter((_, k) => k % teams.length === i) })));
                  toast('Equipes sorteadas com os estudantes da turma');
                }}>Sortear integrantes</button>}
              </div>
              {turma && teams.some((t) => t.memberIds.length) && (
                <details className="mt"><summary className="small" style={{ cursor: 'pointer' }}>Ver integrantes</summary>
                  <div className="grid g2 mt">{teams.map((t) => <div key={t.id} className="small"><strong style={{ color: t.color }}>{t.name}:</strong> {t.memberIds.map((m) => turma.students.find((x) => x.id === m)?.displayName).join(', ') || '—'}</div>)}</div>
                </details>
              )}
            </section>
          </div>
          <aside className="panel stack">
            <h2 style={{ fontSize: '1.2rem' }}>Configuração da partida</h2>
            <div className="setting-row"><span>Modo cooperativo</span><Switch hideLabel label="Modo cooperativo" checked={cooperative} onChange={setCooperative} /></div>
            <div className="setting-row"><span>Sem ranking</span><Switch hideLabel label="Sem ranking" checked={noRanking} onChange={setNoRanking} /></div>
            <div className="setting-row"><Timer size={18} /><span>Temporizador por rodada</span><Switch hideLabel label="Temporizador" checked={timerOn} onChange={setTimerOn} /></div>
            {timerOn && (
              <label className="field"><span>Segundos por rodada</span>
                <select className="input" value={timerSec} onChange={(e) => setTimerSec(Number(e.target.value))}>{[30, 60, 90, 120, 180].map((n) => <option key={n} value={n}>{n} s</option>)}</select>
              </label>
            )}
            <label className="field"><span>Forma de aplicação</span>
              <select className="input" value={mode} onChange={(e) => setMode(e.target.value as GameSession['mode'])}>
                <option value="projetor">Professor conduz no projetor</option>
                <option value="grupos">Grupo compartilhando um dispositivo</option>
                <option value="individual">Estudante individual (neste dispositivo)</option>
              </select>
            </label>
            <p className="xs muted">{cooperative ? 'A turma toda compartilha um único objetivo. As equipes se revezam na vez de responder, e o resultado é coletivo.' : 'As equipes se revezam. O resumo mostra o que cada equipe resolveu — nunca classificação de estudantes.'}</p>
            <button className="btn primary lg block" onClick={start}><Play /> Iniciar rodada</button>
            <Link className="btn outline block" to={`/jogos/${g.id}/imprimir`}><Printer /> Imprimir versão em papel</Link>
          </aside>
        </div>
      )}

      {phase === 'play' && session && (
        <div className="split">
          <section className="panel" style={{ position: 'relative', minHeight: 300 }}>
            {paused ? (
              <div className="center stack" style={{ padding: 40 }}>
                <h2>Jogo em pausa</h2>
                <p className="muted">Momento para conversar, explicar ou retomar combinados.</p>
                <button className="btn primary lg" style={{ alignSelf: 'center' }} onClick={() => setPaused(false)}><Play /> Retomar</button>
              </div>
            ) : (
              <Board g={g} ctl={{ onResult, onDone: finish, seed }} />
            )}
          </section>
          <aside className="stack">
            <section className="panel stack-sm">
              <span className="label">Vez de responder</span>
              <div className="row nowrap" style={{ fontSize: '1.4rem', fontWeight: 800, color: currentTeam?.color }}>{currentTeam && teamEmblem(currentTeam.name) ? <Sprite id={teamEmblem(currentTeam.name)!} size={48} /> : <Users />} {currentTeam?.name}</div>
              <span className="label mt">Progresso da turma</span>
              <Bar value={session.rounds.length} max={total} label="Progresso" />
              <span className="xs muted">{session.rounds.length} de {total} · {session.rounds.filter((r) => r.correct).length} resolvidas</span>
              {timerOn && (
                <div className="mt center">
                  <div className="num" style={{ fontSize: '2.4rem', fontWeight: 800, color: left <= 10 ? 'var(--red)' : 'var(--cyan)' }} aria-live="off">{Math.floor(Math.max(0, left) / 60)}:{String(Math.max(0, left) % 60).padStart(2, '0')}</div>
                  {left <= 0 && <span className="small" role="status">Tempo da rodada encerrado — combinem a resposta final.</span>}
                  <button className="btn ghost sm" onClick={() => setLeft(timerSec)}><RotateCcw /> Reiniciar tempo</button>
                </div>
              )}
            </section>
            <section className="panel stack-sm">
              <span className="label">Controle da rodada</span>
              <button className="btn block" onClick={() => setPaused(!paused)}>{paused ? <><Play /> Retomar</> : <><Pause /> Pausar</>}</button>
              <button className="btn block ghost" onClick={() => setTurn(turn + 1)}>Passar a vez</button>
              <button className="btn block danger" onClick={finish}>Encerrar e ver resumo</button>
            </section>
          </aside>
        </div>
      )}

      {phase === 'summary' && session && sum && (
        <section className="panel stack anim-in">
          <h2><Trophy color="var(--amber)" /> Resumo da partida</h2>
          <div className="grid g4">
            <div className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{sum.solved}/{total}</div><span className="small muted">{cooperative ? 'desafios resolvidos pela turma' : 'desafios resolvidos'}</span></div>
            <div className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{sum.firstTry}</div><span className="small muted">de primeira</span></div>
            <div className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{sum.retries}</div><span className="small muted">novas tentativas (persistência!)</span></div>
            <div className="panel tight center"><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{teams.length}</div><span className="small muted">equipes participaram</span></div>
          </div>
          {!cooperative && !noRanking && (
            <div>
              <h3>Por equipe</h3>
              <ul className="clean stack-sm">{teams.map((t) => <li key={t.id} className="row"><strong style={{ color: t.color, minWidth: 160 }}>{t.name}</strong> {session.rounds.filter((r) => r.teamId === t.id && r.correct).length} resolvida(s)</li>)}</ul>
            </div>
          )}
          {sum.solved < session.rounds.length && <Notice kind="info">Itens não resolvidos são bons pontos de partida para a conversa: peça que a turma explique o raciocínio da resposta correta.</Notice>}
          <div>
            <h3>Para conversar</h3>
            <ul className="bullets"><li>Qual desafio exigiu mais conversa entre vocês? Por quê?</li><li>Que estratégia a turma usou quando errava?</li><li>O que vocês explicariam para outra turma?</li></ul>
          </div>
          <div className="row">
            <button className="btn primary" onClick={() => setPhase('setup')}><RotateCcw /> Jogar de novo</button>
            <button className="btn" onClick={() => { actions.addProduction({ turmaId: turma?.id, authorLabel: 'Turma', kind: 'registro', title: `Partida — ${g.title}`, content: `Resolvidos: ${sum.solved}/${total} · De primeira: ${sum.firstTry} · Novas tentativas: ${sum.retries}`, sourceRef: { type: 'game', id: g.id } }); toast('Resumo salvo no portfólio'); }}><Save /> Salvar resumo no portfólio</button>
            <Link to="/jogos" className="btn ghost">Outros jogos</Link>
          </div>
        </section>
      )}
    </div>
  );
}
