
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

	// This commented out segment of code will make some of the blocks in the map move,
	// but it was still buggy so we commented it out.


	/*
	if(!this.moving) return;

	spatialManager.unregister(this);

	var high;
	var low;

	if(this.moveDistance > 0) {
		
		high = this.startingCy;
		low = this.startingCy + this.moveDistance;
	}

	else {
		
		high = this.startingCy + this.moveDistance;
		low = this.startingCy;
	}

	if(this.cy >= low || this.cy < high) this.velY = -this.velY;

	this.cy += this.velY;

	spatialManager.register(this);

	if(this._isDeadNow) return entityManager.KILL_ME_NOW;*/
};

Block.prototype.determineSprite = function(){

	if(this.type === "shotgun") return g_sprites.shotgun;
	if(this.type === "brick_blue") return g_sprites.brick_blue;
	if(this.type === "brick_sand") return g_sprites.brick_sand;

};

Block.prototype.render = function(ctx) {	

	this.sprite.drawCustomSize(ctx, this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);	
};