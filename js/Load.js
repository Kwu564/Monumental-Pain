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

