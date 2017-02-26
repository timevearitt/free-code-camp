$(document).ready(function() {
	var input = "";
	var operation = [];
	var isTotal = false;

	// Append numeric input
	$(".btnNum").click(function() {
		if(isTotal){
			input = "";
			isTotal = false;
		}
		input += $(this).val();
		$("#input").html(input);
	});

	$("#btnAdd").click(function() {
		isTotal = false;
		input += $(this).val();
		$("#input").html(input);
		operation.push($(this).val());
	});

	$("#btnSubtract").click(function() {
		isTotal = false;
		input += $(this).val();
		$("#input").html(input);
		operation.push($(this).val());
	});

	$("#btnMultiply").click(function() {
		isTotal = false;
		input += $(this).val();
		$("#input").html(input);
		operation.push($(this).val());
	});

	$("#btnDivide").click(function() {
		isTotal = false;
		input += $(this).val();
		$("#input").html(input);
		operation.push($(this).val());
	});	

	$("#btnTotal").click(function() {
		// Split input into array based on + - * or /
		values = input.split(/[x//+-]/).map( Number );
		for(i=0; i<operation.length; i++){
			if(operation[i] === "x"){
				//Set left value to 0 and right value to product.  Convert operator to addition of 0 for use with reduce function.
				values[i + 1] = values[i] * values[i + 1];
				values[i] = 0;
				operation[i] = "+";
			}

			if(operation[i] === "/"){
				//Set left value to 0 and right value to product.  Convert operator to addition of 0 for use with reduce function.
				values[i + 1] = values[i] / values[i + 1];
				values[i] = 0;
				operation[i] = "+";
			}
		}

		result = values.reduce(function(a, b, cIndex) {
			//Process add and subtract into result
			if(operation[cIndex - 1] === "+"){
				return a+b;	
			}

			if(operation[cIndex - 1] === "-"){
				return a-b;	
			}			
		});

		// Handle Errors
		if(isNaN(result)){
			$("#displayTotal").html("Error!");
			input = "";
		}else if(result > 9999999){
			$("#displayTotal").html("Error!");
			input = "";
			
		}else{
			$("#displayTotal").html(result);
			input = result;	
		}
		
		operation = [];
		$("#input").html("");
		isTotal = true;
	});

	$("#AC").click(function() {
		isTotal = false;
		input = "";
		operation = [];
		$("#input").html(input);
		$("#displayTotal").html(0);
	});

	// Clear Entry
	$("#CE").click(function() {
		isTotal = false;
		var re = /[x//+-]/g;
		// indexes of last arithmetic operator for clearing entry
		var trimIndex;
		while(re.test(input) == true){
			trimIndex = re.lastIndex;
		}

		if(trimIndex == null){
			input = "";
			$("#displayTotal").html(0);
		}else{
			input = input.substring(0, trimIndex);
		}
		$("#input").html(input);
	});

});