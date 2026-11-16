# Ensinaê — Fase 2 de imagens (pedido para o ChatGPT)

## Status (16/11/2026)
**Já está no app:** 103 imagens da fase 2 (cenas, retratos, capítulos, memória, sequências, faixas de impressão, emblemas, lixeiras, robô), **4 jogos dos 7 erros** (feira, rio, biblioteca e barraca de frutas para os anos iniciais) e **os 14 produtos da feira**.

**Falta apenas — 5 resíduos isolados** (fundo transparente): jornal, garrafa PET, frasco de xampu sem rótulo, borra de café num filtro e rolo de papel higiênico.

Prompt (uma imagem por vez, direto no chat, sem ZIP):
```
Mantendo o estilo das imagens anteriores do Ensinaê, gere UMA imagem por vez, direto aqui no chat, sem ZIP, PNG com fundo transparente, objeto isolado e centralizado, sem pessoas e sem texto: [nome do item].
```

---

Este arquivo tem duas partes:
1. **Análise**: onde o app ainda está sem imagem e o que cada imagem vai destravar.
2. **Prompts prontos**: copie e cole no ChatGPT, um lote por vez.

---

## 1. Análise: onde faltam imagens

| # | Onde | Como está hoje | O que as imagens vão permitir | Qtd. | Prioridade |
|---|---|---|---|---|---|
| A | **Jogo dos 7 erros** (formato novo) | Não existe | Novo jogo: a turma toca nas diferenças no projetor; versão impressa colorida com gabarito | 3 pares (6) | Alta |
| B | **Jogo da memória** (Biomas) | Cartas só com texto | Uma face com ilustração e a outra com a descrição; cartas imprimíveis coloridas para recortar | 9 | Alta |
| C | **Cenas das histórias** | 21 cenas reaproveitam a capa ou ficam sem imagem | Cada escolha da turma mostra uma cena nova, o que deixa a consequência mais visível | 21 | Alta |
| D | **Personagens das histórias** | Só o nome num selo | Retrato de quem fala em cada cena; fichas de personagem para teatro e escrita | 9 | Alta |
| E | **Folhas imprimíveis coloridas** | Só a versão preto e branco (economia de tinta) | Opção “colorida” com faixa ilustrada por matéria e cantos decorativos; a versão econômica continua disponível | 13 | Alta |
| F | **Feira das decisões** | Produtos com emoji | Produtos ilustrados nas barracas e nas cartas imprimíveis de preço | 14 | Média |
| G | **Classificação de resíduos** | Só texto | Itens ilustrados e lixeiras coloridas da coleta seletiva; versão de recortar e colar | 16 | Média |
| H | **Sequências** (ciclo da água e etapas da escrita) | Só texto | Cartões ilustrados para ordenar na tela ou impressos | 12 | Média |
| I | **Robô da horta** (programação) | Emojis no tabuleiro | Robô, mudas e pedras ilustrados; tabuleiro imprimível para a versão desplugada | 5 | Média |
| J | **Emblemas das equipes** | Bolinha colorida | Brasão de cada equipe na sala de jogos, na feira e nas plaquinhas impressas | 8 | Média |
| K | **Capítulos das imersões** | Uma imagem para os 4 capítulos | Cada capítulo com cenário próprio no “mapa da história” | 16 | Baixa |

**Total: 129 imagens.** Comece pelos lotes 1 e 2: são os que mais mudam a experiência.

### O que eu (Claude) faço quando as imagens voltarem
- Confiro nome, tamanho, transparência e se tem texto embutido.
- **7 erros:** comparo as duas imagens pixel a pixel e encontro as 7 diferenças automaticamente. Por isso a imagem B precisa ser uma **edição** da A, e não uma imagem nova.
- Crio o jogo dos 7 erros, as cartas ilustradas da memória, os retratos nas cenas e a **versão colorida de todos os imprimíveis**, mantendo a opção econômica em preto e branco.
- Gero versões leves para celular, como fiz na primeira fase.

---

## 2. Como passar o acesso ao ChatGPT

O ChatGPT **não precisa de acesso ao repositório** para criar as imagens: basta colar os prompts abaixo e anexar este arquivo.

