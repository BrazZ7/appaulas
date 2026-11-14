import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Plus, Users } from 'lucide-react';
import { Art } from '../components/Art';
import { DemoBadge, Modal, PageHead, toast } from '../components/ui';
import { actions, uid, useApp } from '../store/store';
import type { Turma } from '../types/models';

export default function Classes() {
  const s = useApp();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [ano, setAno] = useState(7);
  const [turno, setTurno] = useState<Turma['turno']>('manha');
  const [names, setNames] = useState('');
  const create = () => {
    const st = names.split('\n').map((n) => n.trim()).filter(Boolean).map((n, i) => ({ id: uid(`s${i}`), displayName: n }));
    const t: Turma = { id: uid('t'), orgId: s.org.id, name: name.trim(), ano, etapa: ano <= 5 ? 'fundamental1' : 'fundamental2', turno, students: st, groups: [], resources: ['projetor'] };
    actions.saveTurma(t);
    actions.setTurma(t.id);
    setOpen(false);
    toast('Turma criada');
    nav(`/turmas/${t.id}`);
  };
  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="hero" style={{ minHeight: 200 }}>
        <Art id="hero-turmas" fill decorative eager />
        <div className="hero-content"><div className="kicker">Turmas e acompanhamento</div><h1>Minhas turmas</h1><p className="muted" style={{ margin: 0 }}>Grupos, portfólio e avaliação formativa — com registros reais das atividades, sem rótulos.</p></div>
      </section>
      <PageHead title="Turmas" actions={<button className="btn primary" onClick={() => setOpen(true)}><Plus /> Nova turma</button>} />
      <div className="grid auto-fill">
        {s.turmas.map((t) => {
          const prods = s.productions.filter((p) => p.turmaId === t.id).length;
          const games = s.gameSessions.filter((g) => g.turmaId === t.id).length;
          return (
            <Link key={t.id} to={`/turmas/${t.id}`} className="card-link panel" style={{ padding: 18 }}>
              <div className="row between"><span className="icon-tile"><Users /></span>{t.demo && <DemoBadge />}</div>
              <h3 className="mt">{t.name}</h3>
              <p className="small muted" style={{ margin: 0 }}>{t.students.length} estudantes · {t.groups.length} grupos · turno {({ manha: 'manhã', tarde: 'tarde', noite: 'noite', integral: 'integral' })[t.turno]}</p>
              <p className="xs faint" style={{ margin: '6px 0 0' }}>{prods} produção(ões) · {games} partida(s) registradas</p>
              <span className="small" style={{ marginTop: 8 }}>Abrir <ChevronRight size={14} /></span>
            </Link>
          );
        })}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Nova turma">
        <div className="stack">
          <label className="field"><span>Nome</span><input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex.: 8º ano C" /></label>
          <div className="grid g2">
            <label className="field"><span>Ano</span><select className="input" value={ano} onChange={(e) => setAno(Number(e.target.value))}>{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => <option key={a} value={a}>{a}º ano</option>)}</select></label>
            <label className="field"><span>Turno</span><select className="input" value={turno} onChange={(e) => setTurno(e.target.value as Turma['turno'])}><option value="manha">Manhã</option><option value="tarde">Tarde</option><option value="noite">Noite</option><option value="integral">Integral</option></select></label>
          </div>
          <label className="field"><span>Estudantes (um nome ou apelido por linha)</span><textarea className="input" rows={6} value={names} onChange={(e) => setNames(e.target.value)} /></label>
          <p className="xs muted">Por privacidade, registre apenas nomes de exibição. Não inclua documentos, endereços ou dados de saúde.</p>
          <button className="btn primary" disabled={!name.trim()} onClick={create}>Criar turma</button>
        </div>
      </Modal>
    </div>
  );
}
