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
        this.keys = { leftKeyPressed: false, rightKeyPressed: false, spaceKeyPressed: false, fkeyPressed: false }
        this.speed = { x: 15, y: 0 }
        this.platforms = platforms
        this.gravity = 1
        this.knives = []
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
        if (this.keys.fkeyPressed) this.shoot()
        this.playerPosition.y += this.speed.y  //EN FUNCION DE SI ESTÁ EN EL AIRE O NO. SUMA LA VELOCIDAD (ESTA PUEDE SER 0 SI ESTÁ EN EL SUELO U OTRA SI ESTÁ EN EL AIRE)
        if (this.playerPosition.y + this.playerSize.h + this.speed.y <= this.canvasSize.h - this.playerSize.h) { //EN EL AIRE
            this.speed.y += this.gravity
        } else { //SI ESTOY EN EL SUELO QUITO LA VELOCIDAD EN EL EJE Y PARA QUE NO CAIGA
            this.speed.y = 0
            this.canJump = true
        }
        this.knives.forEach((knife) => knife.drawKnife())

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
        if (this.canJump) {
            this.speed.y -= 20
            this.canJump = false
        }
    }
    checkCollisionPlatform() {//verificar  saltos en plataformas
        this.platforms.forEach((platform) => {
            if (this.playerPosition.x <= platform.positionX + platform.width &&
                this.playerPosition.x + this.playerSize.w >= platform.positionX &&
                this.playerPosition.y + this.playerSize.h >= platform.positionY &&
                this.playerPosition.y <= platform.positionY + platform.height) {

                if (this.speed.y > 0) { //En esta colisión, el jugador está cayendo sobre la plataforma. Se iguala la velocidad a 0 y canJump a true para que pueda saltar
                    this.speed.y = 0
                    this.playerPosition.x -= 3
                    this.canJump = true
                    this.playerPosition.y = platform.positionY - this.playerSize.h
                }
                //caso de subir a la plataforma
                if (this.speed.y < 0) {
                    this.speed.y = 0
                    this.playerPosition.y = platform.positionY + platform.height + 5
                }
                if (this.playerPosition.x < 0) this.playerPosition.x = 0
            }
        })

    }
    shoot() {
        this.knives.push(new Knife(this.ctx, this.playerPosition.x + this.playerSize.w, this.playerPosition.y + (this.playerSize.h / 2)))
    }

}