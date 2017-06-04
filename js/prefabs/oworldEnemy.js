/* Enemy prefab for spawns in the overworld
*/

'use strict';
var oworldEnemy = function(game,obj,zone){
	console.log("oworldEnemy: create");
	Phaser.Sprite.call(this,game,obj.x+16,obj.y+16,obj.name,0);

    this.spawnTimer = game.time.create();
    this.deathTimer = game.time.create();
    // Kill the foe if it's alive for 30 seconds
    this.deathTimer.add(20000,function(){this.destroy();},this);
    this.deathTimer.start();

	this.anchor.setTo(.5,.5);
	game.physics.arcade.enableBody(this);
    
    // Which map the it takes you to, for global_destination
    this.destination = obj.type;
    // Defines the enemies parent box, which it cannot leave
    this.zone = zone;
   
    this.spawning = true;
    
    // Can move in 4 directions
    this.direction = 'down';
};

oworldEnemy.prototype = Object.create(Phaser.Sprite.prototype);
oworldEnemy.prototype.constructor = oworldEnemy;

oworldEnemy.prototype.update = function(){
    if(this.spawning) {
        this.spawnTimer.add(900, function() {this.spawning = false;}, this);
        this.spawnTimer.start();
    }
    else{
        
        this.switchDir(); // Check the velocity and animation frame
    
        this.moveTowardPlayer();
        //this.animate();
    
        // If enemy is out of its box, destroy it
        if(this.body.position.x < this.zone.body.position.x 
        || this.body.position.x > this.zone.body.position.x+this.zone.width-16
        || this.body.position.y < this.zone.body.position.y
        || this.body.position.y > this.zone.body.position.y+this.zone.height-16) {
            this.destroy();
            this.zone.activeFoes--;
        }
    }
}
oworldEnemy.prototype.switchDir = function() {
    // Checks velocity and applies the appropriate direction 
    // for animation purposes
    if(this.body.velocity.x < 0) {this.direction = 'left';}
    if(this.body.velocity.x > 0) {this.direction = 'right';}
    
    if(this.body.velocity.y > 0) {this.direction = 'down';}
    if(this.body.velocity.y < 0) {this.direction = 'up';}
}
oworldEnemy.prototype.moveTowardPlayer = function() {
    // Move horizontally toward player
    if(this.body.position.x < player.body.position.x) {
        this.body.velocity.x += 10;
    } else if(this.body.position.x > player.body.position.x) {
        this.body.velocity.x -= 10;
    } else {
        this.body.velocity.x = 0; //equal X value to player
    }
    
    // Move vertically toward player
    if(this.body.position.y < player.body.position.y) {
        this.body.velocity.y += 10;
    } else if(this.body.position.y > player.body.position.y) {
        this.body.velocity.y -= 10;
    } else {
        this.body.velocity.y = 0; //on the same Y level as player
    }
    
    // Cap horizontal speed
    if(this.body.velocity.x > 50) {this.body.velocity.x = 50;}
    else if(this.body.velocity.x < -50) {this.body.velocity.x = -50;}
    // Cap vertical speed
    if(this.body.velocity.y > 50) {this.body.velocity.y = 50;}
    else if(this.body.velocity.y < -50) {this.body.velocity.y = -50;}
}