
//Memória espacial - visoespacial.

//LINK DO VÍDEO: https://www.youtube.com/watch?v=4b06OwYhJoA

//Posição inicial do retângulo "seleção" no MENU
var xMenu= 160; 
var yMenu1= 230; 
var yMenu2= 290
var yMenu3= 350

//Posição inicial do retângulo "seleção" das PERGUNTAS
var yPergunta= 270; 
var xPergunta1= 65; 
var xPergunta2= 335;
var xPergunta3= 605;

var resposta = 0;

var xsqr = 386;//Posição dos quadrados das fases
var ysqr = 160;//Posição dos quadrados das fases
var alturaQ = 60;//altura dos quadrados
var larguraQ = 60;//largura dos quadrados

//VETOR PARA DEFINIR SE O QUADRADO É PINTADO OU NÃO
var gt = []
var igt = 0;
for (igt=0; igt<16; igt++){
  gt[igt]=false;
}

//MATRIZ
var matriz = [];
var i = 0;
var cont=0;

//-----------------T E L A S ----------------------------
var tela= -1;
//-------------------------------------------------------
var opcao = 1;//opções para selecionar

//FONTES DO JOGO
let myFont;
let myFont2;

//TEMPO
var contador = 0;
var contadorS = 0;
var rate = 10;

//ARMAZENAMENTO DOS QUADRADOS
var vetorX = [];//guarda a posição do quadrado pintado de azul
var vetorY = [];//guarda a posição do quadrado pintado de azul
var p = 0;
var vetorXc = [];//guarda a posição do quadrado pintado de cinza
var vetorYc = [];//guarda a posição do quadrado pintado de cinza
var c = 0;

//SONS
var gameover;
var win;
var clicar;
var menuclick;
var clickerro;

//PONTOS
var contPontos = 0;
var contPontosC = 0;
var contTotalPontos = 0;
var pontos = []; //ARMAZENA OS PONTOS
var ip;
for(ip=0; ip<3; ip++){
  pontos[ip] = 0; 
}

var pintado = false;


//GERAR AS MATRIZES DO JOGO
function geraMatriz(dif, nqp) {
  cont=0;
    var res="";
    for(var i=0;i<dif;i++) {
      matriz[i]=[];
      for(var j=0;j<dif;j++) {
        var r = random([0,1]);
        if(r==1) { // se o numero for 1, é armazenado no contador
           cont++;
        }
        if(cont>nqp) //contador para quando é maior que o numero de quadrados pintados.
          r=0;
          matriz[i][j]=r;
          res=res+matriz[i][j]+" ";
      }
        res=res+"\n"
    }
    console.log(res)
  console.log(cont)
  return cont; //RETORNA O VALOR DO CONTADOR
}

