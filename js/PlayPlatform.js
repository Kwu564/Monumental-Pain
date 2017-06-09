// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
Updated to include prefab with instantiated controls for sideview, described inputs for prefab
as they are currently, if you want to modify prefab, its spriteBuild.js. THIS DOES NOT CURRENTLY WORK WITH 
JUMPING, I had issues setting up collision with the prefab
*/
/* 5/9/2017, KIEFER
Fixed the collision issues. Added player and ground as vars within the scope of PlayPlatform, so the hitGround check can find both objects. I also added gravity, because that wasn't implemented before.
*/
/* 5/10/2017
Added invisible gate at far left of world to return to the overworld
*/
var canShoot = true;
var spawnBoss = false;

var PlayPlatform = function(game) {
    var player, timer, map, bg, layer1, layer2, layer3, enemyGroup, bossGroup, textObj, bulletGroup, killZone, deathExists, playerHealthText, playerHealthBar, playerHealthBarBack, eventGroup, checkEvents, mapObj;
    var onHitKey = 0;
};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      timer = game.time.create();
      
      //fades camera instantly, black while creating things
      game.camera.fade(0x000000, 1);

      //acces the appropriate index of GLOBAL_MAP_DATA based on the
      //global variable set by the Door in Overworld state
      
      mapObj = GLOBAL_MAP_DATA[global_destination];
      
      //TILEMAP SETUP
      map = game.add.tilemap(mapObj.mapKey);
      
      map.addTilesetImage(mapObj.setKey, mapObj.setKey);
      
      bg = this.add.sprite(0,0,mapObj.bgKey); //static bg
      bg.fixedToCamera = true;
      layer1 = map.createLayer('bg');
      layer2 = map.createLayer('ground');
      layer3 = map.createLayer('passable');
      
      map.setCollisionByExclusion([],true,layer2);
      
      layer2.resizeWorld();

      // EXIT GATE
      screenEdges = this.game.add.group();
      screenEdges.enableBody = true;
      
      edges = map.objects.edges;
      
      // Cycle through each object in the "edges" layer of the json file
      // create an invisible Door object in the world for each
      for(let i = 0; i < edges.length; i++) {
         let obj = edges[i];
         
         door = new Door(game,obj.x,obj.y,obj.type,obj.width,obj.height);
         screenEdges.add(door);
      }
      
      screenEdges.alpha = 0;
      screenEdges.setAll('immovable',true);
      
      // KILL ZONE
      deathExists = false;
      
      if(map.objects.death != undefined) {
         deathExists = true; //Tell the game to check for overlaps in update
         
         killZone = this.game.add.group();
         killZone.enableBody = true;
         
         var obj = map.objects.death[0];
         var death = new Door(game,obj.x,obj.y,obj.type,obj.width,obj.height);
         killZone.add(death);
         killZone.alpha = 0;
         killZone.setAll('immovable',true);
      }
      
      // DOORS
      doorSpots = this.game.add.group();
      doorSpots.enableBody = true;
      
      doors = map.objects.doors;
      
      // Do the same as the edges, but with the doors
      for(let i = 0; i < doors.length; i++) {
         let obj = doors[i];
         
         door = new Door(game,obj.x,obj.y,obj.type,obj.width,obj.height);
         doorSpots.add(door);
      }
      
      doorSpots.alpha = 0;
      doorSpots.setAll('immovable',true);
      
      // EVENTS
      checkEvents = false; //by default
      
      if(map.objects.events != undefined) {
         //whether there are events to check overlaps for
         checkEvents = true;
         eventGroup = this.game.add.group();
         eventGroup.enableBody = true;
         
         for(let i = 0; i < map.objects.events.length; i++) {
            let obj = map.objects.events[i];
            
            let event = new Event(game,obj.x,obj.y,obj.width,obj.height,obj.type);
            eventGroup.add(event);
         }
         
         eventGroup.alpha = 1;
         eventGroup.setAll('immovable',true);
      }

      //PREFAB SETUP
      var playerGroup = this.game.add.group();
      
      let spawnLayer = map.objects.spawn;
      let playerX = spawnLayer[0].x;
      let playerY = spawnLayer[0].y;
      
      player = new spriteBuild(this.game,1,1,playerX,playerY,'platHero');
      playerGroup.add(player);
      player.body.gravity.y = 1500;
      player.body.collideWorldBounds = true;

      game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER, .3, .3);

      // ENEMY SPAWNING
      enemyGroup = this.game.add.group();
      bossGroup = this.game.add.group();
      
      var enemyLayer = map.objects.enemies;
      
      for(let i = 0; i < enemyLayer.length; i++) {
         let obj = enemyLayer[i];
         
         let enemy;
         if(obj.name === 'axeMan') {
            enemy = new axeMan(this.game,1,1,obj.x,obj.y,'axeMan-enemy');
         } else if(obj.name === 'swordsMan') {
            enemy = new axeMan(this.game,1,1,obj.x,obj.y,'swordsMan-enemy');
         } else if(obj.name === 'lesserDemon') {
            enemy = new lesserDemon(this.game,1,1,obj.x,obj.y,'lesserDemon');
         } else if(obj.name === 'darkWizard') {
            enemy = new wizardBuild(this.game,1,1,obj.x,obj.y,'darkWizard');
         }
         enemyGroup.add(enemy);
      }
      
      enemyGroup.setAll('body.gravity.y',1500);
      enemyGroup.setAll('body.collideWorldBounds',true);
      bossGroup.setAll('body.gravity.y',1500);
      bossGroup.setAll('body.collideWorldBounds',true);
      
      // NPC SPAWNING
      npcGroup = this.game.add.group();
      
      var npcLayer = map.objects.npcs;
      
      if(npcLayer.length > 0) {
      for(let i = 0; i < npcLayer.length; i++) {
         let obj = npcLayer[i];
         
         let npc;
         if(obj.name === 'dude') {
            npc = new overallDude(this.game,1,1,obj.x,obj.y,'overallDude-npc',0,obj.type,obj.properties.moves);
         } else if(obj.name === 'dudette') {
            npc = new skirtDudette(this.game,1,1,obj.x,obj.y,'skirtDudette-npc',0,obj.type,obj.properties.moves);
         }
         npcGroup.add(npc);
      }
      }
      
      npcGroup.setAll('body.gravity.y',1500);
      npcGroup.setAll('body.collideWorldBounds',true);

      // PLAYER UI ELEMENTS
      playerHealthText = game.add.text(70, 30, "Health:", {font:"Courier",fontSize: "26px", fill: "white"});
      playerHealthText.fontWeight = 'bold';
      playerHealthText.stroke = '#000000';
      playerHealthText.strokeThickness = 6;      
      playerHealthText.anchor.setTo(.5);
      playerHealthText.fixedToCamera = true;

      playerHealthBarBack = game.add.sprite(70, 64, 'healthbarback');
      playerHealthBarBack.anchor.setTo(.5);
      playerHealthBarBack.fixedToCamera = true;

      playerHealthBar = game.add.sprite(70, 64, 'healthbar');
      playerHealthBar.anchor.setTo(.5);
      playerHealthBar.fixedToCamera = true;
      playerHealthBar.scale.setTo(1, 1);      

      /*/
      //TESTING BLOCK, dark wizard SPAWN
      //
      darkWizard = new wizardBuild(this.game,1,1,800,300,'darkWizard');

      enemyGroup.add(darkWizard);

      darkWizard.body.gravity.y = 1500;
      darkWizard.body.collideWorldBounds = true;
      //
      //END TESTING BLOCK, dark wizard SPAWN
      //
      
      /*
      //
      //TESTING BLOCK, bossDemon SPAWN
      //
      bossDemon = new bossDemonBuild(this.game,1,1,700,300,'bossDemon');

      bossGroup.add(bossDemon);

      bossDemon.body.gravity.y = 1500;
      bossDemon.body.collideWorldBounds = true;
      //
      //END TESTING BLOCK, bossDemon SPAWN
      //*/   
      
      //BULLETS
      bulletGroup = this.game.add.group();
      bulletGroup.enableBody = true;

      //play music
      song = this.add.audio(mapObj.music);
      if(global_playMusic) song.play('', 0, 1, true);

      this.attackSound = game.add.audio('attackSound');
      /*
      this.instructions = game.add.text(400, 32, " WASD Keys to move, #'s 1 2 for weapons, 3 sheaths weapons, space to attack, \n and reach end of screen to return to world map, T to see text box ", GLOBAL_TEXT_STYLE);
      this.instructions.anchor.set(0.5);
      this.instructions.fixedToCamera = true;
      this.instructions.cameraOffset.setTo(400, 32);
      */
      //fades camera back in
      game.camera.resetFX();
      game.camera.flash(0x000000, 500);
      
      //allow player to move
      canEnter = true;

   },
   update: function() {
      //Spawn the boss if the global is active, then set it false again
      if(spawnBoss) {
         let boss = new bossDemonBuild(this.game,1,1,1216,476,'bossDemon');
         
         bossGroup.add(boss);
         
         boss.body.gravity.y = 1500;
         boss.body.collideWorldBounds = true;
         
         spawnBoss = false;
      }
      //scale player's health bar to match its current health
      playerHealthBar.scale.setTo(player.health/4, 1);
      //updates collision physics
      //checks mouse pressed and overlap, kills the enemy if true.
      if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
         if(weapon === 'sword') {
            game.physics.arcade.overlap(player.sword,enemyGroup,this.weaponAttack,null,this);
            game.physics.arcade.overlap(player.sword,bossGroup,this.weaponAttack,null,this);
         }
         else if(weapon === 'crossbow' && canShoot) {
            canShoot = false;
            let bullet = new bulletBuild(this.game,player.body.position.x+16,player.body.position.y+32,fireAngle);
            this.attackSound.play();
            let reset = game.time.create();
            reset.add(350, function(){
               canShoot = true;
            }, this);
            reset.start();
            bulletGroup.add(bullet);
         }
         
         //game.physics.arcade.collide(player.Bullet,enemyGroup,this.weaponAttack,null,this);
         //console.log(player.weapons[player.currentWeapon]);
         //game.physics.arcade.overlap(player.weapons[player.currentWeapon],enemyGroup,this.weaponAttack,null,this);
         //game.time.events.add(340,this.weaponAttack,this,player.sword,enemyGroup);
      }
      game.physics.arcade.collide(player, layer2);
      game.physics.arcade.collide(enemyGroup, layer2);
      game.physics.arcade.collide(bossGroup,layer2);
      game.physics.arcade.collide(npcGroup, layer2);
      game.physics.arcade.collide(bulletGroup, layer2, this.killBullet, null, this);
      
      //Check for death zone
      if(deathExists) {
         game.physics.arcade.overlap(player, killZone, this.gameover, null, this);
      }
      //Check for events on the stage
      if(checkEvents) {
         game.physics.arcade.overlap(player, eventGroup, this.callEvent, null, this);
      }
      
      //Bullets hitting enemies
      if(bulletGroup.children.length > 0) {
         game.physics.arcade.overlap(bulletGroup,enemyGroup,this.bulletHit,null,this);
         game.physics.arcade.overlap(bulletGroup,bossGroup,this.bulletHit,null,this);
      }

      // Walking off the edge of the screen to enter Overworld
      game.physics.arcade.overlap(player, screenEdges, this.enterOver, null, this);
      
      // Make an 'E' appear over the player if overlapping with a door or NPC
      if(game.physics.arcade.overlap(player, npcGroup) 
         || game.physics.arcade.overlap(player, doorSpots)) {
         
         player.notifier.visible = true;
      } else {
         player.notifier.visible = false;
      }
      
      // Using doors/NPCs on map
      if(game.input.keyboard.justPressed(Phaser.Keyboard.E) && canEnter) {
         game.physics.arcade.overlap(player, npcGroup, this.interactNPC, null, this);
         if(canEnter) {
            game.physics.arcade.overlap(player, doorSpots, this.enterDoor, null, this);
         }
      }
      // Contrived Text box 2
      if(game.input.keyboard.justPressed(Phaser.Keyboard.T)){
         textObj = TEXT_DATA[PLATWORLD_TEXTBOX_TEST];
         textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, !NAVIGABLE, textObj);
      }
      if(game.input.keyboard.justPressed(Phaser.Keyboard.ESC) && canPause){
         pauseMenu(game);
      }

      // game over if player dies
      if(player.health <= 0){
         game.state.start('GameOver');
      }
   },
   weaponAttack: function(weapon, enemy) {
      //Add knockback, etc. here
      //player.status = 'attacking';
      console.log(enemy);
      enemy.health -= 1;
      //enemy.destroy();
   },
   bulletHit: function(bullet,enemy) {
      enemy.health -= 1;
      bullet.kill();
   },
   interactNPC: function(player, npc) {
      //Do something here
      canEnter = false;
      player.body.velocity.x = 0;
      player.animations.stop();
      
      textObj = TEXT_DATA[npc.textbox];
      textBox(game, game.camera.width/2, game.camera.height/2, 0.5, 0.5, !NAVIGABLE, textObj);
   },
   callEvent: function(player, event) {
      checkEvents = false;
      mapObj.events[0]();
      event.destroy();
   },
   enterCutscene: function(which) {
      global_save_point = which;
      
      //Enter Cutscene state
      canEnter = false; // removes player control
      
      game.camera.fade(0x000000, 200);
      let timer = game.time.create();
      timer.add(180, function() {
         game.state.start('Cutscene');
      }, this);
      timer.start();
   },
   enterDoor: function(player, door) {
      game.sound.stopAll();
      
      global_destination = door.destination;
      
      canEnter = false; // removes player control 
      player.body.velocity.x = 0; //stops player
      
      game.camera.fade();
      let timer = game.time.create();
      timer.add(380, function() {
         game.state.start('PlayPlatform');
      }, this);
      timer.start();
   },
   enterOver: function() {
      game.sound.stopAll();
      
      canEnter = false; // removes player control 
      player.body.collideWorldBounds = false; //lets player walk offscreen
      
      game.camera.fade();
      let timer = game.time.create();
      timer.add(480, function() {
         game.state.start('PlayOver');
      }, this);
      timer.start();
   },
   killBullet: function(bullet) {
      bullet.kill();
   },
   gameover: function() {
      canEnter = false; // removes player control 
      player.body.collideWorldBounds = false; //lets player walk offscreen
      
      game.camera.fade(0x000000, 1000);
      let timer = game.time.create();
      timer.add(950, function() {
         game.sound.stopAll();
         game.state.start('GameOver');
      }, this);
      timer.start();
   },
   render: function() {
      //uncomment to view player collision info in platform
      //game.debug.bodyInfo(player, 64, 64);
      //game.debug.body(player);
      //game.debug.body(bossDemon);
   }
}