Se quiser que ele consulte o projeto, o repositório é público: dá para colar o link `https://github.com/BrazZ7/appaulas` na conversa. Se a sua conta do ChatGPT tiver o conector do GitHub disponível, também é possível ativá-lo nas configurações dele, mas só a **leitura** já basta. Não é preciso dar permissão de escrita: quem integra as imagens no app sou eu, depois que você trouxer os arquivos.

---

## 3. Prompts para colar no ChatGPT

### Mensagem inicial (cole primeiro, uma vez)

```
Vou te pedir imagens para o AulaViva, um app educacional brasileiro para o Ensino Fundamental. Você já criou as 89 imagens da primeira fase; mantenha exatamente o mesmo estilo:
- Ilustração quente, semirrealista, com pinceladas suaves, como um livro ilustrado contemporâneo.
- Base noturna azul-marinho com brilhos ciano/turquesa e violeta; luz quente de fim de tarde; jacarandás roxos e cenários brasileiros reconhecíveis.
- Pessoas diversas e contemporâneas, com dignidade, sem estereótipos. Estudantes de 11 a 14 anos, com uniforme escolar genérico (camiseta branca com detalhes azuis, sem logotipo).
- NENHUM TEXTO dentro das imagens: sem letras, números, placas legíveis, logotipos ou balões com palavras. Cartazes e telas aparecem sem texto legível.
- Personagens recorrentes devem ter sempre a mesma aparência entre imagens.

Regras de entrega:
- Use exatamente o nome de arquivo e o tamanho indicados em cada item.
- “PNG transparente” = fundo 100% transparente, sem sombra de fundo, objeto centralizado com margem de 8%.
- Os demais itens em .webp (qualidade 85, sRGB) com fundo completo, exceto o lote do jogo dos 7 erros, que vai em .png.
- Ao final de cada lote, entregue um ZIP de até 20 MB com as imagens e um arquivo INDICE.csv (arquivo;largura;altura;transparente;descricao).
Vou mandar um lote por vez. Confirme que entendeu e aguarde o Lote 1.
```

### Lote 1 — Jogo dos 7 erros, memória e personagens (24 imagens)

```
LOTE 1 — 24 imagens

A) JOGO DOS 7 ERROS — 3 pares (6 arquivos .png, 1600×1200)
Para cada par: primeiro crie a imagem A. Depois EDITE a imagem A (não gere uma imagem nova) para criar a B com EXATAMENTE 7 diferenças. Tudo o mais deve ficar idêntico, pixel por pixel: mesmo enquadramento, cores, luz e posição.
Diferenças boas: um objeto some, muda de cor, muda de lugar ou aparece um novo. Elas devem ser visíveis para crianças de 11 anos, espalhadas pela imagem (nunca duas no mesmo canto) e cada uma ocupar pelo menos 3% da área.
Junto com o par, escreva a lista das 7 diferenças com a posição aproximada (ex.: “canto superior esquerdo: o guarda-sol muda de laranja para azul”).
1. erros-feira-a.png / erros-feira-b.png — barraca de frutas numa feira de bairro brasileira, com feirante, cestos, balança e frutas variadas.
2. erros-rio-a.png / erros-rio-b.png — margem de rio urbano limpo com ciclovia, ponte, árvores, pessoas pedalando e um banco.
3. erros-biblioteca-a.png / erros-biblioteca-b.png — biblioteca escolar acolhedora com estantes, mesa de leitura, abajur, globo e estudantes lendo.

B) JOGO DA MEMÓRIA — Biomas do Brasil (9 arquivos .webp, 800×800, quadrado)
Cada carta mostra a paisagem ou o animal de forma clara e reconhecível, com fundo completo:
- mem-amazonia.webp — floresta densa, rio largo e chuva fina.
- mem-cerrado.webp — árvores de troncos tortuosos e casca grossa, capim dourado e vereda com buritis.
- mem-caatinga.webp — vegetação seca e acinzentada, mandacaru e solo pedregoso no período da seca.
- mem-mata-atlantica.webp — floresta úmida em encosta de serra perto do mar, com bromélias.
- mem-pantanal.webp — planície alagada com aguapés, capivaras e céu amplo.
- mem-pampa.webp — campos ondulados de vegetação rasteira até o horizonte, com uma coxilha.
- mem-mico-leao-dourado.webp — mico-leão-dourado num galho da Mata Atlântica.
- mem-tuiuiu.webp — tuiuiú (jabiru) de pescoço preto e vermelho no Pantanal.
- mem-verso.webp — verso das cartas: padrão decorativo simétrico com folhas e estrelas em violeta e ciano, sem texto.

C) PERSONAGENS DAS HISTÓRIAS — 9 retratos (.png transparente, 1024×1024, busto de frente, expressão acolhedora)
- char-lia.png — Lia, 12 anos, curiosa e teimosa; cabelo cacheado volumoso, mochila verde-azulada, caderno de capa verde, lanterna de bolso.
- char-caio.png — Caio, 12 anos, observador e de poucas palavras.
- char-ivone.png — Dona Ivone, bibliotecária de uns 60 anos, óculos pendurados por cordão, cardigã.
- char-davi.png — Davi, 7º ano, apaixonado por mapas e dados; caderno quadriculado e trena.
- char-yara.png — Yara, 7º ano, fotógrafa, com uma câmera simples no pescoço; mora perto do rio.
- char-socorro.png — Dona Socorro, moradora antiga do bairro e agricultora de horta, chapéu de palha.
- char-bia.png — Bia, 8º ano, apresentadora da rádio da escola, com fone de ouvido no pescoço e expressão confiante.
- char-teo.png — Téo, 7º ano, técnico de som e editor, desconfiado e atento, com fones grandes.
- char-rosangela.png — Professora Rosângela, coordenadora da rádio escolar, uns 45 anos.
(Lia, Davi, Yara, Bia e Téo já aparecem nas capas da primeira fase: mantenha a mesma aparência.)
```

