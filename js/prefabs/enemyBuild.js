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

    // add child sprite for vision
    this.vision = this.addChild(game.make.sprite(8, -16, 'collider'));
    this.vision.scale.set(100, 49);
    this.vision.alpha = .3;
    game.physics.arcade.enable(this.vision);

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
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
         }*/
    //game.physics.arcade.overlap(player, vision, this.enterDoor, null, this);
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -100;
    } else {
        this.body.velocity.x = 100;
    }
    this.animate();
}
enemyBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
}
//enemyBuild.prototype.


//////////////////////////////////////////////
// Specific enemies
//////////////////////////////////////////////

// AXEMAN
var axeMan = function(game,scaleX,scaleY,x,y,src,frame) { 
   enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
   // add animations
   this.animations.add('AxeWalkRight', [0, 1, 2, 3], 10, true);
   this.animations.add('AxeWalkLeft', [4, 5, 6, 7], 10, true);
   this.animations.add('AxeSlashRight', [8, 9, 10], 10, true);
   this.animations.add('AxeSlashLeft', [11, 12, 13], 10, true);
}

axeMan.prototype = Object.create(enemyBuild.prototype);
axeMan.prototype.constructor = axeMan;

// animates the npc, this is called in enemyBuild's update function
axeMan.prototype.animate = function(){
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('AxeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('AxeWalkRight');
   }   
}



