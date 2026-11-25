const screenValue = document.getElementById("screen");
const keypad = document.getElementById("buttons");

let nextValue = 0;
let secondPart = false;
let equationValue = 0;
let currentOperation = null;
let startFresh = false;

const currentAction = Object.freeze({
    ADDITION: "addition",
    SUBTRACTION: "subtraction",
    MULTIPLICATION: "multiplication",
    DIVISION: "division",
})

function appendDigit(digit) {
    if (secondPart) {
        nextValue = Number(`${nextValue}${digit}`);
    } else {
        if (startFresh) {
            equationValue = "";
            startFresh = false;
        }
        equationValue += digit;
    }
}

keypad.addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;

    switch (event.target.id) {
        case "clear":
            nextValue = 0;
            equationValue = 0;
            secondPart = false;
            startFresh = false;
            break;
        case "one":
            appendDigit("1");
            break;
        case "two":
            appendDigit("2");
            break;
        case "three":
            appendDigit("3");
            break;
        case "four":
            appendDigit("4");
            break;
        case "five":
            appendDigit("5");
            break;
        case "six":
            appendDigit("6");
            break;
        case "seven":
            appendDigit("7");
            break;
        case "eight":
            appendDigit("8");
            break;
        case "nine":
            appendDigit("9");
            break;
        case "zero":
            appendDigit("0");
            break;
        case "delete":
            if (secondPart) {
                nextValue = Number(String(nextValue).slice(0, -1)) || 0;
            } else {
                equationValue = equationValue.slice(0, -1);
            }
            break;

        case "add":
            if (!secondPart) {
                secondPart = true;
                screenValue.textContent = nextValue;
            } else {
                equationValue = Number(equationValue) + nextValue;
                nextValue = 0;
            }
            currentOperation = currentAction.ADDITION;
            break;
        case "equals":
            if (secondPart) {
                switch(currentOperation) {
                    case currentAction.ADDITION:
                        equationValue = Number(equationValue) + nextValue;
                        break;
                    case currentAction.SUBTRACTION:
                        equationValue = Number(equationValue) - nextValue;
                        break;
                    case currentAction.MULTIPLICATION:
                        equationValue = Number(equationValue) * nextValue;
                        break;
                    case currentAction.DIVISION:
                        equationValue = Number(equationValue) / nextValue;
                        break;
                }
                currentOperation = null;
                secondPart = false;
                nextValue = 0;
                startFresh = true;

            }
    }


    screenValue.textContent = secondPart ? nextValue : Number(equationValue);
});
