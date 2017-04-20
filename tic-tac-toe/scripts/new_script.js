$(document).ready(function() {
	var board = [
				["","",""],
				["","",""],
				["","",""]
			];

	var game = {
							isPlayerTurn: true,
							isGameOver: false,
							turnCount: 0,
							gameNum: 0,
							playerToken: "X",
							playerWins: 0,
							aiToken: "O",
							aiWins: 0
	};

	var myMatch;
	var matchInterval = 33;

	// UI EVENTS *********************************************
	
	// Hide Inactive Div's
	$("#info").hide();

	// Select to start the match as X
	$("#X").click(function(event){
		myMatch = setInterval(match, matchInterval);
		$("#selectToken").hide();
		$("#winner").hide();
	});

	// Select to start the match as o
	$("#O").click(function(event){
		game.player = "O";
		game.playerToken = "X";
		game.isPlayerTurn = false;
		myMatch = setInterval(match, matchInterval);
		$("#selectToken").hide();
		$("#winner").hide();
	});

	// Reinitialize game when rematch is clicked
	$("#rematch").click(function(event){
		initGame();
	});

		// MATCH LOOP *********************************************
	function match(){
		// PLAYER TURN
		if(game.isPlayerTurn && !game.isGameOver){
			// make player move
			$(".square").click(function(event){
				//BLOCK SCOPE
				{
					// parse click id into selected board row and col
					let sid = event.target.id;
					let row = sid.substring(0,1);
					let col = sid.substring(1,2);
					// is selection valid and game not over?
					if(board[row][col] === "" && game.isPlayerTurn && !game.isGameOver){
						board[row][col] = game.playerToken;
						game.isPlayerTurn = false;
						game.turnCount++;
						game.isGameOver = gameOver();
					}
				}
			});		
		}
		
		// AI TURN
		if(!game.isPlayerTurn && !game.isGameOver){
			hardAiTurn();
			game.isGameOver = gameOver();
		}

		// if game is over show the results
		if(game.isGameOver){
			$("#info").show();
		}

		// redraw the game board
		updateBoard();
	}

		//Setup a new game
	function initGame(){
		board = [
				["","",""],
				["","",""],
				["","",""]
			];

		game.turnCount = 0;
		game.gameNum++;

		// rotate first player
		if(game.playerToken === "X"){
			if(game.gameNum % 2 == 0){
				game.isPlayerTurn = true;
			}else{
				game.isPlayerTurn = false;
			}
		}else{
			if(game.gameNum % 2 == 0){
				game.isPlayerTurn = false;
			}else{
				game.isPlayerTurn = true;
			}
		}
		game.isGameOver = false;
		$("#winner").hide();
		$("#info").hide();
	}

		// AI GAME LOGIC******************************************************
	function aiTurn(){
		//BLOCK SCOPE
		{
			let row = Math.floor(Math.random() * 3);
			let col = Math.floor(Math.random() * 3);

			if(board[row][col] === ""){
				board[row][col] = game.aiToken;
				game.isPlayerTurn = true;
				game.turnCount++;
			}else{
				aiTurn();
			}
		}
	}

	function hardAiTurn(){
		//BLOCK SCOPE
		{
			let aiWinValue = aiWin();
			let aiBlockValue = aiBlock();
			let aiForkValue = aiFork(game.aiToken);
			let aiBlockForkValue = aiFork(game.playerToken);
			let aiOppCorner = aiPlayOppCorner();
			let aiCorner = aiPlayCorner();

			if(aiWinValue !== null){
				// Can I win?
				board[aiWinValue.substring(0, 1)][aiWinValue.substring(1, 2)] = game.aiToken;
				aiTurnOver()
			}else if(aiBlockValue !== null){
				// Do I need to block the player?
				board[aiBlockValue.substring(0, 1)][aiBlockValue.substring(1, 2)] = game.aiToken;
				aiTurnOver()
			}else if(aiForkValue !== null){
				// Can I fork?
				board[aiForkValue.substring(0, 1)][aiForkValue.substring(1, 2)] = game.aiToken;
				aiTurnOver()
			}else if(aiBlockForkValue !== null){
				// Do I need to block a fork?
				board[aiBlockForkValue.substring(0, 1)][aiBlockForkValue.substring(1, 2)] = game.aiToken;
				aiTurnOver()
			}else if(board[1][1] === ""){
				// Own the center tile
				board[1][1] = game.aiToken;
				aiTurnOver()
			}else if(aiOppCorner !== null){
				board[aiOppCorner.substring(0,1)][aiOppCorner.substring(1,2)] = game.aiToken;
				aiTurnOver();
			}else if(aiCorner !== null){
				// play an open corner
				board[aiCorner.substring(0,1)][aiCorner.substring(1,2)] = game.aiToken
				aiTurnOver();
			}else{
				// random but should only play the side
				aiTurn();
			}
		}
	}

	function aiTurnOver(){
		game.isPlayerTurn = true;
		game.turnCount++;
	}

	// AI Check for winning move
	function aiWin(){
		// BLOCK SCOPE
		{
			let i;
			let j;

			for(i=0; i<3; i++){
				for(j=0; j<3; j++){
					cloneBoard();
					if(testBoard[i][j] == ""){
						testBoard[i][j] = game.aiToken;
						testWin = winConditions(testBoard, game.turnCount);
						if(testWin === game.aiToken){
							return i + "" + j;
						}
					}
				}
			}
			return null;
		}
	}

		// AI Check to block winning move
	function aiBlock(){
		// BLOCK SCOPE
		{
			let i;
			let j;

			for(i=0; i<3; i++){
				for(j=0; j<3; j++){
					cloneBoard();
					if(testBoard[i][j] == ""){
						testBoard[i][j] = game.playerToken;
						testWin = winConditions(testBoard, game.turnCount);
						if(testWin === game.playerToken){
							return i + "" + j;
						}
					}
				}
			}
			return null;
		}
	}

		// AI play opposite corner
	function aiPlayOppCorner(){
		if(board[0][0] === game.playerToken && board[2][2] === ""){
			return "22";
		}
		if(board[0][2] === game.playerToken && board[2][0] === ""){
			return "20";
		}
		if(board[2][0] === game.playerToken && board[0][2] === ""){
			return "02";
		}
		if(board[2][2] === game.playerToken && board[0][0] === ""){
			return "00";
		}

		return null;
	}

		// AI check for open corners
	function aiPlayCorner(){
		if(board[0][0] === ""){
			return "00";
		}

		if(board[0][2] === ""){
			return "02";
		}

		if(board[2][0] === ""){
			return "20";
		}

		if(board[2][2] === ""){
			return "22";
		}

		return null;
	}

	// AI Check for fork to play or block
	function aiFork(token){
		//BLOCK SCOPE
		{
			let i;
			let j;

			for(i=0; i<3; i++){
				for(j=0; j<3; j++){
					cloneBoard();
					if(testBoard[i][j] == ""){
						testBoard[i][j] = this.token;
						if(isFork(this.token) > 1){
							return i + "" + j;
						}	
					}
				}
			}
			return null;
		}
	}

	// Possible Forks
	function isFork(token){
		return rowFork(this.token) + colFork(this.token) + diaFork(this.token);
	}

		// Check for unblocked rows where a second token can be place
	function rowFork(token){
		{
			let i;
			let j;

			let rfCount = 0;
			for(i=0; i<3; i++){
				if(testBoard[i][0] == testBoard[i][1] && testBoard[i][2] == "" && testBoard[i][1] == this.token){
					rfCount++;
				}

				if(testBoard[i][1] == testBoard[i][2] && testBoard[i][0] == "" && testBoard[i][1] == this.token){
					rfCount++;
				}

				if(testBoard[i][0] == testBoard[i][2] && testBoard[i][1] == "" && testBoard[i][0] == this.token){
					rfCount++;
				}
			}
			return rfCount;
		}
	}







});