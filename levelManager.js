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


	nextLevel : function() {
		_level++

	},

	getLevel : function() {
		return _level;
	},

	initLevel : function() {
		this.generateLevel(this._level);
		this.generatePlayers();
	},

	generatePlayers : function() {

		//PLAYER 1 GENERATED
		entityManager.generateKall({
	        cx      :   g_canvas.width/2 -450,
	        cy      :   300,
	        color   :   "red",
	        playerID:   1, 
	        scorePosX:  10,
	        scorePosY:  20,
	        direction:  "right",
	        KEY_LEFT:   'A'.charCodeAt(0),
	        KEY_RIGHT:  'D'.charCodeAt(0),
	        KEY_JUMP:   'W'.charCodeAt(0),
	        KEY_FIRE:   'S'.charCodeAt(0),
	        KEY_WEPS:   'E'.charCodeAt(0),
	        health :    100,
	        gunType:    "pistol",
	        sprite : g_sprites.player1,
	        audio  : g_sounds.pistolSound
    	});

		//PLAYER 2 GENERATED
    	entityManager.generateKall({
	        cx      :   g_canvas.width/2 +450,
	        cy      :   300,
	        color   :   "green",
	        playerID:   2,
	        scorePosX:  g_canvas.width  - 150,
	        scorePosY:  20,
	        direction:  "left",
	        KEY_LEFT:   'J'.charCodeAt(0),
	        KEY_RIGHT:  'L'.charCodeAt(0),
	        KEY_JUMP:   'I'.charCodeAt(0),
	        KEY_FIRE:   'K'.charCodeAt(0),
	        KEY_WEPS:   'O'.charCodeAt(0),
	        health :    100,
	        gunType:    "pistol", 
	        sprite : g_sprites.player2,
	        audio  : g_sounds.pistolSound2
    	});
	},

	generateLevel : function() {
    //levels er 2d array þar sem fyrir hvert level er array af þeim hitboxum sem á að gera fyrir levelið, þ.e.a.s. levels[level][object]
        
	    this._levels[this._level] = [];

	    //place all objects from level_data(maps) and place them into this._levels
	    for(var i = 0; i<maps.levels[this._level-1].blocks.length; i++)
	    {        
	        this._levels[this._level][i] = {
	        x : maps.levels[this._level-1].blocks[i].x,
	        y : maps.levels[this._level-1].blocks[i].y,
	        endx : maps.levels[this._level-1].blocks[i].endx,
	        endy : maps.levels[this._level-1].blocks[i].endy,
	        width : maps.levels[this._level-1].blocks[i].width,
	        height : maps.levels[this._level-1].blocks[i].height,
	        friction : maps.levels[this._level-1].blocks[i].friction};
	    }


	    for(var i = 0; i<this._levels[this._level].length; i++)
	    {
	        entityManager.generateObjects(this._levels[this._level][i]);
	    }

	},

	//(ætli það þurfi update fall?)
	update : function(du) {
		//var sprite = g_sprites.backgroundLVL1 
	},

	render : function(ctx) {
		ctx.fillStyle = "Black";
		ctx.fillRect(0,0,1024,576);
		//ctx.drawImage(g_sprites.backgroundLVL1,0,0);
		//g_sprites.backgroundLVL1.drawAt(ctx,0,0);
		
	}
}