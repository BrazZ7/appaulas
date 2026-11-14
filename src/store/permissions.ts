import type { Role } from '../types/models';

/**
 * Matriz de permissões por perfil. No modo demonstrativo ela controla apenas a INTERFACE.
 * Em produção, as mesmas regras precisam ser aplicadas no servidor (ver docs/ARQUITETURA.md).
 */
export type Permission =
  | 'lesson.create' | 'lesson.share' | 'lesson.apply'
  | 'class.manage' | 'class.viewReports' | 'student.observe'
  | 'library.curate' | 'project.follow'
  | 'activity.participate' | 'production.submit'
  | 'video.edit' | 'video.approve' | 'training.access';

const MATRIX: Record<Role, Permission[]> = {
  professor: [
    'lesson.create', 'lesson.share', 'lesson.apply', 'class.manage', 'class.viewReports', 'student.observe',
    'video.edit', 'video.approve', 'training.access', 'project.follow', 'activity.participate', 'production.submit',
  ],
  coordenacao: ['library.curate', 'project.follow', 'class.viewReports', 'lesson.share', 'training.access', 'lesson.create'],
  aluno: ['activity.participate', 'production.submit'],
};

export const can = (role: Role, p: Permission) => MATRIX[role].includes(p);

export const ROLE_LABEL: Record<Role, string> = { professor: 'Professor(a)', aluno: 'Aluno(a)', coordenacao: 'Coordenação' };
