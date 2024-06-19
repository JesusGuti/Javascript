import { keyboardRows } from './keyboard.js'

const $matrix = document.getElementById('matrix')
const $keyboard = document.getElementById('keyboard')
let $actualRow = null
let $actualSquare = null
let actualRowIndex = 0
let actualSquareIndex = 0;

function drawRows (numberOfRows) {
    for (let row = 0; row < numberOfRows + 1; row++) {
        let $row = document.createElement('div')
        $row.classList.add('row');
        $row.id = `row-${row}`
        $matrix.appendChild($row)

        for (let column = 0; column < numberOfRows; column++) {
            let $square = document.createElement('div')
            $square.classList.add('square')
            $square.id = `square-${row}-${column}`
            $row.appendChild($square)
        }
    }

    $actualRow = document.querySelector('.row');
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
            $key.innerText = key;
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
    const { key } = event
    console.log(event)

    $actualSquare.innerText = key
     
    if (key ) {

    }
    if (key === 'Enter') {
        actualRowIndex++; 
        actualSquareIndex = 0
    }
}

function initEvents () {
    document.addEventListener('keydown', (event) => {
        $actualSquare.focus()
        writeWord(event)
    })
}

drawRows(5);
drawKeyboard();
initEvents()