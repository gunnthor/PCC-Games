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
_kallar : [],
_blocks : [],
_bullets : [],
_levels : [],


// "PRIVATE" METHODS

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
    
    this._categories = [this._kallar, this._blocks,this._bullets];
},

generateKall : function(descr) {
    this._kallar.push(new Kall(descr));
},

generateBlock : function(descr) {
    this._blocks.push(new Block(descr));
},

fireBullet : function(cx, cy, velX, gunType) {
    
    if(gunType === "pistol") {
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
            velY : -0.6
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : -0.4
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : -0.2
        }));

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
            velY : 0.2
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 0.4
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 0.6
        }));
    }
},


//This function generates a cluster of objects from slots x,y to endx,endy in the grid
//Each object in the cluster has a width and height, specified in cluster.width, cluster.height
generateObjects: function(cluster) {

    for(var i = cluster.x; i < cluster.endx; i++) {
        for(var n = cluster.y; n < cluster.endy; n++) {
            //console.log(i*block.width);
            this.generateBlock({
                cx : i * cluster.width - cluster.width/2,
                cy : n * cluster.height - cluster.height/2,
                width : cluster.width,
                height : cluster.height,
                friction : cluster.friction
            });

        }
    }
},

update: function(du) {

    // Update spatialPos á köllum og bullets hér
    for(var i = 0; i < this._kallar.length; i++) {

        this._kallar[i].spatialPos = this._kallar[i].updateSpatialPos();
    }

    for(var i = 0; i < this._bullets.length; i++) {
        
        this._bullets[i].spatialPos = this._bullets[i].updateSpatialPos();
    }

    ///////////////////////////////

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

