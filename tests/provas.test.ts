import { describe, expect, it } from 'vitest';
import { BANCO, PROVAS_PRONTAS } from '../src/content/questoes';
import { FIGURAS } from '../src/components/Figura';
import {
  PERFIS, adaptarQuestoes, embaralharPares, gabarito, paginar, partesComComando, reduzirAlternativas, semente, totalPontos, validarProva,
} from '../src/lib/prova';

describe('banco de questões e provas prontas', () => {
  it('ids únicos e questões consistentes', () => {
    expect(new Set(BANCO.map((q) => q.id)).size).toBe(BANCO.length);
    for (const q of BANCO) {
      if (q.tipo === 'multipla') expect(q.correta, q.id).toBeGreaterThanOrEqual(0), expect(q.correta!, q.id).toBeLessThan(q.itens.length);
      if (q.tipo === 'vf') expect(q.vf?.length, q.id).toBe(q.itens.length);
      if (q.tipo === 'associacao') expect(q.pares?.length, q.id).toBe(q.itens.length);
      if (q.tipo === 'completar') expect(q.enunciado, q.id).toContain('___');
      if (q.imagem?.kind === 'figura') expect(FIGURAS.some((f) => f.id === (q.imagem as { id: string }).id), q.id).toBe(true);
    }
  });
  it('todas as provas prontas passam na validação', () => {
    for (const p of PROVAS_PRONTAS) expect(validarProva(p), p.id).toEqual([]);
    expect(new Set(PROVAS_PRONTAS.map((p) => p.id)).size).toBe(PROVAS_PRONTAS.length);
  });
});

describe('adaptações', () => {
  it('reduz alternativas mantendo a correta', () => {
    expect(reduzirAlternativas(['a', 'b', 'c', 'd'], 3, 3)).toEqual({ itens: ['a', 'b', 'd'], correta: 2 });
    expect(reduzirAlternativas(['a', 'b', 'c'], 1, 0)).toEqual({ itens: ['a', 'b', 'c'], correta: 1 });
  });
  it('TEA usa enunciado simples, 1 por página e no máximo 3 alternativas', () => {
    const p = PROVAS_PRONTAS.find((x) => x.id === 'pronta-mat-4')!;
    const qs = adaptarQuestoes(p.questoes, 'tea');
    expect(qs[0].texto).toBe('Que fração está pintada?');
    expect(qs[0].itens).toHaveLength(3);
    expect(qs[0].itens[qs[0].correta!]).toBe('3/8');
    expect(paginar(qs, PERFIS.tea.porPagina)).toHaveLength(qs.length);
    expect(adaptarQuestoes(p.questoes, 'padrao')[0].texto).toMatch(/^Observe a pizza/);
  });
  it('destaca verbos de comando', () => {
    const partes = partesComComando('Observe a figura e calcule o total.');
    expect(partes.filter((x) => x.cmd).map((x) => x.t)).toEqual(['Observe', 'calcule']);
    expect(partes.map((x) => x.t).join('')).toBe('Observe a figura e calcule o total.');
  });
  it('embaralha a coluna B sem deixar na ordem original e o gabarito confere', () => {
    const pares = ['feliz', 'veloz', 'lar', 'belo'];
    const emb = embaralharPares(pares, semente('x'));
    expect(emb.map((e) => e.original)).not.toEqual([0, 1, 2, 3]);
    expect([...emb].sort((a, b) => a.original - b.original).map((e) => e.texto)).toEqual(pares);
    const q = adaptarQuestoes([{ id: 'x', tipo: 'associacao', enunciado: 'Ligue', itens: ['alegre', 'rápido', 'casa', 'bonito'], pares, pontos: 2 }], 'padrao')[0];
    const g = gabarito(q);
    const letraDoPrimeiro = 'abcd'[emb.findIndex((e) => e.original === 0)];
    expect(g.startsWith(`1 → ${letraDoPrimeiro}`)).toBe(true);
  });
  it('soma os pontos', () => {
    expect(totalPontos({ questoes: [{ pontos: 1.5 }, { pontos: 2 }, { pontos: 0.25 }] as never })).toBe(3.75);
  });
  it('aponta pendências da prova', () => {
    const erros = validarProva({ id: 'p', title: '', instrucoes: '', perfil: 'padrao', createdAt: '', updatedAt: '', questoes: [{ id: 'q', tipo: 'multipla', enunciado: '', itens: ['só uma'], pontos: 1 }] });
    expect(erros.length).toBeGreaterThanOrEqual(3);
  });
});
