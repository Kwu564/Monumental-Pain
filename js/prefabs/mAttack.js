var mAttack = function(game){};
var swordHitBox;
mAttack.prototype = {
	create: function(){
		swordHitBox = game.add.emitter(this.player.position.x,32,16);
		swordHitBox.makeParticles('hero');

	},
	update: function(){
		swordHitBox.position.x = this.player.position.x;
		swordHitBox.position.y = this.player.position.y;
	}

}