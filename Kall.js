
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

Kall.prototype.KEY_LEFT;
Kall.prototype.KEY_RIGHT;
Kall.prototype.KEY_JUMP;
Kall.prototype.KEY_FIRE;

Kall.prototype.velX = 0;
Kall.prototype.velY = 0;
Kall.prototype.velXLimit = 10;
Kall.prototype.velYLimit = 25;
Kall.prototype.accRate = 1;

Kall.prototype.numSubSteps = 1;

Kall.prototype.width = 30;
Kall.prototype.height = 30;



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
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
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

    if(keys[this.KEY_LEFT]) accelX -= this.accRate;
    if(keys[this.KEY_RIGHT]) accelX += this.accRate;
    
    accelY += this.computeGravity();

    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();
};

Kall.prototype.computeGravity = function () {
    return NOMINAL_GRAVITY;
};

Kall.prototype.update = function(du) {
	
    // Unregister
    spatialManager.unregister(this);

    // Perform movement substeps
    var steps = this.numSubSteps;
    var dStep = du / steps;
    for (var i = 0; i < steps; ++i) {
        this.computeSubStep(dStep);
    }

    this.velLimit();

    // Ef kallinn snertir eitthvað, þá verður hitEntity objecið sem að kallinn snerti
    var hitEntity = this.findHitEntity();
    // Ef að hann snerti eitthvað, framkvæmum þá rétta aðgerð miðað við hvaða hlut hann snerti
    //if(hitEntity) 


    // Register
    spatialManager.register(this);
};

Kall.prototype.render = function(ctx) {
	
    ctx.fillStyle = this.color;
    ctx.fillRect(this.cx, this.cy, this.width, this.height);
    ctx.strokeRect(this.cx, this.cy, this.width, this.height);

};