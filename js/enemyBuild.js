// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key', frame key)
*/
'use strict';
var enemyBuild = function(game,scaleX,scaleY,x,y,src,frame){
	console.log("enemyBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	this.game.physics.arcade.enableBody(this);
};

enemyBuild.prototype = Object.create(Phaser.Sprite.prototype);
enemyBuild.prototype.constructor = enemyBuild;

enemyBuild.prototype.update = function(){
	//this is still iffy, but instantiated controls for platformer
         //hitGround = game.physics.arcade.collide(this.body, this.ground);
         /*if(this.body.position.x != playerX){
            if(this.body.position.x > playerX){
               this.body.velocity.x = -100;
            }else{
               this.body.velocity.x = 100;
            }
         }
*/
}