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
_spawnZones : [],
_drops : [],
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

gameover : function(){
    for (var i = 0; i < this._kallar.length; i++){
        if(!this._kallar[i].isDead){
            this._kallar[i].won();
        }
    }
},


// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    
    this._categories = [this._blocks, this._kallar, this._bullets, this._drops];
},

clear : function (){
    for (var c = 0; c < this._categories.length; ++c) {
        this._categories[c].splice(0,this._categories[c].length);
    }
},

generateKall : function(descr) {
    this._kallar.push(new Kall(descr));
},

generateBlock : function(descr) {
    this._blocks.push(new Block(descr));
},

generateDrop : function(descr){
    this._drops.push(new Drop(descr));
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
            cy   : cy-6,
            velX : velX,
            velY : -0.6
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy-4,
            velX : velX,
            velY : -0.4
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy-2,
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
            cy   : cy+2,
            velX : velX,
            velY : 0.2
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy+4,
            velX : velX,
            velY : 0.4
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy+6,
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
         
            if(typeof cluster.friction != "undefined")
            {                
                this.generateBlock({
                    cx : i * cluster.width - cluster.width/2,
                    cy : n * cluster.height - cluster.height/2,
                    width : cluster.width,
                    height : cluster.height,
                    friction : cluster.friction,
                    moving : cluster.moving,
                    moveDistance : cluster.moveDistance,
                    type : cluster.type
                });
            }

            else
            {
                this.generateDrop({
                    cx : i * cluster.width - cluster.width/2,
                    cy : n * cluster.height - cluster.height/2,
                    width : cluster.width,
                    height : cluster.height,
                    type : cluster.type,
                    cooldown : cluster.cooldown,
                    visible : cluster.visible,
                    health : cluster.health
                });
            }
        }
    }
},

generateSpawnZones : function() {
    var respawns = this._blocks.slice();
    var checkCx;
    var checkCy;
    var leftEdge;
    var rightEdge;
    var topEdge;
    var bottomEdge;
    var cxInBlock;
    var cyInBlock;
    var edgeOfMap;
    
    
    
    for(var i = 0; i<respawns.length; i++)
    {
                
        //I get the coords of a block above the current block(regardless if one exists or not)
        checkCx = respawns[i].cx;
        checkCy = respawns[i].cy-respawns[i].height;
        
        //I check if such a block exists, and also check if the current block is at the top of the map
        //And if the block is moving, if I find a block that meet's any of these conditions, it is not a spawnzone
        for(var k = 0; k<respawns.length; k++)
        {

            leftEdge = respawns[k].cx - respawns[k].width/2;
            rightEdge = respawns[k].cx + respawns[k].width/2;
            topEdge = respawns[k].cy - respawns[k].height/2;
            bottomEdge = respawns[k].cy + respawns[k].height/2;

            cxInBlock = checkCx > leftEdge && checkCx < rightEdge;
            edgeOfMap = checkCy < 0;
            cyInBlock = (checkCy > topEdge && checkCy < bottomEdge) || edgeOfMap;

            var hasBlockAbove = cyInBlock && cxInBlock;
            
            var isMobile = (respawns[i].moving === undefined);
            if(hasBlockAbove || !isMobile === true) 
            {                
                respawns[i].type = "notSpawnZone";
                break;
            }
        }
    }

    //take all the spawnzones from respawn and place them into the spawnZones array    
    for(var t = 0; t<respawns.length; t++)
    {        
        if(respawns[t].type != "notSpawnZone")
        {            
            this._spawnZones.push(respawns[t]);
        } 
    }  

},

getSpawnZones : function() {    

    return this._spawnZones;    
},

getSurvivingPlayer : function() {
    for(var i = 0; i<this._kallar.length; i++)
    {
        if(this._kallar[i].health > 0) return this._kallar[i];
    }

},



update: function(du) {

    // Update spatialPos hér
    for(var i = 0; i < this._kallar.length; i++) {

        this._kallar[i].spatialPos = this._kallar[i].updateSpatialPos();
    }

    for(var i = 0; i < this._bullets.length; i++) {
        
        this._bullets[i].spatialPos = this._bullets[i].updateSpatialPos();
    }

    for(var i = 0; i < this._blocks.length; i++) {
        
        if(this._blocks[i].moving) {
            this._blocks[i].spatialPos = this._blocks[i].updateSpatialPos();
        }
    }    


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

