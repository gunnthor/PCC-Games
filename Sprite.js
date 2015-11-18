// ============
// SPRITE STUFF
// ============

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// Construct a "sprite" from the given `image`,
//
function Sprite(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

};

Sprite.prototype.animationstate = "";
Sprite.prototype.time=0;
Sprite.prototype.frame= 0;
Sprite.prototype.frames= 0;
Sprite.prototype.frameWidth= 0;
Sprite.prototype.frameHeight= 0;
Sprite.prototype.startX= 0;
Sprite.prototype.startY = 0;
Sprite.prototype.spriteX= 0;
Sprite.prototype.spriteY= 0;
Sprite.prototype.timeperframe= 0;

Sprite.prototype.updateAnimations = function(animation){
    if(this.animationstate === animation.animationstate) return;
    this.animationstate = animation.animationstate;
    this.time = 0;
    this.frame = 0;
    this.frames = animation.frames;
    this.frameWidth = animation.frameWidth;
    this.frameHeight = animation.frameHeight;
    this.startX = animation.endX;
    this.startY = animation.endY;
    this.spriteX = animation.endX;
    this.spriteY = animation.endY;
    this.timeperframe = animation.timeperframe;
}
Sprite.prototype.updateFrames = function(){
        this.frame = (this.frame + 1) % this.frames;
        if (this.frame === 0){
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.time = 0;
        }
        else{
            this.spriteX -= this.frameWidth;
        }
};
Sprite.prototype.drawWrappedAnimationdAt = function (ctx, cx, cy, dirn) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalAnimationAt(ctx, cx, cy, dirn);
    
    // Left and Right wraps
    this.drawWrappedVerticalAnimationAt(ctx, cx - sw, cy, dirn);
    this.drawWrappedVerticalAnimationAt(ctx, cx + sw, cy, dirn);
};

Sprite.prototype.drawWrappedVerticalAnimationAt = function (ctx, cx, cy, dirn) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawAnimationAt(ctx, cx, cy, dirn);
    
    // Top and Bottom wraps
    this.drawAnimationAt(ctx, cx, cy - sh, dirn);
    this.drawAnimationAt(ctx, cx, cy + sh, dirn);
};
Sprite.prototype.drawAnimationAt = function (ctx, x, y, dirn) {
    
    //ctx.strokeStyle="#FF0000";
    //ctx.strokeRect(x,y,this.idleFrameWidth,this.idleFrameHeight);
    if (dirn === "right"){
    ctx.drawImage(this.image,this.spriteX,this.spriteY,this.frameWidth,this.frameHeight,
        (x-this.frameWidth/2),(y-this.frameHeight/2),this.frameWidth,this.frameHeight);
    }
    else {
        ctx.save();
        ctx.translate(this.frameWidth,0);
        ctx.scale(-1,1);
        ctx.drawImage(this.image,this.spriteX,this.spriteY,this.frameWidth,this.frameHeight,
        -(x-this.frameWidth/2),(y-this.frameHeight/2),this.frameWidth,this.frameHeight);
        ctx.restore();
    }
    //this.updateFrames();
};
Sprite.prototype.drawAt = function(ctx,x,y){
    ctx.drawImage(this.image,x,y);
};
Sprite.prototype.drawFullscreen = function(ctx){
    ctx.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,g_canvas.width,g_canvas.height);

};
Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation) {
    if (rotation === undefined) rotation = 0;
    
    var w = this.width,
        h = this.height;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.scale(this.scale, this.scale);
    
    // drawImage expects "top-left" coords, so we offset our destination
    // coords accordingly, to draw our sprite centred at the origin
    ctx.drawImage(this.image, 
                  -w/2, -h/2);
    
    ctx.restore();
};  

Sprite.prototype.drawWrappedCentredAt = function (ctx, cx, cy, rotation) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalCentredAt(ctx, cx, cy, rotation);
    
    // Left and Right wraps
    this.drawWrappedVerticalCentredAt(ctx, cx - sw, cy, rotation);
    this.drawWrappedVerticalCentredAt(ctx, cx + sw, cy, rotation);
};

Sprite.prototype.drawWrappedVerticalCentredAt = function (ctx, cx, cy, rotation) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawCentredAt(ctx, cx, cy, rotation);
    
    // Top and Bottom wraps
    this.drawCentredAt(ctx, cx, cy - sh, rotation);
    this.drawCentredAt(ctx, cx, cy + sh, rotation);
};
