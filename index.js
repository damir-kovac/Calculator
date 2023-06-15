const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".ac");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const negative = document.querySelector(".negative");
const dot = document.querySelector(".dot");
const equals = document.querySelector(".equals");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
let currentOperator = "";
let isResult = false;

line2.innerText = "0";

const formatResult = (value) => {
    let result = "";
    if ( Number.isInteger(value) ) {
        result = value.toString();
    } else {
        result = value.toFixed(8).toString();
    }
    if (result.length > 12) {
        return Number.parseFloat(result).toExponential(7);
    } else {
        return Number(result);
    }
}

const handleClear = () => {
    line2.innerHTML = "0";
    isResult = false;
}

const handleAllClear = () => {
    line1.innerHTML = "";
    currentOperator = "";
    handleClear();
}

const handleBackspace = () => {
    if (!isResult && line2.innerHTML != "0") {
        line2.innerHTML = line2.innerHTML.slice(0,-1);
    }
}

const handleNegative = () => {
    line2.innerHTML *= -1;
}

const handleDot = () => {
    if (!line2.innerHTML.includes(".") && !isResult){
        line2.innerHTML +=".";
    }
}

const handleClickOnDigit = (e) => {
    if (line2.innerHTML == "0" || isResult) {
        line2.innerHTML = "";
        isResult = false;
    }
    if (line2.innerHTML.length <12) {
        line2.innerText += e.target.innerText;
    }
}

const handleClickOnOperator = (e) => {
    if (currentOperator == "") {
        currentOperator = e.target.innerHTML;
        line1.innerHTML = line2.innerHTML + " " + currentOperator + " ";
        handleClear();
    } else {
        const number = parseFloat(line1.innerHTML);
        currentOperator = e.target.innerHTML;
        line1.innerHTML = number + " " + currentOperator + " ";
    }
}

const handleEquals = () => {
    if (currentOperator != "") {
        const number1 = parseFloat(line1.innerHTML);
        const number2 = Number(line2.innerHTML);
        let result = 0;

        if (number2>=0){
            line1.innerHTML += `${line2.innerHTML} =`;
        } else {
        line1.innerHTML += `(${line2.innerHTML}) =`;
        }

        switch (currentOperator) {
            case "+":
                result = number1 + number2;
                break;
            case "-":
                result = number1 - number2;
                break;
            case "x":
                result = number1 * number2;
                break;
            case "/":
                if (number2 == 0) {
                    result = "error";
                    alert("Cannnot devide by 0!");
                } else {
                    result = number1 / number2;
                }
                break;
        }
        if (result === "error"){
            handleAllClear();
        } else {
            line2.innerHTML = formatResult(result);
            isResult = true;
            currentOperator = "";
        }
    }
}


allClear.addEventListener("click", handleAllClear);
clear.addEventListener("click", handleClear);
equals.addEventListener("click", handleEquals);
negative.addEventListener("click", handleNegative);
dot.addEventListener("click", handleDot);
backspace.addEventListener("click", handleBackspace);

for (const operator of operators) {
    operator.addEventListener("click", handleClickOnOperator);
}

for (const digit of digits) {
    digit.addEventListener("click", handleClickOnDigit);
}