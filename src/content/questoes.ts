/**
 * Banco de questões do Ensinaê e provas prontas.
 * Cada questão traz, quando faz sentido, um `enunciadoSimples` — usado nas versões adaptadas
 * (TEA, TDAH, dislexia): frase curta, uma ação por vez, sem duplo sentido.
 */
import type { Prova, Questao, SubjectId } from '../types/models';

type Q = Omit<Questao, 'id' | 'itens'> & { id: string; itens?: string[] };
const q = (x: Q): Questao => ({ itens: [], ...x });
const F1 = [2, 3, 4, 5];
const F2A = [6, 7];
const F2B = [8, 9];
const F2 = [6, 7, 8, 9];

export const BANCO: Questao[] = [
  // ───── Matemática ─────
  q({ id: 'mat-fracao-pizza', subject: 'matematica', anos: [4, 5, 6], tipo: 'multipla', pontos: 1,
    enunciado: 'Observe a pizza abaixo. Que fração da pizza foi pintada?', enunciadoSimples: 'Que fração está pintada?',
    imagem: { kind: 'figura', id: 'fracao-pizza', params: { partes: 8, pintadas: 3 } }, itens: ['3/8', '5/8', '3/5', '8/3'], correta: 0 }),
  q({ id: 'mat-fracao-barra', subject: 'matematica', anos: [4, 5, 6], tipo: 'dissertativa', pontos: 1, linhas: 2,
    enunciado: 'A barra foi dividida em partes iguais. Escreva a fração que representa a parte pintada e a fração que representa a parte sem pintar.',
    enunciadoSimples: 'Escreva a fração pintada.', imagem: { kind: 'figura', id: 'fracao-barra', params: { partes: 5, pintadas: 2 } }, resposta: 'Pintada: 2/5. Sem pintar: 3/5.' }),
  q({ id: 'mat-relogio', subject: 'matematica', anos: [2, 3, 4], tipo: 'multipla', pontos: 1,
    enunciado: 'Que horas o relógio está marcando?', imagem: { kind: 'figura', id: 'relogio', params: { h: 10, m: 15 } }, itens: ['10h15', '3h50', '10h03', '11h15'], correta: 0 }),
  q({ id: 'mat-reta', subject: 'matematica', anos: [2, 3, 4], tipo: 'completar', pontos: 1,
    enunciado: 'Complete a reta numérica com os números que faltam: ___ e ___.', enunciadoSimples: 'Escreva os números que faltam.',
    imagem: { kind: 'figura', id: 'reta', params: { inicio: 0, fim: 10, passo: 1, oculto: '3,7' } }, resposta: '3 e 7' }),
  q({ id: 'mat-grafico', subject: 'matematica', anos: [4, 5, 6, 7], tipo: 'multipla', pontos: 1,
    enunciado: 'O gráfico mostra quantos livros a turma leu em cada dia da semana. Em que dia a turma leu mais livros?', enunciadoSimples: 'Em que dia leram mais livros?',
    imagem: { kind: 'figura', id: 'grafico', params: { rotulos: 'Seg, Ter, Qua, Qui, Sex', valores: '4, 7, 3, 8, 5', titulo: 'Livros lidos na semana' } }, itens: ['Segunda', 'Terça', 'Quinta', 'Sexta'], correta: 2 }),
  q({ id: 'mat-grafico-total', subject: 'matematica', anos: [4, 5, 6, 7], tipo: 'dissertativa', pontos: 1, linhas: 3,
    enunciado: 'Usando o mesmo gráfico, calcule quantos livros a turma leu na semana inteira. Mostre a conta.', enunciadoSimples: 'Some os livros de todos os dias.',
    imagem: { kind: 'figura', id: 'grafico', params: { rotulos: 'Seg, Ter, Qua, Qui, Sex', valores: '4, 7, 3, 8, 5', titulo: 'Livros lidos na semana' } }, resposta: '4 + 7 + 3 + 8 + 5 = 27 livros.' }),
  q({ id: 'mat-dinheiro', subject: 'matematica', anos: [3, 4, 5], tipo: 'multipla', pontos: 1,
    enunciado: 'Quanto dinheiro há na imagem?', imagem: { kind: 'figura', id: 'dinheiro', params: { valores: '10, 2, 1, 0.50, 0.25' } }, itens: ['R$ 13,75', 'R$ 12,75', 'R$ 13,50', 'R$ 14,25'], correta: 0 }),
  q({ id: 'mat-troco', subject: 'matematica', anos: [4, 5, 6], tipo: 'dissertativa', pontos: 1.5, linhas: 3,
    enunciado: 'Marina comprou um caderno de R$ 12,50 e uma caneta de R$ 3,80. Ela pagou com uma nota de R$ 20,00. Quanto recebeu de troco? Mostre os cálculos.',
    enunciadoSimples: 'Caderno: R$ 12,50. Caneta: R$ 3,80. Pagou: R$ 20,00. Calcule o troco.', resposta: '12,50 + 3,80 = 16,30; 20,00 − 16,30 = R$ 3,70.' }),
  q({ id: 'mat-forma', subject: 'matematica', anos: [3, 4, 5], tipo: 'multipla', pontos: 1,
    enunciado: 'Qual é o nome desta figura geométrica?', imagem: { kind: 'figura', id: 'forma', params: { forma: 'hexagono' } }, itens: ['Hexágono', 'Pentágono', 'Octógono', 'Losango'], correta: 0 }),
  q({ id: 'mat-perimetro', subject: 'matematica', anos: [5, 6, 7], tipo: 'dissertativa', pontos: 1, linhas: 3,
    enunciado: 'Um quadrado tem 4 cm de lado. Calcule o perímetro e a área desse quadrado.', enunciadoSimples: 'Lado = 4 cm. Calcule o perímetro. Depois calcule a área.',
    imagem: { kind: 'figura', id: 'forma', params: { forma: 'quadrado', rotulo: 'lado = 4 cm' } }, resposta: 'Perímetro = 16 cm; área = 16 cm².' }),
  q({ id: 'mat-regua', subject: 'matematica', anos: [2, 3, 4], tipo: 'completar', pontos: 1,
    enunciado: 'Observe a régua. O lápis mede ___ centímetros.', imagem: { kind: 'figura', id: 'regua', params: { cm: 10, objeto: 7 } }, resposta: '7' }),
  q({ id: 'mat-porcentagem', subject: 'matematica', anos: F2A, tipo: 'multipla', pontos: 1,
    enunciado: 'Uma camiseta custava R$ 50,00 e teve 20% de desconto. Qual é o novo preço?', enunciadoSimples: 'Preço: R$ 50,00. Desconto: 20%. Qual o novo preço?',
    itens: ['R$ 40,00', 'R$ 30,00', 'R$ 45,00', 'R$ 48,00'], correta: 0 }),
  q({ id: 'mat-equacao', subject: 'matematica', anos: [7, 8], tipo: 'dissertativa', pontos: 1.5, linhas: 4,
    enunciado: 'Resolva a equação 3x + 7 = 25 e verifique sua resposta substituindo o valor de x.', enunciadoSimples: 'Resolva: 3x + 7 = 25.', resposta: '3x = 18; x = 6. Verificação: 3·6 + 7 = 25.' }),
  q({ id: 'mat-vf-numeros', subject: 'matematica', anos: [5, 6, 7], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V para as afirmações verdadeiras e F para as falsas.', itens: ['Todo número par é divisível por 2.', '0,5 é maior que 0,45.', '1/2 é igual a 0,25.', 'O dobro de 15 é 30.'], vf: [true, true, false, true] }),
  q({ id: 'mat-ordenar', subject: 'matematica', anos: [4, 5, 6], tipo: 'ordenar', pontos: 1,
    enunciado: 'Numere os números do menor para o maior.', itens: ['0,25', '0,5', '0,75', '1,2'] }),
  q({ id: 'mat-proporcao', subject: 'matematica', anos: F2B, tipo: 'dissertativa', pontos: 1.5, linhas: 4,
    enunciado: 'Uma receita usa 3 ovos para 12 bolinhos. Quantos ovos são necessários para 40 bolinhos? Explique seu raciocínio.', enunciadoSimples: '3 ovos fazem 12 bolinhos. Quantos ovos para 40 bolinhos?', resposta: '10 ovos (1 ovo para cada 4 bolinhos).' }),

  // ───── Português ─────
  q({ id: 'por-substantivo', subject: 'portugues', anos: [3, 4, 5], tipo: 'multipla', pontos: 1,
    enunciado: 'Na frase “O menino ganhou uma bicicleta azul”, qual palavra é um adjetivo?', enunciadoSimples: 'Qual palavra diz como é a bicicleta?', itens: ['azul', 'menino', 'ganhou', 'bicicleta'], correta: 0 }),
  q({ id: 'por-sinonimo', subject: 'portugues', anos: [3, 4, 5, 6], tipo: 'associacao', pontos: 2,
    enunciado: 'Ligue cada palavra ao seu sinônimo (palavra de mesmo sentido).', enunciadoSimples: 'Ligue as palavras que querem dizer a mesma coisa.', itens: ['alegre', 'rápido', 'casa', 'bonito'], pares: ['feliz', 'veloz', 'lar', 'belo'] }),
  q({ id: 'por-pontuacao', subject: 'portugues', anos: [2, 3, 4], tipo: 'completar', pontos: 1,
    enunciado: 'Complete com o sinal de pontuação correto: Que dia lindo___ Você vem à festa___', resposta: '! e ?' }),
  q({ id: 'por-interpretacao', subject: 'portugues', anos: [4, 5, 6], tipo: 'dissertativa', pontos: 2, linhas: 4,
    enunciado: 'Leia: “Bia guardou metade das moedas no cofrinho e usou o resto para comprar sementes. No fim do mês, a horta da escola estava cheia de alfaces.” Explique com suas palavras por que a horta ficou cheia de alfaces.',
    enunciadoSimples: 'Por que a horta ficou cheia de alfaces?', resposta: 'Porque Bia usou parte do dinheiro para comprar sementes, que foram plantadas na horta.' }),
  q({ id: 'por-genero', subject: 'portugues', anos: [5, 6, 7], tipo: 'multipla', pontos: 1,
    enunciado: 'Um texto que ensina a preparar um bolo, com lista de ingredientes e modo de fazer, é do gênero:', enunciadoSimples: 'Um texto que ensina a fazer bolo é:', itens: ['receita', 'notícia', 'poema', 'carta'], correta: 0 }),
  q({ id: 'por-silabas', subject: 'portugues', anos: [1, 2, 3], tipo: 'ordenar', pontos: 1,
    enunciado: 'Numere as sílabas na ordem certa para formar a palavra BORBOLETA.', itens: ['BOR', 'BO', 'LE', 'TA'] }),
  q({ id: 'por-verbo', subject: 'portugues', anos: F2A, tipo: 'vf', pontos: 2,
    enunciado: 'Leia as frases e escreva V (verdadeiro) ou F (falso) sobre os verbos destacados.', itens: ['Em “Nós estudamos ontem”, o verbo está no passado.', 'Em “Eu vou viajar”, a ação vai acontecer no futuro.', '“Correr” é um substantivo.', 'Em “Elas cantam”, o verbo está no plural.'], vf: [true, true, false, true] }),
  q({ id: 'por-producao', subject: 'portugues', anos: F2, tipo: 'dissertativa', pontos: 3, linhas: 10,
    enunciado: 'Escreva um parágrafo argumentativo (de 6 a 10 linhas) respondendo: o celular deve ser permitido na sala de aula? Apresente sua opinião e dois argumentos.',
    enunciadoSimples: 'Escreva sua opinião: celular na sala de aula. Dê 2 motivos.', resposta: 'Critérios: opinião clara, dois argumentos, conclusão e uso adequado da língua.' }),

  // ───── Ciências ─────
  q({ id: 'cie-ciclo-agua', subject: 'ciencias', anos: [3, 4, 5, 6], tipo: 'associacao', pontos: 2,
    enunciado: 'Observe o ciclo da água e ligue cada número à etapa correspondente.', enunciadoSimples: 'Ligue o número ao nome.',
    imagem: { kind: 'figura', id: 'ciclo-agua', params: { numerado: 'numeros' } }, itens: ['1', '2', '3', '4'], pares: ['Evaporação', 'Condensação', 'Precipitação', 'Escoamento'] }),
  q({ id: 'cie-planta', subject: 'ciencias', anos: [2, 3, 4], tipo: 'associacao', pontos: 2.5,
    enunciado: 'Ligue cada número da figura à parte da planta.', imagem: { kind: 'figura', id: 'planta', params: { numerado: 'numeros' } }, itens: ['1', '2', '3', '4', '5'], pares: ['Flor', 'Folha', 'Fruto', 'Caule', 'Raiz'] }),
  q({ id: 'cie-cadeia', subject: 'ciencias', anos: [4, 5, 6, 7], tipo: 'multipla', pontos: 1,
    enunciado: 'Na cadeia alimentar abaixo, qual ser vivo é o produtor?', enunciadoSimples: 'Quem produz o próprio alimento?',
    imagem: { kind: 'figura', id: 'cadeia', params: { seres: 'Sol, Capim, Gafanhoto, Sapo, Cobra' } }, itens: ['Capim', 'Gafanhoto', 'Sapo', 'Cobra'], correta: 0 }),
  q({ id: 'cie-termometro', subject: 'ciencias', anos: [3, 4, 5], tipo: 'completar', pontos: 1,
    enunciado: 'O termômetro marca ___ graus Celsius. Nesse dia estava ___ (frio ou calor).', imagem: { kind: 'figura', id: 'termometro', params: { temp: 32 } }, resposta: '32; calor' }),
  q({ id: 'cie-estados', subject: 'ciencias', anos: [4, 5, 6], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V ou F sobre os estados físicos da água.', itens: ['O gelo é água no estado sólido.', 'O vapor é água no estado gasoso.', 'Quando o gelo derrete, ocorre a evaporação.', 'A água ferve a cerca de 100 °C ao nível do mar.'], vf: [true, true, false, true] }),
  q({ id: 'cie-corpo', subject: 'ciencias', anos: F2B, tipo: 'multipla', pontos: 1,
    enunciado: 'Qual sistema do corpo humano é responsável por levar oxigênio e nutrientes a todas as células?', enunciadoSimples: 'Qual sistema leva o sangue pelo corpo?', itens: ['Cardiovascular', 'Digestório', 'Nervoso', 'Excretor'], correta: 0 }),
  q({ id: 'cie-reciclagem', subject: 'ciencias', anos: [3, 4, 5, 6], tipo: 'associacao', pontos: 2,
    enunciado: 'Ligue cada resíduo à cor da lixeira da coleta seletiva.', itens: ['Garrafa PET', 'Jornal', 'Lata de alumínio', 'Pote de vidro'], pares: ['Vermelha (plástico)', 'Azul (papel)', 'Amarela (metal)', 'Verde (vidro)'] }),
  q({ id: 'cie-experimento', subject: 'ciencias', anos: F2, tipo: 'dissertativa', pontos: 2, linhas: 5,
    enunciado: 'Você quer descobrir se a luz influencia o crescimento do feijão. Descreva um experimento: o que vai comparar, o que deve ficar igual nos dois grupos e o que vai medir.',
    enunciadoSimples: 'Feijão com luz e sem luz. O que vai comparar? O que vai medir?', resposta: 'Dois grupos iguais (mesma água, terra e sementes), um na luz e outro no escuro; medir a altura por alguns dias.' }),

  // ───── História ─────
  q({ id: 'his-linha', subject: 'historia', anos: [5, 6, 7, 8], tipo: 'ordenar', pontos: 2,
    enunciado: 'Numere os acontecimentos da história do Brasil na ordem em que aconteceram.', imagem: { kind: 'figura', id: 'linha-tempo', params: { marcos: '1500: ?; 1822: ?; 1888: ?; 1889: ?' } },
    itens: ['Chegada dos portugueses (1500)', 'Independência (1822)', 'Abolição da escravidão (1888)', 'Proclamação da República (1889)'] }),
  q({ id: 'his-abolicao', subject: 'historia', anos: [5, 6, 7, 8, 9], tipo: 'dissertativa', pontos: 2, linhas: 5,
    enunciado: 'A Lei Áurea (1888) aboliu a escravidão no Brasil, mas não garantiu terra, trabalho ou escola para a população liberta. Explique uma consequência disso que ainda aparece na sociedade brasileira.',
    enunciadoSimples: 'Depois de 1888, as pessoas libertas não receberam terra nem escola. Cite uma consequência disso hoje.', resposta: 'Desigualdade racial no acesso a renda, educação e moradia; racismo estrutural.' }),
  q({ id: 'his-fontes', subject: 'historia', anos: F2A, tipo: 'multipla', pontos: 1,
    enunciado: 'Qual destes é um exemplo de fonte histórica?', enunciadoSimples: 'O que ajuda a estudar o passado?', itens: ['Uma carta antiga da família', 'Um sonho que alguém teve', 'Uma previsão do tempo', 'Uma senha de celular'], correta: 0 }),
  q({ id: 'his-quilombo', subject: 'historia', anos: [5, 6, 7, 8], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V ou F sobre os quilombos.', itens: ['Quilombos eram comunidades formadas por pessoas que resistiam à escravidão.', 'Palmares foi um dos maiores quilombos da história do Brasil.', 'Zumbi dos Palmares é lembrado em 20 de novembro.', 'Os quilombos deixaram de existir no Brasil.'], vf: [true, true, true, false] }),
  q({ id: 'his-indigenas', subject: 'historia', anos: [3, 4, 5, 6], tipo: 'dissertativa', pontos: 1.5, linhas: 4,
    enunciado: 'Cite duas contribuições dos povos indígenas para o nosso dia a dia (alimentos, palavras, costumes ou conhecimentos).', enunciadoSimples: 'Escreva 2 coisas que aprendemos com os povos indígenas.', resposta: 'Ex.: mandioca, rede, banho diário, palavras como “pipoca” e “capivara”, conhecimento de plantas medicinais.' }),

  // ───── Geografia ─────
  q({ id: 'geo-rosa', subject: 'geografia', anos: [3, 4, 5, 6], tipo: 'completar', pontos: 2,
    enunciado: 'Complete a rosa dos ventos com os pontos cardeais: Norte = ___, Sul = ___, Leste = ___, Oeste = ___.', enunciadoSimples: 'Escreva N, S, L e O nos quadrinhos.',
    imagem: { kind: 'figura', id: 'rosa-ventos', params: { colaterais: 'em-branco' } }, resposta: 'N em cima, S embaixo, L à direita, O à esquerda.' }),
  q({ id: 'geo-regioes', subject: 'geografia', anos: [4, 5, 6, 7], tipo: 'associacao', pontos: 2.5,
    enunciado: 'Ligue cada estado à sua região.', itens: ['Bahia', 'Amazonas', 'Paraná', 'Goiás', 'São Paulo'], pares: ['Nordeste', 'Norte', 'Sul', 'Centro-Oeste', 'Sudeste'] }),
  q({ id: 'geo-relevo', subject: 'geografia', anos: [5, 6, 7], tipo: 'multipla', pontos: 1,
    enunciado: 'Grandes extensões de terras planas e baixas, geralmente próximas a rios, são chamadas de:', enunciadoSimples: 'Terra plana e baixa perto de rios é:', itens: ['planícies', 'montanhas', 'serras', 'chapadas'], correta: 0 }),
  q({ id: 'geo-urbano', subject: 'geografia', anos: F2, tipo: 'dissertativa', pontos: 2, linhas: 5,
    enunciado: 'Cite um problema ambiental das grandes cidades e proponha uma ação que a escola ou o bairro poderia fazer para diminuí-lo.', enunciadoSimples: 'Escreva 1 problema da cidade. Escreva 1 solução.', resposta: 'Ex.: enchentes por lixo nas ruas → campanha de coleta seletiva e limpeza de bueiros.' }),

  // ───── Inglês ─────
  q({ id: 'ing-cores', subject: 'ingles', anos: [3, 4, 5, 6], tipo: 'associacao', pontos: 2,
    enunciado: 'Match the colors. (Ligue as cores.)', itens: ['red', 'blue', 'yellow', 'green'], pares: ['vermelho', 'azul', 'amarelo', 'verde'] }),
  q({ id: 'ing-tobe', subject: 'ingles', anos: F2A, tipo: 'completar', pontos: 1.5,
    enunciado: 'Complete with am, is or are: I ___ a student. She ___ my friend. They ___ at school.', resposta: 'am, is, are' }),
  q({ id: 'ing-familia', subject: 'ingles', anos: [4, 5, 6], tipo: 'multipla', pontos: 1,
    enunciado: 'What is “irmã” in English?', enunciadoSimples: '“Irmã” em inglês é:', itens: ['sister', 'brother', 'mother', 'aunt'], correta: 0 }),

  // ───── Artes, Educação Física, Educação Financeira, Tecnologia ─────
  q({ id: 'art-cores', subject: 'artes', anos: [2, 3, 4, 5], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V ou F sobre as cores.', itens: ['Azul, amarelo e vermelho são cores primárias.', 'Misturando azul e amarelo, obtemos verde.', 'Laranja é uma cor primária.', 'Cores quentes lembram o fogo e o sol.'], vf: [true, true, false, true] }),
  q({ id: 'art-desenho', subject: 'artes', anos: F1, tipo: 'desenho', pontos: 2, linhas: 8,
    enunciado: 'Desenhe uma paisagem da sua rua usando pelo menos duas cores frias e duas cores quentes.', enunciadoSimples: 'Desenhe sua rua. Use cores quentes e frias.', imagem: { kind: 'figura', id: 'quadro', params: { estilo: 'liso' } } }),
  q({ id: 'edf-regras', subject: 'educacao-fisica', anos: [4, 5, 6, 7], tipo: 'dissertativa', pontos: 1.5, linhas: 4,
    enunciado: 'Por que os jogos precisam de regras? Dê um exemplo de regra de um jogo que você conhece e explique para que ela serve.', enunciadoSimples: 'Escreva 1 regra de um jogo. Para que ela serve?', resposta: 'Regras garantem justiça, segurança e organização. Ex.: no pega-pega, quem é pego vira o pegador.' }),
  q({ id: 'edf-saude', subject: 'educacao-fisica', anos: F2, tipo: 'multipla', pontos: 1,
    enunciado: 'Antes de uma atividade física intensa, é importante:', itens: ['fazer aquecimento', 'comer muito', 'ficar parado', 'dormir'], correta: 0 }),
  q({ id: 'fin-necessidade', subject: 'educacao-financeira', anos: [4, 5, 6, 7], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V se o gasto é uma NECESSIDADE e F se é um DESEJO.', enunciadoSimples: 'Precisa mesmo? Escreva V (sim) ou F (não).', itens: ['Arroz e feijão', 'Videogame novo', 'Conta de luz', 'Tênis de marca'], vf: [true, false, true, false] }),
  q({ id: 'fin-poupanca', subject: 'educacao-financeira', anos: [5, 6, 7], tipo: 'dissertativa', pontos: 1.5, linhas: 3,
    enunciado: 'Lucas quer comprar uma bola de R$ 60,00 e consegue guardar R$ 15,00 por semana. Em quantas semanas ele junta o dinheiro?', enunciadoSimples: 'Bola: R$ 60. Guarda R$ 15 por semana. Quantas semanas?', resposta: '4 semanas (60 ÷ 15 = 4).' }),
  q({ id: 'tec-seguranca', subject: 'tecnologia', anos: [5, 6, 7, 8, 9], tipo: 'vf', pontos: 2,
    enunciado: 'Escreva V ou F sobre segurança na internet.', itens: ['Posso contar minha senha para os amigos.', 'Devo desconfiar de links com prêmios fáceis.', 'Tudo o que é publicado na internet pode ser copiado.', 'Antes de compartilhar uma notícia, devo checar a fonte.'], vf: [false, true, true, true] }),
];

export function questaoDoBanco(id: string) { return BANCO.find((x) => x.id === id); }

export function filtrarBanco(subject?: SubjectId | '', ano?: number, texto?: string): Questao[] {
  const t = (texto ?? '').trim().toLowerCase();
  return BANCO.filter((x) => (!subject || x.subject === subject) && (!ano || !x.anos || x.anos.includes(ano)) && (!t || `${x.enunciado} ${x.itens.join(' ')}`.toLowerCase().includes(t)));
}

const pronta = (id: string, title: string, subject: SubjectId, ano: number, ids: string[], perfil: Prova['perfil'] = 'padrao', instrucoes?: string): Prova => ({
  id, title, subject, ano, perfil, pronta: true, createdAt: '2026-11-01', updatedAt: '2026-11-01',
  instrucoes: instrucoes ?? 'Leia com atenção cada questão. Responda a caneta ou lápis, de forma legível. Boa prova!',
  questoes: ids.map((qid, i) => ({ ...questaoDoBanco(qid)!, id: `${id}-q${i + 1}`, origem: qid })),
});

export const PROVAS_PRONTAS: Prova[] = [
  pronta('pronta-mat-4', 'Matemática — frações, horas e dinheiro', 'matematica', 4, ['mat-fracao-pizza', 'mat-fracao-barra', 'mat-relogio', 'mat-dinheiro', 'mat-reta', 'mat-regua', 'mat-ordenar']),
  pronta('pronta-mat-6', 'Matemática — números, gráficos e porcentagem', 'matematica', 6, ['mat-grafico', 'mat-grafico-total', 'mat-porcentagem', 'mat-troco', 'mat-perimetro', 'mat-vf-numeros', 'mat-ordenar']),
  pronta('pronta-mat-8', 'Matemática — equações e proporção', 'matematica', 8, ['mat-equacao', 'mat-proporcao', 'mat-porcentagem', 'mat-perimetro', 'mat-vf-numeros']),
  pronta('pronta-por-4', 'Português — leitura e gramática', 'portugues', 4, ['por-interpretacao', 'por-substantivo', 'por-sinonimo', 'por-pontuacao', 'por-genero']),
  pronta('pronta-por-7', 'Português — verbos, gêneros e argumentação', 'portugues', 7, ['por-verbo', 'por-genero', 'por-sinonimo', 'por-producao']),
  pronta('pronta-cie-5', 'Ciências — água, plantas e ambiente', 'ciencias', 5, ['cie-ciclo-agua', 'cie-planta', 'cie-estados', 'cie-cadeia', 'cie-reciclagem', 'cie-termometro']),
  pronta('pronta-cie-8', 'Ciências — corpo humano e investigação', 'ciencias', 8, ['cie-corpo', 'cie-estados', 'cie-cadeia', 'cie-experimento']),
  pronta('pronta-his-7', 'História — Brasil, resistência e memória', 'historia', 7, ['his-linha', 'his-fontes', 'his-quilombo', 'his-abolicao', 'his-indigenas']),
  pronta('pronta-geo-6', 'Geografia — orientação, regiões e cidade', 'geografia', 6, ['geo-rosa', 'geo-regioes', 'geo-relevo', 'geo-urbano']),
  pronta('pronta-ing-6', 'Inglês — cores, família e verbo to be', 'ingles', 6, ['ing-cores', 'ing-familia', 'ing-tobe']),
  pronta('pronta-fin-6', 'Educação Financeira — consumo consciente', 'educacao-financeira', 6, ['fin-necessidade', 'fin-poupanca', 'mat-troco', 'mat-porcentagem']),
  pronta('pronta-tea-mat-4', 'Matemática adaptada (TEA) — frações e horas', 'matematica', 4, ['mat-fracao-pizza', 'mat-relogio', 'mat-reta', 'mat-regua'], 'tea',
    'Faça uma questão de cada vez. Quando terminar, marque a caixa “Terminei”. Pode pedir ajuda para ler.'),
  pronta('pronta-tdah-cie-5', 'Ciências adaptada (TDAH) — água e plantas', 'ciencias', 5, ['cie-ciclo-agua', 'cie-planta', 'cie-estados', 'cie-reciclagem'], 'tdah',
    'Leia o comando em destaque. Faça uma questão e marque ✔ na lista de progresso antes de passar para a próxima.'),
];
