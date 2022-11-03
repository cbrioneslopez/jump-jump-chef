class Player {
    constructor(ctx, canvasSize) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.playerSize = { w: 50, h: 70 }
        this.floor = this.canvasSize.h - this.playerSize.h - 100
        this.playerPosition = { x: 30, y: this.floor }
        this.imageInstance = undefined
        this.playerImage = "./images/chef.gif"
        this.lifes = 3
        this.keys = { leftKeyPressed: false, rightKeyPressed: false, spaceKeyPressed: false, fkeyPressed: false }
        this.speed = { x: 15, y: 0 }
        this.knives = []
        this.gravity = 1
        this.cooldown = 0
        this.canShoot = false
        this.canJump = false
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImage
        this.jumpAudio = new Audio("./audio/salto.mp3")
        this.initPlayer()
    }
    initPlayer() {
        this.setEvents()
    }

    updatePlayer() {
        this.ctx.drawImage(this.imageInstance, this.playerPosition.x, this.playerPosition.y, this.playerSize.w, this.playerSize.h)
        if (this.cooldown >= 1) this.canShoot = true
        this.knives.forEach((knife) => knife.drawKnife())
        if (this.keys.leftKeyPressed) this.moveLeft()
        if (this.keys.rightKeyPressed) this.moveRight()
        if (this.keys.spaceKeyPressed) this.playerJump()
        if (this.keys.fkeyPressed) this.shoot()
        this.applyGravity()
        this.clearKnives()
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
                case "KeyF":
                    this.keys.fkeyPressed = true
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
                case "KeyF":
                    this.keys.fkeyPressed = false
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
        this.jumpAudio.play()
        if (this.canJump) {
            this.speed.y -= 23
            this.canJump = false
        }
    }
    shoot() {
        if (this.canShoot) {
            this.knives.push(new Knife(this.ctx, this.playerPosition.x + this.playerSize.w, this.playerPosition.y + (this.playerSize.h / 2)))
            this.canShoot = false
            this.cooldown = 0
        }

    }
    clearKnives() {
        this.knives = this.knives.filter(knife => knife.posX < this.canvasSize.w)
    }
    applyGravity() {
        this.playerPosition.y += this.speed.y  //EN FUNCION DE SI ESTÁ EN EL AIRE O NO. SUMA LA VELOCIDAD (ESTA PUEDE SER 0 SI ESTÁ EN EL SUELO U OTRA SI ESTÁ EN EL AIRE)
        if (this.playerPosition.y + this.playerSize.h + this.speed.y <= this.canvasSize.h - this.playerSize.h) { //EN EL AIRE
            this.speed.y += this.gravity
        } else { //SI ESTOY EN EL SUELO QUITO LA VELOCIDAD EN EL EJE Y PARA QUE NO CAIGA
            this.speed.y = 0
            this.canJump = true
        }
    }

}