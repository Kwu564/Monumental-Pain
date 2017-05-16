// This is the state for top down play on the world map.
// If we need multiple overworld states use this as a baseline.
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/*5/7/2017, KINDON
/* Updated to include prefab with instantiated controls for topdown view, described inputs for prefab
 * as they are currently, if you want to modify prefab, its spriteBuild.js
 *5/10/2017, JACOB
 * Update so that entering town will start PlayPlatform state
*/

var canEnter = false; // Can someone look into to how to make this variable not global?

var PlayOver = function(game) {
   var map, layer1, layer2, layer3, player, wall, town, townGroup, playerGroup, timer, song;
   var mapData;
};
PlayOver.prototype = {
   create: function() {
      console.log("PlayOver: create");
      //this.background = game.add.image(0, 0, 'obg');
      // TIMER SETUP
      timer = game.time.create(); // this timer will prevent player from immediately re-entering a city by accident
      timer.add(1000, function(){
         console.log('canEnter = true at: '+timer.ms);
         canEnter = true;
      }, this);
      timer.start();
      
      mapData = GLOBAL_MAP_DATA[O_WORLD];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapData.mapKey);
      
      map.addTilesetImage(mapData.setKey,mapData.setKey);
      
      layer1 = map.createLayer('base');
      layer2 = map.createLayer('overlay');
      
      //WALLMAP SETUP
      map.setCollisionByExclusion([1], true, layer1);
      map.setCollisionByExclusion([3], true, layer2);
      
      layer1.resizeWorld();
      
      /*// town = map.searchTileIndex(3, 0, false, layer2); //Doesn't work
      townGroup = this.game.add.group();
      townGroup.enableBody = true;
      town = map.createFromTiles([3], null, 'hero', layer2, townGroup); // Uses hero because it is the exact size of a tile
      townGroup.alpha = 0;
      townGroup.setAll('body.immovable', true);
      */

      //CREATE DOORS
      townGroup = this.game.add.group();
      townGroup.enableBody = true;
      
      var doors = map.objects.towns;
      console.log(doors);
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         town = new Door(game,obj.x,obj.y,'hero',0,obj.type);
         townGroup.add(town);
      }
      
      townGroup.alpha = 0;
      townGroup.setAll('body.immovable', true);
      
      //PREFAB SETUP
      playerGroup = this.game.add.group();
      
      player = new spritePlayOver(this.game,mapData.retX,mapData.retY,'hero');
      //this line adds the player onto the screen
      playerGroup.add(player);
      
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, .3, .3);
      
      //play music
      song = this.add.audio('oworld-song');
      //song.play('', 0, 1, true);

      this.instructions = game.add.text(400, 32, "Arrow Keys to move, enter town to see a new perspective", {fontSize: "12px", fill: '#fff'});
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(300, 32);
   },
   update: function() {
      // console.log("PlayOver: update"); // Do not use unless update is not running

      //global_destination = player.y>350 ? 0 : 1;
      
      game.physics.arcade.collide(player, layer1);
      game.physics.arcade.collide(player, layer2);
      
      game.physics.arcade.overlap(player, townGroup, this.enterTown, null, this);
      //if(canEnter){ game.physics.arcade.overlap(player, townGroup, this.enterTown, null, this);}
      //else {game.physics.arcade.collide(player, townGroup);}
      
      
      // Uncomment below for quick state switching
      /*if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayPlatform');
      }*/
   },
   enterTown: function(player, townGroup) {
      /*global_x = player.x;
      global_y = player.y;
      canEnter = false; // reset town entrence delay
      */
      
      global_destination = townGroup.destination;
      
      //stops all sounds
      game.sound.stopAll();
      
      game.state.start('PlayPlatform');
   }
}