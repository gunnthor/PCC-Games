// ======
// ENTITY
// ======
/*

Provides a set of common functions which can be "inherited" by all other
game Entities.

JavaScript's prototype-based inheritance system is unusual, and requires 
some care in use. In particular, this "base" should only provide shared
functions... shared data properties are potentially quite confusing.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


function Entity() {

/*
    // Diagnostics to check inheritance stuff
    this._entityProperty = true;
    console.dir(this);
*/
    //this.spatialPositions = 
};

Entity.prototype.spatialPositions = {leftPos: 0, rightPos: 0, topPos: 0, bottomPos: 0};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }
    
    // Get my (unique) spatial ID
    this._spatialID = spatialManager.getNewSpatialID();
    spatialManager.register(this);
    
    // I am not dead yet!
    this._isDeadNow = false;
};
Entity.prototype.prevCx;
Entity.prototype.prevCy;
Entity.prototype.lastCollision;
Entity.prototype.friction;

Entity.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Entity.prototype.getPos = function () {
    return {cx : this.cx, cy : this.cy};
};

/*Entity.prototype.getRadius = function () {
    return 0;
};*/
Entity.prototype.getInfo = function (){
    return {cx : this.cx, cy : this.cy, width : this.width, height : this.height, friction: this.friction};
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.kill = function () {
    this._isDeadNow = true;
};

Entity.prototype.findHitEntity = function () {
    var pos = this.getPos();
    var dimensions = this.getInfo();
    return spatialManager.findEntityInRange(
        pos.posX, pos.posY, dimensions.width, dimensions.height, this
    );
};

// This is just little "convenience wrapper"
Entity.prototype.isColliding = function () {
    return this.findHitEntity();
};

Entity.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};