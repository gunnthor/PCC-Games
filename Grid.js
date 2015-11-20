// constructor for the brick field

function Grid(descr){
	for (var property in descr) {
        this[property] = descr[property];
    }
	this.gridwidth = (this.width / this.rows) - this.padding;
	this.gridheight = (this.height / this.collumns) - this.padding; 
	this.grid = [];
	this.BuildGrid();
}

// builds the brick field using 2d arrays
Grid.prototype.BuildGrid = function(){
	//this.grid = [];
	for(c = 0; c < this.collumns; c++){
		this.grid[c] = []
		for(r = 0; r< this.rows; r++){
			this.grid[c][r] = 
			{	cx : (this.startingX +((this.width / this.rows) * r)) , 
				cy : (this.startingY +((this.height / this.collumns) * c)),
				life : this.collumns - c
			};
		}
	}
};