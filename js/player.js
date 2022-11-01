class Player {
    constructor(ctx, canvasSize, platforms) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 50, h: 70 }
        this.floor = this.canvasSize.h - this.playerSize.h - 100
        this.playerPosition = { x: 30, y: this.canvasSize.h - this.playerSize.h - 100 }
        this.imageInstance = undefined
        this.playerImage = "./images/chef.gif"
        this.lifes = 3
        this.keys = { leftKeyPressed: false, rightKeyPressed: false, spaceKeyPressed: false }
        this.speed = { x: 15, y: 0 }
        this.platforms = platforms
        this.gravity = 1
        this.canJump = false
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImage
        this.initPlayer()
    }
    initPlayer() {
        this.setEvents()
    }

    updatePlayer() {
        this.ctx.drawImage(this.imageInstance, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h)
        this.checkCollisionPlatform()
        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.spaceKeyPressed) this.playerJump()
        this.playerPosition.y += this.speed.y  //EN FUNCION DE SI ESTÁ EN EL AIRE O NO. SUMA LA VELOCIDAD (ESTA PUEDE SER 0 SI ESTÁ EN EL SUELO U OTRA SI ESTÁ EN EL AIRE)
        if (this.playerPosition.y + this.playerSize.h + this.speed.y <= this.canvasSize.h - this.playerSize.h) { //EN EL AIRE
            this.speed.y += this.gravity
        } else { //SI ESTOY EN EL SUELO QUITO LA VELOCIDAD EN EL EJE Y PARA QUE NO CAIGA
            this.speed.y = 0
            this.canJump = true
        }

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
        if (this.canJump) {
            this.speed.y -= 20
            this.canJump = false
        }
    }
    checkCollisionPlatform() {
        this.platforms.forEach((platform) => {
            if (this.playerPosition.x <= platform.positionX + platform.width &&
                this.playerPosition.x + this.playerSize.w >= platform.positionX &&
                this.playerPosition.y + this.playerSize.h >= platform.positionY &&
                this.playerPosition.y <= platform.positionY + platform.height) {

                if (this.speed.y > 1) {
                    this.speed.y = 0
                    this.canJump = true
                    this.playerPosition.y = platform.positionY - this.playerSize.h - 0.10
                }
                if (this.speed.y < -1) {
                    this.speed.y = 0
                    this.position.y = platform.positionY + platform.height
                }
            }
        })

    }

}