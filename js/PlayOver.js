// This is the state for top down play on the world map.
// If we need multiple overworld states use this as a baseline.
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/*5/7/2017, KINDON
/* Updated to include prefab with instantiated controls for topdown view, described inputs for prefab
as they are currently, if you want to modify prefab, its spriteBuild.js
*/


var PlayOver = function(game) {
   var map, layer1, layer2, layer3;
};
PlayOver.prototype = {
   create: function() {
      console.log("PlayOver: create");
      //this.background = game.add.image(0, 0, 'obg');
      
      //TILEMAP SETUP
      map = game.add.tilemap('oworld');
      
      map.addTilesetImage('oworld-tile','oworld-tile');
      
      layer1 = map.createLayer('base');
      layer2 = map.createLayer('overlay');
      
      layer1.resizeWorld();
      
      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      //parameters: (this.game,scaleX,scaleY,X position,Y position, asset key)
      var player = new spriteBuild(this.game,1,1,400,300,'hero');
      //this line adds the player onto the screen
      playerGroup.add(player);
      //instantiated controls for players prototype, update
      spriteBuild.prototype.update = function(){
         if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
         // console.log("up"); // Do not use unless keyboard is not responding
            this.body.velocity.y = -150;
         } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
           this.body.velocity.y = 150;
         } else{
           this.body.velocity.y = 0;
         }
         if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.body.velocity.x = 150;
         } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.body.velocity.x = -150;
         } else {
            this.body.velocity.x = 0;
         }
      }

      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#fff'});
      this.instructions.anchor.set(0.5);
},
   update: function() {
      // console.log("PlayOver: update"); // Do not use unless update is not running

      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayPlatform');
      }
   }
}