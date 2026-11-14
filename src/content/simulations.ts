import type { FeiraProduct, Promotion } from '../engine/feira';
import type { Difficulty } from '../types/models';

/** Todos os preços abaixo são FICTÍCIOS, criados para a atividade. */
export const FEIRA_PRODUCTS: FeiraProduct[] = [
  { id: 'banana', name: 'Banana', emoji: '🍌', unit: 'kg', priceCents: 400, group: 'fruta', step: 0.5 },
  { id: 'laranja', name: 'Laranja', emoji: '🍊', unit: 'kg', priceCents: 500, group: 'fruta', step: 0.5 },
  { id: 'maca', name: 'Maçã', emoji: '🍎', unit: 'kg', priceCents: 600, group: 'fruta', step: 0.5 },
  { id: 'mamao', name: 'Mamão', emoji: '🥭', unit: 'kg', priceCents: 700, group: 'fruta', step: 0.5 },
  { id: 'abacaxi', name: 'Abacaxi', emoji: '🍍', unit: 'un', priceCents: 800, group: 'fruta', step: 1 },
  { id: 'morango', name: 'Morango', emoji: '🍓', unit: 'kg', priceCents: 1000, group: 'fruta', step: 0.5 },
  { id: 'alface', name: 'Alface', emoji: '🥬', unit: 'un', priceCents: 300, group: 'verdura', step: 1 },
  { id: 'couve', name: 'Couve', emoji: '🥬', unit: 'maço', priceCents: 350, group: 'verdura', step: 1 },
  { id: 'tomate', name: 'Tomate', emoji: '🍅', unit: 'kg', priceCents: 650, group: 'legume', step: 0.5 },
  { id: 'cenoura', name: 'Cenoura', emoji: '🥕', unit: 'kg', priceCents: 450, group: 'legume', step: 0.5 },
  { id: 'mandioca', name: 'Mandioca', emoji: '🥔', unit: 'kg', priceCents: 500, group: 'legume', step: 0.5 },
  { id: 'ovos', name: 'Ovos', emoji: '🥚', unit: 'dúzia', priceCents: 1200, group: 'proteina', step: 1 },
  { id: 'feijao', name: 'Feijão', emoji: '🫘', unit: 'kg', priceCents: 900, group: 'grao', step: 1 },
  { id: 'arroz', name: 'Arroz', emoji: '🍚', unit: 'kg', priceCents: 600, group: 'grao', step: 1 },
];

export interface FeiraLevel {
  id: Difficulty;
  label: string;
  budgetCents: number;
  goal: string;
  products: string[];
  promos: Promotion[];
  constraints: { id: string; label: string; check: (q: Record<string, number>, balanceCents: number) => boolean }[];
}

const has = (q: Record<string, number>, ids: string[]) => ids.filter((id) => (q[id] ?? 0) > 0).length;

