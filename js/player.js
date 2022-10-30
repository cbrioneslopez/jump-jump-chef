class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 50, h: 70 }
        this.playerPosition = { x: 10, y: this.canvasSize.h - this.playerSize.h }
        this.imageInstance = undefined
        this.playerImage = "./images/chef.gif"
        this.lifes = 3
        this.keys = { leftKeyPressed: false, rightKeyPressed: false, spaceKeyPressed: false }
        this.speed = { x: 10, y: 0 }
        this.gravity = 6
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImage
        this.initPlayer()
    }
    initPlayer() {
        this.setEvents()
    }

    updatePlayer() {
        this.ctx.drawImage(this.imageInstance, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h)
        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()

        if (this.playerPosition.y < this.canvasSize.h - this.playerSize.h) this.playerPosition.y += this.gravity // ESTO CONFIGURA LA GRAVEDAD. SI EL JUGADOR NO ESTÁ EN EL SUELO CAE
        if (this.keys.spaceKeyPressed) this.playerJump()
    }
    setEvents() {
        document.addEventListener("keydown", ({ code }) => {
            switch (code) {
                case "ArrowLeft":
                    this.keys.leftKeyPressed = true
                    break
                case "ArrowRight":
                    this.keys.rightKeyPressed = true
                    break
                case "Space":
                    this.keys.spaceKeyPressed = true
                    break
            }
        })
        document.addEventListener("keyup", ({ code }) => {
            switch (code) {
                case "ArrowLeft":
                    this.keys.leftKeyPressed = false
                    break
                case "ArrowRight":
                    this.keys.rightKeyPressed = false
                    break
                case "Space":
                    this.keys.spaceKeyPressed = false
                    break
            }
        })
    }
    moveLeft() {
        if (this.playerPosition.x > 0) this.playerPosition.x -= this.speed.x
    }
    moveRight() {
        if (this.playerPosition.x < this.canvasSize.w - this.playerSize.w) this.playerPosition.x += this.speed.x
    }
    playerJump() {
        this.playerPosition.y -= 20
    }

}