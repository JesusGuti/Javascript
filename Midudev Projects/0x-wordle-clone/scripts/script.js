import { keyboardRows } from './keyboard.js'

const $matrix = document.getElementById('matrix')
const $keyboard = document.getElementById('keyboard')
let $actualRow = null
let $actualSquare = null
let actualRowIndex = 0
let actualSquareIndex = 0
let word = ""
let selectedWord = "fruit"

function drawRows (numberOfRows) {
    for (let row = 0; row < numberOfRows + 1; row++) {
        let $row = document.createElement('div')
        $row.classList.add('row')
        $row.id = `row-${row}`
        $matrix.appendChild($row)

        for (let column = 0; column < numberOfRows; column++) {
            let $square = document.createElement('div')
            $square.classList.add('square')
            $square.id = `square-${row}-${column}`
            $row.appendChild($square)
        }
    }

    $actualRow = document.querySelector('.row')
    $actualSquare = document.querySelector('.square')
}

function drawKeyboard () {
    keyboardRows.forEach((row) => {
        let $keyboardRow = document.createElement('div')
        $keyboardRow.classList.add('keyboard-row')
        $keyboard.appendChild($keyboardRow)

        row.forEach((key) => {
            let $key = document.createElement('div')
            $key.classList.add('key')
            $key.innerText = key
            drawSpecialKey($key)
            $keyboardRow.appendChild($key)
        })
    })
}

function drawSpecialKey ($key) {
    if ($key.innerText !== 'ENTER' && $key.innerText !== 'DEL') return 
    
    $key.classList.add('special')
    if ($key.innerText === 'DEL') {
        $key.classList.add('delete')
    }
}

function writeWord (event) {
    const { key, keyCode } = event
  
    if (word.length < selectedWord.length) {
        if (keyCode >= 65 && keyCode <= 90) {
            $actualSquare.innerText = key.toUpperCase()
            word = word + key
            goNext()
        }
    }

    if (key === 'Backspace') {
        goBack()
        $actualSquare.innerText = ''
        word = word.slice(0,actualSquareIndex)
    }

    if (key === 'Enter') {
        if (word.length === selectedWord.length) {
            checkWord()        
        } else {
            alert('Faltan letras')
        }
    }
    console.log(word)
}

function checkWord () {
    const selectedWordToArray = selectedWord.split('')
    const wordToArray = word.split('')

    // We should verify if the letters we put exists 
    wordToArray.forEach((letter, index) => {
        let doesLetterExists = selectedWordToArray.includes(letter)
        let squareToVerify = document.getElementById(`square-${actualRowIndex}-${index}`)

        if (doesLetterExists) {
            let indexOfLetter = selectedWordToArray.indexOf(letter)
            if (index === indexOfLetter) {
                squareToVerify.classList.add('correct')
            } else {
                squareToVerify.classList.add('incorrect')
            }
        } else {
            squareToVerify.classList.add('lack')
        }
    })

    if (word === selectedWord) {
        alert('Felicidades')
    } else {
        word = ''
        actualRowIndex++
        actualSquareIndex = 0
        setSquare()
    }
}

function goNext () {
    if (actualSquareIndex < selectedWord.length) {
        actualSquareIndex++
        setSquare()
    }
}

function goBack () {
    if (actualSquareIndex > 0) {
        actualSquareIndex--
        setSquare()
    }
}

function setSquare () {
    const wordLength = selectedWord.length
    if (actualRowIndex < wordLength + 1 && actualSquareIndex < wordLength ) {
        $actualSquare = document.getElementById(`square-${actualRowIndex}-${actualSquareIndex}`)
        $actualSquare.focus()
    } else {
        // To do: Game over
    }
}

function initEvents () {
    document.addEventListener('keydown', (event) => {
        $actualSquare.focus()
        writeWord(event)
    })

    const keys = document.querySelectorAll('.key')
    keys.forEach((key) => {
        key.addEventListener('click', (event) => {
            // console.log(event)
        })
    })
}

drawRows(5)
drawKeyboard()
initEvents()