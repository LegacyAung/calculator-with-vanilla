class Calculator{
  constructor(displaySecondary,displayPrimary) {
    this.displaySecondary = displaySecondary;
    this.displayPrimary = displayPrimary;
    this.allClear()
  }

  allClear() {
    this.currentPrimary = '';
    this.currentSecondary = '';
    this.operation = undefined;
  }

  delete() {
    this.currentPrimary = this.currentPrimary.slice(0, -1);
  }

  appendNumber(number) {
    this.currentPrimary += number;
  }

  appendDot(dot) {
    if(this.currentPrimary.includes('.')) return
    this.currentPrimary += dot;
  }

  appendOperand(operator) {
    if (this.currentPrimary === '') return
    if (this.currentSecondary !== '') {
      this.compute();
    }
    this.operation = operator;
    this.currentPrimary += this.operation;
    this.currentSecondary = this.currentPrimary;
    this.currentPrimary = '';

  }

  compute() {
    let computation;
    const prevSec = parseFloat(this.currentSecondary);
    const currentPri = parseFloat(this.currentPrimary);
    if (isNaN(prevSec) || isNaN(currentPri)) return
    switch (this.operation) {
      case '+':
        computation = prevSec + currentPri;
        break;
      case '-':
        computation = prevSec - currentPri;
        break;
      case '*':
        computation = prevSec * currentPri;
        break;
      case '/':
        computation = prevSec / currentPri;
        break;
      default: return;
    }
    this.currentPrimary = computation.toLocaleString('en-US');
    this.operation = undefined;
    this.currentSecondary = '';
  }

  updateDisplay() {
    this.displayPrimary.innerText = this.currentPrimary;
    this.displaySecondary.innerText = this.currentSecondary;
  }


}



const getId = id => document.getElementById(id);

const displaySecondary = getId('display-secondary'),
      displayPrimary = getId('display-primary'),
      del = getId('delete'),
      aClear = getId('allclear'),
      dot = getId('dot'),
      equal = getId('equal');

const number = document.querySelectorAll('#number');
const operand = document.querySelectorAll('#operand');

const calculator = new Calculator(displaySecondary, displayPrimary);

// number in displayPrimary
number.forEach(element => element.addEventListener('click', () => {
  calculator.appendNumber(element.innerText);
  calculator.updateDisplay();

}))

// operand choice
operand.forEach(element => element.addEventListener('click', () => {
  calculator.appendOperand(element.innerText);
  calculator.updateDisplay();

}))

//dot Button
dot.addEventListener('click', ()=> {
  calculator.appendDot(dot.innerText);
  calculator.updateDisplay();
})

// AllClear Button
aClear.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateDisplay();
})

// delete button
del.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
})


// equal button
equal.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
})
