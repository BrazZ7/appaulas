/**
 * Modelos de domínio do AulaViva.
 * Separação: tipos (aqui) · conteúdo (src/content) · regras/motores (src/engine) · interface (src/pages, src/components).
 */

export type ID = string;

// ───────────────────────── Organização, usuários, permissões ─────────────────────────

export type Role = 'professor' | 'aluno' | 'coordenacao';

export interface Organization {
  id: ID;
  name: string;
  /** Todo dado de turma/aluno pertence a exatamente uma organização (isolamento entre escolas). */
  kind: 'escola' | 'rede' | 'conta-individual';
}

export interface User {
  id: ID;
  orgId: ID;
  role: Role;
  displayName: string;
  /** Turmas às quais o usuário tem acesso. */
  turmaIds: ID[];
}

// ───────────────────────── Currículo ─────────────────────────

export type Etapa = 'infantil' | 'fundamental1' | 'fundamental2' | 'medio' | 'eja';

export type SubjectId =
  | 'portugues' | 'matematica' | 'ciencias' | 'historia' | 'geografia' | 'artes'
  | 'educacao-fisica' | 'ingles' | 'outras-linguas' | 'tecnologia' | 'educacao-financeira'
  | 'economia' | 'politica-cidadania'
  | 'fisica' | 'quimica' | 'biologia' | 'filosofia' | 'sociologia';

export type LearningMode =
  | 'historia' | 'jogar' | 'experimentar' | 'investigar' | 'projeto' | 'conversar' | 'fora-da-tela';

export type Difficulty = 'introdutorio' | 'intermediario' | 'desafiador';

export type Resource =
  | 'projetor' | 'computador-unico' | 'dispositivos-grupo' | 'dispositivos-individuais'
  | 'sem-internet' | 'sem-dispositivos' | 'impressora';

export type ApplicationMode = 'projetor' | 'grupos' | 'individual';

export interface Subject {
  id: SubjectId;
  name: string;
  area: 'Linguagens' | 'Matemática' | 'Ciências da Natureza' | 'Ciências Humanas' | 'Transversal';
  description: string;
  /** cor de destaque (hex) */
  color: string;
  modes: LearningMode[];
  /** 'em-preparo' = espaço reservado para conteúdo futuro (ex.: Física no Ensino Médio). */
  status: 'disponivel' | 'em-preparo';
  etapas: Etapa[];
  artId: string;
}

/**
 * Referência à BNCC. Só preencher `code` quando o código tiver sido conferido no documento oficial
 * (basenacionalcomum.mec.gov.br). `verified=false` sinaliza que precisa de conferência pela coordenação.
 */
export interface BnccRef {
  code: string;
  verified: boolean;
  note?: string;
}

// ───────────────────────── Aulas e blocos ─────────────────────────

export type BlockKind =
  | 'acolhida' | 'pergunta' | 'historia' | 'video' | 'experimento' | 'jogo' | 'atividade' | 'conversa' | 'avaliacao';

export interface ResourceRef {
  type: 'story' | 'game' | 'simulation' | 'immersion' | 'video' | 'project';
  id: ID;
}

export interface LessonBlock {
  id: ID;
  kind: BlockKind;
  title: string;
  minutes: number;
  /** O que fazer, em linguagem direta para o professor. */
  instructions: string;
  teacherNotes?: string;
  resourceRef?: ResourceRef;
  /** Como fazer sem internet / sem dispositivos dos alunos. */
  offlineAlternative?: string;
}

export interface Lesson {
  id: ID;
  title: string;
  summary: string;
  subjects: SubjectId[];
  etapa: Etapa;
  anos: number[];
  durationMin: number;
  difficulty: Difficulty;
  /** Público: para quem a aula foi pensada. */
  audience: string;
  objectives: string[];
  materials: string[];
  resources: Resource[];
  blocks: LessonBlock[];
  /** Atividade principal (imprimível). */
  activity: {
    title: string;
    instructions: string[];
    /** Gabarito — impresso em folha separada. */
    answerKey?: string[];
  };
  /** Como observar a aprendizagem (avaliação formativa). */
  observeLearning: string[];
  adaptations: string[];
  /** Habilidades descritas em palavras (sem códigos inventados). */
  skills: string[];
  bncc?: BnccRef[];
  modes: LearningMode[];
  artId: string;
  tags: string[];
  origin: 'biblioteca' | 'pessoal' | 'compartilhada';
  ownerId?: ID;
  sharing?: 'privado' | 'escola';
  createdAt: string;
  updatedAt: string;
}

// ───────────────────────── Narrativas ─────────────────────────

export interface StoryStat {
  id: string;
  label: string;
  initial: number;
  /** ícone lucide sugerido */
  icon?: string;
}

export type Condition =
  | { stat: string; gte?: number; lte?: number }
  | { visited: ID }
  | { notVisited: ID };

export interface SceneParagraph {
  text: string;
  /** Parágrafo só aparece se a condição for satisfeita — torna as consequências perceptíveis. */
  when?: Condition;
}

