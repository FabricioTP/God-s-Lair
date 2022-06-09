import {drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg} from "./canvas.js"
//Variaveis do jogo//
let palavras=["ANUBIS","OSIRIS","AMON","RA","SET","SEKHMET"]
let palavra = ""
let palavraEmArray = palavra.split("")
let escolha = ""
let textReveal=[]
let textoDisplay = ""
let novoJogoCheck = ""
let letrasJaEscolhidas = ""
let escolhaErrada = [drawHead,drawBody,drawRightArm,drawLeftArm,drawRightLeg,drawLeftLeg]
let indiceEscolhaErrada = 0
let erroContador= 0
let contadorVitorias= 0
//Variaveis do html//
const firstScene = document.querySelector(".firstScene")
const mainSceneCont = document.querySelector(".mainSceneContainer")
const finalScene = document.querySelector(".finalScene")
const newGame = document.querySelectorAll(".interfaceBtn")[0]
const newWordCont = document.querySelectorAll(".interfaceBtn")[1]
const newWordInputTxt= document.querySelector("#firstSceneNewWord")
const newWordBtn = document.querySelector("#sendNewWord")
const tela = document.querySelector("body")
const canvas = document.querySelector("canvas")
const keyboard = document.querySelector(".keyboard")
const letrasDisplayCont = document.querySelector("#letrasDisplayCont")
const keyboardBtn = document.querySelectorAll(".btnKeyboard")
const gameOverScreen = document.querySelector(".gameOverScreen")
const playAgainBtn = document.querySelector("#retryBtn")
const palavraDisplay = document.querySelector("#palavraDisplay")
const letrasJaEscolhidasDisplay = document.querySelector("#letrasJaJogadas")

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
function novaPalavra(){
  let totalDePalavras= palavras.length
  let indicePalavraNova = Math.floor(Math.random()*totalDePalavras)
  palavra = palavras[indicePalavraNova]
  palavraEmArray = palavra.split("")
}
function RemoverPalavraEscolhida(){
  let indiceDaPalavra= palavras.indexOf(palavra)
  palavras.splice(indiceDaPalavra,1)
  console.log(indiceDaPalavra);
  console.log(palavras);
}
function iniciaGame(){
  tela.classList.add("mainState")
  tela.classList.remove("blackScreen")
  firstScene.style.display="none"
  mainSceneCont.style.display="flex"
  novaPalavra()
  novoJogoCheck = false
  for (let i = 0; i < palavra.length; i++) {
    textReveal.push("_");
    textoDisplay= textReveal.toString()
    textoDisplay= textoDisplay.replace(/,/g," ")
    palavraDisplay.textContent= textoDisplay  
  }
  RemoverPalavraEscolhida()
}
function vitoria(){
  if(contadorVitorias == 3){
    letrasJaEscolhidasDisplay.textContent = ""
    palavraDisplay.classList.remove("tracosStyle")
    palavraDisplay.classList.add("vitoria");
    textReveal="Palavra correta!"
    setTimeout(() => {
      palavraDisplay.style.opacity=0
      textReveal = []
      tela.classList.remove("mainState");
      tela.classList.add("blackScreen")
      mainSceneCont.style.display="none"
      finalScene.style.display="flex"
    },1000);
  }else{
    letrasJaEscolhidasDisplay.textContent = ""
    novoJogoCheck = true
    letrasJaEscolhidas = ""
    contadorVitorias++
    palavraDisplay.classList.remove("tracosStyle")
    palavraDisplay.classList.add("vitoria");
    textReveal="Palavra correta!"
    setTimeout(() => {
      palavraDisplay.style.opacity=0
      textReveal = []
      novaJogo()
    }, 1000);
  }
}
function novaJogo(){
  novaPalavra()
  RemoverPalavraEscolhida()
  palavraDisplay.classList.remove("vitoria")
  palavraDisplay.classList.add("tracosStyle")
  for (let i = 0; i < palavra.length; i++) {
    textReveal.push("_");
    textoDisplay= textReveal.toString()
    textoDisplay= textoDisplay.replace(/,/g," ")
    palavraDisplay.textContent= textoDisplay  
  }
  palavraDisplay.style.opacity=1
}
function letraCorreta(){
  palavraEmArray.forEach((letra,index) =>{
    switch(true){
      case letra == escolha:
          textReveal.splice(index,1,escolha);
          if(palavraEmArray.join("") == textReveal.join("")){
            vitoria()
          }
          textoDisplay= textReveal.toString();
          textoDisplay= textoDisplay.replace(/,/g," ");
          palavraDisplay.textContent= textoDisplay;
        break;
      default:
        erroContador++;
        break;
    }
  })
}
function letraErrada(){
  switch(true){
    case indiceEscolhaErrada == 6:
      mainSceneCont.classList.remove("mainSceneContainer");
      canvas.style.display = "none"
      keyboard.style.display = "none"
      letrasDisplayCont.style.display = "none"
      tela.classList.remove("mainState")
      tela.classList.add("blackScreen")
      gameOverScreen.style.display = "flex"
      playAgainBtn.style.display = "initial"
      break;
    case erroContador == palavra.length:
      escolhaErrada[indiceEscolhaErrada]();
      erroContador=0
      indiceEscolhaErrada++
      break;
    default:
      erroContador = 0
  }
}
function playAgain(){
  document.location.reload(true)
}
for(let i=0; i< keyboardBtn.length; i++){
  keyboardBtn[i].addEventListener("click",function(){
    novoJogoCheck = false
    function verificaLetra(){
      let indexLetraEscolhida = letrasJaEscolhidas.indexOf(keyboardBtn[i].textContent)
      return indexLetraEscolhida;
    }
    if(verificaLetra() == -1 && novoJogoCheck == false){
      escolha= keyboardBtn[i].textContent;
      letrasJaEscolhidas= letrasJaEscolhidas.concat(escolha)
      letrasJaEscolhidasDisplay.textContent= letrasJaEscolhidas
    }
    letraCorreta();
    letraErrada();
    verificaLetra()
  })
}
newGame.addEventListener("click",iniciaGame)
playAgainBtn.addEventListener("click", playAgain)
newWordCont.addEventListener("click", function(){
  const palavraNovaCampo = document.querySelector("#newWordCont")
  palavraNovaCampo.style.opacity="1"
})
newWordBtn.addEventListener("click",adicionarPalavra)
newWordCont.addEventListener("mouseover", function(){
  newWordCont.textContent = "Adicionar nova palavra."
})
newWordCont.addEventListener("mouseout", function(){
  newWordCont.textContent = "Deuses, aumentem meu desafio!"
})
newWordBtn.addEventListener("mouseover",function(){
  newWordBtn.textContent = "Adicionar nova palavra."
})
newWordBtn.addEventListener("mouseout",function(){
  newWordBtn.textContent = "Novo Panteão"
})