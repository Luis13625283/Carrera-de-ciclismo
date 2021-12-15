class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale = 0.1;
    car1.rotation=-90;
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.scale = 0.1;
    car2.rotation=-90;
    car3 = createSprite(800,200);
    car3.addImage("car3",car3_img);
    car3.scale = 0.1;
    car3.rotation=-90;
    car4 = createSprite(900,200);
    car4.addImage("car4",car4_img);
    car4.scale = 0.1;
    car4.rotation=-90;

    arbol = createSprite(100,200);
    arbol.addImage("arbol",arbol_img);
    arbol.scale = 0.5;
    arbol.rotation=-90;

    ninos = createSprite(100,10);
    ninos.addImage("ninos",ninos_img);
    ninos.scale = 0.5;
    ninos.rotation=-90;

    bobEsponja = createSprite(1300,10);
    bobEsponja.addImage("bobEsponja",bobEsponja_img);
    bobEsponja.scale = 0.5;
    bobEsponja.rotation=90;

    estrellas = createSprite(1300,100);
    estrellas.addImage("estrellas",estrellas_img);
    estrellas.scale = 0.5;
    estrellas.rotation=-90;

    gameOver = createSprite( 650,-displayHeight*4,displayWidth, displayHeight*5);
    gameOver.addImage("gameOver",gameOverImg);
    gameOver.scale = 0.8;

    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background(rgb(198,135,103));
      //pista
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 175 ;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("cyan");
          ellipse(x,y,80,80);
          cars[index - 1].shapeColor = "blue";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1;
      Player.updateCarsAtEnd(player.rank);
    }
    
    drawSprites();
  }

  end(){
    gameOver.visible = true;
    console.log("Juego Terminado");
    console.log(player.rank);
  }
}