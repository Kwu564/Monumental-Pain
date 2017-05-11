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
    var player, ground, exit;
};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      this.background = game.add.image(0, 0, 'pbg');
      this.world.width = 1600;

      ground = game.add.sprite(0, 400, 'platform');
      ground.scale.setTo(this.world.width/400, 1);
      game.physics.enable(ground, Phaser.Physics.ARCADE);
      ground.body.immovable = true;
      ground.alpha = 0; // make ground invisible so that player is pbg image

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
      
      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);
      
      this.instructions = game.add.text(400, 32, "Arrow Keys to move, reach far right to return to world map", {fontSize: "16px", fill: '#000'});
      this.instructions.anchor.set(0.5);

   },
   update: function() {
      game.physics.arcade.collide(player, ground);
      game.physics.arcade.collide(player, ground);
      // demonstration of another method of implementing gates
      var hitExit = game.physics.arcade.collide(player, exit);
      if (hitExit){
         game.state.start('PlayOver');
      }
      /*if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayOver');
      }*/
   }
}