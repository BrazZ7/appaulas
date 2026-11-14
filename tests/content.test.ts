import { describe, expect, it } from 'vitest';
import { LESSONS, STORIES, GAME_ACTIVITIES, PRESENTIAL_GAMES, IMMERSIONS, MICRO_IMMERSIONS, PROJECTS, THEME_DATES, SIMULATIONS } from '../src/content';
import { ASSET_MAP } from '../src/content/assets';
import { validateStory } from '../src/engine/story';
import type { ResourceRef } from '../src/types/models';

const refExists = (r: ResourceRef) => ({
  story: () => STORIES.some((x) => x.id === r.id), game: () => GAME_ACTIVITIES.some((x) => x.id === r.id),
  immersion: () => IMMERSIONS.some((x) => x.id === r.id), project: () => PROJECTS.some((x) => x.id === r.id),
  simulation: () => SIMULATIONS.some((x) => x.id === r.id), video: () => true,
})[r.type]();

describe('conteúdo inicial', () => {
  it('quantidades mínimas', () => {
    expect(LESSONS.length).toBeGreaterThanOrEqual(12);
    expect(STORIES.length).toBeGreaterThanOrEqual(3);
    expect(new Set(GAME_ACTIVITIES.map((g) => g.format)).size).toBeGreaterThanOrEqual(4);
    expect(SIMULATIONS.length).toBeGreaterThanOrEqual(2);
    expect(MICRO_IMMERSIONS.filter((m) => m.status === 'disponivel').length).toBeGreaterThanOrEqual(3);
    expect(PROJECTS.length).toBeGreaterThanOrEqual(1);
    expect(PRESENTIAL_GAMES.length).toBeGreaterThan(0);
  });
  it('aulas completas e coerentes', () => {
    for (const l of LESSONS) {
      expect(l.blocks.reduce((s, b) => s + b.minutes, 0), l.id).toBe(l.durationMin);
      expect(l.objectives.length, l.id).toBeGreaterThan(0);
      expect(l.observeLearning.length, l.id).toBeGreaterThan(0);
      expect(l.activity.instructions.length, l.id).toBeGreaterThan(0);
      for (const b of l.blocks) if (b.resourceRef) expect(refExists(b.resourceRef), `${l.id} → ${b.resourceRef.id}`).toBe(true);
    }
    expect(new Set(LESSONS.map((l) => l.id)).size).toBe(LESSONS.length);
  });
  it('histórias ramificadas válidas', () => {
    for (const s of STORIES) expect(validateStory(s), s.id).toEqual([]);
  });
  it('jogos com respostas válidas', () => {
    for (const g of GAME_ACTIVITIES) {
      const c = g.content;
      if (c.kind === 'quiz') for (const q of c.questions) expect(q.correct).toBeLessThan(q.options.length);
      if (c.kind === 'classificacao') for (const it of c.items) expect(c.categories.some((x) => x.id === it.category), it.id).toBe(true);
      if (c.kind === 'pistas') for (const st of c.steps) expect(st.answers.length).toBeGreaterThan(0);
    }
  });
  it('formação: nós alcançáveis', () => {
    for (const m of MICRO_IMMERSIONS) {
      expect(m.nodes[m.startNodeId], m.id).toBeTruthy();
      for (const n of Object.values(m.nodes)) for (const o of n.options) expect(m.nodes[o.to], `${m.id}:${o.to}`).toBeTruthy();
    }
  });
  it('arte referenciada existe no registro', () => {
    const ids = [...LESSONS.map((x) => x.artId), ...STORIES.flatMap((s) => [s.artId, ...Object.values(s.scenes).map((sc) => sc.artId).filter(Boolean) as string[]]), ...GAME_ACTIVITIES.map((x) => x.artId), ...IMMERSIONS.map((x) => x.artId), ...MICRO_IMMERSIONS.map((x) => x.artId), ...PROJECTS.map((x) => x.artId)];
    for (const id of ids) expect(ASSET_MAP[id], id).toBeTruthy();
  });
  it('calendário e projeto referenciam recursos existentes', () => {
    for (const d of THEME_DATES) for (const s of d.suggestions) if (s.ref) expect(refExists(s.ref), `${d.id} → ${s.ref.id}`).toBe(true);
    for (const p of PROJECTS) for (const st of p.stages) for (const r of st.resourceRefs ?? []) expect(refExists(r), r.id).toBe(true);
  });
});
