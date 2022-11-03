document.getElementById("firstButton").addEventListener("click", () => {
    document.getElementById("canvas").style.display = "block"
    document.getElementById("firstButton").style.display = "none"
    document.getElementsByTagName("img")[0].style.display = "none"

    Game.init()
})

//Game.init()



document.getElementById("secondButton").addEventListener("click", () => {
    document.getElementById("firstButton").style.display = "none"
    document.getElementsByTagName("img")[0].style.display = "none"
    location.reload()
})