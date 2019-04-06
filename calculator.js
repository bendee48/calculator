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
                   "*": multiply(num1, num2),
                   "/": divide(num1, num2)
                  }
  return operators[operator]
}

let numbers = document.querySelectorAll('.number');
let display = document.querySelector('.screen');
let firstNum;
let secondNum;
let currentOperator;

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
function selectOperator() {
  operators.forEach((item) => {
    item.addEventListener("click", function(e) {
      let op = e.srcElement.innerText;
      firstNum = display.textContent;
      currentOperator = op;
      console.log(firstNum);
      console.log(op);
    });
  });
}
selectOperator()
