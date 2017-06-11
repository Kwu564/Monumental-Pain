/* spriteBuild.js
 * 6/13/2017
 * This file is a prefab for creating the player sprite used in 
 * PlayPlatform
*/
'use strict';
// globals
// determines whether the player should face right or left
// 0 degrees means right and 180 degrees means left
// this value is also used to set which direction to fire arrows at
var fireAngle = 0;
// defines default active weapon when entering a town
// there are three weapons: crossbow, sword, and sheathed
// sheathed just means the character puts away all weapons
var weapon = 'sword';

var spriteBuild = function(game,scaleX,scaleY,x,y,src,frame){
    console.log("spriteBuild: create");
    Phaser.Sprite.call(this,game,x,y,src,frame);
    //creates timer for the sprite
    var spriteTimer = game.time.create();
    // player health
    this.health = 4;
    //flag for determining when attack animation is finished playing 
    this.isAnimDone = 1;
    this.invincibility = 0;
    this.invincibilityDelay = 1;
    this.slashAnimRight = null;
    this.slashAnimLeft = null;
    this.crossbowAnimRight = null;
    this.crossbowAnimLeft = null;

    // sets anchor, scale, and enables body
    this.anchor.setTo(.5,.5);
    this.scale.setTo(scaleX,scaleY);
    this.game.physics.arcade.enableBody(this);
    
    // change collision box size
    this.body.setSize(25, 49, 25, 14); //(width, height, offsetX, offsetY)
    
    // sounds
    this.bump = game.add.audio('bump');
    this.attackSound = game.add.audio('attackSound');

    //direction value: positive is right, negative is left
    this.direction = 1;
    
    // Make an 'E' that appears over the player's head when they're on a door/npc
    this.notifier = this.addChild(game.make.text(0,-64,'E',{font:'Courier',fontsize:'24px',fill:'white',align:'center'}));
    this.notifier.visible = false; // will read true when over something that the player can interact with
    
    // PLAYER STATUS
    // this will determine what should happen during each update frame
    // eg. which animation to play, whether the player can move, 
    // whether the player is falling, etc.
    this.status = 'idle';
    this.toAnimate = null;        //animation to play after status is evaluated
    this.currentAnimation = null; //used to prevent animation cancelling
    this.airTime = 0;             //determines whether a thud sound is played on landing
    
    // add child sprite for sword
    this.sword = this.addChild(game.make.sprite(8, -16, 'collider'));
    this.sword.scale.set(30, 49);
    this.sword.alpha = 0;
    game.physics.arcade.enable(this.sword);

    this.weapons = [];
    this.currentWeapon = 0;
    this.weaponName = null;

    // push ammo type into array weapons
    // right now there's only one weapon type
    this.weapons.push(new Weapon.SingleBullet(this.game));
    
    // add a bunch of animations for a plethora of situations
    this.animations.add('SheathedWalkRight', [0, 1, 2, 3], 10, true);
    this.animations.add('SheathedWalkLeft', [4, 5, 6, 7], 10, true);
    this.animations.add('SwordWalkRight', [8, 9, 10, 11], 10, true);
    this.animations.add('SwordWalkLeft', [12, 13, 14, 15], 10, true);

    this.slashAnimRight = this.animations.add('SwordSlashRight', [16, 16, 16, 16, 17, 17, 18, 18], 25, false);

    this.slashAnimLeft = this.animations.add('SwordSlashLeft', [19, 19, 19, 19, 20, 20, 21, 21], 25, false);
    this.animations.add('CrossbowWalkRight', [22, 23, 24, 25], 10, true);
    this.animations.add('CrossbowWalkLeft', [26, 27, 28, 29], 10, true);

    this.crossbowAnimRight = this.animations.add('CrossbowFireRight', [22], 10, true);
    this.crossbowAnimLeft = this.animations.add('CrossbowFireLeft', [26], 10, true);

};

spriteBuild.prototype = Object.create(Phaser.Sprite.prototype);
spriteBuild.prototype.constructor = spriteBuild;
    
