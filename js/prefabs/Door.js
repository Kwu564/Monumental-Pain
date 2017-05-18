var Door = function(game,x,y,src,frame,dest,retX,retY){
	console.log("Door: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);
    
    this.destination = dest;
    this.retX = retX + 48;
    this.retY = retY + 16;
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;
