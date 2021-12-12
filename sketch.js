var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obsTop1img, obsTop2img;
var obsBottom1img, obsBottom2img, obsBottom3img;
var topObstacleGroup;
var bottomObstacleGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var gameOver, gameOverimg;
var restart, restartimg;

function preload(){
bgImg = loadImage("assets/bg.png")
obsTop1img = loadImage("assets/obsTop1.png");
obsTop2img = loadImage("assets/obsTop2.png");
obsBottom1img = loadImage("assets/obsBottom1.png");
obsBottom2img = loadImage("assets/obsBottom2.png");
obsBottom3img = loadImage("assets/obsBottom3.png");
gameOverimg = loadImage("assets/gameOver.png");
restartimg = loadImage("assets/restart.png");

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
}

function setup(){
    createCanvas(1790,1000)

    bg = createSprite(895,485,1600,1000);
    bg.addImage(bgImg);
    bg.scale = 1.5


    bottomGround = createSprite(200,990,3150,20);
    bottomGround.visible = false;

    topGround = createSprite(200,10,3150,20);
    topGround.visible = false;
      
    
    balloon = createSprite(100,200,20,50);
    balloon.addAnimation("balloon",balloonImg);
    balloon.scale = 0.5;

    gameOver = createSprite(895,300);
    gameOver.addImage(gameOverimg);
    gameOver.visible = false;
    gameOver.scale = 0.5;

    restart = createSprite(895,340);
    restart.addImage(restartimg);
    restart.visible = false;
    restart.scale = 0.5;

    topObstacleGroup=new Group();
    bottomObstacleGroup=new Group();

}

function draw() {
  
  background("black");

          if(gameState===PLAY){
            if(keyDown("space")) {
              balloon.velocityY = -6 ;
            }
            balloon.velocityY = balloon.velocityY + 2;
            spawnTopObstacles();
            spawnBottomObstacles();
            if(balloon.isTouching(topObstacleGroup) || balloon.isTouching(bottomObstacleGroup) || balloon.isTouching(bottomGround) || balloon.isTouching(topGround)){
              gameState=END;
            }
          }
          if(gameState===END){
            balloon.velocityY = 0;
            balloon.velocityX = 0;
            gameOver.visible = true;
            restart.visible = true;
            topObstacleGroup.setVelocityXEach(0);
            bottomObstacleGroup.setVelocityXEach(0);
            topObstacleGroup.setLifetimeEach(-1);
            bottomObstacleGroup.setLifetimeEach(-1);
            balloon.y = 200;
            if(mousePressedOver(restart)){
              reset();
            }
          }
   
        drawSprites();
        Score();
}

function Score(){
  textSize(30);
  fill("red");
  textFont("algerian");
  text("Score: "+score, 1600, 54);
}

function spawnTopObstacles(){
  if(World.frameCount%60===0){
    var obsTop = createSprite(1790,Math.round(random(50,200)),40,50);
    obsTop.scale = 0.2;
    obsTop.velocityX = -4;

    var r = Math.round(random(1,2));
    if(r===1){
      obsTop.addImage("1",obsTop1img);
    } else if(r===2){
      obsTop.addImage("2",obsTop2img);
    }
    balloon.depth = obsTop.depth+1;
    obsTop.lifetime=500;

    topObstacleGroup.add(obsTop);
  }
}

function spawnBottomObstacles(){
  if(World.frameCount%60===0){
    var obsBottom = createSprite(1790,800,40,50);
    obsBottom.scale = 0.2;
    obsBottom.velocityX = -4;

    var r = Math.round(random(1,3));
    if(r===1){
      obsBottom.addImage("1",obsBottom1img);
    } else if(r===2){
      obsBottom.addImage("2",obsBottom2img);
    } else if(r==3){
      obsBottom.addImage("3",obsBottom3img);
    }
    balloon.depth = obsBottom.depth+1;
    obsBottom.lifetime=500;

    bottomObstacleGroup.add(obsBottom);
  }
}

function reset(){
  gameState=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  topObstacleGroup.destroyEach();
  bottomObstacleGroup.destroyEach();
}