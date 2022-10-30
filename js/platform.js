class Platform {
    constructor(ctx, positionX, positionY, width, height) {
        this.ctx = ctx
        this.positionX = positionX
        this.positionY = positionY
        this.width = width
        this.height = height
    }

    drawPlatform() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.positionX, this.positionY, this.width, this.height)
    }
}