// UPDATE
spriteBuild.prototype.update = function() {
    // if the player is invicible (as they are after being hit), they become transparent
    if(this.invincibility === 1){
        this.alpha = .5;  
    }else{
        // otherwise they return to full opacity
        this.alpha = 1;
    }
    // destroy the sword sprite if the player isn't using a sward
    if(weapon != 'sword'){
        this.sword.destroy();
    }  
    if(canEnter) {  
        // attack with spacebar
        if ( game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR) || this.isAnimDone === 0 ) {
            //console.log(this.frame);

            // if they have a weapon set the players status to attacking
            if ( weapon !== 'sheathed' ) {
                this.status = 'attacking';
            }

            // If the player is on the ground, stop them, player cannot move and attack
            if(this.body.onFloor()) {
                this.body.velocity.x = 0;
            }

        // move right if the player presses D
        } else if ( game.input.keyboard.isDown(Phaser.Keyboard.D) ) {
            this.isAnimDone = 1;
            fireAngle = 0;
            this.status = 'walkingRight';
            // Increase the velocity by a factor, to provide acceleration
            if(this.body.onFloor()) {
                this.body.velocity.x += 20;
            } else {
                this.body.velocity.x += 10; // less control in air
            }
            //make sure the sword hitbox is on the right side of the player
            this.sword.position.x = 8;

        // move left if the player presses A
        } else if ( game.input.keyboard.isDown(Phaser.Keyboard.A) ) {
            this.isAnimDone = 1;
            fireAngle = 180;
            this.status = 'walkingLeft';
            // Decrease the velocity by a factor, to provide acceleration
            if(this.body.onFloor()) {
                this.body.velocity.x -= 20;
            } else {
                this.body.velocity.x -= 10; // less control in air
            }

            //make sure the sword hitbox is on the right side of the player
            this.sword.position.x = (-18) - this.sword.width;
        // if player is not jumping, or attacking, they are considered idle
        } else if ( !game.input.keyboard.isDown(Phaser.Keyboard.W) ){
            this.isAnimDone = 1;
            this.status = 'idle';
        }
        
        //JUMPING
        if(this.body.onFloor()) {
            // play a thud sound if the player was in the air too long before landing
            if(this.airTime > 30) {
                this.bump.play();
                this.status = 'landing';
            }
            else if(this.airTime > 0) {
                this.status = 'landing';
            }
            this.airTime = 0;
            // Jump, if button is pressed
            if(game.input.keyboard.justPressed(Phaser.Keyboard.W)) {
                this.isAnimDone = 1;
                this.status = 'jumping';
                this.body.velocity.y = -660;
            }
        }
        else {
            // If the body isn't onFloor, then it's in the air! -> add airtime!
            if(this.body.velocity.y > 0) {
                // Only add airtime if the player is *falling*, not rising
                this.airTime++;
            }
        }

        // EQUIP DIFFERENT WEAPONS
        // press 1 to equip sword, 2 for crossbow, 3 to sheath all weapons
        if ( game.input.keyboard.justPressed(Phaser.Keyboard.ONE) ) {
            weapon = 'sword';
            this.sword = this.addChild(game.make.sprite(8, -16, 'collider'));
            this.sword.scale.set(30, 49);
            this.sword.alpha = 0;
            game.physics.arcade.enable(this.sword);
        } else if ( game.input.keyboard.justPressed(Phaser.Keyboard.TWO) ) {
            weapon = 'crossbow';
        } else if ( game.input.keyboard.justPressed(Phaser.Keyboard.THREE) ) {
            weapon = 'sheathed';
        }
        
        // Perform actions on player based on this.status
        switch(this.status) {
            case 'attacking':
                this.playAttack();
                break;
            case 'walkingRight':
                this.playWalking();
                break;
            case 'walkingLeft':
                this.playWalking();
                break;
            case 'idle':
                this.playIdle();
                break;
            case 'jumping':
                this.playJump();
                break;
            case 'landing':
                this.playIdle();
                this.status = 'idle';
                break;
        }    
        // Friction adjustments
        // If the player isn't accelerating, then they are decelerating
        if(this.status === 'idle') {
            //If the velocity is very low, set it to 0
            if(this.body.velocity.x < 10 && this.body.velocity.x > -10) {
                this.body.velocity.x = 0;
            }
            else {
                if(this.body.onFloor()) {
                    //Ground friction:
                    //Divides the velocity every frame the player isn't moving
                    //increasing the dividend increases friction
                    this.body.velocity.x = this.body.velocity.x / 1.4;
                } else {
                    //Air friction: 
                    //slow down less than on ground
                    if(this.body.velocity.x > 0) {this.body.velocity.x -= 10;}
                    else if(this.body.velocity.x < 0) {this.body.velocity.x += 10;}
                }
            }
        }
        // Velocity Max and Min
        if(this.body.velocity.x > 300) {this.body.velocity.x = 300;}
        else if(this.body.velocity.x < -300) {this.body.velocity.x = -300;}
          
    }
    
}