function preload(){
  
  fundo= loadImage("fundo.jpg");//fundo
  
  //DETALHES (NOMES AUTOEXPLICATIVOS)
  // I M A G E N S
  quadradoInfo = loadImage("quadradoinfo.png");
  quadrado1 = loadImage("quadrado1.png");
  quadrado2 = loadImage("quadrado2.png");
  quadrado3 = loadImage ("quadradodance.png");
  quadrado4 = loadImage("quadradoperdeu.png");
  quadrado5 = loadImage("quadradoresposta.png");
  quadrado6 = loadImage("quadradowin.png");
  retangulo = loadImage("retangulo.png");
  raio = loadImage("raio.png");
  credito = loadImage("credito.jpg");
  click = loadImage ("click.png");
  brilho = loadImage ("brilho.png");
  lampada = loadImage ("lampada.png");
  
  // F O N T E S 
  myFont = loadFont('knewave.ttf');
  myFont2 = loadFont('Barlow-Light.ttf');
  
  // E F E I T O S - S O N O R O S
  clicar = loadSound("clicar.mp3");
  gameover = loadSound("gameover.mp3");
  win = loadSound("win.mp3");
  menuclick = loadSound("menuclick.mp3");
  clickerro = loadSound("clickerro.mp3");
  

}
function setup() {
  createCanvas(900, 506);
  frameRate(rate);
}
function draw() {

  switch(tela) {
    case -1:
      inicio(); //TELA -1
      break;
      
    case 0:
      menu();//TELA 0
      break;
      
    case 1:
      if(!pintado){
          contadorQ=0;
        do {
           contadorQ = geraMatriz(2,2);// AQUI DEFINE OS VALORES DE "dif" e "nqp"
        }while(contadorQ!=2)// Enquanto o contadorQ for diferente de 2, ele gera novas matrizes.
        pintado = true;// SE PINTADO FOR TRUE, SÓ PINTA UMA VEZ
      }
      fase1();//TELA 1
      break;
      
    case 2:
      instrucoes();//TELA 2
      break;
      
    case 3:
      creditos();//TELA 3
      break;
      
    case 4:
      lose(); // TELA 4
      break;
      
    case 5:
      if(!pintado){
        contadorQ=0;
        do{
        contadorQ = geraMatriz(3,4);
       }while(contadorQ!=4)
         pintado=true;
      }
      fase2(); //TELA 5
      break;
      
   case 6:
      if(!pintado){
        contadorQ=0;
        do{
        contadorQ = geraMatriz(4,8);
        }while(contadorQ!=8)
          pintado=true;
     }
      fase3(); //TELA 6
      break;
      
    case 7:
      pergunta1(); // TELA 7
      break;
      
    case 8:
      pergunta2(); // TELA 8
      break;
      
    case 9:
      pergunta3(); // TELA 9
      break;
      
    case 10:
      venceu(); // TELA 10
      break;
  }
}

