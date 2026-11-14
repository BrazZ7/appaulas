import type { BlockKind, Lesson, LessonBlock } from '../types/models';
import { uid } from '../store/store';
import { SUBJECT_MAP } from '../content/subjects';
import { refTitle } from '../content';

export const BLOCK_META: Record<BlockKind, { label: string; color: string; defaultMin: number; hint: string }> = {
  acolhida: { label: 'Acolhida', color: '#2ee6d6', defaultMin: 5, hint: 'Receber a turma e criar clima de confiança.' },
  pergunta: { label: 'Pergunta inicial', color: '#60a5fa', defaultMin: 5, hint: 'Uma pergunta que desperte curiosidade.' },
  historia: { label: 'História', color: '#a78bfa', defaultMin: 10, hint: 'Narrativa, imersão ou situação contextualizada.' },
  video: { label: 'Vídeo', color: '#f472b6', defaultMin: 8, hint: 'Vídeo revisado, com perguntas antes e depois.' },
  experimento: { label: 'Experimento', color: '#4ade80', defaultMin: 15, hint: 'Hipótese, variáveis e registro.' },
  jogo: { label: 'Jogo', color: '#fbbf24', defaultMin: 15, hint: 'Jogo cooperativo ou brincadeira.' },
  atividade: { label: 'Atividade prática', color: '#fb923c', defaultMin: 15, hint: 'Produção individual ou em grupo.' },
  conversa: { label: 'Conversa', color: '#c084fc', defaultMin: 10, hint: 'Roda de conversa sobre descobertas.' },
  avaliacao: { label: 'Avaliação', color: '#22d3ee', defaultMin: 5, hint: 'Bilhete de saída, autoavaliação ou rubrica.' },
};

export function newBlock(kind: BlockKind): LessonBlock {
  const m = BLOCK_META[kind];
  return { id: uid('b'), kind, title: m.label, minutes: m.defaultMin, instructions: '' };
}

export function newLesson(ownerId: string, ano = 7): Lesson {
  const t = new Date().toISOString();
  return {
    id: uid('aula'), title: 'Nova aula', summary: '', subjects: [], etapa: ano <= 5 ? 'fundamental1' : 'fundamental2', anos: [ano], durationMin: 50,
    difficulty: 'introdutorio', audience: '', objectives: [''], materials: [], resources: [], skills: [], modes: [], artId: 'hero-inicio', tags: [],
    blocks: [newBlock('acolhida'), newBlock('pergunta'), newBlock('atividade'), newBlock('conversa'), newBlock('avaliacao')],
    activity: { title: '', instructions: [], answerKey: [] }, observeLearning: [], adaptations: [],
    origin: 'pessoal', ownerId, sharing: 'privado', createdAt: t, updatedAt: t,
  };
}

export function duplicateLesson(l: Lesson, ownerId: string): Lesson {
  const t = new Date().toISOString();
  return { ...structuredClone(l), id: uid('aula'), title: l.origin === 'pessoal' ? `${l.title} (cópia)` : l.title, origin: 'pessoal', ownerId, sharing: 'privado', createdAt: t, updatedAt: t, blocks: l.blocks.map((b) => ({ ...b, id: uid('b') })) };
}

/** Remove numeração manual (“1. ”) quando a lista já é numerada. */
export const unnum = (s: string) => s.replace(/^\s*\d+[.)]\s*/, '');

export const totalMinutes = (blocks: LessonBlock[]) => blocks.reduce((s, b) => s + (Number(b.minutes) || 0), 0);

/**
 * Ajusta proporcionalmente a duração dos blocos para caber em `target` minutos
 * (mínimo de 2 min por bloco; a diferença de arredondamento vai para o maior bloco).
 */
export function scaleDurations(blocks: LessonBlock[], target: number): LessonBlock[] {
  const total = totalMinutes(blocks);
  if (!blocks.length || total === 0) return blocks;
  const scaled = blocks.map((b) => ({ ...b, minutes: Math.max(2, Math.round((b.minutes / total) * target)) }));
  const diff = target - totalMinutes(scaled);
  if (diff !== 0) {
    const idx = scaled.reduce((best, b, i) => (b.minutes > scaled[best].minutes ? i : best), 0);
    scaled[idx] = { ...scaled[idx], minutes: Math.max(2, scaled[idx].minutes + diff) };
  }
  return scaled;
}

export function lessonToMarkdown(l: Lesson, withKey = true): string {
  const lines: string[] = [];
  lines.push(`# ${l.title}`, '', l.summary, '');
  lines.push(`- **Matérias:** ${l.subjects.map((s) => SUBJECT_MAP[s]?.name).join(', ') || '—'}`);
  lines.push(`- **Público:** ${l.audience || l.anos.map((a) => `${a}º ano`).join(', ')}`);
  lines.push(`- **Duração:** ${l.durationMin} min`, '');
  lines.push('## Objetivos', ...l.objectives.filter(Boolean).map((o) => `- ${o}`), '');
  lines.push('## Materiais', ...(l.materials.length ? l.materials.map((m) => `- ${m}`) : ['- —']), '');
  lines.push('## Etapas');
  l.blocks.forEach((b, i) => {
    lines.push(`### ${i + 1}. ${b.title} (${b.minutes} min) — ${BLOCK_META[b.kind].label}`, b.instructions);
    if (b.resourceRef) lines.push(`Recurso: ${refTitle(b.resourceRef)}`);
    if (b.offlineAlternative) lines.push(`Sem internet/dispositivos: ${b.offlineAlternative}`);
    if (b.teacherNotes) lines.push(`Nota: ${b.teacherNotes}`);
    lines.push('');
  });
  if (l.activity.title) lines.push(`## Atividade: ${l.activity.title}`, ...l.activity.instructions.map((x, i) => `${i + 1}. ${x}`), '');
  lines.push('## Como observar a aprendizagem', ...l.observeLearning.map((x) => `- ${x}`), '');
  lines.push('## Adaptações', ...l.adaptations.map((x) => `- ${x}`), '');
  if (withKey && l.activity.answerKey?.length) lines.push('## Gabarito', ...l.activity.answerKey.map((x) => `- ${x}`), '');
  return lines.join('\n');
}
