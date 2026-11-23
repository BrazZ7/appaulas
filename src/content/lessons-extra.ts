import type { Lesson } from '../types/models';

/**
 * Aulas extras da biblioteca do Ensinaê (24 aulas: 2 por componente, anos iniciais e anos finais).
 * - Códigos BNCC omitidos de propósito: as habilidades estão descritas em palavras (ver `skills`).
 * - Preços, salários e dados numéricos dos exemplos são fictícios e estão sinalizados.
 * - Em cada aula, a soma dos minutos dos blocos é igual a `durationMin`.
 */

const D = '2026-11-23';

export const LESSONS_EXTRA: Lesson[] = [
  // ───────────────────────── Português ─────────────────────────
  {
    id: 'x-por-parlendas-trava-linguas',
    title: 'Parlendas e trava-línguas: brincando com os sons',
    summary:
      'A turma brinca com parlendas e trava-línguas da tradição oral brasileira, descobre rimas e sons repetidos e cria um trava-língua coletivo para o mural da sala.',
    subjects: ['portugues'],
    etapa: 'fundamental1',
    anos: [1, 2],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 1º e 2º ano em processo de alfabetização, que já conhecem algumas cantigas e brincadeiras de roda.',
    objectives: [
      'Recitar parlendas e trava-línguas com ritmo, entonação e memória.',
      'Identificar rimas e sons iniciais repetidos (aliteração) em textos da tradição oral.',
      'Criar coletivamente um trava-língua, com o professor como escriba.',
    ],
    materials: [
      'Cartazes com 3 parlendas e 3 trava-línguas em letra bastão',
      'Fichas com figuras (rato, roupa, rei, sapo, saco, tigre, trigo, prato)',
      'Papel pardo e canetinhas para o mural',
      'Bola leve ou saquinho de areia',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'projetor'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Roda da parlenda',
        minutes: 8,
        instructions:
          'Em roda, recite "Hoje é domingo, pede cachimbo..." batendo palmas no ritmo. Pergunte quem conhece outra parlenda aprendida com a família. Recitem juntos duas ou três que as crianças trouxerem.',
        teacherNotes:
          'Valorize as versões regionais: a mesma parlenda muda de uma cidade para outra. Não existe versão "errada".',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Batata-quente das rimas',
        minutes: 10,
        instructions:
          'A bola passa de mão em mão enquanto a turma recita uma parlenda. Quem estiver com a bola no fim diz uma palavra que rime com a última palavra recitada (ex.: "pão" → "mão", "chão").',
        teacherNotes: 'Aceite rimas imperfeitas e peça ajuda à turma quando alguém travar; ninguém "sai" do jogo.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Desafio do trava-língua',
        minutes: 12,
        instructions:
          'Mostre o cartaz "O rato roeu a roupa do rei de Roma". Leiam devagar apontando cada palavra, depois cada vez mais rápido. Pergunte: "Que som aparece muitas vezes?". Circule com a turma as letras R iniciais. Repita com "Três pratos de trigo para três tigres tristes".',
        offlineAlternative: 'Se não houver cartaz, escreva no quadro em letra bastão e use as fichas com figuras como apoio.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Nosso trava-língua',
        minutes: 15,
        instructions:
          'Escolham juntos um som (ex.: P ou S). A turma sugere palavras com esse som e o professor registra no papel pardo. Montem uma frase engraçada com 5 a 7 palavras. Cada criança ilustra uma parte para o mural.',
        teacherNotes: 'Você é o escriba: escreva em voz alta, sílaba por sílaba, chamando atenção para a letra inicial.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Apresentação relâmpago',
        minutes: 5,
        instructions:
          'Pequenos grupos recitam o trava-língua da turma o mais rápido que conseguirem sem errar. Pergunte a cada grupo: "Qual palavra tem o mesmo som do começo de ___?".',
      },
    ],
    activity: {
      title: 'Caça-sons do trava-língua',
      instructions: [
        'Ouça o trava-língua que a professora ou o professor vai ler.',
        'Pinte as figuras cujo nome começa com o mesmo som do trava-língua.',
        'Ligue as palavras que rimam: PÃO, SAPATO, MÃO, GALO, PATO, RALO.',
        'Desenhe uma coisa que comece com o som que você mais gostou.',
      ],
      answerKey: ['Rimas: PÃO–MÃO; SAPATO–PATO; GALO–RALO.'],
    },
    observeLearning: [
      'Recita com ritmo e acompanha o texto apontando palavras.',
      'Percebe e nomeia o som repetido no trava-língua.',
      'Sugere palavras que rimam ou que começam com o mesmo som.',
      'Participa da criação coletiva com ideias e ilustração.',
    ],
    adaptations: [
      'TEA: antecipe a sequência da aula com um quadro de rotina ilustrado; ofereça a opção de bater o ritmo em vez de recitar em voz alta, e evite a pressão de velocidade no desafio final.',
      'TDAH: dê papéis ativos (segurar o cartaz, passar a bola, marcar as letras) e alterne momentos sentados e de movimento a cada 10 minutos.',
      'Deficiência auditiva: use gestos marcados para o ritmo, apoio visual com figuras e, se a turma tiver estudante surdo, envolva o intérprete de Libras na brincadeira de rimas visuais.',
    ],
    skills: [
      'Identificar e reproduzir textos da tradição oral, como parlendas e trava-línguas, com ritmo e entonação.',
      'Perceber semelhanças e diferenças sonoras entre palavras (rimas e sons iniciais).',
      'Participar da produção coletiva de textos, tendo o professor como escriba.',
    ],
    modes: ['jogar', 'fora-da-tela', 'conversar'],
    artId: 'subj-portugues',
    tags: ['parlendas', 'trava-línguas', 'consciência fonológica', 'rimas', 'tradição oral', 'alfabetização'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-por-detetives-da-noticia',
    title: 'Detetives da notícia: fato, opinião e boato',
    summary:
      'A turma investiga manchetes de um "grupo de mensagens" fictício, separa fato de opinião, checa fontes e reescreve um boato como notícia verificada.',
    subjects: ['portugues'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º e 9º ano que usam aplicativos de mensagens e redes sociais e já conhecem a estrutura básica da notícia.',
    objectives: [
      'Diferenciar fato, opinião e boato em textos jornalísticos e em mensagens de redes sociais.',
      'Aplicar um roteiro de checagem (fonte, data, autoria, evidência, outras fontes) antes de compartilhar uma informação.',
      'Reescrever um boato como notícia, com lide e indicação de fonte.',
    ],
    materials: [
      'Cartões com 8 mensagens fictícias de um "grupo da escola"',
      'Folha do roteiro de checagem',
      'Projetor (opcional) para mostrar exemplos de agências de checagem',
      'Carimbos ou adesivos: FATO, OPINIÃO, BOATO',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Você já repassou algo que não era verdade?',
        minutes: 5,
        instructions:
          'Pergunte, sem pedir nomes: "Alguém da família já recebeu uma mensagem que parecia verdade e depois descobriu que era falsa?". Anote no quadro as pistas que fizeram as pessoas desconfiarem.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Carimbo: fato, opinião ou boato?',
        minutes: 12,
        instructions:
          'Distribua os cartões com mensagens fictícias aos grupos. Cada grupo carimba cada mensagem como FATO (pode ser verificado), OPINIÃO (expressa juízo ou gosto) ou BOATO (afirma algo sem fonte ou com fonte inventada) e justifica por escrito em uma linha.',
        teacherNotes:
          'Atenção: uma mensagem pode misturar fato e opinião. Incentive os grupos a sublinhar a parte que é fato e a parte que é opinião.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'Roteiro do detetive',
        minutes: 10,
        instructions:
          'Apresente o roteiro de checagem em 5 perguntas: Quem disse? Quando? Onde foi publicado? Que evidência apresenta? Outras fontes confiáveis dizem o mesmo? Aplique o roteiro coletivamente a uma das mensagens.',
        offlineAlternative:
          'Sem internet, a checagem em outras fontes é simulada: o professor tem um "arquivo de jornais" impresso (2 ou 3 recortes fictícios) que os grupos podem consultar.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Do boato à notícia',
        minutes: 18,
        instructions:
          'Cada grupo escolhe um boato e o reescreve como notícia verificada: título informativo, lide (o quê, quem, quando, onde, como, por quê) e indicação da fonte. Se o boato for falso, a notícia informa que ele foi checado e desmentido.',
        teacherNotes: 'Retome as marcas de linguagem da notícia: terceira pessoa, verbos no passado, ausência de adjetivos opinativos.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Manchete de saída',
        minutes: 5,
        instructions:
          'Cada estudante escreve, em uma tira de papel, uma regra pessoal para antes de compartilhar uma informação. Leiam algumas em voz alta e montem um cartaz "Antes de repassar".',
      },
    ],
    activity: {
      title: 'Ficha do detetive da notícia',
      instructions: [
        'Leia a mensagem: "URGENTE!!! A partir de segunda as aulas vão terminar às 10h por causa do calor. Minha tia que trabalha na prefeitura falou. Repassem!"',
        'Classifique: é fato, opinião ou boato? Justifique.',
        'Responda às 5 perguntas do roteiro de checagem.',
        'Indique duas pistas de linguagem que geram desconfiança.',
        'Reescreva a informação como uma notícia curta (título + lide), considerando que a Secretaria de Educação informou que não houve mudança de horário.',
      ],
      answerKey: [
        'Classificação: boato — afirma um fato sem fonte verificável ("minha tia").',
        'Pistas: letras maiúsculas e excesso de exclamações, apelo à urgência, pedido para repassar, fonte vaga, ausência de data e de documento oficial.',
        'Exemplo de notícia: "Horário das aulas continua o mesmo, informa Secretaria de Educação. Mensagem que circulou em grupos nesta semana dizia que as aulas terminariam às 10h por causa do calor. Em nota, a Secretaria afirmou que não há mudança prevista."',
      ],
    },
    observeLearning: [
      'Justifica a classificação usando critérios (verificabilidade, fonte, marcas de opinião).',
      'Aplica o roteiro de checagem sem precisar de ajuda a cada pergunta.',
      'A notícia reescrita tem título informativo, lide completo e fonte indicada.',
      'Demonstra atitude crítica e responsável sobre compartilhar informações.',
    ],
    adaptations: [
      'TDAH: entregue os cartões em lotes de 2 ou 3, com um cronômetro visível, e dê ao estudante o papel de "carimbador" do grupo.',
      'TEA: deixe os critérios de classificação impressos em uma tabela com exemplos; explique que boatos podem usar exageros e ironia e ajude a interpretar esses trechos.',
      'Leitura: ofereça versões das mensagens em fonte ampliada e leia em voz alta para o grupo quando necessário.',
    ],
    skills: [
      'Distinguir fato de opinião em textos jornalísticos e em publicações digitais.',
      'Avaliar a confiabilidade de fontes e checar informações antes de compartilhá-las.',
      'Produzir notícia considerando a estrutura do gênero (título, lide, fonte) e a linguagem impessoal.',
    ],
    modes: ['investigar', 'jogar', 'conversar'],
    artId: 'subj-portugues',
    tags: ['fake news', 'checagem', 'notícia', 'fato e opinião', 'educação midiática'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Matemática ─────────────────────────
  {
    id: 'x-mat-bolo-de-fuba-medidas',
    title: 'Cozinha matemática: a receita do bolo de fubá',
    summary:
      'Usando uma receita de bolo de fubá, a turma compara medidas caseiras e padronizadas, dobra e reduz a receita pela metade e resolve problemas de proporção simples.',
    subjects: ['matematica'],
    etapa: 'fundamental1',
    anos: [4, 5],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 4º e 5º ano que já fazem multiplicações e divisões simples e conhecem as unidades litro e grama.',
    objectives: [
      'Relacionar medidas caseiras (xícara, colher) a unidades padronizadas (mL e g).',
      'Dobrar e reduzir à metade as quantidades de uma receita.',
      'Resolver problemas envolvendo proporcionalidade em contexto do cotidiano.',
    ],
    materials: [
      'Receita impressa do bolo de fubá (uma por grupo)',
      'Copo medidor, xícara e colheres (se possível)',
      'Embalagens vazias de fubá, açúcar e leite (para ler as unidades)',
      'Folha da atividade',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Que bolo tem na sua casa?',
        minutes: 5,
        instructions:
          'Pergunte quem já ajudou a fazer bolo e como a família mede os ingredientes. Conte que o milho, base do fubá, foi domesticado por povos indígenas da América há milhares de anos e está presente na cozinha brasileira até hoje.',
      },
      {
        id: 'b2',
        kind: 'experimento',
        title: 'Quanto cabe numa xícara?',
        minutes: 12,
        instructions:
          'Com o copo medidor, mostre que uma xícara de chá tem cerca de 240 mL. Os grupos leem nas embalagens as quantidades (g, kg, mL, L) e registram em uma tabela. Pergunte: "Por que a receita usa xícara e o mercado usa grama?".',
        offlineAlternative:
          'Sem utensílios, use a tabela impressa de equivalências (1 xícara ≈ 240 mL; 1 colher de sopa ≈ 15 mL) e as embalagens vazias.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Receita para a turma toda',
        minutes: 15,
        instructions:
          'A receita rende 12 pedaços. Os grupos calculam quanto de cada ingrediente é preciso para 24 pedaços (dobro) e para 6 pedaços (metade). Registram em uma tabela de três colunas.',
        teacherNotes:
          'Os ovos são um bom desafio: metade de 3 ovos é 1 ovo e meio. Discuta soluções reais (usar 1 ovo grande, ou 2 ovos pequenos).',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Corrida das proporções',
        minutes: 13,
        instructions:
          'Leia problemas rápidos ("Para 36 pedaços, quantas xícaras de fubá?"). Os grupos respondem no quadrinho ou na folha e levantam a placa. Cada acerto vale um ponto; quem errar explica o raciocínio e a turma ajuda a corrigir.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Bilhete para a cozinha',
        minutes: 5,
        instructions:
          'Cada estudante escreve uma frase explicando como fez para dobrar a receita e uma dúvida que ainda tem.',
      },
    ],
    activity: {
      title: 'Bolo de fubá em três tamanhos',
      instructions: [
        'Receita para 12 pedaços: 2 xícaras de fubá, 1 xícara de farinha de trigo, 2 xícaras de açúcar, 1 xícara de leite, 1/2 xícara de óleo, 4 ovos e 1 colher de sopa de fermento.',
        'Complete a tabela com as quantidades para 6 pedaços e para 24 pedaços.',
        'Se 1 xícara de leite tem 240 mL, quantos mL de leite vão na receita para 24 pedaços?',
        'Para uma festa com 36 pedaços, quantas xícaras de açúcar serão necessárias?',
      ],
      answerKey: [
        '6 pedaços: 1 xícara de fubá, 1/2 de farinha, 1 de açúcar, 1/2 de leite, 1/4 de óleo, 2 ovos, 1/2 colher de fermento.',
        '24 pedaços: 4 xícaras de fubá, 2 de farinha, 4 de açúcar, 2 de leite, 1 de óleo, 8 ovos, 2 colheres de fermento.',
        'Leite para 24 pedaços: 2 × 240 = 480 mL.',
        '36 pedaços (triplo): 6 xícaras de açúcar.',
      ],
    },
    observeLearning: [
      'Relaciona xícara e colher a mL usando a tabela de equivalência.',
      'Dobra e reduz à metade quantidades, inclusive com frações simples (1/2, 1/4).',
      'Explica o raciocínio proporcional ("se dobra os pedaços, dobra tudo").',
      'Propõe soluções razoáveis para quantidades "quebradas" (meio ovo).',
    ],
    adaptations: [
      'TDAH: atribua papéis no grupo (medidor, leitor de embalagens, registrador) e use o cronômetro visível na corrida das proporções.',
      'TEA: entregue a tabela já com as colunas desenhadas e exemplos preenchidos; avise antes que haverá barulho e movimento no jogo.',
      'Dificuldade em cálculo: permita o uso de material concreto (copos e tampinhas) para representar as xícaras.',
    ],
    skills: [
      'Resolver problemas envolvendo medidas de capacidade e massa, com unidades usuais.',
      'Resolver problemas que envolvem a ideia de proporcionalidade (dobro, metade, triplo).',
      'Representar quantidades fracionárias simples em situações do cotidiano.',
    ],
    modes: ['experimentar', 'jogar', 'fora-da-tela'],
    artId: 'subj-matematica',
    tags: ['medidas', 'proporção', 'receita', 'frações', 'cotidiano'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-mat-estatistica-campeonato',
    title: 'Estatística do campeonato: média, moda e mediana',
    summary:
      'Com dados fictícios de um campeonato interclasses, a turma calcula média, moda e mediana, monta gráficos e decide qual medida representa melhor cada situação.',
    subjects: ['matematica'],
    etapa: 'fundamental2',
    anos: [7, 8],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º e 8º ano que já leem tabelas e gráficos de barras e operam com decimais.',
    objectives: [
      'Calcular média aritmética, moda e mediana de um conjunto de dados.',
      'Construir gráfico de barras ou de colunas a partir de uma tabela.',
      'Argumentar qual medida de tendência central representa melhor um conjunto de dados.',
    ],
    materials: [
      'Tabela impressa com dados fictícios do campeonato (gols por jogo, público por partida)',
      'Papel quadriculado, régua e lápis de cor',
      'Calculadora (opcional)',
    ],
    resources: ['sem-dispositivos', 'impressora', 'projetor'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Quem é o artilheiro "típico"?',
        minutes: 5,
        instructions:
          'Pergunte: "Se um time fez 0, 1, 1, 2 e 11 gols em cinco jogos, quantos gols ele faz normalmente?". Deixe a turma propor respostas e anote todas no quadro.',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Três jeitos de resumir dados',
        minutes: 12,
        instructions:
          'Usando o exemplo da pergunta, calcule com a turma: média (soma ÷ quantidade = 3), moda (valor mais frequente = 1) e mediana (valor do meio na lista ordenada = 1). Discuta por que a média ficou "puxada" pelo jogo de 11 gols.',
        teacherNotes: 'Mostre a mediana com quantidade par de dados também: média dos dois valores centrais.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Analistas do interclasses',
        minutes: 20,
        instructions:
          'Em grupos, os estudantes recebem a tabela fictícia do campeonato, calculam as três medidas para os gols de cada time e constroem um gráfico de colunas no papel quadriculado.',
        offlineAlternative: 'Sem calculadora, os grupos dividem as contas entre os integrantes e conferem uns dos outros.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Debate dos analistas',
        minutes: 8,
        instructions:
          'Cada grupo apresenta em 1 minuto: "Qual medida descreve melhor o nosso time e por quê?". A turma avalia se o argumento usa os dados.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Desafio relâmpago',
        minutes: 5,
        instructions:
          'Projete ou escreva: "Público de 5 jogos: 40, 45, 50, 45, 320". Cada estudante calcula a moda e a mediana e escreve se a média seria uma boa medida.',
      },
    ],
    activity: {
      title: 'Relatório do analista (dados fictícios)',
      instructions: [
        'Gols do Time Azul em 6 jogos: 2, 3, 0, 3, 1, 3.',
        'Gols do Time Verde em 6 jogos: 0, 1, 0, 9, 1, 1.',
        'Calcule média, moda e mediana para cada time.',
        'Construa um gráfico de colunas com os gols por jogo dos dois times.',
        'Responda: qual time é mais regular? Qual medida mostra isso melhor?',
      ],
      answerKey: [
        'Azul: soma 12, média 2; moda 3; dados ordenados 0,1,2,3,3,3 → mediana (2+3)/2 = 2,5.',
        'Verde: soma 12, média 2; moda 1; dados ordenados 0,0,1,1,1,9 → mediana 1.',
        'O Time Azul é mais regular. As médias são iguais, mas a mediana e a moda mostram que o Verde costuma fazer poucos gols e teve um jogo fora do padrão.',
        'Desafio relâmpago: moda 45; mediana 45; a média (100) não representa bem por causa do valor 320.',
      ],
    },
    observeLearning: [
      'Calcula corretamente as três medidas, inclusive a mediana com quantidade par de dados.',
      'Constrói gráfico com título, eixos nomeados e escala adequada.',
      'Reconhece que valores extremos afetam a média mais do que a mediana.',
      'Argumenta com base nos dados, e não apenas na torcida.',
    ],
    adaptations: [
      'TDAH: divida a análise em etapas com checklist (ordenar → somar → dividir → contar repetidos) e permita marcar cada etapa concluída.',
      'TEA: forneça um modelo resolvido de outro conjunto de dados e combine antecipadamente o momento de falar no debate.',
      'Discalculia: permita calculadora e papel quadriculado com escala já marcada.',
    ],
    skills: [
      'Calcular e interpretar medidas de tendência central (média, moda e mediana).',
      'Construir e interpretar gráficos de colunas a partir de tabelas.',
      'Avaliar a adequação de diferentes medidas para representar um conjunto de dados.',
    ],
    modes: ['investigar', 'conversar'],
    artId: 'subj-matematica',
    tags: ['estatística', 'média', 'moda', 'mediana', 'gráficos', 'esporte'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Ciências ─────────────────────────
  {
    id: 'x-cie-feijao-detetive',
    title: 'Feijão detetive: do que a semente precisa para germinar?',
    summary:
      'A turma levanta hipóteses, monta um experimento com feijões em condições diferentes (com e sem água, luz e calor) e cria um diário de observação para acompanhar a germinação.',
    subjects: ['ciencias'],
    etapa: 'fundamental1',
    anos: [2, 3],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 2º e 3º ano que estão começando a observar plantas e a registrar observações com desenhos e frases curtas.',
    objectives: [
      'Levantar hipóteses sobre as condições necessárias para a germinação de sementes.',
      'Montar um experimento comparativo alterando apenas uma condição por vez.',
      'Registrar observações em um diário com desenhos, datas e frases.',
    ],
    materials: [
      'Grãos de feijão (4 a 6 por grupo)',
      'Copinhos reutilizados e algodão',
      'Água, etiquetas e caneta',
      'Uma caixa de sapato (para o copo no escuro)',
      'Diário de observação impresso',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'O que tem dentro da semente?',
        minutes: 8,
        instructions:
          'Mostre um feijão seco e um que ficou de molho na véspera. Abra o feijão hidratado com cuidado e mostre o embrião (a "plantinha" escondida). Pergunte: "Do que ela precisa para sair daí?". Anote as hipóteses no quadro.',
        teacherNotes:
          'Comente que agricultoras e agricultores, incluindo povos indígenas e comunidades quilombolas, guardam e selecionam sementes há gerações; esse conhecimento também é ciência de observação.',
      },
      {
        id: 'b2',
        kind: 'experimento',
        title: 'Montando os copos',
        minutes: 15,
        instructions:
          'Cada grupo monta copos com algodão e feijões: copo A (com água, na luz), copo B (sem água, na luz), copo C (com água, dentro da caixa, no escuro). Etiquetem cada copo. Explique que mudamos só uma coisa por vez para descobrir o que faz diferença.',
        teacherNotes: 'Se possível, monte também um copo D com água na geladeira da escola para testar a temperatura.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Primeira página do diário',
        minutes: 12,
        instructions:
          'As crianças desenham os copos no primeiro dia e escrevem (ou ditam) sua previsão: "Acho que o copo ___ vai germinar primeiro porque ___".',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Combinados do cientista',
        minutes: 10,
        instructions:
          'Combinem a rotina de observação: quem rega o copo A e o C, em que horário e como registrar (desenho + data + uma frase). Montem uma escala de responsáveis.',
        offlineAlternative: 'Se a sala não tiver luz natural, use o peitoril da janela do corredor ou de outra sala, combinando com a coordenação.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Aposta científica',
        minutes: 5,
        instructions:
          'Cada criança cola um adesivo no copo que acha que vai germinar primeiro. Expliquem que, em uma semana, vão conferir se a hipótese estava certa e que errar a previsão também ensina.',
      },
    ],
    activity: {
      title: 'Diário do feijão detetive',
      instructions: [
        'Dia 1: desenhe os três copos e escreva sua previsão.',
        'Dias 2 a 7: desenhe o que mudou em cada copo e escreva a data.',
        'Meça com a régua o tamanho do broto quando ele aparecer.',
        'No último dia, responda: de que a semente precisou para germinar?',
      ],
      answerKey: [
        'Resultado esperado: o copo B (sem água) não germina. Os copos A e C germinam, porque a germinação depende principalmente de água e temperatura adequada.',
        'No copo C (escuro), o broto costuma crescer mais comprido, fino e amarelado, procurando luz: a luz é importante para a planta crescer e ficar verde depois de germinar.',
      ],
    },
    observeLearning: [
      'Formula hipóteses e explica o motivo da previsão.',
      'Entende que cada copo testa uma condição diferente.',
      'Registra observações com regularidade, usando desenho e data.',
      'Compara resultados e revê a hipótese inicial.',
    ],
    adaptations: [
      'TEA: crie um quadro visual da rotina diária de observação e mantenha o mesmo horário todos os dias; ofereça luvas a quem se incomodar com a textura do algodão molhado.',
      'TDAH: dê responsabilidades concretas (regador oficial, medidor do broto) e registre as observações em períodos curtos.',
      'Escrita em construção: permita registrar só com desenho e o professor anota a fala da criança.',
    ],
    skills: [
      'Observar e descrever características de plantas e o ciclo de vida desde a semente.',
      'Investigar as condições que influenciam a germinação, realizando experimentos simples.',
      'Registrar observações por meio de desenhos e textos curtos.',
    ],
    modes: ['experimentar', 'investigar', 'fora-da-tela'],
    artId: 'subj-ciencias',
    tags: ['germinação', 'plantas', 'experimento', 'hipótese', 'diário de observação'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-cie-vacinas-defesa-do-corpo',
    title: 'Vacinas: o treino de defesa do corpo',
    summary:
      'Com uma simulação de "invasão" em sala, a turma entende como o sistema imunológico reconhece agentes causadores de doenças, como a vacina "treina" essa defesa e por que a vacinação coletiva protege toda a comunidade.',
    subjects: ['ciencias'],
    etapa: 'fundamental2',
    anos: [7],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º ano que estudam saúde, doenças e políticas públicas de saúde.',
    objectives: [
      'Explicar, de forma simples, como o sistema imunológico reconhece e combate agentes causadores de doenças.',
      'Compreender como a vacina estimula a memória imunológica.',
      'Argumentar sobre a importância da vacinação para a saúde coletiva e o papel do SUS.',
    ],
    materials: [
      'Cartões "invasor" (vírus/bactéria) com formas diferentes',
      'Cartões "anticorpo" com encaixes correspondentes',
      'Fita crepe para demarcar o "corpo" no chão',
      'Cópia de uma caderneta de vacinação de exemplo (sem dados pessoais)',
    ],
    resources: ['sem-dispositivos', 'projetor', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Por que a gente não pega catapora duas vezes?',
        minutes: 5,
        instructions:
          'Faça a pergunta e recolha hipóteses. Mostre a caderneta de vacinação de exemplo e pergunte quais vacinas reconhecem.',
        teacherNotes: 'Evite pedir que estudantes exponham a situação vacinal da própria família.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Simulação: invasão no corpo',
        minutes: 15,
        instructions:
          'Rodada 1: alguns estudantes são "invasores" e entram no "corpo" demarcado; os "defensores" precisam encontrar o anticorpo com o encaixe certo, o que leva tempo, e os invasores se multiplicam (cada um chama mais um colega). Rodada 2: antes, os defensores recebem um cartão-modelo "vacina" (forma do invasor sem perigo) e já preparam os anticorpos. Comparem quanto tempo levou em cada rodada.',
        offlineAlternative: 'Em sala pequena, faça a simulação sobre a mesa com cartões de encaixe e um cronômetro.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'O que a simulação mostrou',
        minutes: 12,
        instructions:
          'Relacione o jogo aos conceitos: antígeno, anticorpo, glóbulos brancos e memória imunológica. Explique que a vacina apresenta ao corpo uma versão inativada, enfraquecida ou uma parte do agente, sem causar a doença.',
        teacherNotes:
          'Mencione o Programa Nacional de Imunizações, criado em 1973, e as campanhas que eliminaram a poliomielite no Brasil.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Proteção coletiva',
        minutes: 13,
        instructions:
          'Desenhe no quadro uma "turma" de 30 bolinhas. Mostre como uma doença se espalha quando poucos estão vacinados e quando a maioria está. Em duplas, os estudantes respondem por que vacinar protege também quem não pode tomar vacina (bebês muito pequenos, pessoas em tratamento).',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Explique para alguém da família',
        minutes: 5,
        instructions:
          'Cada estudante escreve em até 4 linhas como explicaria a uma pessoa da família como a vacina funciona, usando as palavras anticorpo e memória.',
      },
    ],
    activity: {
      title: 'Como a vacina funciona',
      instructions: [
        'Numere na ordem: (  ) o corpo produz anticorpos e células de memória; (  ) a pessoa recebe a vacina; (  ) o agente real aparece e é combatido rapidamente; (  ) o sistema imunológico reconhece o antígeno da vacina.',
        'Explique com suas palavras o que é imunidade coletiva.',
        'Por que algumas vacinas precisam de mais de uma dose ou de reforço?',
      ],
      answerKey: [
        'Ordem: 1 a pessoa recebe a vacina; 2 o sistema imunológico reconhece o antígeno; 3 produz anticorpos e células de memória; 4 o agente real aparece e é combatido rapidamente.',
        'Imunidade coletiva: quando a maioria das pessoas está vacinada, o agente circula pouco, protegendo também quem não pode se vacinar.',
        'Reforços: a memória imunológica pode diminuir com o tempo ou precisa de estímulos repetidos para ficar forte; alguns agentes também mudam (como o vírus da gripe).',
      ],
    },
    observeLearning: [
      'Usa corretamente os termos antígeno, anticorpo e memória imunológica.',
      'Relaciona a simulação ao funcionamento real das vacinas.',
      'Explica a imunidade coletiva com exemplos.',
      'Argumenta com base em informação científica, distinguindo-a de boatos.',
    ],
    adaptations: [
      'TEA: antecipe as regras da simulação por escrito e ofereça o papel de "cronometrista" a quem não quiser contato físico ou movimento intenso.',
      'TDAH: aproveite a simulação para canalizar o movimento e use frases curtas no registro escrito.',
      'Mobilidade reduzida: faça a simulação na versão de mesa ou garanta papéis que não exijam deslocamento.',
    ],
    skills: [
      'Explicar a importância da vacinação para a saúde individual e coletiva, com base no funcionamento do sistema imunológico.',
      'Analisar políticas públicas de saúde, como as campanhas de vacinação.',
      'Utilizar modelos e simulações para representar fenômenos biológicos.',
    ],
    modes: ['jogar', 'experimentar', 'conversar'],
    artId: 'subj-ciencias',
    tags: ['vacinas', 'sistema imunológico', 'saúde coletiva', 'SUS', 'simulação'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── História ─────────────────────────
  {
    id: 'x-his-objetos-contam-historias',
    title: 'Detetives do tempo: objetos que contam histórias',
    summary:
      'As crianças trazem (ou desenham) objetos antigos da família, investigam como eram usados, comparam com os objetos de hoje e montam um pequeno museu da turma.',
    subjects: ['historia'],
    etapa: 'fundamental1',
    anos: [2, 3],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 2º e 3º ano que estão construindo noções de passado, presente, mudança e permanência.',
    objectives: [
      'Reconhecer objetos como fontes históricas que ajudam a conhecer o passado.',
      'Comparar objetos de diferentes épocas, identificando mudanças e permanências.',
      'Valorizar as memórias e os saberes das famílias e da comunidade.',
    ],
    materials: [
      'Objetos antigos trazidos pelas crianças (com autorização da família) ou fotos/desenhos deles',
      'Etiquetas de museu impressas',
      'Lupas (opcional)',
      'Uma caixa misteriosa com um objeto antigo (ferro de passar a carvão, pilão, rádio, máquina de escrever ou foto antiga)',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'A caixa misteriosa',
        minutes: 8,
        instructions:
          'Mostre a caixa fechada e dê pistas sobre o objeto ("é pesado", "era usado na cozinha"). As crianças tentam adivinhar. Abra a caixa e pergunte: "Quem usava isso? Para quê? O que usamos hoje no lugar?".',
        teacherNotes:
          'Um pilão é uma ótima escolha: foi usado por povos indígenas, africanos e seus descendentes e ainda é usado em muitas comunidades. Mostra permanência, não só mudança.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Investigação em grupo',
        minutes: 15,
        instructions:
          'Em grupos, as crianças examinam os objetos trazidos (ou os desenhos) e respondem a um roteiro oral: De que é feito? Quem usava? Ainda existe? O que mudou? Uma criança do grupo conta a história que a família contou sobre o objeto.',
        offlineAlternative: 'Se poucas crianças trouxerem objetos, use fotos impressas de objetos antigos e compare com objetos da sala.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Antes e agora',
        minutes: 10,
        instructions:
          'Coloque no chão duas placas: ANTES e AGORA. Mostre pares de imagens ou objetos (lampião e lâmpada; carta e celular; pilão e liquidificador) e as crianças posicionam cada um. Discuta: "Alguma coisa de antes ainda é usada hoje?".',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Montando o museu da turma',
        minutes: 12,
        instructions:
          'Cada grupo preenche a etiqueta de museu do seu objeto (nome, época aproximada, uso, de quem era) e organiza a exposição na mesa ou no varal.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Visita guiada',
        minutes: 5,
        instructions:
          'Duas crianças de cada grupo apresentam o objeto como "guias do museu". Pergunte à turma o que aprendeu sobre o passado a partir dos objetos.',
      },
    ],
    activity: {
      title: 'Etiqueta do museu',
      instructions: [
        'Desenhe o objeto.',
        'Escreva o nome do objeto.',
        'Quem usava e para quê?',
        'Hoje usamos o quê no lugar? Ou ele ainda é usado?',
        'Pergunte a alguém mais velho da família uma lembrança ligada a esse objeto e registre com a ajuda de um adulto.',
      ],
    },
    observeLearning: [
      'Identifica o objeto como pista sobre o modo de vida no passado.',
      'Usa as palavras antes, agora, mudou e continua.',
      'Respeita e valoriza a história contada pela família dos colegas.',
      'Registra informações na etiqueta com desenho e palavras.',
    ],
    adaptations: [
      'TEA: deixe a criança explorar o objeto antes da turma, sem pressa; ofereça a opção de apresentar por desenho em vez de falar ao grupo.',
      'TDAH: divida a investigação em perguntas curtas, uma de cada vez, e dê à criança o papel de "guarda do museu".',
      'Famílias sem objetos antigos: aceite um relato oral ou desenho; nenhuma criança deve se sentir excluída por não ter o que trazer.',
    ],
    skills: [
      'Identificar objetos e documentos pessoais e familiares como fontes de memória e história.',
      'Identificar mudanças e permanências nas formas de trabalho e nos objetos do cotidiano ao longo do tempo.',
      'Reconhecer a importância das memórias da família e da comunidade.',
    ],
    modes: ['investigar', 'fora-da-tela', 'conversar'],
    artId: 'subj-historia',
    tags: ['fontes históricas', 'memória', 'família', 'museu', 'passado e presente'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-his-quilombos-liberdade',
    title: 'Quilombos: organizar a liberdade',
    summary:
      'A turma analisa fontes sobre Palmares e outros quilombos, investiga como essas comunidades se organizavam e conhece comunidades quilombolas atuais e suas lutas por território.',
    subjects: ['historia'],
    etapa: 'fundamental2',
    anos: [7, 8],
    durationMin: 100,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º e 8º ano que estudam o Brasil colonial e a escravidão.',
    objectives: [
      'Compreender os quilombos como formas de resistência e organização de pessoas escravizadas e libertas.',
      'Analisar fontes históricas de diferentes autorias, identificando o ponto de vista de quem as produziu.',
      'Reconhecer a existência e os direitos das comunidades quilombolas contemporâneas.',
    ],
    materials: [
      'Kit de fontes impressas (trecho de relato colonial sobre Palmares, mapa da Serra da Barriga, texto sobre Dandara e Zumbi, reportagem sobre comunidade quilombola atual)',
      'Folha de análise de fontes',
      'Mapa do Brasil',
      'Projetor (opcional) para fotos de comunidades quilombolas atuais',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'O que significa resistir?',
        minutes: 10,
        instructions:
          'Escreva no quadro "resistência" e pergunte que formas de resistir à escravidão a turma imagina. Organize as respostas em: fugas, revoltas, preservação da cultura e religião, negociação, compra da liberdade, formação de quilombos.',
        teacherNotes:
          'Use "pessoas escravizadas" em vez de "escravos": a escravidão foi uma condição imposta, não uma identidade. Evite reduzir a história da população negra ao sofrimento — destaque protagonismo e organização.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Estações de fontes',
        minutes: 30,
        instructions:
          'Monte 4 estações com as fontes. Os grupos passam por todas (cerca de 7 minutos cada), respondendo: Quem produziu? Quando? Com que intenção? O que essa fonte revela sobre os quilombos? O que ela esconde ou distorce?',
        offlineAlternative: 'Todas as fontes funcionam impressas; as fotos atuais podem ser substituídas por descrições lidas pelo professor.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'Como Palmares se organizava',
        minutes: 20,
        instructions:
          'Com base nas fontes, montem no quadro um mapa conceitual: território (mocambos na Serra da Barriga), economia (agricultura, comércio com vizinhos), defesa, liderança (Ganga Zumba, Zumbi, Dandara) e diversidade de moradores (africanos, descendentes, indígenas e pessoas pobres livres).',
        teacherNotes:
          'Explique que boa parte do que se sabe vem de documentos de quem combatia Palmares; por isso a crítica de fontes é essencial. Sobre Dandara, há poucas fontes escritas e muita memória oral — diga isso abertamente.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Quilombos hoje',
        minutes: 25,
        instructions:
          'Apresente dados sobre comunidades quilombolas atuais (presentes em quase todos os estados brasileiros) e o direito à titulação das terras garantido pela Constituição de 1988. Em grupos, os estudantes leem a reportagem e escrevem 3 desafios e 3 conquistas da comunidade estudada.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Linha do tempo da liberdade',
        minutes: 15,
        instructions:
          'Cada grupo contribui com um cartão para uma linha do tempo coletiva (de Palmares ao 20 de novembro, Dia da Consciência Negra, e às comunidades atuais). Cada estudante escreve individualmente: "Por que os quilombos são importantes para entender o Brasil de hoje?".',
      },
    ],
    activity: {
      title: 'Ficha de análise de fontes',
      instructions: [
        'Para cada fonte, responda: Quem produziu? Quando? Para quem? Com que objetivo?',
        'Identifique uma informação que você considera confiável e uma que pode estar distorcida, justificando.',
        'Compare duas fontes: em que concordam e em que discordam?',
        'Escreva um parágrafo explicando como Palmares se organizava.',
      ],
      answerKey: [
        'Relatos coloniais foram escritos por autoridades ou militares que queriam destruir Palmares: tendem a descrever os quilombolas como ameaça e a exagerar ou omitir aspectos da vida comunitária.',
        'Organização de Palmares: vários mocambos, agricultura diversificada, comércio com povoados vizinhos, estrutura de defesa e lideranças reconhecidas; resistiu por quase um século (aprox. 1597–1695).',
        'Comunidades atuais: o artigo 68 do Ato das Disposições Constitucionais Transitórias (Constituição de 1988) reconhece o direito à propriedade das terras ocupadas por comunidades remanescentes de quilombos.',
      ],
    },
    observeLearning: [
      'Identifica autoria, intenção e contexto das fontes analisadas.',
      'Explica os quilombos como organização social, econômica e política, e não apenas como fuga.',
      'Relaciona passado e presente ao falar das comunidades quilombolas atuais.',
      'Usa vocabulário respeitoso (pessoas escravizadas, comunidades quilombolas).',
    ],
    adaptations: [
      'TDAH: o formato de estações com tempo marcado ajuda a manter o foco; entregue a ficha com uma pergunta por quadro e permita levantar para trocar de estação.',
      'TEA: avise com antecedência os sinais de troca de estação e ofereça a sequência das estações por escrito.',
      'Leitura: ofereça versões das fontes com glossário e trechos adaptados; um colega pode ler em voz alta.',
    ],
    skills: [
      'Analisar as formas de resistência das populações africanas e afrodescendentes à escravidão.',
      'Identificar e comparar diferentes pontos de vista em fontes históricas.',
      'Discutir a permanência de desigualdades e os direitos das comunidades quilombolas no Brasil atual.',
    ],
    modes: ['investigar', 'conversar'],
    artId: 'subj-historia',
    tags: ['quilombos', 'Palmares', 'resistência', 'história afro-brasileira', 'análise de fontes', 'consciência negra'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Geografia ─────────────────────────
  {
    id: 'x-geo-mapa-caminho-escola',
    title: 'O mapa do meu caminho até a escola',
    summary:
      'As crianças descrevem o trajeto de casa até a escola, aprendem pontos de referência e direções e desenham um mapa com legenda, testando-o em um jogo de caça ao tesouro na escola.',
    subjects: ['geografia'],
    etapa: 'fundamental1',
    anos: [2, 3],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 2º e 3º ano que começam a representar espaços conhecidos com desenhos e mapas simples.',
    objectives: [
      'Descrever trajetos usando pontos de referência e noções de direção (direita, esquerda, em frente, perto, longe).',
      'Representar um trajeto em mapa simples, com legenda.',
      'Ler um mapa simples para localizar um objeto no espaço da escola.',
    ],
    materials: [
      'Folhas A3 e lápis de cor',
      'Mapa simples da escola desenhado pelo professor',
      'Um "tesouro" (caixa com adesivos ou uma mensagem)',
      'Fita crepe para setas no chão',
    ],
    resources: ['sem-dispositivos', 'sem-internet'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Como você chega aqui?',
        minutes: 8,
        instructions:
          'Pergunte como as crianças chegam à escola (a pé, de ônibus, de barco, de bicicleta, de van). Peça que três crianças contem o que veem no caminho. Anote no quadro os pontos de referência citados (padaria, igreja, rio, praça).',
        teacherNotes: 'Em comunidades ribeirinhas ou rurais, rios, árvores e porteiras são referências tão válidas quanto ruas e lojas.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Robô do caminho',
        minutes: 10,
        instructions:
          'Uma criança é o "robô" e outra dá comandos para ela chegar até a porta: "três passos em frente, vire à direita, dois passos". A turma confere se o caminho funcionou. Troque as duplas.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Desenhando meu trajeto',
        minutes: 17,
        instructions:
          'Cada criança desenha o caminho de casa até a escola visto de cima, com pelo menos 3 pontos de referência e uma legenda com símbolos (ex.: árvore = círculo verde).',
        teacherNotes: 'Mostre a diferença entre desenhar de lado e de cima, usando a mesa da sala como exemplo (vista do teto).',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Caça ao tesouro com mapa',
        minutes: 10,
        instructions:
          'Mostre o mapa da escola com um X marcando o tesouro. Em grupos, as crianças leem o mapa e dizem o caminho antes de ir buscar, acompanhadas pelo professor.',
        offlineAlternative: 'Se não for possível sair da sala, esconda o tesouro na própria sala e use um mapa da sala com as carteiras.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Troca de mapas',
        minutes: 5,
        instructions:
          'Em duplas, uma criança mostra seu mapa e a outra tenta descrever o trajeto apenas olhando para ele. Pergunte: "A legenda ajudou?".',
      },
    ],
    activity: {
      title: 'Meu mapa com legenda',
      instructions: [
        'Desenhe sua casa em um canto da folha e a escola no outro.',
        'Trace o caminho entre elas.',
        'Desenhe pelo menos 3 pontos de referência no caminho.',
        'Crie uma legenda com os símbolos que você usou.',
        'Escreva uma frase: "Saindo de casa, eu viro para ___ e passo por ___".',
      ],
    },
    observeLearning: [
      'Usa pontos de referência para descrever o trajeto.',
      'Emprega corretamente direita, esquerda, em frente, perto e longe.',
      'Cria legenda coerente com os símbolos do mapa.',
      'Consegue ler o mapa da escola para chegar ao tesouro.',
    ],
    adaptations: [
      'TEA: avise antes sobre a saída da sala e o percurso; permita que a criança leve o mapa da escola consigo e seja a "leitora oficial" do grupo.',
      'TDAH: o jogo do robô e a caça ao tesouro canalizam o movimento; no desenho, ofereça uma folha com a casa e a escola já marcadas.',
      'Lateralidade em construção: use uma fitinha no pulso direito como apoio.',
    ],
    skills: [
      'Descrever trajetos e localizar objetos usando pontos de referência e noções de lateralidade.',
      'Elaborar e interpretar mapas simples, com legenda e símbolos.',
      'Reconhecer diferentes meios de transporte e formas de deslocamento no lugar de vivência.',
    ],
    modes: ['jogar', 'fora-da-tela', 'investigar'],
    artId: 'subj-geografia',
    tags: ['cartografia', 'trajeto', 'pontos de referência', 'legenda', 'lateralidade'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-geo-migracoes-familias',
    title: 'De onde vieram nossas famílias? Migrações no Brasil',
    summary:
      'A turma entrevista familiares, mapeia as origens e os caminhos das famílias e relaciona essas histórias aos grandes fluxos migratórios que formaram a população brasileira.',
    subjects: ['geografia'],
    etapa: 'fundamental2',
    anos: [7],
    durationMin: 100,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º ano que estudam a formação territorial e a população brasileira.',
    objectives: [
      'Identificar fluxos migratórios internos e externos que formaram a população brasileira.',
      'Diferenciar migração voluntária e migração forçada, reconhecendo a diáspora africana imposta pela escravidão.',
      'Representar fluxos migratórios em mapa com setas e legenda.',
    ],
    materials: [
      'Roteiro de entrevista (enviado na aula anterior)',
      'Mapa do Brasil em tamanho grande e mapa-múndi',
      'Barbante, alfinetes ou fita e setas de papel',
      'Mapa político do Brasil impresso (um por estudante)',
    ],
    resources: ['projetor', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Uma palavra sobre a minha família',
        minutes: 10,
        instructions:
          'Cada estudante diz uma cidade, estado ou país ligado à história da família, a partir da entrevista feita em casa. Marque no mapa grande com alfinetes ou adesivos.',
        teacherNotes:
          'Nem todos conhecem a origem da família (adoção, histórias interrompidas pela escravidão, migrações recentes). Deixe claro que "eu nasci aqui e isso também é uma história" é uma resposta completa.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'O mapa de barbante',
        minutes: 25,
        instructions:
          'Em grupos, os estudantes ligam com barbante o local de origem ao local atual de cada família e classificam: migração dentro do estado, entre regiões, ou internacional. Registrem os motivos citados nas entrevistas (trabalho, estudo, seca, violência, família).',
        offlineAlternative: 'Sem barbante, desenhem setas a lápis em mapas impressos e depois montem um mapa coletivo no quadro.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'Grandes fluxos da história do Brasil',
        minutes: 25,
        instructions:
          'Apresente os grandes fluxos: povos indígenas, primeiros habitantes do território; a diáspora africana forçada pela escravidão; imigração europeia e asiática (séculos XIX e XX); migrações Nordeste–Sudeste e para o Centro-Oeste e a Amazônia; imigração recente (Haiti, Venezuela, Bolívia, países africanos). Compare com o mapa da turma.',
        teacherNotes:
          'Destaque a diferença entre quem migrou por escolha e as pessoas africanas trazidas à força e escravizadas. Destaque também que os povos indígenas não "migraram para o Brasil": estavam aqui e tiveram seus territórios invadidos.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Mapa de fluxos',
        minutes: 30,
        instructions:
          'Individualmente, cada estudante produz no mapa impresso um mapa de fluxos com 4 setas (2 históricas e 2 da turma), legenda com cores e título.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Muitas origens, um lugar',
        minutes: 10,
        instructions:
          'Pergunte: "O que o mapa da turma mostra sobre a nossa cidade?". Cada estudante escreve uma frase relacionando a história da própria família (ou de alguém da comunidade) a um dos grandes fluxos.',
      },
    ],
    activity: {
      title: 'Mapa de fluxos migratórios',
      instructions: [
        'Desenhe 2 setas representando fluxos migratórios históricos do Brasil.',
        'Desenhe 2 setas representando caminhos de famílias da turma.',
        'Use cores diferentes para migração voluntária e migração forçada.',
        'Crie título e legenda.',
        'Explique, em 3 linhas, um motivo que leva pessoas a migrarem hoje.',
      ],
      answerKey: [
        'Fluxos históricos possíveis: África → litoral brasileiro (forçado, séculos XVI–XIX); Europa (Itália, Portugal, Alemanha) e Japão → Sudeste e Sul (séculos XIX–XX); Nordeste → Sudeste (século XX); Sul e Sudeste → Centro-Oeste e Norte (a partir dos anos 1970).',
        'Motivos atuais: busca de trabalho e estudo, reunião familiar, desastres ambientais, conflitos e crises econômicas ou políticas.',
      ],
    },
    observeLearning: [
      'Diferencia migração interna e externa, voluntária e forçada.',
      'Representa fluxos com setas, legenda e título.',
      'Relaciona histórias individuais aos processos históricos de formação da população.',
      'Respeita as histórias dos colegas e combate estereótipos sobre migrantes.',
    ],
    adaptations: [
      'TEA: ofereça a possibilidade de entrevistar alguém da escola ou da comunidade em vez da família, e apresentar por escrito.',
      'TDAH: no mapa de barbante, atribua tarefas físicas (medir, prender, recortar setas) e divida o mapa individual em etapas com checklist.',
      'Estudantes migrantes ou refugiados: valorize a contribuição sem expor; pergunte antes se querem compartilhar a própria história.',
    ],
    skills: [
      'Analisar os fluxos migratórios que contribuíram para a formação da população brasileira.',
      'Reconhecer a diversidade étnico-racial e cultural da população brasileira, incluindo a contribuição de povos indígenas e africanos.',
      'Elaborar mapas temáticos com representação de fluxos.',
    ],
    modes: ['investigar', 'projeto', 'conversar'],
    artId: 'subj-geografia',
    tags: ['migração', 'população brasileira', 'diáspora africana', 'mapa de fluxos', 'entrevista'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Artes ─────────────────────────
  {
    id: 'x-art-orquestra-corpo-sucata',
    title: 'Orquestra de corpo e sucata: ritmos do Brasil',
    summary:
      'A turma explora sons do próprio corpo e de objetos reaproveitados, conhece ritmos de matriz africana e indígena presentes na cultura brasileira e cria uma pequena composição coletiva.',
    subjects: ['artes'],
    etapa: 'fundamental1',
    anos: [2, 3],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 2º e 3º ano que gostam de música e movimento e ainda estão desenvolvendo a percepção de pulso e ritmo.',
    objectives: [
      'Explorar timbres do corpo (palmas, estalos, pés) e de objetos reaproveitados.',
      'Perceber e manter o pulso em uma música, alternando som e silêncio.',
      'Criar e executar coletivamente uma sequência rítmica simples.',
    ],
    materials: [
      'Objetos reaproveitados: baldes, garrafas PET com grãos, latas, tampas, caixas',
      'Caixa de som ou celular para tocar exemplos (opcional)',
      'Cartões com símbolos de partitura inventada (círculo = palma, quadrado = pé, X = silêncio)',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'computador-unico'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'O corpo é um instrumento',
        minutes: 8,
        instructions:
          'Em roda, proponha um "eco": você faz um ritmo com palmas, pés e estalos e a turma repete. Aumente a dificuldade aos poucos. Pergunte: "Que sons diferentes o corpo consegue fazer?".',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Ritmos que vêm de longe',
        minutes: 10,
        instructions:
          'Apresente (tocando ou batendo no balde) um trecho de samba de roda, de maracatu e de um toré ou canto indígena. Explique que esses ritmos foram criados e preservados por comunidades negras e povos indígenas e fazem parte da cultura brasileira até hoje.',
        teacherNotes:
          'Apresente essas manifestações como arte viva, praticada hoje por mestres, mestras e comunidades, e não como "coisa do passado". Se houver grupos culturais no bairro, cite-os.',
        offlineAlternative: 'Sem áudio, cante e bata o ritmo de uma cantiga de samba de roda conhecida e descreva os instrumentos (atabaque, alfaia, maracá).',
      },
      {
        id: 'b3',
        kind: 'experimento',
        title: 'Laboratório de sucata',
        minutes: 12,
        instructions:
          'Em grupos, as crianças testam os objetos: qual som é grave, qual é agudo, qual é seco, qual chacoalha? Cada grupo escolhe 3 "instrumentos" e dá nome a eles.',
        teacherNotes: 'Combine um sinal de silêncio (mão levantada) antes de distribuir os objetos.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Partitura inventada',
        minutes: 15,
        instructions:
          'Mostre os cartões de símbolos. Cada grupo monta uma sequência de 8 cartões e ensaia tocando no pulso. Depois, os grupos tocam um após o outro, formando a "orquestra da turma", com você como regente.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Apreciação',
        minutes: 5,
        instructions:
          'Pergunte: "Qual parte da orquestra vocês mais gostaram? Onde teve silêncio? Alguém saiu do pulso?". Registre as respostas em um cartaz.',
      },
    ],
    activity: {
      title: 'Minha partitura inventada',
      instructions: [
        'Desenhe 8 quadrinhos em fila.',
        'Em cada quadrinho, desenhe um símbolo: círculo = palma, quadrado = pé, triângulo = instrumento de sucata, X = silêncio.',
        'Toque sua partitura para um colega.',
        'Troque de partitura com ele e tente tocar a dele.',
      ],
    },
    observeLearning: [
      'Repete ritmos no eco com precisão crescente.',
      'Diferencia sons graves e agudos, secos e longos.',
      'Mantém o pulso ao tocar em grupo e respeita os silêncios.',
      'Reconhece que samba de roda, maracatu e cantos indígenas são manifestações culturais brasileiras vivas.',
    ],
    adaptations: [
      'TEA: ofereça protetor auricular ou um lugar um pouco mais afastado durante a orquestra; antecipe que haverá sons altos e combine o sinal de silêncio.',
      'TDAH: dê o papel de regente auxiliar ou de "guardião do pulso" (marca o tempo no balde) e alterne momentos de tocar e de ouvir.',
      'Deficiência auditiva: explore a vibração dos instrumentos (mão no balde) e use os cartões visuais como guia principal.',
    ],
    skills: [
      'Explorar e reconhecer elementos constitutivos da música, como pulso, ritmo, timbre e intensidade.',
      'Experimentar diferentes fontes sonoras, incluindo o corpo e materiais reaproveitados.',
      'Conhecer e valorizar manifestações musicais de matrizes indígenas e africanas presentes na cultura brasileira.',
    ],
    modes: ['experimentar', 'fora-da-tela', 'projeto'],
    artId: 'subj-artes',
    tags: ['música', 'percussão corporal', 'sucata', 'samba de roda', 'maracatu', 'cultura afro-brasileira', 'cultura indígena'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-art-xilogravura-isopor',
    title: 'Gravura de bandeja: a arte da xilogravura do cordel',
    summary:
      'A turma conhece a xilogravura nordestina que ilustra os folhetos de cordel, analisa obras de mestres gravadores e cria matrizes com bandejas de isopor para imprimir uma série coletiva.',
    subjects: ['artes'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 100,
    difficulty: 'intermediario',
    audience: 'Turmas de 6º e 7º ano que já experimentaram desenho e pintura e podem começar a explorar técnicas de impressão.',
    objectives: [
      'Conhecer a xilogravura popular nordestina e sua relação com a literatura de cordel.',
      'Compreender o princípio da gravura: matriz, inversão da imagem e reprodução.',
      'Produzir uma matriz de isopor e imprimir uma pequena tiragem.',
    ],
    materials: [
      'Bandejas de isopor limpas (reaproveitadas)',
      'Lápis sem ponta ou palito de churrasco',
      'Tinta guache ou tinta para tecido e rolinho de espuma (ou esponja)',
      'Papel sulfite ou papel kraft',
      'Folhetos de cordel ou imagens de xilogravuras impressas',
      'Jornal para forrar as mesas',
    ],
    resources: ['projetor', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'conversa',
        title: 'O que tem na capa do cordel?',
        minutes: 15,
        instructions:
          'Mostre folhetos de cordel ou imagens de capas. Pergunte: como foram feitas essas imagens? Por que são em preto e branco? Apresente artistas como J. Borges e as gravadoras e os gravadores que mantêm a tradição em Pernambuco, na Paraíba e no Ceará.',
        offlineAlternative: 'Sem projetor, leve folhetos reais ou imagens impressas e circule entre as mesas.',
      },
      {
        id: 'b2',
        kind: 'experimento',
        title: 'Por que a imagem sai ao contrário?',
        minutes: 10,
        instructions:
          'Escreva seu nome em uma bandeja de isopor, passe tinta e imprima. A turma observa: o nome sai invertido! Discuta como os gravadores resolvem isso (desenham ao contrário na matriz).',
        teacherNotes: 'Isso é ótimo para conversar sobre simetria e reflexão. Aconselhe evitar letras na primeira matriz.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Esboço da matriz',
        minutes: 20,
        instructions:
          'Cada estudante escolhe um tema do cotidiano (a feira, o bairro, um animal, uma festa local, uma pessoa importante da comunidade) e faz um esboço em papel do tamanho da bandeja, com contraste forte entre áreas cheias e vazias.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Gravar e imprimir',
        minutes: 40,
        instructions:
          'Os estudantes transferem o desenho para o isopor apertando com o lápis (os sulcos ficarão brancos na impressão). Passam tinta com o rolinho, colocam o papel por cima, esfregam com a mão e retiram com cuidado. Cada estudante imprime ao menos 3 cópias e assina a lápis embaixo, como fazem os gravadores.',
        teacherNotes:
          'Organize uma "estação de impressão" com rolinhos e tinta para conter a bagunça. Deixe as cópias secando em varal.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Exposição em varal',
        minutes: 15,
        instructions:
          'Pendure as gravuras em varal. A turma caminha observando e escolhe uma para comentar: o que funciona bem no contraste? Que história a imagem conta? Cada estudante escreve um título e uma quadrinha de cordel para a própria gravura.',
      },
    ],
    activity: {
      title: 'Ficha do gravador',
      instructions: [
        'Título da minha gravura:',
        'Tema escolhido e por quê:',
        'Desenhe aqui o esboço (lembre-se: o que você sulcar ficará branco).',
        'O que aconteceu com a imagem na impressão? O que você mudaria na próxima matriz?',
        'Escreva uma quadrinha (4 versos rimados) que poderia acompanhar sua gravura em um folheto de cordel.',
      ],
    },
    observeLearning: [
      'Explica a relação entre matriz e cópia e o efeito da inversão da imagem.',
      'Planeja o contraste entre áreas sulcadas e áreas com tinta.',
      'Reconhece a xilogravura popular como arte de autoria, com mestres e escolas regionais.',
      'Comenta trabalhos dos colegas com vocabulário de artes visuais (contraste, composição, textura).',
    ],
    adaptations: [
      'TEA: ofereça luvas para quem tiver sensibilidade à tinta e um passo a passo ilustrado da impressão; permita trabalhar em um canto mais tranquilo.',
      'TDAH: divida a etapa de impressão em microtarefas com checklist e alterne com o papel de "assistente de impressão" para outros colegas.',
      'Coordenação motora fina: use bandejas maiores e lápis mais grossos; a impressão pode ser feita em dupla.',
    ],
    skills: [
      'Conhecer e analisar manifestações das artes visuais da cultura popular brasileira, como a xilogravura de cordel.',
      'Experimentar técnicas de gravura e impressão, compreendendo matriz e reprodução.',
      'Desenvolver processos de criação com planejamento, experimentação e revisão.',
    ],
    modes: ['experimentar', 'projeto', 'fora-da-tela'],
    artId: 'subj-artes',
    tags: ['xilogravura', 'cordel', 'gravura', 'cultura nordestina', 'impressão', 'artes visuais'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Educação Física ─────────────────────────
  {
    id: 'x-edf-peteca-tradicao-indigena',
    title: 'Peteca: da tradição indígena ao pátio da escola',
    summary:
      'A turma conhece a origem indígena da peteca, constrói petecas com materiais simples e experimenta jogos cooperativos e de rede, criando suas próprias regras.',
    subjects: ['educacao-fisica'],
    etapa: 'fundamental1',
    anos: [3, 4],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 3º e 4º ano em fase de ampliar habilidades de rebater, coordenação olho-mão e cooperação.',
    objectives: [
      'Conhecer a origem indígena da peteca e sua presença na cultura brasileira.',
      'Desenvolver a coordenação olho-mão ao rebater a peteca com a palma da mão.',
      'Criar e combinar regras em jogos cooperativos e competitivos.',
    ],
    materials: [
      'Petecas (ou materiais para construir: sacolinhas plásticas, areia ou retalhos, elástico, papel crepom)',
      'Cordas ou fitas para fazer uma "rede" baixa',
      'Cones ou garrafas para demarcar espaços',
    ],
    resources: ['sem-dispositivos', 'sem-internet'],
    blocks: [
      {
        id: 'b1',
        kind: 'conversa',
        title: 'De onde vem a peteca?',
        minutes: 7,
        instructions:
          'Mostre uma peteca e conte que a palavra vem do tupi ("pe’teka", relacionada a bater com a mão) e que muitos povos indígenas jogavam peteca muito antes da chegada dos portugueses, em celebrações e brincadeiras. Pergunte quem já jogou e como.',
        teacherNotes:
          'Fale dos povos indígenas no presente: crianças indígenas continuam brincando de peteca em suas aldeias e cidades hoje.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Fábrica de petecas',
        minutes: 10,
        instructions:
          'Em duplas, as crianças montam uma peteca: um punhado de areia ou retalhos dentro de duas sacolinhas, amarradas com elástico, e tiras de papel crepom como "penas".',
        offlineAlternative: 'Se não houver tempo para construir, use petecas prontas ou bolinhas de meia.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Desafio do não-deixa-cair',
        minutes: 13,
        instructions:
          'Individualmente, cada criança tenta rebater a peteca para cima o máximo de vezes sem deixar cair. Depois em duplas e em trios, contando os toques em voz alta. Desafio da turma: somar os toques de todos os grupos e tentar bater o recorde na rodada seguinte.',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Peteca na rede com regras da turma',
        minutes: 15,
        instructions:
          'Estique uma corda baixa entre dois postes ou cadeiras. Times de 3 rebatem a peteca para o outro lado. Após 5 minutos, pare e pergunte: "O que podemos mudar para ficar mais justo ou divertido?". A turma vota uma regra nova (ex.: todos do time precisam tocar antes de passar) e joga de novo.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Roda final',
        minutes: 5,
        instructions:
          'Em roda, cada criança mostra com o polegar como se saiu no rebater e diz uma regra que ajudou o jogo a ficar melhor.',
      },
    ],
    activity: {
      title: 'Meu jogo de peteca',
      instructions: [
        'Desenhe sua peteca e escreva de que materiais ela foi feita.',
        'Escreva a palavra de origem tupi que deu nome à peteca.',
        'Invente um jogo de peteca com 3 regras.',
        'Ensine seu jogo para alguém de casa e conte na próxima aula como foi.',
      ],
      answerKey: ['A palavra "peteca" vem do tupi e está ligada à ideia de bater com a palma da mão.'],
    },
    observeLearning: [
      'Rebate a peteca com controle crescente, usando a palma da mão.',
      'Coopera com colegas para manter a peteca no ar.',
      'Propõe e respeita regras combinadas coletivamente.',
      'Reconhece a peteca como brincadeira de origem indígena, presente até hoje.',
    ],
    adaptations: [
      'TEA: antecipe as rodadas com um quadro visual; permita começar no desafio individual e só passar ao jogo em equipe quando se sentir pronto.',
      'TDAH: use desafios curtos com contagem em voz alta e metas visíveis; dê o papel de "juiz da regra nova".',
      'Deficiência física ou baixa coordenação: use peteca maior e mais leve, permita rebater com raquete de papelão ou segurar e lançar.',
    ],
    skills: [
      'Experimentar e fruir brincadeiras e jogos populares do Brasil, incluindo os de matriz indígena.',
      'Desenvolver habilidades motoras de rebater e coordenação olho-mão.',
      'Criar e adaptar regras de jogos, respeitando os colegas e valorizando a cooperação.',
    ],
    modes: ['jogar', 'fora-da-tela', 'experimentar'],
    artId: 'subj-educacao-fisica',
    tags: ['peteca', 'cultura indígena', 'jogos populares', 'cooperação', 'coordenação'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-edf-esportes-invasao-tatica',
    title: 'Esportes de invasão: pensar como um time',
    summary:
      'Por meio de jogos reduzidos inspirados no handebol, a turma descobre princípios táticos comuns aos esportes de invasão (ocupar espaços, desmarcar, proteger a meta) e cria jogadas coletivas.',
    subjects: ['educacao-fisica'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º e 9º ano que já conhecem esportes coletivos e podem analisar o jogo de forma tática.',
    objectives: [
      'Identificar princípios táticos comuns aos esportes de invasão (handebol, futebol, basquete, futsal).',
      'Aplicar ações de desmarcação, ocupação de espaços e cobertura em jogos reduzidos.',
      'Planejar e avaliar jogadas coletivas, valorizando a participação de todos.',
    ],
    materials: ['Bolas leves (de borracha ou de handebol)', 'Coletes ou fitas de duas cores', 'Cones para demarcar metas e zonas', 'Quadro branco portátil ou prancheta'],
    resources: ['sem-dispositivos', 'sem-internet'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'O que futebol, basquete e handebol têm em comum?',
        minutes: 5,
        instructions:
          'Pergunte e organize as respostas no quadro: invadir o campo adversário, levar a bola até a meta, impedir o adversário de fazer o mesmo. Apresente o nome "esportes de invasão".',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Jogo dos 10 passes',
        minutes: 12,
        instructions:
          'Dois times em espaço reduzido. O time com a bola tenta completar 10 passes sem perder a posse; o outro tenta interceptar. Proibido correr com a bola. Pare após alguns minutos e pergunte: "O que ajuda a receber a bola livre?".',
        teacherNotes: 'Conduza a turma a descobrir a desmarcação: sair da sombra do marcador e abrir espaço.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Handebol de cones',
        minutes: 15,
        instructions:
          'Times de 4 ou 5. O ponto vale quando a bola derruba o cone adversário, arremessada de fora de uma zona demarcada. Regra da turma: o ponto só vale se pelo menos 3 jogadores diferentes tocarem na bola na jogada.',
        offlineAlternative: 'Em espaço pequeno, reduza para 3 contra 3 e use garrafas PET com água como cones.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Prancheta do técnico',
        minutes: 10,
        instructions:
          'Cada time desenha na prancheta uma jogada para atacar e uma organização para defender. Depois, joguem mais uma rodada de 3 minutos para testar as estratégias.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Autoavaliação tática',
        minutes: 8,
        instructions:
          'Em roda, cada time diz se a estratégia funcionou e por quê. Cada estudante responde por escrito: "Uma ação que fiz para ajudar o meu time sem estar com a bola".',
      },
    ],
    activity: {
      title: 'Análise tática',
      instructions: [
        'Liste três esportes de invasão e o que é a "meta" em cada um.',
        'Explique com suas palavras o que é desmarcar.',
        'Desenhe uma jogada de ataque com setas (passe = linha contínua, deslocamento = linha tracejada).',
        'Explique por que a regra "3 jogadores tocam na bola" muda o jogo.',
      ],
      answerKey: [
        'Exemplos: futebol (gol), basquete (cesta), handebol (gol), rúgbi (linha de fundo), frisbee/ultimate (zona final).',
        'Desmarcar: deslocar-se para um espaço livre, longe do marcador, para receber a bola.',
        'A regra obriga a circulação da bola e a participação de todos, diminuindo a dependência de um único jogador.',
      ],
    },
    observeLearning: [
      'Desloca-se para espaços livres quando o time tem a posse da bola.',
      'Posiciona-se entre o adversário e a meta ao defender.',
      'Participa da elaboração da estratégia e respeita as decisões do grupo.',
      'Reconhece princípios táticos comuns a diferentes esportes.',
    ],
    adaptations: [
      'TEA: explique as regras com desenho na prancheta antes de começar e mantenha os mesmos times durante a aula; permita pausas fora da quadra.',
      'TDAH: use rodadas curtas com placar visível e dê funções claras (capitão de defesa, responsável pela contagem de passes).',
      'Inclusão de gênero e habilidade: forme times equilibrados e mantenha a regra dos 3 toques para garantir participação de todos.',
    ],
    skills: [
      'Experimentar e analisar esportes de invasão, identificando princípios táticos comuns.',
      'Planejar e utilizar estratégias de ataque e defesa em jogos coletivos.',
      'Valorizar a cooperação e a participação de todos nas práticas esportivas.',
    ],
    modes: ['jogar', 'fora-da-tela', 'conversar'],
    artId: 'subj-educacao-fisica',
    tags: ['esportes de invasão', 'handebol', 'tática', 'jogos reduzidos', 'cooperação'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Inglês ─────────────────────────
  {
    id: 'x-ing-fruits-at-the-feira',
    title: 'Fruits at the feira: cores e números em inglês',
    summary:
      'Em uma feira simulada com frutas brasileiras, as crianças aprendem nomes de frutas, cores e números de 1 a 10 em inglês e fazem pequenos pedidos usando "I want..., please".',
    subjects: ['ingles'],
    etapa: 'fundamental1',
    anos: [3, 4],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 3º e 4º ano em contato inicial com a língua inglesa, com foco em oralidade e brincadeira.',
    objectives: [
      'Reconhecer e falar nomes de frutas e cores em inglês.',
      'Contar de 1 a 10 em inglês em situação de compra e venda.',
      'Usar a expressão "I want ___, please" e "Thank you" em diálogos curtos.',
    ],
    materials: [
      'Frutas de verdade, de plástico ou imagens impressas (banana, apple, orange, pineapple, watermelon, mango, açaí, cashew)',
      'Cartões de cores',
      'Dinheirinho de papel ou tampinhas',
      'Cartaz com as palavras e figuras',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora', 'projetor'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'Hello, feira!',
        minutes: 7,
        instructions:
          'Cumprimente a turma: "Hello! How are you?". Mostre as frutas uma a uma, diga o nome em inglês e a turma repete com gestos (descascar a banana, cortar a melancia). Explique que algumas frutas brasileiras, como o açaí e o caju, são chamadas pelo mesmo nome ou parecido em inglês: "açaí" e "cashew".',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'What color is it?',
        minutes: 10,
        instructions:
          'Mostre uma fruta e pergunte: "What color is it?". As crianças respondem e levantam o cartão da cor. Depois, faça o jogo "Touch something yellow!" com objetos da sala.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Count with me',
        minutes: 8,
        instructions:
          'Conte frutas de 1 a 10 em inglês, batendo palmas. Depois, mostre grupos de frutas e as crianças respondem "How many bananas?" — "Five bananas!".',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Feira em inglês',
        minutes: 18,
        instructions:
          'Monte barracas com as frutas. Metade da turma é feirante, metade é cliente, depois trocam. Diálogo modelo: "Hello! I want three oranges, please." — "Here you are!" — "Thank you!" — "Bye!". O cliente paga com tampinhas contando em inglês.',
        teacherNotes: 'Fixe o diálogo modelo no quadro com desenhos. Elogie tentativas, mesmo com pronúncia imperfeita.',
        offlineAlternative: 'Sem frutas reais ou de plástico, use desenhos feitos pelas próprias crianças no início da aula.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Bye-bye game',
        minutes: 7,
        instructions:
          'Para sair da roda, cada criança diz o nome de uma fruta e sua cor ("Green watermelon!") ou um número que você mostrar com os dedos.',
      },
    ],
    activity: {
      title: 'My fruit basket',
      instructions: [
        'Desenhe na cesta 5 frutas diferentes e pinte com as cores certas.',
        'Escreva o nome de cada fruta em inglês (use o cartaz como ajuda).',
        'Complete: I want ___ (número) ___ (fruta), please.',
        'Ligue o número à palavra: 1 one, 3 three, 5 five, 7 seven, 10 ten.',
      ],
      answerKey: [
        'Exemplos: banana – yellow; apple – red; orange – orange; watermelon – green; pineapple – yellow; mango – yellow/green; açaí – purple.',
        'Exemplo de frase: I want two mangoes, please.',
      ],
    },
    observeLearning: [
      'Nomeia frutas e cores em inglês com apoio visual.',
      'Conta até 10 e usa o número em uma frase.',
      'Participa do diálogo de compra usando "please" e "thank you".',
      'Arrisca-se a falar em inglês sem medo de errar.',
    ],
    adaptations: [
      'TEA: entregue um roteiro visual do diálogo da feira e permita que a criança comece como feirante (fala mais curta e previsível).',
      'TDAH: alterne atividades de movimento (touch something...) e de fala a cada poucos minutos e dê funções concretas na feira (caixa, organizador da barraca).',
      'Fala em construção: aceite respostas apontando ou com uma única palavra.',
    ],
    skills: [
      'Interagir oralmente em situações simples do cotidiano usando expressões de cortesia em língua inglesa.',
      'Reconhecer e utilizar vocabulário de frutas, cores e números em inglês.',
      'Perceber a presença de palavras de origem brasileira em outras línguas.',
    ],
    modes: ['jogar', 'conversar', 'fora-da-tela'],
    artId: 'subj-ingles',
    tags: ['fruits', 'colors', 'numbers', 'feira', 'oralidade', 'anos iniciais'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-ing-a-day-in-my-life',
    title: 'A day in my life: rotinas com simple present',
    summary:
      'A turma compara a rotina de adolescentes de diferentes lugares do Brasil, aprende verbos de rotina e horários em inglês e produz um pequeno vlog roteirizado (ou cartaz) sobre o próprio dia.',
    subjects: ['ingles'],
    etapa: 'fundamental2',
    anos: [7],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 7º ano que já conhecem pronomes e verbos básicos em inglês.',
    objectives: [
      'Usar o simple present para descrever rotinas (I wake up, I go to school...).',
      'Dizer as horas em inglês (at seven o’clock, at half past six).',
      'Produzir um texto oral ou escrito curto sobre a própria rotina.',
    ],
    materials: [
      'Três cartões com rotinas fictícias de adolescentes (uma jovem ribeirinha no Pará, um jovem de uma capital do Sudeste, uma jovem indígena Guarani em Mato Grosso do Sul)',
      'Relógio de papel com ponteiros móveis',
      'Folha de roteiro do vlog',
      'Celular da escola para gravação (opcional)',
    ],
    resources: ['projetor', 'dispositivos-grupo', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'acolhida',
        title: 'What time do you wake up?',
        minutes: 7,
        instructions:
          'Pergunte a alguns estudantes: "What time do you wake up?". Use o relógio de papel para mostrar as horas e a turma repete. Escreva no quadro: "I wake up at ___".',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Three teens, three routines',
        minutes: 13,
        instructions:
          'Em grupos, os estudantes leem um cartão de rotina e sublinham os verbos (wake up, have breakfast, take the boat, go to school, help my family, play soccer, do homework, go to bed). Cada grupo conta à turma, em português, uma diferença e uma semelhança com a própria rotina.',
        teacherNotes:
          'Os cartões mostram jovens com vidas plenas e atuais (escola, celular, esporte, família). Evite qualquer representação exótica ou de "vida no passado" da jovem indígena ou da ribeirinha.',
      },
      {
        id: 'b3',
        kind: 'conversa',
        title: 'Simple present em foco',
        minutes: 10,
        instructions:
          'Mostre como a rotina muda da 1ª para a 3ª pessoa: "I take the boat" / "She takes the boat". Faça um jogo rápido: você diz uma frase com "I" e a turma transforma para "He" ou "She".',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'My vlog script',
        minutes: 15,
        instructions:
          'Cada estudante escreve um roteiro de vlog com 6 frases sobre seu dia, com pelo menos 4 horários. Quem quiser grava um vídeo curto em grupo com o celular da escola; os demais fazem um cartaz em forma de linha do tempo.',
        offlineAlternative: 'Sem dispositivos, o "vlog" é apresentado ao vivo, com uma moldura de papelão imitando a tela do celular.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Guess who',
        minutes: 5,
        instructions:
          'Leia trechos de alguns roteiros (sem dizer o nome) e a turma tenta adivinhar de quem é. Pergunte: "Which verb did she use?".',
      },
    ],
    activity: {
      title: 'A day in my life',
      instructions: [
        'Complete com o verbo certo: I ___ (wake up) at six o’clock. She ___ (go) to school by bus. He ___ (play) soccer in the afternoon.',
        'Escreva 6 frases sobre a sua rotina, com pelo menos 4 horários.',
        'Reescreva 2 das suas frases na 3ª pessoa, como se um colega estivesse falando de você.',
      ],
      answerKey: [
        'I wake up at six o’clock. / She goes to school by bus. / He plays soccer in the afternoon.',
        'Na 3ª pessoa do singular, acrescenta-se -s ou -es ao verbo: I go → she goes; I have → he has.',
      ],
    },
    observeLearning: [
      'Usa verbos de rotina corretamente no simple present.',
      'Aplica o -s da 3ª pessoa do singular na maioria das frases.',
      'Diz e escreve horários em inglês.',
      'Compara rotinas com respeito às diferentes realidades brasileiras.',
    ],
    adaptations: [
      'TEA: ofereça um banco de frases com lacunas para o roteiro e a opção de apresentar só por escrito, sem gravação.',
      'TDAH: divida o roteiro em 3 partes (manhã, tarde, noite) com 2 frases cada e permita ilustrar a linha do tempo.',
      'Nível inicial: aceite frases com o verbo no infinitivo e horário em números (I wake up 6:00).',
    ],
    skills: [
      'Produzir textos orais e escritos sobre a rotina, usando o presente simples.',
      'Ler textos curtos identificando informações específicas.',
      'Reconhecer a diversidade de modos de vida de jovens no Brasil, comparando-os à própria realidade.',
    ],
    modes: ['conversar', 'projeto'],
    artId: 'subj-ingles',
    tags: ['simple present', 'daily routine', 'telling the time', 'vlog', 'diversidade'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Tecnologia ─────────────────────────
  {
    id: 'x-tec-robo-humano-algoritmos',
    title: 'Robô humano: algoritmos com setas',
    summary:
      'Sem computador, a turma programa um "robô humano" com cartões de setas em uma grade no chão, descobre o que é um algoritmo e encontra e corrige "bugs" nas sequências.',
    subjects: ['tecnologia'],
    etapa: 'fundamental1',
    anos: [2, 3],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 2º e 3º ano sem experiência prévia em programação; atividade totalmente desplugada.',
    objectives: [
      'Compreender o que é um algoritmo: uma sequência ordenada de instruções.',
      'Criar sequências de comandos para levar um personagem de um ponto a outro.',
      'Encontrar e corrigir erros (bugs) em uma sequência.',
    ],
    materials: [
      'Fita crepe para desenhar uma grade 5x5 no chão',
      'Cartões de setas (frente, virar à direita, virar à esquerda)',
      'Objetos para "tesouro" e "obstáculos"',
      'Grades 5x5 impressas para a atividade individual',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Como escovar os dentes?',
        minutes: 7,
        instructions:
          'Peça que a turma dite os passos para escovar os dentes enquanto você segue EXATAMENTE o que dizem (sem completar o que falta). As crianças vão perceber que precisam ser precisas. Conclua: "Uma lista de passos bem definidos se chama algoritmo".',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Programando o robô',
        minutes: 15,
        instructions:
          'Uma criança é o robô na grade do chão. Os grupos montam com cartões de setas um caminho até o tesouro, desviando dos obstáculos. O robô executa cartão por cartão, sem "pensar por conta própria".',
        teacherNotes:
          'Atenção ao "virar": o robô gira no mesmo quadrado, sem andar. Faça uma demonstração lenta antes.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Caça ao bug',
        minutes: 10,
        instructions:
          'Mostre uma sequência com erro (o robô bate no obstáculo). Os grupos descobrem qual cartão está errado e corrigem. Explique que programadores chamam isso de "depurar" e que errar faz parte.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Meu algoritmo no papel',
        minutes: 13,
        instructions:
          'Na grade impressa, cada criança desenha um caminho e escreve a sequência de setas. Depois troca com um colega, que testa o algoritmo com o dedo.',
        offlineAlternative: 'Se não houver impressão, desenhe grades no caderno quadriculado ou no quadro.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'O que é algoritmo?',
        minutes: 5,
        instructions:
          'Pergunte à turma: "Que outros algoritmos usamos no dia a dia?" (receita, caminho para casa, regras de jogo). Cada criança fala ou desenha um.',
      },
    ],
    activity: {
      title: 'Ajude o robô a chegar ao tesouro',
      instructions: [
        'Na grade, o robô está no canto de baixo à esquerda, olhando para cima. O tesouro está no canto de cima à direita.',
        'Desenhe as setas do caminho, desviando das pedras.',
        'Escreva a sequência de comandos.',
        'Teste com o dedo. Encontrou um bug? Corrija!',
      ],
      answerKey: [
        'Existem vários caminhos corretos. Confira se cada comando leva o robô a um quadrado livre e se o último comando termina no tesouro.',
        'Exemplo sem obstáculos: frente, frente, frente, frente, virar à direita, frente, frente, frente, frente.',
      ],
    },
    observeLearning: [
      'Explica que um algoritmo é uma sequência ordenada e precisa de instruções.',
      'Monta sequências que funcionam na grade.',
      'Identifica e corrige o comando errado em uma sequência.',
      'Diferencia "virar" de "andar" ao programar.',
    ],
    adaptations: [
      'TEA: deixe a criança ser o "programador" em vez do robô, se preferir não ser observada; use cartões com cores fixas para cada comando.',
      'TDAH: o papel de robô ajuda a canalizar o movimento; mantenha sequências curtas (até 6 comandos) no início.',
      'Lateralidade em construção: cole uma fita colorida no lado direito do robô e no cartão de "virar à direita".',
    ],
    skills: [
      'Compreender a ideia de algoritmo como sequência finita de instruções.',
      'Criar e testar sequências de comandos para resolver problemas, de forma desplugada.',
      'Identificar e corrigir erros em instruções (depuração).',
    ],
    modes: ['jogar', 'fora-da-tela', 'experimentar'],
    artId: 'subj-tecnologia',
    tags: ['pensamento computacional', 'algoritmos', 'computação desplugada', 'depuração', 'sequência'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-tec-senhas-pegada-digital',
    title: 'Senhas fortes e pegada digital',
    summary:
      'A turma descobre como senhas são quebradas, cria frases-senha seguras sem revelar senhas reais e analisa perfis fictícios para entender o que a pegada digital revela sobre uma pessoa.',
    subjects: ['tecnologia'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'intermediario',
    audience: 'Turmas de 8º e 9º ano que já usam redes sociais, jogos on-line e aplicativos de mensagem.',
    objectives: [
      'Explicar por que senhas curtas e previsíveis são fáceis de descobrir.',
      'Criar frases-senha fortes e conhecer a verificação em duas etapas.',
      'Analisar quais informações pessoais ficam expostas em publicações e como reduzir essa exposição.',
    ],
    materials: [
      'Cartões com perfis fictícios de redes sociais (sem fotos de pessoas reais)',
      'Folha "Medidor de senha" com a tabela de combinações',
      'Calculadora (opcional)',
    ],
    resources: ['projetor', 'computador-unico', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Quanto tempo para adivinhar?',
        minutes: 7,
        instructions:
          'Pergunte: "Quantas tentativas um computador precisaria para adivinhar uma senha de 4 números?". Mostre que são 10 × 10 × 10 × 10 = 10.000 combinações — um programa testa isso em menos de um segundo.',
        teacherNotes: 'Deixe claro desde o início: ninguém deve dizer, escrever ou mostrar uma senha real durante a aula.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Medidor de senha',
        minutes: 12,
        instructions:
          'Em duplas, os estudantes calculam (ou estimam) o número de combinações para senhas de diferentes tamanhos e tipos de caracteres usando a tabela. Comparem "123456", "futebol2010" e uma frase-senha como "Meu gato come 3 bananas no café!".',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Detetive de perfis',
        minutes: 15,
        instructions:
          'Os grupos recebem perfis fictícios e descobrem quanto conseguem saber: escola, bairro, horários, nome do pet, aniversário. Depois, discutam: quais dessas informações aparecem em perguntas de segurança ou em senhas fracas? O que poderia ser usado por golpistas?',
        offlineAlternative: 'Tudo funciona com perfis impressos; nenhuma rede real é acessada.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Guia de segurança da turma',
        minutes: 11,
        instructions:
          'Cada grupo escreve 3 regras para um guia: criação de senhas, verificação em duas etapas, o que não publicar, o que fazer ao suspeitar de golpe. Junte as regras em um cartaz.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Uma mudança que vou fazer',
        minutes: 5,
        instructions:
          'Cada estudante escreve, sem revelar senhas, uma mudança que fará nas próprias contas ou publicações nesta semana.',
      },
    ],
    activity: {
      title: 'Ficha de segurança digital',
      instructions: [
        'Quantas combinações tem uma senha de 4 dígitos? E de 6 dígitos?',
        'Classifique como fraca ou forte e justifique: "maria2012"; "senha123"; "Pipoca-azul-dança-no-telhado!".',
        'Liste 3 informações do perfil fictício que poderiam ajudar alguém a adivinhar uma senha.',
        'Explique o que é verificação em duas etapas.',
      ],
      answerKey: [
        '4 dígitos: 10^4 = 10.000 combinações; 6 dígitos: 10^6 = 1.000.000 de combinações.',
        '"maria2012" e "senha123" são fracas (nomes, datas e sequências comuns). A frase-senha é forte: longa, com letras maiúsculas e minúsculas, símbolos e sem dados pessoais.',
        'Exemplos: nome do pet, data de aniversário, nome da escola, time do coração.',
        'Verificação em duas etapas: além da senha, o login exige uma segunda confirmação (código no celular ou aplicativo autenticador).',
      ],
    },
    observeLearning: [
      'Relaciona tamanho e variedade de caracteres à força da senha.',
      'Identifica dados pessoais expostos em perfis e avalia riscos.',
      'Propõe regras práticas e realistas de segurança.',
      'Respeita a privacidade dos colegas durante a aula.',
    ],
    adaptations: [
      'TEA: deixe explícito, por escrito, que nenhuma senha real deve ser compartilhada e ofereça exemplos concretos de frase-senha.',
      'TDAH: use cronômetro nas etapas do detetive de perfis e entregue os perfis um de cada vez.',
      'Dificuldade em potências: permita a calculadora e ofereça a tabela já preenchida para 4 dígitos como modelo.',
    ],
    skills: [
      'Compreender princípios de segurança da informação, como autenticação e força de senhas.',
      'Analisar riscos relacionados à exposição de dados pessoais em ambientes digitais.',
      'Adotar práticas éticas e seguras no uso de tecnologias digitais.',
    ],
    modes: ['investigar', 'jogar', 'conversar'],
    artId: 'subj-tecnologia',
    tags: ['cidadania digital', 'segurança', 'senhas', 'privacidade', 'pegada digital'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Educação Financeira ─────────────────────────
  {
    id: 'x-fin-festa-da-turma',
    title: 'Desejo ou necessidade? Planejando a festa da turma',
    summary:
      'Com um orçamento fictício, as crianças planejam a festa de fim de ano da turma, separam desejos de necessidades, comparam preços e fazem escolhas coletivas.',
    subjects: ['educacao-financeira', 'matematica'],
    etapa: 'fundamental1',
    anos: [3, 4],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 3º e 4º ano que já somam e subtraem valores com dinheiro.',
    objectives: [
      'Diferenciar desejos e necessidades em situações do cotidiano.',
      'Planejar gastos dentro de um orçamento, somando e subtraindo valores.',
      'Tomar decisões coletivas, justificando escolhas.',
    ],
    materials: [
      'Encarte fictício de mercado e loja de festas (preços fictícios)',
      'Dinheirinho de papel (R$ 100,00 fictícios por grupo)',
      'Folha de orçamento',
      'Cartões com itens (suco, frutas, pratinhos, balões, pula-pula, caixa de som)',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Do que uma festa precisa?',
        minutes: 7,
        instructions:
          'Pergunte: "Se a turma fosse organizar uma festa, o que não pode faltar? E o que seria legal ter?". Anote no quadro em duas colunas, ainda sem os títulos.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Desejo ou necessidade?',
        minutes: 10,
        instructions:
          'Mostre cartões de itens. As crianças vão para o lado da sala "NECESSIDADE" ou "DESEJO". Discuta os casos em que a turma se divide: "Pratinhos são necessários? E o pula-pula?".',
        teacherNotes: 'Mostre que não há vergonha em ter desejos: o importante é atender primeiro às necessidades e escolher quais desejos cabem no orçamento.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Comprando com R$ 100,00',
        minutes: 18,
        instructions:
          'Cada grupo recebe R$ 100,00 fictícios e o encarte. Precisam garantir comida, bebida e pratinhos para 25 crianças e, com o que sobrar, escolher desejos. Registram tudo na folha de orçamento.',
        offlineAlternative: 'Sem impressão, escreva o encarte no quadro e use tampinhas como moedas.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Feira de planos',
        minutes: 10,
        instructions:
          'Cada grupo apresenta seu plano: o que comprou, quanto gastou, quanto sobrou e por quê. A turma vota no plano mais equilibrado, explicando o voto.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Frase do dia',
        minutes: 5,
        instructions:
          'Cada criança completa: "Antes de comprar, eu vou perguntar se é ___ ou ___".',
      },
    ],
    activity: {
      title: 'Orçamento da festa (preços fictícios)',
      instructions: [
        'Preços fictícios: suco (pacote para 25) R$ 18,00; frutas R$ 25,00; pão com recheio para 25 R$ 30,00; pratinhos e copos R$ 12,00; balões R$ 10,00; pula-pula R$ 60,00; chapeuzinhos R$ 15,00.',
        'Marque as necessidades e some quanto custam.',
        'Quanto sobra dos R$ 100,00 depois das necessidades?',
        'Com o que sobrou, quais desejos é possível comprar? Dá para alugar o pula-pula?',
      ],
      answerKey: [
        'Necessidades: suco (18) + frutas (25) + pão (30) + pratinhos e copos (12) = R$ 85,00.',
        'Sobra: 100 − 85 = R$ 15,00.',
        'Com R$ 15,00 é possível comprar os balões (R$ 10,00) ou os chapeuzinhos (R$ 15,00), mas não os dois. O pula-pula (R$ 60,00) não cabe no orçamento.',
      ],
    },
    observeLearning: [
      'Classifica itens em desejo e necessidade, justificando.',
      'Soma e subtrai valores em reais corretamente.',
      'Respeita o limite do orçamento e explica as escolhas.',
      'Ouve os colegas e participa da decisão coletiva.',
    ],
    adaptations: [
      'TEA: entregue os cartões de itens já com imagens e preços e explique antes que alguns itens geram discordância, e que isso é esperado.',
      'TDAH: dê papéis no grupo (caixa, anotador, comprador) e organize o encarte em poucos itens por vez.',
      'Dificuldade em cálculo: use cédulas e moedas de papel para contar fisicamente.',
    ],
    skills: [
      'Diferenciar desejos e necessidades nas decisões de consumo.',
      'Resolver problemas envolvendo o sistema monetário brasileiro, com adição e subtração.',
      'Planejar gastos dentro de um orçamento e tomar decisões coletivas.',
    ],
    modes: ['jogar', 'fora-da-tela', 'conversar'],
    artId: 'subj-educacao-financeira',
    tags: ['orçamento', 'desejo e necessidade', 'sistema monetário', 'consumo consciente', 'planejamento'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-fin-compra-parcelada-juros',
    title: 'Quanto custa o "sem entrada"? Juros na compra parcelada',
    summary:
      'Comparando anúncios fictícios de um celular à vista e parcelado, a turma calcula o custo total, descobre os juros embutidos e decide quando vale a pena esperar e poupar.',
    subjects: ['educacao-financeira', 'matematica'],
    etapa: 'fundamental2',
    anos: [8, 9],
    durationMin: 50,
    difficulty: 'desafiador',
    audience: 'Turmas de 8º e 9º ano que já calculam porcentagens e começam a lidar com compras e crediário na família.',
    objectives: [
      'Calcular o custo total de uma compra parcelada e compará-lo ao preço à vista.',
      'Calcular a diferença percentual entre preço à vista e parcelado (juros embutidos).',
      'Comparar a estratégia de parcelar com a de poupar e comprar à vista.',
    ],
    materials: [
      'Anúncios fictícios impressos (preços fictícios)',
      'Calculadora',
      'Folha de comparação',
    ],
    resources: ['sem-dispositivos', 'impressora', 'projetor'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: '12x sem entrada é barato?',
        minutes: 6,
        instructions:
          'Mostre o anúncio fictício: "Celular por apenas 12x de R$ 149,90 sem entrada! À vista: R$ 1.399,00". Pergunte: "Qual opção é mais barata? Quanto a mais se paga?". Recolha palpites.',
      },
      {
        id: 'b2',
        kind: 'atividade',
        title: 'Calculando o custo real',
        minutes: 14,
        instructions:
          'Em duplas, calculem o total parcelado (12 × 149,90 = R$ 1.798,80), a diferença (R$ 399,80) e a porcentagem a mais em relação ao preço à vista (cerca de 28,6%). Depois façam o mesmo com dois outros anúncios.',
        teacherNotes:
          'Explique que essa porcentagem é o acréscimo total, não a taxa mensal de juros. A taxa mensal exige cálculos de juros compostos que podem ser explorados com turmas mais avançadas.',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Desafio: esperar ou parcelar?',
        minutes: 15,
        instructions:
          'Simulação: um estudante consegue guardar R$ 150,00 por mês. Quantos meses leva para juntar R$ 1.399,00? Comparem os dois caminhos em uma tabela mês a mês: na opção parcelada, o celular chega no mês 1 e custa R$ 1.798,80; na opção poupar, chega no mês 10 e custa R$ 1.399,00. Os grupos discutem quando cada escolha faz sentido.',
        offlineAlternative: 'Sem calculadora, divida a turma para fazer as contas mês a mês em conjunto no quadro.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Armadilhas e boas práticas',
        minutes: 10,
        instructions:
          'Discutam: o que é "juros sem juros" de verdade (quando o à vista é igual ao parcelado)? O que acontece se uma parcela atrasar? Por que é perigoso comprometer muitas parcelas ao mesmo tempo?',
        teacherNotes: 'Evite julgar famílias que parcelam: muitas vezes é a única forma de acesso a bens importantes. O foco é tomar decisões informadas.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Conselho de bolso',
        minutes: 5,
        instructions:
          'Cada estudante escreve um conselho de até duas linhas para alguém que vai comprar um produto parcelado.',
      },
    ],
    activity: {
      title: 'Comparando anúncios (valores fictícios)',
      instructions: [
        'Anúncio A: tênis à vista R$ 300,00 ou 10x de R$ 30,00.',
        'Anúncio B: bicicleta à vista R$ 900,00 ou 10x de R$ 110,00.',
        'Anúncio C: fone à vista R$ 200,00 ou 4x de R$ 62,50.',
        'Para cada anúncio, calcule o total parcelado, a diferença em reais e o acréscimo percentual.',
        'Em qual anúncio vale mais a pena parcelar? Justifique.',
      ],
      answerKey: [
        'A: total R$ 300,00 — diferença R$ 0,00 — acréscimo 0% (parcelamento realmente sem juros).',
        'B: total R$ 1.100,00 — diferença R$ 200,00 — acréscimo de aproximadamente 22,2%.',
        'C: total R$ 250,00 — diferença R$ 50,00 — acréscimo de 25%.',
        'Vale mais a pena parcelar no anúncio A, porque não há acréscimo; ainda assim, é preciso caber no orçamento mensal.',
      ],
    },
    observeLearning: [
      'Calcula corretamente o total parcelado e a diferença em relação ao preço à vista.',
      'Expressa o acréscimo em porcentagem.',
      'Compara estratégias (parcelar e poupar) considerando tempo e custo.',
      'Argumenta sem julgamentos, reconhecendo diferentes realidades familiares.',
    ],
    adaptations: [
      'TDAH: entregue os anúncios um por vez e use uma tabela já estruturada com as colunas a preencher.',
      'TEA: deixe explícitos os passos do cálculo em um cartão de apoio e ofereça o papel de "conferente" das contas do grupo.',
      'Dificuldade em porcentagem: permita trabalhar apenas com a diferença em reais e, depois, com ajuda da calculadora, a porcentagem.',
    ],
    skills: [
      'Resolver problemas que envolvam porcentagens, acréscimos e juros em situações de consumo.',
      'Comparar diferentes formas de pagamento, avaliando custos e benefícios.',
      'Desenvolver atitudes de consumo consciente e planejamento financeiro.',
    ],
    modes: ['investigar', 'conversar', 'jogar'],
    artId: 'subj-educacao-financeira',
    tags: ['juros', 'parcelamento', 'porcentagem', 'consumo consciente', 'crédito'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Economia ─────────────────────────
  {
    id: 'x-eco-da-troca-ao-dinheiro',
    title: 'Da troca ao dinheiro: por que a moeda existe?',
    summary:
      'Em um mercado de trocas na sala, a turma enfrenta as dificuldades do escambo, inventa uma moeda e entende as funções do dinheiro e a história do real.',
    subjects: ['economia', 'historia'],
    etapa: 'fundamental2',
    anos: [6],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 6º ano que estão começando a estudar como as sociedades se organizam para produzir e trocar.',
    objectives: [
      'Vivenciar as dificuldades do escambo (coincidência de desejos, divisibilidade, valor).',
      'Explicar as funções do dinheiro: meio de troca, medida de valor e reserva de valor.',
      'Conhecer brevemente a história das moedas no Brasil até o real.',
    ],
    materials: [
      'Cartões de "produtos" (peixe, farinha de mandioca, tecido, ferramenta, cesto, mel, milho)',
      'Cartões de "desejo" secretos',
      'Imagens de moedas antigas brasileiras e cédulas do real',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'projetor', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'jogo',
        title: 'Mercado de trocas',
        minutes: 15,
        instructions:
          'Cada estudante recebe 2 cartões de produto e 1 cartão de desejo secreto (o que precisa conseguir). Só vale trocar produto por produto. Dê 7 minutos e veja quantos conseguem seu desejo.',
        teacherNotes:
          'Explique que muitas sociedades, incluindo povos indígenas, organizavam (e ainda organizam) trocas com regras de reciprocidade que vão além do lucro. Evite apresentar a troca como algo "primitivo".',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Por que foi difícil?',
        minutes: 8,
        instructions:
          'Pergunte: "Quem não conseguiu trocar? Por quê?". Organize no quadro os problemas: a outra pessoa não queria meu produto; como dividir um peixe?; quanto vale um cesto em mel?',
      },
      {
        id: 'b3',
        kind: 'jogo',
        title: 'Rodada 2: inventando uma moeda',
        minutes: 10,
        instructions:
          'A turma decide um objeto para servir de moeda (sementes, tampinhas) e define preços para os produtos. Repitam o mercado e comparem quantos conseguiram o que precisavam.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Funções e história do dinheiro',
        minutes: 12,
        instructions:
          'Relacione o jogo às três funções do dinheiro. Mostre que no Brasil já circularam cruzeiro, cruzado, cruzado novo e cruzeiro real, até o real em 1994, criado para combater a inflação muito alta.',
        offlineAlternative: 'Sem projetor, use cédulas de brinquedo e uma linha do tempo desenhada no quadro.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Bilhete de saída',
        minutes: 5,
        instructions:
          'Cada estudante explica em uma frase uma vantagem do dinheiro em relação à troca direta, usando um exemplo do jogo.',
      },
    ],
    activity: {
      title: 'As funções do dinheiro',
      instructions: [
        'Descreva uma dificuldade que você teve na primeira rodada do mercado de trocas.',
        'Associe cada situação a uma função do dinheiro: (a) guardar dinheiro para comprar uma bicicleta no futuro; (b) comparar o preço de dois cadernos; (c) pagar a passagem de ônibus.',
        'Por que uma moeda precisa ser aceita por todos para funcionar?',
      ],
      answerKey: [
        '(a) reserva de valor; (b) medida de valor (unidade de conta); (c) meio de troca.',
        'Porque o dinheiro funciona com base na confiança: só serve para trocar se as outras pessoas também o aceitarem em pagamento.',
      ],
    },
    observeLearning: [
      'Identifica as dificuldades do escambo a partir da própria experiência no jogo.',
      'Associa situações cotidianas às funções do dinheiro.',
      'Reconhece a confiança coletiva como base do valor da moeda.',
      'Respeita as diferentes formas de organização econômica das sociedades.',
    ],
    adaptations: [
      'TEA: explique as regras do mercado com antecedência e ofereça um papel de "registrador das trocas" para quem preferir menos interação.',
      'TDAH: o jogo com movimento ajuda; use sinais claros de início e fim das rodadas com cronômetro visível.',
      'Leitura: os cartões de produtos têm imagem e nome.',
    ],
    skills: [
      'Compreender as funções do dinheiro e sua importância para as trocas nas sociedades.',
      'Relacionar mudanças na moeda brasileira a contextos históricos e econômicos.',
      'Reconhecer diferentes formas de organização das trocas em distintas sociedades.',
    ],
    modes: ['jogar', 'conversar', 'fora-da-tela'],
    artId: 'subj-economia',
    tags: ['dinheiro', 'escambo', 'moeda', 'história do real', 'economia'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-eco-oferta-demanda-tomate',
    title: 'Por que o preço do tomate sobe? Oferta e demanda',
    summary:
      'A partir de uma notícia fictícia sobre a alta do tomate, a turma simula um leilão de mercado, constrói curvas simples de oferta e demanda e explica as causas das variações de preço.',
    subjects: ['economia', 'matematica'],
    etapa: 'fundamental2',
    anos: [9],
    durationMin: 50,
    difficulty: 'desafiador',
    audience: 'Turmas de 9º ano que já leem gráficos cartesianos e acompanham notícias sobre preços.',
    objectives: [
      'Explicar como a oferta e a demanda influenciam os preços.',
      'Representar oferta e demanda em gráfico e identificar o preço de equilíbrio.',
      'Analisar causas reais de variação de preços de alimentos (clima, transporte, safra).',
    ],
    materials: [
      'Notícia fictícia impressa: "Preço do tomate dispara após chuvas"',
      'Cartões de comprador (com preço máximo) e de vendedor (com preço mínimo)',
      'Papel quadriculado e régua',
    ],
    resources: ['sem-dispositivos', 'projetor', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Notícia da semana',
        minutes: 6,
        instructions:
          'Leia a notícia fictícia e pergunte: "Por que o preço subiu? Quem perde e quem ganha com isso?". Anote as hipóteses.',
      },
      {
        id: 'b2',
        kind: 'jogo',
        title: 'Leilão do tomate',
        minutes: 16,
        instructions:
          'Metade da turma recebe cartões de comprador (preço máximo que aceita pagar pela caixa), metade de vendedor (preço mínimo que aceita receber). Compradores e vendedores negociam livremente por 5 minutos; cada negócio fechado é anotado no quadro. Rodada 2: anuncie "chuvas destruíram parte da safra" e retire metade dos vendedores. Comparem os preços das duas rodadas.',
        teacherNotes:
          'Os preços médios da rodada 2 tendem a subir. Se não subirem, é um ótimo momento para discutir por quê (o que os compradores estavam dispostos a pagar).',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Desenhando as curvas',
        minutes: 14,
        instructions:
          'Com a tabela de dados fictícios, os estudantes desenham no papel quadriculado a curva de demanda (quanto maior o preço, menos se compra) e a de oferta (quanto maior o preço, mais se quer vender) e marcam o ponto de equilíbrio. Depois desenham a nova oferta após as chuvas.',
        offlineAlternative: 'Desenhe os eixos no quadro e construa as curvas coletivamente.',
      },
      {
        id: 'b4',
        kind: 'conversa',
        title: 'Muito além do mercado',
        minutes: 9,
        instructions:
          'Discutam outros fatores que mexem com os preços: custo do diesel e do frete, entressafra, exportação, intermediários. Quem é mais afetado quando o preço dos alimentos sobe? Que políticas públicas podem ajudar (estoques reguladores, apoio à agricultura familiar, feiras diretas do produtor)?',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Explique a manchete',
        minutes: 5,
        instructions:
          'Cada estudante explica, em até 4 linhas e usando as palavras oferta, demanda e preço, por que o tomate ficou mais caro.',
      },
    ],
    activity: {
      title: 'Mercado do tomate (dados fictícios)',
      instructions: [
        'Tabela: a R$ 4,00 a caixa, compradores querem 100 caixas e vendedores oferecem 40; a R$ 6,00, 80 e 60; a R$ 8,00, 60 e 80; a R$ 10,00, 40 e 100.',
        'Desenhe as curvas de oferta e de demanda e marque o equilíbrio.',
        'Depois das chuvas, a oferta cai 40 caixas em cada preço. Desenhe a nova curva e indique o novo equilíbrio.',
        'Explique por que o preço mudou.',
      ],
      answerKey: [
        'Equilíbrio inicial: entre R$ 6,00 e R$ 8,00 — a R$ 7,00, cerca de 70 caixas (demanda = oferta).',
        'Nova oferta: R$ 4 → 0; R$ 6 → 20; R$ 8 → 40; R$ 10 → 60. Novo equilíbrio em cerca de R$ 9,00, com cerca de 50 caixas negociadas (menos tomate, preço mais alto).',
        'Com menos tomate disponível e a mesma demanda, compradores disputam a quantidade menor e o preço sobe até equilibrar.',
      ],
    },
    observeLearning: [
      'Explica a relação entre escassez e aumento de preço.',
      'Constrói gráfico com eixos nomeados e identifica o ponto de equilíbrio.',
      'Relaciona fatores reais (clima, transporte) às mudanças na oferta.',
      'Reconhece efeitos sociais da alta de preços dos alimentos.',
    ],
    adaptations: [
      'TDAH: o leilão canaliza a energia; no gráfico, ofereça eixos já desenhados e um checklist dos passos.',
      'TEA: explique o leilão com um exemplo antes, entregue um roteiro de fala para negociar e permita atuar como "registrador oficial" dos negócios.',
      'Dificuldade com gráficos: trabalhe primeiro só com a tabela, comparando valores linha a linha.',
    ],
    skills: [
      'Compreender o funcionamento do mercado a partir das relações entre oferta, demanda e preço.',
      'Construir e interpretar gráficos que representam relações entre variáveis.',
      'Analisar fatores econômicos, ambientais e sociais que influenciam o preço dos alimentos.',
    ],
    modes: ['jogar', 'investigar', 'conversar'],
    artId: 'subj-economia',
    tags: ['oferta e demanda', 'preços', 'inflação de alimentos', 'gráficos', 'agricultura familiar'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },

  // ───────────────────────── Política e Cidadania ─────────────────────────
  {
    id: 'x-pol-assembleia-da-turma',
    title: 'Assembleia da turma: regras justas e votação',
    summary:
      'A turma realiza uma assembleia de verdade para resolver um problema da sala: apresenta propostas, debate, vota e registra a decisão em ata, vivenciando a democracia na escola.',
    subjects: ['politica-cidadania'],
    etapa: 'fundamental1',
    anos: [4, 5],
    durationMin: 50,
    difficulty: 'introdutorio',
    audience: 'Turmas de 4º e 5º ano que já convivem com regras e combinados e podem participar de decisões coletivas.',
    objectives: [
      'Compreender a assembleia como espaço democrático para resolver problemas coletivos.',
      'Apresentar propostas, ouvir argumentos e votar de forma respeitosa.',
      'Registrar decisões e responsabilidades em ata.',
    ],
    materials: [
      'Caixa de sugestões (aberta na semana anterior)',
      'Cédulas de votação simples',
      'Urna de papelão',
      'Folha de ata',
    ],
    resources: ['sem-dispositivos', 'sem-internet', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Quem decide as regras?',
        minutes: 6,
        instructions:
          'Pergunte: "Quem decide as regras na sua casa, na escola, na cidade?". Explique que em uma democracia as pessoas participam das decisões, diretamente ou por representantes.',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'O problema da semana',
        minutes: 8,
        instructions:
          'Abra a caixa de sugestões e escolha com a turma um problema real e possível de resolver (organização da fila, uso da bola no recreio, cuidado com a biblioteca da sala). Defina os papéis: coordenador, secretário (escreve a ata) e guardião do tempo.',
        teacherNotes: 'Escolha um problema em que a turma realmente tenha poder de decisão, para que a experiência seja autêntica.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Propostas e debate',
        minutes: 18,
        instructions:
          'Grupos de 4 elaboram uma proposta em uma frase e um argumento. Cada grupo apresenta em 1 minuto. Abra o debate com as regras: pedir a palavra levantando a mão, falar da ideia e não da pessoa, ouvir até o fim.',
      },
      {
        id: 'b4',
        kind: 'atividade',
        title: 'Votação secreta',
        minutes: 10,
        instructions:
          'Cada criança vota em cédula secreta. Dois "mesários" contam os votos em voz alta e registram no quadro. Discuta: por que o voto secreto é importante? E o que fazemos com quem perdeu a votação?',
        offlineAlternative: 'Se preferir, faça a votação aberta com mãos levantadas e compare depois as vantagens de cada forma.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Ata e compromisso',
        minutes: 8,
        instructions:
          'O secretário lê a ata com a decisão, a data e os responsáveis por acompanhar. Combine uma data para avaliar se a decisão funcionou.',
      },
    ],
    activity: {
      title: 'Ata da assembleia',
      instructions: [
        'Data e local:',
        'Problema discutido:',
        'Propostas apresentadas (escreva todas):',
        'Resultado da votação (número de votos de cada proposta):',
        'Decisão final e quem vai acompanhar:',
        'Na sua opinião, a assembleia foi justa? Por quê?',
      ],
    },
    observeLearning: [
      'Formula proposta clara com argumento.',
      'Respeita turnos de fala e opiniões diferentes.',
      'Compreende o voto secreto e aceita o resultado da maioria.',
      'Reconhece que a minoria também deve ser ouvida e respeitada.',
    ],
    adaptations: [
      'TEA: explique o roteiro da assembleia com antecedência por escrito; ofereça um papel com regras claras (mesário, guardião do tempo) e a opção de apresentar a proposta por escrito.',
      'TDAH: use um objeto de fala (só fala quem segura) e um cronômetro visível para cada intervenção.',
      'Timidez ou fala em construção: permita que o grupo escolha um porta-voz e que a contribuição seja por desenho ou bilhete.',
    ],
    skills: [
      'Vivenciar práticas democráticas de participação, deliberação e votação.',
      'Argumentar e ouvir posições diferentes com respeito.',
      'Compreender a importância de regras construídas coletivamente para a convivência.',
    ],
    modes: ['conversar', 'projeto', 'fora-da-tela'],
    artId: 'subj-politica-cidadania',
    tags: ['democracia', 'assembleia', 'votação', 'convivência', 'protagonismo infantil'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
  {
    id: 'x-pol-camara-mirim-lei',
    title: 'Câmara mirim: como nasce uma lei municipal',
    summary:
      'A turma vive o processo legislativo municipal em uma simulação: identifica um problema do bairro, escreve um projeto de lei, debate em comissões, vota em plenário e discute o papel do prefeito e da população.',
    subjects: ['politica-cidadania', 'portugues'],
    etapa: 'fundamental2',
    anos: [6, 7],
    durationMin: 100,
    difficulty: 'intermediario',
    audience: 'Turmas de 6º e 7º ano começando a estudar a organização do Estado e os poderes no município.',
    objectives: [
      'Compreender as funções do Legislativo e do Executivo municipais.',
      'Conhecer as etapas de tramitação de um projeto de lei.',
      'Redigir um projeto de lei simples, com justificativa, e argumentar a favor ou contra.',
    ],
    materials: [
      'Cartões de papéis (vereadores, presidente da Câmara, prefeito, cidadãos)',
      'Modelo impresso de projeto de lei',
      'Fluxograma da tramitação',
      'Placas de votação (SIM, NÃO, ABSTENÇÃO)',
    ],
    resources: ['projetor', 'sem-dispositivos', 'impressora'],
    blocks: [
      {
        id: 'b1',
        kind: 'pergunta',
        title: 'Quem resolve os problemas do bairro?',
        minutes: 10,
        instructions:
          'Pergunte quais problemas a turma vê no bairro (iluminação, transporte, lixo, áreas de lazer). Para cada um, perguntem: isso é tarefa da prefeitura, da Câmara, do estado ou da própria comunidade?',
      },
      {
        id: 'b2',
        kind: 'conversa',
        title: 'Os poderes no município',
        minutes: 15,
        instructions:
          'Apresente o fluxograma: um projeto de lei é proposto (por vereador, prefeito ou iniciativa popular), passa por comissões, é votado em plenário e vai para sanção ou veto do prefeito. Explique a diferença entre fazer leis (Câmara) e executá-las (prefeitura).',
        offlineAlternative: 'Sem projetor, desenhe o fluxograma no quadro e entregue cópias impressas.',
      },
      {
        id: 'b3',
        kind: 'atividade',
        title: 'Escrevendo o projeto de lei',
        minutes: 25,
        instructions:
          'Em bancadas de 4 ou 5, os estudantes escolhem um problema e redigem um projeto de lei com: título, artigos curtos (Art. 1º, Art. 2º...) e justificativa. A proposta deve ser possível para um município.',
        teacherNotes:
          'Retome características do texto normativo: linguagem objetiva, verbos no futuro ou presente ("fica criado", "será"), artigos numerados.',
      },
      {
        id: 'b4',
        kind: 'jogo',
        title: 'Sessão da Câmara mirim',
        minutes: 35,
        instructions:
          'Cada bancada apresenta seu projeto em 2 minutos. Uma "comissão" de 3 estudantes faz uma pergunta. Abra 1 defesa e 1 crítica por projeto e votem com as placas. Os projetos aprovados vão ao "prefeito" (um estudante), que sanciona ou veta justificando. Se vetar, o plenário pode derrubar o veto com maioria absoluta.',
        teacherNotes: 'Conduza como presidente da sessão, garantindo tempo igual e respeito. Lembre que na vida real há audiências públicas em que a população pode falar.',
      },
      {
        id: 'b5',
        kind: 'avaliacao',
        title: 'Da simulação para a realidade',
        minutes: 15,
        instructions:
          'Discuta: como a população participa de verdade? (audiências públicas, projetos de iniciativa popular, ouvidoria, conselhos municipais). Cada estudante escreve uma forma pela qual poderia participar das decisões da cidade.',
      },
    ],
    activity: {
      title: 'Meu projeto de lei',
      instructions: [
        'Título: "Projeto de Lei nº ___ — Dispõe sobre ___".',
        'Art. 1º: o que a lei cria ou determina.',
        'Art. 2º: quem é responsável por cumprir.',
        'Art. 3º: de onde virão os recursos ou como será feito.',
        'Justificativa: por que essa lei é necessária para o bairro (mínimo 5 linhas).',
        'Responda: quais etapas esse projeto precisa percorrer até virar lei?',
      ],
      answerKey: [
        'Etapas: apresentação do projeto → análise nas comissões → discussão e votação em plenário → sanção ou veto do prefeito → (se vetado) apreciação do veto pela Câmara → publicação.',
        'Câmara Municipal: elabora leis e fiscaliza a prefeitura. Prefeitura: administra o município e executa as leis.',
      ],
    },
    observeLearning: [
      'Diferencia as funções da Câmara e da prefeitura.',
      'Descreve as etapas da tramitação de um projeto de lei.',
      'Redige artigos objetivos e uma justificativa argumentativa.',
      'Participa do debate com argumentos e respeito às regras da sessão.',
    ],
    adaptations: [
      'TEA: ofereça papéis com roteiro definido (secretário da sessão, comissão) e antecipe a ordem de apresentação das bancadas.',
      'TDAH: divida a escrita do projeto em artigos atribuídos a integrantes diferentes e use cronômetro visível na sessão.',
      'Escrita: ofereça o modelo de projeto com lacunas e um banco de expressões do texto normativo.',
    ],
    skills: [
      'Compreender a organização dos poderes no município e o processo de elaboração das leis.',
      'Identificar formas de participação cidadã nas decisões públicas.',
      'Produzir textos normativos e argumentativos adequados ao contexto de circulação.',
    ],
    modes: ['projeto', 'conversar', 'jogar'],
    artId: 'subj-politica-cidadania',
    tags: ['processo legislativo', 'Câmara Municipal', 'cidadania', 'texto normativo', 'participação'],
    origin: 'biblioteca',
    createdAt: D,
    updatedAt: D,
  },
];
