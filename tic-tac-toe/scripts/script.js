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
			hardAiTurn();
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

	function hardAiTurn(){
		aiWinValue = aiWin();
		aiBlockValue = aiBlock();
		console.log(aiBlockValue);
		if(aiWinValue !== null){
			board[aiWinValue.substring(0, 1)][aiWinValue.substring(1, 2)] = ai.token;
			isPlayerTurn = true;
			turnCount++;
		}else if(aiBlockValue !== null){
			board[aiBlockValue.substring(0, 1)][aiBlockValue.substring(1, 2)] = ai.token;
			isPlayerTurn = true;
			turnCount++;
		}
		else{
			aiTurn();
		}
	}

	function aiWin(){
		for(aiWini=0; aiWini<3; aiWini++){
			for(aiWinj=0; aiWinj<3; aiWinj++){
				cloneBoard();
				if(testBoard[aiWini][aiWinj] == ""){
					testBoard[aiWini][aiWinj] = ai.token;
					testWin = winConditions(testBoard, turnCount);
					if(testWin === ai.token){
						return aiWini + "" + aiWinj;
					}
				}
			}
		}
		return null;
	}

	function aiBlock(){
		for(abi=0; abi<3; abi++){
			for(abj=0; abj<3; abj++){
				cloneBoard();
				if(testBoard[abi][abj] == ""){
					testBoard[abi][abj] = player.token;
					testWin = winConditions(testBoard, turnCount);
					if(testWin === player.token){
						return abi + "" + abj;
					}
				}
			}
		}
		return null;
	}

	function cloneBoard(){
		testBoard = [
				["","",""],
				["","",""],
				["","",""]
			];
		for(cbi=0; cbi<3; cbi++){
			for(cbj=0; cbj<3; cbj++){
				testBoard[cbi][cbj] = board[cbi][cbj];
			}
		}
	}

	//Redraws the game board
	function updateBoard(){
		for(ubi=0; ubi<3; ubi++){
			for(ubj=0; ubj<3; ubj++){
				$("#" + ubi + ubj).html(board[ubi][ubj]);
			}
		}
	}

	//checks for win or draw.  Increments score and updates winner div.
	function gameOver(){

		wc = winConditions(board, turnCount);

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
	function winConditions(b, tc){
		winRow = checkRows(b);
		winCol = checkCols(b)
		winTD = checkTopDiagonal(b);
		winBD = checkBotDiagonal(b);
		winDraw = checkCat(tc);

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
		for(cri=0; cri<3; cri++){
			if(b[cri][0] === b[cri][1] && b[cri][0] === b[cri][2] && b[cri][0] != ""){
				return b[cri][0];
			}
		}
		return null
	}

	// Columns win condition
	function checkCols(b){
		for(ccj=0; ccj<3; ccj++){
			if(b[0][ccj] === b[1][ccj] && b[0][ccj] === b[2][ccj] && b[0][ccj] != ""){
				return b[0][ccj];
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
		$("#playerScore").html("PLAYER</br>" + player.wins);
		$("#aiScore").html("CPU</br>" + ai.wins);
		//$("#score").html("PLAYER " + player.wins + " - AI: " + ai.wins);
	}
	/*
	function score(simWin){
		if(simWin === ai.token){
			return 10;
		}else if(simWin === player.token){
			return -10;
		}else{
			return 0;
		}
	}
	
	function miniMaxAI(simBoard){
		sb = simBoard;
		terminal = winConditions(sb)
		if(terminal !== null){
			return score(terminal);
		}else{
			availablePositions = availableSquares(sb);

			availableNextStates = availablePositions.map(function(pos){
				//action = 
			});
		}
	}

	function availableSquares(simBoard){
		var ap = [];
		for(i=0; i<3; i++){
			for(j=0; j<3; j++){
				if(simBoard[i][j] === ""){
					ap.push(simBoard[i][j]);
				}
			}
		}
		return ap;
	}

	var AIAction = function(pos){
		this.movePosition = pos;

		this.minimaxVal = 0;

		this.applyTo = function(state) {
			var next = new State(state);

			//next.
		}
	}
	*/
});