/**
 * Provas — regras puras: pontuação, gabarito e adaptações para estudantes com TEA, TDAH,
 * dislexia e baixa visão. Sem React, para poder ser testado.
 */
import type { PerfilAdaptacao, Prova, Questao, QuestaoTipo } from '../types/models';

export const TIPO_LABEL: Record<QuestaoTipo, string> = {
  multipla: 'Múltipla escolha',
  vf: 'Verdadeiro ou falso',
  dissertativa: 'Resposta escrita',
  completar: 'Complete',
  associacao: 'Ligue as colunas',
  ordenar: 'Coloque em ordem',
  desenho: 'Desenhe ou represente',
};

/** Ícone curto que indica a ação esperada — ajuda na previsibilidade (TEA) e no foco (TDAH). */
export const TIPO_ACAO: Record<QuestaoTipo, { icone: string; acao: string }> = {
  multipla: { icone: '◯', acao: 'Marque um X na resposta certa' },
  vf: { icone: 'V/F', acao: 'Escreva V (verdadeiro) ou F (falso)' },
  dissertativa: { icone: '✎', acao: 'Escreva sua resposta' },
  completar: { icone: '___', acao: 'Complete os espaços' },
  associacao: { icone: '↔', acao: 'Ligue cada item ao seu par' },
  ordenar: { icone: '1·2·3', acao: 'Numere na ordem certa' },
  desenho: { icone: '✐', acao: 'Desenhe no quadro' },
};

export interface PerfilInfo {
  id: PerfilAdaptacao;
  nome: string;
  resumo: string;
  /** Multiplicador da fonte na impressão. */
  fonte: number;
  /** Espaçamento entre linhas. */
  entrelinhas: number;
  /** Quantas questões por página (0 = livre). */
  porPagina: number;
  /** Máximo de alternativas em múltipla escolha (0 = todas). */
  maxAlternativas: number;
  usaEnunciadoSimples: boolean;
  destacaComando: boolean;
  mostraAcao: boolean;
  checklist: boolean;
  rotina: boolean;
  /** Escala das imagens. */
  imagem: number;
  linhasExtras: number;
}

export const PERFIS: Record<PerfilAdaptacao, PerfilInfo> = {
  padrao: { id: 'padrao', nome: 'Padrão', resumo: 'Prova regular da turma.', fonte: 1, entrelinhas: 1.45, porPagina: 0, maxAlternativas: 0, usaEnunciadoSimples: false, destacaComando: false, mostraAcao: false, checklist: false, rotina: false, imagem: 1, linhasExtras: 0 },
  tea: { id: 'tea', nome: 'TEA (autismo)', resumo: 'Uma questão por página, enunciados curtos e diretos, ícone da ação, no máximo 3 alternativas, rotina de passos e caixa “terminei”.', fonte: 1.25, entrelinhas: 1.7, porPagina: 1, maxAlternativas: 3, usaEnunciadoSimples: true, destacaComando: true, mostraAcao: true, checklist: true, rotina: true, imagem: 1.25, linhasExtras: 1 },
  tdah: { id: 'tdah', nome: 'TDAH', resumo: 'Duas questões por página, comando em destaque, blocos separados, até 4 alternativas e lista de progresso.', fonte: 1.15, entrelinhas: 1.6, porPagina: 2, maxAlternativas: 4, usaEnunciadoSimples: true, destacaComando: true, mostraAcao: true, checklist: true, rotina: false, imagem: 1.1, linhasExtras: 1 },
  dislexia: { id: 'dislexia', nome: 'Dislexia', resumo: 'Letra maior sem serifa, mais espaço entre linhas e palavras, comando em destaque e texto alinhado à esquerda.', fonte: 1.2, entrelinhas: 1.9, porPagina: 0, maxAlternativas: 0, usaEnunciadoSimples: true, destacaComando: true, mostraAcao: true, checklist: false, rotina: false, imagem: 1.1, linhasExtras: 1 },
  'baixa-visao': { id: 'baixa-visao', nome: 'Baixa visão', resumo: 'Letra ampliada, alto contraste e imagens maiores.', fonte: 1.55, entrelinhas: 1.6, porPagina: 2, maxAlternativas: 0, usaEnunciadoSimples: false, destacaComando: true, mostraAcao: false, checklist: false, rotina: false, imagem: 1.5, linhasExtras: 1 },
};

/** Verbos de comando mais comuns em provas — destacados nas versões adaptadas. */
const COMANDOS = ['assinale', 'calcule', 'circule', 'classifique', 'compare', 'complete', 'desenhe', 'escreva', 'explique', 'identifique', 'indique', 'leia', 'ligue', 'marque', 'numere', 'observe', 'ordene', 'pinte', 'resolva', 'responda', 'cite', 'descreva', 'represente', 'relacione', 'sublinhe', 'conte', 'escolha', 'justifique'];

/** Divide o enunciado em partes, marcando os verbos de comando para destaque. */
export function partesComComando(texto: string): { t: string; cmd: boolean }[] {
  const re = new RegExp(`\\b(${COMANDOS.join('|')})\\b`, 'giu');
  const out: { t: string; cmd: boolean }[] = [];
  let last = 0;
  for (const m of texto.matchAll(re)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ t: texto.slice(last, i), cmd: false });
    out.push({ t: m[0], cmd: true });
    last = i + m[0].length;
  }
  if (last < texto.length) out.push({ t: texto.slice(last), cmd: false });
  return out;
}

