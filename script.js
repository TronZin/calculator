let previousNumber;
let operation;

const calcDisplay = document.querySelector(".text p");
let numInEdition = "";

const numberButons = document.querySelectorAll(".number");
const signChanger = document.querySelector(".sign");
const decimalButton = document.querySelector(".point");
const undoButton = document.querySelector(".undo");

numberButons.forEach(btn => btn.addEventListener("click", placeNumber));
signChanger.addEventListener("click",changeSign);
decimalButton.addEventListener("click",addFloatingPoint);
undoButton.addEventListener("click", deleteOneDigit)


const operationButtons = document.querySelectorAll(".op");
operationButtons.forEach(btn => btn.addEventListener("click", setOperation));

const equalButton = document.querySelector(".equals");
equalButton.addEventListener("click", computeSolution);

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", clearCalc);

function placeNumber(e) {
    if (numInEdition.length === 23) return
    numInEdition += e.target.innerHTML;
    calcDisplay.textContent = numInEdition;
}

function changeSign(e) {
    if (!numInEdition) return;
    else numInEdition = (+numInEdition * -1).toString();

    calcDisplay.textContent = numInEdition;

}   

function addFloatingPoint(e) {
    if (!numInEdition ||  numInEdition.includes(".")) return;
    else numInEdition += ".";

    calcDisplay.textContent = numInEdition;
}

function deleteOneDigit(e) {
    if (numInEdition[0] === "-" && numInEdition.length == 2) numInEdition = "";
    else numInEdition = numInEdition.slice(0,-1);

    calcDisplay.textContent = numInEdition;
}


function setOperation(e) {
    let newOperator;
    if (e === "equals") newOperator = undefined
    else newOperator = e.target.innerHTML;


    if (!previousNumber) {
        previousNumber = numInEdition ? numInEdition : "0"; 
        numInEdition = "";

        calcDisplay.textContent = previousNumber + ` ${newOperator} `;
    }

    else {
        if (numInEdition) {
            previousNumber = operate(previousNumber,numInEdition,operation);
            if (previousNumber === undefined) return; 

            numInEdition = "";
        }
        calcDisplay.textContent = previousNumber + ` ${newOperator} `;
    }
    operation = newOperator
}


function operate(num1,num2,operation) {
    num1 = +num1;
    num2 = +num2;
    let answer;

    switch (operation) {
        case ("+"):
            answer = num1 + num2;
            break;
        case ("-"):
            answer = num1 - num2;
            break;
        case ("×"):
            answer = num1 * num2
            break;;
        case ("÷"):
            answer = num1 / num2;
            let answerIsUndefined = (answer === NaN || answer === Infinity || answer === -Infinity);
            if (answerIsUndefined) {
                previousNumber = undefined;
                operation = undefined;
                numInEdition = "";
                calcDisplay.textContent = "ERROR";
                return undefined;
            }
            break;
            
    }
    return answer.toString();
}

function computeSolution(e) {
    setOperation("equals");

    numInEdition = previousNumber;
    previousNumber = undefined;

    calcDisplay.textContent = numInEdition;
}

function clearCalc(e) {
    numInEdition = "";

    previousNumber = undefined;
    operation = undefined;

    calcDisplay.textContent = "0";
}