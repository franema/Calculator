const numbersButtons = document.querySelectorAll(".number")
const operatorsButtons = document.querySelectorAll(".operator")
const clearButton = document.querySelector(".clear")
const equalButton = document.querySelector(".equal")
let number1 = ""
let number2 = ""
let operators = ""
let counter = 0

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
    }
}

function manageInputs(keyInput) {
    const input = this.value || keyInput
    if (operators[0] === undefined) {
        if (/[0-9]/.test(input)) {
            number1 += input
        } else {
            operators = input
            showResults(number1)
        }
    } else if (/[0-9]/.test(input)) {
        number2 += input
    } else {
        operators = input
        // showResults(number1)
    }
    showInput(input)
}

function calculate() {
    let result = 0
    result = operate(operators, Number(number1), Number(number2))
    showResults(result)
    prepareNextCalculus(result)
}

function prepareNextCalculus(result) {
    number1 = result
    number2 = ""
}

function clear() {
    document.querySelectorAll("input").forEach(function (input) {
        input.value = ""
    })
    number1 = ""
    number2 = ""
    operators = []
    counter = 0
}

function showInput(value) {
    document.querySelector(".input-data").value += `${value}`
}

function showResults(result) {
    document.querySelector(".previous-data").value = document.querySelector(".input-data").value
    document.querySelector(".input-data").value = `${result}`
}

function manageKeyInputs(e) {
    if (/^[0-9]|\+|-|\/|\*/.test(e.key)) {
        manageInputs(e.key)
    }
    if (e.key === "Enter") {
        calculate()
    }
}

numbersButtons.forEach(function (button) {
    button.addEventListener("click", manageInputs)
})

operatorsButtons.forEach(function (button) {
    button.addEventListener("click", manageInputs)
})

clearButton.addEventListener("click", clear)
equalButton.addEventListener("click", calculate)
window.addEventListener("keydown", manageKeyInputs)





