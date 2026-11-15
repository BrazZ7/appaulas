import { LESSONS } from './lessons';
import { STORIES } from './stories';
import { GAME_ACTIVITIES, PRESENTIAL_GAMES } from './games';
import { IMMERSIONS } from './immersions';
import { MICRO_IMMERSIONS } from './training';
import { PROJECTS } from './project';
import { THEME_DATES } from './calendar';
import { SUBJECTS, SUBJECT_MAP } from './subjects';
import type { Lesson, ResourceRef, SubjectId } from '../types/models';
import { linkGames, linkImmersions, linkStories } from './art-links';

linkStories(STORIES);
linkImmersions(IMMERSIONS);
linkGames(GAME_ACTIVITIES);

export { LESSONS, STORIES, GAME_ACTIVITIES, PRESENTIAL_GAMES, IMMERSIONS, MICRO_IMMERSIONS, PROJECTS, THEME_DATES, SUBJECTS, SUBJECT_MAP };

export const SIMULATIONS = [
  { id: 'feira', title: 'A feira das decisões', path: '/simulacoes/feira', subjects: ['matematica', 'educacao-financeira', 'economia'] as SubjectId[], artId: 'sim-feira', summary: 'Orçamento, porcentagem e escolhas de consumo em uma feira brasileira.' },
  { id: 'laboratorio', title: 'Laboratório de futuros', path: '/laboratorio', subjects: ['ciencias', 'tecnologia', 'geografia'] as SubjectId[], artId: 'sim-lab', summary: 'Como abastecer uma cidade? Variáveis, hipóteses, programação e IA.' },
  { id: 'cidade', title: 'Uma cidade, muitas vozes', path: '/cidade', subjects: ['politica-cidadania', 'historia', 'geografia'] as SubjectId[], artId: 'sim-cidade', summary: 'Assembleia simulada: projetos, evidências, recursos e votação mediada.' },
];

export const story = (id: string) => STORIES.find((s) => s.id === id);
export const game = (id: string) => GAME_ACTIVITIES.find((g) => g.id === id);
export const immersion = (id: string) => IMMERSIONS.find((i) => i.id === id);
export const training = (id: string) => MICRO_IMMERSIONS.find((t) => t.id === id);
export const project = (id: string) => PROJECTS.find((p) => p.id === id);

export function findLesson(id: string, mine: Lesson[]): Lesson | undefined {
  return mine.find((l) => l.id === id) ?? LESSONS.find((l) => l.id === id);
}

export function refPath(ref: ResourceRef): string {
  switch (ref.type) {
    case 'story': return `/historias/${ref.id}`;
    case 'game': return `/jogos/${ref.id}`;
    case 'immersion': return `/imersoes/${ref.id}`;
    case 'project': return `/projetos/${ref.id}`;
    case 'video': return `/estudio?video=${ref.id}`;
    case 'simulation': return SIMULATIONS.find((s) => s.id === ref.id)?.path ?? '/materias';
  }
}

export function refTitle(ref: ResourceRef): string {
  switch (ref.type) {
    case 'story': return story(ref.id)?.title ?? ref.id;
    case 'game': return game(ref.id)?.title ?? ref.id;
    case 'immersion': return immersion(ref.id)?.title ?? ref.id;
    case 'project': return project(ref.id)?.title ?? ref.id;
    case 'simulation': return SIMULATIONS.find((s) => s.id === ref.id)?.title ?? ref.id;
    case 'video': return 'Vídeo do estúdio';
  }
}

// ───────────── Busca ─────────────

export interface SearchEntry { key: string; kind: string; title: string; text: string; path: string; subjects: SubjectId[] }

export function buildIndex(mine: Lesson[]): SearchEntry[] {
  const lessons = [...mine, ...LESSONS.filter((l) => !mine.some((m) => m.id === l.id))];
  return [
    ...SUBJECTS.map((s) => ({ key: `subject:${s.id}`, kind: 'Matéria', title: s.name, text: s.description, path: `/materias/${s.id}`, subjects: [s.id] })),
    ...lessons.map((l) => ({ key: `lesson:${l.id}`, kind: l.origin === 'pessoal' ? 'Minha aula' : 'Aula', title: l.title, text: [l.summary, ...l.objectives, ...l.tags, ...l.skills].join(' '), path: `/aulas/${l.id}`, subjects: l.subjects })),
    ...STORIES.map((s) => ({ key: `story:${s.id}`, kind: 'História', title: s.title, text: `${s.subtitle} ${s.summary}`, path: `/historias/${s.id}`, subjects: s.subjects })),
    ...GAME_ACTIVITIES.map((g) => ({ key: `game:${g.id}`, kind: 'Jogo', title: g.title, text: g.description, path: `/jogos/${g.id}`, subjects: g.subjects })),
    ...PRESENTIAL_GAMES.map((g) => ({ key: `play:${g.id}`, kind: 'Brincadeira', title: g.title, text: g.learningFocus, path: `/jogos?presencial=${g.id}`, subjects: g.subjects })),
    ...IMMERSIONS.map((i) => ({ key: `imm:${i.id}`, kind: 'Imersão', title: i.title, text: `${i.theme} ${i.summary} ${i.openingQuestion}`, path: `/imersoes/${i.id}`, subjects: i.subjects })),
    ...MICRO_IMMERSIONS.map((t) => ({ key: `train:${t.id}`, kind: 'Formação', title: t.title, text: `${t.topic} ${t.summary}`, path: `/formacao/${t.id}`, subjects: [] })),
    ...PROJECTS.map((p) => ({ key: `proj:${p.id}`, kind: 'Projeto', title: p.title, text: `${p.drivingQuestion} ${p.summary}`, path: `/projetos/${p.id}`, subjects: p.subjects })),
    ...SIMULATIONS.map((s) => ({ key: `sim:${s.id}`, kind: 'Simulação', title: s.title, text: s.summary, path: s.path, subjects: s.subjects })),
  ];
}

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export function search(index: SearchEntry[], q: string, limit = 12): SearchEntry[] {
  const terms = norm(q).split(/\s+/).filter((t) => t.length > 1);
  if (!terms.length) return [];
  return index
    .map((e) => {
      const title = norm(e.title);
      const body = norm(`${e.kind} ${e.text} ${e.subjects.map((s) => SUBJECT_MAP[s]?.name ?? '').join(' ')}`);
      let score = 0;
      for (const t of terms) {
        if (title.includes(t)) score += 5;
        else if (body.includes(t)) score += 1;
        else return { e, score: -1 };
      }
      return { e, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.e);
}
