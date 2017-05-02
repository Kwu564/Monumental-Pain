var Load = function(game) {};
Load.prototype = {

   preload: function() {
      console.log("Load: preload");
      
      // set up loading bar here

      // load graphics assets
      game.load.path = './assets/' // should probably split directory to img and audio
      game.load.image('pbg', 'img/battle-background.jpg'); // pbg stands for platformer background
      game.load.image('hero', 'img/hero.png');
      game.load.image('platHero', 'img/hero-tall.png');
      game.load.image('obg', 'img/overworld.jpg'); // obg = overworld background
      game.load.image('platform', 'img/platform.png');

      // load audio asstes here
   },
   create: function() {
      console.log("Load: create");
      game.state.start('PlayOver'); // in final build, goes to title screen
   }
}