export interface Choice {
  id: ID;
  label: string;
  to: ID;
  /** Frase curta exibida após a escolha ("Você decidiu…"). */
  consequence: string;
  effects?: { stat: string; delta: number }[];
  requires?: Condition;
}

export interface Scene {
  id: ID;
  title: string;
  artId?: string;
  speakerId?: ID;
  paragraphs: SceneParagraph[];
  /** Pergunta para pausar e conversar com a turma. */
  pauseQuestion?: string;
  /** Hipótese que a turma pode registrar nesta cena. */
  hypothesisPrompt?: string;
  choices: Choice[];
  ending?: { title: string; reflection: string; tone: 'luminoso' | 'agridoce' | 'aberto' };
}

export interface Character {
  id: ID;
  name: string;
  description: string;
  color: string;
}

export interface Story {
  id: ID;
  title: string;
  subtitle: string;
  summary: string;
  subjects: SubjectId[];
  anos: number[];
  durationMin: number;
  artId: string;
  characters: Character[];
  stats: StoryStat[];
  startSceneId: ID;
  scenes: Record<ID, Scene>;
  teacherGuide: string[];
  followUps: { escrita: string; teatro: string; desenho: string };
}

// ───────────────────────── Jogos ─────────────────────────

export type GameFormat = 'quiz' | 'memoria' | 'sequencia' | 'classificacao' | 'associacao' | 'pistas';

export interface QuizContent {
  kind: 'quiz';
  questions: { id: ID; prompt: string; options: string[]; correct: number; explanation: string }[];
}
export interface MemoryContent {
  kind: 'memoria';
  pairs: { id: ID; a: string; b: string; explanation: string }[];
}
export interface SequenceContent {
  kind: 'sequencia';
  prompt: string;
  /** Itens na ORDEM CORRETA; o motor embaralha. */
  items: { id: ID; label: string; detail: string }[];
  explanation: string;
}
export interface ClassifyContent {
  kind: 'classificacao';
  prompt: string;
  categories: { id: ID; label: string; description?: string }[];
  items: { id: ID; label: string; category: ID; explanation: string }[];
}
export interface MatchContent {
  kind: 'associacao';
  prompt: string;
  pairs: { id: ID; left: string; right: string; explanation: string }[];
}
export interface CluesContent {
  kind: 'pistas';
  intro: string;
  steps: {
    id: ID;
    clue: string;
    question: string;
    /** Respostas aceitas (comparação sem acento/maiúsculas). */
    answers: string[];
    hint: string;
    explanation: string;
  }[];
  finale: string;
}

export type GameContent = QuizContent | MemoryContent | SequenceContent | ClassifyContent | MatchContent | CluesContent;

export interface GameActivity {
  id: ID;
  title: string;
  format: GameFormat;
  subjects: SubjectId[];
  anos: number[];
  durationMin: number;
  difficulty: Difficulty;
  description: string;
  /** Instruções lidas para a turma. */
  instructions: string[];
  artId: string;
  content: GameContent;
}

export interface PresentialGame {
  id: ID;
  title: string;
  kind: 'bingo' | 'investigacao' | 'criacao-coletiva' | 'caca-pistas' | 'escape' | 'movimento' | 'quiz-cooperativo';
  subjects: SubjectId[];
  anos: number[];
  durationMin: number;
  groupSize: string;
  materials: string[];
  steps: string[];
  variations: string[];
  learningFocus: string;
}

// ───────────────────────── Sessões, respostas, produções, avaliação ─────────────────────────

export interface Team { id: ID; name: string; color: string; memberIds: ID[] }

export interface GameSession {
  id: ID;
  activityId: ID;
  turmaId?: ID;
  mode: ApplicationMode;
  cooperative: boolean;
  teams: Team[];
  startedAt: string;
  finishedAt?: string;
  /** Registro de cada rodada (resposta da turma/equipe). */
  rounds: { itemId: ID; teamId?: ID; correct: boolean; attempts: number }[];
  /** Somente local: este app não possui servidor multiplayer. */
  transport: 'local';
}

export interface Production {
  id: ID;
  turmaId?: ID;
  groupId?: ID;
  authorLabel: string;
  kind: 'texto' | 'desenho' | 'teatro' | 'hipotese' | 'final-alternativo' | 'registro' | 'acordo' | 'video' | 'outro';
  title: string;
  content: string;
  sourceRef?: ResourceRef;
  createdAt: string;
  demo?: boolean;
}

export interface ExitTicket {
  id: ID;
  turmaId: ID;
  lessonId?: ID;
  prompt: string;
  responses: { id: ID; authorLabel: string; learned: string; doubt: string; idea: string; createdAt: string }[];
  createdAt: string;
  demo?: boolean;
}

export interface Observation {
  id: ID;
  turmaId: ID;
  studentId?: ID;
  groupId?: ID;
  text: string;
  tag: 'avanco' | 'duvida' | 'colaboracao' | 'apoio' | 'outro';
  createdAt: string;
  demo?: boolean;
}

export interface Rubric {
  id: ID;
  title: string;
  criteria: { id: ID; label: string; levels: string[] }[];
}

