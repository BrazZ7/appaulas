import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Printer } from 'lucide-react';
import { Switch } from '../components/ui';
import { SUBJECT_MAP, findLesson, refTitle } from '../content';
import { unnum, BLOCK_META } from '../lib/lesson';
import { actions, useApp } from '../store/store';
import { PrintBand } from '../components/PrintBand';

export default function LessonPrint() {
  const { id } = useParams();
  const s = useApp();
  const l = findLesson(id ?? '', s.myLessons);
  const [plan, setPlan] = useState(true);
  const [student, setStudent] = useState(true);
  const [key, setKey] = useState(true);
  const [lines, setLines] = useState(6);
  if (!l) return <div className="empty">Aula não encontrada. <Link to="/aulas">Voltar</Link></div>;
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);

  return (
    <div className="stack">
      <div className="no-print stack">
        <Link to={`/aulas/${l.id}`} className="small"><ChevronLeft size={14} /> Plano da aula</Link>
        <h1 style={{ margin: 0 }}>Imprimir kit — {l.title}</h1>
        <div className="panel row">
          <Switch label="Plano do professor" checked={plan} onChange={setPlan} />
          <Switch label="Folha do estudante" checked={student} onChange={setStudent} />
          <Switch label="Gabarito (folha separada)" checked={key} onChange={setKey} />
          <label className="row small">Linhas para resposta <input className="input" type="number" min={0} max={20} value={lines} onChange={(e) => setLines(Number(e.target.value))} style={{ width: 70 }} /></label>
          <button className="btn primary" onClick={() => window.print()}><Printer /> Imprimir / salvar PDF</button>
        </div>
        <div className="row">
          <Switch label="Economia de tinta (preto e branco)" checked={s.settings.inkSaver} onChange={(v) => actions.setSettings({ inkSaver: v })} />
          <span className="small muted">{s.settings.inkSaver ? 'Fundo branco, texto preto, sem cores.' : 'Versão colorida: títulos e destaques em cor, fundo branco.'} Prévia abaixo.</span>
        </div>
      </div>

      <div className="print-doc" style={{ background: '#fff', color: '#111', padding: 'clamp(16px,4vw,40px)', borderRadius: 12, maxWidth: 820, width: '100%', margin: '0 auto' }}>
        <style>{`html:not(.print-color) .print-doc, html:not(.print-color) .print-doc * { color: #111 !important; } .print-doc h2 { border-bottom: 2px solid #333; padding-bottom: 4px; margin-top: 18px; } .print-doc .lines { border-bottom: 1px solid #999; height: 26px; } .print-doc .page-break { border-top: 2px dashed #bbb; margin-top: 28px; padding-top: 18px; } @media print { .print-doc .page-break { border-top: 0; margin-top: 0; padding-top: 0; } .print-doc { padding: 0 !important; } }`}</style>
        {plan && (
          <section>
            <PrintBand subject={l.subjects[0]} /><h1 style={{ fontSize: '1.7rem' }}>{l.title}</h1>
            <p><strong>Matérias:</strong> {l.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')} · <strong>Público:</strong> {l.audience || l.anos.map((a) => `${a}º ano`).join(', ')} · <strong>Duração:</strong> {l.durationMin} min</p>
            <p>{l.summary}</p>
            <h2>Objetivos</h2><ul>{l.objectives.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h2>Materiais</h2><ul>{l.materials.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h2>Etapas</h2>
            <ol>{l.blocks.map((b) => (
              <li key={b.id} style={{ marginBottom: 8 }}>
                <strong>{b.title}</strong> ({BLOCK_META[b.kind].label}, {b.minutes} min) — {b.instructions}
                {b.resourceRef && <div><em>Recurso: {refTitle(b.resourceRef)}</em></div>}
                {b.offlineAlternative && <div><em>Sem dispositivos: {b.offlineAlternative}</em></div>}
              </li>
            ))}</ol>
            <h2>Como observar a aprendizagem</h2><ul>{l.observeLearning.map((x, i) => <li key={i}>{x}</li>)}</ul>
            <h2>Adaptações</h2><ul>{l.adaptations.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </section>
        )}
        {student && l.activity.title && (
          <section className={plan ? 'page-break' : ''}>
            <p style={{ display: 'flex', gap: 30 }}><span>Nome: ______________________________</span><span>Turma: {turma?.name ?? '_______'}</span><span>Data: ___/___/____</span></p>
            <PrintBand subject={l.subjects[0]} /><h1 style={{ fontSize: '1.5rem' }}>{l.activity.title}</h1>
            <ol>{l.activity.instructions.map((x, i) => (
              <li key={i} style={{ marginBottom: 14 }}>{unnum(x)}{Array.from({ length: lines }).map((_, k) => <div key={k} className="lines" />)}</li>
            ))}</ol>
          </section>
        )}
        {key && (l.activity.answerKey?.length ?? 0) > 0 && (
          <section className="page-break">
            <h1 style={{ fontSize: '1.4rem' }}>Gabarito — {l.activity.title}</h1>
            <p><em>Uso do professor.</em></p>
            <ol>{l.activity.answerKey!.map((x, i) => <li key={i}>{unnum(x)}</li>)}</ol>
          </section>
        )}
      </div>
    </div>
  );
}
