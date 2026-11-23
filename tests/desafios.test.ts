import { describe, expect, it } from 'vitest';
import { APRESENTACOES, DESAFIOS_TURMA, PROJETOS_FEIRA, TODOS_DESAFIOS, findDesafio, resumoParaTurma } from '../src/content/desafios';
import { CENAS } from '../src/components/Cena';
import { SUBJECTS } from '../src/content';

describe('desafios, roteiros e projetos', () => {
  it('ids únicos e coleções preenchidas', () => {
    expect(new Set(TODOS_DESAFIOS.map((d) => d.id)).size).toBe(TODOS_DESAFIOS.length);
    expect(DESAFIOS_TURMA.length).toBeGreaterThanOrEqual(3);
    expect(APRESENTACOES.length).toBeGreaterThanOrEqual(7);
    expect(PROJETOS_FEIRA.length).toBeGreaterThanOrEqual(6);
    expect(findDesafio('nosso-filme')).toBeDefined();
    expect(findDesafio('consciencia-negra')?.data).toBe('20/11');
  });
  it('todas as cenas e matérias existem', () => {
    for (const d of TODOS_DESAFIOS) {
      expect(CENAS[d.capa], `${d.id} capa`).toBeDefined();
      for (const p of d.passos) expect(CENAS[p.cena], `${d.id}: ${p.titulo}`).toBeDefined();
      for (const c of d.roteiro ?? []) expect(CENAS[c.cena], `${d.id}: ${c.titulo}`).toBeDefined();
      for (const s of d.subjects) expect(SUBJECTS.some((x) => x.id === s), `${d.id}: ${s}`).toBe(true);
    }
  });
  it('apresentações têm roteiro com falas; projetos têm ciência e segurança', () => {
    for (const a of APRESENTACOES) {
      expect(a.roteiro?.length, a.id).toBeGreaterThanOrEqual(3);
      expect(a.roteiro!.every((c) => c.falas.length > 0), a.id).toBe(true);
    }
    for (const p of PROJETOS_FEIRA) {
      expect(p.ciencia, p.id).toBeDefined();
      expect(p.seguranca?.length, p.id).toBeGreaterThan(0);
    }
  });
  it('resumo para a turma lista todos os passos', () => {
    const d = findDesafio('vulcao')!;
    const r = resumoParaTurma(d);
    for (const p of d.passos) expect(r).toContain(p.titulo);
  });
});
