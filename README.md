# Ensinaê

_Cada aula, uma nova descoberta._

Plataforma para professores brasileiros prepararem e conduzirem aulas imersivas: histórias com escolhas, jogos cooperativos, simulações, imersões culturais, formação docente, estúdio de vídeo, planejador por blocos e acompanhamento formativo das turmas.

> **Modo demonstrativo.** Esta versão roda inteiramente no navegador, sem servidor. Os dados ficam no `localStorage` (e vídeos no IndexedDB) **deste navegador**. Não há login, sincronização nem multiplayer — veja “Limitações”.

## Como executar

Requer Node.js 20 ou superior.

```bash
npm install
npm run dev        # desenvolvimento: http://localhost:5173
npm test           # testes dos motores e da integridade do conteúdo (Vitest)
npm run typecheck  # verificação de tipos
npm run build      # gera dist/ (site estático; base relativa, abre em qualquer pasta/servidor)
npm run preview    # serve o build em http://localhost:4173
```

O build é estático (HashRouter): pode ser publicado em qualquer hospedagem de arquivos ou copiado para um computador da escola.

## Mapa das telas

| Rota | Tela |
|---|---|
| `/` | Início — “Sua próxima aula começa aqui”, continuidade, agenda, sugestões do calendário, projeto, atalhos, favoritos, ajustes inclusivos |
| `/materias`, `/materias/:id` | Biblioteca de matérias (13 áreas + 5 em preparo para o Ensino Médio), filtros por etapa, ano, duração, dificuldade, recursos e forma de aprender |
| `/busca?q=` | Busca com filtros |
| `/imersoes`, `/imersoes/:id` | Imersões culturais: pergunta de abertura, capítulos, escolhas da turma, roteiro antes/durante/depois, atividade prática, conversa final, imprimível, referências |
| `/historias`, `/historias/:id` | Motor de narrativas: cenas, personagens, estados, escolhas com consequências, hipóteses, finais alternativos, teatro/desenho, portfólio |
| `/jogos`, `/jogos/:id` | Sala de jogos: equipes, instruções, rodadas, pausa, temporizador, feedback explicativo, modo cooperativo, sem ranking, projetor, resumo; brincadeiras presenciais |
| `/simulacoes/feira` | A feira das decisões (orçamento, %, promoções, comparação de cestas, níveis, reflexão) |
| `/laboratorio` | Laboratório de futuros: experimento de energia/água, robô programável por blocos, classificador de IA, consumo doméstico |
| `/cidade` | Uma cidade, muitas vozes: projetos, evidências (fato/opinião/hipótese), papéis, turnos de fala, fichas, votação mediada, consequências, acordos |
| `/formacao`, `/formacao/:id` | Microimersões para professores com escolhas, consequências, reflexão, roteiro e anotações |
| `/estudio` | Estúdio de vídeo: tema → objetivo → roteiro → cenas → visuais → narração/legendas → revisão → vídeo |
| `/aulas`, `/aulas/nova`, `/aulas/:id`, `…/editar`, `…/aplicar`, `…/imprimir` | Planejador: blocos reorganizáveis, adaptação, aplicação passo a passo, impressão com gabarito separado, exportação |
| `/turmas`, `/turmas/:id` | Turmas, grupos, avaliação formativa (bilhete de saída, autoavaliação, rubricas, observações, dúvidas recorrentes), portfólio |
| `/calendario` | Calendário temático + agenda |
| `/projetos/:id` | Projeto interdisciplinar “Nossa cidade sustentável” |
| `/ajustes` | Acessibilidade, perfil (simulado), backup/importação |
| `/aluno`, `/coordenacao` | Visões dos perfis Aluno e Coordenação |

## Conteúdo inicial

