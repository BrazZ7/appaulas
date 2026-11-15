/**
 * Registro de recursos visuais. Cada `artId` usado no conteúdo deve existir aqui.
 * Enquanto a imagem não existir em /public/assets, o componente <Art> desenha
 * um cenário provisório (gradiente + ícone) com a mesma proporção.
 *
 * Para integrar uma imagem gerada: salve em public/assets/<file> (e opcionalmente
 * <nome>-mobile.webp) e adicione o id em AVAILABLE_ASSETS.
 */

export type Motif =
  | 'ilhas' | 'livro' | 'cidade' | 'floresta' | 'rio' | 'feira' | 'laboratorio' | 'jogo' | 'pessoas'
  | 'tambor' | 'mapa' | 'estrela' | 'video' | 'conversa' | 'radio' | 'robo' | 'calendario' | 'montanha';

export interface AssetDef {
  id: string;
  file: string;
  alt: string;
  /** largura/altura */
  ratio: number;
  palette: [string, string, string];
  motif: Motif;
  hasMobile?: boolean;
  /** Variantes leves disponíveis (padrão: -sm e -md). */
  variants?: 'sm-md' | 'sm';
}

const A = (id: string, alt: string, ratio: number, palette: [string, string, string], motif: Motif, hasMobile = false): AssetDef => ({
  id, file: `${id}.webp`, alt, ratio, palette, motif, hasMobile,
});

const W = 16 / 9;
const CARD = 4 / 3;

