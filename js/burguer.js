class Burguer {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./images/burguer.png"
        this.posX = posX
        this.posY = posY
        this.width = 60
        this.height = 60
    }
    drawBurguer() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.moveBurguer()
    }
    moveBurguer() {
        this.posX -= 10
    }

}