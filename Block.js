
function Block(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

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

Block.prototype.update = function(du) {
	// Ekkert að gera hér
};

Block.prototype.render = function(ctx) {	

	ctx.save();
	ctx.fillStyle = "blue";
	ctx.fillRect(this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
	ctx.restore();


};