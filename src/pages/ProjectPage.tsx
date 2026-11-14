import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ClipboardCheck, Flag, Package, Printer, Target } from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Steps, anosLabel } from '../components/ui';
import { PROJECTS, SUBJECT_MAP, refPath, refTitle } from '../content';
import { actions } from '../store/store';

export default function ProjectPage() {
  const { id } = useParams();
  const p = PROJECTS.find((x) => x.id === id);
  const [stage, setStage] = useState(0);
  useEffect(() => { if (p) actions.visit({ key: `proj:${p.id}`, title: p.title, path: `/projetos/${p.id}`, kind: 'Projeto' }); }, [p]);
  if (!p) return <div className="empty">Projeto não encontrado. <Link to="/materias">Voltar</Link></div>;
  const st = p.stages[stage];
  return (
    <div className="stack has-print" style={{ gap: 18 }}>
      <section className="hero" style={{ minHeight: 260 }}>
        <Art id={p.artId} fill eager decorative />
        <div className="hero-content">
          <Link to="/materias" className="small"><ChevronLeft size={14} /> Matérias</Link>
          <span className="badge" style={{ alignSelf: 'flex-start' }}><Flag size={12} /> Projeto interdisciplinar · {p.totalLessons} aulas · {anosLabel(p.anos)}</span>
          <h1>{p.title}</h1>
          <p style={{ margin: 0, fontSize: '1.15rem' }}><strong>Pergunta motivadora:</strong> {p.drivingQuestion}</p>
          <div className="row">{p.subjects.map((x) => <span key={x} className="chip xs">{SUBJECT_MAP[x]?.name}</span>)}<FavButton k={`proj:${p.id}`} title={p.title} /></div>
        </div>
      </section>
      <p className="muted" style={{ maxWidth: 900 }}>{p.summary}</p>
      <div className="panel tight"><Steps items={p.stages.map((_, i) => `Aula ${i + 1}`)} current={stage} /></div>
      <div className="row" role="group" aria-label="Etapas">{p.stages.map((x, i) => <button key={x.id} className={`chip ${stage === i ? 'on' : ''}`} aria-pressed={stage === i} onClick={() => setStage(i)}>{i + 1}. {x.title}</button>)}</div>
      <div className="split">
        <section className="panel stack anim-in" key={st.id}>
          <h2 style={{ margin: 0 }}>{st.title} <span className="small muted">· {st.lessons} aula(s)</span></h2>
          <p>{st.description}</p>
          <h3>Contribuição de cada matéria</h3>
          <ul className="clean stack-sm">{st.contributions.map((c, i) => <li key={i} className="list-item" style={{ margin: 0, alignItems: 'flex-start' }}><span className="badge" style={{ borderColor: SUBJECT_MAP[c.subject]?.color, minWidth: 110, justifyContent: 'center' }}>{SUBJECT_MAP[c.subject]?.name}</span><span className="small">{c.contribution}</span></li>)}</ul>
          <div className="grid g2">
            <div><h3>Atividades</h3><ul className="bullets small">{st.activities.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
            <div><h3><Package size={17} /> Produtos</h3><ul className="bullets small">{st.products.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
          </div>
          {st.resourceRefs?.length ? <div className="row">{st.resourceRefs.map((r) => <Link key={r.id} to={refPath(r)} className="btn outline-cyan sm">{refTitle(r)} <ArrowRight /></Link>)}</div> : null}
        </section>
        <aside className="stack">
          <section className="panel"><div className="panel-title"><Target /><h3 style={{ margin: 0 }}>Produto final</h3></div><p className="small">{p.finalProduct}</p></section>
          <section className="panel"><div className="panel-title"><ClipboardCheck /><h3 style={{ margin: 0 }}>Avaliação</h3></div><ul className="bullets small">{p.assessment.map((a, i) => <li key={i}>{a}</li>)}</ul></section>
          <section className="panel">
            <h3>{p.rubric.title}</h3>
            <div style={{ overflowX: 'auto' }}><table className="data xs"><tbody>{p.rubric.criteria.map((c) => <tr key={c.id}><th style={{ textTransform: 'none' }}>{c.label}</th>{c.levels.map((lv, i) => <td key={i}>{lv}</td>)}</tr>)}</tbody></table></div>
          </section>
          <section className="panel"><h3>Habilidades</h3><ul className="bullets small">{p.skills.map((a, i) => <li key={i}>{a}</li>)}</ul></section>
          <button className="btn" onClick={() => window.print()}><Printer /> Imprimir projeto</button>
        </aside>
      </div>
      <div className="print-only print-doc">
        <h1>{p.title}</h1><p><strong>Pergunta motivadora:</strong> {p.drivingQuestion}</p><p>{p.summary}</p>
        {p.stages.map((x, i) => <div key={x.id}><h2>Aula {i + 1}: {x.title}</h2><p>{x.description}</p><ul>{x.activities.map((a, k) => <li key={k}>{a}</li>)}</ul><p><strong>Produtos:</strong> {x.products.join('; ')}</p></div>)}
        <h2>Produto final</h2><p>{p.finalProduct}</p>
        <h2>{p.rubric.title}</h2><table style={{ borderCollapse: 'collapse', width: '100%' }}><tbody>{p.rubric.criteria.map((c) => <tr key={c.id}><th style={{ border: '1px solid #888', padding: 4 }}>{c.label}</th>{c.levels.map((lv, i) => <td key={i} style={{ border: '1px solid #888', padding: 4 }}>{lv}</td>)}</tr>)}</tbody></table>
      </div>
    </div>
  );
}
