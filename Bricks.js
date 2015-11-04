// constructor for the brick field

function Bricks(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.brickwidth = (this.width / this.rows) - this.padding;
	this.brickheight = (this.height / this.collumns) - this.padding; 
	this.BuildBricks();
}

// builds the brick field using 2d arrays
Bricks.prototype.BuildBricks = function(){
	this.brick = [];
	for(c = 0; c < this.collumns; c++){
		this.brick[c] = []
		for(r = 0; r< this.rows; r++){
			this.brick[c][r] = 
			{	x : (this.startingX +((this.width / this.rows) * r)) , 
				y : (this.startingY +((this.height / this.collumns) * c)),
				isHittable : false,
				isDrop : false
			};
		}
	}
};

Bricks.prototype.render = function(ctx){
	for(c = 0; c < this.brick.length; c++){
		for(r = 0; r < this.brick[c].length; r++){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "gray";
			ctx.strokeRect(this.brick[c][r].x,this.brick[c][r].y,this.brickwidth,this.brickheight);
			ctx.closePath();
			ctx.restore();
		}
	}
};
