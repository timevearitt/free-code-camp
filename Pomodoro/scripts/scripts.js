$(document).ready(function() {
	var workTime = 5;
	var breakTime = 300;
	var isTiming = true;
	var workInterval = setInterval(function(){ setWorkTime() }, 1000);

	$("#workTimer").html(Math.floor(workTime/60) + ":" + workTime % 60);
	$("#breakTimer").html(Math.floor(breakTime/60) + ":" + breakTime % 60);


		function setWorkTime(){
			workTime--;
			$("#workTimer").html(Math.floor(workTime/60) + ":" + workTime % 60);
			if(workTime === 0){
				clearInterval(workInterval);
				breakInterval = setInterval(function(){ setBreakTime() }, 1000);
			}
		}

		function setBreakTime(){
			breakTime--;
			$("#breakTimer").html(Math.floor(breakTime/60) + ":" + breakTime % 60);
			if(breakTime === 0){
				clearInterval(breakInterval);
				breakInterval = setInterval(function(){ setBreakTime() }, 1000);
			}
		}
			




	
		

});