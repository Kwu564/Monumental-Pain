// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key', frame key)
*/
'use strict';
var bossDemonBuild = function(game,scaleX,scaleY,x,y,src,frame){
	console.log("npcBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

    // add child sprite for vision
    this.rFlag = 0;
    this.vision = this.addChild(game.make.sprite(-128, 0, 'collider'));
    this.vision.scale.set(200, 49);
    this.vision.anchor.set(.5,.5);
    this.vision.alpha = .5;
    game.physics.arcade.enable(this.vision);

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
};

bossDemonBuild.prototype = Object.create(Phaser.Sprite.prototype);
bossDemonBuild.prototype.constructor = npcBuild;

bossDemonBuild.prototype.update = function(){
    //game.physics.arcade.overlap(player, vision, this.enterDoor, null, this);
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -100;
    } else {
        this.body.velocity.x = 100;
    }
    /*
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('OverallDudeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('OverallDudeWalkRight');
   }
   */
}
bossDemonBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
}
//enemyBuild.prototype.
