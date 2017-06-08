'use strict';
var bulletBuild = function(game,x,y,direction){
	console.log("bulletBuild: create");
	Phaser.Sprite.call(this,game,x,y,'arrow',0);

	this.game.physics.arcade.enableBody(this);
    
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    
    this.speed = 600;
    this.direction = direction;
    
    if(direction === 0) {
        this.anchor.setTo(.5,1);
        this.body.velocity.x = this.speed;
    }
    else if(direction === 180) {
        this.anchor.setTo(.5,0);
        this.body.velocity.x = -this.speed;
    }
    
    this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
};

bulletBuild.prototype = Object.create(Phaser.Sprite.prototype);
bulletBuild.prototype.constructor = bulletBuild;