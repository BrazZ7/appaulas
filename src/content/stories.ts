import type { Story } from '../types/models';

/**
 * Narrativas interativas ramificadas (6º–8º ano).
 * Lidas em voz alta pelo professor; a turma decide os caminhos.
 * Regras: todo `to` aponta para uma cena existente; toda cena sem escolhas tem `ending`.
 */

// ───────────────────────── A biblioteca dos finais possíveis ─────────────────────────

const biblioteca: Story = {
  id: 'biblioteca-finais',
  title: 'A biblioteca dos finais possíveis',
  subtitle: 'O mistério da página perdida',
  summary:
    'Lia encontra uma carta lacrada entre os livros da biblioteca do bairro e descobre que o romance mais querido da estante perdeu a última página. Seguindo pistas, a turma investiga quem levou o final — e decide se ele deve ser devolvido, reescrito ou deixado em aberto.',
  subjects: ['portugues'],
  anos: [6, 7, 8],
  durationMin: 45,
  artId: 'story-biblioteca-cover',
  characters: [
    {
      id: 'lia',
      name: 'Lia',
      description: 'Estudante de 12 anos, curiosa e teimosa. Lê com uma lanterna de bolso e anota tudo num caderno de capa verde.',
      color: '#22d3ee',
    },
    {
      id: 'caio',
      name: 'Caio',
      description: 'Colega de turma de Lia, observador e de poucas palavras. Usa cadeira de rodas e conhece cada corredor da biblioteca.',
      color: '#f59e0b',
    },
    {
      id: 'ivone',
      name: 'Dona Ivone',
      description: 'Bibliotecária há trinta anos. Guarda chaves, segredos e uma memória impressionante para nomes de leitores.',
      color: '#a78bfa',
    },
  ],
  stats: [
    { id: 'pistas', label: 'Pistas', initial: 0, icon: 'search' },
    { id: 'confianca', label: 'Confiança', initial: 1, icon: 'heart-handshake' },
  ],
  startSceneId: 'inicio',
  scenes: {
    inicio: {
      id: 'inicio',
      title: 'Um envelope entre os livros',
      artId: 'story-biblioteca-cover',
      speakerId: 'lia',
      paragraphs: [
        { text: 'A biblioteca do bairro cheirava a papel antigo e chuva recente. Lia puxou da estante "O Farol das Marés", o romance que todo mundo dizia ter o final mais bonito da cidade.' },
        { text: 'Do meio das páginas escorregou um envelope fechado com lacre de cera azul, desenhado com um pequeno farol. E, quando Lia folheou até o fim, o coração deu um salto: a última página tinha sido arrancada com cuidado, rente à costura.' },
        { text: 'No envelope, uma única frase escrita à mão: "Para quem tiver coragem de procurar o fim."' },
      ],
      pauseQuestion: 'O que a frase do envelope pode estar sugerindo? Quem vocês imaginam que a escreveu?',
      choices: [
        {
          id: 'inicio-carta',
          label: 'Investigar a carta',
          to: 'carta',
          consequence: 'Você decidiu abrir o envelope e ler cada detalhe com lupa.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'inicio-testemunha',
          label: 'Ouvir a testemunha',
          to: 'testemunha',
          consequence: 'Você decidiu perguntar a Caio, que estava na biblioteca a tarde toda.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
        {
          id: 'inicio-mapa',
          label: 'Explorar o mapa',
          to: 'mapa',
          consequence: 'Você reparou num desenho a lápis na contracapa e resolveu segui-lo.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
      ],
    },

    carta: {
      id: 'carta',
      title: 'O que a carta não diz',
      artId: 'story-biblioteca-carta',
      speakerId: 'lia',
      paragraphs: [
        { text: 'Sob a luz amarela do abajur, Lia rompeu o lacre. Dentro, uma folha dobrada em quatro: "Escrevi um final e me arrependi. Escrevi outro e também. Talvez o fim não seja meu para decidir."' },
        { text: 'A letra era inclinada e firme, de quem escreve à mão há muitos anos. O papel tinha um leve cheiro de maresia, e no canto, quase apagadas, duas iniciais: A. M.' },
        { text: 'Lia notou outra coisa: a carta fala em "escrevi um final". Quem escreve finais não é um leitor qualquer.' },
      ],
      hypothesisPrompt: 'Quem é A. M.? Registrem uma hipótese e as pistas da carta que a sustentam.',
      choices: [
        {
          id: 'carta-fichas',
          label: 'Comparar as iniciais com as fichas de empréstimo',
          to: 'fichas',
          consequence: 'Você decidiu procurar A. M. no fichário antigo da biblioteca.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'carta-testemunha',
          label: 'Perguntar a Caio se viu alguém deixar o envelope',
          to: 'testemunha',
          consequence: 'Você decidiu que uma pista fica mais forte quando alguém a confirma.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
      ],
    },

    testemunha: {
      id: 'testemunha',
      title: 'O que Caio viu',
      speakerId: 'caio',
      paragraphs: [
        { text: 'Caio girou a cadeira devagar, como quem organiza a memória. — Na quinta passada, uma senhora de cachecol azul ficou um tempão naquela estante. Andava com uma bengala de madeira e tinha areia nos sapatos.' },
        { text: '— Ela abriu um livro, ficou parada olhando a última página e depois... guardou alguma coisa na bolsa. Achei que era um marcador.' },
        { text: 'Caio olhou para o envelope nas mãos de Lia e completou: — O lacre tem o mesmo farol do broche que ela usava.', when: { visited: 'carta' } },
        { text: 'Lia percebeu que Caio contava só o que tinha visto, sem inventar o resto. Uma testemunha assim vale ouro.' },
      ],
      pauseQuestion: 'O que Caio viu de fato e o que ele apenas supôs? Como separar as duas coisas?',
      choices: [
        {
          id: 'testemunha-fichas',
          label: 'Procurar a senhora do cachecol nas fichas de empréstimo',
          to: 'fichas',
          consequence: 'Você decidiu cruzar o relato de Caio com os registros da biblioteca.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'testemunha-ivone',
          label: 'Contar tudo a Dona Ivone',
          to: 'ivone',
          consequence: 'Você decidiu confiar na bibliotecária e pedir ajuda.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
      ],
    },

    mapa: {
      id: 'mapa',
      title: 'Um mapa na contracapa',
      speakerId: 'lia',
      paragraphs: [
        { text: 'Na contracapa, alguém havia desenhado a lápis a planta da biblioteca: o balcão, as estantes, a escada estreita. Um X marcava a sala de obras raras, no fim do corredor.' },
        { text: 'Ao lado do X, uma seta e uma palavra miúda: "rascunhos". Lia passou o dedo e o grafite manchou — o desenho era recente.' },
        { text: 'Ela lembrou do lacre azul: o mesmo farol aparecia num cantinho do mapa, desenhado como uma assinatura.', when: { visited: 'carta' } },
      ],
      choices: [
        {
          id: 'mapa-sala',
          label: 'Seguir o X até a sala de obras raras',
          to: 'sala-raras',
          consequence: 'Você decidiu ir direto ao lugar marcado, antes que alguém apagasse o mapa.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'mapa-ivone',
          label: 'Pedir a Dona Ivone para entrar na sala',
          to: 'ivone',
          consequence: 'Você decidiu que entrar escondido não era o melhor caminho.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
      ],
    },

    fichas: {
      id: 'fichas',
      title: 'O fichário esquecido',
      speakerId: 'lia',
      paragraphs: [
        { text: 'No fundo de uma gaveta, as fichas de cartolina guardavam décadas de leitores. Lia procurou "O Farol das Marés" e encontrou o mesmo nome repetido, ano após ano: A. Marinho.' },
        { text: 'Então ela virou o livro e olhou a capa como se fosse a primeira vez. Autora: Aurora Marinho.' },
        { text: 'A autora emprestava o próprio livro. Por quê? Lia anotou no caderno: "Ninguém relê tanto um livro que já considera terminado."' },
        { text: 'E a senhora de cachecol azul que Caio descreveu? Agora a pista tinha nome.', when: { visited: 'testemunha' } },
      ],
      pauseQuestion: 'Por que uma autora pegaria emprestado o próprio livro tantas vezes? Que inferência dá para fazer?',
      choices: [
        {
          id: 'fichas-ivone',
          label: 'Mostrar a descoberta a Dona Ivone',
          to: 'ivone',
          consequence: 'Você decidiu levar a prova a quem conhece os leitores pelo nome.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'fichas-sala',
          label: 'Ir sozinha até a sala de obras raras',
          to: 'sala-raras',
          consequence: 'Você decidiu agir rápido, mesmo sem avisar ninguém.',
          effects: [{ stat: 'confianca', delta: -1 }],
        },
      ],
    },

    ivone: {
      id: 'ivone',
      title: 'A bibliotecária e a chave',
      speakerId: 'ivone',
      paragraphs: [
        { text: 'Dona Ivone tirou os óculos e suspirou. — Aurora Marinho mora na casa amarela perto do farol. Vem toda quinta-feira, senta na mesma cadeira e lê o próprio livro como quem conversa com um velho amigo.' },
        { text: '— Ela me disse uma vez que o final nunca pareceu dela. Que os leitores sabiam mais sobre a história do que ela.' },
        { text: 'Dona Ivone olhou as fichas que Lia trazia e sorriu de lado: — Você chegou mais longe do que muita gente grande.', when: { visited: 'fichas' } },
        { text: 'Ela abriu a gaveta do balcão e mostrou uma chave de ferro. — A sala de obras raras. Aurora pediu para guardar uma caixa lá.' },
        { text: 'Hoje, por acaso, era quinta-feira.' },
      ],
      choices: [
        {
          id: 'ivone-chave',
          label: 'Pedir a chave da sala de obras raras',
          to: 'sala-raras',
          consequence: 'Você decidiu ver com os próprios olhos o que a caixa guarda.',
        },
        {
          id: 'ivone-esperar',
          label: 'Esperar Aurora na cadeira de sempre',
          to: 'encontro',
          consequence: 'Você reuniu pistas suficientes para reconhecer Aurora quando ela chegar.',
          requires: { stat: 'pistas', gte: 3 },
          effects: [{ stat: 'confianca', delta: 1 }],
        },
      ],
    },

    'sala-raras': {
      id: 'sala-raras',
      title: 'A sala de obras raras',
      artId: 'story-biblioteca-portas',
      speakerId: 'lia',
      paragraphs: [
        { text: 'A porta rangeu. Lá dentro, a poeira dançava num raio de sol. Sobre a mesa, uma caixa de madeira com três divisórias, e na tampa: "Finais possíveis".' },
        { text: 'Na parede, três quadros antigos pareciam portas abertas: um mar agitado, uma cidade acesa à noite, uma floresta úmida. Lia teve a impressão de que cada um levava a um fim diferente.' },
        { text: 'Caio vinha logo atrás, empurrando a cadeira com cuidado entre as estantes. — Eu não ia deixar você vir sozinha — disse.', when: { stat: 'confianca', gte: 2 } },
        { text: 'No chão de tábuas, havia grãos de areia fina, em fila, até a janela que dá para o mar.' },
      ],
      choices: [
        {
          id: 'sala-caixa',
          label: 'Abrir a caixa dos finais',
          to: 'rascunhos',
          consequence: 'Você decidiu ler os finais que a autora não teve coragem de publicar.',
          effects: [{ stat: 'pistas', delta: 1 }],
        },
        {
          id: 'sala-janela',
          label: 'Seguir a trilha de areia até a janela',
          to: 'encontro',
          consequence: 'Você juntou as pistas e entendeu quem acabara de passar por ali.',
          requires: { stat: 'pistas', gte: 3 },
        },
      ],
    },

    rascunhos: {
      id: 'rascunhos',
      title: 'Três vozes para um final',
      artId: 'story-biblioteca-portas',
      speakerId: 'lia',
      paragraphs: [
        { text: 'Cada divisória guardava uma última página diferente. A primeira era narrada por Marina, a menina do livro: "Eu entrei no barco sem olhar para trás."' },
        { text: 'A segunda era contada pelo próprio farol, que via tudo de cima: "Naquela noite, minha luz alcançou o barco pela última vez."' },
        { text: 'A terceira tinha um narrador que sabia até os pensamentos escondidos: "Marina queria partir, mas o pai fingia dormir para não chorar."' },
        { text: 'Lia percebeu, espantada, que a história era a mesma — mas cada narrador mudava o que o leitor podia saber e sentir.' },
      ],
      pauseQuestion: 'Qual narrador muda mais a história: a personagem, o farol ou o narrador que sabe tudo? Por quê?',
      hypothesisPrompt: 'Por que a autora escreveu o mesmo final com três narradores diferentes?',
      choices: [
        {
          id: 'rascunhos-colar',
          label: 'Escolher um rascunho e devolvê-lo ao livro',
          to: 'fim-rascunho',
          consequence: 'Você decidiu que um final escolhido é melhor do que nenhum.',
        },
        {
          id: 'rascunhos-branco',
          label: 'Deixar a página em branco com um convite',
          to: 'fim-branco',
          consequence: 'Você decidiu que o final pertence a quem ainda vai ler.',
        },
        {
          id: 'rascunhos-autora',
          label: 'Procurar a autora dos rascunhos',
          to: 'encontro',
          consequence: 'Com as pistas reunidas, você sabe exatamente onde encontrá-la.',
          requires: { stat: 'pistas', gte: 3 },
        },
      ],
    },

    encontro: {
      id: 'encontro',
      title: 'A senhora do cachecol azul',
      speakerId: 'lia',
      paragraphs: [
        { text: 'Ela estava junto à janela, olhando o mar: cachecol azul, bengala de madeira, um broche em forma de farol. Lia respirou fundo. — A senhora é Aurora Marinho.' },
        { text: 'Aurora não pareceu surpresa. — Demorou trinta anos para alguém procurar o fim. Eu arranquei a página porque cada leitor me contava um final diferente, e todos eram melhores que o meu.' },
        { text: 'Lia reconheceu a letra inclinada da carta no caderno que Aurora segurava.', when: { visited: 'carta' } },
        { text: 'Caio chegou ao lado de Lia e cumprimentou a autora: — Eu vi a senhora na quinta passada.', when: { visited: 'testemunha' } },
        { text: '— Então me diga, leitora — perguntou Aurora. — O que fazemos com um livro sem fim?' },
      ],
      pauseQuestion: 'Um livro pertence a quem escreve ou a quem lê? Pode pertencer aos dois?',
      choices: [
        {
          id: 'encontro-juntas',
          label: 'Convidar Aurora para escrever o final com a turma',
          to: 'fim-coautores',
          consequence: 'Você propôs que autora e leitores escrevam juntos.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
        {
          id: 'encontro-respeitar',
          label: 'Devolver a carta e respeitar a escolha dela',
          to: 'fim-branco',
          consequence: 'Você decidiu que a página vazia também é uma resposta.',
        },
      ],
    },

    'fim-coautores': {
      id: 'fim-coautores',
      title: 'Final: Muitas mãos, um farol',
      artId: 'story-biblioteca-final',
      paragraphs: [
        { text: 'Na quinta seguinte, a sala de leitura estava cheia. Aurora leu o começo da última página, e cada estudante escreveu uma frase em sequência.' },
        { text: 'Os três rascunhos da caixa viraram ponto de partida: a turma votou em contar o fim pela voz do farol.', when: { visited: 'rascunhos' } },
        { text: 'Dona Ivone colou a nova página no livro com cola de encadernação, e na ficha de empréstimo apareceu uma linha nova: "Autoria: Aurora Marinho e leitores da biblioteca".' },
      ],
      choices: [],
      ending: {
        title: 'Muitas mãos, um farol',
        reflection: 'Investigar com paciência levou Lia até a autora. Um final escrito em conjunto mostra que a leitura também é criação.',
        tone: 'luminoso',
      },
    },

    'fim-rascunho': {
      id: 'fim-rascunho',
      title: 'Final: A página que voltou',
      artId: 'story-biblioteca-final',
      paragraphs: [
        { text: 'Lia escolheu um dos rascunhos e o encaixou na costura do livro. A história agora tinha fim, e os leitores da biblioteca suspiraram aliviados.' },
        { text: 'Mas, à noite, Lia não conseguia dormir. E os outros dois finais, guardados de novo na caixa? Quem decide qual deles é o verdadeiro?' },
        { text: 'E a pessoa que escreveu a carta? Lia nunca soube quem era A. M.', when: { notVisited: 'fichas' } },
        { text: 'Lia sabia que A. M. era Aurora Marinho, mas nunca teve coragem de perguntar a ela se tinha escolhido o final certo.', when: { visited: 'fichas' } },
        { text: 'Às vezes, ao passar pela estante, ela tinha a impressão de que o livro esperava outra coisa dela.', when: { stat: 'confianca', lte: 1 } },
      ],
      choices: [],
      ending: {
        title: 'A página que voltou',
        reflection: 'Escolher um final fecha a história, mas deixa perguntas para trás. O que se perde quando decidimos rápido demais?',
        tone: 'agridoce',
      },
    },

    'fim-branco': {
      id: 'fim-branco',
      title: 'Final: A página em branco',
      artId: 'story-biblioteca-final',
      paragraphs: [
        { text: 'Lia colou no fim do livro uma folha em branco e, no alto, escreveu: "Este final ainda não existe. Escreva o seu e deixe na caixa do balcão."' },
        { text: 'Aurora passou pela estante, leu o convite e sorriu sem dizer nada.', when: { visited: 'encontro' } },
        { text: 'Na semana seguinte, a caixa tinha onze envelopes. Na outra, vinte e três. Ninguém sabe como a história de Marina termina — e talvez seja exatamente por isso que todo mundo continua lendo.' },
      ],
      choices: [],
      ending: {
        title: 'A página em branco',
        reflection: 'Um final aberto transforma leitores em autores. Que final a sua turma deixaria na caixa?',
        tone: 'aberto',
      },
    },
  },
  teacherGuide: [
    'Leia em voz alta com pausas dramáticas; antes de cada escolha, peça que a turma justifique o voto com uma pista do texto.',
    'Use o painel de pistas para mostrar que investigar com cuidado abre caminhos: o encontro com a autora só aparece com 3 pistas ou mais.',
    'Na cena "Três vozes para um final", releia as frases e peça que a turma identifique o tipo de narrador (personagem, observador, onisciente).',
    'Diferencie inferência de adivinhação: toda hipótese registrada precisa citar ao menos um detalhe do texto (letra, iniciais, areia, fichas).',
    'Se der tempo, volte ao início e siga outro caminho para comparar como as escolhas mudaram o que a turma sabia.',
  ],
  followUps: {
    escrita: 'Escreva a última página de "O Farol das Marés" escolhendo um narrador (Marina, o farol ou um narrador que sabe tudo) e explique sua escolha em duas linhas.',
    teatro: 'Em trios, encenem o encontro entre Lia, Caio e Aurora, mudando a decisão final. A plateia identifica quais pistas levaram até ali.',
    desenho: 'Desenhe as três portas da sala de obras raras e, em cada uma, uma cena do final que ela levaria.',
  },
};

// ───────────────────────── O mistério do Rio Claro ─────────────────────────

const rioClaro: Story = {
  id: 'rio-claro',
  title: 'O mistério do Rio Claro',
  subtitle: 'Quando a água muda de cor',
  summary:
    'Numa manhã, o Rio Claro amanhece verde e com cheiro forte. Davi e Yara levantam hipóteses — esgoto, fábrica, chuva, algas —, coletam evidências e decidem, com a comunidade, como agir. Cada escolha muda o que a turma descobre e quem caminha junto.',
  subjects: ['ciencias', 'geografia'],
  anos: [6, 7, 8],
  durationMin: 50,
  artId: 'story-rio-cover',
  characters: [
    {
      id: 'davi',
      name: 'Davi',
      description: 'Estudante do 7º ano, apaixonado por mapas e dados. Carrega sempre um caderno quadriculado e uma trena.',
      color: '#38bdf8',
    },
    {
      id: 'yara',
      name: 'Yara',
      description: 'Estudante do 7º ano que fotografa tudo. Mora perto da ponte e conhece o rio desde pequena.',
      color: '#a3e635',
    },
    {
      id: 'socorro',
      name: 'Dona Socorro',
      description: 'Moradora antiga do bairro e cuidadora da horta comunitária. Lembra de como o rio era há quarenta anos.',
      color: '#f97316',
    },
  ],
  stats: [
    { id: 'evidencias', label: 'Evidências', initial: 0, icon: 'flask-conical' },
    { id: 'apoio', label: 'Apoio da comunidade', initial: 1, icon: 'users' },
  ],
  startSceneId: 'inicio',
  scenes: {
    inicio: {
      id: 'inicio',
      title: 'O rio que mudou de cor',
      artId: 'story-rio-cover',
      speakerId: 'yara',
      paragraphs: [
        { text: 'Da ponte, Yara apontou para baixo sem conseguir falar. O Rio Claro, que sempre foi de um marrom transparente, estava verde como sopa de ervilha.' },
        { text: 'Um cheiro azedo subia da água. Perto da margem, uma camada fina, como tinta, boiava parada. Davi abriu o caderno: — Isso não aconteceu do nada.' },
        { text: 'No grupo do bairro, as mensagens já pipocavam: "É a fábrica!", "É veneno!", "É culpa da chuva!".' },
      ],
      hypothesisPrompt: 'Por que a água do rio pode ter mudado de cor? Listem todas as hipóteses da turma antes de escolher um caminho.',
      choices: [
        {
          id: 'inicio-margem',
          label: 'Descer até a margem e observar',
          to: 'margem',
          consequence: 'Você decidiu olhar de perto antes de acreditar em qualquer mensagem.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'inicio-socorro',
          label: 'Conversar com Dona Socorro',
          to: 'socorro',
          consequence: 'Você decidiu ouvir quem conhece a história do rio.',
          effects: [{ stat: 'apoio', delta: 1 }],
        },
        {
          id: 'inicio-post',
          label: 'Postar uma foto culpando a fábrica',
          to: 'post-fabrica',
          consequence: 'Você decidiu publicar primeiro e investigar depois.',
          effects: [{ stat: 'apoio', delta: -1 }],
        },
      ],
    },

    margem: {
      id: 'margem',
      title: 'Olhos na margem',
      speakerId: 'davi',
      paragraphs: [
        { text: 'De perto, o verde não era tinta: eram milhões de pontinhos, como poeira viva suspensa na água. Davi encheu um pote transparente e viu a cor se espalhar por igual.' },
        { text: 'Alguns peixes pequenos boiavam de barriga para cima perto de um cano que pingava do barranco. Rio abaixo, junto a uma obra sem árvores na margem, a água tinha outra cor: barrenta.' },
        { text: 'Yara fotografou tudo e anotou a hora, o lugar e o tempo: três dias sem chuva, calor forte.' },
      ],
      pauseQuestion: 'Por que anotar a hora, o lugar e o tempo junto com cada foto? O que isso muda numa investigação?',
      choices: [
        {
          id: 'margem-coleta',
          label: 'Coletar amostras em vários pontos do rio',
          to: 'coleta',
          consequence: 'Você decidiu comparar pontos diferentes, e não confiar numa só amostra.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'margem-cano',
          label: 'Seguir o cano até a origem',
          to: 'cano',
          consequence: 'Você decidiu descobrir de onde vem aquilo que pinga no rio.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    socorro: {
      id: 'socorro',
      title: 'A memória de Dona Socorro',
      speakerId: 'socorro',
      paragraphs: [
        { text: 'Dona Socorro largou a enxada da horta e olhou o rio com tristeza. — Em quarenta anos, vi esse rio verde só uma vez, numa seca braba. E depois que choveu forte, ele fica cor de café com leite, mas isso passa.' },
        { text: '— Dois meses atrás construíram um conjunto de casas rio acima. Gente boa, trabalhadora. Mas ninguém viu cano de esgoto chegando lá.' },
        { text: 'Davi anotou duas pistas diferentes: verde não é a mesma coisa que barrento. Talvez fossem dois problemas, e não um.' },
      ],
      choices: [
        {
          id: 'socorro-coleta',
          label: 'Coletar amostras para testar a ideia',
          to: 'coleta',
          consequence: 'Você decidiu transformar a memória de Dona Socorro em hipóteses testáveis.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'socorro-cano',
          label: 'Subir o rio até as casas novas',
          to: 'cano',
          consequence: 'Você decidiu seguir a pista das casas novas, com Dona Socorro mostrando o caminho.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    'post-fabrica': {
      id: 'post-fabrica',
      title: 'A foto que viralizou',
      speakerId: 'yara',
      paragraphs: [
        { text: 'Em uma hora, a foto tinha centenas de compartilhamentos. "Fábrica envenena o Rio Claro", escreveu alguém por cima. Yara nunca tinha dito isso — mas a frase era a dela que todos repetiam.' },
        { text: 'Funcionários da fábrica de tecidos, que moram no bairro, começaram a ser xingados na padaria. A professora de Ciências chamou Davi e Yara: — Vocês têm alguma evidência?' },
        { text: 'Eles se olharam em silêncio. Tinham só uma foto e uma suspeita.' },
      ],
      pauseQuestion: 'Qual a diferença entre uma suspeita e uma conclusão? Quem pode ser prejudicado por uma acusação sem evidência?',
      choices: [
        {
          id: 'post-apagar',
          label: 'Apagar o post e começar a investigar de verdade',
          to: 'coleta',
          consequence: 'Você reconheceu o erro e decidiu buscar evidências.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'post-visitar',
          label: 'Visitar a fábrica para checar a acusação',
          to: 'fabrica',
          consequence: 'Você decidiu testar a hipótese no próprio lugar suspeito.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    fabrica: {
      id: 'fabrica',
      title: 'Portões abertos',
      speakerId: 'davi',
      paragraphs: [
        { text: 'A engenheira da fábrica mostrou a estação de tratamento: tanques, filtros e um laudo mensal de qualidade da água. O efluente saía transparente.' },
        { text: '— Se fosse corante, a cor seria azul, vermelha, a cor do tecido do dia — explicou ela. — E repare: rio acima da fábrica, a água já está verde.' },
        { text: 'Davi conferiu com as próprias fotos. Ela tinha razão. A hipótese da fábrica não explicava o que viam. Yara sentiu o rosto queimar.' },
      ],
      hypothesisPrompt: 'Que evidência fez a hipótese da fábrica perder força? O que ainda precisaria ser verificado?',
      choices: [
        {
          id: 'fabrica-coleta',
          label: 'Coletar amostras acima e abaixo da fábrica',
          to: 'coleta',
          consequence: 'Você decidiu confirmar com dados o que a engenheira mostrou.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'fabrica-cano',
          label: 'Subir o rio para achar onde o verde começa',
          to: 'cano',
          consequence: 'Você decidiu procurar o ponto exato em que a água muda.',
          effects: [{ stat: 'apoio', delta: 1 }],
        },
      ],
    },

    coleta: {
      id: 'coleta',
      title: 'Luvas, potes e paciência',
      artId: 'story-rio-coleta',
      speakerId: 'davi',
      paragraphs: [
        { text: 'De luvas e botas, a turma coletou água em três pontos: antes das casas novas, logo depois do cano e perto da obra. Cada pote recebeu etiqueta com local e horário.' },
        { text: 'Com um kit simples de análise, mediram fosfato, nitrato e oxigênio dissolvido. Também colocaram uma garrafa transparente contra uma folha com letras para comparar a turbidez.' },
        { text: 'Os números contaram uma história: antes das casas, água limpa; depois do cano, muito fosfato e nitrato e pouco oxigênio; perto da obra, a água tão turva que as letras sumiam.' },
        { text: 'Yara pôs, ao lado, a foto do post apagado. Nenhum dado apontava para a fábrica.', when: { visited: 'post-fabrica' } },
      ],
      pauseQuestion: 'Por que coletar em três pontos diferentes e não em um só?',
      choices: [
        {
          id: 'coleta-analise',
          label: 'Analisar os dados com a professora',
          to: 'analise',
          consequence: 'Você decidiu entender o que os números significam antes de agir.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
        {
          id: 'coleta-cano',
          label: 'Ir até o cano descobrir de onde vem',
          to: 'cano',
          consequence: 'Você decidiu que os dados apontavam um lugar — e foi até lá.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    cano: {
      id: 'cano',
      title: 'Rio acima',
      speakerId: 'yara',
      paragraphs: [
        { text: 'Seguindo o barranco, chegaram ao conjunto de casas novas. O cano saía de uma caixa de concreto atrás das casas: o esgoto ia direto para o rio, porque a rede coletora ainda não tinha sido ligada.' },
        { text: 'Mais abaixo, a obra de uma rua tinha removido toda a vegetação da margem. A terra solta esperava a próxima chuva para escorrer para a água.' },
        { text: 'Dona Socorro, que tinha vindo junto, cruzou os braços: — Eu sabia que faltava esse cano.', when: { visited: 'socorro' } },
      ],
      choices: [
        {
          id: 'cano-moradores',
          label: 'Conversar com os moradores das casas novas',
          to: 'moradores',
          consequence: 'Você decidiu ouvir quem mora ali antes de apontar culpados.',
          effects: [{ stat: 'apoio', delta: 1 }],
        },
        {
          id: 'cano-analise',
          label: 'Fotografar tudo e voltar para analisar',
          to: 'analise',
          consequence: 'Você decidiu documentar a origem com cuidado.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    moradores: {
      id: 'moradores',
      title: 'Quem mora rio acima',
      speakerId: 'socorro',
      paragraphs: [
        { text: 'Dona Lúcia abriu o portão com uma criança no colo. Quando entendeu o que acontecia, ficou pálida. — A construtora disse que o esgoto estava ligado! A gente paga a conta de água todo mês.' },
        { text: 'Em minutos, vizinhos se juntaram. Ninguém queria poluir o rio onde os filhos brincavam. Queriam a rede funcionando — e agora tinham motivo para cobrar juntos.' },
        { text: 'Davi percebeu que o problema não tinha um vilão simples. Tinha responsáveis, e tinha gente afetada dos dois lados do rio.' },
      ],
      pauseQuestion: 'Os moradores das casas novas são culpados, vítimas ou as duas coisas? Quem deveria resolver o problema do esgoto?',
      choices: [
        {
          id: 'moradores-reuniao',
          label: 'Convidar todos para a reunião do bairro',
          to: 'reuniao',
          consequence: 'Você decidiu unir moradores antigos e novos numa mesma causa.',
          effects: [{ stat: 'apoio', delta: 1 }],
        },
        {
          id: 'moradores-analise',
          label: 'Voltar à escola para organizar as evidências',
          to: 'analise',
          consequence: 'Você decidiu chegar à reunião com os dados bem explicados.',
          effects: [{ stat: 'evidencias', delta: 1 }],
        },
      ],
    },

    analise: {
      id: 'analise',
      title: 'O que os dados dizem',
      speakerId: 'davi',
      paragraphs: [
        { text: 'A professora desenhou no quadro: esgoto leva fósforo e nitrogênio para o rio. Esses nutrientes funcionam como adubo para algas microscópicas, que se multiplicam e deixam a água verde. É a eutrofização.' },
        { text: 'Quando essa enorme quantidade de algas morre, bactérias a decompõem consumindo o oxigênio da água. Sem oxigênio, os peixes morrem. O calor e a água parada da seca pioram tudo.' },
        { text: 'A água barrenta perto da obra era outra história: turbidez causada pela terra que a chuva arrasta quando a margem fica sem vegetação. Dois problemas, duas causas.' },
        { text: 'Yara riscou do quadro a hipótese "fábrica". A visita tinha mostrado que o verde começava antes dela.', when: { visited: 'fabrica' } },
      ],
      hypothesisPrompt: 'Qual hipótese as evidências sustentam? Escrevam a conclusão da turma e as evidências que a apoiam.',
      choices: [
        {
          id: 'analise-reuniao',
          label: 'Levar as evidências à reunião do bairro',
          to: 'reuniao',
          consequence: 'Com evidências suficientes, você foi apresentar os resultados à comunidade.',
          requires: { stat: 'evidencias', gte: 3 },
          effects: [{ stat: 'apoio', delta: 1 }],
        },
        {
          id: 'analise-email',
          label: 'Mandar os dados por e-mail para a prefeitura',
          to: 'fim-relatorio',
          consequence: 'Você decidiu entregar o problema a quem tem a responsabilidade legal.',
        },
        {
          id: 'analise-acusar',
          label: 'Publicar um alerta culpando os moradores novos',
          to: 'fim-conflito',
          consequence: 'Você decidiu apontar um culpado nas redes sociais.',
          effects: [{ stat: 'apoio', delta: -2 }],
        },
      ],
    },

    reuniao: {
      id: 'reuniao',
      title: 'A reunião na quadra',
      speakerId: 'yara',
      paragraphs: [
        { text: 'A quadra da escola ficou cheia. Davi projetou os gráficos; Yara mostrou as fotos com local e horário. Pela primeira vez, todos olhavam para a mesma evidência.' },
        { text: 'A engenheira da fábrica estava lá. Yara pediu desculpas em público pelo post — e foi aplaudida.', when: { visited: 'post-fabrica' } },
        { text: 'Dona Lúcia e os vizinhos das casas novas sentaram ao lado de Dona Socorro. — O rio é de todo mundo — disse ela ao microfone.', when: { visited: 'moradores' } },
        { text: 'Um representante da companhia de saneamento admitiu: a ligação da rede estava atrasada. Agora era preciso decidir o que fazer.' },
      ],
      pauseQuestion: 'Que ações cabem à comunidade, à escola, à construtora e ao poder público?',
      choices: [
        {
          id: 'reuniao-mutirao',
          label: 'Propor um plano conjunto: ofício, prazo e mutirão',
          to: 'fim-mutirao',
          consequence: 'Com a comunidade unida, você propôs cobrar e agir ao mesmo tempo.',
          requires: { stat: 'apoio', gte: 3 },
        },
        {
          id: 'reuniao-relatorio',
          label: 'Entregar o relatório e aguardar a resposta oficial',
          to: 'fim-relatorio',
          consequence: 'Você entregou o relatório às autoridades e esperou.',
        },
      ],
    },

    'fim-mutirao': {
      id: 'fim-mutirao',
      title: 'Final: O rio de todo mundo',
      artId: 'story-rio-final',
      paragraphs: [
        { text: 'A associação de moradores protocolou um ofício com os dados da turma, e a companhia de saneamento marcou a ligação da rede para o mês seguinte. A comunidade acompanhou cada etapa.' },
        { text: 'Enquanto isso, um mutirão plantou mudas nativas na margem da obra, e a construtora instalou barreiras contra a erosão. Os estudantes voltaram a medir a água todo mês.' },
        { text: 'Três meses depois, o pote de Davi saiu do rio quase transparente. Dona Socorro e Dona Lúcia regaram juntas as mudas da margem.' },
      ],
      choices: [],
      ending: {
        title: 'O rio de todo mundo',
        reflection: 'Evidências convencem; comunidade unida transforma. Ciência e cidadania funcionaram juntas.',
        tone: 'luminoso',
      },
    },

    'fim-relatorio': {
      id: 'fim-relatorio',
      title: 'Final: Aguardando resposta',
      artId: 'story-rio-coleta',
      paragraphs: [
        { text: 'O relatório foi enviado com gráficos caprichados. A prefeitura respondeu agradecendo e informou que o caso seria analisado.' },
        { text: 'Semanas se passaram. O rio continuava verde nos dias quentes. Davi e Yara mantiveram as medições, mas sentiam que faltava alguma coisa.' },
        { text: 'Dona Socorro passou pela ponte e comentou: — Papel sozinho não anda, menino. Precisa de gente empurrando.', when: { visited: 'socorro' } },
      ],
      choices: [],
      ending: {
        title: 'Aguardando resposta',
        reflection: 'Os dados estavam certos, mas a mudança depende também de mobilização. O que a turma faria agora para não deixar o caso parado?',
        tone: 'aberto',
      },
    },

    'fim-conflito': {
      id: 'fim-conflito',
      title: 'Final: A margem dividida',
      artId: 'story-rio-cover',
      paragraphs: [
        { text: 'O alerta se espalhou rápido. Moradores antigos passaram a olhar torto para os novos, e os novos pararam de frequentar a feira do bairro.' },
        { text: 'A causa real — a rede de esgoto que nunca foi ligada — ficou esquecida no meio da briga. Ninguém cobrou a companhia de saneamento.' },
        { text: 'O rio continuou verde. Yara apagou a publicação, mas a frase já tinha ganhado vida própria.' },
      ],
      choices: [],
      ending: {
        title: 'A margem dividida',
        reflection: 'Uma conclusão científica pode ser certa e, ainda assim, ser comunicada de forma injusta. Como apresentar evidências sem criar inimigos?',
        tone: 'agridoce',
      },
    },
  },
  teacherGuide: [
    'Antes de começar, registre no quadro todas as hipóteses da turma (esgoto, fábrica, chuva, algas...). Volte a essa lista ao final e marque quais foram sustentadas ou descartadas.',
    'Explique eutrofização com um esquema simples: nutrientes → explosão de algas → decomposição → falta de oxigênio → morte de peixes.',
    'Diferencie as duas cores do rio: verde (algas por excesso de nutrientes) e barrenta (turbidez por sedimentos após chuva e erosão).',
    'Mostre que os medidores de Evidências e Apoio abrem finais diferentes: a reunião exige 3 evidências, e o plano conjunto exige 3 de apoio da comunidade.',
    'Discuta o caminho do post precipitado sem constranger: errar e corrigir publicamente também faz parte da ciência e da cidadania.',
  ],
  followUps: {
    escrita: 'Escreva um ofício curto à prefeitura sobre um problema ambiental do bairro, com observação, evidência e pedido claro.',
    teatro: 'Encenem a reunião na quadra com diferentes papéis: moradores antigos e novos, engenheira, companhia de saneamento e estudantes.',
    desenho: 'Desenhe o Rio Claro em três momentos: verde, barrento e recuperado, indicando com setas as causas de cada mudança.',
  },
};

// ───────────────────────── A rádio da escola ─────────────────────────

const radio: Story = {
  id: 'radio-escola',
  title: 'A rádio da escola',
  subtitle: 'Quarenta minutos para checar',
  summary:
    'Faltam quarenta minutos para o programa ao vivo da rádio da escola quando um print começa a circular: "o recreio vai acabar". Bia e Téo precisam decidir o que vai ao ar — checando fontes, separando fato, opinião e boato, e pensando nas pessoas por trás da notícia.',
  subjects: ['portugues', 'politica-cidadania', 'tecnologia'],
  anos: [6, 7, 8],
  durationMin: 45,
  artId: 'story-radio-cover',
  characters: [
    {
      id: 'bia',
      name: 'Bia',
      description: 'Apresentadora da rádio, do 8º ano. Fala rápido, tem voz firme e adora uma boa manchete.',
      color: '#f472b6',
    },
    {
      id: 'teo',
      name: 'Téo',
      description: 'Técnico de som e editor do programa, do 7º ano. Desconfiado por natureza: "Quem disse? Quando? Onde está escrito?"',
      color: '#22d3ee',
    },
    {
      id: 'rosangela',
      name: 'Professora Rosângela',
      description: 'Orientadora da rádio escolar. Acredita que os estudantes aprendem jornalismo fazendo — e errando com responsabilidade.',
      color: '#fde047',
    },
  ],
  stats: [
    { id: 'checagem', label: 'Checagem', initial: 0, icon: 'shield-check' },
    { id: 'confianca', label: 'Confiança dos ouvintes', initial: 2, icon: 'radio' },
  ],
  startSceneId: 'inicio',
  scenes: {
    inicio: {
      id: 'inicio',
      title: 'O print das 9h20',
      artId: 'story-radio-cover',
      speakerId: 'bia',
      paragraphs: [
        { text: 'Faltavam quarenta minutos para o "Intervalo no Ar". Bia testava o microfone quando o celular de Téo vibrou sem parar.' },
        { text: 'Era um print, encaminhado muitas vezes: "Comunicado da direção: a partir de segunda, o recreio passa a ter 10 minutos." No corredor, já se ouviam gritos de revolta.' },
        { text: '— Isso é a notícia do ano! — disse Bia, os olhos brilhando. Téo franziu a testa: — Ou é a confusão do ano.' },
      ],
      pauseQuestion: 'O que vocês fariam primeiro ao receber esse print? O que faz uma mensagem parecer confiável?',
      choices: [
        {
          id: 'inicio-noar',
          label: 'Abrir o programa com a bomba',
          to: 'ao-vivo-pressa',
          consequence: 'Você decidiu dar a notícia antes de todo mundo.',
          effects: [{ stat: 'confianca', delta: -1 }],
        },
        {
          id: 'inicio-redacao',
          label: 'Checar a fonte do print',
          to: 'redacao',
          consequence: 'Você decidiu desconfiar antes de transmitir.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
        {
          id: 'inicio-corredor',
          label: 'Perguntar no corredor o que as pessoas sabem',
          to: 'corredor',
          consequence: 'Você decidiu ouvir a escola antes de decidir.',
        },
      ],
    },

    corredor: {
      id: 'corredor',
      title: 'Vozes do corredor',
      speakerId: 'teo',
      paragraphs: [
        { text: 'Cada pessoa contava uma versão. "São 10 minutos." "Não, acabou o recreio!" "É só para o 8º ano." "Minha prima ouviu a diretora falando."' },
        { text: 'Um garoto do 6º ano jurava: — É verdade, todo mundo está falando! Téo anotou: "todo mundo está falando" não é uma fonte.' },
        { text: 'No meio da confusão, uma opinião se repetia: "Isso é um absurdo!". Era um sentimento legítimo — mas não dizia se a notícia era verdadeira.' },
      ],
      pauseQuestion: 'Quantas versões diferentes da mesma notícia apareceram? O que isso indica sobre um boato?',
      hypothesisPrompt: 'Como esse boato pode ter começado? Registrem uma hipótese e o que seria preciso checar para confirmá-la.',
      choices: [
        {
          id: 'corredor-noar',
          label: 'Ir ao ar com o que ouviram no corredor',
          to: 'ao-vivo-pressa',
          consequence: 'Você decidiu que, se muita gente fala, deve ser verdade.',
          effects: [{ stat: 'confianca', delta: -1 }],
        },
        {
          id: 'corredor-redacao',
          label: 'Levar as versões para a redação e comparar',
          to: 'redacao',
          consequence: 'Você decidiu comparar as versões para achar onde elas divergem.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
      ],
    },

    redacao: {
      id: 'redacao',
      title: 'Lupa no print',
      artId: 'story-radio-redacao',
      speakerId: 'teo',
      paragraphs: [
        { text: 'Na mesa da redação, Téo ampliou o print. Não havia data. A fonte das letras era diferente da usada nos comunicados oficiais. A imagem estava cortada bem em cima.' },
        { text: '— Encaminhado com frequência — leu Bia. — Ou seja: ninguém aqui sabe quem escreveu primeiro.' },
        { text: 'As versões do corredor estavam coladas num post-it: cada uma mudava um detalhe, como num telefone sem fio.', when: { visited: 'corredor' } },
      ],
      hypothesisPrompt: 'O print é verdadeiro, falso ou parcialmente verdadeiro? Que detalhes da imagem sustentam a hipótese de vocês?',
      choices: [
        {
          id: 'redacao-original',
          label: 'Procurar a mensagem original no canal oficial',
          to: 'original',
          consequence: 'Você decidiu ir atrás da fonte primária.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
        {
          id: 'redacao-direcao',
          label: 'Falar direto com a direção',
          to: 'direcao',
          consequence: 'Você decidiu perguntar a quem tem a informação oficial.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
      ],
    },

    original: {
      id: 'original',
      title: 'A mensagem inteira',
      speakerId: 'bia',
      paragraphs: [
        { text: 'No mural digital da escola, Bia encontrou o comunicado verdadeiro, de duas semanas atrás: "Na quarta-feira, dia do simulado, o intervalo será de 10 minutos para que todas as turmas terminem a prova no horário."' },
        { text: 'Alguém tinha recortado a data e trocado "Na quarta-feira" por "A partir de segunda". Uma informação real, distorcida, tinha virado boato.' },
        { text: 'Téo assobiou: — O mais perigoso não é a mentira inteira. É a meia-verdade.' },
      ],
      pauseQuestion: 'Por que um boato construído a partir de uma informação verdadeira engana mais facilmente?',
      choices: [
        {
          id: 'original-direcao',
          label: 'Confirmar com a direção',
          to: 'direcao',
          consequence: 'Você decidiu confirmar com uma segunda fonte, mesmo já tendo a original.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
        {
          id: 'original-autor',
          label: 'Descobrir quem recortou o print',
          to: 'autor-print',
          consequence: 'Você decidiu rastrear o caminho do boato até a origem.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
      ],
    },

    direcao: {
      id: 'direcao',
      title: 'Na sala da vice-diretora',
      speakerId: 'rosangela',
      paragraphs: [
        { text: 'A vice-diretora, Dona Marta, ouviu tudo e balançou a cabeça. — O intervalo menor é só na quarta, por causa do simulado. Nenhuma mudança permanente foi decidida.' },
        { text: '— Mas existe uma consulta do grêmio sobre o horário do intervalo do ano que vem — completou. — Esse debate é real, e a opinião de vocês importa.' },
        { text: 'Bia mostrou o comunicado original no celular. Dona Marta sorriu: — Vocês checaram antes de perguntar. Isso é jornalismo.', when: { visited: 'original' } },
        { text: 'A professora Rosângela, encostada na porta, apenas fez um sinal de positivo.' },
      ],
      choices: [
        {
          id: 'direcao-roteiro',
          label: 'Convidar Dona Marta para falar no programa',
          to: 'classificar',
          consequence: 'Você decidiu levar a fonte oficial para o ar.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
        {
          id: 'direcao-autor',
          label: 'Descobrir quem criou o print falso',
          to: 'autor-print',
          consequence: 'Você decidiu entender como o boato nasceu.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
      ],
    },

    'autor-print': {
      id: 'autor-print',
      title: 'Quem começou',
      speakerId: 'teo',
      paragraphs: [
        { text: 'Seguindo os encaminhamentos de grupo em grupo, Téo chegou a Nico, do 7º ano. Ele estava encolhido no banco do pátio.' },
        { text: '— Era uma brincadeira para o grupo da minha sala — disse, com a voz falhando. — Eu editei em dois minutos. Não achei que alguém fosse acreditar.' },
        { text: 'Bia segurava o roteiro. Contar o nome de Nico no ar daria audiência. Mas Nico tinha doze anos e estava apavorado.' },
      ],
      pauseQuestion: 'É justo divulgar o nome de quem criou o boato? Que diferença há entre explicar o que aconteceu e expor uma pessoa?',
      choices: [
        {
          id: 'autor-convidar',
          label: 'Convidar Nico a contar, se quiser, como um boato nasce',
          to: 'classificar',
          consequence: 'Você decidiu focar no aprendizado, não na punição pública.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
        {
          id: 'autor-expor',
          label: 'Anunciar o nome dele no ar',
          to: 'fim-exposicao',
          consequence: 'Você decidiu que todos deviam saber quem foi.',
          effects: [{ stat: 'confianca', delta: -1 }],
        },
      ],
    },

    classificar: {
      id: 'classificar',
      title: 'Fato, opinião ou boato?',
      artId: 'story-radio-redacao',
      speakerId: 'bia',
      paragraphs: [
        { text: 'Faltando dez minutos, Bia e Téo dividiram uma folha em três colunas. FATO: "Na quarta, o intervalo terá 10 minutos por causa do simulado." OPINIÃO: "Dez minutos é pouco tempo para lanchar." BOATO: "O recreio vai acabar a partir de segunda."' },
        { text: 'Nico topou gravar um depoimento curto, sem dizer o sobrenome: "Eu editei uma imagem achando que era piada. Aprendi que um print viaja mais rápido que um pedido de desculpas."', when: { visited: 'autor-print' } },
        { text: 'Dona Marta confirmou que entraria ao vivo por três minutos.', when: { visited: 'direcao' } },
        { text: 'Antes de começar, depois do erro da abertura, Bia guardou uma regra num post-it no microfone: "Na dúvida, não transmita. Cheque."', when: { visited: 'correcao' } },
      ],
      pauseQuestion: 'Quais frases do programa são fato, quais são opinião e qual é boato? Como a rádio deve apresentar cada uma?',
      choices: [
        {
          id: 'classificar-checado',
          label: 'Ir ao ar com o programa checado do começo ao fim',
          to: 'fim-checado',
          consequence: 'Com checagem completa, você levou ao ar só o que conseguiu confirmar.',
          requires: { stat: 'checagem', gte: 3 },
        },
        {
          id: 'classificar-apurando',
          label: 'Ir ao ar dizendo o que já sabem e o que ainda falta checar',
          to: 'fim-apurando',
          consequence: 'Você decidiu ser transparente sobre os limites da apuração.',
        },
      ],
    },

    'ao-vivo-pressa': {
      id: 'ao-vivo-pressa',
      title: 'No ar, sem rede',
      artId: 'story-radio-final',
      speakerId: 'bia',
      paragraphs: [
        { text: '— Bom dia, escola! Notícia urgente: a partir de segunda, nosso recreio terá só dez minutos!' },
        { text: 'Pela janela do estúdio, Bia viu turmas inteiras se levantarem. Alguns já falavam em protesto. O celular de Téo não parava: "É verdade mesmo?", "Quem confirmou?"' },
        { text: 'A porta se abriu. A professora Rosângela entrou com o comunicado original nas mãos e uma expressão séria.' },
      ],
      choices: [
        {
          id: 'pressa-corrigir',
          label: 'Corrigir ao vivo imediatamente',
          to: 'correcao',
          consequence: 'Você decidiu assumir o erro diante de toda a escola.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
        {
          id: 'pressa-seguir',
          label: 'Seguir o programa como se nada tivesse acontecido',
          to: 'fim-boato',
          consequence: 'Você decidiu não interromper o programa.',
          effects: [{ stat: 'confianca', delta: -1 }],
        },
      ],
    },

    correcao: {
      id: 'correcao',
      title: 'Errata ao vivo',
      speakerId: 'bia',
      paragraphs: [
        { text: 'Bia respirou fundo e abriu o microfone. — Pessoal, eu errei. A informação que dei não foi checada. O intervalo menor é apenas na quarta-feira, dia do simulado. Peço desculpas.' },
        { text: 'O estúdio ficou em silêncio. Depois, mensagens começaram a chegar: "Respeito." "Valeu por corrigir."' },
        { text: 'Téo baixou o volume da música: — Ainda dá tempo de fazer direito o resto do programa.' },
      ],
      pauseQuestion: 'Corrigir um erro em público diminui ou aumenta a confiança em quem informa? Por quê?',
      choices: [
        {
          id: 'correcao-checar',
          label: 'Tocar uma música e checar tudo durante ela',
          to: 'classificar',
          consequence: 'Você decidiu usar os próximos minutos para apurar com calma.',
          effects: [{ stat: 'checagem', delta: 1 }],
        },
        {
          id: 'correcao-ouvintes',
          label: 'Pedir que os ouvintes mandem só o que puderem comprovar',
          to: 'fim-apurando',
          consequence: 'Você decidiu transformar o erro num convite à checagem coletiva.',
          effects: [{ stat: 'confianca', delta: 1 }],
        },
      ],
    },

    'fim-checado': {
      id: 'fim-checado',
      title: 'Final: Informação que liberta',
      artId: 'story-radio-final',
      paragraphs: [
        { text: 'O "Intervalo no Ar" começou com uma frase que ficaria famosa: "Hoje, antes da notícia, vamos mostrar como checamos a notícia."' },
        { text: 'Bia leu o comunicado inteiro, Téo explicou o recorte do print, e Dona Marta falou ao vivo sobre a consulta do grêmio.', when: { visited: 'direcao' } },
        { text: 'O depoimento de Nico, sem sobrenome, fez a escola inteira pensar duas vezes antes de encaminhar uma imagem.', when: { visited: 'autor-print' } },
        { text: 'Na semana seguinte, a rádio estreou um quadro novo: "Checa Comigo", em que ouvintes mandam mensagens suspeitas para a equipe investigar.' },
      ],
      choices: [],
      ending: {
        title: 'Informação que liberta',
        reflection: 'Checar leva tempo, mas protege pessoas e fortalece a confiança. A boa notícia virou também uma aula sobre como informar.',
        tone: 'luminoso',
      },
    },

    'fim-apurando': {
      id: 'fim-apurando',
      title: 'Final: Ainda apurando',
      artId: 'story-radio-final',
      paragraphs: [
        { text: 'Bia foi ao ar com honestidade: — Recebemos um print sobre o recreio. Já sabemos que há mudança só na quarta. Ainda estamos checando o resto e voltamos amanhã com tudo confirmado.' },
        { text: 'Algumas pessoas reclamaram que a rádio "não dava a notícia". Outras agradeceram por não espalhar confusão.' },
        { text: 'Depois da errata do começo, os ouvintes mandaram dezenas de mensagens — e, pela primeira vez, muitas vinham com link e data.', when: { visited: 'correcao' } },
        { text: 'No dia seguinte, a dúvida ainda rondava os corredores. Mas a rádio tinha deixado claro a diferença entre o que se sabe e o que se supõe.' },
      ],
      choices: [],
      ending: {
        title: 'Ainda apurando',
        reflection: 'Dizer "ainda não sabemos" também é informação responsável. Como o programa poderia continuar a história amanhã?',
        tone: 'aberto',
      },
    },

    'fim-boato': {
      id: 'fim-boato',
      title: 'Final: Ruído',
      artId: 'story-radio-cover',
      paragraphs: [
        { text: 'O programa seguiu com músicas e recados, como se nada tivesse acontecido. Mas, no intervalo, metade da escola fazia um abaixo-assinado contra uma decisão que nunca existiu.' },
        { text: 'À tarde, a direção precisou publicar um desmentido. No dia seguinte, quando a rádio anunciou a gincana, alguém gritou no pátio: — Será que é verdade?' },
      ],
      choices: [],
      ending: {
        title: 'Ruído',
        reflection: 'Uma notícia falsa não termina quando o programa acaba. A confiança perdida é a parte mais difícil de recuperar.',
        tone: 'agridoce',
      },
    },

    'fim-exposicao': {
      id: 'fim-exposicao',
      title: 'Final: O nome no ar',
      artId: 'story-radio-final',
      paragraphs: [
        { text: 'O programa desmentiu o boato com precisão. Mas, quando Bia disse o nome de Nico, o estúdio ficou estranho. Pelo vidro, Téo viu o garoto sair do pátio de cabeça baixa.' },
        { text: 'Durante semanas, Nico virou "o do print". A informação estava correta; a forma de contar, não.' },
        { text: 'Na reunião da rádio, a professora Rosângela escreveu no quadro: "Checar os fatos é o começo. Cuidar das pessoas também é ética jornalística."' },
      ],
      choices: [],
      ending: {
        title: 'O nome no ar',
        reflection: 'Desmentir um boato é importante, mas expor alguém pode causar outro dano. Como informar sem humilhar?',
        tone: 'agridoce',
      },
    },
  },
  teacherGuide: [
    'Antes de ler, combine com a turma três perguntas de checagem: Quem disse? Quando e onde foi publicado? Outra fonte confirma?',
    'Use a cena "Fato, opinião ou boato?" para montar no quadro as três colunas e pedir novos exemplos à turma.',
    'Mostre que o final mais luminoso exige pelo menos 3 pontos de Checagem — pressa e boato fecham caminhos.',
    'Trate o caso de Nico com cuidado: o foco é como boatos nascem e se espalham, e não a punição de alguém. Evite comparações com casos reais da turma.',
    'Mantenha a discussão apartidária: o tema é a responsabilidade de quem informa, valendo para qualquer assunto ou grupo.',
  ],
  followUps: {
    escrita: 'Escreva o roteiro de um minuto do quadro "Checa Comigo", analisando uma mensagem suspeita inventada pela turma.',
    teatro: 'Em grupos, encenem o mesmo programa de rádio de duas formas: com e sem checagem. A plateia aponta as diferenças.',
    desenho: 'Crie um cartaz para o mural da escola com o passo a passo para checar uma informação antes de compartilhar.',
  },
};

export const STORIES: Story[] = [biblioteca, rioClaro, radio];
