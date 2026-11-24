const screenValue = document.getElementById("screen");
const currentValue = 0;
const keypad = document.getElementById("buttons");


keypad.addEventListener("click", (event) => {
    if (!event.target.matches("button")) return;
});
screenValue.textContent = currentValue;