var Door = function(game,x,y,dest,width,height,retX,retY){
	console.log("Door: create");
	Phaser.Sprite.call(this,game,x,y,'collider',0);

    this.destination = dest;
    this.retX = retX;
    this.retY = retY;
   
    this.scale.set(width,height);

    game.sound.stopAll();
};

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

var Event = function(game,x,y,width,height,execute){
	console.log("Event: create");
	Phaser.Sprite.call(this,game,x,y,'collider',0);
   
    this.scale.set(width,height);
    
    this.execute = execute;
};

Event.prototype = Object.create(Phaser.Sprite.prototype);
Event.prototype.constructor = Event;
