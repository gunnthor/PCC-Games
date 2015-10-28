// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Ship(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;
    this.reset_rotation = this.rotation;
}

Ship.prototype.KEY_THRUST = 'W'.charCodeAt(0);
Ship.prototype.KEY_RETRO  = 'S'.charCodeAt(0);
Ship.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Ship.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Ship.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Ship.prototype.rotation = 0;
Ship.prototype.cx = 200;
Ship.prototype.cy = 200;
Ship.prototype.velX = 0;
Ship.prototype.velY = 0;
Ship.prototype.numSubSteps = 1;

Ship.prototype.update = function(du) {
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
	this.computeSubStep(dStep);
    }

    if (keys[this.KEY_FIRE]) {
	var relVel = 2;
	var relVelX = +Math.sin(this.rotation) * relVel;
	var relVelY = -Math.cos(this.rotation) * relVel;

	entityManager.fireBullet(
	   this.cx, this.cy,
	   this.velX + relVelX, this.velY + relVelY,
	   this.rotation);
    }
}

Ship.prototype.computeSubStep = function (du) {
    
    var thrust = this.computeThrustMag();

    // Apply thrust directionally, based on our rotation
    var accelX = +Math.sin(this.rotation) * thrust;
    var accelY = -Math.cos(this.rotation) * thrust;
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();
    
    if (thrust === 0 || g_allowMixedActions) {
        this.updateRotation(du);
    }
};

var NOMINAL_GRAVITY = 0.12;

Ship.prototype.computeGravity = function () {
    return g_useGravity ? NOMINAL_GRAVITY : 0;
};

var NOMINAL_THRUST = +0.2;
var NOMINAL_RETRO  = -0.1;

Ship.prototype.computeThrustMag = function () {
    
    var thrust = 0;
    
    if (keys[this.KEY_THRUST]) {
        thrust += NOMINAL_THRUST;
    }
    if (keys[this.KEY_RETRO]) {
        thrust += NOMINAL_RETRO;
    }
    
    return thrust;
};

Ship.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
    
    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    // bounce
    if (g_useGravity) {

	var minY = g_sprites.ship.height / 2;
	var maxY = g_canvas.height - minY;

	// Ignore the bounce if the ship is already in
	// the "border zone" (to avoid trapping them there)
	if (this.cy > maxY || this.cy < minY) {
	    // do nothing
	} else if (nextY > maxY || nextY < minY) {
            this.velY = oldVelY * -0.9;
            intervalVelY = this.velY;
        }
    }
    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};

Ship.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

Ship.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
}

Ship.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
    this.rotation = this.reset_rotation;
    
    this.halt();
};

Ship.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

var NOMINAL_ROTATE_RATE = 0.1;

Ship.prototype.updateRotation = function (du) {
    if (keys[this.KEY_LEFT]) {
        this.rotation -= NOMINAL_ROTATE_RATE * du;
    }
    if (keys[this.KEY_RIGHT]) {
        this.rotation += NOMINAL_ROTATE_RATE * du;
    }
};

Ship.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

Ship.prototype.render = function (ctx) {
    g_sprites.ship.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
};