//PARTES INICIAIS DO JOGO
function inicio(){ //TELA -1
  // imagens do inicio
  image(fundo, 0, 0);//Localização do fundo
  image(quadrado1,110,290);//localização do quadrado1
  image(quadrado2,650,120);//localização do quadrado2
  
  //F O N T E S - T E X T O S
  //TÍTULO
  textAlign(CENTER, CENTER);// Texto alinhado ao centro
  noStroke();// sem contorno
  fill(101,217,217);// cor do preenchimento do título
  textFont(myFont,60);//tamanho e fonte do titulo
  text('MEMORY SQUARE',450,250)//localização do titulo
  //SUBTÍTULO
  noStroke();// sem contorno
  fill('black');// cor do preenchimento do subtítulo
  textFont(myFont2,30);//tamanho e fonte do subtitulo
  text('CLICK AQUI',450,300)//localização do subtitulo
  
  //MOUSE - SE ELE CLICAR NO ESQUERDO VAI PARA O MENU
  if(mouseButton === LEFT){
    if(mouseIsPressed){
      tela = 0;// M E N U
    }
  }
  
}
function menu(){ // TELA 0
  // imagens do inicio
  image(fundo, 0, 0);//Localização do fundo
  image(quadrado1,-20,410);//localização do quadrado1
  image(quadrado2,800,20);//localização do quadrado2
  
  //caixa de seleção JOGAR
  if(mouseX > xMenu && mouseY < xMenu+ 600 && mouseY > yMenu1 && mouseY < yMenu1+ 30){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xMenu, yMenu1, 600, 30);//Posição/Tamanho do retângulo "seleção"
    
    if(mouseIsPressed){// Se for clicado, irá para o jogo
      menuclick.setVolume(0.3);// Volume do efeito sonoro
      menuclick.play();
      tela = 1;
    }
    
  }
  //caixa de seleção INSTRUÇÕES
  if(mouseX > xMenu&& mouseY < xMenu+ 600 && mouseY > yMenu2&& mouseY < yMenu2+ 30){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xMenu, yMenu2, 600, 30);//Posição/Tamanho do retângulo "seleção"
    
    if(mouseIsPressed){// Se for clicado, irá para as instruções
      menuclick.setVolume(0.3);
      menuclick.play();
      tela = 2;
    }
  }
    //caixa de seleção CRÉDITOS
  if(mouseX > xMenu&& mouseY < xMenu+ 600 && mouseY > yMenu3&& mouseY < yMenu3+ 30){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xMenu, yMenu3, 600, 30);//Posição/Tamanho do retângulo "seleção"
      if(mouseIsPressed){// Se for clicado, irá para os créditos
      menuclick.setVolume(0.3);
      menuclick.play();
      tela = 3;
    }
  }
  //F O N T E S
  //TÍTULO
  textAlign(CENTER, CENTER);// Texto alinhado ao centro
  noStroke();//Sem contorno
  fill(101,217,217);// cor do preenchimento do título
  textFont(myFont,60);//tamanho e fonte do titulo
  text('MENU',450,150)//localização do titulo
  
  //OPÇÕES
  fill('black');// cor do preenchimento das opções
  textFont(myFont2,30);//tamanho e fonte das opções
  noStroke();// Sem contorno
  text('J O G A R',450,240)//localização da opção 1
  text('I N S T R U Ç Õ E S',450,300)//localização da opção 2
  text('C R É D I T O S',450,360)//localização da opção 3
  
}
function instrucoes(){ // TELA 2
  // imagens do inicio
  image(fundo, 0, 0);//Localização do fundo
  image(quadradoInfo, 46, 204);
  image(brilho, 604,370);
  image(brilho, 814,160);
  image(lampada, 30,180);
  image(click, 318,378);
  image(quadrado3, 780,390);
  
  //F O N T E S
  //TÍTULO
  textAlign(CENTER, CENTER);// Texto alinhado ao centro
  noStroke();// Sem contorno
  fill(101,217,217);// cor do preenchimento do título
  textFont(myFont,60);//tamanho e fonte do titulo
  text('INSTRUÇÕES',450,100)//localização do titulo
  
  //SUBTÍTULOS
  noStroke();// Sem contorno
  fill('black');// cor do preenchimento do texto
  textFont(myFont2,18);//tamanho e fonte do texto
  text('LEMRE-SE DOS QUADRADOS\n DESTACADOS.',165,310)//localização do texto 1
  text('CLICK NOS QUADRADOS \nPARA RECRIAR O PADRÃO.',452,310)//localização do texto 2
  text('VOCÊ AVANÇA A MEDIDA \nQUE CONSEGUE RECRIAR \nMAIS PADRÕES.',735,320)//localização do texto 3
  
  //OPÇÃO SAIR
  textFont(myFont,40);
  noStroke();// Sem contorno
  fill(101,217,217);// cor do preenchimento do x
  text('X',850, 50)
    //CAIXA DE SELEÇÃO DE x
  if(mouseY > 30 && mouseY <30 + 50 && mouseX > 830 && mouseX <830+ 50){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(830, 30, 50, 50);//Posição/Tamanho do retângulo "seleção"
    
    if(mouseIsPressed){
      menuclick.setVolume(0.3);// Volume do efeito sonoro
      menuclick.play();
      tela = 0;
    }
  }
}
function creditos(){ // TELA 3
  image(credito, 0, 0);//Localização do fundo
  
  //OPÇÃO SAIR
  textFont(myFont,40);
  noStroke();// Sem contorno
  fill(101,217,217);// cor do preenchimento do x
  text('X',850, 50)
    //CAIXA DE SELEÇÃO DE x
  if(mouseY > 30 && mouseY <30 + 50 && mouseX > 830 && mouseX <830+ 50){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(830, 30, 50, 50);//Posição/Tamanho do retângulo "seleção"
    
    if(mouseIsPressed){
      menuclick.setVolume(0.3);// Volume do efeito sonoro
      menuclick.play();
      tela = 0;
    }
  }
}

