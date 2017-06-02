var foemapBuild = function(game,obj,enemySpots){
	console.log("foemapBuild: create");
	Phaser.Sprite.call(this,game,obj.x,obj.y,'collider',0);

    this.size = obj.properties.size;
    // Type is where to start in the array of objects in the Tiled layer
    // called "enemySpots"
    this.type = obj.type;
    this.active = false;
    this.activeFoes = [];
    
    this.scale.set(obj.width,obj.height);
    
    this.enemySpots = [];
    for(let i = this.type; i < this.size; i++) {
        let foe = enemySpots[i];
        
        this.enemySpots.push(foe);
    }

    game.sound.stopAll();
};

foemapBuild.prototype = Object.create(Phaser.Sprite.prototype);
foemapBuild.prototype.constructor = foemapBuild;

foemapBuild.prototype.update = function() {
    if(this.activeFoes = 0) {
       this.active = false;
    }
}