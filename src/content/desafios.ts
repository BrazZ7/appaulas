/**
 * Desafios da turma, roteiros de apresentação para datas comemorativas e
 * projetos de Feira de Ciências com passo a passo ilustrado.
 * Os roteiros servem tanto para apresentação no palco quanto para o desafio “Nosso filme”.
 */
import type { CenaId } from '../components/Cena';
import type { SubjectId } from '../types/models';

export interface Passo { titulo: string; texto: string; cena: CenaId; dica?: string; tempo?: string }
export interface Fala { quem: string; texto: string; acao?: string }
export interface CenaRoteiro { titulo: string; local: string; duracao: string; cena: CenaId; falas: Fala[] }

export type DesafioTipo = 'desafio' | 'apresentacao' | 'projeto';

export interface Desafio {
  id: string;
  tipo: DesafioTipo;
  title: string;
  subtitle: string;
  resumo: string;
  /** Data comemorativa (dd/mm), quando houver. */
  data?: string;
  subjects: SubjectId[];
  anos: number[];
  duracao: string;
  participantes: string;
  capa: CenaId;
  cor: string;
  objetivos: string[];
  materiais: string[];
  passos: Passo[];
  roteiro?: CenaRoteiro[];
  personagens?: string[];
  seguranca?: string[];
  ciencia?: { pergunta: string; hipotese: string; explicacao: string };
  cuidados?: string[];
  inclusao: string[];
  avaliacao: string[];
}

const TODOS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const F1 = [1, 2, 3, 4, 5];

const INCLUSAO_PALCO = [
  'Ofereça papéis com e sem fala: narração, sonoplastia, cenário, contrarregra, câmera, cartazes.',
  'Para estudantes com TEA: combine antes a ordem das cenas com um quadro visual, ensaie no local e avise sobre aplausos e barulho (protetor auricular é bem-vindo).',
  'Para estudantes com TDAH: falas curtas, marcações no chão com fita e uma tarefa concreta em cada cena.',
  'Falas podem ser lidas em cartões, gravadas antes ou apresentadas em Libras.',
];

// ───────────── Roteiros de apresentação ─────────────

