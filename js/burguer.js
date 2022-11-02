class Burguer {
    constructor(ctx, positionX, positionY) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./images/burguer.png"
        this.positionX = positionX
        this.positionY = positionY
        this.width = 70
        this.height = 70
    }
    drawBurguer() {
        this.ctx.drawImage(this.image, this.positionX, this.positionY, this.width, this.height)
        this.moveBurguer()
    }
    moveBurguer() {
        this.positionX -= 10
    }
}