/**
 * Área Família: cada produto da linha Mente Brilhante vira uma área do app.
 * A chave da área é a mesma usada no banco (tabela acessos) e em api/_lib/areas.ts.
 * Os PDFs ficam no bucket privado "conteudo" do Supabase, em <area>/<arquivo>.
 */
export type Categoria = 'atividades' | 'especial';

export interface ArquivoArea { arquivo: string; titulo: string; paginas: number }

export interface Area {
  id: string;
  categoria: Categoria;
  titulo: string;
  resumo: string;
  paraQuem: string;
  destaques: string[];
  cor: string;
  emoji: string;
  /** oferta da Cakto que libera a área (link pay.cakto.com.br/<oferta>) */
  oferta: string;
  preco: number;
  /** nome do pacote vendido na Cakto, quando ele libera mais de uma área */
  pacote?: string;
  arquivos: ArquivoArea[];
}

const BONUS = ['Guia dos Pais', 'Plano de 30 Dias', 'Quadro de Recompensas', 'Rotina Visual', 'Cartões das Emoções', 'Cartões de Respiração',
  'Jogo da Memória', 'Bingo da Atenção', 'Certificados', 'Medalhas e Adesivos', 'Diário Semanal', 'Gabarito', 'Desafios Relâmpago', 'Edição Extra (novas versões)'];
const BONUS_ARQ = ['guia-dos-pais', 'plano-de-30-dias', 'quadro-de-recompensas', 'rotina-visual', 'cartoes-das-emocoes', 'cartoes-de-respiracao',
  'jogo-da-memoria', 'bingo-da-atencao', 'certificados', 'medalhas-e-adesivos', 'diario-semanal', 'gabarito', 'desafios-relampago', 'edicao-extra-novas-versoes'];
const BONUS_PAG = [5, 4, 3, 5, 4, 2, 7, 6, 4, 3, 3, 3, 3, 107];

