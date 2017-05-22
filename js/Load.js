// this is the state for loading assets
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
// 


var Load = function(game) {};
Load.prototype = {

   preload: function() {
      console.log("Load: preload");
      
      // set up loading bar here

      // align the game window to center of webpage
      game.scale.pageAlignHorizontally = true;
      game.scale.pageAlignVertically = true;
      
      // load backgrounds and stuff
      game.load.path = './assets/img';
      game.load.image(['kevn-bg','collider','textbox'],
                      ['kevn-bg.png','collider.png','textbox.png']);
      // load sprite graphics
      game.load.path = './assets/img/sprites';
      game.load.image(['arrow','hero','baddie'],
                     ['crossbowBolt.png','hero.png','Militant.png']);
      game.load.spritesheet('platHero','hero-tall.png', 64, 64);
      // load tilesets
      game.load.path = './assets/img/tilesets';
      game.load.image(['oworld-tile','forest-tile'],
                     ['oworld-tile.png','forest-tile.png']);
      // load json data
      game.load.path = './assets/json';
      game.load.tilemap('forestbattle', 'forest-battle.json', null, Phaser.Tilemap.TILED_JSON); 
      game.load.tilemap('forestbattle2', 'forest-battle2.json', null, Phaser.Tilemap.TILED_JSON);
      // load music
      game.load.path = './assets/audio';
      game.load.audio(['oworld-song','battle-song'],['overworld.ogg','engage.ogg']);
      // load sfx
      game.load.path = './assets/audio/sfx';
      game.load.audio(['bump','attackSound','jumpSound'],
                      ['collide.ogg','attack.ogg','jump.ogg']);
      
      //Scale the game based on window size
      game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      game.scale.setMinMax(400, 300, 1200, 900);
   },
   create: function() {
      console.log("Load: create");
   },
   update: function() {
      //wait for songs to decode
      if(this.cache.isSoundDecoded('battle-song')) {
         game.state.start('PlayOver'); // in final build, goes to title screen
      }
   }
}