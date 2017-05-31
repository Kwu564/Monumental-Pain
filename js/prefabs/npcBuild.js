// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key', frame key)
*/
'use strict';
var npcBuild = function(game,scaleX,scaleY,x,y,src,frame){
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

npcBuild.prototype = Object.create(Phaser.Sprite.prototype);
npcBuild.prototype.constructor = enemyBuild;

npcBuild.prototype.update = function(){
    //game.physics.arcade.overlap(player, vision, this.enterDoor, null, this);
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
// Specific enemies //
//////////////////////
// OVERALLDUDE
var overallDude = function(game,scaleX,scaleY,x,y,src,frame) { 
   enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
   // walk speed
   //this.speed = 100;
   this.speed = 100;
   // add animations

   
}

overallDude.prototype = Object.create(npcBuild.prototype);
overallDude.prototype.constructor = overallDude;

overallDude.prototype.chase = function(){
  if(this.direction > 0){
    this.body.velocity.x = 200;
  }else{
    this.body.velocity.x = -200;
  }
  if((player.body.position.x - this.body.position.x) < 20 && (player.body.position.x - this.body.position.x) > -20){
    //player.kill();
  }
}

overallDude.prototype.update = function(){
  if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
        if(this.direction < 0){
          this.vision.body.position.x = this.body.position.x -192;
        }else{
          this.vision.body.position.x = this.body.position.x +48;
        }
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.animate();
    //game.physics.arcade.collide(this.body,player);
    game.physics.arcade.overlap(player,this.vision,this.chase,null,this);
}

// animates the npc, this is called in enemyBuild's update function
overallDude.prototype.animate = function(){
  /*
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('AxeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('AxeWalkRight');
   }
   */
}