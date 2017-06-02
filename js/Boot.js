// This is a boot state to load assets necessary for loading bar

var Boot = function(game){};

Boot.prototype = {
   preload: function(){
      // Load minimum assets for load bar
      game.load.path= "assets/img/"
      game.load.image("bar", "bar.png");
   },
   create: function(){
      game.state.start('Load');
   }
}