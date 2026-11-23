import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  Clapperboard, ChevronDown, Compass, Gamepad2, GraduationCap, House, Layers, Menu, Minimize, Search, Settings,
  Users, CalendarDays, NotebookPen, Library, Bell, Shield, LogOut,
  FileCheck2, Trophy,
} from 'lucide-react';
import { actions, useApp } from '../store/store';
import { useAuth } from '../lib/auth';
import { buildIndex, search } from '../content';
import { ROLE_LABEL } from '../store/permissions';
import { Modal, Toasts } from './ui';
import { SyncBadge } from './SyncStatus';
import type { Role } from '../types/models';

export function Logo({ size = 40 }: { size?: number }) {
  const u = useId().replace(/:/g, '');
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <defs>
        <linearGradient id={`${u}a`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3ff2df" />
          <stop offset="1" stopColor="#19a5d6" />
        </linearGradient>
        <linearGradient id={`${u}b`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <path d="M24 12c-5-4-12-5-19-4v28c7-1 14 0 19 4z" fill={`url(#${u}a)`} opacity=".95" />
      <path d="M24 12c5-4 12-5 19-4v28c-7-1-14 0-19 4z" fill={`url(#${u}b)`} opacity=".95" />
      <path d="M24 12v28" stroke="#060a22" strokeWidth="1.6" />
      <path d="M9 15c4-.4 8 .3 11 2M9 21c4-.4 8 .3 11 2M28 17c3-1.7 7-2.4 11-2M28 23c3-1.7 7-2.4 11-2" stroke="#060a22" strokeWidth="1.5" strokeLinecap="round" opacity=".55" />
      <circle cx="37" cy="7" r="2.2" fill="#fde68a" />
    </svg>
  );
}

const NAV_TEACHER = [
  { to: '/', label: 'Início', icon: House, end: true },
  { to: '/materias', label: 'Matérias', icon: Layers },
  { to: '/imersoes', label: 'Imersões', icon: Compass },
  { to: '/jogos', label: 'Jogos', icon: Gamepad2 },
  { to: '/imprimiveis', label: 'Imprimíveis', icon: Library },
  { to: '/desafios', label: 'Desafios', icon: Trophy },
  { to: '/estudio', label: 'Estúdio', icon: Clapperboard },
  { to: '/turmas', label: 'Minhas turmas', icon: Users },
];
const NAV_EXTRA = [
  { to: '/aulas', label: 'Planejador', icon: NotebookPen },
  { to: '/provas', label: 'Provas', icon: FileCheck2 },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/formacao', label: 'Formação do professor', icon: GraduationCap },
];
const NAV_STUDENT = [
  { to: '/aluno', label: 'Minhas atividades', icon: House, end: true },
  { to: '/aluno/portfolio', label: 'Portfólio', icon: Library },
];
const NAV_COORD = [
  { to: '/coordenacao', label: 'Coordenação', icon: House, end: true },
  { to: '/materias', label: 'Matérias', icon: Layers },
  { to: '/aulas', label: 'Biblioteca de aulas', icon: NotebookPen },
  { to: '/projetos/nossa-cidade-sustentavel', label: 'Projetos', icon: Compass },
  { to: '/formacao', label: 'Formação', icon: GraduationCap },
];

function useHtmlClasses() {
  const { settings } = useApp();
  useEffect(() => {
    const h = document.documentElement;
    h.classList.toggle('projector', settings.projector);
    h.classList.toggle('simple', settings.simpleMode);
    h.classList.toggle('reduce-motion', settings.reduceMotion);
    h.classList.toggle('contrast', settings.highContrast);
    h.classList.toggle('print-color', !settings.inkSaver);
    h.style.setProperty('--fs', String(settings.fontScale));
  }, [settings]);
}

function SearchBox() {
  const s = useApp();
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [hl, setHl] = useState(0);
  const index = useMemo(() => buildIndex(s.myLessons), [s.myLessons]);
  const results = useMemo(() => search(index, q, 10), [index, q]);
  const wrap = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);
  const go = (path: string) => { setOpen(false); setQ(''); nav(path); };
  return (
    <div className="search" ref={wrap}>
      <Search aria-hidden />
      <input
        type="search"
        placeholder="Buscar aulas, histórias, jogos, temas e objetivos…"
        aria-label="Buscar"
        role="combobox"
        aria-expanded={open && results.length > 0}
        aria-controls="search-results"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setHl(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setHl((h) => Math.min(h + 1, results.length - 1)); }
          if (e.key === 'ArrowUp') { e.preventDefault(); setHl((h) => Math.max(h - 1, 0)); }
          if (e.key === 'Enter') {
            if (results[hl]) go(results[hl].path);
            else if (q.trim()) go(`/busca?q=${encodeURIComponent(q.trim())}`);
          }
          if (e.key === 'Escape') setOpen(false);
        }}
      />
      {open && q.trim().length > 1 && (
        <div className="search-results" id="search-results" role="listbox">
          {results.length === 0 && <div className="muted small" style={{ padding: 12 }}>Nada encontrado para “{q}”.</div>}
          {results.map((r, i) => (
            <a key={r.key} href={`#${r.path}`} role="option" aria-selected={i === hl} className={i === hl ? 'hl' : ''} onClick={(e) => { e.preventDefault(); go(r.path); }}>
              <span className="badge cyan" style={{ minWidth: 86, justifyContent: 'center' }}>{r.kind}</span>
              <span>{r.title}</span>
            </a>
          ))}
          {results.length > 0 && (
            <a href={`#/busca?q=${encodeURIComponent(q)}`} onClick={(e) => { e.preventDefault(); go(`/busca?q=${encodeURIComponent(q.trim())}`); }} className="small muted">
              Ver todos os resultados e filtros →
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileMenu() {
  const s = useApp();
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const nav = useNavigate();
  const setRole = (r: Role) => {
    actions.setRole(r);
    setOpen(false);
    nav(r === 'aluno' ? '/aluno' : r === 'coordenacao' ? '/coordenacao' : '/');
  };
  return (
    <>
      <button className="btn ghost" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <span aria-hidden style={{ width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg,#8b5cf6,#2ee6d6)', color: '#061226', fontWeight: 800 }}>
          {s.user.role === 'aluno' ? 'A' : s.user.displayName[0]}
        </span>
        <span className="hide-mobile">{s.user.role === 'professor' ? `Prof.ª ${s.user.displayName}` : ROLE_LABEL[s.user.role]}</span>
        <ChevronDown className="hide-mobile" />
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Perfil e ajustes">
        {auth.ativo ? (
          <p className="small"><strong>{auth.perfil?.nome || auth.perfil?.email}</strong><br /><span className="muted">{auth.perfil?.email} · {auth.perfil?.role === 'superadmin' ? 'Superadmin' : 'Assinante'}</span></p>
        ) : (
          <p className="muted small">
            <strong>Modo demonstrativo:</strong> não há login nem servidor. Trocar de perfil apenas simula o que cada pessoa vê — não é um controle de acesso seguro.
          </p>
        )}
        <div className="stack">
          {(!auth.ativo || auth.perfil?.role === 'superadmin') && <span className="label">Ver o Ensinaê como</span>}
          {(!auth.ativo || auth.perfil?.role === 'superadmin') && <div className="row">
            {(['professor', 'aluno', 'coordenacao'] as Role[]).map((r) => (
              <button key={r} className={`chip ${s.user.role === r ? 'on' : ''}`} aria-pressed={s.user.role === r} onClick={() => setRole(r)}>
                {ROLE_LABEL[r]}
              </button>
            ))}
          </div>}
          <hr className="sep" />
          <button className="btn" onClick={() => { setOpen(false); nav('/ajustes'); }}>
            <Settings /> Acessibilidade, dados e ajustes
          </button>
          {auth.perfil?.role === 'superadmin' && <button className="btn" onClick={() => { setOpen(false); nav('/admin'); }}><Shield /> Assinantes e acessos</button>}
          {auth.ativo && <button className="btn ghost" onClick={() => auth.sair()}><LogOut /> Sair</button>}
        </div>
      </Modal>
    </>
  );
}

export function Layout() {
  useHtmlClasses();
  const auth = useAuth();
  const s = useApp();
  const loc = useLocation();
  const [more, setMore] = useState(false);
  const role = s.user.role;
  const nav = role === 'aluno' ? NAV_STUDENT : role === 'coordenacao' ? NAV_COORD : NAV_TEACHER;
  const turmas = s.turmas;
  useEffect(() => { window.scrollTo(0, 0); setMore(false); }, [loc.pathname]);
  const todayCount = s.agenda.filter((a) => a.date === new Date().toISOString().slice(0, 10)).length;

  return (
    <div className="app">
      <a href="#conteudo" className="skip-link" onClick={(e) => { e.preventDefault(); document.getElementById('conteudo')?.focus(); }}>Pular para o conteúdo</a>
      <aside className="sidebar" aria-label="Navegação principal">
        <NavLink to={role === 'aluno' ? '/aluno' : '/'} className="brand" aria-label="Ensinaê — início">
          <Logo />
          <span>
            <span className="brand-name">Ensina<b>ê</b></span>
            <span className="brand-sub">cada aula, uma descoberta</span>
          </span>
        </NavLink>
        <nav className="stack-sm">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={'end' in n ? n.end : false} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={n.label}>
              <n.icon /> <span>{n.label}</span>
            </NavLink>
          ))}
          {role === 'professor' && (
            <>
              <div className="nav-sep" />
              {NAV_EXTRA.map((n) => (
                <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title={n.label}>
                  <n.icon /> <span>{n.label}</span>
                </NavLink>
              ))}
            </>
          )}
          {auth.perfil?.role === 'superadmin' && (
            <NavLink to="/admin" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Assinantes e acessos">
              <Shield /> <span>Assinantes</span>
            </NavLink>
          )}
        </nav>
        <div className="sidebar-foot stack-sm">
          <NavLink to="/ajustes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} title="Ajustes">
            <Settings /> <span>Ajustes</span>
          </NavLink>
          <span className="demo-pill label-full" title="Dados salvos apenas neste navegador">● Modo demonstrativo</span>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <NavLink to="/" className="mobile-only" aria-label="Início"><Logo size={34} /></NavLink>
          <SearchBox />
          {role !== 'aluno' && (
            <label className="hide-mobile" style={{ position: 'relative' }}>
              <span className="sr-only">Turma ativa</span>
              <select className="input" value={s.activeTurmaId} onChange={(e) => actions.setTurma(e.target.value)} style={{ minWidth: 150, fontWeight: 700 }}>
                {turmas.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
          )}
          <SyncBadge />
          {role === 'professor' && (
            <NavLink to="/calendario" className="btn icon ghost hide-mobile" aria-label={`Agenda: ${todayCount} aula(s) hoje`} title="Agenda de hoje" style={{ position: 'relative' }}>
              <Bell />
              {todayCount > 0 && <span style={{ position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: '50%', background: 'var(--violet-2)' }} />}
            </NavLink>
          )}
          <ProfileMenu />
        </header>
        <main id="conteudo" tabIndex={-1} className="page" style={{ outline: 'none' }}>
          <Outlet />
        </main>
      </div>

      <nav className="bottom-nav" aria-label="Navegação inferior">
        {(role === 'professor' ? NAV_TEACHER.slice(0, 4) : nav.slice(0, 4)).map((n) => (
          <NavLink key={n.to} to={n.to} end={'end' in n ? n.end : false} className={({ isActive }) => (isActive ? 'active' : '')}>
            <n.icon /> {n.label.replace('Minhas ', '')}
          </NavLink>
        ))}
        <button onClick={() => setMore(true)} aria-haspopup="dialog"><Menu /> Mais</button>
      </nav>
      <Modal open={more} onClose={() => setMore(false)} title="Mais">
        <div className="stack-sm">
          {role !== 'aluno' && (
            <label className="field">
              <span>Turma ativa</span>
              <select className="input" value={s.activeTurmaId} onChange={(e) => actions.setTurma(e.target.value)}>
                {turmas.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </label>
          )}
          {[...(role === 'professor' ? [...NAV_TEACHER.slice(4), ...NAV_EXTRA] : nav.slice(4)), { to: '/ajustes', label: 'Ajustes e acessibilidade', icon: Settings }].map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
              <n.icon /> <span style={{ display: 'inline' }}>{n.label}</span>
            </NavLink>
          ))}
        </div>
      </Modal>

      <div className="projector-bar">
        <button className="btn sm" onClick={() => actions.setSettings({ projector: false })}>
          <Minimize /> Sair do modo projetor
        </button>
      </div>
      <Toasts />
    </div>
  );
}
