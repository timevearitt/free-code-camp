$(document).ready(function() {
	var startWorkTime = 5;
	var workTime = startWorkTime;
	var startBreakTime = 5;
	var breakTime = startBreakTime;
	var isBreak = false;
	var workInterval;
	
	// Display the default time in minutes and seconds.  returnSeconds accounts for adding 0 to time when seconds between 0-9.
	$("#workTimer").html(Math.floor(workTime/60) + ":" + returnSeconds(workTime));
	$("#breakTimer").html(Math.floor(breakTime/60) + ":" + returnSeconds(breakTime));

	//Triggers work timer when start is clicked
	$("#start").click(function() {
		if(!isBreak){
			workInterval = setInterval(function(){ setWorkTime() }, 1000);
		}else{
			breakInterval = setInterval(function(){ setBreakTime() }, 1000);
		}
		
	});
	// Pauses time when stop is clicked
	$("#stop").click(function() {
		isTiming = false;
		clearInterval(workInterval);
		clearInterval(breakInterval);
	});

	//Work time logic
	function setWorkTime(){
		workTime--;
		$("#workTimer").html(Math.floor(workTime/60) + ":" + returnSeconds(workTime));
		if(workTime === 0){
			clearInterval(workInterval);
			breakTime = 5;
			breakInterval = setInterval(function(){ setBreakTime() }, 1000);
			isBreak = true;
		}
	}

	//Break time logic
	function setBreakTime(){
		breakTime--;
		$("#breakTimer").html(Math.floor(breakTime/60) + ":" + returnSeconds(breakTime));
		if(breakTime === 0){
			clearInterval(breakInterval);
			workTime = 5;
			workInterval = setInterval(function(){ setWorkTime() }, 1000);
			isBreak = false;
		}
	}
	
	//Format time to string
	function returnSeconds(num){
		if(num % 60 < 10){
			return "0" + num%60
		}else{
			return num % 60;
		}
	}
			
});