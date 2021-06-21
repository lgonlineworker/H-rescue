function start(){
    $("#inicio").hide();
	
	$("#fundoGame").append("<div id='jogador' class='animaPlayer'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='animaEnemy1'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
	$("#fundoGame").append("<div id='amigo' class='animaFriend'></div>");
	$("#fundoGame").append("<div id='placar'></div>");
	$("#fundoGame").append("<div id='energia'></div>");

	//Variáveis de som do jogo
	var somDisparo=document.getElementById("somDisparo");
	var somBomba=document.getElementById("somBomba");
	var somExplosao=document.getElementById("somExplosao");
	var musica=document.getElementById("musica");
	var somGameover=document.getElementById("somGameover");
	var somMorteAmigo=document.getElementById("somPerdido");
	var somResgate=document.getElementById("somResgate");


    //Principais variáveis do jogo
	
	var jogo = {};
	var TECLA = {
		W: 87,
		S: 83,
		D: 68,
		A: 65,
		J: 74,
		K: 75
		}
	
	jogo.pressionou = [];

	var velocidade=5; //level+
	var posicaoY = parseInt(Math.random() * 334);

	var Atirar=1;
	var Bomba=true;

	var tempoRep = 1000; //level-
	var fimdejogo = false;
	var posicaoFundo = parseInt($("#fundoGame").css("background-position"))

	var pontos = 0;
	var salvos = 0;
	var perdidos = 0;
	var level = 1; //level+
	var energiaAtual = 3; //level+1
	

	
	//Verifica se o usuário pressionou alguma tecla	
	
	$(document).keydown(function(e){
		jogo.pressionou[e.which] = true;
		});
	
	
	$(document).keyup(function(e){
		   jogo.pressionou[e.which] = false;
		});
	
	
	//Game Loop

	jogo.timer = setInterval(loop,50);
	
	function loop() {
	
	moveFundo();
	moveJogador();
	moveInimigo1();
	moveInimigo2();
	moveAmigo();
	colisao();
	placar();
	energia();
	levelUp();
	musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
	musica.play();
	} // Fim da função loop()

	
	//Funções do jogo

    function moveFundo() {
	
        let esquerda = parseInt($("#fundoGame").css("background-position"));
        $("#fundoGame").css("background-position",esquerda-1);
        console.log(esquerda)
        }

	function moveJogador() {
	
		if (jogo.pressionou[TECLA.W]) {
			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo-10);
				if (topo<=20){
					$("#jogador").css("top",topo+0);
				}
		}
	
		if (jogo.pressionou[TECLA.S]) {
			let topo = parseInt($("#jogador").css("top"));
			$("#jogador").css("top",topo+10);
				if (topo>=405){
					$("#jogador").css("top",topo-0);
				}
		}
		if (jogo.pressionou[TECLA.D]) {
			let canto = parseInt($("#jogador").css("left"));
			$("#jogador").css("left",canto+10);
				if (canto>=720){
					$("#jogador").css("left",canto-0);
				}
		}
		if (jogo.pressionou[TECLA.A]) {
			let canto = parseInt($("#jogador").css("left"));
			
			$("#jogador").css("left",canto-10);
				if (canto<=20){
					$("#jogador").css("left",canto+0);
				}
		}

		if (jogo.pressionou[TECLA.J]) {
			//Chama função Disparo
			tiro();
			}
		if (jogo.pressionou[TECLA.K]) {
			//Chama função bomba
			bomba();
			}

	}

	function moveInimigo1() {

		let posicaoX = parseInt($("#inimigo1").css("left"));
		$("#inimigo1").css("left",posicaoX-(velocidade));
		$("#inimigo1").css("top",posicaoY);
			
			if (posicaoX<0) {
			perdidos++;
			pontos-=level*10;
			let posicaoY = parseInt(Math.random() * 334);
			$("#inimigo1").css("left",694);
			$("#inimigo1").css("top",posicaoY);
				
			}
	} //Fim da função moveinimigo1

	function moveInimigo2() {

		let posicaoX = parseInt($("#inimigo2").css("left"));
		$("#inimigo2").css("left",posicaoX-(velocidade-3));
			
			if (posicaoX<0) {
			perdidos++;
			pontos-=level*10;
			$("#inimigo2").css("left",775);	
			}
	} //Fim da função moveinimigo2

	function moveAmigo() {
	
		let posicaoX = parseInt($("#amigo").css("left"));
		$("#amigo").css("left",posicaoX+5);
			
			if (posicaoX>906) {
				pontos+=(level*25);
				salvos++;
				somResgate.play();
				$("#amigo").css("left",20);	
			}
	
	} // fim da função moveamigo()

	function tiro() {
	
		if (Atirar>=1) {
			
		Atirar-=1;
		somDisparo.play();
		let topo = parseInt($("#jogador").css("top"))
		let posicaoX= parseInt($("#jogador").css("left"))
		let tiroX = posicaoX + 190;
		let topoTiro = topo + 37;
		$("#fundoGame").append("<div id='tiro'></div");
		$("#tiro").css("top",topoTiro);
		$("#tiro").css("left",tiroX);
		
		var tempoTiro=window.setInterval(moveTiro, 30);
		
		} //Fecha Atirar
	 
		function moveTiro() {
			let posicaoX = parseInt($("#tiro").css("left"));
			$("#tiro").css("left",posicaoX+25); 
	
					if (posicaoX>900) {		
				window.clearInterval(tempoTiro);
				tempoTiro=null;
				$("#tiro").remove();
				Atirar+=1;
				 }
		} // Fecha moveTiro()
	} // Fecha Tiro()
	
	function bomba() {
	
		if (Bomba==true) {
			
		Bomba=false;
		somBomba.play();
		let topo = parseInt($("#jogador").css("top"))
		let posicaoX= parseInt($("#jogador").css("left"))
		let bombaX = posicaoX+90;
		let topoBomba = topo+47;
		$("#fundoGame").append("<div id='bomba'></div");
		$("#bomba").css("top",topoBomba);
		$("#bomba").css("left",bombaX);
		
		var tempoBomba=window.setInterval(moveBomba, 200);
		
		} //Fecha podeAtirar
	 
		function moveBomba() {
			let topo = parseInt($("#bomba").css("top"));
			$("#bomba").css("top",topo+25);
			let posicaoX = parseInt($("#bomba").css("left"));
			$("#bomba").css("left",posicaoX+35);
	
				if (topo>454) {
					somBomba.pause();
					window.clearInterval(tempoBomba);
					tempoBomba=null;
					$("#bomba").remove();
					Bomba=true;	
					}
		} // Fecha moveBomba()
	} // Fecha bomba()

	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#tiro").collision($("#inimigo1")));
		var colisao31 = ($("#bomba").collision($("#inimigo1")));
		var colisao4 = ($("#tiro").collision($("#inimigo2")));
		var colisao41 = ($("#bomba").collision($("#inimigo2")));
		var colisao5 = ($("#bomba").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));
		
		if (colisao1.length>0) {
			let inimigo1X = parseInt($("#inimigo1").css("left"));
			let inimigo1Y = parseInt($("#inimigo1").css("top"));
			explosao(inimigo1X,inimigo1Y);
			
			$("#inimigo1").remove();
			reposicionaInimigo1();
			energiaAtual--;
			}

		 if (colisao2.length>0) {
			let inimigo2X = parseInt($("#inimigo2").css("left"));
			let inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao(inimigo2X,inimigo2Y);

			$("#inimigo2").remove();
			reposicionaInimigo2();
			energiaAtual--;
			}

		if (colisao3.length>0) {
			pontos+=10;
			let inimigo1X = parseInt($("#inimigo1").css("left"));
			let inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao(inimigo1X,inimigo1Y);
			$("#tiro").css("left",950);
				
			$("#inimigo1").remove();
			reposicionaInimigo1();
			}

		if (colisao31.length>0) {
			pontos+=10;
			let inimigo1X = parseInt($("#inimigo1").css("left"));
			let inimigo1Y = parseInt($("#inimigo1").css("top"));
				
			explosao(inimigo1X,inimigo1Y);
			$("#bomba").css("top", 700);
				
			$("#inimigo1").remove();
			reposicionaInimigo1();
			}

		if (colisao4.length>0) {
			pontos+=10;
			let inimigo2X = parseInt($("#inimigo2").css("left"));
			let inimigo2Y = parseInt($("#inimigo2").css("top"));
			
			explosao(inimigo2X,inimigo2Y);
			$("#tiro").css("left",950);
			
			$("#inimigo2").remove();
			reposicionaInimigo2();
			}

		if (colisao41.length>0) {
			pontos+=10;
			let inimigo2X = parseInt($("#inimigo2").css("left"));
			let inimigo2Y = parseInt($("#inimigo2").css("top"));
			
			explosao(inimigo2X,inimigo2Y);
			$("#bomba").css("top", 700);
			
			$("#inimigo2").remove();
			reposicionaInimigo2();
			}

		if (colisao5.length>0) {
			somMorteAmigo.play();
			pontos-=(level*10);
			let amigoX = parseInt($("#amigo").css("left"));
			let amigoY = parseInt($("#amigo").css("top"));
			explosao2(amigoX,amigoY);
			

			$("#amigo").remove();
			$("#bomba").css("top", 700);

			reposicionaAmigo();
			}
		
		if (colisao6.length>0) {
			somMorteAmigo.play();
			pontos-=(level*10);
			let amigoX = parseInt($("#amigo").css("left"));
			let amigoY = parseInt($("#amigo").css("top"));
			explosao2(amigoX,amigoY);

			$("#amigo").remove();
			reposicionaAmigo();
			}
	

	} //Fim da função colisao

	function explosao(inimigoX,inimigoY) {
		$("#fundoGame").append("<div id='explosaoEnemy'></div");
		$("#explosaoEnemy").css("background-image", "url(imgs/explosao.png)");
		let div=$("#explosaoEnemy");
		div.css("top", inimigoY);
		div.css("left", inimigoX);
		div.animate({width:200, opacity:0}, "slow");
		somExplosao.play();
		let tempoExplosao=window.setInterval(removeExplosao, 1000);
	
		function removeExplosao() {
			div.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;	
		}
		
	} // Fim da função explosaoEnemy

	function reposicionaInimigo1() {
		let tempoColisao=window.setInterval(reposiciona1, tempoRep);
			
			function reposiciona1() {
			window.clearInterval(tempoColisao);
			tempoColisao=null;
				
				if (fimdejogo==false) {
				$("#fundoGame").append("<div id='inimigo1' class='animaEnemy1'></div");
				posicaoY = parseInt(Math.random() * 334);
				$("#inimigo1").css("left",694);
				$("#inimigo1").css("top",posicaoY);
				}
			}	
		} // Fim da função reposicionaInimigo1

	function reposicionaInimigo2() {
			let tempoColisao=window.setInterval(reposiciona2, tempoRep+4000);
		
			function reposiciona2() {
				window.clearInterval(tempoColisao);
				tempoColisao=null;
					
					if (fimdejogo==false) {
					$("#fundoGame").append("<div id='inimigo2'></div");
					}
				}	
		} // Fim da função reposicionaInimigo2

	function explosao2(amigoX,amigoY) {
		$("#fundoGame").append("<div id='explosaoFriend' class='animaFriendDeath'></div");
		$("#explosaoFriend").css("top",amigoY);
		$("#explosaoFriend").css("left",amigoX);
		
		let tempoExplosao=window.setInterval(resetaExplosao3, 1000);
		
		function resetaExplosao3() {
			$("#explosaoFriend").remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao=null;		
			}
		} // Fim da função explosaoFriend
			
	function reposicionaAmigo() {
		var tempoAmigo=window.setInterval(reposiciona6, tempoRep+5000);

		function reposiciona6() {
			window.clearInterval(tempoAmigo);
			tempoAmigo=null;
			
				if (fimdejogo==false) {
					$("#fundoGame").append("<div id='amigo' class='animaFriend'></div>");
				}	
		}	
	} // Fim da função reposicionaAmigo

	function placar() {
	
		$("#placar").html("<h2> Level: " + level + "  Score: " + pontos + "  Salvos: " + salvos + "  Perdidos: " + perdidos + "</h2>");
		
	} //fim da função placar

	function energia() {
	
		if (energiaAtual==3) {
			$("#energia").css("background-image", "url(imgs/energia3.png)");
		}
	
		if (energiaAtual==2) {
			$("#energia").css("background-image", "url(imgs/energia2.png)");
		}
	
		if (energiaAtual==1) {
			$("#energia").css("background-image", "url(imgs/energia1.png)");
		}
	
		if (energiaAtual==0) {
			$("#energia").css("background-image", "url(imgs/energia0.png)");
			gameOver();
			//Game Over
		}
	
	} // Fim da função energia

	function levelUp() {
		let i = level*(-500);
		if(posicaoFundo <= i){
			velocidade+=0.3;
			tempoRep-=10;
			if(energiaAtual<=2){
				energiaAtual+=1
			}
			level+=1;
			pontos+=100;
		}
		let j = level*5;
		if(salvos >= j){
			velocidade+=0.3;
			tempoRep-=10;
			if(energiaAtual<=2){
				energiaAtual+=1
			}
			level+=1;
			pontos+=100;
		}
	}// Fim da função levelUp

	function gameOver() {
		fimdejogo=true;
		musica.pause();
		somGameover.play();
		
		window.clearInterval(jogo.timer);
		jogo.timer=null;
		
		$("#jogador").remove();
		$("#inimigo1").remove();
		$("#inimigo2").remove();
		$("#amigo").remove();
		
		$("#fundoGame").append("<div id='fim'></div>");
		
		$("#fim").html("<h1> Game Over </h1><p><b>Você chegou até o level: " + level + "<br> Sua pontuação foi: " + pontos +"</b></p>" + "<button id='reinicia' onClick=reiniciaJogo()><b>Jogar Novamente</b></button>");
		} // Fim da função gameOver();
	

}// Fim da função Start

function reiniciaJogo() {
	somGameover.pause();
	$("#fim").remove();
	pontos = 0;
	salvos = 0;
	perdidos = 0;
	level = 1;
	energiaAtual = 3
	start();
	
} //Fim da função reiniciaJogo