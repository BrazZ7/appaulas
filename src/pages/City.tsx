import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3, BookOpen, Bus, CheckCircle2, ChevronRight, Coins, Dices, Download, Ear, FileText, FlaskConical, Handshake,
  HeartPulse, Mic, Minus, Pause, Play, Plus, RotateCcw, Save, Scale, Target, Trees, Users, Vote, MessageCircle,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Modal, Notice, Tabs, toast } from '../components/ui';
import {
  CITY_PROJECTS, CITY_ROLES, CITY_TOTAL_TOKENS, allocated, consequences, outcomeLevel, tallyVotes, type CityProject,
} from '../engine/city';
import { shuffle } from '../engine/games';
import { download } from '../lib/files';
import { actions, now, uid, useApp } from '../store/store';

const ICON: Record<string, typeof BookOpen> = { BookOpen, Trees, Bus, HeartPulse };
const KIND = { fato: { label: 'Fato', color: 'var(--green)', icon: CheckCircle2, def: 'Informação comprovável.' }, opiniao: { label: 'Opinião', color: 'var(--violet-2)', icon: MessageCircle, def: 'Ponto de vista ou julgamento.' }, hipotese: { label: 'Hipótese', color: 'var(--cyan)', icon: FlaskConical, def: 'Explicação possível que pode ser testada com dados.' } };
const STAGES = ['Conhecer os projetos', 'Analisar evidências', 'Assembleia (turnos de fala)', 'Distribuir recursos', 'Votação mediada', 'Consequências e acordos'];

