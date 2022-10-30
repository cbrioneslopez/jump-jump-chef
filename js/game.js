const Game = {
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    intervalId: undefined,
    background: undefined,
    ingredients: ["patata", "tomate", "carne", "lechuga", "cebolla"],
    recipe: [],
    platforms: [],
    background: undefined,
    player: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.createPlatform()
        this.createIngredient()
        this.start()
    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
            this.recipe.forEach((ingredient) => ingredient.drawIngredient())
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
        this.platforms.forEach((eachPlatform) => {
            eachPlatform.drawPlatform()
            this.checkCollision(eachPlatform)
            this
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
        this.recipe.push(new Ingredient(this.ctx, this.canvasSize.w, this.canvasSize.h / 2, type))
    }
}