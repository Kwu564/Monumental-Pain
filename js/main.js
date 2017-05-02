// Jacob Wynd, Kiefer Nemeth, Kevin Wu, Kindon Smith
// Initial demo of Monumental Pain
// includes basic movement and switching between top-down and platformer views
// 4/30/2017
//
// (please update this comment block with each iteration)
// added background color via css
// changed background color to black and replaced hero character with a new character;
// removed header tag, and centered the game canvas onto the webpage

var game;

window.onload = function() {
   game =  new Phaser.Game(800, 600, Phaser.AUTO);
   // define states
   // Add boot, title, and gameOver states later
   game.state.add('Load', Load);
   game.state.add('PlayOver', PlayOver);
   game.state.add('PlayPlatform', PlayPlatform);
   game.state.start('Load'); // in final build, should say 'Boot'
}

////////////////////////
//BOOT STATE GOES HERE//
////////////////////////

var Load = function(game) {};
Load.prototype = {

   preload: function() {
      console.log("Load: preload");
      
      // set up loading bar here

      // align the game window to center of webpage
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;

      // load graphics assets
      game.load.path = './assets/' // should probably split directory to img and audio
      game.load.image('pbg', 'battle-background.jpg'); // pbg stands for platformer background
      game.load.image('hero', 'OneArmedHero.png');
      game.load.image('platHero', 'OneArmedHero.png');
      game.load.image('obg', 'overworld.jpg'); // obg = overworld background
      game.load.image('platform', 'platform.png');

      // load audio asstes here
   },
   create: function() {
      console.log("Load: create");
      game.state.start('PlayOver'); // in final build, goes to title screen
   }
}

/////////////////////////
//TITLE STATE GOES HERE//
/////////////////////////

var PlayOver = function(game) {};
PlayOver.prototype = {
   create: function() {  
      console.log("PlayOver: create");

      this.background = game.add.image(0, 0, 'obg');
      this.player = game.add.sprite(400, 300, 'hero');
      // add physics
      game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      // more physics later
      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#fff'});
      this.instructions.anchor.set(0.5);
   },
   update: function() {
      // console.log("PlayOver: update"); // Do not use unless update is not running

      if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
         // console.log("up"); // Do not use unless keyboard is not responding
         this.player.body.velocity.y = -150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
         this.player.body.velocity.y = 150;
      } else{
         this.player.body.velocity.y = 0;
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.player.body.velocity.x = 150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
         this.player.body.velocity.x = -150;
      } else {
         this.player.body.velocity.x = 0;
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayPlatform');
      }
   }
}

var PlayPlatform = function(game) {};
PlayPlatform.prototype = {
   create: function() {
      console.log("PlayPlatform: create");
      this.background = game.add.image(0, 0, 'pbg');

      this.ground = game.add.sprite(0, 400, 'platform');
      this.ground.scale.setTo(2,1);
      game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      this.ground.body.immovable = true;
      this.ground.alpha = 0; // make ground invisible so that player is pbg image

      this.player = game.add.sprite(100, 100, 'platHero');
      game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.collideWorldBounds = true;
      this.player.body.gravity.y = 600;

      this.instructions = game.add.text(400, 32, "Arrow Keys to move, 'R' to switch states", {fontSize: "16px", fill: '#000'});
      this.instructions.anchor.set(0.5);

   },
   update: function() {
      hitGround = game.physics.arcade.collide(this.player, this.ground);
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.player.body.velocity.x = 150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
         this.player.body.velocity.x = -150;
      } else {
         this.player.body.velocity.x = 0;
      }

      if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && hitGround){
         this.player.body.velocity.y = -350;
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.R)){
         game.state.start('PlayOver');
      }
   }
}