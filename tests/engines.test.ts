import { describe, expect, it } from 'vitest';
import { calcBasket, brl } from '../src/engine/feira';
import { FEIRA_PRODUCTS, FEIRA_LEVELS } from '../src/content/simulations';
import { simulate, LAB_DEFAULTS, kwh } from '../src/engine/lab';
import { runProgram, ROBOT_LEVELS, knn, type Block } from '../src/engine/robot';
import { consequences, tallyVotes, outcomeLevel, CITY_PROJECTS } from '../src/engine/city';
import { checkClueAnswer, checkSequence, shuffle, shuffleNotIdentity, checkClassification, summarize } from '../src/engine/games';
import { scaleDurations, totalMinutes } from '../src/lib/lesson';

describe('feira', () => {
  it('soma a cesta de referência (banana 2kg, laranja 1kg, maçã 1kg = R$ 19,00 = 38%)', () => {
    const r = calcBasket(FEIRA_PRODUCTS, { banana: 2, laranja: 1, maca: 1 }, 5000);
    expect(r.totalCents).toBe(1900);
    expect(r.balanceCents).toBe(3100);
    expect(r.usedPercent).toBe(38);
    expect(brl(r.totalCents)).toBe('R$ 19,00');
  });
  it('aplica porcentagem, leve-3-pague-2 e cupom', () => {
    const lvl = FEIRA_LEVELS.find((l) => l.id === 'desafiador')!;
    const r = calcBasket(FEIRA_PRODUCTS, { morango: 1, abacaxi: 3, feijao: 3, arroz: 2, ovos: 1 }, lvl.budgetCents, lvl.promos);
    // morango 1000 -20% = 800; abacaxi 3x800=2400 -800 = 1600; feijão 2700; arroz 1200; ovos 1200 => 7500; cupom 5% = 375
    expect(r.itemDiscountCents).toBe(200 + 800);
    expect(r.couponDiscountCents).toBe(375);
    expect(r.totalCents).toBe(7125);
  });
  it('quantidades fracionadas', () => {
    const r = calcBasket(FEIRA_PRODUCTS, { tomate: 1.5 }, 5000);
    expect(r.totalCents).toBe(975);
  });
});

describe('laboratório', () => {
  it('é determinístico e coerente', () => {
    const a = simulate(LAB_DEFAULTS);
    expect(simulate(LAB_DEFAULTS)).toEqual(a);
    expect(simulate({ ...LAB_DEFAULTS, paineis: 10 }).energia).toBeGreaterThanOrEqual(a.energia);
    expect(simulate({ ...LAB_DEFAULTS, consumo: 100 }).energia).toBeLessThanOrEqual(a.energia);
    expect(simulate({ ...LAB_DEFAULTS, chuva: 0 }).agua).toBeLessThan(a.agua);
  });
  it('sem vento/chuva a noite depende de bateria', () => {
    const base = { ...LAB_DEFAULTS, vento: 0, chuva: 0, paineis: 10, sol: 100 };
    const sem = simulate({ ...base, bateria: false });
    const com = simulate({ ...base, bateria: true });
    expect(sem.noiteAtendido).toBe(0);
    expect(com.noiteAtendido).toBeGreaterThan(0);
    expect(com.diesel).toBeLessThan(sem.diesel);
  });
  it('kWh = W × h × dias / 1000', () => {
    expect(kwh({ id: 'x', name: 'x', watts: 5500, hoursPerDay: 0.5, days: 30 })).toBe(82.5);
  });
});

describe('robô', () => {
  it('resolve nível 1 e detecta erros', () => {
    const p: Block[] = [{ id: '1', type: 'frente' }, { id: '2', type: 'frente' }, { id: '3', type: 'frente' }, { id: '4', type: 'regar' }];
    expect(runProgram(ROBOT_LEVELS[0], p).success).toBe(true);
    expect(runProgram(ROBOT_LEVELS[0], p.slice(0, 2).concat({ id: '5', type: 'regar' })).error).toMatch(/muda/);
  });
  it('repetir no nível 3', () => {
    const p: Block[] = [{ id: 'r', type: 'repetir', times: 4, body: [{ id: 'a', type: 'frente' }, { id: 'b', type: 'regar' }] }];
    expect(runProgram(ROBOT_LEVELS[2], p).success).toBe(true);
  });
  it('knn vota pelos vizinhos', () => {
    expect(knn([{ id: 'a', x: 0, y: 0, label: 'A' }, { id: 'b', x: 1, y: 1, label: 'A' }, { id: 'c', x: 9, y: 9, label: 'B' }], 0.5, 0.5, 3).label).toBe('A');
  });
});

describe('cidade', () => {
  it('níveis e consequências', () => {
    const bib = CITY_PROJECTS[0];
    expect(outcomeLevel(bib, bib.full)).toBe('full');
    expect(outcomeLevel(bib, bib.min)).toBe('partial');
    expect(outcomeLevel(bib, bib.min - 1)).toBe('none');
    const c = consequences({ biblioteca: 1 });
    expect(c[0].wasted).toBe(1);
  });
  it('votação detecta empate', () => {
    expect(tallyVotes({ a: 3, b: 3 }).tie).toBe(true);
    expect(tallyVotes({ a: 5, b: 3 }).winner).toBe('a');
  });
});

describe('jogos', () => {
  it('normaliza respostas', () => {
    expect(checkClueAnswer('  Leitúra ', ['leitura'])).toBe(true);
    expect(checkClueAnswer('', ['leitura'])).toBe(false);
  });
  it('embaralhamento determinístico e não-identidade', () => {
    expect(shuffle([1, 2, 3, 4, 5], 7)).toEqual(shuffle([1, 2, 3, 4, 5], 7));
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    expect(shuffleNotIdentity(items, 1).map((x) => x.id)).not.toEqual(['a', 'b', 'c']);
  });
  it('checagens', () => {
    expect(checkSequence(['a', 'b'], ['b', 'a']).correctCount).toBe(0);
    expect(checkClassification([{ id: 'x', category: 'c' }], { x: 'c' }).correctCount).toBe(1);
    expect(summarize([{ correct: true, attempts: 1 }, { correct: true, attempts: 3 }])).toEqual({ total: 2, solved: 2, firstTry: 1, retries: 2 });
  });
});

describe('planejador', () => {
  it('escala durações mantendo o total', () => {
    const blocks = [10, 20, 15, 5].map((m, i) => ({ id: String(i), kind: 'atividade' as const, title: '', minutes: m, instructions: '' }));
    expect(totalMinutes(scaleDurations(blocks, 45))).toBe(45);
    expect(totalMinutes(scaleDurations(blocks, 90))).toBe(90);
  });
});
