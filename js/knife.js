class Knife {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./images/knife.png"
        this.posX = posX
        this.posY = posY
        this.width = 50
        this.height = 30
    }
    drawKnife() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.moveKnife()
    }
    moveKnife() {
        this.posX += 10
    }
}