//FASES
function fase1(){ //TELA 1
  
  image(fundo, 0, 0);//Localização do fundo
  
  //Desenho do 1º quadrado
  noStroke();
  fill(179,179,179);
  rect(372,143,154,157);
  
  // Frase que aparecerá por 2s
  if(contadorS<2){
  textAlign(CENTER, CENTER);
  fill(179,179,179);
  textFont(myFont2,50)
  text("Memorize o padrão",450,80);
  }
  
  // //CONTADOR DE TEMPO
  contador++;
  contadorS = parseInt(contador/rate);

  //DESENHO DOS QUADRADOS DO TABULEIRO
  for(var linha=0; linha <2; linha++){
    for(var coluna=0; coluna <2; coluna++){
          // IF RESPONSÁVEL POR PINTAR DE AZUL OS QUADRADOS IGUAIS A 1
          if(matriz[linha][coluna]==1){
            // GUARDA A POSIÇÃO DOS QUADRADOS AZUIS
            vetorX[p] = xsqr;
            vetorY[p] = ysqr;
            p++;//ÍNDICE DE POSIÇÃO DO VETOR
            
            fill(101,217,217);//COR AZUL
          }
          else{//PINTA DE CiNZA QUADRADOS DIFERENTES DE 1
            // GUARDA A POSIÇÃO DOS QUADRADOS CINZAS
            vetorXc[c] = xsqr;
            vetorYc[c] = ysqr;
            c++;//ÍNDICE DE POSIÇÃO DO VETOR
            
            fill(243,243,243);//COR CINZA
          }    
          rect(xsqr, ysqr, alturaQ, larguraQ);//DESENHA O QUADRADO
          xsqr = xsqr+66// INCREMENTO DO X
    }
    xsqr = 386;//RESET DO X
    ysqr=ysqr+66;// INCREMENTO DO Y
  } 
  ysqr=160//RESET DO Y
  
  //DESENHO DOS QUADRADOS DO TABULEIRO QUE IRÃO ESCONDER O PADRÃO ANTERIOR
  if(contadorS>=2){
      for(igt = 0; igt<4; igt++){
        if(igt <= 1 && gt[igt]==false){
          fill(243,243,243);
          rect(vetorX[igt],vetorY[igt],alturaQ, larguraQ);
      }
      if (igt>=2 && gt[igt]==false){
        fill(243,243,243);
        rect(vetorXc[igt],vetorYc[igt],alturaQ, larguraQ);        
      }
    }
  }
  //CONTADOR DE PONTOS
  contTotalPontos = (contPontos*10)-(contPontosC*6)
  
  // TEXTO DOS PONTOS
  textAlign(CENTER, CENTER);
  fill(179,179,179);
  textFont(myFont2,50)
  text("Pontos: "+contTotalPontos,450,350);
  
  // SE OS PONTOS FOREM MENOR QUE 0, O JOGADOR PERDE
  if (contTotalPontos<0){
    gameover.setVolume(0.3);
    gameover.play();
    tela =4;
  }
  //SE ELE ACERTAR O NÚMERO DE QUADRADOS PINTADOS DE AZUL, VAI PARA A TELA DE PERGUNTAS
  if (contPontos==2){
    tela = 7
    contPontos=0
    pontos[0] = contTotalPontos;//GUARDA OS PONTOS DESSA FASE
    for (igt=0; igt<4; igt++){
      gt[igt]=false;
    }
  // RESET OS CONTADORES PARA AS PRÓXIMAS FASES
     contador=0;
     contadorS=0;
     pintado = false;
     p = 0;
     c = 0;
   
  }
  perdeu();// FUNÇÃO QUE É ACIONADA SE O USUÁRIO NÃO INTERAGIR COM O JOGO
}
function pergunta1(){
  image(fundo, 0, 0);//Localização do fundo
  image(quadrado5, 70, 273)
  image(quadrado5, 340, 273)
  image(quadrado5, 610, 273)
  
  //CAIXA DE SELEÇÃO DE 2
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta1 && mouseX <xPergunta1+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta1, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      tela = 5;
      pontos[0] = pontos[0] + 1;// SE JOGADOR ACERTAR A PERGUNTA, ADICIONA 1 PONTO
    }
    
  }
    //CAIXA DE SELEÇÃO DE 4
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta2 && mouseX <xPergunta2+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta2, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;// SE JOGADOR ERRAR A PERGUNTA, PERDE
    }
    
  }
  
  //CAIXA DE SELEÇÃO DE 3
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta3 && mouseX <xPergunta3+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta3, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;// SE JOGADOR ERRAR A PERGUNTA, PERDE
    }
    
  }
    
  textAlign(CENTER, CENTER);
  fill(120,120,120);
  textFont(myFont2,50)
  noStroke();
  text("Quantos quadrados foram \n pintados de azul?",450,120);
  textSize(60)
  text("2", 170, 310);
  text("4", 440, 310);
  text("3", 710, 310);

} //TELA 7

