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
   var map, layer1, layer2, layer3, player, wall, town, townGroup, playerGroup, timer, song, textObj, spawnGroup, foeGroup;
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
      
      layer1 = map.createLayer('water');
      layer2 = map.createLayer('base');
      layer3 = map.createLayer('overlay');
      
      //WALLMAP SETUP
      map.setCollisionByExclusion([6,21,24], true, layer2);
      map.setCollisionByExclusion([1,2,3,5,17,18,66], true, layer3);
      
      layer1.resizeWorld();

      //CREATE DOORS
      townGroup = this.game.add.group();
      townGroup.enableBody = true;
      
      var doors = map.objects.towns;

      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         town = new Door(game,obj.x,obj.y,'collider',0,obj.type,obj.width,obj.height,obj.properties.retX,obj.properties.retY);
         townGroup.add(town);
      }
      
      townGroup.alpha = 0;
      townGroup.setAll('body.immovable', true);
      
      //ENEMY SPAWNS
      spawnGroup = this.game.add.group();
      spawnGroup.enableBody = true;
      
      // this is the group that stores the actual enemy sprites
      foeGroup = this.game.add.group();
      foeGroup.enableBody = true;
      
      var foemap = map.objects.foemap;
      //enemySpots has the locations of individual enemies in Tiled
      //info gets stored in each foemapBuild so they can create their own
      //enemies
      var enemySpots = map.objects.enemySpots;
      
      for(let i = 0; i < foemap.length; i++) {
         let obj = foemap[i];
         
         let zone = new foemapBuild(game,obj,enemySpots);
         spawnGroup.add(zone);
      }
      
      spawnGroup.alpha = .1;
      spawnGroup.setAll('body.immovable', true);
      
      //PREFAB SETUP
      playerGroup = this.game.add.group();
      
      player = new spritePlayOver(this.game,global_x,global_y,'hero');
      //this line adds the player onto the screen
      playerGroup.add(player);
      
      game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, .3, .3);
      
      //play music
      song = this.add.audio('oworld-song');
      if(global_playMusic) song.play('', 0, 1, true);
      /*
      this.instructions = game.add.text(400, 32, " WASD Keys to move, 'T' to see text box, enter town to see a new perspective ", GLOBAL_TEXT_STYLE);
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(game.camera.width/2, 32);
      */
      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
   },
   update: function() {
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(player, layer3);
      
      game.physics.arcade.overlap(player, townGroup, this.enterTown, null, this);
      game.physics.arcade.overlap(player, spawnGroup, this.spawnFoe, null, this);
      
      //Foe collisions, if any foes exist at the time
      if(foeGroup.children.length > 0) {
         game.physics.arcade.collide(foeGroup, layer2);
         game.physics.arcade.collide(foeGroup, layer3);
         
         game.physics.arcade.overlap(player,foeGroup,this.enterBattle,null,this);
      }

      // This is a contrived way to put a textbox onscreen until we have an npc to talk to.
      if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
         textObj = TEXT_DATA[OWORLD_TEXTBOX_TEST];
         textBox(game, game.camera.width/2 , 64, 0.5, 0, !NAVIGABLE, textObj);
      }
      if(game.input.keyboard.justPressed(Phaser.Keyboard.ESC) && canPause){
         pauseMenu(game);
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
   },
   spawnFoe: function(player, foemap) {
      if(foemap.active === false && canEnter) {
         
         foemap.active = true;
      
         for(let i = 0; i < foemap.size; i++) {
            let foe = new oworldEnemy(game,foemap.enemySpots[i],foemap);
         
            foeGroup.add(foe);
            foemap.activeFoes++;
         }
         
      }
   },
   enterBattle: function(player, foe) {
      global_destination = foe.destination;
      global_x = player.body.position.x;
      global_y = player.body.position.y;
      
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
   }
}