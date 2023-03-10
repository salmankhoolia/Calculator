class calculator {
    constructor(previousOperandAndTextElement, CurrentOperandAndTextElement) {
        this.previousOperandAndTextElement = previousOperandAndTextElement
        this.CurrentOperandAndTextElement = CurrentOperandAndTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '' ) {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '/':
                computation = prev / current
                break
            case '*':
                computation = prev * current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0})
        } if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.CurrentOperandAndTextElement.innerText =
         this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandAndTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandAndTextElement.innerText = ''
        }
        // this.previousOperandAndTextElement.innerText = this.previousOperand
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const clearButton = document.querySelector('[data-clear]')
const previousOperandAndTextElement = document.querySelector('[data-previous]')
const CurrentOperandAndTextElement = document.querySelector('[data-current]')


const Calculator = new calculator(previousOperandAndTextElement, CurrentOperandAndTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.appendNumber(button.innerText)
        Calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.chooseOperation(button.innerText)
        Calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    Calculator.compute()
    Calculator.updateDisplay()
})

clearButton.addEventListener('click', button => {
    Calculator.clear()
    Calculator.updateDisplay()
})


deleteButton.addEventListener('click', button => {
    Calculator.delete()
    Calculator.updateDisplay()
})
