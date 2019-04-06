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
                   "-": subtract(num1, num2),
                   "x": multiply(num1, num2),
                   "/": divide(num1, num2)
                  }
  return operators[operator]
}

let numbers = document.querySelectorAll('.number');
let display = document.querySelector('.screen');

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
operators = Array.from(operators);
let nums = [];
let opSymbols = [];

function selectOperator() {
  operators.forEach((item) => {
    item.addEventListener("click", function(e) {
      let op = e.srcElement.innerText;
      let num = display.textContent;
      opSymbols.push(op);
      nums.push(num);
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
    nums.push(currentNum);
    clearScreen()
    let res = returnSum();
    display.textContent = res;
    nums = [];
    opSymbols = [];
  });
}
equals()

function clearScreen() {
  display.textContent = "";
}
