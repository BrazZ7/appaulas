import type { GameActivity, GameContent } from '../types/models';

/** Gerador pseudoaleatório determinístico (mulberry32) — partidas reprodutíveis e testáveis. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle<T>(arr: readonly T[], seed: number): T[] {
  const r = rng(seed);
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/** Garante que o embaralhamento não devolva a ordem original (para sequências). */
export function shuffleNotIdentity<T extends { id: string }>(arr: readonly T[], seed: number): T[] {
  if (arr.length < 2) return [...arr];
  let s = seed;
  for (let i = 0; i < 20; i++) {
    const out = shuffle(arr, s++);
    if (out.some((x, idx) => x.id !== arr[idx].id)) return out;
  }
  return [...arr].reverse();
}

export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9,.\s-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function checkClueAnswer(answer: string, accepted: string[]): boolean {
  const n = normalize(answer);
  return n.length > 0 && accepted.some((a) => normalize(a) === n);
}

/** Quantidade de rodadas (unidades de progresso) de cada formato. */
export function roundCount(content: GameContent): number {
  switch (content.kind) {
    case 'quiz': return content.questions.length;
    case 'pistas': return content.steps.length;
    case 'memoria': return content.pairs.length;
    case 'associacao': return content.pairs.length;
    case 'classificacao': return content.items.length;
    case 'sequencia': return 1;
  }
}

// ── Sequência ──
export function checkSequence(correctIds: string[], answerIds: string[]) {
  const positions = answerIds.map((id, i) => id === correctIds[i]);
  return { positions, correctCount: positions.filter(Boolean).length, allCorrect: positions.every(Boolean) };
}

// ── Classificação ──
export function checkClassification(
  items: { id: string; category: string }[],
  placement: Record<string, string | undefined>,
) {
  const results = items.map((it) => ({ id: it.id, placed: placement[it.id], correct: placement[it.id] === it.category }));
  return {
    results,
    placedCount: results.filter((r) => r.placed).length,
    correctCount: results.filter((r) => r.correct).length,
    complete: results.every((r) => r.placed),
  };
}

// ── Memória ──
export interface MemoryCard { key: string; pairId: string; face: 'a' | 'b'; text: string; art?: string }

export function buildMemoryDeck(content: Extract<GameContent, { kind: 'memoria' }>, seed: number): MemoryCard[] {
  const cards: MemoryCard[] = content.pairs.flatMap((p) => [
    { key: `${p.id}-a`, pairId: p.id, face: 'a' as const, text: p.a, art: p.artId },
    { key: `${p.id}-b`, pairId: p.id, face: 'b' as const, text: p.b },
  ]);
  return shuffle(cards, seed);
}

export function isMemoryMatch(a: MemoryCard, b: MemoryCard) {
  return a.pairId === b.pairId && a.face !== b.face;
}

// ── Associação ──
export function checkMatch(leftId: string, rightId: string) {
  return leftId === rightId;
}

export const FORMAT_LABEL: Record<GameActivity['format'], string> = {
  quiz: 'Quiz cooperativo',
  memoria: 'Jogo da memória',
  sequencia: 'Sequência',
  classificacao: 'Desafio de classificação',
  associacao: 'Associação',
  pistas: 'Escape / caça às pistas',
};

/** Resumo final da partida, sem ranking individual. */
export function summarize(rounds: { correct: boolean; attempts: number }[]) {
  const total = rounds.length;
  const firstTry = rounds.filter((r) => r.correct && r.attempts === 1).length;
  const solved = rounds.filter((r) => r.correct).length;
  const retries = rounds.reduce((s, r) => s + Math.max(0, r.attempts - 1), 0);
  return { total, solved, firstTry, retries };
}
