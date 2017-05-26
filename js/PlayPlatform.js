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
    var player, enemy, swordHit, timer, ground, exit, map, bg, layer1, layer2, layer3;
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
      
      doors = map.objects.doors;
      
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         door = new Door(game,obj.x,obj.y,'collider',0,obj.type,obj.width,obj.height);
         screenEdges.add(door);
      }
      
      screenEdges.alpha = 0;
      screenEdges.setAll('immovable',true);

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      player = new spriteBuild(this.game,1,1,mapObj.spawnX,mapObj.spawnY,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

      //Sword is child sprite of player 
      //swordHit = player.sword;

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);

      //
      //TESTING BLOCK, ENEMY SPAWN
      //

      enemyAxeMan = new axeMan(this.game,1,1,600,300,'axeMan-enemy');
      enemySwordsMan = new axeMan(this.game,1,1,1000,300,'swordsMan-enemy');
      var enemyGroup = this.game.add.group();
      enemyGroup.add(enemyAxeMan);
      enemyGroup.add(enemySwordsMan);
      enemyAxeMan.body.gravity.y = 1500;
      enemyAxeMan.body.collideWorldBounds = true;
      enemySwordsMan.body.gravity.y = 1500;
      enemySwordsMan.body.collideWorldBounds = true;      
      //
      //END TESTING BLOCK, ENEMY SPAWN
      //

      //play music
      song = this.add.audio('battle-song');
      //song.play('', 0, 1, true);
      
      this.instructions = game.add.text(400, 32, " WASD Keys to move, #'s 1 2 for weapons, 3 sheaths weapons, space to attack, \n and reach end of screen to return to world map ", GLOBAL_TEXT_DATA);
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
      if ( game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this.onHitKey == 0 ) {
         game.time.events.add(340,this.swordAttack,this,player.sword,enemy);
         //this.swordAttack(player.sword, enemy);
         this.onHitKey = 1;
      } else {
         this.onHitKey = 0;
      }
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(enemyAxeMan, layer2);
      game.physics.arcade.collide(enemySwordsMan, layer2);
      
      // demonstration of another method of implementing gates
      game.physics.arcade.overlap(player, screenEdges, this.enterDoor, null, this);
   },
   swordAttack: function(swordHit, enemy) {
      let enemyIsHit = game.physics.arcade.overlap(swordHit,enemy);
      
      if ( enemyIsHit ) {
         enemy.kill();
      }
   },
   enterDoor: function() {
      game.sound.stopAll();
      
      canEnter = false;
      player.body.collideWorldBounds = false;
      
      game.camera.fade();
      let timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayOver');
      }, this);
      timer.start();
   },
   render: function() {
      //uncomment to view player collision info in platform
      //game.debug.bodyInfo(player, 64, 64);
      //game.debug.body(player);
   }
}