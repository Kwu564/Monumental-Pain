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
      //TILEMAP SETUP
      if (global_destination === 0){
         map = game.add.tilemap('forestbattle');
      
         map.addTilesetImage('forest-tile','forest-tile');
      
         layer1 = map.createLayer('sky');
         layer2 = map.createLayer('trees');
         layer3 = map.createLayer('Tile Layer 1');
      
      //WALLMAP SETUP
         map.setCollisionByExclusion([], true, layer3);
      }
      
      else if (global_destination === 1){
         this.background = game.add.image(0, 0, 'pbg');
         this.world.width = 1600;
         ground = game.add.sprite(0, 400, 'platform');
         ground.scale.setTo(this.world.width/400, 1);
         game.physics.enable(ground, Phaser.Physics.ARCADE);
         ground.body.allowGravity = false;
         ground.body.immovable = true;
         ground.alpha = 0; // make ground invisible so that player is pbg image
      }
      

      // EXIT GATE
      exit = new spriteBuild(this.game, 1, 6.25, 1550, 200, 'platHero');
      exit.anchor.setTo(0, 0);
      exit.body.allowGravity = false;
      exit.body.immovable = true;
      exit.alpha = 0;

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      player = new spriteBuild(this.game,1,1,400,300,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 600;
      player.body.collideWorldBounds = true;
      //creates sword hitbox using player prefab, scaled and properly positioned
      swordHit = new spriteBuild(this.game,1.4,.2,player.body.position.x+16,player.body.position.y+32,'platHero');
      playerGroup.add(swordHit);

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);
      


      //
      //TESTING BLOCK, ENEMY SPAWN
      //

      enemy = new enemyBuild(this.game,1,1,600,300,'platHero');
      var enemyGroup = this.game.add.group();
      enemyGroup.add(enemy);
      enemy.alpha = .4;
      enemy.body.gravity.y = 900;
      enemy.body.collideWorldBounds = true;
      //
      //END TESTING BLOCK, ENEMY SPAWN
      //

      //play music
      song = this.add.audio('battle-song');
      song.play('', 0, 1, true);
      
      this.instructions = game.add.text(400, 32, "Arrow Keys to move, reach far right to return to world map", {fontSize: "12px", fill: '#000'});
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(300, 32);

   },
   update: function() {
      //keeps swordHitbox on player at correct position
      swordHit.body.position.x = player.body.position.x+16;
      swordHit.body.position.y = player.body.position.y+32;
      //updates collision physics
      enemyisHit = game.physics.arcade.overlap(swordHit,enemy);
      //checks mouse pressed and overlap, kills the enemy if true.
      if(game.input.mousePointer.isDown && this.onHitKey == 0){
         if(enemyisHit){
            enemy.kill();
         }
         this.onHitKey = 1;
      }
      if(game.input.mousePointer.isUp){
         this.onHitKey = 0;
      }
      if (global_destination === 0) {
         game.physics.arcade.collide(player, layer3);
         game.physics.arcade.collide(enemy, layer3);
      }
      else if(global_destination === 1){
         game.physics.arcade.collide(player, ground);
         game.physics.arcade.collide(enemy, ground);
      }
      
      // demonstration of another method of implementing gates
      var hitExit = game.physics.arcade.collide(player, exit);
      if (hitExit){
         
         //stops all sounds
         game.sound.stopAll();
         
         game.state.start('PlayOver');
      }
   }
}