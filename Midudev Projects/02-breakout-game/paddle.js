export class Paddle {
    constructor (canvasWidth, canvasHeight) {
        this.paddleHeight = 10
        this.paddleWidth = 50
        // Position of the paddle
        this.paddleX = (canvasWidth - this.paddleWidth) / 2
        this.paddleY = canvasHeight - this.paddleHeight - 10
        this.PADDLE_SENSITIVITY = 8
    }
}
