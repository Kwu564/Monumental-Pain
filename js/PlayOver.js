var PlayOver = function(game) {};
PlayOver.prototype = {
   create: function() {
      console.log("PlayOver: create");

      this.background = game.add.image(0, 0, 'obg');
      this.player = game.add.sprite(400, 300, 'hero');
      // add physics
      game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      // more physics later
      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#fff'});
      this.instructions.anchor.set(0.5);
   },
   update: function() {
      // console.log("PlayOver: update"); // Do not use unless update is not running

      if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
         // console.log("up"); // Do not use unless keyboard is not responding
         this.player.body.velocity.y = -150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
         this.player.body.velocity.y = 150;
      } else{
         this.player.body.velocity.y = 0;
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.player.body.velocity.x = 150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
         this.player.body.velocity.x = -150;
      } else {
         this.player.body.velocity.x = 0;
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayPlatform');
      }
   }
}