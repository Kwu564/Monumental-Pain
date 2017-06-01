// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
Updated to include prefab with instantiated controls for sideview, described inputs for prefab
as they are currently, if you want to modify prefab, its spriteBuild.js. THIS DOES NOT CURRENTLY WORK WITH 
JUMPING, I had issues setting up collision with the prefab
*/
/* 5/9/2017, KIEFER
Fixed the collision issues. Added player and ground as vars within the scope of PlayPlatform, so the hitGround check can find both objects. I also added gravity, because that wasn't implemented before.
*/
/* 5/10/2017
Added invisible gate at far left of world to return to the overworld
*/

var PlayPlatform = function(game) {
    var player, timer, map, bg, layer1, layer2, layer3, enemyGroup, textObj;
    var onHitKey = 0;
};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      timer = game.time.create();
      
      //fades camera instantly, black while creating things
      game.camera.fade(0x000000, 1);
      
      //acces the appropriate index of GLOBAL_MAP_DATA based on the
      //global variable set by the Door in Overworld state
      
      var mapObj = GLOBAL_MAP_DATA[global_destination];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapObj.mapKey);
      
      map.addTilesetImage(mapObj.setKey, mapObj.setKey);
      
      bg = this.add.sprite(0,0,'kevn-bg'); //static bg
      bg.fixedToCamera = true;
      layer1 = map.createLayer('bg');
      layer2 = map.createLayer('ground');
      layer3 = map.createLayer('passable');
      
      map.setCollisionByExclusion([],true,layer2);
      
      layer2.resizeWorld();

      // EXIT GATE
      screenEdges = this.game.add.group();
      screenEdges.enableBody = true;
      
      edges = map.objects.edges;
      
      // Cycle through each object in the "edges" layer of the json file
      // create an invisible Door object in the world for each
      for(let i = 0; i < edges.length; i++) {
         let obj = edges[i];
         
         door = new Door(game,obj.x,obj.y,'collider',0,obj.type,obj.width,obj.height);
         screenEdges.add(door);
      }
      
      screenEdges.alpha = 0;
      screenEdges.setAll('immovable',true);
      
      // DOORS
      doorSpots = this.game.add.group();
      doorSpots.enableBody = true;
      
      doors = map.objects.doors;
      
      // Do the same as the edges, but with the doors
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         door = new Door(game,obj.x,obj.y,'collider',0,obj.type,obj.width,obj.height);
         doorSpots.add(door);
      }
      
      doorSpots.alpha = 0;
      doorSpots.setAll('immovable',true);

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      
      let spawnLayer = map.objects.spawn;
      let playerX = spawnLayer[0].x;
      let playerY = spawnLayer[0].y;
      
      player = new spriteBuild(this.game,1,1,playerX,playerY,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);

      //
      //TESTING BLOCK, NPC SPAWN
      //      

      npcOverallDude = new overallDude(this.game,1,1,700,300,'overallDude-npc');
      npcSkirtDudette = new skirtDudette(this.game,1,1,900,300,'skirtDudette-npc');

      npcGroup = this.game.add.group();

      npcGroup.add(npcOverallDude);
      npcGroup.add(npcSkirtDudette);

      npcOverallDude.body.gravity.y = 1500;
      npcOverallDude.body.collideWorldBounds = true;

      npcSkirtDudette.body.gravity.y = 1500;
      npcSkirtDudette.body.collideWorldBounds = true;

      //
      //END TESTING BLOCK, NPC SPAWN
      //

      //
      //TESTING BLOCK, ENEMY SPAWN
      //

      enemyAxeMan = new axeMan(this.game,1,1,600,300,'axeMan-enemy');
      enemySwordsMan = new axeMan(this.game,1,1,1000,300,'swordsMan-enemy');
      enemyLesserDemon1 = new lesserDemon(this.game,1,1,900,300,'lesserDemon');
      enemyLesserDemon2 = new lesserDemon(this.game,1,1,800,300,'lesserDemon');

      enemyGroup = this.game.add.group();

      enemyGroup.add(enemyAxeMan);
      enemyGroup.add(enemySwordsMan);
      enemyGroup.add(enemyLesserDemon1);
      enemyGroup.add(enemyLesserDemon2);

      enemyAxeMan.body.gravity.y = 1500;
      enemyAxeMan.body.collideWorldBounds = true;

      enemySwordsMan.body.gravity.y = 1500;
      enemySwordsMan.body.collideWorldBounds = true;

      enemyLesserDemon1.body.gravity.y = 1500;
      enemyLesserDemon1.body.collideWorldBounds = true;

      enemyLesserDemon2.body.gravity.y = 1500;
      enemyLesserDemon2.body.collideWorldBounds = true;

      //
      //END TESTING BLOCK, ENEMY SPAWN
      //

      //play music
      song = this.add.audio('battle-song');
      //song.play('', 0, 1, true);

      this.instructions = game.add.text(400, 32, " WASD Keys to move, #'s 1 2 for weapons, 3 sheaths weapons, space to attack, \n and reach end of screen to return to world map, T to see text box ", GLOBAL_TEXT_STYLE);
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(400, 32);
      
      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
      
      //allow player to move
      canEnter = true;

   },
   update: function() {      
      //updates collision physics
      //checks mouse pressed and overlap, kills the enemy if true.
      if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) && this.onHitKey == 0 ) {
         game.physics.arcade.overlap(player.sword,enemyGroup,this.swordAttack,null,this);
         //game.time.events.add(340,this.swordAttack,this,player.sword,enemyGroup);
         this.onHitKey = 1;
      } else {
         this.onHitKey = 0;
      }
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(enemyGroup, layer2);
      game.physics.arcade.collide(npcGroup, layer2);

      // Walking off the edge of the screen to enter Overworld
      game.physics.arcade.overlap(player, screenEdges, this.enterOver, null, this);
      
      // Using doors on map
      if(game.input.keyboard.justPressed(Phaser.Keyboard.E)) {
         game.physics.arcade.overlap(player, doorSpots, this.enterDoor, null, this);
      }
      // Contrived Text box 2
      if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
         textObj = TEXT_DATA[PLATWORLD_TEXTBOX_TEST];
         textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, !NAVIGABLE, textObj);
      }
   },
   swordAttack: function(sword, enemy) {
      //Add knockback, etc. here
      player.status = 'attacking';
      enemy.destroy();
   },
   enterDoor: function(player, door) {
      game.sound.stopAll();
      
      global_destination = door.destination;
      
      canEnter = false; // removes player control 
      player.body.velocity.x = 0; //stops player
      
      game.camera.fade();
      let timer = game.time.create();
      timer.add(380, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
   },
   enterOver: function() {
      game.sound.stopAll();
      
      canEnter = false; // removes player control 
      player.body.collideWorldBounds = false; //lets player walk offscreen
      
      game.camera.fade();
      let timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayOver');
      }, this);
      timer.start();
   },
   render: function() {
      //uncomment to view player collision info in platform
      game.debug.bodyInfo(player, 64, 64);
      game.debug.body(player);
   }
}