$(document).ready(function() {
	var simonSeq = [];
	var playerSeq = [];
	var colors = ["green", "red", "yellow", "blue"];
	var round = 0;
	var state = "off";
	var index = 0;
	var game;

	
	// Game Loop
	function play(){
		if(state === "simon"){
			addToSeq();
			displayRound();
			console.log(simonSeq);
			displaySeq();
			playerSeq = [];
			console.log("Player Seq = " + playerSeq)
			state = "player";
		}

		if(state === "player"){
			console.log("player turn");
			$("#green").click(function(event){
				state = "check";
				playerSeq.push("green");
				console.log(playerSeq);
				checkPlayerInput();
				
			});

			$("#red").click(function(event){
				state = "check";
				playerSeq.push("red");
				console.log(playerSeq);
				checkPlayerInput();
				
			});

			$("#yellow").click(function(event){
				state = "check";
				playerSeq.push("yellow");
				console.log(playerSeq);
				checkPlayerInput();
				
			});

			$("#blue").click(function(event){
				state = "check";
				playerSeq.push("blue");
				console.log(playerSeq);
				checkPlayerInput();
				
			});
		}
	}

	$("#start").click(function(event){
		state = "simon";
		game = setInterval(play, 100);
	});
	
	// Game State "on" - turn on game
	$("#power").click(function(event){
		state = "on";
		displayRound();
		$("#power").css("color", "green");
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

	// PLAYER LOGIC **************************************************************

	function checkPlayerInput(){
		for(var i=0; i<playerSeq.length; i++){
			if(playerSeq[i] !== simonSeq[i]){
				displayError();
			}
		}

		state = "player";

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