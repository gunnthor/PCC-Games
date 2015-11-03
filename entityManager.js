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

/*_rocks   : [],
_bullets : [],
_ships   : [],

_bShowRocks : true,*/

// "PRIVATE" METHODS

/*_generateRocks : function() {
    var i,
        NUM_ROCKS = 4;

    for (i = 0; i < NUM_ROCKS; ++i) {
        this.generateRock();
    }
},

_findNearestShip : function(posX, posY) {
    var closestShip = null,
        closestIndex = -1,
        closestSq = 1000 * 1000;

    for (var i = 0; i < this._ships.length; ++i) {

        var thisShip = this._ships[i];
        var shipPos = thisShip.getPos();
        var distSq = util.wrappedDistSq(
            shipPos.posX, shipPos.posY, 
            posX, posY,
            g_canvas.width, g_canvas.height);

        if (distSq < closestSq) {
            closestShip = thisShip;
            closestIndex = i;
            closestSq = distSq;
        }
    }
    return {
        theShip : closestShip,
        theIndex: closestIndex
    };
},*/
_kallar : [],
_blocks : [],
_bullets : [],


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
    //this._categories = [this._rocks, this._bullets, this._ships];
    this._categories = [this._kallar, this._blocks,this._bullets];
},

init: function() {
    //this._generateRocks();
    //this._generateShip();
    this.generateKall({
        cx      :   300,
        cy      :   300,
        color   :   "blue",
        direction:  "right",
        KEY_LEFT:   'A'.charCodeAt(0),
        KEY_RIGHT:  'D'.charCodeAt(0),
        KEY_JUMP:   'W'.charCodeAt(0),
        KEY_FIRE:   'S'.charCodeAt(0)
    });
    
    //vinstri veggur
    this.generateBlock({
        cx : 7.5,
        cy : 450,
        width : 15,
        height : 227
    });

    //hægri veggur
    this.generateBlock({
        cx : g_canvas.width-7.5,
        cy : 450,
        width : 15,
        height : 227
    });

    //vinstra gólf
    this.generateBlock({
        cx : 210,
        cy : g_canvas.height-23,
        width : 400,
        height : 20
    });

    //hægra gólf
     this.generateBlock({
        cx : 780,
        cy : g_canvas.height-10,
        width : 500,
        height : 20
    });

     //hægri pallur

     this.generateBlock({
        cx : 950,
        cy : g_canvas.height-100,
        width : 120,
        height : 20

     });

     this.generateBlock({
        cx : g_canvas.width/2,
        cy : g_canvas.height/2,
        width : 100,
        height : 20
     });
     this.generateBlock({
        cx : g_canvas.width/2 + 200,
        cy : g_canvas.height/2 +100,
        width : 100,
        height : 20
     });
     this.generateBlock({
        cx : g_canvas.width/2 + 200,
        cy : g_canvas.height/2 - 100,
        width : 100,
        height : 20
     });
     this.generateBlock({
        cx : g_canvas.width/2 + 400,
        cy : g_canvas.height/2 -150,
        width : 100,
        height : 20
     });


},

generateKall : function(descr) {
    this._kallar.push(new Kall(descr));
},

generateBlock : function(descr) {
    this._blocks.push(new Block(descr));
},

fireBullet: function(cx, cy, velX) {
    this._bullets.push(new Bullet({
        cx   : cx,
        cy   : cy,
        velX : velX
    }));
},
/*
generateRock : function(descr) {
    this._rocks.push(new Rock(descr));
},

generateShip : function(descr) {
    this._ships.push(new Ship(descr));
},

killNearestShip : function(xPos, yPos) {
    var theShip = this._findNearestShip(xPos, yPos).theShip;
    if (theShip) {
        theShip.kill();
    }
},

yoinkNearestShip : function(xPos, yPos) {
    var theShip = this._findNearestShip(xPos, yPos).theShip;
    if (theShip) {
        theShip.setPos(xPos, yPos);
    }
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},	

toggleRocks: function() {
    this._bShowRocks = !this._bShowRocks;
},*/

update: function(du) {

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];
        var i = 0;

        while (i < aCategory.length) {

            var status = aCategory[i].update(du);

            if (status === this.KILL_ME_NOW) {
                // remove the dead guy, and shuffle the others down to
                // prevent a confusing gap from appearing in the array
                aCategory.splice(i,1);
            }
            else {
                ++i;
            }
        }
    }
    
    //if (this._rocks.length === 0) this._generateRocks();

},

render: function(ctx) {

    var debugX = 10, debugY = 100;

    for (var c = 0; c < this._categories.length; ++c) {

        var aCategory = this._categories[c];

        for (var i = 0; i < aCategory.length; ++i) {

            aCategory[i].render(ctx);
            //debug.text(".", debugX + i * 10, debugY);

        }
        debugY += 10;
    }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

