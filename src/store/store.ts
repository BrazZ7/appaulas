import { useSyncExternalStore } from 'react';
import type {
  AgendaItem, ExitTicket, GameSession, Lesson, Observation, Organization, Production, Role, Rubric,
  SelfAssessment, Turma, User, VideoProject,
} from '../types/models';
import type { StoryRun } from '../engine/story';
import type { LabInputs } from '../engine/lab';
import { seedState } from './seed';

/**
 * MODO DEMONSTRATIVO
 * Todos os dados ficam no navegador deste dispositivo (localStorage + IndexedDB para arquivos).
 * Não há autenticação, servidor, sincronização nem multiplayer. A troca de perfil é uma
 * simulação de permissões para avaliar a interface — não é controle de acesso seguro.
 */

export interface Settings {
  reduceMotion: boolean;
  simpleMode: boolean;
  fontScale: 1 | 1.15 | 1.3;
  highContrast: boolean;
  captions: boolean;
  readingLevel: 'padrao' | 'simplificado' | 'ampliado';
  projector: boolean;
  inkSaver: boolean;
}

export interface LabRun { id: string; inputs: LabInputs; hypothesis: string; energia: number; agua: number; equilibrio: number; diesel: number; createdAt: string }
export interface FeiraRun { id: string; level: string; team: string; totalCents: number; budgetCents: number; items: Record<string, number>; reflection: string; createdAt: string }
export interface CityRecord { id: string; allocation: Record<string, number>; votes: Record<string, number>; agreements: string[]; createdAt: string; turmaId?: string }
export interface TrainingProgress { path: { nodeId: string; option: number }[]; finished: boolean; updatedAt: string }
export interface ImmersionProgress { chapter: number; choices: Record<string, number>; checklist: Record<string, boolean>; notes: string }
export interface RecentItem { key: string; title: string; path: string; at: string; kind: string }
export interface Doubt { id: string; turmaId: string; text: string; count: number; createdAt: string }

export interface AppState {
  version: 1;
  org: Organization;
  user: User;
  settings: Settings;
  activeTurmaId: string;
  turmas: Turma[];
  myLessons: Lesson[];
  favorites: string[];
  agenda: AgendaItem[];
  productions: Production[];
  exitTickets: ExitTicket[];
  observations: Observation[];
  rubrics: Rubric[];
  selfAssessments: SelfAssessment[];
  gameSessions: GameSession[];
  storyRuns: Record<string, StoryRun>;
  labRuns: LabRun[];
  feiraRuns: FeiraRun[];
  cityRecords: CityRecord[];
  training: Record<string, TrainingProgress>;
  trainingNotes: Record<string, string>;
  immersions: Record<string, ImmersionProgress>;
  videoProjects: VideoProject[];
  /** Atividades liberadas pelo professor para o perfil Aluno (chave “tipo:id”). */
  released: string[];
  recent: RecentItem[];
  doubts: Doubt[];
  /** Progresso de aplicação de cada aula (blocos concluídos) — continuidade entre aulas. */
  applyProgress: Record<string, { done: string[]; current: number; updatedAt: string }>;
}

const KEY = 'aulaviva:v1';

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppState;
      if (parsed.version === 1) return { ...seedState(), ...parsed, settings: { ...seedState().settings, ...parsed.settings } };
    }
  } catch {
    /* armazenamento indisponível: segue com estado em memória */
  }
  return seedState();
}

let state: AppState = load();
const listeners = new Set<() => void>();
let persistError = false;

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
    persistError = false;
  } catch {
    persistError = true;
  }
}

export const store = {
  get: () => state,
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  update(fn: (s: AppState) => AppState) {
    state = fn(state);
    persist();
    listeners.forEach((l) => l());
  },
  reset() {
    state = seedState();
    persist();
    listeners.forEach((l) => l());
  },
  persistFailed: () => persistError,
  exportJson: () => JSON.stringify(state, null, 2),
  importJson(text: string) {
    const parsed = JSON.parse(text) as AppState;
    if (parsed.version !== 1) throw new Error('Arquivo de outra versão do AulaViva.');
    state = { ...seedState(), ...parsed };
    persist();
    listeners.forEach((l) => l());
  },
};

export function useApp(): AppState {
  return useSyncExternalStore(store.subscribe, store.get, store.get);
}

export const uid = (prefix = 'id') => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
export const now = () => new Date().toISOString();

// ───────────── Ações ─────────────

