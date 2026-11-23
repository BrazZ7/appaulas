import type { Immersion } from '../types/models';

/**
 * Imersões complementares em áreas menos atendidas (Ciências, Matemática, Biomas e Inglês).
 * Mesmas regras de conteúdo de immersions.ts: nada de estatísticas inventadas; números
 * aproximados vêm de fontes oficiais e devem ser conferidos antes de impressão.
 * Personagens e situações fictícias são sempre identificados como fictícios.
 */
export const IMMERSIONS_EXTRA: Immersion[] = [
  // ───────────────────────── 1. Uma viagem pelo corpo humano ─────────────────────────
  {
    id: 'x-viagem-corpo-humano',
    title: 'Uma viagem pelo corpo humano',
    theme: 'Ciência e saúde',
    kicker: 'Imersão científica',
    openingQuestion: 'O que acontece dentro de você, sem você perceber, enquanto come um pão e corre até o portão da escola?',
    summary:
      'Uma expedição imaginária pelos sistemas digestório, respiratório e circulatório para entender como eles trabalham juntos, por que cuidar da saúde é também uma questão coletiva e como o SUS participa da nossa vida.',
    subjects: ['ciencias', 'educacao-fisica', 'politica-cidadania'],
    anos: [6, 7, 8],
    durationMin: 100,
    artId: 'subj-ciencias',
    status: 'disponivel',
    context: [
      'O corpo humano é formado por células, que se organizam em tecidos, órgãos e sistemas. Cada sistema tem funções próprias, mas nenhum funciona sozinho: a energia que usamos depende ao mesmo tempo da digestão, da respiração e da circulação.',
      'O sistema digestório transforma os alimentos em nutrientes pequenos o suficiente para serem absorvidos, principalmente no intestino delgado. O sistema respiratório leva o gás oxigênio até os alvéolos pulmonares e elimina o gás carbônico. O sistema circulatório, com o coração e os vasos sanguíneos, distribui nutrientes e oxigênio para todas as células.',
      'Saúde não depende só de escolhas individuais: alimentação disponível, saneamento, moradia, trabalho, lazer e acesso a serviços de saúde também contam. A Constituição de 1988 afirma que a saúde é direito de todos e dever do Estado, e criou as bases do Sistema Único de Saúde (SUS).',
      'O SUS está presente em muito mais lugares do que o hospital: vacinação, unidades básicas de saúde, agentes comunitários, vigilância sanitária dos alimentos, controle da qualidade da água e campanhas de prevenção.',
    ],
    diversity: [
      'Corpos são diferentes: altura, peso, ritmo, cor da pele, deficiências e condições de saúde variam, e nenhum corpo é "o certo". Falar do corpo humano é falar de todos os corpos.',
      'A alimentação muda de região para região e de família para família: farinha de mandioca, açaí, cuscuz, arroz com feijão, pinhão, peixe de rio. O Guia Alimentar para a População Brasileira valoriza essa diversidade de comida de verdade.',
      'Povos indígenas, comunidades quilombolas e tradicionais têm saberes próprios sobre plantas, cuidado e alimentação, que dialogam com a ciência e merecem respeito.',
    ],
    contemporary: [
      'Pesquisadores brasileiros, como os da Fiocruz e do Instituto Butantan, desenvolvem e produzem vacinas e estudam doenças que afetam a população do país.',
      'Agentes comunitários de saúde visitam famílias em todo o Brasil, acompanhando gestantes, crianças, idosos e pessoas com doenças crônicas.',
      'O Guia Alimentar para a População Brasileira, do Ministério da Saúde, é reconhecido internacionalmente por orientar a alimentação a partir de alimentos in natura e minimamente processados, e não por contagem de calorias.',
      'Atletas paralímpicos brasileiros mostram que desempenho e saúde se constroem de muitas formas, com corpos diversos.',
    ],
    chapters: [
      {
        id: 'x-corpo-cap-boca-estomago',
        title: '1. A primeira parada: da boca ao estômago',
        paragraphs: [
          'Imagine que a turma embarcou em uma nave microscópica (uma viagem fictícia, claro) junto com um pedaço de pão. A primeira parada é a boca: os dentes cortam e trituram o alimento, e a saliva começa a digerir o amido, por isso o pão fica levemente adocicado quando mastigamos bastante.',
          'Depois de engolido, o alimento desce pelo esôfago, empurrado por movimentos musculares chamados peristaltismo. Por isso conseguimos engolir até de cabeça para baixo. No estômago, o suco gástrico, que é bastante ácido, continua a digestão, principalmente das proteínas.',
        ],
        explore: [
          'Mastigue um pedaço de pão ou biscoito sem sal por um minuto. O sabor muda? Por quê?',
          'Por que é importante mastigar bem os alimentos?',
          'Que caminho o alimento percorre da boca até o estômago? Desenhe.',
        ],
        classChoice: {
          prompt: 'Com qual alimento a nave vai viajar pelo corpo?',
          options: [
            {
              label: 'Prato de arroz, feijão e salada',
              outcome: 'A turma acompanha carboidratos, proteínas vegetais e fibras. No capítulo 2, vai perceber como as fibras ajudam o intestino a funcionar.',
            },
            {
              label: 'Tapioca com ovo',
              outcome: 'A turma acompanha o amido da mandioca e a proteína do ovo, conversando sobre um alimento de origem indígena muito presente no Brasil.',
            },
            {
              label: 'Um biscoito recheado',
              outcome: 'A turma compara um ultraprocessado com comida de verdade, lendo o rótulo e discutindo, sem julgar ninguém, por que o Guia Alimentar recomenda evitar esse tipo de produto no dia a dia.',
            },
          ],
        },
      },
      {
        id: 'x-corpo-cap-intestino',
        title: '2. O longo caminho do intestino',
        paragraphs: [
          'No intestino delgado, um tubo longo e enovelado, a digestão se completa com a ajuda do suco pancreático, da bile produzida pelo fígado e do suco intestinal. A parede interna tem milhões de pequenas dobras, as vilosidades, que aumentam muito a área por onde os nutrientes passam para o sangue.',
          'O que não foi absorvido segue para o intestino grosso, onde boa parte da água é reabsorvida. Ali vivem trilhões de microrganismos que ajudam o corpo: a microbiota intestinal. O que sobra forma as fezes, eliminadas pelo ânus.',
          'Fibras de frutas, verduras, legumes e grãos, além de água, ajudam o intestino a funcionar bem.',
        ],
        explore: [
          'Por que as vilosidades são importantes para absorver os nutrientes?',
          'Nem todo microrganismo causa doença. Que exemplos de microrganismos úteis você conhece?',
          'O que o saneamento básico tem a ver com doenças do sistema digestório?',
        ],
      },
      {
        id: 'x-corpo-cap-respirar',
        title: '3. Respirar: a troca de gases',
        paragraphs: [
          'A nave agora sai pelo sangue e chega aos pulmões. O ar entra pelo nariz, onde é filtrado, aquecido e umedecido, passa pela faringe, laringe, traqueia, brônquios e bronquíolos até chegar aos alvéolos, pequenos sacos de parede finíssima rodeados de vasos sanguíneos.',
          'Nos alvéolos acontece a troca gasosa: o gás oxigênio passa do ar para o sangue, e o gás carbônico passa do sangue para o ar que será expirado. O diafragma, um músculo abaixo dos pulmões, ajuda a puxar e a empurrar o ar.',
          'Fumaça de cigarro, de queimadas e a poluição do ar prejudicam os pulmões. Por isso respirar bem também depende de políticas públicas e do cuidado com o ambiente.',
        ],
        explore: [
          'Coloque a mão na barriga e respire fundo. O que se move? Por quê?',
          'Por que é melhor respirar pelo nariz do que pela boca?',
          'Como as queimadas afetam a saúde de quem mora longe delas?',
        ],
        classChoice: {
          prompt: 'Como a turma quer investigar a respiração?',
          options: [
            {
              label: 'Contar a respiração em repouso e após exercício',
              outcome: 'Em duplas, os estudantes contam quantas vezes respiram por minuto parados e depois de um minuto de polichinelo (ou outro movimento possível para cada um), registram em tabela e comparam.',
            },
            {
              label: 'Montar um modelo de pulmão com garrafa e balões',
              outcome: 'Os grupos constroem um modelo simples em que um balão preso no fundo da garrafa faz o papel do diafragma, observando os balões internos encherem e esvaziarem.',
            },
          ],
        },
      },
      {
        id: 'x-corpo-cap-coracao',
        title: '4. O coração e a grande rede de vasos',
        paragraphs: [
          'O coração é um músculo do tamanho aproximado de uma mão fechada, com quatro cavidades: dois átrios e dois ventrículos. Ele bombeia o sangue sem parar por uma rede de artérias, veias e capilares que alcança todas as células do corpo.',
          'Aqui a viagem se completa: o sangue leva o oxigênio vindo dos pulmões e os nutrientes vindos do intestino até as células, que os usam para obter energia, e recolhe o gás carbônico e outros resíduos. Digestão, respiração e circulação trabalham como uma equipe.',
          'Atividade física, sono, alimentação variada e acompanhamento na unidade de saúde ajudam a cuidar do coração. Ter acesso a esses cuidados é um direito.',
        ],
        explore: [
          'Encontre seu pulso no punho ou no pescoço. Quantas batidas por minuto você sente em repouso? E depois de se movimentar?',
          'Por que o coração bate mais rápido quando corremos?',
          'Onde fica a unidade básica de saúde mais próxima da escola? Que serviços ela oferece?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Desenhe o caminho do seu alimento favorito pelo corpo, indicando os órgãos por onde ele passa.',
        'Registre sua frequência respiratória e seu pulso em repouso e depois de se movimentar e explique a diferença.',
        'Escreva uma carta de agradecimento a um órgão do seu corpo, explicando o que ele faz por você.',
      ],
      coletivo: [
        'Montar um painel em tamanho real do corpo humano, com os três sistemas em cores diferentes e as ligações entre eles.',
        'Criar uma campanha para a escola sobre um tema de saúde escolhido pela turma (vacinação, comida de verdade, qualidade do ar).',
        'Preparar perguntas para uma conversa com um profissional da unidade básica de saúde.',
      ],
    },
    teacherScript: {
      antes: [
        'Prepare um esquema dos sistemas digestório, respiratório e circulatório em cartaz ou projeção.',
        'Separe materiais para o modelo de pulmão e para medir pulso (relógio ou cronômetro).',
        'Verifique se há estudantes com restrições de saúde, alergias alimentares ou deficiências físicas e adapte as atividades de movimento para que todos participem sem exposição.',
        'Combine com a turma que o tema "corpo" será tratado com respeito: nada de comentários sobre o corpo dos colegas.',
      ],
      durante: [
        'Use a narrativa da viagem para conectar os capítulos: sempre pergunte "para onde a nave vai agora?".',
        'Alterne explicação curta, experiência no próprio corpo e registro no caderno.',
        'Ao falar de alimentação, evite rotular comidas como "boas" ou "ruins" de forma moralista e não exponha hábitos de famílias específicas.',
        'Retome várias vezes a ideia de que os sistemas trabalham juntos.',
      ],
      depois: [
        'Retome a pergunta de abertura e peça que cada estudante a responda com o que aprendeu.',
        'Finalize o painel do corpo humano e exponha na escola.',
        'Conecte com Educação Física (efeitos do exercício) e com Matemática (tabelas e gráficos dos dados de pulso).',
      ],
    },
    practicalActivity: {
      title: 'Modelo de pulmão e diafragma',
      materials: [
        'Garrafa PET de 2 L cortada ao meio (parte de cima)',
        'Dois canudos e um conector em Y (ou dois canudos presos com fita)',
        'Três balões de festa',
        'Massa de modelar ou fita adesiva',
        'Tesoura sem ponta (o corte da garrafa deve ser feito por um adulto)',
      ],
      steps: [
        'Prenda dois balões nas pontas do conector em Y: eles representam os pulmões; os canudos, a traqueia e os brônquios.',
        'Coloque o conjunto dentro da garrafa, passando o canudo principal pela tampa, e vede com massa de modelar.',
        'Corte o terceiro balão, dê um nó na ponta e estique-o na abertura de baixo da garrafa: ele é o diafragma.',
        'Puxe o nó do balão de baixo e observe os "pulmões" encherem; solte e observe-os esvaziarem.',
        'Registre e explique: o que acontece com o espaço dentro da garrafa quando o diafragma desce?',
        'Discuta os limites do modelo: o que ele não mostra sobre o pulmão de verdade?',
      ],
    },
    finalConversation: [
      'O que acontece dentro de você, sem você perceber, enquanto come e se movimenta?',
      'Por que dizemos que os sistemas do corpo funcionam como uma equipe?',
      'Que cuidados com a saúde dependem de cada pessoa e quais dependem da comunidade e do poder público?',
      'Qual foi a parte da viagem que mais surpreendeu você?',
    ],
    printable: {
      title: 'Roteiro: Uma viagem pelo corpo humano',
      items: [
        'Pergunta de abertura: o que acontece dentro do corpo enquanto comemos e nos movimentamos?',
        'Capítulo 1: boca, esôfago e estômago (início da digestão).',
        'Capítulo 2: intestinos, absorção de nutrientes e microbiota.',
        'Capítulo 3: sistema respiratório e trocas gasosas nos alvéolos.',
        'Capítulo 4: coração, vasos sanguíneos e o trabalho em equipe dos sistemas.',
        'Atividade: modelo de pulmão e diafragma com garrafa PET.',
        'Desafio: medir o pulso em repouso e após movimento.',
      ],
    },
    references: [
      { label: 'Ministério da Saúde – Guia Alimentar para a População Brasileira', note: 'Orientações sobre comida de verdade e alimentos ultraprocessados.', url: 'https://www.gov.br/saude' },
      { label: 'Fiocruz – Fundação Oswaldo Cruz', note: 'Pesquisa, divulgação científica e produção de vacinas.', url: 'https://portal.fiocruz.br' },
      { label: 'Instituto Butantan', note: 'Vacinas e soros produzidos no Brasil.', url: 'https://butantan.gov.br' },
      { label: 'Constituição Federal de 1988 – artigos 196 a 200 (Saúde)', url: 'https://www.planalto.gov.br' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Não use comparações de peso, medidas ou aparência dos estudantes; temas de corpo e alimentação podem mobilizar inseguranças e transtornos alimentares.',
      'Atividades com movimento devem ter alternativas para estudantes com deficiência física, asma ou outras condições: cada um participa do jeito possível, e o registro dos dados vale igualmente.',
      'Para estudantes com TEA: antecipe a sequência da aula com um quadro visual (boca → estômago → intestino → pulmões → coração), avise antes de atividades barulhentas ou de toque (medir pulso pode ser feito pelo próprio estudante) e ofereça a opção de observar o modelo antes de manuseá-lo.',
      'Para estudantes com TDAH: divida a aula em blocos curtos com uma tarefa concreta em cada um, dê papéis ativos (cronometrista, montador do modelo) e use o painel do corpo como registro visual contínuo.',
      'Trate o SUS e a saúde como direitos, evitando discursos que culpem apenas os indivíduos pelas próprias doenças.',
    ],
  },

  // ───────────────────────── 2. A matemática escondida na feira e na cozinha ─────────────────────────
  {
    id: 'x-matematica-feira-cozinha',
    title: 'A matemática escondida na feira e na cozinha',
    theme: 'Matemática no cotidiano',
    kicker: 'Imersão matemática',
    openingQuestion: 'Se uma receita de bolo serve 8 pessoas, como fazer para servir a turma inteira sem desperdiçar nada?',
    summary:
      'Um passeio por uma feira livre e por uma cozinha de família para descobrir frações, medidas, proporção e porcentagem em situações reais, valorizando feirantes, cozinheiras e cozinheiros e as receitas de cada casa.',
    subjects: ['matematica', 'educacao-financeira', 'ciencias'],
    anos: [5, 6, 7],
    durationMin: 100,
    artId: 'subj-matematica',
    status: 'disponivel',
    context: [
      'As feiras livres fazem parte da vida das cidades brasileiras há muito tempo. Nelas circulam frutas, verduras, peixes, farinhas, temperos e também muito cálculo mental: feirantes fazem contas de troco, de preço por quilo e de desconto de cabeça, o dia inteiro.',
      'Na cozinha, receitas usam medidas caseiras (xícara, colher, pitada) e medidas padronizadas (grama, quilograma, mililitro, litro). Transformar uma em outra e aumentar ou diminuir uma receita exige frações e proporção.',
      'Boa parte dos alimentos frescos que chegam à mesa dos brasileiros vem da agricultura familiar, segundo o Censo Agropecuário do IBGE. Entender preços e quantidades também é entender o trabalho de quem produz.',
      'Porcentagens aparecem em descontos, em aumentos de preço e nos rótulos dos alimentos. Saber ler esses números ajuda a fazer escolhas mais conscientes.',
    ],
    diversity: [
      'Cada região tem sua feira e sua cozinha: feiras com barracas de tapioca e de caldo de cana, mercados ribeirinhos com peixes e açaí, feiras com pinhão no inverno do Sul, e feiras de bairro em grandes cidades.',
      'Muitas receitas de família são passadas de geração em geração sem medida exata ("um punhado", "até dar o ponto"). Esse saber prático também é matemático: envolve estimativa e proporção.',
      'Nem todas as famílias compram em feiras: há quem plante, quem compre em mercados, quem receba alimentos de programas sociais. Todas essas formas de acesso são legítimas.',
    ],
    contemporary: [
      'Feiras de produtores agroecológicos e orgânicos aproximam quem planta de quem consome e se espalham por muitas cidades brasileiras.',
      'O Programa Nacional de Alimentação Escolar (PNAE) determina que parte dos recursos da merenda seja usada na compra de alimentos da agricultura familiar.',
      'Feirantes usam cada vez mais pagamento por Pix e maquininhas, o que mudou a forma de lidar com troco e registro de vendas.',
      'Cozinheiras e cozinheiros de diferentes regiões, inclusive de comunidades quilombolas e indígenas, ganham reconhecimento por valorizar ingredientes brasileiros.',
    ],
    chapters: [
      {
        id: 'x-mat-cap-feira',
        title: '1. Bem-vindos à feira',
        paragraphs: [
          'Imagine a feira de sábado de uma cidade fictícia. Na barraca de Dona Lurdes (personagem fictícia), a placa diz: "Tomate R$ 8,00 o quilo". Um freguês pede meio quilo; outro, um quilo e meio; outro, 250 gramas. Quanto cada um paga?',
          'Para responder, é preciso saber que 1 quilograma tem 1 000 gramas, que meio quilo é 1/2 de 1 000 g, ou seja, 500 g, e que 250 g é 1/4 do quilo. Frações e medidas aparecem juntas o tempo todo na feira.',
        ],
        explore: [
          'Quanto custam 500 g, 1,5 kg e 250 g de tomate a R$ 8,00 o quilo?',
          'Por que alguns produtos são vendidos por quilo, outros por unidade, por dúzia ou por maço?',
          'Pergunte a um familiar: como ele sabe se um preço está caro ou barato?',
        ],
        classChoice: {
          prompt: 'Como a turma vai conhecer a feira?',
          options: [
            {
              label: 'Visita a uma feira real',
              outcome: 'Com autorização das famílias e acompanhamento, a turma visita uma feira próxima, registra preços, unidades de venda e entrevista um feirante sobre como faz as contas.',
            },
            {
              label: 'Feira simulada na sala',
              outcome: 'A turma monta barracas com embalagens vazias, plaquinhas de preço e dinheiro de papel. Metade dos estudantes vende e metade compra, depois trocam os papéis.',
            },
            {
              label: 'Pesquisa de preços com as famílias',
              outcome: 'Cada estudante traz preços de três alimentos anotados em casa, encartes ou cupons. A turma organiza os dados em uma tabela coletiva.',
            },
          ],
        },
      },
      {
        id: 'x-mat-cap-precos',
        title: '2. Qual é a melhor compra?',
        paragraphs: [
          'Na barraca ao lado, as laranjas são vendidas assim: "dúzia por R$ 6,00" ou "3 por R$ 2,00". Qual é mais vantajoso? Para comparar, podemos descobrir o preço de uma unidade em cada caso: R$ 6,00 ÷ 12 = R$ 0,50 e R$ 2,00 ÷ 3 ≈ R$ 0,67.',
          'Comparar preços por unidade, por quilo ou por litro é uma forma de usar a proporção. Mas a melhor compra também depende de outras coisas: quanto a família vai consumir antes de estragar, quanto dinheiro tem no momento e a qualidade do produto.',
        ],
        explore: [
          'Um pacote de 1 kg de feijão custa R$ 9,00 e um de 2 kg custa R$ 17,00. Qual tem o menor preço por quilo?',
          'Comprar mais quantidade sempre é vantajoso? Quando não é?',
          'Por que o preço de frutas e verduras muda ao longo do ano?',
        ],
      },
      {
        id: 'x-mat-cap-cozinha',
        title: '3. Na cozinha: frações e proporção',
        paragraphs: [
          'Agora a turma vai para a cozinha. Uma receita de bolo simples pede, por exemplo: 2 xícaras de farinha, 1 xícara de açúcar, 3 ovos, 1/2 xícara de óleo e 1 xícara de leite, rendendo 8 pedaços.',
          'Para servir 16 pessoas, dobramos tudo: cada quantidade é multiplicada por 2. Para 4 pessoas, dividimos tudo por 2, e aparecem frações como 1/4 de xícara de óleo e 1 ovo e meio. Para servir 32 pessoas, multiplicamos por 4. Essa relação que se mantém é a proporção.',
          'Também é possível converter medidas caseiras em medidas padronizadas: uma xícara de chá padrão tem 240 mL, por exemplo. Mas atenção: uma xícara de farinha e uma de açúcar não pesam o mesmo, porque os ingredientes têm densidades diferentes.',
        ],
        explore: [
          'Reescreva a receita para servir 4, 16 e 24 pessoas.',
          'O que fazer quando a conta dá "1 ovo e meio"? Que soluções práticas existem?',
          'Por que 1 xícara de farinha e 1 xícara de açúcar não têm a mesma massa?',
        ],
        classChoice: {
          prompt: 'Qual receita a turma vai ampliar?',
          options: [
            {
              label: 'Bolo simples',
              outcome: 'A turma calcula a receita para a turma toda e discute como lidar com ovos e frações de xícara.',
            },
            {
              label: 'Uma receita de família trazida por um estudante',
              outcome: 'A turma trabalha com a receita de uma família (com autorização), valorizando a história do prato e convertendo medidas "a olho" em medidas aproximadas.',
            },
            {
              label: 'Suco ou refresco de fruta',
              outcome: 'A turma trabalha com mililitros e litros, calculando quanto de polpa e de água é preciso para encher copos de 200 mL para todos.',
            },
          ],
        },
      },
      {
        id: 'x-mat-cap-porcentagem',
        title: '4. Porcentagens no dia a dia',
        paragraphs: [
          'No fim da feira, Dona Lurdes anuncia: "Tudo com 20% de desconto!". Se o quilo da banana custava R$ 5,00, quanto ficou? 20% é o mesmo que 20/100, ou 1/5. Um quinto de R$ 5,00 é R$ 1,00, então o quilo passa a custar R$ 4,00.',
          'Porcentagens aparecem também nos aumentos de preço e nos rótulos dos alimentos, que mostram, por exemplo, o percentual dos valores diários de referência. Saber calcular 10%, 25% e 50% de cabeça ajuda muito: 10% é dividir por 10, 25% é dividir por 4, e 50% é a metade.',
        ],
        explore: [
          'Calcule 10%, 25% e 50% de R$ 40,00 usando cálculo mental.',
          'Por que feirantes costumam dar descontos no fim da feira?',
          'Se um preço sobe 10% e depois cai 10%, ele volta ao valor inicial? Teste com R$ 100,00.',
        ],
      },
    ],
    challenges: {
      individual: [
        'Escolha uma receita de casa e reescreva-a para o dobro e para a metade das porções.',
        'Compare o preço por quilo de um mesmo produto em duas embalagens diferentes e explique qual é mais vantajosa e por quê.',
        'Crie um problema de porcentagem com uma situação de feira para um colega resolver.',
      ],
      coletivo: [
        'Montar uma feira simulada com tabela de preços, descontos e registro de vendas.',
        'Elaborar um livro de receitas da turma com quantidades ajustadas para 30 pessoas.',
        'Organizar uma tabela e um gráfico com os preços pesquisados pela turma.',
      ],
    },
    teacherScript: {
      antes: [
        'Pesquise preços reais de alguns alimentos na sua região para que os números façam sentido para a turma.',
        'Prepare embalagens vazias, plaquinhas e dinheiro de papel para a feira simulada.',
        'Se for cozinhar, verifique alergias e restrições alimentares e as regras da escola para uso de cozinha.',
        'Esteja atento a estudantes em situação de insegurança alimentar: o tema deve ser tratado com cuidado, sem expor o que cada família come ou pode comprar.',
      ],
      durante: [
        'Comece pelas estratégias que os estudantes já usam (cálculo mental, estimativa) antes de formalizar.',
        'Valorize diferentes caminhos de resolução para o mesmo problema.',
        'Use material concreto: copos medidores, balança de cozinha, fitas de papel divididas em frações.',
        'Ao comparar preços, lembre que a "melhor compra" depende também das necessidades e possibilidades de cada família.',
      ],
      depois: [
        'Retome a pergunta de abertura e peça que a turma resolva o problema do bolo para a sala toda.',
        'Monte o livro de receitas da turma com as quantidades ajustadas.',
        'Conecte com Ciências (alimentação e rótulos) e com Educação Financeira (planejamento de compras).',
      ],
    },
    practicalActivity: {
      title: 'Feira e cozinha da turma',
      materials: [
        'Embalagens vazias e limpas de alimentos (com rótulos)',
        'Plaquinhas de papel para preços',
        'Dinheiro de papel ou fichas',
        'Copos medidores, colheres medidoras e, se possível, uma balança de cozinha',
        'Folhas para tabela de preços e receitas',
      ],
      steps: [
        'Em grupos, montem barracas com embalagens e definam preços por unidade, por quilo ou por pacote.',
        'Cada grupo recebe uma "lista de compras" e uma quantia em dinheiro de papel e precisa comprar tudo sem ultrapassar o valor.',
        'Na metade do tempo, as barracas anunciam um desconto em porcentagem e os compradores recalculam os preços.',
        'Depois, cada grupo recebe uma receita e a reescreve para a quantidade de estudantes da turma.',
        'Usando copos e colheres medidoras com água ou farinha, os grupos conferem algumas conversões de medidas.',
        'Registrem e apresentem: que contas foram feitas, que estratégias funcionaram e o que foi difícil.',
      ],
    },
    finalConversation: [
      'Como fazer uma receita para 8 pessoas servir a turma inteira?',
      'Onde mais a matemática aparece escondida na sua rotina?',
      'O que aprendemos com o jeito de calcular de feirantes e cozinheiras?',
      'Por que é importante saber comparar preços e entender porcentagens?',
    ],
    printable: {
      title: 'Roteiro: A matemática escondida na feira e na cozinha',
      items: [
        'Pergunta de abertura: como ampliar uma receita para a turma toda?',
        'Capítulo 1: frações e medidas na feira (quilo, meio quilo, 250 g).',
        'Capítulo 2: preço por unidade e por quilo; qual é a melhor compra?',
        'Capítulo 3: receitas, frações e proporção; medidas caseiras e padronizadas.',
        'Capítulo 4: porcentagem em descontos, aumentos e rótulos.',
        'Atividade: feira e cozinha da turma.',
        'Desafio: reescrever uma receita de casa para o dobro e a metade.',
      ],
    },
    references: [
      { label: 'IBGE – Censo Agropecuário', note: 'Dados sobre agricultura familiar e produção de alimentos.', url: 'https://www.ibge.gov.br' },
      { label: 'Embrapa – Empresa Brasileira de Pesquisa Agropecuária', note: 'Informações sobre produção e sazonalidade de alimentos.', url: 'https://www.embrapa.br' },
      { label: 'Ministério da Saúde – Guia Alimentar para a População Brasileira', url: 'https://www.gov.br/saude' },
      { label: 'FNDE – Programa Nacional de Alimentação Escolar (PNAE)', url: 'https://www.gov.br/fnde' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Preços variam muito entre regiões e ao longo do tempo: atualize os valores dos exemplos com a realidade local.',
      'Não peça que estudantes revelem quanto a família gasta ou o que come; use dados coletivos e situações fictícias.',
      'Valorize o cálculo mental e as estratégias informais (de feirantes, familiares e dos próprios estudantes) como conhecimento matemático legítimo.',
      'Para estudantes com TEA: apresente as regras da feira simulada por escrito e com imagens antes de começar, combine sinais para o início e o fim de cada rodada e ofereça um papel mais previsível (caixa, registrador de preços) para quem preferir menos interação.',
      'Para estudantes com TDAH: use rodadas curtas com metas claras, material manipulável e trocas de papel frequentes; ofereça uma folha-guia com os passos de cada cálculo.',
      'Para 5º ano, priorize frações simples (1/2, 1/4), dobro e metade; para 7º ano, avance para razão, proporção e porcentagens variadas.',
    ],
  },

  // ───────────────────────── 3. Biomas do Brasil: uma expedição ─────────────────────────
  {
    id: 'x-biomas-do-brasil',
    title: 'Biomas do Brasil: uma expedição',
    theme: 'Meio ambiente',
    kicker: 'Imersão de expedição',
    openingQuestion: 'Se você pudesse atravessar o Brasil a pé, quantas paisagens diferentes encontraria, e quem você conheceria pelo caminho?',
    summary:
      'Uma expedição pelos seis biomas continentais brasileiros (Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa) para conhecer suas paisagens, seres vivos, povos que vivem neles e os desafios para preservá-los.',
    subjects: ['geografia', 'ciencias', 'historia'],
    anos: [4, 5, 6, 7],
    durationMin: 120,
    artId: 'subj-geografia',
    status: 'disponivel',
    context: [
      'Bioma é um conjunto de ecossistemas com clima, relevo, solo, vegetação e fauna semelhantes, formado ao longo de muito tempo. O IBGE reconhece seis biomas continentais no Brasil: Amazônia, Cerrado, Caatinga, Mata Atlântica, Pantanal e Pampa. Há ainda o Sistema Costeiro-Marinho.',
      'Os biomas têm tamanhos muito diferentes. A Amazônia ocupa quase metade do território brasileiro e o Cerrado, cerca de um quarto. Pantanal e Pampa são os menores. A Caatinga é o único bioma exclusivamente brasileiro.',
      'Os biomas não são "natureza vazia": há milhares de anos são habitados por povos indígenas e, ao longo da história, também por quilombolas, ribeirinhos, sertanejos, pantaneiros, gaúchos, quebradeiras de coco babaçu, caiçaras e muitos outros grupos.',
      'Desmatamento, queimadas, mineração ilegal, expansão urbana e mudanças climáticas ameaçam os biomas. A Mata Atlântica, onde vive a maior parte da população brasileira, perdeu grande parte da sua cobertura original.',
    ],
    diversity: [
      'Cada bioma é diverso por dentro: a Amazônia tem florestas de terra firme, várzeas e igapós; o Cerrado tem campos, veredas e matas; a Caatinga muda completamente entre a seca e a chuva.',
      'Os povos indígenas são muitos e diferentes entre si, com línguas, territórios e modos de vida próprios; não existe um "índio genérico". O Censo 2022 do IBGE registrou centenas de povos e línguas indígenas no país.',
      'Moradores das cidades também vivem dentro de biomas: São Paulo e Rio de Janeiro estão na Mata Atlântica, Brasília no Cerrado, Manaus na Amazônia, Petrolina na Caatinga, Porto Alegre entre Pampa e Mata Atlântica.',
    ],
    contemporary: [
      'Povos indígenas fazem monitoramento e proteção de seus territórios, e estudos com dados de satélite mostram que terras indígenas estão entre as áreas mais preservadas do país.',
      'Pesquisadores do INPE acompanham o desmatamento da Amazônia e do Cerrado por satélite, com dados públicos.',
      'Agricultores familiares e comunidades do Semiárido desenvolvem formas de convivência com a Caatinga, como cisternas e quintais produtivos.',
      'Cientistas da Embrapa e de universidades estudam o uso sustentável de frutos nativos como pequi, baru, umbu, açaí e buriti, valorizando o trabalho de extrativistas.',
    ],
    chapters: [
      {
        id: 'x-biomas-cap-amazonia',
        title: '1. Amazônia: a floresta dos rios',
        paragraphs: [
          'A expedição começa no Norte, na maior floresta tropical do mundo, que o Brasil divide com outros países da América do Sul. Na Amazônia, rios enormes funcionam como estradas, e as cheias e vazantes marcam o calendário de quem vive ali.',
          'A floresta abriga uma biodiversidade imensa e também influencia as chuvas em outras regiões do país: a umidade que sai das árvores é levada pelos ventos e ajuda a formar chuvas no Centro-Oeste e no Sudeste.',
          'Ali vivem muitos povos indígenas, ribeirinhos, quilombolas e moradores de cidades grandes como Manaus e Belém. Castanha, açaí, mandioca e peixes como o pirarucu fazem parte da vida e da economia local.',
        ],
        explore: [
          'Por que dizemos que a Amazônia ajuda a trazer chuva para outras regiões?',
          'Como os rios organizam a vida de quem mora na Amazônia?',
          'Que alimentos que você conhece vêm da Amazônia?',
        ],
        classChoice: {
          prompt: 'Como a expedição vai se organizar?',
          options: [
            {
              label: 'Equipes por bioma',
              outcome: 'Seis equipes, cada uma responsável por um bioma, preparam um "diário de expedição" e apresentam ao restante da turma ao longo dos capítulos.',
            },
            {
              label: 'Expedição coletiva com passaporte',
              outcome: 'Toda a turma viaja junta e cada estudante recebe um passaporte de papel para carimbar e registrar uma descoberta em cada bioma.',
            },
          ],
        },
      },
      {
        id: 'x-biomas-cap-cerrado-caatinga',
        title: '2. Cerrado e Caatinga: resistência e água',
        paragraphs: [
          'No Centro do país, o Cerrado tem árvores de troncos tortos e casca grossa, capins e raízes profundas que alcançam a água no subsolo. Ele é chamado de "berço das águas" porque nele nascem rios de grandes bacias, como a do São Francisco e a do Tocantins-Araguaia. Pequi, baru e buriti são frutos do Cerrado.',
          'Mais ao Nordeste, a Caatinga, cujo nome vem do tupi e é frequentemente traduzido como "mata branca", fica acinzentada na seca: muitas plantas perdem as folhas para economizar água. Quando chove, tudo fica verde em poucos dias. Umbuzeiro, mandacaru e juazeiro são plantas típicas.',
          'Os dois biomas são muito ricos em espécies, mas foram bastante desmatados para pastagens e lavouras. Sertanejos, quilombolas, indígenas, geraizeiros e quebradeiras de coco babaçu conhecem formas de viver com esses ambientes.',
        ],
        explore: [
          'Que adaptações as plantas do Cerrado e da Caatinga têm para enfrentar a seca?',
          'Por que proteger o Cerrado ajuda a proteger a água de outras regiões?',
          'A Caatinga só existe no Brasil. Por que isso aumenta nossa responsabilidade em preservá-la?',
        ],
      },
      {
        id: 'x-biomas-cap-mata-atlantica',
        title: '3. Mata Atlântica: a floresta onde moramos',
        paragraphs: [
          'A Mata Atlântica se estendia por grande parte do litoral brasileiro e por áreas do interior. Foi o primeiro bioma ocupado pelos colonizadores europeus e onde hoje estão muitas das maiores cidades do país. Por isso perdeu grande parte da floresta original.',
          'Mesmo assim, ela continua cheia de vida: o mico-leão-dourado, a onça-pintada, muitas espécies de aves, bromélias e orquídeas. Os fragmentos de floresta que restaram protegem nascentes que abastecem milhões de pessoas nas cidades.',
          'Povos indígenas como os Guarani, comunidades caiçaras e quilombolas vivem nesse bioma e mantêm saberes sobre a floresta e o mar.',
        ],
        explore: [
          'Sua escola fica em qual bioma? Que vestígios dele existem perto de você?',
          'Por que a Mata Atlântica foi tão desmatada?',
          'Como a floresta ajuda a garantir água para as cidades?',
        ],
        classChoice: {
          prompt: 'Que investigação a turma quer fazer sobre o bioma onde fica a escola?',
          options: [
            {
              label: 'Inventário de plantas e animais do entorno',
              outcome: 'A turma registra com desenhos ou fotos as plantas e os animais encontrados na escola e nos arredores e tenta descobrir quais são nativos do bioma.',
            },
            {
              label: 'Entrevista sobre a paisagem de antigamente',
              outcome: 'Os estudantes conversam com familiares e moradores antigos sobre como era a paisagem do bairro há décadas e o que mudou.',
            },
            {
              label: 'Mapa comparativo',
              outcome: 'A turma compara um mapa dos biomas com um mapa político e descobre em qual bioma está cada capital brasileira.',
            },
          ],
        },
      },
      {
        id: 'x-biomas-cap-pantanal-pampa',
        title: '4. Pantanal e Pampa: águas e campos',
        paragraphs: [
          'No Pantanal, uma das maiores áreas úmidas continentais do planeta, as cheias cobrem grandes áreas por meses e depois recuam. É um lugar excelente para ver animais como tuiuiú, jacaré, capivara, ariranha e onça-pintada. Pantaneiros e povos indígenas como os Guató e os Terena convivem com esse ritmo das águas. Nos últimos anos, secas e grandes incêndios preocuparam cientistas e moradores.',
          'No extremo sul, o Pampa é formado principalmente por campos, com vegetação baixa, adequada à criação de gado, tradição de muitos gaúchos. No Brasil, ele existe apenas no Rio Grande do Sul e continua na Argentina e no Uruguai. Por parecer "só campo", muitas vezes é esquecido nas ações de preservação.',
          'Ao final da expedição, fica uma ideia: os biomas estão conectados entre si pelas águas, pelos ventos, pelos animais e pelas pessoas. Cuidar de um é cuidar de todos.',
        ],
        explore: [
          'Como as cheias e as secas organizam a vida no Pantanal?',
          'Por que um bioma de campos, como o Pampa, também precisa ser preservado?',
          'Que conexões existem entre os seis biomas?',
        ],
      },
    ],
    challenges: {
      individual: [
        'Crie um cartão-postal de um bioma com uma imagem desenhada e uma mensagem contando o que mais chamou sua atenção.',
        'Descubra em qual bioma você nasceu ou em que bioma nasceram seus familiares.',
        'Escolha um fruto nativo e pesquise de qual bioma ele é e quem o coleta ou cultiva.',
      ],
      coletivo: [
        'Montar um grande mapa ilustrado dos biomas do Brasil com animais, plantas, povos e cidades.',
        'Organizar uma exposição "Diários de expedição" com os registros de cada equipe.',
        'Elaborar uma lista de compromissos da turma para proteger o bioma onde a escola está.',
      ],
    },
    teacherScript: {
      antes: [
        'Prepare um mapa dos biomas brasileiros (disponível no site do IBGE) em tamanho grande ou para projeção.',
        'Selecione imagens de cada bioma que mostrem paisagens, seres vivos, pessoas e cidades, evitando apenas imagens de natureza "intocada".',
        'Confira dados atualizados de desmatamento em fontes como INPE e MapBiomas antes de citá-los.',
        'Para 4º e 5º anos, simplifique os textos e use mais imagens; para 6º e 7º anos, aprofunde adaptações dos seres vivos e conflitos de uso da terra.',
      ],
      durante: [
        'Use a narrativa da expedição: a cada capítulo, a turma "viaja" no mapa e registra no passaporte ou no diário.',
        'Ao falar de povos indígenas e comunidades tradicionais, apresente-os no presente, com nomes de povos específicos, e não como parte da paisagem.',
        'Evite hierarquizar os biomas ("a Amazônia é a mais importante"): todos são valiosos e conectados.',
        'Peça que os estudantes relacionem cada bioma com algo do seu cotidiano (comida, água, música, palavras).',
      ],
      depois: [
        'Retome a pergunta de abertura e peça que a turma desenhe o trajeto da expedição no mapa.',
        'Monte a exposição dos diários e o mapa ilustrado.',
        'Conecte com Ciências (adaptações e cadeias alimentares), História (ocupação do território) e Língua Portuguesa (palavras de origem indígena).',
      ],
    },
    practicalActivity: {
      title: 'Diário de expedição pelos biomas',
      materials: [
        'Folhas A4 dobradas e grampeadas em formato de caderno',
        'Lápis de cor, canetinhas e cola',
        'Imagens impressas ou recortadas de revistas',
        'Mapa dos biomas do Brasil',
        'Barbante ou fita para expor os diários',
      ],
      steps: [
        'Cada estudante ou equipe monta um diário com uma página para cada bioma.',
        'Em cada página, registre: onde fica o bioma no mapa, como é o clima, uma planta, um animal e um povo ou comunidade que vive ali.',
        'Acrescente uma "descoberta surpreendente" e uma ameaça que o bioma enfrenta.',
        'Na última página, desenhe o bioma onde fica a escola e escreva uma ação possível para protegê-lo.',
        'Compartilhe o diário com um colega e compare as descobertas.',
        'Exponha os diários no corredor ou na biblioteca da escola.',
      ],
    },
    finalConversation: [
      'Quantas paisagens diferentes encontraríamos atravessando o Brasil, e quem conheceríamos pelo caminho?',
      'O que os seis biomas têm em comum e o que os torna diferentes?',
      'Por que os povos que vivem nos biomas são importantes para a sua preservação?',
      'Que ação a turma pode realizar para cuidar do bioma onde a escola está?',
    ],
    printable: {
      title: 'Roteiro: Biomas do Brasil, uma expedição',
      items: [
        'Pergunta de abertura: que paisagens e pessoas encontraríamos atravessando o Brasil?',
        'Capítulo 1: Amazônia, rios, chuvas e povos da floresta.',
        'Capítulo 2: Cerrado (berço das águas) e Caatinga (bioma exclusivamente brasileiro).',
        'Capítulo 3: Mata Atlântica, a floresta onde vive a maior parte da população.',
        'Capítulo 4: Pantanal (áreas úmidas) e Pampa (campos do Sul).',
        'Atividade: diário de expedição pelos biomas.',
        'Desafio: descobrir em qual bioma você e sua família nasceram.',
      ],
    },
    references: [
      { label: 'IBGE – Mapa de Biomas do Brasil', note: 'Limites e áreas aproximadas dos biomas continentais.', url: 'https://www.ibge.gov.br' },
      { label: 'Ministério do Meio Ambiente e Mudança do Clima – Biomas', url: 'https://www.gov.br/mma' },
      { label: 'INPE – Instituto Nacional de Pesquisas Espaciais', note: 'Monitoramento do desmatamento por satélite.', url: 'https://www.gov.br/inpe' },
      { label: 'Embrapa – pesquisas sobre os biomas e frutos nativos', url: 'https://www.embrapa.br' },
      { label: 'IBGE – Censo Demográfico 2022: Indígenas', note: 'Dados sobre povos e línguas indígenas.', url: 'https://www.ibge.gov.br' },
      { label: 'Base Nacional Comum Curricular', url: 'http://basenacionalcomum.mec.gov.br' },
    ],
    pedagogicalNotes: [
      'Evite imagens e falas que tratem povos indígenas como parte do passado ou da natureza; apresente-os como sujeitos de direitos, com nomes de povos específicos e presença contemporânea, inclusive nas cidades.',
      'Estudantes indígenas, quilombolas ou de comunidades tradicionais devem ser acolhidos sem serem colocados como "especialistas" ou expostos sem seu consentimento.',
      'Percentuais de área dos biomas e dados de desmatamento mudam com novos levantamentos: cite sempre a fonte e o ano.',
      'Para estudantes com TEA: mantenha a mesma estrutura em todos os capítulos (mapa → clima → planta → animal → povo), use o passaporte ou diário como roteiro visual e avise antes de vídeos com sons fortes de animais ou de queimadas.',
      'Para estudantes com TDAH: use o mapa como ponto de movimento (o estudante marca o bioma no mapa da sala), proponha registros curtos por bioma e alterne leitura com desenho e manipulação de imagens.',
      'Trate o desmatamento e as queimadas com dados e responsabilidades coletivas, sem gerar medo excessivo; termine sempre com exemplos de ações e pessoas que protegem os biomas.',
    ],
  },

  // ───────────────────────── 4. Um dia em um país que fala inglês ─────────────────────────
  {
    id: 'x-um-dia-pais-ingles',
    title: 'Um dia em um país que fala inglês',
    theme: 'Línguas e culturas',
    kicker: 'Imersão intercultural',
    openingQuestion: 'Do café da manhã à hora de dormir, como seria passar um dia em Lagos, Mumbai, Kingston ou Londres, e o que a gente diria em inglês?',
    summary:
      'Uma viagem por um dia comum em países onde o inglês é falado (como Nigéria, Índia, Jamaica, Reino Unido e Estados Unidos) para aprender vocabulário do cotidiano, perceber que o inglês tem muitos sotaques e donos, e comparar culturas com respeito.',
    subjects: ['ingles', 'geografia', 'matematica'],
    anos: [6, 7, 8],
    durationMin: 100,
    artId: 'subj-ingles',
    status: 'disponivel',
    context: [
      'O inglês é falado como primeira língua, segunda língua ou língua oficial em dezenas de países, em todos os continentes. Hoje, há mais pessoas que usam o inglês como segunda língua do que falantes nativos.',
      'A expansão do inglês está ligada à história do colonialismo britânico e, depois, à influência econômica e cultural dos Estados Unidos. Em muitos países, como Nigéria, Índia e Jamaica, o inglês convive com outras línguas e ganhou formas e sotaques próprios.',
      'Na Nigéria, o inglês é língua oficial e convive com centenas de línguas, como iorubá, igbo e hauçá, além do pidgin nigeriano. Na Índia, o inglês é uma das línguas oficiais do governo federal, ao lado do hindi, e há muitas outras línguas reconhecidas nos estados. Na Jamaica, o inglês é a língua oficial e o patoá (Jamaican Patois) é muito falado no dia a dia.',
      'Comparar culturas não é decidir qual é melhor: é perceber semelhanças, diferenças e o ponto de vista de cada um. A BNCC de Língua Inglesa propõe tratar o inglês como língua franca, usada por pessoas do mundo todo, e não como propriedade de um único país.',
    ],
    diversity: [
      'Não existe um único "inglês certo": há o inglês nigeriano, o indiano, o jamaicano, o britânico, o estadunidense, o australiano, o sul-africano, entre outros, todos legítimos.',
      'Dentro de cada país há enorme diversidade: Lagos e uma aldeia no norte da Nigéria, Mumbai e uma cidade pequena em Kerala, Kingston e o interior da Jamaica vivem rotinas diferentes.',
      'A população da Jamaica é majoritariamente de origem africana, assim como grande parte da população brasileira, o que cria conexões históricas, musicais e culturais entre os dois países.',
    ],
    contemporary: [
      'O cinema nigeriano, conhecido como Nollywood, é uma das maiores indústrias de cinema do mundo em número de filmes produzidos.',
      'Músicas como o afrobeats nigeriano e o reggae e o dancehall jamaicanos influenciam artistas do mundo todo, inclusive brasileiros.',
      'A Índia é um grande polo de tecnologia, e o inglês é muito usado em universidades e empresas ao lado das línguas indianas.',
      'Escritores de vários países, como a nigeriana Chimamanda Ngozi Adichie, escrevem em inglês e falam sobre o perigo de conhecer outros povos por uma única história.',
    ],
    chapters: [
      {
        id: 'x-ingles-cap-morning',
        title: '1. Good morning! O despertar em quatro cidades',
        paragraphs: [
          'A viagem é imaginária e acompanha quatro adolescentes fictícios: Tunde, em Lagos (Nigéria); Priya, em Mumbai (Índia); Shanice, em Kingston (Jamaica); e Oliver, em Londres (Reino Unido). Quando é 7h da manhã em Brasília, que horas são para cada um?',
          'Com os fusos horários, descobrimos que em Lagos são 11h, em Mumbai são 15h30, em Kingston são 5h e em Londres são 10h ou 11h, dependendo da época do ano (o Reino Unido adota horário de verão). Ou seja, os quatro nunca acordam ao mesmo tempo!',
          'Vocabulário do dia: "Good morning", "wake up", "breakfast", "brush my teeth", "get dressed". No café da manhã, Tunde pode comer akara (bolinho de feijão parecido com o acarajé), Priya pode comer poha ou idli, Shanice pode comer ackee and saltfish, e Oliver, torrada com feijão.',
        ],
        explore: [
          'Por que existem fusos horários diferentes no mundo?',
          'O akara nigeriano lembra que comida brasileira? Que ligação histórica explica essa semelhança?',
          'Descreva em inglês o seu café da manhã: "For breakfast, I have…"',
        ],
        classChoice: {
          prompt: 'Qual adolescente a turma vai acompanhar mais de perto?',
          options: [
            {
              label: 'Tunde, em Lagos',
              outcome: 'A turma aprofunda a Nigéria: línguas, música, Nollywood e as conexões com a cultura iorubá presente no Brasil.',
            },
            {
              label: 'Priya, em Mumbai',
              outcome: 'A turma aprofunda a Índia: diversidade de línguas e religiões, trens lotados, comida e tecnologia.',
            },
            {
              label: 'Shanice, em Kingston',
              outcome: 'A turma aprofunda a Jamaica: patoá, reggae, esportes e a história da diáspora africana no Caribe.',
            },
            {
              label: 'Oliver, em Londres',
              outcome: 'A turma aprofunda o Reino Unido, incluindo a diversidade de uma cidade onde vivem pessoas de muitas origens.',
            },
          ],
        },
      },
      {
        id: 'x-ingles-cap-school',
        title: '2. At school: um dia de aula',
        paragraphs: [
          'Na escola, os quatro aprendem matemática, ciências e línguas, como no Brasil. Mas há diferenças: em muitas escolas da Nigéria, da Índia, da Jamaica e do Reino Unido, o uniforme é obrigatório; em várias delas, as aulas acontecem em inglês, mesmo para quem fala outra língua em casa.',
          'Priya, por exemplo, pode falar marati com a avó, hindi com os amigos e inglês na escola. Tunde pode falar iorubá em casa e pidgin na rua. Ser multilíngue é comum em grande parte do mundo.',
          'Vocabulário do capítulo: "classroom", "teacher", "subject", "break" (Reino Unido) ou "recess" (Estados Unidos), "homework", "uniform", "What\'s your favourite subject?".',
        ],
        explore: [
          'Que semelhanças e diferenças você imagina entre a sua escola e a de Tunde ou de Priya?',
          'Você conhece alguém que fala mais de uma língua? Em que situações usa cada uma?',
          'Pergunte a um colega em inglês: "What\'s your favourite subject? Why?"',
        ],
      },
      {
        id: 'x-ingles-cap-city',
        title: '3. Around the city: comida, música e caminhos',
        paragraphs: [
          'À tarde, cada um circula pela própria cidade. Em Lagos, Tunde pega um ônibus amarelo, os famosos danfos, e ouve afrobeats. Em Mumbai, Priya come um lanche de rua e passa por um mercado cheio de temperos. Em Kingston, Shanice treina corrida, um esporte muito popular na Jamaica, e escuta reggae. Em Londres, Oliver pega o metrô, que os londrinos chamam de "the Tube".',
          'Palavras mudam de lugar para lugar: o que os britânicos chamam de "flat", "lift" e "chips", os estadunidenses chamam de "apartment", "elevator" e "fries". Na Jamaica, em patoá, "Wah gwaan?" é um jeito comum de dizer "E aí, tudo bem?".',
          'Comparar sem julgar: em vez de dizer "lá é estranho", podemos dizer "lá é diferente daqui, e aqui também deve parecer diferente para eles".',
        ],
        explore: [
          'Dê direções em inglês para um turista chegar da escola até a praça mais próxima: "turn left", "turn right", "go straight".',
          'Que palavras do inglês você já usa no dia a dia sem perceber?',
          'Que ritmos musicais brasileiros têm conexões com a música jamaicana ou africana?',
        ],
        classChoice: {
          prompt: 'Que produção a turma vai criar sobre o passeio pela cidade?',
          options: [
            {
              label: 'Mapa turístico bilíngue',
              outcome: 'A turma cria um mapa do bairro da escola com legendas em português e inglês e frases para orientar visitantes.',
            },
            {
              label: 'Playlist comentada',
              outcome: 'Cada grupo escolhe uma música (com letra adequada à idade) de um dos países e uma música brasileira e explica, em frases simples em inglês, o que elas têm em comum.',
            },
            {
              label: 'Cardápio intercultural',
              outcome: 'A turma monta um cardápio em inglês com pratos dos quatro países e do Brasil, descrevendo ingredientes com vocabulário aprendido.',
            },
          ],
        },
      },
      {
        id: 'x-ingles-cap-night',
        title: '4. Good night: comparar com respeito',
        paragraphs: [
          'À noite, os quatro jantam com a família, fazem a lição, conversam com amigos pelo celular. Apesar de tantas diferenças, há muitas coisas em comum: família, amizade, escola, música, futebol, comida.',
          'A escritora nigeriana Chimamanda Ngozi Adichie fala sobre o perigo de uma história única: quando conhecemos um país só por uma imagem (pobreza, safári, tecnologia, realeza), deixamos de ver as pessoas reais. O mesmo acontece quando o Brasil é visto só como "samba e futebol".',
          'Agora é a vez da turma: como seria apresentar um dia no Brasil para Tunde, Priya, Shanice e Oliver, em inglês?',
        ],
        explore: [
          'Que imagem única os estrangeiros costumam ter do Brasil? Ela é verdadeira para você?',
          'Que imagem única você tinha da Nigéria, da Índia ou da Jamaica antes desta imersão?',
          'Escreva três frases em inglês sobre o seu dia: "I wake up at…", "I go to school by…", "In the evening, I…"',
        ],
      },
    ],
    challenges: {
      individual: [
        'Escreva em inglês uma rotina de um dia seu com pelo menos seis frases ("I wake up at…", "I have… for lunch").',
        'Calcule que horas são em Lagos, Mumbai, Kingston e Londres no horário em que você entra na escola.',
        'Encontre cinco palavras em inglês que você vê em embalagens, jogos ou ruas e descubra seu significado.',
      ],
      coletivo: [
        'Produzir um vídeo ou cartaz "A day in Brazil" para apresentar a rotina da turma a estudantes de outros países.',
        'Montar um relógio mundial na parede da sala com os horários das cinco cidades.',
        'Criar um mural de comparação respeitosa: "Same" e "Different" entre o Brasil e os quatro países.',
      ],
    },
    teacherScript: {
      antes: [
        'Prepare um mapa-múndi para localizar Nigéria, Índia, Jamaica, Reino Unido e Brasil.',
        'Selecione imagens e áudios curtos que mostrem cidades, escolas e cotidiano contemporâneos dos países, evitando estereótipos (só pobreza, só safári, só monumentos).',
        'Confira os fusos horários na data da aula, já que o Reino Unido muda o horário no verão europeu.',
        'Prepare um banco de vocabulário com imagens para apoiar estudantes com menos contato com o inglês.',
      ],
      durante: [
        'Use o inglês em frases curtas e com apoio visual, aceitando respostas em português quando necessário.',
        'Valorize diferentes sotaques e não corrija pronúncia de forma que exponha o estudante.',
        'Ao comparar culturas, use a estrutura "aqui… / lá…" sem adjetivos como "estranho" ou "atrasado".',
        'Destaque as conexões históricas entre Brasil, Nigéria e Jamaica pela diáspora africana.',
      ],
      depois: [
        'Retome a pergunta de abertura e peça que cada estudante descreva em inglês um momento do dia de um dos adolescentes.',
        'Finalize a produção "A day in Brazil" e, se possível, compartilhe com outra turma da escola.',
        'Conecte com Geografia (fusos horários e localização), Matemática (cálculo de horários) e História (colonialismo e diáspora africana).',
      ],
    },
    practicalActivity: {
      title: 'Relógio mundial e rotina em inglês',
      materials: [
        'Cinco pratos de papel ou círculos de cartolina',
        'Prendedores ou setas de papel para os ponteiros',
        'Mapa-múndi',
        'Fichas com vocabulário de rotina e imagens',
        'Canetas coloridas',
      ],
      steps: [
        'Em grupos, construam cinco relógios: Brasília, Lagos, Mumbai, Kingston e Londres.',
        'Localizem cada cidade no mapa e liguem os relógios às cidades com barbante ou setas.',
        'O professor sorteia um horário em Brasília e os grupos ajustam os outros relógios, explicando o cálculo.',
        'Para cada horário, os grupos dizem em inglês o que um dos adolescentes provavelmente está fazendo ("It\'s 3:30 p.m. in Mumbai. Priya is…").',
        'Cada estudante escreve sua própria rotina em inglês, usando as fichas de vocabulário.',
        'Apresentem as rotinas em duplas e registrem uma semelhança e uma diferença com um dos adolescentes.',
      ],
    },
    finalConversation: [
      'Como seria passar um dia em Lagos, Mumbai, Kingston ou Londres, e o que diríamos em inglês?',
      'Por que podemos dizer que o inglês pertence a muitos povos e não a um só país?',
      'O que temos em comum com adolescentes de outros países, apesar das diferenças?',
      'Como evitar conhecer outros povos por uma "história única"?',
    ],
    printable: {
      title: 'Roteiro: Um dia em um país que fala inglês',
      items: [
        'Pergunta de abertura: como seria um dia em Lagos, Mumbai, Kingston ou Londres?',
        'Capítulo 1: Good morning (fusos horários, café da manhã, vocabulário de rotina).',
        'Capítulo 2: At school (escola, multilinguismo, vocabulário escolar).',
        'Capítulo 3: Around the city (transporte, música, comida, variações do inglês).',
        'Capítulo 4: Good night (semelhanças, diferenças e o perigo de uma história única).',
        'Atividade: relógio mundial e rotina em inglês.',
        'Desafio: escrever a própria rotina em inglês com seis frases.',
      ],
    },
    references: [
      { label: 'Base Nacional Comum Curricular – Língua Inglesa (inglês como língua franca)', url: 'http://basenacionalcomum.mec.gov.br' },
      { label: 'British Council – materiais para professores e estudantes de inglês', url: 'https://www.britishcouncil.org' },
      { label: 'Chimamanda Ngozi Adichie – "O perigo de uma história única" (palestra e livro)', note: 'Publicado no Brasil pela Companhia das Letras.' },
      { label: 'Museu da Língua Portuguesa', note: 'Para comparar línguas, variações e palavras emprestadas entre línguas.', url: 'https://www.museudalinguaportuguesa.org.br' },
      { label: 'IBGE – Países@ (informações sobre países)', url: 'https://www.ibge.gov.br' },
    ],
    pedagogicalNotes: [
      'Os quatro adolescentes são personagens fictícios: deixe isso claro para a turma e evite apresentá-los como "o típico" nigeriano, indiano, jamaicano ou britânico.',
      'Não trate o inglês dos Estados Unidos ou do Reino Unido como o "correto"; apresente as variedades como igualmente legítimas.',
      'Ao abordar a história da expansão do inglês, mencione o colonialismo sem simplificações e valorize as línguas locais que convivem com ele.',
      'Para estudantes com TEA: antecipe a rotina da aula com um quadro visual, ofereça o vocabulário por escrito e com imagens, evite exigir fala em público sem aviso prévio (permita apresentar em dupla ou por escrito) e cuidado com áudios em volume alto.',
      'Para estudantes com TDAH: trabalhe com tarefas curtas e concretas (ajustar um relógio, completar uma frase), use movimento (ir até o mapa, girar o ponteiro) e ofereça um modelo de frase pronto para adaptar.',
      'Estudantes com pouco contato prévio com o inglês devem poder participar em português e avançar aos poucos; o objetivo é ampliar repertório, não avaliar fluência.',
    ],
  },
];
