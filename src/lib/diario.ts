/**
 * Diário da turma — cálculos puros (frequência, médias, relatórios e CSV).
 * Sem dependência de React ou do armazenamento, para poder ser testado.
 */
import type { Avaliacao, Chamada, ItemTurma, Student, Turma } from '../types/models';

export const PERIODOS = [1, 2, 3, 4] as const;

export interface FrequenciaAluno {
  aulas: number;
  faltas: number;
  justificadas: number;
  /** Percentual de presença (0–100), com faltas justificadas contando como presença. Null se não houve aula. */
  percentual: number | null;
}

/** Filtra chamadas por período letivo usando a data (quando o período não é informado, considera todas). */
export function chamadasDoPeriodo(chamadas: Chamada[], periodo?: number, limites?: PeriodoLimites): Chamada[] {
  if (!periodo) return chamadas;
  return chamadas.filter((c) => periodoDaData(c.date, limites) === periodo);
}

/** Datas de início de cada período (mm-dd). Padrão: bimestres aproximados do calendário escolar brasileiro. */
export type PeriodoLimites = [string, string, string, string];
export const LIMITES_PADRAO: PeriodoLimites = ['01-01', '04-16', '07-16', '10-01'];

export function periodoDaData(date: string, limites: PeriodoLimites = LIMITES_PADRAO): number {
  const md = date.slice(5, 10);
  let p = 1;
  limites.forEach((ini, i) => { if (md >= ini) p = i + 1; });
  return p;
}

export function frequencia(studentId: string, chamadas: Chamada[]): FrequenciaAluno {
  let aulas = 0;
  let faltas = 0;
  let justificadas = 0;
  for (const c of chamadas) {
    const p = c.presencas[studentId];
    if (!p) continue; // estudante ainda não estava na turma ou chamada incompleta
    const n = Math.max(1, c.aulas || 1);
    aulas += n;
    if (p === 'F') faltas += n;
    if (p === 'J') justificadas += n;
  }
  return { aulas, faltas, justificadas, percentual: aulas ? Math.round(((aulas - faltas) / aulas) * 1000) / 10 : null };
}

/** Converte uma nota para a escala 0–10. */
export function nota10(nota: number, max: number): number {
  if (!max) return 0;
  return (nota / max) * 10;
}

/**
 * Média ponderada (0–10) de um estudante nas avaliações informadas.
 * Avaliações sem nota lançada para o estudante não entram no cálculo.
 * Recuperação: se houver nota de recuperação no período e ela for maior que a média, substitui a média.
 */
export function media(studentId: string, avaliacoes: Avaliacao[]): number | null {
  const regulares = avaliacoes.filter((a) => a.tipo !== 'recuperacao' && a.notas[studentId] !== undefined);
  let soma = 0;
  let pesos = 0;
  for (const a of regulares) {
    const p = a.peso > 0 ? a.peso : 1;
    soma += nota10(a.notas[studentId], a.notaMax) * p;
    pesos += p;
  }
  let m: number | null = pesos ? soma / pesos : null;
  const rec = avaliacoes.filter((a) => a.tipo === 'recuperacao' && a.notas[studentId] !== undefined);
  for (const r of rec) {
    const v = nota10(r.notas[studentId], r.notaMax);
    if (m === null || v > m) m = v;
  }
  return m === null ? null : Math.round(m * 10) / 10;
}

