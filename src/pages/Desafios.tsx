/** Desafios da turma, roteiros de apresentação e projetos de Feira de Ciências — com passo a passo animado. */
import { useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  AlertTriangle, ChevronLeft, ChevronRight, Clapperboard, FlaskConical, HeartHandshake, ListOrdered, Printer, Sparkles, Theater, Trophy, Users,
} from 'lucide-react';
import { Cena } from '../components/Cena';
import { Modal, Notice, PageHead, Tabs, toast } from '../components/ui';
import { APRESENTACOES, DESAFIOS_TURMA, PROJETOS_FEIRA, findDesafio, resumoParaTurma, type Desafio } from '../content/desafios';
import { SUBJECTS } from '../content';
import { actions, now, uid, useApp } from '../store/store';
import type { VideoProject } from '../types/models';

type Aba = 'turma' | 'apresentacoes' | 'projetos';
const TIPO_ITEM = { desafio: 'desafio', apresentacao: 'tema', projeto: 'tema' } as const;
const anosLabel = (a: number[]) => `${a[0]}º ao ${a[a.length - 1]}º ano`;

function Card({ d }: { d: Desafio }) {
  return (
    <Link to={`/desafios/${d.id}`} className="panel tight stack-sm" style={{ textDecoration: 'none', color: 'inherit', borderTop: `4px solid ${d.cor}` }}>
      <Cena id={d.capa} />
      <div className="row between nowrap">
        {d.data ? <span className="badge amber">{d.data}</span> : <span className="badge">{d.duracao}</span>}
        <span className="xs muted">{anosLabel(d.anos)}</span>
      </div>
      <strong>{d.title}</strong>
      <span className="small muted">{d.subtitle}</span>
    </Link>
  );
}

export default function Desafios() {
  const [params, setParams] = useSearchParams();
  const aba = (params.get('aba') as Aba) || 'turma';
  const lista = aba === 'turma' ? DESAFIOS_TURMA : aba === 'apresentacoes' ? APRESENTACOES : PROJETOS_FEIRA;
  return (
    <div className="stack">
      <PageHead kicker="Projetos e datas especiais" title="Desafios e apresentações"
        sub="Desafios para a turma toda, roteiros prontos para datas comemorativas (que também viram filme) e projetos de Feira de Ciências com passo a passo ilustrado e animado." />
      <Tabs label="Seções" value={aba} onChange={(v) => setParams({ aba: v })} items={[
        { id: 'turma', label: `Desafios da turma (${DESAFIOS_TURMA.length})`, icon: <Trophy size={16} /> },
        { id: 'apresentacoes', label: `Roteiros de apresentação (${APRESENTACOES.length})`, icon: <Theater size={16} /> },
        { id: 'projetos', label: `Feira de Ciências (${PROJETOS_FEIRA.length})`, icon: <FlaskConical size={16} /> },
      ]} />
      {aba === 'apresentacoes' && <Notice kind="info">Todo roteiro de apresentação pode virar o <Link to="/desafios/nosso-filme"><strong>Desafio: nosso filme</strong></Link> — abra o roteiro e use “Transformar em filme”.</Notice>}
      <div className="grid g3">{lista.map((d) => <Card key={d.id} d={d} />)}</div>
    </div>
  );
}

