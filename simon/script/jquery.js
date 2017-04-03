$(document).ready(function() {
	var simonSeq = [];
	var playerSeq = [];
	var colors = ["green", "red", "yellow", "blue"];
	var round = 0;
	var state = "off";
	var index = 0;
	var strict = false;
	var game;

	
	// Game Loop
	function play(){
		if(state == "simon"){
			if(simonSeq.length <= 5){
				addToSeq();
				displayRound();
				console.log("simon seq" + simonSeq);
				displaySeq();
				console.log("Player Seq = " + playerSeq)
				state = "player";
			}else{
				win();
				state = "gameOver";
			}
		}
	}

	$("#green").click(function(event){
		if(state == "player"){
			playerSeq.push("green");
			lightOn("green");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}	
	});

	$("#red").click(function(event){
		if(state == "player"){
			playerSeq.push("red");
			lightOn("red");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}
	});

	$("#yellow").click(function(event){
		if(state == "player"){
			playerSeq.push("yellow");
			lightOn("yellow");
			checkPlayerInput();
			console.log("ps = " + playerSeq);
		}
	});

	$("#blue").click(function(event){
		if(state == "player"){
			playerSeq.push("blue");
			lightOn("blue");
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
			lightOn(simonSeq[index]);
			index++;
			if(index >= round){
				clearInterval(lightInterval);
			}
		}, 1000);	
	}

	function lightOn(color){
		lightDiv = "#" + color;
		$(lightDiv).animate({opacity: '1'}, "slow");
		$(lightDiv).animate({opacity: '.3'}, "fast");
	}

	function initializeGame(){
		state = "on";
		playerSeq = [];
		simonSeq = [];
		round = 0;
		index = 0;
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