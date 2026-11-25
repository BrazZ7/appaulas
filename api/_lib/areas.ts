/**
 * Que áreas do app cada produto da Cakto libera.
 * As chaves das áreas são as mesmas de src/content/familia.ts.
 * "tudo" libera todas as áreas (plano mensal Tudo Liberado). "sala" é a plataforma do professor.
 */
export const PRODUTO_AREAS: Record<string, string[]> = {
  // Mente Brilhante (atividades)
  'b287bb51-d915-4c45-81a3-21253c2b8f25': ['foco'], // Kit Foco & Atenção
  'bb8ef4cd-5855-452a-9cb7-b7710b688275': ['foco', 'emocoes'], // Combo Foco + Emoções
  'f2f25c1f-59d6-4b56-899a-0813e4bbc8d1': ['foco', 'emocoes', 'colorir'], // Premium
  '1d843e53-e11c-4c9e-b91c-3a175b89268c': ['reforco'], // Reforço Escolar Brilhante
  'cdb66c85-711e-4901-bd1c-44fb70ba6e37': ['dezmin'], // 10 Minutos Que Valem o Dia
  '17f7d90f-e1de-49c6-b531-8e267cc4965d': ['coragem'], // Meu Filho Não É Fraco
  // Ajuda especial
  '3462d45f-44b0-489a-b5db-2df4e4e81c41': ['tea'], // Kit Especial TEA & TDAH
  '329928de-c481-4eb3-9273-15a1579c6adc': ['pranchas'], // Pranchas de Comunicação
  '9ec3d8f6-3a27-44b8-b722-12a5e292e773': ['historias'], // Histórias Sociais
  'e30bf7b3-02b4-4863-94d7-a39009253509': ['conversas'], // Conversas Difíceis
  'a5868aef-8c73-4b99-9db2-162348a739be': ['avd'], // Kit AVDs & Autonomia
  'f6b019a6-f101-46c7-a3b2-768f2f5877be': ['aee'], // Kit Sala Inclusiva AEE
  // Ensinaê para professores
  '9077af1e-4ac0-4d06-828f-576c8f2667c1': ['sala'], // Ensinaê — Plataforma de Aulas (mensal)
  'd1ce0ee8-36ba-43d2-8df6-5c8ae0c5634a': ['sala'], // Ensinaê — Plataforma de Aulas (vitalício)
};

/**
 * Áreas liberadas por um produto. Produtos extras podem ser ligados pela variável
 * CAKTO_PRODUTO_TUDO (plano Tudo Liberado) ou CAKTO_PRODUCT_IDS (tratados como "sala").
 */
export function areasDoProduto(p: { id?: string; short_id?: string } | undefined, extras: { tudo: string[]; sala: string[] }): string[] | null {
  const ids = [p?.id, p?.short_id].filter(Boolean) as string[];
  for (const id of ids) if (extras.tudo.includes(id)) return ['tudo'];
  for (const id of ids) if (PRODUTO_AREAS[id]) return PRODUTO_AREAS[id];
  for (const id of ids) if (extras.sala.includes(id)) return ['sala'];
  return null;
}
