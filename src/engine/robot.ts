/** Programação visual introdutória — “Robô da horta”. Interpretador de blocos. */

export type Dir = 0 | 1 | 2 | 3; // 0=norte 1=leste 2=sul 3=oeste
export type Block =
  | { id: string; type: 'frente' }
  | { id: string; type: 'esquerda' }
  | { id: string; type: 'direita' }
  | { id: string; type: 'regar' }
  | { id: string; type: 'repetir'; times: number; body: Block[] };

export interface RobotLevel {
  id: string;
  title: string;
  goal: string;
  size: number;
  start: { x: number; y: number; dir: Dir };
  plants: { x: number; y: number }[];
  rocks: { x: number; y: number }[];
  maxBlocks: number;
  hint: string;
}

export interface RobotState { x: number; y: number; dir: Dir; watered: string[] }
export interface Frame { state: RobotState; blockId: string; error?: string }

export const ROBOT_LEVELS: RobotLevel[] = [
  { id: 'n1', title: 'Primeiro passo', goal: 'Leve o robô até a muda e regue.', size: 5, start: { x: 0, y: 2, dir: 1 }, plants: [{ x: 3, y: 2 }], rocks: [], maxBlocks: 6, hint: 'Conte quantas casas até a planta.' },
  { id: 'n2', title: 'Desvie da pedra', goal: 'Contorne a pedra e regue a muda.', size: 5, start: { x: 0, y: 4, dir: 0 }, plants: [{ x: 2, y: 1 }], rocks: [{ x: 0, y: 1 }, { x: 1, y: 1 }], maxBlocks: 8, hint: 'Suba duas casas e vire à direita.' },
  { id: 'n3', title: 'Canteiro em linha', goal: 'Regue as 4 mudas usando o bloco “repetir”.', size: 6, start: { x: 0, y: 3, dir: 1 }, plants: [{ x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 }, { x: 4, y: 3 }], rocks: [], maxBlocks: 4, hint: 'Um padrão se repete: andar e regar.' },
];

const DX = [0, 1, 0, -1];
const DY = [-1, 0, 1, 0];
const key = (x: number, y: number) => `${x},${y}`;

export function countBlocks(program: Block[]): number {
  return program.reduce((n, b) => n + 1 + (b.type === 'repetir' ? countBlocks(b.body) : 0), 0);
}

export function runProgram(level: RobotLevel, program: Block[], maxSteps = 200): { frames: Frame[]; success: boolean; error?: string } {
  let state: RobotState = { x: level.start.x, y: level.start.y, dir: level.start.dir, watered: [] };
  const frames: Frame[] = [];
  const rocks = new Set(level.rocks.map((r) => key(r.x, r.y)));
  const plants = new Set(level.plants.map((p) => key(p.x, p.y)));
  let error: string | undefined;

  const exec = (blocks: Block[]): boolean => {
    for (const b of blocks) {
      if (frames.length >= maxSteps) { error = 'Programa longo demais.'; return false; }
      if (b.type === 'repetir') {
        for (let i = 0; i < b.times; i++) if (!exec(b.body)) return false;
        continue;
      }
      if (b.type === 'frente') {
        const nx = state.x + DX[state.dir];
        const ny = state.y + DY[state.dir];
        if (nx < 0 || ny < 0 || nx >= level.size || ny >= level.size) { error = 'O robô chegaria fora do terreno.'; frames.push({ state, blockId: b.id, error }); return false; }
        if (rocks.has(key(nx, ny))) { error = 'Há uma pedra no caminho.'; frames.push({ state, blockId: b.id, error }); return false; }
        state = { ...state, x: nx, y: ny };
      } else if (b.type === 'esquerda') state = { ...state, dir: ((state.dir + 3) % 4) as Dir };
      else if (b.type === 'direita') state = { ...state, dir: ((state.dir + 1) % 4) as Dir };
      else if (b.type === 'regar') {
        const k = key(state.x, state.y);
        if (!plants.has(k)) { error = 'Não há muda nesta casa para regar.'; frames.push({ state, blockId: b.id, error }); return false; }
        if (!state.watered.includes(k)) state = { ...state, watered: [...state.watered, k] };
      }
      frames.push({ state, blockId: b.id });
    }
    return true;
  };

  exec(program);
  const success = !error && level.plants.every((p) => state.watered.includes(key(p.x, p.y)));
  return { frames, success, error };
}

// ───────────── IA e educação midiática: classificador por vizinhos ─────────────

export interface Sample { id: string; x: number; y: number; label: string }

/** k vizinhos mais próximos — a “IA” aprende só com os exemplos que recebe. */
export function knn(samples: Sample[], x: number, y: number, k = 3): { label: string | null; votes: Record<string, number>; neighbors: Sample[] } {
  if (samples.length === 0) return { label: null, votes: {}, neighbors: [] };
  const neighbors = [...samples]
    .sort((a, b) => (a.x - x) ** 2 + (a.y - y) ** 2 - ((b.x - x) ** 2 + (b.y - y) ** 2))
    .slice(0, Math.min(k, samples.length));
  const votes: Record<string, number> = {};
  for (const n of neighbors) votes[n.label] = (votes[n.label] ?? 0) + 1;
  const sorted = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  const tie = sorted.length > 1 && sorted[0][1] === sorted[1][1];
  return { label: tie ? neighbors[0].label : sorted[0][0], votes, neighbors };
}
