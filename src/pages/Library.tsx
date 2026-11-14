import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, FlaskConical, Gamepad2, Compass, Link2, Play, RotateCcw, Users } from 'lucide-react';
import { Art } from '../components/Art';
import { FavButton, Notice, anosLabel, minutes } from '../components/ui';
import {
  GAME_ACTIVITIES, IMMERSIONS, LESSONS, PRESENTIAL_GAMES, PROJECTS, SIMULATIONS, STORIES, SUBJECTS, SUBJECT_MAP,
} from '../content';
import { ETAPA_LABEL, MODE_LABEL } from '../content/subjects';
import { useApp } from '../store/store';
import type { Difficulty, Etapa, LearningMode, Resource, SubjectId } from '../types/models';

export interface Filters { etapa: Etapa | ''; ano: number | 0; dur: '' | 'curta' | 'aula' | 'longa'; diff: Difficulty | ''; res: Resource | ''; mode: LearningMode | '' }
export const EMPTY_FILTERS: Filters = { etapa: '', ano: 0, dur: '', diff: '', res: '', mode: '' };

export const RESOURCE_LABEL: Record<Resource, string> = {
  projetor: 'Projetor', 'computador-unico': 'Um computador', 'dispositivos-grupo': 'Dispositivos por grupo',
  'dispositivos-individuais': 'Dispositivo por aluno', 'sem-internet': 'Funciona sem internet', 'sem-dispositivos': 'Sem dispositivos dos alunos', impressora: 'Impressora',
};
export const DIFF_LABEL: Record<Difficulty, string> = { introdutorio: 'Introdutório', intermediario: 'Intermediário', desafiador: 'Desafiador' };

export interface Item {
  key: string; kind: 'Aula' | 'História' | 'Jogo' | 'Imersão' | 'Simulação' | 'Brincadeira' | 'Projeto';
  title: string; summary: string; path: string; artId: string; subjects: SubjectId[]; anos: number[]; durationMin: number;
  difficulty?: Difficulty; resources: Resource[]; modes: LearningMode[]; etapa: Etapa;
}

export function allItems(mineLessons: import('../types/models').Lesson[] = []): Item[] {
  const f2 = (anos: number[]): Etapa => (anos.every((a) => a <= 5) ? 'fundamental1' : 'fundamental2');
  return [
    ...[...mineLessons, ...LESSONS].map((l) => ({ key: `lesson:${l.id}`, kind: 'Aula' as const, title: l.title, summary: l.summary, path: `/aulas/${l.id}`, artId: l.artId, subjects: l.subjects, anos: l.anos, durationMin: l.durationMin, difficulty: l.difficulty, resources: l.resources, modes: l.modes, etapa: l.etapa })),
    ...STORIES.map((s) => ({ key: `story:${s.id}`, kind: 'História' as const, title: s.title, summary: s.summary, path: `/historias/${s.id}`, artId: s.artId, subjects: s.subjects, anos: s.anos, durationMin: s.durationMin, resources: ['projetor', 'computador-unico', 'sem-dispositivos'] as Resource[], modes: ['historia', 'conversar'] as LearningMode[], etapa: f2(s.anos) })),
    ...GAME_ACTIVITIES.map((g) => ({ key: `game:${g.id}`, kind: 'Jogo' as const, title: g.title, summary: g.description, path: `/jogos/${g.id}`, artId: g.artId, subjects: g.subjects, anos: g.anos, durationMin: g.durationMin, difficulty: g.difficulty, resources: ['projetor', 'computador-unico', 'dispositivos-grupo', 'sem-dispositivos'] as Resource[], modes: ['jogar'] as LearningMode[], etapa: f2(g.anos) })),
    ...PRESENTIAL_GAMES.map((g) => ({ key: `play:${g.id}`, kind: 'Brincadeira' as const, title: g.title, summary: g.learningFocus, path: `/jogos?presencial=${g.id}`, artId: 'game-pistas', subjects: g.subjects, anos: g.anos, durationMin: g.durationMin, resources: ['sem-internet', 'sem-dispositivos'] as Resource[], modes: ['fora-da-tela', 'jogar'] as LearningMode[], etapa: f2(g.anos) })),
    ...IMMERSIONS.filter((i) => i.status === 'disponivel').map((i) => ({ key: `imm:${i.id}`, kind: 'Imersão' as const, title: i.title, summary: i.summary, path: `/imersoes/${i.id}`, artId: i.artId, subjects: i.subjects, anos: i.anos, durationMin: i.durationMin, resources: ['projetor', 'sem-dispositivos', 'impressora'] as Resource[], modes: ['historia', 'investigar', 'conversar'] as LearningMode[], etapa: f2(i.anos) })),
    ...SIMULATIONS.map((s) => ({ key: `sim:${s.id}`, kind: 'Simulação' as const, title: s.title, summary: s.summary, path: s.path, artId: s.artId, subjects: s.subjects, anos: [6, 7, 8, 9], durationMin: 50, resources: ['projetor', 'computador-unico', 'dispositivos-grupo'] as Resource[], modes: ['experimentar', 'investigar'] as LearningMode[], etapa: 'fundamental2' as Etapa })),
    ...PROJECTS.map((p) => ({ key: `proj:${p.id}`, kind: 'Projeto' as const, title: p.title, summary: p.summary, path: `/projetos/${p.id}`, artId: p.artId, subjects: p.subjects, anos: p.anos, durationMin: p.totalLessons * 50, resources: ['projetor', 'impressora'] as Resource[], modes: ['projeto', 'investigar', 'conversar'] as LearningMode[], etapa: f2(p.anos) })),
  ];
}

