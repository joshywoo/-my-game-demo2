
function preload(){
  boyAnimation=loadAnimation("boy1.png","boy2.png","boy3.png","boy1.png","boy2.png","boy3.png")
  bg=loadImage ("start image.jpg")
  logoimg = loadImage ("logo.png")
  village = loadImage ("village.jpg")
  boulder=loadImage ("boulder.png")
  wood = loadImage ("wood.png")
  coinimg = loadImage ("coin.png")
}

function setup() {

  createCanvas(windowWidth,windowHeight)

  gamestate = "start"

  bg2=createSprite (width/2,height/2)
  bg2.addImage (village)
  bg2.scale = 2.8


  boy = createSprite(100,height-150)
  boy.addAnimation("boyrunning",boyAnimation)
  boy.scale=0.2

  logo = createSprite (width/2,100)
  logo.addImage (logoimg)

  ground = createSprite (width/2,height-70,width,20)
  ground.visible = false

  coinsGroup=createGroup ()
  obstaclesGroup = createGroup ()
}

function draw() {
  background(0)

  if (gamestate == "start") {
    background (bg)
    boy.visible=false
    logo.visible = true
    bg2.visible  = false 

    textAlign (CENTER)
    textSize (40)
    fill ("black")
    text ("Press `enter` to start on your journey",width/2,height/2)

    if (keyDown ("enter")) {
      gamestate = "level1"
    }

  }
  if (gamestate == "level1") {
    background (0)
    boy.visible = true
    logo.visible=false
    bg2.visible = true
    bg2.velocityX = -4 

    boy.collide (ground)
    if (keyDown ("space")&&boy.y>height-200) {
      boy.velocityY = -25
    }
    boy.velocityY +=1.5
    createCoins ()
    
    for (var i=0;i<coinsGroup.length;i++){
      if (boy.isTouching(coinsGroup[i])){
        coinsGroup[i].destroy()
      }
    }
  }

  drawSprites(); 
  
}

function createCoins () {
  if (frameCount%80 == 0  ) {
    coin = createSprite (width,random (height/2,height-200))
    coin.addImage(coinimg)
    coin.velocityX=-4
    coin.scale = 0.2
    coin.lifetime = 1000
    coinsGroup.add (coin)
  }
}