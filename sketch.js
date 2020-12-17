// to create the gamestate for the game
var PLAY = 1;
var END = 0;
var gameState = PLAY;

// To create the sprite for sword
var sword, swordImage;

// To create the sprite for fruits
var fruit, fruitImage, fruitGroup;

// To create the sprite for microbe
var microbe, microbe_moving, microbeGroup;

// For loading the sound
var cutSound, gameOverSound;

var gameOverImg;

var score = 0;

var position;

function preload(){
  // To load the sword image
  swordImage = loadImage("sword.png");
  
  // To load images for fruits
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  microbe_moving = loadAnimation("alien1.png", "alien2.png");
  
  cutSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
  
  gameOverImg = loadImage("gameover.png");
  
  
  
 
}

function setup(){
  sword = createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitGroup = new Group();
  microbeGroup = new Group();

  
}

function draw(){
  
  createCanvas(400,400)
  // To make the background clear
  background("lightBlue")
  
  textSize(15)
  text("Score: " + score, 330, 20);
  sword.setCollider("circle",0,0,50)
  //sword.debug = true;
  
  if(gameState === PLAY){
    
    // To make the sword move with x,y position of the mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;
    
    // To create the functions for fruit and enemy
    fruits();
    enemy();
    
    if(sword.isTouching(fruitGroup)){
      cutSound.play();
      fruitGroup.destroyEach();
      score = score + 2; 
      
    }else if(sword.isTouching(microbeGroup)){
      gameState = END;
      gameOverSound.play();
      
    }
  }
  
  if(gameState === END){
    sword.addImage(gameOverImg);
    microbeGroup.destroyEach();
    fruitGroup.destroyEach();
    microbeGroup.setVelocityEach(0,0);
    fruitGroup.setVelocityEach(0,0);
    sword.x = 200;
    sword.y = 200;
    
  }
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    //fruit.debug = true;
    if(position === 1){
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }else{
      if(position === 2){
        fruit.x = 0
        fruit.velocityX = (7+(score/4))
      }
    }
    var r = Math.round(random(1,4));
    if(r === 1){
      fruit.addImage(fruit1);
    }else if(r === 2){
      fruit.addImage(fruit2);
    }else if(r === 3){
      fruit.addImage(fruit3)
    }else
      fruit.addImage(fruit4)
    
    fruit.y = Math.round(random(50,340))
    
   // fruit.velocityX = -7;
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function enemy(){
  if(World.frameCount%200 === 0){
    microbe = createSprite(400,200,20,20);
    microbe.addAnimation("moving",microbe_moving);
    microbe.y = Math.round(random(100,300));
    microbe.velocityX = -(8+(score/10));
    microbe.velocityX = -8;
    microbe.setLifetime = 50;
    
    microbeGroup.add(microbe);
  }
}


