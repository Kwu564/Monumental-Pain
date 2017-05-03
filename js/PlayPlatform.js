// This is the state for platform play in battle and possible towns.

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

      this.player = game.add.sprite(100, 100, 'platHero');
      game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      this.player.body.gravity.y = 600;

      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#000'});
      this.instructions.anchor.set(0.5);

   },
   update: function() {
      hitGround = game.physics.arcade.collide(this.player, this.ground);
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.player.body.velocity.x = 150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
         this.player.body.velocity.x = -150;
      } else {
         this.player.body.velocity.x = 0;
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitGround){
         this.player.body.velocity.y = -350;
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayOver');
      }
   }
}