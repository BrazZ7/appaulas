import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, CheckCircle2, Circle, Handshake, Lightbulb, Minus, Pause, Percent, Play, Plus, Save, ShoppingCart,
  Target, Trash2, TrendingUp, Users, Wallet, Pencil, Leaf, PiggyBank,
} from 'lucide-react';
import { Art } from '../components/Art';
import { Bar, Modal, Notice, toast } from '../components/ui';
import { FEIRA_LEVELS, FEIRA_PRODUCTS, FEIRA_REFLECTION, FEIRA_SITUATIONS, PREPARED_SIMULATIONS } from '../content/simulations';
import { brl, calcBasket, fmtQty, type FeiraProduct } from '../engine/feira';
import { actions, now, uid, useApp } from '../store/store';
import type { Difficulty } from '../types/models';

type Stage = 'planejar' | 'negociar' | 'refletir';
interface Snapshot { id: string; team: string; label: string; totalCents: number; items: Record<string, number> }

const TEAM_COLORS = ['#22d3ee', '#a855f7', '#4ade80', '#fbbf24'];

export default function Feira() {
  const s = useApp();
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const teamNames = (turma?.groups.slice(0, 4).map((g) => g.name) ?? []).concat(['Equipe A', 'Equipe B', 'Equipe C', 'Equipe D']).slice(0, 4);
  const [levelId, setLevelId] = useState<Difficulty>('introdutorio');
  const level = FEIRA_LEVELS.find((l) => l.id === levelId)!;
  const [team, setTeam] = useState(0);
  const [baskets, setBaskets] = useState<Record<number, Record<string, number>>>({ 0: { banana: 2, laranja: 1, maca: 1 } });
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [editPrices, setEditPrices] = useState(false);
  const [stage, setStage] = useState<Stage>('planejar');
  const [debate, setDebate] = useState(false);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [reflection, setReflection] = useState<Record<number, string>>({});
  const [started, setStarted] = useState(false);
  useEffect(() => { actions.visit({ key: 'sim:feira', title: 'A feira das decisões', path: '/simulacoes/feira', kind: 'Simulação' }); }, []);

  const products: FeiraProduct[] = useMemo(
    () => FEIRA_PRODUCTS.filter((p) => level.products.includes(p.id)).map((p) => ({ ...p, priceCents: prices[p.id] ?? p.priceCents })),
    [level, prices],
  );
  const q = baskets[team] ?? {};
  const result = calcBasket(products, q, level.budgetCents, level.promos);
  const setQty = (id: string, v: number) => setBaskets({ ...baskets, [team]: { ...q, [id]: Math.max(0, Math.round(v * 100) / 100) } });
  const step = (p: FeiraProduct, dir: 1 | -1) => setQty(p.id, (q[p.id] ?? 0) + dir * p.step);
  const constraints = level.constraints.map((c) => ({ ...c, ok: c.check(q, result.balanceCents) }));
  const snapshot = () => {
    const n = snapshots.filter((x) => x.team === teamNames[team]).length;
    setSnapshots([...snapshots, { id: uid('cs'), team: teamNames[team], label: `${teamNames[team]} · cesta ${n + 1}`, totalCents: result.totalCents, items: { ...q } }]);
    toast('Cesta adicionada ao comparativo');
  };
  const maxCompare = Math.max(level.budgetCents, ...snapshots.map((x) => x.totalCents), result.totalCents);
  const promoFor = (id: string) => level.promos.find((p) => 'productId' in p && p.productId === id);
  const saveRun = () => {
    actions.addFeiraRun({ id: uid('fr'), level: levelId, team: teamNames[team], totalCents: result.totalCents, budgetCents: level.budgetCents, items: q, reflection: FEIRA_REFLECTION.map((r, i) => `${r}\n→ ${reflection[i] ?? ''}`).join('\n\n'), createdAt: now() });
    actions.addProduction({ turmaId: turma?.id, groupId: turma?.groups[team]?.id, authorLabel: teamNames[team], kind: 'registro', title: `Feira das decisões — ${teamNames[team]}`, content: `Total ${brl(result.totalCents)} de ${brl(level.budgetCents)} (${result.usedPercent}%).\nItens: ${result.lines.map((l) => `${l.name} ${fmtQty(l.qty)}`).join(', ')}\n\n${FEIRA_REFLECTION.map((r, i) => `${r}\n→ ${reflection[i] ?? ''}`).join('\n\n')}`, sourceRef: { type: 'simulation', id: 'feira' } });
    toast('Registro da equipe salvo no portfólio');
  };

  return (
    <div className="stack" style={{ gap: 16 }}>
      <section className="hero" style={{ minHeight: 150 }}>
        <Art id="sim-feira" fill eager decorative />
        <div className="hero-content row nowrap" style={{ maxWidth: 900, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
          <span className="icon-tile violet desktop-only" style={{ width: 70, height: 70 }}><TrendingUp size={34} /></span>
          <div>
            <div className="kicker">Matemática e economia · simulação</div>
            <h1 style={{ margin: 0 }}>A feira das decisões</h1>
            <p className="muted" style={{ margin: 0 }}>Porcentagem, orçamento e escolhas de consumo em uma feira brasileira.</p>
          </div>
        </div>
      </section>

      <Notice>Todos os preços e valores desta simulação são <strong>fictícios</strong>, criados para a atividade. Antes de começar, a turma pode comparar com preços reais pesquisados no bairro.</Notice>

      <div className="grid" style={{ gap: 16, alignItems: 'start' }} id="feira-grid">
        {/* Coluna 1: desafio, equipes, barracas */}
        <div className="stack">
          <div className="panel tight row nowrap glow">
            <Target color="var(--cyan)" />
            <div><strong style={{ color: 'var(--cyan)' }}>Desafio:</strong> {level.goal}</div>
          </div>
          <div className="grid g2">
            <section className="panel tight">
              <div className="row small" style={{ fontWeight: 700 }}><Users size={18} /> Equipes ({teamNames.length})</div>
              <div className="row mt" style={{ marginTop: 10 }} role="group" aria-label="Equipe ativa">
                {teamNames.map((n, i) => (
                  <button key={n} className={`chip ${team === i ? 'on' : ''}`} aria-pressed={team === i} onClick={() => setTeam(i)} style={{ borderColor: TEAM_COLORS[i] }}>
                    <span aria-hidden style={{ width: 10, height: 10, borderRadius: '50%', background: TEAM_COLORS[i] }} /> {n.replace('Equipe ', '')}
                  </button>
                ))}
              </div>
            </section>
            <section className="panel tight row nowrap">
              <Wallet size={32} color="var(--cyan)" />
              <div><div className="small">Carteira da equipe</div><div className="num" style={{ fontSize: '1.9rem', fontWeight: 800, color: 'var(--cyan)' }}>{brl(level.budgetCents)}</div></div>
            </section>
          </div>
          <section className="panel" aria-label="Barracas da feira">
            <div className="row between mb">
              <h2 style={{ margin: 0, fontSize: '1.2rem' }}>Feira do Bairro</h2>
              <div className="row">
                <label className="row small" style={{ gap: 6 }}>Nível
                  <select className="input" style={{ width: 'auto' }} value={levelId} onChange={(e) => setLevelId(e.target.value as Difficulty)}>
                    {FEIRA_LEVELS.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
                  </select>
                </label>
                <button className={`btn sm ${editPrices ? 'violet' : 'ghost'}`} aria-pressed={editPrices} onClick={() => setEditPrices(!editPrices)}><Pencil /> Editar preços</button>
              </div>
            </div>
            <div className="grid keep-cols" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 10 }}>
              {products.map((p) => {
                const promo = promoFor(p.id);
                return (
                  <div key={p.id} className="panel tight stack-sm" style={{ background: 'rgba(40,30,20,.35)', borderColor: promo ? 'var(--amber)' : undefined }}>
                    <div className="row between nowrap"><span style={{ fontSize: '2rem' }} aria-hidden>{p.emoji}</span>{promo && <span className="badge amber"><Percent size={12} /> promo</span>}</div>
                    <strong>{p.name}</strong>
                    {editPrices ? (
                      <label className="xs">Preço (R$/{p.unit})
                        <input className="input" type="number" min={0} step={0.1} value={(p.priceCents / 100).toFixed(2)} onChange={(e) => setPrices({ ...prices, [p.id]: Math.round(Number(e.target.value) * 100) })} />
                      </label>
                    ) : (
                      <span className="chip" style={{ alignSelf: 'flex-start', background: '#f8f1df', color: '#3b2a12', borderColor: 'transparent' }}>{brl(p.priceCents)}/{p.unit}</span>
                    )}
                    {promo && <span className="xs" style={{ color: 'var(--amber)' }}>{promo.label}</span>}
                    <button className="btn sm outline-cyan" onClick={() => step(p, 1)} aria-label={`Adicionar ${p.step} ${p.unit} de ${p.name}`}><Plus /> {fmtQty(p.step)} {p.unit}</button>
                  </div>
                );
              })}
            </div>
            {level.promos.some((p) => p.kind === 'cupom-total') && <p className="xs muted mt">🎟️ {level.promos.find((p) => p.kind === 'cupom-total')?.label}</p>}
          </section>
        </div>

        {/* Coluna 2: cesta e comparativo */}
        <div className="stack">
          <section className="panel" aria-label="Cesta da equipe">
            <div className="panel-title"><ShoppingCart /><h2 style={{ fontSize: '1.2rem' }}>Cesta — {teamNames[team]}</h2>
              <button className="btn ghost sm right" onClick={() => setBaskets({ ...baskets, [team]: {} })}><Trash2 /> Limpar</button></div>
            {result.lines.length === 0 && <p className="muted small">Cesta vazia. Adicione produtos nas barracas.</p>}
            <ul className="clean">
              {result.lines.map((l) => {
                const p = products.find((x) => x.id === l.productId)!;
                return (
                  <li key={l.productId} className="row nowrap" style={{ padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: '1.5rem' }} aria-hidden>{p.emoji}</span>
                    <div className="grow" style={{ minWidth: 0 }}><strong>{l.name}</strong><div className="xs muted" style={{ whiteSpace: 'nowrap' }}>{brl(l.unitCents)}/{p.unit}{l.discountCents > 0 && <span style={{ color: 'var(--amber)' }}> · −{brl(l.discountCents)}</span>}</div></div>
                    <button className="btn icon ghost" aria-label={`Diminuir ${l.name}`} onClick={() => step(p, -1)}><Minus /></button>
                    <input className="input num" style={{ width: 64, textAlign: 'center', padding: '6px' }} type="number" min={0} step={p.step} value={l.qty} aria-label={`Quantidade de ${l.name} em ${p.unit}`} onChange={(e) => setQty(p.id, Number(e.target.value))} />
                    <span className="xs">{p.unit}</span>
                    <button className="btn icon ghost" aria-label={`Aumentar ${l.name}`} onClick={() => step(p, 1)}><Plus /></button>
                    <span className="num small" style={{ minWidth: 76, textAlign: 'right' }}>{brl(l.netCents)}</span>
                  </li>
                );
              })}
            </ul>
            {(result.itemDiscountCents > 0 || result.couponDiscountCents > 0) && (
              <div className="small mt stack-sm">
                <div className="row between"><span className="muted">Subtotal sem descontos</span><span className="num">{brl(result.grossCents)}</span></div>
                {result.itemDiscountCents > 0 && <div className="row between"><span className="muted">Descontos nos produtos</span><span className="num" style={{ color: 'var(--amber)' }}>−{brl(result.itemDiscountCents)}</span></div>}
                {result.couponDiscountCents > 0 && <div className="row between"><span className="muted">Cupom</span><span className="num" style={{ color: 'var(--amber)' }}>−{brl(result.couponDiscountCents)}</span></div>}
              </div>
            )}
            <div className="row between mt" style={{ fontSize: '1.25rem', fontWeight: 800 }}><span>Total da cesta</span><span className="num" style={{ color: result.withinBudget ? 'var(--cyan)' : 'var(--red)' }}>{brl(result.totalCents)}</span></div>
            <div className="row between small mt"><span>Orçamento: {brl(level.budgetCents)}</span><span>Usado: {result.usedPercent.toLocaleString('pt-BR')}%</span></div>
            <div className="mt" style={{ marginTop: 6 }}><Bar value={result.totalCents} max={level.budgetCents} variant={result.withinBudget ? undefined : 'warn'} label="Orçamento usado" /></div>
            <div className="row between small mt"><span>{result.balanceCents >= 0 ? 'Saldo' : 'Passou do orçamento'}</span><strong className="num" style={{ color: result.balanceCents >= 0 ? 'var(--green)' : 'var(--red)' }}>{brl(Math.abs(result.balanceCents))}</strong></div>
            <ul className="clean stack-sm mt">
              {constraints.map((c) => <li key={c.id} className="row nowrap small">{c.ok ? <CheckCircle2 size={17} color="var(--green)" /> : <Circle size={17} color="var(--faint)" />} {c.label}</li>)}
            </ul>
            <button className="btn sm mt" onClick={snapshot} disabled={!result.lines.length}><BarChart3 /> Adicionar ao comparativo</button>
          </section>

          <section className="panel" aria-label="Comparativo de cestas">
            <div className="panel-title"><BarChart3 /><h2 style={{ fontSize: '1.2rem' }}>Comparativo de cestas</h2></div>
            {snapshots.length === 0 ? <p className="small muted">Salvem duas ou mais cestas (da mesma equipe ou de equipes diferentes) para comparar alternativas.</p> : (
              <ul className="clean stack-sm">
                {snapshots.map((x) => (
                  <li key={x.id}>
                    <div className="row between xs"><span>{x.label}</span><span className="num">{brl(x.totalCents)}</span></div>
                    <div className="bar" style={{ height: 16 }}><i style={{ width: `${(x.totalCents / maxCompare) * 100}%`, background: x.totalCents > level.budgetCents ? 'var(--red)' : undefined }} /></div>
                  </li>
                ))}
                <li className="xs muted">Linha de referência: orçamento de {brl(level.budgetCents)}. Diferença entre a mais cara e a mais barata: {brl(Math.max(...snapshots.map((x) => x.totalCents)) - Math.min(...snapshots.map((x) => x.totalCents)))}.</li>
              </ul>
            )}
            {snapshots.length > 0 && <button className="btn ghost sm" onClick={() => setSnapshots([])}>Limpar comparativo</button>}
          </section>
        </div>

        {/* Coluna 3: objetivos e controle */}
        <aside className="stack" id="feira-aside">
          <section className="panel">
            <div className="panel-title"><Target /><h2 style={{ fontSize: '1.2rem' }}>Objetivos da aula</h2></div>
            <ul className="clean stack-sm small">
              {['Aplicar porcentagem em situações de compra.', 'Analisar escolhas de consumo dentro de um orçamento.', 'Refletir sobre consumo consciente e planejamento financeiro.'].map((o) => <li key={o} className="row nowrap" style={{ alignItems: 'flex-start' }}><CheckCircle2 size={17} color="var(--green)" style={{ flex: 'none' }} /> {o}</li>)}
            </ul>
            <div className="row mt">
              <span className="chip"><Percent /> Porcentagem</span><span className="chip"><Leaf /> Consumo consciente</span><span className="chip"><PiggyBank /> Educação financeira</span>
            </div>
          </section>
          <button className="btn primary lg" onClick={() => { setStarted(true); setStage('planejar'); toast('Simulação iniciada — etapa: planejar'); }}><Play /> {started ? 'Reiniciar etapas' : 'Iniciar simulação'}</button>
          <Link className="btn outline" to={turma ? `/turmas/${turma.id}?aba=grupos` : '/turmas'}><Users /> Dividir em equipes</Link>
          <button className="btn outline" onClick={() => setDebate(true)}><Pause /> Pausar para debate</button>
        </aside>
      </div>

      <nav aria-label="Etapas" className="row" style={{ justifyContent: 'center' }}>
        {(['planejar', 'negociar', 'refletir'] as Stage[]).map((st, i) => (
          <span key={st} className="row nowrap">
            {i > 0 && <ArrowRight className="faint" />}
            <button className={`btn lg ${stage === st ? 'outline-cyan' : 'ghost'}`} aria-pressed={stage === st} onClick={() => setStage(st)} style={stage === st ? { boxShadow: 'var(--glow-cyan)' } : undefined}>
              {st === 'planejar' ? <ShoppingCart /> : st === 'negociar' ? <Handshake /> : <Lightbulb />} {st[0].toUpperCase() + st.slice(1)}
            </button>
          </span>
        ))}
      </nav>

      <section className="panel" aria-live="polite">
        {stage === 'planejar' && (
          <div className="grid g2">
            <div><h3>Planejar</h3><ul className="bullets"><li>Leiam o desafio e listem o que é <em>necessário</em> e o que é <em>desejável</em>.</li><li>Estimem o total antes de montar a cesta. Depois comparem a estimativa com o cálculo.</li><li>Calculem quanto custa cada item com as promoções. Ex.: 20% de {brl(1000)} = {brl(200)}.</li></ul></div>
            <div><h3>Pergunta-guia</h3><p className="prose-lg">Se gastarmos {result.usedPercent.toLocaleString('pt-BR')}% do orçamento, que fração ainda sobra? Como escrever isso em porcentagem?</p></div>
          </div>
        )}
        {stage === 'negociar' && (
          <div className="stack">
            <h3>Negociar — situações de consumo consciente</h3>
            <div className="grid g2">{FEIRA_SITUATIONS.map((x) => <div key={x.id} className="panel tight"><strong>{x.title}</strong><p className="small" style={{ margin: '6px 0 0' }}>{x.text}</p></div>)}</div>
          </div>
        )}
        {stage === 'refletir' && (
          <div className="stack">
            <h3>Refletir — {teamNames[team]}</h3>
            {FEIRA_REFLECTION.map((r, i) => (
              <label key={i} className="field"><span>{r}</span><textarea className="input" rows={2} value={reflection[i] ?? ''} onChange={(e) => setReflection({ ...reflection, [i]: e.target.value })} /></label>
            ))}
            <button className="btn primary" style={{ alignSelf: 'flex-start' }} onClick={saveRun}><Save /> Salvar registro da equipe</button>
          </div>
        )}
      </section>

      <section className="panel">
        <h3>Outras simulações preparadas</h3>
        <div className="grid g4">{PREPARED_SIMULATIONS.map((p) => <div key={p.id} className="panel tight"><strong>{p.title}</strong><p className="xs muted" style={{ margin: '4px 0 0' }}>{p.text}</p></div>)}</div>
        <p className="xs faint mt">Orçamento de projeto e organização de evento estão disponíveis como roteiros; a versão interativa está em desenvolvimento.</p>
      </section>

      <Modal open={debate} onClose={() => setDebate(false)} title="Pausa para debate">
        <p className="prose-lg">A cesta mais barata é sempre a melhor escolha? Que outros critérios importam?</p>
        <ul className="bullets"><li>Cada equipe tem 1 minuto para defender uma escolha.</li><li>As outras equipes fazem uma pergunta usando números.</li></ul>
        <button className="btn primary" onClick={() => setDebate(false)}><Play /> Retomar simulação</button>
      </Modal>
      <style>{`#feira-grid{ grid-template-columns: minmax(0,1.35fr) minmax(0,1fr) 300px; } @media (max-width: 1640px){ #feira-grid{ grid-template-columns: minmax(0,1.2fr) minmax(360px,1fr); } #feira-aside{ grid-column: 1 / -1; display: grid; grid-template-columns: 2fr repeat(3, 1fr); align-items: stretch; } } @media (max-width: 1180px){ #feira-grid{ grid-template-columns: 1fr; } #feira-aside{ grid-template-columns: 1fr; } }`}</style>
    </div>
  );
}