export const ASSETS: AssetDef[] = [
  // Cabeçalhos/ambientação
  A('hero-inicio', 'Livro aberto de onde surgem florestas, montanhas e uma cidade costeira brasileira sob o céu noturno', 21 / 9, ['#1b2a6b', '#7c3aed', '#14b8a6'], 'livro', true),
  A('hero-materias', 'Ilhas flutuantes do conhecimento ligadas por pontes de luz', 21 / 9, ['#1e1b4b', '#6d28d9', '#06b6d4'], 'ilhas', true),
  A('hero-imersoes', 'Roda de conversa em um centro cultural comunitário ao entardecer', 21 / 9, ['#3b1d4a', '#b45309', '#14b8a6'], 'pessoas', true),
  A('hero-jogos', 'Ilha com portal de pedra, pontes e cachoeira à noite', 21 / 9, ['#172554', '#7c3aed', '#22c55e'], 'jogo', true),
  A('hero-estudio', 'Mesa de criação com mapa antigo, câmera e storyboard', 21 / 9, ['#1f2937', '#a16207', '#0ea5e9'], 'video', true),
  A('hero-formacao', 'Professora em sala acolhedora com plantas e balões de diálogo', 21 / 9, ['#2e1065', '#0d9488', '#f59e0b'], 'conversa', true),
  A('hero-turmas', 'Estudantes trabalhando em grupos em uma sala colorida', 21 / 9, ['#1e3a8a', '#0f766e', '#a855f7'], 'pessoas', true),

  // Matérias
  A('subj-portugues', 'Árvore de letras crescendo de um livro aberto', CARD, ['#4c1d95', '#c2410c', '#fbbf24'], 'livro'),
  A('subj-matematica', 'Cubos coloridos flutuando sobre uma grade luminosa', CARD, ['#1e3a8a', '#7c3aed', '#22d3ee'], 'estrela'),
  A('subj-ciencias', 'Microscópio entre folhas e uma pequena rã', CARD, ['#064e3b', '#15803d', '#a3e635'], 'laboratorio'),
  A('subj-historia', 'Ruínas, ampulheta e mapa antigo ao pôr do sol', CARD, ['#451a03', '#b45309', '#fcd34d'], 'mapa'),
  A('subj-geografia', 'Ilha com montanhas, rio sinuoso e nuvens', CARD, ['#0c4a6e', '#0d9488', '#86efac'], 'montanha'),
  A('subj-artes', 'Pincéis e respingos de tinta vibrantes', CARD, ['#701a75', '#db2777', '#f97316'], 'estrela'),
  A('subj-educacao-fisica', 'Pessoa correndo em pista ao entardecer', CARD, ['#7c2d12', '#ea580c', '#a855f7'], 'pessoas'),
  A('subj-ingles', 'Balões de fala e torre de relógio', CARD, ['#1e1b4b', '#2563eb', '#ef4444'], 'conversa'),
  A('subj-outras-linguas', 'Balões de fala em vários alfabetos sobre um mapa-múndi', CARD, ['#134e4a', '#2563eb', '#f59e0b'], 'conversa'),
  A('subj-tecnologia', 'Pequeno robô montando blocos de código', CARD, ['#0f172a', '#0891b2', '#a78bfa'], 'robo'),
  A('subj-educacao-financeira', 'Cofrinho, moedas e lista de compras', CARD, ['#14532d', '#16a34a', '#facc15'], 'feira'),
  A('subj-economia', 'Barracas de feira e gráfico de barras estilizado', CARD, ['#422006', '#ca8a04', '#7c3aed'], 'feira'),
  A('subj-politica-cidadania', 'Praça pública com pessoas conversando', CARD, ['#1e3a8a', '#0d9488', '#f472b6'], 'pessoas'),
  A('subj-fisica', 'Pêndulo e ondas de luz', CARD, ['#0f172a', '#4f46e5', '#22d3ee'], 'laboratorio'),
  A('subj-quimica', 'Vidrarias com líquidos coloridos', CARD, ['#3b0764', '#9333ea', '#34d399'], 'laboratorio'),
  A('subj-biologia', 'Folha vista ao microscópio com células', CARD, ['#052e16', '#16a34a', '#2dd4bf'], 'floresta'),
  A('subj-filosofia', 'Escadaria que sobe entre nuvens e estrelas', CARD, ['#1e1b4b', '#6366f1', '#e879f9'], 'estrela'),
  A('subj-sociologia', 'Rede de pessoas conectadas por linhas de luz', CARD, ['#172554', '#0ea5e9', '#f472b6'], 'pessoas'),

  // Imersões
  A('imm-afro', 'Roda de histórias com uma griô e jovens em centro cultural comunitário', W, ['#451a03', '#c2410c', '#14b8a6'], 'tambor', true),
  A('imm-indigena', 'Aldeia e escola indígena contemporânea com jovens usando celular e grafismos', W, ['#14532d', '#b45309', '#38bdf8'], 'floresta', true),
  A('imm-regional', 'Mosaico de paisagens e comidas de diferentes regiões do Brasil', W, ['#7c2d12', '#16a34a', '#facc15'], 'mapa', true),
  A('imm-patrimonio', 'Casario histórico e festa popular na praça', W, ['#3b0764', '#d97706', '#0ea5e9'], 'cidade', true),
  A('imm-ambiente', 'Bairro com rio limpo, ciclovia e painéis solares', W, ['#064e3b', '#0d9488', '#fde047'], 'rio', true),
  A('imm-convivencia', 'Pátio escolar com estudantes conversando em círculo', W, ['#1e3a8a', '#7c3aed', '#fb7185'], 'conversa', true),
  A('imm-antirracismo', 'Mural colorido pintado por estudantes com rostos diversos', W, ['#4a044e', '#ea580c', '#22d3ee'], 'pessoas', true),
  A('imm-tecnologia', 'Laboratório maker escolar com robôs e impressora 3D', W, ['#0f172a', '#0891b2', '#c084fc'], 'robo', true),
  A('imm-trabalho', 'Profissionais de diferentes ofícios em uma rua de bairro', W, ['#422006', '#0f766e', '#f472b6'], 'cidade', true),
  A('imm-economia', 'Feira de bairro movimentada', W, ['#713f12', '#16a34a', '#f97316'], 'feira', true),
  A('imm-calendario', 'Calendário ilustrado com festas e datas escolares', W, ['#312e81', '#db2777', '#facc15'], 'calendario', true),

  // Histórias
  A('story-biblioteca-cover', 'Garota na biblioteca diante de portas que se abrem para mar, cidade e floresta', W, ['#2e1065', '#c2410c', '#22d3ee'], 'livro', true),
  A('story-biblioteca-carta', 'Carta lacrada entre livros antigos sob luz de abajur', W, ['#3b1d0f', '#a16207', '#7c3aed'], 'livro'),
  A('story-biblioteca-portas', 'Três portas abertas para paisagens diferentes', W, ['#1e1b4b', '#0ea5e9', '#22c55e'], 'ilhas'),
  A('story-biblioteca-final', 'Página em branco brilhando sobre uma mesa de leitura', W, ['#1e1b4b', '#f59e0b', '#a78bfa'], 'estrela'),
  A('story-rio-cover', 'Rio urbano com água de cor estranha e jovens observando da ponte', W, ['#0c4a6e', '#65a30d', '#f97316'], 'rio', true),
  A('story-rio-coleta', 'Estudantes coletando amostras de água com luvas', W, ['#134e4a', '#0d9488', '#facc15'], 'laboratorio'),
  A('story-rio-final', 'Margem do rio revitalizada com mutirão comunitário', W, ['#14532d', '#22c55e', '#38bdf8'], 'rio'),
  A('story-radio-cover', 'Estúdio de rádio escolar com microfones e cartazes', W, ['#3b0764', '#e11d48', '#22d3ee'], 'radio', true),
  A('story-radio-redacao', 'Mesa de redação com recortes de notícias e celular', W, ['#1f2937', '#7c3aed', '#f59e0b'], 'radio'),
  A('story-radio-final', 'Estudantes ao vivo na rádio da escola', W, ['#4c1d95', '#0d9488', '#fde047'], 'radio'),

  // Jogos
  A('game-quiz', 'Cartas de perguntas flutuando sobre uma mesa', CARD, ['#3b0764', '#7c3aed', '#22d3ee'], 'jogo'),
  A('game-memoria', 'Cartas viradas com ilustrações da natureza', CARD, ['#064e3b', '#0d9488', '#a3e635'], 'jogo'),
  A('game-sequencia', 'Linha do tempo com marcos ilustrados', CARD, ['#451a03', '#d97706', '#8b5cf6'], 'mapa'),
  A('game-classificacao', 'Caixas organizadoras com etiquetas coloridas', CARD, ['#1e3a8a', '#f43f5e', '#22d3ee'], 'jogo'),
  A('game-associacao', 'Fios de luz ligando pares de cartas', CARD, ['#312e81', '#06b6d4', '#f472b6'], 'estrela'),
  A('game-pistas', 'Lupa sobre mapa com cadeado antigo', CARD, ['#1c1917', '#b45309', '#14b8a6'], 'mapa'),

  // Simulações
  A('sim-feira', 'Feira de bairro brasileira com barracas de frutas', W, ['#713f12', '#16a34a', '#f97316'], 'feira', true),
  A('sim-lab', 'Cidade em miniatura numa redoma com turbinas eólicas e painéis solares', W, ['#0f172a', '#0d9488', '#a855f7'], 'cidade', true),
  A('sim-cidade', 'Praça de bairro com escola, posto de saúde, ônibus e parque', W, ['#1e3a8a', '#16a34a', '#f472b6'], 'cidade', true),

  // Formação
  A('train-debates', 'Turma em círculo com mãos levantadas', CARD, ['#1e3a8a', '#0d9488', '#facc15'], 'conversa'),
  A('train-conversas', 'Professora escutando estudante com atenção', CARD, ['#4c1d95', '#0d9488', '#fb923c'], 'conversa'),
  A('train-projetos', 'Mesa com cartazes, maquete e post-its', CARD, ['#134e4a', '#ca8a04', '#a855f7'], 'estrela'),
  A('train-jogos', 'Cartas e dados sobre a mesa da sala', CARD, ['#312e81', '#e11d48', '#22d3ee'], 'jogo'),
  A('train-inclusao', 'Estudantes com diferentes necessidades colaborando', CARD, ['#0c4a6e', '#16a34a', '#f472b6'], 'pessoas'),
  A('train-avaliacao', 'Bilhetes coloridos colados em um mural', CARD, ['#422006', '#0d9488', '#c084fc'], 'calendario'),
  A('train-ia', 'Tela com rede de pontos e lupa', CARD, ['#0f172a', '#6366f1', '#22d3ee'], 'robo'),
  A('train-integracao', 'Pontes entre ilhas com símbolos de matérias', CARD, ['#1e1b4b', '#0d9488', '#f59e0b'], 'ilhas'),

  // Projeto
  A('proj-cidade-sustentavel', 'Bairro sustentável com ponte, rio, ciclistas e painéis solares', W, ['#14532d', '#0ea5e9', '#facc15'], 'cidade', true),
];


