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

// "PRIVATE" METHODS
//
// <none yet>



// PUBLIC METHODS

getNewSpatialID : function() {

    // TODO: YOUR STUFF HERE!
    // check if any of the identities are dead and if they are dead give that spatialId to a new entity
    for (var ID in this._entities) {
        var e = this._entities[ID];
        if( e.isDead) {
            e.isDead = false;
            return ID;
        }
    }
    // If no entiites were dead assign a new spatial ID
    var spatialID = this._nextSpatialID;
    this._nextSpatialID++;
    return spatialID;


},


// BREYTA AÐEINS

register: function(entity) {
    var pos = entity.getPos();
    var dimensions = entity.getInfo();
    //var radius = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] =
        {cx: pos.cx,
        cy: pos.cy,
        width: dimensions.width,
        height: dimensions.height,
        //radius: radius,
        entity : entity,
        isUndefined : false,
        isDead : entity._isDeadNow
    };
    // TODO: YOUR STUFF HERE!
},

unregister: function(entity) 
{
    // TODO: YOUR STUFF HERE!
    var pos = entity.getPos();
    var dimensions = entity.getInfo();
    //var radius = entity.getRadius();
    var spatialID = entity.getSpatialID();
    this._entities[spatialID] =
        {cx: pos.cx,
        cy: pos.cy,
        width: dimensions.width,
        height: dimensions.height,
        //radius: radius,
        entity : entity,
        isUndefined : true,
        isDead : entity._isDeadNow
    };
    entity.lastCollision = undefined;
    
},

findEntityInRange: function(posX, posY, width, height, colEntity) {

    // TODO: YOUR STUFF HERE!
    /*for (var ID in this._entities){
        var e = this._entities[ID];
        if(e.isUndefined) continue;

        if(posX - width/2 < e.posX - e.width/2 + e.width &&
            posX - width/2 + width > e.posX - e.width/2 &&
            posY  - height/2 < e.posY - e.height/2 + e.height &&
            posY  - height/2 + height > e.posY - e.height/2) return e.entity;
    }*/

    // Check against all entitys
    for(var i = 1; i < this._entities.length; i++) {
        
        if(colEntity.getSpatialID() === i) continue;

        // Get an object with the entity coords and size
        var entity = this._entities[i];


        // Collision with the Top and Bottom of a entity

        // Check for x coords

        if(colEntity.cx + colEntity.width/2 >= entity.cx - entity.width/2 &&
            colEntity.cx - colEntity.width/2 <= entity.cx + entity.width/2) {
            
            // Check for y coords on top collision
            if(colEntity.prevCy + colEntity.height/2 <= entity.cy - entity.height/2 &&
                colEntity.cy + colEntity.height/2 >= entity.cy -  entity.height/2) {
                    
                // Do this
                colEntity.cy = entity.cy - entity.height/2 - colEntity.height/2;
                colEntity.velY = 0;
                console.log("top");
            }

            // Check for y coords on bottom collision
            else if(colEntity.prevCy - colEntity.height/2 >= entity.cy + entity.height/2 &&
                    colEntity.cy - colEntity.height/2 <= entity.cy + entity.height/2) {
                        
                // Do this
                colEntity.cy = entity.cy + entity.height/2 + colEntity.height/2;
                colEntity.velY = 0;
                console.log("bottom");
            }
        }



        // Collision with the Sides of a entity

        // Check for y coords
        if(colEntity.cy + colEntity.height/2 > entity.cy - entity.height/2 &&
            colEntity.cy - colEntity.height/2 < entity.cy + entity.height/2) {
            
            // Check for x coords on left collision
            if(colEntity.prevCx + colEntity.width/2 <= entity.cx - entity.width/2 &&
                colEntity.cx + colEntity.width/2 >= entity.cx -  entity.width/2) {
                
                // Do this
                colEntity.cx = entity.cx - entity.width/2 - colEntity.width/2;
                colEntity.velX = 0;
                console.log("left");
            }

            // Check for x coords on right collision
            else if(colEntity.prevCx - colEntity.width/2 >= entity.cx + entity.width/2 &&
                    colEntity.cx - colEntity.width/2 <= entity.cx + entity.width/2) {
                     
                // Do this
                colEntity.cx = entity.cx + entity.width/2 + colEntity.width/2;
                colEntity.velX = 0;
                console.log("right");
            }
        }
        
    }

    // ÞARF AÐ BREYTA ÞESSU FYRST VIÐ VERÐUM MEÐ KASSA HIT BOX
    /*for (var ID in this._entities) {
        var e = this._entities[ID];
        if( e.isUndefined) continue;
        var distsq = util.wrappedDistSq(posX,posY,e.posX,e.posY,g_canvas.width,g_canvas.height);
        var radiussq = (radius + e.radius) * (radius + e.radius);
        if ( distsq < radiussq){
            return e.entity;
        }
    }*/

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    var oldFill = ctx.fillStyle;
    ctx.strokeStyle = "red";
    ctx.fillStyle = "#39FF14";
   
     for (var ID in this._entities) {
        var e = this._entities[ID];
        if(e.isUndefined) continue;
        ctx.strokeRect(e.posX - e.width/2, e.posY - e.height/2, e.width, e.height );
        //util.strokeCircle(ctx, e.posX, e.posY, e.radius);
        ctx.fillText(ID,e.posX,e.posY);    }
    ctx.strokeStyle = oldStyle;
    ctx.fillStyle = oldFill;
}

}
