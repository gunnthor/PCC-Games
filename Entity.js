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

Entity.prototype.spatialPos = {left: 0, right: 0, top: 0, bottom: 0};

Entity.prototype.setup = function (descr) {

    // Apply all setup properies from the (optional) descriptor
    for (var property in descr) {
        this[property] = descr[property];
    }

    // Gefa öllum hlutum spatial pos strax, svo að blocks hafi ekki alltaf 0 í spatial pos.
    this.spatialPos = this.updateSpatialPos(this.cx, this.cy, this.width, this.height);
    
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

Entity.prototype.getInfo = function (){
    return {cx : this.cx, cy : this.cy, width : this.width, height : this.height, friction: this.friction};
};

Entity.prototype.getSpatialID = function () {
    return this._spatialID;
};

Entity.prototype.updateSpatialPos = function(cx, cy, width, height) {

    var blockWidth = 32;
    var blockHeight = 18;

    // Staðsetningar á hliðum:
    var left = cx - width/2;
    var right = left + width;
    var top = cy - height/2;
    var bottom = top + height;

    // spatialPositions:
    var leftPos = 0;
    var rightPos = 0;
    var topPos = 0;
    var bottomPos = 0;

    // booleans sem að segja til um hvort spatialPos sé fundið
    var leftFound = false;
    var rightFound = false;
    var topFound = false;
    var bottomFound = false;

    // Finnum rétt spatial positions:
    for(var i = 0; i <= 32; i++) {
        //console.log(left > i * this.blockWidth && !leftFound);
        if(left <= i * blockWidth && !leftFound) {
            leftPos = i - 1;
            leftFound = true;
        }

        if(right <= i * blockWidth && !rightFound) {
            rightPos = i - 1;
            rightFound = true;
        }

        if(top <= i * blockHeight && !topFound) {
            topPos = i - 1;
            topFound = true;
        }

        if(bottom <= i * blockHeight && !bottomFound) {
            bottomPos = i - 1;
            bottomFound = true;
        }
    }

    // Make the spatial positions wrap 
    leftPos = util.wrapRangeSpecial(leftPos, 0, 32);
    rightPos = util.wrapRangeSpecial(rightPos, 0, 32);
    topPos = util.wrapRangeSpecial(topPos, 0, 32);
    bottomPos = util.wrapRangeSpecial(bottomPos, 0, 32);

    // returnum objecti sem að inniheldur öll spatialPos
    return {leftPos: leftPos, rightPos: rightPos, topPos: topPos, bottomPos: bottomPos};
};

Entity.prototype.getSpatialPos = function () {
    return this.spatialPos;
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