export class Ball  {
    constructor (width, height) {
        this.ballRadius = 3
        // Position of the ball
        this.x = width / 2
        this.y = height - 30
        // Speed of the ball 
        this.dx = 3
        this.dy = -3
    }
}
