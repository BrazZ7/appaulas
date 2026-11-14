import { Link } from 'react-router-dom';
import { BookOpen, Compass, GraduationCap, Layers, Share2, Users } from 'lucide-react';
import { Notice, PageHead } from '../components/ui';
import { IMMERSIONS, LESSONS, MICRO_IMMERSIONS, PROJECTS, SUBJECT_MAP } from '../content';
import { useApp } from '../store/store';

export default function Coordination() {
  const s = useApp();
  const shared = s.myLessons.filter((l) => l.sharing === 'escola');
  const finishedTraining = Object.entries(s.training).filter(([, v]) => v.finished).length;
  return (
    <div className="stack">
      <PageHead kicker={`Coordenação · ${s.org.name}`} title="Bibliotecas e projetos pedagógicos" sub="Organize os modelos compartilhados e acompanhe os projetos interdisciplinares." />
      <Notice kind="info">Perfil demonstrativo. Em produção, a coordenação veria apenas dados agregados das turmas da própria escola, com controle de acesso no servidor.</Notice>
      <div className="grid g4">
        {[[LESSONS.length, 'aulas na biblioteca', BookOpen], [shared.length, 'modelos compartilhados pela escola', Share2], [IMMERSIONS.filter((i) => i.status === 'disponivel').length, 'imersões disponíveis', Compass], [finishedTraining, 'microimersões concluídas (este navegador)', GraduationCap]].map(([n, l, I]) => {
          const Icon = I as typeof BookOpen;
          return <div key={String(l)} className="panel tight center"><Icon color="var(--cyan)" /><div className="num" style={{ fontSize: '2rem', fontWeight: 800 }}>{n as number}</div><span className="small muted">{l as string}</span></div>;
        })}
      </div>
      <div className="grid g2">
        <section className="panel">
          <div className="panel-title"><Share2 /><h2 style={{ fontSize: '1.2rem' }}>Modelos compartilhados</h2></div>
          {shared.length === 0 ? <p className="small muted">Nenhum professor compartilhou modelos ainda (opção “Modelo para a escola” no plano da aula).</p> : (
            <ul className="clean stack-sm">{shared.map((l) => <li key={l.id} className="list-item" style={{ margin: 0 }}><span className="grow"><Link to={`/aulas/${l.id}`}>{l.title}</Link><br /><span className="xs muted">{l.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')}</span></span></li>)}</ul>
          )}
        </section>
        <section className="panel">
          <div className="panel-title"><Layers /><h2 style={{ fontSize: '1.2rem' }}>Projetos interdisciplinares</h2></div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="stack-sm">
              <Link to={`/projetos/${p.id}`}><strong>{p.title}</strong></Link>
              <span className="small muted">{p.drivingQuestion}</span>
              <span className="xs">{p.stages.length} etapas · {p.subjects.map((x) => SUBJECT_MAP[x]?.name).join(', ')}</span>
            </div>
          ))}
        </section>
        <section className="panel">
          <div className="panel-title"><GraduationCap /><h2 style={{ fontSize: '1.2rem' }}>Formação da equipe</h2></div>
          <ul className="clean stack-sm">{MICRO_IMMERSIONS.map((t) => <li key={t.id} className="small row between"><span>{t.title}</span><span className={`badge ${t.status === 'disponivel' ? 'cyan' : 'amber'}`}>{t.status === 'disponivel' ? 'Disponível' : 'Em preparo'}</span></li>)}</ul>
        </section>
        <section className="panel">
          <div className="panel-title"><Users /><h2 style={{ fontSize: '1.2rem' }}>Turmas da escola</h2></div>
          <ul className="clean stack-sm">{s.turmas.map((t) => <li key={t.id} className="small">{t.name} — {s.productions.filter((p) => p.turmaId === t.id).length} produções no portfólio</li>)}</ul>
        </section>
      </div>
    </div>
  );
}
