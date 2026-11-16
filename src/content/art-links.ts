/**
 * Liga as imagens da fase 2 ao conteúdo sem alterar os arquivos de conteúdo.
 * Cada vínculo só é aplicado se a imagem estiver registrada (ver assets.ts / SPRITES).
 */
import type { GameActivity, Immersion, Story } from '../types/models';
import { ASSET_MAP } from './assets';

const STORY_PREFIX: Record<string, string> = { 'biblioteca-finais': 'story-biblioteca', 'rio-claro': 'story-rio', 'radio-escola': 'story-radio' };
const SCENE_ALIAS: Record<string, string> = { 'fim-relatorio': 'relatorio', 'fim-conflito': 'conflito', 'fim-boato': 'boato' };
const IMM_PREFIX: Record<string, string> = { 'memorias-afro-brasileiras': 'imm-afro', 'povos-indigenas-hoje': 'imm-indigena', 'agua-que-nos-conecta': 'imm-agua', 'sabores-e-sotaques': 'imm-sabores' };

/** Imagens com transparência (personagens, itens, emblemas) — exibidas com <Sprite>. */
export const SPRITES = new Set<string>([
  'char-lia', 'char-caio', 'char-ivone', 'char-davi', 'char-yara', 'char-socorro', 'char-bia', 'char-teo', 'char-rosangela',
  'equipe-arvoredo', 'equipe-rio-vivo', 'equipe-horizonte', 'equipe-aurora', 'equipe-cometa', 'equipe-floresta', 'equipe-mare', 'equipe-sol',
  'escrita-1-planejar', 'escrita-2-ideias', 'escrita-3-rascunho', 'escrita-4-revisar', 'escrita-5-reescrever', 'escrita-6-publicar',
  'res-papelao', 'res-lata', 'res-pote-vidro', 'res-casca-banana', 'res-fralda',
  'res-jornal', 'res-garrafa-pet', 'res-frasco-xampu', 'res-borra-cafe', 'res-papel-higienico',
  'lixeira-papel', 'lixeira-plastico', 'lixeira-metal', 'lixeira-vidro', 'lixeira-organico', 'lixeira-rejeito',
  'robo', 'muda', 'muda-regada', 'pedra', 'terra', 'print-cantos',
]);

const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function linkStories(stories: Story[]) {
  for (const s of stories) {
    const pre = STORY_PREFIX[s.id];
    if (!pre) continue;
    for (const sc of Object.values(s.scenes)) {
      const id = `${pre}-${SCENE_ALIAS[sc.id] ?? sc.id}`;
      if (ASSET_MAP[id]) sc.artId = id;
    }
    for (const c of s.characters) if (SPRITES.has(`char-${c.id}`)) c.portrait = `char-${c.id}`;
  }
}

export function linkImmersions(list: Immersion[]) {
  for (const imm of list) {
    const pre = IMM_PREFIX[imm.id];
    if (!pre) continue;
    imm.chapters.forEach((ch, i) => { if (ASSET_MAP[`${pre}-cap${i + 1}`]) ch.artId = `${pre}-cap${i + 1}`; });
  }
}

const RES: Record<string, string> = { 'caixa-de-papelao-desmontada': 'res-papelao', 'lata-de-aluminio': 'res-lata', 'pote-de-vidro-de-geleia': 'res-pote-vidro', 'cascas-de-banana': 'res-casca-banana', 'fralda-descartavel-usada': 'res-fralda',
  'jornal-velho': 'res-jornal', 'garrafa-pet-de-refrigerante': 'res-garrafa-pet', 'frasco-vazio-de-xampu': 'res-frasco-xampu', 'borra-de-cafe': 'res-borra-cafe', 'papel-higienico-usado': 'res-papel-higienico' };

export function linkGames(list: GameActivity[]) {
  for (const g of list) {
    const c = g.content;
    if (c.kind === 'memoria' && g.id === 'memoria-biomas') for (const p of c.pairs) { const id = `mem-${norm(p.a)}`; if (ASSET_MAP[id]) p.artId = id; }
    if (c.kind === 'sequencia') {
      const pre = g.id === 'sequencia-ciclo-agua' ? 'agua' : g.id === 'sequencia-escrita-texto' ? 'escrita' : null;
      if (pre) {
        const ids = [...ASSET_MAP_KEYS(), ...SPRITES].filter((k) => k.startsWith(`${pre}-`)).sort();
        c.items.forEach((it, i) => { if (ids[i]) it.artId = ids[i]; });
      }
    }
    if (c.kind === 'classificacao' && g.id === 'classificacao-residuos') {
      for (const it of c.items) { const sp = RES[norm(it.label)]; if (sp) it.sprite = sp; }
      for (const cat of c.categories) if (SPRITES.has(`lixeira-${cat.id}`)) cat.sprite = `lixeira-${cat.id}`;
    }
  }
}
const ASSET_MAP_KEYS = () => Object.keys(ASSET_MAP);

/** Emblema por nome de equipe (“Equipe Rio Vivo” → equipe-rio-vivo). */
export function teamEmblem(name: string): string | undefined {
  const id = `equipe-${norm(name.replace(/^equipe\s+/i, ''))}`;
  return SPRITES.has(id) ? id : undefined;
}

/** Faixa colorida de impressão por matéria. */
export function printBand(subject?: string): string {
  const map: Record<string, string> = {
    portugues: 'portugues', matematica: 'matematica', ciencias: 'ciencias', historia: 'historia', geografia: 'geografia', artes: 'artes',
    'educacao-fisica': 'educacao-fisica', ingles: 'ingles', tecnologia: 'tecnologia', 'educacao-financeira': 'educacao-financeira',
    economia: 'educacao-financeira', 'politica-cidadania': 'cidadania',
  };
  return `print-topo-${map[subject ?? ''] ?? 'ambiente'}`;
}
