class Enemy {
    constructor(ctx, posX, posY, canvasSize) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.canvasSize = canvasSize
        this.burguers = []
        this.enemyVel = 5
        this.lifes = 5
        this.width = 200
        this.height = 200
        this.image = new Image()
        this.image.src = "./images/fritas.png"

    }
    updateEnemy() {

        this.drawEnemy()
        this.move()
        this.burguers.forEach((burguer) => burguer.drawBurguer())
        this.clearBurguers()
    }
    drawEnemy() {
        this.drawEnemyLife()
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }
    move() {

        if (this.posY <= 0) {

            this.enemyVel *= -1
        }
        if (this.posY >= this.canvasSize.h - this.height) {

            this.enemyVel *= -1
        }
        this.posY += this.enemyVel
    }
    shoot() {
        this.burguers.push(new Burguer(this.ctx, this.posX, this.posY + (this.height / 2)))
    }
    clearBurguers() {
        this.burguers = this.burguers.filter(burguer => burguer.posX >= 0)
    }
    drawEnemyLife() {
        this.ctx.font = "36px sans-serif"
        this.ctx.fillStyle = "white"
        this.ctx.fillText("♥ " + this.lifes, 1200, 40)
    }
}