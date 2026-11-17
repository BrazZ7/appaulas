import type { MicroImmersion } from '../types/models';

/**
 * Microimersões de formação do professor: situações simuladas de sala com caminhos ramificados.
 * Todos os estudantes citados nos cenários são personagens fictícios.
 */

/** Nó único para microimersões em preparo (garante que startNodeId resolva). */

export const MICRO_IMMERSIONS: MicroImmersion[] = [
  // ───────────────────────── 1. Conversas difíceis ─────────────────────────
  {
    id: 'conversas-dificeis',
    title: 'Facilitar conversas difíceis',
    topic: 'Racismo e situações de tensão em sala',
    durationMin: 20,
    summary:
      'Pratique como agir quando um estudante faz uma "piada" racista durante a aula: interromper, proteger quem foi atingido, transformar o episódio em aprendizagem e dar continuidade depois.',
    artId: 'train-conversas',
    status: 'disponivel',
    intro: [
      'Comentários racistas, machistas, homofóbicos ou de intolerância religiosa muitas vezes aparecem em forma de "brincadeira". Quando a professora ou o professor não reage, a turma aprende que aquilo é aceitável, e quem foi atingido aprende que não será protegido.',
      'Não existe uma resposta perfeita, mas existem princípios: interromper a fala sem humilhar quem a fez, proteger e não expor quem foi atingido, focar na fala (e não na pessoa), conectar com acordos e conhecimentos e dar continuidade depois da aula, inclusive seguindo os protocolos da escola.',
      'Nesta simulação, você está em uma turma de 8º ano. Os estudantes são personagens fictícios. Escolha o que faria em cada momento e leia o retorno sobre cada decisão.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Durante uma aula de História sobre o período pós-abolição, você mostra fotografias antigas. Rafael comenta em voz alta, olhando para Júlia, uma colega negra: "Olha, parece o cabelo da Júlia!". Parte da turma ri. Júlia abaixa a cabeça.',
        options: [
          {
            label: 'Interromper com calma e firmeza: "Vamos parar aqui. Esse comentário é racista e não cabe na nossa sala."',
            to: 'nomear',
            quality: 'construtiva',
            feedback:
              'Interromper na hora sinaliza a toda a turma que o limite foi ultrapassado e que Júlia não está sozinha. Nomear o que aconteceu ("comentário racista") com voz calma foca na fala, não na pessoa, e evita tanto o silêncio quanto a humilhação pública.',
          },
          {
            label: 'Dizer "Gente, foco na aula" e seguir com as fotografias.',
            to: 'silencio',
            quality: 'parcial',
            feedback:
              'Você interrompeu a dispersão, mas não nomeou o problema. Para a turma, pode parecer que o problema foi a bagunça, e não o racismo. Para Júlia, pode parecer que a ofensa não importa.',
          },
          {
            label: 'Levantar a voz: "Rafael, que vergonha! Para fora da sala agora!"',
            to: 'confronto',
            quality: 'arriscada',
            feedback:
              'A indignação é compreensível, mas a reação explosiva desloca a atenção para o conflito entre você e Rafael. A turma perde a chance de entender por que a fala é racista, e Júlia continua no centro de uma cena tensa.',
          },
        ],
      },
      nomear: {
        id: 'nomear',
        speaker: 'Rafael',
        situation: 'A sala fica em silêncio. Rafael responde, sem graça: "Foi só uma brincadeira, professor. Ela nem ligou."',
        options: [
          {
            label: 'Explicar: "Uma brincadeira só é brincadeira quando todo mundo ri junto. Rir da aparência de alguém por causa da cor é racismo, e isso tem a ver com o que estamos estudando." Em seguida, abrir a conversa com a turma, sem pedir que Júlia fale.',
            to: 'conversa-turma',
            quality: 'construtiva',
            feedback:
              'Você distingue intenção de efeito, conecta o episódio ao conteúdo (a construção histórica de estereótipos sobre corpos negros) e protege Júlia ao não colocá-la como porta-voz. A turma é convidada a pensar, não apenas a obedecer.',
          },
          {
            label: 'Exigir: "Peça desculpas para a Júlia agora, na frente de todos."',
            to: 'depois-aula',
            quality: 'parcial',
            feedback:
              'Reconhecer o dano é importante, mas um pedido de desculpas forçado tende a ser vazio e mantém Júlia exposta diante da turma. A reparação costuma funcionar melhor depois de uma conversa que ajude Rafael a entender o que fez.',
          },
          {
            label: 'Perguntar diante da turma: "Júlia, você se ofendeu?"',
            to: 'depois-aula',
            quality: 'arriscada',
            feedback:
              'Colocar a estudante atingida no centro da cena transfere para ela a responsabilidade de "provar" a ofensa. Muitas vezes ela dirá que não se importou para encerrar a exposição. O problema não depende de Júlia ter se ofendido: a fala é inadequada em si.',
          },
        ],
      },
      silencio: {
        id: 'silencio',
        situation:
          'A aula segue. Alguns minutos depois, outro estudante cochicha algo e risadas voltam a surgir no fundo da sala. Júlia não participa mais da aula e evita olhar para os colegas.',
        options: [
          {
            label: 'Parar a aula e retomar: "Preciso voltar ao que aconteceu há pouco. Eu deveria ter falado antes: o comentário sobre o cabelo da Júlia foi racista."',
            to: 'conversa-turma',
            quality: 'construtiva',
            feedback:
              'Retomar um episódio é sempre possível e mostra coerência. Reconhecer que poderia ter agido antes também ensina: adultos podem rever suas atitudes. A turma percebe que o tema é sério.',
          },
          {
            label: 'Anotar o ocorrido e decidir conversar apenas com Rafael depois da aula.',
            to: 'depois-aula',
            quality: 'parcial',
            feedback:
              'A conversa individual é necessária, mas a turma inteira presenciou e riu. Sem uma palavra coletiva, o grupo não aprende sobre o limite, e Júlia não vê que foi defendida publicamente.',
          },
          {
            label: 'Ignorar novamente para não "dar palco" e terminar o conteúdo.',
            to: 'fim-alerta',
            quality: 'arriscada',
            feedback:
              'Ignorar repetidamente comunica que esse tipo de fala é tolerado. A preocupação em "não dar palco" é legítima em casos de provocação leve, mas ofensas racistas atingem uma pessoa concreta e exigem resposta.',
          },
        ],
      },
      confronto: {
        id: 'confronto',
        speaker: 'Rafael',
        situation:
          'Rafael se irrita: "Todo mundo riu, por que só eu?". A turma se divide: alguns defendem Rafael, outros ficam calados. Júlia parece ainda mais desconfortável.',
        options: [
          {
            label: 'Baixar o tom: "Eu me exaltei. Vou explicar por que essa fala é um problema, e isso vale para todos que riram." Em seguida, abrir uma conversa com a turma.',
            to: 'conversa-turma',
            quality: 'construtiva',
            feedback:
              'Reconhecer o próprio tom desarma a disputa e devolve o foco à fala racista. Ampliar a responsabilidade para quem riu é justo e evita transformar Rafael em bode expiatório, sem diminuir a gravidade do ocorrido.',
          },
          {
            label: 'Encaminhar Rafael à coordenação e seguir a aula sem comentar mais.',
            to: 'depois-aula',
            quality: 'parcial',
            feedback:
              'Acionar a coordenação pode ser necessário, mas, sem conversa com a turma, o episódio vira apenas uma punição individual. O grupo não reflete sobre o próprio riso, e o tema pode voltar.',
          },
          {
            label: 'Continuar a discussão com Rafael diante de todos até ele admitir o erro.',
            to: 'fim-alerta',
            quality: 'arriscada',
            feedback:
              'Uma disputa de poder em público raramente leva à reflexão: o estudante tende a se defender para não "perder" diante dos colegas. A aula se transforma em espetáculo, e Júlia fica exposta por mais tempo.',
          },
        ],
      },
      'conversa-turma': {
        id: 'conversa-turma',
        speaker: 'Pedro',
        situation:
          'Você abre a conversa e alguns estudantes dizem que nunca tinham pensado nisso. Pedro discorda: "Hoje em dia todo mundo se ofende com tudo. Não dá mais pra falar nada."',
        options: [
          {
            label: 'Acolher e devolver com perguntas e informação: "Por que algumas piadas sempre atingem os mesmos grupos? Sabiam que o racismo é crime no Brasil?" Relacionar com as imagens da aula.',
            to: 'depois-aula',
            quality: 'construtiva',
            feedback:
              'Tratar a fala de Pedro como ponto de partida, e não como afronta, mantém o diálogo aberto. Perguntas ajudam a turma a perceber padrões, e a informação (a lei, a história dos estereótipos) dá base para a discussão ir além de opiniões.',
          },
          {
            label: 'Fazer uma longa explicação sobre racismo estrutural até o fim da aula.',
            to: 'depois-aula',
            quality: 'parcial',
            feedback:
              'O conteúdo é relevante, mas uma exposição longa nesse momento tende a soar como sermão. A turma escuta menos do que quando é convidada a pensar e a falar. Combine explicação breve com perguntas.',
          },
          {
            label: 'Encerrar: "Aqui não tem discussão. Racismo é errado e ponto final."',
            to: 'fim-recomeco',
            quality: 'arriscada',
            feedback:
              'O limite está correto, mas encerrar a conversa impede que estudantes como Pedro elaborem suas ideias. Eles podem levar a discordância para fora da sala, sem mediação. Firmeza no limite e abertura para o diálogo podem coexistir.',
          },
        ],
      },
      'depois-aula': {
        id: 'depois-aula',
        situation:
          'A aula termina. Júlia sai rapidamente. Rafael fica conversando com os amigos perto da porta. Você tem alguns minutos antes da próxima turma.',
        options: [
          {
            label: 'Combinar uma conversa reservada com Júlia (oferecendo apoio, sem exigir relato), conversar com Rafael sobre responsabilidade e reparação, registrar o ocorrido e informar a coordenação conforme o protocolo da escola.',
            to: 'fim-acolhimento',
            quality: 'construtiva',
            feedback:
              'O cuidado depois da aula é tão importante quanto a reação imediata. Júlia precisa saber que a escola está ao lado dela; Rafael precisa de uma conversa que o ajude a compreender e reparar; e o registro garante continuidade institucional, sem depender só de você.',
          },
          {
            label: 'Chamar apenas Rafael para uma advertência.',
            to: 'fim-recomeco',
            quality: 'parcial',
            feedback:
              'Responsabilizar quem fez a fala é necessário, mas Júlia ficou sem acolhimento. Quem foi atingido deve ser a prioridade do cuidado, sempre respeitando o que ela deseja ou não falar.',
          },
          {
            label: 'Considerar o caso encerrado: "Já resolvi em sala."',
            to: 'fim-alerta',
            quality: 'arriscada',
            feedback:
              'Situações de racismo raramente se resolvem em um único momento. Sem acolhimento, registro e continuidade, o episódio pode se repetir, e a estudante atingida pode se afastar da escola.',
          },
        ],
      },
      'fim-acolhimento': {
        id: 'fim-acolhimento',
        situation:
          'Na semana seguinte, você retoma o tema com uma aula sobre estereótipos e representações da população negra. Júlia participa de novo. Rafael, depois da conversa, propõe ajudar a montar um mural sobre referências negras.',
        options: [],
        end: {
          title: 'Proteção, aprendizagem e continuidade',
          reflection:
            'Você interrompeu, protegeu quem foi atingido, transformou o episódio em aprendizagem e deu continuidade. Nem sempre o desfecho será tão positivo, mas esses passos aumentam muito a chance de a turma aprender e de a escola ser um lugar seguro para todos.',
        },
      },
      'fim-recomeco': {
        id: 'fim-recomeco',
        situation:
          'O episódio não se repetiu na sua aula, mas você percebe que parte da turma não entendeu bem o problema e que Júlia continua mais calada nas aulas.',
        options: [],
        end: {
          title: 'Um passo dado, outros a dar',
          reflection:
            'Você agiu, mas alguma parte ficou incompleta: o acolhimento de quem foi atingido ou o diálogo com a turma. Sempre é possível retomar: uma nova conversa, uma aula planejada sobre o tema, uma conversa reservada com a estudante.',
        },
      },
      'fim-alerta': {
        id: 'fim-alerta',
        situation:
          'Dias depois, a família de Júlia procura a escola: ela não quer mais ir à aula. Outros comentários parecidos aconteceram e ninguém interveio.',
        options: [],
        end: {
          title: 'O silêncio também ensina',
          reflection:
            'Quando a escola não reage ou reage apenas com confronto, a violência tende a se repetir. Reveja o caminho: onde seria possível interromper, nomear, proteger e dar continuidade? Converse com a coordenação sobre um protocolo para esses casos.',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Construa com a turma, no início do ano, acordos de convivência que nomeiem explicitamente racismo, machismo, homofobia e intolerância religiosa.',
          'Prepare uma frase curta para interromper falas ofensivas (por exemplo: "Vamos parar aqui. Essa fala ofende e não cabe na nossa sala.").',
          'Conheça o protocolo da escola para registrar e encaminhar casos de discriminação.',
          'Ao planejar temas sensíveis, antecipe possíveis comentários e pense em perguntas para mediar.',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Interrompa na hora, com voz calma e firme.',
          'Nomeie a fala, não a pessoa: "esse comentário é racista", e não "você é racista".',
          'Não peça que quem foi atingido explique ou prove que se ofendeu.',
          'Conecte com os acordos e com o conteúdo; abra espaço para perguntas.',
          'Se a tensão ficar alta, faça uma pausa e diga que o tema será retomado.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Converse em particular com quem foi atingido, oferecendo apoio e respeitando o que deseja ou não falar.',
          'Converse com quem fez a fala sobre impacto, responsabilidade e reparação.',
          'Registre o ocorrido e informe a coordenação conforme o protocolo.',
          'Planeje uma aula de continuidade sobre o tema, sem expor os envolvidos.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que frase você usaria para interromper uma fala ofensiva sem humilhar quem a fez?',
      'Como garantir que a pessoa atingida seja protegida e não exposta?',
      'O que a sua escola prevê para registrar e acompanhar casos de discriminação?',
      'Que conteúdos do seu planejamento poderiam prevenir situações como essa?',
    ],
  },

  // ───────────────────────── 2. Conduzir debates ─────────────────────────
  {
    id: 'conduzir-debates',
    title: 'Conduzir debates com evidências',
    topic: 'Argumentação, fontes e mediação de debates',
    durationMin: 20,
    summary:
      'Pratique como preparar e mediar um debate em que a turma usa evidências, avalia fontes, discorda com respeito e pode mudar de ideia.',
    artId: 'train-debates',
    status: 'disponivel',
    intro: [
      'Debates bem conduzidos desenvolvem argumentação, escuta e pensamento crítico. Mal conduzidos, viram disputas de quem fala mais alto, espalham informações falsas e deixam estudantes tímidos de fora.',
      'Alguns princípios ajudam: uma pergunta clara e realmente aberta, fontes selecionadas ou critérios para avaliá-las, papéis definidos, acordos de respeito (criticar ideias, não pessoas) e um fechamento que valorize evidências, e não "vencedores".',
      'Nesta simulação, uma turma de 9º ano vai debater uma proposta fictícia da prefeitura: transformar uma rua do bairro, hoje usada como estacionamento, em ciclovia e praça. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation: 'Você tem duas aulas para o debate. Como prepara a turma?',
        options: [
          {
            label: 'Apresentar a pergunta, entregar um pequeno dossiê com fontes variadas, definir papéis (falantes, checadores, relatores) e combinar critérios de bons argumentos.',
            to: 'abertura',
            quality: 'construtiva',
            feedback:
              'Preparação é metade de um bom debate. Fontes selecionadas reduzem a desinformação, papéis distribuem a participação e critérios explícitos mostram o que se espera: argumentos sustentados por evidências.',
          },
          {
            label: 'Dividir a turma em "a favor" e "contra" e pedir que pesquisem na internet em casa.',
            to: 'fonte-duvidosa',
            quality: 'parcial',
            feedback:
              'A pesquisa é valiosa, mas sem critérios para avaliar fontes a turma pode trazer qualquer coisa que encontrar primeiro. Lados fixos também podem dificultar que estudantes considerem argumentos contrários.',
          },
          {
            label: 'Abrir a discussão livremente na hora: "O que vocês acham?"',
            to: 'bate-boca',
            quality: 'arriscada',
            feedback:
              'Sem preparação, o debate tende a se apoiar em impressões e a ser dominado por quem fala mais. Há lugar para conversas livres, mas um debate com evidências precisa de estrutura.',
          },
        ],
      },
      abertura: {
        id: 'abertura',
        speaker: 'Larissa',
        situation:
          'O debate começa bem. Larissa afirma: "Vi num vídeo que ciclovias fazem o comércio da rua falir." Não há fonte, e o dado não está no dossiê.',
        options: [
          {
            label: 'Acionar os checadores: "Boa questão! De onde vem essa informação? Como podemos verificar?" e consultar o checklist de fontes.',
            to: 'checagem',
            quality: 'construtiva',
            feedback:
              'Você valoriza a preocupação legítima de Larissa (o comércio) e, ao mesmo tempo, ensina a verificar. Usar os papéis definidos tira o peso pessoal da checagem: não é "o professor contra Larissa", é um procedimento da turma.',
          },
          {
            label: 'Deixar passar para não interromper o fluxo.',
            to: 'fonte-duvidosa',
            quality: 'parcial',
            feedback:
              'Preservar o fluxo é importante, mas uma afirmação sem fonte aceita sem questionamento passa a valer como fato. Logo outros grupos trarão dados igualmente sem verificação.',
          },
          {
            label: 'Responder: "Isso é bobagem, vídeo de internet não vale nada."',
            to: 'bate-boca',
            quality: 'arriscada',
            feedback:
              'Desqualificar a fonte e a estudante ao mesmo tempo a constrange e não ensina como avaliar informações. Alguns vídeos trazem dados confiáveis; o que importa é saber verificar.',
          },
        ],
      },
      'fonte-duvidosa': {
        id: 'fonte-duvidosa',
        situation:
          'Os grupos trazem números contraditórios de sites e vídeos diferentes. A turma fica confusa e começa a discutir qual número é "o verdadeiro".',
        options: [
          {
            label: 'Pausar o debate para uma mini-oficina de dez minutos: quem publicou? Quando? Há outras fontes que confirmam? O dado se refere ao mesmo lugar?',
            to: 'checagem',
            quality: 'construtiva',
            feedback:
              'Transformar a confusão em aprendizagem sobre fontes é uma das maiores contribuições de um debate. Perguntas simples de verificação servem para a vida toda, inclusive fora da escola.',
          },
          {
            label: 'Dizer qual número está correto e seguir o debate.',
            to: 'sintese',
            quality: 'parcial',
            feedback:
              'Resolve o impasse rapidamente, mas a turma não aprende a decidir sozinha em quem confiar. Na próxima vez, dependerá de novo de uma autoridade.',
          },
          {
            label: 'Deixar que cada grupo defenda o seu número até alguém desistir.',
            to: 'bate-boca',
            quality: 'arriscada',
            feedback:
              'Sem critérios, vence quem tem mais força retórica, e não a melhor evidência. Isso ensina justamente o oposto do que um debate com evidências pretende.',
          },
        ],
      },
      'bate-boca': {
        id: 'bate-boca',
        speaker: 'Diego',
        situation:
          'O clima esquenta. Diego diz a um colega: "Você só defende isso porque não tem carro na sua família." Risadas e protestos tomam a sala.',
        options: [
          {
            label: 'Pausar, retomar o acordo "criticamos ideias, não pessoas" e pedir que cada um repita, com suas palavras, o argumento do outro antes de responder.',
            to: 'checagem',
            quality: 'construtiva',
            feedback:
              'Ataques pessoais, especialmente sobre condição social, precisam ser interrompidos. A técnica de parafrasear obriga a escutar e costuma baixar a temperatura, devolvendo o debate às ideias.',
          },
          {
            label: 'Encerrar o debate e passar um exercício escrito.',
            to: 'fim-interrompido',
            quality: 'parcial',
            feedback:
              'Encerrar protege a turma de um conflito maior, mas perde a oportunidade de ensinar a discordar. Se precisar encerrar, explique o motivo e combine como o debate será retomado.',
          },
          {
            label: 'Tomar partido: "O Diego tem razão, quem não tem carro não entende o problema."',
            to: 'fim-interrompido',
            quality: 'arriscada',
            feedback:
              'Quando o mediador toma partido, especialmente validando um ataque pessoal, o espaço deixa de ser seguro para discordar. O estudante atacado e quem pensa como ele tendem a se calar.',
          },
        ],
      },
      checagem: {
        id: 'checagem',
        speaker: 'Larissa',
        situation:
          'A turma verifica as informações. Larissa diz: "Mudei de ideia sobre o comércio, mas ainda acho que falta pensar nos idosos." Você nota que Ana, uma estudante muito tímida, ainda não falou.',
        options: [
          {
            label: 'Valorizar a mudança de Larissa como sinal de bom raciocínio e convidar Ana por outra via: escrever o argumento num cartão, que o relator lê, ou falar primeiro em dupla.',
            to: 'sintese',
            quality: 'construtiva',
            feedback:
              'Mudar de ideia diante de evidências é o que se espera de um bom debatedor, e reconhecer isso em público muda a cultura da turma. Oferecer formas alternativas de participação respeita estudantes tímidos sem deixá-los de fora.',
          },
          {
            label: 'Seguir com quem já está participando, para aproveitar o ritmo.',
            to: 'sintese',
            quality: 'parcial',
            feedback:
              'O ritmo se mantém, mas parte da turma fica de fora. Debates que dependem só dos mais falantes reforçam desigualdades de participação.',
          },
          {
            label: 'Brincar: "Ih, a Larissa perdeu o debate!" e chamar Ana diretamente para falar na frente de todos.',
            to: 'sintese',
            quality: 'arriscada',
            feedback:
              'Tratar a mudança de ideia como derrota desestimula a honestidade intelectual. E expor uma estudante tímida sem aviso costuma gerar ansiedade, não participação.',
          },
        ],
      },
      sintese: {
        id: 'sintese',
        situation: 'Faltam quinze minutos para o fim da aula. Como você fecha o debate?',
        options: [
          {
            label: 'Construir com a turma uma síntese: argumentos mais fortes de cada posição, evidências usadas, pontos de acordo e de desacordo e o que ainda precisariam saber.',
            to: 'fim-evidencias',
            quality: 'construtiva',
            feedback:
              'A síntese coletiva mostra que o objetivo era compreender melhor o problema, e não vencer. Registrar consensos, dissensos e lacunas ensina que boas decisões públicas consideram vários pontos de vista.',
          },
          {
            label: 'Fazer uma votação para ver qual lado ganhou.',
            to: 'fim-placar',
            quality: 'parcial',
            feedback:
              'Votações podem ser um bom fechamento quando a pergunta envolve uma decisão, mas, sozinhas, reforçam a lógica de "ganhar". Combine com uma reflexão sobre os argumentos e as evidências.',
          },
          {
            label: 'Dar a sua opinião como a resposta correta.',
            to: 'fim-placar',
            quality: 'arriscada',
            feedback:
              'Em questões realmente abertas, apresentar a opinião do professor como conclusão encerra o pensamento da turma e pode fazer estudantes sentirem que suas posições não eram legítimas.',
          },
        ],
      },
      'fim-evidencias': {
        id: 'fim-evidencias',
        situation:
          'A turma produz um quadro-síntese e decide escrever uma carta à prefeitura (fictícia) com perguntas e sugestões, incluindo a preocupação com os idosos levantada por Larissa e uma ideia de Ana.',
        options: [],
        end: {
          title: 'Debate como construção coletiva',
          reflection:
            'Preparação, verificação de fontes, mediação respeitosa e síntese coletiva transformaram o debate em aprendizagem. A turma praticou argumentação com evidências e viu que mudar de ideia é sinal de bom pensamento.',
        },
      },
      'fim-placar': {
        id: 'fim-placar',
        situation:
          'O debate termina com um lado "vencedor". Alguns estudantes comemoram; outros saem frustrados. Poucos lembram quais evidências foram usadas.',
        options: [],
        end: {
          title: 'Um placar sem síntese',
          reflection:
            'A turma participou, mas o foco final ficou em ganhar ou perder. Na próxima vez, reserve tempo para uma síntese dos argumentos e das evidências e para refletir sobre como cada um pensou.',
        },
      },
      'fim-interrompido': {
        id: 'fim-interrompido',
        situation:
          'O debate é interrompido em clima tenso. Alguns estudantes dizem que não querem mais debater em aula.',
        options: [],
        end: {
          title: 'Quando o debate vira disputa',
          reflection:
            'Sem estrutura e mediação, debates podem virar ataques pessoais. Reveja: que acordos, papéis e fontes poderiam ter mantido a discussão nas ideias? Retome com a turma o que aconteceu antes de propor um novo debate.',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Escolha uma pergunta realmente aberta, relevante para a turma e com evidências disponíveis.',
          'Monte um dossiê curto com fontes variadas e confiáveis, ou um checklist para avaliar fontes.',
          'Defina papéis: falantes, checadores, relatores e mediador de tempo.',
          'Combine critérios de bons argumentos e o acordo "criticamos ideias, não pessoas".',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Peça a fonte de toda afirmação com dados e use os checadores para verificar.',
          'Interrompa ataques pessoais e peça que o estudante parafraseie o argumento do colega antes de responder.',
          'Ofereça formas alternativas de participação (cartões escritos, falas em dupla).',
          'Valorize publicamente quem muda de ideia diante de evidências.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Faça uma síntese coletiva: argumentos fortes, evidências, consensos, dissensos e lacunas.',
          'Peça um registro individual: "O que eu pensava antes, o que penso agora e por quê."',
          'Avalie a qualidade dos argumentos, não a posição defendida.',
        ],
      },
    ],
    reflectionQuestions: [
      'Como você escolhe uma pergunta de debate que seja realmente aberta?',
      'Que estratégias usa para que estudantes tímidos participem?',
      'Como reage quando um estudante traz uma informação falsa?',
      'De que forma o fechamento do debate mostra o que você valoriza?',
    ],
  },

  // ───────────────────────── 3. Jogos pedagógicos ─────────────────────────
  {
    id: 'jogos-pedagogicos',
    title: 'Uso pedagógico de jogos',
    topic: 'Competição, cooperação e inclusão em jogos',
    durationMin: 20,
    summary:
      'Pratique como planejar e mediar um jogo em sala quando a competição esquenta, alguns estudantes dominam e outros ficam de fora.',
    artId: 'train-jogos',
    status: 'disponivel',
    intro: [
      'Jogos aumentam o engajamento, permitem errar sem medo e tornam visível o que a turma pensa. Mas um jogo mal mediado pode reforçar exclusões, gerar conflitos e desviar o foco da aprendizagem para o placar.',
      'Bons jogos pedagógicos têm objetivo de aprendizagem claro, regras que distribuem a participação, equipes equilibradas, espaço para o erro e um momento final de conversa sobre o que foi aprendido.',
      'Nesta simulação, você aplica um quiz em equipes sobre frações com uma turma de 7º ano. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation: 'Você vai aplicar o quiz em equipes. Como organiza a atividade?',
        options: [
          {
            label: 'Definir o objetivo de aprendizagem, formar equipes heterogêneas, criar papéis rotativos (quem lê, quem registra, quem responde) e pontuar também a colaboração.',
            to: 'partida',
            quality: 'construtiva',
            feedback:
              'Equipes equilibradas e papéis rotativos garantem que todos participem. Pontuar a colaboração sinaliza que o processo importa, não apenas o acerto rápido.',
          },
          {
            label: 'Deixar que dois estudantes escolham suas equipes.',
            to: 'exclusao',
            quality: 'parcial',
            feedback:
              'É rápido e os estudantes gostam, mas a escolha pública costuma deixar sempre os mesmos por último, o que pode ser doloroso e reforçar exclusões.',
          },
          {
            label: 'Anunciar um prêmio para a equipe vencedora e exibir um ranking individual de acertos.',
            to: 'tensao',
            quality: 'arriscada',
            feedback:
              'Prêmios e rankings individuais aumentam a pressão e deslocam o foco para o resultado. Estudantes com mais dificuldade tendem a se retrair ou a ser culpados pela equipe.',
          },
        ],
      },
      partida: {
        id: 'partida',
        situation:
          'O jogo começa animado. Na equipe Azul, Caio e Marina respondem tudo antes que os colegas consigam pensar. Os outros três apenas observam.',
        options: [
          {
            label: 'Introduzir uma regra: 30 segundos para a equipe pensar junta e, depois, quem responde é sorteado. Toda a equipe precisa saber explicar a resposta.',
            to: 'erro',
            quality: 'construtiva',
            feedback:
              'A regra muda o incentivo: agora, para pontuar, Caio e Marina precisam ensinar os colegas. A participação passa a ser uma necessidade do jogo, e não um pedido do professor.',
          },
          {
            label: 'Pedir a Caio e Marina: "Deixem os colegas responderem também."',
            to: 'exclusao',
            quality: 'parcial',
            feedback:
              'O pedido é justo, mas, sem mudança na regra, a vontade de ganhar costuma falar mais alto. Em pouco tempo o padrão volta.',
          },
          {
            label: 'Tirar pontos da equipe Azul como punição.',
            to: 'tensao',
            quality: 'arriscada',
            feedback:
              'A punição atinge toda a equipe, inclusive quem estava sendo excluído, e gera ressentimento. O problema era de estrutura do jogo, não de mau comportamento.',
          },
        ],
      },
      exclusao: {
        id: 'exclusao',
        speaker: 'Bia',
        situation:
          'Você percebe que Bia está sentada um pouco afastada da equipe. Ninguém passa a vez para ela, e um colega comenta baixinho: "Melhor não deixar ela responder, senão a gente perde."',
        options: [
          {
            label: 'Reorganizar os papéis de todas as equipes de forma discreta, dando a Bia uma função valorizada, e depois conversar com a equipe sobre os acordos, sem expô-la.',
            to: 'erro',
            quality: 'construtiva',
            feedback:
              'Mudar a estrutura para todas as equipes evita apontar Bia como "problema". A conversa sobre acordos trata o comentário excludente sem colocá-la no centro da cena.',
          },
          {
            label: 'Chamar Bia para ser sua ajudante, marcando o placar.',
            to: 'final-jogo',
            quality: 'parcial',
            feedback:
              'Bia deixa de ser excluída pela equipe, mas também deixa de aprender com o jogo. Funções fora da atividade podem ser úteis em alguns casos, mas não resolvem a exclusão.',
          },
          {
            label: 'Parar o jogo e dizer em voz alta: "Vocês estão excluindo a Bia!"',
            to: 'tensao',
            quality: 'arriscada',
            feedback:
              'A intenção é proteger, mas expor Bia diante da turma pode aumentar o constrangimento e a sensação de ser "a que atrapalha". Intervenções sobre exclusão funcionam melhor de forma discreta e estrutural.',
          },
        ],
      },
      tensao: {
        id: 'tensao',
        speaker: 'Gabriel',
        situation:
          'A disputa esquenta. Gabriel acusa outra equipe de "roubar" uma resposta, e uma equipe que está perdendo desanima e para de participar.',
        options: [
          {
            label: 'Pausar o jogo, nomear o que está acontecendo ("estamos ficando mais preocupados com o placar do que com as frações"), retomar o objetivo e propor um desafio final cooperativo, em que a turma toda soma pontos.',
            to: 'erro',
            quality: 'construtiva',
            feedback:
              'A pausa permite que as emoções baixem. Retomar o objetivo reorienta o grupo, e um desafio cooperativo reintegra a equipe desanimada e muda a lógica de "nós contra eles".',
          },
          {
            label: 'Anular a rodada em disputa e seguir.',
            to: 'final-jogo',
            quality: 'parcial',
            feedback:
              'Resolve o conflito imediato, mas não trata o desânimo da equipe perdedora nem o clima de rivalidade. O problema pode reaparecer na próxima rodada.',
          },
          {
            label: 'Manter as regras e o prêmio: "Faz parte do jogo, quem perder, perdeu."',
            to: 'fim-competicao',
            quality: 'arriscada',
            feedback:
              'Ignorar o clima deixa a competição dominar. Estudantes que perdem repetidamente aprendem que "não são bons" na matéria, e o objetivo de aprendizagem se perde.',
          },
        ],
      },
      erro: {
        id: 'erro',
        situation:
          'Em uma pergunta, quase todas as equipes respondem que 1/3 é menor que 1/4 "porque 3 é menor que 4". O erro se repete.',
        options: [
          {
            label: 'Fazer uma pausa: "Por que faz sentido pensar assim? Vamos testar com uma pizza dividida em 3 e outra em 4." Usar o erro como ponto de aprendizagem.',
            to: 'final-jogo',
            quality: 'construtiva',
            feedback:
              'Erros frequentes revelam concepções comuns, e o jogo acabou de mostrá-las. Explorar o raciocínio por trás do erro, com material concreto, transforma o jogo em ferramenta de diagnóstico e ensino.',
          },
          {
            label: 'Mostrar a resposta certa e passar para a próxima pergunta.',
            to: 'final-jogo',
            quality: 'parcial',
            feedback:
              'O jogo continua, mas a concepção equivocada permanece. Anote o erro para retomá-lo depois, se não houver tempo de pausar agora.',
          },
          {
            label: 'Comentar: "Nossa, essa era fácil, hein?"',
            to: 'fim-competicao',
            quality: 'arriscada',
            feedback:
              'Ironizar um erro coletivo envergonha a turma e ensina que errar é motivo de vergonha, o oposto do que um jogo pedagógico deveria promover.',
          },
        ],
      },
      'final-jogo': {
        id: 'final-jogo',
        situation: 'O jogo termina. Faltam dez minutos de aula. O que você faz?',
        options: [
          {
            label: 'Conduzir uma conversa: o que aprendemos sobre frações? Que perguntas foram difíceis? Como cada equipe colaborou? Registrar as respostas no quadro.',
            to: 'fim-aprendizagem',
            quality: 'construtiva',
            feedback:
              'A conversa final transforma a experiência do jogo em aprendizagem consciente, tanto do conteúdo quanto da colaboração. Também oferece dados para planejar as próximas aulas.',
          },
          {
            label: 'Anunciar a equipe vencedora e passar para o próximo conteúdo.',
            to: 'fim-placar',
            quality: 'parcial',
            feedback:
              'Reconhecer o desempenho é legítimo, mas, sem uma conversa final, o que fica na memória é o placar, e não as frações.',
          },
          {
            label: 'Colar no mural um ranking individual de acertos.',
            to: 'fim-competicao',
            quality: 'arriscada',
            feedback:
              'Rankings individuais públicos expõem estudantes com dificuldade e podem afetar sua relação com a matéria por muito tempo.',
          },
        ],
      },
      'fim-aprendizagem': {
        id: 'fim-aprendizagem',
        situation:
          'A turma sai comentando a "pizza dividida em 3 e em 4". Bia explica a um colega por que 1/3 é maior que 1/4. Na aula seguinte, pedem para jogar de novo.',
        options: [],
        end: {
          title: 'Jogo a serviço da aprendizagem',
          reflection:
            'Regras que distribuem a participação, mediação dos conflitos, uso pedagógico do erro e conversa final fizeram do jogo uma ferramenta de aprendizagem e de convivência.',
        },
      },
      'fim-placar': {
        id: 'fim-placar',
        situation:
          'A turma se divertiu, mas na aula seguinte muitos ainda acham que 1/3 é menor que 1/4. A equipe vencedora lembra apenas que ganhou.',
        options: [],
        end: {
          title: 'Diversão sem fechamento',
          reflection:
            'O engajamento foi alto, mas a aprendizagem não foi consolidada. Reserve sempre alguns minutos para conversar sobre o que o jogo revelou e retomar os erros mais frequentes.',
        },
      },
      'fim-competicao': {
        id: 'fim-competicao',
        situation:
          'Alguns estudantes saem chateados, um grupo reclama de injustiça e outros dizem que "não são bons em matemática". O conteúdo ficou em segundo plano.',
        options: [],
        end: {
          title: 'Quando o placar vence a aprendizagem',
          reflection:
            'A competição sem mediação reforçou exclusões e inseguranças. Reveja a estrutura: equipes, papéis, regras de participação, tratamento do erro e fechamento. Considere desafios cooperativos para a próxima vez.',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Defina o objetivo de aprendizagem do jogo e como vai perceber se ele foi alcançado.',
          'Forme equipes heterogêneas você mesmo, evitando escolhas públicas.',
          'Crie regras que distribuam a participação: papéis rotativos, sorteio de quem responde, tempo para pensar em grupo.',
          'Planeje um momento cooperativo e reserve tempo para a conversa final.',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Observe quem está participando e quem está de fora; ajuste regras para todas as equipes, de forma discreta.',
          'Quando a competição esquentar, pause, nomeie o que está acontecendo e retome o objetivo.',
          'Trate erros frequentes como pistas: pare e explore o raciocínio da turma.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Converse sobre o que foi aprendido e sobre como as equipes colaboraram.',
          'Registre os erros mais frequentes para planejar as próximas aulas.',
          'Evite rankings individuais públicos; prefira registros coletivos de aprendizagem.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que regras você pode criar para que todos participem do jogo?',
      'Como perceber, durante o jogo, que alguém está sendo excluído?',
      'Que equilíbrio você busca entre competição e cooperação?',
      'Como usar os erros revelados pelo jogo para planejar a próxima aula?',
    ],
  },

  // ───────────────────────── Em preparo ─────────────────────────
  {
    id: 'aprendizagem-por-projetos',
    title: 'Aprendizagem baseada em projetos',
    topic: 'Planejamento e mediação de projetos',
    durationMin: 20,
    summary:
      'Pratique como conduzir um projeto com pergunta motivadora, etapas claras, produto final e avaliação ao longo do processo.',
    artId: 'train-projetos',
    status: 'disponivel',
    intro: [
      'Projetos permitem que os estudantes investiguem problemas reais, mobilizem conhecimentos de várias áreas e produzam algo que faça sentido fora da sala. Mas, sem planejamento e mediação, um projeto pode virar uma sequência de tarefas soltas, uma cópia de textos prontos ou um trabalho feito por poucos.',
      'Bons projetos partem de uma pergunta motivadora aberta e ligada à realidade da turma, têm etapas e produtos intermediários, distribuem responsabilidades nos grupos e acompanham a aprendizagem durante o percurso, e não apenas na entrega final.',
      'Nesta simulação, você inicia com uma turma de 7º ano um projeto sobre o problema da água e do lixo no bairro da escola. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Na primeira aula, a turma comenta que o córrego perto da escola vive cheio de lixo e que, quando chove, a rua alaga. Você quer transformar isso em projeto. Como formula a pergunta motivadora?',
        options: [
          {
            label: 'Apresentar o tema com uma pergunta pronta: “O que é poluição da água?”',
            to: 'grupos',
            quality: 'parcial',
            feedback:
              'O tema é pertinente, mas a pergunta é conceitual e fechada: pode ser respondida com uma definição. Uma pergunta motivadora precisa de investigação, de escolhas e de um destinatário real para fazer sentido.',
          },
          {
            label: 'Escutar as observações da turma e construir junto uma pergunta aberta e local, como “O que podemos fazer para reduzir o lixo que chega ao córrego do nosso bairro?”, registrando o que já sabem e o que querem descobrir.',
            to: 'grupos',
            quality: 'construtiva',
            feedback:
              'Partir do que os estudantes observam aumenta o sentido e o engajamento. Uma pergunta aberta, ligada ao território e orientada à ação, exige investigação e abre espaço para diferentes respostas e produtos.',
          },
          {
            label: 'Entregar um roteiro de pesquisa com dez perguntas sobre o ciclo da água para responder em casa.',
            to: 'copiar',
            quality: 'arriscada',
            feedback:
              'Um questionário pronto transforma o projeto em tarefa de busca de respostas. Sem problema real para resolver, a tendência é procurar e copiar textos prontos, e a curiosidade inicial da turma se perde.',
          },
        ],
      },
      grupos: {
        id: 'grupos',
        situation:
          'Chegou a hora de formar os grupos. Você sabe que alguns estudantes costumam fazer tudo sozinhos e outros ficam só olhando. Como organiza?',
        options: [
          {
            label: 'Deixar a turma se agrupar por afinidade e pedir que dividam o trabalho como acharem melhor.',
            to: 'copiar',
            quality: 'parcial',
            feedback:
              'Grupos por afinidade podem funcionar bem, mas sem papéis e combinados a divisão costuma ficar desigual: quem já se destaca assume tudo e quem tem mais dificuldade fica de fora.',
          },
          {
            label: 'Montar um único grupo grande com a turma toda, para “ninguém ficar sozinho”.',
            to: 'desanimo',
            quality: 'arriscada',
            feedback:
              'Em um grupo muito grande, é fácil se esconder. A responsabilidade se dilui, poucos falam e a maioria perde o vínculo com o trabalho, o que costuma aparecer como desinteresse ao longo do projeto.',
          },
          {
            label: 'Formar grupos heterogêneos de quatro ou cinco, com papéis rotativos (pesquisa, registro, comunicação, organização), um contrato de grupo e um quadro de tarefas visível com prazos de cada etapa.',
            to: 'copiar',
            quality: 'construtiva',
            feedback:
              'Papéis, combinados e tarefas visíveis tornam a contribuição de cada um necessária e acompanhável. O rodízio garante que todos experimentem funções diferentes e desenvolvam habilidades variadas.',
          },
        ],
      },
      copiar: {
        id: 'copiar',
        speaker: 'Rafael',
        situation:
          'Na etapa de pesquisa, o grupo de Rafael chega com várias páginas impressas. Rafael diz: “Professora, a gente já achou tudo na internet, é só copiar e colar no cartaz.”',
        options: [
          {
            label: 'Valorizar a busca e propor: “Ótimo ponto de partida. Agora, o que esses textos dizem sobre o nosso córrego?” Pedir que comparem fontes, registrem com as próprias palavras e planejem uma observação ou entrevista no bairro.',
            to: 'desanimo',
            quality: 'construtiva',
            feedback:
              'Reconhecer o esforço evita a resistência, e a pergunta devolve o foco ao problema local. Comparar fontes, citar de onde veio cada informação e coletar dados no território desenvolvem pesquisa e autoria, em vez de reprodução.',
          },
          {
            label: 'Aceitar o material, mas avisar que vale menos ponto se estiver copiado.',
            to: 'desanimo',
            quality: 'parcial',
            feedback:
              'Sinalizar o critério é útil, mas sem mostrar como transformar a informação o grupo não sabe o que fazer diferente. Orientar como resumir, citar e relacionar com o bairro é mais eficaz que apenas descontar pontos.',
          },
          {
            label: 'Recolher as folhas na frente da turma e dizer que “copiar é cola” e que o grupo vai começar do zero.',
            to: 'fim-cumprimento',
            quality: 'arriscada',
            feedback:
              'Expor o grupo gera constrangimento e desmotivação, e não ensina a pesquisar. Muitos estudantes ainda não sabem a diferença entre consultar uma fonte e copiá-la: isso precisa ser ensinado, não apenas punido.',
          },
        ],
      },
      desanimo: {
        id: 'desanimo',
        situation:
          'Na terceira semana, o entusiasmo cai. Alguns grupos dizem que o projeto “não acaba nunca”, Yasmin pergunta se pode fazer outra coisa e várias tarefas do quadro estão atrasadas.',
        options: [
          {
            label: 'Fazer uma roda rápida para entender o que está difícil, retomar a pergunta motivadora, mostrar o que já foi conquistado e combinar uma meta curta com produto intermediário para a próxima aula.',
            to: 'avaliacao',
            quality: 'construtiva',
            feedback:
              'Quedas de engajamento no meio do projeto são comuns. Escutar a turma revela o obstáculo real, e metas curtas com entregas visíveis devolvem a sensação de progresso e de propósito.',
          },
          {
            label: 'Encerrar o projeto antes do previsto e dar uma prova sobre o conteúdo.',
            to: 'fim-abandono',
            quality: 'arriscada',
            feedback:
              'Abandonar o projeto quando surge a dificuldade ensina que o trabalho investido não importava. A queda de motivação era um sinal para ajustar a mediação, não para desistir da proposta.',
          },
          {
            label: 'Lembrar a turma do prazo final e cobrar que coloquem as tarefas em dia.',
            to: 'avaliacao',
            quality: 'parcial',
            feedback:
              'Prazos ajudam a organizar, mas apenas cobrar não trata a causa do desânimo, que pode ser uma etapa longa demais, um grupo travado ou falta de clareza sobre o próximo passo.',
          },
        ],
      },
      avaliacao: {
        id: 'avaliacao',
        situation:
          'Os grupos têm os primeiros rascunhos: mapas do bairro, registros de entrevistas e ideias de solução. Como você acompanha a aprendizagem neste ponto?',
        options: [
          {
            label: 'Recolher os rascunhos e guardar para corrigir tudo junto com o produto final.',
            to: 'fim-cumprimento',
            quality: 'arriscada',
            feedback:
              'Avaliar só no fim tira dos grupos a chance de melhorar. Os erros e lacunas dos rascunhos chegam intactos à entrega, e a avaliação vira apenas uma nota, sem função de aprendizagem.',
          },
          {
            label: 'Apresentar uma rubrica construída com a turma, promover uma rodada de devolutivas entre grupos (“um ponto forte, uma sugestão”) e dar retorno escrito a cada grupo, com tempo em aula para revisarem.',
            to: 'produto',
            quality: 'construtiva',
            feedback:
              'Critérios claros, devolutivas entre pares e retorno do professor tornam a avaliação formativa: os estudantes sabem onde estão, onde precisam chegar e têm tempo para revisar. Isso também desenvolve autonomia e capacidade de autoavaliação.',
          },
          {
            label: 'Passar pelos grupos dando sugestões orais rápidas.',
            to: 'produto',
            quality: 'parcial',
            feedback:
              'O acompanhamento próximo é valioso, mas sem critérios compartilhados e registro as sugestões se perdem, e fica difícil para o grupo e para você perceber o avanço ao longo das etapas.',
          },
        ],
      },
      produto: {
        id: 'produto',
        situation:
          'Faltam duas semanas. A turma precisa definir o produto final que responde à pergunta motivadora. O que você propõe?',
        options: [
          {
            label: 'Pedir que cada grupo faça um cartaz para ser exposto na sala.',
            to: 'fim-cumprimento',
            quality: 'parcial',
            feedback:
              'O cartaz organiza o que foi aprendido, mas, se fica só dentro da sala, a pergunta “o que podemos fazer pelo nosso bairro?” não ganha resposta. Pensar em um público real aumenta o sentido e o cuidado com a qualidade.',
          },
          {
            label: 'Planejar com a turma um produto para um público real (por exemplo, uma campanha para a comunidade escolar ou uma carta com propostas a órgãos responsáveis), com apresentação pública e autoavaliação final de cada estudante e do grupo.',
            to: 'fim-comunidade',
            quality: 'construtiva',
            feedback:
              'Um produto com público real dá propósito ao trabalho e mobiliza comunicação, argumentação e cidadania. A apresentação e a autoavaliação final fecham o ciclo, ajudando cada estudante a reconhecer o que aprendeu e como contribuiu.',
          },
          {
            label: 'Escolher você mesmo o produto mais vistoso, uma maquete do bairro, e assumir a montagem para garantir que fique bonita na feira.',
            to: 'fim-abandono',
            quality: 'arriscada',
            feedback:
              'Quando o professor decide e executa o produto, a autoria passa para o adulto. A turma deixa de responder à própria pergunta, e a aparência do resultado passa a valer mais que o processo de aprendizagem.',
          },
        ],
      },
      'fim-comunidade': {
        id: 'fim-comunidade',
        situation:
          'Os grupos apresentam a campanha para outras turmas e familiares. Rafael explica, com as próprias palavras, de onde vem o lixo do córrego, e Yasmin conduz a parte das propostas. Na autoavaliação, vários estudantes dizem que nunca tinham reparado no próprio bairro desse jeito.',
        options: [],
        end: {
          title: 'Projeto com sentido e autoria',
          reflection:
            'Pergunta motivadora ligada à realidade, grupos com papéis, mediação da pesquisa, avaliação ao longo do caminho e produto com público real fizeram do projeto uma experiência de aprendizagem e de participação.',
        },
      },
      'fim-cumprimento': {
        id: 'fim-cumprimento',
        situation:
          'Os trabalhos são entregues no prazo, mas parecem muito iguais entre si. Poucos estudantes conseguem explicar o que descobriram sobre o córrego, e em alguns grupos uma única pessoa fez quase tudo.',
        options: [],
        end: {
          title: 'Projeto entregue, aprendizagem rasa',
          reflection:
            'O projeto foi concluído, mas virou tarefa a cumprir. Reveja a pergunta motivadora, a mediação da pesquisa, os momentos de devolutiva durante o percurso e o público do produto final.',
        },
      },
      'fim-abandono': {
        id: 'fim-abandono',
        situation:
          'A turma sente que o projeto “não era de verdade”. Quando você propõe um novo projeto no bimestre seguinte, a reação é: “De novo? Não dá em nada.”',
        options: [],
        end: {
          title: 'Quando o projeto se perde pelo caminho',
          reflection:
            'Diante das dificuldades, o projeto foi interrompido ou tirado das mãos dos estudantes, e a confiança na proposta diminuiu. Planeje etapas curtas, acompanhe o engajamento e mantenha a autoria com a turma, mesmo que o resultado seja menos vistoso.',
        },
      },
    },
    script: [
      {
        title: 'Antes do projeto',
        steps: [
          'Parta de um problema real e próximo da turma e construa com ela uma pergunta motivadora aberta e orientada à ação.',
          'Divida o projeto em etapas curtas, cada uma com um produto intermediário e um prazo visível.',
          'Forme grupos heterogêneos, defina papéis rotativos e um contrato de grupo.',
          'Elabore com a turma critérios de avaliação (rubrica) e planeje os momentos de devolutiva.',
          'Defina o público do produto final e combine com a escola como ele será apresentado.',
        ],
      },
      {
        title: 'Durante o projeto',
        steps: [
          'Ensine a pesquisar: comparar fontes, registrar a origem das informações e escrever com as próprias palavras.',
          'Incentive a coleta de dados no território, como observações, fotos e entrevistas, com os cuidados combinados.',
          'Acompanhe o quadro de tarefas e a contribuição de cada estudante, não apenas o resultado do grupo.',
          'Quando o engajamento cair, escute a turma, retome a pergunta motivadora e combine metas curtas.',
          'Use os rascunhos para devolutivas entre pares e do professor, com tempo em aula para revisar.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Realize a apresentação para o público combinado e registre as reações e os retornos recebidos.',
          'Proponha autoavaliação individual e avaliação do grupo com base na rubrica.',
          'Converse com a turma sobre o que aprenderam sobre o tema e sobre trabalhar em projeto.',
          'Registre o que funcionou e o que ajustar para o próximo projeto.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que problema real da sua comunidade escolar poderia virar uma boa pergunta motivadora?',
      'Como garantir que cada estudante contribua de forma significativa no trabalho em grupo?',
      'Em que momentos do projeto você pode avaliar para que os estudantes ainda tenham tempo de melhorar?',
      'Como manter a autoria da turma quando o projeto enfrenta dificuldades ou atrasos?',
    ],
  },
  {
    id: 'inclusao-e-adaptacao',
    title: 'Inclusão e adaptação',
    topic: 'Educação inclusiva',
    durationMin: 20,
    summary:
      'Como adaptar atividades para que todos os estudantes participem e aprendam, considerando diferentes necessidades.',
    artId: 'train-inclusao',
    status: 'disponivel',
    intro: [
      'Incluir não é dar uma atividade “mais fácil” a alguns estudantes, e sim remover as barreiras que impedem cada um de participar e aprender. A Lei Brasileira de Inclusão (Lei 13.146/2015) entende a deficiência a partir da interação da pessoa com barreiras, o que desloca o foco do estudante para o ambiente, os materiais e as práticas.',
      'Princípios do Desenho Universal para a Aprendizagem (DUA) ajudam nesse planejamento: oferecer mais de uma forma de acessar a informação, mais de uma forma de participar e de mostrar o que se aprendeu, e diferentes caminhos para manter o envolvimento. Quando essas opções são para toda a turma, ninguém precisa ser apontado como “diferente”.',
      'Nesta simulação, você planeja e conduz uma aula de Geografia sobre leitura de mapas com uma turma de 6º ano. Entre os estudantes estão Helena, que tem baixa visão; Davi, que tem diagnóstico de TDAH e costuma ter dificuldade de se manter em tarefas longas; e Nadia, que chegou do Haiti há poucos meses e está aprendendo português. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Você vai planejar uma atividade em que os grupos leem um mapa do bairro da escola, localizam pontos de referência e depois apresentam um trajeto. Como começa o planejamento?',
        options: [
          {
            label: 'Fazer uma folha separada, com menos questões, para Helena, Davi e Nadia, e entregar a eles no início da aula.',
            to: 'exposicao',
            quality: 'parcial',
            feedback:
              'A intenção de ajudar é boa, mas reduzir o conteúdo pode baixar a expectativa de aprendizagem, e uma folha diferente entregue só a três estudantes marca publicamente quem “precisa de ajuda”.',
          },
          {
            label: 'Planejar a atividade já com opções para toda a turma (mapa ampliado e com alto contraste, legenda com ícones, instruções em etapas curtas, palavras-chave ilustradas) e conversar antes com a professora do AEE sobre os recursos que funcionam para Helena.',
            to: 'aee',
            quality: 'construtiva',
            feedback:
              'Pensar as barreiras desde o planejamento é o centro do DUA: opções disponíveis para todos beneficiam muitos estudantes e evitam expor alguém. Buscar o AEE antes da aula aproveita quem conhece de perto os recursos de acessibilidade de Helena.',
          },
          {
            label: 'Manter a atividade igual para todos e resolver as dificuldades na hora, conforme aparecerem.',
            to: 'atividade',
            quality: 'arriscada',
            feedback:
              'Algumas barreiras são previsíveis: um mapa com letras pequenas é inacessível para quem tem baixa visão, e instruções longas e só faladas dificultam a vida de quem está aprendendo português. Improvisar na hora costuma gerar espera, frustração e exposição.',
          },
        ],
      },
      aee: {
        id: 'aee',
        speaker: 'Professora do AEE',
        situation:
          'A professora do Atendimento Educacional Especializado conta que Helena lê bem com letras ampliadas e bom contraste, usa uma lupa manual e prefere sentar perto da janela, mas não de frente para o reflexo. Ela sugere conversar também com a própria Helena. Como você segue?',
        options: [
          {
            label: 'Pedir à professora do AEE que prepare sozinha o material adaptado e apenas recebê-lo no dia da aula.',
            to: 'atividade',
            quality: 'parcial',
            feedback:
              'O material chega, mas o AEE complementa a sala comum; ele não a substitui. Sem planejamento conjunto, a adaptação pode não conversar com o objetivo da aula, e você perde a chance de aprender recursos que servirão a outras atividades.',
          },
          {
            label: 'Decidir as adaptações por conta própria, com base no que leu sobre baixa visão na internet, sem falar com Helena.',
            to: 'exposicao',
            quality: 'arriscada',
            feedback:
              'Baixa visão se manifesta de formas muito diferentes de pessoa para pessoa. Adaptações genéricas podem não funcionar e ignoram quem melhor conhece suas necessidades: a própria estudante e a família.',
          },
          {
            label: 'Combinar com o AEE quais recursos usar, conversar em particular com Helena sobre o que a ajuda e informar a família sobre o que será feito, abrindo espaço para sugestões.',
            to: 'atividade',
            quality: 'construtiva',
            feedback:
              'Planejar em parceria, ouvir a estudante e dialogar com a família distribui o conhecimento e respeita a autonomia de Helena. Conversar em particular preserva sua privacidade.',
          },
        ],
      },
      exposicao: {
        id: 'exposicao',
        speaker: 'Rafael',
        situation:
          'No início da aula, Rafael percebe que Helena recebeu um material diferente e pergunta alto: “Por que ela ganhou outra folha? Ela tem algum problema?” Alguns colegas olham para Helena, que abaixa a cabeça.',
        options: [
          {
            label: 'Responder com naturalidade: “Cada pessoa aprende de um jeito. Hoje tem mapa ampliado, mapa com ícones e instruções em cartões, e qualquer grupo pode usar o que preferir.” Depois, oferecer as opções a todos.',
            to: 'atividade',
            quality: 'construtiva',
            feedback:
              'Você não confirma nem nega nada sobre Helena, desloca a conversa para a diversidade de formas de aprender e transforma o recurso “especial” em opção para todos. Assim, usar um apoio deixa de ser marca de diferença.',
          },
          {
            label: 'Explicar para a turma que Helena tem baixa visão e por isso precisa de material especial.',
            to: 'fim-exposicao',
            quality: 'arriscada',
            feedback:
              'Informações sobre a saúde ou a condição de um estudante pertencem a ele e à família. Revelá-las em público, sem combinar antes, expõe Helena e reforça a ideia de que ela é a “diferente” da turma.',
          },
          {
            label: 'Dizer a Rafael que aquilo não é assunto dele e começar a atividade.',
            to: 'atividade',
            quality: 'parcial',
            feedback:
              'Você evita expor Helena, mas o tom pode soar como segredo e deixar a curiosidade da turma no ar. Uma resposta que normalize as diferenças de forma geral protege melhor e ainda educa.',
          },
        ],
      },
      atividade: {
        id: 'atividade',
        speaker: 'Davi',
        situation:
          'A atividade está em andamento há uns quinze minutos. Davi já se levantou três vezes, mexeu no material de outro grupo e agora diz: “Já cansei disso.” Ele tinha começado bem a primeira parte.',
        options: [
          {
            label: 'Dizer na frente de todos: “Davi, de novo? Assim você atrapalha o grupo inteiro.”',
            to: 'fim-exposicao',
            quality: 'arriscada',
            feedback:
              'A repreensão pública rotula Davi como o que atrapalha e tende a aumentar a agitação e o desânimo. Ela trata como falta de vontade algo que, em boa parte, tem a ver com a forma como a tarefa está organizada.',
          },
          {
            label: 'Dividir o restante da tarefa em etapas curtas com marcos visíveis para todos os grupos e criar papéis rotativos, incluindo um que envolve movimento (buscar recursos, conferir o mapa de parede). Combinar com Davi, em particular, um sinal para pausas curtas.',
            to: 'lingua',
            quality: 'construtiva',
            feedback:
              'Etapas curtas, marcos visíveis e oportunidades de movimento são ajustes que favorecem muitos estudantes, não só Davi. O combinado particular dá a ele uma estratégia de autorregulação sem expô-lo.',
          },
          {
            label: 'Trazer Davi para sentar perto da sua mesa e pedir que termine a tarefa ali.',
            to: 'lingua',
            quality: 'parcial',
            feedback:
              'A proximidade pode ajudar a retomar o foco, mas Davi sai do grupo e da interação com os colegas, e a tarefa continua longa e igual. Ajustar a estrutura da atividade costuma ter efeito mais duradouro.',
          },
        ],
      },
      lingua: {
        id: 'lingua',
        speaker: 'Nadia',
        situation:
          'Chega a hora das apresentações. O grupo de Nadia traçou um ótimo trajeto e ela participou ativamente, mas, na hora de falar, ela trava e diz baixinho: “Eu não sei falar bem.”',
        options: [
          {
            label: 'Dispensar Nadia da apresentação para que ela não passe vergonha.',
            to: 'familia',
            quality: 'parcial',
            feedback:
              'Protege no curto prazo, mas tira dela a oportunidade de mostrar o que sabe e de praticar o português. Se for repetida, a dispensa pode ensinar que ela não tem lugar nas apresentações.',
          },
          {
            label: 'Oferecer a Nadia e a todos os grupos formas variadas de apresentar: apontar o trajeto no mapa, usar os cartões com palavras-chave e, se ela quiser, dizer termos também em crioulo haitiano ou francês para a turma aprender.',
            to: 'familia',
            quality: 'construtiva',
            feedback:
              'Permitir diferentes formas de expressão é um princípio do DUA. Nadia mostra o que aprendeu de Geografia sem que a língua seja uma barreira, e sua língua de origem aparece como saber valorizado, não como falta.',
          },
          {
            label: 'Pedir que ela tente e corrigir os erros de português enquanto ela fala, para que aprenda mais rápido.',
            to: 'fim-exposicao',
            quality: 'arriscada',
            feedback:
              'Interromper para corrigir diante da turma aumenta a ansiedade e desloca o foco do conteúdo para a língua. Quem está aprendendo um idioma precisa primeiro de segurança para se arriscar a falar.',
          },
        ],
      },
      familia: {
        id: 'familia',
        situation:
          'A aula termina. Helena usou o mapa ampliado sem constrangimento, Davi concluiu as etapas e Nadia apontou o trajeto com os colegas. O que você faz depois?',
        options: [
          {
            label: 'Registrar o que funcionou e o que ainda foi barreira, compartilhar com o AEE e a coordenação e conversar com as famílias, buscando uma forma de comunicação acessível para a família de Nadia.',
            to: 'fim-pertencimento',
            quality: 'construtiva',
            feedback:
              'O registro transforma uma boa aula em aprendizagem da equipe. Compartilhar com o AEE e a coordenação permite planejar juntos, e o diálogo com as famílias, numa língua e num formato que elas entendam, fortalece a parceria.',
          },
          {
            label: 'Anotar para si mesmo o que deu certo, para usar nas próximas aulas.',
            to: 'fim-parcial',
            quality: 'parcial',
            feedback:
              'Já é um avanço, mas o conhecimento fica só com você. Outros professores da turma e o AEE poderiam se beneficiar, e as famílias ficam sem retorno.',
          },
          {
            label: 'Mandar um bilhete às famílias de Helena, Davi e Nadia listando as dificuldades que cada um teve na aula.',
            to: 'fim-exposicao',
            quality: 'arriscada',
            feedback:
              'Um bilhete centrado em dificuldades reforça um olhar de déficit e pode gerar ansiedade ou desconfiança nas famílias. A conversa funciona melhor quando parte dos avanços e das barreiras que a escola está removendo.',
          },
        ],
      },
      'fim-pertencimento': {
        id: 'fim-pertencimento',
        situation:
          'Na aula seguinte, outros estudantes também pedem o mapa com ícones e os cartões de instruções. A professora do AEE sugere planejarem juntos a próxima unidade, e a família de Nadia agradece por ter recebido a mensagem de um jeito que conseguiu entender.',
        options: [],
        end: {
          title: 'Uma aula pensada para todos',
          reflection:
            'Planejar a partir das barreiras, oferecer opções para toda a turma, combinar apoios em particular e trabalhar em parceria com o AEE e as famílias fez com que todos participassem sem que ninguém fosse exposto.',
        },
      },
      'fim-parcial': {
        id: 'fim-parcial',
        situation:
          'A aula correu bem e você guardou boas ideias. Mas, na semana seguinte, em outra disciplina, Helena volta a receber um material com letras pequenas, e a família de Nadia segue sem saber como ela está na escola.',
        options: [],
        end: {
          title: 'Bons ajustes, pouca continuidade',
          reflection:
            'As adaptações funcionaram na sua aula, mas inclusão é trabalho de equipe. Compartilhe o que deu certo com os colegas, o AEE e a coordenação, e mantenha um diálogo regular e acessível com as famílias.',
        },
      },
      'fim-exposicao': {
        id: 'fim-exposicao',
        situation:
          'Helena passa a evitar usar a lupa na frente dos colegas, Davi diz que “não adianta tentar” e Nadia não quer mais falar em sala. A turma começa a vê-los como “os que precisam de ajuda”.',
        options: [],
        end: {
          title: 'Quando a adaptação expõe',
          reflection:
            'Ajustes feitos de forma pública, improvisada ou centrada no que falta acabaram reforçando rótulos. Reveja o planejamento: que barreiras eram previsíveis? Que opções poderiam ser oferecidas a todos? Como combinar apoios em particular e em parceria com o AEE e as famílias?',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Defina o objetivo de aprendizagem e identifique as barreiras previsíveis nos materiais, nas instruções e na forma de participação.',
          'Ofereça mais de um formato para toda a turma: material ampliado e com bom contraste, imagens e ícones, instruções escritas e faladas em etapas curtas.',
          'Planeje em parceria com o AEE, quando houver estudantes atendidos, e com a coordenação pedagógica.',
          'Converse em particular com os estudantes e as famílias sobre o que ajuda, respeitando a privacidade de cada um.',
          'Prepare diferentes formas de mostrar a aprendizagem: falar, apontar, desenhar, escrever ou montar.',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Apresente as opções como recursos para todos, e não como material “especial” para alguns.',
          'Divida tarefas longas em etapas com marcos visíveis e preveja momentos de movimento.',
          'Observe quem está encontrando barreiras e ajuste de forma discreta, mudando a estrutura para todos sempre que possível.',
          'Diante de perguntas da turma sobre diferenças, responda de forma geral, sem revelar informações pessoais de ninguém.',
          'Valorize as línguas e os saberes que os estudantes trazem.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Registre o que funcionou e o que ainda foi barreira.',
          'Compartilhe os registros com o AEE, a coordenação e os demais professores da turma.',
          'Converse com as famílias a partir dos avanços, usando uma linguagem e um formato acessíveis a elas.',
          'Incorpore as opções que funcionaram ao planejamento das próximas aulas.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que barreiras previsíveis existem nas atividades que você costuma propor?',
      'Que opções você poderia oferecer a toda a turma para que ninguém precise ser apontado como diferente?',
      'Como construir uma parceria contínua com o AEE e com as famílias?',
      'Como você reage quando a turma pergunta sobre a diferença de um colega?',
    ],
  },
  {
    id: 'avaliacao-formativa',
    title: 'Avaliação formativa',
    topic: 'Acompanhamento da aprendizagem',
    durationMin: 20,
    summary:
      'Como observar, registrar e usar evidências de aprendizagem para ajustar o ensino ao longo do caminho.',
    artId: 'train-avaliacao',
    status: 'disponivel',
    intro: [
      'Avaliar não é só atribuir nota no fim do bimestre. A avaliação formativa acontece durante o percurso: o professor coleta evidências do que a turma está entendendo e usa essas informações para ajustar o ensino, enquanto ainda há tempo de aprender.',
      'Boas práticas formativas incluem tarefas curtas de verificação, devolutivas que indicam o próximo passo (e não apenas certo ou errado), análise dos erros como pistas do raciocínio, feedback entre pares com critérios claros e autoavaliação. Tudo isso sem rotular estudantes como “fracos” ou “fortes”.',
      'Nesta simulação, você dá aulas de Matemática para uma turma de 8º ano que está estudando porcentagem. Ao final da aula, aplicou um bilhete de saída com uma pergunta: “Uma camiseta de R$ 50,00 está com 20% de desconto. Quanto ela custa agora?”. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Você lê os bilhetes de saída. Cerca de metade da turma errou: alguns responderam R$ 30,00 (tiraram 20 de 50), outros responderam R$ 10,00 (calcularam o desconto, mas pararam aí). O que você faz com esses bilhetes?',
        options: [
          {
            label: 'Separar os bilhetes por tipo de raciocínio (acertou; subtraiu 20 direto; calculou o desconto e não subtraiu; outro) e anotar o que cada grupo precisa a seguir.',
            to: 'devolutiva',
            quality: 'construtiva',
            feedback:
              'Agrupar por tipo de erro, e não apenas por certo ou errado, transforma o bilhete em diagnóstico. Você descobre que há necessidades diferentes e pode planejar intervenções específicas para cada uma.',
          },
          {
            label: 'Contar quantos acertaram e decidir explicar porcentagem de novo, do começo, para toda a turma.',
            to: 'fechamento',
            quality: 'parcial',
            feedback:
              'Você usou a evidência para perceber que a turma não está pronta para avançar, o que é importante. Mas repetir a mesma explicação para todos ignora que os erros têm causas diferentes e cansa quem já entendeu.',
          },
          {
            label: 'Dar nota de zero a dez em cada bilhete e lançar no diário.',
            to: 'rotulos',
            quality: 'arriscada',
            feedback:
              'Transformar uma verificação rápida em nota muda a função do instrumento: o estudante passa a esconder dúvidas em vez de mostrá-las. O bilhete de saída serve para orientar o ensino, não para classificar.',
          },
        ],
      },
      devolutiva: {
        id: 'devolutiva',
        situation:
          'No dia seguinte, você vai devolver os bilhetes. Como registra a devolutiva para cada estudante?',
        options: [
          {
            label: 'Marcar apenas certo ou errado em cada bilhete.',
            to: 'fechamento',
            quality: 'parcial',
            feedback:
              'É rápido e informa o resultado, mas não diz ao estudante o que fazer a seguir. Quem errou sabe que errou, mas não sabe onde nem como avançar.',
          },
          {
            label: 'Escrever no topo de cada bilhete o número de acertos da turma e o “desempenho” de cada um, para que comparem.',
            to: 'rotulos',
            quality: 'arriscada',
            feedback:
              'A comparação desloca a atenção do raciocínio para a posição na turma. Quem ficou abaixo tende a concluir que “não é de matemática”, e a devolutiva deixa de ajudar a aprender.',
          },
          {
            label: 'Escrever, sem nota, um comentário curto com uma pergunta ou pista (“Você achou 20% de 50. Isso é o preço final ou o desconto?”) e reservar tempo na aula para cada um revisar sua resposta.',
            to: 'erros',
            quality: 'construtiva',
            feedback:
              'Devolutivas que apontam o próximo passo, e que o estudante usa em seguida, são as que mais ajudam a aprender. A pergunta devolve o pensamento ao estudante, em vez de entregar a resposta pronta.',
          },
        ],
      },
      erros: {
        id: 'erros',
        speaker: 'Lucas',
        situation:
          'Durante a revisão, Lucas insiste: “Mas 20% é 20, então é só tirar 20 de 50.” Você sabe que esse raciocínio aparece em vários bilhetes. Como trabalha esse erro com a turma?',
        options: [
          {
            label: 'Explicar no quadro o procedimento correto, passo a passo, e pedir que copiem.',
            to: 'pares',
            quality: 'parcial',
            feedback:
              'A explicação é clara, mas a turma não chega a examinar por que o raciocínio de Lucas parece fazer sentido. Sem confrontar a ideia equivocada, ela tende a reaparecer em outro problema.',
          },
          {
            label: 'Projetar o bilhete de Lucas, com o nome dele, como exemplo do que “não se deve fazer”.',
            to: 'rotulos',
            quality: 'arriscada',
            feedback:
              'Expor o erro de um estudante identificado gera constrangimento e ensina à turma que errar é perigoso. A análise do erro funciona quando o erro é tratado como de todos, não de alguém.',
          },
          {
            label: 'Apresentar, sem nomes, as três respostas que apareceram (R$ 30, R$ 10 e R$ 40) e pedir que os grupos expliquem o raciocínio por trás de cada uma e testem com outros valores, como 20% de R$ 100,00.',
            to: 'pares',
            quality: 'construtiva',
            feedback:
              'Analisar erros anônimos permite discutir ideias sem expor pessoas. Testar com R$ 100,00 mostra que 20% só vale 20 quando o total é 100, e a própria turma percebe o limite do raciocínio de Lucas.',
          },
        ],
      },
      pares: {
        id: 'pares',
        situation:
          'Você propõe uma nova tarefa de porcentagem e quer que os estudantes deem feedback uns aos outros antes de entregar. Como organiza esse momento?',
        options: [
          {
            label: 'Combinar critérios claros com a turma (mostrou o cálculo? a resposta faz sentido no contexto?) e oferecer um roteiro: “Uma coisa que está clara é…”, “Uma pergunta que tenho é…”.',
            to: 'fechamento',
            quality: 'construtiva',
            feedback:
              'Critérios compartilhados e frases de apoio tornam o feedback entre pares específico e respeitoso. Ao avaliar o trabalho do colega com critérios, o estudante também entende melhor o que se espera do próprio trabalho.',
          },
          {
            label: 'Nomear os que acertaram o bilhete como “monitores” para corrigirem os que erraram.',
            to: 'rotulos',
            quality: 'arriscada',
            feedback:
              'Fixar quem ensina e quem é corrigido cria uma divisão visível na turma. Monitoria pode ser útil, mas quando é atribuída a partir de quem errou, vira um rótulo que todos percebem.',
          },
          {
            label: 'Pedir que troquem as folhas e “corrijam” a do colega.',
            to: 'fechamento',
            quality: 'parcial',
            feedback:
              'A troca promove contato com outras resoluções, mas, sem critérios, o feedback tende a ser vago (“tá certo”, “tá errado”) ou a se limitar a conferir o resultado final.',
          },
        ],
      },
      rotulos: {
        id: 'rotulos',
        speaker: 'Yasmin',
        situation:
          'Um colega chama o grupo que errou de “turma do reforço”. Yasmin abaixa a cabeça e diz: “Eu sou do grupo que não sabe porcentagem mesmo.”',
        options: [
          {
            label: 'Concordar com franqueza: “Pois é, quem ficou para trás precisa se esforçar mais.”',
            to: 'fim-rotulo',
            quality: 'arriscada',
            feedback:
              'A fala confirma o rótulo e coloca a dificuldade como falta de esforço. Estudantes que se veem como incapazes tendem a desistir antes de tentar, o que reduz ainda mais a aprendizagem.',
          },
          {
            label: 'Pedir ao colega que pare com o comentário e seguir com a aula.',
            to: 'fechamento',
            quality: 'parcial',
            feedback:
              'Interromper o comentário é necessário, mas a crença de Yasmin sobre si mesma fica sem resposta. O rótulo pode continuar circulando, mesmo sem ser dito em voz alta.',
          },
          {
            label: 'Reformular para a turma: “Os grupos de hoje mudam conforme o que cada um precisa praticar; ainda não saber algo é diferente de não conseguir aprender.” Depois, conversar com Yasmin mostrando o que ela já acertou no bilhete.',
            to: 'fechamento',
            quality: 'construtiva',
            feedback:
              'Deixar claro que os agrupamentos são temporários e ligados a uma necessidade, não a quem a pessoa é, desfaz o rótulo. Mostrar a Yasmin evidências do que ela já sabe sustenta a confiança para continuar.',
          },
        ],
      },
      fechamento: {
        id: 'fechamento',
        situation:
          'Faltam 15 minutos para o fim da aula. Você quer saber se a turma avançou e planejar a próxima aula. O que faz?',
        options: [
          {
            label: 'Avisar que haverá uma prova na semana que vem e encerrar a aula.',
            to: 'fim-correcao',
            quality: 'parcial',
            feedback:
              'A prova pode ter seu lugar, mas aplicada sem evidências intermediárias ela só confirma, tarde demais, quem aprendeu. Você perde a chance de ajustar o ensino a tempo.',
          },
          {
            label: 'Pedir uma autoavaliação com critérios (“consigo calcular 10% de um valor”, “sei diferenciar o desconto do preço final”) e um novo bilhete de saída; usar as duas evidências para planejar a próxima aula com tarefas diferenciadas por necessidade.',
            to: 'fim-ajuste',
            quality: 'construtiva',
            feedback:
              'A autoavaliação desenvolve a consciência do estudante sobre o próprio aprendizado, e o novo bilhete mostra se ela confere com o desempenho. Cruzar as duas evidências permite ajustar o plano de forma precisa.',
          },
          {
            label: 'Considerar o conteúdo revisado e seguir o planejamento para o próximo tema.',
            to: 'fim-rotulo',
            quality: 'arriscada',
            feedback:
              'Avançar sem verificar se a revisão funcionou deixa para trás justamente quem mais precisava. Em matemática, lacunas em porcentagem costumam reaparecer em juros, gráficos e proporcionalidade.',
          },
        ],
      },
      'fim-ajuste': {
        id: 'fim-ajuste',
        situation:
          'O novo bilhete mostra que a maioria agora diferencia o desconto do preço final. Na aula seguinte, você propõe desafios diferentes para cada necessidade, e Yasmin explica a um colega por que 20% de R$ 50,00 não é R$ 20,00.',
        options: [],
        end: {
          title: 'Evidências que movem o ensino',
          reflection:
            'Você usou o bilhete de saída como diagnóstico, deu devolutivas com próximo passo, analisou erros sem expor ninguém e envolveu a turma no feedback e na autoavaliação. A avaliação serviu para ajustar o ensino, e não apenas para registrar resultados.',
        },
      },
      'fim-correcao': {
        id: 'fim-correcao',
        situation:
          'Na prova, parte da turma melhora, mas o erro de “tirar 20 de 50” ainda aparece em vários testes. Você só descobre isso depois de encerrado o conteúdo.',
        options: [],
        end: {
          title: 'Informação que chegou tarde',
          reflection:
            'Houve atenção à aprendizagem, mas as evidências foram pouco usadas para ajustar o caminho. Devolutivas com próximo passo, análise dos erros e verificações curtas ao longo das aulas ajudam a agir enquanto ainda há tempo.',
        },
      },
      'fim-rotulo': {
        id: 'fim-rotulo',
        situation:
          'A turma passa a se dividir entre “os que sabem” e “os do reforço”. Yasmin para de entregar os bilhetes de saída, e as dúvidas sobre porcentagem deixam de aparecer, mas não deixam de existir.',
        options: [],
        end: {
          title: 'Avaliação que classifica',
          reflection:
            'Quando a avaliação vira nota, comparação ou rótulo, os estudantes passam a esconder o que não sabem, e o professor perde justamente as evidências de que precisa. Reveja como os resultados são comunicados e trate o erro como parte do processo.',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Defina o objetivo de aprendizagem e o que contaria como evidência de que ele foi alcançado.',
          'Prepare um bilhete de saída curto, com uma ou duas perguntas que revelem o raciocínio, não só o resultado.',
          'Antecipe os erros mais prováveis e pense em uma intervenção para cada um.',
          'Escreva critérios simples, em linguagem acessível aos estudantes, para usar no feedback entre pares e na autoavaliação.',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Circule pela sala e registre o que observa: quais estratégias aparecem, onde a turma trava.',
          'Apresente erros frequentes de forma anônima e peça que a turma explique o raciocínio por trás deles.',
          'Organize o feedback entre pares com critérios combinados e frases de apoio.',
          'Forme agrupamentos temporários por necessidade e deixe claro que eles mudam.',
          'Reserve os minutos finais para autoavaliação e um novo bilhete de saída.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Separe as respostas por tipo de raciocínio, e não apenas por certo ou errado.',
          'Escreva devolutivas curtas, sem nota, que indiquem o próximo passo, e garanta tempo para que sejam usadas.',
          'Ajuste o plano da aula seguinte com base nas evidências reunidas.',
          'Evite comparar estudantes publicamente ou associá-los de forma fixa a grupos de desempenho.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que evidências de aprendizagem você costuma coletar antes de avançar para um novo conteúdo?',
      'Como suas devolutivas indicam ao estudante o que fazer a seguir?',
      'De que forma os erros da turma podem orientar o planejamento da próxima aula?',
      'Como evitar que agrupamentos por necessidade se transformem em rótulos?',
    ],
  },
  {
    id: 'uso-responsavel-de-ia',
    title: 'Uso responsável de IA',
    topic: 'Inteligência artificial na escola',
    durationMin: 20,
    summary:
      'Como lidar com o uso de ferramentas de inteligência artificial pelos estudantes, com ética, autoria e pensamento crítico.',
    artId: 'train-ia',
    status: 'disponivel',
    intro: [
      'Ferramentas de inteligência artificial que geram textos já fazem parte da vida de muitos estudantes. Ignorá-las não funciona, e proibi-las sem conversa também não: o uso continua, só que escondido e sem nenhum critério.',
      'Alguns princípios ajudam: tratar o tema como aprendizagem, e não só como fiscalização; discutir autoria e transparência (declarar quando e como a IA foi usada); ensinar a checar informações, porque esses sistemas podem inventar fatos e fontes; proteger a privacidade, sem inserir dados pessoais; e redesenhar tarefas para valorizar o processo, os rascunhos e a explicação oral.',
      'Nesta simulação, você dá aula para uma turma de 9º ano que acabou de entregar uma redação argumentativa. Alguns textos parecem escritos por uma IA, e a questão vai chegar à turma inteira. Os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Ao corrigir as redações, você percebe que alguns textos têm vocabulário e estrutura muito diferentes do que esses estudantes costumam escrever, com frases genéricas e nenhum exemplo pessoal. Como você age?',
        options: [
          {
            label: 'Colocar os textos em um “detector de IA” on-line e dar zero a quem tiver porcentagem alta.',
            to: 'debate',
            quality: 'arriscada',
            feedback:
              'Detectores de texto gerado por IA não são confiáveis o bastante para embasar uma acusação: erram nos dois sentidos e podem marcar como suspeito um texto legítimo, inclusive de quem escreve de forma mais formal. Punir com base nisso pode ser injusto e quebra a confiança da turma.',
          },
          {
            label: 'Conversar em particular com os autores, pedindo que contem como escreveram e expliquem com as próprias palavras alguns trechos do texto.',
            to: 'conversa',
            quality: 'construtiva',
            feedback:
              'Uma conversa sobre o processo é mais justa e mais informativa que qualquer ferramenta. Pedir que o estudante explique o raciocínio mostra o que ele compreende, abre espaço para a honestidade e evita acusações públicas.',
          },
          {
            label: 'Devolver os textos sem nota com o recado “Refaça. Sei que não foi você que escreveu”.',
            to: 'conversa',
            quality: 'parcial',
            feedback:
              'Você não ignora o problema, mas afirma algo que não tem como provar e não abre diálogo. Estudantes que escreveram sozinhos podem se sentir injustiçados, e quem usou IA não entende o que fez de inadequado.',
          },
        ],
      },
      conversa: {
        id: 'conversa',
        speaker: 'Rafael',
        situation:
          'Rafael admite: “Usei um chatbot. Eu dei o tema e ele escreveu. Mas não é cola, né? Ninguém falou que não podia.” Ele parece mais confuso que desafiador.',
        options: [
          {
            label: 'Agradecer a sinceridade, reconhecer que as regras não estavam claras e combinar que ele reescreva o texto com acompanhamento. Depois, levar a discussão para a turma, sem expor Rafael.',
            to: 'debate',
            quality: 'construtiva',
            feedback:
              'Rafael tem razão em parte: se o combinado não existia, a responsabilidade é compartilhada. Valorizar a honestidade estimula outros a falar a verdade, e levar o tema à turma sem citar nomes transforma um caso individual em aprendizagem coletiva.',
          },
          {
            label: 'Explicar que entregar um texto que não é seu é desonesto, pedir que refaça e encerrar o assunto.',
            to: 'alucinacao',
            quality: 'parcial',
            feedback:
              'A orientação sobre autoria é correta, mas tratar o caso só individualmente deixa o restante da turma sem critérios. Outros estudantes continuarão usando IA sem saber o que é aceitável e o que não é.',
          },
          {
            label: 'Registrar ocorrência por fraude e comentar com a turma que “o Rafael foi pego colando com robô”.',
            to: 'fim-desconfianca',
            quality: 'arriscada',
            feedback:
              'Punir severamente uma regra que nunca foi combinada é injusto, e expor o estudante publicamente o humilha. A mensagem que fica para a turma é “não admita nunca”, o que torna o uso de IA ainda mais escondido.',
          },
        ],
      },
      debate: {
        id: 'debate',
        speaker: 'Júlia',
        situation:
          'O assunto se espalha e a turma quer discutir. Júlia diz: “Se a calculadora pode, por que a IA não pode?” Tiago responde: “Porque aí o robô pensa por você.” A sala se divide.',
        options: [
          {
            label: 'Organizar a conversa a partir de perguntas: o que é ser autor de um texto? Para que serve esta tarefa? Em que situações a IA ajuda a aprender e em quais substitui o aprendizado? Registrar as ideias no quadro.',
            to: 'alucinacao',
            quality: 'construtiva',
            feedback:
              'As duas falas têm parte de razão, e perguntas bem escolhidas ajudam a turma a perceber que a resposta depende do objetivo da tarefa. Construir critérios juntos aumenta o compromisso dos estudantes com eles.',
          },
          {
            label: 'Explicar rapidamente a sua posição sobre o tema e passar para o próximo conteúdo.',
            to: 'privacidade',
            quality: 'parcial',
            feedback:
              'Deixar sua posição clara é útil, mas perde-se a chance de a turma pensar sobre ética e autoria. Regras explicadas sem diálogo costumam ser seguidas apenas enquanto alguém está fiscalizando.',
          },
          {
            label: 'Encerrar a discussão: “Aqui não tem debate. IA é proibida em qualquer tarefa e ponto.”',
            to: 'fim-proibicao',
            quality: 'arriscada',
            feedback:
              'Uma proibição total, sem explicação, ignora que os estudantes encontrarão essas ferramentas na vida e no trabalho. Também é difícil de verificar e tende a empurrar o uso para a clandestinidade, sem nenhum critério ético.',
          },
        ],
      },
      alucinacao: {
        id: 'alucinacao',
        speaker: 'Beatriz',
        situation:
          'Para examinar o tema, a turma pede a um chatbot um parágrafo sobre a história do bairro. Beatriz percebe que o texto cita um “historiador local” e uma data de fundação que ninguém conhece. “Mas está escrito de um jeito tão confiante!”',
        options: [
          {
            label: 'Aproveitar o momento: explicar que esses sistemas geram textos prováveis, e não necessariamente verdadeiros, e propor que a turma verifique cada informação em fontes confiáveis.',
            to: 'privacidade',
            quality: 'construtiva',
            feedback:
              'Ver na prática uma informação inventada ensina mais que qualquer aviso. Checar dados em outras fontes, perguntar quem publicou e desconfiar de citações sem origem são habilidades de leitura crítica que servem para qualquer texto.',
          },
          {
            label: 'Comentar que às vezes a IA erra e seguir com a atividade.',
            to: 'redesenho',
            quality: 'parcial',
            feedback:
              'O alerta é verdadeiro, mas genérico demais. Sem praticar a verificação, a turma não aprende a identificar quando a ferramenta errou nem o que fazer a respeito.',
          },
          {
            label: 'Concluir com a turma: “Viram? IA só serve para mentir. Não confiem em nada que ela diz.”',
            to: 'fim-proibicao',
            quality: 'arriscada',
            feedback:
              'Trocar a confiança cega pela rejeição total também não desenvolve pensamento crítico. O objetivo é que os estudantes aprendam a avaliar e checar informações, venham elas de uma IA, de um site ou de uma pessoa.',
          },
        ],
      },
      privacidade: {
        id: 'privacidade',
        speaker: 'Caio',
        situation:
          'Durante uma atividade, Caio comenta: “Eu ia colar no chatbot o relato que a Lívia escreveu sobre a doença da avó dela, com nome e tudo, para ele melhorar o texto.”',
        options: [
          {
            label: 'Explicar que textos digitados nessas ferramentas podem ser armazenados e usados por terceiros, que não se insere dado pessoal próprio ou de outra pessoa sem autorização e combinar essa regra com toda a turma.',
            to: 'redesenho',
            quality: 'construtiva',
            feedback:
              'Caio não percebeu o risco, e a situação é uma ótima oportunidade de ensinar. Nome, saúde e histórias de família são dados sensíveis. Transformar o cuidado em regra da turma protege a todos e ensina respeito à privacidade alheia.',
          },
          {
            label: 'Dizer a Caio para não fazer isso, sem explicar o motivo, e seguir a aula.',
            to: 'redesenho',
            quality: 'parcial',
            feedback:
              'Você evita o problema imediato, mas Caio e os colegas não entendem por que é arriscado. Sem compreender o motivo, a regra dificilmente será lembrada em casa, quando ninguém estiver olhando.',
          },
          {
            label: 'Não dar importância: “É só para corrigir o texto, não tem problema.”',
            to: 'fim-desconfianca',
            quality: 'arriscada',
            feedback:
              'Compartilhar a história pessoal de uma colega sem autorização desrespeita a privacidade dela, e o professor que consente ensina que isso é aceitável. Lívia e outros estudantes podem deixar de confiar em você para contar algo pessoal.',
          },
        ],
      },
      redesenho: {
        id: 'redesenho',
        situation:
          'Você vai propor uma nova redação argumentativa para a turma. Como desenha a tarefa, considerando tudo o que aconteceu?',
        options: [
          {
            label: 'Valorizar o processo: plano e rascunho feitos em sala, uma etapa em que o uso de IA é permitido e deve ser declarado (como e para quê), checagem das informações e uma breve conversa oral sobre o texto final.',
            to: 'fim-autoria',
            quality: 'construtiva',
            feedback:
              'Quando o processo é visível, a autoria aparece naturalmente e a avaliação considera o raciocínio, não só o produto. Declarar o uso ensina transparência, e a conversa oral mostra o que cada estudante realmente compreendeu.',
          },
          {
            label: 'Manter a mesma tarefa, mas fazê-la inteira em sala, à mão, em uma única aula.',
            to: 'fim-proibicao',
            quality: 'parcial',
            feedback:
              'Escrever em sala garante a autoria naquele momento e tem seu valor, mas não ensina a usar a IA com responsabilidade. Além disso, uma única aula limita revisão e reescrita, que são parte importante da escrita.',
          },
          {
            label: 'Liberar o uso de IA sem nenhum combinado: “Usem como quiserem, o importante é o texto ficar bom.”',
            to: 'fim-desconfianca',
            quality: 'arriscada',
            feedback:
              'Sem critérios, a tarefa passa a avaliar a ferramenta, e não o estudante. Quem escreveu sozinho se sente prejudicado, e a turma perde a oportunidade de desenvolver a própria escrita e argumentação.',
          },
        ],
      },
      'fim-autoria': {
        id: 'fim-autoria',
        situation:
          'A turma constrói um combinado sobre uso de IA, afixado na sala. Nas novas redações, os estudantes declaram como usaram a ferramenta, checam informações e explicam seus argumentos na conversa oral. Rafael entrega um texto com exemplos do próprio bairro.',
        options: [],
        end: {
          title: 'Autoria, transparência e pensamento crítico',
          reflection:
            'Em vez de fiscalizar com ferramentas pouco confiáveis, você transformou o problema em aprendizagem: a turma discutiu autoria, praticou a checagem de informações, aprendeu a proteger dados pessoais e passou a mostrar o próprio processo de escrita.',
        },
      },
      'fim-proibicao': {
        id: 'fim-proibicao',
        situation:
          'A regra fica clara, mas pouco discutida. Nos corredores, alguns estudantes comentam que vão continuar usando IA em casa, só que “com mais cuidado para não perceberem”.',
        options: [],
        end: {
          title: 'Uma regra sem compreensão',
          reflection:
            'A turma sabe o que não pode fazer, mas não aprendeu por quê, nem como usar essas ferramentas de forma ética e crítica. Na próxima vez, envolva os estudantes na construção dos critérios e redesenhe as tarefas para tornar o processo visível.',
        },
      },
      'fim-desconfianca': {
        id: 'fim-desconfianca',
        situation:
          'O clima na turma fica tenso. Alguns estudantes se sentem injustiçados, outros escondem o que fazem, e ninguém tem clareza sobre o que é permitido ou como proteger a própria privacidade e a dos colegas.',
        options: [],
        end: {
          title: 'Quando a desconfiança toma o lugar do diálogo',
          reflection:
            'Acusações sem base, exposição pública ou ausência de critérios minam a confiança e não ensinam o uso responsável da IA. Retome a conversa com a turma, reconheça o que poderia ter sido diferente e construa combinados claros sobre autoria, transparência e privacidade.',
        },
      },
    },
    script: [
      {
        title: 'Antes da aula',
        steps: [
          'Defina, para cada tarefa, se o uso de IA é permitido, em quais etapas e com que finalidade.',
          'Planeje tarefas que mostrem o processo: plano, rascunhos, versões e uma breve explicação oral.',
          'Prepare um modelo simples de declaração de uso: que ferramenta foi usada, para quê e o que o estudante mudou.',
          'Teste você mesmo uma ferramenta de IA com o tema da tarefa para conhecer as respostas típicas e possíveis erros.',
          'Não use “detectores de IA” como prova: eles não são confiáveis para acusar alguém.',
        ],
      },
      {
        title: 'No momento',
        steps: [
          'Converse com a turma sobre autoria: o que significa um texto ser seu?',
          'Mostre na prática um exemplo de informação inventada pela IA e verifiquem juntos em fontes confiáveis.',
          'Combine a regra de privacidade: nunca inserir nome, endereço, dados de saúde ou histórias pessoais, próprias ou de outras pessoas.',
          'Construa com os estudantes um combinado sobre uso de IA e deixe-o visível na sala.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Diante de suspeita, converse em particular e peça que o estudante explique o próprio texto, sem acusação pública.',
          'Avalie o processo (rascunhos, revisões, declaração de uso), e não só o produto final.',
          'Ofereça a chance de reescrever quando o combinado não estava claro.',
          'Revise o combinado com a turma de tempos em tempos, à medida que as ferramentas mudam.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que critérios você usa hoje para decidir quando o uso de IA ajuda ou atrapalha a aprendizagem?',
      'Como reage quando suspeita que um texto não foi escrito pelo estudante?',
      'De que forma suas tarefas tornam visível o processo de pensamento da turma?',
      'Como você ensina seus estudantes a checar informações e a proteger dados pessoais?',
    ],
  },
  {
    id: 'integracao-entre-materias',
    title: 'Integração entre matérias',
    topic: 'Interdisciplinaridade',
    durationMin: 20,
    summary:
      'Como planejar com colegas de outras matérias para que os estudantes conectem conhecimentos de verdade.',
    artId: 'train-integracao',
    status: 'disponivel',
    intro: [
      'Projetos interdisciplinares ajudam os estudantes a perceber que os conhecimentos das diferentes matérias se conversam para explicar e transformar a realidade. Mas integrar não é simplesmente escolher um “tema em comum” e cada professor falar dele na sua aula.',
      'Uma integração real nasce de uma pergunta que nenhuma matéria responde sozinha, de contribuições combinadas entre os colegas, de um calendário possível e de uma avaliação pensada em conjunto. Tudo isso com reuniões curtas e rotinas já cheias.',
      'Nesta simulação, você é professor ou professora de Ciências de uma turma de 8º ano e quer planejar com os colegas de Matemática, Geografia e Português um projeto sobre o consumo de energia na escola. Os colegas e os estudantes são personagens fictícios.',
    ],
    startNodeId: 'inicio',
    nodes: {
      inicio: {
        id: 'inicio',
        situation:
          'Você tem a ideia do projeto e consegue apenas 30 minutos no horário de planejamento coletivo com Renata (Matemática), Paulo (Geografia) e Sérgio (Português). Como você abre a conversa?',
        options: [
          {
            label: 'Levar um rascunho curto: o problema real (“como a escola usa energia e o que podemos mudar?”), uma pergunta para cada colega (“o que da sua matéria ajudaria a responder isso?”) e uma proposta de pauta com tempo marcado.',
            to: 'pergunta-central',
            quality: 'construtiva',
            feedback:
              'Um rascunho aberto poupa tempo sem impor o projeto pronto. Perguntar o que cada matéria pode oferecer coloca os colegas como coautores, e a pauta com tempo respeita a reunião curta.',
          },
          {
            label: 'Apresentar o projeto inteiro já planejado, com as tarefas de cada matéria definidas por você.',
            to: 'colega-resistente',
            quality: 'arriscada',
            feedback:
              'Parece eficiente, mas os colegas recebem tarefas sem ter participado da decisão. Isso costuma gerar adesão formal, pouco compromisso e resistência de quem sente seu planejamento invadido.',
          },
          {
            label: 'Lançar o tema “energia” e pedir que cada um pense, até a próxima reunião, em algo para trabalhar.',
            to: 'colega-resistente',
            quality: 'parcial',
            feedback:
              'Deixar espaço para os colegas é positivo, mas um tema solto, sem problema nem pergunta comum, tende a virar quatro atividades paralelas. A próxima reunião pode começar do zero.',
          },
        ],
      },
      'pergunta-central': {
        id: 'pergunta-central',
        speaker: 'Renata',
        situation:
          'Renata se anima: “Posso trabalhar porcentagem e gráficos com as contas de luz da escola.” Paulo sugere falar das fontes de energia do Brasil. Sérgio fica em silêncio. Faltam 15 minutos de reunião.',
        options: [
          {
            label: 'Propor uma pergunta norteadora comum, como “Onde a nossa escola gasta energia e que mudanças a comunidade escolar pode adotar?”, e um produto final que exija as quatro matérias, por exemplo uma campanha com dados para a direção e as famílias.',
            to: 'colega-resistente',
            quality: 'construtiva',
            feedback:
              'A pergunta norteadora e o produto final criam dependência real entre as matérias: os dados de Matemática, a explicação de Ciências e o contexto de Geografia precisam do texto argumentativo de Português para chegar ao público.',
          },
          {
            label: 'Aproveitar o entusiasmo e fechar uma lista de conteúdos de cada matéria relacionados à energia.',
            to: 'calendario',
            quality: 'parcial',
            feedback:
              'A lista é um começo útil, mas organiza conteúdos lado a lado, sem dizer como eles se encontram. Sem uma pergunta comum, os estudantes podem não perceber a conexão.',
          },
          {
            label: 'Encerrar dizendo: “Então o tema é energia; cada um trabalha do seu jeito e no fim a gente faz uma exposição.”',
            to: 'fim-justaposto',
            quality: 'arriscada',
            feedback:
              'Esse é o caminho mais comum para a integração superficial: cada matéria fala de energia isoladamente e a exposição final apenas junta trabalhos que nunca conversaram entre si.',
          },
        ],
      },
      'colega-resistente': {
        id: 'colega-resistente',
        speaker: 'Sérgio',
        situation:
          'Sérgio, de Português, diz: “Eu tenho um currículo para cumprir. Não vou parar meu conteúdo para falar de conta de luz.” Os outros olham para você.',
        options: [
          {
            label: 'Validar a preocupação e perguntar o que ele já planejou para o bimestre. Se o conteúdo for, por exemplo, textos argumentativos, mostrar como a campanha pode ser justamente o contexto para trabalhá-los.',
            to: 'calendario',
            quality: 'construtiva',
            feedback:
              'Partir do currículo do colega transforma o projeto em aliado, e não em concorrente. A integração fica mais sólida quando cada matéria trabalha seus próprios objetivos dentro de uma situação comum.',
          },
          {
            label: 'Dizer que tudo bem, que ele pode participar só na apresentação final.',
            to: 'calendario',
            quality: 'parcial',
            feedback:
              'Respeita o limite do colega e evita conflito, mas o projeto perde a dimensão da linguagem e da argumentação. Vale deixar a porta aberta para uma participação maior mais adiante.',
          },
          {
            label: 'Responder que a coordenação apoia o projeto e que todos precisam participar.',
            to: 'fim-desgaste',
            quality: 'arriscada',
            feedback:
              'Usar a hierarquia para obter adesão pode até garantir a presença, mas gera ressentimento e participação apenas formal. A parceria pedagógica se constrói pelo sentido, não pela obrigação.',
          },
        ],
      },
      calendario: {
        id: 'calendario',
        speaker: 'Paulo',
        situation:
          'Na segunda reunião, Paulo lembra: “Eu só chego em fontes de energia daqui a três semanas, e Renata tem prova marcada no meio do mês.” Os calendários não batem.',
        options: [
          {
            label: 'Montar juntos uma linha do tempo de poucas semanas, com etapas (investigar, medir, analisar, comunicar) e o que cada matéria faz em cada etapa, ajustando a ordem dos conteúdos onde for possível e registrando tudo em um documento compartilhado.',
            to: 'avaliacao',
            quality: 'construtiva',
            feedback:
              'Organizar por etapas, e não por aulas idênticas, permite que cada professor contribua no seu ritmo sem perder a sequência do projeto. O registro compartilhado substitui reuniões extras e mantém todos alinhados.',
          },
          {
            label: 'Adiar o início do projeto para quando todos estiverem no conteúdo certo.',
            to: 'avaliacao',
            quality: 'parcial',
            feedback:
              'Esperar o alinhamento perfeito é compreensível, mas raramente ele acontece. O adiamento pode empurrar o projeto para o fim do período, quando sobra pouco tempo para a etapa de comunicação.',
          },
          {
            label: 'Começar sozinho em Ciências e deixar que os colegas “entrem quando puderem”.',
            to: 'fim-justaposto',
            quality: 'arriscada',
            feedback:
              'Sem combinação, cada matéria entra em um momento solto e os estudantes não enxergam o fio que liga as aulas. O projeto vira uma atividade de Ciências com participações eventuais.',
          },
        ],
      },
      avaliacao: {
        id: 'avaliacao',
        speaker: 'Renata',
        situation:
          'Renata pergunta: “E como vamos avaliar? Cada um dá a sua nota?” Faltam dez minutos e ninguém quer criar mais trabalho.',
        options: [
          {
            label: 'Combinar poucos critérios comuns para o produto final (uso correto dos dados, explicação científica, contextualização e clareza da argumentação) e manter, em cada matéria, a avaliação dos objetivos específicos ao longo das etapas.',
            to: 'conexoes',
            quality: 'construtiva',
            feedback:
              'Critérios comuns e simples mostram aos estudantes que o produto exige todas as matérias, enquanto as avaliações específicas acompanham o processo. Assim a avaliação é integrada sem sobrecarregar ninguém.',
          },
          {
            label: 'Cada professor avalia o produto final com seus próprios critérios, sem combinar.',
            to: 'conexoes',
            quality: 'parcial',
            feedback:
              'É prático, mas os estudantes podem receber mensagens diferentes sobre o mesmo trabalho e entender que cada matéria quer uma coisa. Combinar ao menos os critérios principais evita essa confusão.',
          },
          {
            label: 'Dar uma nota única de participação no projeto para todas as matérias.',
            to: 'fim-desgaste',
            quality: 'arriscada',
            feedback:
              'Uma nota genérica de participação não mostra o que cada estudante aprendeu e tende a gerar questionamentos de estudantes, famílias e colegas. Avaliação precisa estar ligada a objetivos claros.',
          },
        ],
      },
      conexoes: {
        id: 'conexoes',
        speaker: 'Yasmin',
        situation:
          'O projeto está em andamento. Na sua aula, Yasmin comenta: “Professora, a gente fez gráfico das contas de luz em Matemática, mas aqui é Ciências, né? Uma coisa não tem a ver com a outra.” Davi e Kauã concordam.',
        options: [
          {
            label: 'Retomar com a turma a pergunta norteadora no quadro, pedir que localizem onde cada aula ajudou a respondê-la e usar o gráfico feito em Matemática para discutir, em Ciências, quais aparelhos e hábitos explicam os picos de consumo.',
            to: 'fim-integrado',
            quality: 'construtiva',
            feedback:
              'Os estudantes não fazem a conexão sozinhos: ela precisa ser explicitada. Usar na sua aula um produto de outra matéria mostra, na prática, que os conhecimentos se complementam para responder à mesma pergunta.',
          },
          {
            label: 'Explicar rapidamente que o projeto é interdisciplinar e que as matérias estão trabalhando juntas.',
            to: 'fim-justaposto',
            quality: 'parcial',
            feedback:
              'A explicação informa, mas não faz os estudantes vivenciarem a conexão. Dizer que as matérias estão integradas é diferente de usar, de fato, o que foi produzido em uma para avançar na outra.',
          },
          {
            label: 'Responder: “Não se preocupem com isso, foquem no conteúdo de Ciências que vai cair na prova.”',
            to: 'fim-desgaste',
            quality: 'arriscada',
            feedback:
              'A resposta confirma a percepção de que as matérias são compartimentos separados e esvazia o sentido do projeto. A dúvida de Yasmin era uma ótima oportunidade de tornar a integração visível.',
          },
        ],
      },
      'fim-integrado': {
        id: 'fim-integrado',
        situation:
          'A turma apresenta à direção e às famílias uma campanha com gráficos, explicações sobre os aparelhos que mais consomem, informações sobre a origem da energia e cartas argumentativas. Sérgio comenta que os textos ficaram mais consistentes porque os estudantes tinham o que defender.',
        options: [],
        end: {
          title: 'Uma pergunta, quatro olhares',
          reflection:
            'A pergunta norteadora, o produto final comum, o calendário por etapas, os critérios combinados e a mediação das conexões em sala fizeram os estudantes usarem conhecimentos de várias matérias para responder a um problema real da escola.',
        },
      },
      'fim-justaposto': {
        id: 'fim-justaposto',
        situation:
          'Cada matéria trabalhou algo sobre energia, e a exposição final reuniu cartazes bem feitos. Mas, quando perguntados, os estudantes descrevem as atividades separadamente e não sabem dizer como elas se relacionam.',
        options: [],
        end: {
          title: 'Tema em comum, conexões ausentes',
          reflection:
            'Houve esforço e boas atividades, mas a integração ficou na superfície. Para a próxima vez, parta de uma pergunta que exija as diferentes matérias, combine etapas e critérios e torne as conexões explícitas para a turma.',
        },
      },
      'fim-desgaste': {
        id: 'fim-desgaste',
        situation:
          'O projeto termina às pressas. Um colega participa só formalmente, as notas geram reclamações e a turma vê o projeto como “trabalho a mais”. Na sala dos professores, ninguém quer repetir a experiência.',
        options: [],
        end: {
          title: 'Quando a parceria se desgasta',
          reflection:
            'Imposições, avaliações pouco claras e conexões não mediadas desgastaram a relação entre os colegas e com a turma. Recomece pelo diálogo: parta do currículo de cada colega, combine pouco e bem, e construa a integração junto com eles.',
        },
      },
    },
    script: [
      {
        title: 'Antes do projeto',
        steps: [
          'Escolha um problema real e próximo dos estudantes e transforme-o em uma pergunta norteadora que nenhuma matéria responda sozinha.',
          'Leve aos colegas um rascunho aberto e pergunte o que cada matéria pode contribuir, partindo do que eles já planejaram.',
          'Defina um produto final que dependa das contribuições de todas as matérias envolvidas.',
          'Monte uma linha do tempo por etapas, indicando o que cada matéria faz em cada uma, em um documento compartilhado.',
          'Combine poucos critérios comuns para o produto final e mantenha a avaliação específica de cada matéria.',
        ],
      },
      {
        title: 'Durante o projeto',
        steps: [
          'Deixe a pergunta norteadora visível e retome-a no início das aulas do projeto.',
          'Use na sua aula materiais produzidos nas outras matérias, como gráficos, mapas ou textos.',
          'Peça aos estudantes que expliquem como cada aula ajudou a responder à pergunta.',
          'Troque recados curtos com os colegas pelo documento compartilhado para ajustar o calendário sem reuniões extras.',
        ],
      },
      {
        title: 'Depois',
        steps: [
          'Converse com a turma sobre o que cada matéria trouxe para a resposta final.',
          'Faça uma conversa breve com os colegas sobre o que funcionou e o que mudar.',
          'Registre a pergunta, as etapas e os critérios para reaproveitar ou adaptar o projeto.',
          'Compartilhe os resultados com a comunidade escolar e reconheça a contribuição de cada colega.',
        ],
      },
    ],
    reflectionQuestions: [
      'Que problema real da sua escola exigiria, de fato, o olhar de mais de uma matéria?',
      'Como convidar um colega resistente partindo do que ele já planejou?',
      'Como avaliar de forma integrada sem criar mais trabalho para todos?',
      'O que você pode fazer em sala para que os estudantes percebam as conexões entre as matérias?',
    ],
  },
];
