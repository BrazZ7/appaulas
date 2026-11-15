import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Printer, Shuffle } from 'lucide-react';
import { Art, Sprite } from '../components/Art';
import { PrintBand } from '../components/PrintBand';
import { Switch } from '../components/ui';
import { GAME_ACTIVITIES } from '../content';
import { SPRITES } from '../content/art-links';
import { shuffle } from '../engine/games';
import { actions, useApp } from '../store/store';

const BINGO_DEFAULT = 'evaporação\ncondensação\nprecipitação\ninfiltração\nnascente\nbacia hidrográfica\nmata ciliar\nlençol freático\nreservatório\nesgoto\nreciclagem\ncompostagem\nenergia solar\nenergia eólica\nconsumo consciente\nbioma';

function Pic({ id, size }: { id?: string; size: number | string }) {
  if (!id) return null;
  return SPRITES.has(id) ? <Sprite id={id} size={size} /> : <Art id={id} ratio={1} decorative sizes="300px" style={{ width: size, borderRadius: 8 }} />;
}

function BingoSheet() {
  const [words, setWords] = useState(BINGO_DEFAULT);
  const [n, setN] = useState(8);
  const [seed, setSeed] = useState(7);
  const list = words.split('\n').map((w) => w.trim()).filter(Boolean);
  const ok = list.length >= 9;
  const cards = useMemo(() => (ok ? Array.from({ length: n }, (_, i) => shuffle(list, seed * 101 + i).slice(0, 9)) : []), [list.join('|'), n, seed, ok]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <div className="no-print panel stack-sm">
        <label className="field"><span>Palavras do tema (uma por linha, mínimo 9)</span><textarea className="input" rows={6} value={words} onChange={(e) => setWords(e.target.value)} /></label>
        <div className="row">
          <label className="row small">Cartelas <input className="input" type="number" min={1} max={40} value={n} onChange={(e) => setN(Math.max(1, Math.min(40, Number(e.target.value))))} style={{ width: 80 }} /></label>
          <button className="btn sm" onClick={() => setSeed(seed + 1)}><Shuffle /> Sortear de novo</button>
          {!ok && <span className="small" style={{ color: 'var(--amber)' }}>Inclua pelo menos 9 palavras.</span>}
        </div>
      </div>
      <section className="print-doc gp-sheet">
        <PrintBand subject="ciencias" />
        <h1>Bingo dos conceitos</h1>
        <p>Ao ouvir a <strong>definição</strong> lida pelo professor, marque a palavra correspondente. Quem completar a cartela explica uma das palavras para a turma.</p>
        <div className="gp-grid gp-3">
          {cards.map((c, i) => (
            <div key={i} className="gp-card gp-bingo">
              <div className="xs" style={{ fontWeight: 700 }}>Cartela {i + 1}</div>
              <div className="gp-bingo-grid">{c.map((w) => <div key={w}>{w}</div>)}</div>
            </div>
          ))}
        </div>
        <div className="page-break" />
        <h2>Lista para o professor (palavras em ordem alfabética)</h2>
        <ol>{[...list].sort((a, b) => a.localeCompare(b, 'pt-BR')).map((w) => <li key={w}>{w} — <span className="lines-inline" /></li>)}</ol>
      </section>
    </>
  );
}

