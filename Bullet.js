 // ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
}

// Initial, inheritable, default values
//
// (You might want these to assist with early testing,
//  even though they are unnecessary in the "real" code.)
//

// Convert times from seconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3 * SECS_TO_NOMINALS;

Bullet.prototype.update = function (du) {
    
    // TODO: Implement this 
    var prevX = this.cx;
    var prevY = this.cy;
    var nextX = this.cx + this.velX * du;
    var nextY = this.cy + this.velY * du;
    this.cx = util.wrapRange(nextX,0,g_canvas.width);
    this.cy = util.wrapRange(nextY,0,g_canvas.height);;
    this.lifeSpan -= du;
    if (this.lifeSpan <= 0) {
        return entityManager.KILL_ME_NOW;
    }

    // NB: Remember to handle screen-wrapping... and "death"
};

Bullet.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

Bullet.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
}

Bullet.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

Bullet.prototype.render = function (ctx) {

    // TODO: Modify this to implement a smooth "fade-out" during
    // the last third of the bullet's total "lifeSpan"

    // NB: You can make things fade by setting `ctx.globalAlpha` to
    // a value between 0 (totally transparent) and 1 (totally opaque).

    var fadeThresh = Bullet.prototype.lifeSpan / 3;
    if(this.lifeSpan <= fadeThresh){
        ctx.save();
        ctx.globalAlpha = this.lifeSpan/60;
        g_sprites.bullet.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
        );
        ctx.restore();
    }
    // ..YOUR STUFF..
    else g_sprites.bullet.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.rotation
    );
    // ..YOUR STUFF..

};
