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
    this.body.collideWorldBounds = true;
};

spritePlayOver.prototype = Object.create(Phaser.Sprite.prototype);
spritePlayOver.prototype.constructor = spritePlayOver;

spritePlayOver.prototype.update = function(){

if(canEnter) { //only allow the player to move after they've been allowed to
    
    //Vertical movement checks
    if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
        //Check for diagonal movement, move slower
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.body.velocity.y = -60;
            this.body.velocity.x = 60;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.body.velocity.y = -60;
            this.body.velocity.x = -60;
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = -90;
        }
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
        //Check for diagonal movement, move slower
        if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            this.body.velocity.y = 60;
            this.body.velocity.x = 60;
        } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            this.body.velocity.y = 60;
            this.body.velocity.x = -60;
        } else {
            this.body.velocity.x = 0;
            this.body.velocity.y = 90;
        }
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
        this.body.velocity.y = 0;
        this.body.velocity.x = 90;
    } else if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        this.body.velocity.y = 0;
        this.body.velocity.x = -90;
    } else {
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
    }
    
}
    
}