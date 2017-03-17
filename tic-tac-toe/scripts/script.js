$(document).ready(function() {
	var playerXO = "X";

	$("#X").click(function() {
		reset();
		$("#xoro").hide();
	});

	$("#O").click(function() {
		playerXO = "O";
		reset();
		$("#xoro").hide();
	});

	$(".square").click(function(event){
		sid = "#" + event.target.id;
		text = $(sid).text();
		if(text === null || text===""){
			$(sid).html(playerXO);
		}
	});

	function reset(){
		$(".square").html("");
	}


});