export function totalPontos(p: Pick<Prova, 'questoes'>): number {
  return Math.round(p.questoes.reduce((s, q) => s + (q.pontos || 0), 0) * 100) / 100;
}

/**
 * Reduz alternativas mantendo sempre a correta e preservando a ordem original.
 * Devolve as alternativas exibidas e o novo índice da correta.
 */
export function reduzirAlternativas(itens: string[], correta: number | undefined, max: number): { itens: string[]; correta: number | undefined } {
  if (!max || itens.length <= max) return { itens, correta };
  const keep = new Set<number>();
  if (correta !== undefined && correta >= 0 && correta < itens.length) keep.add(correta);
  for (let i = 0; i < itens.length && keep.size < max; i++) keep.add(i);
  const idx = [...keep].sort((a, b) => a - b);
  return { itens: idx.map((i) => itens[i]), correta: correta === undefined ? undefined : idx.indexOf(correta) };
}

/** Questão como deve aparecer para um perfil de adaptação. */
export interface QuestaoExibida extends Questao {
  numero: number;
  texto: string;
  linhasFinal: number;
}

export function adaptarQuestoes(questoes: Questao[], perfil: PerfilAdaptacao): QuestaoExibida[] {
  const cfg = PERFIS[perfil];
  return questoes.map((q, i) => {
    const texto = cfg.usaEnunciadoSimples && q.enunciadoSimples?.trim() ? q.enunciadoSimples : q.enunciado;
    let itens = q.itens;
    let correta = q.correta;
    if (q.tipo === 'multipla') ({ itens, correta } = reduzirAlternativas(q.itens, q.correta, cfg.maxAlternativas));
    const base = q.linhas ?? (q.tipo === 'desenho' ? 6 : q.tipo === 'dissertativa' ? 4 : 0);
    return { ...q, numero: i + 1, texto, itens, correta, linhasFinal: base ? base + cfg.linhasExtras : 0 };
  });
}

/** Agrupa as questões em páginas conforme o perfil (0 = uma página contínua). */
export function paginar<T>(itens: T[], porPagina: number): T[][] {
  if (!porPagina) return [itens];
  const out: T[][] = [];
  for (let i = 0; i < itens.length; i += porPagina) out.push(itens.slice(i, i + porPagina));
  return out;
}

/** Ordem embaralhada (determinística por semente) da coluna B de uma associação. */
export function embaralharPares(pares: string[], semente: number): { texto: string; original: number }[] {
  const arr = pares.map((texto, original) => ({ texto, original }));
  let s = semente || 1;
  const rnd = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.length > 1 && arr.every((x, i) => x.original === i)) arr.push(arr.shift()!);
  return arr;
}

export function semente(id: string): number {
  let h = 7;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 2147483647;
  return h || 1;
}

const LETRAS = 'abcdefghij';
export const letra = (i: number) => LETRAS[i] ?? String(i + 1);

/** Texto do gabarito de uma questão (já adaptada). */
export function gabarito(q: QuestaoExibida): string {
  switch (q.tipo) {
    case 'multipla': return q.correta === undefined ? '—' : `${letra(q.correta)}) ${q.itens[q.correta] ?? ''}`;
    case 'vf': return q.itens.map((_, i) => `${i + 1}-${q.vf?.[i] ? 'V' : 'F'}`).join('  ');
    case 'ordenar': return q.itens.map((t, i) => `${i + 1}. ${t}`).join('  ');
    case 'associacao': {
      const emb = embaralharPares(q.pares ?? [], semente(q.id));
      return q.itens.map((_, i) => `${i + 1} → ${letra(emb.findIndex((e) => e.original === i))}`).join('  ');
    }
    default: return q.resposta?.trim() || 'Resposta pessoal — avaliar pelos critérios da questão.';
  }
}

/** Problemas que impedem ou atrapalham imprimir a prova. */
export function validarProva(p: Prova): string[] {
  const erros: string[] = [];
  if (!p.title.trim()) erros.push('Dê um título à prova.');
  if (!p.questoes.length) erros.push('Adicione pelo menos uma questão.');
  p.questoes.forEach((q, i) => {
    const n = i + 1;
    if (!q.enunciado.trim()) erros.push(`Questão ${n}: escreva o enunciado.`);
    if (q.tipo === 'multipla' && q.itens.filter((x) => x.trim()).length < 2) erros.push(`Questão ${n}: coloque pelo menos 2 alternativas.`);
    if (q.tipo === 'multipla' && (q.correta === undefined || !q.itens[q.correta]?.trim())) erros.push(`Questão ${n}: marque a alternativa correta.`);
    if (q.tipo === 'associacao' && (q.pares?.length ?? 0) !== q.itens.length) erros.push(`Questão ${n}: as duas colunas precisam ter o mesmo número de itens.`);
    if (q.tipo === 'completar' && !q.enunciado.includes('___')) erros.push(`Questão ${n}: use ___ (três sublinhados) onde o estudante deve completar.`);
  });
  return erros;
}

/** Copia uma questão do banco para uma prova, com novo id. */
export function copiarQuestao(q: Questao, novoId: string): Questao {
  return { ...structuredClone(q), id: novoId, origem: q.origem ?? q.id };
}
