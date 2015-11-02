function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

}

Bullet.prototype = new Entity();
    
// Initial, inheritable, default values
//Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 4;
//Bullet.prototype.velY = 1;
Bullet.prototype.width = 1;
Bullet.prototype.height = 1;


Bullet.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    /*this.rotation += 1 * du;
    this.rotation = util.wrapRange(this.rotation,
                                   0, consts.FULL_CIRCLE);*/

    this.wrapPosition();
    
    // TODO? NO, ACTUALLY, I JUST DID THIS BIT FOR YOU! :-)
    //
    // Handle collisions
    //
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        this.kill();
        spatialManager.unregister(this); 
        return entityManager.KILL_ME_NOW;
    }
    
    // TODO: YOUR STUFF HERE! --- (Re-)Register
    spatialManager.register(this);

};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
    // Make a noise when I am zapped by another bullet
    //this.zappedSound.play();
};

Bullet.prototype.render = function (ctx) {

    //var fadeThresh = Bullet.prototype.lifeSpan / 3;

    /*if (this.lifeSpan < fadeThresh) {
        ctx.globalAlpha = this.lifeSpan / fadeThresh;
    }*/

    g_sprites.bullet.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );

    //ctx.globalAlpha = 1;
};