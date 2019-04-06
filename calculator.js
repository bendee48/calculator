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

function clearButton() {
  let clearBtn = document.querySelector('.clear');
  clearBtn.addEventListener('click', () => {
    clearScreen()
    secondaryDisplay.textContent = "";
  });
}
clearButton();

function clearScreen() {
  display.textContent = "";
}
