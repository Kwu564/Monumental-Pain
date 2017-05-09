/* 5/9/2017, KIEFER
this file is Satan.
It just keeps saying spritePlayOver is not defined and I don't know why, it's right fucking here
EDIT: OK, figured out it just wasn't in index.html; I'm going to eat my fists whole
*/

'use strict';
var spritePlayOver = function(game,x,y,src,frame){
	console.log("spritePlayOver: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enableBody(this);
};

spritePlayOver.prototype = Object.create(Phaser.Sprite.prototype);
spritePlayOver.prototype.constructor = spritePlayOver;

spritePlayOver.prototype.update = function(){
    if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
      // console.log("up"); // Do not use unless keyboard is not responding
         this.body.velocity.y = -150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
         this.body.velocity.y = 150;
      } else{
        this.body.velocity.y = 0;
      }
      if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
         this.body.velocity.x = 150;
      } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
         this.body.velocity.x = -150;
      } else {
         this.body.velocity.x = 0;
      }
}