// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
Updated to include prefab with instantiated controls for sideview, described inputs for prefab
as they are currently, if you want to modify prefab, its spriteBuild.js. THIS DOES NOT CURRENTLY WORK WITH 
JUMPING, I had issues setting up collision with the prefab
*/

var PlayPlatform = function(game) {};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      this.background = game.add.image(0, 0, 'pbg');

      this.ground = game.add.sprite(0, 400, 'platform');
      this.ground.scale.setTo(2,1);
      game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      this.ground.body.immovable = true;
      this.ground.alpha = 0; // make ground invisible so that player is pbg image

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      var player = new spriteBuild(this.game,1,1,400,300,'platHero');
      playerGroup.add(player);
      spriteBuild.prototype.update = function(){
         //this is still iffy, but instantiated controls for platformer
         //hitGround = game.physics.arcade.collide(this.body, this.ground);
         if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.body.velocity.x = 150;
         } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.body.velocity.x = -150;
         } else {
            this.body.velocity.x = 0;
         }

         if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitGround){
         this.body.velocity.y = -350;
         }
      }
      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#000'});
      this.instructions.anchor.set(0.5);

   },
   update: function() {
      //unable to put this line into prefab, still figuring it out
      hitGround = game.physics.arcade.collide(this.player, this.ground);
      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayOver');
      }
   }
}