export function applyFilters(items: Item[], f: Filters) {
  return items.filter((it) =>
    (!f.etapa || it.etapa === f.etapa) &&
    (!f.ano || it.anos.includes(f.ano)) &&
    (!f.dur || (f.dur === 'curta' ? it.durationMin <= 30 : f.dur === 'aula' ? it.durationMin > 30 && it.durationMin <= 60 : it.durationMin > 60)) &&
    (!f.diff || it.difficulty === f.diff) &&
    (!f.res || it.resources.includes(f.res)) &&
    (!f.mode || it.modes.includes(f.mode)),
  );
}

export function FilterBar({ f, setF }: { f: Filters; setF: (f: Filters) => void }) {
  const sel = (label: string, value: string, on: (v: string) => void, opts: [string, string][]) => (
    <label className="field" style={{ minWidth: 150, flex: '1 1 150px' }}>
      <span>{label}</span>
      <select className="input" value={value} onChange={(e) => on(e.target.value)}>
        <option value="">Qualquer</option>
        {opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
  return (
    <div className="panel tight row" style={{ alignItems: 'flex-end' }} role="search" aria-label="Filtros">
      {sel('Etapa de ensino', f.etapa, (v) => setF({ ...f, etapa: v as Etapa }), Object.entries(ETAPA_LABEL).filter(([k]) => k.startsWith('fund')))}
      {sel('Ano', String(f.ano || ''), (v) => setF({ ...f, ano: Number(v) || 0 }), [1, 2, 3, 4, 5, 6, 7, 8, 9].map((a) => [String(a), `${a}º ano`]))}
      {sel('Duração', f.dur, (v) => setF({ ...f, dur: v as Filters['dur'] }), [['curta', 'Até 30 min'], ['aula', '31–60 min'], ['longa', 'Mais de 60 min']])}
      {sel('Dificuldade', f.diff, (v) => setF({ ...f, diff: v as Difficulty }), Object.entries(DIFF_LABEL))}
      {sel('Recursos disponíveis', f.res, (v) => setF({ ...f, res: v as Resource }), Object.entries(RESOURCE_LABEL))}
      {sel('Forma de aprender', f.mode, (v) => setF({ ...f, mode: v as LearningMode }), Object.entries(MODE_LABEL))}
      <button className="btn ghost sm" onClick={() => setF(EMPTY_FILTERS)}><RotateCcw /> Limpar filtros</button>
    </div>
  );
}

const KIND_ICON = { Aula: BookOpen, História: Compass, Jogo: Gamepad2, Imersão: Compass, Simulação: FlaskConical, Brincadeira: Users, Projeto: Link2 };

export function ItemCard({ it }: { it: Item }) {
  const Icon = KIND_ICON[it.kind];
  return (
    <Link to={it.path} className="card-link">
      <Art id={it.artId} ratio={16 / 9} decorative />
      <div className="card-body">
        <div className="row between nowrap">
          <span className="badge cyan"><Icon size={13} /> {it.kind}</span>
          <FavButton k={it.key.startsWith('play:') ? it.key : it.key} title={it.title} />
        </div>
        <h3>{it.title}</h3>
        <p className="small muted" style={{ margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.summary}</p>
        <div className="row xs muted" style={{ marginTop: 'auto', gap: 8 }}>
          <span><Clock size={12} /> {minutes(it.durationMin)}</span>
          <span>· {anosLabel(it.anos)}</span>
          {it.subjects.slice(0, 2).map((s) => <span key={s}>· {SUBJECT_MAP[s]?.name}</span>)}
        </div>
      </div>
    </Link>
  );
}

export default function Library() {
  const [f, setF] = useState<Filters>(EMPTY_FILTERS);
  const s = useApp();
  const items = useMemo(() => allItems(s.myLessons), [s.myLessons]);
  const filtered = applyFilters(items, f);
  const active = JSON.stringify(f) !== JSON.stringify(EMPTY_FILTERS);
  const available = SUBJECTS.filter((x) => x.status === 'disponivel');
  const prepared = SUBJECTS.filter((x) => x.status === 'em-preparo');

  return (
    <div className="stack" style={{ gap: 22 }}>
      <section className="hero" style={{ minHeight: 240 }}>
        <Art id="hero-materias" fill eager decorative />
        <div className="hero-content">
          <div className="kicker">Biblioteca de matérias</div>
          <h1>Cada matéria, um universo</h1>
          <p className="muted" style={{ margin: 0 }}>Explore como planetas: histórias, jogos, experimentos, investigações, projetos, conversas e atividades fora da tela.</p>
        </div>
      </section>

      <FilterBar f={f} setF={setF} />

      {active ? (
        <section aria-live="polite">
          <h2>{filtered.length} resultado(s)</h2>
          <div className="grid auto-fill">{filtered.map((it) => <ItemCard key={it.key} it={it} />)}</div>
          {filtered.length === 0 && <div className="empty">Nenhum conteúdo com esses filtros. Tente remover algum.</div>}
        </section>
      ) : (
        <div className="split">
          <div className="stack">
            <div className="grid auto-fill-sm">
              {available.map((sub) => {
                const n = items.filter((i) => i.subjects.includes(sub.id)).length;
                return (
                  <Link key={sub.id} to={`/materias/${sub.id}`} className="card-link" style={{ borderColor: `${sub.color}55` }}>
                    <Art id={sub.artId} ratio={4 / 3} decorative />
                    <div className="card-overlay">
                      <h3>{sub.name}</h3>
                      <div className="row between xs"><span className="muted">{n} recurso(s)</span><ArrowRight size={18} /></div>
                    </div>
                  </Link>
                );
              })}
            </div>
            <section>
              <h2>Em preparo</h2>
              <p className="small muted">Espaço reservado para outras línguas e para o Ensino Médio. A arquitetura de conteúdo já suporta essas áreas.</p>
              <div className="row">
                {prepared.map((p) => <Link key={p.id} to={`/materias/${p.id}`} className="chip">{p.name}</Link>)}
              </div>
            </section>
          </div>
          <aside className="panel glow-violet stack">
            <div className="panel-title"><Link2 /><h2 style={{ fontSize: '1.2rem' }}>Pontes entre matérias</h2></div>
            {PROJECTS.map((p) => (
              <div key={p.id} className="stack-sm">
                <span className="badge" style={{ alignSelf: 'flex-start' }}>Missão interdisciplinar</span>
                <h3 style={{ fontSize: '1.4rem' }}>{p.title}</h3>
                <Art id={p.artId} ratio={16 / 9} style={{ borderRadius: 14 }} />
                <div className="row" style={{ gap: 6 }}>{p.subjects.map((sid) => <span key={sid} className="chip xs" style={{ padding: '3px 9px' }}>{SUBJECT_MAP[sid].name}</span>)}</div>
                <p className="small muted">{p.summary}</p>
                <div className="row">
                  <Link className="btn primary" to={`/projetos/${p.id}`}><Play /> Explorar missão</Link>
                  <FavButton k={`proj:${p.id}`} title={p.title} />
                </div>
              </div>
            ))}
          </aside>
        </div>
      )}
    </div>
  );
}

export function SubjectPage() {
  const { id } = useParams();
  const s = useApp();
  const sub = SUBJECTS.find((x) => x.id === id);
  const [mode, setMode] = useState<LearningMode | ''>('');
  const [params] = useSearchParams();
  void params;
  if (!sub) return <div className="empty">Matéria não encontrada. <Link to="/materias">Voltar</Link></div>;
  const items = allItems(s.myLessons).filter((i) => i.subjects.includes(sub.id));
  const shown = mode ? items.filter((i) => i.modes.includes(mode)) : items;

  return (
    <div className="stack" style={{ gap: 20 }}>
      <section className="hero" style={{ minHeight: 220, borderColor: `${sub.color}66` }}>
        <Art id={sub.artId} fill decorative eager />
        <div className="hero-content">
          <Link to="/materias" className="small">← Biblioteca</Link>
          <div className="kicker">{sub.area}</div>
          <h1>{sub.name}</h1>
          <p className="muted" style={{ margin: 0 }}>{sub.description}</p>
        </div>
      </section>
      {sub.status === 'em-preparo' && (
        <Notice>Esta área está em preparo. Ainda não há conteúdos próprios — os recursos abaixo (se houver) vêm de outras áreas relacionadas.</Notice>
      )}
      <div className="row" role="group" aria-label="Formas de aprender">
        <button className={`chip ${mode === '' ? 'on' : ''}`} aria-pressed={mode === ''} onClick={() => setMode('')}>Todas</button>
        {(Object.keys(MODE_LABEL) as LearningMode[]).map((m) => {
          const n = items.filter((i) => i.modes.includes(m)).length;
          return (
            <button key={m} className={`chip ${mode === m ? 'on' : ''}`} aria-pressed={mode === m} onClick={() => setMode(m)} disabled={n === 0} style={n === 0 ? { opacity: 0.45 } : undefined}>
              {MODE_LABEL[m]} <span className="faint">{n}</span>
            </button>
          );
        })}
      </div>
      <div className="grid auto-fill">{shown.map((it) => <ItemCard key={it.key} it={it} />)}</div>
      {shown.length === 0 && <div className="empty">Ainda não há recursos desta forma de aprender em {sub.name}. <Link to="/aulas/nova">Crie uma aula</Link> e ela aparecerá aqui.</div>}
    </div>
  );
}
