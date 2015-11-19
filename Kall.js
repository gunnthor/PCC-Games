
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
Kall.prototype.shootingTimeNominals = 0;
Kall.prototype.isRunning = false;
Kall.prototype.knockbakcNominals = 0;
Kall.prototype.pistolNominals = 0;
Kall.prototype.shotgunNominals = 0;
Kall.prototype.life = 5;

Kall.prototype.isDead = false;
Kall.prototype.isShot = false;
Kall.prototype.IS_SLOWING_DOWN = false;
Kall.prototype.IN_AIR = true;
Kall.prototype.winner = false;
Kall.prototype.velX = 0;
Kall.prototype.velY = 0;
Kall.prototype.accRate = 1;

Kall.prototype.health = 100;

Kall.prototype.numSubSteps = 1;

Kall.prototype.weaponList = ["pistol"];
Kall.prototype.gunSlot = 0;

Kall.prototype.width = 33;
Kall.prototype.height = 48;

//Kall.prototype.gunType = this.weaponList[0];

Kall.prototype.maybeFireBullet = function () {

    if (eatKey(this.KEY_FIRE)) {
    
        if(this.direction === "right") {
            var bulletX = this.cx + this.width/3*2;
            var bulletY = this.cy - this.height/3;
            var bulletXVel = 16;
        }

        else {
            var bulletX = this.cx - this.width/3*2;
            var bulletY = this.cy - this.height/3;
            var bulletXVel = -16;
        }

        if (this.gunType === "shotgun" && this.shotgunNominals <= 0){
            this.audio.playSound();
            this.isShooting = true;
            this.shootingTimeNominals = SECS_TO_NOMINALS/4;
            this.shotgunNominals = SECS_TO_NOMINALS/1.5;
            entityManager.fireBullet(
           bulletX, bulletY, bulletXVel, this.gunType);
            this.recoil();
        } else if(this.gunType === "pistol" && this.pistolNominals <= 0){
            this.audio.playSound();
            this.isShooting = true;
            this.shootingTimeNominals = SECS_TO_NOMINALS/4;
            this.pistolNominals = SECS_TO_NOMINALS;
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
    /*if (this.gunSlot < 2){
        this.pickupGuns("shotgun");
    }   */
};

Kall.prototype.switchGuns = function () {
    this.gunSlot++;
    if(this.gunSlot >= this.weaponList.length) {
        this.gunSlot = 0;
    }
    if(this.weaponList[this.gunSlot] === "pistol") {
        if(this.playerID === 1) {
            this.audio = g_sounds.pistolSound;
        } else {
            this.audio = g_sounds.pistolSound2;
        }
    } else if(this.weaponList[this.gunSlot] === "shotgun") {
        if(this.playerId === 1) {
            this.audio = g_sounds.shotgunSound;
        } else {
            this.audio = g_sounds.shotgunSound2;
        }
    }
    return this.gunType = this.weaponList[this.gunSlot];
};
Kall.prototype.pickupGun = function(weapon) {
    this.weaponList.push(weapon);
};

Kall.prototype.dropGun = function(weapon) {
    var slot;
    for(var i = 0; i < this.weaponList.length; i++) {
        if(this.weaponList[i] === weapon) {
            slot = i;
            this.weaponList.splice(slot, 1);
            if(this.gunSlot === i) {
                this.switchGuns();
            }
        }
    }
};
Kall.prototype.won = function(){
    this.winner = true;
};

Kall.prototype.takeBulletHit = function() {
    this.knockbakcNominals = 10;
    this.isShot = true;

    this.health -= 20;
    if(this.health <= 0) {
        this.life--;
        if(this.life < 0){
            this.isDead = true;
            this.life = 0;
            this.health = 0;
            entityManager.gameover();
            this.KEY_LEFT = undefined;
            this.KEY_RIGHT = undefined;
            this.KEY_JUMP = undefined;
            this.KEY_FIRE = undefined;
            
        }
        else{
            this.respawn();
            this.health = 100;   
        }
    }

};
Kall.prototype.respawn = function(){
    var level = levelManager.getLevel();
    var respawns = maps.levels[level-1].respawns;
    var i = Math.floor(Math.random() * respawns.length);
    this.cx = respawns[i].x;
    this.cy = respawns[i].y;
};


Kall.prototype.update = function(du) {
	
    // Unregister
    spatialManager.unregister(this);
    

    this.knockbakcNominals -= du;
    this.shootingTimeNominals -= du;
    this.pistolNominals -= du;
    this.shotgunNominals -=du;
    
    // Ef kallinn snertir eitthvað, þá verður hitEntity objecið sem að kallinn snerti
    var hitEntity = this.findHitEntity();
    //console.log(hitEntity.length);

    // Ef að hann snerti eitthvað, framkvæmum þá rétta aðgerð miðað við hvaða hlut hann snerti
    //if(hitEntity) 
    if(keys[this.KEY_JUMP])

    {
        if(!this.IN_AIR) this.jump();

    }

    if(!this.IN_AIR) 
    {

        for(var i = 0; i<hitEntity.length; i++)
        {
            if(hitEntity[i].type === "shotgun")
            {
                    //console.log("Touching a shotgun");
                    hitEntity[i].pickedUp();
                    this.pickupGun("shotgun");
            }
        }

        //the code in this if statement makes the player stop after he stops pressing movement keys
        if(!keys[this.KEY_LEFT] && !keys[this.KEY_RIGHT] && hitEntity != undefined)
        {

            var mostFriction = 1;

            //Skoða alla hluti sem ég er að snerta, og vel hlutinn sem er með mestann núning til að ákvarða næsta hraða
           for(var i = 0; i<hitEntity.length; i++)
           {
                
                if(typeof hitEntity[i].friction != "undefined")
                {
                    //console.log(hitEntity[i].friction);
                    mostFriction = hitEntity[i].friction;
                    //console.log("mostFriction : " + mostFriction);

                } 
           }
            
            this.velX *= mostFriction;
        }
            

    }
    

    this.sprite.updateKall(du,this.isRunning,this.IN_AIR,this.isShooting,this.isDead,this.isShot);

    this.isRunning = false;
    this.IN_AIR = true;
    if (this.shootingTimeNominals <= 0)
    {
        this.isShooting = false;
    }
    if (this.knockbakcNominals <= 0)
    {
        this.isShot = false;
    }

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

    // Update'a spatialPos
    //this.spatialPos = this.updateSpatialPos(this.cx, this.cy, this.width, this.height);


    // Register
    spatialManager.register(this);
};

Kall.prototype.render = function(ctx) {
    this.sprite.drawWrappedAnimationdAt(ctx,this.cx,this.cy,this.direction);
	var oldStyle = ctx.fillStyle;
    //ctx.fillText("Health: " + this.health + "%",this.scorePosX,this.scorePosY+25);
    ctx.fillStyle = "black";
    //ctx.fillRect(this.scorePosX-1,this.scorePosY-18, 142,22);
    // fyrir neðan eru commentuð út möguleg spawn locations
    /*
    ctx.fillRect(50,200,10,10);
    ctx.fillRect(50,360,10,10);
    ctx.fillRect(50,520,10,10);
    ctx.fillRect(g_canvas.width/2 - 110, 130,10,10);
    ctx.fillRect(g_canvas.width/2 + 100, 130,10,10);
    ctx.fillRect(g_canvas.width -60,200,10,10);
    ctx.fillRect(g_canvas.width -60,360,10,10);
    ctx.fillRect(g_canvas.width -60,520,10,10);
    ctx.fillRect(g_canvas.width/2 - 110, 450,10,10);
    ctx.fillRect(g_canvas.width/2 + 100, 450,10,10);*/
    ctx.fillRect(this.scorePosX-1,this.scorePosY-16, 102,22);
    ctx.fillStyle = "#b90000";
    ctx.fillRect(this.scorePosX,this.scorePosY-15, 100,20);
    ctx.fillStyle = "green";
    ctx.fillRect(this.scorePosX,this.scorePosY-15, this.health, 20)
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "yellow";
    ctx.font="20px Georgia", "bold";
    ctx.fillText("Player "+ this.playerID,this.scorePosX+13,this.scorePosY+1);
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.color
    ctx.font='small-caps 30px Georgia bold';
    ctx.fillText(this.weaponList[this.gunSlot],this.scorePosX+5,this.scorePosY+25);
    ctx.fillText(this.life,this.scorePosX+5,this.scorePosY+50);
    ctx.fillStyle = oldStyle;
    if (this.winner){
        ctx.fillText("Player "+ this.playerID + "won",g_canvas.width/2 - 100,g_canvas.height/2);
    }
    
};