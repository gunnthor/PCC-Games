function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

}

Bullet.prototype = new Entity();
    
// Initial, inheritable, default values
Bullet.prototype.cx;
Bullet.prototype.cy;
Bullet.prototype.velX;
Bullet.prototype.velY;
Bullet.prototype.width = 3;
Bullet.prototype.height = 3;


Bullet.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.wrapPosition();
    
    // Handle collisions
    //
    var hitEntity = this.findHitEntity();

    
    /*
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        this.kill();
        spatialManager.unregister(this); 
        return entityManager.KILL_ME_NOW;
    }*/
    spatialManager.register(this);

};

Bullet.prototype.takeBulletHit = function () {
    this.kill();
    
};

Bullet.prototype.render = function (ctx) {
    oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(this.cx,this.cy,this.width,this.height);
    ctx.fillStyle = oldStyle;
};