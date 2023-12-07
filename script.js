class Calculator {
    constructor() {
        this.result = 0;
    }

    add(num) {
        this.result += num;
    }

    subtract(num) {
        this.result -= num;
    }

    multiply(num) {
        this.result *= num;
    }

    divide(num) {
        if (num === 0) {
            throw new Error("Cannot divide by zero");
        }
        this.result /= num;
    }

    clear() {
        this.result = 0;
    }

    getResult() {
        return this.result;
    }

    isValidExpression(expression) {
        // Define a regular expression for valid characters
        const validExpressionRegex = /^[0-9+\-*/().\s]+$/;

        // Test the expression against the regular expression
        return validExpressionRegex.test(expression);
    }

    calculate(expression) {
        const str = expression.replace(/\s+/g, '');
        if (!this.isValidExpression(str)) {
            throw new Error("Invalid expression");
        }
        let ans = eval(str);
        if (ans === Infinity) {
            throw new Error("Result is infinity");
        }
        this.result = ans;
        return ans;
    }

    delete() {
        // Implement deletion logic if needed
    }
}

let calc = new Calculator();
let isnew=true;
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operation]');
const bracketButtons = document.querySelectorAll('[data-bracket]');
const equalsButton = document.querySelector('[data-equals]');
const delButton = document.querySelector('[data-del]');
const acButton = document.querySelector('[data-ac]');
const currText = document.querySelector('[data-curr]');

let currentExpression = '';

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(isnew){
            currentExpression=button.textContent;
            isnew=false;
        }
        else
            currentExpression += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(isnew){
            currentExpression=button.textContent;
            isnew=false;
        }
        else
            currentExpression += button.textContent;
        updateDisplay();
    });
});

bracketButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(isnew){
            currentExpression=button.textContent;
            isnew=false
        }
        else
            currentExpression += button.textContent;
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    try {
        calc.calculate(currentExpression);
        console.log(currentExpression)
        currentExpression = '' + calc.getResult();        
        isnew=true;
        updateDisplay();
    } catch (error) {
        console.error(error.message);
        currentExpression = 'Invalid';
        isnew=true;
        updateDisplay();
    }
});

acButton.addEventListener('click', () => {
    currentExpression = '';
    calc.clear();
    updateDisplay();
});

delButton.addEventListener('click', () => {
    currentExpression = currentExpression.slice(0, -1);
    updateDisplay();
});

function updateDisplay() {
    currText.textContent = currentExpression;
}
