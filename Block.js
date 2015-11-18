
function Block(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    //this.sprite = this.determineSprite();
    this.sprite = this.determineSprite();

    this.startingCx = this.cx;
    this.startingCy = this.cy;

    //this.rememberResets();
};

// Allir blocks erfa frá entity
Block.prototype = new Entity();

// Þegar við búum til nýja blocks, gefum við þeim staðsetningu og stærð
// cx, cy, width, height.

Block.prototype.cx;
Block.prototype.cy;
Block.prototype.width;
Block.prototype.height;
Block.prototype.friction;//núningur á blockinu(t.d. ís eða drulla með eitthvað friction gildi(0.5 eða 1))
Block.prototype.maxVel;//Hæsti mögulegi hraðinn sem kallinn kemst á blokkinu
Block.prototype.type;

Block.prototype.moving = false;
Block.prototype.moveDistance;
Block.prototype.velY = 0.5;


Block.prototype.update = function(du) {
	// Ekkert að gera hér
	/*if(!this.moving) return;

	spatialManager.unregister(this);

	if(this.cy >= this.startingCy + this.moveDistance || this.cy < this.startingCy) this.velY = -this.velY;

	this.cy += this.velY;

	spatialManager.register(this);*/

	if(this._isDeadNow) return entityManager.KILL_ME_NOW;
};

Block.prototype.determineSprite = function(){
	//if(this.friction === 0) return;
	//console.log(this.type);
	if(this.type === "shotgun") return g_sprites.shotgun;
	if(this.type === "brick_blue") return g_sprites.brick_blue;

};

Block.prototype.render = function(ctx) {	

	//if(this.type === "shotgun") this.sprite.drawCustomSize(ctx, this.cx, this.cy, this.width, this.height)
	this.sprite.drawCustomSize(ctx, this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
	//console.log(this.type);
	
};