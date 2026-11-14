import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Send, Sparkles } from 'lucide-react';
import { Art } from '../components/Art';
import { Notice, PageHead, toast } from '../components/ui';
import { GAME_ACTIVITIES, STORIES } from '../content';
import { actions, useApp } from '../store/store';
import { can } from '../store/permissions';

export default function Student() {
  const s = useApp();
  const turma = s.turmas.find((t) => t.id === s.activeTurmaId);
  const items = s.released.map((k) => {
    const [type, id] = k.split(':');
    if (type === 'game') { const g = GAME_ACTIVITIES.find((x) => x.id === id); return g && { key: k, title: g.title, path: `/jogos/${g.id}`, art: g.artId, icon: Gamepad2 }; }
    if (type === 'story') { const st = STORIES.find((x) => x.id === id); return st && { key: k, title: st.title, path: `/historias/${st.id}`, art: st.artId, icon: Sparkles }; }
    return undefined;
  }).filter(Boolean);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  return (
    <div className="stack">
      <PageHead kicker={`Perfil Aluno · ${turma?.name ?? ''}`} title="Minhas atividades" sub="Aqui aparecem as atividades que sua professora ou seu professor liberou." />
      <Notice kind="info">Visualização demonstrativa do perfil Aluno, neste mesmo navegador. Sem login: não use para dados pessoais.</Notice>
      {items.length === 0 ? <div className="empty">Nenhuma atividade liberada ainda. (Professor: libere em Minhas turmas → Acompanhamento.)</div> : (
        <div className="grid auto-fill">{items.map((it) => it && (
          <Link key={it.key} to={it.path} className="card-link"><Art id={it.art} ratio={16 / 9} decorative /><div className="card-body"><span className="badge cyan" style={{ alignSelf: 'flex-start' }}><it.icon size={13} /> Liberada</span><h3>{it.title}</h3></div></Link>
        ))}</div>
      )}
      {can(s.user.role, 'production.submit') && (
        <section className="panel stack-sm" style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: '1.2rem' }}>Enviar uma produção</h2>
          <input className="input" placeholder="Seu nome ou do grupo" value={name} onChange={(e) => setName(e.target.value)} aria-label="Autor" />
          <input className="input" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} aria-label="Título" />
          <textarea className="input" rows={5} placeholder="Escreva aqui…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Texto" />
          <button className="btn primary" style={{ alignSelf: 'flex-start' }} disabled={!text.trim() || !title.trim()} onClick={() => { actions.addProduction({ turmaId: turma?.id, authorLabel: name.trim() || 'Estudante', kind: 'texto', title: title.trim(), content: text.trim() }); setText(''); setTitle(''); toast('Produção enviada ao portfólio da turma'); }}><Send /> Enviar</button>
        </section>
      )}
    </div>
  );
}

export function StudentPortfolio() {
  const s = useApp();
  const items = s.productions.filter((p) => p.turmaId === s.activeTurmaId);
  return (
    <div className="stack">
      <PageHead kicker="Perfil Aluno" title="Portfólio da turma" sub="Produções, registros e conquistas da turma." />
      {items.length === 0 && <div className="empty">Ainda não há produções.</div>}
      <div className="grid g3">{items.map((p) => <article key={p.id} className="panel tight"><span className="badge cyan">{p.kind}</span><h3 className="mt">{p.title}</h3><p className="xs muted">{p.authorLabel}</p><p className="small" style={{ whiteSpace: 'pre-wrap' }}>{p.content}</p></article>)}</div>
    </div>
  );
}
