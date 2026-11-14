import { useEffect, useMemo, useState } from 'react';
import {
  Battery, Bot, Brain, ClipboardList, CloudRain, Code, Cpu, Droplet, FlaskConical, Leaf, NotebookPen, Play,
  RotateCcw, Sun, Target, Trash2, Wind, Zap, ArrowUp, CornerUpLeft, CornerUpRight, Repeat, Sprout, Home, Info,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Notice, Switch, Tabs, toast } from '../components/ui';
import { APPLIANCES, LAB_DEFAULTS, LAB_LIMITS, kwh, simulate, type Appliance, type LabInputs } from '../engine/lab';
import { ROBOT_LEVELS, countBlocks, knn, runProgram, type Block, type Frame, type Sample } from '../engine/robot';
import { actions, now, uid, useApp } from '../store/store';

type Tab = 'experimento' | 'programacao' | 'ia' | 'casa';

function Gauge({ value, label, status, icon, color }: { value: number; label: string; status: string; icon: React.ReactNode; color: string }) {
  const r = 52;
  const c = Math.PI * r;
  const off = c * (1 - value / 100);
  return (
    <div className="panel tight center" role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-valuetext={`${value}% — ${status}`}>
      <div className="row nowrap" style={{ justifyContent: 'center', fontWeight: 700 }}>{icon} {label}</div>
      <svg viewBox="0 0 130 78" width="100%" style={{ maxWidth: 190 }} aria-hidden>
        <path d="M13 70 A52 52 0 0 1 117 70" fill="none" stroke="rgba(140,150,220,.25)" strokeWidth="12" strokeLinecap="round" />
        <path d="M13 70 A52 52 0 0 1 117 70" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} style={{ transition: 'stroke-dashoffset .6s var(--ease)' }} />
        <text x="65" y="66" textAnchor="middle" fill="currentColor" fontSize="24" fontWeight="800" fontFamily="Lexend">{value}%</text>
      </svg>
      <span className="badge" style={{ background: `${color}22`, borderColor: color, color: '#fff' }}>{status}</span>
    </div>
  );
}

function Slider({ icon, label, value, onChange, min = 0, max = 100, unit = '%' }: { icon: React.ReactNode; label: string; value: number; onChange: (n: number) => void; min?: number; max?: number; unit?: string }) {
  return (
    <label className="stack-sm" style={{ padding: '6px 0' }}>
      <span className="row between"><span className="row nowrap" style={{ gap: 8, fontWeight: 700 }}>{icon} {label}</span><span className="badge cyan num">{value}{unit}</span></span>
      <input className="range" type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-label={label} />
    </label>
  );
}

