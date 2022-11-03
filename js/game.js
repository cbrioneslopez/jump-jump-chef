const Game = {
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    intervalId: undefined,
    background: undefined,
    ingredientsType: ["patata", "tomate", "carne", "lechuga", "cebolla"],
    recipe: [],
    ingredients: [],
    platforms: [],
    imageGameOver: new Image(),
    completedRecipes: 0,
    background: undefined,
    player: undefined,
    enemy: undefined,
    backgroundMusic: undefined,
    knifeHit: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.createRecipe()
        this.start()
        this.backgroundMusic()
        document.getElementById("secondButton").style.display = "none"

    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize, this.platforms)
        this.intervalId = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 200 === 0 && this.enemy === undefined) this.createIngredient()
            if (this.framesCounter % 150 === 0) this.createPlatform()
            if (this.framesCounter % 70 === 0) this.player.cooldown++

            this.clearAll()
            this.drawAll()
            this.checkCollisions()
            this.checkCompletedRecipes()
            this.ingredients.forEach((ingredient) => {
                if (this.ingredients.indexOf(ingredient) !== -1) ingredient.drawIngredient()
                ingredient.moveIngredient()
                this.clearIngredients()

            })
            this.platforms.forEach((eachPlatform) => {
                eachPlatform.drawPlatform()
            })
        }, 1000 / this.FPS)
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        document.querySelector("#canvas").setAttribute("width", this.canvasSize.w)
        document.querySelector("#canvas").setAttribute("height", this.canvasSize.h)
    },
    getContext() {
        this.ctx = document.querySelector("#canvas").getContext('2d')
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.createBackground()
        this.player.updatePlayer()
        this.drawRecipe()
        this.drawLifes()
        if (this.enemy !== undefined) {
            this.enemy.updateEnemy()
            if (this.framesCounter % 100 === 0) this.enemy.shoot()
        }


    },
    createPlatform() {
        let randomHeight = Math.floor(Math.random() * ((this.canvasSize.h - 200) - (this.player.playerSize.h + 200)) + (this.player.playerSize.h + 200))

        this.platforms.push(new Platform(this.ctx, this.canvasSize.w, randomHeight, 200, 50))

    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.background.drawBackground()
    },
    createIngredient() {
        let chosenIndex = Math.floor(Math.random() * this.ingredientsType.length)
        let type = this.ingredientsType[chosenIndex]
        let heightCreation = Math.floor(Math.random() * (this.canvasSize.h - this.player.playerSize.h) - this.player.playerSize.h + this.player.playerSize.h)
        this.ingredients.push(new Ingredient(this.ctx, this.canvasSize.w, heightCreation, type))
    },
    createRecipe() {

        while (this.recipe.length < 3) {
            let chosenIngredient = Math.floor(Math.random() * this.ingredientsType.length)
            if (!this.recipe.includes(this.ingredientsType[chosenIngredient])) {
                this.recipe.push(this.ingredientsType[chosenIngredient])
            }

        }

    },
    drawRecipe() {
        let initialX = 10
        this.recipe.forEach((ingredient) => {
            let newIngredient = new Ingredient(this.ctx, initialX, 0, ingredient)
            newIngredient.drawIngredient()
            initialX += 70
        })
    },
    clearIngredients() {
        this.ingredients = this.ingredients.filter(ingredient => ingredient.posX >= -70)
    },
    drawLifes() {
        let heartImage = new Image()
        heartImage.src = "./images/heart.png"
        this.ctx.drawImage(heartImage, 400, 15, 30, 30)
        this.ctx.font = "32px sans-serif"
        this.ctx.fillStyle = "red"
        this.ctx.fillText("" + this.player.lifes, 440, 40)
    },
    gameOver() {
        this.backgroundMusic.pause()
        let loseAudio = new Audio("./audio/dead.mp3")
        loseAudio.play()
        this.ingredients = []
        this.platforms = []
        this.recipe = []
        this.enemy = undefined
        this.clearAll()
        clearInterval(this.intervalId)
        document.querySelector("#start-screen").src = "./images/gameover.png"
        document.querySelector("#start-screen").style.display = "block"
        document.getElementById("secondButton").style.display = "block"
    },
    winGame() {
        this.backgroundMusic.pause()
        let winAudio = new Audio("./audio/win.mp3")
        winAudio.play()
        this.ingredients = []
        this.platforms = []
        this.recipe = []
        this.completedRecipes = 0
        this.enemy = undefined
        this.clearAll()
        clearInterval(this.intervalId)
        document.querySelector("#start-screen").src = "./images/win.jfif"
        document.querySelector("#start-screen").style.display = "block"
        document.getElementById("secondButton").style.display = "block"
    },
    checkCompletedRecipes() {
        if (this.completedRecipes === 1) {
            this.completedRecipes = 0
            this.enemy = new Enemy(this.ctx, this.canvasSize.w - 220, 450, this.canvasSize, this.player.knives)
        }
    },
    checkCollisions() {
        let knifeHit = new Audio("./audio/cuchillo.wav")
        let pickUpSound = new Audio("./audio/pickup.wav")
        //cuando sale el bigBoss
        if (this.enemy !== undefined) {
            //verificar el ataque de player
            this.player.knives.forEach((knife) => {
                if (this.enemy.posX <= knife.posX + knife.width &&
                    this.enemy.posX + this.enemy.width >= knife.posX &&
                    this.enemy.posY + this.enemy.height >= knife.posY &&
                    this.enemy.posY <= knife.posY + knife.height) {
                    knifeHit.play()
                    this.player.knives.splice(this.player.knives.indexOf(knife), 1)

                    this.enemy.lifes--
                    if (this.enemy.lifes === 0) {
                        this.winGame()
                    }

                }
            })
            //verificar el ataque de enemy
            this.enemy.burguers.forEach((burguer) => {
                if (this.player.playerPosition.x <= burguer.posX + burguer.width &&
                    this.player.playerPosition.x + this.player.playerSize.w >= burguer.posX &&
                    this.player.playerPosition.y + this.player.playerSize.h >= burguer.posY &&
                    this.player.playerPosition.y <= burguer.posY + burguer.height) {
                    this.enemy.burguers.splice(this.enemy.burguers.indexOf(burguer), 1)
                    this.player.lifes--
                    console.log("Me dio una burguer")
                    if (this.player.lifes === 0) this.gameOver()

                }
            })
        }

        //verificar la conlision de player y plataforma
        this.platforms.forEach((platform) => {
            if (this.player.playerPosition.x <= platform.posX + platform.width &&
                this.player.playerPosition.x + this.player.playerSize.w >= platform.posX &&
                this.player.playerPosition.y + this.player.playerSize.h >= platform.posY &&
                this.player.playerPosition.y <= platform.posY + platform.height) {

                if (this.player.speed.y > 0) { //En esta colisión, el jugador está cayendo sobre la plataforma. Se iguala la velocidad a 0 y canJump a true para que pueda saltar
                    this.player.speed.y = 0
                    this.player.playerPosition.x -= 3
                    this.player.canJump = true
                    this.player.playerPosition.y = platform.posY - this.player.playerSize.h
                }
                //caso de subir a la plataforma
                if (this.player.speed.y < 0) {
                    this.player.speed.y = 0
                    this.player.playerPosition.y = platform.posY + platform.height + 5
                }

                if (this.player.playerPosition.x < 0) this.player.playerPosition.x = 0
            }
        })
        //verificar la conlision de player y ingredientes
        this.ingredients.forEach((ingredient) => {
            if (this.player.playerPosition.x <= ingredient.posX + ingredient.width &&
                this.player.playerPosition.x + this.player.playerSize.w >= ingredient.posX &&
                this.player.playerPosition.y + this.player.playerSize.h >= ingredient.posY &&
                this.player.playerPosition.y <= ingredient.posY + ingredient.height) {
                pickUpSound.play()
                pickUpSound.volume = 0.5
                this.ingredients.splice(this.ingredients.indexOf(ingredient.name), 1)
                if (this.recipe.includes(ingredient.name)) {

                    this.recipe.splice(this.recipe.indexOf(ingredient.name), 1)

                } else {
                    this.player.lifes--
                    if (this.player.lifes === 0) {
                        this.gameOver()
                    }
                }

            }
            if (this.recipe.length === 0) {
                this.createRecipe()
                this.completedRecipes++
            }
        })

    },
    backgroundMusic() {
        this.backgroundMusic = new Audio("./audio/fondo.mp3")
        this.backgroundMusic.play()

    }
}
