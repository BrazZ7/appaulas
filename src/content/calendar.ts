import type { ThemeDate } from '../types/models';

/** Datas do calendário escolar brasileiro (formato mm-dd) com sugestões de recursos da plataforma. */
export const THEME_DATES: ThemeDate[] = [
  {
    id: 'dia-internacional-da-mulher',
    date: '03-08',
    title: 'Dia Internacional da Mulher',
    description:
      'Data reconhecida pela ONU que lembra lutas por direitos, igualdade e participação das mulheres. Boa ocasião para conhecer trajetórias de mulheres na ciência, na literatura e na comunidade, indo além das homenagens.',
    suggestions: [
      { label: 'Pesquisa de trajetórias: mulheres cientistas, escritoras e líderes comunitárias do Brasil e da sua cidade' },
      { label: 'Conhecer Maria Firmina dos Reis e Carolina Maria de Jesus na imersão afro-brasileira', ref: { type: 'immersion', id: 'memorias-afro-brasileiras' } },
      { label: 'Roda de conversa sobre divisão de tarefas em casa e na escola' },
    ],
  },
  {
    id: 'dia-internacional-contra-discriminacao-racial',
    date: '03-21',
    title: 'Dia Internacional pela Eliminação da Discriminação Racial',
    description:
      'Instituído pela ONU em memória das vítimas do massacre de Sharpeville (África do Sul, 1960). Convida a discutir racismo, respeito e igualdade de direitos.',
    suggestions: [
      { label: 'Imersão em memórias afro-brasileiras', ref: { type: 'immersion', id: 'memorias-afro-brasileiras' } },
      { label: 'Construir com a turma um acordo antirracista de convivência' },
    ],
  },
  {
    id: 'dia-mundial-da-agua',
    date: '03-22',
    title: 'Dia Mundial da Água',
    description:
      'Data da ONU dedicada à água doce: acesso, saneamento e preservação de rios e nascentes.',
    suggestions: [
      { label: 'Narrativa investigativa sobre a poluição de um rio', ref: { type: 'story', id: 'rio-claro' } },
      { label: 'Mapear rios e córregos do bairro, inclusive os canalizados' },
      { label: 'Jogo da memória dos biomas: onde nascem os grandes rios?', ref: { type: 'game', id: 'memoria-biomas' } },
    ],
  },
  {
    id: 'dia-dos-povos-indigenas',
    date: '04-19',
    title: 'Dia dos Povos Indígenas',
    description:
      'Antes chamado "Dia do Índio", teve o nome alterado por lei em 2022 para reconhecer a diversidade dos mais de 300 povos indígenas do Brasil. Evite fantasias e estereótipos: valorize a presença indígena contemporânea, nas aldeias e nas cidades.',
    suggestions: [
      { label: 'Imersão "Povos indígenas hoje"', ref: { type: 'immersion', id: 'povos-indigenas-hoje' } },
      { label: 'Pesquisar palavras de origem tupi usadas no dia a dia e nomes de lugares da região' },
      { label: 'Ler obras de autoras e autores indígenas contemporâneos' },
    ],
  },
  {
    id: 'dia-da-terra',
    date: '04-22',
    title: 'Dia da Terra',
    description:
      'Celebrado internacionalmente desde 1970, mobiliza ações de cuidado com o planeta e reflexões sobre consumo, energia e clima.',
    suggestions: [
      { label: 'Laboratório: como abastecer uma cidade com energia?', ref: { type: 'simulation', id: 'laboratorio' } },
      { label: 'Quiz da cidade sustentável', ref: { type: 'game', id: 'quiz-cidade-sustentavel' } },
    ],
  },
  {
    id: 'dia-mundial-do-livro',
    date: '04-23',
    title: 'Dia Mundial do Livro e do Direito de Autor',
    description:
      'Data proposta pela UNESCO para incentivar a leitura e valorizar quem escreve. Ótima para movimentar a biblioteca da escola.',
    suggestions: [
      { label: 'Narrativa ramificada: a biblioteca dos finais possíveis', ref: { type: 'story', id: 'biblioteca-finais' } },
      { label: 'Escape room de pistas na biblioteca', ref: { type: 'game', id: 'pistas-escape-biblioteca' } },
      { label: 'Jogo das etapas da escrita e produção de resenhas para o mural', ref: { type: 'game', id: 'sequencia-escrita-texto' } },
    ],
  },
  {
    id: 'abolicao-da-escravatura',
    date: '05-13',
    title: '13 de maio — Abolição da escravatura (olhar crítico)',
    description:
      'Em 1888, a Lei Áurea extinguiu legalmente a escravidão no Brasil, último país das Américas a fazê-lo. A data deve ser tratada criticamente: a abolição resultou também de décadas de resistência e luta de pessoas negras, e não foi acompanhada de políticas de inclusão, o que tem efeitos até hoje.',
    suggestions: [
      { label: 'Imersão em memórias afro-brasileiras, com foco em resistência e protagonismo', ref: { type: 'immersion', id: 'memorias-afro-brasileiras' } },
      { label: 'Comparar 13 de maio e 20 de novembro: o que cada data celebra?' },
      { label: 'Conhecer abolicionistas negros como Luiz Gama e André Rebouças' },
    ],
  },
  {
    id: 'dia-mundial-do-meio-ambiente',
    date: '06-05',
    title: 'Dia Mundial do Meio Ambiente',
    description:
      'Data da ONU que convida a pensar soluções ambientais em escala local e global.',
    suggestions: [
      { label: 'Projeto interdisciplinar "Nossa cidade sustentável"', ref: { type: 'project', id: 'nossa-cidade-sustentavel' } },
      { label: 'Simulação da cidade: decisões sobre praças, transporte e serviços', ref: { type: 'simulation', id: 'cidade' } },
      { label: 'Narrativa do rio poluído e plano de ação da turma', ref: { type: 'story', id: 'rio-claro' } },
    ],
  },
  {
    id: 'dia-do-folclore',
    date: '08-22',
    title: 'Dia do Folclore',
    description:
      'Momento para valorizar saberes, festas, brincadeiras, músicas e narrativas populares das diferentes regiões do Brasil, reconhecendo suas matrizes indígenas, africanas e europeias.',
    suggestions: [
      { label: 'Aula de brincadeiras populares do Brasil, fora da tela' },
      { label: 'Entrevistar familiares sobre brincadeiras, cantigas e histórias de infância' },
      { label: 'Mapa das festas populares da região' },
    ],
  },
  {
    id: 'independencia-do-brasil',
    date: '09-07',
    title: 'Independência do Brasil',
    description:
      'Marco de 1822. Vale discutir que a independência foi um processo, com conflitos em várias províncias (como na Bahia, onde a data é celebrada em 2 de julho) e com participação popular pouco lembrada.',
    suggestions: [
      { label: 'Comparar versões e fontes: pinturas, documentos e relatos sobre o processo de independência' },
      { label: 'Classificação de fato e opinião em textos sobre a data', ref: { type: 'game', id: 'classificacao-fato-opiniao' } },
    ],
  },
  {
    id: 'dia-da-arvore',
    date: '09-21',
    title: 'Dia da Árvore',
    description:
      'Data próxima ao início da primavera no Hemisfério Sul, dedicada à importância das árvores para o clima urbano, a biodiversidade e a água.',
    suggestions: [
      { label: 'Jogo da memória dos biomas brasileiros', ref: { type: 'game', id: 'memoria-biomas' } },
      { label: 'Inventário das árvores da escola: contar, medir, fotografar e identificar' },
      { label: 'Simulação da cidade: o que muda com mais áreas verdes?', ref: { type: 'simulation', id: 'cidade' } },
    ],
  },
  {
    id: 'dia-das-criancas',
    date: '10-12',
    title: 'Dia das Crianças',
    description:
      'Além da celebração, é uma oportunidade para conversar sobre os direitos de crianças e adolescentes previstos no Estatuto da Criança e do Adolescente (ECA).',
    suggestions: [
      { label: 'Brincadeiras populares e criação de regras inclusivas' },
      { label: 'Roda de conversa: que direitos garantimos na nossa escola?' },
    ],
  },
  {
    id: 'dia-do-professor',
    date: '10-15',
    title: 'Dia do Professor',
    description:
      'Homenagem às professoras e aos professores e momento para valorizar a escola como espaço de convivência e aprendizagem.',
    suggestions: [
      { label: 'Estudantes escrevem bilhetes revisados e reescritos para educadores da escola', ref: { type: 'game', id: 'sequencia-escrita-texto' } },
      { label: 'Entrevista com professoras e professores sobre a própria trajetória escolar' },
    ],
  },
  {
    id: 'dia-da-consciencia-negra',
    date: '11-20',
    title: 'Dia Nacional de Zumbi e da Consciência Negra',
    description:
      'Data da morte de Zumbi dos Palmares (1695), liderança do Quilombo dos Palmares. Feriado nacional desde 2024, celebra a resistência e a cultura negra e convida a enfrentar o racismo durante todo o ano.',
    suggestions: [
      { label: 'Imersão em memórias afro-brasileiras', ref: { type: 'immersion', id: 'memorias-afro-brasileiras' } },
      { label: 'Pesquisar comunidades quilombolas contemporâneas na sua região' },
      { label: 'Mural coletivo sobre protagonistas negros do bairro e do Brasil' },
    ],
  },
  {
    id: 'dia-dos-direitos-humanos',
    date: '12-10',
    title: 'Dia dos Direitos Humanos',
    description:
      'Aniversário da Declaração Universal dos Direitos Humanos, adotada pela Assembleia Geral da ONU em 10 de dezembro de 1948.',
    suggestions: [
      { label: 'Narrativa sobre boatos na rádio escolar: informação também é direito', ref: { type: 'story', id: 'radio-escola' } },
      { label: 'Debate "Uma cidade, muitas vozes": quem é ouvido nas decisões do bairro?', ref: { type: 'simulation', id: 'cidade' } },
      { label: 'Ler e ilustrar artigos da Declaração em linguagem acessível' },
    ],
  },
];
