const calculator = {
  a: null,
  b: null,
  operator: null,
  decimal: false,
  maxLength: 16,
  total: null,
  calcButtons: document.getElementById('buttons'),
  topText: document.getElementById('screen-top'),
  bottomText: document.getElementById('screen-bottom'),
  drawTopScreen: function(btn) {
    if (this.b !== null) {
      calculator.topText.textContent = calculator.a + " " + this.operator + " " + calculator.b + ' =';
    } else {
      calculator.topText.textContent = calculator.a + " " + this.operator;
    }

  },
  drawBottomScreen: (btn) => calculator.bottomText.textContent += btn.textContent,
  clearBottomScreen: () => calculator.bottomText.textContent = '',
  clearTopScreen: () => calculator.topText.textContent = '',
  reset: function() {
    calculator.clearBottomScreen();
    calculator.bottomText.textContent = '0';
    calculator.clearTopScreen();
    calculator.decimal = false;
    calculator.operator = null;
    this.a = null;
    this.b = null;
    this.total = null;
  },
  add: (a, b) => a + b,
	subtract: (a, b) => a - b,
	multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
  percent: function (a, b) {
    if (this.operator === '+') {
      return a * b / 100;
    } else if (this.operator === '-') {
      return a * b / 100;
    } else {
      return a / 100;
    }
  },
	// power: (a, b) => Math.pow(a, b),
	// factorial: factorial = a => (a >= 1) ? a * factorial(a - 1) : 1,
  operate: (a, b, operator) => {
    switch (operator) {
      case '+':
        return calculator.add(a, b);
      case '-':
        return calculator.subtract(a, b);
      case '*':
        return calculator.multiply(a, b);
      case '/':
        return calculator.divide(a, b);
      // case 'x^y':
      //   return calculator.power(a, b);
      // case 'x!':
      //   return calculator.factorial(a);
    }
  },
}




calculator.calcButtons.addEventListener('click', function(e) {
  let btn = e.target;
  let maxLength = calculator.bottomText.textContent.length === calculator.maxLength;
  if (calculator.total !== null) {
    calculator.a = calculator.total;
    calculator.drawTopScreen;
  }
  if(btn.className === 'digit' && calculator.b !== null) {
    calculator.reset();
    calculator.bottomText.textContent = '';
    calculator.drawBottomScreen(btn);
  } else if(btn.className === 'digit' && !maxLength && calculator.bottomText.textContent !== '0') {
    calculator.drawBottomScreen(btn);
  // } else if (btn.className === 'digit' && calculator.total !== null) {
  //   calculator.topText.textContent = calculator.total;
  } else if (btn.className === 'digit' && !maxLength) {
    calculator.bottomText.textContent = '';
    calculator.drawBottomScreen(btn);
  } else if(btn.id === 'clear') {
    calculator.reset();
  } else if (btn.className === 'operator' && calculator.operator !== null) {
    if (calculator.a === null){
      calculator.a = parseFloat(calculator.bottomText.textContent);
      calculator.operator = e.target.textContent;
      calculator.drawTopScreen(btn);
      calculator.clearBottomScreen();
      calculator.decimal = false;
    } else if(calculator.bottomText.textContent === '') {
      calculator.operator = e.target.textContent;
      calculator.topText.textContent = calculator.a + " " + calculator.operator;
    } else {
      calculator.b = parseFloat(calculator.bottomText.textContent);
      calculator.total = calculator.operate(calculator.a, calculator.b, calculator.operator);
      calculator.operator = e.target.textContent;
      calculator.topText.textContent = calculator.total + " " + calculator.operator;
      calculator.clearBottomScreen();
      calculator.decimal = false;
      calculator.b = null;
      calculator.a = calculator.total;
    }
  } else if(btn.className === 'operator' && calculator.a === null) {
    calculator.a = parseFloat(calculator.bottomText.textContent);
    calculator.operator = e.target.textContent;
    calculator.drawTopScreen(btn);
    calculator.clearBottomScreen();
    calculator.decimal = false;
  } else if (btn.className === 'operator') {
    calculator.a = parseFloat(calculator.bottomText.textContent);
    calculator.operator = e.target.textContent;
    calculator.topText.textContent = calculator.a + " " + calculator.operator;
    calculator.clearBottomScreen();
    calculator.decimal = false;
    calculator.b = null;


  } else if (btn.id === '%' && calculator.operator === null) {
    calculator.a = parseFloat(calculator.bottomText.textContent);
    calculator.bottomText.textContent = calculator.percent(calculator.a, calculator.b);
  } else if (btn.id === '%') {
    if (calculator.bottomText.textContent === '') {
      calculator.b = calculator.a
    } else {
      calculator.b = parseFloat(calculator.bottomText.textContent);
    }
    calculator.bottomText.textContent = calculator.percent(calculator.a, calculator.b);
    calculator.b = parseFloat(calculator.bottomText.textContent);
  } else if (btn.id === 'decimal' && calculator.decimal === false && calculator.bottomText.textContent === '') {
    calculator.bottomText.textContent = '0';
    calculator.drawBottomScreen(btn);
    calculator.decimal = true;
  } else if (btn.id === 'decimal' && calculator.decimal === false) {
    calculator.drawBottomScreen(btn);
    calculator.decimal = true;
  } else if (btn.id === '+/-') {
    calculator.bottomText.textContent = parseFloat(calculator.bottomText.textContent) - (2 * parseFloat(calculator.bottomText.textContent));
  } else if (calculator.operator === '/' && calculator.bottomText.textContent === '0' && btn.id === 'equals') {
    calculator.clearTopScreen();
    calculator.bottomText.textContent = 'oops, can\'t do that';

  } else if (btn.id === 'equals' && calculator.operator !== null) {
    if (calculator.b === null && calculator.bottomText.textContent === '') {
      return;
    } else if (calculator.b === null) {
      calculator.b = parseFloat(calculator.bottomText.textContent);
    };
    calculator.drawTopScreen(btn);
    var calculation = calculator.operate(calculator.a, calculator.b, calculator.operator).toString();
      if (calculation.length > calculator.maxLength) {
        calculator.total = parseFloat(calculation).toPrecision(10);
        calculator.bottomText.textContent = calculator.total;
      } else {
        calculator.total = parseFloat(calculation);
        calculator.bottomText.textContent = calculator.total;
      }
    calculator.a = calculator.total;
    calculator.total = null;
  }
});


window.addEventListener('keyup', function(e) {
  const key = document.querySelector(`button[data-key="${e.key}"]`);
  if (key !== null) {
    key.click()
  }
});

window.addEventListener('keyup', function(e) {
  var value = calculator.bottomText.textContent;
  if (calculator.b === null) {
    if (e.key === "Backspace" && value.length > 1) {
      calculator.bottomText.textContent = value.substr(0, value.length - 1);
      console.log(value)
    } else if (e.key === "Backspace") {
      calculator.bottomText.textContent = 0;
    }
  }
});
