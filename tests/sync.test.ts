import { describe, expect, it } from 'vitest';
import { decidir, paraNuvem } from '../src/lib/sync';
import { seedState } from '../src/store/seed';

const R = (versao: number, atualizadoEm = '2026-11-23T10:00:00.000Z') => ({ versao, atualizadoEm });

describe('decisão de sincronização', () => {
  it('cria quando a nuvem está vazia', () => {
    expect(decidir({ versao: null, sujo: false }, null)).toBe('criar');
    expect(decidir({ versao: null, sujo: true }, null)).toBe('criar');
  });
  it('mesma versão: envia só se houver alteração local', () => {
    expect(decidir({ versao: 3, sujo: false }, R(3))).toBe('nada');
    expect(decidir({ versao: 3, sujo: true }, R(3))).toBe('enviar');
  });
  it('nuvem mais nova e nada local pendente: baixa', () => {
    expect(decidir({ versao: 3, sujo: false }, R(5))).toBe('baixar');
  });
  it('primeiro acesso em aparelho com dados: nuvem prevalece', () => {
    expect(decidir({ versao: null, sujo: true, modificadoEm: '2026-11-23T12:00:00.000Z' }, R(2))).toBe('baixar');
  });
  it('conflito: vence a alteração mais recente', () => {
    expect(decidir({ versao: 3, sujo: true, modificadoEm: '2026-11-23T11:00:00.000Z' }, R(4, '2026-11-23T10:00:00.000Z'))).toBe('enviar');
    expect(decidir({ versao: 3, sujo: true, modificadoEm: '2026-11-23T09:00:00.000Z' }, R(4, '2026-11-23T10:00:00.000Z'))).toBe('baixar');
  });
  it('não envia itens recentes (próprios de cada aparelho)', () => {
    const s = { ...seedState(), recent: [{ key: 'k', title: 't', path: '/', at: 'x', kind: 'aula' }] };
    expect(paraNuvem(s).recent).toEqual([]);
    expect(paraNuvem(s).turmas).toBe(s.turmas);
  });
});
