import type { Choice, Condition, Scene, Story } from '../types/models';

/** Estado de uma leitura em andamento. Serializável (salvo no armazenamento local). */
export interface StoryRun {
  storyId: string;
  sceneId: string;
  stats: Record<string, number>;
  visited: string[];
  path: { sceneId: string; choiceId: string; label: string; consequence: string }[];
  hypotheses: { sceneId: string; text: string }[];
  startedAt: string;
}

export function startRun(story: Story): StoryRun {
  return {
    storyId: story.id,
    sceneId: story.startSceneId,
    stats: Object.fromEntries(story.stats.map((s) => [s.id, s.initial])),
    visited: [story.startSceneId],
    path: [],
    hypotheses: [],
    startedAt: new Date().toISOString(),
  };
}

export function checkCondition(cond: Condition | undefined, run: StoryRun): boolean {
  if (!cond) return true;
  if ('visited' in cond) return run.visited.includes(cond.visited);
  if ('notVisited' in cond) return !run.visited.includes(cond.notVisited);
  const v = run.stats[cond.stat] ?? 0;
  if (cond.gte !== undefined && v < cond.gte) return false;
  if (cond.lte !== undefined && v > cond.lte) return false;
  return true;
}

export function describeCondition(cond: Condition, story: Story): string {
  if ('visited' in cond) return `Disponível se a turma tiver passado por “${story.scenes[cond.visited]?.title ?? cond.visited}”.`;
  if ('notVisited' in cond) return `Disponível se a turma não tiver passado por “${story.scenes[cond.notVisited]?.title ?? cond.notVisited}”.`;
  const label = story.stats.find((s) => s.id === cond.stat)?.label ?? cond.stat;
  if (cond.gte !== undefined) return `Requer ${label} ≥ ${cond.gte}.`;
  if (cond.lte !== undefined) return `Requer ${label} ≤ ${cond.lte}.`;
  return '';
}

export function visibleParagraphs(scene: Scene, run: StoryRun): string[] {
  return scene.paragraphs.filter((p) => checkCondition(p.when, run)).map((p) => p.text);
}

export function choicesFor(scene: Scene, run: StoryRun): { choice: Choice; locked: boolean }[] {
  return scene.choices.map((choice) => ({ choice, locked: !checkCondition(choice.requires, run) }));
}

export function choose(story: Story, run: StoryRun, choiceId: string): StoryRun {
  const scene = story.scenes[run.sceneId];
  const choice = scene?.choices.find((c) => c.id === choiceId);
  if (!scene || !choice) throw new Error(`Escolha inválida: ${choiceId}`);
  if (!checkCondition(choice.requires, run)) throw new Error('Escolha bloqueada');
  if (!story.scenes[choice.to]) throw new Error(`Cena inexistente: ${choice.to}`);
  const stats = { ...run.stats };
  for (const e of choice.effects ?? []) stats[e.stat] = (stats[e.stat] ?? 0) + e.delta;
  return {
    ...run,
    sceneId: choice.to,
    stats,
    visited: run.visited.includes(choice.to) ? run.visited : [...run.visited, choice.to],
    path: [...run.path, { sceneId: scene.id, choiceId, label: choice.label, consequence: choice.consequence }],
  };
}

/** Volta uma escolha (útil quando a turma quer testar outro caminho). */
export function undo(story: Story, run: StoryRun): StoryRun {
  if (run.path.length === 0) return run;
  let r = startRun(story);
  r = { ...r, hypotheses: run.hypotheses, startedAt: run.startedAt };
  for (const step of run.path.slice(0, -1)) r = choose(story, r, step.choiceId);
  return r;
}

/** Validação estrutural — usada nos testes e no painel de desenvolvimento. */
export function validateStory(story: Story): string[] {
  const errors: string[] = [];
  if (!story.scenes[story.startSceneId]) errors.push('startSceneId inexistente');
  for (const scene of Object.values(story.scenes)) {
    if (!scene.ending && scene.choices.length === 0) errors.push(`Cena sem saída: ${scene.id}`);
    for (const c of scene.choices) if (!story.scenes[c.to]) errors.push(`${scene.id} → ${c.to} inexistente`);
  }
  const seen = new Set<string>();
  const queue = [story.startSceneId];
  while (queue.length) {
    const id = queue.pop()!;
    if (seen.has(id)) continue;
    seen.add(id);
    story.scenes[id]?.choices.forEach((c) => queue.push(c.to));
  }
  for (const id of Object.keys(story.scenes)) if (!seen.has(id)) errors.push(`Cena inalcançável: ${id}`);
  const endings = Object.values(story.scenes).filter((s) => s.ending).length;
  if (endings < 3) errors.push(`Apenas ${endings} finais`);
  return errors;
}

/** Ordem aproximada dos “capítulos” para a barra de progresso: profundidade mínima de cada cena. */
export function sceneDepths(story: Story): Record<string, number> {
  const depth: Record<string, number> = { [story.startSceneId]: 0 };
  const queue = [story.startSceneId];
  while (queue.length) {
    const id = queue.shift()!;
    for (const c of story.scenes[id]?.choices ?? []) {
      if (depth[c.to] === undefined) {
        depth[c.to] = depth[id] + 1;
        queue.push(c.to);
      }
    }
  }
  return depth;
}
