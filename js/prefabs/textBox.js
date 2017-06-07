// This is a prefab for creating all text and textboxes in the game
// this has a built in feature so that whenever it is called
// it will pause all other gameplay until it is dismissed

var textBox = function(game, x, y, anchorX, anchorY, navigable, textDataObj){
   console.log("textBox.create");
   this.counter = 0;
   this.text = game.add.text(x, y, textDataObj.text[counter], textDataObj.style);
   this.text.anchor.set(anchorX, anchorY);
   this.text.fixedToCamera = true;
   this.text.cameraOffset.setTo(x, y);
   //console.log("textBox placed");
   canPause = false;
   if(!game.paused) game.paused = true;
   
   window.onkeydown = function(event){
      var keyCode = event.keyCode || event.which;
      // console.log("window.onkeyup: entered");
      if(keyCode === Phaser.Keyboard.E){
         //console.log("window.onkeyup: executing");
         if(counter < textDataObj.text.length-1){ // I'm not completely sure why the minus one is necessary but it is
            counter++;
            this.text.text = textDataObj.text[counter];
         }
         else {
            this.text.destroy();
            counter++;
            game.paused = false;
            canPause = true;
         }
      }
      else if(keyCode === Phaser.Keyboard.ESC && navigable){
            this.text.destroy();
            counter++;
            game.paused = false;
            canPause = true;
      }
      else if(keyCode === Phaser.Keyboard.Q && navigable){
         if(counter > 0){
            counter--;
            this.text.text = textDataObj.text[counter];
         }
      }
   }

}
