class Knife {
    constructor(ctx, positionX, positionY) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./images/knife.png"
        this.positionX = positionX
        this.positionY = positionY
        this.width = 50
        this.height = 30
    }
    drawKnife() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height)
        this.moveKnife()
    }
    moveKnife() {
        this.positionX += 10
    }
}