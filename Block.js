
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
	ctx.fillRect(this.cx, this.cy, this.width, this.height);
	ctx.restore();

	/*
	//vinstri veggur
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(0, 350, 15, 227);
	ctx.restore();

	//hægri veggur
	ctx.save();
	ctx.fillStyle = "black";
	ctx.fillRect(1010, 350, 15, 227);
	ctx.restore();

	//gólf 1 
	ctx.save();
	ctx.fillStyle = "red";
	ctx.fillRect(15, g_canvas.height-20, 400, 20);
	ctx.restore();

	//gólf 2
	ctx.save();
	ctx.fillStyle = "green";
	ctx.fillRect(510, g_canvas.height-20, 500, 20);
	*/

};