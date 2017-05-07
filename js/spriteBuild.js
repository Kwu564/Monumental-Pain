// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key')
*/
'use strict';
var spriteBuild = function(game,scaleX,scaleY,x,y,src,frame){
	console.log("spriteBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	this.game.physics.arcade.enableBody(this);
};

spriteBuild.prototype = Object.create(Phaser.Sprite.prototype);
spriteBuild.prototype.constructor = spriteBuild;

spriteBuild.prototype.update = function(){
	/*if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
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
      }*/

}