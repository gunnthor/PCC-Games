
function Drop(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);
    //this.sprite = this.determineSprite();
    this.sprite = this.determineSprite();

    this.startingCx = this.cx;
    this.startingCy = this.cy;

    //this.rememberResets();
};

// Allir blocks erfa frá entity
Drop.prototype = new Entity();

// Þegar við búum til nýja blocks, gefum við þeim staðsetningu og stærð
// cx, cy, width, height.

Drop.prototype.cx;
Drop.prototype.cy;
Drop.prototype.width;
Drop.prototype.height;
Drop.prototype.type;


Drop.prototype.update = function(du) {
	// Ekkert að gera hér
	

	//if(this._isDeadNow) return entityManager.KILL_ME_NOW;
};

Drop.prototype.determineSprite = function(){
	//if(this.friction === 0) return;
	//console.log(this.type);
	if(this.type === "shotgun") return g_sprites.shotgun;
	

};

Drop.prototype.render = function(ctx) {	

	//if(this.type === "shotgun") this.sprite.drawCustomSize(ctx, this.cx, this.cy, this.width, this.height)
	this.sprite.drawCustomSize(ctx, this.cx-this.width/2, this.cy-this.height/2, this.width, this.height);
	//console.log(this.type);
	
};