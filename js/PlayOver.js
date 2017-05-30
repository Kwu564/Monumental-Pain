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

var canEnter; // Can someone look into to how to make this variable not global?
//A: No, it's global so that the player prefab can use it

var PlayOver = function(game) {
   var map, layer1, layer2, layer3, player, wall, town, townGroup, playerGroup, timer, song, textObj;
};
PlayOver.prototype = {
   create: function() {
      console.log("PlayOver: create");
      
      //fade camera instantly, makes screen black while creating things
      game.camera.fade(0x000000, 1);
      
      canEnter = false;
      // TIMER SETUP
      timer = game.time.create(); // this timer will prevent player from immediately re-entering a city by accident
      //timer repurposed to prevent player from moving immediately after leaving town
      timer.add(600, function(){
         console.log('canEnter = true at: '+timer.ms);
         canEnter = true;
      }, this);
      timer.start();
      
      var mapData = GLOBAL_MAP_DATA[O_WORLD];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapData.mapKey);
      
      map.addTilesetImage(mapData.setKey,mapData.setKey);
      
      layer1 = map.createLayer('base');
      layer2 = map.createLayer('overlay');
      
      //WALLMAP SETUP
      map.setCollisionByExclusion([1,6,21], true, layer1);
      map.setCollisionByExclusion([3,5], true, layer2);
      
      layer1.resizeWorld();

      //CREATE DOORS
      townGroup = this.game.add.group();
      townGroup.enableBody = true;
      
      var doors = map.objects.towns;
      console.log(doors);
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         town = new Door(game,obj.x,obj.y,'collider',0,obj.type,32,32);
         townGroup.add(town);
      }
      
      townGroup.alpha = .5;
      townGroup.setAll('body.immovable', true);
      
      //PREFAB SETUP
      playerGroup = this.game.add.group();
      
      player = new spritePlayOver(this.game,global_x,global_y,'hero');
      //this line adds the player onto the screen
      playerGroup.add(player);
      
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, .3, .3);
      
      //play music
      song = this.add.audio('oworld-song');
      //song.play('', 0, 1, true);

      this.instructions = game.add.text(400, 32, " WASD Keys to move, 'T' to see text box, enter town to see a new perspective ", GLOBAL_TEXT_STYLE);
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(game.camera.width/2, 32);
      
      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
   },
   update: function() {
      game.physics.arcade.collide(player, layer1);
      game.physics.arcade.collide(player, layer2);
      
      game.physics.arcade.overlap(player, townGroup, this.enterTown, null, this);

      // This is a contrived way to put a textbox onscreen until we have an npc to talk to.
      if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
         textObj = TEXT_DATA[OWORLD_TEXTBOX_TEST];
         textBox(game, game.camera.width/2 , 64, textObj);
      }
   },
   enterTown: function(player, townGroup) {
      global_destination = townGroup.destination;
      global_x = townGroup.retX;
      global_y = townGroup.retY;
      
      canEnter = false; //prevents player from moving
      player.body.velocity.set(0,0);
      
      //stops all sounds
      game.sound.stopAll();
      
      game.camera.fade();
      timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
      
      //game.state.start('PlayPlatform');
   }
}