export const APRESENTACOES: Desafio[] = [
  {
    id: 'consciencia-negra', tipo: 'apresentacao', title: 'Vozes que resistem', subtitle: 'Apresentação para o Dia da Consciência Negra', data: '20/11',
    resumo: 'Um griô (contador de histórias) conduz a turma por quatro momentos: a resistência de Palmares, a força de Dandara, a escrita de Carolina Maria de Jesus e a cultura negra viva hoje — terminando com uma roda de capoeira e um compromisso antirracista da turma.',
    subjects: ['historia', 'artes', 'portugues'], anos: [4, 5, 6, 7, 8, 9], duracao: '15 a 20 minutos', participantes: '12 a 30 estudantes', capa: 'tambor', cor: '#f59e0b',
    objetivos: ['Reconhecer personagens e saberes negros na história do Brasil.', 'Valorizar a cultura afro-brasileira como parte da identidade de todos.', 'Construir um compromisso coletivo contra o racismo na escola.'],
    personagens: ['Griô (narrador/a)', 'Zumbi dos Palmares', 'Dandara', 'Carolina Maria de Jesus', 'Estudantes de hoje (coro)', 'Roda de capoeira e percussão'],
    materiais: ['Tecidos coloridos para o cenário', 'Tambor ou balde virado (percussão)', 'Cartazes com frases e datas', 'Caderno antigo para Carolina', 'Fita para marcar o palco', 'Caixinha de som (opcional)'],
    passos: [
      { titulo: 'Pesquisa em equipes', texto: 'Divida a turma em quatro equipes (Palmares, Dandara, Carolina, Cultura viva). Cada equipe pesquisa fatos, imagens e uma frase importante sobre seu tema.', cena: 'lupa', tempo: '2 aulas' },
      { titulo: 'Distribuição de papéis', texto: 'Escolham narrador(a), personagens, coro, percussão, cenário e cartazes. Todos têm uma função — inclusive quem prefere não falar.', cena: 'grupo', tempo: '20 min' },
      { titulo: 'Cenário e cartazes', texto: 'Montem um painel com tecidos e quatro cartazes: “Palmares 1605–1695”, “Dandara”, “Quarto de Despejo (1960)”, “Cultura negra hoje”.', cena: 'cartaz', tempo: '1 aula' },
      { titulo: 'Ensaio por cenas', texto: 'Ensaiem cena por cena com as marcações no chão. O tambor marca a troca de cena (três batidas).', cena: 'ensaiar', tempo: '2 a 3 ensaios', dica: 'Grave um ensaio com o celular e assistam juntos: é o melhor jeito de melhorar.' },
      { titulo: 'Apresentação', texto: 'Apresentem para outras turmas ou para as famílias. No fim, a plateia é convidada a ler o compromisso junto com a turma.', cena: 'aplausos' },
    ],
    roteiro: [
      { titulo: 'Abertura — a roda do griô', local: 'Palco com tecidos ao fundo; turma em semicírculo', duracao: '3 min', cena: 'tambor', falas: [
        { quem: 'Percussão', texto: '', acao: 'Três batidas fortes no tambor. Silêncio.' },
        { quem: 'Griô', texto: 'Na África, quem guarda a memória do povo é o griô. Hoje, eu vou contar histórias que muita gente tentou apagar — mas que continuam vivas em nós.' },
        { quem: 'Coro', texto: 'Quem conta a história também escolhe quem lembra!' },
      ] },
      { titulo: 'Cena 1 — Palmares', local: 'Lado esquerdo do palco', duracao: '4 min', cena: 'grupo', falas: [
        { quem: 'Griô', texto: 'Na Serra da Barriga, em Alagoas, pessoas escravizadas fugiram e construíram Palmares: um quilombo onde viveram milhares de pessoas por quase cem anos.' },
        { quem: 'Zumbi', texto: 'Aqui plantamos, construímos casas e criamos nossos filhos em liberdade. Liberdade não se pede: se constrói.' },
        { quem: 'Coro', texto: 'Zumbi foi morto em 20 de novembro de 1695. Por isso, hoje é o Dia da Consciência Negra.' },
      ] },
      { titulo: 'Cena 2 — Dandara', local: 'Centro do palco', duracao: '3 min', cena: 'ensaiar', falas: [
        { quem: 'Griô', texto: 'Muitas vezes os livros esqueceram as mulheres de Palmares. Dandara lutou, plantou e liderou.' },
        { quem: 'Dandara', texto: 'Eu não nasci para obedecer a quem me quer presa. Meu nome é Dandara, e minha luta é pela vida de todos nós.' },
      ] },
      { titulo: 'Cena 3 — Carolina Maria de Jesus', local: 'Lado direito, com uma mesinha e um caderno', duracao: '3 min', cena: 'escrever', falas: [
        { quem: 'Griô', texto: 'Séculos depois, numa favela de São Paulo, uma mulher catava papel para sobreviver — e usava o papel para escrever.' },
        { quem: 'Carolina', texto: 'Eu escrevo o que vejo: a fome, a chuva no barraco, os sonhos dos meus filhos. Meu livro se chama “Quarto de Despejo”.', acao: 'Levanta o caderno para a plateia.' },
        { quem: 'Coro', texto: 'O livro de Carolina foi traduzido para mais de dez línguas!' },
      ] },
      { titulo: 'Cena 4 — Cultura viva e compromisso', local: 'Palco todo; roda de capoeira no centro', duracao: '5 min', cena: 'aplausos', falas: [
        { quem: 'Griô', texto: 'A história continua: no samba, na capoeira, no jongo, na comida, nas palavras que falamos todos os dias — como “cafuné”, “moleque” e “quitanda”.', acao: 'Roda de capoeira ou dança com percussão por 1 minuto.' },
        { quem: 'Estudantes de hoje', texto: 'Nós nos comprometemos: não rir de piadas racistas, chamar um adulto quando virmos discriminação e aprender todo dia sobre quem construiu este país.' },
        { quem: 'Todos', texto: 'Consciência negra é todo dia!', acao: 'Três batidas no tambor. Agradecimento.' },
      ] },
    ],
    cuidados: ['Não use “blackface”, perucas ou caracterizações que imitem traços físicos — o figurino é feito com tecidos, cores e acessórios.', 'Estudantes negros não devem ser escalados “por serem negros”: todos podem interpretar todos os papéis.', 'Converse antes sobre racismo com a turma e acolha relatos com cuidado.'],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Pesquisa da equipe (fontes e informações corretas).', 'Participação nos ensaios e na apresentação.', 'Registro escrito: “O que eu aprendi e o que vou fazer diferente”.'],
  },
  {
    id: 'natal-luz', tipo: 'apresentacao', title: 'A luz que a gente divide', subtitle: 'Auto de Natal para toda a escola', data: '25/12',
    resumo: 'Uma árvore de Natal apagada só volta a brilhar quando cada personagem descobre que o maior presente é dividir: tempo, cuidado e atenção. Funciona com qualquer número de estudantes e inclui famílias de diferentes crenças.',
    subjects: ['artes', 'portugues'], anos: TODOS, duracao: '10 a 15 minutos', participantes: '10 a 35 estudantes', capa: 'estrela', cor: '#16a34a',
    objetivos: ['Trabalhar valores de solidariedade e convivência.', 'Desenvolver expressão oral, corporal e musical.', 'Envolver as famílias num momento de celebração.'],
    personagens: ['Narrador(a)', 'Árvore (2 a 3 estudantes com a árvore de papel)', 'Estrela', 'Menina apressada', 'Vô Antônio', 'Vizinho novo', 'Coral (resto da turma)'],
    materiais: ['Árvore grande de papelão pintada', 'Estrelas de papel para cada estudante', 'Lanterna ou pisca-pisca a pilha', 'Caixas de presente vazias', 'Música natalina instrumental'],
    passos: [
      { titulo: 'Leitura do roteiro', texto: 'Leiam o roteiro juntos e conversem: o que cada um pode “dividir” com alguém neste fim de ano?', cena: 'escrever', tempo: '1 aula' },
      { titulo: 'Construção da árvore', texto: 'Recortem a árvore no papelão, pintem e prendam pequenas estrelas que vão “acender” uma a uma (vire a estrela do lado colorido).', cena: 'cortar', tempo: '1 a 2 aulas' },
      { titulo: 'Coral', texto: 'Escolham uma música conhecida pela turma para o final. Quem não quer cantar pode tocar chocalho ou segurar as estrelas.', cena: 'microfone' },
      { titulo: 'Ensaio geral', texto: 'Ensaiem com o cenário e marquem quando cada estrela da árvore acende.', cena: 'ensaiar', tempo: '2 ensaios' },
      { titulo: 'Apresentação', texto: 'No final, cada estudante entrega uma estrela de papel a alguém da plateia com uma mensagem escrita por ele.', cena: 'aplausos' },
    ],
    roteiro: [
      { titulo: 'A árvore apagada', local: 'Centro do palco, árvore sem luzes', duracao: '2 min', cena: 'estrela', falas: [
        { quem: 'Narrador', texto: 'Era véspera de Natal, e a árvore da praça não acendia. Os eletricistas tentaram de tudo. Nada!' },
        { quem: 'Estrela', texto: 'Eu sei o segredo: esta árvore só brilha quando alguém divide alguma coisa de verdade.' },
      ] },
      { titulo: 'A menina apressada', local: 'Lado esquerdo', duracao: '2 min', cena: 'grupo', falas: [
        { quem: 'Menina', texto: 'Não tenho tempo! Preciso comprar presentes, embrulhar, correr!', acao: 'Passa correndo com caixas.' },
        { quem: 'Vô Antônio', texto: 'Menina, você me ajuda a atravessar a rua? E me conta como foi seu ano?' },
        { quem: 'Menina', texto: '(para, pensa) …Claro, vô. Tenho tempo, sim.', acao: 'Uma estrela da árvore acende.' },
      ] },
      { titulo: 'O vizinho novo', local: 'Lado direito', duracao: '2 min', cena: 'ensaiar', falas: [
        { quem: 'Vizinho novo', texto: 'Acabei de mudar. Não conheço ninguém por aqui.' },
        { quem: 'Coral', texto: 'Vem com a gente! Aqui tem lugar para mais um!', acao: 'O coral abre espaço. Mais estrelas acendem.' },
      ] },
      { titulo: 'A luz de todos', local: 'Palco todo', duracao: '4 min', cena: 'aplausos', falas: [
        { quem: 'Narrador', texto: 'Naquela noite, a árvore brilhou como nunca. Não por causa de fios e lâmpadas, mas porque cada um dividiu um pouco de si.' },
        { quem: 'Todos', texto: 'O melhor presente é estar junto!', acao: 'Música final. Entrega das estrelas à plateia.' },
      ] },
    ],
    cuidados: ['Lembre que nem todas as famílias celebram o Natal da mesma forma: o roteiro foca em valores compartilhados.'],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Participação e cooperação nos ensaios.', 'Mensagem escrita na estrela (produção de texto curta).'],
  },
  {
    id: 'feira-ciencias-abertura', tipo: 'apresentacao', title: 'Cientistas por um dia', subtitle: 'Abertura da Feira de Ciências', data: 'Feira',
    resumo: 'Uma apresentação curta e divertida que abre a Feira de Ciências: dois apresentadores de “telejornal científico” chamam repórteres que contam, em 30 segundos, o que cada grupo vai mostrar — e terminam com um experimento ao vivo.',
    subjects: ['ciencias', 'portugues', 'tecnologia'], anos: [3, 4, 5, 6, 7, 8, 9], duracao: '10 minutos', participantes: 'Toda a turma (2 apresentadores + 1 repórter por grupo)', capa: 'erupcao', cor: '#22c55e',
    objetivos: ['Comunicar ideias científicas de forma clara e breve.', 'Despertar a curiosidade do público para os estandes.', 'Praticar o método científico: pergunta, hipótese, teste, conclusão.'],
    personagens: ['Apresentador(a) 1', 'Apresentador(a) 2', 'Repórteres dos grupos', 'Cientista do experimento ao vivo'],
    materiais: ['Mesa com toalha', 'Microfone de papelão', 'Cartaz “Jornal da Ciência”', 'Materiais do vulcão (ver projeto)', 'Jalecos ou camisetas brancas'],
    passos: [
      { titulo: 'Cada grupo escreve seu “chamado”', texto: 'Em até 3 frases: qual era a pergunta, o que testaram e uma curiosidade. Ex.: “Será que a luz faz o feijão crescer mais rápido? Testamos por 10 dias. Venham ver o resultado!”', cena: 'escrever', tempo: '1 aula' },
      { titulo: 'Montagem do estúdio', texto: 'Mesa no centro, cartaz do jornal ao fundo, microfones de papelão.', cena: 'cartaz' },
      { titulo: 'Ensaio com cronômetro', texto: 'Cada repórter tem 30 segundos. Ensaiem com cronômetro para a abertura não passar de 10 minutos.', cena: 'microfone', dica: 'Quem não quiser falar pode segurar o cartaz do grupo enquanto o colega lê.' },
      { titulo: 'Experimento ao vivo', texto: 'Terminem com o vulcão de bicarbonato (veja o projeto) em uma bandeja, longe da plateia.', cena: 'erupcao' },
    ],
    roteiro: [
      { titulo: 'Escalada do jornal', local: 'Mesa do estúdio', duracao: '2 min', cena: 'microfone', falas: [
        { quem: 'Apresentador 1', texto: 'Boa tarde! Está começando o Jornal da Ciência, ao vivo da nossa escola!' },
        { quem: 'Apresentador 2', texto: 'Hoje: plantas que crescem no escuro? Água suja que fica limpa? E um vulcão… aqui no palco!' },
      ] },
      { titulo: 'Reportagens', local: 'Repórteres entram um a um', duracao: '6 min', cena: 'lupa', falas: [
        { quem: 'Apresentador 1', texto: 'Vamos ao nosso primeiro repórter. Pode falar!' },
        { quem: 'Repórter', texto: '(lê o chamado do grupo em 30 segundos)', acao: 'Repetir para cada grupo.' },
      ] },
      { titulo: 'Experimento ao vivo', local: 'Mesa com bandeja', duracao: '2 min', cena: 'erupcao', falas: [
        { quem: 'Cientista', texto: 'Hipótese: vinagre e bicarbonato produzem um gás. Vamos testar!', acao: 'Despeja o vinagre. Erupção!' },
        { quem: 'Apresentadores', texto: 'Ciência é perguntar, testar e descobrir. A feira está aberta!' },
      ] },
    ],
    seguranca: ['O experimento ao vivo é feito por um adulto ou com supervisão, usando óculos de proteção.'],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Clareza do chamado (pergunta, teste, curiosidade).', 'Respeito ao tempo.'],
  },
  {
    id: 'folclore', tipo: 'apresentacao', title: 'O julgamento do Saci', subtitle: 'Teatro para o Dia do Folclore', data: '22/08',
    resumo: 'O Saci é acusado de bagunçar a escola! No tribunal da floresta, Curupira, Iara, Boitatá e a Mula sem Cabeça são testemunhas — e a plateia descobre que cada lenda guarda um ensinamento sobre a natureza.',
    subjects: ['portugues', 'artes', 'historia'], anos: F1, duracao: '12 minutos', participantes: '10 a 30 estudantes', capa: 'folhas', cor: '#65a30d',
    objetivos: ['Conhecer lendas do folclore brasileiro e suas origens.', 'Relacionar as lendas com a proteção da natureza.', 'Desenvolver leitura expressiva.'],
    personagens: ['Juíza Coruja', 'Saci', 'Curupira (defensor)', 'Iara', 'Boitatá', 'Mula sem Cabeça', 'Jurados (resto da turma)'],
    materiais: ['Gorro vermelho', 'Cabelo de lã laranja para o Curupira', 'Tecido azul (rio)', 'Folhas de papel', 'Martelinho de juíza'],
    passos: [
      { titulo: 'Conhecendo as lendas', texto: 'Cada grupo lê uma lenda e descobre: de onde ela vem e o que ela ensina.', cena: 'lupa', tempo: '1 aula' },
      { titulo: 'Figurino simples', texto: 'Use acessórios (gorro, tecido, papel) em vez de fantasias completas. Pinte folhas para o cenário da floresta.', cena: 'cortar' },
      { titulo: 'Ensaio do tribunal', texto: 'Marquem onde fica a juíza, o réu e as testemunhas. Cada testemunha entra, fala e senta.', cena: 'ensaiar' },
      { titulo: 'Votação da plateia', texto: 'No final, a plateia vota levantando folhas verdes (inocente) ou vermelhas (culpado).', cena: 'aplausos' },
    ],
    roteiro: [
      { titulo: 'A acusação', local: 'Tribunal na floresta', duracao: '3 min', cena: 'folhas', falas: [
        { quem: 'Juíza Coruja', texto: 'Silêncio na floresta! O Saci é acusado de esconder lápis, trançar cabelos e fazer redemoinhos no pátio!' },
        { quem: 'Saci', texto: 'Eu só brinco! Quem nunca deu uma risadinha?', acao: 'Pula num pé só.' },
      ] },
      { titulo: 'As testemunhas', local: 'Cada uma entra pela lateral', duracao: '6 min', cena: 'ensaiar', falas: [
        { quem: 'Curupira', texto: 'Excelência, eu protejo as matas com meus pés virados. O Saci me ajuda a confundir quem vem cortar árvores!' },
        { quem: 'Iara', texto: 'Eu cuido dos rios. Quem joga lixo na água leva um susto — e o Saci sempre me avisa.' },
        { quem: 'Boitatá', texto: 'Eu sou a cobra de fogo que protege os campos das queimadas. Saci é nosso amigo!' },
        { quem: 'Mula sem Cabeça', texto: 'Eu só passei para dizer: as lendas existem para lembrar que a natureza tem guardiões!' },
      ] },
      { titulo: 'O veredito', local: 'Palco todo', duracao: '3 min', cena: 'aplausos', falas: [
        { quem: 'Juíza Coruja', texto: 'Plateia, qual é o veredito?', acao: 'Votação com folhas.' },
        { quem: 'Saci', texto: 'Prometo bagunçar menos… e proteger mais!' },
        { quem: 'Todos', texto: 'Viva o folclore brasileiro!' },
      ] },
    ],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Leitura expressiva.', 'Desenho: “Que guardião da natureza eu seria?”'],
  },
  {
    id: 'povos-indigenas', tipo: 'apresentacao', title: 'Somos muitos povos', subtitle: 'Apresentação para o Dia dos Povos Indígenas', data: '19/04',
    resumo: 'Em vez de “fantasias”, a turma apresenta o que pesquisou sobre três povos indígenas reais, com mapa, palavras em línguas indígenas, uma história contada e brincadeiras tradicionais — e desmonta estereótipos com um quiz para a plateia.',
    subjects: ['historia', 'geografia', 'artes'], anos: [3, 4, 5, 6, 7], duracao: '15 minutos', participantes: '12 a 30 estudantes', capa: 'folhas', cor: '#b45309',
    objetivos: ['Reconhecer a diversidade dos povos indígenas no Brasil (mais de 300 povos e 270 línguas).', 'Combater estereótipos.', 'Valorizar saberes indígenas no cotidiano.'],
    personagens: ['Apresentadores', 'Equipe do mapa', 'Equipe das palavras', 'Contadores da história', 'Equipe do quiz'],
    materiais: ['Mapa do Brasil grande', 'Cartões com palavras de origem indígena', 'Cartazes com fotos de pesquisa (com fonte)', 'Peteca ou materiais para brincadeira'],
    passos: [
      { titulo: 'Escolha de três povos', texto: 'Ex.: Guarani, Yanomami e Pataxó. Pesquisem onde vivem, língua, alimentação, arte e desafios atuais — de preferência com fontes produzidas por indígenas.', cena: 'lupa', tempo: '2 aulas' },
      { titulo: 'Mapa e cartazes', texto: 'Marquem no mapa onde vive cada povo. Façam cartazes com o que descobriram.', cena: 'cartaz' },
      { titulo: 'Quiz de estereótipos', texto: 'Preparem perguntas de verdadeiro ou falso: “Todo indígena mora na floresta?” (Falso — muitos vivem em cidades.)', cena: 'escrever' },
      { titulo: 'Apresentação', texto: 'Apresentem para outras turmas e terminem com uma brincadeira tradicional, como a peteca (de origem tupi).', cena: 'aplausos' },
    ],
    roteiro: [
      { titulo: 'Abertura', local: 'Frente do palco com o mapa', duracao: '3 min', cena: 'grupo', falas: [
        { quem: 'Apresentador', texto: 'Quantos povos indígenas existem no Brasil? Um? Dez? São mais de 300, falando mais de 270 línguas!' },
        { quem: 'Equipe do mapa', texto: 'Os Guarani vivem no Sul e no Centro-Oeste; os Yanomami, em Roraima e no Amazonas; os Pataxó, no sul da Bahia.', acao: 'Apontam no mapa.' },
      ] },
      { titulo: 'Palavras que usamos todo dia', local: 'Centro', duracao: '3 min', cena: 'cartaz', falas: [
        { quem: 'Equipe das palavras', texto: 'Pipoca, mandioca, capivara, Ipanema, Paraná… todas vêm de línguas indígenas!', acao: 'Mostram cartões.' },
      ] },
      { titulo: 'Quiz com a plateia', local: 'Palco todo', duracao: '6 min', cena: 'microfone', falas: [
        { quem: 'Equipe do quiz', texto: 'Verdadeiro ou falso: indígena que usa celular deixa de ser indígena?', acao: 'Plateia responde levantando cartões.' },
        { quem: 'Equipe do quiz', texto: 'Falso! A cultura muda com o tempo — a nossa também. Identidade não depende de objetos.' },
      ] },
      { titulo: 'Encerramento', local: 'Pátio', duracao: '3 min', cena: 'aplausos', falas: [
        { quem: 'Todos', texto: 'Antes de 1500 isso aqui já tinha nome, língua e história. Respeito é aprender todos os dias!', acao: 'Brincadeira de peteca com a plateia.' },
      ] },
    ],
    cuidados: ['Não use cocares, pinturas corporais ou “fantasias de índio”: são símbolos culturais e religiosos.', 'Use “povos indígenas” (no plural) e cite nomes dos povos.', 'Se possível, convide uma pessoa indígena para conversar com a turma.'],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Qualidade da pesquisa e uso de fontes.', 'Participação no quiz.'],
  },
  {
    id: 'meio-ambiente', tipo: 'apresentacao', title: 'O planeta pede socorro (e a gente responde)', subtitle: 'Apresentação para o Dia do Meio Ambiente', data: '05/06',
    resumo: 'Um telefone toca no palco: é o Planeta Terra pedindo ajuda! Rio, Floresta, Ar e Oceano contam seus problemas, e equipes de “agentes do futuro” apresentam soluções que a escola pode pôr em prática.',
    subjects: ['ciencias', 'geografia'], anos: [2, 3, 4, 5, 6, 7], duracao: '12 minutos', participantes: '10 a 30 estudantes', capa: 'reciclar', cor: '#22c55e',
    objetivos: ['Relacionar ações humanas a problemas ambientais.', 'Propor soluções possíveis para a escola e o bairro.'],
    personagens: ['Planeta Terra (voz ao telefone)', 'Rio', 'Floresta', 'Ar', 'Oceano', 'Agentes do futuro'],
    materiais: ['Telefone de brinquedo', 'Placas com nomes dos personagens', 'Materiais recicláveis para o cenário', 'Cartazes com soluções'],
    passos: [
      { titulo: 'Diagnóstico da escola', texto: 'Andem pela escola anotando: onde há lixo? Torneira pingando? Luz acesa à toa?', cena: 'lupa', tempo: '1 aula' },
      { titulo: 'Soluções em cartazes', texto: 'Cada equipe escolhe um problema e cria um cartaz com uma solução possível.', cena: 'cartaz' },
      { titulo: 'Cenário com recicláveis', texto: 'Montem o cenário com garrafas, caixas e papel reaproveitado.', cena: 'reciclar' },
      { titulo: 'Apresentação e campanha', texto: 'Depois da apresentação, a turma lança uma campanha de verdade por um mês.', cena: 'aplausos' },
    ],
    roteiro: [
      { titulo: 'O telefonema', local: 'Centro do palco', duracao: '2 min', cena: 'microfone', falas: [
        { quem: 'Agente', texto: 'Alô? Quem fala?' },
        { quem: 'Planeta Terra', texto: 'Aqui é a Terra. Estou com febre, minhas florestas estão diminuindo e meus rios estão cansados. Vocês podem me ajudar?' },
      ] },
      { titulo: 'Os pedidos', local: 'Cada personagem entra', duracao: '5 min', cena: 'folhas', falas: [
        { quem: 'Rio', texto: 'Jogam lixo em mim e eu transbordo nas chuvas. Quem sofre são as pessoas do bairro.' },
        { quem: 'Floresta', texto: 'Cada árvore cortada é uma casa a menos para os animais — e menos sombra e chuva para vocês.' },
        { quem: 'Oceano', texto: 'Tem mais plástico chegando em mim do que peixes nascendo em alguns lugares.' },
      ] },
      { titulo: 'As respostas', local: 'Palco todo', duracao: '5 min', cena: 'reciclar', falas: [
        { quem: 'Agentes do futuro', texto: 'Na nossa escola vamos: separar o lixo, fechar torneiras, apagar luzes e plantar uma árvore por turma!', acao: 'Mostram cartazes.' },
        { quem: 'Planeta Terra', texto: 'Obrigada! Pequenas ações, feitas por muita gente, mudam o mundo.' },
      ] },
    ],
    inclusao: INCLUSAO_PALCO,
    avaliacao: ['Diagnóstico da escola registrado.', 'Execução da campanha.'],
  },
  {
    id: 'festa-junina', tipo: 'apresentacao', title: 'Quadrilha das profissões', subtitle: 'Quadrilha junina com narração e marcação', data: 'Junho',
    resumo: 'Uma quadrilha tradicional com marcações fáceis, contada como a história de uma vila onde cada morador tem uma profissão — termina com o casamento caipira e uma homenagem aos trabalhadores do campo.',
    subjects: ['educacao-fisica', 'artes', 'historia'], anos: TODOS, duracao: '8 a 12 minutos', participantes: '12 a 40 estudantes (em pares ou trios)', capa: 'fogueira', cor: '#ea580c',
    objetivos: ['Conhecer a origem das festas juninas e a cultura do campo.', 'Trabalhar ritmo, coordenação e cooperação.'],
    materiais: ['Música de quadrilha', 'Bandeirinhas', 'Chapéus de palha', 'Fogueira de papel celofane', 'Plaquinhas de profissões (padeiro, agricultora, costureira…)'],
    passos: [
      { titulo: 'Origem da festa', texto: 'Converse sobre a colheita do milho, a vida no campo e por que comemos pamonha, canjica e pé de moleque em junho.', cena: 'folhas' },
      { titulo: 'Marcações básicas', texto: 'Ensinem 5 marcações: “anarriê” (volta ao lugar), “caminho da roça”, “olha a chuva” (mão na cabeça), “é mentira!”, “túnel”.', cena: 'grupo', tempo: '2 aulas' },
      { titulo: 'Cenário', texto: 'Bandeirinhas com papel reaproveitado e a fogueira de papel celofane.', cena: 'fogueira' },
      { titulo: 'Ensaio com música', texto: 'Ensaiem com o marcador (pode ser o professor ou um estudante).', cena: 'ensaiar', dica: 'Pares podem ser de qualquer combinação — e quem prefere pode ser marcador ou tocar instrumento.' },
    ],
    roteiro: [
      { titulo: 'Entrada da vila', local: 'Pátio', duracao: '3 min', cena: 'fogueira', falas: [
        { quem: 'Marcador', texto: 'Atenção, minha gente! Chegou o povo da vila: a padeira, o agricultor, a costureira, o pescador!', acao: 'Pares entram com plaquinhas.' },
        { quem: 'Marcador', texto: 'Cumprimenta o par! Cumprimenta a plateia!' },
      ] },
      { titulo: 'Quadrilha', local: 'Pátio', duracao: '5 min', cena: 'grupo', falas: [
        { quem: 'Marcador', texto: 'Caminho da roça! … Olha a chuva! … É mentira! … Túnel!', acao: 'Marcações com a música.' },
      ] },
      { titulo: 'Homenagem', local: 'Roda', duracao: '2 min', cena: 'aplausos', falas: [
        { quem: 'Todos', texto: 'Viva quem planta e colhe o nosso alimento! Viva São João!' },
      ] },
    ],
    cuidados: ['Evite caracterizações que ridicularizem pessoas do campo (dentes pintados, roupas rasgadas de propósito).'],
    inclusao: ['Pares em cadeira de rodas participam com marcações adaptadas (giro, túnel com braços).', ...INCLUSAO_PALCO.slice(1)],
    avaliacao: ['Participação e coordenação.', 'Registro: “Uma comida junina e de onde ela vem”.'],
  },
];

