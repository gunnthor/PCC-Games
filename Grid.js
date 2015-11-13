// constructor for the brick field

function Grid(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.gridwidth = (this.width / this.rows) - this.padding;
	this.gridheight = (this.height / this.collumns) - this.padding; 
	this.grid = [];
	this.BuildGrid();
	//this.Particles = new BrickParticles();
	//this.Drops = new Drops();//#FF033E
	//this.color = ["#FF033E","#FF686B", "#FFA69E", "#A5FFD6" ,"#84DCC6" ,"#FFFFFF" ,"#DBE4EE" ,"#DBE4EE"];
}

// builds the brick field using 2d arrays
Grid.prototype.BuildGrid = function(){
	//this.grid = [];
	for(c = 0; c < this.collumns; c++){
		this.grid[c] = []
		for(r = 0; r< this.rows; r++){
			this.grid[c][r] = 
			{	x : (this.startingX +((this.width / this.rows) * r)) , 
				y : (this.startingY +((this.height / this.collumns) * c)),
				life : this.collumns - c
			};
		}
	}
};

Grid.prototype.getGrid = function(){
	return this.grid;
}
/*
// removes a brick from the brick field
Bricks.prototype.remove = function(c,r){
	this.brick[c][r].life -= 1;
	this.Particles.brickExplode(this.brick[c][r].x,this.brick[c][r].y,this.brickwidth,this.brickheight);
	this.Drops.drop(this.brick[c][r].x,this.brick[c][r].y,this.brickwidth,this.brickheight);
	if(this.brick[c][r].life < 1){
		this.brick[c].splice(r,1);
	}
	if(this.brick[c].length === 0){
		this.brick.splice(c,1);
	}if(this.brick.length === 0){
		g_won = true;
		g_main.gameOver();
	}
};
*/
/*
// updates the brirckparticles and drops
Bricks.prototype.update = function(du){
	this.Particles.brickUpdate(du);
	this.Drops.update(du);
}
*/
// renders the grid and the drops and particles
Grid.prototype.render = function(ctx){
	for(c = 0; c < this.grid.length; c++){
		for(r = 0; r < this.grid[c].length; r++){
			ctx.save();
			ctx.beginPath();
			ctx.strokeStyle = "red";
			//ctx.fillStyle = this.color[this.brick[c][r].life -1];
			ctx.strokeRect(this.grid[c][r].x,this.grid[c][r].y,this.gridwidth,this.gridheight);
			ctx.closePath();
			ctx.restore();

		}
	}
};

// detects if the brick field has been hit
/*Bricks.prototype.collision = function (prevX,prevY,nextX,nextY,radius){
	if(
		(nextX + radius > this.startingX && nextX - radius < this.width + this.startingX) 
		&& 
		(nextY - radius < this.startingY + this.height && nextY + radius > this.startingY)
		)
	{
		return this.collisionWithBricks(prevX,prevY,nextX,nextY,radius);
	}
	return false;
};*/
/*
// if the brick field has been hit this function determines what brick was hit
Bricks.prototype.collisionWithBricks = function (prevX,prevY,nextX,nextY,radius){
	for(c = 0; c < this.brick.length; c++ ){
		for(r = 0; r < this.brick[c].length; r++){
			if(
				(
					(nextX + radius >= this.brick[c][r].x) 
					&& 
					(nextX - radius <= this.brick[c][r].x + this.brickwidth )
					) 
					&& 
					(
						(nextY + radius >= this.brick[c][r].y )
						&&
						(nextY - radius <= this.brick[c][r].y + this.brickheight)
					)
				){
				this.remove(c,r);
				return true;
			}
		}
	}
};*/