// pauseMenu.js
// This contains the pause menu which allows you to stop the game,
// Return to the title menu,
// Start and stop the music

var pauseMenu = function(game){
   console.log("pauseMenu create");
   canPause = false;

   // Stop the music
   game.sound.stopAll();
   // Then create a list of buttons
   var centerX = game.camera.width/2;
   var centerY = game.camera.height/2;

   // resume game
   var resumeButton = game.add.text(0, 0, " ~Resume~ ", BUTTON_TEXT_STYLE);
   resumeButton.anchor.set(0.5);
   resumeButton.fixedToCamera = true;
   resumeButton.cameraOffset.setTo(centerX, centerY -128);

   // return to title state
   var titleButton = game.add.text(0, 0, " ~Main Menu~ ", BUTTON_TEXT_STYLE);
   titleButton.anchor.set(0.5);
   titleButton.fixedToCamera = true;
   titleButton.cameraOffset.setTo(centerX, centerY);

   // stop music
   var musicButton = game.add.text(0, 0, global_playMusic? " ~Turn Music Off~ ":" ~Turn Music On~ ", BUTTON_TEXT_STYLE);
   musicButton.anchor.set(0.5);
   musicButton.fixedToCamera = true;
   musicButton.cameraOffset.setTo(centerX, centerY + 128);
/*
   var helpButton = game.add.text(0, 0, " ~Help~ ", BUTTON_TEXT_STYLE);
   helpButton.anchor.set(0.5);
   helpButton.fixedToCamera = true;
   helpButton.cameraOffset.setTo(centerX, centerY + 160);
   */

   // Allow input from player
   titleButton.inputEnabled =  true;
   musicButton.inputEnabled =  true;
   resumeButton.inputEnabled = true;
//   helpButton.inputEnabled =   true;

   ////////////////////////////
   // I have no idea why,    //
   // but I could only get   //
   // the following to work  //
   // with in line functions //
   ////////////////////////////
   game.paused = true;
   // hovering the mouse over the mouse button changes the text color
   titleButton.events.onInputOver.add(function(item){item.fill = "#EFEBCE";}, this);
   musicButton.events.onInputOver.add(function(item){item.fill = "#EFEBCE";}, this);
   resumeButton.events.onInputOver.add(function(item){item.fill = "#EFEBCE";}, this);
//   helpButton.events.onInputOver.add(function(item){item.fill = "#EFEBCE";}, this);

   // moving the mouse off the button will change it back
   titleButton.events.onInputOut.add(function(item){item.fill = BUTTON_TEXT_STYLE.fill;}, this);
   musicButton.events.onInputOut.add(function(item){item.fill = BUTTON_TEXT_STYLE.fill;}, this);
   resumeButton.events.onInputOut.add(function(item){item.fill = BUTTON_TEXT_STYLE.fill;}, this);
//   helpButton.events.onInputOut.add(function(item){item.fill = BUTTON_TEXT_STYLE.fill;}, this);

   // if the main menu button is pushed
   titleButton.events.onInputDown.add(function(){
      game.paused = false;
      canPause = true;
      game.state.start('Title');
   }, this);

   // if the music button is pushed
   musicButton.events.onInputDown.add(function(item){
      // first switch whether music is on or off
      global_playMusic = !global_playMusic;
      if(global_playMusic){ 
         item.text = " ~Turn Music Off~ ";
         song.play('', 0, 1, true);
      }
      else item.text = " ~Turn Music On~ ";
   }, this);

   // if the resume button is pushed
   resumeButton.events.onInputDown.add(function(){
      this.resumeButton.destroy();
      this.musicButton.destroy();
      this.titleButton.destroy();
//      this.helpButton.destroy();
      if(global_playMusic) song.play('', 0, 1, true);
      canPause = true;
      this.game.paused = false;
   }, {resumeButton: resumeButton, musicButton: musicButton, titleButton: titleButton, /*helpButton: helpButton,*/ game: game});
   /*
   helpButton.events.onInputDown.add(function() {
      // creates a text box to explain the game
      this.game.paused = false;
      var textObj = TEXT_DATA[HELP];
      textBox(this.game, this.centerX, this.centerY, 0.5, 0.5, NAVIGABLE, textObj);
      var timer = game.time.create();
      timer.add(380, function() {
         this.game.paused = true;
      }, this);
      timer.start();
      
   }, {game: game});*/

}