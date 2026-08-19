const btnContainer = document.querySelector(".buttons");
const screen = document.querySelector("#screen input");
let expression = "";


btnContainer.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;

    if (e.target?.innerText === "C") {
        clearScreen();
        return;
    }
    if (e.target?.innerText === "=") {
        evalulateResult();
        return;
    }

    if (e.target?.classList?.contains("warn")) {
        removeOneCharacter();
        return;
    }



    appendToScreen(e.target.innerText);
})


document.addEventListener("keydown", (e) => {
    const key = e.key;

    if ("0123456789.+-*/".includes(key)) {
        appendToScreen(key);
        return;
    }

    if(e.key == "^") {
        appendToScreen("x2");
        return;
    }

    if (key === "Enter" || key === "=") {
        evalulateResult();
        return;
    }

    if (key === "Backspace") {
        removeOneCharacter();
        return;
    }

    if (key === "Escape" || key === "Delete") {
        clearScreen();
        return;
    }
});

function clearScreen() {
    screen.value = "";
    expression = "";
}

function removeOneCharacter() {
    if (screen.value === "") return;
    screen.value = screen.value.slice(0, screen.value.length - 1);
    expression = screen.value;

}

function appendToScreen(char) {
    if (screen.value == "Error") {
        clearScreen();
    }
    if (expression[expression.length - 1] === "." && char === ".") {
        return;
    }
    if ("-+/*".includes(expression[expression.length - 1]) &&
        ["-", "+", "/", "*", "x2"].includes(char)) {
        removeOneCharacter();
    }
    if (char === "x2") {
        char = "**2";
    }

    screen.value += char;
    if (char === "x") {
        char = "*";
    }
    expression += char;

    console.log(expression)
}

function evalulateResult() {
    if (expression[0] == "*" || "+-*/".includes(expression[expression.length - 1])) {
        screen.value = "Error";
        return;
    }

    try {
        screen.value = eval(expression);
        expression = screen.value;
    } catch (error) {
        screen.value = "Error";
        expression = "";
    }
}