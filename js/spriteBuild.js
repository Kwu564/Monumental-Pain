// This is the state for platformer play in battle and possibly in towns.
// If we decide to make each level a different state, use this as a baseline
// We should consider making a more descriptive log of all changes made, until
// we do please log changes bellow, do not delete anything from the changelog. Include the date
/* 5/7/2017, KINDON
created prefab, takes in (this,game,X scale, Y scale, x position, y position, 'asset key')
*/
/* 5/17/2017, KEVIN
added projectile system, it has a base 'bullet' class from where additional kinds of projectiles can inherit from,
currently there is only one kind of projectile which is a basic crossbow bolt;
finally, I implemented animations using a new spritesheet I made for the hero character into this prefab as well as
a basic weapon switch system
I think there's a better way to simplify the animaton logic by using a switch statement or by creating helper functions
*/
'use strict';
// globals
// determines whether the player should face right or left
// 0 degrees means right and 180 degrees means left
// this value is also used to set which direction to fire arrows at
var fireAngle = 0;
// defines default active weapon when entering a town
// currently there are three weapons: crossbow, sword, and sheathed
// sheathed just means the character puts away all weapons
var weapon = 'sword';

//  Our core Bullet class
//  This is a simple Sprite object that we set a few properties on
//  It is fired by all of the Weapon classes
var Bullet = function(game, key) {

  Phaser.Sprite.call(this, game, 0, 0, key);

  this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

  this.anchor.set(0.5);

  this.checkWorldBounds = true;
  this.outOfBoundsKill = true;
  this.exists = false;

  this.tracking = false;
  this.scaleSpeed = 0;

};

// Set Bullet as a subclass of Sprite
Bullet.prototype = Object.create(Phaser.Sprite.prototype);
// Set Bullet's constructer to the function Bullet
Bullet.prototype.constructor = Bullet;

Bullet.prototype.fire = function (x, y, speed, gx, gy) {

  gx = gx || 0;
  gy = gy || 0;

  this.reset(x, y);
  this.scale.set(1);
  this.game.physics.arcade.velocityFromAngle(fireAngle, speed, this.body.velocity);

  //this.angle = Phaser.Math.clamp(Phaser.Math.radToDeg(game.physics.arcade.angleToPointer(arm)), -90, 90);
  this.angle = fireAngle;
  this.body.gravity.set(gx, gy);

};

Bullet.prototype.update = function() {

  if (this.tracking)
  {
      this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
  }

  if (this.scaleSpeed > 0)
  {
      this.scale.x += this.scaleSpeed;
      this.scale.y += this.scaleSpeed;
  }

};

// array for storing ammo types
var Weapon = {};

//////////////////////////////////////////////////////
//  A single bullet is fired in front of the player //
//////////////////////////////////////////////////////

Weapon.SingleBullet = function(game) {

  Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);

  this.nextFire = 0;
  this.bulletSpeed = 600;
  this.fireRate = 400;

  for (var i = 0; i < 64; i++)
  {
      this.add(new Bullet(game, 'arrow'), true);
  }

  return this;

};

// Set SingleBullet as a subclass of Group
Weapon.SingleBullet.prototype = Object.create(Phaser.Group.prototype);
// Set SingleBullet's constructor to the function SingleBullet
Weapon.SingleBullet.prototype.constructor = Weapon.SingleBullet;

Weapon.SingleBullet.prototype.fire = function(source) {

  if (this.game.time.time < this.nextFire) { return; }

  var x = source.x - 8;
  var y = source.y + 3;

  // spawn location, orientation and weight of the bullet
  this.getFirstExists(false).fire(x, y, this.bulletSpeed, 0, 0);

  this.nextFire = this.game.time.time + this.fireRate;

};

