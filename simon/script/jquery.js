$(document).ready(function() {
	var simonSeq = [];
	var playerSeq = [];
	var colors = ["green", "red", "yellow", "blue"];
	var round = 0;
	var state = "off";
	var index = 0;
	var strict = false;
	var difficulty = "slow";
	var game;


	
	// Game Loop
	function play(){
		if(state === "simon"){
			simonState();
		}

		if(state === "off"){
			round = 0;
		}
	}

	$("#green").click(function(event){
		if(state == "player"){
			playerSeq.push("green");
			lightOn("green", "fast");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}	
	});

	$("#red").click(function(event){
		if(state == "player"){
			playerSeq.push("red");
			lightOn("red", "fast");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}
	});

	$("#yellow").click(function(event){
		if(state == "player"){
			playerSeq.push("yellow");
			lightOn("yellow", "fast");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}
	});

	$("#blue").click(function(event){
		if(state == "player"){
			playerSeq.push("blue");
			lightOn("blue", "fast");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}
	});

	$("#start").click(function(event){
		if(state !== "off"){
			clearInterval(game);
			initializeGame();
		}
		state = "simon";
		game = setInterval(play, 33);
	});

	$("#btnStrict").click(function(event){
		if(state != "off"){
			strict = !strict;
			console.log(strict);
			if(strict){
				$("#strictLight").css("background-color", "red");
			}else{
				$("#strictLight").css("background-color", "#560000");
			}
		}
	});
	
	// Game State "on" - turn on game
	$("#power").click(function(event){
		if(state === "off"){
			state = "on";
			displayRound();
			$("#power").css("color", "green");
		}else{
			state = "off";
			$("#power").css("color", "black");
			$("#strictLight").css("background-color", "#560000");
			$("#round").html("");
			strict = false;
		}
	});

	// DISPLAY BOARD *********************************************************

	function simonState(){
		if(simonSeq.length <= 19){
			addToSeq();
			displayRound();
			console.log("simon seq" + simonSeq);
			checkDifficulty();
			setTimeout(displaySeq, 1000);
			console.log("Player Seq = " + playerSeq)
			state = "player";
		}else{
			win();
			state = "gameOver";
		}
	}

	function displayRound(){
		if(round < 10){
			$("#round").html("0" + round);
		}else{
			$("#round").html(round);
		}
	}

	function displayError(){
		$("#round").html("!!");
		setTimeout(displayRound, 2000);
		playerSeq = [];
	}

	function addToSeq(){
		if(round < 20){
			simonSeq.push(colors[Math.floor(Math.random() * colors.length)]);
			round++;
			displayRound();
		}
	}

	function displaySeq(){
		index = 0;
		var	lightInterval = setInterval(function() {
			lightOn(simonSeq[index], difficulty);
			index++;
			if(index >= round){
				clearInterval(lightInterval);
			}
		}, 1000);	
	}

	function lightOn(color, speed){
		if(state !== "off"){
			lightDiv = "#" + color;
			$(lightDiv).animate({opacity: '1'}, speed);
			$(lightDiv).animate({opacity: '.3'}, "fast");	
		}	
	}

	function initializeGame(){
		playerSeq = [];
		simonSeq = [];
		round = 0;
		index = 0;
		
		if(state !== "on"){
			state = "simon";
		}
	}

	function checkDifficulty(){
		if(round < 6){
			difficulty = "slow";
		}else if(round < 14){
			difficulty = 400;
		}else{
			difficulty = "fast";
		}
	}

	function win(){
		lightDiv = "#" + simonSeq[5];
		for(i=0; i<7; i++){
			$(lightDiv).animate({opacity: '1'}, "fast");
			$(lightDiv).animate({opacity: '.3'}, "fast");
		}

		initializeGame();	
	}

	// PLAYER LOGIC **************************************************************

	function checkPlayerInput(){
		for(var i=0; i<playerSeq.length; i++){
			if(playerSeq[i] != simonSeq[i]){
				displayError();
				if(strict){
					setTimeout(initializeGame, 1750);
					break;
				}
			}
		}

		if(playerSeq.length == simonSeq.length){
			state = "simon";
			playerSeq = [];
		}
	}

	// Game State "off" - turn off game

	/* If Simons turn:
		1) Generate new color
		2) Diplay sequence
	*/

	/* If player turn:
		1) enable buttons
		2) listen for input
		3) compare to simon
	*/

});