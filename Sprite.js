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
    

    //this.width = image.width;
    //this.height = image.height;
    this.scale = 1;
    this.tick = 0;
    this.frame = 0;
    this.frames = this.runningFrames;
    this.frameWidth = this.runningFrameWidth;
    this.frameHeight = this.runningFrameHeight;
    this.startX = this.runningEndX;
    //this.startX = this.runningStartX;
    this.startY = this.runningEndY;
    //this.startY = this.runningStartY;
    this.spriteX = this.startX;
    this.spriteY = this.startY;
    this.ticksperframe = 60/this.runningFrames;
    /*this.frames = this.idleFrames
    this.frameWidth = this.idleFrameWidth;
    this.frameHeight = this.idleFrameHeight;
    this.startX = this.idleEndX;
    this.startY = this.idleEndY;
    this.spriteX = this.startX;
    this.spriteY = this.startY;
    this.ticksperframe = 60/this.idleFrames;*/
};
Sprite.prototype.updateAnimations = function(){

};
Sprite.prototype.updateFrames = function(){
    this.tick++;
    if (this.tick >= this.ticksperframe)
    {
        this.frame = (this.frame + 1) % this.frames;
        if (this.frame === 0){
            this.spriteX = this.startX;
            this.spriteY = this.startY;
        }
        else{
            this.spriteX -= this.frameWidth;
        }
        this.tick = 0;
    }
};
Sprite.prototype.drawAnimationAt = function (ctx, x, y, dirn) {
    
    //ctx.strokeStyle="#FF0000";
    //ctx.strokeRect(x,y,this.idleFrameWidth,this.idleFrameHeight);
    if (dirn === "right"){
    ctx.drawImage(this.image,this.spriteX,this.spriteY,this.frameWidth,this.frameHeight,
        x,y,this.frameWidth,this.frameHeight);
    }
    else {
        ctx.save();
        ctx.translate(this.frameWidth,0);
        ctx.scale(-1,1);
        ctx.drawImage(this.image,this.spriteX,this.spriteY,this.frameWidth,this.frameHeight,
        -x,y,this.frameWidth,this.frameHeight);
        ctx.restore();
    }
    this.updateFrames();
};
Sprite.prototype.drawAt = function(ctx,x,y){
    ctx.drawImage(this.image,x,y);
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
