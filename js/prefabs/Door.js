var Door = function(game,x,y,src,frame,dest){
	console.log("Door: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);
    
    this.destination = dest;
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;
