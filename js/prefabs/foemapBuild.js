var foemapBuild = function(game,obj,enemySpots){
	console.log("foemapBuild: create");
	Phaser.Sprite.call(this,game,obj.x,obj.y,'collider',0);

    this.size = obj.properties.size;
    // Type is where to start in the array of objects in the Tiled layer
    // called "enemySpots"
    this.type = obj.type;
    this.active = false;
    this.activeFoes = 0;
    
    this.scale.set(obj.width,obj.height);
    
    this.enemySpots = [];
    console.log('size: '+this.size+' type: '+this.type);
    for(let i = this.type; i < parseInt(this.size)+parseInt(this.type); i++) {
        let foe = enemySpots[i]; // The field 'enemySpots' is an object layer in json
        
        this.enemySpots.push(foe);
        console.log(this.enemySpots.length);
    }

    game.sound.stopAll();
};

foemapBuild.prototype = Object.create(Phaser.Sprite.prototype);
foemapBuild.prototype.constructor = foemapBuild;

foemapBuild.prototype.update = function() {
    if(this.activeFoes == 0) {
       this.active = false;
    }
}