//Variaveis do html//
const tela = document.querySelector("body")
const canvas = document.querySelector("canvas")
const keyboard = document.querySelector(".keyboard")
const keyboardBtn = document.querySelectorAll(".btnKeyboard")
const gameOverScreen = document.querySelector(".gameOverScreen")
const playAgainBtn = document.querySelector("#retryBtn")
const firstScene = document.querySelector(".firstScene")
const mainSceneCont = document.querySelector(".mainSceneContainer")
const newGame = document.querySelectorAll(".interfaceBtn")[0]
const newWord = document.querySelectorAll(".interfaceBtn")[1]

function iniciaGame(){
    tela.classList.add("mainState")
    tela.classList.remove("blackScreen")
    firstScene.style.display="none"
    mainSceneCont.style.display="flex"
    for (let i = 0; i < palavra.length; i++) {
      textReveal.push("_");    
    }
}
function playAgain(){
    document.location.reload(true)
}
newGame.addEventListener("click",iniciaGame)
playAgainBtn.addEventListener("click", playAgain)