export function fmtNota(n: number | null | undefined): string {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

/** Aceita "7,5", "7.5" ou vazio. Retorna undefined para vazio e NaN para inválido. */
export function parseNota(txt: string): number | undefined {
  const t = txt.trim().replace(',', '.');
  if (!t) return undefined;
  const n = Number(t);
  return Number.isFinite(n) ? n : NaN;
}

export type Situacao = 'aprovado' | 'recuperacao' | 'atencao-frequencia' | 'sem-dados';

export function situacao(m: number | null, freq: number | null, mediaMinima = 6, freqMinima = 75): Situacao {
  if (m === null && freq === null) return 'sem-dados';
  if (freq !== null && freq < freqMinima) return 'atencao-frequencia';
  if (m !== null && m < mediaMinima) return 'recuperacao';
  return 'aprovado';
}

export const SITUACAO_LABEL: Record<Situacao, string> = {
  aprovado: 'Dentro do esperado',
  recuperacao: 'Abaixo da média',
  'atencao-frequencia': 'Frequência baixa',
  'sem-dados': 'Sem registros',
};

export interface LinhaRelatorio {
  student: Student;
  freq: FrequenciaAluno;
  mediaGeral: number | null;
  medias: Record<number, number | null>;
  situacao: Situacao;
}

export function relatorioTurma(t: Turma, chamadas: Chamada[], avaliacoes: Avaliacao[], periodo?: number, opts?: { mediaMinima?: number; freqMinima?: number; limites?: PeriodoLimites }): LinhaRelatorio[] {
  const ch = chamadasDoPeriodo(chamadas.filter((c) => c.turmaId === t.id), periodo, opts?.limites);
  const av = avaliacoes.filter((a) => a.turmaId === t.id);
  return ordenarAlunos(t.students).map((student) => {
    const freq = frequencia(student.id, ch);
    const medias: Record<number, number | null> = {};
    for (const p of PERIODOS) medias[p] = media(student.id, av.filter((a) => a.periodo === p));
    const mediaGeral = periodo ? medias[periodo] : mediaDasMedias(Object.values(medias));
    return { student, freq, medias, mediaGeral, situacao: situacao(mediaGeral, freq.percentual, opts?.mediaMinima, opts?.freqMinima) };
  });
}

function mediaDasMedias(ms: (number | null)[]): number | null {
  const v = ms.filter((m): m is number => m !== null);
  if (!v.length) return null;
  return Math.round((v.reduce((a, b) => a + b, 0) / v.length) * 10) / 10;
}

export function ordenarAlunos(st: Student[]): Student[] {
  return [...st].sort((a, b) => {
    if (a.numero && b.numero) return a.numero.localeCompare(b.numero, 'pt-BR', { numeric: true });
    if (a.numero) return -1;
    if (b.numero) return 1;
    return a.displayName.localeCompare(b.displayName, 'pt-BR');
  });
}

// ───────────── CSV (para importar no sistema da escola ou abrir no Excel) ─────────────

/** CSV com ";" e BOM — é o formato que o Excel em português abre sem bagunçar acentos e vírgulas decimais. */
export function toCsv(rows: (string | number | null | undefined)[][]): string {
  const esc = (v: string | number | null | undefined) => {
    if (v === null || v === undefined) return '';
    const s = typeof v === 'number' ? v.toLocaleString('pt-BR', { maximumFractionDigits: 2 }) : v;
    return /[;"\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return '﻿' + rows.map((r) => r.map(esc).join(';')).join('\r\n');
}

export function csvNotas(t: Turma, avaliacoes: Avaliacao[], periodo?: number): string {
  const av = avaliacoes.filter((a) => a.turmaId === t.id && (!periodo || a.periodo === periodo)).sort((a, b) => a.date.localeCompare(b.date));
  const head = ['Nº', 'Estudante', ...av.map((a) => `${a.title} (${a.date.split('-').reverse().join('/')} · máx ${a.notaMax} · peso ${a.peso})`), 'Média (0–10)'];
  const rows = ordenarAlunos(t.students).map((s) => [s.numero ?? '', s.displayName, ...av.map((a) => a.notas[s.id] ?? null), media(s.id, av)]);
  return toCsv([head, ...rows]);
}

export function csvChamada(t: Turma, chamadas: Chamada[], periodo?: number, limites?: PeriodoLimites): string {
  const ch = chamadasDoPeriodo(chamadas.filter((c) => c.turmaId === t.id), periodo, limites).sort((a, b) => a.date.localeCompare(b.date));
  const head = ['Nº', 'Estudante', ...ch.map((c) => `${c.date.split('-').reverse().join('/')}${c.aulas > 1 ? ` (${c.aulas} aulas)` : ''}`), 'Aulas', 'Faltas', 'Justificadas', 'Frequência %'];
  const rows = ordenarAlunos(t.students).map((s) => {
    const f = frequencia(s.id, ch);
    return [s.numero ?? '', s.displayName, ...ch.map((c) => c.presencas[s.id] ?? ''), f.aulas, f.faltas, f.justificadas, f.percentual];
  });
  return toCsv([head, ...rows]);
}

export function csvRelatorio(t: Turma, linhas: LinhaRelatorio[], periodo?: number): string {
  const head = ['Nº', 'Estudante', ...(periodo ? [`Média ${periodo}º período`] : PERIODOS.map((p) => `Média ${p}º período`)), ...(periodo ? [] : ['Média geral']), 'Aulas', 'Faltas', 'Frequência %', 'Situação'];
  const rows = linhas.map((l) => [
    l.student.numero ?? '', l.student.displayName,
    ...(periodo ? [l.mediaGeral] : PERIODOS.map((p) => l.medias[p])),
    ...(periodo ? [] : [l.mediaGeral]),
    l.freq.aulas, l.freq.faltas, l.freq.percentual, SITUACAO_LABEL[l.situacao],
  ]);
  return toCsv([[`Turma: ${t.name}`], head, ...rows]);
}

// ───────────── Histórico ─────────────

export interface EventoHistorico {
  date: string; // ISO ou yyyy-mm-dd
  kind: 'chamada' | 'avaliacao' | 'item' | 'aula' | 'jogo' | 'producao' | 'observacao';
  title: string;
  detail?: string;
}

export function ordenarHistorico(ev: EventoHistorico[]): EventoHistorico[] {
  return [...ev].sort((a, b) => b.date.localeCompare(a.date));
}

/** Copia um item de planejamento para outra turma (sem levar status de aplicado). */
export function importarItem(item: ItemTurma, turmaDestino: string, novoId: string, agora: string): ItemTurma {
  return { ...item, id: novoId, turmaId: turmaDestino, status: 'planejado', importadoDe: item.id, createdAt: agora, updatedAt: agora };
}

/** Copia uma avaliação (estrutura, sem notas) para outra turma. */
export function importarAvaliacao(a: Avaliacao, turmaDestino: string, novoId: string, agora: string): Avaliacao {
  return { ...a, id: novoId, turmaId: turmaDestino, notas: {}, itemId: undefined, createdAt: agora };
}
