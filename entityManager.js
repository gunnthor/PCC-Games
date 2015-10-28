/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_ships   : [],

_bShowRocks : false,

// "PRIVATE" METHODS

_generateRocks : function() {
    var i = this._rocks.length,
	NUM_ROCKS = 4;
    for( var z = 0;z < NUM_ROCKS; z++){
        this._rocks[i+z] = new Rock();
    }


    // TODO: Make `NUM_ROCKS` Rocks!
},

_findNearestShip : function(posX, posY) {

    // TODO: Implement this
    var min;
    var closestShip;
    var closestIndex;
    for(var z = 0; z < this._ships.length; z++){
        var shortestdisplacement = util.wrappedDistSq(this._ships[z].cx,this._ships[z].cy,posX,posY,g_canvas.width,g_canvas.height);
        if(min === undefined) min = shortestdisplacement;
        if (shortestdisplacement <= min){
            closestIndex = z;
            closestShip = this._ships[z];
            min = shortestdisplacement;
        }
    }
    // NB: Use this technique to let you return "multiple values"
    //     from a function. It's pretty useful!
    //
    return {
	theShip : closestShip,   // the object itself
	theIndex: closestIndex   // the array index where it lives
    };
},

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
	fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._rocks, this._bullets, this._ships];
},

init: function() {
    this._generateRocks();

    // I could have made some ships here too, but decided not to.
    //this._generateShip();
},

fireBullet: function(cx, cy, velX, velY, rotation) {

    // TODO: Implement this
    this._bullets.push(new Bullet({cx: cx ,cy: cy,velX: velX,velY: velY ,rotation: rotation }));
},

generateShip : function(descr) {
    // TODO: Implement this
    this._ships[this._ships.length] = new Ship(descr);
},

killNearestShip : function(xPos, yPos) {
    // TODO: Implement this
    var nearest = this._findNearestShip(xPos,yPos);
    this._ships.splice(nearest.theIndex,1);
    // NB: Don't forget the "edge cases"
},

yoinkNearestShip : function(xPos, yPos) {
    // TODO: Implement this
    var nearest = this._findNearestShip(xPos,yPos);
    nearest.theShip.cx = xPos;
    nearest.theShip.cy = yPos;
    nearest.theShip.halt();
    // NB: Don't forget the "edge cases"
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},	

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
},

update: function(du) {

    // TODO: Implement this
    for(var g = 0; g < this._bullets.length; g++){
        if(this._bullets[g].update(du)){
            this._bullets.splice(g,1);
        }
    }
    for(var s = 0; s < this._ships.length; s++){
        this._ships[s].update(du);
    }
    for(var x = 0; x < this._rocks.length; x++){
        this._rocks[x].update(du);
    }
    // NB: Remember to handle the "KILL_ME_NOW" return value!
    //     and to properly update the array in that case.
},

render: function(ctx) {

    // TODO: Implement this
    for(var g = 0; g < this._bullets.length; g++){
        this._bullets[g].render(ctx);
    }
    for(var s = 0; s < this._ships.length; s++){
        this._ships[s].render(ctx);
    }
    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects)
    if (this._bShowRocks){
        for(var x = 0; x < this._rocks.length; x++){
            this._rocks[x].render(ctx);
        }
    }

}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

entityManager.init();
