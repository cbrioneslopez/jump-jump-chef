const Game = {
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    intervalId: undefined,
    background: undefined,
    ingredients: ["patata", "tomate", "carne", "lechuga", "cebolla"],
    recipe: [],
    goodIngredientes: [],
    obstacles: [],
    platforms: [],
    background: undefined,
    player: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.createPlatform()
        this.createRecipe()
        this.start()
    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.intervalId = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 200 === 0) this.createIngredient()
            this.clearAll()
            this.drawAll()
            this.obstacles.forEach((ingredient) => {
                ingredient.drawIngredient()
                ingredient.moveIngredient()
                this.checkCollisionIngredient(ingredient)
                this.clearIngredients()

            })
            console.log(this.recipe.length)
            this.platforms.forEach((eachPlatform) => {
                eachPlatform.drawPlatform()
                this.checkCollisionPlatform(eachPlatform)

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

    },
    createPlatform() {
        this.platforms.push(new Platform(this.ctx, 300, 400, 200, 50))
    },
    checkCollisionPlatform(platform) {
        if (this.player.playerPosition.x <= platform.positionX + platform.width &&
            this.player.playerPosition.x + this.player.playerSize.w >= platform.positionX &&
            this.player.playerPosition.y + this.player.playerSize.h >= platform.positionY &&
            this.player.playerPosition.y <= platform.positionY + platform.height) {

            if (this.player.speed.y > 1) {
                this.player.speed.y = 0
                this.player.playerPosition.y = platform.positionY - this.player.playerSize.h - 0.01

            }
            if (this.player.speed.y < -1) {
                this.player.speed.y = 0
                this.player.poisition.y = platform.positionY + platform.height + 0.01

            }
        }
    },
    checkCollisionIngredient(ingredient) { // PENDIENTE POR SOLUCIONAR QUE NO ELIMINE 2 VECES
        if (this.player.playerPosition.x <= ingredient.posX + ingredient.width &&
            this.player.playerPosition.x + this.player.playerSize.w >= ingredient.posX &&
            this.player.playerPosition.y + this.player.playerSize.h >= ingredient.posY &&
            this.player.playerPosition.y <= ingredient.posY + ingredient.height) {
            if (this.recipe.includes(ingredient.name)) {

                this.recipe.splice(this.recipe.indexOf(ingredient.name), 1)
                this.obstacles.splice(this.obstacles.indexOf(ingredient.name), 1)

            } else {
                this.player.lifes--
                console.log(this.player.lifes)
                let ingredientIndex = this.obstacles.indexOf(ingredient)
                this.obstacles.splice(ingredientIndex, 1)
            }
        }
        if (this.recipe.length === 0) this.createRecipe()
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.background.drawBackground()
    },
    createIngredient() {
        let chosenIndex = Math.floor(Math.random() * this.ingredients.length)
        let type = this.ingredients[chosenIndex]
        let heightCreation = Math.floor(Math.random() * (this.canvasSize.h - this.player.playerSize.h) - this.player.playerSize.h + this.player.playerSize.h)
        this.obstacles.push(new Ingredient(this.ctx, this.canvasSize.w, heightCreation, type))
    },
    createRecipe() {

        while (this.recipe.length < 3) {
            let chosenIngredient = Math.floor(Math.random() * this.ingredients.length)
            if (!this.recipe.includes(this.ingredients[chosenIngredient])) {
                this.recipe.push(this.ingredients[chosenIngredient])
            }

        }

    },
    drawRecipe() {
        let firstIngredient = new Ingredient(this.ctx, 10, 0, this.recipe[0])
        firstIngredient.drawIngredient()
        let secondIngredient = new Ingredient(this.ctx, 80, 0, this.recipe[1])
        secondIngredient.drawIngredient()
        let thirdIngredient = new Ingredient(this.ctx, 150, 0, this.recipe[2])
        thirdIngredient.drawIngredient()

    },
    clearIngredients() {
        this.obstacles = this.obstacles.filter(obstacle => obstacle.posX >= -70)
    },
    drawLifes() {
        let heartImage = new Image()
        heartImage.src = "./images/heart.png"
        this.ctx.drawImage(heartImage, 400, 15, 30, 30)
        this.ctx.font = "32px sans-serif"
        this.ctx.fillStyle = "red"
        this.ctx.fillText("" + this.player.lifes, 440, 40)
    }
}