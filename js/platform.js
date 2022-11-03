class Platform {
    constructor(ctx, posX, posY, width, height) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = width
        this.height = height
        this.image = new Image()
        this.image.src = "./images/platform.png"
    }

    drawPlatform() {
        this.ctx.fillStyle = "blue"
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.movePlatform()
    }
    movePlatform() {
        this.posX -= 3
    }
}