export default function GamePrint() {
  const { id } = useParams();
  const s = useApp();
  const g = GAME_ACTIVITIES.find((x) => x.id === id);
  const [key, setKey] = useState(true);
  const color = !s.settings.inkSaver;
  const title = id === 'bingo' ? 'Cartelas de bingo' : g?.title;
  if (!g && id !== 'bingo') return <div className="empty">Jogo não encontrado. <Link to="/jogos">Voltar</Link></div>;
  const c = g?.content;
  const seed = 11;

  return (
    <div className="stack">
      <div className="no-print stack">
        <Link to={g ? `/jogos/${g.id}` : '/jogos'} className="small"><ChevronLeft size={14} /> Voltar ao jogo</Link>
        <h1 style={{ margin: 0 }}>Imprimir — {title}</h1>
        <div className="panel row">
          <Switch label="Economia de tinta (preto e branco)" checked={s.settings.inkSaver} onChange={(v) => actions.setSettings({ inkSaver: v })} />
          {c && c.kind !== 'memoria' && <Switch label="Gabarito em folha separada" checked={key} onChange={setKey} />}
          <button className="btn primary" onClick={() => window.print()}><Printer /> Imprimir / salvar PDF</button>
        </div>
        <p className="small muted">{color ? 'Versão colorida, com ilustrações.' : 'Versão econômica: sem imagens e sem cores; as cartas trazem só o texto.'} Recorte nas linhas tracejadas.</p>
      </div>

      {id === 'bingo' && <BingoSheet />}

      {g && c && (
        <section className="print-doc gp-sheet">
          <PrintBand subject={g.subjects[0]} />
          <h1>{g.title}</h1>
          <p>{g.description}</p>

          {c.kind === 'memoria' && (
            <>
              <p className="small"><strong>Como jogar:</strong> recorte as cartas, embaralhe e vire para baixo. Em equipe, virem duas por vez e expliquem por que formam um par.</p>
              <div className="gp-grid gp-4">
                {shuffle(c.pairs.flatMap((p) => [{ k: `${p.id}a`, text: p.a, art: p.artId }, { k: `${p.id}b`, text: p.b, art: undefined as string | undefined }]), seed).map((card) => (
                  <div key={card.k} className={`gp-card gp-mem ${card.art ? 'with-art' : ''}`}>
                    {color && card.art && <Pic id={card.art} size="88%" />}
                    <span className={card.art ? 'gp-mem-name' : 'gp-mem-text'}>{card.text}</span>
                  </div>
                ))}
              </div>
              {color && (
                <>
                  <div className="page-break" />
                  <h2>Verso das cartas (imprima no verso da folha, se quiser)</h2>
                  <div className="gp-grid gp-4">{Array.from({ length: c.pairs.length * 2 }).map((_, i) => <div key={i} className="gp-card gp-verso" />)}</div>
                </>
              )}
            </>
          )}

          {c.kind === 'sequencia' && (
            <>
              <p className="small"><strong>{c.prompt}</strong> Recorte os cartões e organizem a ordem em grupo.</p>
              <div className="gp-grid gp-3">
                {shuffle(c.items, seed).map((it) => (
                  <div key={it.id} className="gp-card gp-seq">{color && <Pic id={it.artId} size="90%" />}<strong>{it.label}</strong></div>
                ))}
              </div>
              {key && <><div className="page-break" /><h2>Gabarito</h2><ol>{c.items.map((it) => <li key={it.id}><strong>{it.label}</strong> — {it.detail}</li>)}</ol><p>{c.explanation}</p></>}
            </>
          )}

          {c.kind === 'classificacao' && (
            <>
              <p className="small"><strong>{c.prompt}</strong> Recorte os itens e cole na coluna certa.</p>
              <div className="gp-grid" style={{ gridTemplateColumns: `repeat(${Math.min(c.categories.length, 6)}, 1fr)` }}>
                {c.categories.map((cat) => <div key={cat.id} className="gp-card gp-cat">{color && <Pic id={cat.sprite} size={56} />}<strong>{cat.label}</strong><div className="gp-drop" /></div>)}
              </div>
              <h2>Itens para recortar</h2>
              <div className="gp-grid gp-5">
                {shuffle(c.items, seed).map((it) => <div key={it.id} className="gp-card gp-item">{color && <Pic id={it.sprite} size={60} />}<span>{it.label}</span></div>)}
              </div>
              {key && <><div className="page-break" /><h2>Gabarito</h2><ul>{c.items.map((it) => <li key={it.id}><strong>{it.label}</strong> → {c.categories.find((x) => x.id === it.category)?.label}. {it.explanation}</li>)}</ul></>}
            </>
          )}

          {c.kind === 'associacao' && (
            <>
              <p className="small"><strong>{c.prompt}</strong> Ligue cada item da esquerda ao da direita.</p>
              <div className="gp-two">
                <ol>{shuffle(c.pairs, seed).map((p) => <li key={p.id}>{p.left}</li>)}</ol>
                <ol type="A">{shuffle(c.pairs, seed + 3).map((p) => <li key={p.id}>{p.right}</li>)}</ol>
              </div>
              {key && <><div className="page-break" /><h2>Gabarito</h2><ul>{c.pairs.map((p) => <li key={p.id}>{p.left} = {p.right}. {p.explanation}</li>)}</ul></>}
            </>
          )}

          {c.kind === 'quiz' && (
            <>
              <ol>{c.questions.map((q, qi) => <li key={q.id} style={{ marginBottom: 10 }}><strong>{q.prompt}</strong><ol type="A">{shuffle(q.options.map((_, k) => k), seed + qi * 13).map((k) => <li key={k}>{q.options[k]}</li>)}</ol></li>)}</ol>
              {key && <><div className="page-break" /><h2>Gabarito</h2><ol>{c.questions.map((q, qi) => <li key={q.id}>{String.fromCharCode(65 + shuffle(q.options.map((_, k) => k), seed + qi * 13).indexOf(q.correct))} — {q.explanation}</li>)}</ol></>}
            </>
          )}

          {c.kind === 'pistas' && (
            <>
              <p>{c.intro}</p>
              <div className="gp-grid gp-2">{c.steps.map((st, i) => <div key={st.id} className="gp-card gp-clue"><strong>Pista {i + 1}</strong><p>{st.clue}</p><p><em>{st.question}</em></p><div className="lines" /></div>)}</div>
              {key && <><div className="page-break" /><h2>Gabarito</h2><ol>{c.steps.map((st) => <li key={st.id}>{st.answers[0]} — {st.explanation}</li>)}</ol><p>{c.finale}</p></>}
            </>
          )}
        </section>
      )}
    </div>
  );
}
