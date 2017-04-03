$(document).ready(function() {
	var simonSeq = [];
	var playerSeq = [];
	var colors = ["green", "red", "yellow", "blue"];
	var round = 0;
	var state = "off";
	var light;
	var game;

	$("#start").click(function(event){
		state = "simon";
		game = setInterval(play, 10);
	});

	function play(){
		if(state === "simon"){
			addToSeq();
			displayRound();
			console.log(simonSeq);
			displaySeq();
			state = "player";

		}

		if(state === "player"){
			console.log("player turn");
			$("#green").click(function(event){
				state = "simon";
			});
		}

		
		
	}


	// Game Loop
	// Game State "on" - turn on game
	$("#power").click(function(event){
		state = "on";
		displayRound();
		$("#power").css("color", "green");
	});

	function displayRound(){
		if(round < 10){
			$("#round").html("0" + round);
		}else{
			$("#round").html(round);
		}
	}

	function addToSeq(){
		if(round < 20){
			simonSeq.push(colors[Math.floor(Math.random() * colors.length)]);
			round++;
			displayRound();
		}
	}

	function displaySeq(){
		for(dsi=0; dsi<simonSeq.length; dsi++){
			console.log("switch" + simonSeq[dsi]);
			lightDiv = "#" + simonSeq[dsi];
			lightOn();
			light = setTimeout(lightOff, 1000);
		}

		
	}

	function lightOn(){
		console.log("light " + lightDiv);
		$(lightDiv).css("opacity", "1");
	}

	function lightOff(){
		$(lightDiv).css("opacity", ".3");
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