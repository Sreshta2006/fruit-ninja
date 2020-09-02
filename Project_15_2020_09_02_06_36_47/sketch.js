var sword,swordimage;
var fruits,fruit1,fruit2,fruit3,fruit4;
var fruitgroup,enemygroup;
var gameover,gm1,score;
var alien;

var PLAY=1;
var END=0;
var gamestate=PLAY;

var position; 
var swordsound,enemysound,gmsound;


function preload(){
  swordimage=loadImage("sword.png")
  fruit1=loadImage("fruit1.png")
  fruit2=loadImage("fruit2.png")
  fruit3=loadImage("fruit3.png")
  fruit4=loadImage("fruit4.png")
  
  gm1=loadImage("gameover.png");
  alien=loadImage("alien1.png","alien2.png");
  
  swordsound=loadSound("zapsplat_warfare_swords_scrape_together.mp3");
  
  enemysound=loadSound("esm_8bit_explosion_bomb_boom_blast_cannon_retro_old_school_classic_cartoon.mp3")
  
  gmsound=loadSound("zapsplat_human_male_voice_says_game_over_001_15726.mp3");
}
function setup(){
  createCanvas(400,400);
  
  sword=createSprite(200,200,20,20);
  sword.addImage(swordimage);
  sword.scale=0.8;

  fruitgroup=createGroup();
  enemygroup=createGroup();  

  score=0;
  
}



function draw(){
background("lightblue");
  
   
 textSize(20);
 text("Score:"+score,320,30);
 
  
 if(gamestate===PLAY){
  sword.x=mouseX;
  sword.y=mouseY;

  ENEMY();
  FRUIT();
 
if(sword.isTouching(fruitgroup)){
  fruitgroup.destroyEach();
  swordsound.play();
  score=score+4;
}
   
   
   
 }else if(gamestate===END){
   fruitgroup.setLifetimeEach(-1);
   enemygroup.setLifetimeEach(-1);
 }

if(sword.isTouching(enemygroup)){
     gamestate=END;
     gmsound.play();
     enemysound.play();
     fruitgroup.setVelocityXEach=0;
     enemygroup.setVelocityXEach=0;
     sword.velocity=0;
     fruitgroup.destroyEach();
     enemygroup.destroyEach();
     gameover = createSprite(200,200,10,10);
     gameover.addImage(gm1);
     gameover.scale = 0.9;

   }

  sword.debug=false;
  sword.setCollider("rectangle",0,0,60,70);
  
  
  
  drawSprites();
}
function FRUIT(){
if(frameCount%80===0){
  fruits=createSprite(400,200,10,10);
  fruits.velocityX=-7;
  fruits.scale=0.3;
  
  var r=Math.round(random(1,4))
  
   if(r===1){
      fruits.addImage(fruit1);
    }else if(r===2){
      fruits.addImage(fruit2);
    }else if(r===3){
      fruits.addImage(fruit3);
    }else if(r===4){
      fruits.addImage(fruit4);
    }
  position=Math.round(random(1,2));
  
  if (position===1){
      fruits.x=400;
      fruits.velocityX=-(7+(score/8));
  }else if(position===2){
    fruits.x=1
        fruits.velocityX=(7+(score/8));
  
  }
    fruits.y=Math.round(random(50,350));
    fruitgroup.add(fruits);
}
}
function ENEMY(){
 if(frameCount%200===0){
   var monster=createSprite(400,200,20,20);
    monster.addImage(alien);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(7+(score/30));
    monster.setLifetime=50;
    
   enemygroup.add(monster);
}
}



