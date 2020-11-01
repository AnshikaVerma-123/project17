// to create Global JavaScript Variables
var monkey , monkey_running, monkeyCollide;
var ground, invisibleGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  // to load animation and images
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  
  
  groundImg = loadAnimation("ground.jpg") 
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  // to create groups
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 // to create monkey
  monkey = createSprite(80,230,10,10);
  
  // to decrease the size the size of monkey
  monkey.scale = 0.12;
  // to add the animation of monkey
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
  // to create a ground 
  ground = createSprite(300,340,600,10);
  ground.scale = 1;
  
  ground.addAnimation("ground", groundImg);
  
  // to create invisible ground
  invisiGround = createSprite(300,278,600,7);
  invisiGround.visible = false;
  
}

function draw(){
  // to set the background color
  background("skyblue");
  
  // to print the text and give text color
  fill("purple");
  text("SURVIVAL TIME: "+score, 470, 20);
  fill("white");
  text("BANANAS YOU WON: "+bananaScore,300,20);
  
  // to make the game state as play
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  // to make the play state to end state
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.12;
    monkey.changeAnimation("collide", monkeyCollide);
    
    // to give velocities
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    // to give lifetimes
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    
         fill("red");
 stroke("dusty rose");
    textSize(25);
    text("GAMEOVER!!!  :)", 220, 170);
    fill("navy blue");
    textSize(15);
    text("Press 'A or a' to play again and enjoy", 240, 200);
    
    // o resert the game 
    if (keyDown("a")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  
  // to draw the sprites 
  drawSprites(); 
  
  monkey.collide(invisiGround);
}

function bananas(){
  // it works as 'seconds in real life'
  if (frameCount%80 === 0){
    
    // to create the bananas
    banana = createSprite(620,120, 50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.5/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
    
    

    
  }
  

  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.5/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}






