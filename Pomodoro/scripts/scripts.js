$(document).ready(function() {
	var startWorkTime = 5;
	var workTime = startWorkTime;
	var startBreakTime = 5;
	var breakTime = startBreakTime;
	var isTiming = false;
	var workInterval;
	

	$("#workTimer").html(Math.floor(workTime/60) + ":" + returnSeconds(workTime));
	$("#breakTimer").html(Math.floor(breakTime/60) + ":" + returnSeconds(breakTime));

	$("#start").click(function() {
		isTiming = true;
		workInterval = setInterval(function(){ setWorkTime() }, 1000);
	});


	function setWorkTime(){
		workTime--;
		$("#workTimer").html(Math.floor(workTime/60) + ":" + returnSeconds(workTime));
		if(workTime === 0){
			clearInterval(workInterval);
			breakTime = 5;
			breakInterval = setInterval(function(){ setBreakTime() }, 1000);
		}
	}
	
	function setBreakTime(){
		breakTime--;
		$("#breakTimer").html(Math.floor(breakTime/60) + ":" + returnSeconds(breakTime));
		if(breakTime === 0){
			clearInterval(breakInterval);
			workTime = 5;
			workInterval = setInterval(function(){ setWorkTime() }, 1000);
		}
	}
	
	function returnSeconds(num){
		if(num % 60 < 10){
			return "0" + num%60
		}else{
			return num % 60;
		}
	}
			
});