import type { Project } from '../types/models';

export const PROJECTS: Project[] = [
  {
    id: 'nossa-cidade-sustentavel',
    title: 'Nossa cidade sustentável',
    drivingQuestion:
      'Como podemos tornar o nosso bairro um lugar mais sustentável e justo para quem vive nele, usando ciência, dados e diálogo?',
    summary:
      'Em quatro aulas, a turma investiga o próprio bairro, testa soluções de energia e mobilidade em simulações, calcula custos com um orçamento fictício e apresenta à comunidade escolar um plano de ação com cartaz, argumentos e dados.',
    subjects: ['ciencias', 'geografia', 'matematica', 'portugues', 'politica-cidadania', 'artes'],
    anos: [7],
    totalLessons: 4,
    artId: 'proj-cidade-sustentavel',
    stages: [
      {
        id: 'etapa-1',
        title: 'Aula 1 — Investigar o bairro',
        lessons: 1,
        description:
          'A turma apresenta a pergunta norteadora e faz um diagnóstico do bairro. Em grupos, os estudantes desenham um mapa afetivo do caminho casa–escola e registram o que observam: áreas verdes, córregos, lixo, iluminação, transporte, lugares de convivência. Cada grupo escolhe um problema para investigar (energia, água, resíduos, mobilidade ou áreas verdes) e separa o que é observação, opinião e hipótese.',
        contributions: [
          { subject: 'geografia', contribution: 'Leitura da paisagem e produção de mapa do bairro com legenda e pontos de referência.' },
          { subject: 'ciencias', contribution: 'Observação sistemática e formulação de hipóteses sobre problemas ambientais.' },
          { subject: 'politica-cidadania', contribution: 'Distinção entre fato, opinião e hipótese ao descrever problemas coletivos.' },
        ],
        activities: [
          'Roda de abertura com a pergunta norteadora e combinados do projeto.',
          'Mapa afetivo do caminho casa–escola, com legenda criada pelo grupo.',
          'Quiz em equipes para levantar conhecimentos prévios sobre sustentabilidade urbana.',
          'Quadro "Observamos | Achamos | Precisamos descobrir" para o problema escolhido.',
        ],
        products: ['Mapa do bairro com legenda', 'Ficha do problema escolhido com observações e hipóteses'],
        resourceRefs: [{ type: 'game', id: 'quiz-cidade-sustentavel' }],
      },
      {
        id: 'etapa-2',
        title: 'Aula 2 — Experimentar soluções',
        lessons: 1,
        description:
          'Os grupos testam soluções no laboratório de energia e na simulação da cidade. Comparam fontes renováveis e não renováveis, observam o que acontece em diferentes situações (noite, seca, falta de vento) e avaliam como decisões sobre transporte e espaços públicos afetam diferentes moradores. Cada grupo registra pelo menos duas soluções testadas, com resultados e efeitos colaterais.',
        contributions: [
          { subject: 'ciencias', contribution: 'Fontes de energia, impactos ambientais e teste de hipóteses em simulação.' },
          { subject: 'geografia', contribution: 'Relação entre uso do espaço urbano, mobilidade e qualidade de vida.' },
          { subject: 'politica-cidadania', contribution: 'Análise de quem ganha e quem perde com cada decisão pública.' },
        ],
        activities: [
          'Laboratório virtual: montar o abastecimento de energia de uma cidade fictícia.',
          'Simulação da cidade: testar decisões sobre praça, transporte e serviços públicos.',
          'Registro em tabela: solução testada, resultado, efeito colateral, grupo mais afetado.',
        ],
        products: ['Tabela de soluções testadas', 'Escolha justificada da solução principal do grupo'],
        resourceRefs: [
          { type: 'simulation', id: 'laboratorio' },
          { type: 'simulation', id: 'cidade' },
        ],
      },
      {
        id: 'etapa-3',
        title: 'Aula 3 — Fazer as contas',
        lessons: 1,
        description:
          'Com um orçamento fictício, os grupos estimam quanto custaria a solução escolhida, priorizam itens e calculam porcentagens (parte do orçamento para cada ação, descontos e reserva para imprevistos). A simulação da feira serve de aquecimento para decisões com dinheiro limitado. Os grupos constroem um gráfico simples para mostrar a distribuição dos gastos.',
        contributions: [
          { subject: 'matematica', contribution: 'Porcentagem, orçamento, proporcionalidade e construção de gráfico de setores ou de barras.' },
          { subject: 'ciencias', contribution: 'Estimativa de benefícios ambientais (economia de energia, redução de resíduos).' },
          { subject: 'portugues', contribution: 'Escrita de justificativas claras para as prioridades definidas.' },
        ],
        activities: [
          'Aquecimento na feira simulada: comprar o necessário dentro do orçamento.',
          'Planilha em papel com itens, custos fictícios e porcentagem do orçamento total.',
          'Gráfico da distribuição do orçamento e frase-resumo ("A maior parte do dinheiro vai para... porque...").',
        ],
        products: ['Orçamento do plano com porcentagens', 'Gráfico da distribuição dos gastos'],
        resourceRefs: [{ type: 'simulation', id: 'feira' }],
      },
      {
        id: 'etapa-4',
        title: 'Aula 4 — Comunicar e propor',
        lessons: 1,
        description:
          'Os grupos transformam a investigação em um plano de ação para o bairro. Produzem um cartaz com visual planejado (título, imagem principal, dados e chamada para ação) e uma carta aberta curta à comunidade escolar ou à associação de moradores. Na feira de soluções, apresentam o plano em três minutos e respondem perguntas, separando dados, opiniões e hipóteses.',
        contributions: [
          { subject: 'portugues', contribution: 'Produção de carta aberta argumentativa e apresentação oral planejada.' },
          { subject: 'artes', contribution: 'Composição visual do cartaz: hierarquia, cor, imagem e legibilidade.' },
          { subject: 'politica-cidadania', contribution: 'Formas de participação cidadã e de diálogo com o poder público e a comunidade.' },
          { subject: 'matematica', contribution: 'Uso de dados e gráficos como evidência na argumentação.' },
        ],
        activities: [
          'Esboço e produção do cartaz do plano de ação.',
          'Escrita da carta aberta com problema, proposta, dados e pedido concreto.',
          'Feira de soluções com apresentação de três minutos e rodada de perguntas.',
          'Autoavaliação do grupo com a rubrica do projeto.',
        ],
        products: ['Cartaz do plano de ação', 'Carta aberta à comunidade', 'Apresentação oral'],
        resourceRefs: [{ type: 'game', id: 'quiz-cidade-sustentavel' }],
      },
    ],
    finalProduct:
      'Plano de ação "Nossa cidade sustentável": cartaz com mapa, dados e gráfico do orçamento, acompanhado de carta aberta à comunidade escolar ou à associação de moradores e de uma apresentação oral na feira de soluções.',
    assessment: [
      'Avaliação contínua: registros de observação do professor em cada etapa (participação, colaboração, uso de evidências).',
      'Produtos parciais: mapa do bairro, tabela de soluções testadas e orçamento com porcentagens.',
      'Produto final avaliado pela rubrica (investigação, uso de dados, comunicação e trabalho colaborativo).',
      'Autoavaliação e avaliação entre pares ao final da aula 4.',
      'Bilhete de saída em cada aula: "o que aprendi, o que ainda é dúvida, uma ideia para o bairro".',
    ],
    rubric: {
      id: 'rubrica-cidade-sustentavel',
      title: 'Rubrica — Nossa cidade sustentável',
      criteria: [
        {
          id: 'investigacao',
          label: 'Investigação do problema',
          levels: [
            'Inicial: descreve o problema de forma genérica, sem observações próprias e sem separar opinião de evidência.',
            'Em desenvolvimento: apresenta algumas observações do bairro e uma hipótese, mas sem relação clara entre elas.',
            'Proficiente: descreve o problema com observações próprias, formula hipóteses e indica como poderiam ser testadas.',
            'Avançado: investiga o problema com observações organizadas, testa hipóteses nas simulações e reconhece limites da própria investigação.',
          ],
        },
        {
          id: 'dados',
          label: 'Uso de dados e cálculos',
          levels: [
            'Inicial: apresenta valores soltos, sem cálculos ou com erros que comprometem a proposta.',
            'Em desenvolvimento: calcula custos e porcentagens com alguns erros e usa os dados pouco na argumentação.',
            'Proficiente: calcula corretamente orçamento e porcentagens e representa os dados em gráfico adequado.',
            'Avançado: usa cálculos e gráficos corretos para comparar alternativas e justificar prioridades, indicando que os valores são estimativas.',
          ],
        },
        {
          id: 'comunicacao',
          label: 'Comunicação e argumentação',
          levels: [
            'Inicial: cartaz e carta com informações desorganizadas; a proposta não fica clara.',
            'Em desenvolvimento: a proposta é compreensível, mas os argumentos são poucos ou baseados apenas em opinião.',
            'Proficiente: cartaz legível e carta com problema, proposta, dados e pedido concreto; apresentação clara.',
            'Avançado: comunicação persuasiva e respeitosa, que antecipa objeções, considera diferentes grupos afetados e responde perguntas com evidências.',
          ],
        },
        {
          id: 'colaboracao',
          label: 'Trabalho colaborativo e cidadania',
          levels: [
            'Inicial: participação desigual; poucas pessoas realizam o trabalho e há dificuldade em ouvir os colegas.',
            'Em desenvolvimento: as tarefas são divididas, mas há pouca troca de ideias entre os integrantes.',
            'Proficiente: todos contribuem, as decisões são negociadas e o grupo respeita opiniões diferentes.',
            'Avançado: o grupo se organiza com autonomia, apoia quem tem dificuldade e propõe ações que consideram o bem comum do bairro.',
          ],
        },
      ],
    },
    skills: [
      'Formular perguntas e hipóteses sobre problemas ambientais do entorno e testá-las.',
      'Comparar fontes de energia e soluções urbanas quanto a impactos ambientais e sociais.',
      'Resolver problemas de orçamento com porcentagens e representar dados em gráficos.',
      'Ler e produzir mapas do bairro com legenda.',
      'Produzir textos argumentativos (carta aberta) e apresentações orais com uso de dados.',
      'Planejar composições visuais para comunicar uma mensagem ao público.',
      'Participar de forma ética e respeitosa de decisões coletivas sobre o espaço público.',
    ],
  },
];
