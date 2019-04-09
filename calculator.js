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
      if (display.textContent.length > 9) return; /*Restricts display length*/
      let num = e.srcElement.innerText;
      let showNum = document.createTextNode(num)
      display.appendChild(showNum);
    });
  });
}
selectNumbers()

let operators = document.querySelectorAll('.ops');
let secondaryDisplay = document.querySelector('.secondary-display');
operators = Array.from(operators);
let nums = [];
let opSymbols = [];

function selectOperator() {
  operators.forEach((item) => {
    item.addEventListener("click", function(e) {
      let op = e.srcElement.innerText;
      let num = display.textContent;
      let endOfString = secondaryDisplay.textContent.slice(-2);
      if (endOfString == "= ") secondaryDisplay.textContent = "";
      if (num === "") return;
      opSymbols.push(op);
      nums.push(num);
      let sums = document.createTextNode(`${num} ${op} `);
      secondaryDisplay.appendChild(sums);
      clearScreen();
    });
  });
}
selectOperator()

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
  });
}
equals()

function decimalBtn() {
  let decButton = document.querySelector('.decimal');
  decButton.addEventListener('click', (e) => {
    let decimal = e.srcElement.innerText;
    let showDecimal = document.createTextNode(decimal);
    if (display.textContent.match(/[\.-]/)) {
      return;
    } else {
      display.appendChild(showDecimal);
    }
  });
}
decimalBtn();

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
    let trimLastLetter = display.textContent.slice(0, -1);
    display.textContent = trimLastLetter;
  });
}
backspaceBtn();

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

function keyboard() {
  window.addEventListener('keydown', (e) => {
    console.log(e.key);
  });
}
keyboard();