### Lote 2 — Cenas das histórias (21 imagens)

```
LOTE 2 — Cenas das histórias — 21 arquivos .webp, 1920×1080 (16:9)
Deixe o terço inferior mais calmo e escuro, porque o título da cena entra ali por cima. Use os mesmos personagens do Lote 1.

História “A biblioteca dos finais possíveis” (Lia, Caio, Dona Ivone):
- story-biblioteca-testemunha.webp — Caio girando a cadeira entre estantes, lembrando de algo, com Lia atenta.
- story-biblioteca-mapa.webp — a contracapa de um livro com uma planta da biblioteca desenhada a lápis (traços, sem palavras), sob uma lupa.
- story-biblioteca-fichas.webp — gaveta de fichário antigo de cartolina aberta, com Lia procurando uma ficha.
- story-biblioteca-ivone.webp — Dona Ivone tirando os óculos e entregando uma chave antiga a Lia, no balcão da biblioteca.
- story-biblioteca-encontro.webp — senhora idosa de cachecol azul, bengala de madeira e broche de farol, olhando o mar por uma janela; Lia se aproxima.

História “O mistério do Rio Claro” (Davi, Yara, Dona Socorro):
- story-rio-margem.webp — close da água verde com pontinhos (algas) e Davi enchendo um pote transparente na margem.
- story-rio-socorro.webp — Dona Socorro com uma enxada na horta à beira do rio, conversando com os estudantes.
- story-rio-post-fabrica.webp — celular com uma foto do rio verde e ícones de compartilhamento se multiplicando (sem texto legível); clima de boato.
- story-rio-fabrica.webp — engenheira mostrando tanques de uma estação de tratamento de efluentes aos estudantes.
- story-rio-cano.webp — cano saindo de uma caixa de concreto atrás de casas novas, despejando no barranco do rio.
- story-rio-moradores.webp — moradora abrindo o portão com uma criança no colo, conversando com Davi e Yara.
- story-rio-analise.webp — sala de aula com a professora explicando um diagrama no quadro (setas e formas, sem palavras) e potes de amostra na mesa.
- story-rio-reuniao.webp — quadra da escola cheia de moradores; Davi projeta gráficos (barras coloridas, sem números) e Yara mostra fotos.
- story-rio-relatorio.webp — relatório com gráficos sendo entregue numa repartição; clima de espera.
- story-rio-conflito.webp — vizinhos de grupos diferentes discutindo na rua, de braços cruzados, com o rio ao fundo.

História “A rádio da escola” (Bia, Téo, Prof.ª Rosângela, e Nico, 7º ano):
- story-radio-corredor.webp — corredor da escola cheio de estudantes cochichando e mostrando celulares.
- story-radio-original.webp — Bia lendo um comunicado num mural digital da escola num tablet (tela sem texto legível).
- story-radio-direcao.webp — sala da vice-diretora (Dona Marta), que ouve Bia e Téo com calma.
- story-radio-autor-print.webp — Nico, menino do 7º ano, encolhido num banco do pátio; Téo se aproxima com respeito.
- story-radio-correcao.webp — Bia ao microfone, com a mão no peito, assumindo um erro; Téo apoia da mesa de som.
- story-radio-boato.webp — pátio da escola dividido e confuso, com rostos preocupados e celulares na mão.
```

