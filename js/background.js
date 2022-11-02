class Background {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.image = new Image()
        this.image.src = "./images/background.png"
        this.width = width
        this.height = height
    }
    drawBackground() {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height)
    }
}