export const actions = {
  setSettings(p: Partial<Settings>) {
    store.update((s) => ({ ...s, settings: { ...s.settings, ...p } }));
  },
  setRole(role: Role) {
    store.update((s) => ({ ...s, user: { ...s.user, role } }));
  },
  setTurma(id: string) {
    store.update((s) => ({ ...s, activeTurmaId: id }));
  },
  toggleFavorite(key: string) {
    store.update((s) => ({ ...s, favorites: s.favorites.includes(key) ? s.favorites.filter((f) => f !== key) : [key, ...s.favorites] }));
  },
  visit(item: Omit<RecentItem, 'at'>) {
    store.update((s) => ({ ...s, recent: [{ ...item, at: now() }, ...s.recent.filter((r) => r.key !== item.key)].slice(0, 12) }));
  },
  saveLesson(lesson: Lesson) {
    store.update((s) => {
      const exists = s.myLessons.some((l) => l.id === lesson.id);
      const l = { ...lesson, updatedAt: now() };
      return { ...s, myLessons: exists ? s.myLessons.map((x) => (x.id === l.id ? l : x)) : [l, ...s.myLessons] };
    });
  },
  deleteLesson(id: string) {
    store.update((s) => ({ ...s, myLessons: s.myLessons.filter((l) => l.id !== id), agenda: s.agenda.map((a) => (a.lessonId === id ? { ...a, lessonId: undefined } : a)) }));
  },
  addAgenda(item: AgendaItem) {
    store.update((s) => ({ ...s, agenda: [...s.agenda, item].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)) }));
  },
  removeAgenda(id: string) {
    store.update((s) => ({ ...s, agenda: s.agenda.filter((a) => a.id !== id) }));
  },
  addProduction(p: Omit<Production, 'id' | 'createdAt'>) {
    store.update((s) => ({ ...s, productions: [{ ...p, id: uid('prod'), createdAt: now() }, ...s.productions] }));
  },
  removeProduction(id: string) {
    store.update((s) => ({ ...s, productions: s.productions.filter((p) => p.id !== id) }));
  },
  saveStoryRun(run: StoryRun | null, storyId: string) {
    store.update((s) => {
      const runs = { ...s.storyRuns };
      if (run) runs[storyId] = run;
      else delete runs[storyId];
      return { ...s, storyRuns: runs };
    });
  },
  saveGameSession(g: GameSession) {
    store.update((s) => ({ ...s, gameSessions: [g, ...s.gameSessions.filter((x) => x.id !== g.id)].slice(0, 50) }));
  },
  addLabRun(r: LabRun) {
    store.update((s) => ({ ...s, labRuns: [r, ...s.labRuns].slice(0, 30) }));
  },
  clearLabRuns() {
    store.update((s) => ({ ...s, labRuns: [] }));
  },
  addFeiraRun(r: FeiraRun) {
    store.update((s) => ({ ...s, feiraRuns: [r, ...s.feiraRuns].slice(0, 30) }));
  },
  addCityRecord(r: CityRecord) {
    store.update((s) => ({ ...s, cityRecords: [r, ...s.cityRecords] }));
  },
  setTraining(id: string, p: TrainingProgress | null) {
    store.update((s) => {
      const t = { ...s.training };
      if (p) t[id] = p;
      else delete t[id];
      return { ...s, training: t };
    });
  },
  setTrainingNote(id: string, text: string) {
    store.update((s) => ({ ...s, trainingNotes: { ...s.trainingNotes, [id]: text } }));
  },
  setImmersion(id: string, p: Partial<ImmersionProgress>) {
    store.update((s) => {
      const cur = s.immersions[id] ?? { chapter: 0, choices: {}, checklist: {}, notes: '' };
      return { ...s, immersions: { ...s.immersions, [id]: { ...cur, ...p } } };
    });
  },
  saveTurma(t: Turma) {
    store.update((s) => ({ ...s, turmas: s.turmas.some((x) => x.id === t.id) ? s.turmas.map((x) => (x.id === t.id ? t : x)) : [...s.turmas, t] }));
  },
  deleteTurma(id: string) {
    store.update((s) => {
      const turmas = s.turmas.filter((t) => t.id !== id);
      return { ...s, turmas, activeTurmaId: s.activeTurmaId === id ? turmas[0]?.id ?? '' : s.activeTurmaId };
    });
  },
  saveExitTicket(t: ExitTicket) {
    store.update((s) => ({ ...s, exitTickets: s.exitTickets.some((x) => x.id === t.id) ? s.exitTickets.map((x) => (x.id === t.id ? t : x)) : [t, ...s.exitTickets] }));
  },
  addObservation(o: Omit<Observation, 'id' | 'createdAt'>) {
    store.update((s) => ({ ...s, observations: [{ ...o, id: uid('obs'), createdAt: now() }, ...s.observations] }));
  },
  removeObservation(id: string) {
    store.update((s) => ({ ...s, observations: s.observations.filter((o) => o.id !== id) }));
  },
  saveRubric(r: Rubric) {
    store.update((s) => ({ ...s, rubrics: s.rubrics.some((x) => x.id === r.id) ? s.rubrics.map((x) => (x.id === r.id ? r : x)) : [...s.rubrics, r] }));
  },
  addSelfAssessment(a: SelfAssessment) {
    store.update((s) => ({ ...s, selfAssessments: [a, ...s.selfAssessments] }));
  },
  addDoubt(turmaId: string, text: string) {
    store.update((s) => {
      const norm = text.trim().toLowerCase();
      const existing = s.doubts.find((d) => d.turmaId === turmaId && d.text.trim().toLowerCase() === norm);
      if (existing) return { ...s, doubts: s.doubts.map((d) => (d === existing ? { ...d, count: d.count + 1 } : d)) };
      return { ...s, doubts: [{ id: uid('dv'), turmaId, text: text.trim(), count: 1, createdAt: now() }, ...s.doubts] };
    });
  },
  removeDoubt(id: string) {
    store.update((s) => ({ ...s, doubts: s.doubts.filter((d) => d.id !== id) }));
  },
  saveVideo(v: VideoProject) {
    store.update((s) => ({ ...s, videoProjects: s.videoProjects.some((x) => x.id === v.id) ? s.videoProjects.map((x) => (x.id === v.id ? { ...v, updatedAt: now() } : x)) : [{ ...v, updatedAt: now() }, ...s.videoProjects] }));
  },
  deleteVideo(id: string) {
    store.update((s) => ({ ...s, videoProjects: s.videoProjects.filter((v) => v.id !== id) }));
  },
  setApplyProgress(lessonId: string, p: { done: string[]; current: number } | null) {
    store.update((s) => {
      const a = { ...s.applyProgress };
      if (p) a[lessonId] = { ...p, updatedAt: now() };
      else delete a[lessonId];
      return { ...s, applyProgress: a };
    });
  },
  toggleRelease(key: string) {
    store.update((s) => ({ ...s, released: s.released.includes(key) ? s.released.filter((r) => r !== key) : [...s.released, key] }));
  },
};