export const AREAS: Area[] = [
  {
    id: 'foco', categoria: 'atividades', titulo: 'Foco & Atenção', emoji: '🎯', cor: '#4f9cff',
    resumo: '105 atividades de foco, memória e lógica para fazer em 10 minutos por dia, sem telas.',
    paraQuem: 'Crianças de 3 a 10 anos que se distraem fácil ou demoram para terminar tarefas.',
    destaques: ['105 atividades em 3 níveis', '14 bônus para imprimir', 'Caderno especial TEA & TDAH (43 páginas)'],
    oferta: 'fq5dbpa', preco: 27,
    arquivos: [
      { arquivo: 'foco/01-kit-foco-atencao-105-atividades.pdf', titulo: 'Kit Foco & Atenção — 105 atividades', paginas: 107 },
      ...BONUS.map((b, i) => ({ arquivo: `foco/${String(i + 2).padStart(2, '0')}-bonus-${String(i + 1).padStart(2, '0')}-${BONUS_ARQ[i]}.pdf`, titulo: `Bônus ${i + 1} — ${b}`, paginas: BONUS_PAG[i] })),
      { arquivo: 'foco/16-bonus-especial-caderno-tea-tdah-43-paginas.pdf', titulo: 'Bônus especial — Caderno TEA & TDAH', paginas: 43 },
    ],
  },
  {
    id: 'emocoes', categoria: 'atividades', titulo: 'Emoções & Confiança', emoji: '💛', cor: '#ff6fa8',
    resumo: '100 atividades para nomear sentimentos, respirar, se acalmar e lidar com birra e frustração.',
    paraQuem: 'Crianças que explodem fácil, ficam ansiosas ou têm dificuldade de esperar.',
    destaques: ['100 atividades de emoções', 'Respiração, empatia e autocontrole', 'Vem junto com o Foco & Atenção'],
    oferta: '47ws3gm', preco: 37, pacote: 'Combo Foco + Emoções',
    arquivos: [{ arquivo: 'emocoes/01-kit-emocoes-confianca-100-atividades.pdf', titulo: 'Kit Emoções & Confiança — 100 atividades', paginas: 102 }],
  },
  {
    id: 'colorir', categoria: 'atividades', titulo: 'Colorir & Pintar', emoji: '🎨', cor: '#ffb400',
    resumo: '75 páginas para colorir que acalmam, treinam a coordenação e a concentração.',
    paraQuem: 'Crianças que amam pintar e precisam desacelerar depois da escola.',
    destaques: ['75 páginas ilustradas', 'Mandalas, animais e cenas', 'Vem no plano Premium com Foco e Emoções'],
    oferta: '37f7x79', preco: 40, pacote: 'Mente Brilhante Premium',
    arquivos: [{ arquivo: 'colorir/01-kit-colorir-pintar-75-paginas.pdf', titulo: 'Kit Colorir & Pintar — 75 páginas', paginas: 75 }],
  },
  {
    id: 'reforco', categoria: 'atividades', titulo: 'Reforço Escolar', emoji: '✏️', cor: '#2fc58a',
    resumo: '80 folhas de alfabetização e matemática: letras, sílabas, palavras, frases e contas.',
    paraQuem: 'Crianças em alfabetização ou que precisam reforçar o que viram na escola.',
    destaques: ['Alfabeto, sílabas e frases', 'Matemática do básico', '3 cadernos para imprimir'],
    oferta: 'jnpp5no', preco: 14.9,
    arquivos: [
      { arquivo: 'reforco/01-parte-1-alfabeto.pdf', titulo: 'Parte 1 — Alfabeto', paginas: 29 },
      { arquivo: 'reforco/02-parte-2-silabas-palavras-e-frases.pdf', titulo: 'Parte 2 — Sílabas, palavras e frases', paginas: 25 },
      { arquivo: 'reforco/03-parte-3-matematica.pdf', titulo: 'Parte 3 — Matemática', paginas: 33 },
    ],
  },
  {
    id: 'dezmin', categoria: 'atividades', titulo: '10 Minutos em Família', emoji: '⏱️', cor: '#22b8cf',
    resumo: '30 atividades rápidas para fazer junto com a criança e fortalecer o vínculo.',
    paraQuem: 'Famílias com pouco tempo que querem um momento de qualidade por dia.',
    destaques: ['30 atividades de 10 minutos', 'Sem preparo e sem telas', 'Uma por dia, durante um mês'],
    oferta: '3frnwfu', preco: 9.9,
    arquivos: [{ arquivo: 'dezmin/01-10-minutos-que-valem-o-dia-30-atividades.pdf', titulo: '10 Minutos Que Valem o Dia — 30 atividades', paginas: 35 }],
  },
  {
    id: 'coragem', categoria: 'atividades', titulo: 'Coragem & Autoestima', emoji: '🦁', cor: '#ff7a59',
    resumo: '30 desafios de coragem em 3 níveis, com mural da coragem e certificados.',
    paraQuem: 'Crianças tímidas, inseguras ou que desistem com medo de errar.',
    destaques: ['30 desafios em 3 níveis', 'Mural da coragem', 'Certificados para colar na parede'],
    oferta: '37em3k4', preco: 9.9,
    arquivos: [{ arquivo: 'coragem/01-meu-filho-nao-e-fraco-30-desafios.pdf', titulo: 'Meu Filho Não É Fraco — 30 desafios', paginas: 25 }],
  },
  {
    id: 'tea', categoria: 'especial', titulo: 'Trilha TEA & TDAH', emoji: '🧩', cor: '#8f6bff',
    resumo: '155 páginas em 3 níveis com rotina visual, calma, atenção e tarefas em passos curtos.',
    paraQuem: 'Crianças autistas, com TDAH ou em investigação, e quem cuida delas.',
    destaques: ['155 páginas em 3 níveis', 'Rotina visual e cantinho da calma', 'Tarefas em passos curtos'],
    oferta: '96x3a2q', preco: 27,
    arquivos: [{ arquivo: 'tea/01-kit-especial-tea-tdah-trilha-em-3-niveis.pdf', titulo: 'Kit Especial TEA & TDAH — trilha em 3 níveis', paginas: 155 }],
  },
  {
    id: 'pranchas', categoria: 'especial', titulo: 'Pranchas de Comunicação', emoji: '🗂️', cor: '#4f9cff',
    resumo: '156 cartões com figuras e 6 pranchas para ajudar a criança a pedir, escolher e se expressar.',
    paraQuem: 'Crianças não verbais ou com pouca fala, em casa ou na escola.',
    destaques: ['156 cartões com figuras', '6 pranchas temáticas', 'Prontos para imprimir e plastificar'],
    oferta: '92yjj5c', preco: 12.9,
    arquivos: [{ arquivo: 'pranchas/01-pranchas-de-comunicacao-156-cartoes-6-pranchas.pdf', titulo: 'Pranchas de Comunicação — 156 cartões + 6 pranchas', paginas: 27 }],
  },
  {
    id: 'historias', categoria: 'especial', titulo: 'Histórias Sociais', emoji: '📖', cor: '#2fc58a',
    resumo: '24 situações ilustradas que preparam a criança para o dia a dia: médico, escola, corte de cabelo e mais.',
    paraQuem: 'Crianças autistas ou que ficam muito ansiosas com mudanças e lugares novos.',
    destaques: ['24 histórias ilustradas', 'Situações reais do cotidiano', 'Linguagem simples e direta'],
    oferta: 'vpsov2r', preco: 14.9,
    arquivos: [{ arquivo: 'historias/01-historias-sociais-24-situacoes-ilustradas.pdf', titulo: 'Histórias Sociais — 24 situações ilustradas', paginas: 53 }],
  },
  {
    id: 'conversas', categoria: 'especial', titulo: 'Conversas Difíceis', emoji: '🫂', cor: '#ff6fa8',
    resumo: 'Atividades e roteiros para falar de separação, chegada de irmão, perda e mudança.',
    paraQuem: 'Famílias passando por uma fase difícil com crianças de 4 a 10 anos.',
    destaques: ['Roteiros para os adultos', 'Atividades para a criança', 'Separação, luto, mudança e irmãos'],
    oferta: 'tf38ptd', preco: 12.9,
    arquivos: [{ arquivo: 'conversas/01-conversas-dificeis-kit-de-apoio-emocional.pdf', titulo: 'Conversas Difíceis — kit de apoio emocional', paginas: 30 }],
  },
  {
    id: 'avd', categoria: 'especial', titulo: 'AVDs & Autonomia', emoji: '🪥', cor: '#22b8cf',
    resumo: '10 rotinas visuais para as atividades da vida diária: higiene, vestir, desfralde e alimentação.',
    paraQuem: 'Crianças que precisam de apoio visual para ganhar autonomia no dia a dia.',
    destaques: ['10 rotinas visuais', 'Desfralde passo a passo', 'Prato Aventura para a alimentação'],
    oferta: 'h6it8km', preco: 37,
    arquivos: [{ arquivo: 'avd/01-kit-avds-autonomia-rotinas-visuais.pdf', titulo: 'Kit AVDs & Autonomia — rotinas visuais', paginas: 46 }],
  },
  {
    id: 'aee', categoria: 'especial', titulo: 'Sala Inclusiva AEE', emoji: '🏫', cor: '#ffb400',
    resumo: 'PEI, rotina visual e atividades adaptadas para o atendimento educacional especializado.',
    paraQuem: 'Professoras do AEE, mediadoras e escolas com alunos de inclusão.',
    destaques: ['Modelo de PEI', 'Rotina visual da sala', 'Atividades adaptadas'],
    oferta: '3dbamte', preco: 67,
    arquivos: [{ arquivo: 'aee/01-kit-sala-inclusiva-aee-pei-rotina-visual-e-atividades.pdf', titulo: 'Kit Sala Inclusiva AEE — PEI, rotina e atividades', paginas: 55 }],
  },
];

