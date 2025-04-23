console.log("hi");

function Solve(show) {
    var s = document.getElementById("screen");
    s.value += show;
}

function Clear() {
    var c = document.getElementById("screen");
    c.value = "";
}

function Del() {
    var d = document.getElementById("screen");
    d.value = d.value.slice(0, -1);
}

function Result() {
    const input = document.getElementById("screen").value;
    try {
        const result = evaluateExpression(input);
        document.getElementById("screen").value = result;
    } catch (error) {
        document.getElementById("screen").value = "Error";
    }
}

function evaluateExpression(expr) {
    const tokens = expr.match(/(\d+\.?\d*|\.\d+|[+\-*/%])/g);
    if (!tokens) throw new Error("Invalid expression");

    let values = [];
    let operators = [];

    const precedence = { '+': 1, '-': 1, '*': 2, '/': 2, '%': 2 };

    function applyOperator(op) {
        const b = values.pop();
        const a = values.pop();
        switch(op) {
            case '+': values.push(a + b); break;
            case '-': values.push(a - b); break;
            case '*': values.push(a * b); break;
            case '/': values.push(a / b); break;
            case '%': values.push(a % b); break;
        }
    }

    tokens.forEach(token => {
        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } else {
            while (
                operators.length &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                applyOperator(operators.pop());
            }
            operators.push(token);
        }
    });

    while (operators.length) {
        applyOperator(operators.pop());
    }

    return values[0];
}


console.log("im here bruh");