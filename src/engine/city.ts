/**
 * “Uma cidade, muitas vozes” — assembleia simulada em uma cidade FICTÍCIA (Vila Esperança).
 * Os dados são fictícios e servem para praticar análise de evidências e decisão coletiva.
 */

export interface CityProject {
  id: string;
  name: string;
  icon: string;
  summary: string;
  /** fichas necessárias para a versão completa */
  full: number;
  /** fichas mínimas para uma versão reduzida */
  min: number;
  evidence: { kind: 'fato' | 'opiniao' | 'hipotese'; text: string; source: string }[];
  outcomes: { none: string; partial: string; full: string };
}

export interface CityRole { id: string; name: string; perspective: string; question: string }

export const CITY_TOTAL_TOKENS = 10;

export const CITY_PROJECTS: CityProject[] = [
  {
    id: 'biblioteca', name: 'Biblioteca', icon: 'BookOpen', full: 5, min: 3,
    summary: 'Ampliar a biblioteca da escola, com mais livros, computadores e espaço de estudo aberto à comunidade.',
    evidence: [
      { kind: 'fato', text: 'A biblioteca atual tem 40 lugares para 900 estudantes.', source: 'Levantamento fictício da escola, 2026' },
      { kind: 'opiniao', text: '“Sem silêncio em casa, estudar fica muito difícil.” — estudante do 8º ano', source: 'Depoimento (fictício)' },
      { kind: 'hipotese', text: 'Com mais horários de abertura, mais estudantes poderiam fazer trabalhos em grupo.', source: 'Proposta do grêmio (fictícia)' },
    ],
    outcomes: {
      none: 'A biblioteca continua lotada; trabalhos em grupo seguem acontecendo no pátio.',
      partial: 'A biblioteca ganha novos livros e abre no contraturno, mas sem computadores novos.',
      full: 'A biblioteca dobra de tamanho, abre à comunidade aos sábados e ganha um espaço digital.',
    },
  },
  {
    id: 'parque', name: 'Parque', icon: 'Trees', full: 4, min: 2,
    summary: 'Revitalizar o parque do bairro com áreas de lazer, esporte, sombra e mais verde.',
    evidence: [
      { kind: 'fato', text: 'O bairro tem uma única praça; o parque está com a quadra interditada.', source: 'Mapa fictício da prefeitura' },
      { kind: 'opiniao', text: '“O parque é o único lugar onde as crianças podem brincar em segurança.” — morador', source: 'Depoimento (fictício)' },
      { kind: 'hipotese', text: 'Mais árvores podem reduzir a temperatura nas ruas próximas no verão.', source: 'Hipótese a ser testada com medições' },
    ],
    outcomes: {
      none: 'O parque continua degradado; famílias se deslocam para outros bairros no fim de semana.',
      partial: 'A quadra é reformada e ganha iluminação; o plantio de árvores fica para depois.',
      full: 'Quadra, parquinho acessível, árvores e bebedouros: o parque vira ponto de encontro.',
    },
  },
  {
    id: 'transporte', name: 'Transporte', icon: 'Bus', full: 6, min: 3,
    summary: 'Melhorar o transporte público, com mais horários, abrigos cobertos e acessibilidade.',
    evidence: [
      { kind: 'fato', text: 'O ônibus passa a cada 50 minutos no horário de pico.', source: 'Tabela fictícia da linha 207' },
      { kind: 'opiniao', text: '“O ônibus está sempre lotado; perco o início da aula.” — estudante', source: 'Depoimento (fictício)' },
      { kind: 'hipotese', text: 'Abrigos com rampa podem aumentar o uso do ônibus por pessoas idosas.', source: 'Proposta da associação de moradores (fictícia)' },
    ],
    outcomes: {
      none: 'Os atrasos continuam e a frequência no primeiro horário segue baixa.',
      partial: 'Abrigos cobertos e acessíveis são instalados; a frequência dos ônibus não muda.',
      full: 'A linha ganha ônibus a cada 20 minutos no pico e abrigos acessíveis.',
    },
  },
  {
    id: 'saude', name: 'Posto de saúde', icon: 'HeartPulse', full: 5, min: 2,
    summary: 'Ampliar o horário do posto de saúde (UBS) e criar ações de prevenção nas escolas.',
    evidence: [
      { kind: 'fato', text: 'A UBS fecha às 17h; 6 em cada 10 adultos do bairro trabalham até as 18h.', source: 'Pesquisa fictícia da associação de moradores' },
      { kind: 'opiniao', text: '“Tenho que faltar ao trabalho para levar meu filho ao médico.” — mãe', source: 'Depoimento (fictício)' },
      { kind: 'hipotese', text: 'Abrir até as 20h pode reduzir as filas pela manhã.', source: 'Proposta da equipe de saúde (fictícia)' },
    ],
    outcomes: {
      none: 'O horário segue o mesmo e as filas da manhã continuam longas.',
      partial: 'A UBS abre até as 19h duas vezes por semana.',
      full: 'A UBS abre até as 20h todos os dias úteis e visita as escolas com ações de prevenção.',
    },
  },
];

export const CITY_ROLES: CityRole[] = [
  { id: 'estudante', name: 'Estudante', perspective: 'Vive a rotina da escola e do transporte.', question: 'O que mais afeta seus estudos hoje?' },
  { id: 'idosa', name: 'Moradora idosa', perspective: 'Mora no bairro há 40 anos e usa o posto de saúde.', question: 'Que mudanças tornariam o bairro mais acessível?' },
  { id: 'comerciante', name: 'Comerciante', perspective: 'Tem uma pequena loja perto do ponto de ônibus.', question: 'Como cada projeto afeta o movimento do comércio?' },
  { id: 'saude', name: 'Agente comunitária de saúde', perspective: 'Visita famílias e conhece as demandas de saúde.', question: 'Que evidências você traria para a assembleia?' },
  { id: 'esporte', name: 'Treinador voluntário', perspective: 'Organiza atividades esportivas no parque.', question: 'Quantas pessoas usariam o parque reformado?' },
  { id: 'mediacao', name: 'Equipe de mediação', perspective: 'Garante turnos de fala e registra acordos.', question: 'Como garantir que todas as vozes sejam ouvidas?' },
];

export type Allocation = Record<string, number>;

export function allocated(a: Allocation) {
  return Object.values(a).reduce((s, n) => s + n, 0);
}

export function outcomeLevel(p: CityProject, tokens: number): 'none' | 'partial' | 'full' {
  if (tokens >= p.full) return 'full';
  if (tokens >= p.min) return 'partial';
  return 'none';
}

/** Fichas colocadas acima do necessário para a versão completa. */
export function excess(p: CityProject, tokens: number) {
  return Math.max(0, tokens - p.full);
}

export function consequences(a: Allocation) {
  return CITY_PROJECTS.map((p) => {
    const t = a[p.id] ?? 0;
    const level = outcomeLevel(p, t);
    const belowMin = t > 0 && t < p.min;
    return { project: p, tokens: t, level, text: p.outcomes[level], wasted: belowMin ? t : excess(p, t) };
  });
}

export function tallyVotes(votes: Record<string, number>) {
  const entries = Object.entries(votes).sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((s, [, v]) => s + v, 0);
  const top = entries[0];
  const tie = entries.length > 1 && entries[1][1] === top?.[1] && top[1] > 0;
  return { total, winner: total > 0 && !tie ? top[0] : null, tie, entries };
}
