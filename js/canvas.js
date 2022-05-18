let cvs = document.querySelector("canvas")
cvs.width=900
cvs.height=500

let ctx= cvs.getContext("2d")

//forca
ctx.fillRect(30,50,20,450)
ctx.fillRect(0,480,180,20)
ctx.fillRect(30,50,350,20)
ctx.fillRect(340,50,10,50)

//cabeca
let ang= 359

function drawHead(){
    ctx.arc(345,130,30,0,(Math.PI/180) * ang ,true)
    ctx.fill()
    if(ang>=1){
        ang--
        requestAnimationFrame(drawHead)
    }else{
        cancelAnimationFrame(drawHead)
    }
}
    //corpo
let yBody=5
//let yBody=130
ctx.lineWidth= 20
function drawBody(){
    if(yBody < 130){
        ctx.fillRect(330,150,20,yBody)
        yBody++
        requestAnimationFrame(drawBody)
    }else{
        cancelAnimationFrame(drawBody)
    }console.log(yBody);
}
drawHead()
drawBody()