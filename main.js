const buttons = document.querySelectorAll("button")
const numbersButtons = document.querySelectorAll(".number")
const operatorsButtons = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const equalButton = document.querySelector(".equal")
const eraseButton = document.querySelector(".erase")
let number1 = ""
let number2 = ""
let operators = ""

function add(number1, number2) {
    return number1 + number2
}

function substract(number1, number2) {
    return number1 - number2
}

function divide(number1, number2) {
    return number1 / number2
}

function multiply(number1, number2) {
    return number1 * number2
}

function operate(operator, number1, number2) {
    if (operator === "+") {
        return add(number1, number2)
    } else if (operator === "-") {
        return substract(number1, number2)
    } else if (operator === "/") {
        return divide(number1, number2)
    } else if (operator === "*") {
        return multiply(number1, number2)
    } else {
        return "ERROR"
    }
}

function manageInputs(keyInput) {
    const input = this.value || keyInput
    addClickEffect(input)
    if (operators === "") {
        if (/[0-9]|\./.test(input)) {
            showNumber(input)
        } else {
            number1 = document.querySelector(".input-data").value
            operators = input
            showFirstOperator(transformOperator(input))
        }
    } else if (/[0-9]|\./.test(input)) {
        showNumber(input)
    } else if (number2 === "") {
        if (document.querySelector(".input-data").value !== "") {
            calculate()
        }
        operators = input
        showFirstOperator(transformOperator(input))
    }
}

function calculate() {
    addClickEffect("Enter")
    let result = 0
    number2 = document.querySelector(".input-data").value
    result = operate(operators, Number(number1), Number(number2))
    result = removeDecimals(result)
    if (result !== "ERROR" && !isNaN(result) && result !== undefined) {
        showResults(result)
        prepareNextCalculus(result)
    }
}

function prepareNextCalculus(result) {
    number1 = result.toString()
    number2 = ""
    operators = ""
}

function clear() {
    addClickEffect(this)
    document.querySelectorAll("input").forEach(function (input) {
        input.value = ""
    })
    number1 = ""
    number2 = ""
    operators = ""
}

function showFirstOperator(input) {
    document.querySelector(".input-data").value = ``
    document.querySelector(".previous-data").value = `${number1} ${input} `

}

function showNumber(input) {
    document.querySelector(".input-data").value += `${input}`
}

function showResults(result) {
    document.querySelector(".previous-data").value = `${number1} ${transformOperator(operators)} ${number2}`
    document.querySelector(".input-data").value = `${result}`
}

function manageKeyInputs(e) {
    if (/^[0-9]|\.|\+|-|\/|\*/.test(e.key)) {
        manageInputs(e.key)
    }
    if (e.key === "Enter") {
        calculate()
    }
    if (e.key === "Backspace") {
        erase()
    }
}

function erase() {
    addClickEffect("Backspace")
    document.querySelector(".input-data").value = (document.querySelector(".input-data").value).slice(0, -1)
    const previousData = document.querySelector(".previous-data").value
    if (!/ $/.test(previousData)) {
        document.querySelector(".previous-data").value = (document.querySelector(".previous-data").value).slice(0, -1)
    }

}

function removeDecimals(result) {
    return Math.floor(result * 1000) / 1000
}

function addClickEffect(key) {
    const keyPressed = document.querySelector(`[value="${key}"]`) || key
    keyPressed.classList.add("pressed")
    setTimeout(function () {
        keyPressed.classList.remove("pressed")
    }, 500)
}

function effectMouseOver() {
    const key = this
    key.classList.add("over")
    setTimeout(function () {
        key.classList.remove("over")
    }, 500)
}

function transformOperator(operator) {
    if (operator === "/") {
        return "÷"
    } else if (operator === "*") {
        return "x"
    }
    return operator
}


numbersButtons.forEach(function (button) {
    button.addEventListener("click", manageInputs)
})

operatorsButtons.forEach(function (button) {
    button.addEventListener("click", manageInputs)
})

clearButton.addEventListener("click", clear)
equalButton.addEventListener("click", calculate)
eraseButton.addEventListener("click", erase)
window.addEventListener("keydown", manageKeyInputs)

buttons.forEach(function (button) {
    button.addEventListener("mouseover", effectMouseOver)
})





