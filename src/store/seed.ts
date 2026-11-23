import type { AppState } from './store';
import type { Student, Turma } from '../types/models';

const NAMES_A = ['Ana Clara', 'Bruno', 'Caio', 'Daniela', 'Enzo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Júlia', 'Kauã', 'Larissa', 'Mateus', 'Nicole', 'Otávio', 'Pietra', 'Rafael', 'Sofia', 'Thiago', 'Valentina', 'Wesley', 'Yasmin', 'Lucas', 'Maria Eduarda'];
const NAMES_B = ['Alice', 'Arthur', 'Beatriz', 'Davi', 'Emanuelly', 'Felipe', 'Giovanna', 'Heitor', 'Isabela', 'João Pedro', 'Lívia', 'Miguel', 'Manuela', 'Pedro', 'Rebeca', 'Samuel', 'Vitória', 'Luan', 'Ayla', 'Benício'];

const students = (names: string[], prefix: string): Student[] => names.map((n, i) => ({ id: `${prefix}-s${i + 1}`, displayName: n }));

function groups(st: Student[], names: string[]) {
  return names.map((name, gi) => ({ id: `g-${gi + 1}`, name, studentIds: st.filter((_, i) => i % names.length === gi).map((s) => s.id) }));
}

function day(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().slice(0, 10);
}

export function seedState(): AppState {
  const sA = students(NAMES_A, '7a');
  const sB = students(NAMES_B, '6b');
  const turmas: Turma[] = [
    { id: 't-7a', orgId: 'org-demo', name: '7º ano A', etapa: 'fundamental2', ano: 7, turno: 'manha', students: sA, groups: groups(sA, ['Equipe Arvoredo', 'Equipe Rio Vivo', 'Equipe Horizonte', 'Equipe Aurora']), resources: ['projetor', 'computador-unico', 'impressora'], demo: true },
    { id: 't-6b', orgId: 'org-demo', name: '6º ano B', etapa: 'fundamental2', ano: 6, turno: 'tarde', students: sB, groups: groups(sB, ['Equipe Cometa', 'Equipe Floresta', 'Equipe Maré', 'Equipe Sol']), resources: ['sem-internet', 'sem-dispositivos'], demo: true },
  ];
  return {
    version: 1,
    org: { id: 'org-demo', name: 'Escola Demonstrativa', kind: 'escola' },
    user: { id: 'u-ana', orgId: 'org-demo', role: 'professor', displayName: 'Ana', turmaIds: turmas.map((t) => t.id) },
    settings: { reduceMotion: false, simpleMode: false, fontScale: 1, highContrast: false, captions: true, readingLevel: 'padrao', projector: false, inkSaver: true },
    activeTurmaId: 't-7a',
    turmas,
    myLessons: [],
    favorites: ['story:biblioteca-finais', 'sim:feira'],
    agenda: [
      { id: 'ag-1', turmaId: 't-7a', title: 'Memórias afro-brasileiras', date: day(0), time: '08:00' },
      { id: 'ag-2', turmaId: 't-6b', title: 'Revisão — frações e porcentagens', date: day(0), time: '10:00' },
      { id: 'ag-3', turmaId: 't-7a', title: 'A feira das decisões', date: day(1), time: '08:00' },
      { id: 'ag-4', turmaId: 't-7a', title: 'Como abastecer uma cidade?', date: day(3), time: '09:50' },
    ],
    productions: [],
    exitTickets: [],
    observations: [],
    rubrics: [
      {
        id: 'rb-colab', title: 'Colaboração em equipe',
        criteria: [
          { id: 'c1', label: 'Escuta e respeita turnos de fala', levels: ['Ainda não', 'Às vezes, com lembretes', 'Na maior parte do tempo', 'Sempre, e incentiva colegas'] },
          { id: 'c2', label: 'Explica o próprio raciocínio', levels: ['Ainda não', 'Com apoio', 'Com clareza', 'Com clareza e exemplos'] },
          { id: 'c3', label: 'Usa evidências para argumentar', levels: ['Ainda não', 'Cita uma evidência', 'Relaciona evidências', 'Compara e avalia evidências'] },
        ],
      },
    ],
    selfAssessments: [],
    gameSessions: [],
    storyRuns: {},
    labRuns: [],
    feiraRuns: [],
    cityRecords: [],
    training: {},
    trainingNotes: {},
    immersions: {},
    videoProjects: [],
    released: [],
    recent: [],
    doubts: [],
    applyProgress: {},
    chamadas: [],
    avaliacoes: [],
    itensTurma: [
      { id: 'it-demo-1', turmaId: 't-7a', tipo: 'desafio', title: 'Desafio da turma: nosso filme', description: 'A turma escolhe um tema, escreve o roteiro em grupos e grava um curta de até 3 minutos.', date: day(14), status: 'planejado', createdAt: day(0), updatedAt: day(0) },
      { id: 'it-demo-2', turmaId: 't-7a', tipo: 'prova', title: 'Avaliação — frações e porcentagens', description: 'Prova individual de frações e porcentagens, com questões de cálculo e situações do dia a dia.', date: day(7), status: 'planejado', createdAt: day(0), updatedAt: day(0) },
    ],
    diarioConfig: { mediaMinima: 6, freqMinima: 75 },
    provas: [],
    desafiosProfessor: {},
  };
}