function PassoAPasso({ d }: { d: Desafio }) {
  const [i, setI] = useState(0);
  const p = d.passos[i];
  return (
    <section className="panel stack">
      <div className="row between">
        <h2 style={{ margin: 0 }}><ListOrdered size={20} /> Passo a passo</h2>
        <span className="small muted">Passo {i + 1} de {d.passos.length}</span>
      </div>
      <div className="row" role="tablist" aria-label="Passos">{d.passos.map((x, k) => <button key={k} role="tab" aria-selected={k === i} className={`chip ${k === i ? 'on' : ''}`} onClick={() => setI(k)}>{k + 1}. {x.titulo}</button>)}</div>
      <div className="passo-grid">
        <Cena key={`${d.id}-${i}`} id={p.cena} />
        <div className="stack-sm">
          <h3 style={{ margin: 0 }}>{i + 1}. {p.titulo}</h3>
          {p.tempo && <span className="badge" style={{ alignSelf: 'flex-start' }}>⏱ {p.tempo}</span>}
          <p style={{ margin: 0, fontSize: '1.08rem' }}>{p.texto}</p>
          {p.dica && <p className="small" style={{ margin: 0 }}><Sparkles size={14} /> <strong>Dica:</strong> {p.dica}</p>}
          <div className="row mt">
            <button className="btn" disabled={i === 0} onClick={() => setI(i - 1)}><ChevronLeft /> Anterior</button>
            <button className="btn primary" disabled={i === d.passos.length - 1} onClick={() => setI(i + 1)}>Próximo <ChevronRight /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Roteiro({ d }: { d: Desafio }) {
  if (!d.roteiro) return null;
  return (
    <section className="panel stack">
      <h2 style={{ margin: 0 }}><Theater size={20} /> Roteiro</h2>
      {d.personagens && <p className="small" style={{ margin: 0 }}><strong>Personagens:</strong> {d.personagens.join(' · ')}</p>}
      {d.roteiro.map((c, k) => (
        <article key={k} className="passo-grid" style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <Cena id={c.cena} />
          <div className="stack-sm">
            <h3 style={{ margin: 0 }}>{c.titulo}</h3>
            <span className="xs muted">{c.local} · {c.duracao}</span>
            {c.falas.map((f, j) => (
              <div key={j} className="roteiro-fala">
                <b>{f.quem}</b>{f.texto && <>: {f.texto}</>}
                {f.acao && <div className="small muted"><em>({f.acao})</em></div>}
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}

function paraVideo(d: Desafio): VideoProject {
  const scenes = (d.roteiro ?? []).map((c) => ({
    id: uid('sc'), title: c.titulo,
    script: c.falas.map((f) => `${f.quem.toUpperCase()}: ${f.texto}${f.acao ? ` (${f.acao})` : ''}`).join('\n'),
    visuals: `Local: ${c.local}`,
    narration: c.falas.filter((f) => f.texto).map((f) => f.texto).join(' '),
    captions: c.falas.filter((f) => f.texto).map((f) => `${f.quem}: ${f.texto}`).join(' '),
    durationSec: Math.max(20, (parseInt(c.duracao, 10) || 1) * 20),
  }));
  return {
    id: uid('vid'), title: `Filme: ${d.title}`, theme: d.subtitle, objective: d.objetivos[0] ?? '', audience: 'Comunidade escolar', scenes, fileIds: [],
    questionsBefore: ['O que vocês já sabem sobre este tema?'], questionsAfter: ['O que o filme mostrou que vocês não sabiam?', 'O que podemos fazer a partir disso?'],
    status: 'rascunho', source: 'producao-propria', reviewNotes: `Criado a partir do roteiro “${d.title}” (Desafios).`, updatedAt: now(),
  };
}

export function DesafioPage() {
  const { id } = useParams();
  const s = useApp();
  const nav = useNavigate();
  const d = findDesafio(id ?? '');
  const [turmaOpen, setTurmaOpen] = useState(false);
  const [turmas, setTurmas] = useState<string[]>([]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  if (!d) return <div className="empty">Não encontrado. <Link to="/desafios">Voltar</Link></div>;
  const voltar = d.tipo === 'desafio' ? 'turma' : d.tipo === 'apresentacao' ? 'apresentacoes' : 'projetos';
  const virarFilme = () => { const v = paraVideo(d); actions.saveVideo(v); toast('Roteiro enviado ao Estúdio como projeto de filme'); nav(`/estudio?video=${v.id}`); };
  const subjects = d.subjects.map((x) => SUBJECTS.find((y) => y.id === x)?.name).filter(Boolean).join(' · ');
  return (
    <div className="stack">
      <Link to={`/desafios?aba=${voltar}`} className="small no-print"><ChevronLeft size={14} /> Desafios e apresentações</Link>
      <div className="split-wide no-print">
        <div className="stack-sm">
          <span className="badge" style={{ alignSelf: 'flex-start', background: d.cor, color: '#111' }}>{d.tipo === 'desafio' ? 'Desafio da turma' : d.tipo === 'apresentacao' ? `Apresentação${d.data ? ` · ${d.data}` : ''}` : 'Feira de Ciências'}</span>
          <h1 style={{ margin: 0 }}>{d.title}</h1>
          <p className="muted" style={{ margin: 0 }}>{d.subtitle}</p>
          <p style={{ margin: 0 }}>{d.resumo}</p>
          <p className="small muted" style={{ margin: 0 }}>{subjects} · {anosLabel(d.anos)} · {d.duracao} · {d.participantes}</p>
          <div className="row mt">
            <button className="btn primary" onClick={() => setTurmaOpen(true)}><Users /> Adicionar a uma turma</button>
            {d.roteiro && <button className="btn" onClick={virarFilme}><Clapperboard /> Transformar em filme</button>}
            {d.id === 'nosso-filme' && <Link className="btn" to="/desafios?aba=apresentacoes"><Theater /> Escolher um roteiro pronto</Link>}
            <button className="btn ghost" onClick={() => window.print()}><Printer /> Imprimir / PDF</button>
          </div>
        </div>
        <div style={{ maxWidth: 380, width: '100%', justifySelf: 'center' }}><Cena id={d.capa} /></div>
      </div>

      <div className="grid g2 no-print">
        <section className="panel stack-sm"><h3 style={{ margin: 0 }}>Objetivos</h3><ul className="bullets small">{d.objetivos.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section className="panel stack-sm"><h3 style={{ margin: 0 }}>Materiais</h3><ul className="bullets small">{d.materiais.map((x) => <li key={x}>{x}</li>)}</ul></section>
      </div>
      {d.ciencia && (
        <section className="panel stack-sm no-print">
          <h3 style={{ margin: 0 }}><FlaskConical size={18} /> A ciência por trás</h3>
          <p className="small" style={{ margin: 0 }}><strong>Pergunta:</strong> {d.ciencia.pergunta}</p>
          <p className="small" style={{ margin: 0 }}><strong>Hipótese possível:</strong> {d.ciencia.hipotese}</p>
          <p className="small" style={{ margin: 0 }}><strong>Explicação:</strong> {d.ciencia.explicacao}</p>
        </section>
      )}
      <div className="no-print"><PassoAPasso d={d} /></div>
      <div className="no-print"><Roteiro d={d} /></div>
      <div className="grid g3 no-print">
        {d.seguranca && <section className="panel stack-sm"><h3 style={{ margin: 0 }}><AlertTriangle size={18} /> Segurança</h3><ul className="bullets small">{d.seguranca.map((x) => <li key={x}>{x}</li>)}</ul></section>}
        {d.cuidados && <section className="panel stack-sm"><h3 style={{ margin: 0 }}><HeartHandshake size={18} /> Cuidados e respeito</h3><ul className="bullets small">{d.cuidados.map((x) => <li key={x}>{x}</li>)}</ul></section>}
        <section className="panel stack-sm"><h3 style={{ margin: 0 }}>Inclusão (TEA, TDAH e outras necessidades)</h3><ul className="bullets small">{d.inclusao.map((x) => <li key={x}>{x}</li>)}</ul></section>
        <section className="panel stack-sm"><h3 style={{ margin: 0 }}>Como avaliar</h3><ul className="bullets small">{d.avaliacao.map((x) => <li key={x}>{x}</li>)}</ul></section>
      </div>

      {/* Versão para impressão */}
      <div className="print-only print-doc">
        <div className="print-band" />
        <h1>{d.title}</h1>
        <p><em>{d.subtitle}</em> · {subjects} · {anosLabel(d.anos)} · {d.duracao}</p>
        <p>{d.resumo}</p>
        <h2>Objetivos</h2><ul>{d.objetivos.map((x) => <li key={x}>{x}</li>)}</ul>
        <h2>Materiais</h2><ul>{d.materiais.map((x) => <li key={x}>{x}</li>)}</ul>
        {d.ciencia && <><h2>A ciência por trás</h2><p><strong>Pergunta:</strong> {d.ciencia.pergunta}<br /><strong>Explicação:</strong> {d.ciencia.explicacao}</p></>}
        <h2>Passo a passo</h2>
        {d.passos.map((p, i) => <div key={i} className="passo-print"><Cena id={p.cena} /><div><h3>{i + 1}. {p.titulo}{p.tempo ? ` (${p.tempo})` : ''}</h3><p>{p.texto}</p>{p.dica && <p><em>Dica: {p.dica}</em></p>}</div></div>)}
        {d.roteiro && <><h2 className="page-break">Roteiro</h2>{d.personagens && <p><strong>Personagens:</strong> {d.personagens.join(', ')}</p>}{d.roteiro.map((c, k) => <div key={k} style={{ breakInside: 'avoid', marginBottom: 10 }}><h3>{c.titulo} — {c.local} ({c.duracao})</h3>{c.falas.map((f, j) => <p key={j} style={{ margin: '3px 0' }}><strong>{f.quem}:</strong> {f.texto} {f.acao && <em>({f.acao})</em>}</p>)}</div>)}</>}
        {d.seguranca && <><h2>Segurança</h2><ul>{d.seguranca.map((x) => <li key={x}>{x}</li>)}</ul></>}
        {d.cuidados && <><h2>Cuidados e respeito</h2><ul>{d.cuidados.map((x) => <li key={x}>{x}</li>)}</ul></>}
        <h2>Inclusão</h2><ul>{d.inclusao.map((x) => <li key={x}>{x}</li>)}</ul>
        <h2>Como avaliar</h2><ul>{d.avaliacao.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>

      <Modal open={turmaOpen} onClose={() => setTurmaOpen(false)} title={`Adicionar “${d.title}” ao planejamento`}>
        <div className="stack">
          <fieldset className="stack-sm" style={{ border: 0, padding: 0 }}><legend className="small" style={{ fontWeight: 700 }}>Turmas</legend>
            {s.turmas.map((t) => <label key={t.id} className="row nowrap"><input type="checkbox" checked={turmas.includes(t.id)} onChange={() => setTurmas(turmas.includes(t.id) ? turmas.filter((x) => x !== t.id) : [...turmas, t.id])} /> {t.name}</label>)}
          </fieldset>
          <label className="small row nowrap">Data prevista <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>
          <button className="btn primary" disabled={!turmas.length} onClick={() => {
            for (const tid of turmas) actions.saveItemTurma({ id: uid('it'), turmaId: tid, tipo: TIPO_ITEM[d.tipo], title: d.title, description: resumoParaTurma(d), date, status: 'planejado', createdAt: now(), updatedAt: now() });
            toast(`Adicionado a ${turmas.length} turma(s) — veja em Turmas › Atividades, desafios e provas`);
            setTurmas([]); setTurmaOpen(false);
          }}>Adicionar</button>
        </div>
      </Modal>
    </div>
  );
}
