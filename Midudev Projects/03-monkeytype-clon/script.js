const $time = document.querySelector('time')
const $paragraph = document.querySelector('p')
const $input = document.querySelector('input')

const INITIAL_TIME = 30;

const TEXT = 'the quick brown fox jumps over the lazy dog and jesux28 is trying to clone monkey type for fun and learning using vanilla js for the typing test speed'

let words = []
let currentTime = INITIAL_TIME

initGame()
initEvents()

function initGame () {
    // We separate each word from the text
    words = TEXT.split(' ').slice(0, 32)
    currentTime = INITIAL_TIME

    $time.textContent = currentTime
    // With textContent we shouldn't have custom properties 
    $paragraph.innerHTML = words.map((word, index) => {
        // We separate each letter from every word
        const letters = word.split('')
        //We are creating custom elements: need prefix
        return `<x-word>
            ${letters.map(letter => `<x-letter>${letter}</x-letter>`).join('')}
        </x-word>`
    }).join('')

    // We activate the first word
    const $firstWord = $paragraph.querySelector('x-word')
    $firstWord.classList.add('active')
    $firstWord.querySelector('x-letter').classList.add('active')

    // This is for the timer, we set an interval and each second we will render the time left
    const intervalId = setInterval(() => {
        currentTime--
        $time.textContent = currentTime

        if (currentTime === 0) {
            clearInterval(intervalId)
            console.log('game over')
        }
    }, 1000)
}

function initEvents () {
    document.addEventListener('keydown', () => {
        $input.focus()
    })
    $input.addEventListener('keydown', onKeyDown)
    $input.addEventListener('keyup', onKeyUp)

    function onKeyDown () {

    }

    function onKeyUp () {
        // Recover the actual element
        const $currentWord = $paragraph.querySelector('x-word.active')
        const $currentLetter = $currentWord.querySelector('x-letter.active')

        // We limitate the input length to the length of the active word
        const currentWord = $currentWord.innerText.trim()
        $input.maxLength = currentWord.length

        const $allLetters = $currentWord.querySelectorAll('x-letter')

        $allLetters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

        $input.value.split('').forEach((char, index) => {
            const $letter = $allLetters[index]
            const letterToCheck = currentWord[index]
            // If the letter is correct we will move
            const isCorrect = char === letterToCheck
            const letterClass = isCorrect ? 'correct' : 'incorrect'
            $letter.classList.add(letterClass)
        })

        $currentLetter.classList.remove('active')
        const inputLength = $input.value.length
        const $nextActiveLetter = $allLetters[inputLength]

        if ($nextActiveLetter) {
            $nextActiveLetter.classList.add('active')
        } else {
            $currentLetter.classList.add('active', 'is-last')
        }
    }
}

function gameOver () {

}