var spriteBuild = function(game,scaleX,scaleY,x,y,src,frame){
	console.log("spriteBuild: create");
	Phaser.Sprite.call(this,game,x,y,src,frame);

	this.anchor.setTo(.5,.5);
	this.scale.setTo(scaleX,scaleY);
	this.game.physics.arcade.enableBody(this);   
    
    // add child sprite for sword
    this.sword = this.addChild(game.make.sprite(0, 0, 'platHero'));
    this.sword.scale.set(1.4,.2);
    game.physics.arcade.enable(this.sword);

    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;

    // push ammo type into array weapons
    // right now there's only one weapon type
    this.weapons.push(new Weapon.SingleBullet(this.game));
    
    // add a shitload of animations
    this.animations.add('SheathedWalkRight', [0, 1, 2, 3], 10, true);
    this.animations.add('SheathedWalkLeft', [4, 5, 6, 7], 10, true);
    this.animations.add('SwordWalkRight', [8, 9, 10, 11], 10, true);
    this.animations.add('SwordWalkLeft', [12, 13, 14, 15], 10, true);
    this.animations.add('SwordSlashRight', [16, 17, 18], 10, true);
    this.animations.add('SwordSlashLeft', [19, 20, 21], 10, true);
    this.animations.add('CrossbowWalkRight', [22, 23, 24, 25], 10, true);
    this.animations.add('CrossbowWalkLeft', [26, 27, 28, 29], 10, true);     
};

spriteBuild.prototype = Object.create(Phaser.Sprite.prototype);
spriteBuild.prototype.constructor = spriteBuild;

spriteBuild.prototype.update = function() {
    //this is still iffy, but instantiated controls for platformer
    //hitGround = game.physics.arcade.collide(this.body, this.ground);
    if ( game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) ) {
        // stop the player and attack
        if ( weapon == 'sword' ) {
            if ( player.body.onFloor() ) {
                this.body.velocity.x = 0;
            }
            if ( fireAngle == 0 ) {
                this.animations.play('SwordSlashRight');
            } else if ( fireAngle == 180 ) {
                this.animations.play('SwordSlashLeft');
            }
        } else if ( weapon == 'crossbow' ) {
            if ( player.body.onFloor() ) {
                this.body.velocity.x = 0;
            }
                this.weapons[this.currentWeapon].fire(this);
            if ( fireAngle == 0 ) {
                player.frame = 22;
            } else if ( fireAngle == 180 ) {
                player.frame = 26;
            }      
        } // do nothing if weapon == 'sheathed'
    } else if ( game.input.keyboard.isDown(Phaser.Keyboard.D) ) {
        fireAngle = 0;
        this.body.velocity.x = 180;
        if ( weapon == 'sword' ) {
            this.animations.play('SwordWalkRight');
        } else if ( weapon == 'crossbow' ) {
            this.animations.play('CrossbowWalkRight');
        } else if ( weapon == 'sheathed' ) {
            this.animations.play('SheathedWalkRight');
        }
    } else if ( game.input.keyboard.isDown(Phaser.Keyboard.A) ) {
        fireAngle = 180;
        this.body.velocity.x = -180;
        if ( weapon == 'sword' ) {
            this.animations.play('SwordWalkLeft');
        } else if ( weapon == 'crossbow' ) {
            this.animations.play('CrossbowWalkLeft');
        } else if ( weapon == 'sheathed' ) {
            this.animations.play('SheathedWalkLeft');
        }
    } else {
        this.body.velocity.x = 0;
        player.animations.stop();
        if ( weapon == 'sword' ) {
            if ( fireAngle == 0 ) {
                player.frame = 8;
            } else if ( fireAngle == 180 ) {
                player.frame = 12;
            }
        } else if ( weapon == 'crossbow' ) {
            if ( fireAngle == 0 ) {
                player.frame = 22;
            } else if ( fireAngle == 180 ) {
                player.frame = 26;
            }      
        } else if ( weapon == 'sheathed' ) {
            if ( fireAngle == 0 ) {
                player.frame = 0;
            } else if ( fireAngle == 180 ) {
                player.frame = 4;
            }            
        }
    }

    if ( game.input.keyboard.isDown(Phaser.Keyboard.W) && player.body.onFloor() ){
        this.body.velocity.y = -660;
    }

    if ( game.input.keyboard.isDown(Phaser.Keyboard.ONE) ) {
        weapon = 'sword';
    } else if ( game.input.keyboard.isDown(Phaser.Keyboard.TWO) ) {
        weapon = 'crossbow';
    } else if ( game.input.keyboard.isDown(Phaser.Keyboard.THREE) ) {
        weapon = 'sheathed';
    }
}