const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

function updateDisplay() {
  display.value = expression === "" ? "0" : expression;
}

function toEvalString(str) {
  return str.replace(/×/g, "*").replace(/÷/g, "/").replace(/−/g, "-");
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      expression = "";
      updateDisplay();
      return;
    }

    if (value === "⌫") {
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }

    if (value === "=") {
      if (expression === "") return;
      try {
        const result = Function(`"use strict"; return (${toEvalString(expression)})`)();
        if (typeof result !== "number" || !isFinite(result)) {
          throw new Error("Invalid result");
        }
        expression = String(Math.round(result * 1e10) / 1e10);
      } catch (error) {
        display.value = "Error";
        expression = "";
        return;
      }
      updateDisplay();
      return;
    }

    expression += value;
    updateDisplay();
  });
});
