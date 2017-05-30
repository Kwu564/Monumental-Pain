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

enemyBuild.prototype = Object.create(Phaser.Sprite.prototype);
enemyBuild.prototype.constructor = enemyBuild;

enemyBuild.prototype.update = function(){
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


//////////////////////
// Specific enemies //
//////////////////////
// AXEMAN
var axeMan = function(game,scaleX,scaleY,x,y,src,frame) { 
   enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
   // walk speed
   //this.speed = 100;
   this.speed = 100;
   // add animations
   this.animations.add('AxeWalkRight', [0, 1, 2, 3], 10, true);
   this.animations.add('AxeWalkLeft', [4, 5, 6, 7], 10, true);
   this.animations.add('AxeSlashRight', [8, 9, 10, 11], 10, true);
   this.animations.add('AxeSlashLeft', [12, 13, 14, 15], 10, true);

   
}

axeMan.prototype = Object.create(enemyBuild.prototype);
axeMan.prototype.constructor = axeMan;

axeMan.prototype.chase = function(){
  if(this.direction > 0){
    this.body.velocity.x = 200;
  }else{
    this.body.velocity.x = -200;
  }
  if((player.body.position.x - this.body.position.x) < 20 && (player.body.position.x - this.body.position.x) > -20){
    player.kill();
  }
}

axeMan.prototype.update = function(){
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
axeMan.prototype.animate = function(){
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('AxeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('AxeWalkRight');
   }   
}

// SWORDSMAN
var swordsMan = function(game,scaleX,scaleY,x,y,src,frame) { 
   enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
   // walk speed
   this.speed = -100;
   // add animations
   this.animations.add('SwordWalkRight', [0, 1, 2, 3], 10, true);
   this.animations.add('SwordWalkLeft', [4, 5, 6, 7], 10, true);
   this.animations.add('SwordSlashRight', [8, 9, 10, 11], 10, true);
   this.animations.add('SwordSlashLeft', [12, 13, 14, 15], 10, true);
}

swordsMan.prototype = Object.create(enemyBuild.prototype);
swordsMan.prototype.constructor = swordsMan;

// animates the npc, this is called in enemyBuild's update function
swordsMan.prototype.animate = function(){
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('AxeWalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('AxeWalkRight');
   }   
}

// LESSERDEMON
var lesserDemon = function(game,scaleX,scaleY,x,y,src,frame) { 
   enemyBuild.call(this,game,scaleX,scaleY,x,y,src,frame);
   // walk speed
   this.speed = -100;
   this.vision2 = this.addChild(game.make.sprite(96, 0, 'collider'));
   this.vision2.scale.set(200,49);
   this.vision2.anchor.set(.5,.5);
   this.vision2.alpha = .1;
   game.physics.arcade.enable(this.vision2);

   // add animations
   this.animations.add('WalkRight', [0, 1, 2, 3], 10, true);
   this.animations.add('WalkLeft', [4, 5, 6, 7], 10, true);
   this.animations.add('SlashRight', [8, 9, 10, 11], 10, true);
   this.animations.add('SlashLeft', [12, 13, 14, 15], 10, true);   
}

lesserDemon.prototype = Object.create(enemyBuild.prototype);
lesserDemon.prototype.constructor = lesserDemon;

// animates the npc, this is called in enemyBuild's update function
lesserDemon.prototype.animate = function(){
   if ( this.body.velocity.x == -100 ) {
      this.animations.play('WalkLeft');
   } else if ( this.body.velocity.x == 100 ) {
      this.animations.play('WalkRight');
   }
}

lesserDemon.prototype.update = function(){
  if(this.body.blocked.right || this.body.blocked.left || game.physics.arcade.overlap(player,this.vision)) {
        this.switchDir();
        if(this.direction < 0){
          this.vision.body.position.x = this.body.position.x -192;
          this.vision2.body.position.x = this.body.position.x +48;
        }else{
          this.vision.body.position.x = this.body.position.x +48;
          this.vision2.body.position.x = this.body.position.x -192;
        }
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    this.animate();

    game.physics.arcade.overlap(player,this.vision2,this.lunge,null,this);
}

lesserDemon.prototype.lunge = function(){
  this.body.velocity.x = 4*this.body.velocity.x;
}