//////////////////////////////////////////////////////
//      helper functions for animation grabbing     //
//////////////////////////////////////////////////////

// ATTACKING
spriteBuild.prototype.playAttack = function() {

    // add animations
    this.slashAnimRight.onComplete.add(function() {this.isAnimDone = 1}, this);
    this.slashAnimLeft.onComplete.add(function() {this.isAnimDone = 1}, this);
    this.crossbowAnimLeft.onComplete.add(function() {this.isAnimDone = 1}, this);
    this.crossbowAnimRight.onComplete.add(function() {this.isAnimDone = 1}, this);

    if ( this.isAnimDone === 1 ) {
        // when animation is done playing, reset the flag back to 0
        this.isAnimDone = 0;
    } else {
        // play the attack animations if isAnimDone = 0
        // play attack sounds and animations in the correct direction
        if ( weapon === 'sword' ) {
            this.attackSound.play();
            if ( fireAngle === 0 ) {
                this.animations.play('SwordSlashRight');
            } else if ( fireAngle === 180 ) {
                this.animations.play('SwordSlashLeft');
            }
        } else if ( weapon === 'crossbow' ) {
            this.isAnimDone = 1;
            if ( fireAngle === 0 ) {
                this.animations.play('CrossbowFireRight');
            } else if ( fireAngle === 180 ) {
                this.animations.play('CrossbowFireLeft');
            }      
        } else if ( weapon === 'sheathed' ) {
            this.isAnimDone = 1;
            //do nothing
        }
    }
}
// WALKING
spriteBuild.prototype.playWalking = function() {
    if(this.body.onFloor()) { //only walk animate if on the ground
        
    // Analyze the current weapon and direction, then assign the correct animation
    if(weapon === 'sheathed') {
        if(fireAngle === 0) {this.currentAnimation = this.animations.play('SheathedWalkRight');} 
        else {this.currentAnimation = this.animations.play('SheathedWalkLeft');}
    } else if(weapon === 'sword') {
        if(fireAngle === 0) {this.currentAnimation = this.animations.play('SwordWalkRight');} 
        else {this.currentAnimation = this.animations.play('SwordWalkLeft');}
    } else if(weapon === 'crossbow') {
        if(fireAngle === 0) {this.currentAnimation = this.animations.play('CrossbowWalkRight');} 
        else {this.currentAnimation = this.animations.play('CrossbowWalkLeft');}
    }
        
    }
    else {
        // Play single frame in midair, but still allow to change
        this.playIdle();
    }
}

// IDLE
spriteBuild.prototype.playIdle = function() {
    // Analyze the weapon and direction and set the right frame
    if(weapon === 'sheathed') {
        if(fireAngle === 0) {this.frame = 0} // Sheathed right
        else {this.frame = 4} // Sheathed left
    } else if(weapon === 'sword') {
        if(fireAngle === 0) {this.frame = 8} // Sword right
        else {this.frame = 12} // Sword left
    } else if(weapon === 'crossbow') {
        if(fireAngle === 0) {this.frame = 22} // Crossbow right
        else {this.frame = 26} // Crossbow left
    }
    
}

// JUMPING
spriteBuild.prototype.playJump = function() {
    this.airTime++;
    this.playIdle();
}


// BULLETS

//  Our core Bullet class
//  This is a simple Sprite object that we set a few properties on
//  It is fired by all of the Weapon classes
var Bullet = function(game, key) {

    Phaser.Sprite.call(this, game, 0, 0, key);

    this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

    this.anchor.set(0.5);

    this.enableBody = true;
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

// this sets the bullet to fire in the right direction
Bullet.prototype.fire = function (x, y, speed, gx, gy) {

    gx = gx || 0;
    gy = gy || 0;

    this.reset(x, y);
    this.scale.set(1);
    this.game.physics.arcade.velocityFromAngle(fireAngle, speed, this.body.velocity);

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


//////////////////////////////////////////////////////
//  A single bullet is fired in front of the player //
//////////////////////////////////////////////////////

Weapon.SingleBullet = function(game) {

Phaser.Group.call(this, game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
    this.nextFire = 10;
    this.bulletSpeed = 600;
    this.fireRate = 400;
    this.ref = null;


    for (var i = 0; i < 64; i++)
    {   
        this.ref = new Bullet(game, 'arrow');
        this.add(this.ref, true);

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