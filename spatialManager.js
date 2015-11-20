/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/
var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

_grid : undefined,

// "PRIVATE" METHODS
//
// <none yet>

// The spatial net is a 2d array which "makes a net" over every location possible on the canvas. 
// In each of these locations, the spatial ID's  of every object that's in that location are held.
spatialNet : [],

firstRegister : true,
registeredLocations : [],

blockWidth : g_canvas.width / 32,
blockHeight : g_canvas.height / 32,


// PUBLIC METHODS
clear : function(){
this._nextSpatialID = 1; // make all valid IDs non-falsey (i.e. don't start at 0)
this._entities = [];
this._grid = undefined;
this.spatialNet = [];
this.firstRegister = true;
// Registered locations is an array which holds all the places in the spatial net which where changed
// in this iteration, so that they can be reverted before the next iteration.
this.registeredLocations = [];
this.blockWidth = g_canvas.width / 32;
this.blockHeight = g_canvas.height / 32;
},

initializeSpatialNet : function() {
    
    // Create a 32 by 32 array for the spatial net
    for(var i = 0; i < 32; i++) {

        this.spatialNet[i] = [];
        
        for(var n = 0; n < 32; n++) {
            
            this.spatialNet[i][n] = [];
        }
    }
},

registerInSpatialNet : function(left, right, top, bottom, spatialID) {

    // Register an object in it's location in the spatial net
    
    for(var i = left; i <= right; i++) {
        
        for(var n = top; n <= bottom; n++) {
            
            this.spatialNet[i][n].push(spatialID);
            this.registeredLocations.push([i,n]);
        }
    }
},

checkSpatialPos : function(left, right, top, bottom) {

    // Check if there is something in the given locations, 
    // by scanning a part of the spatial net for it.
    for(var i = left; i !== right + 1; i++) {

        // if any locations reaches 32, wrap it to 0
        if(i === 32) {

            i = 0;
            if(i === right) break;
        }
        
        // If there's anything in the location, return true
        for(var n = top; n <= bottom; n++) {

            if(typeof this.spatialNet[i][n][0] === "number") return true;
        }
    }

    // nothing was found, that location was empty
    return false;
},

resetSpatialNet : function() {
    
    // Clear the locations in the spatial net which we registered last iteration.

    // Unless if it's the first register, so that the blocks won't be cleared.
    // The blocks are registered once in the spatialNet( the ones that arent moving atleast)
    // and then they aren't registered ever again, because they are never updated, which
    // is fine.
    if(this.firstRegister) {
        this.firstRegister = false;
        this.registeredLocations = [];
        return;
    }

    
    // Remove every location from the spatial net that we registered last iteration:
    for(var x = 0; x < this.registeredLocations.length; x++) {
        
        var i = this.registeredLocations[x][0];
        var n = this.registeredLocations[x][1];
        var last = this.spatialNet[i][n].length-1;

        this.spatialNet[i][n].splice(last,1);
    }

    // Empty the registeredLocations array, so that we can use it again next iteration.
    this.registeredLocations = [];
},

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    // check if any of the identities are dead and if they are dead give that spatialId to a new entity
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if( e._isDeadNow) {
            e._isDeadNow = false;
            return ID;
        }
    }
    // If no entiites were dead assign a new spatial ID
    var spatialID = this._nextSpatialID;
    this._nextSpatialID++;
    return spatialID;


},

init: function() {

    this._grid =  new Grid({
        width : g_canvas.width,
        height : g_canvas.height,
        padding : 0,
        rows: 32,
        collumns : 32,
        startingX : 0,
        startingY : 0
    });
},

getGrid : function() {

    return this._grid;
},


// BREYTA AÐEINS

register: function(entity) {
    var pos = entity.getPos();
    var dimensions = entity.getInfo();

    // Get the spatialPosition of the object.
    var spatialPos = entity.getSpatialPos();

    // Register the object in the spatial net.
    this.registerInSpatialNet(spatialPos.leftPos, spatialPos.rightPos, spatialPos.topPos, spatialPos.bottomPos, entity._spatialID);

    var spatialID = entity.getSpatialID();
    this._entities[spatialID] = entity;
    this._entities[spatialID].isUndefined = false;
    // TODO: YOUR STUFF HERE!
},

unregister: function(entity) 
{
    // TODO: YOUR STUFF HERE!
    var pos = entity.getPos();
    var dimensions = entity.getInfo();
    var spatialID = entity.getSpatialID();
    var spatialPos = entity.spatialPos;
    this._entities[spatialID].isUndefined = true;
    entity.lastCollision = undefined;
    
},

