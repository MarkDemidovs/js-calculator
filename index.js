const screenValue = document.getElementById("screen");
const keypad = document.getElementById("buttons");

let currentValue = 25;
let equationValue = "";

keypad.addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;

    switch (event.target.id) {
        case "clear":
            equationValue = 0;
            break;
        case "one":
            equationValue += "1";
            break;
        case "two":
            equationValue += "2";
            break;
        case "three":
            equationValue += "3";
            break;
        case "four":
            equationValue += "4";
            break;
        case "five":
            equationValue += "5";
            break;
        case "six":
            equationValue += "6";
            break;
        case "seven":
            equationValue += "7";
            break;
        case "eight":
            equationValue += "8";
            break;
        case "nine":
            equationValue += "9";
            break;
        case "zero":
            equationValue += "0";
            break;
        case "delete":
            equationValue = equationValue.slice(0, -1);
            break;
    }


    screenValue.textContent = Number(equationValue);
});