- 12 aulas completas (objetivo, público, duração, etapas, materiais, atividade, gabarito, como observar a aprendizagem, adaptações, alternativas sem dispositivos)
- 3 histórias ramificadas (12–13 cenas, 3–4 finais cada, caminhos condicionados por estados)
- 8 atividades de jogo em 6 formatos (quiz, memória, sequência, classificação, associação, escape/pistas) + 6 brincadeiras presenciais
- Simulações funcionais: Feira, Laboratório (energia), Robô, Classificador de IA, Consumo doméstico, Assembleia da cidade
- 11 imersões completas (todas as previstas)
- 8 microimersões completas para formação de professores
- 1 projeto interdisciplinar completo com rubrica
- 15 datas do calendário escolar

## Estrutura

```
src/
  types/models.ts     modelos de domínio (usuários, organizações, turmas, aulas, blocos, narrativas, jogos, sessões, produções, avaliações, arquivos…)
  content/            conteúdo pedagógico (dados puros) + registro de imagens (assets.ts)
  engine/             regras das atividades, sem interface (story, games, feira, lab, robot, city)
  store/              estado persistente, ações, permissões por perfil, dados de demonstração
  lib/                arquivos (IndexedDB, downloads, WebVTT), voz, utilidades de aula
  components/         layout, UI reutilizável, Art (imagem ou cenário provisório)
  pages/              telas
tests/                testes de motores e de integridade do conteúdo
docs/ARQUITETURA.md   decisões, permissões e caminho para produção
ASSETS_NECESSARIOS.md briefing das imagens para o ChatGPT
```

## Imagens

Todas as 64 imagens previstas estão listadas em `ASSETS_NECESSARIOS.md`. Enquanto não chegam, o componente `Art` desenha cenários vetoriais provisórios com a proporção final. Para integrar: salve `public/assets/<id>.webp` (e `<id>-mobile.webp` quando indicado) e adicione o id em `AVAILABLE_ASSETS` (`src/content/assets.ts`). As imagens usam `loading="lazy"`, `<picture>` com fonte para celular e voltam ao cenário provisório se o arquivo falhar.

## Limitações concretas

- **Login e assinaturas:** prontos para ativar (Supabase + Cakto), passo a passo em [`docs/LOGIN_E_CAKTO.md`](docs/LOGIN_E_CAKTO.md). Sem essa configuração o site roda no modo demonstrativo. O conteúdo criado por cada professor ainda fica no navegador (separado por conta); não há sincronização entre dispositivos nem compartilhamento real entre professores.
- **Sem sala por código/multiplayer:** os jogos funcionam em modo local (um dispositivo, projetor ou grupos revezando). A tela informa isso; nenhum código falso é exibido.
- **Higgsfield não integrado:** aparece como “Não conectado”. É possível importar o vídeo exportado manualmente; ele entra “em revisão” e só é aprovado após checklist do professor.
- **Sem IA generativa:** o “modelo de roteiro” e o “ajustar tempo” são regras simples, com prévia e edição. Nada é salvo ou publicado sem ação do professor.
- **BNCC:** nenhum código foi atribuído; as habilidades estão descritas em palavras. O modelo aceita códigos com marcação de conferência (`BnccRef.verified`).
- **Conteúdo em preparo:** “Outras línguas” e as áreas do Ensino Médio têm só o espaço reservado. “Orçamento de projeto” e “Organização de evento” existem como roteiros, não como simuladores.
- **Leitura em voz alta** usa a síntese de voz do navegador; a qualidade depende do sistema. Não há áudio gravado nem audiodescrição.
- **Fontes** vêm do Google Fonts; sem internet, o app usa fontes do sistema.
- **Armazenamento:** limitado pelo navegador (~5 MB para dados; vídeos no IndexedDB). Use Ajustes → Exportar backup.
- **Simulações** são modelos didáticos com valores fictícios, explicados na própria tela.
- Os fatos do conteúdo (leis, datas, dados do IBGE, pessoas citadas) foram escritos com cuidado, mas merecem revisão pedagógica antes do uso em larga escala.
