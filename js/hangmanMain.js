/*
let palavras=["Anubis","Osiris"]
)*/
import {drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg} from "./canvas.js"
//Variaveis do jogo//
let palavra = "ANUBIS"
let palavraEmArray = palavra.split("")
let escolha = ""
let textReveal=[]
let indicePalavra= 0
let escolhaErrada = [drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg]
let indeceEscolhaErrada = 0
let erroContador= 0
//Variaveis do html//
const keyboardBtn = document.querySelectorAll(".btnKeyboard")
const canvas = document.querySelector("canvas")
const keyboard = document.querySelector(".keyboard")
const mainSceneCont = document.querySelector(".mainSceneContainer")
const tela = document.querySelector("body")
const gameOverScreen = document.querySelector(".gameOverScreen")
const playAgainBtn = document.querySelector(".interfaceBtn")


function iniciaGame(){
  for (let i = 0; i < palavra.length; i++) {
    textReveal.push("_");    
  }

}
iniciaGame()

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
/*function playAgain(){
  playAgainBtn.style.display = "none";
  gameOverScreen.style.display = "none";
  tela.classList.remove("blackScreen");
  tela.classList.add("mainState");
  keyboard.style.display = "flex";
  canvas.style.display = "initial";
  mainSceneCont.classList.add("mainSceneContainer");
  
}
*/

for(let i=0; i< keyboardBtn.length; i++){
  keyboardBtn[i].addEventListener("click",function(){
    escolha= keyboardBtn[i].textContent;
    letraCorreta();
    letraErrada();
    gameOver()
  })
}

//playAgainBtn.addEventListener("click", playAgain)