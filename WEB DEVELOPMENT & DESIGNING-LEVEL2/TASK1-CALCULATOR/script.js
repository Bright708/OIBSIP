// State Variables
let currentInput = "0";
let previousValue = null;
let activeOperator = null;
let waitingForNextOperand = false;

// DOM Elements
const mainDisplay = document.getElementById("main-display");
const expressionPreview = document.getElementById("expression-preview");
const keypad = document.querySelector(".keypad-grid");

// Event Delegation for Button Clicks
keypad.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  const action = target.dataset.action;
  const value = target.dataset.value;

  switch (action) {
    case "number":
      handleNumber(value);
      break;
    case "decimal":
      handleDecimal();
      break;
    case "operator":
      handleOperator(value);
      break;
    case "equals":
      handleEquals();
      break;
    case "clear":
      handleClear();
      break;
    case "delete":
      handleDelete();
      break;
  }

  updateDisplay();
});

// Keyboard Accessibility Support
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") handleNumber(key);
  else if (key === ".") handleDecimal();
  else if (key === "+") handleOperator("+");
  else if (key === "-") handleOperator("-");
  else if (key === "*") handleOperator("×");
  else if (key === "/") handleOperator("÷");
  else if (key === "Enter" || key === "=") handleEquals();
  else if (key === "Escape") handleClear();
  else if (key === "Backspace") handleDelete();

  updateDisplay();
});

// Business Logic Functions
function handleNumber(numStr) {
  if (waitingForNextOperand) {
    currentInput = numStr;
    waitingForNextOperand = false;
  } else {
    if (currentInput === "0" || currentInput === "Error: Div by 0") {
      currentInput = numStr;
    } else if (currentInput.length < 12) {
      currentInput += numStr;
    }
  }
}

function handleDecimal() {
  if (waitingForNextOperand) {
    currentInput = "0.";
    waitingForNextOperand = false;
    return;
  }

  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function handleOperator(op) {
  const inputValue = parseFloat(currentInput);

  if (isNaN(inputValue)) return;

  if (previousValue === null) {
    previousValue = inputValue;
  } else if (activeOperator && !waitingForNextOperand) {
    const result = performCalculation(
      previousValue,
      inputValue,
      activeOperator,
    );

    if (result === "Error: Div by 0") {
      triggerError();
      return;
    }

    previousValue = result;
    currentInput = String(result);
  }

  activeOperator = op;
  waitingForNextOperand = true;
  updateOperatorHighlights();
}

function handleEquals() {
  if (previousValue === null || activeOperator === null) return;

  const inputValue = parseFloat(currentInput);
  if (isNaN(inputValue)) return;

  const result = performCalculation(previousValue, inputValue, activeOperator);

  if (result === "Error: Div by 0") {
    triggerError();
    return;
  }

  currentInput = String(result);
  previousValue = null;
  activeOperator = null;
  waitingForNextOperand = true;
  updateOperatorHighlights();
}

function performCalculation(first, second, operator) {
  let res = 0;
  switch (operator) {
    case "+":
      res = first + second;
      break;
    case "-":
      res = first - second;
      break;
    case "×":
      res = first * second;
      break;
    case "÷":
      if (second === 0) return "Error: Div by 0";
      res = first / second;
      break;
    default:
      return second;
  }

  // Round floating point issues (e.g., 0.1 + 0.2 = 0.3)
  return Math.round(res * 1e9) / 1e9;
}

function handleClear() {
  currentInput = "0";
  previousValue = null;
  activeOperator = null;
  waitingForNextOperand = false;
  updateOperatorHighlights();
}

function handleDelete() {
  if (waitingForNextOperand || currentInput === "Error: Div by 0") return;

  if (currentInput.length > 1) {
    currentInput = currentInput.slice(0, -1);
  } else {
    currentInput = "0";
  }
}

function triggerError() {
  currentInput = "Error: Div by 0";
  previousValue = null;
  activeOperator = null;
  waitingForNextOperand = true;
  updateOperatorHighlights();
}

function updateOperatorHighlights() {
  const opButtons = document.querySelectorAll(".btn-operator");
  opButtons.forEach((btn) => {
    if (btn.dataset.value === activeOperator && waitingForNextOperand) {
      btn.classList.add("active-op");
    } else {
      btn.classList.remove("active-op");
    }
  });
}

function updateDisplay() {
  mainDisplay.textContent = currentInput;

  // Header/Preview updates
  if (previousValue !== null && activeOperator !== null) {
    expressionPreview.textContent = `${previousValue} ${activeOperator}`;
  } else {
    expressionPreview.textContent = "REG 01 // FLOAT";
  }
}
