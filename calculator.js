//Constants

var e = Math.E;
var pi = Math.PI;

//Main
function Main() {

    var inputTag = document.getElementById("input");
    var input = inputTag.value;
    var result = reversePolishNotation(input);
    var divResult = document.getElementById("result");

    if(!isNaN(result) && result!=undefined) {
        divResult.innerHTML = result;
    }
    else{
        divResult.innerHTML = "Please enter correct equation";
        divResult.style.color = "red";
        inputTag.style.borderColor = "red";
    }


};

//Suhnting yard algorithm
function ShuntingYardAlgorithm(string){
    string = string.replace(/, /g, ",");
    //Separate string by space
    string= string.split(" ");
    console.log(string);

    var queue = [];
    var stack = [];
    var tos;

    //Check for type of each element of the string
    for(var i=0;i<string.length; i++){
        if(isNumber(string[i]) || string[i] =="pi" || string[i]=="e"){
            queue.push(eval(string[i]));
        }
        else if(isSign(string[i])){
            if(stack.length==0) {
                stack.push(string[i]);
                tos = string[i];
            }else{
                if(PrioritySigns(tos)==2) { // Check if the TOS is function
                    queue.push(stack.pop());
                    tos = stack[stack.length-1];

                }
                    if(PrioritySigns(string[i]) >= PrioritySigns(tos)){ //Check for the priority of signs
                        stack.push(string[i]);
                        tos = string[i];
                    }
                    else{
                        while(stack.length!=0){
                            queue.push(stack.pop());
                        }

                        stack.push(string[i]);
                        tos = string[i];
                    }

            }
        }
        else if(isFunction(string[i])[0]){

            var func =isFunction(string[i])[1];
            stack.push(func[0]);
            tos = func[0];


            for (var j = 1; j < func.length; j++) {

                if(isFunction(func[j]) || isSign(func[j])){
                       stack.push(func[j]);
                }
                else{
                    queue.push(eval(func[j]));
                }
            }

        }
    }

    while(stack.length!=0){
        queue.push(stack.pop());
    }

    return queue;
}

function reversePolishNotation(input){

    var queue = ShuntingYardAlgorithm(input);
    var stack = [];

    while(queue.length!=0){
        var current = queue.shift();
        if(isNumber(current)){
            stack.push(current);
        }
         else{
            var result,num,num1,num2 ;

            switch(current){ // Tells what to do when see some of these signs in the stack
                case '+':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = Add(num1,num2);
                    break;
                case '-':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = Substract(num1,num2);
                    break;
                case '*':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = Multiply(num1,num2);
                    break;
                case '/':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = Divide(num1,num2);
                    break;
                case 'sin':
                    num = stack.pop();
                    result = sin(num);
                    break;
                case 'cos':
                    num = stack.pop();
                    result = cos(num);
                    break;
                case 'tg':
                    num = stack.pop();
                    result = tg(num);
                    break;
                case 'cotg':
                    num = stack.pop();
                    result = cotg(num);
                    break;
                case 'pow':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = pow(num1,num2);
                    break;
                case 'log':
                    num2 = stack.pop();
                    num1 = stack.pop();
                    result = log(num1,num2);
                    break;
                case 'exp':
                    num = stack.pop();
                    result = exp(num);
                    break;
                case 'sqrt':
                    num = stack.pop();
                    result = sqrt(num);
                    break;
            }
            stack.push(result);
        }
    }

    return stack.pop();
}

//functions
function Add(num1, num2){
    return num1+num2;
}
function Substract(num1,num2){
    return num1-num2;
}
function Multiply(num1,num2){
    return num1*num2;
}
function Divide(num1,num2){
    return num1/num2;
}


function log(base,arg){
    return Math.log(arg);
}
function sin(arg){
    return Math.sin(arg);
}
function cos(arg){
    return Math.cos(arg);
}
function tg(arg){
    return Math.tan(arg);
}
function cotg(arg){
    return 1/tg(arg);
}
function exp(arg){
    return Math.exp(arg);
}
function sqrt(number,root){
    root = root || 2;
    return pow(number,(1/root));
}
function pow(arg1,arg2){
    return Math.pow(arg1,arg2);
}


function isNumber(num){
    return !isNaN(num);
}

function isSign(input){

    switch(input){
        case "+": return true ;break;
        case "-": return true ;break;
        case "*": return true ;break;
        case "/": return true ;break;
        default:  return false; break;
    }
}

function PrioritySigns(sign){
    var priority;
    switch(sign){
        case "+":priority =0;break;
        case "-":priority =0;break;
        case "*":priority =1;break;
        case "/":priority =1;break;
        case "sin":priority =2;break;
        case "cos":priority =2;break;
        case "tg":priority =2;break;
        case "cotg":priority =2;break;
        case "sqrt":priority =2;break;
        case "pow":priority =2;break;
        case "exp":priority =2;break;
        case "log":priority =2;break;

    }
    return priority;
}
function isFunction(expression){

    var functionsArray = ["sin", "cos", "tg","cotg","pow","exp","sqrt","log"];

    expression = expression.split(/[()]|,/g);

    console.log(expression);

    for (var i = 0; i <expression.length; i++) {
        if(expression[i]==""){
            expression.splice(i,1);
            i--;
        }
    }
   for(var i=0; i<functionsArray.length;i++){

        if(expression[0] ==functionsArray[i]){
            return [true,expression];
        }
    }

    return false;
}
