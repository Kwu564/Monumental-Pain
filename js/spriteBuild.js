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
    
    //add child sprite for sword
    this.sword = this.addChild(game.make.sprite(0, 0, 'platHero'));
    this.sword.scale.set(1.4,.2);
    game.physics.arcade.enable(this.sword);
};

spriteBuild.prototype = Object.create(Phaser.Sprite.prototype);
spriteBuild.prototype.constructor = spriteBuild;

spriteBuild.prototype.update = function(){
	//this is still iffy, but instantiated controls for platformer
         //hitGround = game.physics.arcade.collide(this.body, this.ground);
         if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
            this.body.velocity.x = 180;
         } else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            this.body.velocity.x = -180;
         } else {
            this.body.velocity.x = 0;
         }

         if(game.input.keyboard.isDown(Phaser.Keyboard.UP)
           && (player.body.onFloor())){
            this.body.velocity.y = -660;
         }

}