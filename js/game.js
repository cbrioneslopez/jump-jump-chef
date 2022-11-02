const Game = {
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    intervalId: undefined,
    background: undefined,
    ingredients: ["patata", "tomate", "carne", "lechuga", "cebolla"],
    recipe: [],
    obstacles: [],
    platforms: [],
    imageGameOver: new Image(),
    completedRecipes: 0,
    background: undefined,
    player: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.createRecipe()
        this.start()
        document.getElementById("secondButton").style.display = "none"
        this.imageGameOver.src = "./images/gameover.png"
    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize, this.platforms)
        this.intervalId = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 200 === 0) this.createIngredient()
            if (this.framesCounter % 150 === 0) this.createPlatform()
            if (this.framesCounter % 70 === 0) this.player.cooldown++
            this.clearAll()
            this.drawAll()
            this.checkWonGame()
            if (this.player.lifes === 0) this.gameOver()
            this.obstacles.forEach((ingredient) => {
                ingredient.drawIngredient()
                ingredient.moveIngredient()
                this.checkCollisionIngredient(ingredient)
                this.clearIngredients()

            })
            console.log(this.recipe.length)
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

    },
    createPlatform() {
        let randomHeight = Math.floor(Math.random() * ((this.canvasSize.h - 200) - (this.player.playerSize.h + 200)) + (this.player.playerSize.h + 200))

        this.platforms.push(new Platform(this.ctx, this.canvasSize.w, randomHeight, 200, 50))

    },

    checkCollisionIngredient(ingredient) { // PENDIENTE POR SOLUCIONAR QUE NO ELIMINE 2 VECES
        if (this.player.playerPosition.x <= ingredient.posX + ingredient.width &&
            this.player.playerPosition.x + this.player.playerSize.w >= ingredient.posX &&
            this.player.playerPosition.y + this.player.playerSize.h >= ingredient.posY &&
            this.player.playerPosition.y <= ingredient.posY + ingredient.height) {
            this.obstacles.splice(this.obstacles.indexOf(ingredient.name), 1)
            if (this.recipe.includes(ingredient.name)) {

                this.recipe.splice(this.recipe.indexOf(ingredient.name), 1)

            } else {
                this.player.lifes--
                console.log(this.player.lifes)
                let ingredientIndex = this.obstacles.indexOf(ingredient)
                // this.obstacles.splice(ingredientIndex, 1)
            }

        }
        if (this.recipe.length === 0) {
            this.createRecipe()
            this.completedRecipes++
        }
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
    },
    gameOver() {
        this.obstacles = []
        this.platforms = []
        this.recipe = []
        this.clearAll()
        clearInterval(this.intervalId)
        this.ctx.drawImage(this.imageGameOver, 0, 0, this.canvasSize.w, this.canvasSize.h)

        document.getElementById("secondButton").style.display = "block"
    },
    checkWonGame() {
        if (this.completedRecipes === 3) {
            // AQUI VA LA IMAGEN DE GANAR Y ESO
            this.gameOver()
        }
    }
}
