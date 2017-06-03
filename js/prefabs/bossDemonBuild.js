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

    // add animations
   this.animations.add('DemonBossWalkRight', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
   this.animations.add('DemonBossWalkLeft', [8, 9, 10, 11, 12, 13, 14, 15], 7, true);
   this.animations.add('DemonBossSlashRight', [16, 17, 18], 10, true);
   this.animations.add('DemonBossSlashLeft', [19, 20, 21], 10, true);

    this.timer = game.time.create();
    this.health = 10;
    this.speed = 100;
    this.enraged = 0;
    this.enragedTimer = 10; //initial value is 10 seconds(this is a cooldown)
    // add child sprite for vision
    this.rFlag = 0;
    this.vision = this.addChild(game.make.sprite(-128, 0, 'collider'));
    this.vision.scale.set(200, 49);
    this.vision.anchor.set(.5,.5);
    this.vision.alpha = .5;
    game.physics.arcade.enable(this.vision);

    this.swordSlashHit = this.addChild(game.make.sprite(-128,160, 'collider'));
    this.swordSlashHit.scale.set(125,50);
    this.swordSlashHit.anchor.set(.5,.5);
    this.swordSlashHit.alpha = .5;
    game.physics.arcade.enable(this.swordSlashHit);


	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	game.physics.arcade.enableBody(this);
    
    this.direction = -1; //positive = right, negative = left
};

bossDemonBuild.prototype = Object.create(Phaser.Sprite.prototype);
bossDemonBuild.prototype.constructor = npcBuild;

bossDemonBuild.prototype.update = function(){
    if(this.health < 4 && this.enraged == 0){
        this.speed = 2*this.speed;
        this.enragedTimer = 4;
        this.enraged = 1;
    }
    //game.physics.arcade.overlap(player, vision, this.enterDoor, null, this);
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    if(this.health == 0){
        this.destroy();
    }

    
   if ( this.body.velocity.x < 0) {
      this.animations.play('DemonBossWalkLeft');
   } else if ( this.body.velocity.x > 0 ) {
      this.animations.play('DemonBossWalkRight');
   }
   
   game.physics.arcade.overlap(player,this.swordSlashHit,this.swordSlashtimer,null,this);
};
bossDemonBuild.prototype.switchDir = function() {
    if(this.direction < 0) {
        this.direction = 1;
        this.swordSlashHit.position.x = -this.swordSlashHit.position.x;
        this.body.position.x += 1;
    } else{
        this.direction = -1;
        this.swordSlashHit.position.x = -this.swordSlashHit.position.x;
        this.body.position.x -= 1;
    }
};
bossDemonBuild.prototype.swordSlashtimer = function(){
    this.swordSlashHit.destroy();
    game.time.events.add(Phaser.Timer.SECOND,this.swordSlashAnimated,this);
};
bossDemonBuild.prototype.swordSlashAnimated = function(){
    if(this.direction < 0){
        this.animations.play('DemonBossSlashLeft');
    }else{
        this.animations.play('DemonBossSlashRight');
    }
    game.time.events.add(Phaser.Timer.SECOND*this.enragedTimer, createSwordSlashHit,this);
};
var createSwordSlashHit = function(){
    this.swordSlashHit = this.addChild(game.make.sprite(-128,160, 'collider'));
    this.swordSlashHit.scale.set(100,50);
    this.swordSlashHit.anchor.set(.5,.5);
    this.swordSlashHit.alpha = .5;
    game.physics.arcade.enable(this.swordSlashHit);
}
//enemyBuild.prototype.