### Lote 3 — Imprimíveis coloridos e emblemas das equipes (21 imagens)

```
LOTE 3 — Imprimíveis coloridos e equipes — 21 imagens

A) FAIXAS DE TOPO para folhas A4 coloridas (.webp, 2480×560)
Faixa horizontal ilustrada, com o terço esquerdo mais claro e liso (o título da folha é impresso por cima) e a ilustração concentrada à direita. Use cores vivas mas com fundo CLARO (creme, lavanda bem suave ou azul-claro), porque vai para impressão em papel: nada de fundo escuro.
- print-topo-portugues.webp — livros abertos, folhas de árvore e penas.
- print-topo-matematica.webp — formas geométricas, réguas e frações em pizza (sem números).
- print-topo-ciencias.webp — microscópio, folhas, gotas e lupa.
- print-topo-historia.webp — ampulheta, mapa antigo e casario colonial.
- print-topo-geografia.webp — relevo, rio sinuoso e rosa dos ventos.
- print-topo-artes.webp — pincéis, respingos de tinta e paleta.
- print-topo-educacao-fisica.webp — bola, peteca, corda e tênis.
- print-topo-ingles.webp — balões de fala vazios e casinhas de rua.
- print-topo-tecnologia.webp — robozinho, blocos de encaixe e engrenagens.
- print-topo-educacao-financeira.webp — cofrinho, moedas e frutas de feira.
- print-topo-cidadania.webp — praça com coreto, árvores e pessoas diversas.
- print-topo-ambiente.webp — rio limpo, ciclovia, painéis solares e jacarandá.
- print-cantos.png — PNG transparente 1200×1200 com 4 ornamentos de canto (folhas e estrelinhas em violeta e turquesa), um em cada canto, com o centro totalmente vazio.

B) EMBLEMAS DAS EQUIPES (.png transparente, 512×512)
Brasão circular estilizado, simples e legível em tamanho pequeno, sem texto:
- equipe-arvoredo.png — árvore frondosa, verde.
- equipe-rio-vivo.png — ondas e um peixe, azul.
- equipe-horizonte.png — sol nascendo atrás de montanhas, laranja.
- equipe-aurora.png — céu com aurora e estrelas, violeta.
- equipe-cometa.png — cometa com cauda, ciano.
- equipe-floresta.png — folhas de mata atlântica, verde-escuro.
- equipe-mare.png — maré e concha, turquesa.
- equipe-sol.png — sol radiante, amarelo.
```

### Lote 4 — Feira, resíduos, sequências e robô (47 imagens)

