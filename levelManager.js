/*

levelManager.js
A manager that constructs each level
For example changes of background, terrain hitboxes..

*/

"use strict";

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var levelManager = {

	_level : 1,
	_levels : [],
	_numOfLevels : maps.levels.length,

	// choose next level
	nextLevel : function() {
		this._level++;
		if (this._level > this._numOfLevels) this._level = 1;
	},

	// clears the level so that it can be changed
	clear : function (){
		this._levels = [];
		entityManager.clear();
		spatialManager.clear();
	},

	// gets the current level
	getLevel : function() {
		
		return this._level;
	},

	// initiates the current level 
	initLevel : function() {
		this.generateLevel();
		this.generatePlayers();
	},

	// generates the players in the level
	generatePlayers : function() {

		//PLAYER 1 GENERATED
		entityManager.generateKall({
	        cx      :   g_canvas.width/2 -450,
	        cy      :   300,
	        color   :   "orange",
	        playerID:   1, 
	        scorePosX:  50,
	        scorePosY:  20,
	        direction:  "right",
	        KEY_LEFT:   'A'.charCodeAt(0),
	        KEY_RIGHT:  'D'.charCodeAt(0),
	        KEY_JUMP:   'W'.charCodeAt(0),
	        KEY_FIRE:   'S'.charCodeAt(0),
	        KEY_WEPS:   'E'.charCodeAt(0),
	        gunType:    "pistol",
	        sprite : g_sprites.player1,
	        audio  : g_sounds.pistolSound,
	        weaponList : ["pistol"],
	        gunSlot : 0
    	});

		//PLAYER 2 GENERATED
    	entityManager.generateKall({
	        cx      :   g_canvas.width/2 +450,
	        cy      :   300,
	        color   :   "orange",
	        playerID:   2,
	        scorePosX:  g_canvas.width  - 150,
	        scorePosY:  20,
	        direction:  "left",
	        KEY_LEFT:   'J'.charCodeAt(0),
	        KEY_RIGHT:  'L'.charCodeAt(0),
	        KEY_JUMP:   'I'.charCodeAt(0),
	        KEY_FIRE:   'K'.charCodeAt(0),
	        KEY_WEPS:   'O'.charCodeAt(0),
	        gunType:    "pistol", 
	        sprite : g_sprites.player2,
	        audio  : g_sounds.pistolSound2,
	        weaponList : ["pistol"],
	        gunSlot : 0
    	});
	},

	// generates the blocks in the level
	generateBlocks : function() {

	    //place all blocks from level_data(maps) and place them into this._levels
	    for(var i = 0; i<maps.levels[this._level-1].blocks.length; i++)
	    {   

	    	var currBlock = {
		        x : maps.levels[this._level-1].blocks[i].x,
		        y : maps.levels[this._level-1].blocks[i].y,
		        endx : maps.levels[this._level-1].blocks[i].endx,
		        endy : maps.levels[this._level-1].blocks[i].endy,
		        width : maps.levels[this._level-1].blocks[i].width,
		        height : maps.levels[this._level-1].blocks[i].height,
		        friction : maps.levels[this._level-1].blocks[i].friction,
		        moving : maps.levels[this._level-1].blocks[i].moving,
		        moveDistance : maps.levels[this._level-1].blocks[i].moveDistance,
		    	type : maps.levels[this._level-1].blocks[i].type
		    }

	    	this._levels[this._level].push(currBlock);

	    }

	},

	// generates the drops in the level
	generateDrops : function() {

		//place all drops from level_data(maps) and place them into this._levels
		for(var i = 0; i<maps.levels[this._level-1].drops.length; i++)
	    {
	    	var currDrop = {
		        x : maps.levels[this._level-1].drops[i].x,
	        	y : maps.levels[this._level-1].drops[i].y,
	        	endx : maps.levels[this._level-1].drops[i].endx,
	        	endy : maps.levels[this._level-1].drops[i].endy,
	        	width : maps.levels[this._level-1].drops[i].width,
	        	height : maps.levels[this._level-1].drops[i].height,
	        	type : maps.levels[this._level-1].drops[i].type,
	        	cooldown : maps.levels[this._level-1].drops[i].cooldown,
	        	visible : maps.levels[this._level-1].drops[i].visible,
	        	health : maps.levels[this._level-1].drops[i].health
		    }

		    this._levels[this._level].push(currDrop);
	    }
	},


	// generates the level
	generateLevel : function() {

		// Initializum spatial net
    	spatialManager.initializeSpatialNet();
    	
    	//levels er 2d array þar sem fyrir hvert level er array af þeim hitboxum sem á að gera fyrir levelið, þ.e.a.s. levels[level][object]
        
	    this._levels[this._level] = [];

	    this.generateBlocks();
	    this.generateDrops();

	    for(var i = 0; i<this._levels[this._level].length; i++)
	    {
	        entityManager.generateObjects(this._levels[this._level][i]);
	    }

	    entityManager.generateSpawnZones();

	},


	// renders the level
	render : function(ctx) {
		g_sprites.background[this._level-1].drawFullscreen(ctx);		
	}
}