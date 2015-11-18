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
//Bullet.prototype.pistolSound = new Audio("sounds/pistol.ogv");


Bullet.prototype.update = function (du) {

    spatialManager.unregister(this);

    var hitEntity = this.findHitEntity();
    //console.log(hitEntity);

    if (typeof hitEntity != "undefined") {

        //console.log(hitEntity.length);

        if(hitEntity.length > 0)
        {
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
    
    // Handle collisions
    //
    //
    // Update'a spatialPos
    //this.spatialPos = this.updateSpatialPos(this.cx, this.cy, this.width, this.height);
    //console.log(this.spatialPos);
    

    /*
    //gamla útfærslan
    var hitEntity = this.findHitEntity();
    if (hitEntity) {
        var canTakeHit = hitEntity.takeBulletHit;
        if (canTakeHit) canTakeHit.call(hitEntity);
        this.kill();
        spatialManager.unregister(this); 
        return entityManager.KILL_ME_NOW;
    }*/
    
    spatialManager.register(this);

    //console.log(this.spatialPos);

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