function fase2(){  //TELA 5
  
  image(fundo, 0, 0);//Localização do fundo
  
  //Desenho do 1º quadrado
  noStroke();
  fill(179,179,179);
  rect(372,143,220,225)
  
  // Frase que aparecerá por 2s
  if(contadorS<2){
    textAlign(CENTER, CENTER);
    fill(179,179,179);
    textFont(myFont2,50)
    text("Memorize o padrão",470,80);
  }
  
  //CONTADOR DE TEMPO
  contador++;
  contadorS = parseInt(contador/rate);
  
  //DESENHO DOS QUADRADOS DO TABULEIRO
  for(var linha=0; linha <3; linha++){
    for(var coluna=0; coluna <3; coluna++){
          // IF RESPONSÁVEL POR PINTAR DE AZUL OS QUADRADOS IGUAIS A 1
          if(matriz[linha][coluna]==1){
            // GUARDA A POSIÇÃO DOS QUADRADOS AZUIS
            vetorX[p] = xsqr;
            vetorY[p] = ysqr;
            p++;//ÍNDICE DE POSIÇÃO DO VETOR
            fill(101,217,217);//COR AZUL
          }
          else{//PINTA DE CiNZA QUADRADOS DIFERENTES DE 1
            // GUARDA A POSIÇÃO DOS QUADRADOS CINZAS
            vetorXc[c] = xsqr;
            vetorYc[c] = ysqr;
            c++;//ÍNDICE DE POSIÇÃO DO VETOR
            
            fill(243,243,243);//COR CINZA
          }        
           rect(xsqr, ysqr, alturaQ, larguraQ);//DESENHA O QUADRADO
          xsqr = xsqr+66; //INCREMENTO DO X
    }
    xsqr = 386;//RESET DO X
    ysqr=ysqr+66;//INCREMENTO DO Y
  } 
  
  ysqr=160//RESET DO Y

 //DESENHO DOS QUADRADOS DO TABULEIRO QUE IRÁ ESCONDER O PADRÃO
  if(contadorS>=2){
    for(igt = 0; igt<9; igt++){
      if(igt <= 3 && gt[igt]==false){
        fill(243,243,243);
        rect(vetorX[igt],vetorY[igt],alturaQ, larguraQ);
      }
      if (igt>=4 && gt[igt]==false){
        fill(243,243,243);
        rect(vetorXc[igt],vetorYc[igt],alturaQ, larguraQ);        
      }
    }
  }
  //CONTADOR DE PONTOS
  contTotalPontos = (contPontos*10)-(contPontosC*10) + pontos[0]
  
  // TEXTO DOS PONTOS
  textAlign(CENTER, CENTER);
  fill(179,179,179);
  textFont(myFont2,50)
  text("Pontos: "+contTotalPontos,480,410);
 
  // SE OS PONTOS FOREM MENOR QUE 0, O JOGADOR PERDE
  if (contTotalPontos<0){
    gameover.setVolume(0.3);
    gameover.play();
    tela =4;
  }
//SE ELE ACERTAR O NÚMERO DE QUADRADOS PINTADOS DE AZUL, VAI PARA A TELA DE PERGUNTAS 
  if (contPontos==4){
    tela = 8
    contPontos=0
    pontos[1] = pontos[0] + contTotalPontos; //GUARDA OS PONTOS DESSA FASE E SOMA A FASE ANTERIOR
    for (var igt=0; igt<9; igt++){
      gt[igt]=false;
    }
    // RESET OS CONTADORES PARA AS PRÓXIMAS FASES
     contador=0;
     contadorS=0;
     pintado = false;
     p = 0;
     c = 0;
  }
  perdeu();// FUNÇÃO QUE É ACIONADA SE O USUÁRIO NÃO INTERAGIR COM O JOGO
  
}
function pergunta2(){
  image(fundo, 0, 0);//Localização do fundo
  image(quadrado5, 70, 273)
  image(quadrado5, 340, 273)
  image(quadrado5, 610, 273)
  
  //CAIXA DE SELEÇÃO DE 6
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta1 && mouseX <xPergunta1+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta1, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;
    }
    
  }
  
    //CAIXA DE SELEÇÃO DE 9
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta2 && mouseX <xPergunta2+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta2, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;
    }
    
  }
  
  //CAIXA DE SELEÇÃO DE 4
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta3 && mouseX <xPergunta3+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta3, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      tela = 6;
      pontos[1] = pontos[1] + 1;
    }
    
  }
    
  textAlign(CENTER, CENTER);
  fill(120,120,120);
  noStroke();
  textFont(myFont2,50)
  text("Quantos quadrados foram \n pintados de azul?",450,120);
  textSize(60)
  text("6", 170, 310);
  text("9", 440, 310);
  text("4", 710, 310);
  
}//TELA 8

