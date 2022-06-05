import {drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg} from "./canvas.js"
//Variaveis do jogo//
let palavras=["ANUBIS","OSIRIS","AMON","RA","SET","SEKHMET"]
let palavra = "ANUBIS"
let palavraEmArray = palavra.split("")
let escolha = ""
let textReveal=[]
let escolhaErrada = [drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg]
let indeceEscolhaErrada = 0
let erroContador= 0
//Variaveis do html//
const firstScene = document.querySelector(".firstScene")
const mainSceneCont = document.querySelector(".mainSceneContainer")
const newGame = document.querySelectorAll(".interfaceBtn")[0]
const newWordCont = document.querySelectorAll(".interfaceBtn")[1]
const newWordInputTxt= document.querySelector("#firstSceneNewWord")
const newWordBtn = document.querySelector("#sendNewWord")
const tela = document.querySelector("body")
const canvas = document.querySelector("canvas")
const keyboard = document.querySelector(".keyboard")
const keyboardBtn = document.querySelectorAll(".btnKeyboard")
const gameOverScreen = document.querySelector(".gameOverScreen")
const playAgainBtn = document.querySelector("#retryBtn")

function adicionarPalavra(){
  const wordMsg = document.querySelector("#wordMsg")
  let palavraNova = newWordBtn.value
  const caracteresAceitos = /^[A-Za-z]+$/
  if(newWordInputTxt.value.match(caracteresAceitos) && newWordInputTxt.value.length <= 7){
    wordMsg.classList.remove("sucessoMsg")
    wordMsg.classList.remove("erroMsg")
    wordMsg.classList.add("sucessoMsg")
    wordMsg.textContent = "Palavra adicionada!"
    palavraNova = newWordInputTxt.value.toUpperCase()
    palavras.push(palavraNova)
    
  }else{
    wordMsg.classList.remove("sucessoMsg")
    wordMsg.classList.remove("erroMsg")
    wordMsg.classList.add("erroMsg")
    wordMsg.textContent = "Somente aceito letras. Não permitido caracteres especiais,espaços e palavras com mais de 7 caracteres."
  }
}
function iniciaGame(){
  tela.classList.add("mainState")
  tela.classList.remove("blackScreen")
  firstScene.style.display="none"
  mainSceneCont.style.display="flex"
  for (let i = 0; i < palavra.length; i++) {
    textReveal.push("_");    
  }
}
function letraCorreta(){
  palavraEmArray.forEach((letra,index) =>{
    if(letra == escolha){
      textReveal.splice(index,1,escolha);
    }else{
      erroContador++;
    }
  })
}
function letraErrada(){
  if(erroContador == palavra.length){
    escolhaErrada[indeceEscolhaErrada]();
    erroContador=0
    indeceEscolhaErrada++
    console.log(erroContador);
  }else{
    erroContador=0
  }
}
function gameOver(){
  if(indeceEscolhaErrada >= 6){
    mainSceneCont.classList.remove("mainSceneContainer");
    canvas.style.display = "none"
    keyboard.style.display = "none"
    tela.classList.remove("mainState")
    tela.classList.add("blackScreen")
    gameOverScreen.style.display = "flex"
    playAgainBtn.style.display = "initial"
  }
}
function playAgain(){
  document.location.reload(true)
}
for(let i=0; i< keyboardBtn.length; i++){
  keyboardBtn[i].addEventListener("click",function(){
    escolha= keyboardBtn[i].textContent;
    letraCorreta();
    letraErrada();
    gameOver();
  })
}
newGame.addEventListener("click",iniciaGame)
playAgainBtn.addEventListener("click", playAgain)
newWordCont.addEventListener("click", function(){
  const palavraNovaCampo = document.querySelector("#newWordCont")
  palavraNovaCampo.style.opacity="1"
})
newWordBtn.addEventListener("click",adicionarPalavra)
