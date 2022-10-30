const Game = {
    ctx: undefined,
    canvasSize: { w: undefined, h: undefined },
    FPS: 60,
    framesCounter: 0,
    intervalId: undefined,
    background: undefined,
    ingredients: [],
    recipe: [],
    player: undefined,
    init() {
        this.getContext()
        this.setDimensions()
        this.start()
    },
    start() {
        this.player = new Player(this.ctx, this.canvasSize)
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
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
    drawBackground() {
        this.ctx.fillStyle = "gray"
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },
    drawAll() {
        this.drawBackground()
        this.player.updatePlayer()
    }
}