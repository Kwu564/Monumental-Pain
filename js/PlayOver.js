// This is the state for top down play on the world map.
// If we need multiple overworld states use this as a baseline.
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/*5/7/2017, KINDON
/* Updated to include prefab with instantiated controls for topdown view, described inputs for prefab
as they are currently, if you want to modify prefab, its spriteBuild.js
*/


var PlayOver = function(game) {
   var map, layer1, layer2, layer3, player, wall, town;
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
      
      //WALLMAP SETUP
      map.setCollisionByExclusion([1], true, layer1);
      map.setCollisionByExclusion([3], true, layer2);
      
      town = map.searchTileIndex(3, 0, false, layer2); //Doesn't work
      
      layer1.resizeWorld();
      
      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      //parameters: (this.game,scaleX,scaleY,X position,Y position, asset key)
      player = new spritePlayOver(this.game,400,300,'hero');
      //this line adds the player onto the screen
      playerGroup.add(player);
      
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, .3, .3);

      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#fff'});
      this.instructions.anchor.set(0.5);
   },
   update: function() {
      // console.log("PlayOver: update"); // Do not use unless update is not running
      
      game.physics.arcade.collide(player, layer1);
      game.physics.arcade.collide(player, layer2);
      
      game.physics.arcade.overlap(player, town, this.enterTown, null, this); //Doesn't work
      
      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayPlatform');
      }
   },
   enterTown: function() {
      game.state.start('PlayPlatform'); //doesn't work
   }
}