export{drawHead,drawBody,drawRightArm,drawLeftArm,drawLeftLeg,drawRightLeg,limparTela}

let cvs = document.querySelector("canvas")
cvs.width=800
cvs.height=500

let ctx= cvs.getContext("2d")

//forca
ctx.beginPath()
ctx.fillRect(30,50,20,450)
ctx.fillRect(0,480,180,20)
ctx.fillRect(30,50,350,20)
ctx.fillRect(340,50,10,50)
ctx.closePath()

//cabeca

let ang= 359
function drawHead(){
    ctx.beginPath()
    ctx.arc(345,130,30,0,(Math.PI/180) * ang ,true)
    ctx.fill()
    if(ang>=1){
        ang-=8
        requestAnimationFrame(drawHead)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawHead)
    }
}
//corpo
let yBody=5
ctx.lineWidth= 20
function drawBody(){
    ctx.beginPath()
    if(yBody < 130){
        ctx.fillRect(330,150,20,yBody)
        yBody+=3
        requestAnimationFrame(drawBody)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawBody)
    };
}
//braco direito
let rgtArmX= 340
let rgtArmY= 160
function drawRightArm(){
    ctx.beginPath()
    ctx.moveTo(340,160)
    if(rgtArmX < 410 || rgtArmY < 240){
        rgtArmX+=3
        rgtArmY+=3
        ctx.lineTo(rgtArmX,rgtArmY)
        ctx.stroke()
        requestAnimationFrame(drawRightArm)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawRightArm)
    }
}
//braco esquerdo
let lftArmX= 340
let lftArmY= 160
function drawLeftArm(){
    ctx.beginPath()
    ctx.moveTo(340,160)
    if(lftArmX < 250 || lftArmY < 240){
        lftArmX-=3
        lftArmY+=3
        ctx.lineTo(lftArmX,lftArmY)
        ctx.stroke()
        requestAnimationFrame(drawLeftArm)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawLeftArm)
    }
}
//perna direita
let rgtLegX=340
let rgtLegY=270
function drawRightLeg(){
    ctx.beginPath()
    ctx.moveTo(340,270)
    if(rgtLegX < 390){
        rgtLegX++
        rgtLegY+=2.5
        ctx.lineTo(rgtLegX,rgtLegY)
        ctx.stroke()
        requestAnimationFrame(drawRightLeg)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawRightLeg)
    }
}
//perna esquerda
let lftLegX=340
let lftLegY=270
function drawLeftLeg(){
    ctx.beginPath()
    ctx.moveTo(340,270)
    if(lftLegX > 280){
        lftLegX--
        lftLegY+=2.1
        ctx.lineTo(lftLegX,lftLegY)
        ctx.stroke()
        requestAnimationFrame(drawLeftLeg)
    }else{
        ctx.closePath()
        cancelAnimationFrame(drawLeftLeg)
    }
}
function limparTela(){
    ctx.clearRect(0,0,cvs.width,cvs.height)
    ctx.beginPath()
    ctx.fillRect(30,50,20,450)
    ctx.fillRect(0,480,180,20)
    ctx.fillRect(30,50,350,20)
    ctx.fillRect(340,50,10,50)
    ctx.closePath()
}