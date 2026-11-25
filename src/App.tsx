import { lazy, Suspense } from 'react';
import { createHashRouter, Link, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AuthGate } from './components/AuthGate';
import Home from './pages/Home';
import { InicioOuFamilia, SoSala } from './pages/Familia';

const Library = lazy(() => import('./pages/Library'));
const SubjectPage = lazy(() => import('./pages/Library').then((m) => ({ default: m.SubjectPage })));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const Immersions = lazy(() => import('./pages/Immersions'));
const ImmersionPage = lazy(() => import('./pages/Immersions').then((m) => ({ default: m.ImmersionPage })));
const Stories = lazy(() => import('./pages/Stories'));
const StoryPlayer = lazy(() => import('./pages/Stories').then((m) => ({ default: m.StoryPlayer })));
const Diferencas = lazy(() => import('./pages/Diferencas'));
const Imprimiveis = lazy(() => import('./pages/Imprimiveis'));
const Games = lazy(() => import('./pages/Games'));
const GameRoom = lazy(() => import('./pages/GameRoom'));
const GamePrint = lazy(() => import('./pages/GamePrint'));
const Feira = lazy(() => import('./pages/Feira'));
const Lab = lazy(() => import('./pages/Lab'));
const City = lazy(() => import('./pages/City'));
const Training = lazy(() => import('./pages/Training'));
const TrainingPage = lazy(() => import('./pages/Training').then((m) => ({ default: m.TrainingPage })));
const Studio = lazy(() => import('./pages/Studio'));
const Lessons = lazy(() => import('./pages/Planner'));
const LessonView = lazy(() => import('./pages/Planner').then((m) => ({ default: m.LessonView })));
const LessonEditor = lazy(() => import('./pages/LessonEditor'));
const LessonApply = lazy(() => import('./pages/LessonApply'));
const LessonPrint = lazy(() => import('./pages/LessonPrint'));
const Classes = lazy(() => import('./pages/Classes'));
const ClassPage = lazy(() => import('./pages/ClassPage'));
const Calendar = lazy(() => import('./pages/Calendar'));
const ProjectPage = lazy(() => import('./pages/ProjectPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const Student = lazy(() => import('./pages/Student'));
const StudentPortfolio = lazy(() => import('./pages/Student').then((m) => ({ default: m.StudentPortfolio })));
const Coordination = lazy(() => import('./pages/Coordination'));
const Admin = lazy(() => import('./pages/Admin'));
const Provas = lazy(() => import('./pages/Provas'));
const Desafios = lazy(() => import('./pages/Desafios'));
const DesafioProfessorPage = lazy(() => import('./pages/DesafiosProfessor').then((m) => ({ default: m.DesafioProfessorPage })));
const DesafioPage = lazy(() => import('./pages/Desafios').then((m) => ({ default: m.DesafioPage })));
const ProvaEditor = lazy(() => import('./pages/Provas').then((m) => ({ default: m.ProvaEditor })));
const ProvaPrint = lazy(() => import('./pages/Provas').then((m) => ({ default: m.ProvaPrint })));
const FamiliaHome = lazy(() => import('./pages/Familia'));
const AreaPage = lazy(() => import('./pages/Familia').then((m) => ({ default: m.AreaPage })));

function NotFound() {
  return (
    <div className="empty">
      <h2>Página não encontrada</h2>
      <p>O endereço pode ter mudado.</p>
      <Link className="btn primary" to="/">Voltar ao início</Link>
    </div>
  );
}

const carregando = <div className="muted" style={{ padding: 30 }}>Carregando…</div>;
/** Telas do professor: só abrem para quem tem a Sala de Aula (as da família ficam livres). */
const wrap = (el: React.ReactNode) => <SoSala><Suspense fallback={carregando}>{el}</Suspense></SoSala>;
const livre = (el: React.ReactNode) => <Suspense fallback={carregando}>{el}</Suspense>;

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <InicioOuFamilia><Home /></InicioOuFamilia> },
      { path: 'familia', element: livre(<FamiliaHome />) },
      { path: 'familia/:id', element: livre(<AreaPage />) },
      { path: 'materias', element: wrap(<Library />) },
      { path: 'materias/:id', element: wrap(<SubjectPage />) },
      { path: 'busca', element: wrap(<SearchPage />) },
      { path: 'imersoes', element: wrap(<Immersions />) },
      { path: 'imersoes/:id', element: wrap(<ImmersionPage />) },
      { path: 'historias', element: wrap(<Stories />) },
      { path: 'historias/:id', element: wrap(<StoryPlayer />) },
      { path: 'imprimiveis', element: wrap(<Imprimiveis />) },
      { path: 'sete-erros/:id', element: wrap(<Diferencas />) },
      { path: 'jogos', element: wrap(<Games />) },
      { path: 'jogos/:id', element: wrap(<GameRoom />) },
      { path: 'jogos/:id/imprimir', element: wrap(<GamePrint />) },
      { path: 'simulacoes/feira', element: wrap(<Feira />) },
      { path: 'laboratorio', element: wrap(<Lab />) },
      { path: 'cidade', element: wrap(<City />) },
      { path: 'formacao', element: wrap(<Training />) },
      { path: 'formacao/desafios/:id', element: wrap(<DesafioProfessorPage />) },
      { path: 'formacao/:id', element: wrap(<TrainingPage />) },
      { path: 'estudio', element: wrap(<Studio />) },
      { path: 'aulas', element: wrap(<Lessons />) },
      { path: 'aulas/nova', element: wrap(<LessonEditor />) },
      { path: 'aulas/:id', element: wrap(<LessonView />) },
      { path: 'aulas/:id/editar', element: wrap(<LessonEditor />) },
      { path: 'aulas/:id/aplicar', element: wrap(<LessonApply />) },
      { path: 'aulas/:id/imprimir', element: wrap(<LessonPrint />) },
      { path: 'desafios', element: wrap(<Desafios />) },
      { path: 'desafios/:id', element: wrap(<DesafioPage />) },
      { path: 'provas', element: wrap(<Provas />) },
      { path: 'provas/nova', element: wrap(<ProvaEditor />) },
      { path: 'provas/:id/editar', element: wrap(<ProvaEditor />) },
      { path: 'provas/:id/imprimir', element: wrap(<ProvaPrint />) },
      { path: 'turmas', element: wrap(<Classes />) },
      { path: 'turmas/:id', element: wrap(<ClassPage />) },
      { path: 'calendario', element: wrap(<Calendar />) },
      { path: 'projetos/:id', element: wrap(<ProjectPage />) },
      { path: 'ajustes', element: livre(<SettingsPage />) },
      { path: 'aluno', element: wrap(<Student />) },
      { path: 'aluno/portfolio', element: wrap(<StudentPortfolio />) },
      { path: 'coordenacao', element: wrap(<Coordination />) },
      { path: 'admin', element: livre(<Admin />) },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return (
    <AuthGate>
      <RouterProvider router={router} />
    </AuthGate>
  );
}