export const CATEGORIAS: { id: Categoria; titulo: string; sub: string }[] = [
  { id: 'atividades', titulo: 'Atividades', sub: 'Foco, emoções, escola e família, em 10 minutos por dia.' },
  { id: 'especial', titulo: 'Ajuda especial', sub: 'Apoio para autismo, TDAH, comunicação e fases difíceis.' },
];

/** Plataforma do professor (o Ensinaê original). */
export const SALA = { id: 'sala', titulo: 'Sala de Aula', emoji: '🍎', oferta: '33qpcmc', preco: 29.9, mensal: true,
  resumo: 'A plataforma completa do professor: aulas imersivas, jogos, provas, diário da turma e planejamento.' };

/** Plano mensal que libera todas as áreas e a Sala de Aula. */
export const PLANO_TUDO = {
  preco: 59.9,
  oferta: ((import.meta.env.VITE_OFERTA_TUDO as string | undefined) ?? '').trim(),
};

export const TODAS_AS_AREAS = [...AREAS.map((a) => a.id), SALA.id];

export const areaPorId = (id: string) => AREAS.find((a) => a.id === id);
export const checkoutUrl = (oferta: string) => `https://pay.cakto.com.br/${oferta}`;
export const reais = (n: number) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
/** Quanto custaria comprar tudo avulso: o Premium (foco + emoções + colorir) e cada um dos outros kits. */
export const totalAvulso = () => 40 + AREAS.filter((a) => !['foco', 'emocoes', 'colorir'].includes(a.id)).reduce((s, a) => s + a.preco, 0);
