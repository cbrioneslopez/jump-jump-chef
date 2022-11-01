class Platform {
    constructor(ctx, positionX, positionY, width, height) {
        this.ctx = ctx
        this.positionX = positionX
        this.positionY = positionY
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = "./images/platform.png"
    }

    drawPlatform() {
        this.ctx.fillStyle = "blue"
        this.ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height)
        this.movePlatform()
    }
    movePlatform() {
        this.positionX -= 3
    }
}