export const FEIRA_LEVELS: FeiraLevel[] = [
  {
    id: 'introdutorio',
    label: 'Introdutório',
    budgetCents: 5000,
    goal: 'Montem uma cesta de frutas para a semana da equipe sem passar de R$ 50,00.',
    products: ['banana', 'laranja', 'maca', 'mamao', 'abacaxi', 'morango'],
    promos: [],
    constraints: [
      { id: 'tres-frutas', label: 'Pelo menos 3 frutas diferentes', check: (q) => has(q, ['banana', 'laranja', 'maca', 'mamao', 'abacaxi', 'morango']) >= 3 },
    ],
  },
  {
    id: 'intermediario',
    label: 'Intermediário',
    budgetCents: 5000,
    goal: 'Montem a cesta com frutas e verduras usando as promoções a favor da equipe.',
    products: ['banana', 'laranja', 'maca', 'mamao', 'abacaxi', 'morango', 'alface', 'couve', 'tomate', 'cenoura'],
    promos: [
      { id: 'p1', kind: 'percent', productId: 'morango', percent: 20, label: '20% off no morango' },
      { id: 'p2', kind: 'leve-pague', productId: 'abacaxi', take: 3, pay: 2, label: 'Leve 3, pague 2' },
      { id: 'p3', kind: 'percent', productId: 'tomate', percent: 10, label: '10% off no tomate' },
    ],
    constraints: [
      { id: 'tres-frutas', label: 'Pelo menos 3 frutas diferentes', check: (q) => has(q, ['banana', 'laranja', 'maca', 'mamao', 'abacaxi', 'morango']) >= 3 },
      { id: 'verdura', label: 'Pelo menos 1 verdura ou legume', check: (q) => has(q, ['alface', 'couve', 'tomate', 'cenoura']) >= 1 },
    ],
  },
  {
    id: 'desafiador',
    label: 'Desafiador',
    budgetCents: 8000,
    goal: 'Uma família de 4 pessoas tem R$ 80,00 para a feira da semana. Montem uma cesta equilibrada e justifiquem as prioridades.',
    products: FEIRA_PRODUCTS.map((p) => p.id),
    promos: [
      { id: 'p1', kind: 'percent', productId: 'morango', percent: 20, label: '20% off no morango' },
      { id: 'p2', kind: 'leve-pague', productId: 'abacaxi', take: 3, pay: 2, label: 'Leve 3, pague 2' },
      { id: 'p4', kind: 'cupom-total', minCents: 6000, percent: 5, label: 'Cupom: 5% off em compras a partir de R$ 60,00' },
    ],
    constraints: [
      { id: 'grupos', label: 'Itens de pelo menos 4 grupos (fruta, verdura, legume, proteína, grão)', check: (q) => {
        const groups = new Set(FEIRA_PRODUCTS.filter((p) => (q[p.id] ?? 0) > 0).map((p) => p.group));
        return groups.size >= 4;
      } },
      { id: 'proteina', label: 'Uma fonte de proteína (ovos ou feijão)', check: (q) => has(q, ['ovos', 'feijao']) >= 1 },
      { id: 'reserva', label: 'Guardar pelo menos R$ 5,00 de reserva', check: (_q, balance) => balance >= 500 },
    ],
  },
];

export const FEIRA_SITUATIONS = [
  { id: 's1', title: 'Promoção tentadora', text: 'O morango está com 20% de desconto, mas estraga em 2 dias. Vale a pena comprar 2 kg para a semana toda?' },
  { id: 's2', title: 'Fruta da estação', text: 'A banana e a laranja estão na safra e mais baratas. Que vantagens (preço, frescor, transporte) a fruta da estação pode trazer?' },
  { id: 's3', title: 'Embalagem ou granel', text: 'O feirante oferece sacola plástica para cada item. Que alternativas a equipe tem para reduzir resíduos?' },
  { id: 's4', title: 'Imprevisto', text: 'Um integrante esqueceu R$ 10,00 em casa. O que vocês tirariam da cesta? Por quê?' },
];

export const FEIRA_REFLECTION = [
  'O que a equipe priorizou primeiro: preço, quantidade, variedade ou necessidade? Por quê?',
  'Qual promoção realmente economizou dinheiro? Alguma levou a comprar mais do que precisavam?',
  'Se o orçamento aumentasse 10%, quanto a mais vocês teriam? O que mudariam?',
  'Como calcular quanto do orçamento (em %) foi gasto com frutas?',
];

/** Outras simulações preparadas (roteiros prontos; motores interativos em desenvolvimento). */
export const PREPARED_SIMULATIONS = [
  { id: 'orcamento-projeto', title: 'Orçamento de um projeto', text: 'A turma tem um valor fictício para montar uma horta escolar: listar materiais, pesquisar preços, priorizar.' },
  { id: 'evento', title: 'Organização de um evento', text: 'Planejar uma feira cultural: cronograma, equipes, custos e divulgação.' },
  { id: 'agua-energia', title: 'Consumo de água e energia', text: 'Calcular o consumo de aparelhos da casa (potência × tempo) — já disponível no Laboratório de futuros.' },
  { id: 'cidade', title: 'Planejamento de uma cidade', text: 'Distribuir recursos públicos fictícios entre projetos — disponível em “Uma cidade, muitas vozes”.' },
];