```
LOTE 4 — Itens de jogos — 47 imagens (.png transparente, salvo indicação)

A) FEIRA — produtos (512×512, transparente, no estilo ilustrado da primeira fase):
feira-banana.png (penca), feira-laranja.png, feira-maca.png, feira-mamao.png (inteiro e meia fatia), feira-abacaxi.png, feira-morango.png (cestinha), feira-alface.png, feira-couve.png (maço), feira-tomate.png, feira-cenoura.png (maço), feira-mandioca.png, feira-ovos.png (bandeja), feira-feijao.png (saquinho de pano aberto), feira-arroz.png (saco de pano aberto).

B) RESÍDUOS — itens (512×512, transparente):
res-jornal.png, res-papelao.png (caixa desmontada), res-garrafa-pet.png, res-frasco-xampu.png (sem rótulo legível), res-lata.png (alumínio, sem marca), res-pote-vidro.png, res-casca-banana.png, res-borra-cafe.png (filtro com borra), res-papel-higienico.png (rolo usado, discreto), res-fralda.png (dobrada, discreta).
Lixeiras da coleta seletiva (512×640, transparente), frente da lixeira lisa, sem texto: lixeira-papel.png (azul), lixeira-plastico.png (vermelha), lixeira-metal.png (amarela), lixeira-vidro.png (verde), lixeira-organico.png (marrom), lixeira-rejeito.png (cinza).

C) SEQUÊNCIA — Ciclo da água (.webp, 1200×900, fundo completo, mesma paisagem vista em 6 momentos):
agua-1-evaporacao.webp, agua-2-vapor-sobe.webp, agua-3-condensacao.webp (nuvens se formando), agua-4-precipitacao.webp, agua-5-infiltracao.webp (água entrando no solo e escorrendo), agua-6-retorno.webp (rio chegando ao mar).

D) SEQUÊNCIA — Etapas da escrita (512×512, transparente, objeto-símbolo + mãos de estudante):
escrita-1-planejar.png (mapa mental com formas, sem palavras), escrita-2-ideias.png (post-its coloridos em branco), escrita-3-rascunho.png (lápis escrevendo linhas onduladas), escrita-4-revisar.png (lupa sobre o papel), escrita-5-reescrever.png (borracha e caneta), escrita-6-publicar.png (folha num mural ou varal).

E) ROBÔ DA HORTA (256×256, vista de cima, transparente, salvo indicação):
robo.png (robozinho fofo virado para CIMA, simétrico), muda.png (muda pequena), muda-regada.png (a mesma muda maior, com gotas brilhando), pedra.png, terra.png (ladrilho de terra de horta, fundo completo SEM transparência, que encaixa lado a lado sem emenda).
```

### Lote 5 — Capítulos das imersões (16 imagens, opcional)

```
LOTE 5 — Capítulos das imersões — 16 arquivos .webp, 1920×1080
Mantenha o mesmo tom das capas da primeira fase. Pessoas reais e contemporâneas, com protagonismo e respeito.

Memórias afro-brasileiras:
imm-afro-cap1.webp (roda de escuta com uma griô contando histórias), imm-afro-cap2.webp (saberes: quilombo com roça e artesanato, sem estereótipos), imm-afro-cap3.webp (conquistas: estudantes negros numa universidade, formatura e biblioteca), imm-afro-cap4.webp (memórias vivas: jovens num centro cultural com música, tecnologia e arte).

Povos indígenas hoje:
imm-indigena-cap1.webp (jovens indígenas contemporâneos desfazendo estereótipos: celular, escola, cidade e aldeia), imm-indigena-cap2.webp (territórios e línguas: escola indígena bilíngue, com quadro sem texto legível), imm-indigena-cap3.webp (resistência: assembleia comunitária indígena), imm-indigena-cap4.webp (protagonismo: artistas, comunicadores e cientistas indígenas).

Água que nos conecta:
imm-agua-cap1.webp (água no bairro: torneira, caixa-d'água e córrego), imm-agua-cap2.webp (bacia hidrográfica vista do alto: nascentes que se juntam num rio), imm-agua-cap3.webp (usos e conflitos: irrigação, indústria e casas no mesmo rio), imm-agua-cap4.webp (cuidar juntos: mutirão de plantio na mata ciliar).

Sabores e sotaques:
imm-sabores-cap1.webp (pessoas de várias regiões conversando animadas), imm-sabores-cap2.webp (cozinhas do Brasil: mesa farta com pratos de várias regiões), imm-sabores-cap3.webp (festas: quadrilha junina, boi e ciranda), imm-sabores-cap4.webp (estudantes montando um mapa afetivo do bairro com fotos e fios, sem texto).
```

---

## Checklist para quando trouxer de volta
- [ ] ZIPs com até 20 MB cada, com INDICE.csv
- [ ] Nomes de arquivo exatamente como pedido
- [ ] PNGs transparentes de verdade (sem fundo xadrez “desenhado”)
- [ ] 7 erros: imagem B editada a partir da A, com a lista das 7 diferenças
- [ ] Nenhum texto legível dentro das imagens