function fase3(){  //TELA 6
  
  image(fundo, 0, 0);//Localização do fundo
  
  //Desenho do 1º quadrado
  noStroke();
  fill(179,179,179);
  rect(372,143,286,293)
  
  // Frase que aparecerá por 2s
  if(contadorS<2){
  textAlign(CENTER, CENTER);
  fill(179,179,179);
  textFont(myFont2,50)
  text("Memorize o padrão",500,80);
  }
  
  contador++;
  contadorS = parseInt(contador/rate);
  textFont(myFont2,40)
  
  //DESENHO DOS QUADRADOS DO TABULEIRO
  for(var linha=0; linha <4; linha++){
    for(var coluna=0; coluna <4; coluna++){
          // IF RESPONSÁVEL POR PINTAR DE AZUL OS QUADRADOS IGUAIS A 1
          if(matriz[linha][coluna]==1){
            // GUARDA A POSIÇÃO DOS QUADRADOS AZUIS
            vetorX[p] = xsqr;
            vetorY[p] = ysqr;
            p++;//ÍNDICE DE POSIÇÃO DO VETOR
            fill(101,217,217);//COR AZUL
          }
          else{//PINTA DE CiNZA QUADRADOS DIFERENTES DE 1
            // GUARDA A POSIÇÃO DOS QUADRADOS CINZAS
            vetorXc[c] = xsqr;
            vetorYc[c] = ysqr;
            c++;//ÍNDICE DE POSIÇÃO DO VETOR
            
            fill(243,243,243);//COR CINZA
          }        
           rect(xsqr, ysqr, alturaQ, larguraQ);//DESENHA O QUADRADO
          xsqr = xsqr+66; //INCREMENTO DO X
    }
    xsqr = 386;//RESET DO X
    ysqr=ysqr+66;//INCREMENTO DO Y
  } 
  
  ysqr=160//RESET DO Y

 //DESENHO DOS QUADRADOS DO TABULEIRO QUE IRÁ ESCONDER O PADRÃO
  if(contadorS>=2){
    for(igt = 0; igt<16; igt++){
      if(igt <= 7 && gt[igt]==false){
        fill(243,243,243);
        rect(vetorX[igt],vetorY[igt],alturaQ, larguraQ);
      }
      if (igt>=8 && gt[igt]==false){
        fill(243,243,243);
        rect(vetorXc[igt],vetorYc[igt],alturaQ, larguraQ);        
      }
    }
  }
  
  contTotalPontos = (contPontos*10)-(contPontosC*12) + pontos[1]
  
  textAlign(CENTER, CENTER);
  fill(179,179,179);
  textFont(myFont2,50)
  text("Pontos: "+contTotalPontos,200,410);
    
  if (contTotalPontos<0){
    gameover.setVolume(0.3);
    gameover.play();
    tela =4;
  }
  
  if (contPontos==8){
    tela = 9
    contPontos=0
    pontos[2] = pontos[1] + contTotalPontos;
    for (var igt=0; igt<16; igt++){
      gt[igt]=false;
    }
     contador=0;
     contadorS=0;
     pintado = false;
     p = 0;
     c = 0;
  }
  perdeu();// FUNÇÃO QUE É ACIONADA SE O USUÁRIO NÃO INTERAGIR COM O JOGO
  
}
function pergunta3(){
  image(fundo, 0, 0);//Localização do fundo
  image(quadrado5, 70, 273)
  image(quadrado5, 340, 273)
  image(quadrado5, 610, 273)
  
  //CAIXA DE SELEÇÃO DE 5
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta1 && mouseX <xPergunta1+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta1, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;
    }
  }
    //CAIXA DE SELEÇÃO DE 8
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta2 && mouseX <xPergunta2+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta2, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      tela = 10;
      pontos[2] = pontos[2] + 1;
    }
  }
  //CAIXA DE SELEÇÃO DE 6
  if(mouseY > yPergunta && mouseY <yPergunta+ 90 && mouseX > xPergunta3 && mouseX <xPergunta3+ 215){
    noFill();//sem preenchimento
    stroke(101,217,217);//cor do contorno RGB
    strokeWeight(1);// espessura do contorno
    rect(xPergunta3, yPergunta, 215, 100);//Posição/Tamanho do retângulo "seleção"
    if(mouseIsPressed){
      gameover.setVolume(0.3);
      gameover.play();
      tela = 4;
    }
  }
    
  textAlign(CENTER, CENTER);
  fill(120,120,120);
  textFont(myFont2,50)
  noStroke();
  text("Quantos quadrados foram \n pintados de azul?",450,120);
  textSize(60)
  text("5", 170, 310);
  text("8", 440, 310);
  text("6", 710, 310);

}//TELA 9

