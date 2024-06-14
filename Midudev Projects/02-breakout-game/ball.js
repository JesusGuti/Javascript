export class Ball  {
    constructor (canvasWidth, canvasHeight) {
        this.ballRadius = 3
        // Position of the ball
        this.x = canvasWidth / 2
        this.y = canvasHeight - 30
        // Speed of the ball 
        this.dx = 3
        this.dy = -3
    }
}
