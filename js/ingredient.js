class Ingredient {
    constructor(ctx, posX, posY, name) {
        this.ctx = ctx
        this.posX = posX
        this.posY = posY
        this.width = 50
        this.height = 50
        this.name = name
        this.imageInstance = new Image()
        this.imageInstance.src = undefined
        this.ingredients = [{ name: "patata", imagesrc: "./images/patata.png" }, { name: "carne", imagesrc: "./images/carne.png" }, { name: "cebolla", imagesrc: "./images/cebolla.png" },
        { name: "lechuga", imagesrc: "./images/lechuga.png" }, { name: "tomate", imagesrc: "./images/tomate.png" }]

    }
    drawIngredient() {
        this.ingredients.forEach((ingredient) => {
            if (ingredient.name === this.name) this.imageInstance.src = ingredient.imagesrc
        })
        this.ctx.drawImage(this.imageInstance, this.posX, this.posY, this.width, this.height)
        this.moveIngredient()
    }
    moveIngredient() {
        this.posX -= 5
    }


}