function perdeu(){
    if(contadorS >= 10 && mouseButton!=LEFT){
     tela = 4
  }
}
function lose(){//TELA 4
  

  
  image(fundo, 0, 0);//Localização do fundo
  image(raio, 272, 287);
  image(quadrado4, 402, 350);
  
  
  contadorS = parseInt(contador/2);
  contador++;
  
    if (contadorS==0){
  gameover.setVolume(0.3);
  gameover.play();
  }
  
  //TÍTULO
  textAlign(CENTER, CENTER);
  noStroke;
  fill(101,217,217);// cor do preenchimento do título
  textFont(myFont,100);//tamanho e fonte do titulo
  mouseT= text('GAME OVER',440,220)//localização do titulo
} 
function venceu(){

  image(fundo, 0, 0);//Localização do fundo
  image(quadrado6,780, 380);//Localização do fundo
  image(retangulo, 192, 160);//Localização do fundo
  image(brilho, 740,300);
  image(brilho, 140,130);
  
  contadorS = parseInt(contador/2);
  contador++;

  textAlign(CENTER, CENTER);
  noStroke();
  textFont(myFont,100)
  fill(101,217,217);
  text("PARABÉNS",450,240);
  fill(123,123,123);// cor do preenchimento do título
  textFont(myFont2,27);//tamanho da fonte do titulo
  text('VOCÊ DECOROU VÁRIOS PADRÕES!',450,130)//localização do titulo
  text('PONTUAÇÃO TOTAL: '+contTotalPontos ,450,400)//localização do titulo
  
  if (contadorS==1){
  win.setVolume(0.2);
  win.play();
  }
}// TELA 10

