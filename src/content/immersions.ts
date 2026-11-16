import type { Immersion } from '../types/models';

/**
 * Imersões culturais e temáticas (6º ao 9º ano).
 * Regras de conteúdo: nada de estatísticas inventadas; números citados vêm de fontes
 * oficiais (IBGE, leis federais) e devem ser conferidos pela coordenação antes de impressão.
 * Personagens fictícios são sempre identificados como fictícios.
 */
export const IMMERSIONS: Immersion[] = [
  // ───────────────────────── 1. Memórias afro-brasileiras ─────────────────────────
  {
    id: 'memorias-afro-brasileiras',
    title: 'Memórias afro-brasileiras',
    theme: 'Cultura afro-brasileira',
    kicker: 'Imersão cultural',
    openingQuestion: 'O que forma a nossa identidade?',
    summary:
      'Uma viagem pela oralidade, pelos saberes, pelas lutas por direitos e pelo protagonismo negro de hoje, para entender como as heranças africanas e afro-brasileiras estão presentes no cotidiano da turma.',
    subjects: ['historia', 'portugues', 'artes', 'geografia', 'politica-cidadania'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-afro',
    status: 'disponivel',
    context: [
      'Entre os séculos XVI e XIX, milhões de africanas e africanos foram trazidos à força para o Brasil pelo tráfico atlântico de pessoas escravizadas. Eles vinham de povos, reinos e regiões muito diferentes do continente africano, com línguas, religiões, técnicas e formas de organização próprias.',
      'Mesmo sob a violência da escravidão, essas pessoas e seus descendentes resistiram de muitas formas: fugas, formação de quilombos, compra de alforrias, irmandades religiosas, preservação de línguas, músicas, comidas e saberes. A abolição oficial veio em 1888, com a Lei Áurea, mas sem políticas de terra, trabalho ou educação para a população liberta.',
      'As consequências dessa história aparecem até hoje nas desigualdades sociais e no racismo, que é crime no Brasil (Constituição de 1988 e Lei nº 7.716/1989). Ao mesmo tempo, a cultura afro-brasileira está no centro do que entendemos como cultura brasileira: na língua, na música, na culinária, nas festas, nas ciências e na política.',
      'No Censo 2022 do IBGE, mais da metade da população brasileira se declarou preta ou parda. Por isso, estudar a história afro-brasileira não é estudar "o outro": é estudar a história do Brasil e, para muitos estudantes, a história da própria família.',
    ],
    diversity: [
      'Não existe uma única "cultura africana": a África é um continente com dezenas de países e centenas de povos e línguas. Os africanos trazidos ao Brasil vieram de regiões diversas, como a África Centro-Ocidental (área dos atuais Angola e Congo) e o Golfo do Benim.',
      'A cultura afro-brasileira varia entre regiões e comunidades: o jongo no Sudeste, o tambor de crioula no Maranhão, o samba de roda no Recôncavo Baiano e o maracatu em Pernambuco são expressões diferentes, cada uma com sua história.',
      'Pessoas negras no Brasil têm diferentes religiões (católicas, evangélicas, de matriz africana, sem religião, entre outras), profissões, opiniões e modos de viver. Nenhuma pessoa representa sozinha um grupo inteiro.',
      'Identidade racial envolve autodeclaração: cada pessoa diz como se reconhece. Na escola, ninguém deve ser obrigado a se classificar ou expor sua história familiar.',
    ],
    contemporary: [
      'Escritoras como Conceição Evaristo, que criou o conceito de "escrevivência" para falar de uma escrita nascida da experiência de mulheres negras, são lidas em escolas e universidades de todo o país.',
      'Comunidades quilombolas atuais, presentes em todas as regiões do Brasil, lutam pela titulação de suas terras, mantêm roças, festas e tradições, e também usam a internet, criam associações e formam professores e lideranças.',
      'Cientistas, médicas, engenheiros, artistas, atletas e empreendedores negros ocupam espaços de destaque e de liderança, e muitos deles chegaram à universidade por meio de políticas de ação afirmativa.',
      'Movimentos negros, coletivos de juventude e grupos culturais de bairro (de hip-hop, capoeira, samba, teatro e literatura) produzem conhecimento, arte e propostas de políticas públicas.',
    ],
    chapters: [
      {
        id: 'ouvir-uma-historia',
        title: '1. Ouvir uma história',
        paragraphs: [
          'Em muitas sociedades da África Ocidental, os griôs (do francês "griot") são guardiões da memória: contam a história das famílias e dos povos por meio da palavra, da música e da poesia. No Brasil, a palavra passou a ser usada também para mestres e mestras da tradição oral, como contadores de histórias, rezadeiras, mestres de capoeira e de folguedos populares.',
          'A oralidade é uma forma legítima de guardar conhecimento. Uma conversa com uma avó, um samba antigo ou uma cantiga de roda podem carregar informações históricas que não foram registradas em documentos escritos.',
          'Para começar, imagine uma roda de conversa num centro cultural de bairro. Dona Benedita, personagem fictícia, é uma griô que conta como sua bisavó aprendeu a fazer o pão de cada festa, quais músicas cantava no trabalho e por que ninguém da família esquecia o nome da cidade onde nasceu.',
        ],
        explore: [
          'Que histórias sua família conta e repete? Quem costuma contar?',
          'Que diferenças existem entre uma história contada e uma história escrita? O que cada uma preserva melhor?',
          'Que palavras do português do Brasil têm origem em línguas africanas, como as do grupo banto? (Exemplos conhecidos: caçula, cafuné, moleque, quitanda.)',
        ],
        classChoice: {
          prompt: 'Como a turma quer continuar a escuta?',
          options: [
            {
              label: 'Ouvir uma pessoa da comunidade',
              outcome: 'A turma prepara um roteiro de perguntas e convida uma pessoa da comunidade escolar (familiar, funcionário, mestre de cultura popular) para uma roda de conversa. O capítulo 4 retoma essa entrevista como fonte.',
            },
            {
              label: 'Ler e ouvir registros',
              outcome: 'A turma trabalha com trechos de literatura e canções de autoria negra escolhidos pelo professor, comparando o que a palavra escrita e a palavra cantada guardam.',
            },
            {
              label: 'Criar um "baú de memórias" da turma',
              outcome: 'Cada estudante traz, se quiser, um objeto, receita ou expressão de família. A turma monta um mural coletivo, sem exigir que ninguém exponha histórias pessoais.',
            },
          ],
        },
      },
      {
        id: 'saberes-e-resistencias',
        title: '2. Saberes e resistências',
        paragraphs: [
          'Os quilombos foram comunidades formadas principalmente por pessoas que fugiam da escravidão, mas também acolheram indígenas, pessoas livres pobres e outros grupos. O mais conhecido é Palmares, na Serra da Barriga (atual Alagoas), que resistiu durante grande parte do século XVII e teve Zumbi como uma de suas lideranças. O dia de sua morte, 20 de novembro de 1695, é hoje o Dia Nacional de Zumbi e da Consciência Negra.',
          'Houve quilombos em praticamente todas as regiões do Brasil. No Quilombo do Quariterê, no atual Mato Grosso, Tereza de Benguela liderou a comunidade no século XVIII; o dia 25 de julho homenageia sua memória e a das mulheres negras. Nas cidades, as irmandades religiosas, como as de Nossa Senhora do Rosário dos Homens Pretos, ajudavam a comprar alforrias, organizar enterros dignos e manter laços de solidariedade.',
          'Os africanos e seus descendentes trouxeram e desenvolveram saberes técnicos em agricultura, metalurgia, mineração, construção, medicina com plantas e culinária. As religiões de matriz africana, como o candomblé e a umbanda, preservam línguas, cantos, conhecimentos sobre a natureza e formas de comunidade. Estudá-las é conhecer um patrimônio cultural, com o mesmo respeito com que se estuda qualquer outra tradição religiosa, e sem pedir que ninguém mude ou exponha a própria fé.',
        ],
        explore: [
          'Por que formar um quilombo era, ao mesmo tempo, uma forma de fuga e uma forma de construir algo novo?',
          'Que alimentos do dia a dia têm história ligada à presença africana no Brasil? Como saber se uma informação sobre a origem de um prato é confiável?',
          'O que significa respeitar uma religião diferente da sua? Por que a intolerância religiosa é crime no Brasil?',
        ],
        classChoice: {
          prompt: 'Que forma de resistência a turma quer investigar mais a fundo?',
          options: [
            {
              label: 'Quilombos de ontem e de hoje',
              outcome: 'A turma pesquisa um quilombo histórico e uma comunidade quilombola atual da sua região ou estado (lista disponível na Fundação Cultural Palmares), comparando continuidades e mudanças.',
            },
            {
              label: 'Irmandades e festas',
              outcome: 'A turma investiga como irmandades e festas populares (congadas, festas do Rosário, Boa Morte) ajudaram a manter comunidades unidas, com foco em organização e solidariedade.',
            },
            {
              label: 'Saberes do trabalho e da cozinha',
              outcome: 'A turma mapeia técnicas e saberes (plantio, construção, culinária, ervas) e discute por que muitos conhecimentos de pessoas negras não foram creditados a elas nos livros.',
            },
          ],
        },
      },
      {
        id: 'conquistas-e-direitos',
        title: '3. Conquistas e direitos',
        paragraphs: [
          'Depois da abolição, organizações negras continuaram lutando por direitos: jornais da imprensa negra, a Frente Negra Brasileira (anos 1930), o Teatro Experimental do Negro, criado por Abdias Nascimento em 1944, e o Movimento Negro Unificado, fundado em 1978, são alguns exemplos.',
          'A Constituição de 1988 definiu o racismo como crime inafiançável e imprescritível e reconheceu o direito das comunidades quilombolas às terras que ocupam. Em 2003, a Lei nº 10.639 tornou obrigatório o ensino de história e cultura afro-brasileira nas escolas e incluiu o 20 de novembro no calendário escolar. Em 2010, foi aprovado o Estatuto da Igualdade Racial (Lei nº 12.288).',
          'A Lei nº 12.711/2012, conhecida como Lei de Cotas, reservou vagas em universidades e institutos federais para estudantes de escolas públicas, com subcotas para pessoas pretas, pardas e indígenas (e, depois, pessoas com deficiência). Em 2023, ela foi atualizada pela Lei nº 14.723, que incluiu também estudantes quilombolas. No mesmo ano, a Lei nº 14.759 tornou o 20 de novembro feriado nacional.',
        ],
        explore: [
          'Por que leis são importantes, mas não bastam sozinhas para acabar com o racismo?',
          'O que é uma ação afirmativa? Que argumentos são usados a favor dela? Como discutir esse tema com base em dados e respeito?',
          'Como a escola pode cumprir a Lei nº 10.639/2003 o ano inteiro, e não só em novembro?',
        ],
      },
      {
        id: 'memorias-vivas-hoje',
        title: '4. Memórias vivas hoje',
        paragraphs: [
          'A memória afro-brasileira não está só no passado. Ela aparece nas obras de escritoras como Carolina Maria de Jesus, autora de "Quarto de Despejo" (1960), e Conceição Evaristo; na geografia de Milton Santos, um dos mais importantes geógrafos do mundo; na música de artistas como Gilberto Gil; e em milhares de pessoas que não aparecem nos livros, mas transformam seus bairros.',
          'Hoje, comunidades quilombolas, coletivos de jovens, pesquisadores, empreendedores e artistas negros criam museus comunitários, podcasts, bibliotecas, empresas, grupos de pesquisa e festas. Muitos usam a tecnologia para registrar a memória de seus mais velhos.',
          'Lembrar é também escolher o que vale ser contado. Quando a turma reconhece a presença negra na ciência, na arte, na política e no trabalho, amplia a ideia de quem pode ser referência e de que futuros são possíveis para todas as pessoas.',
        ],
        explore: [
          'Que pessoas negras do seu bairro, cidade ou estado merecem ser conhecidas? Por quê?',
          'Onde a turma encontra referências negras na ciência, na tecnologia e na literatura? Onde elas faltam?',
          'Como registrar a memória de alguém de forma respeitosa (pedindo autorização, citando o nome, devolvendo o resultado)?',
        ],
        classChoice: {
          prompt: 'Qual produto final a turma quer criar?',
          options: [
            {
              label: 'Galeria de referências',
              outcome: 'Cada grupo pesquisa uma pessoa negra (histórica ou atual, nacional ou local) e produz um cartaz com fontes. A galeria fica exposta para a escola.',
            },
            {
              label: 'Podcast de memórias',
              outcome: 'A turma grava pequenos episódios a partir da entrevista ou das leituras feitas no capítulo 1, com autorização das pessoas entrevistadas.',
            },
          ],
        },
      },
    ],
    challenges: {
      individual: [
        'Escreva um pequeno texto contando uma história, receita ou expressão que você aprendeu com alguém mais velho e o que ela revela sobre o passado.',
        'Escolha uma palavra de origem africana usada no português do Brasil e descubra seu significado em um dicionário confiável.',
        'Pesquise uma pessoa negra que atua hoje na ciência, na arte ou na política e explique, em três frases, por que ela é uma referência.',
      ],
      coletivo: [
        'Montar uma linha do tempo das lutas por direitos da população negra no Brasil, do século XVII até hoje, com fontes indicadas.',
        'Produzir um mural "Memórias vivas" com referências negras da cidade ou do estado.',
        'Elaborar um roteiro de entrevista respeitoso para conversar com uma pessoa da comunidade.',
      ],
    },
    teacherScript: {
      antes: [
        'Leia a Lei nº 10.639/2003 e escolha previamente os trechos e imagens que serão usados, verificando as fontes.',
        'Combine com a turma acordos de conversa: escutar até o fim, não fazer piadas sobre a aparência ou a religião de ninguém, falar de ideias e não de pessoas.',
        'Pense em como agir caso surja um comentário racista (veja a microimersão "Facilitar conversas difíceis").',
        'Se for convidar alguém da comunidade, combine antes o tema, o tempo e a autorização para registros.',
      ],
      durante: [
        'Abra com a pergunta "O que forma a nossa identidade?" e registre as respostas sem corrigir.',
        'Garanta que nenhum estudante seja colocado como "porta-voz" de um grupo por ser negro ou por ter determinada religião.',
        'Apresente sempre a diversidade: diferentes regiões, épocas, religiões e trajetórias.',
        'Valorize perguntas e dúvidas; quando não souber uma resposta, combine pesquisar junto com a turma.',
        'Use as escolhas da turma para ajustar o caminho e anote o que mais mobilizou os estudantes.',
      ],
      depois: [
        'Retome a pergunta de abertura e compare as respostas do início e do fim.',
        'Exponha as produções com cuidado, pedindo autorização para mostrar textos pessoais.',
        'Planeje retomar o tema em outras aulas do ano, conectando-o a conteúdos de várias matérias.',
        'Registre observações sobre participação e aprendizagens para a avaliação formativa.',
      ],
    },
    practicalActivity: {
      title: 'Roda de memórias e mural coletivo',
      materials: [
        'Papel kraft ou cartolina',
        'Canetas, lápis de cor e cola',
        'Fichas impressas com o roteiro de perguntas',
        'Objetos, fotos ou receitas trazidos voluntariamente pelos estudantes (opcional)',
      ],
      steps: [
        'Organize a turma em roda e relembre os acordos de conversa.',
        'Leia em voz alta um pequeno trecho de história oral (a fala fictícia de Dona Benedita ou um texto escolhido).',
        'Em duplas, os estudantes conversam sobre uma memória de família ou da comunidade, usando o roteiro. Quem não quiser falar de si pode falar de uma personagem ou de uma pessoa pública.',
        'Cada dupla escreve uma frase ou desenha um símbolo da memória compartilhada.',
        'A turma monta o mural, agrupando as memórias por temas (comida, música, trabalho, fé, festa, lutas).',
        'Encerramento: cada estudante diz uma palavra sobre o que aprendeu.',
      ],
    },
    finalConversation: [
      'O que você descobriu sobre a presença africana e afro-brasileira no seu dia a dia?',
      'Por que algumas histórias foram mais contadas que outras nos livros?',
      'Como a escola e a turma podem combater o racismo no cotidiano?',
      'Que memória da sua comunidade você gostaria que fosse preservada daqui a cem anos?',
    ],
    printable: {
      title: 'Roteiro: Memórias afro-brasileiras',
      items: [
        'Pergunta de abertura: O que forma a nossa identidade?',
        'Capítulo 1: oralidade, griôs e memória de família.',
        'Capítulo 2: quilombos, irmandades e saberes técnicos, culinários e religiosos.',
        'Capítulo 3: Lei nº 10.639/2003, Estatuto da Igualdade Racial, Lei de Cotas e movimentos negros.',
        'Capítulo 4: protagonismo negro hoje.',
        'Acordos: escutar até o fim; respeitar todas as religiões; nenhuma piada sobre aparência ou origem.',
        'Desafio: registrar uma memória de família ou da comunidade.',
      ],
    },
    references: [
      { label: 'Lei nº 10.639/2003', note: 'Inclui no currículo oficial a obrigatoriedade da temática "História e Cultura Afro-Brasileira".', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 12.288/2010 (Estatuto da Igualdade Racial)', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 12.711/2012 (Lei de Cotas) e Lei nº 14.723/2023', url: 'https://www.planalto.gov.br' },
      { label: 'Fundação Cultural Palmares', note: 'Certificação de comunidades quilombolas e materiais sobre cultura afro-brasileira.', url: 'https://www.gov.br/palmares' },
      { label: 'Museu Afro Brasil Emanoel Araujo (São Paulo)', note: 'Acervo e materiais educativos.', url: 'https://www.museuafrobrasil.org.br' },
      { label: 'IBGE – Censo Demográfico 2022', note: 'Dados de cor ou raça e da população quilombola.', url: 'https://www.ibge.gov.br' },
      { label: 'IPHAN – Patrimônio imaterial', note: 'Registros como o samba de roda, o jongo e o ofício das baianas de acarajé.', url: 'https://www.gov.br/iphan' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Evite começar o tema pela escravidão como única referência: apresente também os reinos africanos, os saberes, as resistências e o protagonismo atual.',
      'Religiões de matriz africana devem ser tratadas como patrimônio cultural, com respeito; nenhum estudante deve ser exposto ou pressionado em relação à própria fé, e manifestações de intolerância devem ser acolhidas e trabalhadas.',
      'Não peça que estudantes negros "representem" o grupo nem que exponham experiências de racismo. Ofereça sempre a opção de falar de personagens ou de pessoas públicas.',
      'Cuidado com imagens que reforçam estereótipos (apenas sofrimento ou apenas "exotismo"). Prefira fontes produzidas pelas próprias comunidades.',
    ],
  },

  // ───────────────────────── 2. Povos indígenas hoje ─────────────────────────
  {
    id: 'povos-indigenas-hoje',
    title: 'Povos indígenas hoje',
    theme: 'Histórias e culturas indígenas',
    kicker: 'Imersão cultural',
    openingQuestion: 'O que você sabe sobre os povos indígenas que vivem no Brasil hoje?',
    summary:
      'Uma imersão para conhecer a diversidade dos povos indígenas, suas línguas, territórios e lutas, e o protagonismo indígena na educação, na arte, na ciência e na política contemporâneas.',
    subjects: ['historia', 'geografia', 'portugues', 'artes', 'ciencias'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-indigena',
    status: 'disponivel',
    context: [
      'Muito antes da chegada dos portugueses, em 1500, o território que hoje chamamos de Brasil já era habitado por muitos povos, com línguas, modos de vida, conhecimentos e formas de organização próprios. A colonização trouxe guerras, escravização, doenças e perda de territórios, e a população indígena diminuiu drasticamente.',
      'Apesar disso, os povos indígenas resistiram e continuam presentes em todo o país, em aldeias, terras indígenas e também nas cidades. No Censo 2022 do IBGE, cerca de 1,7 milhão de pessoas se declararam indígenas, e uma parte importante delas vive em áreas urbanas.',
      'A Constituição de 1988 reconheceu aos indígenas sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam. Em 2008, a Lei nº 11.645 tornou obrigatório o ensino de história e cultura indígena nas escolas, ao lado da história e cultura afro-brasileira.',
      'Hoje, organizações indígenas atuam na defesa dos territórios, na educação escolar indígena, na saúde, na cultura e na política. Em 2023 foi criado o Ministério dos Povos Indígenas, e a Funai passou a se chamar Fundação Nacional dos Povos Indígenas.',
    ],
    diversity: [
      'Não existe "o índio" como um grupo único: são centenas de povos diferentes. O Censo 2010 do IBGE identificou 305 etnias e 274 línguas indígenas faladas no país.',
      'Cada povo tem sua própria língua, história, organização, arte e forma de se relacionar com o território. Os Guarani, os Yanomami, os Kaingang, os Pataxó e os Terena, por exemplo, vivem em regiões diferentes e têm culturas distintas.',
      'Ser indígena não depende de morar na floresta nem de usar determinadas roupas. Pessoas indígenas vivem em aldeias e em cidades, usam celular, fazem faculdade e continuam sendo indígenas.',
      'O termo "povos indígenas" (ou "povos originários") é preferido por muitas organizações indígenas, que também pedem que cada povo seja chamado pelo seu próprio nome.',
    ],
    contemporary: [
      'Ailton Krenak, pensador e escritor do povo Krenak, autor de livros como "Ideias para adiar o fim do mundo", foi eleito em 2023 para a Academia Brasileira de Letras, sendo o primeiro indígena a ocupar uma cadeira na instituição.',
      'Daniel Munduruku, escritor e educador do povo Munduruku, publicou dezenas de livros para crianças e jovens sobre culturas indígenas.',
      'Sônia Guajajara, liderança do povo Guajajara, tornou-se em 2023 a primeira ministra dos Povos Indígenas. Joenia Wapichana foi a primeira mulher indígena eleita deputada federal (2018) e passou a presidir a Funai em 2023.',
      'Professores, cientistas, médicos, advogados, cineastas, artistas visuais e comunicadores indígenas produzem conhecimento e usam as redes sociais e o audiovisual para contar suas próprias histórias.',
    ],
    chapters: [
      {
        id: 'desfazer-imagens',
        title: '1. Desfazer imagens prontas',
        paragraphs: [
          'Muitas pessoas aprendem sobre os povos indígenas apenas por imagens do passado ou por fantasias usadas em datas comemorativas. Essas imagens costumam mostrar um "índio genérico", sem nome, sem povo e parado no tempo.',
          'Uma forma de começar é perguntar: quais povos indígenas vivem no meu estado? Quais línguas eles falam? Onde estão suas terras e que desafios enfrentam hoje? As respostas mostram uma realidade muito mais rica e diversa.',
        ],
        explore: [
          'Que imagens vêm à sua cabeça quando ouve "povos indígenas"? De onde vieram essas imagens?',
          'Que povos indígenas vivem no seu estado? (Consulte o site Povos Indígenas no Brasil, do Instituto Socioambiental.)',
          'Que palavras de origem tupi você usa no dia a dia? (Muitos nomes de lugares, plantas e animais, como Paraná, Ipiranga, abacaxi, jabuti e capivara.)',
        ],
        classChoice: {
          prompt: 'Por onde a turma quer começar a conhecer povos indígenas?',
          options: [
            {
              label: 'Pelo nosso estado',
              outcome: 'A turma pesquisa os povos indígenas do próprio estado, localiza suas terras em um mapa e descobre suas línguas. O capítulo 2 aprofunda um desses povos.',
            },
            {
              label: 'Por diferentes regiões do país',
              outcome: 'Cada grupo pesquisa um povo de uma região diferente do Brasil, e a turma compara línguas, territórios e modos de vida, percebendo a diversidade.',
            },
            {
              label: 'Pelas vozes de autores indígenas',
              outcome: 'A turma lê trechos de livros de autores indígenas escolhidos pelo professor e identifica o que esses autores querem que os não indígenas saibam.',
            },
          ],
        },
      },
      {
        id: 'territorios-e-linguas',
        title: '2. Territórios e línguas',
        paragraphs: [
          'Para muitos povos indígenas, o território não é apenas um lugar para morar: é onde estão os ancestrais, as plantas medicinais, os rios, as histórias e o alimento. Por isso, a demarcação de terras indígenas é uma das principais lutas desses povos.',
          'As terras indígenas também têm papel importante na conservação ambiental: estudos e imagens de satélite costumam mostrar que elas ajudam a conter o desmatamento. Os saberes indígenas sobre manejo de florestas, sementes e roçados são reconhecidos por pesquisadores de várias áreas.',
          'As línguas indígenas guardam formas únicas de nomear e entender o mundo. Muitas estão ameaçadas, e há escolas indígenas, professores e pesquisadores trabalhando para fortalecê-las e ensiná-las às novas gerações.',
        ],
        explore: [
          'Por que a terra é tão importante para os povos indígenas? Que diferença existe entre "terra para morar" e "território"?',
          'Que relação existe entre terras indígenas e preservação ambiental?',
          'O que se perde quando uma língua deixa de ser falada?',
        ],
      },
      {
        id: 'historia-e-resistencia',
        title: '3. História e resistência',
        paragraphs: [
          'A história dos povos indígenas não termina em 1500. Durante a colonização e o Império, houve guerras, alianças, negociações, fugas e revoltas. No século XX, a expansão de estradas, fazendas e garimpos atingiu muitas terras indígenas.',
          'Nos anos 1970 e 1980, lideranças indígenas de diferentes povos se organizaram em movimentos nacionais. Mário Juruna, do povo Xavante, foi eleito deputado federal em 1982. Na Assembleia Constituinte, a mobilização indígena ajudou a garantir os artigos 231 e 232 da Constituição de 1988.',
          'Em 2008, a Lei nº 11.645 alterou a Lei de Diretrizes e Bases da Educação para incluir a história e a cultura indígena no currículo de todas as escolas. Isso significa estudar os povos indígenas como sujeitos da história do Brasil, e não apenas como parte do "descobrimento".',
        ],
        explore: [
          'Por que é importante estudar os povos indígenas também no presente, e não só no período colonial?',
          'O que a Constituição de 1988 garantiu aos povos indígenas?',
          'Como os povos indígenas se organizam hoje para defender seus direitos?',
        ],
        classChoice: {
          prompt: 'Que aspecto da resistência a turma quer aprofundar?',
          options: [
            {
              label: 'Educação escolar indígena',
              outcome: 'A turma investiga como funcionam escolas indígenas bilíngues e diferenciadas e compara com a própria escola.',
            },
            {
              label: 'Comunicação e arte indígena',
              outcome: 'A turma conhece produções de cineastas, artistas visuais, músicos e comunicadores indígenas e analisa como eles contam suas histórias.',
            },
            {
              label: 'Direitos e território',
              outcome: 'A turma lê trechos dos artigos 231 e 232 da Constituição e discute, com base em fontes confiáveis, os desafios atuais da demarcação de terras.',
            },
          ],
        },
      },
      {
        id: 'protagonismo-hoje',
        title: '4. Protagonismo indígena hoje',
        paragraphs: [
          'Hoje, pessoas indígenas estão nas universidades, nos parlamentos, nos ministérios, nas artes, no jornalismo e na ciência, sem deixar de ser quem são. Autores como Ailton Krenak e Daniel Munduruku são lidos em todo o país.',
          'Jovens indígenas usam celulares, redes sociais e câmeras para registrar festas, denunciar invasões, ensinar palavras de suas línguas e mostrar o cotidiano das aldeias. Tecnologia e tradição podem caminhar juntas.',
        ],
        explore: [
          'Que pessoas indígenas atuais você conhece? Em que áreas elas atuam?',
          'Por que é importante que os próprios povos indígenas contem suas histórias?',
          'O que a turma pode aprender com os conhecimentos indígenas sobre natureza, coletividade e cuidado?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Descubra o nome de um povo indígena que vive no seu estado, a língua que fala e onde fica seu território.',
        'Liste cinco palavras de origem tupi usadas no português e o significado de cada uma, consultando um dicionário.',
        'Escreva uma carta a um estudante de uma escola indígena contando sobre a sua escola e fazendo perguntas sobre a dele.',
      ],
      coletivo: [
        'Montar um mapa da turma com povos indígenas de diferentes regiões, suas línguas e terras, indicando as fontes.',
        'Criar uma campanha na escola contra estereótipos sobre povos indígenas, com cartazes que mostrem a diversidade atual.',
        'Organizar uma roda de leitura com livros de autores indígenas.',
      ],
    },
    teacherScript: {
      antes: [
        'Consulte o site Povos Indígenas no Brasil (ISA) para identificar os povos do seu estado e da sua região.',
        'Selecione textos, vídeos e imagens produzidos por pessoas e organizações indígenas.',
        'Revise materiais que usem fantasias, "cocares de papel" ou o termo "índio" de forma genérica e substitua-os.',
        'Verifique se há estudantes indígenas ou com ascendência indígena e garanta que eles não sejam expostos sem consentimento.',
      ],
      durante: [
        'Registre as ideias iniciais da turma sem julgamento; elas serão retomadas no fim.',
        'Sempre nomeie os povos ("os Guarani Kaiowá", "os Yanomami") em vez de falar de "índios" em geral.',
        'Mostre exemplos do presente em todos os capítulos, para que a turma não associe indígenas apenas ao passado.',
        'Quando surgirem comentários preconceituosos, transforme-os em perguntas de investigação ("De onde vem essa ideia? O que as fontes dizem?").',
      ],
      depois: [
        'Compare as ideias iniciais com as finais e peça que a turma identifique o que mudou.',
        'Exponha o mapa ou a campanha produzidos para a comunidade escolar.',
        'Planeje continuidade ao longo do ano, evitando concentrar o tema apenas em abril.',
      ],
    },
    practicalActivity: {
      title: 'Mapa vivo dos povos indígenas',
      materials: [
        'Mapa do Brasil impresso ou desenhado em papel kraft',
        'Fichas de pesquisa (povo, língua, região, um fato atual, fonte)',
        'Acesso ao site Povos Indígenas no Brasil (ISA) ou materiais impressos previamente pelo professor',
        'Canetas coloridas e fita adesiva',
      ],
      steps: [
        'Divida a turma em grupos e entregue a cada grupo o nome de um povo indígena (incluindo pelo menos um do seu estado).',
        'Os grupos preenchem a ficha de pesquisa com informações e a fonte consultada.',
        'Cada grupo localiza o povo no mapa e cola sua ficha.',
        'A turma observa o mapa completo e responde: o que nos surpreende? Que diversidade aparece?',
        'Finalize com a leitura de um trecho de um autor indígena escolhido pelo professor.',
      ],
    },
    finalConversation: [
      'O que mudou na forma como você pensa sobre os povos indígenas?',
      'Por que a diversidade de povos e línguas é importante para o Brasil?',
      'Como a escola pode evitar estereótipos em datas como o 19 de abril?',
      'O que podemos aprender com os povos indígenas sobre o cuidado com a terra e com a comunidade?',
    ],
    printable: {
      title: 'Roteiro: Povos indígenas hoje',
      items: [
        'Pergunta de abertura: O que você sabe sobre os povos indígenas que vivem no Brasil hoje?',
        'Capítulo 1: desfazer imagens prontas e conhecer povos do nosso estado.',
        'Capítulo 2: territórios e línguas.',
        'Capítulo 3: história, resistência, Constituição de 1988 e Lei nº 11.645/2008.',
        'Capítulo 4: protagonismo indígena hoje.',
        'Lembrete: nomear os povos; evitar fantasias e o "índio genérico".',
        'Desafio: descobrir um povo indígena do nosso estado.',
      ],
    },
    references: [
      { label: 'Lei nº 11.645/2008', note: 'Inclui no currículo oficial a obrigatoriedade da temática "História e Cultura Afro-Brasileira e Indígena".', url: 'https://www.planalto.gov.br' },
      { label: 'Constituição Federal de 1988, artigos 231 e 232', url: 'https://www.planalto.gov.br' },
      { label: 'Instituto Socioambiental (ISA) – Povos Indígenas no Brasil', note: 'Enciclopédia com verbetes sobre cada povo.', url: 'https://pib.socioambiental.org' },
      { label: 'IBGE – Censo Demográfico 2022 e Censo 2010', note: 'Dados sobre população, etnias e línguas indígenas.', url: 'https://www.ibge.gov.br' },
      { label: 'Museu Nacional (UFRJ)', note: 'Pesquisas em etnologia e linguística indígena.', url: 'https://www.museunacional.ufrj.br' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Evite fantasias, pinturas faciais "de brincadeira" e cocares de papel: são elementos com significados específicos para cada povo.',
      'Não trate os povos indígenas como parte apenas do passado ou da natureza; mostre-os como sujeitos de direitos e produtores de conhecimento hoje.',
      'Estudantes indígenas ou com ascendência indígena devem ser acolhidos, sem serem colocados como "especialistas" ou expostos sem seu consentimento.',
      'Dados demográficos devem ser citados com a fonte e o ano; confira sempre as informações mais recentes do IBGE.',
    ],
  },

  // ───────────────────────── 3. Água que nos conecta ─────────────────────────
  {
    id: 'agua-que-nos-conecta',
    title: 'Água que nos conecta',
    theme: 'Meio ambiente',
    kicker: 'Imersão ambiental',
    openingQuestion: 'De onde vem e para onde vai a água do nosso bairro?',
    summary:
      'Uma investigação sobre o caminho da água, do rio ao bairro e de volta ao rio, para entender bacias hidrográficas, saneamento e o cuidado coletivo com um bem comum.',
    subjects: ['ciencias', 'geografia', 'matematica', 'politica-cidadania'],
    anos: [6, 7, 8, 9],
    durationMin: 90,
    artId: 'imm-ambiente',
    status: 'disponivel',
    context: [
      'A água que sai da torneira percorre um longo caminho: ela é captada em rios, represas ou poços, tratada, distribuída por canos e, depois de usada, vira esgoto, que deveria ser coletado e tratado antes de voltar à natureza.',
      'Todo lugar faz parte de uma bacia hidrográfica: a área de terra em que a água da chuva escorre para um mesmo rio principal e seus afluentes. O que acontece em um bairro (lixo nas ruas, esgoto sem tratamento, desmatamento das margens) afeta quem vive rio abaixo.',
      'O Brasil tem uma das maiores reservas de água doce do mundo, mas ela é distribuída de forma desigual pelo território e pela população: a maior parte está na região amazônica, enquanto áreas mais povoadas e o Semiárido convivem com menor disponibilidade.',
      'A Lei nº 9.433/1997, que instituiu a Política Nacional de Recursos Hídricos, define a água como bem de domínio público e a bacia hidrográfica como unidade de planejamento, com participação de governo, usuários e sociedade nos comitês de bacia.',
    ],
    diversity: [
      'A relação com a água muda de lugar para lugar: comunidades ribeirinhas na Amazônia, famílias do Semiárido que usam cisternas, moradores de grandes cidades e agricultores vivem situações muito diferentes.',
      'Povos indígenas, quilombolas, pescadores artesanais e comunidades tradicionais têm saberes próprios sobre rios, nascentes e chuvas.',
      'O acesso à água tratada e ao esgoto coletado não é igual para todos: varia entre regiões, entre cidade e campo e entre bairros de uma mesma cidade.',
    ],
    contemporary: [
      'Programas de construção de cisternas para captar água da chuva, desenvolvidos com participação de organizações do Semiárido, mudaram a convivência de muitas famílias com a seca.',
      'Coletivos de bairro, escolas e comitês de bacia realizam mutirões de limpeza, monitoramento da qualidade da água e recuperação de nascentes e matas ciliares.',
      'Cientistas e técnicos usam satélites, sensores e dados abertos (como os da Agência Nacional de Águas e Saneamento Básico, ANA) para acompanhar chuvas, secas e enchentes.',
      'O Novo Marco Legal do Saneamento (Lei nº 14.026/2020) estabeleceu metas de universalização do abastecimento de água e da coleta e tratamento de esgoto.',
    ],
    chapters: [
      {
        id: 'agua-no-bairro',
        title: '1. A água no nosso bairro',
        paragraphs: [
          'Comece pelo que está perto: há algum rio, córrego, canal ou nascente no bairro? Ele está visível ou foi canalizado e coberto por ruas? Para onde vai a água da chuva quando cai na calçada da escola?',
          'Muitos rios urbanos foram escondidos sob o asfalto. Conhecê-los ajuda a entender alagamentos, mau cheiro e a importância de não jogar lixo nas ruas e bueiros.',
        ],
        explore: [
          'De onde vem a água que chega à escola? Quem é responsável pelo abastecimento na sua cidade?',
          'Existe algum rio ou córrego perto da escola? Qual é o nome dele?',
          'O que acontece com a água da chuva quando o chão está todo cimentado?',
        ],
        classChoice: {
          prompt: 'Como a turma quer investigar a água do bairro?',
          options: [
            {
              label: 'Caminhada de observação',
              outcome: 'A turma faz, com autorização e acompanhamento, uma caminhada no entorno da escola registrando bueiros, córregos, áreas verdes e pontos de lixo. Os registros alimentam o mapa do capítulo 2.',
            },
            {
              label: 'Investigação com mapas e imagens',
              outcome: 'A turma usa mapas impressos ou imagens de satélite para localizar rios e córregos próximos, inclusive os canalizados, sem precisar sair da escola.',
            },
            {
              label: 'Entrevista com a comunidade',
              outcome: 'Os estudantes entrevistam familiares e vizinhos sobre como era o rio do bairro no passado e quais problemas existem hoje.',
            },
          ],
        },
      },
      {
        id: 'bacia-hidrografica',
        title: '2. A bacia que nos une',
        paragraphs: [
          'Uma bacia hidrográfica funciona como uma grande bacia de cozinha inclinada: toda a água que cai dentro de seus limites escorre para o mesmo rio principal. Os limites são os divisores de água, geralmente as partes mais altas do relevo.',
          'O Brasil é dividido em 12 regiões hidrográficas, como a Amazônica, a do São Francisco, a do Paraná e a do Tocantins-Araguaia. Cada bairro faz parte de uma bacia menor, que por sua vez faz parte de uma maior.',
          'Como a água corre de cima para baixo, quem vive rio acima afeta quem vive rio abaixo. Por isso, cuidar da água é uma tarefa coletiva, que conecta cidades, estados e até países.',
        ],
        explore: [
          'Em qual bacia hidrográfica fica a sua escola? Para qual rio maior a água do bairro escorre?',
          'Por que a mata ciliar (vegetação nas margens dos rios) é importante?',
          'Que atividades humanas mais afetam a qualidade da água na sua região?',
        ],
      },
      {
        id: 'usos-e-conflitos',
        title: '3. Usos e conflitos',
        paragraphs: [
          'A água é usada para beber, cozinhar, higiene, agricultura, indústria, geração de energia, transporte e lazer. Quando há pouca água ou ela está poluída, esses usos podem entrar em conflito.',
          'A lei brasileira estabelece que, em situações de escassez, o uso prioritário da água é o consumo humano e a dessedentação de animais. Os comitês de bacia são espaços onde diferentes usuários discutem e negociam o uso da água.',
        ],
        explore: [
          'Quais são os principais usos da água na sua região?',
          'O que deveria acontecer se não houvesse água suficiente para todos os usos? Quem decide?',
          'Por que o saneamento básico é também uma questão de saúde pública?',
        ],
        classChoice: {
          prompt: 'A turma vai simular uma reunião de comitê de bacia. Qual situação será discutida?',
          options: [
            {
              label: 'Período de seca',
              outcome: 'Grupos representam moradores, agricultores, indústria e empresa de abastecimento e negociam como dividir a água disponível, aplicando a prioridade do consumo humano.',
            },
            {
              label: 'Rio poluído',
              outcome: 'Grupos discutem as causas da poluição de um rio fictício e propõem ações de saneamento, fiscalização e educação, calculando custos aproximados.',
            },
          ],
        },
      },
      {
        id: 'cuidar-juntos',
        title: '4. Cuidar juntos',
        paragraphs: [
          'Pequenas ações individuais ajudam, mas os grandes desafios da água dependem também de políticas públicas: tratamento de esgoto, coleta de lixo, proteção de nascentes e planejamento urbano.',
          'A turma pode participar como cidadã: conhecendo os dados do município, levando propostas à escola e à comunidade e acompanhando o que o poder público faz.',
        ],
        explore: [
          'Que ações a escola pode fazer para usar melhor a água?',
          'Que perguntas a turma gostaria de fazer à prefeitura ou à empresa de saneamento?',
          'Como comunicar o que aprendemos para as famílias?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Registre durante três dias os usos de água na sua casa e proponha uma forma de reduzir desperdício, sem culpar ninguém.',
        'Descubra o nome do rio ou córrego mais próximo da sua casa e para qual rio maior ele escorre.',
        'Desenhe o caminho da água da nascente até a torneira e da torneira de volta ao rio.',
      ],
      coletivo: [
        'Construir uma maquete simples de bacia hidrográfica e testar com água o caminho da chuva.',
        'Elaborar uma carta à prefeitura ou à empresa de saneamento com perguntas e propostas da turma.',
        'Criar uma campanha na escola sobre o rio do bairro.',
      ],
    },
    teacherScript: {
      antes: [
        'Identifique a bacia hidrográfica e os rios próximos da escola usando mapas ou dados da ANA.',
        'Se for fazer caminhada, peça autorização das famílias e da coordenação e planeje o trajeto com segurança.',
        'Separe materiais para a maquete (papel, plástico, borrifador de água).',
        'Esteja atento a estudantes de famílias sem acesso regular a água ou esgoto, evitando constrangimentos.',
      ],
      durante: [
        'Parta da experiência dos estudantes com a água do bairro antes de apresentar conceitos.',
        'Use a maquete para mostrar visualmente o divisor de águas e o escoamento.',
        'Na simulação do comitê, garanta que todos os grupos falem e que os argumentos se baseiem em informações.',
        'Evite discursos que culpem apenas o indivíduo; mostre também responsabilidades públicas.',
      ],
      depois: [
        'Retome a pergunta de abertura e peça que a turma desenhe novamente o caminho da água.',
        'Encaminhe a carta ou a campanha, se a turma decidir fazê-la.',
        'Conecte o tema com outras aulas de ciências, geografia e matemática (medidas, porcentagem, gráficos).',
      ],
    },
    practicalActivity: {
      title: 'Maquete de bacia hidrográfica',
      materials: [
        'Papel amassado ou objetos para formar o relevo',
        'Plástico ou saco de lixo para cobrir',
        'Borrifador ou regador com água',
        'Canetas hidrocor laváveis (para simular poluentes)',
        'Bandeja ou caixa rasa',
      ],
      steps: [
        'Em grupos, monte um relevo com papel amassado dentro da bandeja.',
        'Cubra com o plástico e marque com caneta os pontos mais altos (divisores de água).',
        'Pinte pequenos pontos com caneta hidrocor em lugares que representem lixo, esgoto ou agrotóxico.',
        'Borrife água como se fosse chuva e observe para onde a água e a "poluição" escorrem.',
        'Registre as observações e discuta: quem vive rio abaixo é afetado pelo quê?',
        'Relacione a maquete com o mapa real do bairro.',
      ],
    },
    finalConversation: [
      'De onde vem e para onde vai a água do nosso bairro?',
      'Por que dizemos que a bacia hidrográfica conecta pessoas que nunca se encontraram?',
      'Quais responsabilidades são de cada pessoa e quais são do poder público?',
      'Que ação concreta a turma pode realizar a partir do que aprendeu?',
    ],
    printable: {
      title: 'Roteiro: Água que nos conecta',
      items: [
        'Pergunta de abertura: De onde vem e para onde vai a água do nosso bairro?',
        'Capítulo 1: a água no bairro (rios visíveis e escondidos).',
        'Capítulo 2: bacia hidrográfica e divisores de água.',
        'Capítulo 3: usos da água, conflitos e comitês de bacia.',
        'Capítulo 4: cuidado coletivo e políticas públicas.',
        'Atividade: maquete de bacia hidrográfica.',
        'Desafio: descobrir o nome do rio mais próximo e para onde ele vai.',
      ],
    },
    references: [
      { label: 'Lei nº 9.433/1997 – Política Nacional de Recursos Hídricos', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 14.026/2020 – Novo Marco Legal do Saneamento', url: 'https://www.planalto.gov.br' },
      { label: 'ANA – Agência Nacional de Águas e Saneamento Básico', note: 'Dados sobre regiões hidrográficas, chuvas e qualidade da água.', url: 'https://www.gov.br/ana' },
      { label: 'IBGE – Pesquisas sobre saneamento básico', url: 'https://www.ibge.gov.br' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Estudantes podem viver em casas sem água encanada regular ou sem coleta de esgoto: trate o tema como direito e política pública, sem constranger ou culpar famílias.',
      'Evite reduzir o tema a "fechar a torneira": mostre a escala coletiva (agricultura, indústria, saneamento) para que a responsabilidade não recaia só sobre o indivíduo.',
      'Valorize saberes locais e tradicionais sobre a água, de familiares, comunidades ribeirinhas e povos tradicionais.',
      'Atividades de campo exigem autorização, planejamento de segurança e cuidado ao se aproximar de córregos.',
    ],
  },

  // ───────────────────────── 4. Sabores e sotaques ─────────────────────────
  {
    id: 'sabores-e-sotaques',
    title: 'Sabores e sotaques',
    theme: 'Diversidade regional',
    kicker: 'Imersão cultural',
    openingQuestion: 'Existe um jeito único de ser brasileiro?',
    summary:
      'Uma imersão pelos falares, comidas e festas do Brasil para perceber a diversidade entre e dentro das regiões, combater o preconceito linguístico e valorizar as culturas locais da turma.',
    subjects: ['portugues', 'geografia', 'historia', 'artes'],
    anos: [6, 7, 8, 9],
    durationMin: 90,
    artId: 'imm-regional',
    status: 'disponivel',
    context: [
      'O Brasil é um país de dimensões continentais, formado pelo encontro, nem sempre pacífico, de povos indígenas, africanos, europeus e, depois, imigrantes de muitas partes do mundo, como japoneses, árabes, italianos e alemães. Esses encontros aconteceram de formas diferentes em cada lugar.',
      'Por isso, o português falado no Brasil tem muitas variedades: muda a pronúncia, o vocabulário e até algumas construções de frase. A linguística chama isso de variação linguística, e nenhuma variedade é "errada" ou inferior; existem usos mais ou menos adequados a cada situação.',
      'As comidas e festas também contam a história de cada lugar: ingredientes nativos, técnicas indígenas e africanas, influências de imigrantes e adaptações ao clima e ao que se planta em cada região.',
      'Muitos desses saberes são reconhecidos como patrimônio cultural imaterial pelo IPHAN, como o ofício das baianas de acarajé, o Círio de Nazaré, o frevo, o modo artesanal de fazer queijo de Minas e a Feira de Caruaru.',
    ],
    diversity: [
      'Não existe um único "sotaque nordestino" ou "sotaque do Sul": dentro de cada região há muitas formas de falar, e elas mudam entre estados, cidades, campo e capital e gerações.',
      'Cada região tem cidades grandes e pequenas, culturas urbanas e rurais, populações indígenas, negras, imigrantes e migrantes de outras regiões.',
      'Migrações internas, como a de nordestinos para São Paulo e de sulistas para o Centro-Oeste e o Norte, misturaram ainda mais falares, comidas e festas.',
      'Estereótipos regionais (por exemplo, associar uma região apenas à seca, ao atraso ou à riqueza) apagam essa diversidade e alimentam preconceitos.',
    ],
    contemporary: [
      'Músicos, humoristas, escritores e criadores de conteúdo de todas as regiões usam seus sotaques com orgulho e alcançam o país inteiro pela internet.',
      'Cozinheiras e cozinheiros de diferentes regiões valorizam ingredientes locais, como frutas do Cerrado e da Amazônia, e técnicas tradicionais.',
      'Festas como o Bumba meu boi do Maranhão, o Festival de Parintins, as festas juninas, as festas do Divino e as congadas reúnem tradição e criação contemporânea.',
    ],
    chapters: [
      {
        id: 'mapa-dos-falares',
        title: '1. O mapa dos falares',
        paragraphs: [
          'Mandioca, aipim ou macaxeira? Mexerica, tangerina ou bergamota? Uma mesma coisa pode ter nomes diferentes em cada lugar, e todos estão corretos.',
          'A forma de falar faz parte da identidade de uma pessoa. Rir do sotaque de alguém ou corrigi-lo sem necessidade é preconceito linguístico, que muitas vezes esconde preconceito regional e social.',
        ],
        explore: [
          'Como você chama mandioca, tangerina e pão francês? Seus familiares usam as mesmas palavras?',
          'Que palavras ou expressões são típicas da sua cidade?',
          'Por que alguns sotaques são mais valorizados na televisão do que outros?',
        ],
        classChoice: {
          prompt: 'Como a turma quer explorar os falares?',
          options: [
            {
              label: 'Pesquisa com as famílias',
              outcome: 'Os estudantes perguntam a familiares como chamam alguns objetos e alimentos e de onde a família veio. A turma monta um mapa de palavras com os resultados.',
            },
            {
              label: 'Escuta de áudios e músicas',
              outcome: 'A turma ouve músicas e gravações de pessoas de diferentes lugares e identifica diferenças de pronúncia e vocabulário, sem rir nem imitar de forma caricata.',
            },
          ],
        },
      },
      {
        id: 'cozinhas-do-brasil',
        title: '2. Cozinhas do Brasil',
        paragraphs: [
          'A mandioca, domesticada por povos indígenas, está em pratos de todo o país: farinha, beiju, tapioca, tucupi, pirão. O feijão aparece em formas muito diferentes, do feijão-tropeiro ao baião de dois, ao tutu e à feijoada, cada um com muitas versões.',
          'Ingredientes e técnicas de origem africana, indígena, portuguesa e de outros imigrantes se misturaram. Comidas consideradas "típicas" de uma região muitas vezes variam de cidade para cidade e de família para família.',
        ],
        explore: [
          'Qual é uma comida importante para a sua família? Em que ocasiões ela é feita?',
          'Que ingredientes nativos do Brasil você conhece?',
          'Por que é um estereótipo dizer que "todo mundo de tal região só come tal coisa"?',
        ],
        classChoice: {
          prompt: 'Que caminho a turma quer seguir na culinária?',
          options: [
            {
              label: 'Livro de receitas da turma',
              outcome: 'Cada estudante traz, se quiser, uma receita de família com sua história. A turma organiza um livro coletivo e identifica as origens dos ingredientes.',
            },
            {
              label: 'Viagem por um ingrediente',
              outcome: 'A turma escolhe um ingrediente, como a mandioca ou o milho, e pesquisa como ele é preparado em diferentes regiões.',
            },
            {
              label: 'Patrimônios da mesa',
              outcome: 'A turma pesquisa saberes culinários registrados pelo IPHAN, como o ofício das baianas de acarajé e o queijo artesanal de Minas, e o que significa protegê-los.',
            },
          ],
        },
      },
      {
        id: 'festas-e-encontros',
        title: '3. Festas e encontros',
        paragraphs: [
          'As festas populares reúnem música, dança, comida, religiosidade e memória. As festas juninas acontecem em quase todo o país, mas de maneiras muito diferentes; o Bumba meu boi, o Carnaval, o frevo, as cavalhadas e as festas do Divino têm histórias próprias.',
          'Muitas festas misturam elementos religiosos e profanos e são organizadas durante o ano inteiro por comunidades, associações e famílias. Elas também geram trabalho e renda.',
        ],
        explore: [
          'Que festas acontecem na sua cidade ou bairro? Quem as organiza?',
          'Que elementos (música, comida, roupas) aparecem nessas festas? De onde eles vêm?',
          'Como apresentar uma festa sem transformá-la em caricatura?',
        ],
      },
      {
        id: 'nosso-lugar',
        title: '4. O nosso lugar no mapa',
        paragraphs: [
          'Depois de conhecer tantas diferenças, é hora de olhar para a própria turma: de onde vieram as famílias? Que falares, comidas e festas convivem na sala?',
          'Reconhecer a diversidade da própria turma ajuda a perceber que não existe um jeito único de ser brasileiro, e que a convivência entre diferentes é uma riqueza.',
        ],
        explore: [
          'Que regiões e países estão representados nas histórias das famílias da turma?',
          'O que a turma tem em comum e o que a torna diversa?',
          'Como podemos apresentar a cultura do nosso lugar para estudantes de outra região?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Entreviste um familiar sobre palavras, comidas ou festas da sua infância e registre três descobertas.',
        'Reescreva um pequeno diálogo em duas variedades do português, mantendo o respeito pelas duas.',
        'Pesquise a história de um ingrediente usado na sua casa.',
      ],
      coletivo: [
        'Montar o "mapa de palavras" da turma com diferentes nomes para as mesmas coisas.',
        'Produzir um livro de receitas e memórias da turma.',
        'Criar uma apresentação sobre a cultura do nosso lugar para uma turma de outra região (por carta, vídeo ou áudio).',
      ],
    },
    teacherScript: {
      antes: [
        'Selecione áudios, músicas e textos de pessoas de várias regiões, incluindo diferentes sotaques dentro de uma mesma região.',
        'Prepare a turma com o combinado: ninguém ri do jeito de falar dos colegas.',
        'Considere estudantes migrantes ou imigrantes da turma, garantindo que participem apenas se quiserem.',
      ],
      durante: [
        'Quando alguém disser que uma forma de falar é "errada", pergunte: "Errada para quem? Em qual situação?".',
        'Sempre mostre pelo menos dois exemplos diferentes dentro de uma mesma região.',
        'Ao falar de comidas e festas, cite as origens indígenas, africanas e de imigrantes.',
        'Valorize as contribuições dos estudantes sobre a própria cidade e família.',
      ],
      depois: [
        'Retome a pergunta de abertura e registre a nova resposta da turma.',
        'Exponha o mapa de palavras ou o livro de receitas.',
        'Conecte com o estudo de variação linguística em Língua Portuguesa e de regionalização em Geografia.',
      ],
    },
    practicalActivity: {
      title: 'Mapa de palavras e sabores',
      materials: [
        'Mapa do Brasil grande (impresso ou desenhado)',
        'Fichas ou post-its',
        'Canetas coloridas',
        'Fichas de entrevista para familiares',
      ],
      steps: [
        'Distribua fichas com perguntas: "Como você chama...?" (mandioca, tangerina, pipa, pão francês).',
        'Os estudantes respondem e, se possível, completam com respostas de familiares e a cidade de origem deles.',
        'Cole as fichas no mapa, perto das cidades de origem informadas.',
        'Faça o mesmo com uma comida ou festa importante para cada família.',
        'Observe o mapa com a turma: que diversidade aparece dentro de cada região?',
      ],
    },
    finalConversation: [
      'Existe um jeito único de ser brasileiro? Por quê?',
      'O que é preconceito linguístico e como podemos evitá-lo?',
      'Que comida, festa ou palavra representa o nosso lugar?',
      'Como a diversidade da turma enriquece a convivência?',
    ],
    printable: {
      title: 'Roteiro: Sabores e sotaques',
      items: [
        'Pergunta de abertura: Existe um jeito único de ser brasileiro?',
        'Capítulo 1: falares e preconceito linguístico.',
        'Capítulo 2: cozinhas do Brasil e suas origens.',
        'Capítulo 3: festas populares e patrimônio imaterial.',
        'Capítulo 4: a diversidade da nossa turma.',
        'Combinado: ninguém ri do jeito de falar dos colegas.',
        'Desafio: entrevistar um familiar sobre palavras, comidas e festas.',
      ],
    },
    references: [
      { label: 'IPHAN – Bens registrados como patrimônio imaterial', note: 'Inclui o ofício das baianas de acarajé, o Círio de Nazaré, o frevo, o queijo artesanal de Minas e a Feira de Caruaru, entre outros.', url: 'https://www.gov.br/iphan' },
      { label: 'IBGE – Divisão regional do Brasil e dados de migração', url: 'https://www.ibge.gov.br' },
      { label: 'Marcos Bagno, "Preconceito linguístico" (livro)', note: 'Obra de referência sobre variação e preconceito linguístico.' },
      { label: 'Base Nacional Comum Curricular', note: 'Variação linguística em Língua Portuguesa.', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Imitações de sotaque podem ferir; use áudios reais e respeitosos em vez de pedir que estudantes imitem outras regiões.',
      'Evite associar regiões a um único traço (pobreza, seca, riqueza, frio); mostre sempre a diversidade interna.',
      'Estudantes migrantes ou imigrantes devem ter a opção de compartilhar ou não sua origem.',
      'Ao falar de festas religiosas, trate-as como patrimônio cultural, respeitando as diferentes crenças da turma.',
    ],
  },

  // ───────────────────────── Em preparo ─────────────────────────
  {
    id: 'patrimonio-cultural',
    title: 'Patrimônio que nos conta',
    theme: 'Patrimônio cultural',
    kicker: 'Imersão cultural',
    openingQuestion: 'O que da nossa cidade merece ser preservado — e quem decide isso?',
    summary:
      'Uma investigação sobre patrimônio material e imaterial: de prédios e paisagens a festas, ofícios e modos de falar. A turma termina montando um inventário do patrimônio do próprio bairro.',
    subjects: ['historia', 'geografia', 'artes', 'portugues'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-patrimonio',
    status: 'disponivel',
    context: [
      'Patrimônio cultural é aquilo que um grupo reconhece como importante para sua memória e identidade e decide cuidar para que chegue às próximas gerações. Não é só o que é antigo ou famoso: uma receita de família, uma festa de rua ou o jeito de construir uma canoa também podem ser patrimônio.',
      'A Constituição de 1988, no artigo 216, diz que o patrimônio cultural brasileiro reúne bens “de natureza material e imaterial”, que fazem referência à identidade, à ação e à memória dos diferentes grupos que formam a sociedade. Ela também diz que o poder público deve protegê-lo “com a colaboração da comunidade”.',
      'No Brasil, o órgão federal responsável é o IPHAN (Instituto do Patrimônio Histórico e Artístico Nacional), criado em 1937. Bens materiais, como edifícios e conjuntos urbanos, costumam ser protegidos pelo tombamento. Bens imateriais, como saberes, celebrações e formas de expressão, são reconhecidos pelo Registro, criado pelo Decreto nº 3.551, de 2000. Estados e municípios também têm seus próprios órgãos e listas.',
      'Ao longo do tempo, a ideia do que merece ser preservado mudou. Por muito tempo se protegeram sobretudo igrejas e casarões ligados às elites. Hoje também são reconhecidos terreiros, ofícios populares, saberes indígenas, paisagens e lugares de memória da escravidão — e a pergunta “patrimônio de quem?” continua em debate.',
    ],
    diversity: [
      'Patrimônio material: construções, conjuntos urbanos, sítios arqueológicos, paisagens, objetos e acervos de museus.',
      'Patrimônio imaterial: saberes e ofícios, celebrações, formas de expressão (música, dança, linguagens) e lugares onde práticas culturais acontecem.',
      'O mesmo bem pode ter significados diferentes para grupos diferentes — um casarão pode lembrar riqueza para uns e trabalho escravizado para outros.',
      'Há patrimônio reconhecido oficialmente e patrimônio que a comunidade valoriza mesmo sem nenhum registro: a praça do bairro, a feira, o mestre de capoeira da rua.',
    ],
    contemporary: [
      'Comunidades pedem o registro dos próprios saberes, como fizeram as paneleiras de Goiabeiras (ES), cujo ofício foi o primeiro bem registrado como patrimônio imaterial pelo IPHAN, em 2002.',
      'O Cais do Valongo, no Rio de Janeiro, por onde chegou um grande número de africanos escravizados, foi reconhecido pela UNESCO como Patrimônio Mundial em 2017 — um lugar de memória da dor e da resistência.',
      'Jovens usam fotografia, vídeo, podcasts e mapas colaborativos para registrar a memória de bairros, festas e personagens locais.',
      'Coletivos e associações de moradores organizam inventários participativos, nos quais a própria comunidade decide o que é importante preservar.',
    ],
    chapters: [
      {
        id: 'o-que-e-patrimonio',
        title: '1. O que é patrimônio?',
        paragraphs: [
          'Comece com uma pergunta simples: se a nossa cidade tivesse que guardar uma caixa para daqui a cem anos, o que vocês colocariam nela? Uma foto da praça? A receita do bolo da avó? A música que toca na festa do bairro?',
          'Essa caixa imaginária é uma boa porta de entrada para a ideia de patrimônio: aquilo que escolhemos guardar porque nos ajuda a contar quem somos. Algumas coisas que guardamos são concretas — um prédio, um objeto. Outras não cabem em caixa nenhuma: um jeito de dançar, uma festa, um saber passado de pessoa para pessoa.',
        ],
        explore: [
          'Listar no quadro o que a turma colocaria na “caixa do tempo” e separar em duas colunas: coisas que se podem tocar e coisas que se aprendem e praticam.',
          'Perguntar: quem escolheu esses itens? Outros grupos da cidade escolheriam as mesmas coisas?',
        ],
        classChoice: {
          prompt: 'Por onde a turma quer começar a investigação?',
          options: [
            { label: 'Pelos lugares', outcome: 'A turma vai olhar primeiro para prédios, praças e paisagens — e depois perguntar que histórias e pessoas estão ligadas a eles.' },
            { label: 'Pelas pessoas e saberes', outcome: 'A turma vai começar por ofícios, receitas, festas e modos de falar — e depois descobrir em que lugares essas práticas acontecem.' },
          ],
        },
      },
      {
        id: 'material-e-imaterial',
        title: '2. Pedra e cal, voz e gesto',
        paragraphs: [
          'O Brasil reconhece dois grandes tipos de patrimônio. O material inclui, por exemplo, o conjunto histórico de Ouro Preto (MG) e o Centro Histórico de Salvador (BA), ambos também reconhecidos pela UNESCO como Patrimônio Mundial nos anos 1980.',
          'O imaterial inclui saberes, celebrações e formas de expressão. Entre os bens registrados pelo IPHAN estão o Ofício das Paneleiras de Goiabeiras (ES), o Samba de Roda do Recôncavo Baiano, o Círio de Nazaré, em Belém (PA), o Frevo, de Pernambuco, e a Arte Kusiwa, pintura corporal e arte gráfica do povo Wajãpi, do Amapá.',
          'Proteger um bem imaterial é diferente de proteger um prédio: não dá para congelar uma festa ou um saber. O que se protege são as condições para que as pessoas continuem praticando, ensinando e transformando aquilo.',
        ],
        explore: [
          'Mostrar imagens de um bem material e de um bem imaterial e pedir que a turma explique o que precisaria acontecer para cada um deixar de existir.',
          'Discutir: por que não basta fotografar uma festa para “preservá-la”?',
        ],
      },
      {
        id: 'patrimonio-de-quem',
        title: '3. Patrimônio de quem?',
        paragraphs: [
          'Durante muito tempo, o que se preservava no Brasil eram principalmente igrejas, fortes e casarões ligados às elites coloniais. Isso deixou de fora muitas histórias: a de povos indígenas, a de pessoas escravizadas e de seus descendentes, a de trabalhadores e de imigrantes pobres.',
          'Nas últimas décadas, essa visão foi sendo ampliada por pressão de movimentos sociais, comunidades e pesquisadores. Lugares de memória da escravidão, terreiros de religiões de matriz africana e saberes indígenas passaram a ser reconhecidos. Ainda assim, decidir o que é patrimônio envolve escolhas — e escolhas sempre deixam algo de fora.',
        ],
        explore: [
          'Ler com a turma o trecho do artigo 216 da Constituição que fala em “diferentes grupos formadores da sociedade brasileira”. Quem são esses grupos na nossa cidade?',
          'Pensar em um prédio antigo da cidade e perguntar: quem construiu? Quem morava? Quem trabalhava ali? Essas pessoas aparecem nas placas e nos livros?',
        ],
        classChoice: {
          prompt: 'Um casarão antigo do bairro vai ser demolido para dar lugar a um estacionamento. O que a turma faria?',
          options: [
            { label: 'Defender o tombamento', outcome: 'A turma pesquisa a história do casarão e de quem viveu e trabalhou nele, para argumentar por que ele importa. Na conversa final, discute também quem arcaria com os custos da preservação.' },
            { label: 'Aceitar e registrar a memória', outcome: 'A turma entrevista moradores, fotografa e cria um registro do casarão antes da demolição. Na conversa final, discute se registrar é suficiente para preservar.' },
            { label: 'Propor um novo uso', outcome: 'A turma propõe transformar o casarão em centro cultural ou biblioteca. Na conversa final, discute como conciliar memória, necessidades atuais e recursos da cidade.' },
          ],
        },
      },
      {
        id: 'nosso-inventario',
        title: '4. O inventário do nosso bairro',
        paragraphs: [
          'Agora é a vez da turma. Assim como o IPHAN faz inventários para conhecer os bens culturais de uma região, a turma vai identificar o que o bairro tem de importante: lugares, saberes, celebrações, formas de expressão e pessoas que guardam memórias.',
          'O inventário não precisa ser oficial para ter valor. Ele ajuda a comunidade a se enxergar, a conversar sobre o que quer manter e transformar, e pode até virar ponto de partida para um pedido de proteção ao município.',
        ],
        explore: [
          'Usar a ficha de inventário (material imprimível) para registrar pelo menos um bem por grupo.',
          'Combinar com a turma como pedir autorização antes de fotografar ou gravar pessoas.',
        ],
      },
    ],
    challenges: {
      individual: [
        'Entrevistar uma pessoa da família ou da vizinhança sobre um lugar, festa ou saber do bairro que mudou ou desapareceu.',
        'Escolher um objeto de casa com história e escrever uma etiqueta de museu para ele: nome, origem, quem usou e por que importa.',
      ],
      coletivo: [
        'Montar o inventário do patrimônio do bairro com pelo menos um bem de cada tipo: lugar, saber, celebração e forma de expressão.',
        'Organizar uma pequena exposição ou mapa afetivo do bairro para a comunidade escolar.',
        'Escrever coletivamente uma carta ao órgão municipal de cultura apresentando o inventário.',
      ],
    },
    teacherScript: {
      antes: [
        'Pesquisar se o município tem bens tombados ou registrados (no site do IPHAN, do órgão estadual de patrimônio ou da prefeitura) para citar exemplos próximos.',
        'Separar duas imagens: um bem material e um bem imaterial, de preferência da região.',
        'Imprimir as fichas de inventário (uma por grupo) e combinar com a escola possíveis saídas pelo entorno.',
        'Preparar orientações de entrevista e de autorização de imagem para os estudantes.',
      ],
      durante: [
        'Abrir com a “caixa do tempo” e anotar as respostas no quadro sem julgar.',
        'Na escolha do capítulo 3, garantir que diferentes posições sejam ouvidas e justificadas com argumentos.',
        'Ajudar a turma a diferenciar o que é fato (data de construção, registro oficial) do que é opinião (o prédio “mais bonito”).',
        'Circular entre os grupos durante o inventário, perguntando “por que isso é importante e para quem?”.',
      ],
      depois: [
        'Reunir as fichas em um mural ou mapa do bairro.',
        'Registrar no portfólio da turma as escolhas feitas e os argumentos usados.',
        'Avaliar com a turma se vale enviar o inventário à prefeitura ou apresentá-lo à comunidade.',
        'Retomar a pergunta de abertura e comparar as respostas do início com as do fim.',
      ],
    },
    practicalActivity: {
      title: 'Inventário do patrimônio do bairro',
      materials: [
        'Fichas de inventário impressas (uma por grupo)',
        'Celular ou câmera, se houver (opcional)',
        'Papel pardo ou cartolina para o mapa coletivo',
        'Canetas coloridas e fita adesiva',
      ],
      steps: [
        'Dividir a turma em grupos e sortear um tipo de bem para cada um: lugar, saber/ofício, celebração ou forma de expressão.',
        'Cada grupo escolhe um bem do bairro e preenche a ficha: nome, onde fica ou acontece, quem mantém, desde quando, por que é importante e o que ameaça sua continuidade.',
        'Quando possível, entrevistar alguém ligado ao bem (com autorização) e registrar um trecho da conversa.',
        'Fazer um desenho, foto ou croqui do bem.',
        'Montar o mapa coletivo do bairro, posicionando cada ficha no lugar correspondente.',
        'Cada grupo apresenta seu bem em até 2 minutos e responde a uma pergunta da turma.',
      ],
    },
    finalConversation: [
      'O que mudou na sua ideia de patrimônio desde o começo da imersão?',
      'Qual bem do nosso inventário você acha que corre mais risco de desaparecer? Por quê?',
      'Quem deveria participar da decisão sobre o que preservar na nossa cidade?',
      'O que cada um de nós pode fazer para que esse patrimônio continue vivo?',
    ],
    printable: {
      title: 'Ficha de inventário do patrimônio',
      items: [
        'Nome do bem cultural:',
        'Tipo: ( ) lugar  ( ) saber/ofício  ( ) celebração  ( ) forma de expressão  ( ) objeto',
        'Onde fica ou onde acontece:',
        'Quem mantém, pratica ou cuida dele hoje:',
        'Desde quando existe (se souber) e como sabemos disso:',
        'Por que é importante e para quem:',
        'O que pode ameaçar sua continuidade:',
        'Fonte das informações (entrevista, documento, placa, site):',
        'Desenho, foto ou croqui (no verso):',
      ],
    },
    references: [
      { label: 'Constituição Federal de 1988, artigos 215 e 216 (cultura e patrimônio cultural)', url: 'https://www.planalto.gov.br' },
      { label: 'Decreto nº 3.551/2000 — institui o Registro de Bens Culturais de Natureza Imaterial', url: 'https://www.planalto.gov.br' },
      { label: 'Decreto-Lei nº 25/1937 — organiza a proteção do patrimônio histórico e artístico nacional (tombamento)', url: 'https://www.planalto.gov.br' },
      { label: 'IPHAN — Instituto do Patrimônio Histórico e Artístico Nacional (bens tombados e registrados, educação patrimonial)', url: 'https://www.gov.br/iphan' },
      { label: 'UNESCO — Lista do Patrimônio Mundial', note: 'para consultar os bens brasileiros reconhecidos', url: 'https://whc.unesco.org' },
    ],
    pedagogicalNotes: [
      'Evite tratar como patrimônio apenas o que é antigo, monumental ou ligado às elites. Valorize os saberes e lugares da comunidade dos estudantes.',
      'Ao abordar lugares de memória da escravidão, trate o tema com seriedade e cuidado, sem exposição de violência gratuita, e dê espaço às histórias de resistência.',
      'Respeite a diversidade religiosa: terreiros, igrejas e outras práticas podem aparecer no inventário e devem ser tratados com o mesmo respeito.',
      'Peça sempre autorização antes de fotografar, gravar ou publicar imagens e falas de pessoas da comunidade.',
    ],
  },
  {
    id: 'convivencia',
    title: 'Convivência que se constrói',
    theme: 'Convivência',
    kicker: 'Imersão de convivência',
    openingQuestion: 'O que torna um lugar bom para todos conviverem — e o que cada um de nós faz para isso?',
    summary:
      'Uma imersão sobre acordos, escuta, conflitos e cuidado coletivo. A turma investiga como se sente na escola, aprende a separar conflito de violência, pratica a escuta e termina construindo os próprios acordos de convivência.',
    subjects: ['politica-cidadania', 'portugues', 'educacao-fisica'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-convivencia',
    status: 'disponivel',
    context: [
      'Toda vez que pessoas diferentes dividem um espaço — uma sala, uma casa, um bairro — surgem diferenças de opinião, de ritmo e de jeito de ser. Conflitos fazem parte da convivência e não são, por si só, algo ruim: muitas vezes são a oportunidade de entender o outro e mudar o que não funciona.',
      'O problema começa quando o conflito vira violência: humilhação, exclusão, ameaça, agressão. Na escola, uma forma frequente é a intimidação sistemática, conhecida como bullying, quando alguém é alvo de ataques repetidos, de propósito, em uma relação desigual de poder. A Lei nº 13.185, de 2015, criou o Programa de Combate à Intimidação Sistemática e pede que as escolas previnam e enfrentem o problema, inclusive quando acontece pela internet (cyberbullying).',
      'O Estatuto da Criança e do Adolescente (Lei nº 8.069/1990) garante a crianças e adolescentes o direito ao respeito e à dignidade, e coloca família, sociedade e poder público como responsáveis por protegê-los de qualquer tratamento violento, vexatório ou constrangedor.',
      'Mais do que regras impostas, a convivência melhora quando as pessoas participam da construção dos acordos, aprendem a dizer o que sentem e precisam, e contam com espaços seguros para resolver conflitos — como rodas de conversa, mediação entre colegas e círculos restaurativos.',
    ],
    diversity: [
      'O que é “brincadeira” para um pode ser ofensa para outro: a convivência exige perguntar e escutar como o outro se sente.',
      'Cada família e comunidade tem costumes diferentes — de jeito de falar, de religião, de comida, de festa. Respeitar não exige concordar, mas exige não humilhar.',
      'Pessoas com deficiência, estudantes recém-chegados, de outras regiões ou países, e quem foge do “padrão” costumam ser mais alvo de exclusão — e precisam estar no centro dos acordos.',
      'Conflitos também acontecem entre adultos da escola; a turma pode observar como eles são resolvidos e propor melhorias.',
    ],
    contemporary: [
      'Escolas brasileiras vêm adotando práticas restaurativas, em que quem causou um dano, quem foi atingido e a comunidade conversam para reparar o que aconteceu, em vez de apenas punir.',
      'Programas de mediação entre colegas preparam estudantes para ajudar outros estudantes a conversar e chegar a um acordo.',
      'Grêmios estudantis e assembleias de classe dão aos estudantes voz nas decisões sobre o espaço que eles usam todos os dias.',
      'Campanhas criadas por estudantes — cartazes, vídeos, podcasts — ajudam a enfrentar o cyberbullying e a circulação de ofensas em grupos de mensagens.',
    ],
    chapters: [
      {
        id: 'como-nos-sentimos',
        title: '1. Como nos sentimos aqui?',
        paragraphs: [
          'Antes de falar de regras, vale perguntar: em quais lugares da escola você se sente à vontade? Em quais fica desconfortável ou com medo? O pátio, o corredor, o banheiro, a fila do lanche, o grupo de mensagens da turma?',
          'Um “mapa de sensações” da escola, feito de forma anônima, costuma revelar coisas que os adultos não veem. Ele não serve para apontar culpados, e sim para mostrar onde a convivência precisa de cuidado.',
        ],
        explore: [
          'Desenhar no quadro a planta simplificada da escola e pedir que cada estudante marque, com adesivos ou símbolos, onde se sente bem e onde se sente mal — sem escrever nomes.',
          'Perguntar: o que esses lugares têm em comum? O que poderia mudar neles?',
        ],
        classChoice: {
          prompt: 'Como a turma prefere fazer o mapa de sensações?',
          options: [
            { label: 'Anônimo, em papel', outcome: 'Cada estudante marca o mapa individualmente e dobra o papel. O professor junta tudo e apresenta o resultado geral, o que protege quem tem receio de se expor.' },
            { label: 'Em grupos pequenos', outcome: 'Os grupos conversam e marcam juntos o mapa. A conversa fica mais rica, mas o professor deve lembrar que ninguém é obrigado a contar experiências pessoais.' },
          ],
        },
      },
      {
        id: 'conflito-ou-violencia',
        title: '2. Conflito não é violência',
        paragraphs: [
          'Discordar do colega sobre o jogo, disputar a vez de falar ou se irritar com um barulho são conflitos — e podem ser resolvidos com conversa. Já apelidos que humilham, ameaças, empurrões, exclusão proposital e ataques repetidos são violência.',
          'Quando a agressão é repetida, intencional e acontece contra alguém que tem dificuldade de se defender, chamamos de intimidação sistemática (bullying). Quem assiste também tem um papel: rir, compartilhar ou ficar em silêncio pode reforçar a violência; acolher a vítima e pedir ajuda a um adulto pode interrompê-la.',
        ],
        explore: [
          'Ler situações curtas e classificar: é um conflito, uma violência ou intimidação sistemática? Por quê?',
          'Discutir o papel de quem assiste: o que é possível fazer com segurança?',
        ],
      },
      {
        id: 'escutar-e-falar',
        title: '3. Escutar e falar sem ferir',
        paragraphs: [
          'Muitos conflitos crescem porque ninguém se sente escutado. Uma forma de conversar, inspirada na comunicação não violenta, propõe quatro passos: descrever o que aconteceu sem julgar, dizer como se sentiu, dizer o que precisa e fazer um pedido concreto.',
          'Em vez de “você é um folgado”, por exemplo: “quando você pegou meu material sem pedir, eu fiquei irritado, porque preciso dele para a prova. Você pode me perguntar antes da próxima vez?”. Não é uma fórmula mágica, mas ajuda a falar do problema sem atacar a pessoa.',
        ],
        explore: [
          'Transformar frases agressivas em frases que descrevem, expressam sentimento, necessidade e pedido.',
          'Praticar em duplas a escuta ativa: um fala por um minuto; o outro repete com as próprias palavras o que entendeu, antes de responder.',
        ],
        classChoice: {
          prompt: 'Em um grupo de mensagens da turma, circula uma montagem zombando de um colega. O que a turma decide fazer?',
          options: [
            { label: 'Não compartilhar e acolher o colega', outcome: 'A turma combina não repassar, conversar em particular com o colega para saber como ele está e avisar um adulto de confiança. Na conversa final, discute por que o silêncio também pode ferir.' },
            { label: 'Pedir para apagar e conversar no grupo', outcome: 'A turma pede que a montagem seja apagada e escreve no grupo por que aquilo machuca. Na conversa final, discute os riscos de expor quem postou e como fazer isso com respeito.' },
            { label: 'Levar à mediação ou a um círculo', outcome: 'A turma pede ajuda à escola para uma conversa restaurativa entre os envolvidos. Na conversa final, discute a diferença entre punir e reparar o dano.' },
          ],
        },
      },
      {
        id: 'nossos-acordos',
        title: '4. Nossos acordos',
        paragraphs: [
          'Regras que a turma ajuda a criar costumam ser mais respeitadas do que regras impostas. Bons acordos são poucos, escritos de forma positiva (“escutamos até o fim” em vez de “não interromper”), dizem o que cada um ganha com eles e preveem o que fazer quando um acordo for quebrado.',
          'Os acordos também precisam ser revisitados: o que funcionou? O que precisa mudar? A convivência é algo que se constrói todos os dias, não um cartaz que se pendura e se esquece.',
        ],
        explore: [
          'Cada grupo propõe até três acordos; a turma junta os parecidos e vota os mais importantes.',
          'Para cada acordo, combinar o que fazer quando ele for quebrado — de forma que repare o dano em vez de só punir.',
        ],
      },
    ],
    challenges: {
      individual: [
        'Durante uma semana, anotar uma situação de conflito que viu ou viveu e como ela poderia ter sido resolvida com os quatro passos da conversa.',
        'Escrever uma mensagem de apoio para alguém que você sabe que está passando por um momento difícil na escola (pode ser entregue ou não).',
      ],
      coletivo: [
        'Construir e assinar os acordos de convivência da turma e marcar uma data para revisá-los.',
        'Criar uma campanha (cartazes, vídeo curto ou podcast) contra o cyberbullying para a escola.',
        'Propor ao grêmio ou à direção uma melhoria em um dos lugares do mapa de sensações.',
      ],
    },
    teacherScript: {
      antes: [
        'Conhecer como a escola trata casos de violência e bullying (regimento, coordenação, conselho tutelar) para orientar os estudantes com segurança.',
        'Preparar a planta simplificada da escola e adesivos ou símbolos para o mapa de sensações.',
        'Selecionar situações fictícias para a atividade “conflito, violência ou bullying?” — sem usar casos reais da turma.',
        'Combinar com a turma acordos para a própria conversa: sigilo, respeito e direito de não falar.',
      ],
      durante: [
        'Mediar sem expor: se surgir um relato de violência, acolher, agradecer a confiança e conversar depois, em particular.',
        'Garantir turnos de fala equilibrados e intervir em comentários que humilhem, explicando o porquê.',
        'Modelar os quatro passos da conversa com exemplos do próprio professor.',
        'Na escolha do capítulo 3, valorizar argumentos de todas as opções e trazer a perspectiva de quem foi atingido.',
      ],
      depois: [
        'Afixar os acordos em local visível e marcar uma data de revisão (por exemplo, em um mês).',
        'Encaminhar à coordenação qualquer relato de violência ou de risco, seguindo os protocolos da escola.',
        'Registrar no portfólio da turma o mapa de sensações e os acordos, para comparar no futuro.',
        'Observar nas semanas seguintes se os acordos aparecem nas falas e atitudes da turma.',
      ],
    },
    practicalActivity: {
      title: 'Acordos de convivência da turma',
      materials: [
        'Folhas de papel e canetas para os grupos',
        'Cartolina ou papel pardo para o cartaz final',
        'Fita adesiva ou ímãs para afixar',
        'Fichas de acordo impressas (opcional)',
      ],
      steps: [
        'Retomar o mapa de sensações e as situações discutidas nos capítulos anteriores.',
        'Em grupos de quatro, propor até três acordos escritos de forma positiva.',
        'Para cada acordo, o grupo responde: por que ele é importante? O que fazemos se ele for quebrado?',
        'Colar as propostas no quadro, juntar as parecidas e conversar sobre as diferenças.',
        'Votar os 5 a 7 acordos mais importantes, buscando consenso quando possível.',
        'Escrever o cartaz final, assinado por todos, e combinar a data de revisão.',
      ],
    },
    finalConversation: [
      'O que você descobriu sobre como a turma se sente na escola?',
      'Qual é a diferença entre um conflito e uma violência? Dê um exemplo.',
      'Qual acordo você acha mais difícil de cumprir? O que pode ajudar?',
      'O que cada um de nós pode fazer, na próxima semana, para a escola ser um lugar melhor para todos?',
    ],
    printable: {
      title: 'Ficha: um acordo da nossa turma',
      items: [
        'Nosso acordo (escrito de forma positiva):',
        'Por que ele é importante para nós:',
        'Como sabemos que ele está sendo cumprido (o que vemos e ouvimos):',
        'O que fazemos quando ele é quebrado (para reparar, não só punir):',
        'Quem pode nos ajudar se precisarmos:',
        'Data de revisão do acordo: ___/___/____',
        'Assinaturas do grupo:',
      ],
    },
    references: [
      { label: 'Lei nº 13.185/2015 — Programa de Combate à Intimidação Sistemática (bullying)', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 8.069/1990 — Estatuto da Criança e do Adolescente (ECA)', url: 'https://www.planalto.gov.br' },
      { label: 'Marshall B. Rosenberg — Comunicação não violenta', note: 'livro de referência sobre os quatro passos da conversa' },
      { label: 'Base Nacional Comum Curricular — competências gerais 8 e 9 (autoconhecimento, empatia e cooperação)', note: 'conferir no documento oficial', url: 'https://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Nunca peça que estudantes contem publicamente situações de violência que viveram. Ofereça canais individuais e sigilosos.',
      'Use apenas casos fictícios nas atividades; evite qualquer semelhança com situações reais da turma.',
      'Se surgir um relato de violência grave, abuso ou risco, siga o protocolo da escola e acione a coordenação — o professor não deve investigar sozinho.',
      'Acordos não substituem a responsabilidade dos adultos: a escola continua responsável por prevenir e enfrentar a violência.',
    ],
  },
  {
    id: 'racismo-e-antirracismo',
    title: 'Racismo e práticas antirracistas',
    theme: 'Educação antirracista',
    kicker: 'Em preparo',
    openingQuestion: 'Como o racismo aparece no cotidiano e o que podemos fazer para enfrentá-lo?',
    summary: 'Uma imersão para reconhecer o racismo em suas diferentes formas e construir práticas antirracistas na escola.',
    subjects: ['historia', 'politica-cidadania', 'portugues'],
    anos: [8, 9],
    durationMin: 90,
    artId: 'imm-antirracismo',
    status: 'em-preparo',
    context: [],
    diversity: [],
    contemporary: [],
    chapters: [],
    challenges: { individual: [], coletivo: [] },
    teacherScript: { antes: [], durante: [], depois: [] },
    practicalActivity: { title: 'Mural antirracista', materials: [], steps: [] },
    finalConversation: [],
    printable: { title: 'Racismo e práticas antirracistas', items: [] },
    references: [{ label: 'Lei nº 7.716/1989 (crimes resultantes de preconceito de raça ou de cor)', url: 'https://www.planalto.gov.br' }],
    pedagogicalNotes: [],
  },
  {
    id: 'tecnologia-e-sociedade',
    title: 'Tecnologia e sociedade',
    theme: 'Tecnologia',
    kicker: 'Em preparo',
    openingQuestion: 'Quem cria as tecnologias que usamos e para quem elas são feitas?',
    summary: 'Uma imersão sobre como as tecnologias mudam o cotidiano, o trabalho e a convivência, e como podemos criá-las de forma responsável.',
    subjects: ['tecnologia', 'ciencias', 'politica-cidadania'],
    anos: [6, 7, 8, 9],
    durationMin: 90,
    artId: 'imm-tecnologia',
    status: 'em-preparo',
    context: [],
    diversity: [],
    contemporary: [],
    chapters: [],
    challenges: { individual: [], coletivo: [] },
    teacherScript: { antes: [], durante: [], depois: [] },
    practicalActivity: { title: 'Protótipo de solução para a escola', materials: [], steps: [] },
    finalConversation: [],
    printable: { title: 'Tecnologia e sociedade', items: [] },
    references: [],
    pedagogicalNotes: [],
  },
  {
    id: 'mundo-do-trabalho',
    title: 'Os trabalhos do bairro',
    theme: 'Trabalho',
    kicker: 'Em preparo',
    openingQuestion: 'Quem faz o nosso bairro funcionar todos os dias?',
    summary: 'Uma imersão sobre os ofícios, profissões e trabalhos (pagos e não pagos) que sustentam a vida em comunidade.',
    subjects: ['geografia', 'historia', 'economia'],
    anos: [7, 8, 9],
    durationMin: 90,
    artId: 'imm-trabalho',
    status: 'em-preparo',
    context: [],
    diversity: [],
    contemporary: [],
    chapters: [],
    challenges: { individual: [], coletivo: [] },
    teacherScript: { antes: [], durante: [], depois: [] },
    practicalActivity: { title: 'Entrevista com trabalhadores do bairro', materials: [], steps: [] },
    finalConversation: [],
    printable: { title: 'Os trabalhos do bairro', items: [] },
    references: [],
    pedagogicalNotes: [],
  },
  {
    id: 'economia-cotidiana',
    title: 'Economia do dia a dia',
    theme: 'Economia cotidiana',
    kicker: 'Em preparo',
    openingQuestion: 'Por que os preços mudam e como isso afeta a nossa vida?',
    summary: 'Uma imersão na feira do bairro para entender preços, escolhas, consumo consciente e organização do orçamento.',
    subjects: ['educacao-financeira', 'matematica', 'economia'],
    anos: [6, 7, 8, 9],
    durationMin: 60,
    artId: 'imm-economia',
    status: 'em-preparo',
    context: [],
    diversity: [],
    contemporary: [],
    chapters: [],
    challenges: { individual: [], coletivo: [] },
    teacherScript: { antes: [], durante: [], depois: [] },
    practicalActivity: { title: 'Pesquisa de preços na feira', materials: [], steps: [] },
    finalConversation: [],
    printable: { title: 'Economia do dia a dia', items: [] },
    references: [],
    pedagogicalNotes: [],
  },
  {
    id: 'datas-do-calendario',
    title: 'Datas que contam histórias',
    theme: 'Calendário escolar',
    kicker: 'Em preparo',
    openingQuestion: 'Por que lembramos certas datas e esquecemos outras?',
    summary: 'Uma imersão sobre as datas do calendário escolar, suas origens e como celebrá-las sem estereótipos.',
    subjects: ['historia', 'politica-cidadania', 'artes'],
    anos: [6, 7, 8, 9],
    durationMin: 45,
    artId: 'imm-calendario',
    status: 'em-preparo',
    context: [],
    diversity: [],
    contemporary: [],
    chapters: [],
    challenges: { individual: [], coletivo: [] },
    teacherScript: { antes: [], durante: [], depois: [] },
    practicalActivity: { title: 'Calendário crítico da turma', materials: [], steps: [] },
    finalConversation: [],
    printable: { title: 'Datas que contam histórias', items: [] },
    references: [],
    pedagogicalNotes: [],
  },
];
