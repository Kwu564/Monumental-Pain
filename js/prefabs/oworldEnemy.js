/* Enemy prefab for spawns in the overworld
*/

'use strict';
var oworldEnemy = function(game,obj,zone){
	console.log("oworldEnemy: create");
	Phaser.Sprite.call(this,game,obj.x,obj.y,obj.name,0);

    this.timer = game.time.create();

	this.anchor.setTo(.5,.5);
	game.physics.arcade.enableBody(this);
    
    // Which map the it takes you to, for global_destination
    this.destination = obj.type;
    // Defines the enemies parent box, which it cannot leave
    this.zone = zone;
    
    // Can move in 4 directions
    this.direction = 'down';
};

oworldEnemy.prototype = Object.create(Phaser.Sprite.prototype);
oworldEnemy.prototype.constructor = oworldEnemy;

oworldEnemy.prototype.update = function(){
    this.switchDir(); // Check the velocity and animation frame
    
    if(this.direction < 0) {
        this.body.velocity.x = -this.speed;
    } else {
        this.body.velocity.x = this.speed;
    }
    //this.animate();
    
    // If enemy is out of its box, destroy it
    if(this.body.position.x < this.zone.body.position.x 
      || this.body.position.x > this.zone.body.position.x+this.zone.width
      || this.body.position.y < this.zone.body.position.y
      || this.body.position.y > this.zone.body.position.y+this.zone.height) {
        this.destroy();
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