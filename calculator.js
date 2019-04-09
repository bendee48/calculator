function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function operate(operator, num1, num2) {
  let operators = {"+": add(num1, num2),
                   "−": subtract(num1, num2),
                   "×": multiply(num1, num2),
                   "÷": divide(num1, num2)
                  }
  return operators[operator]
}

let numbers = document.querySelectorAll('.number');
let display = document.querySelector('.primary-display');

function selectNumbers() {
  numbers = Array.from(numbers);
  numbers.forEach((item) => {
    item.addEventListener("click", function(e){
      let num = e.srcElement.innerText;
      displayNumbers(num);
    });
  });
}
selectNumbers()

function displayNumbers(num) {
  if (display.textContent.length > 9) return; /*Restricts display length*/
  let showNum = document.createTextNode(num)
  display.appendChild(showNum);
}

let operators = document.querySelectorAll('.ops');
let secondaryDisplay = document.querySelector('.secondary-display');
operators = Array.from(operators);
let nums = [];
let opSymbols = [];

function selectOperator() {
  operators.forEach((item) => {
    item.addEventListener("click", function(e) {
      let op = e.srcElement.innerText;
      displayOperator(op);
    });
  });
}
selectOperator()

function displayOperator(op) {
  let num = display.textContent;
  let endOfString = secondaryDisplay.textContent.slice(-2);
  if (endOfString == "= ") secondaryDisplay.textContent = "";
  if (num === "") return;
  opSymbols.push(op);
  nums.push(num);
  let sums = document.createTextNode(`${num} ${op} `);
  secondaryDisplay.appendChild(sums);
  clearScreen();
}

function returnSum() {
  let result = Number(nums[0]);
  let count = 1;
  opSymbols.forEach((item) => {
    result = operate(item, result, Number(nums[count]));
    count++
  });
  if (result % 1 !== 0) result = result.toFixed(1);// Rounds long decimals
  if (result.toString().length > 9) result = result.toExponential(4); //Converts super long numbers
  return result;
}

function equals() {
  let equalsBtn = document.querySelector('.equals');
  equalsBtn.addEventListener('click', () => {
    displayEquals();
  });
}
equals()

function displayEquals() {
  let currentNum = display.textContent;
  let endOfString = secondaryDisplay.textContent.slice(-2);
  if (currentNum === "" || endOfString === "= ") return;
  nums.push(currentNum);
  clearScreen()
  let res = returnSum();
  display.textContent = res;
  let equalsText = document.createTextNode(`${currentNum} = `);
  secondaryDisplay.appendChild(equalsText);
  nums = [];
  opSymbols = [];
}

function decimalBtn() {
  let decButton = document.querySelector('.decimal');
  decButton.addEventListener('click', (e) => {
    let decimal = e.srcElement.innerText;
    displayDecimal(decimal);
  });
}
decimalBtn();

function displayDecimal(decimal) {
  let showDecimal = document.createTextNode(decimal);
  if (display.textContent.match(/[\.-]/)) {
    return;
  } else {
    display.appendChild(showDecimal);
  }
}

function negativeBtn() {
  let button = document.querySelector('.negative');
  let negativeSign = "-";
  button.addEventListener('click', () => {
    let sign = document.createTextNode(negativeSign);
    if (display.textContent.length > 1) return;
    if (display.textContent.match(/[\.-]/)) {
      return
    } else {
      display.appendChild(sign);
    }
  });
}
negativeBtn();

function backspaceBtn() {
  let button = document.querySelector('.backspace');
  button.addEventListener('click', () => {
    trimDisplay();
  });
}
backspaceBtn();

function trimDisplay() {
  let trimLastLetter = display.textContent.slice(0, -1);
  display.textContent = trimLastLetter;
}

function clearButton() {
  let buttons = document.querySelectorAll('.clear');
  let clearButtons = Array.from(buttons);
  clearButtons.forEach((item) => {
    item.addEventListener('click', (e) => {
      if (e.srcElement.innerText == "CE") {
        clearScreen();
      } else {
        clearScreen();
        secondaryDisplay.textContent = "";
      }
    });
  });
}
clearButton();

function clearScreen() {
  display.textContent = "";
}

function keyboardSupport() {
  window.addEventListener('keydown', (e) => {
    let key = e.key;
    console.log(key);
    //numbers
    if (key.match(/\d/g)) {
      let num = e.key;
      displayNumbers(num);
    }
    if (key.match(/[\+\-*/]/g)) {
      let op = key;
      if (key === "/") op = "÷";
      if (key === "*") op = "×";
      displayOperator(op);
    }
    if (key.match(/Enter/g)) displayEquals();
    if (key.match(/Escape/)) {
      clearScreen();
      secondaryDisplay.textContent = "";
    }
    if (key.match(/Backspace/g)) trimDisplay();
    if (key.match(/\./g)) displayDecimal(key);
  });
}
keyboardSupport();
