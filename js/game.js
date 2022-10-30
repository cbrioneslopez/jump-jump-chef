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
    background: undefined,
    player: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.createPlatform()
        this.createRecipe()
        //this.createIngredient()//
        this.start()
    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.intervalId = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter % 100 === 0) this.createIngredient()
            this.clearAll()
            this.drawAll()
            this.obstacles.forEach((ingredient) => {
                ingredient.drawIngredient()
                ingredient.moveIngredient()
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
        this.platforms.forEach((eachPlatform) => {
            eachPlatform.drawPlatform()
            this.checkCollision(eachPlatform)

        })
    },
    createPlatform() {
        this.platforms.push(new Platform(this.ctx, 100, 600, 200, 20))
    },
    checkCollision(platform) {
        if (this.player.playerPosition.y + this.player.playerSize.h <= platform.positionY &&
            this.player.playerPosition.y + this.player.playerSize.h >= platform.positionY &&
            this.player.playerPosition.x + this.player.playerSize.w >= platform.positionX &&
            this.player.playerPosition.x <= platform.positionX + platform.width) {
            this.player.gravity = 0
        } else {
            this.player.gravity = 1
        }
    },
    createBackground() {
        this.background = new Background(this.ctx, this.canvasSize.w, this.canvasSize.h)
        this.background.drawBackground()
    },
    createIngredient() {
        let chosenIndex = Math.floor(Math.random() * this.ingredients.length)
        let type = this.ingredients[chosenIndex]
        this.obstacles.push(new Ingredient(this.ctx, this.canvasSize.w, 200, type))
        this.obstacles.push(new Ingredient(this.ctx, this.canvasSize.w, 600, type))
    },
    createRecipe() {
        for (let i = 0; i <= 2; i++) {
            let chosenIngredient = Math.floor(Math.random() * this.ingredients.length)
            this.recipe.push(this.ingredients[chosenIngredient])
        }

    },
    drawRecipe() {
        let firstIngredient = new Ingredient(this.ctx, 10, 0, this.recipe[0])
        firstIngredient.drawIngredient()
        let secondIngredient = new Ingredient(this.ctx, 80, 0, this.recipe[1])
        secondIngredient.drawIngredient()
        let thirdIngredient = new Ingredient(this.ctx, 150, 0, this.recipe[2])
        thirdIngredient.drawIngredient()

    }
}