findEntityInRange: function(colEntity) {

    // Get the spatial positions of the colliding entity.
    var left = colEntity.spatialPos.leftPos;
    var right = colEntity.spatialPos.rightPos;
    var top = colEntity.spatialPos.topPos;
    var bottom = colEntity.spatialPos.bottomPos;

    // Check if there is anything in the same locations in the spatial net as the
    // colliding entity. If not, we just return and won't do any collision detection.
    if(!this.checkSpatialPos(left, right, top, bottom)) return;

    //every time I collide with an entity, I push into this array
    var _hitentities = [];

    // variables for all the sides of the object 
    var right = colEntity.cx + colEntity.width/2 ;
    var prevRight = colEntity.prevCx + colEntity.width/2;

    var left = colEntity.cx - colEntity.width/2;
    var prevLeft = colEntity.prevCx - colEntity.width/2;

    var bottom = colEntity.cy + colEntity.height/2;
    var prevBottom = colEntity.prevCy + colEntity.height/2;

    var top = colEntity.cy - colEntity.height/2;
    var prevTop = colEntity.prevCy - colEntity.height/2;
    
    // Check against all entitys
    //console.log("start", prevLeft, prevRight, prevBottom, prevTop);

    for(var i = 1; i < this._entities.length; i++) {
        
        //if(colEntity.getSpatialID() === i) continue;

        // Get an object with the entity coords and size
        var entity = this._entities[i];
        //console.log(entity.friction);

        if (entity.isUndefined) continue;

        if(entity.visible === false) continue;

        //variables for all the sides of the entities being checked

        var entRight = entity.cx + entity.width/2;

        var entLeft = entity.cx - entity.width/2;

        var entTop =  entity.cy - entity.height/2;

        var entBottom = entity.cy + entity.height/2;


        // Collision with the Top and Bottom of a entity

        // Check for x coords
        if(right - 1 > entLeft &&
            left + 1 < entRight) {
            
            // Check for y coords on top collision
            if(prevBottom <= entTop &&
                bottom >= entTop) {
                    
                // Do this
                if(Math.abs(colEntity.cy - colEntity.prevCy) <= colEntity.velYLimit*2) {
                    colEntity.cy = entity.cy - entity.height/2 - colEntity.height/2;
                    colEntity.velY = 0;
                    colEntity.IN_AIR = false;
                    _hitentities.push(entity);
                    
                }
            }

            // Check for y coords on bottom collision
            else if(prevTop >= entBottom &&
                    top <= entBottom) {
                        
                // Do this
                if(Math.abs(colEntity.cy - colEntity.prevCy) <= colEntity.velYLimit*2) {
                    colEntity.cy = entity.cy + entity.height/2 + colEntity.height/2;
                    colEntity.velY = 0;
                    _hitentities.push(entity);
                }
            }
        }

        // Collision with the Sides of a entity

        // Check for y coords
        if(bottom - 1 > entTop &&
            top < entBottom) {
            
            // Check for x coords on left collision
            if(prevRight <= entLeft &&
                right >= entLeft) {
                
                // Do this
                if(Math.abs(colEntity.cx - colEntity.prevCx) <= colEntity.velXLimit*2) {
                    colEntity.cx = entity.cx - entity.width/2 - colEntity.width/2;
                    colEntity.velX = 0;
                    _hitentities.push(entity);
                }
            }

            // Check for x coords on right collision
            else if(prevLeft >= entRight &&
                    left <= entRight) {
                     
                // Do this
                if(Math.abs(colEntity.cx - colEntity.prevCx) <= colEntity.velXLimit*2) {
                    colEntity.cx = entity.cx + entity.width/2 + colEntity.width/2;
                    colEntity.velX = 0;
                    _hitentities.push(entity);
                }
            }
        }
        
    }


    return _hitentities;


},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    var oldFill = ctx.fillStyle;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "#39FF14";
   
     for (var ID in this._entities) {
        var e = this._entities[ID];
        if(e.isUndefined) continue;
        ctx.strokeRect(e.cx - e.width/2, e.cy - e.height/2, e.width, e.height );
        ctx.fillText(ID,e.cx,e.cy);    }
    ctx.strokeStyle = oldStyle;
    ctx.fillStyle = oldFill;
},

renderSpatialNet: function(ctx) {
    
    ctx.fillStyle = "orange";

    for(var i = 0; i < this.spatialNet.length; i++) {
        
        for(var n = 0; n < this.spatialNet[i].length; n++) {
            
            var x = i*32;
            var y = n*18;
            if(this.spatialNet[i][n][0] !== undefined) ctx.fillRect(x, y, 32, 18);
        }
    }
}

}
