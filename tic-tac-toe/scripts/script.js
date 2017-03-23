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

	$("#info").hide();
	
	$("#X").click(function(event){
		myMatch = setInterval(match, 100);
		$("#selectToken").hide();
	});

	$("#O").click(function(event){
		player.token = "O";
		ai.token = "X";
		isPlayerTurn = false;
		myMatch = setInterval(match, 100);
		$("#selectToken").hide();
	});

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

	$("#rematch").click(function(event){
		initGame();
	});

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
		$("#info").hide();
	}

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

	function updateBoard(){
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				$("#" + i + j).html(board[i][j]);
			}
		}
	}

	function gameOver(){

		if(winConditions() === null){
			return false;
		}else{
			return true;
		}
		
	}

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
				console.log(b[i][0] + " WINS!");
				//alert(board[i][0] + " WINS!");
				incrementScore(b[i][0]);
				return b[i][0];
			}
		}
		return null
	}

	// Columns win condition
	function checkCols(b){
		for(j=0; j<3; j++){
			if(b[0][j] === b[1][j] && b[0][j] === b[2][j] && b[0][j] != ""){
				console.log(b[0][j] + " WINS!");
				//alert(board[0][j] + " WINS!");
				incrementScore(b[0][j]);
				return b[0][j];
			}
		}
		return null;
	}

	//check top left to bottom right
	function checkTopDiagonal(b){
		if(b[0][0] === b[1][1] && b[0][0] === b[2][2] && b[0][0] != ""){
			console.log(b[0][0] + " WINS!");
			//alert(board[0][0] + " WINS!");
			incrementScore(b[0][0]);
			return b[0][0];
		}
		return null;
	}

	//check bot left to top right
	function checkBotDiagonal(b){
		if(b[2][0] === b[1][1] && b[2][0] === b[0][2] && b[2][0] != ""){
			console.log(b[2][0] + " WINS!");
			//alert(board[2][0] + " WINS!");
			incrementScore(b[2][0]);
			return b[2][0];
		}
		return null;
	}

	//check draw
	function checkCat(tc){
		if(tc === 9){
			console.log("Cat Wins!");
			return "D";
		}
		return null;
	}

	function incrementScore(str){
		if(str === player.token){
			player.wins++;
		}else{
			ai.wins++;
		}
		$("#score").html("PLAYER " + player.wins + " - AI: " + ai.wins);
	}

});