function Bullet(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    //this.pistolSound.play();
}

Bullet.prototype = new Entity();
    
// Initial, inheritable, default values
Bullet.prototype.cx;
Bullet.prototype.cy;
Bullet.prototype.velX;
Bullet.prototype.velY;
Bullet.prototype.width = 6;
Bullet.prototype.height = 6;
//Bullet.prototype.pistolSound = new Audio("sounds/pistol.ogv");


Bullet.prototype.update = function (du) {

    spatialManager.unregister(this);

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.wrapPosition();
    
    // Handle collisions
    //
    
    var hitEntity = this.findHitEntity();
    console.log(hitEntity.length);

    if (typeof hitEntity != "undefined") {

        //console.log(hitEntity.length);

        if(hitEntity.length > 0)
        {
            this.kill();
            spatialManager.unregister(this); 
            return entityManager.KILL_ME_NOW;
        }
        
    }
    

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