export default function City() {
  const s = useApp();
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const groups = turma?.groups.length ? turma.groups.map((g) => g.name) : ['Grupo A', 'Grupo B', 'Grupo C'];
  const [stage, setStage] = useState(0);
  const [detail, setDetail] = useState<CityProject | null>(null);
  const [alloc, setAlloc] = useState<Record<string, number>>({});
  const [votes, setVotes] = useState<Record<string, number>>({});
  const [voted, setVoted] = useState(false);
  const [tab, setTab] = useState<'fontes' | 'argumentos' | 'escuta'>('fontes');
  const [turnSec, setTurnSec] = useState(180);
  const [left, setLeft] = useState(180);
  const [running, setRunning] = useState(false);
  const [turn, setTurn] = useState(0);
  const [roles, setRoles] = useState<Record<string, string>>({});
  const [agreements, setAgreements] = useState<string[]>([]);
  const [agreeOpen, setAgreeOpen] = useState(false);
  const [agreeText, setAgreeText] = useState('');
  const [args, setArgs] = useState<{ group: string; project: string; text: string; kind: 'fato' | 'opiniao' | 'hipotese' }[]>([]);
  const [argDraft, setArgDraft] = useState({ project: CITY_PROJECTS[0].id, text: '', kind: 'fato' as const as 'fato' | 'opiniao' | 'hipotese' });
  useEffect(() => { actions.visit({ key: 'sim:cidade', title: 'Uma cidade, muitas vozes', path: '/cidade', kind: 'Simulação' }); }, []);
  useEffect(() => {
    if (!running || left <= 0) return;
    const t = window.setTimeout(() => setLeft((x) => x - 1), 1000);
    return () => window.clearTimeout(t);
  }, [running, left]);
  useEffect(() => { if (left <= 0) setRunning(false); }, [left]);

  const used = allocated(alloc);
  const free = CITY_TOTAL_TOKENS - used;
  const tally = tallyVotes(votes);
  const cons = useMemo(() => consequences(alloc), [alloc]);
  const nextTurn = () => { setTurn((t) => t + 1); setLeft(turnSec); setRunning(true); };
  const drawRoles = () => {
    const r = shuffle(CITY_ROLES, Date.now() % 9999);
    setRoles(Object.fromEntries(groups.map((g, i) => [g, r[i % r.length].id])));
    toast('Papéis sorteados');
  };
  const csv = () => {
    const rows = [['projeto', 'fichas_minimas', 'fichas_versao_completa', 'tipo_evidencia', 'evidencia', 'fonte']];
    for (const p of CITY_PROJECTS) for (const e of p.evidence) rows.push([p.name, String(p.min), String(p.full), e.kind, e.text, e.source]);
    download('uma-cidade-muitas-vozes-dados-ficticios.csv', rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(';')).join('\n'), 'text/csv;charset=utf-8');
  };
  const save = () => {
    actions.addCityRecord({ id: uid('cr'), allocation: alloc, votes, agreements, createdAt: now(), turmaId: turma?.id });
    actions.addProduction({ turmaId: turma?.id, authorLabel: 'Turma', kind: 'acordo', title: 'Assembleia — Uma cidade, muitas vozes', content: [
      `Distribuição de fichas: ${CITY_PROJECTS.map((p) => `${p.name} ${alloc[p.id] ?? 0}`).join(', ')}`,
      `Votação: ${tally.entries.map(([k, v]) => `${CITY_PROJECTS.find((p) => p.id === k)?.name} ${v}`).join(', ') || '—'}`,
      `Acordos:\n${agreements.map((a) => `• ${a}`).join('\n') || '—'}`,
      `Consequências:\n${cons.map((c) => `• ${c.project.name}: ${c.text}`).join('\n')}`,
    ].join('\n\n'), sourceRef: { type: 'simulation', id: 'cidade' } });
    toast('Assembleia registrada no portfólio da turma');
  };

  return (
    <div className="stack has-print" style={{ gap: 16 }}>
      <div className="split">
        <div className="stack">
          <section className="hero" style={{ minHeight: 330 }}>
            <Art id="sim-cidade" fill eager decorative />
            <div className="hero-content" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="row"><span className="badge cyan">07</span><span className="kicker">História, Geografia, Política e Educação midiática</span></div>
                <h1 style={{ margin: '6px 0 0' }}>Uma cidade, muitas vozes</h1>
                <p style={{ margin: 0 }}>Cidadania, território e escolhas coletivas em Vila Esperança, uma cidade fictícia.</p>
              </div>
              <div className="panel tight row nowrap" style={{ background: 'rgba(10,14,46,.85)' }}>
                <Target color="var(--cyan)" size={36} />
                <div><strong style={{ color: 'var(--cyan)' }}>Missão:</strong> <strong>Como decidir juntos?</strong><div className="xs muted">A cidade tem recursos limitados. Analisem, debatam com evidências e decidam coletivamente.</div></div>
              </div>
            </div>
          </section>

          <nav aria-label="Etapas da assembleia" className="row" style={{ gap: 6 }}>
            {STAGES.map((st, i) => <button key={st} className={`chip ${stage === i ? 'on' : ''}`} aria-pressed={stage === i} onClick={() => setStage(i)}>{i + 1}. {st}</button>)}
          </nav>

          <section aria-labelledby="proj-t">
            <h2 id="proj-t">Projetos em votação</h2>
            <div className="grid g4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))' }}>
              {CITY_PROJECTS.map((p) => {
                const Icon = ICON[p.icon] ?? BookOpen;
                const lvl = outcomeLevel(p, alloc[p.id] ?? 0);
                return (
                  <article key={p.id} className={`panel tight stack-sm ${tally.winner === p.id && voted ? 'glow' : ''}`}>
                    <div className="row nowrap"><span className="icon-tile"><Icon /></span><h3 style={{ margin: 0 }}>{p.name}</h3>{tally.winner === p.id && voted && <CheckCircle2 color="var(--cyan)" style={{ marginLeft: 'auto' }} />}</div>
                    <p className="small" style={{ margin: 0 }}>{p.summary}</p>
                    <span className="xs muted">Versão reduzida: {p.min} fichas · completa: {p.full}</span>
                    {(alloc[p.id] ?? 0) > 0 && <span className={`badge ${lvl === 'full' ? 'green' : lvl === 'partial' ? 'amber' : 'red'}`} style={{ alignSelf: 'flex-start' }}>{alloc[p.id]} ficha(s) · {lvl === 'full' ? 'completo' : lvl === 'partial' ? 'reduzido' : 'insuficiente'}</span>}
                    <button className="btn sm outline" style={{ alignSelf: 'flex-start', marginTop: 'auto' }} onClick={() => setDetail(p)}>Ver detalhes <ChevronRight /></button>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="panel" aria-labelledby="rec-t">
            <div className="row between">
              <div className="row nowrap"><Coins size={34} color="var(--amber)" /><div><h3 id="rec-t" style={{ margin: 0 }}>Recursos da cidade</h3><span className="small muted">Distribuam as fichas entre os projetos.</span></div></div>
              <div className="center"><div className="num" style={{ fontSize: '1.8rem', fontWeight: 800 }}>{free}</div><span className="xs muted">de {CITY_TOTAL_TOKENS} fichas disponíveis</span></div>
            </div>
            <div className="grid g4 mt" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
              {CITY_PROJECTS.map((p) => (
                <div key={p.id} className="row nowrap list-item" style={{ margin: 0 }}>
                  <span className="grow small" style={{ fontWeight: 700 }}>{p.name}</span>
                  <button className="btn icon ghost" aria-label={`Retirar ficha de ${p.name}`} disabled={!(alloc[p.id] > 0)} onClick={() => setAlloc({ ...alloc, [p.id]: (alloc[p.id] ?? 0) - 1 })}><Minus /></button>
                  <span className="num" style={{ minWidth: 20, textAlign: 'center', fontWeight: 800 }} aria-live="polite">{alloc[p.id] ?? 0}</span>
                  <button className="btn icon ghost" aria-label={`Dar ficha para ${p.name}`} disabled={free <= 0} onClick={() => setAlloc({ ...alloc, [p.id]: (alloc[p.id] ?? 0) + 1 })}><Plus /></button>
                </div>
              ))}
            </div>
            <div className="row mt"><button className="btn primary" onClick={() => setStage(5)} disabled={used === 0}><BarChart3 /> Ver consequências</button><button className="btn ghost sm" onClick={() => setAlloc({})}><RotateCcw /> Zerar</button></div>
          </section>

          <section className="panel" aria-labelledby="vot-t">
            <div className="row nowrap"><Vote size={30} color="var(--violet-2)" /><div><h3 id="vot-t" style={{ margin: 0 }}>Votação mediada</h3><span className="small muted">Escolha coletiva do projeto prioritário. Contem as mãos levantadas e registrem.</span></div></div>
            <div className="grid g4 mt" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))' }}>
              {CITY_PROJECTS.map((p) => (
                <label key={p.id} className="list-item" style={{ margin: 0 }}>
                  <span className="grow small" style={{ fontWeight: 700 }}>{p.name}</span>
                  <input className="input num" type="number" min={0} max={60} value={votes[p.id] ?? 0} style={{ width: 70 }} aria-label={`Votos para ${p.name}`} onChange={(e) => { setVotes({ ...votes, [p.id]: Math.max(0, Number(e.target.value)) }); setVoted(false); }} />
                </label>
              ))}
            </div>
            <div className="row mt">
              <button className="btn violet" onClick={() => setVoted(true)} disabled={tally.total === 0}><Vote /> Apurar votação</button>
              {voted && <span role="status" className="small">{tally.tie ? 'Empate! Combinem um critério de desempate (nova rodada de argumentos, ou dividir recursos).' : `Prioridade escolhida: ${CITY_PROJECTS.find((p) => p.id === tally.winner)?.name} (${votes[tally.winner!]} de ${tally.total} votos).`}</span>}
              {turma && <span className="xs faint">Turma com {turma.students.length} estudantes.</span>}
            </div>
          </section>

          {stage === 5 && (
            <section className="panel stack anim-in" aria-labelledby="cons-t">
              <h2 id="cons-t">Consequências das decisões</h2>
              <div className="grid g2">
                {cons.map((c) => (
                  <div key={c.project.id} className="panel tight">
                    <div className="row between"><strong>{c.project.name}</strong><span className={`badge ${c.level === 'full' ? 'green' : c.level === 'partial' ? 'amber' : 'red'}`}>{c.tokens} ficha(s)</span></div>
                    <p className="small" style={{ margin: '6px 0 0' }}>{c.text}</p>
                    {c.wasted > 0 && <p className="xs" style={{ color: 'var(--amber)', margin: '4px 0 0' }}>{c.tokens < c.project.min ? `${c.wasted} ficha(s) não bastam para nenhuma versão do projeto.` : `${c.wasted} ficha(s) além do necessário — poderiam ir para outro projeto.`}</p>}
                  </div>
                ))}
              </div>
              <ul className="bullets"><li>Quem foi mais beneficiado pelas decisões? Quem ficou de fora?</li><li>Que evidência pesou mais? Ela era fato, opinião ou hipótese?</li><li>Na vida real, quem decide o orçamento de uma cidade? Como a população pode participar? (orçamento participativo, audiências públicas, conselhos)</li></ul>
              <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={save}><Save /> Salvar assembleia no portfólio</button>
            </section>
          )}
        </div>

        <aside className="stack">
          <section className="panel stack">
            <div className="panel-title"><MessageCircle /><h2 style={{ fontSize: '1.25rem' }}>Debate com evidências</h2></div>
            <Tabs label="Ferramentas do debate" value={tab} onChange={setTab} items={[{ id: 'fontes', label: 'Fontes', icon: <FileText size={15} /> }, { id: 'argumentos', label: 'Argumentos', icon: <Scale size={15} /> }, { id: 'escuta', label: 'Escuta', icon: <Ear size={15} /> }]} />
            {tab === 'fontes' && (
              <div className="stack-sm">
                <button className="list-item card-link" style={{ flexDirection: 'row', textAlign: 'left', cursor: 'pointer', color: 'var(--text)' }} onClick={() => window.print()}>
                  <span className="icon-tile violet"><FileText /></span><span className="grow"><strong>Documento da atividade</strong><br /><span className="xs muted">Contexto, projetos, regras e critérios (imprimir ou salvar em PDF)</span></span><Download size={18} />
                </button>
                <button className="list-item card-link" style={{ flexDirection: 'row', textAlign: 'left', cursor: 'pointer', color: 'var(--text)', margin: 0 }} onClick={csv}>
                  <span className="icon-tile violet"><BarChart3 /></span><span className="grow"><strong>Dados da simulação</strong><br /><span className="xs muted">Evidências e custos em CSV (fictícios)</span></span><Download size={18} />
                </button>
              </div>
            )}
            {tab === 'argumentos' && (
              <div className="stack-sm">
                <select className="input" value={argDraft.project} onChange={(e) => setArgDraft({ ...argDraft, project: e.target.value })} aria-label="Projeto">{CITY_PROJECTS.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select>
                <textarea className="input" rows={2} value={argDraft.text} onChange={(e) => setArgDraft({ ...argDraft, text: e.target.value })} placeholder="Argumento da equipe…" aria-label="Argumento" />
                <div className="row" role="group" aria-label="Tipo de afirmação">{(['fato', 'opiniao', 'hipotese'] as const).map((k) => <button key={k} className={`chip ${argDraft.kind === k ? 'on' : ''}`} aria-pressed={argDraft.kind === k} onClick={() => setArgDraft({ ...argDraft, kind: k })}>{KIND[k].label}</button>)}</div>
                <button className="btn sm" disabled={!argDraft.text.trim()} onClick={() => { setArgs([...args, { ...argDraft, group: groups[turn % groups.length] }]); setArgDraft({ ...argDraft, text: '' }); }}>Registrar argumento ({groups[turn % groups.length]})</button>
                <ul className="clean stack-sm">{args.map((a, i) => <li key={i} className="small list-item" style={{ margin: 0, display: 'block' }}><span className="badge" style={{ borderColor: KIND[a.kind].color }}>{KIND[a.kind].label}</span> <strong>{a.group}</strong> sobre {CITY_PROJECTS.find((p) => p.id === a.project)?.name}: {a.text}</li>)}</ul>
              </div>
            )}
            {tab === 'escuta' && (
              <ul className="bullets small">
                <li>Antes de responder, repita com suas palavras o que o colega disse.</li>
                <li>Critique ideias, nunca pessoas.</li>
                <li>Pergunte: “Qual é a fonte disso?” e “Isso é fato, opinião ou hipótese?”</li>
                <li>Mudar de ideia diante de uma boa evidência é sinal de maturidade.</li>
              </ul>
            )}
          </section>

          <section className="panel">
            <div className="panel-title"><Scale /><h3 style={{ margin: 0 }}>Fato / Opinião / Hipótese</h3></div>
            <div className="grid g3" style={{ gap: 8 }}>
              {(Object.keys(KIND) as (keyof typeof KIND)[]).map((k) => { const K = KIND[k]; return (
                <div key={k} className="panel tight" style={{ borderColor: K.color, padding: 10 }}><div className="row nowrap small" style={{ color: K.color, fontWeight: 800, gap: 5 }}><K.icon size={15} /> {K.label}</div><div className="xs">{K.def}</div></div>
              ); })}
            </div>
          </section>

          <section className="panel">
            <div className="panel-title"><Users /><h3 style={{ margin: 0 }}>Discussão respeitosa</h3><span className="badge cyan right">Turnos iguais</span></div>
            <div className="row nowrap" style={{ alignItems: 'center', gap: 18 }}>
              <div className="center" style={{ width: 130, height: 130, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `conic-gradient(var(--cyan) ${(left / turnSec) * 360}deg, rgba(120,130,200,.2) 0)`, flex: 'none' }}>
                <div style={{ width: 112, height: 112, borderRadius: '50%', background: 'var(--panel-solid)', display: 'grid', placeItems: 'center' }}>
                  <div><div className="num" style={{ fontSize: '1.9rem', fontWeight: 800 }}>{String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}</div><div className="xs muted">Tempo de fala</div></div>
                </div>
              </div>
              <ol className="clean stack-sm grow">
                {groups.slice(0, 4).map((g, i) => {
                  const cur = turn % groups.length === i;
                  const role = CITY_ROLES.find((r) => r.id === roles[g]);
                  return <li key={g} className={cur ? 'chip on' : 'chip'} style={{ display: 'flex', borderRadius: 12 }}><span className="badge">{i + 1}</span> {g}{cur ? ' (agora)' : turn % groups.length === (i - 1 + groups.length) % groups.length ? ' (próximo)' : ''}{role && <span className="xs muted"> · {role.name}</span>}</li>;
                })}
              </ol>
            </div>
            <div className="row mt">
              <button className="btn sm primary" onClick={() => setRunning(!running)}>{running ? <><Pause /> Pausar</> : <><Play /> {left === turnSec ? 'Iniciar' : 'Continuar'}</>}</button>
              <button className="btn sm" onClick={nextTurn}><Mic /> Próximo grupo</button>
              <select className="input" style={{ width: 'auto' }} value={turnSec} onChange={(e) => { setTurnSec(Number(e.target.value)); setLeft(Number(e.target.value)); setRunning(false); }} aria-label="Duração do turno">{[60, 120, 180, 300].map((n) => <option key={n} value={n}>{n / 60} min</option>)}</select>
            </div>
          </section>

          <div className="grid g3" style={{ gap: 10 }}>
            <button className="btn primary" style={{ flexDirection: 'column', padding: 14 }} onClick={() => { setStage(2); setTurn(0); setLeft(turnSec); setRunning(true); }}><Users /> Abrir assembleia</button>
            <button className="btn outline" style={{ flexDirection: 'column', padding: 14 }} onClick={drawRoles}><Dices /> Sortear papéis</button>
            <button className="btn outline" style={{ flexDirection: 'column', padding: 14 }} onClick={() => setAgreeOpen(true)}><Handshake /> Registrar acordos</button>
          </div>
          {Object.keys(roles).length > 0 && (
            <section className="panel tight">
              <span className="label">Papéis</span>
              <ul className="clean stack-sm mt">{groups.map((g) => { const r = CITY_ROLES.find((x) => x.id === roles[g]); return r && <li key={g} className="small"><strong>{g}</strong>: {r.name} — <span className="muted">{r.perspective} {r.question}</span></li>; })}</ul>
            </section>
          )}
          <Notice kind="info">As propostas e dados são fictícios. A atividade trata de como decidir coletivamente — não apoia partidos nem candidatos.</Notice>
        </aside>
      </div>

      <Modal open={!!detail} onClose={() => setDetail(null)} title={detail?.name ?? ''} wide>
        {detail && (
          <div className="stack">
            <p>{detail.summary}</p>
            <p className="small muted">Custo: versão reduzida {detail.min} fichas · versão completa {detail.full} fichas.</p>
            <h3>Evidências apresentadas</h3>
            <ul className="clean stack-sm">
              {detail.evidence.map((e, i) => { const K = KIND[e.kind]; return (
                <li key={i} className="list-item" style={{ margin: 0, alignItems: 'flex-start' }}><span className="badge" style={{ borderColor: K.color, color: '#fff', minWidth: 80, justifyContent: 'center' }}>{K.label}</span><div><div>{e.text}</div><div className="xs muted">Fonte: {e.source}</div></div></li>
              ); })}
            </ul>
            <h3>O que pode acontecer</h3>
            <ul className="bullets small"><li><strong>Sem recursos:</strong> {detail.outcomes.none}</li><li><strong>Versão reduzida:</strong> {detail.outcomes.partial}</li><li><strong>Versão completa:</strong> {detail.outcomes.full}</li></ul>
          </div>
        )}
      </Modal>
      <Modal open={agreeOpen} onClose={() => setAgreeOpen(false)} title="Registro de acordos">
        <div className="stack">
          <ul className="bullets">{agreements.map((a, i) => <li key={i}>{a} <button className="btn sm ghost" onClick={() => setAgreements(agreements.filter((_, k) => k !== i))}>remover</button></li>)}</ul>
          {agreements.length === 0 && <p className="muted small">Nenhum acordo registrado ainda.</p>}
          <textarea className="input" rows={3} value={agreeText} onChange={(e) => setAgreeText(e.target.value)} placeholder="Ex.: Se o parque receber só a versão reduzida, a turma vai propor um mutirão de plantio." />
          <div className="row"><button className="btn primary" disabled={!agreeText.trim()} onClick={() => { setAgreements([...agreements, agreeText.trim()]); setAgreeText(''); }}>Adicionar acordo</button><button className="btn" onClick={save}><Save /> Salvar tudo no portfólio</button></div>
        </div>
      </Modal>

      <div className="print-only print-doc">
        <h1>Uma cidade, muitas vozes — documento da atividade</h1>
        <p>Vila Esperança é uma cidade fictícia. Ela tem {CITY_TOTAL_TOKENS} fichas de recursos para distribuir entre projetos. Cada projeto tem uma versão reduzida e uma completa.</p>
        <h2>Regras</h2>
        <ol><li>Cada grupo fala no seu turno, com o mesmo tempo.</li><li>Todo argumento deve indicar se é fato, opinião ou hipótese, e citar a fonte.</li><li>A distribuição de fichas é decidida em conjunto; a votação define a prioridade.</li><li>Os acordos são registrados e revistos na aula seguinte.</li></ol>
        {CITY_PROJECTS.map((p) => (
          <div key={p.id}><h2>{p.name} ({p.min}–{p.full} fichas)</h2><p>{p.summary}</p><ul>{p.evidence.map((e, i) => <li key={i}>[{KIND[e.kind].label}] {e.text} — {e.source}</li>)}</ul></div>
        ))}
        <h2>Papéis</h2>
        <ul>{CITY_ROLES.map((r) => <li key={r.id}><strong>{r.name}:</strong> {r.perspective} {r.question}</li>)}</ul>
      </div>
    </div>
  );
}
