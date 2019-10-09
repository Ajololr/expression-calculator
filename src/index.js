function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operations = new Map([
        ['*', 3],
        ['/', 3],
        ['+', 2],
        ['-', 2],
        ['(', 1],
        [')', 1]
    ]);
    const actions = {
        '*': (x, y) => +x * +y,
        '/': (x, y) => +x / +y,
        '+': (x, y) => +x + +y,
        '-': (x, y) => +x - +y
    };
    const numbers = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    let operationsStack = [], temp = [];
    let tempNumber = '';
    
    expr.split('').forEach(element => {
        if (numbers.has(element)) {
            tempNumber += element;
        } else {
            if (tempNumber !== '') {
                temp.push(tempNumber);
                tempNumber = '';
            };
            if (element === '(') {
                operationsStack.push(element);
            } else if (element === ')') {
                let value = operationsStack.pop();
                while (value !== '(') {
                    if (operationsStack.length === 0) throw "ExpressionError: Brackets must be paired";
                    temp.push(value);
                    value = operationsStack.pop();
                }
            } else if (element !== ' ') {
                if (operationsStack.length === 0) {
                    operationsStack.push(element);
                } else {
                    while (operations.get(operationsStack[operationsStack.length - 1]) >= operations.get(element)) {
                        temp.push(operationsStack.pop());
                    }
                    operationsStack.push(element);
                }
            }
        }
    });

    if (tempNumber !== '') {
        temp.push(tempNumber);
        tempNumber = '';
    };

    while (operationsStack.length !== 0) {
        temp.push(operationsStack.pop());
    }

    for(let i = 0; i < temp.length ; i++) {
        if (temp[i] in actions) {
            temp.splice(i - 2, 3, actions[temp[i]](temp[i - 2], temp[i - 1]));
            i -= 2;
            if (temp[i] === Infinity) throw "TypeError: Division by zero.";
        }
    };

    if (temp.length !== 1) throw "ExpressionError: Brackets must be paired";

    return temp.pop();
}

module.exports = {
    expressionCalculator
}