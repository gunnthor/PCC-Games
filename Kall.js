
function Kall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    //this.rememberResets();
};

// Kall erfir frá Entity.
Kall.prototype = new Entity();


Kall.prototype.cx;
Kall.prototype.cy;
Kall.prototype.color;
Kall.prototype.direction;

Kall.prototype.KEY_LEFT;
Kall.prototype.KEY_RIGHT;
Kall.prototype.KEY_JUMP;
Kall.prototype.KEY_FIRE;
Kall.prototype.KEY_WEPS;


Kall.prototype.isShooting = false;
Kall.prototype.shootingTimeNomials = 0;
Kall.prototype.isRunning = false;
Kall.prototype.pistolNomials = 0;
Kall.prototype.shotgunNomials = 0;

Kall.prototype.IS_SLOWING_DOWN = false;
Kall.prototype.IN_AIR = true;
Kall.prototype.velX = 0;
Kall.prototype.velY = 0;
Kall.prototype.velXLimit = 4;
Kall.prototype.velYLimit = 25;
Kall.prototype.accRate = 1;

Kall.prototype.numSubSteps = 1;

Kall.prototype.weaponList = ["pistol"];
Kall.prototype.gunSlot = 0;

Kall.prototype.width = 50;
Kall.prototype.height = 50;

//Kall.prototype.gunType = this.weaponList[0];

Kall.prototype.maybeFireBullet = function () {

    if (eatKey(this.KEY_FIRE)) {
    
        if(this.direction === "right") {
            var bulletX = this.cx + this.width/3*2;
            var bulletY = this.cy - this.height/3;
            var bulletXVel = 7;
        }

        else {
            var bulletX = this.cx - this.width/3*2;
            var bulletY = this.cy - this.height/3;
            var bulletXVel = -7;
        }

        if (this.gunType === "shotgun" && this.shotgunNomials <= 0){
            this.isShooting = true;
            this.shootingTimeNomials = SECS_TO_NOMINALS/4;
            this.shotgunNomials = SECS_TO_NOMINALS/2;
            entityManager.fireBullet(
           bulletX, bulletY, bulletXVel, this.gunType);
            this.recoil();
        }
        else if(this.gunType === "pistol" && this.pistolNomials <= 0){
            this.audio.playSound();
            this.isShooting = true;
            this.shootingTimeNomials = SECS_TO_NOMINALS/4;
            this.pistolNomials = SECS_TO_NOMINALS/2;
            entityManager.fireBullet(
           bulletX, bulletY, bulletXVel, this.gunType);
        } 
    }    
};

Kall.prototype.recoil = function() {
    
    if(this.direction === "right") this.velX -= 10;
    else this.velX += 10;

};


Kall.prototype.velLimit = function() {
    
    if(Math.abs(this.velX) > this.velXLimit) {
        
        this.velX /= Math.abs(this.velX)/this.velXLimit;
    }

    if(Math.abs(this.velY) > this.velYLimit) {
        
        this.velY /= Math.abs(this.velY)/this.velYLimit;
    }

};

Kall.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    this.prevCx = this.cx;
    this.prevCy = this.cy;
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    if(this.IN_AIR) accelX /= 2;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    var intervalVelX = aveVelX;
    var intervalVelY = aveVelY;
    
    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;
    var nextY = this.cy + intervalVelY * du;
    
    // s = s + v_ave * t
    this.cx += du * intervalVelX;
    this.cy += du * intervalVelY;
};

Kall.prototype.computeSubStep = function (du) {
    
    // Apply acceleration
    var accelX = 0;
    var accelY = 0;

    if(keys[this.KEY_LEFT]) {
        this.isRunning = true;
        accelX -= this.accRate;
        this.direction = "left";
    }
    if(keys[this.KEY_RIGHT]) {
        this.isRunning = true;
        accelX += this.accRate;
        this.direction = "right";
    }
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();
};

Kall.prototype.computeGravity = function () {
    return NOMINAL_GRAVITY;
};

Kall.prototype.jump = function () {
    this.velY -= 8;
    this.IN_AIR = true;
    if (this.gunSlot < 2){
        this.pickupGuns("shotgun");
    }
};

Kall.prototype.switchGuns = function () {
    this.gunSlot++;
    if(this.gunSlot >= this.weaponList.length) {
        this.gunSlot = 0;
    }
    return this.gunType = this.weaponList[this.gunSlot];
};
Kall.prototype.pickupGuns = function(weapon) {
    this.weaponList.push(weapon);
};


Kall.prototype.update = function(du) {
	
    // Unregister
    spatialManager.unregister(this);
    
    this.shootingTimeNomials -= du;
    this.pistolNomials -= du;
    this.shotgunNomials -=du;

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    if(eatKey(this.KEY_WEPS)) {
        this.switchGuns();
    }
    this.maybeFireBullet();
    
    this.velLimit();

    // Ef kallinn snertir eitthvað, þá verður hitEntity objecið sem að kallinn snerti
    var hitEntity = this.findHitEntity();
    // Ef að hann snerti eitthvað, framkvæmum þá rétta aðgerð miðað við hvaða hlut hann snerti
    //if(hitEntity) 
    if(keys[this.KEY_JUMP])

    {
        if(!this.IN_AIR) this.jump();

    }

    if(!this.IN_AIR) {

        if(!keys[this.KEY_LEFT] && !keys[this.KEY_RIGHT]) this.velX *= 0.7; //0.7 á að vera block.friction
    }

    this.sprite.update(du,this.isRunning,this.IN_AIR,this.isShooting);

    this.isRunning = false;
    this.IN_AIR = true;
    if (this.shootingTimeNomials <= 0)
    {
        this.isShooting = false;
    }

    // Register
    spatialManager.register(this);
};

Kall.prototype.render = function(ctx) {
    this.sprite.drawWrappedAnimationdAt(ctx,this.cx-this.width/2,this.cy-this.height/2,this.direction);
	/*oldStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
    ctx.strokeRect(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
    ctx.fillStyle = oldStyle;*/
    var oldStyle = ctx.fillStyle;
    ctx.fillStyle = this.color;
    ctx.font="20px Georgia, bold";
    ctx.fillText("Player "+ this.playerID + ": "+ this.weaponList[this.gunSlot],this.scorePosX,this.scorePosY);
    ctx.fillText("Health: " + this.health + "%",this.scorePosX,this.scorePosY+25);
    ctx.fillStyle = oldStyle;
    
};