// ───────── Fase 2 (imagens geradas no ChatGPT, recuperadas da conversa compartilhada) ─────────
const SCN = (id: string, alt: string, motif: Motif = 'livro'): AssetDef => A(id, alt, W, ['#1e1b4b', '#7c3aed', '#14b8a6'], motif);
ASSETS.push(
  SCN('story-biblioteca-testemunha', 'Caio, em cadeira de rodas, lembra de algo entre as estantes enquanto Lia escuta'),
  SCN('story-biblioteca-mapa', 'Planta da biblioteca desenhada a lápis na contracapa de um livro, sob uma lupa'),
  SCN('story-biblioteca-fichas', 'Lia procura uma ficha na gaveta de um fichário antigo'),
  SCN('story-biblioteca-ivone', 'Dona Ivone entrega uma chave antiga a Lia no balcão da biblioteca'),
  SCN('story-biblioteca-encontro', 'Senhora de cachecol azul olha o mar pela janela enquanto Lia se aproxima'),
  SCN('story-rio-margem', 'Estudantes coletam água esverdeada na margem do rio', 'rio'),
  SCN('story-rio-socorro', 'Dona Socorro conversa com os estudantes na horta à beira do rio', 'rio'),
  SCN('story-rio-post-fabrica', 'Estudantes e moradores olham uma foto do rio que se espalha pelo celular', 'rio'),
  SCN('story-rio-fabrica', 'Engenheira mostra os tanques de tratamento da fábrica aos estudantes', 'rio'),
  SCN('story-rio-cano', 'Estudantes encontram um cano despejando no barranco do rio', 'rio'),
  SCN('story-rio-moradores', 'Moradora com uma criança no colo conversa com Davi e Yara no portão', 'rio'),
  SCN('story-rio-analise', 'Professora explica um diagrama no quadro com potes de amostra na mesa', 'rio'),
  SCN('story-rio-reuniao', 'Reunião na quadra da escola com gráficos projetados', 'rio'),
  SCN('story-rio-relatorio', 'Estudantes entregam um relatório com gráficos em uma repartição pública', 'rio'),
  SCN('story-rio-conflito', 'Vizinhos discutem de braços cruzados com o rio ao fundo', 'rio'),
  SCN('story-radio-corredor', 'Estudantes e adultos cochicham e mostram celulares no corredor', 'radio'),
  SCN('story-radio-original', 'Bia lê um comunicado num tablet no corredor da escola', 'radio'),
  SCN('story-radio-direcao', 'Bia e Téo conversam com a vice-diretora em sua sala', 'radio'),
  SCN('story-radio-autor-print', 'Téo se aproxima com respeito de Nico, encolhido num banco do pátio', 'radio'),
  SCN('story-radio-correcao', 'Bia ao microfone assume o erro, com Téo na mesa de som', 'radio'),
  SCN('story-radio-boato', 'Estudantes preocupados olhando celulares no pátio', 'radio'),
  SCN('imm-afro-cap1', 'Griô conta histórias para jovens sentados em roda', 'tambor'),
  SCN('imm-afro-cap2', 'Comunidade quilombola com roça, cestaria e crianças', 'tambor'),
  SCN('imm-afro-cap3', 'Estudantes negros em formatura e biblioteca universitária', 'pessoas'),
  SCN('imm-afro-cap4', 'Jovens em centro cultural com música, tecnologia e arte', 'tambor'),
  SCN('imm-indigena-cap1', 'Jovens indígenas contemporâneos com celular e notebook', 'floresta'),
  SCN('imm-indigena-cap2', 'Escola indígena com professora e estudantes', 'floresta'),
  SCN('imm-indigena-cap3', 'Assembleia comunitária indígena', 'floresta'),
  SCN('imm-indigena-cap4', 'Comunicadores, artistas e cientistas indígenas trabalhando', 'floresta'),
  SCN('imm-agua-cap1', 'Torneira, caixa-d’água e córrego num bairro', 'rio'),
  SCN('imm-agua-cap2', 'Bacia hidrográfica vista do alto com rios que se juntam', 'rio'),
  SCN('imm-agua-cap3', 'Irrigação, fábrica e casas usando o mesmo rio', 'rio'),
  SCN('imm-agua-cap4', 'Mutirão de plantio na mata ciliar', 'rio'),
  SCN('imm-sabores-cap1', 'Pessoas de várias regiões conversando animadas', 'pessoas'),
  SCN('imm-sabores-cap2', 'Mesa farta com pratos de várias regiões do Brasil', 'feira'),
  SCN('imm-sabores-cap3', 'Quadrilha junina, boi e ciranda numa praça', 'pessoas'),
  SCN('imm-sabores-cap4', 'Estudantes e idosos montando um mapa afetivo do bairro', 'mapa'),
  ...[
    ['agua-1-evaporacao', 'Praia e foz do rio com setas de vapor subindo da água'],
    ['agua-2-vapor-sobe', 'O vapor sobe e esfria em direção às nuvens'],
    ['agua-3-condensacao', 'Menina observa o vapor virar gotículas e formar nuvens'],
    ['agua-4-precipitacao', 'Chuva caindo sobre a praia e o rio'],
    ['agua-5-infiltracao', 'Água da chuva entrando no solo, em corte'],
    ['agua-6-retorno', 'Setas mostram o rio levando a água de volta ao mar'],
  ].map(([id, alt]) => A(id, alt, 4 / 3, ['#0c4a6e', '#0d9488', '#facc15'], 'rio')),
  ...[
    ['mem-amazonia', 'Floresta amazônica com rio largo sob chuva fina'], ['mem-cerrado', 'Cerrado com árvores tortuosas, capim dourado e buritis'],
    ['mem-caatinga', 'Caatinga seca com mandacaru'], ['mem-mata-atlantica', 'Mata Atlântica na serra perto do mar, com bromélias'],
    ['mem-pantanal', 'Capivaras na planície alagada do Pantanal'], ['mem-pampa', 'Campos ondulados do Pampa'],
    ['mem-mico-leao-dourado', 'Mico-leão-dourado num galho da Mata Atlântica'], ['mem-tuiuiu', 'Tuiuiú no Pantanal'],
  ].map(([id, alt]) => ({ ...A(id, alt, 1, ['#064e3b', '#0d9488', '#a3e635'], 'floresta'), variants: 'sm' as const })),
);

export const ASSET_MAP: Record<string, AssetDef> = Object.fromEntries(ASSETS.map((a) => [a.id, a]));

/**
 * IDs cujos arquivos já existem em /public/assets (pacote de imagens recebido: todas as 64,
 * com versões -mobile e -sm). Para desativar uma imagem, troque por uma lista explícita de ids.
 */
export const AVAILABLE_ASSETS = new Set<string>(ASSETS.map((a) => a.id));
