// This is the title state it will contain
// -- A start button to begin the game
// -- A help button to explain the controls of the game

var Title = function(game){
   var playButton, helpButton;
};

Title.prototype = {
   create: function() {
      console.log('Title: create');

      // Kevn background is being used as a placeholder image
      game.add.image(0,0, 'kevn-bg');

      let text = game.add.text(game.world.centerX, 80, "Monumental Pain", {font: 'Courier', fontSize: '64px', align: 'center'});
      text.anchor.set(0.5);

      // make the buttons appear and asign them variables
      playButton = game.add.text(game.world.centerX, game.world.centerY - 64, " ~Play~ ", BUTTON_TEXT_STYLE);
      helpButton = game.add.text(game.world.centerX, game.world.centerY + 64, " ~Help~ ", BUTTON_TEXT_STYLE);
      musicButton = game.add.text(0, 0, global_playMusic? " ~Turn Music Off~ ":" ~Turn Music On~ ", BUTTON_TEXT_STYLE);



      // Double check that text appears in the right area of the camera
      text.fixedToCamera = true;
      text.cameraOffset.setTo(game.camera.width/2, 80);
      playButton.fixedToCamera = true;
      playButton.cameraOffset.setTo(game.camera.width/2, game.camera.height/2 - 96);
      helpButton.fixedToCamera = true;
      helpButton.cameraOffset.setTo(game.camera.width/2, game.camera.height/2 + 32);
      musicButton.fixedToCamera = true;
      musicButton.cameraOffset.setTo(game.camera.width/2, game.camera.height/2 + 160);

      // set anchors so that they appear centered
      playButton.anchor.set(0.5);
      helpButton.anchor.set(0.5);
      musicButton.anchor.set(0.5);

      // Allow input so that they can be used as buttons
      playButton.inputEnabled = true;
      helpButton.inputEnabled = true;
      musicButton.inputEnabled = true;

      // when the mouse hovers over either button, it will call a function to change the background color
      playButton.events.onInputOver.add(this.over, this);
      helpButton.events.onInputOver.add(this.over, this);
      musicButton.events.onInputOver.add(this.over, this);

      // moving the mouse off the button will change it back
      playButton.events.onInputOut.add(this.out, this);
      helpButton.events.onInputOut.add(this.out, this);
      musicButton.events.onInputOut.add(this.out, this);

      // if the player clicks on the help button, go to function this.help
      helpButton.events.onInputDown.add(this.help, this);

      // if the player clicks on the play button go to function this.play
      playButton.events.onInputDown.add(this.play, this);

      // if the player clicks the music button go to function this.music
      musicButton.events.onInputDown.add(this.music, this);
   },

   over: function(item) {
      // change text color
      item.fill = "#EFEBCE";
   },

   out: function(item) {
      // reset to original text color
      item.fill = BUTTON_TEXT_STYLE.fill;
   },

   help: function() {
      // creates a text box to explain the game

      var textObj = TEXT_DATA[HELP];
      textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, NAVIGABLE, textObj);
   },

   music: function(item) {
      // toggles music and changes label
      global_playMusic = !global_playMusic;
      if(global_playMusic){ 
         item.text = " ~Turn Music Off~ ";
      }
      else item.text = " ~Turn Music On~ ";
   },

   play: function() {
      // start the playOver state
      game.state.start('PlayOver');
   }
}