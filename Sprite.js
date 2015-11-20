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

// updates what animation the sprite is in based on an update function you create for your sprite
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
// updates the current frame of the animation of your sprite
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
// draws the animation wrapped at location based on centre x and y and a direction dirn
Sprite.prototype.drawWrappedAnimationdAt = function (ctx, cx, cy, dirn) {
    
    // Get "screen width"
    var sw = g_canvas.width;
    
    // Draw primary instance
    this.drawWrappedVerticalAnimationAt(ctx, cx, cy, dirn);
    
    // Left and Right wraps
    this.drawWrappedVerticalAnimationAt(ctx, cx - sw, cy, dirn);
    this.drawWrappedVerticalAnimationAt(ctx, cx + sw, cy, dirn);
};
// to help with the wrapping
Sprite.prototype.drawWrappedVerticalAnimationAt = function (ctx, cx, cy, dirn) {

    // Get "screen height"
    var sh = g_canvas.height;
    
    // Draw primary instance
    this.drawAnimationAt(ctx, cx, cy, dirn);
    
    // Top and Bottom wraps
    this.drawAnimationAt(ctx, cx, cy - sh, dirn);
    this.drawAnimationAt(ctx, cx, cy + sh, dirn);
};
// draws the sprite animation at a location based on centre x and y and a direction dirn
Sprite.prototype.drawAnimationAt = function (ctx, x, y, dirn) {
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
};
// draws the sprite at a loaction x,y
Sprite.prototype.drawAt = function(ctx,x,y){
    ctx.drawImage(this.image,x,y);
};
// draws the sprite so that it fills the screen
Sprite.prototype.drawFullscreen = function(ctx){
    ctx.drawImage(this.image,0,0,this.image.width,this.image.height,0,0,g_canvas.width,g_canvas.height);

};
// draws the sprite in a custom size
Sprite.prototype.drawCustomSize = function(ctx,x,y,width,height){
    ctx.drawImage(this.image,x,y,width,height);

};
