
function Kall(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
};

// Kall erfir frá Entity.
Kall.prototype = new Entity();


Kall.prototype.cx;
Kall.prototype.cy;
Kall.prototype.color;

Kall.prototype.velX = 0;
Kall.prototype.velY = 0;
Kall.prototype.velXLimit = 5;



Kall.prototype.velXLimit = function() {
    
    if(Math.abs(this.velX) > this.maxVel) {
        
        this.velX /= Math.abs(this.velX)/this.maxVel;
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

Kall.prototype.update(du) {
	


};

Kall.prototype.render(ctx) {
	


};