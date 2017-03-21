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

	var myMatch = setInterval(match, 10);

	function match(){

		updateBoard();

		if(isGameOver){
			alert("Game Over!");
			initGame();
			updateBoard();
		}

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
					// redraw board
					updateBoard();
					// is game over?
					isGameOver = gameOver();
				}
			});		
		}
		
		// AI Turn
		if(!isPlayerTurn && !isGameOver){
			aiTurn();
			updateBoard();
			isGameOver = gameOver();
		}
	}

	function initGame(){
		board = [
				["","",""],
				["","",""],
				["","",""]
			];

		turnCount = 0;
		gameNum++;
		if(gameNum % 2 === 0){
			isPlayerTurn = true;
		}else{
			isPlayerTurn = false;
		}
		isGameOver = false;
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
		updateBoard();
	}

	function updateBoard(){
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				$("#" + i + j).html(board[i][j]);
			}
		}
	}

	function gameOver(){
		if(checkRows()){
			return true;
		}

		if(checkCols()){
			return true;
		}

		

		//check top left to bottom right
		if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] != ""){
			console.log(board[0][0] + " WINS!");
			//alert(board[0][0] + " WINS!");
			incrementScore(board[0][0]);
			return true;
		}

		//check top right to bottom left
		if(board[2][0] === board[1][1] && board[2][0] === board[0][2] && board[2][0] != ""){
			console.log(board[2][0] + " WINS!");
			//alert(board[2][0] + " WINS!");
			incrementScore(board[2][0]);
			return true;
		}

		//check for draw
		if(turnCount === 9){
			console.log("Cat Wins!");
			return true;
		}

		return false;

	}

	// Rows win condition
	function checkRows(){
		for(i=0; i<3; i++){
			if(board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] != ""){
				console.log(board[i][0] + " WINS!");
				//alert(board[i][0] + " WINS!");
				incrementScore(board[i][0]);
				return true;
			}
		}
	}

	// Columns win condition
	function checkCols(){
		for(j=0; j<3; j++){
			if(board[0][j] === board[1][j] && board[0][j] === board[2][j] && board[0][j] != ""){
				console.log(board[0][j] + " WINS!");
				//alert(board[0][j] + " WINS!");
				incrementScore(board[0][j]);
				return true;
			}
		}
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