# Arquitetura do AulaViva

## Princípios
1. **Conteúdo ≠ regras ≠ interface.** `src/content` é dado puro tipado; `src/engine` contém funções puras e testáveis (sem React); `src/pages` só compõe.
2. **Motores reutilizáveis.** Um novo jogo é só um objeto `GameActivity` com `content` de um dos formatos; uma nova história é um grafo `Story` (cenas, escolhas com `effects`/`requires`, parágrafos condicionais com `when`). `validateStory` e os testes de conteúdo garantem integridade.
3. **Números reais.** Indicadores derivam de cálculos (feira em centavos inteiros; laboratório determinístico) ou de registros feitos pela turma. Dados demonstrativos levam o selo “Demonstrativo”.
4. **Sem rótulos de alunos.** Não há pontuação individual; jogos resumem a turma/equipes; autoavaliação é mostrada como distribuição.

## Modelos (src/types/models.ts)
Organization, User, Role · Turma, Student, Group · Subject, Etapa, BnccRef · Lesson, LessonBlock, ResourceRef · Story, Scene, Choice, Character, StoryStat · GameActivity (+6 formatos), PresentialGame, GameSession, Team · Production, ExitTicket, Observation, Rubric, SelfAssessment · Immersion · MicroImmersion, TrainingNode · Project · VideoProject, VideoScene, StoredFile · AgendaItem, ThemeDate.

## Permissões (src/store/permissions.ts)
| Permissão | Professor | Aluno | Coordenação |
|---|:-:|:-:|:-:|
| criar/compartilhar aula | ✔ | | ✔ |
| aplicar aula, gerir turma, observar | ✔ | | |
| ver relatórios | ✔ | | ✔ (agregado) |
| curar bibliotecas, acompanhar projetos | ✔ (projetos) | | ✔ |
| participar e enviar produções | ✔ | ✔ | |
| editar/aprovar vídeo | ✔ | | |

Hoje a matriz controla só a interface. **Em produção, as mesmas regras devem ser aplicadas no servidor.**

## Caminho para produção
- **Backend** (ex.: Postgres + API) com `orgId` em todas as tabelas de turma/aluno e políticas de linha (RLS) por organização; professor só acessa turmas vinculadas.
- **Autenticação** (SSO da rede/Google Workspace for Education), sessões HTTP-only; nenhuma credencial no frontend.
- **Sessões de jogo multi-dispositivo:** `GameSession.transport` passa de `'local'` para `'realtime'` (WebSocket); código de sala curto, expira, vinculado à turma; alunos entram com apelido, sem dados pessoais.
- **Arquivos** em storage com URLs assinadas; vídeos só publicados com `status: 'aprovado'`.
- **Integração Higgsfield** via servidor (chave de API guardada no backend, fila de geração, retorno sempre para revisão).
- **LGPD:** coleta mínima (nome de exibição), finalidade pedagógica, exportação e exclusão por turma, retenção definida pela escola.
- **Migração de dados:** o estado local tem `version: 1`; o backup JSON serve de importação inicial.
