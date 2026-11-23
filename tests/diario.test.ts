import { describe, expect, it } from 'vitest';
import {
  csvChamada, csvNotas, frequencia, importarAvaliacao, importarItem, media, parseNota, periodoDaData, relatorioTurma, situacao, toCsv,
} from '../src/lib/diario';
import type { Avaliacao, Chamada, ItemTurma, Turma } from '../src/types/models';

const turma: Turma = {
  id: 't1', orgId: 'o', name: '7º A', etapa: 'fundamental2', ano: 7, turno: 'manha', groups: [], resources: [],
  students: [{ id: 'a', displayName: 'Bia', numero: '2' }, { id: 'b', displayName: 'Ana', numero: '1' }, { id: 'c', displayName: 'Caio' }],
};
const ch = (date: string, aulas: number, presencas: Chamada['presencas']): Chamada => ({ id: date, turmaId: 't1', date, aulas, conteudo: '', presencas, createdAt: date });
const av = (id: string, periodo: number, notaMax: number, peso: number, notas: Record<string, number>, tipo: Avaliacao['tipo'] = 'prova'): Avaliacao =>
  ({ id, turmaId: 't1', title: id, tipo, date: `2026-0${periodo * 2}-10`, periodo, notaMax, peso, notas, createdAt: '' });

describe('frequência', () => {
  const chamadas = [ch('2026-03-02', 2, { a: 'P', b: 'F' }), ch('2026-03-03', 1, { a: 'F', b: 'J' }), ch('2026-03-04', 1, { a: 'P' })];
  it('conta faltas multiplicadas pelo número de aulas e justificadas como presença', () => {
    expect(frequencia('a', chamadas)).toEqual({ aulas: 4, faltas: 1, justificadas: 0, percentual: 75 });
    expect(frequencia('b', chamadas)).toEqual({ aulas: 3, faltas: 2, justificadas: 1, percentual: 33.3 });
  });
  it('sem chamadas, percentual é nulo', () => {
    expect(frequencia('c', chamadas).percentual).toBeNull();
  });
});

describe('médias', () => {
  it('pondera pelo peso e converte para 0–10', () => {
    // 8/10 peso 2 = 8; 15/20 peso 1 = 7,5 → (16 + 7,5) / 3 = 7,83
    expect(media('a', [av('p1', 1, 10, 2, { a: 8 }), av('t1', 1, 20, 1, { a: 15 })])).toBe(7.8);
  });
  it('ignora avaliações sem nota lançada', () => {
    expect(media('a', [av('p1', 1, 10, 1, { a: 6 }), av('p2', 1, 10, 1, {})])).toBe(6);
    expect(media('a', [av('p2', 1, 10, 1, {})])).toBeNull();
  });
  it('recuperação substitui a média só quando é maior', () => {
    expect(media('a', [av('p1', 1, 10, 1, { a: 4 }), av('rec', 1, 10, 1, { a: 7 }, 'recuperacao')])).toBe(7);
    expect(media('a', [av('p1', 1, 10, 1, { a: 8 }), av('rec', 1, 10, 1, { a: 5 }, 'recuperacao')])).toBe(8);
  });
});

describe('utilidades', () => {
  it('lê notas com vírgula', () => {
    expect(parseNota('7,5')).toBe(7.5);
    expect(parseNota(' ')).toBeUndefined();
    expect(parseNota('abc')).toBeNaN();
  });
  it('identifica o período pela data', () => {
    expect(periodoDaData('2026-02-10')).toBe(1);
    expect(periodoDaData('2026-05-10')).toBe(2);
    expect(periodoDaData('2026-08-10')).toBe(3);
    expect(periodoDaData('2026-11-10')).toBe(4);
  });
  it('situação prioriza frequência baixa', () => {
    expect(situacao(9, 60)).toBe('atencao-frequencia');
    expect(situacao(5, 90)).toBe('recuperacao');
    expect(situacao(null, null)).toBe('sem-dados');
  });
  it('CSV usa ; e escapa aspas', () => {
    expect(toCsv([['a;b', 'x"y', 1.5]])).toBe('﻿"a;b";"x""y";1,5');
  });
});

describe('relatórios e exportação', () => {
  const avs = [av('p1', 1, 10, 1, { a: 9, b: 4 }), av('p2', 2, 10, 1, { a: 7 })];
  const chs = [ch('2026-03-02', 1, { a: 'P', b: 'F', c: 'P' })];
  it('ordena pela numeração e calcula médias por período', () => {
    const r = relatorioTurma(turma, chs, avs);
    expect(r.map((l) => l.student.displayName)).toEqual(['Ana', 'Bia', 'Caio']);
    const bia = r[1];
    expect(bia.medias[1]).toBe(9);
    expect(bia.medias[2]).toBe(7);
    expect(bia.mediaGeral).toBe(8);
    expect(r[0].situacao).toBe('atencao-frequencia');
  });
  it('relatório de um período usa só aquele período', () => {
    const r = relatorioTurma(turma, chs, avs, 2);
    expect(r[1].mediaGeral).toBe(7);
    expect(r[0].mediaGeral).toBeNull();
  });
  it('CSV de notas e chamada têm uma linha por estudante', () => {
    expect(csvNotas(turma, avs).split('\r\n')).toHaveLength(4);
    const chamada = csvChamada(turma, chs).split('\r\n');
    expect(chamada[1]).toContain('Ana;F;1;1;0;0');
  });
});

describe('importar entre turmas', () => {
  it('copia item como planejado e avaliação sem notas', () => {
    const item: ItemTurma = { id: 'i1', turmaId: 't1', tipo: 'prova', title: 'P', description: '', status: 'aplicado', createdAt: '', updatedAt: '' };
    const novo = importarItem(item, 't2', 'i2', 'agora');
    expect(novo).toMatchObject({ id: 'i2', turmaId: 't2', status: 'planejado', importadoDe: 'i1' });
    const a = importarAvaliacao(av('p1', 1, 10, 1, { a: 9 }), 't2', 'n', 'agora');
    expect(a).toMatchObject({ id: 'n', turmaId: 't2', notas: {} });
  });
});
