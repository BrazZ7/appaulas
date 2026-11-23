/**
 * Desafios do professor: pequenas missões de uma semana para experimentar uma prática na sala,
 * registrar o que aconteceu e refletir. Formação em serviço, no ritmo do professor.
 */
export type AreaDesafio = 'Metodologias ativas' | 'Inclusão' | 'Avaliação' | 'Clima da turma' | 'Leitura e escrita' | 'Tecnologia' | 'Famílias e comunidade' | 'Bem-estar docente';

export interface DesafioProfessor {
  id: string;
  title: string;
  area: AreaDesafio;
  duracao: string;
  nivel: 'Primeiro passo' | 'Intermediário' | 'Avançado';
  porque: string;
  passos: string[];
  evidencias: string[];
  reflexao: string[];
  dica?: string;
}

export const DESAFIOS_PROFESSOR: DesafioProfessor[] = [
  {
    id: 'p-pergunta-aberta', title: 'Uma semana de perguntas abertas', area: 'Metodologias ativas', duracao: '1 semana', nivel: 'Primeiro passo',
    porque: 'Perguntas que não têm uma única resposta (“Como você sabe?”, “E se…?”) fazem a turma pensar em voz alta e revelam o raciocínio — e os erros que precisam de atenção.',
    passos: ['Escreva 3 perguntas abertas para a aula de segunda (ex.: “O que mudaria se…?”).', 'Espere 5 segundos antes de chamar alguém (tempo de espera).', 'Peça que conversem em dupla por 1 minuto antes de responder.', 'Anote as respostas mais surpreendentes no quadro.', 'Repita em pelo menos 3 aulas da semana.'],
    evidencias: ['Quantos estudantes diferentes falaram?', 'Uma resposta que mostrou um jeito de pensar inesperado.'],
    reflexao: ['O tempo de espera mudou quem participa?', 'Que pergunta funcionou melhor e por quê?'],
    dica: 'Use palitos com os nomes para sortear quem fala — e avise que a dupla pode ajudar.',
  },
  {
    id: 'p-bilhete-saida', title: 'Bilhete de saída todos os dias', area: 'Avaliação', duracao: '1 semana', nivel: 'Primeiro passo',
    porque: 'Três minutos no fim da aula mostram quem entendeu e quem precisa de outro caminho — antes da prova.',
    passos: ['No fim de cada aula, faça uma pergunta curta sobre o objetivo do dia.', 'Use o bilhete de saída da aba Avaliação formativa da turma ou papeizinhos.', 'Separe as respostas em três montes: entendeu / quase / ainda não.', 'Comece a aula seguinte retomando o que apareceu no monte “ainda não”.'],
    evidencias: ['Proporção de “entendeu / quase / ainda não” em cada dia.', 'O que você mudou na aula seguinte por causa dos bilhetes.'],
    reflexao: ['Alguma resposta mudou o seu plano?', 'Algum estudante que costuma ficar quieto apareceu nos bilhetes?'],
  },
  {
    id: 'p-tea-rotina', title: 'Rotina visual para estudantes com TEA', area: 'Inclusão', duracao: '2 semanas', nivel: 'Primeiro passo',
    porque: 'Previsibilidade reduz ansiedade. Um quadro com as etapas da aula ajuda estudantes autistas — e toda a turma.',
    passos: ['Liste as etapas da aula em 4 a 6 cartões com desenho + palavra (ex.: Chegada, Leitura, Atividade, Intervalo).', 'Fixe o quadro sempre no mesmo lugar e mostre no início da aula.', 'Vire ou risque cada cartão quando a etapa terminar.', 'Avise mudanças com antecedência usando um cartão “mudança”.', 'Converse com a família ou o AEE sobre o que funciona em casa.'],
    evidencias: ['Momentos de crise ou ansiedade antes e depois da rotina.', 'O estudante consulta o quadro sozinho?'],
    reflexao: ['O que a rotina mudou para a turma toda?', 'Que adaptação você quer testar a seguir (ex.: prova adaptada TEA do criador de provas)?'],
  },
  {
    id: 'p-tdah-blocos', title: 'Tarefas em blocos curtos (TDAH)', area: 'Inclusão', duracao: '1 semana', nivel: 'Intermediário',
    porque: 'Dividir a atividade em partes com começo e fim claros ajuda estudantes com TDAH a manter o foco e terminar o que começam.',
    passos: ['Divida a atividade principal em 3 blocos de 8 a 10 minutos.', 'Entregue um bloco de cada vez (folha dobrada ou cartões).', 'Combine um sinal para pausas de movimento (levantar, entregar material).', 'Use uma lista de checagem na carteira: ☐ Parte 1 ☐ Parte 2 ☐ Parte 3.', 'Elogie o processo, não só o resultado.'],
    evidencias: ['Quantas atividades foram concluídas antes e depois.', 'Momentos de dispersão e o que ajudou a retomar.'],
    reflexao: ['Os blocos ajudaram outros estudantes também?', 'Qual parte foi mais difícil de manter?'],
  },
  {
    id: 'p-sala-invertida', title: 'Sala de aula invertida (uma aula)', area: 'Metodologias ativas', duracao: '1 semana', nivel: 'Intermediário',
    porque: 'Quando o primeiro contato com o conteúdo acontece antes, o tempo da aula fica para praticar, discutir e tirar dúvidas.',
    passos: ['Escolha um tema de uma aula da próxima semana.', 'Prepare um material curto para antes: vídeo de até 5 min, texto de 1 página ou áudio.', 'Peça uma tarefa simples: anotar uma dúvida e uma curiosidade.', 'Na aula, comece pelas dúvidas e use o tempo para atividade em grupos.', 'Tenha um plano para quem não viu o material (5 min de leitura na entrada).'],
    evidencias: ['Quantos viram o material antes.', 'Tipos de dúvidas que apareceram.'],
    reflexao: ['O que mudou no uso do tempo da aula?', 'Como garantir acesso para quem não tem internet em casa?'],
  },
  {
    id: 'p-assembleia', title: 'Assembleia de turma', area: 'Clima da turma', duracao: '2 semanas', nivel: 'Intermediário',
    porque: 'Dar voz à turma para resolver conflitos e propor melhorias desenvolve responsabilidade e reduz problemas de convivência.',
    passos: ['Coloque uma caixa ou cartaz com três colunas: “Eu critico”, “Eu felicito”, “Eu proponho”.', 'Ao fim da semana, faça uma roda de 20 minutos com as contribuições.', 'Combine regras: falar na vez, criticar ações e não pessoas.', 'Registre os combinados e escolha um responsável por cada um.', 'Na semana seguinte, revisem os combinados.'],
    evidencias: ['Combinados criados pela turma.', 'Situações de conflito resolvidas pela própria turma.'],
    reflexao: ['Quem falou mais e quem não falou?', 'O que você precisou mediar?'],
  },
  {
    id: 'p-leitura-diaria', title: '15 minutos de leitura por prazer', area: 'Leitura e escrita', duracao: '2 semanas', nivel: 'Primeiro passo',
    porque: 'Ler todos os dias, sem cobrança de ficha, forma leitores. A leitura em voz alta do professor é um dos melhores modelos.',
    passos: ['Reserve 15 minutos fixos por dia (início da aula funciona bem).', 'Monte uma caixa com livros, gibis, revistas e jornais.', 'Leia em voz alta um capítulo de um livro nos primeiros dias.', 'Depois, cada um escolhe o que quer ler.', 'Uma vez por semana, 3 estudantes indicam o que leram em 1 minuto.'],
    evidencias: ['Livros mais procurados.', 'Comentários espontâneos dos estudantes.'],
    reflexao: ['Algum estudante que “não gostava de ler” se envolveu?', 'Que tipo de texto faltou na caixa?'],
  },
  {
    id: 'p-familias', title: 'Uma boa notícia para cada família', area: 'Famílias e comunidade', duracao: '3 semanas', nivel: 'Primeiro passo',
    porque: 'A família costuma ser chamada só quando há problema. Uma mensagem positiva constrói parceria — e ajuda quando for preciso conversar sobre dificuldades.',
    passos: ['Faça uma lista da turma e marque quem já recebeu uma mensagem positiva.', 'Envie 2 ou 3 por dia (bilhete, agenda ou canal oficial da escola).', 'Seja específico: “Hoje a Júlia ajudou o grupo a organizar o cartaz”.', 'Comece pelos estudantes que mais dão trabalho.'],
    evidencias: ['Quantas famílias foram contatadas.', 'Respostas ou mudanças percebidas.'],
    reflexao: ['Como as famílias reagiram?', 'Algum estudante mudou de atitude?'],
    dica: 'Use apenas os canais autorizados pela escola.',
  },
  {
    id: 'p-avaliacao-rubrica', title: 'Avaliar com rubrica', area: 'Avaliação', duracao: '2 semanas', nivel: 'Avançado',
    porque: 'Critérios claros, combinados antes, mostram ao estudante onde ele está e o próximo passo — e deixam a nota mais justa.',
    passos: ['Escolha uma produção (texto, cartaz, projeto).', 'Crie uma rubrica com 3 critérios e 4 níveis (use a aba Avaliação formativa da turma).', 'Apresente a rubrica antes da atividade, com exemplos.', 'Peça uma autoavaliação com a mesma rubrica.', 'Compare a sua avaliação com a autoavaliação e devolva com um comentário.'],
    evidencias: ['A rubrica criada.', 'Diferenças entre a autoavaliação e a sua avaliação.'],
    reflexao: ['Os critérios ficaram claros para a turma?', 'O que você mudaria na rubrica?'],
  },
  {
    id: 'p-filme-turma', title: 'Coordenar o desafio “nosso filme”', area: 'Tecnologia', duracao: '3 a 4 semanas', nivel: 'Avançado',
    porque: 'Produzir um vídeo envolve escrita, oralidade, arte, tecnologia e cooperação — e cada estudante encontra uma função.',
    passos: ['Abra Desafios › Nosso filme e escolha um roteiro pronto ou um tema.', 'Monte as equipes de produção com a turma.', 'Use “Transformar em filme” para levar o roteiro ao Estúdio.', 'Grave com celular, edite e faça uma sessão de cinema.', 'Registre o processo no portfólio da turma.'],
    evidencias: ['Cronograma cumprido.', 'Funções assumidas por cada estudante.'],
    reflexao: ['Quem se destacou que normalmente não aparece?', 'O que faria diferente na próxima produção?'],
  },
  {
    id: 'p-autocuidado', title: 'Pausas de autocuidado', area: 'Bem-estar docente', duracao: '1 semana', nivel: 'Primeiro passo',
    porque: 'Professores cansados têm menos paciência e criatividade. Pequenas pausas planejadas fazem diferença no fim do dia.',
    passos: ['Escolha um momento fixo de 5 minutos sem tarefas por dia.', 'Faça uma respiração lenta (4 segundos inspirando, 6 expirando) antes da aula mais difícil.', 'Prepare as aulas da semana em um único bloco de tempo, em vez de espalhar.', 'Converse com um colega sobre algo que deu certo.'],
    evidencias: ['Como você se sentiu no fim de cada dia (de 1 a 5).'],
    reflexao: ['O que mais drena sua energia na semana?', 'O que você pode compartilhar com colegas?'],
  },
  {
    id: 'p-prova-adaptada', title: 'Uma prova, várias versões', area: 'Inclusão', duracao: '1 semana', nivel: 'Intermediário',
    porque: 'A mesma avaliação pode ser acessível a todos quando ajustamos a forma — sem baixar a expectativa sobre o conteúdo.',
    passos: ['Crie ou duplique uma prova em Provas.', 'Escreva o enunciado simplificado nas questões principais.', 'Gere as versões TEA, TDAH ou dislexia na tela de impressão.', 'Combine com o estudante e a família como será a aplicação (tempo, local, leitura em voz alta).', 'Compare o desempenho com avaliações anteriores.'],
    evidencias: ['Versões geradas.', 'Resultados e comportamento durante a prova.'],
    reflexao: ['A adaptação mediu o que você queria medir?', 'Que outro apoio fez diferença?'],
  },
];

export function findDesafioProfessor(id: string) { return DESAFIOS_PROFESSOR.find((d) => d.id === id); }
