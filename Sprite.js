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
    this.animationState = "running";
    this.time = 0;
    this.frame = 0;
    this.frames = this.idleFrames;
    this.frameWidth = this.idleFrameWidth;
    this.frameHeight = this.idleFrameHeight;
    this.startX = this.idleEndX;
    this.startY = this.idleEndY;
    this.spriteX = this.startX;
    this.spriteY = this.startY;
    this.timeperframe = (SECS_TO_NOMINALS/this.idleFrames)*3;
};
Sprite.prototype.update = function (du,isRunning,isJumping,isShooting){
    this.time += du;
    //var isRunning = false;
    //if (xVel != 0) isRunning = true;

    if(isJumping && isShooting) this.updateAnimations("jumpShooting");
    else if (isJumping) this.updateAnimations("jumping");
    //else if (isRunning && isShooting) this.updateAnimations("runShooting");
    else if (isShooting) this.updateAnimations("shooting");
    else if (isRunning) this.updateAnimations("running");
    else  this.updateAnimations("idle");

    while (this.time > (this.frame + 1) * this.timeperframe){
        this.updateFrames();
    }
};
Sprite.prototype.updateAnimations = function(string){
    //console.log(string);
    if(string === this.animationState) return;
    switch(string){
        case "idle":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.idleFrames;
            this.frameWidth = this.idleFrameWidth;  
            this.frameHeight = this.idleFrameHeight;
            this.startX = this.idleEndX;
            this.startY = this.idleEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = (SECS_TO_NOMINALS/this.idleFrames)*3;
            break;
        case "jumping":
             this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.jumpingFrames;
            this.frameWidth = this.jumpingFrameWidth;
            this.frameHeight = this.jumpingFrameHeight;
            this.startX = this.jumpingEndX;
            this.startY = this.jumpingEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = (SECS_TO_NOMINALS/this.jumpingFrames);
            break;
        case "running":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.runningFrames;
            this.frameWidth = this.runningFrameWidth;
            this.frameHeight = this.runningFrameHeight;
            this.startX = this.runningEndX;
            this.startY = this.runningEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = (SECS_TO_NOMINALS/this.runningFrames)/2;
            break;
        case "jumpShooting":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.jumpShootingFrames;
            this.frameWidth = this.jumpShootingFrameWidth;
            this.frameHeight = this.jumpShootingFrameHeight;
            this.startX = this.jumpShootingEndX;
            this.startY = this.jumpShootingEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = SECS_TO_NOMINALS/this.jumpShootingFrames;
            break;
        case "shooting":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.shootingFrames;
            this.frameWidth = this.shootingFrameWidth;
            this.frameHeight = this.shootingFrameHeight;
            this.startX = this.shootingEndX;
            this.startY = this.shootingEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = SECS_TO_NOMINALS/this.shootingFrames;
            break;
        case "shot":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.shotFrames;
            this.frameWidth = this.shotFrameWidth;
            this.frameHeight = this.shotFrameHeight;
            this.startX = this.shotEndX;
            this.startY = this.shotEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = SECS_TO_NOMINALS/this.shotFrames;
            break;
        case "dead":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.deadFrames;
            this.frameWidth = this.deadFrameWidth;
            this.frameHeight = this.deadFrameHeight;
            this.startX = this.deadEndX;
            this.startY = this.deadEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = SECS_TO_NOMINALS/this.deadFrames;
            break;
        case "runShooting":
            this.time = 0;
            this.frame = 0;
            this.animationState = string;
            this.frames = this.runShootingFrames;
            this.frameWidth = this.runShootingFrameWidth;
            this.frameHeight = this.runShootingFrameHeight;
            this.startX = this.runShootingEndX;
            this.startY = this.runShootingEndY;
            this.spriteX = this.startX;
            this.spriteY = this.startY;
            this.timeperframe = SECS_TO_NOMINALS/this.runShootingFrames;
            break;
        default:
            break;
        }

};
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
    //this.updateFrames();
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
