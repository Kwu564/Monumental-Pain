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
      
      // load graphics assets
      game.load.path = './assets/' // should probably split directory to img and audio
      game.load.image('pbg', 'img/battle-background.jpg'); // pbg stands for platformer background
      game.load.image('hero', 'img/hero.png');
      game.load.image('platHero', 'img/hero-tall.png');
      game.load.image('obg', 'img/overworld.jpg'); // obg = overworld background
      game.load.image('platform', 'img/platform.png');
      game.load.tilemap('oworld', 'json/oworld-tile.json', null, Phaser.Tilemap.TILED_JSON); //json data for map tiles
      game.load.tilemap('forestbattle', 'json/forest-battle.json', null, Phaser.Tilemap.TILED_JSON); 
      game.load.tilemap('forestbattle2', 'json/forest-battle2.json', null, Phaser.Tilemap.TILED_JSON); 
      game.load.image('oworld-tile', 'img/oworld-tile.png');
      game.load.image('forest-tile', 'img/forest-tile.png');
      
      // load audio assets here
      game.load.audio('oworld-song','audio/overworld.ogg');
      game.load.audio('battle-song','audio/engage.ogg');
      
       /*
      // scale the game 2x
      game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
      game.scale.setUserScale(2, 2);

      // enable crisp rendering
      game.renderer.renderSession.roundPixels = true;
      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas);
        */
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