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
    var player, enemy, swordHit, ground, exit, map, layer1, layer2, layer3;
    var onHitKey = 0;
};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      
      //acces the appropriate index of GLOBAL_MAP_DATA based on the
      //global variable set by the Door in Overworld state
      
      var mapObj = GLOBAL_MAP_DATA[global_destination];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapObj.mapKey);
      
      map.addTilesetImage(mapObj.setKey, mapObj.setKey);
      
      layer1 = map.createLayer('bg');
      layer2 = map.createLayer('ground');
      layer3 = map.createLayer('passable');
      
      map.setCollisionByExclusion([],true,layer2);
      
      layer1.resizeWorld();

      // EXIT GATE
      exit = this.add.sprite(1550,200,'platHero');
      exit.scale.set(1,6.25);
      game.physics.arcade.enable(exit);
      exit.anchor.setTo(0, 0);
      exit.body.allowGravity = false;
      exit.body.immovable = true;
      exit.alpha = .02;

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      player = new spriteBuild(this.game,1,1,mapObj.spawnX,mapObj.spawnY,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

      //Sword is child sprite of player 
      //swordHit = player.sword;

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);
      
      
      //SET RETURN GLOBALS
      //global_x = mapObj.retX;
      //global_y = mapObj.retY;

      //
      //TESTING BLOCK, ENEMY SPAWN
      //

      enemy = new enemyBuild(this.game,1,1,600,300,'platHero');
      var enemyGroup = this.game.add.group();
      enemyGroup.add(enemy);
      enemy.alpha = .4;
      enemy.body.gravity.y = 1500;
      enemy.body.collideWorldBounds = true;
      //
      //END TESTING BLOCK, ENEMY SPAWN
      //

      //play music
      song = this.add.audio('battle-song');
      //song.play('', 0, 1, true);
      
      this.instructions = game.add.text(400, 32, "WASD Keys to move, #'s 1 2 for weapons, 3 sheaths weapons, space to attack, and reach end of screen to return to world map", {fontSize: "12px", fill: '#000'});
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(400, 32);

   },
   update: function() {
      
      //updates collision physics
      //checks mouse pressed and overlap, kills the enemy if true.
      if ( game.input.mousePointer.isDown && this.onHitKey == 0 ) {
         this.swordAttack(player.sword, enemy);
         this.onHitKey = 1;
      } else {
         this.onHitKey = 0;
      }
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(enemy, layer2);
      
      // demonstration of another method of implementing gates
      var hitExit = game.physics.arcade.collide(player, exit);
      if ( hitExit ){
         
         //stops all sounds
         game.sound.stopAll();
         
         game.state.start('PlayOver');
      }
   },
   swordAttack: function(swordHit, enemy) {
      let enemyIsHit = game.physics.arcade.overlap(swordHit,enemy);
      
      if ( enemyIsHit ) {
         enemy.kill();
      }
   }
}