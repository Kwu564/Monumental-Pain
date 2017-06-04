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
    this.x = x;
    this.y = y;
    this.animations.add('DemonBossWalkRight', [0, 1, 2, 3, 4, 5, 6, 7], 7, true);
    this.animations.add('DemonBossWalkLeft', [8, 9, 10, 11, 12, 13, 14, 15], 7, true);
    this.animations.add('DemonBossSlashRight', [16, 17, 18], 10, true);
    this.animations.add('DemonBossSlashLeft', [19, 20, 21], 10, true);

    this.state = 'walking'
    this.timer = game.time.create();
    this.health = 100;
    this.speed = 100;
    this.enraged = 0;
    this.enragedTimer = 4; //initial value is 10 seconds(this is a cooldown)
    this.enragedDivider = 2; //initially half second delay, enraged is quarter second
    this.swordSlashDamage = this.addChild(game.make.sprite(0,0,'collider'));
    // add child sprite for vision
    this.rFlag = 0;
    this.vision = this.addChild(game.make.sprite(-128, 0, 'collider'));
    this.vision.scale.set(200, 49);
    this.vision.anchor.set(.5,.5);
    this.vision.alpha = .5;
    game.physics.arcade.enable(this.vision);

    this.swordSlashHit = this.addChild(game.make.sprite(-90,160, 'collider'));
    this.swordSlashHit.scale.set(250,50);
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
    if(this.health < 40 && this.enraged == 0){
        this.speed = 2*this.speed;
        this.enragedTimer = 2;
        this.enragedDivider = 8;
        this.enraged = 1;
    }
    //game.physics.arcade.overlap(player, vision, this.enterDoor, null, this);
    if(this.body.blocked.right || this.body.blocked.left) {
        this.switchDir();
    }
    if(this.body.position.x > 200+this.x || this.body.position.x < this.x-200){
        this.switchDir();
    }
    if(this.state == 'walking') {
        if(this.direction<0){
            this.body.velocity.x = -this.speed;
            this.animations.play('DemonBossWalkLeft');
        } else {
            this.body.velocity.x = this.speed;
            this.animations.play('DemonBossWalkRight');
        }
    }else{
        this.body.velocity.x = 0;
    }
    
   /*if ( this.body.velocity.x < 0) {
      this.animations.play('DemonBossWalkLeft');
   } else if ( this.body.velocity.x > 0 ) {
      this.animations.play('DemonBossWalkRight');
   }*/
   
    game.physics.arcade.overlap(player,this.swordSlashDamage,damagePlayer,null,this);
    if(this.health == 0){
        this.destroy();
    }
    //game.physics.arcade.collide(player,this);
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
    this.state = 'swordslashing'
    this.stopAnimation();
    //this.switchDir();
    this.swordSlashHit.destroy();
    game.time.events.add(Phaser.Timer.SECOND/this.enragedDivider,this.swordSlashAnimated,this);
};
bossDemonBuild.prototype.swordSlashAnimated = function(){
    if(this.direction < 0){
        if(this.enraged == 0){
            this.animations.play('DemonBossSlashLeft',10,false);
            game.physics.arcade.collide(player,this.body,damagePlayer,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(-128,160,'collider'));
            this.swordSlashDamage.scale.set(128,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            this.swordSlashDamage.alpha = .5;
            game.physics.arcade.enable(this.swordSlashDamage);
        }else{
            this.animations.play('DemonBossSlashLeft',20,false);
            game.physics.arcade.collide(player,this.body,damagePlayer,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(-128,160,'collider'));
            this.swordSlashDamage.scale.set(128,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            game.physics.arcade.enable(this.swordSlashDamage);
            
        }
    }else{
        if(this.enraged == 0){
            this.animations.play('DemonBossSlashRight',10,false);
            game.physics.arcade.collide(player,this.body,damagePlayer,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(128,160,'collider'));
            this.swordSlashDamage.scale.set(128,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            this.swordSlashDamage.alpha = .5;
            game.physics.arcade.enable(this.swordSlashDamage);
        }else{
            this.animations.play('DemonBossSlashRight',20,false);
            game.physics.arcade.collide(player,this.body,damagePlayer,null,this);
            this.swordSlashDamage = this.addChild(game.make.sprite(128,160,'collider'));
            this.swordSlashDamage.scale.set(128,50);
            this.swordSlashDamage.anchor.set(.5,.5);
            game.physics.arcade.enable(this.swordSlashDamage);
        }
    }
    //this.swordSlashDamage.destroy();
    game.time.events.add(Phaser.Timer.SECOND*this.enragedTimer, createSwordSlashHit,this);
    game.time.events.add(Phaser.Timer.SECOND, this.startWalking,this);
    //this.state = 'walking'
};
bossDemonBuild.prototype.stopAnimation = function(){
    this.animations.stop(null,true);
};
bossDemonBuild.prototype.startWalking = function(){
    this.state = 'walking';
};
var createSwordSlashHit = function(){
    this.swordSlashHit = this.addChild(game.make.sprite(-90,160, 'collider'));
    this.swordSlashHit.scale.set(250,50);
    this.swordSlashHit.anchor.set(.5,.5);
    this.swordSlashHit.alpha = .5;
    game.physics.arcade.enable(this.swordSlashHit);
};
var damagePlayer = function(){
    this.swordSlashDamage.destroy();
    player.health -=2;
    player.body.velocity.x = 8*this.speed;
    player.body.velocity.y = -800;
}

//enemyBuild.prototype.
