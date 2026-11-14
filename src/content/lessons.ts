import type { Lesson } from '../types/models';

/**
 * Biblioteca de aulas prontas do AulaViva.
 * - Códigos BNCC foram omitidos de propósito: as habilidades estão descritas em palavras
 *   (ver `skills`). A coordenação pode associar os códigos após conferência no documento oficial.
 * - Preços e dados numéricos dos exemplos são fictícios e estão sinalizados.
 * - Em cada aula, a soma dos minutos dos blocos é igual a `durationMin`.
 */

const CREATED = '2026-11-01T12:00:00.000Z';

export const LESSONS: Lesson[] = [
  // ───────────────────────── Português ─────────────────────────
  {
    id: 'aula-finais-possiveis',
    title: 'Finais possíveis: quem decide o desfecho?',
    summary:
      'A turma vive uma narrativa ramificada na biblioteca, percebe como cada escolha muda o desfecho e escreve um final alternativo coerente com o que veio antes.',
    subjects: ['portugues'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 6º e 7º ano que já leem contos curtos e estão começando a produzir narrativas com mais autonomia.',
    objectives: [
      'Identificar os elementos da narrativa (personagens, espaço, conflito, clímax e desfecho) em uma história lida coletivamente.',
      'Explicar como as decisões das personagens provocam consequências e mudam o desfecho.',
      'Produzir um final alternativo coerente com as pistas e o conflito apresentados no texto.',
    ],
    materials: [
      'Projetor ou computador ligado à TV (opcional)',
      'Folha impressa da atividade "Meu final possível"',
      'Quadro e giz/pincel',
      'Tiras de papel para o mapa de escolhas',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'O final que eu mudaria',
        minutes: 5,
        instructions:
          'Pergunte: "Você já terminou um livro, filme ou série querendo mudar o final? Qual e por quê?". Ouça três ou quatro respostas e anote no quadro a palavra "desfecho".',
        teacherNotes:
          'Aceite exemplos de qualquer mídia (novela, anime, jogo). O objetivo é ativar a ideia de que finais são escolhas de quem escreve.',
      },
      {
        id: 'b2',
        kind: 'historia',
        title: 'Narrativa ramificada: a biblioteca dos finais',
        minutes: 15,
        instructions:
          'Projete a história e leia em voz alta. A cada escolha, peça que a turma vote levantando a mão e justifique com uma pista do texto antes de clicar. Registre no quadro um "mapa de escolhas" (escolha → consequência).',
        teacherNotes:
          'Use as perguntas de pausa da própria história. Valorize justificativas que citam trechos ("porque ela disse que...") em vez de "porque sim".',
        resourceRef: { type: 'story', id: 'biblioteca-finais' },
        offlineAlternative:
          'Leia a versão impressa do roteiro da história e, nas escolhas, peça que os estudantes se desloquem para o lado da sala correspondente à opção. Siga o caminho mais votado.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'Desmontando a narrativa',
        minutes: 8,
        instructions:
          'Com o mapa de escolhas no quadro, identifiquem juntos: personagens, espaço, conflito, clímax e desfecho. Pergunte: "Se tivéssemos escolhido a outra porta, o que mudaria? O que continuaria igual?".',
        teacherNotes:
          'Destaque que um final alternativo precisa respeitar o que já aconteceu (coerência): personagens não mudam de personalidade sem motivo.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Escrita: meu final possível',
        minutes: 17,
        instructions:
          'Em duplas, os estudantes escolhem um ponto do mapa de escolhas e escrevem um novo desfecho de 8 a 12 linhas, usando a folha da atividade. Circule pelas duplas fazendo perguntas: "Que pista do texto sustenta esse final?".',
        teacherNotes:
          'Para quem trava, ofereça começos de frase: "Naquele instante, ela percebeu que..." / "Ninguém esperava que...".',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Leitura de finais e bilhete de saída',
        minutes: 5,
        instructions:
          'Duas ou três duplas leem seus finais. A turma responde: "Esse final é coerente com a história? Por quê?". Cada estudante escreve num papel: uma coisa que aprendeu sobre desfecho e uma dúvida.',
      },
    ],
    activity: {
      title: 'Meu final possível',
      instructions: [
        'Escolha um momento da história em que uma decisão diferente poderia ter sido tomada.',
        'Escreva qual seria a nova decisão e quem a toma.',
        'Escreva um novo desfecho de 8 a 12 linhas, com começo, conflito resolvido e fechamento.',
        'Sublinhe no seu texto uma informação que veio da história original (prova de coerência).',
        'Releia e confira: o final tem a ver com o conflito? As personagens agem de forma coerente?',
      ],
    },
    observeLearning: [
      'O estudante justifica escolhas citando pistas ou trechos da história.',
      'Nomeia corretamente conflito, clímax e desfecho ao analisar o mapa de escolhas.',
      'O final escrito retoma o conflito original e mantém a personalidade das personagens.',
      'Na leitura coletiva, avalia a coerência do texto do colega com argumentos, não só gosto pessoal.',
    ],
    adaptations: [
      'Leitura: disponibilize a história impressa em fonte ampliada e permita que o estudante acompanhe com o dedo ou régua de leitura; um colega pode ler em voz alta para a dupla.',
      'Tempo: reduza o final para 5 a 6 linhas ou permita que seja contado oralmente e registrado depois pela dupla.',
      'Sem dispositivos: toda a aula funciona com a versão impressa e votação por deslocamento na sala.',
    ],
    skills: [
      'Identificar os elementos constitutivos da narrativa e a relação de causa e consequência entre os fatos.',
      'Inferir informações implícitas a partir de pistas do texto.',
      'Planejar e produzir texto narrativo coerente, considerando o contexto já estabelecido.',
    ],
    modes: ['historia', 'conversar'],
    artId: 'subj-portugues',
    tags: ['narrativa', 'desfecho', 'produção de texto', 'coerência', 'leitura'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },
  {
    id: 'aula-do-rascunho-ao-texto',
    title: 'Do rascunho ao texto final',
    summary:
      'Os estudantes descobrem que escrever é um processo: ordenam as etapas da escrita em um jogo, revisam um texto com "lupas" e reescrevem um bilhete para a biblioteca da escola.',
    subjects: ['portugues'],
    etapa: 'fundamental1',
    anos: [4, 5],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 4º e 5º ano que já escrevem pequenos textos e precisam desenvolver o hábito de revisar.',
    objectives: [
      'Reconhecer as etapas do processo de escrita: planejar, escrever o rascunho, revisar, reescrever e publicar.',
      'Revisar um texto curto observando um aspecto de cada vez (sentido, pontuação, ortografia).',
      'Reescrever um bilhete melhorando clareza e organização.',
    ],
    materials: [
      'Projetor ou computador (opcional)',
      'Cópias do "bilhete bagunçado" (um por dupla)',
      'Lápis de cor em três cores (as "lupas" de revisão)',
      'Cartões com as etapas da escrita (para a versão sem tela)',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Quem escreve certo de primeira?',
        minutes: 5,
        instructions:
          'Pergunte: "Vocês acham que escritores escrevem o livro inteiro certinho de primeira?". Conte que autores reescrevem várias vezes e que rascunho não é erro, é parte do caminho.',
        teacherNotes: 'Se possível, mostre um rascunho seu, com rabiscos e setas. Isso tira o medo do erro.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Jogo: as etapas da escrita',
        minutes: 10,
        instructions:
          'Projete o jogo de sequência e peça que a turma, em coro ou por votação, coloque as etapas na ordem. Depois de cada acerto, leia em voz alta a explicação da etapa.',
        resourceRef: { type: 'game', id: 'sequencia-escrita-texto' },
        offlineAlternative:
          'Entregue a cada grupo um envelope com cartões das etapas embaralhados. Os grupos montam a sequência na mesa e comparam com os colegas.',
        teacherNotes: 'Comente que é possível voltar etapas: às vezes, ao revisar, a gente precisa replanejar.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Revisão com três lupas',
        minutes: 15,
        instructions:
          'Em duplas, os estudantes leem o "bilhete bagunçado" três vezes, cada vez com uma lupa (cor): azul = o texto faz sentido e diz o que precisa?; verde = pontuação e letra maiúscula; vermelho = palavras escritas de forma diferente da norma. Marcam no próprio papel.',
        teacherNotes:
          'Faça a primeira lupa junto com a turma, em voz alta, para modelar. Reforce: revisar um aspecto de cada vez é mais fácil.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Reescrita do bilhete',
        minutes: 15,
        instructions:
          'Cada dupla reescreve o bilhete limpo, com saudação, mensagem clara, despedida e assinatura. Quem terminar pode trocar com outra dupla para uma última revisão.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Varal de antes e depois',
        minutes: 5,
        instructions:
          'Pendure no varal ou cole na parede o bilhete original ao lado de algumas reescritas. Pergunte: "O que mudou? O que ficou mais claro?".',
      },
    ],
    activity: {
      title: 'O bilhete bagunçado',
      instructions: [
        'Leia o bilhete: "oi biblioteca a gente quer pedir livro de misterio pq a turma gosta muito e tambem de livro de piada a gente promete cuidar obrigado 5 ano B"',
        'Lupa azul: o bilhete diz claramente o que a turma quer e por quê? Falta alguma informação (para quem é, pedido, motivo)?',
        'Lupa verde: marque onde faltam letras maiúsculas e pontuação.',
        'Lupa vermelha: circule palavras abreviadas ou escritas de forma diferente da norma.',
        'Reescreva o bilhete com saudação, pedido, motivo, compromisso, despedida e assinatura.',
      ],
      answerKey: [
        'Ordem das etapas: planejar → escrever o rascunho → revisar → reescrever → publicar/entregar.',
        'Maiúsculas: "Oi", "Biblioteca" (se usada como nome/vocativo), início de cada frase, "5º ano B".',
        'Pontuação: vírgula após o vocativo ("Oi, Biblioteca,"), ponto final ao fim de cada ideia.',
        'Ortografia: "misterio" → "mistério"; "pq" → "porque"; "tambem" → "também"; "livro" → "livros" (concordância com a ideia de vários).',
        'Exemplo de reescrita: "Olá, equipe da biblioteca! A nossa turma gostaria de pedir livros de mistério e de piadas, porque gostamos muito desses gêneros. Prometemos cuidar bem deles. Obrigado! Turma do 5º ano B."',
      ],
    },
    observeLearning: [
      'Ordena as etapas da escrita e explica para que serve a revisão.',
      'Usa as "lupas" separadamente, marcando problemas diferentes em cada leitura.',
      'A reescrita tem saudação, pedido claro, motivo e assinatura.',
      'Aceita e faz sugestões ao revisar o texto do colega com respeito.',
    ],
    adaptations: [
      'Leitura: leia o bilhete em voz alta para toda a turma antes da revisão; ofereça versão em letra bastão para quem ainda está consolidando a leitura.',
      'Tempo: use apenas duas lupas (sentido e pontuação) e reduza a reescrita a três frases.',
      'Sem dispositivos: o jogo é feito com cartões impressos ou escritos à mão no quadro.',
    ],
    skills: [
      'Reconhecer a escrita como processo que envolve planejamento, produção, revisão e reescrita.',
      'Revisar textos quanto à adequação ao propósito, à pontuação e à ortografia.',
      'Produzir bilhetes considerando interlocutor, finalidade e estrutura do gênero.',
    ],
    modes: ['jogar', 'conversar'],
    artId: 'subj-portugues',
    tags: ['processo de escrita', 'revisão', 'reescrita', 'bilhete', 'anos iniciais'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Matemática ─────────────────────────
  {
    id: 'aula-feira-das-decisoes',
    title: 'A feira das decisões',
    summary:
      'Com um orçamento limitado, grupos fazem as compras da semana numa feira simulada, calculam descontos e aumentos percentuais e defendem suas escolhas com números.',
    subjects: ['matematica', 'educacao-financeira'],
    etapa: 'fundamental2',
    anos: [7],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º ano que já conhecem frações e números decimais e estão aprendendo porcentagem.',
    objectives: [
      'Calcular porcentagens de valores em reais, incluindo descontos e aumentos.',
      'Comparar ofertas diferentes (desconto percentual × "leve 3, pague 2") para decidir a mais vantajosa.',
      'Planejar compras dentro de um orçamento, reservando uma parte para imprevistos.',
    ],
    materials: [
      'Projetor ou computador (opcional)',
      'Folha "Lista da feira" com preços fictícios (uma por grupo)',
      'Calculadora (opcional, apenas para conferência)',
      'Papel para o registro das decisões do grupo',
    ],
    resources: ['projetor', 'dispositivos-grupo', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Pergunta disparadora',
        minutes: 5,
        instructions:
          'Escreva no quadro: "10% de desconto ou leve 3, pague 2: qual é melhor?". Deixe a turma votar sem fazer contas e registre o placar para retomar no fim.',
        teacherNotes: 'Não corrija agora. A intuição inicial será confrontada com os cálculos.',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Porcentagem sem mistério',
        minutes: 10,
        instructions:
          'Mostre que "por cento" significa "a cada 100". Faça no quadro: 10% de R$ 80,00 = R$ 8,00; 25% = 1/4; 50% = metade. Mostre o atalho do desconto: pagar 85% (multiplicar por 0,85) é o mesmo que ter 15% de desconto. Todos os valores são fictícios.',
        teacherNotes:
          'Valide estratégias de cálculo mental (10% e depois dobrar para 20%, metade de 10% para 5%). Elas são tão válidas quanto a multiplicação por decimal.',
      },
      {
        id: 'b3',
        kind: 'experimento',
        title: 'Simulação: a feira',
        minutes: 18,
        instructions:
          'Em grupos, os estudantes entram na feira simulada com um orçamento e uma lista de necessidades. Cada grupo deve registrar: o que comprou, quanto gastou, qual oferta escolheu e por quê. Exija que reservem 10% do orçamento para imprevistos.',
        resourceRef: { type: 'simulation', id: 'feira' },
        offlineAlternative:
          'Use a folha "Lista da feira" impressa como cardápio de barracas. Um estudante por grupo é o "feirante" que confere as contas. O orçamento é de R$ 150,00 (fictício).',
        teacherNotes:
          'Circule perguntando "Como vocês sabem que essa oferta é melhor?". Quem terminar cedo pode refazer a compra com 20% a menos de orçamento.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Problemas da feira',
        minutes: 12,
        instructions:
          'Os grupos resolvem os problemas da folha de atividade, registrando o raciocínio (não só a resposta). Corrija dois problemas coletivamente no quadro, pedindo que grupos diferentes mostrem estratégias diferentes.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Voltando à pergunta',
        minutes: 5,
        instructions:
          'Retome o placar inicial. Usando o problema 4, mostre que "leve 3, pague 2" equivale a cerca de 33% de desconto por unidade, mas só vale a pena se o grupo realmente precisa de 3 unidades. Cada estudante escreve uma frase: "Antes eu achava... agora eu sei que...".',
      },
    ],
    activity: {
      title: 'Problemas da feira (valores fictícios)',
      instructions: [
        '1. O quilo da banana custa R$ 6,00 e a barraca oferece 15% de desconto. Qual o novo preço do quilo?',
        '2. O grupo tinha R$ 150,00 e já gastou R$ 90,00. Que porcentagem do orçamento foi gasta? Quanto sobra, em reais e em porcentagem?',
        '3. O pacote de 5 kg de arroz custa R$ 25,00 na barraca A. Na barraca B, custa R$ 28,00 com 10% de desconto. Onde é mais barato e qual a diferença?',
        '4. Uma caixa de suco custa R$ 4,50. A barraca C faz "leve 3, pague 2"; a barraca D dá 30% de desconto por caixa. O grupo precisa de 3 caixas: qual oferta é melhor? Qual o preço por caixa em cada uma?',
        '5. O quilo do tomate passou de R$ 8,00 para R$ 10,00. De quantos por cento foi o aumento?',
        '6. O grupo decidiu guardar 10% do orçamento de R$ 150,00 para imprevistos. Quanto pode gastar nas compras?',
      ],
      answerKey: [
        '1. 15% de 6,00 = 0,90. Novo preço: 6,00 − 0,90 = R$ 5,10 (ou 6,00 × 0,85 = 5,10).',
        '2. 90 ÷ 150 = 0,6 = 60% gasto. Sobram R$ 60,00, que correspondem a 40% do orçamento.',
        '3. Barraca B: 10% de 28,00 = 2,80; 28,00 − 2,80 = R$ 25,20. A barraca A (R$ 25,00) é mais barata, por R$ 0,20.',
        '4. Barraca C: paga 2 × 4,50 = R$ 9,00 por 3 caixas → R$ 3,00 por caixa (desconto de 1/3 ≈ 33%). Barraca D: 4,50 × 0,70 = R$ 3,15 por caixa → R$ 9,45 por 3 caixas. Para 3 caixas, a barraca C é melhor (economia de R$ 0,45).',
        '5. Aumento de R$ 2,00 sobre R$ 8,00: 2 ÷ 8 = 0,25 = 25% de aumento.',
        '6. 10% de 150,00 = R$ 15,00 de reserva. Pode gastar R$ 135,00.',
      ],
    },
    observeLearning: [
      'Calcula 10%, 25% e 50% mentalmente e usa essas referências para outras porcentagens.',
      'Diferencia desconto (subtrair a parte) de aumento (somar a parte) e explica o que fez.',
      'Compara ofertas pelo preço por unidade, e não só pelo valor total.',
      'Justifica as decisões do grupo considerando necessidade, orçamento e reserva.',
    ],
    adaptations: [
      'Leitura: leia os problemas em voz alta e destaque com marca-texto os números e a pergunta de cada enunciado.',
      'Tempo: priorize os problemas 1, 2 e 6; os problemas 3 a 5 ficam como desafio ou tarefa.',
      'Sem dispositivos: a feira é feita com a lista impressa e dinheiro de papel recortado; um estudante faz o papel de feirante.',
    ],
    skills: [
      'Resolver e elaborar problemas que envolvem cálculo de porcentagens, incluindo acréscimos e decréscimos simples.',
      'Relacionar porcentagens, frações e números decimais (50% = 1/2 = 0,5).',
      'Tomar decisões de consumo responsável com base em comparação de preços e planejamento de orçamento.',
    ],
    modes: ['experimentar', 'jogar', 'conversar'],
    artId: 'subj-matematica',
    tags: ['porcentagem', 'orçamento', 'educação financeira', 'desconto', 'consumo consciente'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },
  {
    id: 'aula-partes-do-todo',
    title: 'Partes do todo: frações e porcentagens',
    summary:
      'Com malhas quadriculadas, pizzas de papel e um jogo de associação, a turma descobre que 1/2, 50% e "metade" são jeitos diferentes de dizer a mesma coisa.',
    subjects: ['matematica'],
    etapa: 'fundamental1',
    anos: [5],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 5º ano que já conhecem frações simples e terão o primeiro contato com porcentagem.',
    objectives: [
      'Associar as porcentagens 10%, 25%, 50%, 75% e 100% às frações 1/10, 1/4, 1/2, 3/4 e ao inteiro.',
      'Representar porcentagens em uma malha de 100 quadradinhos.',
      'Calcular porcentagens simples de quantidades (metade, um quarto, um décimo).',
    ],
    materials: [
      'Malha quadriculada 10 × 10 impressa (três por estudante)',
      'Lápis de cor',
      'Círculos de papel para dobrar (pizzas)',
      'Projetor ou computador (opcional)',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Onde a gente vê porcentagem?',
        minutes: 5,
        instructions:
          'Pergunte onde os estudantes já viram o símbolo % (bateria do celular, promoções, embalagens). Mostre uma bateria desenhada no quadro com 50% e pergunte: "Quanto falta para encher?".',
      },
      {
        id: 'b2',
        kind: 'experimento',
        title: 'Dobrando a pizza',
        minutes: 10,
        instructions:
          'Cada estudante dobra um círculo de papel ao meio e depois ao meio de novo. Pinte 1 parte: é 1/4. Pergunte: "Se a pizza inteira é 100%, quanto vale cada pedaço?" (25%). Pinte mais 2 partes: 3/4 = 75%.',
        teacherNotes: 'Deixe que eles cheguem ao 25% dividindo 100 por 4; não entregue a resposta.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Malha de 100 quadradinhos',
        minutes: 12,
        instructions:
          'Na malha 10 × 10, os estudantes pintam: 50 quadradinhos (50% = 1/2), 25 quadradinhos (25% = 1/4) e 10 quadradinhos (10% = 1/10). Ao lado de cada malha escrevem a fração e a porcentagem.',
        teacherNotes:
          'Pergunte: "Quantas linhas inteiras dão 10%?" (uma linha). Essa visualização ajuda muito no cálculo de 10%.',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Jogo de associação: frações e porcentagens',
        minutes: 13,
        instructions:
          'Projete o jogo e resolvam coletivamente: a turma, em equipes, indica qual porcentagem combina com cada fração. Antes de confirmar, peça a uma equipe que explique usando a pizza ou a malha.',
        resourceRef: { type: 'game', id: 'associacao-fracoes-porcentagens' },
        offlineAlternative:
          'Monte no quadro duas colunas (frações e porcentagens) e peça que estudantes liguem os pares com giz. Ou distribua cartões para um jogo de memória em grupos.',
        teacherNotes: 'Se o jogo trouxer porcentagens além das trabalhadas (como 20%), use a malha para conferir: 20% = 2 linhas = 1/5.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Desafio de saída',
        minutes: 10,
        instructions:
          'Os estudantes resolvem individualmente os problemas da folha de atividade. Corrija os dois primeiros em voz alta e recolha as folhas para observar estratégias.',
      },
    ],
    activity: {
      title: 'Desafio das partes',
      instructions: [
        '1. Uma turma tem 40 estudantes. 1/4 deles vem de bicicleta. Quantos estudantes são? Que porcentagem da turma é essa?',
        '2. Quanto é 50% de 30 figurinhas?',
        '3. Quanto é 10% de 200 reais? (valor fictício)',
        '4. Uma pizza foi cortada em 8 pedaços iguais e 2 foram comidos. Que fração foi comida? E que porcentagem?',
        '5. Joana leu 3/4 de um livro de 20 páginas. Quantas páginas ela leu?',
      ],
      answerKey: [
        '1. 40 ÷ 4 = 10 estudantes; 1/4 = 25% da turma.',
        '2. 50% é metade: 30 ÷ 2 = 15 figurinhas.',
        '3. 10% é um décimo: 200 ÷ 10 = 20 reais.',
        '4. 2/8 = 1/4 da pizza, ou seja, 25%.',
        '5. 20 ÷ 4 = 5 páginas por quarto; 3 × 5 = 15 páginas.',
      ],
    },
    observeLearning: [
      'Explica que 100% representa o inteiro e usa isso para encontrar o valor das partes.',
      'Pinta corretamente 50, 25 e 10 quadradinhos e escreve a fração equivalente.',
      'Calcula metade, um quarto e um décimo de quantidades usando divisão.',
      'Reconhece que 2/8 e 1/4 representam a mesma parte do todo.',
    ],
    adaptations: [
      'Leitura: leia os problemas em voz alta e permita que o estudante desenhe a situação antes de calcular.',
      'Tempo: mantenha só a malha de 50% e de 25% e os problemas 2 e 4.',
      'Sem dispositivos: o jogo vira um jogo de memória com cartões de papel feito em grupos de quatro.',
    ],
    skills: [
      'Associar representações de porcentagem (10%, 25%, 50%, 75% e 100%) a frações e à ideia de décima parte, quarta parte, metade e inteiro.',
      'Resolver problemas de cálculo de porcentagens simples em contextos do cotidiano.',
      'Reconhecer frações equivalentes por meio de representações visuais.',
    ],
    modes: ['experimentar', 'jogar', 'fora-da-tela'],
    artId: 'subj-matematica',
    tags: ['frações', 'porcentagem', 'malha quadriculada', 'anos iniciais', 'material concreto'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Ciências ─────────────────────────
  {
    id: 'aula-como-abastecer-uma-cidade',
    title: 'Como abastecer uma cidade?',
    summary:
      'Em um laboratório virtual, grupos precisam garantir energia elétrica para uma cidade fictícia, comparando fontes renováveis e não renováveis, seus custos e impactos ambientais e sociais.',
    subjects: ['ciencias'],
    etapa: 'fundamental2',
    anos: [8],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º ano que estudam fontes e transformações de energia.',
    objectives: [
      'Classificar fontes de energia em renováveis e não renováveis.',
      'Comparar vantagens e desvantagens de usinas hidrelétricas, termelétricas, eólicas e solares.',
      'Propor e justificar uma combinação de fontes para abastecer uma cidade fictícia.',
    ],
    materials: [
      'Projetor ou computador',
      'Fichas das fontes de energia (impressas)',
      'Folha de planejamento "Matriz da nossa cidade"',
      'Conta de luz (pode ser fotocópia, com dados pessoais cobertos) para observar o consumo em kWh',
    ],
    resources: ['projetor', 'dispositivos-grupo', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'De onde vem a luz desta sala?',
        minutes: 5,
        instructions:
          'Aponte para a lâmpada e pergunte: "Qual o caminho da energia até aqui?". Desenhe no quadro a cadeia que a turma sugerir (usina → linhas de transmissão → bairro → escola) e deixe lacunas para completar ao longo da aula.',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Fontes renováveis e não renováveis',
        minutes: 10,
        instructions:
          'Apresente as fichas das fontes: hidrelétrica, solar, eólica, biomassa (renováveis); termelétrica a carvão, gás natural ou derivados de petróleo e nuclear (não renováveis). Explique que, no Brasil, a maior parte da eletricidade vem de hidrelétricas e que eólica e solar cresceram muito nos últimos anos.',
        teacherNotes:
          'Destaque que "renovável" não significa "sem impacto": hidrelétricas alagam grandes áreas e podem deslocar comunidades ribeirinhas e indígenas; parques eólicos também afetam paisagens e comunidades. Evite números exatos da matriz se não tiver uma fonte atualizada à mão.',
      },
      {
        id: 'b3',
        kind: 'experimento',
        title: 'Laboratório: abastecendo a cidade',
        minutes: 18,
        instructions:
          'Em grupos, os estudantes usam o laboratório virtual para montar o abastecimento da cidade. Cada grupo registra: fontes escolhidas, o que acontece à noite e em períodos de seca ou sem vento, custo e impactos. Peça pelo menos duas tentativas diferentes.',
        resourceRef: { type: 'simulation', id: 'laboratorio' },
        offlineAlternative:
          'Use as fichas impressas: cada fonte tem "pontos de energia", "custo" e "impacto" (fictícios). A cidade precisa de 100 pontos de energia; os grupos combinam fichas e discutem o que acontece à noite (sem solar) e na seca (menos hidrelétrica).',
        teacherNotes:
          'Provoque com eventos: "Choveu pouco este ano. E agora?" / "São 21h. De onde vem a energia?". A ideia de complementaridade entre fontes é o ponto alto da aula.',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Quiz rápido: cidade sustentável',
        minutes: 8,
        instructions:
          'Projete o quiz e resolvam em equipes, com uma rodada de discussão de 30 segundos antes de cada resposta. Leia as explicações após cada pergunta.',
        resourceRef: { type: 'game', id: 'quiz-cidade-sustentavel' },
        offlineAlternative:
          'Leia as perguntas em voz alta; as equipes respondem levantando cartões A, B, C ou D feitos de papel.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Defesa da matriz',
        minutes: 9,
        instructions:
          'Cada grupo apresenta em um minuto sua combinação de fontes e um argumento ("escolhemos... porque..., mas o problema é..."). Recolha a folha "Matriz da nossa cidade".',
      },
    ],
    activity: {
      title: 'Matriz da nossa cidade',
      instructions: [
        'Classifique as fontes em renováveis ou não renováveis: solar, eólica, hidrelétrica, biomassa, carvão mineral, gás natural, óleo diesel, nuclear (urânio).',
        'Escolha uma combinação de pelo menos três fontes para a cidade fictícia e explique o papel de cada uma.',
        'Responda: o que garante energia à noite? E num ano de pouca chuva?',
        'Cite um impacto ambiental e um impacto social da sua escolha.',
        'Escreva uma atitude de economia de energia que a escola pode adotar.',
      ],
      answerKey: [
        'Renováveis: solar, eólica, hidrelétrica, biomassa.',
        'Não renováveis: carvão mineral, gás natural, óleo diesel (derivado do petróleo), nuclear (o urânio é um recurso mineral finito).',
        'À noite não há geração solar direta (sem armazenamento em baterias): a energia precisa vir de outras fontes, como hidrelétrica, eólica (se houver vento) ou termelétrica.',
        'Em ano de pouca chuva, os reservatórios baixam e a geração hidrelétrica diminui; costuma-se acionar mais termelétricas, que são mais caras e emitem mais gases de efeito estufa.',
        'Respostas abertas para a combinação: avaliar se há complementaridade entre fontes e se os impactos foram reconhecidos.',
      ],
    },
    observeLearning: [
      'Classifica corretamente as fontes e explica o critério (o recurso se renova em escala de tempo humana?).',
      'Reconhece que fontes renováveis também têm impactos ambientais e sociais.',
      'Usa a ideia de complementaridade (dia/noite, chuva/seca, vento) para justificar a combinação.',
      'Argumenta com dados do laboratório, e não só com preferência pessoal.',
    ],
    adaptations: [
      'Leitura: fichas das fontes com ícones e frases curtas; leitura compartilhada no grupo.',
      'Tempo: dispense o quiz e use os 8 minutos para ampliar a defesa das matrizes.',
      'Sem dispositivos: toda a simulação pode ser feita com as fichas impressas e pontuação no quadro.',
    ],
    skills: [
      'Classificar fontes de energia em renováveis e não renováveis e comparar seus impactos.',
      'Discutir o uso de diferentes tipos de usina e seus efeitos socioambientais.',
      'Propor ações individuais e coletivas para o consumo consciente de energia elétrica.',
    ],
    modes: ['experimentar', 'investigar', 'jogar'],
    artId: 'subj-ciencias',
    tags: ['energia', 'fontes renováveis', 'usinas', 'sustentabilidade', 'cidade'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },
  {
    id: 'aula-misterio-do-rio',
    title: 'O mistério do rio',
    summary:
      'A turma investiga, em uma narrativa interativa, por que a água de um rio urbano mudou de cor. Os estudantes separam evidências de suposições e propõem testes para suas hipóteses.',
    subjects: ['ciencias'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 6º e 7º ano iniciando o trabalho com investigação científica e qualidade da água.',
    objectives: [
      'Diferenciar observação (evidência) de hipótese em uma investigação.',
      'Relacionar sinais de poluição da água (cor, cheiro, espuma, peixes mortos) a possíveis causas, como esgoto não tratado e resíduos.',
      'Propor ações de cuidado com os rios e de cobrança por saneamento.',
    ],
    materials: [
      'Projetor ou computador',
      'Folha "Caderno de investigação"',
      'Dois copos transparentes, água, terra e um pouco de detergente (para demonstração opcional)',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Um rio perto de nós',
        minutes: 5,
        instructions:
          'Pergunte se há rio, córrego ou canal perto da escola ou de casa. Como ele é? Tem cheiro? Tem nome? Anote as respostas como "observações da turma".',
        teacherNotes: 'Muitos córregos urbanos foram canalizados e "sumiram". Se surgir, valorize: é uma ótima pista para pesquisa.',
      },
      {
        id: 'b2',
        kind: 'historia',
        title: 'Narrativa: o mistério do Rio Claro',
        minutes: 18,
        instructions:
          'Projete a história e conduza as escolhas com a turma. Em cada pausa, pergunte: "O que vocês VIRAM?" e "O que vocês ACHAM que está acontecendo?". Registre em duas colunas no quadro: Evidências | Hipóteses.',
        resourceRef: { type: 'story', id: 'rio-claro' },
        offlineAlternative:
          'Leia o roteiro impresso da história, fazendo as pausas e votações em voz alta. As duas colunas no quadro funcionam igualmente.',
        teacherNotes:
          'Quando alguém afirmar uma causa sem prova ("foi a fábrica!"), pergunte: "Que evidência temos disso? Como poderíamos testar?". Isso é o coração da aula.',
      },
      {
        id: 'b3',
        kind: 'experimento',
        title: 'Demonstração: o que a gente vê e o que não vê',
        minutes: 7,
        instructions:
          'Mostre dois copos: um com água limpa e outro com água, um pouco de terra e uma gota de detergente. Pergunte o que mudou. Depois explique que muitos poluentes são invisíveis: água transparente nem sempre é água própria para beber.',
        teacherNotes: 'Não beba nem peça que provem a água. Reforce que só análises em laboratório confirmam se a água é potável.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Caderno de investigação',
        minutes: 15,
        instructions:
          'Em duplas, os estudantes classificam as frases da folha em evidência ou hipótese e, para uma hipótese, escrevem um teste possível. Corrija as classificações coletivamente.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Uma ação pelo rio',
        minutes: 5,
        instructions:
          'Cada estudante escreve num papel uma ação possível (pessoal, da escola ou do poder público) para cuidar de um rio. Leia algumas e agrupe por tipo.',
      },
    ],
    activity: {
      title: 'Caderno de investigação: evidência ou hipótese?',
      instructions: [
        'Classifique cada frase como EVIDÊNCIA (algo observado ou medido) ou HIPÓTESE (uma explicação que ainda precisa ser testada):',
        'a) A água ficou esverdeada perto da ponte.',
        'b) Talvez exista um cano de esgoto despejando no rio.',
        'c) Apareceram peixes mortos na margem na segunda-feira.',
        'd) Pode ser que a chuva tenha arrastado lixo das ruas para o rio.',
        'e) Há espuma branca acumulada perto da curva do rio.',
        'f) Os peixes podem ter morrido por falta de oxigênio na água.',
        'Escolha uma hipótese e escreva como ela poderia ser testada.',
      ],
      answerKey: [
        'a) Evidência. b) Hipótese. c) Evidência. d) Hipótese. e) Evidência. f) Hipótese.',
        'Exemplos de teste: b) percorrer a margem procurando tubulações e comparar amostras de água antes e depois do ponto suspeito; d) comparar a quantidade de lixo antes e depois de dias de chuva; f) medir o oxigênio dissolvido na água com equipamento adequado (análise feita por laboratório ou órgão ambiental).',
        'Explicação: o esgoto não tratado leva muita matéria orgânica e nutrientes ao rio; os microrganismos que decompõem esse material consomem o oxigênio da água, e os peixes podem morrer por falta dele. O excesso de nutrientes também favorece a proliferação de algas, que pode deixar a água esverdeada.',
      ],
    },
    observeLearning: [
      'Separa o que foi observado do que é suposição, usando as palavras "evidência" e "hipótese".',
      'Pergunta "como podemos testar?" diante de uma afirmação sem prova.',
      'Relaciona esgoto sem tratamento à queda de oxigênio e à morte de peixes.',
      'Propõe ações que envolvem diferentes responsáveis (pessoas, escola, poder público).',
    ],
    adaptations: [
      'Leitura: leia em voz alta as frases do caderno; ofereça cartões "E" e "H" para responder sem escrever.',
      'Tempo: classifique apenas as frases a), b), c) e f) e faça o teste oralmente.',
      'Sem dispositivos: a história é lida a partir do roteiro impresso e a demonstração com copos não exige tela.',
    ],
    skills: [
      'Diferenciar observações, evidências e hipóteses em uma investigação científica.',
      'Relacionar a poluição da água a atividades humanas e à falta de saneamento básico.',
      'Propor ações de preservação dos recursos hídricos.',
    ],
    modes: ['historia', 'investigar', 'experimentar'],
    artId: 'subj-ciencias',
    tags: ['água', 'poluição', 'investigação científica', 'hipótese', 'saneamento'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── História ─────────────────────────
  {
    id: 'aula-memorias-afro-brasileiras',
    title: 'Memórias afro-brasileiras: ontem e hoje',
    summary:
      'Uma imersão em memórias, palavras e saberes de matriz africana no Brasil, com foco no protagonismo de pessoas negras na história e no presente, para além da escravidão.',
    subjects: ['historia'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º e 9º ano. Pode ser usada em qualquer época do ano, não apenas em novembro.',
    objectives: [
      'Reconhecer contribuições africanas e afro-brasileiras na língua, na cultura, nos saberes e na organização social do Brasil.',
      'Conhecer trajetórias de pessoas negras que foram protagonistas na história brasileira.',
      'Identificar formas de resistência e de presença afro-brasileira no presente, como as comunidades quilombolas.',
    ],
    materials: [
      'Projetor ou computador',
      'Cartões com palavras de origem africana (caçula, cafuné, quitanda, moleque, cochilar)',
      'Fichas biográficas impressas (Luiz Gama, Maria Firmina dos Reis, André Rebouças, Carolina Maria de Jesus)',
      'Papel para a linha do tempo coletiva',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Palavras que viajaram',
        minutes: 7,
        instructions:
          'Mostre os cartões com as palavras caçula, cafuné, quitanda, moleque e cochilar. Pergunte: "O que elas têm em comum?". Revele que vêm de línguas do grupo banto, faladas por povos africanos trazidos ao Brasil, e que fazem parte do português que falamos todo dia.',
        teacherNotes:
          'Comente que a África é um continente com dezenas de países e centenas de línguas; evite falar de "a cultura africana" como algo único.',
      },
      {
        id: 'b2',
        kind: 'historia',
        title: 'Imersão: memórias afro-brasileiras',
        minutes: 18,
        instructions:
          'Projete a imersão e percorra os capítulos com a turma. Nas escolhas da turma, faça votação e peça justificativas. Ao final de cada capítulo, pergunte: "Quem é protagonista aqui?".',
        resourceRef: { type: 'immersion', id: 'memorias-afro-brasileiras' },
        offlineAlternative:
          'Use o material imprimível da imersão: divida a turma em grupos, cada um lê um capítulo e conta aos colegas o que descobriu.',
        teacherNotes:
          'Cuide para que a escravidão seja apresentada como violência imposta, e não como "característica" das pessoas: use "pessoas escravizadas" em vez de "escravos". Destaque resistências, saberes e conquistas.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Trajetórias em destaque',
        minutes: 15,
        instructions:
          'Em grupos, os estudantes leem uma ficha biográfica e preparam três frases: quem foi, o que fez, por que é importante lembrar. Cada grupo coloca sua personagem na linha do tempo coletiva.',
        teacherNotes:
          'Referências: Luiz Gama (1830–1882), advogado autodidata que libertou centenas de pessoas escravizadas na Justiça; Maria Firmina dos Reis, escritora e professora maranhense do século XIX, autora de "Úrsula" (1859); André Rebouças (1838–1898), engenheiro e abolicionista; Carolina Maria de Jesus (1914–1977), autora de "Quarto de despejo" (1960). Se possível, inclua uma personalidade negra da sua cidade ou região.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Presença hoje',
        minutes: 6,
        instructions:
          'Pergunte: "Onde vemos a presença afro-brasileira hoje no nosso bairro e na nossa cidade?". Mencione as comunidades quilombolas contemporâneas, que existem em todas as regiões do país, e a Lei 10.639/2003, que tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas.',
        teacherNotes: 'Acolha relatos pessoais com respeito e sem expor estudantes. Ninguém deve ser colocado como "representante" de um grupo.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Uma memória para guardar',
        minutes: 4,
        instructions: 'Cada estudante completa: "Uma história que eu não conhecia e que quero contar para alguém é...".',
      },
    ],
    activity: {
      title: 'Trajetórias em destaque',
      instructions: [
        'Leia a ficha biográfica do seu grupo.',
        'Escreva: quem foi essa pessoa, quando e onde viveu.',
        'Escreva: o que ela fez de importante e que obstáculos enfrentou.',
        'Escreva: por que é importante que essa história seja conhecida hoje.',
        'Desenhe um símbolo que represente essa trajetória para a linha do tempo da turma.',
      ],
      answerKey: [
        'Luiz Gama: nasceu em Salvador (BA) em 1830; foi escravizado ilegalmente quando criança, conquistou a liberdade e, como advogado autodidata e jornalista em São Paulo, atuou na libertação de centenas de pessoas escravizadas.',
        'Maria Firmina dos Reis: nasceu em São Luís (MA) no século XIX; professora e escritora, publicou "Úrsula" (1859), considerado um dos primeiros romances abolicionistas do Brasil.',
        'André Rebouças: nasceu em Cachoeira (BA) em 1838; engenheiro responsável por obras de infraestrutura e militante abolicionista.',
        'Carolina Maria de Jesus: nasceu em Sacramento (MG) em 1914; escreveu sobre a vida na favela do Canindé, em São Paulo, no livro "Quarto de despejo" (1960), traduzido para diversos idiomas.',
      ],
    },
    observeLearning: [
      'Usa o termo "pessoas escravizadas" e reconhece a escravidão como violência imposta.',
      'Cita ao menos uma contribuição afro-brasileira na língua, cultura ou ciência.',
      'Explica a importância de uma trajetória biográfica com informações corretas da ficha.',
      'Reconhece a presença afro-brasileira no presente, e não apenas no passado.',
    ],
    adaptations: [
      'Leitura: fichas biográficas em versão resumida, com linha do tempo visual e palavras-chave destacadas.',
      'Tempo: cada grupo apresenta apenas a frase "por que é importante lembrar".',
      'Sem dispositivos: a imersão é trabalhada com o material imprimível, em leitura por grupos.',
    ],
    skills: [
      'Valorizar a história e a cultura afro-brasileira e africana como parte da formação do Brasil.',
      'Analisar formas de resistência à escravidão e trajetórias de protagonismo negro.',
      'Relacionar processos históricos a permanências e mudanças no presente.',
    ],
    modes: ['historia', 'conversar', 'investigar'],
    artId: 'subj-historia',
    tags: ['cultura afro-brasileira', 'relações étnico-raciais', 'Lei 10.639', 'biografias', 'quilombos'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Geografia ─────────────────────────
  {
    id: 'aula-biomas-do-brasil',
    title: 'Biomas do Brasil: seis paisagens, muitas vidas',
    summary:
      'A turma conhece os seis biomas brasileiros, associa cada um às suas características e reflete sobre como os povos que vivem neles convivem com essas paisagens hoje.',
    subjects: ['geografia', 'ciencias'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 6º e 7º ano estudando paisagens e regiões brasileiras.',
    objectives: [
      'Localizar no mapa do Brasil os seis biomas: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pampa e Pantanal.',
      'Associar cada bioma a características de clima, vegetação e importância ambiental.',
      'Reconhecer povos e comunidades que vivem nos biomas e as ameaças que enfrentam.',
    ],
    materials: [
      'Mapa dos biomas brasileiros (projetado ou impresso)',
      'Projetor ou computador',
      'Folha de atividade "Que bioma é este?"',
      'Lápis de cor (seis cores)',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Onde a gente mora, que paisagem é essa?',
        minutes: 5,
        instructions:
          'Pergunte: "Como era a paisagem natural do lugar onde fica a nossa escola, antes das construções?". Ouça hipóteses e mostre o mapa: em qual bioma estamos?',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Mapa dos seis biomas',
        minutes: 12,
        instructions:
          'Com o mapa projetado, apresente cada bioma em uma frase-chave: Amazônia (maior floresta tropical do mundo), Cerrado ("berço das águas", nascentes de grandes rios), Caatinga (único bioma exclusivamente brasileiro, clima semiárido), Mata Atlântica (bioma mais devastado, onde vive a maior parte da população), Pampa (campos do sul, presente no Rio Grande do Sul), Pantanal (uma das maiores áreas úmidas do planeta). Os estudantes colorem o mapa da folha.',
        teacherNotes:
          'Desfaça o estereótipo da Caatinga como "lugar sem vida": ela tem grande biodiversidade, e muitas plantas perdem as folhas na seca para economizar água.',
        offlineAlternative: 'Use o mapa impresso ou desenhe o contorno do Brasil no quadro com as manchas aproximadas dos biomas.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Jogo da memória dos biomas',
        minutes: 13,
        instructions:
          'Projete o jogo e jogue em equipes: cada equipe escolhe duas cartas por vez. Ao formar um par, a equipe lê a explicação em voz alta.',
        resourceRef: { type: 'game', id: 'memoria-biomas' },
        offlineAlternative:
          'Imprima ou escreva cartões (nome do bioma + característica) e jogue em grupos de quatro, sobre a mesa.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Que bioma é este?',
        minutes: 13,
        instructions:
          'Individualmente ou em duplas, os estudantes resolvem a folha de atividade. Depois, discuta: "Quem vive nesses biomas hoje?" (povos indígenas, quilombolas, ribeirinhos, pantaneiros, sertanejos, agricultores, moradores das cidades).',
        teacherNotes:
          'Para aprofundar a presença indígena contemporânea nos biomas, a imersão "Povos indígenas hoje" pode ser usada numa aula seguinte.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Bilhete de saída',
        minutes: 7,
        instructions:
          'Cada estudante responde: "Em que bioma fica a nossa escola? Cite uma característica dele e uma ameaça que ele enfrenta".',
      },
    ],
    activity: {
      title: 'Que bioma é este?',
      instructions: [
        'Leia cada pista e escreva o nome do bioma:',
        '1. Clima semiárido, chuvas irregulares; é o único bioma exclusivamente brasileiro.',
        '2. Maior floresta tropical do mundo, com enorme diversidade de espécies e rios volumosos.',
        '3. Planície que passa parte do ano alagada; uma das maiores áreas úmidas do planeta.',
        '4. Vegetação de árvores baixas e retorcidas e campos; abriga nascentes de importantes bacias hidrográficas.',
        '5. Floresta que se estendia ao longo do litoral; hoje restam pequenas partes da área original.',
        '6. Campos com vegetação rasteira no extremo sul do país, onde a criação de gado é tradicional.',
        'Escolha um bioma e escreva uma ameaça que ele enfrenta e uma forma de protegê-lo.',
      ],
      answerKey: [
        '1. Caatinga. 2. Amazônia. 3. Pantanal. 4. Cerrado. 5. Mata Atlântica. 6. Pampa.',
        'Ameaças possíveis: desmatamento, queimadas, expansão de pastagens e monoculturas sem controle, mineração ilegal, poluição de rios, desertificação (Caatinga).',
        'Formas de proteção possíveis: unidades de conservação, respeito aos territórios indígenas e de comunidades tradicionais, fiscalização, recuperação de áreas degradadas, consumo consciente.',
      ],
    },
    observeLearning: [
      'Localiza corretamente os seis biomas no mapa.',
      'Associa cada bioma a pelo menos uma característica correta.',
      'Supera estereótipos (por exemplo, reconhece a biodiversidade da Caatinga).',
      'Menciona pessoas e comunidades que vivem nos biomas, não apenas plantas e animais.',
    ],
    adaptations: [
      'Leitura: pistas da atividade com imagens de apoio e palavras-chave em negrito.',
      'Tempo: reduza a atividade às pistas 1 a 4 e faça a pergunta da ameaça oralmente.',
      'Sem dispositivos: mapa desenhado no quadro e jogo da memória com cartões de papel.',
    ],
    skills: [
      'Identificar e localizar os biomas brasileiros e suas características naturais.',
      'Relacionar formas de ocupação humana e atividades econômicas às transformações das paisagens.',
      'Reconhecer a diversidade de povos e comunidades tradicionais e seus modos de vida.',
    ],
    modes: ['jogar', 'investigar', 'conversar'],
    artId: 'subj-geografia',
    tags: ['biomas', 'paisagem', 'mapa', 'meio ambiente', 'comunidades tradicionais'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Artes ─────────────────────────
  {
    id: 'aula-muros-que-contam-historias',
    title: 'Muros que contam histórias',
    summary:
      'A turma analisa murais e arte urbana como forma de expressão coletiva, discute autoria e espaço público e cria, em grupos, o esboço de um mural sobre a identidade do bairro.',
    subjects: ['artes'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º e 9º ano. Funciona bem como abertura de um projeto de intervenção artística na escola.',
    objectives: [
      'Ler imagens de murais observando cor, composição, escala, símbolos e contexto.',
      'Discutir arte urbana, autoria e uso do espaço público, diferenciando intervenção autorizada de dano ao patrimônio.',
      'Criar coletivamente o esboço de um mural que represente a identidade do bairro.',
    ],
    materials: [
      'Fotos de murais do próprio município ou região (projetadas ou impressas)',
      'Papel kraft ou folhas A3',
      'Lápis, giz de cera, canetinhas ou tinta guache',
      'Fita adesiva',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Caminhada do olhar',
        minutes: 5,
        instructions:
          'Pergunte: "No caminho até a escola, vocês veem desenhos, letras ou pinturas nos muros? O que eles dizem?". Anote no quadro palavras que surgirem (cores, temas, sentimentos).',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Leitura de imagens',
        minutes: 12,
        instructions:
          'Mostre três ou quatro murais, de preferência da sua cidade ou região. Para cada um, conduza a leitura: "O que vocês veem? Que cores predominam? O que está em destaque? Que história o mural conta? Para quem foi feito?".',
        offlineAlternative:
          'Leve fotos impressas ou recortes de jornais e revistas; se não houver, descreva um mural conhecido e peça que a turma desenhe como o imagina antes de comparar.',
        teacherNotes:
          'Prefira murais locais e de artistas que os estudantes possam conhecer. Discuta com respeito as diferentes linguagens (muralismo, grafite, lambe-lambe) sem hierarquizá-las.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'De quem é o muro?',
        minutes: 6,
        instructions:
          'Debata em roda: "Quem pode pintar um muro? Por que muitos murais são feitos com autorização e participação da comunidade?". Ajude a turma a distinguir opinião ("eu acho bonito") de fato ("o mural foi feito com autorização da escola").',
        teacherNotes: 'Mantenha o debate aberto e respeitoso: o objetivo é pensar espaço público e coletivo, não condenar ou exaltar práticas.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Esboço do mural do bairro',
        minutes: 22,
        instructions:
          'Em grupos de quatro, os estudantes listam cinco elementos que representam o bairro (lugares, pessoas, festas, natureza, sons) e criam um esboço em papel A3 ou kraft. Cada grupo define: tema, paleta de cores, elemento principal e título.',
        teacherNotes: 'Lembre que o esboço é um projeto: vale riscar, refazer e anotar ideias nas bordas.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Galeria rápida',
        minutes: 5,
        instructions:
          'Cole os esboços na parede. Cada estudante coloca um bilhete adesivo em um esboço de outro grupo, completando: "O que mais me chamou atenção foi... porque...".',
      },
    ],
    activity: {
      title: 'Projeto de mural: a cara do nosso bairro',
      instructions: [
        'Liste cinco elementos que representam o bairro (lugares, pessoas, festas, natureza, sons, comidas).',
        'Escolha o tema principal do mural e escreva uma frase explicando a mensagem.',
        'Defina a paleta: três ou quatro cores e o motivo da escolha.',
        'Desenhe o esboço indicando o elemento em destaque (maior ou mais central).',
        'Dê um título ao mural e escreva quem participaria da pintura, se ele fosse realizado.',
      ],
    },
    observeLearning: [
      'Descreve murais usando vocabulário de artes visuais (cor, composição, destaque, escala).',
      'Relaciona a obra ao contexto e ao público para quem foi feita.',
      'O esboço tem tema claro, elemento principal e escolhas de cor justificadas.',
      'Comenta o trabalho dos colegas com argumentos e respeito.',
    ],
    adaptations: [
      'Leitura: roteiro de leitura de imagem com ícones (olho = o que vejo; balão = o que penso; ponto de interrogação = o que pergunto).',
      'Tempo: o esboço pode ser iniciado em aula e concluído na aula seguinte.',
      'Sem dispositivos: fotos impressas ou descrição oral dos murais; toda a criação é em papel.',
    ],
    skills: [
      'Analisar elementos constitutivos das artes visuais (cor, forma, composição) em obras de arte urbana.',
      'Relacionar produções artísticas aos contextos sociais e ao espaço público.',
      'Criar projetos de arte coletivos, experimentando processos de criação e esboço.',
    ],
    modes: ['conversar', 'projeto', 'fora-da-tela'],
    artId: 'subj-artes',
    tags: ['muralismo', 'arte urbana', 'leitura de imagem', 'bairro', 'criação coletiva'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Educação Física ─────────────────────────
  {
    id: 'aula-brincadeiras-do-brasil',
    title: 'Brincadeiras do Brasil: criar e recriar regras',
    summary:
      'Aula fora da tela, na quadra ou no pátio: a turma vivencia brincadeiras populares brasileiras, conhece suas origens e cria novas regras para tornar o jogo mais inclusivo.',
    subjects: ['educacao-fisica'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 6º e 7º ano. Pode ser adaptada para os anos iniciais.',
    objectives: [
      'Vivenciar brincadeiras e jogos populares brasileiros, como peteca, pique-bandeira e queimada.',
      'Reconhecer a diversidade de origens das brincadeiras, incluindo as de matriz indígena.',
      'Criar e testar adaptações de regras que aumentem a participação de todos.',
    ],
    materials: [
      'Petecas (ou petecas feitas de jornal, fita e retalhos)',
      'Duas "bandeiras" (coletes, garrafas PET ou panos)',
      'Bolas leves de borracha ou meia',
      'Giz ou cones para marcar o espaço',
    ],
    resources: ['sem-dispositivos', 'sem-internet'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Roda das brincadeiras',
        minutes: 5,
        instructions:
          'Em roda, pergunte: "De que brincadeiras vocês, seus pais ou avós brincavam?". Registre mentalmente os nomes e comente que a mesma brincadeira pode ter nomes diferentes em cada região (pique, pega, mãe da rua).',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Peteca em roda',
        minutes: 10,
        instructions:
          'Em rodas de seis, a turma mantém a peteca no ar batendo com a palma da mão, contando os toques em voz alta. Conte que a peteca tem origem indígena e que o nome vem do tupi (peteka, "bater com a mão").',
        teacherNotes:
          'Desafio cooperativo: bater o recorde da própria roda, não competir com as outras. Se não houver petecas, façam juntos com jornal e fita.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Pique-bandeira',
        minutes: 13,
        instructions:
          'Divida a quadra em dois campos, cada um com uma bandeira no fundo. O objetivo é buscar a bandeira do outro time sem ser pego; quem é pego fica "colado" até ser salvo por um colega do próprio time. Jogue uma rodada com as regras tradicionais.',
        teacherNotes: 'Combine antes: pegar é encostar, não empurrar nem puxar roupa. Segurança em primeiro lugar.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Quem jogou de verdade?',
        minutes: 5,
        instructions:
          'Pare o jogo e pergunte: "Todo mundo participou? Quem ficou parado muito tempo? Que regra poderia mudar isso?". Os grupos propõem uma adaptação (ex.: duas bandeiras por time, quem é salvo precisa dar as mãos, todos precisam tocar a bandeira antes de vencer).',
      },
      {
        id: 'b5',
        kind: 'jogo',
        title: 'Testando as novas regras',
        minutes: 12,
        instructions:
          'Jogue pique-bandeira ou queimada com a adaptação mais votada. Observe se a participação aumentou.',
        teacherNotes: 'Uma boa variação de queimada inclusiva: quem é "queimado" vai para o campo adversário e continua jogando do outro lado.',
      },
      {
        id: 'b6',
        kind: 'avaliacao',
        title: 'Volta à calma e avaliação',
        minutes: 5,
        instructions:
          'Alongamento em roda. Cada estudante diz em uma palavra como se sentiu e se a nova regra melhorou o jogo. Peça que perguntem em casa sobre uma brincadeira antiga para a próxima aula.',
      },
    ],
    activity: {
      title: 'Ficha de criação de regras',
      instructions: [
        'Nome da brincadeira escolhida pelo grupo.',
        'Como ela é jogada hoje (regras principais).',
        'Um problema que observamos (quem fica de fora, quem joga pouco, risco de lesão).',
        'Nossa regra nova e por que ela resolve o problema.',
        'Depois de testar: a regra funcionou? O que ajustaríamos?',
      ],
    },
    observeLearning: [
      'Participa das brincadeiras respeitando os combinados de segurança.',
      'Identifica situações de exclusão no jogo e propõe mudanças de regra.',
      'Coopera com o grupo nos desafios coletivos (peteca em roda).',
      'Reconhece a origem indígena da peteca e a diversidade regional das brincadeiras.',
    ],
    adaptations: [
      'Leitura: a ficha de regras pode ser respondida oralmente e registrada por um colega ou pelo professor.',
      'Tempo: escolha apenas uma brincadeira principal (pique-bandeira) e use o restante do tempo para a recriação de regras.',
      'Sem dispositivos: a aula é toda fora da tela. Para estudantes com mobilidade reduzida, adapte com regras como "pegar com a bola" e funções de juiz, guardião da bandeira ou salvador com tempo próprio.',
    ],
    skills: [
      'Experimentar e fruir brincadeiras e jogos populares do Brasil, reconhecendo suas origens.',
      'Planejar e utilizar estratégias para resolver desafios em jogos, de forma cooperativa.',
      'Recriar regras de jogos para promover a participação de todos com segurança.',
    ],
    modes: ['fora-da-tela', 'jogar', 'conversar'],
    artId: 'subj-educacao-fisica',
    tags: ['brincadeiras populares', 'peteca', 'jogos cooperativos', 'inclusão', 'fora da tela'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Inglês ─────────────────────────
  {
    id: 'aula-around-my-neighborhood',
    title: 'Around my neighborhood: there is / there are',
    summary:
      'Os estudantes aprendem nomes de lugares da cidade em inglês, usam "there is / there are" e preposições de lugar para descrever um bairro fictício e, depois, o próprio bairro.',
    subjects: ['ingles'],
    etapa: 'fundamental2',
    anos: [6],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 6º ano em início de aprendizagem de inglês.',
    objectives: [
      'Reconhecer e pronunciar nomes de lugares da cidade em inglês (school, park, hospital, library, bus stop, bakery, supermarket).',
      'Usar "there is" (singular) e "there are" (plural) para descrever um lugar.',
      'Localizar lugares usando as preposições next to, between, in front of e behind.',
    ],
    materials: [
      'Projetor ou computador (opcional)',
      'Mapa impresso do bairro fictício "Sunny Street"',
      'Cartões com nomes de lugares em inglês',
      'Folha de atividade',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Words we already know',
        minutes: 5,
        instructions:
          'Pergunte que palavras em inglês os estudantes já veem pela cidade (shopping, delivery, park, fast food). Escreva no quadro e comente que muitas são usadas no português do dia a dia.',
      },
      {
        id: 'b2',
        kind: 'experimento',
        title: 'Passeio pela cidade simulada',
        minutes: 12,
        instructions:
          'Projete a simulação da cidade e "passeie" com a turma. A cada lugar que aparecer (escola, posto de saúde, parque, ponto de ônibus), diga o nome em inglês e peça que repitam. Escreva no quadro: school, health center, park, bus stop, library, bakery, supermarket, hospital.',
        resourceRef: { type: 'simulation', id: 'cidade' },
        offlineAlternative: 'Use os cartões de lugares e o mapa impresso de "Sunny Street", apontando e repetindo os nomes.',
        teacherNotes: 'A simulação está em português: é justamente isso que gera o exercício de tradução e pronúncia. Não é necessário usar as funções de decisão da simulação.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'There is / there are',
        minutes: 10,
        instructions:
          'Escreva no quadro: "There is a park." / "There are two schools.". Pergunte: "Quando usamos is e quando usamos are?". Depois, apresente as preposições com gestos e objetos da sala: next to, between, in front of, behind.',
        teacherNotes: 'Use o próprio corpo e objetos: "The pencil is between the books." Faça perguntas rápidas e peça respostas em coro.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Describing Sunny Street',
        minutes: 15,
        instructions:
          'Em duplas, os estudantes observam o mapa de Sunny Street e resolvem a folha de atividade. Depois, escrevem duas frases sobre o próprio bairro.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Guess the place',
        minutes: 8,
        instructions:
          'Um estudante descreve um lugar do mapa sem dizer o nome ("It is next to the bakery. It is in front of the park.") e a turma adivinha. Repita com três ou quatro estudantes.',
      },
    ],
    activity: {
      title: 'Describing Sunny Street',
      instructions: [
        'Mapa de Sunny Street (descrição): school – bakery – library – supermarket, em linha. Em frente à library há um park com three trees. Atrás da school há two bus stops.',
        'Complete com IS ou ARE:',
        '1. There ___ a school on Sunny Street.',
        '2. There ___ three trees in the park.',
        '3. There ___ a library next to the bakery.',
        '4. There ___ two bus stops behind the school.',
        'Complete com a preposição correta (next to, between, in front of, behind):',
        '5. The bakery is ___ the school and the library.',
        '6. The park is ___ the library.',
        '7. The supermarket is ___ the library.',
        '8. The bus stops are ___ the school.',
        'Escreva duas frases sobre o seu bairro usando there is / there are.',
      ],
      answerKey: [
        '1. is  2. are  3. is  4. are',
        '5. between  6. in front of  7. next to  8. behind',
        'Frases sobre o bairro: respostas pessoais. Verificar concordância (is + singular; are + plural) e uso de artigo (a/an) no singular.',
      ],
    },
    observeLearning: [
      'Pronuncia e reconhece ao menos cinco nomes de lugares da cidade em inglês.',
      'Escolhe corretamente is (singular) ou are (plural).',
      'Usa preposições de lugar para descrever posições no mapa.',
      'Produz frases sobre o próprio bairro com apoio do modelo.',
    ],
    adaptations: [
      'Leitura: mapa com ícones ao lado das palavras em inglês; banco de palavras visível no quadro.',
      'Tempo: mantenha apenas as questões 1 a 6 e a atividade oral "Guess the place".',
      'Sem dispositivos: o passeio é feito com o mapa impresso e cartões de lugares.',
    ],
    skills: [
      'Utilizar vocabulário relativo a lugares da cidade e à vizinhança em língua inglesa.',
      'Empregar a estrutura "there is / there are" para descrever espaços.',
      'Localizar objetos e lugares usando preposições de lugar em interações orais e escritas.',
    ],
    modes: ['conversar', 'experimentar', 'jogar'],
    artId: 'subj-ingles',
    tags: ['vocabulary', 'places in town', 'there is', 'there are', 'prepositions'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },

  // ───────────────────────── Cidadania / Educação midiática ─────────────────────────
  {
    id: 'aula-uma-cidade-muitas-vozes',
    title: 'Uma cidade, muitas vozes',
    summary:
      'A partir de um boato que circula na rádio da escola, a turma aprende a separar fato, opinião e hipótese, checar informações e debater problemas da cidade ouvindo diferentes pontos de vista.',
    subjects: ['politica-cidadania', 'portugues'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'desafiador',
    audience: 'Turmas de 8º e 9º ano. Tema sensível em período eleitoral: a aula é apartidária e não discute candidatos ou partidos.',
    objectives: [
      'Diferenciar fato, opinião e hipótese em mensagens sobre a cidade.',
      'Aplicar passos simples de checagem (fonte, data, evidência, outras fontes) antes de compartilhar uma informação.',
      'Debater uma questão urbana considerando diferentes grupos afetados, com respeito à divergência.',
    ],
    materials: [
      'Projetor ou computador',
      'Folha "Fato, opinião ou hipótese?"',
      'Cartões de papéis sociais (moradora idosa, comerciante, estudante, motorista de ônibus, agente de saúde, ciclista)',
    ],
    resources: ['projetor', 'computador-unico', 'dispositivos-grupo', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Você compartilharia?',
        minutes: 5,
        instructions:
          'Leia em voz alta uma mensagem fictícia: "URGENTE!!! A praça do bairro vai virar estacionamento semana que vem. Repassem!". Pergunte: "Vocês compartilhariam? O que precisariam saber antes?". Anote as perguntas da turma.',
        teacherNotes: 'A mensagem é inventada para a aula; deixe isso claro ao final para não gerar boato real.',
      },
      {
        id: 'b2',
        kind: 'historia',
        title: 'Narrativa: boatos na rádio da escola',
        minutes: 15,
        instructions:
          'Projete a história da rádio escolar e conduza as decisões com a turma. Em cada notícia que chega à redação, pergunte: "Isso é fato, opinião ou hipótese? Qual é a fonte?".',
        resourceRef: { type: 'story', id: 'radio-escola' },
        offlineAlternative:
          'Leia o roteiro impresso como uma radionovela: dois ou três estudantes leem as falas das personagens e a turma vota as decisões.',
        teacherNotes: 'Mostre que checar não é "desconfiar de tudo", e sim procurar evidências e fontes responsáveis.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Classificação: fato ou opinião?',
        minutes: 8,
        instructions:
          'Em grupos, os estudantes jogam a classificação de frases. Ao final, discuta os itens em que houve mais erros.',
        resourceRef: { type: 'game', id: 'classificacao-fato-opiniao' },
        offlineAlternative: 'Resolvam juntos a primeira parte da folha "Fato, opinião ou hipótese?", com votação por cartões coloridos.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Muitas vozes: a praça do bairro',
        minutes: 17,
        instructions:
          'Distribua os cartões de papéis sociais. Proposta fictícia em debate: "Transformar parte da praça em ponto de ônibus coberto". Cada grupo prepara, a partir do seu papel, um fato que considera importante, uma opinião e uma pergunta para os outros grupos. Faça uma roda de falas de um minuto por grupo.',
        resourceRef: { type: 'simulation', id: 'cidade' },
        offlineAlternative: 'Desenhe a praça no quadro com os equipamentos citados e conduza o debate apenas com os cartões de papéis.',
        teacherNotes:
          'Combine regras: falar do argumento, não da pessoa; esperar a vez; pedir evidência com respeito ("de onde vem esse dado?"). Não há resposta certa sobre a proposta: avalie a qualidade da argumentação, não a posição.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Antes de compartilhar, eu...',
        minutes: 5,
        instructions:
          'Cada estudante escreve seus três passos pessoais de checagem. Volte à mensagem do início: agora, o que a turma faria com ela?',
      },
    ],
    activity: {
      title: 'Fato, opinião ou hipótese?',
      instructions: [
        'Classifique cada frase como FATO (pode ser verificado), OPINIÃO (expressa um juízo ou preferência) ou HIPÓTESE (possível explicação ou previsão que precisa ser testada):',
        'a) A praça do bairro tem quatro bancos quebrados, segundo a contagem feita pela turma.',
        'b) A praça é o lugar mais bonito do bairro.',
        'c) Se a praça tiver mais iluminação, talvez mais famílias passem a usá-la à noite.',
        'd) O posto de saúde funciona das 7h às 17h, conforme o cartaz na entrada.',
        'e) Acho que a escola deveria abrir a quadra nos fins de semana.',
        'f) Pode ser que o lixo acumulado na esquina esteja ligado ao horário da coleta.',
        'g) O bairro tem a melhor feira da cidade.',
        'Para uma das hipóteses, escreva como a turma poderia investigá-la.',
        'Escreva três passos que você seguirá antes de compartilhar uma notícia.',
      ],
      answerKey: [
        'a) Fato. b) Opinião. c) Hipótese. d) Fato. e) Opinião. f) Hipótese. g) Opinião.',
        'Investigação possível para c): comparar o movimento da praça à noite antes e depois da instalação de iluminação, ou observar praças semelhantes com e sem iluminação. Para f): anotar os dias e horários da coleta e observar quando o lixo se acumula.',
        'Passos de checagem esperados: verificar a fonte (quem publicou?), a data (é atual?), a evidência (há dados, documentos, imagens com contexto?) e se outras fontes confiáveis confirmam; desconfiar de mensagens alarmistas que pedem para "repassar".',
      ],
    },
    observeLearning: [
      'Classifica frases em fato, opinião e hipótese e justifica a classificação.',
      'Pergunta pela fonte e pela data antes de aceitar uma informação.',
      'No debate, apresenta argumentos ligados ao seu papel social e escuta posições diferentes.',
      'Diferencia discordar de uma ideia de desrespeitar a pessoa.',
    ],
    adaptations: [
      'Leitura: frases da atividade lidas em voz alta e cartões coloridos (verde = fato, azul = opinião, amarelo = hipótese) para responder.',
      'Tempo: reduza o debate a três papéis sociais e uma rodada de falas.',
      'Sem dispositivos: história lida como radionovela, classificação na folha e debate com cartões.',
    ],
    skills: [
      'Distinguir fato, opinião e hipótese em textos e mensagens que circulam nas mídias.',
      'Avaliar a confiabilidade de informações, verificando fonte, data e evidências.',
      'Participar de debates sobre questões de interesse público, respeitando a pluralidade de pontos de vista.',
    ],
    modes: ['historia', 'jogar', 'conversar'],
    artId: 'subj-politica-cidadania',
    tags: ['educação midiática', 'desinformação', 'fato e opinião', 'debate', 'cidadania'],
    origin: 'biblioteca',
    createdAt: CREATED,
    updatedAt: CREATED,
  },
];
