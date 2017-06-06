// A game over state, called when the player is at zero health or out of lives if we end up implementing that

var GameOver = function(game){};

GameOver.prototype = {
   create: function(){
      console.log("GameOver: create");
      // add background
      game.add.image(0, 0, 'gameOver');
       
      // stop all other sounds so we don't get weird overlap
      game.sound.stopAll();

      // IMPORTANT //
      // Reset all relevent globally tracked variables
      global_x = 592;
      global_y = 768;

      // creates the actual button, this one does not have a background fill
      var menuButton = game.add.text(game.world.centerX, game.world.centerY - 64, " ~Main Menu~ ", {font: "Courier", fontSize: "32px", fill: "#EFEBCE"});

      // set it to the correct position
      menuButton.fixedToCamera = true;
      menuButton.cameraOffset.setTo(game.camera.width/2, game.camera.height - 170);
      menuButton.anchor.set(0.5);

      // allow inputs so it can be used like a button
      menuButton.inputEnabled = true;

      // Governs the color change depending on the position of the mouse
      menuButton.events.onInputOver.add(this.over, this);
      menuButton.events.onInputOut.add(this.out, this);

      // when it is clicked on, return to the main menu
      // with all global variables set to their original values it will be like a new game
      menuButton.events.onInputDown.add(this.menu, this);

      // fade in the camera
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);

      // Dramatic game over music controls go here
      song = this.add.audio('gameover-song');
      if(global_playMusic) song.play('', 0, 1, true);

   },

   over: function(item) {
      // change text color
      item.fill = "red";
   },

   out: function(item) {
      // reset to original text color
      item.fill = "#EFEBCE";
   },

   menu: function(){
      game.state.start('Title');
   }
}