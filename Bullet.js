function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.velXLimit = 30;

    //this.pistolSound.play();
}

Bullet.prototype = new Entity();
    
// Initial, inheritable, default values
Bullet.prototype.cx;
Bullet.prototype.cy;
Bullet.prototype.velX;
Bullet.prototype.velY;
Bullet.prototype.width = 3;
Bullet.prototype.height = 3;
Bullet.prototype.lifeSpan = 1050 / NOMINAL_UPDATE_INTERVAL;

// updates the bullet
Bullet.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.lifeSpan -= du;
    if (this.lifeSpan < 0)
    {
        this.kill();
        spatialManager.unregister(this);
        return entityManager.KILL_ME_NOW;
    }

    var hitEntity = this.findHitEntity();
    //console.log(hitEntity);

    if (typeof hitEntity != "undefined") {

        //console.log(hitEntity.length);

        if(hitEntity.length > 0)
        {
            var canTakeHit = hitEntity[0].takeBulletHit;
            if (canTakeHit) canTakeHit.call(hitEntity[0]);

            this.kill();
            spatialManager.unregister(this); 
            return entityManager.KILL_ME_NOW;
        }
        
    }

    this.prevCx = this.cx;
    this.prevCy = this.cy;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.wrapPosition();
    spatialManager.register(this);
};

// functino that kills the bullet if it is hit
Bullet.prototype.takeBulletHit = function () {
    this.kill();
};

// renders the bullet
Bullet.prototype.render = function (ctx) {
    oldStyle = ctx.fillStyle;
    ctx.fillStyle = "white";
    ctx.fillRect(this.cx,this.cy,this.width,this.height);
    ctx.fillStyle = oldStyle;
};