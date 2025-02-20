
window.onload = function() {
    canvas =
      document.getElementById("canvas");
 ctx = canvas.getContext("2d");
 setInterval(draw,1000/15);
}

//Rectangle Code
function drawRect(topLeftX,topLeftY, width,height, color) {
ctx.fillStyle = color;    ctx.fillRect(topLeftX,topLeftY,width,height);
}
//Circle Code
function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

var gridSize=18;
var tileCount=18;
var xVelocity=0;
var yVelocity=0;
var trail = [];
var tailLength = 3;
var appleX = Math.floor(Math.random()* tileCount);
var appleY = Math.floor(Math.random()* tileCount);
var playerX = Math.floor(Math.random()* tileCount);
var playerY = Math.floor(Math.random()* tileCount);
    var score = 0;
    var speed = 1;
    
    var showGrid = true;
    
    alert("GAMEPLAY:\nYou Have To Control The Snake With Your Arrow Keys Or The Built In Buttons In Order To Eat The Apple And Grow, If You Hit Your Tail, You Restart.");
    
    document.addEventListener("keydown",keyDown);
    
function keyDown(e) {
    if(e.keyCode == "37") {
        moveLeft();
        e.preventDefault();
    }
    if(e.keyCode == "38") {
        moveUp();
        e.preventDefault();
    }
    if(e.keyCode == "39") {
        moveRight();
        e.preventDefault();
    }
    if(e.keyCode == "40") {
        moveDown();
        e.preventDefault();
    }
}

function moveLeft() {
    if(xVelocity != speed) {
    xVelocity = -speed;
    yVelocity = 0;
    }
}
function moveRight() {
    if(xVelocity != -speed) {
    xVelocity = speed;
    yVelocity = 0;
    }
}
function moveUp() {
    if(yVelocity != speed) {
    xVelocity = 0;
    yVelocity = -speed;
    }
}
function moveDown() {
    if(yVelocity != -speed) {
    xVelocity = 0;
    yVelocity = speed;
    }
}

var showTitleScreen = true;

document.addEventListener("click",startGame);

function startGame() {
    if(showTitleScreen) {
        showTitleScreen = false;
    }
}

var indexNumber = 0;
var index = [true,false,true,false];

function toggleGrid() {
    indexNumber += 1;
}

function draw() {
    drawRect(0,0, canvas.width,canvas.height, "black");
    
        if(indexNumber == 2) {
        indexNumber = 0;
    }
    
    showGrid = index[indexNumber];
    
        if(showTitleScreen) {
     ctx.fillStyle = "green";
  ctx.font ="30px Arial";
  ctx.fillText("JavaScript Snake",canvas.width/2-110, canvas.height/2);
  
    ctx.font ="12px Arial";
    ctx.fillStyle = "white";
  ctx.fillText("Game By Hemlata", 5, canvas.height-15);
  
    ctx.font ="20px Arial";
    ctx.fillStyle = "red";
  ctx.fillText("Click To Play", canvas.width/2-60, canvas.height/2+80);
  return;
}
    
    playerX += xVelocity;
    playerY += yVelocity;
    
    //Move To Other Side Of Screen
    if(playerX > tileCount - 1) {
        playerX = 0;
    }
    if(playerX < 0) {
        playerX = tileCount - 1;
    }
    if(playerY < 0) {
        playerY = tileCount - 1;
    }
    if(playerY > tileCount - 1) {
        playerY = 0;
    }
    if(showGrid) {
    for(var r=0;r<18;r++) {
        for(var c=0;c<18;c++) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(230,230,230,0.2)";    ctx.rect(c*18,r*18,18-2,18-2);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
    
    for(var i=0;i<trail.length;i++) {
        
        drawRect(trail[i].x *gridSize, trail[i].y *gridSize, gridSize-2, gridSize-2, "lightgreen");
        
drawRect(trail[trail.length-1].x *gridSize, trail[trail.length-1].y *gridSize, gridSize-2, gridSize-2, "green");
        
                if(trail[i].x == playerX &&
             trail[i].y == playerY) {
                    score = 0;
                   tailLength = 5;
                   playerX = Math.floor(Math.random()*tileCount);
                   playerY = Math.floor(Math.random()*tileCount);
                   xVelocity = 0;
                   yVelocity = 0;
           }

    }

    trail.push({
        x: playerX,
        y: playerY
    });
    while(trail.length>tailLength) {
        trail.shift();
    }
    
            if(playerX == appleX &&
       appleY == playerY) {
           tailLength++;
           score++;
           appleX = Math.floor(Math.random()*tileCount);
           appleY = Math.floor(Math.random()*tileCount);
       }
    
    //Apple
    drawRect(appleX*gridSize, appleY*gridSize, gridSize-2, gridSize-2, "red");
    
    
    var p = document.getElementById("score");
    
    p.innerHTML ="Score: " + score;
}         
          
      
      