// ───────────── Projetos de Feira de Ciências ─────────────

export const PROJETOS_FEIRA: Desafio[] = [
  {
    id: 'vulcao', tipo: 'projeto', title: 'Vulcão de bicarbonato', subtitle: 'Reações químicas que produzem gás', subjects: ['ciencias'], anos: [2, 3, 4, 5, 6, 7], duracao: '2 aulas', participantes: 'Grupos de 3 a 5', capa: 'erupcao', cor: '#ea580c',
    resumo: 'Um modelo de vulcão em que a reação entre vinagre e bicarbonato de sódio produz gás carbônico e faz a “lava” transbordar.',
    objetivos: ['Observar uma reação química.', 'Diferenciar modelo científico de fenômeno real.'],
    materiais: ['Garrafa PET pequena', 'Argila, massinha ou papel machê', 'Bandeja', '2 colheres de bicarbonato de sódio', 'Meio copo de vinagre', 'Detergente e corante (ou suco em pó vermelho)'],
    ciencia: { pergunta: 'O que acontece quando misturamos vinagre e bicarbonato?', hipotese: 'Vai formar espuma porque libera um gás.', explicacao: 'O ácido acético do vinagre reage com o bicarbonato e libera gás carbônico (CO₂). As bolhas, presas pelo detergente, formam a espuma que transborda. Vulcões reais funcionam de outro jeito: a lava é rocha derretida pelo calor do interior da Terra.' },
    passos: [
      { titulo: 'Monte o vulcão', texto: 'Coloque a garrafa no centro da bandeja e modele a montanha em volta com argila ou papel machê, deixando a boca da garrafa livre.', cena: 'colar', tempo: '30 min' },
      { titulo: 'Prepare a “lava”', texto: 'Dentro da garrafa, coloque 2 colheres de bicarbonato, algumas gotas de detergente e o corante.', cena: 'despejar' },
      { titulo: 'Erupção!', texto: 'Despeje o vinagre de uma vez e afaste-se. Observe e anote o que acontece.', cena: 'erupcao', dica: 'Repita mudando a quantidade de vinagre: a erupção muda?' },
      { titulo: 'Registre e apresente', texto: 'Monte um cartaz com pergunta, hipótese, materiais, resultado e explicação.', cena: 'cartaz' },
    ],
    seguranca: ['Use óculos de proteção ou óculos comuns.', 'Não prove as misturas.', 'Faça sobre bandeja e longe de equipamentos eletrônicos.'],
    inclusao: ['Estudantes com baixa visão podem acompanhar pelo som e pelo tato da espuma (com luvas).', 'Dê funções de cronometrista, repórter e fotógrafo.'],
    avaliacao: ['Cartaz com as etapas do método científico.', 'Explicação oral da reação.'],
  },
  {
    id: 'filtro-agua', tipo: 'projeto', title: 'Filtro de água caseiro', subtitle: 'Como a água fica mais limpa?', subjects: ['ciencias', 'geografia'], anos: [3, 4, 5, 6, 7], duracao: '2 aulas', participantes: 'Grupos de 3 a 5', capa: 'filtrar', cor: '#0ea5e9',
    resumo: 'Camadas de pedras, areia e carvão filtram água barrenta, mostrando como funcionam as estações de tratamento — e por que filtrar não é o mesmo que tornar a água potável.',
    objetivos: ['Compreender filtração e decantação.', 'Valorizar o saneamento básico.'],
    materiais: ['Garrafa PET cortada ao meio', 'Algodão ou filtro de café', 'Carvão ativado (de aquário) ou carvão vegetal moído', 'Areia fina e areia grossa', 'Pedrinhas', 'Água com terra'],
    ciencia: { pergunta: 'Camadas de areia, carvão e pedras deixam a água limpa?', hipotese: 'A água vai sair mais clara, mas não pronta para beber.', explicacao: 'Cada camada segura partículas de tamanhos diferentes; o carvão também retém cheiros e algumas substâncias. Microrganismos, porém, passam pelo filtro: por isso a água tratada também recebe cloro.' },
    passos: [
      { titulo: 'Corte a garrafa', texto: 'Um adulto corta a garrafa ao meio. A parte de cima, virada de cabeça para baixo, vira o funil.', cena: 'cortar', dica: 'Corte feito pelo professor.' },
      { titulo: 'Monte as camadas', texto: 'De baixo para cima: algodão, carvão, areia fina, areia grossa e pedrinhas.', cena: 'colar' },
      { titulo: 'Filtre', texto: 'Despeje devagar a água com terra e observe as gotas caindo.', cena: 'filtrar', tempo: '10 min' },
      { titulo: 'Compare', texto: 'Coloque lado a lado um copo de água suja e um de água filtrada. Fotografe e registre.', cena: 'lupa' },
    ],
    seguranca: ['Não beba a água filtrada.', 'Lave as mãos depois.'],
    inclusao: ['Ofereça uma ficha com fotos de cada camada para quem precisa de apoio visual.'],
    avaliacao: ['Desenho do filtro com as camadas nomeadas.', 'Explicação: por que a água filtrada ainda não é potável?'],
  },
  {
    id: 'circuito-led', tipo: 'projeto', title: 'Cartão que acende', subtitle: 'Circuito elétrico simples com LED', subjects: ['ciencias', 'tecnologia'], anos: [4, 5, 6, 7, 8], duracao: '2 aulas', participantes: 'Duplas', capa: 'luz', cor: '#eab308',
    resumo: 'Um cartão com um LED que acende quando o circuito é fechado, usando fita de cobre (ou papel-alumínio) e uma bateria de relógio.',
    objetivos: ['Entender circuito aberto e fechado.', 'Identificar polos positivo e negativo.'],
    materiais: ['Cartolina', 'Bateria de 3 V tipo moeda (CR2032)', 'LED', 'Fita de cobre ou papel-alumínio com fita adesiva', 'Prendedor de papel'],
    ciencia: { pergunta: 'Por que o LED só acende quando dobramos o cartão?', hipotese: 'Porque fecha o caminho da eletricidade.', explicacao: 'A corrente elétrica precisa de um caminho fechado do polo positivo ao negativo, passando pelo LED. Ao dobrar o cartão, a fita encosta na bateria e fecha o circuito. O LED tem lado certo: a perna maior vai no positivo.' },
    passos: [
      { titulo: 'Desenhe o caminho', texto: 'Desenhe no cartão duas trilhas: uma do polo + até a perna longa do LED, outra do polo − até a perna curta.', cena: 'escrever' },
      { titulo: 'Cole as trilhas', texto: 'Cole a fita de cobre (ou alumínio) sobre o desenho, sem deixar as trilhas se encostarem.', cena: 'colar' },
      { titulo: 'Posicione LED e bateria', texto: 'Prenda o LED com fita e coloque a bateria no canto, com uma aba de papel que dobra por cima.', cena: 'medir' },
      { titulo: 'Feche o circuito', texto: 'Dobre a aba: o LED acende! Abra: apaga. Isso é um interruptor.', cena: 'luz' },
    ],
    seguranca: ['Baterias tipo moeda são perigosas se engolidas: guarde-as com o professor.', 'Use apenas baterias de 3 V.'],
    inclusao: ['Trilhas desenhadas com cola em relevo ajudam estudantes com baixa visão.'],
    avaliacao: ['Cartão funcionando.', 'Desenho do circuito com sentido da corrente.'],
  },
  {
    id: 'forno-solar', tipo: 'projeto', title: 'Forno solar de caixa de pizza', subtitle: 'Energia do Sol transformada em calor', subjects: ['ciencias', 'tecnologia', 'geografia'], anos: [4, 5, 6, 7, 8, 9], duracao: '2 aulas + dia de sol', participantes: 'Grupos de 3 a 5', capa: 'sol', cor: '#f59e0b',
    resumo: 'Uma caixa de pizza forrada com papel-alumínio e plástico vira um forno que esquenta e derrete chocolate usando só a luz do Sol.',
    objetivos: ['Compreender reflexão, absorção e efeito estufa.', 'Discutir energias renováveis.'],
    materiais: ['Caixa de pizza', 'Papel-alumínio', 'Plástico filme', 'Cartolina preta', 'Fita adesiva', 'Termômetro (se houver)', 'Chocolate ou marshmallow'],
    ciencia: { pergunta: 'É possível aquecer alimentos só com a luz do Sol?', hipotese: 'Sim, se refletirmos e prendermos o calor.', explicacao: 'O alumínio reflete a luz para dentro da caixa, o fundo preto absorve e transforma em calor, e o plástico prende o ar quente — parecido com o efeito estufa.' },
    passos: [
      { titulo: 'Recorte a tampa', texto: 'Na tampa, recorte três lados de um quadrado formando uma aba (com ajuda de um adulto).', cena: 'cortar' },
      { titulo: 'Forre', texto: 'Forre a aba com alumínio (refletor) e o fundo com cartolina preta.', cena: 'colar' },
      { titulo: 'Feche a janela', texto: 'Cubra a abertura com plástico filme bem esticado.', cena: 'colar' },
      { titulo: 'Ao sol!', texto: 'Coloque o chocolate dentro, aponte a aba para o Sol e meça a temperatura a cada 10 minutos.', cena: 'sol', tempo: '30 a 60 min' },
    ],
    seguranca: ['Não olhe diretamente para o Sol nem para o reflexo do alumínio.', 'O interior pode esquentar: use pegador.'],
    inclusao: ['Tabela de temperatura com quadrinhos grandes para registro.'],
    avaliacao: ['Gráfico de temperatura ao longo do tempo.', 'Explicação das três ideias: refletir, absorver, prender o calor.'],
  },
  {
    id: 'horta-pet', tipo: 'projeto', title: 'Horta vertical de garrafas PET', subtitle: 'Cultivo, reaproveitamento e alimentação', subjects: ['ciencias', 'geografia', 'educacao-financeira'], anos: TODOS, duracao: '3 semanas de acompanhamento', participantes: 'Toda a turma em equipes', capa: 'plantar', cor: '#16a34a',
    resumo: 'Garrafas PET penduradas na parede viram vasos para temperos e hortaliças. A turma acompanha o crescimento e compara condições de luz e rega.',
    objetivos: ['Observar o ciclo de vida das plantas.', 'Reaproveitar materiais.', 'Comparar variáveis num experimento.'],
    materiais: ['Garrafas PET de 2 L', 'Barbante resistente', 'Terra adubada', 'Sementes ou mudas (cebolinha, salsinha, alface)', 'Regador', 'Régua'],
    ciencia: { pergunta: 'A planta que recebe mais luz cresce mais?', hipotese: 'Sim, porque usa a luz para produzir alimento.', explicacao: 'Na fotossíntese, a planta usa luz, água e gás carbônico para produzir seu alimento. Comparando garrafas no sol e na sombra (com mesma água e terra), vemos o efeito da luz.' },
    passos: [
      { titulo: 'Prepare as garrafas', texto: 'Um adulto corta uma janela na lateral da garrafa e faz furos embaixo para a água escorrer.', cena: 'cortar' },
      { titulo: 'Plante', texto: 'Coloque a terra, plante as sementes e regue.', cena: 'plantar' },
      { titulo: 'Pendure em fileira', texto: 'Amarre com barbante, uma garrafa abaixo da outra: a água de cima rega a de baixo.', cena: 'colar' },
      { titulo: 'Cuide e meça', texto: 'Reguem a cada dois dias e meçam a altura das plantas toda semana.', cena: 'regar', tempo: '3 semanas' },
      { titulo: 'Colha e compartilhe', texto: 'Na feira, mostrem o gráfico de crescimento e ofereçam os temperos para provar.', cena: 'medir' },
    ],
    seguranca: ['Cortes feitos por adultos.', 'Lavar as mãos após mexer na terra.'],
    inclusao: ['Diário de bordo com fotos e desenhos para quem tem dificuldade na escrita.'],
    avaliacao: ['Diário de bordo com medições.', 'Gráfico de crescimento.'],
  },
  {
    id: 'cata-vento', tipo: 'projeto', title: 'Cata-vento gerador', subtitle: 'Energia dos ventos', subjects: ['ciencias', 'tecnologia', 'geografia'], anos: [2, 3, 4, 5, 6], duracao: '1 a 2 aulas', participantes: 'Individual ou duplas', capa: 'vento', cor: '#0ea5e9',
    resumo: 'Cata-ventos de papel mostram como o vento movimenta as pás de um gerador eólico. Os grupos testam formatos de pás e medem quantas voltas cada um dá.',
    objetivos: ['Compreender a energia eólica.', 'Testar variáveis (tamanho e formato das pás).'],
    materiais: ['Papel quadrado firme', 'Palito de churrasco sem ponta', 'Alfinete com cabeça ou tachinha', 'Canudo', 'Ventilador ou secador (vento controlado)'],
    ciencia: { pergunta: 'Pás maiores fazem o cata-vento girar mais rápido?', hipotese: 'Sim, porque pegam mais vento.', explicacao: 'O vento empurra as pás e transforma sua energia de movimento em rotação. Nas usinas eólicas, essa rotação move um gerador que produz eletricidade. Pás maiores captam mais vento, mas também são mais pesadas — por isso é preciso testar.' },
    passos: [
      { titulo: 'Corte o quadrado', texto: 'Faça cortes do canto até perto do centro, nos quatro cantos.', cena: 'cortar' },
      { titulo: 'Dobre as pontas', texto: 'Dobre uma ponta de cada canto até o centro, sem amassar.', cena: 'colar' },
      { titulo: 'Fixe no palito', texto: 'Prenda no palito com o alfinete passando por um pedacinho de canudo (para girar livre).', cena: 'medir', dica: 'Alfinete com ajuda do professor.' },
      { titulo: 'Teste o vento', texto: 'Coloque a 50 cm do ventilador e conte as voltas em 10 segundos. Compare com o cata-vento de outro grupo.', cena: 'vento' },
    ],
    seguranca: ['Palitos sem ponta.', 'Mantenha os dedos longe do ventilador.'],
    inclusao: ['Contagem de voltas pode ser feita marcando uma pá com cor forte.'],
    avaliacao: ['Tabela comparando os cata-ventos.', 'Conclusão escrita sobre a hipótese.'],
  },
];

