// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key', frame key)
*/
'use strict';
var npcBuild = function(game,scaleX,scaleY,x,y,src,frame,interact,moves){
	console.log("npcBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);
    
    this.textbox = interact;
    
    this.moves = moves;

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
};

npcBuild.prototype = Object.create(Phaser.Sprite.prototype);
npcBuild.prototype.constructor = npcBuild;

npcBuild.prototype.update = function(){
    if(this.moves === 1) {
        
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.animate();
    
    }
}
npcBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.body.position.x -= 1;
    }
}
//enemyBuild.prototype.


//////////////////////
//  Specific NPCs   //
//////////////////////
// OVERALLDUDE
var overallDude = function(game,scaleX,scaleY,x,y,src,frame,interact,moves) { 
   npcBuild.call(this,game,scaleX,scaleY,x,y,src,frame,interact,moves);
   // walk speed
   //this.speed = 100;
   this.speed = 100;
   // add animations
   this.animations.add('OverallDudeWalkRight', [0, 1, 2, 3], 5, true);
   this.animations.add('OverallDudeWalkLeft', [4, 5, 6, 7], 5, true);
   
}

overallDude.prototype = Object.create(npcBuild.prototype);
overallDude.prototype.constructor = overallDude;

overallDude.prototype.update = function(){
    if(this.moves === 1) {
        
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.animate();
    
    }
}

// animates the npc, this is called in enemyBuild's update function
overallDude.prototype.animate = function(){

   if ( this.body.velocity.x == -100 ) {
      this.animations.play('OverallDudeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('OverallDudeWalkRight');
   }

}

// SKIRTDUDETTE
var skirtDudette = function(game,scaleX,scaleY,x,y,src,frame,interact,moves) { 
   npcBuild.call(this,game,scaleX,scaleY,x,y,src,frame,interact,moves);
   // walk speed
   this.speed = 100;
   // add animations
   this.animations.add('SkirtDudetteWalkRight', [0, 1, 2, 3], 5, true);
   this.animations.add('SkirtDudetteWalkLeft', [4, 5, 6, 7], 5, true);
   
}

skirtDudette.prototype = Object.create(npcBuild.prototype);
skirtDudette.prototype.constructor = overallDude;

skirtDudette.prototype.update = function(){
    if(this.moves === 1) {
        //Some npcs don't move
        
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.animate();
        
    }
}

// animates the npc, this is called in enemyBuild's update function
skirtDudette.prototype.animate = function(){

   if ( this.body.velocity.x == -100 ) {
      this.animations.play('SkirtDudetteWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('SkirtDudetteWalkRight');
   }

}