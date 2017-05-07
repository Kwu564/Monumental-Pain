'use strict';
var spritePlayOver = function(game,x,y,src,frame){
	console.log("spritePlayOver: create");
	Phaser.Sprite.call(this,game,x,y,'hero',frame);

	this.anchor.setTo(.5,.5);
	this.game.physics.arcade.enableBody(this);
};

spritePlayOver.prototype = Object.create(Phaser.Sprite.prototype);
spritePlayOver.prototype.constructor = spritePlayOver;

/*spritePlayOver.update = function(){

}*/