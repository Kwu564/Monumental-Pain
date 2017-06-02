var Door = function(game,x,y,src,frame,dest,width,height,retX,retY){
	console.log("Door: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

    this.destination = dest;
    this.retX = retX;
    this.retY = retY;
   
    this.scale.set(width,height);

    game.sound.stopAll();
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;
