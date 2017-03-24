$(document).ready(function() {
	var board = [
				["","",""],
				["","",""],
				["","",""]
			];
	var isPlayerTurn = true;
	var isGameOver = false;
	var turnCount = 0;
	var gameNum = 0;
	var player = {token:"X", wins: 0};
	var ai = {token:"O", wins: 0};
	var myMatch;

	// Hide Inactive Div's
	$("#info").hide();
	
	// Select to start the match
	$("#X").click(function(event){

		myMatch = setInterval(match, 100);
		$("#selectToken").hide();
		$("#winner").hide();
	});

	$("#O").click(function(event){
		player.token = "O";
		ai.token = "X";
		isPlayerTurn = false;
		myMatch = setInterval(match, 100);
		$("#selectToken").hide();
		$("#winner").hide();
	});

	// Reinitialize game when rematch is clicked
	$("#rematch").click(function(event){
		initGame();
	});

	// Match loop
	function match(){
		if(isPlayerTurn && !isGameOver){
			// make player move
			$(".square").click(function(event){
				// parse click id into selected board row and col
				sid = event.target.id;
				row = sid.substring(0,1);
				col = sid.substring(1,2);
				// is selection valid and game not over?
				if(board[row][col] === "" && isPlayerTurn && !isGameOver){
					board[row][col] = player.token;
					isPlayerTurn = false;
					turnCount++;
					isGameOver = gameOver();
				}
			});		
		}
		
		// AI Turn
		if(!isPlayerTurn && !isGameOver){
			aiTurn();
			isGameOver = gameOver();
		}

		if(isGameOver){
			$("#info").show();
		}

		updateBoard();
	}

	//Setup a new game
	function initGame(){
		board = [
				["","",""],
				["","",""],
				["","",""]
			];

		turnCount = 0;
		gameNum++;
		console.log(gameNum);

		if(player.token === "X"){
			if(gameNum % 2 == 0){
				isPlayerTurn = true;
			}else{
				isPlayerTurn = false;
			}
		}else{
			if(gameNum % 2 == 0){
				isPlayerTurn = false;
			}else{
				isPlayerTurn = true;
			}
		}
		isGameOver = false;
		$("#winner").hide();
		$("#info").hide();
	}

	//Computer move logic
	function aiTurn(){
		row = Math.floor(Math.random() * 3);
		col = Math.floor(Math.random() * 3);

		if(board[row][col] === ""){
			board[row][col] = ai.token;
			isPlayerTurn = true;
			turnCount++;
		}else{
			aiTurn();
		}
	}

	//Redraws the game board
	function updateBoard(){
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				$("#" + i + j).html(board[i][j]);
			}
		}
	}

	//checks for win or draw.  Increments score and updates winner div.
	function gameOver(){

		wc = winConditions();

		switch(wc){
			case null:
				return false;
				break;
			case "X":
			case "O":
				$("#winner").html(wc + " WINS!");
				$("#winner").show();
				incrementScore(wc);
				console.log(wc + " WINS!");
				return true;
				break;
			case "D":
				$("#winner").html("The Cat WINS!");
				$("#winner").show();
				console.log("Cat Wins!");
				return true;
				break;
		}
	}

	//Checks and returns winner value for X, O, or Draw.  Otherwise returns a null value
	function winConditions(){
		winRow = checkRows(board);
		winCol = checkCols(board)
		winTD = checkTopDiagonal(board);
		winBD = checkBotDiagonal(board);
		winDraw = checkCat(turnCount);

		if(winRow !== null){
			return winRow;
		}

		if(winCol !== null){
			return winCol;
		}

		if(winTD !== null){
			return winTD;
		}

		if(winBD !== null){
			return winBD;
		}

		if(winDraw !== null){
			return winDraw;
		}

		return null;
	}

	// Rows win condition
	function checkRows(b){
		for(i=0; i<3; i++){
			if(b[i][0] === b[i][1] && b[i][0] === b[i][2] && b[i][0] != ""){
				return b[i][0];
			}
		}
		return null
	}

	// Columns win condition
	function checkCols(b){
		for(j=0; j<3; j++){
			if(b[0][j] === b[1][j] && b[0][j] === b[2][j] && b[0][j] != ""){
				return b[0][j];
			}
		}
		return null;
	}

	//check top left to bottom right
	function checkTopDiagonal(b){
		if(b[0][0] === b[1][1] && b[0][0] === b[2][2] && b[0][0] != ""){
			return b[0][0];
		}
		return null;
	}

	//check bot left to top right
	function checkBotDiagonal(b){
		if(b[2][0] === b[1][1] && b[2][0] === b[0][2] && b[2][0] != ""){
			return b[2][0];
		}
		return null;
	}

	//check draw
	function checkCat(tc){
		if(tc === 9){
			return "D";
		}
		return null;
	}

	//update scoreboard
	function incrementScore(str){
		if(str === player.token){
			player.wins++;
		}else{
			ai.wins++;
		}
		$("#score").html("PLAYER " + player.wins + " - AI: " + ai.wins);
	}

	function miniMaxAI(simBoard){
		sb = simBoard;
		aiTurn = true;
		score = 0;
		bestScore = 0;
		bestMove = 00;

		for(i=0; i<3; i++){
			score = 0;
			for(j=0; j<3; j++){
				if(sb[i][j] === null){
					if(aiTurn){
						sb[i][j] = ai.token;
					}else{
						sb[i][j] = player.token;
					}
					aiTurn = !aiTurn;
					simWC = winConditions(sb);
					if(simWC === ai.token){
						score += 10;
						break;
					}else if(simWC === player.token){
						score -= 10;
						break;
					}else if(simWC = "D"){
						score += 0;
						break;
					else{
						// do nothing
					}
				}
			}
		}
	}

});