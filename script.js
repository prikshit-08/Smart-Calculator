function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}

function evaluate1(str) {
  function splitStringArithmetic(str) {
    var index = 0;
    var splitArray = str.split("").reduce((arr, v, i) => {
      if (isNaN(parseInt(v))) {
        arr.push(str.slice(index, i));
        arr.push(v);
        index = i + 1;
      }
      return arr;
    }, []);
    splitArray.push(str.slice(index));
    return splitArray;
  }

  function findMultIndex(arr) {
    return arr.findIndex(i => i == "*");
  }

  function findPowIndex(arr) {
    return arr.findIndex(i => i == "^");
  }

  function findDivIndex(arr) {
    return arr.findIndex(i => i == "/");
  }

  function findAddIndex(arr) {
    return arr.findIndex(i => i == "+");
  }

  function findSubIndex(arr) {
    return arr.findIndex(i => i == "-");
  }

  function findModIndex(arr) {
    return arr.findIndex(i => i == "%");
  }

  function power(arr) {
    var index = findPowIndex(arr);
    var base = parseInt(arr[index - 1]);
    var power = parseInt(arr[index + 1]);
    var res = 1;
    for (var i = 0; i < power; i++) {
    	res = res*base;
    }
    arr[index] = res;
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function multiply(arr) {
    var index = findMultIndex(arr);
    arr[index] = parseInt(arr[index - 1]) * parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function mod(arr) {
    var index = findModIndex(arr);
    arr[index] = parseInt(arr[index - 1]) % parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function divide(arr) {
    var index = findDivIndex(arr);
    arr[index] = parseInt(arr[index - 1]) / parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function add(arr) {
    var index = findAddIndex(arr);
    arr[index] = parseInt(arr[index - 1]) + parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function subtract(arr) {
    var index = findSubIndex(arr);
    arr[index] = parseInt(arr[index - 1]) - parseInt(arr[index + 1]);
    return arr.filter((c, i) => {
      return i !== index - 1 && i !== index + 1;
    });
  }

  function containsMultOrDiv(arr) {
    return arr.some(i => i === "*" || i === "/");
  }

  function containsMod(arr) {
    return arr.some(i => i === "%");
  }

  function containsPow(arr) {
    return arr.some(i => i === "^");
  }

  function containsAddOrSub(arr) {
    return arr.some(i => i === "+" || i === "-");
  }

  function simplify(arr) {

  	while (containsMod(arr)) {
      if (arr.includes("%")) {
            arr = mod(arr);
          }
    }

    while (containsPow(arr)) {
      if (arr.includes("^")) {
            arr = power(arr);
          }
    }

    while (containsMultOrDiv(arr)) {
      if (arr.includes("*")) {
        if (arr.includes("/")) {
          if (findDivIndex(arr) < findMultIndex(arr)) {
            arr = divide(arr);
          } else {
            arr = multiply(arr);
          }
        } else {
          arr = multiply(arr);
        }
      } else {
        arr = divide(arr);
      }
    }
    while (containsAddOrSub(arr)) {
      if (arr.includes("+")) {
        if (arr.includes("-")) {
          if (findSubIndex(arr) < findAddIndex(arr)) {
            arr = subtract(arr);
          } else {
            arr = add(arr);
          }
        } else {
          arr = add(arr);
        }
      } else {
        arr = subtract(arr);
      }
    }
    return arr;
  }

  var arithmeticArray = splitStringArithmetic(str);

  return simplify(arithmeticArray);
}



function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					if(history.indexOf('.') !== -1){
						var result1=eval(history);
						printOutput(result1);
						printHistory("");
					}
					else{
						var result=evaluate1(history);
						printOutput(result);
						printHistory("");
					}
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}
var microphone = document.getElementById('microphone');
microphone.onclick=function(){
	microphone.classList.add("record");
	var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
	recognition.lang = 'en-IN ';
	recognition.start();
	operations = {"plus":"+",
				 "minus":"-",
				 "multiply":"*",
				 "multiplied":"*",
				 "divide":"/",
				 "divided":"/",
				 "modulus":"%",
				 "to the power":"^"}
	
	recognition.onresult = function(event){
		var input = event.results[0][0].transcript;
		for(property in operations){
			input= input.replace(property, operations[property]);
		}
		input  = input.replace(/\s/g, ""); 
		document.getElementById("output-value").innerText = input;
		setTimeout(function(){
			evaluate(input);
		},2000);
		microphone.classList.remove("record");
		console.log(input);
	}
}
function evaluate(input){
	try{
		if(input.indexOf('.') !== -1){
			var result1=eval(input);
			document.getElementById("output-value").innerText = result1;
		}
		else{
			var result = evaluate1(input);
		    document.getElementById("output-value").innerText = result;
		}
	}
	catch(e){
		console.log(e);
		var log = "Speak Again"
		document.getElementById("output-value").innerText = log;
	}
}