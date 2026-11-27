const screen = document.getElementById("screen");
const screenValue = document.getElementById("screen-value");
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

function calculateResult() {
    switch (currentOperation) {
        case currentAction.ADDITION:
            return Number(equationValue) + nextValue;
        case currentAction.SUBTRACTION:
            return Number(equationValue) - nextValue;
        case currentAction.MULTIPLICATION:
            return Number(equationValue) * nextValue;
        case currentAction.DIVISION:
            return Number(equationValue) / nextValue;
    }
}

function fitScreen() {
    screenValue.style.fontSize = "";

    const maxFontSize = parseFloat(getComputedStyle(screenValue).fontSize);
    const minFontSize = 16;
    const screenStyle = getComputedStyle(screen);
    const availableWidth = screen.clientWidth
        - parseFloat(screenStyle.paddingLeft)
        - parseFloat(screenStyle.paddingRight);
    let fontSize = maxFontSize;

    while (screenValue.scrollWidth > availableWidth && fontSize > minFontSize) {
        fontSize = Math.max(minFontSize, fontSize - 1);
        screenValue.style.fontSize = `${fontSize}px`;
    }
}

fitScreen();

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
        case "subtract":
        case "multiply":
        case "divide":
            if (secondPart) {
                equationValue = calculateResult();
                nextValue = 0;
            } else {
                secondPart = true;
            }
            switch (event.target.id) {
                case "add":
                    currentOperation = currentAction.ADDITION;
                    break;
                case "subtract":
                    currentOperation = currentAction.SUBTRACTION;
                    break;
                case "multiply":
                    currentOperation = currentAction.MULTIPLICATION;
                    break;
                case "divide":
                    currentOperation = currentAction.DIVISION;
                    break;
            }
            break;
        case "equals":
            if (secondPart) {
                equationValue = calculateResult();
                currentOperation = null;
                secondPart = false;
                nextValue = 0;
                startFresh = true;

            }
    }


    screenValue.textContent = secondPart ? nextValue : Number(equationValue);
    fitScreen();
});
