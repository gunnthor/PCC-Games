
function Block(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    this.sprite = g_sprites.brick_blue;


    //this.rememberResets();
};

// Allir blocks erfa frá entity
Block.prototype = new Entity();

// Þegar við búum til nýja blocks, gefum við þeim staðsetningu og stærð
// cx, cy, width, height, friction.

Block.prototype.cx;
Block.prototype.cy;
Block.prototype.width;
Block.prototype.height;
Block.prototype.friction;//núningur á blockinu(t.d. ís eða drulla með eitthvað friction gildi(0.5 eða 1))
Block.prototype.maxVel;//Hæsti mögulegi hraðinn sem kallinn kemst á blokkinu

Block.prototype.update = function(du) {
	// Ekkert að gera hér
};

Block.prototype.render = function(ctx) {	

	
	this.sprite.drawAt(ctx, this.cx-this.width/2, this.cy-this.height/2);

	/*ctx.save();
	ctx.fillStyle = "blue";
	ctx.fillRect(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
	ctx.strokeRect(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
	ctx.restore();*/
	

};