// ───────────── Desafios da turma ─────────────

export const DESAFIOS_TURMA: Desafio[] = [
  {
    id: 'nosso-filme', tipo: 'desafio', title: 'Desafio: nosso filme', subtitle: 'A turma cria um curta-metragem sobre um tema', subjects: ['portugues', 'artes', 'tecnologia'], anos: TODOS, duracao: '3 a 4 semanas', participantes: 'Toda a turma em equipes de produção', capa: 'claquete', cor: '#8b5cf6',
    resumo: 'A turma escolhe um tema (pode usar um dos roteiros prontos de apresentação), escreve, ensaia, grava com celular e faz uma sessão de cinema na escola. Cada estudante tem uma função na produção.',
    objetivos: ['Planejar e executar um projeto coletivo com etapas e prazos.', 'Produzir narrativa audiovisual com roteiro, cenas e legendas.', 'Comunicar um tema importante para a comunidade escolar.'],
    materiais: ['1 celular com câmera (pode ser do professor)', 'Tripé improvisado (pilha de livros)', 'Cartolinas para claquete e letreiros', 'Figurinos e objetos simples', 'Editor de vídeo gratuito ou o Estúdio do Ensinaê para roteiro e legendas'],
    passos: [
      { titulo: 'Escolha do tema', texto: 'Votem um tema: data comemorativa, problema da escola, história da comunidade. Escolham um roteiro pronto ou criem o seu.', cena: 'grupo', tempo: '1 aula' },
      { titulo: 'Equipes de produção', texto: 'Direção, roteiro, atuação, câmera, som, cenário/figurino, edição e divulgação. Todos participam.', cena: 'grupo', dica: 'Monte um quadro com fotos e funções — ajuda muito estudantes com TEA.' },
      { titulo: 'Roteiro e storyboard', texto: 'Dividam o filme em cenas (até 3 minutos no total). Para cada cena: local, personagens, falas e um desenho do enquadramento.', cena: 'escrever', tempo: '2 aulas' },
      { titulo: 'Ensaio', texto: 'Ensaiem cada cena antes de gravar. A equipe de som testa se dá para ouvir as falas.', cena: 'ensaiar' },
      { titulo: 'Gravação', texto: 'Gravem cena por cena com a claquete. Celular deitado, perto de quem fala, sem contraluz.', cena: 'claquete', tempo: '2 aulas' },
      { titulo: 'Edição', texto: 'Juntem as cenas, cortem os erros, coloquem título, créditos e legendas.', cena: 'editar', tempo: '1 a 2 aulas' },
      { titulo: 'Sessão de cinema', texto: 'Convidem outras turmas ou as famílias. Depois, façam uma roda de conversa sobre o tema do filme.', cena: 'pipoca' },
    ],
    seguranca: ['Peça autorização de uso de imagem das famílias antes de divulgar.', 'Não publique o vídeo na internet sem autorização da escola.'],
    inclusao: ['Funções sem exposição (roteiro, edição, som, cenário) para quem não quer aparecer.', 'Legendas e Libras tornam o filme acessível.', 'Cronograma visual com as etapas na parede.'],
    avaliacao: ['Cumprimento das etapas e prazos pela equipe.', 'Roteiro e storyboard.', 'Autoavaliação: “Qual foi minha contribuição?”'],
  },
  {
    id: 'podcast-turma', tipo: 'desafio', title: 'Desafio: podcast da turma', subtitle: 'Um programa de áudio com entrevistas e reportagens', subjects: ['portugues', 'tecnologia'], anos: [3, 4, 5, 6, 7, 8, 9], duracao: '2 a 3 semanas', participantes: 'Equipes de 4 a 6', capa: 'microfone', cor: '#ec4899',
    resumo: 'Cada equipe grava um episódio de até 5 minutos sobre um tema: entrevista com um funcionário da escola, curiosidades de ciências, resenha de livro. Os episódios viram uma “rádio da escola” no intervalo.',
    objetivos: ['Planejar entrevista e escrever pauta.', 'Desenvolver oralidade e escuta.'],
    materiais: ['Celular para gravar', 'Lugar silencioso (pode ser um armário com almofadas!)', 'Pauta impressa'],
    passos: [
      { titulo: 'Pauta', texto: 'Escolham o tema e escrevam a pauta: vinheta, abertura, 3 blocos e encerramento.', cena: 'escrever' },
      { titulo: 'Entrevista', texto: 'Preparem 5 perguntas abertas (que não se respondem com sim ou não).', cena: 'microfone' },
      { titulo: 'Gravação', texto: 'Gravem perto do celular, num lugar silencioso. Se errar, respirem e repitam a frase.', cena: 'microfone' },
      { titulo: 'Rádio da escola', texto: 'Toquem os episódios no intervalo ou na sala.', cena: 'aplausos' },
    ],
    inclusao: ['Pauta com roteiro escrito para quem tem ansiedade de fala.', 'Estudantes surdos podem produzir a versão em vídeo com Libras e legenda.'],
    avaliacao: ['Pauta completa.', 'Clareza e respeito ao tempo.'],
  },
  {
    id: 'museu-turma', tipo: 'desafio', title: 'Desafio: museu da turma', subtitle: 'Uma exposição sobre a história das famílias e do bairro', subjects: ['historia', 'geografia', 'artes'], anos: [2, 3, 4, 5, 6, 7], duracao: '2 semanas', participantes: 'Toda a turma', capa: 'cartaz', cor: '#0891b2',
    resumo: 'Cada estudante traz um objeto, foto ou relato da família. A turma organiza uma exposição com etiquetas, linha do tempo e monitores que guiam os visitantes.',
    objetivos: ['Reconhecer objetos e relatos como fontes históricas.', 'Organizar informações em etiquetas e linha do tempo.'],
    materiais: ['Objetos e fotos (cópias)', 'Etiquetas', 'Mesas e cartolinas', 'Fita para linha do tempo'],
    passos: [
      { titulo: 'Coleta', texto: 'Cada estudante entrevista alguém da família e traz um objeto ou foto com uma história.', cena: 'lupa' },
      { titulo: 'Etiquetas', texto: 'Para cada peça: nome, ano aproximado, de quem era e uma curiosidade.', cena: 'escrever' },
      { titulo: 'Montagem', texto: 'Organizem as peças por época e montem uma linha do tempo na parede.', cena: 'colar' },
      { titulo: 'Visita guiada', texto: 'Estudantes-monitores apresentam a exposição para outras turmas.', cena: 'aplausos' },
    ],
    cuidados: ['Respeite famílias que não podem ou não querem trazer objetos: desenhos e relatos também valem.'],
    inclusao: ['Monitores podem usar cartões com o texto da apresentação.'],
    avaliacao: ['Etiqueta completa.', 'Participação como monitor.'],
  },
];

export const TODOS_DESAFIOS: Desafio[] = [...DESAFIOS_TURMA, ...APRESENTACOES, ...PROJETOS_FEIRA];

export function findDesafio(id: string) { return TODOS_DESAFIOS.find((d) => d.id === id); }

/** Texto do desafio para o planejamento da turma. */
export function resumoParaTurma(d: Desafio): string {
  return [d.subtitle, '', d.resumo, '', 'Passo a passo:', ...d.passos.map((p, i) => `${i + 1}. ${p.titulo} — ${p.texto}`)].join('\n');
}
