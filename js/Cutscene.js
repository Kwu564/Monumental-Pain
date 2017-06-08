// CUTSCENE STATE

var Cutscene = function(game) {
   var sceneObj, currentBg;
}
Cutscene.prototype = {
   create: function() {
       //Draw things to the screen based on the data in GLOBAL_CUTSCENE_DATA
       //in the index of whatever global_save_point is currently
       console.log('Cutscene: create');
       
       game.sound.stopAll();
       
       // Global cutscene data
       sceneObj = GLOBAL_CUTSCENE_DATA[global_save_point];
       
       currentBg = this.add.sprite(0,0,sceneObj.bg);
       
       global_destination = sceneObj.dest;
       
       // Music
       var song = this.add.audio(sceneObj.music);
       if(global_playMusic) song.play('', 0, 1, true);
       
       // Finally, display the appropriate text box
       var textObj = TEXT_DATA[sceneObj.text];
       textBox(game, game.camera.width/2, game.camera.height/2 -210, 0.5, 0.5, !NAVIGABLE, textObj);
       
       sceneObj.execute();
   },
   update: function() {
       if(canEnter) {
           game.camera.fade();
           
           let timer = game.time.create();
           timer.add(480, function() {
               game.state.start(sceneObj.state);
           }, this);
           timer.start();
       }
   }
}