export interface SelfAssessment {
  id: ID;
  turmaId: ID;
  authorLabel: string;
  answers: Record<string, number>;
  comment: string;
  createdAt: string;
}

export interface Student {
  id: ID;
  /** Apenas nome de exibição/apelido. Dados sensíveis não são coletados. */
  displayName: string;
}

export interface Group { id: ID; name: string; studentIds: ID[] }

export interface Turma {
  id: ID;
  orgId: ID;
  name: string;
  etapa: Etapa;
  ano: number;
  turno: 'manha' | 'tarde' | 'noite' | 'integral';
  students: Student[];
  groups: Group[];
  /** Recursos que a turma tem — usados para sugerir alternativas. */
  resources: Resource[];
  demo?: boolean;
}

export interface AgendaItem {
  id: ID;
  turmaId: ID;
  lessonId?: ID;
  title: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // HH:mm
}

export interface StoredFile {
  id: ID;
  name: string;
  mime: string;
  size: number;
  /** Arquivo binário fica no IndexedDB (chave = id). */
  createdAt: string;
}

// ───────────────────────── Imersões ─────────────────────────

export interface Immersion {
  id: ID;
  title: string;
  /** Tema da biblioteca (ex.: "Cultura afro-brasileira"). */
  theme: string;
  kicker: string;
  /** Pergunta provocadora de abertura. */
  openingQuestion: string;
  summary: string;
  subjects: SubjectId[];
  anos: number[];
  durationMin: number;
  artId: string;
  status: 'disponivel' | 'em-preparo';
  /** Contexto histórico/social. */
  context: string[];
  /** Diversidade interna da cultura/tema — evitar visões únicas. */
  diversity: string[];
  /** Protagonismo contemporâneo. */
  contemporary: string[];
  chapters: {
    id: ID;
    title: string;
    paragraphs: string[];
    explore: string[];
    /** Escolha da turma, com o que muda. */
    classChoice?: { prompt: string; options: { label: string; outcome: string }[] };
  }[];
  challenges: { individual: string[]; coletivo: string[] };
  teacherScript: { antes: string[]; durante: string[]; depois: string[] };
  practicalActivity: { title: string; materials: string[]; steps: string[] };
  finalConversation: string[];
  printable: { title: string; items: string[] };
  references: { label: string; note?: string; url?: string }[];
  pedagogicalNotes: string[];
}

// ───────────────────────── Formação do professor ─────────────────────────

export interface TrainingNode {
  id: ID;
  /** Situação simulada de sala. */
  situation: string;
  speaker?: string;
  options: { label: string; to: ID; feedback: string; quality: 'construtiva' | 'parcial' | 'arriscada' }[];
  end?: { title: string; reflection: string };
}

export interface MicroImmersion {
  id: ID;
  title: string;
  topic: string;
  durationMin: number;
  summary: string;
  artId: string;
  status: 'disponivel' | 'em-preparo';
  intro: string[];
  startNodeId: ID;
  nodes: Record<ID, TrainingNode>;
  /** Roteiro aplicável em sala. */
  script: { title: string; steps: string[] }[];
  reflectionQuestions: string[];
}

// ───────────────────────── Projetos interdisciplinares ─────────────────────────

export interface Project {
  id: ID;
  title: string;
  drivingQuestion: string;
  summary: string;
  subjects: SubjectId[];
  anos: number[];
  totalLessons: number;
  artId: string;
  stages: {
    id: ID;
    title: string;
    lessons: number;
    description: string;
    contributions: { subject: SubjectId; contribution: string }[];
    activities: string[];
    products: string[];
    resourceRefs?: ResourceRef[];
  }[];
  finalProduct: string;
  assessment: string[];
  rubric: Rubric;
  skills: string[];
}

// ───────────────────────── Estúdio de vídeo ─────────────────────────

export type VideoStep = 'tema' | 'objetivo' | 'roteiro' | 'cenas' | 'visuais' | 'narracao' | 'revisao' | 'video';

export interface VideoScene {
  id: ID;
  title: string;
  script: string;
  visuals: string;
  narration: string;
  captions: string;
  durationSec: number;
}

export interface VideoProject {
  id: ID;
  title: string;
  theme: string;
  objective: string;
  audience: string;
  scenes: VideoScene[];
  fileIds: ID[];
  /** Arquivo de vídeo principal (importado). */
  mainVideoId?: ID;
  /** Legendas WebVTT geradas a partir das cenas ou importadas. */
  captionsVtt?: string;
  questionsBefore: string[];
  questionsAfter: string[];
  lessonId?: ID;
  status: 'rascunho' | 'em-revisao' | 'aprovado';
  source: 'producao-propria' | 'higgsfield-importado' | 'outro';
  reviewNotes: string;
  updatedAt: string;
}

// ───────────────────────── Calendário temático ─────────────────────────

export interface ThemeDate {
  id: ID;
  /** mm-dd */
  date: string;
  title: string;
  description: string;
  suggestions: { label: string; ref?: ResourceRef }[];
}
