import type { MicroImmersion, TrainingNode } from '../types/models';

/**
 * Microimersões de formação do professor: situações simuladas de sala com caminhos ramificados.
 * Todos os estudantes citados nos cenários são personagens fictícios.
 */

/** Nó único para microimersões em preparo (garante que startNodeId resolva). */
const emPreparo = (tema: string): Record<string, TrainingNode> => ({
  inicio: {
    id: 'inicio',
    situation: `Esta microimersão sobre ${tema} está em preparo. Em breve você poderá praticar situações simuladas de sala sobre o tema.`,
    options: [],
    end: {
      title: 'Em preparo',
      reflection: 'Enquanto isso, registre situações reais da sua prática sobre este tema: elas ajudam a planejar a formação.',
    },
  },
});

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
    summary: 'Como conduzir projetos com pergunta motivadora, etapas, produtos e avaliação ao longo do processo.',
    artId: 'train-projetos',
    status: 'em-preparo',
    intro: [],
    startNodeId: 'inicio',
    nodes: emPreparo('aprendizagem baseada em projetos'),
    script: [],
    reflectionQuestions: [],
  },
  {
    id: 'inclusao-e-adaptacao',
    title: 'Inclusão e adaptação',
    topic: 'Educação inclusiva',
    durationMin: 20,
    summary: 'Como adaptar atividades para que todos os estudantes participem e aprendam, considerando diferentes necessidades.',
    artId: 'train-inclusao',
    status: 'em-preparo',
    intro: [],
    startNodeId: 'inicio',
    nodes: emPreparo('inclusão e adaptação'),
    script: [],
    reflectionQuestions: [],
  },
  {
    id: 'avaliacao-formativa',
    title: 'Avaliação formativa',
    topic: 'Acompanhamento da aprendizagem',
    durationMin: 20,
    summary: 'Como observar, registrar e usar evidências de aprendizagem para ajustar o ensino ao longo do caminho.',
    artId: 'train-avaliacao',
    status: 'em-preparo',
    intro: [],
    startNodeId: 'inicio',
    nodes: emPreparo('avaliação formativa'),
    script: [],
    reflectionQuestions: [],
  },
  {
    id: 'uso-responsavel-de-ia',
    title: 'Uso responsável de IA',
    topic: 'Inteligência artificial na escola',
    durationMin: 20,
    summary: 'Como lidar com o uso de ferramentas de inteligência artificial pelos estudantes, com ética, autoria e pensamento crítico.',
    artId: 'train-ia',
    status: 'em-preparo',
    intro: [],
    startNodeId: 'inicio',
    nodes: emPreparo('uso responsável de inteligência artificial'),
    script: [],
    reflectionQuestions: [],
  },
  {
    id: 'integracao-entre-materias',
    title: 'Integração entre matérias',
    topic: 'Interdisciplinaridade',
    durationMin: 20,
    summary: 'Como planejar com colegas de outras matérias para que os estudantes conectem conhecimentos.',
    artId: 'train-integracao',
    status: 'em-preparo',
    intro: [],
    startNodeId: 'inicio',
    nodes: emPreparo('integração entre matérias'),
    script: [],
    reflectionQuestions: [],
  },
];
