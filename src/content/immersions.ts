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
    theme: 'Racismo e práticas antirracistas',
    kicker: 'Imersão de cidadania',
    openingQuestion: 'Como o racismo aparece no cotidiano e o que podemos fazer para enfrentá-lo?',
    summary:
      'Uma imersão para aprender a reconhecer o racismo nas palavras, nas “brincadeiras”, nas imagens e nas instituições, diferenciar preconceito, discriminação e racismo, e saber como agir diante de uma situação racista. A turma termina fazendo uma auditoria antirracista de um espaço da escola.',
    subjects: ['historia', 'politica-cidadania', 'portugues'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-antirracismo',
    status: 'disponivel',
    context: [
      'Racismo é tratar pessoas como inferiores, suspeitas ou menos capazes por causa da sua cor, dos traços do rosto, do cabelo ou da origem étnica. No Brasil, ele atinge sobretudo pessoas negras (pretas e pardas) e povos indígenas, mas também pode atingir, por exemplo, pessoas de origem asiática, ciganas e de outros grupos.',
      'O racismo nem sempre aparece como xingamento. Muitas vezes ele está em expressões que usamos sem pensar, em piadas tratadas como “só brincadeira”, em quem aparece (ou não aparece) nos livros, nas propagandas e nas novelas, e em desigualdades que se repetem há gerações, como no acesso a empregos, moradia e segurança.',
      'A Constituição de 1988 determina, no artigo 5º, inciso XLII, que a prática do racismo é crime inafiançável e imprescritível. A Lei nº 7.716, de 1989, define os crimes resultantes de preconceito de raça ou de cor. Em 2023, a Lei nº 14.532 equiparou a injúria racial — ofender alguém usando elementos ligados à raça, cor, etnia ou origem — ao crime de racismo. O Estatuto da Igualdade Racial (Lei nº 12.288, de 2010) reúne políticas para garantir igualdade de oportunidades e combater a discriminação.',
      'No Censo 2022 do IBGE, mais da metade da população brasileira se declarou preta ou parda. Mesmo sendo maioria, a população negra ainda aparece pouco em muitos espaços de poder e de prestígio. Por isso, combater o racismo não é tarefa só de quem sofre com ele: é uma responsabilidade de toda a sociedade — e a escola é um dos lugares onde isso começa.',
    ],
    diversity: [
      'Pessoas negras e indígenas não formam grupos iguais por dentro: têm histórias, religiões, opiniões, profissões e jeitos de viver muito diferentes. Nenhuma pessoa representa sozinha o seu grupo nem é obrigada a explicar o racismo para os outros.',
      'Os povos indígenas no Brasil são muitos, com línguas, territórios e culturas próprios. Tratar todos como “o índio” genérico, ou como se vivessem apenas no passado, é uma forma de apagamento; muitos indígenas vivem em cidades, estudam, trabalham e mantêm sua identidade.',
      'O racismo se cruza com outras desigualdades: uma menina negra, um jovem indígena que mora na cidade ou uma pessoa negra com deficiência podem enfrentar situações diferentes, que somam mais de uma discriminação.',
      'Identidade racial envolve autodeclaração e pode ser um processo pessoal. Na escola, ninguém deve ser pressionado a se classificar, a contar experiências de discriminação ou a falar “em nome” de um grupo.',
    ],
    contemporary: [
      'Escritoras e pesquisadores negros, como a filósofa e escritora Djamila Ribeiro e o jurista Silvio Almeida, autor do livro “Racismo estrutural”, ajudaram a popularizar no Brasil o debate sobre racismo estrutural e sobre o que significa ser antirracista.',
      'Desde a Lei nº 14.759, de 2023, o 20 de novembro — Dia Nacional de Zumbi e da Consciência Negra — é feriado nacional. Já o 21 de março é o Dia Internacional pela Eliminação da Discriminação Racial, instituído pela ONU.',
      'Jovens negros e indígenas usam redes sociais, música, literatura e audiovisual para contar suas próprias histórias, questionar estereótipos e mostrar a diversidade de suas comunidades.',
      'Escolas, empresas e órgãos públicos têm criado comissões, protocolos de acolhimento e revisões de materiais para identificar e corrigir práticas racistas — muitas vezes a partir de propostas de estudantes e movimentos sociais.',
    ],
    chapters: [
      {
        id: 'so-uma-brincadeira',
        title: '1. “Era só uma brincadeira”',
        paragraphs: [
          'Comece com uma cena fictícia. Na saída de uma escola, um grupo ri de um vídeo em que alguém imita, de forma exagerada, o cabelo e o jeito de falar de uma pessoa negra. Um dos meninos diz: “Relaxa, é só zoeira, ninguém aqui é racista”. Será que basta não ter a intenção de ofender para que algo não seja racista?',
          'Quando uma piada usa a cor da pele, o cabelo, os traços do rosto ou a origem de alguém como motivo de riso, ela reforça a ideia de que aquele grupo é inferior ou “engraçado” por ser quem é. Esse tipo de humor tem sido chamado de racismo recreativo: o racismo disfarçado de diversão, que deixa a pessoa atingida sem espaço para reclamar, porque “não aceitar brincadeira” vira o problema.',
          'A língua também carrega marcas dessa história. Expressões como “a coisa está preta”, “lista negra”, “denegrir” ou “cabelo ruim” associam o que é negro a algo ruim, sujo ou perigoso. Expressões como “programa de índio” ou chamar todo descendente de asiáticos de “japa” ou de “chinês” transformam povos inteiros em estereótipo. A língua muda com o tempo, e podemos escolher outras palavras.',
        ],
        explore: [
          'Em grupos, listar expressões ou apelidos ouvidos no dia a dia que tenham relação com cor, cabelo, traços ou origem, e discutir: o que essa expressão diz sobre um grupo de pessoas? Há outra forma de dizer a mesma coisa?',
          'Perguntar: quem decide se uma piada é engraçada — quem conta ou quem é alvo dela?',
        ],
      },
      {
        id: 'preconceito-discriminacao-racismo',
        title: '2. Preconceito, discriminação e racismo',
        paragraphs: [
          'Três palavras costumam ser usadas como se fossem a mesma coisa, mas não são. Preconceito é uma ideia formada antes de conhecer a pessoa, um julgamento baseado em estereótipos (“pessoas daquele grupo são assim”). Discriminação é quando esse preconceito vira ação: tratar alguém de forma diferente e pior, excluir, ofender, negar uma oportunidade.',
          'Racismo é mais amplo: é um sistema que organiza a sociedade colocando alguns grupos em vantagem e outros em desvantagem por causa da raça. Ele pode ser individual (uma pessoa que ofende outra), institucional (quando regras e práticas de uma escola, empresa ou serviço tratam grupos de forma desigual, como um segurança de loja que segue apenas clientes negros) e estrutural (quando a desigualdade está tão presente na história e no funcionamento da sociedade que parece “normal”).',
          'Um exemplo simples de racismo estrutural é o antigo “lápis cor de pele”: durante muito tempo, só um tom de bege recebeu esse nome, como se a pele de todo mundo fosse daquela cor. Ninguém precisava ter má intenção para que isso deixasse muitas crianças fora do “normal”. Por isso, não basta “não ser racista”: é preciso perceber essas situações e agir para mudá-las — é isso que significa ser antirracista.',
        ],
        explore: [
          'Dar à turma pequenas situações fictícias e pedir que classifiquem: é preconceito, discriminação ou racismo institucional/estrutural? Pode ser mais de um?',
          'Ler juntos o artigo 5º, inciso XLII, da Constituição e conversar: por que a lei trata o racismo como um crime tão grave?',
        ],
      },
      {
        id: 'quem-aparece',
        title: '3. Quem aparece e quem some',
        paragraphs: [
          'Pense nos livros da biblioteca, nas capas de revistas, nas propagandas e nos desenhos animados. Quem costuma ser o herói, o cientista, o médico, a princesa? Quem aparece como empregado, como suspeito ou só no passado? Quando um grupo aparece sempre nos mesmos papéis, crianças e jovens aprendem, sem perceber, o que “combina” com cada pessoa.',
          'Com os povos indígenas acontece algo parecido: muitas vezes eles aparecem apenas no capítulo sobre 1500, com cocar e arco e flecha, como se não existissem hoje. As Leis nº 10.639, de 2003, e nº 11.645, de 2008, tornaram obrigatório o ensino de história e cultura afro-brasileira e indígena nas escolas justamente para corrigir esse silêncio.',
          'Olhar com atenção para os materiais que nos cercam é uma prática antirracista. Não se trata de “cancelar” livros ou imagens, mas de perguntar quem está sendo mostrado, como, por quem — e o que está faltando.',
        ],
        explore: [
          'Folhear um livro didático ou um conjunto de imagens e contar: quantas pessoas negras, indígenas e brancas aparecem? Em que papéis?',
          'Perguntar: que livro, filme ou personagem você conhece em que uma pessoa negra ou indígena é protagonista no presente?',
        ],
        classChoice: {
          prompt: 'Que espaço da escola a turma quer investigar na auditoria antirracista?',
          options: [
            { label: 'A biblioteca ou o cantinho de leitura', outcome: 'A turma vai analisar autores, personagens e capas dos livros. Na conversa final, discute quais vozes faltam no acervo e prepara uma lista de sugestões de compra ou empréstimo.' },
            { label: 'Os livros didáticos', outcome: 'A turma vai analisar imagens e textos de um livro didático, observando quem aparece e em que papéis. Na conversa final, discute como completar o que o livro deixa de fora durante as aulas.' },
            { label: 'Murais, cartazes e datas comemorativas', outcome: 'A turma vai observar os murais e o calendário de eventos da escola. Na conversa final, discute se a diversidade aparece o ano inteiro ou só em datas específicas, como o 20 de novembro.' },
          ],
        },
      },
      {
        id: 'na-hora-h',
        title: '4. Na hora H: o que fazer?',
        paragraphs: [
          'Saber o que é racismo é importante, mas a pergunta mais difícil é: o que eu faço quando vejo acontecer? Muitas vezes o silêncio de quem assiste faz quem ofendeu achar que todo mundo concorda. Quem testemunha pode agir de várias formas, de acordo com o que for seguro: interromper, desviar a atenção, chamar um adulto, acolher a pessoa atingida depois ou registrar o que aconteceu.',
          'Acolher significa perguntar como a pessoa está, acreditar no que ela sente, não minimizar (“foi só uma brincadeira”) e perguntar o que ela gostaria que fosse feito. Na escola, a situação deve ser levada a um professor, à coordenação ou à direção. Fora da escola, o racismo e a injúria racial podem ser denunciados à polícia, ao Ministério Público ou pelo Disque 100, serviço do governo federal que recebe denúncias de violações de direitos humanos.',
          'Uma escola antirracista não é aquela em que “nunca acontece nada”, mas aquela que reconhece o problema, protege quem foi atingido, ajuda quem errou a entender o dano e muda as práticas que permitem que o racismo se repita.',
        ],
        explore: [
          'Montar no quadro uma lista de “frases de coragem”: o que dá para dizer na hora para interromper uma fala racista sem partir para a agressão?',
          'Discutir: por que é importante não expor a pessoa atingida, por exemplo, compartilhando o vídeo da ofensa sem o consentimento dela?',
        ],
        classChoice: {
          prompt: 'Num jogo do torneio interclasses, alguém da torcida faz um comentário racista sobre o cabelo de um jogador do outro time. Muita gente ri. O que a turma faria?',
          options: [
            { label: 'Interromper na hora', outcome: 'A turma combina falar com firmeza que aquilo não é aceitável e pedir para o árbitro ou professor parar o jogo. Na conversa final, discute como agir na hora sem colocar ninguém em risco.' },
            { label: 'Acolher o jogador e chamar um adulto', outcome: 'A turma procura o jogador depois do lance, pergunta como ele está e leva o caso à coordenação junto com ele, se ele quiser. Na conversa final, discute por que o acolhimento importa tanto quanto a punição.' },
            { label: 'Propor uma ação para o torneio', outcome: 'Além de comunicar o caso, a turma propõe que o torneio tenha regras e uma campanha contra o racismo nos jogos. Na conversa final, discute como transformar um caso em mudança de prática na escola.' },
          ],
        },
      },
    ],
    challenges: {
      individual: [
        'Durante uma semana, anotar expressões ou situações do dia a dia (em casa, na TV, na internet) que reforçam estereótipos raciais e propor outra forma de dizer ou mostrar.',
        'Escolher um livro, música, filme ou perfil de uma pessoa negra ou indígena contemporânea e escrever uma pequena indicação para a turma.',
      ],
      coletivo: [
        'Realizar a auditoria antirracista do espaço escolhido e apresentar os resultados à direção ou à comunidade escolar.',
        'Criar uma campanha da turma com cartazes ou vídeos curtos sobre como agir diante do racismo, com as “frases de coragem” construídas na imersão.',
        'Organizar uma lista de sugestões de livros e materiais com autoria e protagonismo negros e indígenas para a biblioteca.',
      ],
    },
    teacherScript: {
      antes: [
        'Revisar os conceitos de preconceito, discriminação e racismo (individual, institucional e estrutural) e preparar exemplos fictícios adequados à idade da turma.',
        'Conversar com a coordenação sobre como a escola encaminha casos de racismo, para informar a turma com segurança.',
        'Separar materiais para a auditoria: livros didáticos, livros da biblioteca, fotos dos murais ou o calendário de eventos.',
        'Planejar como acolher estudantes que relatem experiências de racismo durante a aula, sem expô-los diante da turma.',
      ],
      durante: [
        'Combinar com a turma, logo no início, regras de respeito: falar das situações, e não de colegas presentes; ninguém é obrigado a contar experiências pessoais.',
        'Não pedir que estudantes negros ou indígenas “expliquem” o racismo ou falem pelo grupo; distribuir a palavra de forma equilibrada.',
        'Se surgir uma fala racista durante a aula, interrompê-la com calma, nomear o problema e transformá-la em aprendizagem, sem humilhar quem falou.',
        'Nas escolhas dos capítulos 3 e 4, pedir que a turma justifique as opções e pense nas consequências para todos os envolvidos.',
      ],
      depois: [
        'Reunir os resultados da auditoria em um relatório simples e combinar com a turma a quem ele será apresentado.',
        'Acompanhar, de forma individual e reservada, estudantes que tenham relatado situações de discriminação, acionando a coordenação quando necessário.',
        'Registrar no portfólio da turma as “frases de coragem” e as propostas de mudança feitas.',
        'Retomar a pergunta de abertura e incluir o tema ao longo do ano, e não apenas em 20 de novembro ou 21 de março.',
      ],
    },
    practicalActivity: {
      title: 'Auditoria antirracista da escola',
      materials: [
        'Fichas de auditoria impressas (uma por grupo)',
        'Livros didáticos, livros da biblioteca ou fotos dos murais e do calendário escolar',
        'Papel pardo ou cartolina para o painel de resultados',
        'Canetas coloridas e notas adesivas',
      ],
      steps: [
        'Explicar que a auditoria investiga um espaço ou material da escola — e não pessoas — para descobrir quem aparece, em que papéis e quem está faltando.',
        'Dividir a turma em grupos e entregar a cada um uma parte do espaço escolhido (uma prateleira, um capítulo do livro, um mural, um bimestre do calendário).',
        'Cada grupo preenche a ficha: quantas pessoas negras, indígenas, brancas e de outros grupos aparecem, em que papéis (protagonista, coadjuvante, no passado, no presente) e se há estereótipos.',
        'Os grupos registram um exemplo positivo (algo que valoriza a diversidade) e um exemplo que precisa mudar, explicando por quê.',
        'Montar o painel de resultados da turma com os números, os exemplos e as lacunas encontradas.',
        'Escrever coletivamente três propostas concretas de mudança (por exemplo, sugestões de livros, novos cartazes, temas para o ano todo) e decidir a quem apresentá-las.',
      ],
    },
    finalConversation: [
      'Qual situação de racismo do cotidiano você não percebia antes e agora consegue reconhecer?',
      'Qual é a diferença entre “não ser racista” e “ser antirracista”?',
      'O que a auditoria mostrou sobre a nossa escola? O que mais surpreendeu a turma?',
      'Que atitude antirracista cada um de nós pode praticar a partir desta semana — na escola, em casa ou na internet?',
    ],
    printable: {
      title: 'Ficha de auditoria antirracista',
      items: [
        'Espaço ou material analisado (livro, prateleira, mural, calendário):',
        'Quantas pessoas aparecem e de quais grupos (negras, indígenas, brancas, asiáticas, outras):',
        'Em que papéis aparecem: ( ) protagonista  ( ) coadjuvante  ( ) no passado  ( ) no presente',
        'Há estereótipos ou expressões que reforçam preconceitos? Quais?',
        'Um exemplo positivo que valoriza a diversidade:',
        'Um exemplo que precisa mudar e por quê:',
        'Quem ou o que está faltando:',
        'Nossa proposta de mudança:',
      ],
    },
    references: [
      { label: 'Constituição Federal de 1988, artigo 5º, inciso XLII (racismo como crime inafiançável e imprescritível)', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 7.716/1989 (crimes resultantes de preconceito de raça ou de cor) e Lei nº 14.532/2023 (equipara a injúria racial ao crime de racismo)', url: 'https://www.planalto.gov.br' },
      { label: 'Estatuto da Igualdade Racial (Lei nº 12.288/2010) e Leis nº 10.639/2003 e nº 11.645/2008 (ensino de história e cultura afro-brasileira e indígena)', url: 'https://www.planalto.gov.br' },
      { label: 'IBGE — Censo Demográfico 2022', note: 'dados sobre cor ou raça da população brasileira', url: 'https://www.ibge.gov.br' },
      { label: 'Ministério da Igualdade Racial', note: 'políticas públicas e materiais sobre enfrentamento ao racismo', url: 'https://www.gov.br/igualdaderacial' },
    ],
    pedagogicalNotes: [
      'Nunca coloque estudantes negros ou indígenas no lugar de “representantes” ou de exemplos vivos de racismo. Trabalhe com casos fictícios e deixe que cada um decida se quer compartilhar algo pessoal.',
      'Evite reproduzir em sala, mesmo como exemplo, ofensas, vídeos ou imagens racistas de forma gratuita. Quando for necessário citar uma expressão, faça isso com cuidado e explicando o problema.',
      'Equilibre a denúncia do racismo com a valorização: mostre pessoas negras e indígenas como protagonistas, produtoras de conhecimento e cultura no presente, e não apenas como vítimas.',
      'Situações de racismo relatadas na aula devem ser acolhidas e encaminhadas à equipe gestora, seguindo os protocolos da escola e a legislação; não as trate apenas como “conflito entre colegas”.',
    ],
  },
  {
    id: 'tecnologia-e-sociedade',
    title: 'Tecnologia e sociedade',
    theme: 'Tecnologia',
    kicker: 'Imersão de tecnologia',
    openingQuestion: 'Quem cria as tecnologias que usamos e para quem elas são feitas?',
    summary:
      'Uma investigação sobre tecnologia como criação humana: das ferramentas e saberes tradicionais aos aplicativos e à inteligência artificial. A turma discute quem fica de fora, o que acontece com nossos dados e termina projetando, em papel, uma solução simples para um problema real da escola.',
    subjects: ['tecnologia', 'ciencias', 'politica-cidadania'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-tecnologia',
    status: 'disponivel',
    context: [
      'Tecnologia não é só celular, computador e internet. É todo conjunto de técnicas, ferramentas e conhecimentos que as pessoas criam para resolver problemas e transformar o mundo: a enxada, a roda, a panela de barro, a escrita, a vacina, o calendário agrícola, a rede de pesca. Toda tecnologia nasce de escolhas humanas — e por isso carrega as ideias, as necessidades e os limites de quem a criou.',
      'Muitos povos e comunidades desenvolveram tecnologias sofisticadas a partir da observação e da experiência. Povos indígenas, por exemplo, criaram o tipiti, um cesto trançado usado para espremer a mandioca brava e retirar o líquido venenoso antes de transformá-la em farinha. Saberes de agricultores, pescadores, parteiras e artesãos também são tecnologia, ainda que nem sempre sejam chamados assim.',
      'Quando uma tecnologia é projetada sem pensar em todas as pessoas, alguém fica de fora: uma escada sem rampa, um site que não funciona com leitor de tela, um serviço público que só pode ser acessado pela internet. A Lei Brasileira de Inclusão da Pessoa com Deficiência (Lei nº 13.146/2015) trata a acessibilidade como direito e reconhece a tecnologia assistiva como meio para garantir autonomia e participação.',
      'No mundo digital, nossas ações deixam rastros — buscas, curtidas, localização, compras —, e esses dados são usados por empresas e governos, inclusive por algoritmos que decidem o que aparece na nossa tela. No Brasil, o Marco Civil da Internet (Lei nº 12.965/2014) estabelece princípios, garantias, direitos e deveres para o uso da internet, e a Lei Geral de Proteção de Dados Pessoais, a LGPD (Lei nº 13.709/2018), define regras para o tratamento de dados pessoais, com cuidado especial para dados de crianças e adolescentes.',
    ],
    diversity: [
      'Há tecnologias de alta complexidade, como satélites e computadores, e tecnologias simples e baratas, como uma cisterna, um fogão solar ou um cartaz bem pensado. Uma não é “mais tecnologia” que a outra: o que importa é se resolve o problema de quem precisa.',
      'O acesso à tecnologia é desigual: muda entre cidade e campo, entre regiões, entre famílias com mais e menos renda. Pesquisas como a TIC Domicílios, do Cetic.br, acompanham o acesso à internet no Brasil e mostram que ter internet não é igual para todos — conexão, aparelho e habilidade de uso variam muito.',
      'Pessoas com deficiência, pessoas idosas, quem não lê com facilidade e quem fala outras línguas, como a Libras ou línguas indígenas, muitas vezes encontram barreiras em tecnologias que não foram pensadas para elas.',
      'Diferentes grupos têm relações diferentes com a tecnologia: há quem crie, quem conserte, quem adapte e quem reinvente. Consertar um rádio, adaptar uma bicicleta para carga ou criar um grupo de mensagens para organizar a comunidade também é fazer tecnologia.',
    ],
    contemporary: [
      'O Brasil usa urnas eletrônicas nas eleições desde 1996, um exemplo de tecnologia criada para um serviço público que envolve milhões de pessoas — e que, como toda tecnologia, depende de regras, fiscalização e confiança da sociedade.',
      'Iniciativas de inclusão digital, como telecentros, bibliotecas comunitárias e projetos em escolas, ajudam pessoas a acessar a internet e a aprender a usá-la de forma crítica e segura.',
      'Ferramentas de inteligência artificial passaram a fazer parte do dia a dia: elas escrevem textos, criam imagens e recomendam conteúdos. Elas podem ajudar, mas também erram, inventam informações e repetem preconceitos presentes nos dados com que foram treinadas.',
      'Jovens, coletivos e comunidades criam soluções próprias para problemas locais — de aplicativos de denúncia de problemas no bairro a tecnologias sociais simples, como hortas com irrigação de garrafa PET — mostrando que inovar não depende só de grandes empresas.',
    ],
    chapters: [
      {
        id: 'o-que-e-tecnologia',
        title: '1. O que é tecnologia?',
        paragraphs: [
          'Comece pedindo que a turma olhe ao redor da sala e liste tudo o que é tecnologia. Provavelmente o celular e o projetor aparecerão primeiro. Mas e o lápis? A cadeira? O caderno? O interruptor? O próprio prédio da escola?',
          'Cada um desses objetos foi pensado por alguém, para resolver um problema, com os materiais e conhecimentos disponíveis em uma época. A escrita, a agricultura e o domínio do fogo foram tecnologias que mudaram a vida humana tanto quanto a internet. E a invenção também acontece aqui: em 1906, em Paris, o brasileiro Santos Dumont voou com o 14-Bis, um dos marcos da história da aviação.',
          'Pensar a tecnologia assim muda a pergunta: em vez de “quem tem tecnologia?”, passamos a perguntar “quem cria, quem usa, quem conserta e quem decide?”.',
        ],
        explore: [
          'Fazer no quadro uma linha do tempo com tecnologias que a turma conhece, misturando antigas e novas: fogo, roda, escrita, rede de pesca, prensa, vacina, rádio, celular.',
          'Pedir que cada estudante escolha uma tecnologia de casa e responda: que problema ela resolve? Quem provavelmente a inventou? Quem consegue usá-la e quem não consegue?',
        ],
        classChoice: {
          prompt: 'Que tipo de tecnologia a turma quer investigar mais de perto?',
          options: [
            { label: 'Tecnologias tradicionais', outcome: 'A turma vai investigar saberes e ferramentas de comunidades — como o tipiti, técnicas de construção, pesca ou plantio — e perguntar por que muitas vezes eles não são chamados de tecnologia. Na conversa final, discute quem decide o que conta como “inovação”.' },
            { label: 'Tecnologias digitais', outcome: 'A turma vai olhar para aplicativos, redes sociais e serviços on-line que usa no dia a dia, perguntando quem os cria e como eles ganham dinheiro. Na conversa final, discute o que mudaria se esses serviços fossem pensados pelos próprios estudantes.' },
            { label: 'Tecnologias da escola', outcome: 'A turma vai investigar os objetos e sistemas do próprio prédio — portas, bebedouros, sinal, iluminação, quadro — e quem eles atendem bem ou mal. Esse olhar prepara diretamente a atividade prática do capítulo 4.' },
          ],
        },
      },
      {
        id: 'quem-fica-de-fora',
        title: '2. Quem fica de fora?',
        paragraphs: [
          'Toda tecnologia é pensada para um “usuário imaginado”. Quando esse usuário é sempre uma pessoa que enxerga, ouve, anda, lê com facilidade e tem internet rápida, muita gente fica de fora. Uma porta pesada pode ser uma barreira para uma criança pequena ou para quem usa muletas; um vídeo sem legenda exclui quem é surdo; um formulário só on-line exclui quem não tem conexão.',
          'A Lei Brasileira de Inclusão (Lei nº 13.146/2015) diz que acessibilidade é um direito e define tecnologia assistiva como produtos, recursos, estratégias e serviços que promovem a autonomia e a participação de pessoas com deficiência — como bengalas, leitores de tela, o sistema braille, aplicativos de comunicação alternativa e recursos em Libras, que é reconhecida como meio legal de comunicação pela Lei nº 10.436/2002.',
          'A desigualdade de acesso também é tecnológica: há estudantes que dividem um único celular com a família, que dependem do wi-fi de outros lugares ou que moram onde o sinal é fraco. Quando a escola ou o governo passa a oferecer algo apenas pela internet, precisa perguntar quem vai conseguir usar.',
        ],
        explore: [
          'Fazer uma caminhada rápida pela escola procurando barreiras: degraus sem rampa, avisos muito pequenos, sinais apenas sonoros ou apenas visuais, objetos fora do alcance.',
          'Discutir: um serviço que “funciona para a maioria” está bom? O que seria um serviço que funciona para todos?',
        ],
      },
      {
        id: 'dados-e-algoritmos',
        title: '3. Nossos dados, nossos rastros',
        paragraphs: [
          'Cada vez que usamos um aplicativo, deixamos uma pegada digital: o que buscamos, onde estamos, com quem conversamos, quanto tempo olhamos um vídeo. Esses dados ajudam serviços a funcionar, mas também são usados para vender anúncios e para alimentar algoritmos de recomendação — programas que escolhem o que aparece na nossa tela a partir do que já fizemos antes.',
          'Algoritmos de recomendação podem nos mostrar coisas úteis, mas também podem nos prender em “bolhas”, mostrando sempre mais do mesmo, e privilegiar conteúdos que chamam atenção, mesmo quando são falsos ou ofensivos. Ferramentas de inteligência artificial funcionam a partir de grandes quantidades de dados e também podem errar com muita confiança, inventar informações ou repetir preconceitos. Usá-las bem exige conferir, comparar fontes e lembrar que a decisão final é nossa.',
          'A LGPD (Lei nº 13.709/2018) diz que dados pessoais devem ser tratados com finalidade clara, transparência e segurança, e que o tratamento de dados de crianças e adolescentes deve ser feito no seu melhor interesse. A Autoridade Nacional de Proteção de Dados (ANPD) é o órgão responsável por fiscalizar o cumprimento da lei.',
        ],
        explore: [
          'Pedir que a turma imagine (sem abrir o celular) que dados um aplicativo de vídeos pode saber sobre alguém só pelo que essa pessoa assiste. O que é útil? O que é invasivo?',
          'Comparar duas situações fictícias: o app de mapas que usa a localização para mostrar o caminho e um jogo de lanterna que pede acesso aos contatos. Qual pedido faz sentido para a finalidade do aplicativo?',
        ],
        classChoice: {
          prompt: 'Um aplicativo fictício de jogos, muito popular na turma, pede acesso à câmera, ao microfone, aos contatos e à localização para funcionar. O que a turma faria?',
          options: [
            { label: 'Instalar e aceitar tudo', outcome: 'A turma segue com o jogo, mas investiga depois para que cada permissão poderia ser usada. Na conversa final, discute se “todo mundo usa” é motivo suficiente para entregar os próprios dados.' },
            { label: 'Ler a política de privacidade antes', outcome: 'A turma tenta entender o que o app diz que faz com os dados e percebe como esses textos podem ser longos e difíceis. Na conversa final, discute como a LGPD pede transparência e como as empresas poderiam explicar melhor.' },
            { label: 'Procurar uma alternativa ou negar permissões', outcome: 'A turma busca um jogo que peça menos dados ou testa negar as permissões que não fazem sentido. Na conversa final, discute que escolhas temos como usuários e o que depende de leis e de fiscalização.' },
          ],
        },
      },
      {
        id: 'criar-solucoes',
        title: '4. Nós também criamos tecnologia',
        paragraphs: [
          'Agora a turma passa de usuária a criadora. A proposta é usar o design centrado nas pessoas: começar não pela solução, mas por quem vai usá-la. Quem enfrenta o problema? O que essa pessoa precisa? O que ela já tenta fazer? Só depois disso pensamos em ideias — e testamos com protótipos simples, de papel, antes de gastar qualquer recurso.',
          'Uma boa solução não precisa ser cara nem digital. Um sistema de cores para indicar a fila da cantina, uma placa em letras grandes e com símbolos, um suporte de papelão para o celular de quem filma a aula, um quadro de avisos acessível: tudo isso é tecnologia, se resolve um problema real de forma pensada para as pessoas.',
        ],
        explore: [
          'Usar a ficha do projeto (material imprimível) para que cada grupo descreva o problema, quem é afetado e a ideia de solução.',
          'Lembrar a turma de “testar com quem vai usar”: mostrar o protótipo a colegas, funcionários ou professores e ouvir o que eles dizem antes de dar a ideia por pronta.',
        ],
      },
    ],
    challenges: {
      individual: [
        'Escolher uma tecnologia usada por uma pessoa mais velha da família (uma ferramenta, receita, técnica de conserto ou de plantio) e registrar como ela funciona e como foi aprendida.',
        'Fazer um “diário da pegada digital” de um dia: anotar, sem precisar mostrar conteúdos pessoais, quais aplicativos usou e que tipo de dado cada um pode ter coletado.',
      ],
      coletivo: [
        'Mapear as barreiras de acessibilidade da escola e apresentar à direção uma lista de sugestões, das mais simples às mais complexas.',
        'Criar um guia ilustrado da turma com dicas de privacidade e de uso crítico de inteligência artificial para estudantes mais novos.',
        'Prototipar em papel uma solução de baixo custo para um problema real da escola e testá-la com as pessoas que seriam afetadas.',
      ],
    },
    teacherScript: {
      antes: [
        'Observar a escola e anotar alguns problemas reais que possam virar desafios de projeto (filas, barreiras de acesso, avisos que ninguém lê, espaços pouco usados).',
        'Ler os trechos principais da LGPD sobre dados de crianças e adolescentes e da Lei Brasileira de Inclusão sobre acessibilidade, para responder dúvidas com segurança.',
        'Separar materiais de prototipagem: papel, papelão, tesoura, fita, canetas, sucata limpa.',
        'Lembrar que nem todos os estudantes têm celular ou internet em casa: planejar a imersão para funcionar sem dispositivos e evitar perguntas que exponham a situação de cada família.',
      ],
      durante: [
        'Na abertura, valorizar respostas que fogem do digital e perguntar sempre “que problema isso resolve?”.',
        'Na caminhada pela escola, orientar a turma a observar sem constranger colegas ou funcionários com deficiência.',
        'No capítulo 3, não pedir que estudantes mostrem o próprio celular, perfis ou histórico: trabalhar com situações fictícias.',
        'Durante a criação, circular entre os grupos perguntando: “quem vai usar isso?”, “vocês perguntaram a essa pessoa?”, “o que pode dar errado?”.',
      ],
      depois: [
        'Expor os protótipos e as fichas em um mural ou em uma pequena feira de soluções.',
        'Levar as propostas mais viáveis para a direção, o grêmio ou o conselho escolar.',
        'Registrar no portfólio da turma as escolhas feitas nos capítulos 1 e 3 e os argumentos usados.',
        'Retomar a pergunta de abertura e comparar as respostas do início com as do fim.',
      ],
    },
    practicalActivity: {
      title: 'Protótipo de papel: uma solução para a nossa escola',
      materials: [
        'Fichas do projeto impressas (uma por grupo)',
        'Papel, papelão e sucata limpa (caixas, rolos, tampinhas)',
        'Tesoura sem ponta, cola e fita adesiva',
        'Canetas coloridas e post-its ou tiras de papel',
      ],
      steps: [
        'Em grupos, escolher um problema real da escola levantado pela turma (por exemplo: fila da merenda, avisos que ninguém vê, barreira de acesso, desperdício de água).',
        'Identificar quem é afetado pelo problema e conversar com pelo menos uma dessas pessoas, com respeito, anotando o que ela precisa.',
        'Fazer uma chuva de ideias rápida e escolher uma solução de baixo custo, considerando também quem poderia ficar de fora dela.',
        'Construir um protótipo de papel ou papelão que mostre como a solução funcionaria.',
        'Testar o protótipo com colegas de outro grupo ou com quem enfrenta o problema e anotar o que precisa mudar.',
        'Apresentar a solução em até 2 minutos: problema, para quem é, como funciona, o que aprenderam no teste.',
      ],
    },
    finalConversation: [
      'O que mudou na sua ideia de tecnologia desde o começo da imersão?',
      'Quem ficou de fora nas tecnologias que discutimos — e quem poderia ficar de fora na solução que vocês criaram?',
      'Que cuidados você passou a ter (ou quer passar a ter) com seus dados e com o uso de inteligência artificial?',
      'Se vocês pudessem criar uma tecnologia para o bairro, que problema escolheriam resolver e com quem conversariam primeiro?',
    ],
    printable: {
      title: 'Ficha do projeto: tecnologia para a nossa escola',
      items: [
        'Nome do grupo:',
        'Problema que queremos resolver:',
        'Quem é afetado por esse problema:',
        'O que essas pessoas disseram que precisam:',
        'Nossa ideia de solução (descreva e desenhe no verso):',
        'Materiais necessários e custo aproximado:',
        'Quem poderia ficar de fora da nossa solução e como evitar isso:',
        'O que aprendemos ao testar o protótipo:',
      ],
    },
    references: [
      { label: 'Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais (LGPD)', note: 'ver especialmente o artigo 14, sobre dados de crianças e adolescentes', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 12.965/2014 — Marco Civil da Internet', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 13.146/2015 — Lei Brasileira de Inclusão da Pessoa com Deficiência', note: 'acessibilidade e tecnologia assistiva', url: 'https://www.planalto.gov.br' },
      { label: 'ANPD — Autoridade Nacional de Proteção de Dados', note: 'materiais educativos sobre proteção de dados', url: 'https://www.gov.br/anpd' },
      { label: 'Cetic.br — pesquisas TIC Domicílios e TIC Kids Online Brasil', note: 'para consultar dados atualizados sobre acesso e uso da internet', url: 'https://cetic.br' },
    ],
    pedagogicalNotes: [
      'Não exponha a situação econômica dos estudantes: evite perguntar em público quem tem celular, computador ou internet em casa. Trabalhe com situações fictícias e com o coletivo.',
      'Valorize tecnologias e saberes tradicionais, indígenas, quilombolas e populares sem tratá-los como “atrasados” ou curiosidades: são conhecimentos tão legítimos quanto os digitais.',
      'Ao falar de deficiência e acessibilidade, foque nas barreiras do ambiente e não nas pessoas, e nunca use colegas com deficiência como exemplo sem o consentimento deles.',
      'Sobre inteligência artificial, incentive o uso crítico — conferir informações, citar quando usou, não entregar dados pessoais — sem demonizar nem idealizar a ferramenta. A aba Inteligência artificial do Laboratório de futuros pode aprofundar o tema.',
    ],
  },
  {
    id: 'mundo-do-trabalho',
    title: 'Os trabalhos do bairro',
    theme: 'Trabalho',
    kicker: 'Imersão do mundo do trabalho',
    openingQuestion: 'Quem faz o nosso bairro funcionar todos os dias?',
    summary:
      'Uma investigação sobre o trabalho que sustenta a vida cotidiana: do que aparece ao que fica invisível, do formal ao informal, da escravidão às plataformas digitais. A turma entrevista trabalhadores do bairro e monta um mural dos trabalhos que fazem a comunidade funcionar.',
    subjects: ['geografia', 'historia', 'economia'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-trabalho',
    status: 'disponivel',
    context: [
      'Antes de a escola abrir o portão, muita gente já trabalhou: quem fez o pão, quem dirigiu o ônibus, quem limpou a rua, quem preparou a merenda, quem cuidou de uma criança ou de um idoso em casa. O trabalho é a atividade humana que transforma a natureza e organiza a vida em sociedade — e quase tudo o que usamos passou pelas mãos de alguém.',
      'Durante mais de três séculos, a economia do Brasil se apoiou no trabalho de pessoas indígenas e africanas escravizadas. A escravidão só foi abolida pela Lei Áurea, de 13 de maio de 1888, e os libertos não receberam terra, escola nem apoio para começar uma vida nova. Essa história ajuda a entender por que, até hoje, certos trabalhos são mal pagos e pouco valorizados — e quem costuma ocupá-los.',
      'No século XX, com a industrialização e a urbanização, milhões de pessoas deixaram o campo em direção às cidades. Nesse período, os direitos trabalhistas foram reunidos na Consolidação das Leis do Trabalho (CLT), de 1943. A Constituição de 1988, no artigo 7º, lista direitos dos trabalhadores, como salário mínimo, décimo terceiro salário, férias remuneradas, repouso semanal, limite de jornada e licença para mães e pais.',
      'Mesmo com essas leis, uma parte significativa dos trabalhadores brasileiros está na informalidade: trabalha sem carteira assinada e, muitas vezes, sem acesso a direitos como férias e aposentadoria. O IBGE acompanha a informalidade no mercado de trabalho pela PNAD Contínua. Hoje, a tecnologia, a automação e os aplicativos mudam de novo a forma de trabalhar — e trazem novas perguntas sobre direitos.',
    ],
    diversity: [
      'Trabalho formal (com carteira assinada ou como servidor público) e trabalho informal (sem registro, “por conta própria”, nos bicos) convivem no mesmo bairro, às vezes na mesma família e até na mesma pessoa.',
      'Há trabalho pago e trabalho não pago: cozinhar, limpar, cuidar de crianças, de idosos e de pessoas doentes é trabalho, mesmo quando feito em casa e sem salário — e ainda recai, na maioria das vezes, sobre as mulheres.',
      'No campo, na cidade, na floresta e no mar existem formas diferentes de trabalhar: agricultores familiares, pescadores artesanais, extrativistas, operários, comerciantes, profissionais da saúde e da educação, artistas, trabalhadores de aplicativo.',
      'Nenhuma profissão é “de homem” ou “de mulher”, “de branco” ou “de negro”. Essas ideias são estereótipos construídos ao longo da história e limitam as escolhas das pessoas.',
    ],
    contemporary: [
      'Entregadores e motoristas de aplicativo se organizam em associações e movimentos para discutir remuneração, segurança e direitos, num debate que envolve trabalhadores, empresas e poder público.',
      'Catadoras e catadores de materiais recicláveis formam cooperativas e são reconhecidos pela Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010) como parte da coleta seletiva nas cidades.',
      'Trabalhadoras domésticas, organizadas em sindicatos, conquistaram a ampliação de seus direitos pela Emenda Constitucional nº 72, de 2013, regulamentada pela Lei Complementar nº 150, de 2015.',
      'Agricultores familiares abastecem feiras e escolas: a Lei nº 11.947/2009 determina que parte dos recursos federais da alimentação escolar seja usada na compra de alimentos da agricultura familiar.',
    ],
    chapters: [
      {
        id: 'quem-faz-o-bairro',
        title: '1. Quem faz o bairro funcionar?',
        paragraphs: [
          'Imagine um dia comum no bairro, das 4 da manhã à meia-noite. Quem acorda primeiro? Quem está trabalhando enquanto a maioria dorme? Quem passa pela rua e quase ninguém repara? Montar essa linha do tempo é o primeiro passo para enxergar o trabalho que sustenta a nossa vida.',
          'Alguns trabalhos são muito visíveis: o comerciante na porta da loja, a professora na sala, o motorista do ônibus. Outros ficam escondidos: quem limpa o hospital de madrugada, quem cuida da avó em casa, quem separa o lixo reciclável, quem carrega as caixas da feira antes de ela abrir.',
        ],
        explore: [
          'Desenhar no quadro um relógio de 24 horas e pedir que a turma posicione os trabalhos que acontecem em cada horário no bairro.',
          'Perguntar: quais desses trabalhos vocês já agradeceram? Quais só notamos quando param de acontecer — como a coleta de lixo durante uma greve ou um feriado?',
        ],
        classChoice: {
          prompt: 'Que trabalhos do bairro a turma quer investigar primeiro?',
          options: [
            { label: 'Os trabalhos da rua', outcome: 'A turma começa por quem trabalha no espaço público — garis, feirantes, entregadores, ambulantes, motoristas — e depois pergunta quem cuida dessas pessoas quando chegam em casa.' },
            { label: 'Os trabalhos de dentro de casa', outcome: 'A turma começa pelo trabalho doméstico e de cuidado, pago e não pago, e depois descobre quantos desses trabalhadores também estão nas ruas, nos ônibus e nos serviços do bairro.' },
            { label: 'O caminho da comida', outcome: 'A turma segue o percurso de um alimento da merenda — do agricultor familiar ao transporte, à feira ou ao mercado e à cozinha da escola — e descobre quantos trabalhos cabem em um prato.' },
          ],
        },
      },
      {
        id: 'trabalho-ao-longo-do-tempo',
        title: '2. O trabalho tem história',
        paragraphs: [
          'O jeito de trabalhar no Brasil mudou muito. Por mais de três séculos, pessoas escravizadas foram obrigadas a trabalhar nas lavouras, nas minas, nas casas e nas ruas das cidades, sem salário e sem liberdade. A abolição, em 1888, foi resultado também da resistência dos próprios escravizados — com fugas, quilombos e lutas — e de movimentos abolicionistas. Mas não veio acompanhada de políticas para garantir terra, estudo e trabalho digno aos libertos.',
          'No século XX, as fábricas e as cidades cresceram, e muita gente migrou do campo e de outras regiões em busca de emprego. Trabalhadores se organizaram em sindicatos e reivindicaram direitos, que foram reunidos na CLT em 1943. Mais recentemente, máquinas, computadores e aplicativos mudaram de novo o trabalho: algumas funções desapareceram, outras surgiram, e muitas passaram a ser feitas de outro jeito.',
        ],
        explore: [
          'Pedir que cada estudante pergunte a um adulto da família: que trabalho seus pais ou avós faziam? Ele ainda existe? Mudou?',
          'Comparar uma profissão antiga e atual (por exemplo, a telefonista e o atendimento automático, ou o cobrador de ônibus e a catraca eletrônica) e discutir: o que a tecnologia facilitou, e para quem ficou mais difícil?',
        ],
      },
      {
        id: 'formal-informal-direitos',
        title: '3. Carteira assinada, bico e direitos',
        paragraphs: [
          'Trabalho formal é aquele registrado: o trabalhador tem carteira de trabalho assinada (ou é servidor público, ou contribui como microempreendedor) e, com isso, acesso a direitos como férias, décimo terceiro, licença-maternidade e aposentadoria. Trabalho informal é aquele sem esse registro: o famoso “bico”, o trabalho por conta própria sem contribuição, o emprego sem carteira. Quem está na informalidade costuma ficar desprotegido em caso de doença, acidente ou velhice.',
          'A Constituição de 1988, no artigo 7º, garante direitos como salário mínimo, jornada normal de até 8 horas por dia e 44 por semana, repouso semanal remunerado, férias com um terço a mais e proibição de diferença de salário por motivo de sexo, idade, cor ou estado civil. O mesmo artigo, no inciso XXXIII, proíbe qualquer trabalho a menores de 16 anos, salvo na condição de aprendiz, a partir dos 14 anos — e proíbe trabalho noturno, perigoso ou insalubre a menores de 18. Lugar de criança e adolescente é na escola, e a aprendizagem legal precisa combinar estudo e formação.',
        ],
        explore: [
          'Ler com a turma alguns incisos do artigo 7º da Constituição e perguntar: esse direito chega a todos os trabalhadores do nosso bairro? Quem fica de fora?',
          'Apresentar um caso fictício: Dona Lurdes vende salgados na porta do metrô há 15 anos, sem registro. Se ela adoecer por um mês, o que acontece com a renda dela? Que caminhos existiriam para ela?',
        ],
        classChoice: {
          prompt: 'Rafael, entregador de aplicativo fictício, trabalha 10 horas por dia de bicicleta. Num dia de chuva, ele cai e machuca o braço. Qual pergunta a turma quer investigar?',
          options: [
            { label: 'Quem cuida dele agora?', outcome: 'A turma investiga o que acontece com quem trabalha sem carteira quando adoece ou se acidenta: renda, previdência, apoio da família. Na conversa final, discute a diferença entre trabalho formal e informal na vida real.' },
            { label: 'Por que ele trabalha tantas horas?', outcome: 'A turma relaciona a jornada de Rafael com a forma de pagamento por entrega e com o limite de jornada previsto na Constituição. Na conversa final, discute como a tecnologia muda o tempo de trabalho.' },
            { label: 'O que pode mudar para trabalhadores como ele?', outcome: 'A turma pesquisa como entregadores se organizam e quais propostas estão em debate, ouvindo diferentes pontos de vista (trabalhadores, empresas, consumidores, poder público). Na conversa final, discute qual é o papel de quem pede a entrega.' },
          ],
        },
      },
      {
        id: 'mural-dos-trabalhos',
        title: '4. O mural dos trabalhos do bairro',
        paragraphs: [
          'Agora a turma vai ouvir quem trabalha. Cada grupo entrevista um trabalhador ou trabalhadora do bairro — a feirante, o porteiro, a merendeira, o mototaxista, a costureira, o gari, a cuidadora — para saber como é o seu dia, o que aprendeu, do que se orgulha e o que gostaria que mudasse.',
          'Com as entrevistas, a turma monta um mural ou mapa dos trabalhos do bairro. A ideia não é escolher a “melhor profissão”, e sim mostrar como os trabalhos dependem uns dos outros e por que todos merecem respeito e condições dignas.',
        ],
        explore: [
          'Usar o roteiro de entrevista (material imprimível) e combinar com a turma como pedir autorização antes de gravar, fotografar ou publicar a fala de alguém.',
          'No mural, ligar com barbante ou setas os trabalhos que dependem uns dos outros: quem precisa de quem para trabalhar?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Fazer um diário de um dia inteiro anotando todos os trabalhos de que você dependeu — dentro e fora de casa, pagos e não pagos.',
        'Entrevistar um adulto da família sobre o primeiro trabalho que ele teve e comparar com o trabalho que faz hoje.',
      ],
      coletivo: [
        'Montar o mural ou mapa dos trabalhos do bairro com pelo menos seis entrevistas, incluindo trabalhos formais e informais, pagos e não pagos.',
        'Criar uma campanha de valorização dos trabalhadores da escola — limpeza, portaria, cozinha, secretaria — com cartazes ou um pequeno vídeo de agradecimento.',
        'Organizar uma roda de conversa com dois ou três trabalhadores do bairro convidados para falar com a turma sobre seu ofício.',
      ],
    },
    teacherScript: {
      antes: [
        'Mapear trabalhadores da comunidade escolar e do entorno que aceitariam ser entrevistados e combinar horários com antecedência.',
        'Preparar um termo simples de autorização de uso de imagem e voz para os entrevistados.',
        'Separar o texto do artigo 7º da Constituição (site do Planalto) e escolher os incisos que serão lidos em sala.',
        'Imprimir os roteiros de entrevista (um por grupo) e reservar papel pardo para o mural.',
      ],
      durante: [
        'Abrir com o relógio de 24 horas do bairro e anotar todos os trabalhos citados, sem hierarquizar.',
        'Na escolha do capítulo 3, ouvir diferentes pontos de vista e separar o que é fato (o que a lei diz) do que é opinião (o que cada um acha que deveria mudar).',
        'Ficar atento a falas que desvalorizam profissões ou associam trabalhos a gênero ou cor de pele, e problematizá-las com perguntas, sem expor estudantes.',
        'Acolher com cuidado relatos de estudantes que trabalham ou ajudam a família, sem constrangê-los diante da turma.',
      ],
      depois: [
        'Montar o mural dos trabalhos em um lugar visível da escola e, se possível, convidar os entrevistados para vê-lo.',
        'Registrar no portfólio da turma as entrevistas e as principais descobertas.',
        'Retomar a pergunta de abertura e comparar as respostas do início com as do fim.',
        'Se surgirem indícios de trabalho infantil irregular, seguir os fluxos da escola e da rede de proteção (como o Conselho Tutelar), de forma discreta.',
      ],
    },
    practicalActivity: {
      title: 'Entrevistas e mural dos trabalhos do bairro',
      materials: [
        'Roteiros de entrevista impressos (um por grupo)',
        'Celular para gravar áudio ou foto, se houver e com autorização (opcional)',
        'Papel pardo ou cartolina e um mapa simples do bairro',
        'Canetas coloridas, barbante e fita adesiva',
      ],
      steps: [
        'Dividir a turma em grupos e listar juntos os trabalhadores do bairro que poderiam ser entrevistados, garantindo variedade: trabalhos formais e informais, de rua e de casa, do comércio, dos serviços e do campo.',
        'Cada grupo escolhe um entrevistado, pede autorização e combina dia e horário (na escola ou com acompanhamento de um adulto).',
        'Realizar a entrevista com o roteiro: rotina de trabalho, como aprendeu o ofício, o que mudou ao longo do tempo, se tem carteira assinada ou trabalha por conta própria, do que se orgulha e o que gostaria que mudasse.',
        'Transformar a entrevista em um cartão para o mural: nome (ou apelido autorizado), ofício, horário de trabalho, uma frase marcante e um desenho ou foto.',
        'Posicionar os cartões no mapa do bairro e ligar com barbante os trabalhos que dependem uns dos outros.',
        'Cada grupo apresenta seu entrevistado em até 2 minutos, destacando algo que a turma não sabia sobre aquele trabalho.',
      ],
    },
    finalConversation: [
      'Que trabalho do bairro você não enxergava antes e agora enxerga?',
      'Por que alguns trabalhos essenciais são tão pouco valorizados e mal pagos? O que a história do Brasil tem a ver com isso?',
      'Que direitos você acha que todo trabalhador deveria ter, seja qual for a sua profissão?',
      'Como podemos demonstrar respeito, no dia a dia, às pessoas que fazem o nosso bairro funcionar?',
    ],
    printable: {
      title: 'Roteiro de entrevista: um trabalho do bairro',
      items: [
        'Nome ou apelido do entrevistado (com autorização):',
        'Qual é o seu trabalho e onde ele acontece:',
        'Como é um dia de trabalho (horário de início e fim):',
        'Como e com quem aprendeu esse ofício:',
        'Tipo de trabalho: ( ) carteira assinada  ( ) por conta própria/MEI  ( ) sem registro  ( ) servidor público  ( ) outro',
        'O que mudou nesse trabalho ao longo dos anos (tecnologia, clientes, condições):',
        'Do que mais se orgulha no seu trabalho:',
        'O que gostaria que mudasse ou que as pessoas soubessem sobre ele:',
      ],
    },
    references: [
      { label: 'Constituição Federal de 1988, artigo 7º (direitos dos trabalhadores urbanos e rurais, incluindo o inciso XXXIII sobre o trabalho de menores)', url: 'https://www.planalto.gov.br' },
      { label: 'Decreto-Lei nº 5.452/1943 — Consolidação das Leis do Trabalho (CLT)', url: 'https://www.planalto.gov.br' },
      { label: 'IBGE — PNAD Contínua (Pesquisa Nacional por Amostra de Domicílios Contínua)', note: 'para consultar dados atualizados sobre ocupação e informalidade', url: 'https://www.ibge.gov.br' },
      { label: 'Ministério do Trabalho e Emprego — informações sobre direitos trabalhistas, aprendizagem e combate ao trabalho infantil', url: 'https://www.gov.br/trabalho-e-emprego' },
      { label: 'Base Nacional Comum Curricular — Geografia (unidade temática “Mundo do trabalho”) e História', url: 'https://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Esta imersão não é um teste vocacional: o foco é o papel do trabalho na sociedade e o respeito a todas as profissões, não a escolha de carreira dos estudantes.',
      'Evite hierarquizar profissões ou reforçar estereótipos de gênero e raça. Ao surgir uma fala do tipo “isso é trabalho de mulher”, devolva com perguntas e exemplos que mostrem outras possibilidades.',
      'Alguns estudantes podem ajudar a família no trabalho ou ter parentes desempregados ou na informalidade. Trate esses temas com acolhimento, sem expor ninguém, e não peça que revelem renda ou situação de trabalho da família.',
      'Temas como aplicativos, reforma de leis e sindicatos envolvem debate público. Apresente diferentes pontos de vista com base em fatos e na legislação, sem tomar partido nem conduzir a turma a uma posição.',
    ],
  },
  {
    id: 'economia-cotidiana',
    title: 'Economia do dia a dia',
    theme: 'Economia cotidiana',
    kicker: 'Imersão de economia',
    openingQuestion: 'Por que os preços mudam e como isso afeta a nossa vida?',
    summary:
      'Uma investigação sobre de onde vêm os preços, o que é inflação, como o dinheiro surgiu e por que o Brasil criou o Real. A turma separa necessidades de desejos, analisa a publicidade e termina fazendo uma pesquisa de preços no bairro, calculando diferenças em porcentagem.',
    subjects: ['educacao-financeira', 'matematica', 'economia'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-economia',
    status: 'disponivel',
    context: [
      'Todo preço tem uma história. O valor de um quilo de tomate na feira reúne o custo de plantar, colher, embalar e transportar, o trabalho de muita gente e também a relação entre quanto existe do produto para vender (oferta) e quantas pessoas querem comprá-lo (procura). Quando uma seca reduz a colheita, há menos tomate disponível e o preço tende a subir; numa safra farta, tende a cair.',
      'Quando os preços de muitos produtos e serviços sobem ao mesmo tempo e de forma continuada, chamamos isso de inflação. Na prática, inflação significa que o mesmo dinheiro passa a comprar menos. No Brasil, o índice oficial de inflação é o IPCA (Índice Nacional de Preços ao Consumidor Amplo), calculado todos os meses pelo IBGE a partir dos preços de uma cesta ampla de produtos e serviços consumidos pelas famílias.',
      'O Brasil conhece bem os efeitos da inflação alta. Entre os anos 1980 e o início dos anos 1990, os preços subiam tão rápido que mudavam em poucos dias, e o país trocou de moeda várias vezes. O Plano Real, de 1994, criou primeiro uma unidade de referência, a URV (Unidade Real de Valor), e depois lançou a nova moeda, o Real, que começou a circular em 1º de julho de 1994. Desde então, a inflação ficou muito mais baixa do que naquele período.',
      'Economia não é só assunto de governo ou de bancos: ela está nas escolhas de cada dia. Decidir o que comprar, onde comprar, o que é necessidade e o que é desejo, como reagir a uma propaganda e como apoiar quem produz perto de nós são decisões econômicas — e também decisões sobre o tipo de comunidade em que queremos viver.',
    ],
    diversity: [
      'A mesma alta de preço pesa de forma diferente em cada família: quem gasta quase toda a renda com comida e transporte sente mais quando esses itens encarecem.',
      'Há muitas formas de fazer circular bens e serviços além da compra em grandes lojas: feiras livres, trocas entre vizinhos, cooperativas, bancos comunitários e moedas sociais.',
      'O que é necessidade para uma pessoa pode ser desejo para outra, dependendo da idade, da saúde, do trabalho e do lugar onde vive — um celular, por exemplo, pode ser ferramenta de estudo ou de trabalho.',
      'Campo e cidade, pequenos produtores e grandes empresas, comerciantes do bairro e compras pela internet fazem parte da mesma rede econômica, mas com forças e riscos diferentes.',
    ],
    contemporary: [
      'Cooperativas de catadores de materiais recicláveis organizam o trabalho coletivamente, dividem resultados e prestam um serviço ambiental para as cidades.',
      'O Banco Palmas, criado em 1998 por moradores do Conjunto Palmeiras, em Fortaleza (CE), tornou-se referência de banco comunitário, com uma moeda social própria que circula no comércio do bairro.',
      'Feiras da agricultura familiar e grupos de compra coletiva aproximam quem planta de quem consome, reduzindo intermediários.',
      'Jovens criadores de conteúdo e projetos escolares discutem consumo consciente, publicidade disfarçada nas redes sociais e golpes digitais envolvendo dinheiro.',
    ],
    chapters: [
      {
        id: 'de-onde-vem-o-preco',
        title: '1. De onde vem um preço?',
        paragraphs: [
          'Comece com uma cena fictícia: na feira do bairro, a dona Cida vendia o quilo do tomate por R$ 6,00 (valores fictícios). Depois de um período de seca na região produtora, o mesmo quilo passou a custar R$ 9,00. O que aconteceu? A seca diminuiu a colheita, havia menos tomate para muita gente querendo comprar, e o preço subiu. Esse aumento foi de R$ 3,00 sobre R$ 6,00, ou seja, 50%.',
          'Mas o preço não depende só do clima. Ele reúne custos de sementes, adubo, água, embalagem, aluguel da banca, salário de quem trabalha e transporte — que no Brasil é feito principalmente por caminhões, então o preço do combustível pesa. Quando qualquer um desses custos muda, o preço final tende a mudar também.',
          'Um detalhe matemático curioso: se o tomate voltar de R$ 9,00 para R$ 6,00, a queda também é de R$ 3,00, mas agora sobre R$ 9,00 — cerca de 33,3%, e não 50%. A porcentagem sempre depende de qual valor tomamos como base.',
        ],
        explore: [
          'Escolher um alimento que a turma conhece bem e desenhar no quadro a “viagem” dele, do lugar onde é produzido até a mesa, anotando cada custo pelo caminho.',
          'Perguntar: que acontecimentos podem fazer o preço desse alimento subir? E cair? (seca, chuva demais, safra boa, estrada interditada, aumento do combustível, época do ano).',
        ],
        classChoice: {
          prompt: 'O preço do tomate subiu na feira do bairro. O que a turma quer investigar primeiro?',
          options: [
            { label: 'O caminho do tomate', outcome: 'A turma segue a cadeia de produção e transporte, listando custos de cada etapa. Na atividade prática, cada grupo anota também de onde vem o produto que pesquisar.' },
            { label: 'O clima e a época do ano', outcome: 'A turma investiga como seca, chuva e safra mudam a oferta dos alimentos. Na conversa final, discute por que algumas frutas e verduras ficam mais baratas em certas épocas.' },
            { label: 'Quem sente mais a alta', outcome: 'A turma pensa em famílias fictícias com orçamentos diferentes e em como a mesma alta pesa para cada uma. Na conversa final, discute desigualdade e escolhas de substituição de produtos.' },
          ],
        },
      },
      {
        id: 'o-dinheiro-que-encolhe',
        title: '2. O dinheiro que encolhe',
        paragraphs: [
          'Imagine que uma cesta fictícia de compras custava R$ 100,00 e, alguns meses depois, passou a custar R$ 125,00 (valores fictícios). Os preços subiram 25%. Com os mesmos R$ 100,00, agora só dá para comprar o que antes custava R$ 80,00, porque 100 dividido por 1,25 dá 80. A nota não mudou, mas o que ela compra diminuiu: isso é a inflação.',
          'Antes de existir dinheiro, as pessoas trocavam produtos diretamente — e nem sempre quem tinha peixe queria farinha. Ao longo da história, vários objetos foram usados como meio de troca, até chegarmos às moedas, às notas e hoje ao dinheiro digital. O dinheiro só funciona porque todos confiam que ele será aceito e que manterá seu valor.',
          'Quando essa confiança é abalada pela inflação muito alta, a vida fica difícil: no Brasil do fim dos anos 1980 e início dos 1990, os preços eram remarcados com frequência e as famílias corriam ao mercado assim que recebiam o salário. O Plano Real, de 1994, usou a URV como etapa de transição e lançou a moeda Real em 1º de julho de 1994. Hoje, o IBGE mede a inflação pelo IPCA, e o Banco Central tem a tarefa de manter a inflação dentro de uma meta definida pelo Conselho Monetário Nacional.',
        ],
        explore: [
          'Pedir que a turma pergunte a pessoas mais velhas da família como eram as compras antes do Real e trazer um relato curto para a próxima aula.',
          'Resolver juntos: se os preços subirem 10%, quanto custará uma cesta fictícia de R$ 50,00? (R$ 55,00, porque 10% de 50 é 5.)',
        ],
      },
      {
        id: 'quero-ou-preciso',
        title: '3. Quero ou preciso?',
        paragraphs: [
          'Necessidades são aquilo de que precisamos para viver com dignidade: alimentação, moradia, saúde, transporte, educação. Desejos são coisas que gostaríamos de ter, mas sem as quais conseguimos viver. Não há nada de errado em ter desejos — o importante é perceber a diferença e fazer escolhas conscientes, especialmente quando o dinheiro é limitado.',
          'A publicidade trabalha justamente para transformar desejos em “necessidades”. Ela usa personagens queridos, músicas, influenciadores e a ideia de que “todo mundo tem”. O Código de Defesa do Consumidor (Lei nº 8.078/1990) considera abusiva a publicidade que se aproveita da falta de julgamento e de experiência da criança, e garante ao consumidor o direito a informações claras sobre produtos e preços.',
          'Na cena fictícia da turma do 7º ano, Léo viu um vídeo patrocinado do “Tênis Foguete” (marca inventada) em que um influenciador dizia que quem não tem o modelo “fica para trás”. Léo já tinha um tênis em bom estado. O que o vídeo estava vendendo: um calçado ou um sentimento?',
        ],
        explore: [
          'Separar a turma em grupos e entregar uma lista de itens para classificar em “necessidade”, “desejo” ou “depende” — e justificar os casos de “depende”.',
          'Analisar um anúncio (impresso ou projetado): quem é o público? Que emoção ele desperta? Que informação importante ficou de fora? Está claro que é propaganda?',
        ],
        classChoice: {
          prompt: 'Léo quer muito o “Tênis Foguete”, mas já tem um tênis em bom estado. O que a turma aconselharia?',
          options: [
            { label: 'Esperar e pensar', outcome: 'A turma propõe a “regra dos sete dias”: anotar o desejo e esperar uma semana antes de decidir. Na conversa final, discute por que muitos desejos diminuem com o tempo.' },
            { label: 'Planejar e poupar', outcome: 'A turma ajuda Léo a calcular quanto precisaria guardar por semana para comprar o tênis com o próprio dinheiro (valores fictícios). Na conversa final, discute o que ele deixaria de fazer nesse período.' },
            { label: 'Procurar alternativas', outcome: 'A turma pensa em trocas, brechós ou um modelo parecido sem a marca famosa. Na conversa final, discute quanto do preço de um produto é marca e propaganda.' },
          ],
        },
      },
      {
        id: 'economia-perto-de-nos',
        title: '4. A economia perto de nós',
        paragraphs: [
          'Quando compramos na feira, no mercadinho da esquina ou de um produtor da região, parte do dinheiro tende a continuar circulando no próprio bairro, pagando o trabalho de pessoas que moram perto. Feiras, trocas, cooperativas e bancos comunitários fazem parte do que se chama economia solidária: formas de produzir e trocar baseadas na cooperação, na divisão justa dos resultados e na decisão coletiva.',
          'Consumo consciente não é só gastar menos: é perguntar antes de comprar se eu preciso, quanto custa de verdade, quem produziu, em que condições, quanto tempo vai durar e o que acontece com aquilo depois. Comparar preços faz parte dessa atitude — e é isso que a turma vai fazer agora, investigando o próprio bairro.',
        ],
        explore: [
          'Mapear com a turma os lugares de compra do bairro: feira, mercado, mercadinho, padaria, sacolão, cooperativa, vendas pela internet.',
          'Combinar a cesta da pesquisa de preços e as regras de convivência para a saída (pedir licença, não atrapalhar o comércio, andar em grupo com adulto).',
        ],
      },
    ],
    challenges: {
      individual: [
        'Durante uma semana, anotar tudo o que a família comprou em um dia comum (sem valores, se preferir) e classificar cada item como necessidade ou desejo.',
        'Encontrar uma propaganda dirigida a crianças ou adolescentes (TV, rede social, embalagem) e escrever três frases: o que ela promete, que emoção usa e o que ela não conta.',
      ],
      coletivo: [
        'Realizar a pesquisa de preços do bairro e apresentar um quadro comparativo com as diferenças em reais e em porcentagem.',
        'Criar um guia ilustrado de consumo consciente com cinco perguntas para fazer antes de comprar, para distribuir na escola.',
        'Organizar uma feira de trocas na escola (livros, brinquedos, roupas), com regras definidas pela turma, sem uso de dinheiro.',
      ],
    },
    teacherScript: {
      antes: [
        'Definir com a coordenação o formato da pesquisa de preços: saída pelo entorno com autorização das famílias, pesquisa em casa com a família ou uso de encartes e folhetos de mercados.',
        'Escolher uma cesta pequena de 4 a 5 itens com tamanho e marca definidos (ex.: 1 kg de arroz, 1 kg de feijão, 1 dúzia de bananas, 1 sabonete), para que a comparação seja justa.',
        'Preparar um ou dois anúncios reais ou inventados para a análise de publicidade, evitando expor marcas de forma promocional.',
        'Revisar o cálculo de porcentagem: diferença dividida pelo valor tomado como base, multiplicada por 100.',
      ],
      durante: [
        'Abrir com a pergunta de abertura e anotar no quadro as hipóteses da turma sobre por que os preços mudam.',
        'No capítulo 2, conduzir os cálculos passo a passo e deixar claro que todos os valores são fictícios.',
        'Nas classificações de necessidade e desejo, acolher respostas diferentes e evitar qualquer julgamento sobre o consumo das famílias dos estudantes.',
        'Durante a pesquisa, circular entre os grupos perguntando “qual valor vocês usaram como base?” e “por que esse lugar é mais barato ou mais caro?”.',
      ],
      depois: [
        'Montar um quadro coletivo com os resultados de todos os grupos e comparar as diferenças encontradas.',
        'Se quiser aprofundar orçamento e porcentagem de forma interativa, propor a simulação “A feira das decisões” como complemento.',
        'Registrar no portfólio da turma as explicações levantadas para as diferenças de preço.',
        'Retomar a pergunta de abertura e comparar as respostas do início com as do fim.',
      ],
    },
    practicalActivity: {
      title: 'Pesquisa de preços do bairro',
      materials: [
        'Fichas de pesquisa de preços impressas (uma por grupo)',
        'Lápis, borracha e calculadora (ou celular com calculadora)',
        'Encartes ou folhetos de mercados, se a pesquisa não for presencial',
        'Cartolina ou papel pardo para o quadro comparativo da turma',
      ],
      steps: [
        'Dividir a turma em grupos e apresentar a cesta combinada, com quantidade e tamanho de cada item bem definidos.',
        'Cada grupo pesquisa o preço da cesta em 2 ou 3 lugares diferentes — ou no mesmo lugar em duas semanas seguidas — anotando data, local e preço de cada item.',
        'Somar o total da cesta em cada lugar e calcular a diferença em reais entre o mais caro e o mais barato.',
        'Calcular a diferença em porcentagem usando o mais barato como base. Exemplo com valores fictícios: cesta a R$ 40,00 no lugar A e R$ 46,00 no lugar B; diferença de R$ 6,00; 6 ÷ 40 = 0,15, ou seja, 15% mais cara no lugar B.',
        'Discutir no grupo possíveis explicações para a diferença: tamanho da loja, distância de quem produz, transporte, aluguel, promoções, época do ano.',
        'Registrar os resultados no quadro comparativo coletivo e cada grupo apresentar em até 2 minutos o que descobriu.',
      ],
    },
    finalConversation: [
      'Depois da imersão, como você explicaria a alguém da sua família por que os preços mudam?',
      'O que a pesquisa de preços mostrou sobre o nosso bairro? Alguma diferença surpreendeu vocês?',
      'Que propaganda você já viu que tentou transformar um desejo em “necessidade”? Como perceber isso a tempo?',
      'Que escolhas de consumo podem ajudar, ao mesmo tempo, o orçamento da família e as pessoas que trabalham perto de nós?',
    ],
    printable: {
      title: 'Ficha de pesquisa de preços do bairro',
      items: [
        'Nomes do grupo:',
        'Itens da cesta (com quantidade e tamanho):',
        'Lugar 1 (nome e tipo de comércio), data e total da cesta: R$',
        'Lugar 2 (nome e tipo de comércio), data e total da cesta: R$',
        'Lugar 3 ou segunda semana (opcional), data e total da cesta: R$',
        'Diferença entre o total mais caro e o mais barato: R$',
        'Diferença em porcentagem (diferença ÷ total mais barato × 100): %',
        'Possíveis explicações para a diferença:',
      ],
    },
    references: [
      { label: 'IBGE — Instituto Brasileiro de Geografia e Estatística', note: 'informações sobre o IPCA, índice oficial de inflação do país', url: 'https://www.ibge.gov.br' },
      { label: 'Banco Central do Brasil', note: 'materiais de cidadania financeira, história do dinheiro no Brasil e explicações sobre inflação e metas', url: 'https://www.bcb.gov.br' },
      { label: 'Código de Defesa do Consumidor — Lei nº 8.078/1990 (direito à informação clara e publicidade abusiva)', url: 'https://www.planalto.gov.br' },
      { label: 'Base Nacional Comum Curricular — Matemática e temas contemporâneos transversais (Educação Financeira)', url: 'https://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Todos os valores em reais desta imersão são fictícios e servem apenas para os cálculos. Não apresente números de inflação ou preços atuais sem conferir a fonte oficial do momento.',
      'Cuidado com a realidade econômica das famílias: não peça que os estudantes revelem renda, salários ou dívidas, e evite qualquer comparação entre o consumo de colegas.',
      'Ao analisar publicidade, evite fazer propaganda involuntária de marcas reais; prefira anúncios inventados ou trechos sem destaque à marca.',
      'Em Matemática, aproveite para reforçar que a porcentagem depende da base escolhida (subir 50% e depois cair 50% não leva ao mesmo valor). A simulação “A feira das decisões” pode complementar o trabalho com orçamento e porcentagem.',
    ],
  },
  {
    id: 'datas-do-calendario',
    title: 'Datas que contam histórias',
    theme: 'Datas do calendário escolar',
    kicker: 'Imersão de memória',
    openingQuestion: 'Por que lembramos certas datas e esquecemos outras?',
    summary:
      'Uma investigação sobre as datas comemorativas como escolhas de memória: quem as escolheu, o que celebram, o que deixam de fora e como seus sentidos mudam com o tempo. A turma termina propondo uma data da própria comunidade para o calendário da escola ou montando um calendário crítico.',
    subjects: ['historia', 'politica-cidadania', 'artes'],
    anos: [6, 7, 8, 9],
    durationMin: 100,
    artId: 'imm-calendario',
    status: 'disponivel',
    context: [
      'Todo calendário é feito de escolhas. Entre os 365 dias do ano, algumas datas viram feriado, desfile, cartaz na escola ou homenagem; outras passam em silêncio. Lembrar uma data é dizer “isto importa para nós” — e, ao mesmo tempo, escolher de que jeito aquele acontecimento vai ser contado.',
      'Essas escolhas não são neutras nem eternas. Muitas datas foram definidas por governos, por leis ou por organizações internacionais, como a ONU. Outras nasceram da luta de movimentos sociais que queriam ver sua história reconhecida. E várias mudaram de nome ou de sentido ao longo do tempo, porque a sociedade passou a fazer novas perguntas sobre o passado.',
      'Um exemplo próximo da escola: a Lei nº 10.639, de 2003, tornou obrigatório o ensino de história e cultura afro-brasileira e determinou que o calendário escolar inclua o 20 de novembro como Dia Nacional da Consciência Negra. Em 2008, a Lei nº 11.645 ampliou essa obrigação para a história e a cultura dos povos indígenas. Ou seja: o que a escola lembra também é decidido — e debatido — pela sociedade.',
      'Olhar criticamente para uma data não significa desprezá-la nem transformá-la em vilã. Significa perguntar com respeito: quem escolheu lembrar isso? O que está sendo celebrado? Quem aparece e quem fica de fora dessa história? E o que essa data pode significar para nós hoje?',
    ],
    diversity: [
      'O mesmo acontecimento pode ter datas diferentes para grupos diferentes: para muitos baianos, a independência se celebra em 2 de julho, e não apenas em 7 de setembro.',
      'Uma data pode ser vivida como festa por uns e como luto, protesto ou reflexão por outros — e essas leituras podem conviver na mesma turma.',
      'Há datas nacionais, internacionais (como as reconhecidas pela ONU), estaduais, municipais e comunitárias: a festa do bairro ou o aniversário de fundação de uma associação também são datas de memória.',
      'Famílias de diferentes tradições e religiões marcam o tempo de maneiras diferentes; o calendário escolar não precisa — nem consegue — dar conta de tudo, mas pode reconhecer que essa diversidade existe.',
    ],
    contemporary: [
      'Em 2023, a Lei nº 14.759 tornou o 20 de novembro, Dia Nacional de Zumbi e da Consciência Negra, feriado nacional — resultado de décadas de mobilização do movimento negro para que a data fosse reconhecida.',
      'Em 2022, a Lei nº 14.402 trocou o nome “Dia do Índio” por “Dia dos Povos Indígenas”, em 19 de abril, para reconhecer que existem muitos povos, com línguas, culturas e histórias diferentes, e não um “índio” genérico.',
      'Professores, artistas e coletivos jovens usam murais, podcasts, poesia e redes sociais para contar versões menos conhecidas de datas como o 7 de setembro e o 13 de maio, dando voz a quem pouco aparecia nos livros.',
      'Em muitas cidades, comunidades organizam datas próprias — aniversário de um quilombo, de uma ocupação, de uma escola, de uma festa tradicional — e pedem que elas entrem no calendário oficial do município.',
    ],
    chapters: [
      {
        id: 'quem-escolhe',
        title: '1. Quem escolhe o que lembramos?',
        paragraphs: [
          'Comece mostrando o calendário da escola e pergunte: quais destas datas vocês já comemoraram aqui? Como foi? Alguém lembra de cartazes, apresentações, fantasias, desfiles? E qual data importante para a família ou para o bairro de vocês não aparece aqui?',
          'Uma data comemorativa funciona como um holofote: ela ilumina um acontecimento, algumas pessoas e um jeito de contar a história. Tudo o que fica fora do holofote não deixa de ter acontecido — só fica mais difícil de ver. Por isso, cada data pode ser investigada com três perguntas: quem escolheu? O que celebra? O que deixa de fora?',
          'As respostas mudam com o tempo. Uma data criada há décadas pode ganhar novo nome, novo sentido ou até perder espaço para outra data que um grupo considera mais justa. Investigar isso é investigar como uma sociedade conversa com o próprio passado.',
        ],
        explore: [
          'Listar no quadro as datas que a turma lembra de ter comemorado na escola e, ao lado, como foram comemoradas.',
          'Pedir que cada estudante escreva em um papel uma data importante para sua família ou comunidade que não está no calendário oficial (sem obrigação de compartilhar).',
        ],
        classChoice: {
          prompt: 'Por qual caminho a turma quer começar a investigação?',
          options: [
            { label: 'Pelas datas da liberdade', outcome: 'A turma começa comparando 13 de maio e 20 de novembro e, depois, olha para o 7 de setembro e o 2 de julho. Na conversa final, o foco é: quem conquistou a liberdade e quem aparece como responsável por ela?' },
            { label: 'Pelas datas que mudaram de nome', outcome: 'A turma começa pelo 19 de abril e pelo 8 de março, investigando por que nomes e sentidos mudam. Na conversa final, o foco é: um nome muda a forma como enxergamos as pessoas?' },
            { label: 'Pelas datas que faltam', outcome: 'A turma começa pelas datas da própria comunidade que não estão no calendário e, depois, usa as datas nacionais como comparação. Na conversa final, o foco é: o que precisa acontecer para uma memória ganhar uma data?' },
          ],
        },
      },
      {
        id: 'treze-de-maio-vinte-de-novembro',
        title: '2. Duas datas, duas memórias',
        paragraphs: [
          'Em 13 de maio de 1888, a Lei Áurea (Lei nº 3.353), assinada pela princesa Isabel, extinguiu legalmente a escravidão no Brasil, o último país das Américas a fazê-lo. Por muito tempo, a data foi comemorada nas escolas como um presente da monarquia, com a princesa no centro da história.',
          'Essa versão deixa muita coisa de fora: as fugas, os quilombos, as revoltas, as associações abolicionistas, a atuação de pessoas negras como Luiz Gama e André Rebouças e a pressão popular que tornou a escravidão insustentável. Deixa de fora também o “dia seguinte”: a lei não garantiu terra, trabalho, escola ou indenização às pessoas libertas, e as consequências dessa ausência de políticas são sentidas até hoje.',
          'Por isso, nos anos 1970, militantes negros passaram a propor outra data. O 20 de novembro marca a morte de Zumbi, liderança do Quilombo dos Palmares, em 1695. Em vez de celebrar uma lei assinada pela monarquia, a data celebra a resistência e o protagonismo negro. A Lei nº 12.519, de 2011, instituiu o Dia Nacional de Zumbi e da Consciência Negra, e a Lei nº 14.759, de 2023, o tornou feriado nacional.',
          'Isso não quer dizer que o 13 de maio deva ser apagado: a abolição legal foi um marco importante. A pergunta é de que jeito lembrá-lo. Hoje, muitas pessoas e organizações tratam o 13 de maio como um dia de reflexão sobre uma abolição incompleta, e o 20 de novembro como um dia de afirmação.',
        ],
        explore: [
          'Montar no quadro uma tabela com duas colunas (13 de maio e 20 de novembro) e preencher juntos: quem aparece como protagonista, o que se celebra, o que fica de fora.',
          'Perguntar: por que um movimento social preferiria uma data ligada a um líder quilombola a uma data ligada a uma lei? As duas podem conviver no calendário?',
        ],
      },
      {
        id: 'nomes-e-versoes',
        title: '3. Nomes e versões que mudam',
        paragraphs: [
          'O 7 de setembro de 1822 é lembrado pelo gesto de dom Pedro às margens do riacho Ipiranga, em São Paulo. A imagem mais famosa da cena, o quadro “Independência ou Morte!”, de Pedro Américo, só foi pintada em 1888, mais de 60 anos depois — e ajudou a fixar a ideia de que a independência foi um único momento. Mas ela foi um processo, com guerras em várias províncias. Na Bahia, as tropas portuguesas só deixaram Salvador em 2 de julho de 1823, depois de meses de luta com a participação de soldados, gente do povo, pessoas negras e indígenas e mulheres como Maria Quitéria. Até hoje, o 2 de julho é feriado e festa popular na Bahia.',
          'Nomes também mudam. O 19 de abril foi criado nos anos 1940 como “Dia do Índio” e, em muitas escolas, virou dia de pintar o rosto e fazer cocar de papel. Em 2022, a Lei nº 14.402 mudou o nome para Dia dos Povos Indígenas. A troca reconhece que não existe um “índio” único, mas mais de 300 povos, com línguas e modos de vida diferentes, vivendo em aldeias, em cidades e em universidades — no presente, e não só no passado.',
          'Até a origem de uma data pode ser contada de forma simplificada. O 8 de março, Dia Internacional da Mulher, é muitas vezes explicado por um único acontecimento, mas ele nasceu de várias mobilizações de mulheres trabalhadoras no começo do século XX, em diferentes países, e passou a ser celebrado pela ONU em 1975. Lembrar só das flores e dos parabéns deixa de fora justamente a luta por direitos que deu origem à data.',
        ],
        explore: [
          'Comparar uma descrição do 7 de setembro com uma do 2 de julho: quem são os personagens de cada versão?',
          'Perguntar: que diferença faz dizer “Dia do Índio” ou “Dia dos Povos Indígenas”? E “parabéns pelo seu dia” ou “dia de luta por direitos”?',
        ],
        classChoice: {
          prompt: 'Na fictícia Escola Municipal Horizonte, a turma do 7º ano vai organizar a atividade do 19 de abril. Um colega sugere repetir o que se fazia antes: todo mundo com cocar de papel e rosto pintado. O que a turma faria?',
          options: [
            { label: 'Convidar vozes indígenas', outcome: 'A turma pesquisa e apresenta autores, artistas, cientistas e lideranças indígenas contemporâneos — e, se possível, convida alguém para conversar. Na conversa final, discute a diferença entre falar sobre um povo e ouvir esse povo.' },
            { label: 'Investigar a presença indígena na região', outcome: 'A turma pesquisa quais povos vivem ou viveram no estado e que nomes de lugares, rios e alimentos da região têm origem indígena. Na conversa final, discute por que essa presença costuma ser pouco notada.' },
            { label: 'Debater a proposta do colega', outcome: 'A turma escuta o colega com respeito e discute por que a fantasia pode reforçar estereótipos, mesmo sem intenção, e o que poderia substituí-la. Na conversa final, discute como mudar um costume sem humilhar quem ainda não tinha pensado nisso.' },
          ],
        },
      },
      {
        id: 'data-da-comunidade',
        title: '4. Uma data para a nossa comunidade',
        paragraphs: [
          'Agora é a vez da turma escolher. Assim como movimentos sociais propuseram o 20 de novembro e comunidades indígenas defenderam a mudança de nome do 19 de abril, a turma vai propor uma memória que merece ser lembrada: a fundação do bairro, a inauguração da escola, uma festa tradicional, uma conquista coletiva dos moradores, uma pessoa que fez diferença na comunidade.',
          'Uma boa proposta responde às mesmas perguntas que usamos para investigar as outras datas: quem está escolhendo? O que vamos celebrar? Quem pode ficar de fora — e como incluir essas pessoas? Também é preciso pensar em como celebrar: com festa, com silêncio, com entrevistas, com uma exposição?',
        ],
        explore: [
          'Usar a ficha da “data da nossa comunidade” (material imprimível) para organizar a proposta de cada grupo.',
          'Combinar com a turma como verificar a data e os fatos: entrevistas, documentos, jornais antigos, placas, arquivos da escola.',
        ],
      },
    ],
    challenges: {
      individual: [
        'Perguntar a uma pessoa mais velha da família como determinada data (por exemplo, 13 de maio, 19 de abril ou 7 de setembro) era comemorada na escola quando ela era estudante, e comparar com hoje.',
        'Escolher uma data do calendário escolar e escrever um pequeno “verbete crítico” sobre ela: quem escolheu, o que celebra e o que deixa de fora.',
      ],
      coletivo: [
        'Montar um calendário crítico da turma, com as principais datas do ano escolar e, para cada uma, as perguntas “quem escolheu?”, “o que celebra?” e “o que deixa de fora?”.',
        'Elaborar e apresentar à direção uma proposta de “data da nossa comunidade” para o calendário da escola, com justificativa e plano de celebração.',
        'Criar um cartaz ou mural artístico que mostre duas versões de uma mesma data, lado a lado, com as fontes de cada versão.',
      ],
    },
    teacherScript: {
      antes: [
        'Levar o calendário da escola do ano corrente (ou do ano anterior) e, se possível, fotos de comemorações passadas.',
        'Pesquisar se o município ou o estado tem datas próprias e feriados locais, e se existe alguma data ligada à história do bairro da escola.',
        'Conferir no site do Planalto os textos das leis citadas (Lei Áurea, Leis 10.639/2003, 12.519/2011, 14.402/2022 e 14.759/2023) para ler trechos curtos com a turma.',
        'Imprimir as fichas da “data da nossa comunidade” (uma por grupo) e preparar papel pardo para o calendário crítico.',
      ],
      durante: [
        'Abrir com a pergunta de abertura e anotar as respostas sem julgar; elas serão retomadas no fim.',
        'Ao comparar 13 de maio e 20 de novembro, evitar transformar uma data em “boa” e outra em “ruim”: o foco é entender o que cada uma ilumina e o que deixa de fora.',
        'Na escolha do capítulo 3, garantir que o colega que fez a sugestão seja ouvido com respeito; o objetivo é rever um costume, não expor uma pessoa.',
        'Ajudar a turma a diferenciar fatos verificáveis (datas, leis, documentos) de interpretações (o que uma data significa para cada grupo).',
      ],
      depois: [
        'Expor o calendário crítico ou as propostas de data em um mural da escola.',
        'Encaminhar a proposta escolhida à direção ou ao conselho escolar e combinar com a turma como acompanhar a resposta.',
        'Registrar no portfólio da turma as escolhas feitas e os argumentos usados.',
        'Retomar a pergunta de abertura e comparar as respostas do início com as do fim.',
      ],
    },
    practicalActivity: {
      title: 'A data da nossa comunidade',
      materials: [
        'Fichas da “data da nossa comunidade” impressas (uma por grupo)',
        'Calendário da escola impresso ou projetado',
        'Papel pardo ou cartolina para o calendário crítico',
        'Canetas coloridas, revistas para recorte e fita adesiva',
      ],
      steps: [
        'Dividir a turma em grupos. Cada grupo escolhe uma memória da comunidade que gostaria de ver no calendário: um acontecimento, uma conquista, uma festa ou uma pessoa.',
        'Pesquisar a data e os fatos com pelo menos uma fonte (entrevista, documento, jornal, placa, arquivo da escola) e registrar de onde veio cada informação.',
        'Preencher a ficha respondendo: quem está propondo, o que se celebra, por que é importante, quem pode ficar de fora e como incluir essas pessoas.',
        'Criar um plano de celebração simples e possível na escola (exposição, roda de conversa, entrevista, apresentação artística, momento de silêncio) e um cartaz para a data.',
        'Posicionar as propostas no calendário crítico da turma, ao lado das datas oficiais já existentes.',
        'Cada grupo apresenta sua proposta em até 2 minutos; a turma faz perguntas e, se quiser, escolhe uma proposta para enviar à direção.',
      ],
    },
    finalConversation: [
      'Depois desta imersão, por que você acha que lembramos certas datas e esquecemos outras?',
      'Qual data do calendário você passou a enxergar de um jeito diferente? O que mudou?',
      'É possível celebrar uma data e, ao mesmo tempo, criticar o modo como ela é contada? Como?',
      'Quem deveria participar da decisão sobre quais datas a nossa escola comemora?',
    ],
    printable: {
      title: 'Ficha: a data da nossa comunidade',
      items: [
        'Data proposta (dia e mês) e nome da comemoração:',
        'O que aconteceu nessa data ou o que ela celebra:',
        'Quem está propondo esta data e por quê:',
        'Fontes que usamos (entrevista, documento, jornal, placa, site):',
        'Quem pode ficar de fora dessa memória — e como incluir essas pessoas:',
        'Como vamos celebrar (atividade, lugar, quem participa):',
        'Frase ou imagem para o cartaz da data:',
        'Uma pergunta que esta data deixa para o futuro:',
      ],
    },
    references: [
      { label: 'Lei nº 3.353/1888 (Lei Áurea); Lei nº 10.639/2003 e Lei nº 11.645/2008 (ensino de história e cultura afro-brasileira e indígena)', url: 'https://www.planalto.gov.br' },
      { label: 'Lei nº 12.519/2011 (institui o Dia Nacional de Zumbi e da Consciência Negra), Lei nº 14.759/2023 (feriado nacional de 20 de novembro) e Lei nº 14.402/2022 (Dia dos Povos Indígenas)', url: 'https://www.planalto.gov.br' },
      { label: 'Fundação Cultural Palmares — memória, cultura afro-brasileira e comunidades quilombolas', url: 'https://www.gov.br/palmares' },
      { label: 'Funai — Fundação Nacional dos Povos Indígenas', note: 'informações sobre os povos indígenas no Brasil', url: 'https://www.gov.br/funai' },
      { label: 'Base Nacional Comum Curricular (BNCC) — História, Ensino Fundamental Anos Finais', url: 'https://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Evite apresentar qualquer data como totalmente boa ou totalmente ruim. O objetivo é desenvolver o olhar crítico e respeitoso: entender por que a data existe, o que ela ilumina e o que deixa na sombra.',
      'Mantenha a discussão apartidária: concentre-se em fatos verificáveis, nas leis e nas diferentes perspectivas, sem atribuir as mudanças de datas a governos ou partidos como mérito ou culpa.',
      'Respeite a diversidade religiosa: datas religiosas podem aparecer nas falas dos estudantes e devem ser acolhidas com o mesmo respeito, mas não são o foco desta imersão.',
      'Ao tratar da escravidão e da violência contra povos indígenas, evite exposição de violência gratuita e dê centralidade à resistência, ao protagonismo e à presença contemporânea desses grupos. Evite fantasias e caracterizações de povos indígenas.',
    ],
  },
];