function Experiment() {
  const s = useApp();
  const [inp, setInp] = useState<LabInputs>(LAB_DEFAULTS);
  const [hyp, setHyp] = useState('');
  const [note, setNote] = useState('');
  const r = useMemo(() => simulate(inp), [inp]);
  const set = (p: Partial<LabInputs>) => setInp({ ...inp, ...p });
  const runs = s.labRuns;
  const steps = { hipotese: !!hyp.trim() || runs.some((x) => x.hypothesis), testar: runs.length > 0, comparar: runs.length > 1 };
  const run = () => {
    actions.addLabRun({ id: uid('lr'), inputs: inp, hypothesis: hyp.trim(), energia: r.energia, agua: r.agua, equilibrio: r.equilibrio, diesel: r.diesel, createdAt: now() });
    toast('Resultado registrado na tabela de comparação');
  };
  const prod = r.producao;
  const totalProd = prod.solar + prod.eolica + prod.hidro;
  return (
    <div className="stack">
      <div className="grid" style={{ gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,1fr)', gap: 16 }} id="lab-grid">
        <div className="stack">
          <div className="panel" style={{ padding: 0, overflow: 'hidden' }}>
            <Art id="sim-lab" ratio={16 / 10} />
          </div>
          <div className="grid g3">
            <Gauge value={r.energia} label="Energia" status={r.labels.energia} icon={<Zap size={18} color="var(--cyan)" />} color="#2ee6d6" />
            <Gauge value={r.agua} label="Água" status={r.labels.agua} icon={<Droplet size={18} color="#38bdf8" />} color="#38bdf8" />
            <Gauge value={r.equilibrio} label="Equilíbrio" status={r.labels.equilibrio} icon={<Leaf size={18} color="var(--green)" />} color="#4ade80" />
          </div>
        </div>
        <section className="panel" aria-label="Condições da simulação">
          <div className="panel-title"><Target /><h3 style={{ margin: 0 }}>Condições da simulação</h3></div>
          <Slider icon={<Sun size={18} color="var(--amber)" />} label="Sol" value={inp.sol} onChange={(v) => set({ sol: v })} />
          <Slider icon={<Wind size={18} color="var(--violet-2)" />} label="Vento" value={inp.vento} onChange={(v) => set({ vento: v })} />
          <Slider icon={<CloudRain size={18} color="#38bdf8" />} label="Chuva" value={inp.chuva} onChange={(v) => set({ chuva: v })} />
          <Slider icon={<Zap size={18} color="var(--violet-2)" />} label="Consumo" value={inp.consumo} onChange={(v) => set({ consumo: v })} />
          <hr className="sep" />
          <Slider icon={<Sun size={18} />} label="Conjuntos de painéis solares" value={inp.paineis} max={10} unit="" onChange={(v) => set({ paineis: v })} />
          <Slider icon={<Wind size={18} />} label="Turbinas eólicas" value={inp.turbinas} max={10} unit="" onChange={(v) => set({ turbinas: v })} />
          <div className="setting-row"><Battery size={18} /><span>Bateria (guarda sobra do dia)</span><Switch hideLabel label="Bateria" checked={inp.bateria} onChange={(v) => set({ bateria: v })} /></div>
          <div className="setting-row"><Leaf size={18} /><span>Campanha de economia (−15%)</span><Switch hideLabel label="Campanha de economia" checked={inp.eficiencia} onChange={(v) => set({ eficiencia: v })} /></div>
        </section>
      </div>

      <section className="panel" aria-label="Detalhe do balanço energético">
        <h3>O que está acontecendo</h3>
        <div className="grid g3 small">
          <div><span className="label">Demanda diária</span><div className="num" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{r.demanda} u</div><span className="xs muted">dia {r.diaDemanda} u · noite {r.noiteDemanda} u</span></div>
          <div>
            <span className="label">Produção renovável</span><div className="num" style={{ fontSize: '1.4rem', fontWeight: 800 }}>{Math.round(totalProd * 10) / 10} u</div>
            <div className="bar" style={{ display: 'flex', height: 12 }} aria-hidden>
              <i style={{ width: `${(prod.solar / Math.max(totalProd, 1)) * 100}%`, background: '#fbbf24' }} />
              <i style={{ width: `${(prod.eolica / Math.max(totalProd, 1)) * 100}%`, background: '#a78bfa', borderRadius: 0 }} />
              <i style={{ width: `${(prod.hidro / Math.max(totalProd, 1)) * 100}%`, background: '#38bdf8' }} />
            </div>
            <span className="xs muted">solar {prod.solar} · eólica {prod.eolica} · hídrica {prod.hidro}</span>
          </div>
          <div><span className="label">Gerador a diesel (poluente)</span><div className="num" style={{ fontSize: '1.4rem', fontWeight: 800, color: r.diesel > 0 ? 'var(--red)' : 'var(--green)' }}>{r.diesel} u</div>
            <span className="xs muted">noite atendida por renováveis: {r.noiteAtendido}/{r.noiteDemanda} u{r.armazenado > 0 ? ` (bateria: ${r.armazenado} u)` : ''}{r.desperdicio > 0 ? ` · sobra desperdiçada: ${r.desperdicio} u` : ''}</span></div>
        </div>
      </section>

      <div className="grid g2">
        <section className="panel stack-sm">
          <div className="panel-title"><NotebookPen /><h3 style={{ margin: 0 }}>Hipótese da turma</h3></div>
          <textarea className="input" rows={3} value={hyp} onChange={(e) => setHyp(e.target.value)} placeholder="Ex.: Se colocarmos mais painéis, a cidade terá energia à noite." />
          <div className="row">
            <button className="btn primary" onClick={run}><Play /> Rodar experimento</button>
            <button className="btn" onClick={() => setInp(LAB_DEFAULTS)}><RotateCcw /> Recomeçar</button>
          </div>
          <label className="field mt"><span>Descoberta</span><textarea className="input" rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="O que os resultados mostraram? A hipótese se confirmou?" /></label>
          <button className="btn violet" disabled={!note.trim()} onClick={() => { actions.addProduction({ turmaId: s.activeTurmaId, authorLabel: 'Turma', kind: 'hipotese', title: 'Laboratório de futuros — descoberta', content: `Hipótese: ${hyp}\nDescoberta: ${note}`, sourceRef: { type: 'simulation', id: 'laboratorio' } }); setNote(''); toast('Descoberta registrada no portfólio'); }}><NotebookPen /> Registrar descoberta</button>
        </section>
        <section className="panel">
          <div className="panel-title"><ClipboardList /><h3 style={{ margin: 0 }}>Notas do professor</h3></div>
          <ul className="clean stack-sm">
            {[['hipotese', 'Formular hipótese'], ['testar', 'Testar (rodar experimento)'], ['comparar', 'Comparar resultados (2+ rodadas)']].map(([k, l]) => (
              <li key={k} className="list-item" style={{ margin: 0 }}>{steps[k as keyof typeof steps] ? <span style={{ color: 'var(--cyan)' }}>☑</span> : <span>☐</span>} {l}</li>
            ))}
          </ul>
          <p className="xs muted mt">Sugestão: mudem <strong>uma variável por vez</strong>. Comece pedindo que a turma descubra por que a cidade fica sem energia à noite mesmo com muitos painéis.</p>
        </section>
      </div>

      <section className="panel">
        <div className="row between"><h3>Tabela de comparação ({runs.length})</h3>{runs.length > 0 && <button className="btn ghost sm" onClick={actions.clearLabRuns}><Trash2 /> Limpar</button>}</div>
        {runs.length === 0 ? <p className="small muted">Cada “Rodar experimento” registra as condições e os resultados aqui.</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table className="data num">
              <thead><tr><th>#</th><th>Sol</th><th>Vento</th><th>Chuva</th><th>Consumo</th><th>Painéis</th><th>Turbinas</th><th>Bateria</th><th>Energia</th><th>Água</th><th>Equilíbrio</th><th>Diesel</th><th>Hipótese</th></tr></thead>
              <tbody>{[...runs].reverse().map((x, i) => (
                <tr key={x.id}><td>{i + 1}</td><td>{x.inputs.sol}%</td><td>{x.inputs.vento}%</td><td>{x.inputs.chuva}%</td><td>{x.inputs.consumo}%{x.inputs.eficiencia ? ' (−15%)' : ''}</td><td>{x.inputs.paineis}</td><td>{x.inputs.turbinas}</td><td>{x.inputs.bateria ? 'sim' : 'não'}</td><td>{x.energia}%</td><td>{x.agua}%</td><td>{x.equilibrio}%</td><td>{x.diesel}</td><td style={{ fontFamily: 'var(--font-body)' }}>{x.hypothesis || '—'}</td></tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel">
        <div className="panel-title"><Info /><h3 style={{ margin: 0 }}>Limites desta simulação</h3></div>
        <ul className="bullets small">{LAB_LIMITS.map((l, i) => <li key={i}>{l}</li>)}</ul>
      </section>
      <style>{`@media (max-width: 1180px){ #lab-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

// ───────────── Programação ─────────────
const BLOCK_INFO: Record<Exclude<Block['type'], 'repetir'>, { label: string; icon: React.ReactNode }> = {
  frente: { label: 'Andar 1 casa', icon: <ArrowUp size={16} /> },
  esquerda: { label: 'Virar à esquerda', icon: <CornerUpLeft size={16} /> },
  direita: { label: 'Virar à direita', icon: <CornerUpRight size={16} /> },
  regar: { label: 'Regar', icon: <Droplet size={16} /> },
};

function Programming() {
  const [lv, setLv] = useState(0);
  const level = ROBOT_LEVELS[lv];
  const [prog, setProg] = useState<Block[]>([]);
  const [target, setTarget] = useState<'main' | number>('main');
  const [frames, setFrames] = useState<Frame[]>([]);
  const [fi, setFi] = useState(-1);
  const [outcome, setOutcome] = useState<{ success: boolean; error?: string } | null>(null);
  const reduce = useApp().settings.reduceMotion;
  useEffect(() => { setProg([]); setFrames([]); setFi(-1); setOutcome(null); setTarget('main'); }, [lv]);
  useEffect(() => {
    if (fi < 0 || fi >= frames.length - 1) return;
    const t = window.setTimeout(() => setFi(fi + 1), reduce ? 60 : 420);
    return () => window.clearTimeout(t);
  }, [fi, frames, reduce]);
  const add = (type: Block['type']) => {
    const b: Block = type === 'repetir' ? { id: uid('b'), type, times: 4, body: [] } : { id: uid('b'), type } as Block;
    if (target === 'main') setProg([...prog, b]);
    else setProg(prog.map((x, i) => (i === target && x.type === 'repetir' && b.type !== 'repetir' ? { ...x, body: [...x.body, b] } : x)));
    setOutcome(null);
  };
  const execute = () => {
    const r = runProgram(level, prog);
    setFrames(r.frames);
    setFi(r.frames.length ? 0 : -1);
    setOutcome({ success: r.success, error: r.error ?? (r.success ? undefined : 'O programa terminou, mas ainda há mudas sem regar.') });
  };
  const st = fi >= 0 ? frames[fi]?.state : { ...level.start, watered: [] as string[] };
  const finished = fi === frames.length - 1 || frames.length === 0;
  const used = countBlocks(prog);
  const arrow = ['↑', '→', '↓', '←'][st?.dir ?? 0];
  return (
    <div className="split">
      <section className="panel stack">
        <div className="row between">
          <div><span className="kicker">Robô da horta · nível {lv + 1}</span><h3 style={{ margin: 0 }}>{level.title}</h3><p className="small muted" style={{ margin: 0 }}>{level.goal}</p></div>
          <select className="input" style={{ width: 'auto' }} value={lv} onChange={(e) => setLv(Number(e.target.value))} aria-label="Nível">{ROBOT_LEVELS.map((l, i) => <option key={l.id} value={i}>Nível {i + 1}</option>)}</select>
        </div>
        <div role="grid" aria-label="Terreno" className="keep-cols" style={{ display: 'grid', gridTemplateColumns: `repeat(${level.size}, 1fr)`, gap: 4, maxWidth: 420, width: '100%', alignSelf: 'center' }}>
          {Array.from({ length: level.size * level.size }).map((_, k) => {
            const x = k % level.size; const y = Math.floor(k / level.size);
            const robot = st && st.x === x && st.y === y;
            const plant = level.plants.some((p) => p.x === x && p.y === y);
            const rock = level.rocks.some((p) => p.x === x && p.y === y);
            const watered = st?.watered.includes(`${x},${y}`);
            return (
              <div key={k} role="gridcell" aria-label={`${x},${y}${robot ? ' robô' : ''}${plant ? (watered ? ' muda regada' : ' muda') : ''}${rock ? ' pedra' : ''}`}
                style={{ aspectRatio: '1', borderRadius: 10, display: 'grid', placeItems: 'center', fontSize: '1.5rem', position: 'relative', background: watered ? 'rgba(74,222,128,.25)' : 'rgba(80,60,40,.35)', border: '1px solid var(--border)' }}>
                {rock && '🪨'}{plant && (watered ? '🌿' : '🌱')}
                {robot && <span style={{ position: 'absolute', inset: 4, display: 'grid', placeItems: 'center', background: 'rgba(46,230,214,.25)', borderRadius: 8, fontSize: '1.1rem' }}><Bot size={22} /><span style={{ position: 'absolute', top: -2, right: 2, fontSize: '.9rem', color: 'var(--cyan)' }}>{arrow}</span></span>}
              </div>
            );
          })}
        </div>
        {outcome && finished && (outcome.success ? <div className="feedback ok"><strong>Missão cumprida!</strong> {used <= level.maxBlocks ? `Com ${used} blocos — dentro do limite.` : `Usaram ${used} blocos; dá para fazer com até ${level.maxBlocks}?`}</div> : <div className="feedback no">{outcome.error}</div>)}
        <p className="xs muted">Dica: {level.hint}</p>
      </section>
      <aside className="panel stack">
        <div className="panel-title"><Code /><h3 style={{ margin: 0 }}>Programação do experimento</h3></div>
        <p className="xs muted" style={{ margin: 0 }}>Toque nos blocos para montar a sequência. {target !== 'main' && <strong>Adicionando dentro do “repetir”.</strong>}</p>
        <div className="row">
          {(Object.keys(BLOCK_INFO) as (keyof typeof BLOCK_INFO)[]).map((t) => <button key={t} className="btn sm violet" onClick={() => add(t)}>{BLOCK_INFO[t].icon} {BLOCK_INFO[t].label}</button>)}
          <button className="btn sm outline-cyan" onClick={() => add('repetir')} disabled={target !== 'main'}><Repeat size={16} /> Repetir</button>
        </div>
        <div className="panel tight" style={{ border: '1px dashed var(--border-strong)', minHeight: 120 }}>
          <div className="btn sm primary" style={{ pointerEvents: 'none' }}><Play size={14} /> Ao iniciar</div>
          <ol className="clean stack-sm" style={{ marginTop: 8, paddingLeft: 14 }}>
            {prog.map((b, i) => (
              <li key={b.id}>
                {b.type === 'repetir' ? (
                  <div className="panel tight" style={{ borderColor: target === i ? 'var(--cyan)' : undefined, padding: 8 }}>
                    <div className="row nowrap small"><Repeat size={15} /> Repetir
                      <input className="input" type="number" min={1} max={9} value={b.times} style={{ width: 56, padding: 4 }} aria-label="Vezes" onChange={(e) => setProg(prog.map((x, k) => (k === i && x.type === 'repetir' ? { ...x, times: Math.max(1, Math.min(9, Number(e.target.value))) } : x)))} /> vezes
                      <button className="btn sm ghost" onClick={() => setTarget(target === i ? 'main' : i)}>{target === i ? 'Concluir' : 'Editar'}</button>
                      <button className="btn icon ghost" aria-label="Remover bloco" onClick={() => { setProg(prog.filter((_, k) => k !== i)); setTarget('main'); }}><Trash2 size={15} /></button>
                    </div>
                    <ol className="clean" style={{ paddingLeft: 16 }}>{b.body.map((c, j) => c.type !== 'repetir' && (
                      <li key={c.id} className="row nowrap small" style={{ padding: '3px 0', color: frames[fi]?.blockId === c.id ? 'var(--cyan)' : undefined }}>{BLOCK_INFO[c.type].icon} {BLOCK_INFO[c.type].label}
                        <button className="btn icon ghost" aria-label="Remover" onClick={() => setProg(prog.map((x, k) => (k === i && x.type === 'repetir' ? { ...x, body: x.body.filter((_, m) => m !== j) } : x)))}><Trash2 size={13} /></button></li>
                    ))}</ol>
                  </div>
                ) : (
                  <div className="row nowrap small" style={{ color: frames[fi]?.blockId === b.id ? 'var(--cyan)' : undefined, fontWeight: frames[fi]?.blockId === b.id ? 800 : 500 }}>
                    {BLOCK_INFO[b.type].icon} {BLOCK_INFO[b.type].label}
                    <button className="btn icon ghost" aria-label="Remover bloco" onClick={() => setProg(prog.filter((_, k) => k !== i))}><Trash2 size={14} /></button>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
        <span className="xs muted">{used} bloco(s) · limite sugerido {level.maxBlocks}</span>
        <div className="row">
          <button className="btn primary" onClick={execute} disabled={!prog.length}><Play /> Executar</button>
          <button className="btn" onClick={() => { setProg([]); setFrames([]); setFi(-1); setOutcome(null); setTarget('main'); }}><RotateCcw /> Limpar</button>
        </div>
        <details><summary className="small" style={{ cursor: 'pointer' }}>Sem computador? (versão desplugada)</summary><p className="small">Desenhe a grade no chão com fita. Um estudante é o “robô”, outro lê as cartas de comando. A turma escreve o programa em cartões antes de executar.</p></details>
      </aside>
    </div>
  );
}

// ───────────── IA ─────────────
const SEED_SAMPLES: Sample[] = [
  { id: 's1', x: 20, y: 75, label: 'reciclável' }, { id: 's2', x: 30, y: 85, label: 'reciclável' }, { id: 's3', x: 25, y: 65, label: 'reciclável' },
  { id: 's4', x: 75, y: 25, label: 'orgânico' }, { id: 's5', x: 85, y: 30, label: 'orgânico' }, { id: 's6', x: 70, y: 15, label: 'orgânico' },
];
function AiLab() {
  const [samples, setSamples] = useState<Sample[]>(SEED_SAMPLES);
  const [label, setLabel] = useState<'reciclável' | 'orgânico' | 'teste'>('teste');
  const [test, setTest] = useState<{ x: number; y: number } | null>({ x: 50, y: 50 });
  const [k, setK] = useState(3);
  const pred = test ? knn(samples, test.x, test.y, k) : null;
  const click = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(100 - ((e.clientY - rect.top) / rect.height) * 100);
    if (label === 'teste') setTest({ x, y });
    else setSamples([...samples, { id: uid('s'), x, y, label }]);
  };
  return (
    <div className="split">
      <section className="panel stack">
        <h3 style={{ margin: 0 }}><Brain size={20} /> Como uma “IA” aprende com exemplos</h3>
        <p className="small muted" style={{ margin: 0 }}>Cada ponto é um resíduo descrito por duas características inventadas: <strong>rigidez</strong> (eixo vertical) e <strong>umidade</strong> (eixo horizontal). O classificador olha os {k} exemplos mais próximos e “vota”.</p>
        <svg viewBox="0 0 100 100" onClick={click} style={{ width: '100%', maxWidth: 460, alignSelf: 'center', background: 'rgba(10,16,52,.7)', borderRadius: 14, border: '1px solid var(--border)', cursor: 'crosshair' }} role="img" aria-label={`Plano com ${samples.length} exemplos. Toque para adicionar.`}>
          <text x="50" y="98" fontSize="3.5" fill="#aab1dc" textAnchor="middle">umidade →</text>
          <text x="3" y="50" fontSize="3.5" fill="#aab1dc" transform="rotate(-90 3 50)" textAnchor="middle">rigidez →</text>
          {pred?.neighbors.map((n) => test && <line key={n.id} x1={test.x} y1={100 - test.y} x2={n.x} y2={100 - n.y} stroke="#fff6" strokeWidth=".4" strokeDasharray="1 1" />)}
          {samples.map((p) => <circle key={p.id} cx={p.x} cy={100 - p.y} r="2.4" fill={p.label === 'orgânico' ? '#4ade80' : '#38bdf8'} />)}
          {test && <g><circle cx={test.x} cy={100 - test.y} r="3.4" fill="none" stroke="#fbbf24" strokeWidth="1" /><text x={test.x + 4} y={100 - test.y + 1} fontSize="3.5" fill="#fbbf24">?</text></g>}
        </svg>
        <div className="row small"><span className="chip"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#38bdf8' }} /> reciclável</span><span className="chip"><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#4ade80' }} /> orgânico</span><span className="chip" style={{ color: 'var(--amber)' }}>○ item a classificar</span></div>
      </section>
      <aside className="panel stack">
        <span className="label">Ao tocar no plano, adicionar:</span>
        <div className="row">
          {(['teste', 'reciclável', 'orgânico'] as const).map((l) => <button key={l} className={`chip ${label === l ? 'on' : ''}`} aria-pressed={label === l} onClick={() => setLabel(l)}>{l === 'teste' ? 'Item a classificar' : `Exemplo ${l}`}</button>)}
        </div>
        <label className="field"><span>Vizinhos consultados (k = {k})</span><input type="range" className="range" min={1} max={7} step={2} value={k} onChange={(e) => setK(Number(e.target.value))} /></label>
        {pred && (
          <div className="panel tight glow">
            <span className="label">Previsão</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800 }}>{pred.label ?? '—'}</div>
            <span className="xs muted">Votos: {Object.entries(pred.votes).map(([l, v]) => `${l} ${v}`).join(' · ')}</span>
          </div>
        )}
        <button className="btn sm" onClick={() => { setSamples(SEED_SAMPLES); setTest({ x: 50, y: 50 }); }}><RotateCcw /> Restaurar exemplos</button>
        <h3>Para investigar</h3>
        <ul className="bullets small">
          <li>Adicionem vários exemplos “orgânico” perto da área dos recicláveis. O que muda nas previsões?</li>
          <li>Se os exemplos tiverem erros, a IA aprende o erro? (viés de dados)</li>
          <li>Quem escolhe os exemplos? Quem confere as respostas?</li>
          <li>Educação midiática: uma imagem gerada por IA também “aprendeu” com exemplos. Como checar se uma imagem é real?</li>
        </ul>
        <p className="xs faint">Modelo didático (k vizinhos mais próximos). Sistemas reais usam muito mais dados e características.</p>
      </aside>
    </div>
  );
}

// ───────────── Energia em casa ─────────────
function HomeEnergy() {
  const [list, setList] = useState<Appliance[]>(APPLIANCES);
  const [tarifa, setTarifa] = useState(0.8);
  const total = list.reduce((s, a) => s + kwh(a), 0);
  const upd = (id: string, p: Partial<Appliance>) => setList(list.map((a) => (a.id === id ? { ...a, ...p } : a)));
  return (
    <section className="panel stack">
      <h3 style={{ margin: 0 }}><Home size={20} /> Consumo de energia em casa</h3>
      <p className="small muted" style={{ margin: 0 }}>Energia (kWh) = potência (W) × horas por dia × dias ÷ 1000. Potências são valores típicos aproximados; tarifa fictícia, editável.</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="data">
          <thead><tr><th>Aparelho</th><th>Potência (W)</th><th>Horas/dia</th><th>Dias</th><th>kWh no período</th><th>Custo (fictício)</th></tr></thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td><input className="input num" type="number" min={0} value={a.watts} style={{ width: 90 }} aria-label={`Potência de ${a.name}`} onChange={(e) => upd(a.id, { watts: Number(e.target.value) })} /></td>
                <td><input className="input num" type="number" min={0} max={24} step={0.25} value={a.hoursPerDay} style={{ width: 80 }} aria-label={`Horas por dia de ${a.name}`} onChange={(e) => upd(a.id, { hoursPerDay: Number(e.target.value) })} /></td>
                <td><input className="input num" type="number" min={0} max={31} value={a.days} style={{ width: 70 }} aria-label={`Dias de ${a.name}`} onChange={(e) => upd(a.id, { days: Number(e.target.value) })} /></td>
                <td className="num">{kwh(a).toLocaleString('pt-BR')}</td>
                <td className="num">R$ {(kwh(a) * tarifa).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
          <tfoot><tr><th colSpan={4}>Total</th><th className="num">{total.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} kWh</th><th className="num">R$ {(total * tarifa).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</th></tr></tfoot>
        </table>
      </div>
      <label className="row small">Tarifa fictícia (R$/kWh) <input className="input num" type="number" step={0.05} min={0} value={tarifa} style={{ width: 90 }} onChange={(e) => setTarifa(Number(e.target.value))} /></label>
      <p className="small">Desafio: reduzam o consumo total em 20% mudando hábitos (e não aparelhos). Quais mudanças têm mais efeito? Por quê?</p>
    </section>
  );
}

export default function Lab() {
  const [tab, setTab] = useState<Tab>('experimento');
  useEffect(() => { actions.visit({ key: 'sim:laboratorio', title: 'Laboratório de futuros', path: '/laboratorio', kind: 'Simulação' }); }, []);
  return (
    <div className="stack" style={{ gap: 16 }}>
      <section className="hero" style={{ minHeight: 150 }}>
        <Art id="sim-lab" fill eager decorative />
        <div className="hero-content">
          <div className="kicker">Ciências e tecnologia</div>
          <h1 style={{ margin: 0 }}>Laboratório de futuros</h1>
          <p className="muted" style={{ margin: 0 }}><FlaskConical size={16} /> Missão: <strong>Como abastecer uma cidade?</strong> Ajustem as condições, testem hipóteses e comparem resultados.</p>
        </div>
      </section>
      <Tabs<Tab> label="Áreas do laboratório" value={tab} onChange={setTab} items={[
        { id: 'experimento', label: 'Experimento', icon: <FlaskConical size={16} /> },
        { id: 'programacao', label: 'Programação', icon: <Code size={16} /> },
        { id: 'ia', label: 'Inteligência artificial', icon: <Cpu size={16} /> },
        { id: 'casa', label: 'Energia em casa', icon: <Sprout size={16} /> },
      ]} />
      {tab === 'experimento' && <Experiment />}
      {tab === 'programacao' && <Programming />}
      {tab === 'ia' && <AiLab />}
      {tab === 'casa' && <HomeEnergy />}
      <Notice kind="info">Funciona sem internet depois de carregado. Para turmas sem dispositivos, projete e deixe as equipes decidirem os valores dos controles.</Notice>
    </div>
  );
}