//INTERAÇÕES DO USUÁRIO
function mouseReleased(event) {
   if(mouseButton === LEFT && mouseX>vetorX[0] && mouseX<vetorX[0]+larguraQ && mouseY> vetorY[0] && mouseY<vetorY[0]+alturaQ && (tela ==1 || tela==5 || tela ==6)) {
      gt[0] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  } 
  
  else if(mouseButton === LEFT && mouseX>vetorX[1] && mouseX<vetorX[1]+larguraQ && mouseY> vetorY[1] && mouseY<vetorY[1]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[1] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  
    }
  else if(mouseButton === LEFT && mouseX>vetorX[2] && mouseX<vetorX[2]+larguraQ && mouseY> vetorY[2] && mouseY<vetorY[2]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[2] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  
    }
  else if(mouseButton === LEFT && mouseX>vetorX[3] && mouseX<vetorX[3]+larguraQ && mouseY> vetorY[3] && mouseY<vetorY[3]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[3] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  
    }
  else if(mouseButton === LEFT && mouseX>vetorX[4] && mouseX<vetorX[4]+larguraQ && mouseY> vetorY[4] && mouseY<vetorY[4]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[4] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  
    }
  else if(mouseButton === LEFT && mouseX>vetorX[5] && mouseX<vetorX[5]+larguraQ && mouseY> vetorY[5] && mouseY<vetorY[5]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[5] = true;
      fill(101,217,217);//cor azul
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
  
    }
  else if(mouseButton === LEFT && mouseX>vetorX[6] && mouseX<vetorX[6]+larguraQ && mouseY> vetorY[6] && mouseY<vetorY[6]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[6] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorX[7] && mouseX<vetorX[7]+larguraQ && mouseY> vetorY[7] && mouseY<vetorY[7]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[7] = true;
      contPontos++;
      clicar.setVolume(0.3);
      clicar.play();
    }
  
//-------C---------I-----------N-------Z------------A---------------S---------
  
  else if(mouseButton === LEFT && mouseX>vetorXc[0] && mouseX<vetorXc[0]+larguraQ && mouseY> vetorYc[0] && mouseY<vetorYc[0]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[8] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[1] && mouseX<vetorXc[1]+larguraQ && mouseY> vetorYc[1] && mouseY<vetorYc[1]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[9] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[2] && mouseX<vetorXc[2]+larguraQ && mouseY> vetorYc[2] && mouseY<vetorYc[2]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[10] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }

  else if(mouseButton === LEFT && mouseX>vetorXc[3] && mouseX<vetorXc[3]+larguraQ && mouseY> vetorYc[3] && mouseY<vetorYc[3]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[11] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[4] && mouseX<vetorXc[4]+larguraQ && mouseY> vetorYc[4] && mouseY<vetorYc[4]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[12] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[5] && mouseX<vetorXc[5]+larguraQ && mouseY> vetorYc[5] && mouseY<vetorYc[5]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[13] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[6] && mouseX<vetorXc[6]+larguraQ && mouseY> vetorYc[6] && mouseY<vetorYc[6]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[14] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
  else if(mouseButton === LEFT && mouseX>vetorXc[7] && mouseX<vetorXc[7]+larguraQ && mouseY> vetorYc[7] && mouseY<vetorYc[7]+alturaQ &&  (tela ==1 || tela==5 || tela ==6)) {
      gt[15] = true;
      contPontosC++;
      clickerro.setVolume(0.3);
      clickerro.play();
    }
}