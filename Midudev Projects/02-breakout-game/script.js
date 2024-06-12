const canvas = document.querySelector('canvas')
// Give canvas the context how we will draw
const ctx = canvas.getContext('2d')

const $sprite = document.querySelector('#sprite')
const $bricks = document.querySelector('#bricks')


canvas.width = 448
canvas.height = 400

/* VARIABLES OF THE GAME */
let counter = 0

/* VARIABLES OF THE BALL */
const ballRadius = 3
// Position of the ball
let x = canvas.width / 2
let y = canvas.height - 30
// Speed of the ball 
let dx = 3
let dy = -3

/* Variables of the paddle */
const paddleHeight = 10
const paddleWidth = 50
// Position of the paddle
let paddleX = (canvas.width - paddleWidth) / 2
let paddleY = canvas.height - paddleHeight - 10
const PADDLE_SENSITIVITY = 8

// Flags to know if the keys are pressed or not
let rightPressed = false
let leftPressed = false

function drawBall () {
    // We will start drawing 
    ctx.beginPath()
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle () {
     // Clip: Is the area we want to draw the image
    const clipX = 29
    const clipY = 174
    const cutWidth = paddleWidth
    const cutHeight = paddleHeight
    const drawWidth = paddleWidth 
    const drawHeight = paddleHeight

    ctx.drawImage(
        $sprite,
        clipX,
        clipY,
        cutWidth, // Size of the cut image
        cutHeight,
        paddleX, // Position of the cut image
        paddleY,
        drawWidth, // Size of the draw
        drawHeight
    )
}

function drawBricks () {

}

function collisionDetection (){

}
    
function ballMovement () {
    // Bounce the ball in the lateral sides
    if (
        x + dx > canvas.width - ballRadius ||
        x + dx < ballRadius
    ) {
        dx = -dx
    }

    // Bounce the ball in top
    if (y + dy < ballRadius) {
        dy = -dy
    }

    // The ball touches the paddle
    const isBallSameXAsPaddle = 
        x > paddleX &&
        x < paddleX + paddleWidth

    const isBallTouchingPaddle = 
        y + dy > paddleY

    if (isBallSameXAsPaddle && isBallTouchingPaddle) {
        dy = -dy
    } else if (y + dy > canvas.height - ballRadius) {
        console.log('Game Over')
        document.location.reload()
    }

    x += dx
    y += dy
}

function paddleMovement () {
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += PADDLE_SENSITIVITY
    } else if (leftPressed && paddleX > 0){
        paddleX -= PADDLE_SENSITIVITY
    }
}

function cleanCanvas () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initEvents () {
    document.addEventListener('keydown', keyDownHandler)
    document.addEventListener('keyup', keyUpHandler)

    function keyDownHandler (event) {
        const { key } = event
        if (key === 'Right' || key === 'ArrowRight') {
            rightPressed = true
        }  else if (key === 'Left' || key === 'ArrowLeft') {
            leftPressed = true
        }
    }

    function keyUpHandler (event) {
        const { key } = event
        if (key === 'Right' || key === 'ArrowRight') {
            rightPressed = false
        }  else if (key === 'Left' || key === 'ArrowLeft') {
            leftPressed = false
        }
    }
}

/* This function will be called al the time */
function draw () {
    // Redraw 
    cleanCanvas()
    //Draw the elements
    drawBall()
    drawPaddle()
    drawBricks()

    // Collisions
    collisionDetection()
    ballMovement()
    paddleMovement()
    
    // Se ejecuta justo antes de que se repinte la ventana
    // Cuando termina programa el siguiente
    window.requestAnimationFrame(draw) // 60fps
}

draw()
initEvents()