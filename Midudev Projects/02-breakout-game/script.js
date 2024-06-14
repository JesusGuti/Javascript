import { Ball } from "./ball.js"
import { Paddle } from "./paddle.js"

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
let ball = new Ball(canvas.width, canvas.height)

/* Variables of the paddle */
let paddle = new Paddle(canvas.width, canvas.height)

// Flags to know if the keys are pressed or not
let rightPressed = false
let leftPressed = false

/* VARIABLES OF THE BRICKS */
const brickRowCount = 6
const brickColumnCount = 13
const brickWidth = 32
const brickHeight = 16
const brickPadding = 0
const brickOffSetTop = 80
const brickOffSetLeft = 16
const bricks = []

const BRICK_STATUS = {
    ACTIVE: 1,
    DESTROYED: 0
}

for (let column = 0; column < brickColumnCount; column++) {
    bricks[column] = []
    for (let row = 0; row < brickRowCount; row++) {
        // Calculate the position of the brick in the screen
        const brickX = column * (brickWidth + brickPadding) + brickOffSetLeft
        const brickY = row * (brickHeight + brickPadding) + brickOffSetTop
        // Assign a random color to each brick
        const random = Math.floor(Math.random() * 8) 
        // Save the information of the brick
        bricks[column][row] = {
            x: brickX, 
            y: brickY, 
            status: BRICK_STATUS.ACTIVE, 
            color: random 
        } 
    }
}

function drawBall () {
    // We will start drawing 
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.ballRadius, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle () {
     // Clip: Is the area we want to draw the image
    const clipX = 29
    const clipY = 174
    const cutWidth = paddle.paddleWidth
    const cutHeight = paddle.paddleHeight
    const drawWidth = paddle.paddleWidth 
    const drawHeight = paddle.paddleHeight

    ctx.drawImage(
        $sprite,
        clipX,
        clipY,
        cutWidth, // Size of the cut image
        cutHeight,
        paddle.paddleX, // Position of the cut image
        paddle.paddleY,
        drawWidth, // Size of the draw
        drawHeight
    )
}

function drawBricks () {
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
            const currentBrick = bricks[column][row]
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue

            const clipX = currentBrick.color * 32
            ctx.drawImage(
                $bricks,
                clipX,
                0,
                32, 
                14,
                currentBrick.x,
                currentBrick.y,
                brickWidth,
                brickHeight
            )
        }
    }
}

function collisionDetection (){
    for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) { 
            const currentBrick = bricks[column][row]
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue

            const isBallSameXAsBrick = 
                ball.x > currentBrick.x &&
                ball.x < currentBrick.x + brickWidth
            const isBallSameYAsBrick = 
                ball.y > currentBrick.y &&
                ball.y < currentBrick.y + brickHeight        
            
            if (isBallSameXAsBrick && isBallSameYAsBrick) {
                ball.dy = -ball.dy
                currentBrick.status = BRICK_STATUS.DESTROYED
            }
        }    
    }
}
    
function ballMovement () {
    // Bounce the ball in the lateral sides
    if (
        ball.x + ball.dx > canvas.width - ball.ballRadius ||
        ball.x + ball.dx < ball.ballRadius
    ) {
        ball.dx = -ball.dx
    }

    // Bounce the ball in top
    if (ball.y + ball.dy < ball.ballRadius) {
        ball.dy = -ball.dy
    }

    // The ball touches the paddle
    const isBallSameXAsPaddle = 
        ball.x > paddle.paddleX &&
        ball.x < paddle.paddleX + paddle.paddleWidth

    const isBallTouchingPaddle = 
        ball.y + ball.dy > paddle.paddleY

    if (isBallSameXAsPaddle && isBallTouchingPaddle) {
        ball.dy = -ball.dy
    } else if (ball.y + ball.dy > canvas.height - ball.ballRadius) {
        console.log('Game Over')
        document.location.reload()
    }

    ball.x += ball.dx
    ball.y += ball.dy
}

function paddleMovement () {
    if (rightPressed && paddle.paddleX < canvas.width - paddle.paddleWidth) {
        paddle.paddleX += paddle.PADDLE_SENSITIVITY
    } else if (leftPressed && paddle.paddleX > 0){
        paddle.paddleX -= paddle.PADDLE_SENSITIVITY
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