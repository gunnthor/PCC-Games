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
_levels : [],

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

    // Initializum spatial net
    spatialManager.initializeSpatialNet();

    this.generateKall({
        cx      :   g_canvas.width/2 -450,
        cy      :   300,
        color   :   "blue",
        direction:  "right",
        KEY_LEFT:   'A'.charCodeAt(0),
        KEY_RIGHT:  'D'.charCodeAt(0),
        KEY_JUMP:   'W'.charCodeAt(0),
        KEY_FIRE:   'S'.charCodeAt(0),
        gunType:    "shotgun"
    });

    this.generateKall({
        cx      :   g_canvas.width/2 +450,
        cy      :   300,
        color   :   "red",
        direction:  "left",
        KEY_LEFT:   'J'.charCodeAt(0),
        KEY_RIGHT:  'L'.charCodeAt(0),
        KEY_JUMP:   'I'.charCodeAt(0),
        KEY_FIRE:   'K'.charCodeAt(0),
        gunType:    "normal" 
    });
    

    this.generateLevel(1);


},

generateKall : function(descr) {
    this._kallar.push(new Kall(descr));
},

generateBlock : function(descr) {
    this._blocks.push(new Block(descr));
},

fireBullet : function(cx, cy, velX, gunType) {
    if(gunType === "normal") {
        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 0
        }));
    }

    if(gunType === "shotgun") {
        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 0
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : -1
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 1
        }));
    }
},

//fall sem setur upplýsingar um levelið í fylki og generatear blocks - breyta seinna
generateLevel : function(level) {
    //kalla á þetta í init functioninu hérna uppi í bili, tek inn level = 1
    //levels er 2d array þar sem fyrir hvert level er array af þeim hitboxum sem á að gera fyrir levelið, þ.e.a.s. levels[level][block]
    

    
    this._levels[level] = [];

    //console.log(maps.levels[level-1].blocks[0].friction);

    
    for(var i = 0; i<maps.levels[level-1].blocks.length; i++)
    {
        //console.log(i);
        this._levels[level][i] = {
        x : maps.levels[level-1].blocks[i].x,
        y : maps.levels[level-1].blocks[i].y,
        endx : maps.levels[level-1].blocks[i].endx,
        endy : maps.levels[level-1].blocks[i].endy,
        width : maps.levels[level-1].blocks[i].width,
        height : maps.levels[level-1].blocks[i].height,
        friction : maps.levels[level-1].blocks[i].friction};
    }


    for(var i = 0; i<this._levels[level].length; i++)
    {
        this.generateObjects(this._levels[level][i]);
    }

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
generateObjects: function(block) {


    for(var i = block.x; i < block.endx; i++) {
        for(var n = block.y; n < block.endy; n++) {
            //console.log(i*block.width);
            this.generateBlock({
                cx : i * block.width - block.width/2,
                cy : n * block.height - block.height/2,
                width : block.width,
                height : block.height,
                friction : block.friction
            });

        }
    }
},

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

    // Resetta spatial netið hér
    spatialManager.resetSpatialNet();
    
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

