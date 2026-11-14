import type { Subject, LearningMode, Etapa } from '../types/models';

const F2: Etapa[] = ['fundamental1', 'fundamental2'];
const ALL: LearningMode[] = ['historia', 'jogar', 'experimentar', 'investigar', 'projeto', 'conversar', 'fora-da-tela'];

export const SUBJECTS: Subject[] = [
  { id: 'portugues', name: 'Português', area: 'Linguagens', color: '#f59e0b', status: 'disponivel', etapas: F2, artId: 'subj-portugues', modes: ALL,
    description: 'Leitura, escrita, oralidade e análise linguística a partir de histórias que a turma ajuda a construir.' },
  { id: 'matematica', name: 'Matemática', area: 'Matemática', color: '#22d3ee', status: 'disponivel', etapas: F2, artId: 'subj-matematica', modes: ALL,
    description: 'Números, proporções e decisões do cotidiano — da feira ao orçamento de um projeto.' },
  { id: 'ciencias', name: 'Ciências', area: 'Ciências da Natureza', color: '#4ade80', status: 'disponivel', etapas: F2, artId: 'subj-ciencias', modes: ALL,
    description: 'Hipóteses, variáveis e evidências em experimentos virtuais e práticos.' },
  { id: 'historia', name: 'História', area: 'Ciências Humanas', color: '#fb923c', status: 'disponivel', etapas: F2, artId: 'subj-historia', modes: ALL,
    description: 'Memória, fontes e protagonismo de diferentes povos na construção do Brasil.' },
  { id: 'geografia', name: 'Geografia', area: 'Ciências Humanas', color: '#38bdf8', status: 'disponivel', etapas: F2, artId: 'subj-geografia', modes: ALL,
    description: 'Território, paisagem, água e cidade — do bairro ao planeta.' },
  { id: 'artes', name: 'Artes', area: 'Linguagens', color: '#f472b6', status: 'disponivel', etapas: F2, artId: 'subj-artes', modes: ['historia', 'experimentar', 'projeto', 'conversar', 'fora-da-tela'],
    description: 'Criação, leitura de imagens, música e teatro conectados às outras áreas.' },
  { id: 'educacao-fisica', name: 'Educação Física', area: 'Linguagens', color: '#f97316', status: 'disponivel', etapas: F2, artId: 'subj-educacao-fisica', modes: ['jogar', 'experimentar', 'conversar', 'fora-da-tela'],
    description: 'Brincadeiras, jogos cooperativos e cultura corporal com todos participando.' },
  { id: 'ingles', name: 'Inglês', area: 'Linguagens', color: '#818cf8', status: 'disponivel', etapas: ['fundamental2'], artId: 'subj-ingles', modes: ['historia', 'jogar', 'conversar', 'projeto', 'fora-da-tela'],
    description: 'Comunicação real em inglês com temas próximos da vida dos estudantes.' },
  { id: 'outras-linguas', name: 'Outras línguas', area: 'Linguagens', color: '#2dd4bf', status: 'em-preparo', etapas: ['fundamental2', 'medio'], artId: 'subj-outras-linguas', modes: ['conversar', 'jogar'],
    description: 'Espanhol, Libras e línguas indígenas — espaço reservado para próximos conteúdos.' },
  { id: 'tecnologia', name: 'Tecnologia', area: 'Transversal', color: '#a78bfa', status: 'disponivel', etapas: F2, artId: 'subj-tecnologia', modes: ['experimentar', 'investigar', 'projeto', 'jogar'],
    description: 'Pensamento computacional, programação visual, robótica e inteligência artificial.' },
  { id: 'educacao-financeira', name: 'Educação Financeira', area: 'Transversal', color: '#facc15', status: 'disponivel', etapas: F2, artId: 'subj-educacao-financeira', modes: ['experimentar', 'jogar', 'conversar', 'projeto'],
    description: 'Orçamento, prioridades e consumo consciente com valores fictícios e situações reais.' },
  { id: 'economia', name: 'Economia', area: 'Transversal', color: '#eab308', status: 'disponivel', etapas: ['fundamental2', 'medio'], artId: 'subj-economia', modes: ['experimentar', 'investigar', 'conversar'],
    description: 'Trabalho, trocas, preços e escolhas coletivas no dia a dia.' },
  { id: 'politica-cidadania', name: 'Política e Cidadania', area: 'Transversal', color: '#60a5fa', status: 'disponivel', etapas: F2, artId: 'subj-politica-cidadania', modes: ['historia', 'investigar', 'conversar', 'projeto'],
    description: 'Instituições, direitos, deveres e participação — sempre com fontes e sem propaganda partidária.' },
  // Espaço preparado para o Ensino Médio
  { id: 'fisica', name: 'Física', area: 'Ciências da Natureza', color: '#6366f1', status: 'em-preparo', etapas: ['medio'], artId: 'subj-fisica', modes: ['experimentar', 'investigar'], description: 'Em preparo para o Ensino Médio.' },
  { id: 'quimica', name: 'Química', area: 'Ciências da Natureza', color: '#c084fc', status: 'em-preparo', etapas: ['medio'], artId: 'subj-quimica', modes: ['experimentar', 'investigar'], description: 'Em preparo para o Ensino Médio.' },
  { id: 'biologia', name: 'Biologia', area: 'Ciências da Natureza', color: '#34d399', status: 'em-preparo', etapas: ['medio'], artId: 'subj-biologia', modes: ['experimentar', 'investigar'], description: 'Em preparo para o Ensino Médio.' },
  { id: 'filosofia', name: 'Filosofia', area: 'Ciências Humanas', color: '#e879f9', status: 'em-preparo', etapas: ['medio'], artId: 'subj-filosofia', modes: ['conversar', 'historia'], description: 'Em preparo para o Ensino Médio.' },
  { id: 'sociologia', name: 'Sociologia', area: 'Ciências Humanas', color: '#f472b6', status: 'em-preparo', etapas: ['medio'], artId: 'subj-sociologia', modes: ['conversar', 'investigar'], description: 'Em preparo para o Ensino Médio.' },
];

export const SUBJECT_MAP = Object.fromEntries(SUBJECTS.map((s) => [s.id, s])) as Record<Subject['id'], Subject>;

export const MODE_LABEL: Record<LearningMode, string> = {
  historia: 'Explorar uma história',
  jogar: 'Jogar',
  experimentar: 'Experimentar',
  investigar: 'Investigar',
  projeto: 'Criar um projeto',
  conversar: 'Conversar e argumentar',
  'fora-da-tela': 'Fora da tela',
};

export const ETAPA_LABEL: Record<Etapa, string> = {
  infantil: 'Educação Infantil',
  fundamental1: 'Fundamental — Anos iniciais',
  fundamental2: 'Fundamental — Anos finais',
  medio: 'Ensino Médio',
  eja: 'EJA',
};
