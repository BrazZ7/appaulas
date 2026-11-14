/**
 * “A feira das decisões” — regras de cálculo.
 * Todo valor monetário é tratado em CENTAVOS (inteiros) para evitar erros de arredondamento.
 * Os preços são FICTÍCIOS e servem apenas à aprendizagem.
 */

export interface FeiraProduct {
  id: string;
  name: string;
  emoji: string;
  unit: 'kg' | 'un' | 'dúzia' | 'maço' | 'L';
  /** preço em centavos por unidade */
  priceCents: number;
  group: 'fruta' | 'verdura' | 'legume' | 'proteina' | 'grao' | 'outro';
  notes?: string;
  /** passo de quantidade (ex.: 0,5 kg) */
  step: number;
}

export type Promotion =
  | { id: string; kind: 'percent'; productId: string; percent: number; label: string }
  | { id: string; kind: 'leve-pague'; productId: string; take: number; pay: number; label: string }
  | { id: string; kind: 'cupom-total'; minCents: number; percent: number; label: string };

export interface BasketLine {
  productId: string;
  name: string;
  qty: number;
  unitCents: number;
  grossCents: number;
  discountCents: number;
  netCents: number;
  promoLabel?: string;
}

export interface BasketResult {
  lines: BasketLine[];
  grossCents: number;
  itemDiscountCents: number;
  couponDiscountCents: number;
  totalCents: number;
  budgetCents: number;
  balanceCents: number;
  usedPercent: number;
  withinBudget: boolean;
  groups: Record<FeiraProduct['group'], number>;
}

const round = (n: number) => Math.round(n);

export function lineFor(p: FeiraProduct, qty: number, promos: Promotion[]): BasketLine {
  const grossCents = round(p.priceCents * qty);
  let discountCents = 0;
  let promoLabel: string | undefined;
  for (const promo of promos) {
    if (promo.kind === 'percent' && promo.productId === p.id) {
      discountCents = round((grossCents * promo.percent) / 100);
      promoLabel = promo.label;
    }
    if (promo.kind === 'leve-pague' && promo.productId === p.id) {
      // só se aplica a unidades inteiras
      const groups = Math.floor(qty / promo.take);
      discountCents = groups * (promo.take - promo.pay) * p.priceCents;
      if (groups > 0) promoLabel = promo.label;
    }
  }
  return { productId: p.id, name: p.name, qty, unitCents: p.priceCents, grossCents, discountCents, netCents: grossCents - discountCents, promoLabel };
}

export function calcBasket(
  products: FeiraProduct[],
  quantities: Record<string, number>,
  budgetCents: number,
  promos: Promotion[] = [],
): BasketResult {
  const lines = products
    .filter((p) => (quantities[p.id] ?? 0) > 0)
    .map((p) => lineFor(p, quantities[p.id], promos));
  const grossCents = lines.reduce((s, l) => s + l.grossCents, 0);
  const itemDiscountCents = lines.reduce((s, l) => s + l.discountCents, 0);
  const afterItems = grossCents - itemDiscountCents;
  let couponDiscountCents = 0;
  for (const promo of promos) {
    if (promo.kind === 'cupom-total' && afterItems >= promo.minCents) couponDiscountCents = round((afterItems * promo.percent) / 100);
  }
  const totalCents = afterItems - couponDiscountCents;
  const groups = { fruta: 0, verdura: 0, legume: 0, proteina: 0, grao: 0, outro: 0 };
  for (const l of lines) {
    const p = products.find((x) => x.id === l.productId)!;
    groups[p.group] += l.netCents;
  }
  return {
    lines,
    grossCents,
    itemDiscountCents,
    couponDiscountCents,
    totalCents,
    budgetCents,
    balanceCents: budgetCents - totalCents,
    usedPercent: budgetCents > 0 ? Math.round((totalCents / budgetCents) * 1000) / 10 : 0,
    withinBudget: totalCents <= budgetCents,
    groups,
  };
}

export function brl(cents: number): string {
  const sign = cents < 0 ? '−' : '';
  const v = Math.abs(cents) / 100;
  return `${sign}R$ ${v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function fmtQty(q: number): string {
  return q.toLocaleString('pt-BR', { maximumFractionDigits: 2 });
}

/** Preço por unidade após desconto percentual — usado nas perguntas de comparação. */
export function percentOf(cents: number, percent: number) {
  return round((cents * percent) / 100);
}
