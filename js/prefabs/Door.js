var Door = function(game,x,y,src,frame,dest,width,height){
	console.log("Door: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);
    
    this.destination = dest;
    this.retX = x + 50;
    this.retY = y + 16;
   
    this.scale.set(width,height);
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;
