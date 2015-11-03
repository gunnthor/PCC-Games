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

	_backgrounds : [],
	_level : 1,



	nextLevel : function() {
		_level++

	},

	getLevel : function() {
		return _level;
	},

	//(ætli það þurfi update fall?)
	update : function(du) {
		//var sprite = g_sprites.backgroundLVL1 
	},

	render : function(ctx) {
		//ctx.drawImage(g_sprites.backgroundLVL1,0,0);
		//g_sprites.backgroundLVL1.drawAt(ctx,0,0);
		g_sprites.backgroundLVL1.drawAt(ctx,0,0);
	}
}