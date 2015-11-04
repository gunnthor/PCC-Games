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

    // variables for all the sides of the object 
    var dispX = colEntity.velX;
    var dispY = colEntity.velY;

    var right = util.wrapX(colEntity.cx + colEntity.width/2);
    var prevRight = right - dispX;

    var left = util.wrapX(colEntity.cx - colEntity.width/2);
    var prevLeft = left - dispX;

    var bottom = util.wrapX(colEntity.cy + colEntity.height/2);
    var prevBottom = bottom - dispY;

    var top = util.wrapX(colEntity.cy - colEntity.height/2);
    var prevTop = bottom - dispY;
    
    // Check against all entitys

    for(var i = 1; i < this._entities.length; i++) {
        
        //if(colEntity.getSpatialID() === i) continue;

        // Get an object with the entity coords and size
        var entity = this._entities[i];

        if (entity.isUndefined) continue;


        //variables for all the sides of the entities beign checked

        var entRight = entity.cx + entity.width/2;

        var entLeft = entity.cx - entity.width/2;

        var entTop =  entity.cy - entity.height/2;

        var entBottom = entity.cy + entity.height/2;


        // Collision with the Top and Bottom of a entity

        // Check for x coords

        if(right > entLeft &&
            right - width < entRight) {
            
            // Check for y coords on top collision
            if(prevBottom <= entTop &&
                bottom >= entTop) {
                    colEntity.cy = entity.cy - entity.height/2 - colEntity.height/2;
                    colEntity.velY = 0;
                    colEntity.IN_AIR = false;
                    //colEntity.SLOWING_DOWN = tru
        }
        if(left > entLeft &&
            left + width < entRight) {
            
            // Check for y coords on top collision
            if(prevBottom <= entTop &&
                bottom >= entTop) {
    
                    colEntity.cy = entity.cy - entity.height/2 - colEntity.height/2;
                    colEntity.velY = 0;
                    colEntity.IN_AIR = false;
                    //colEntity.SLOWING_DOWN = true;
            }    

            // Check for y coords on bottom collision
            else if(prevTop >= entBottom &&
                    top <= entBottom) {
                        
                
                    colEntity.cy = entity.cy + entity.height/2 + colEntity.height/2;
                    colEntity.velY = 0;

            }
        }



        // Collision with the Sides of a entity

        // Check for y coords
        if(bottom > entTop &&
            bottom - height < entBottom) {
            
            // Check for x coords on left collision
            if(prevRight <= entLeft &&
                right >= entLeft) {
                
                
                    colEntity.cx = entity.cx - entity.width/2 - colEntity.width/2;
                    colEntity.velX = 0;
                
            }

            // Check for x coords on right collision
            else if(prevLeft >= entRight &&
                    left <= entRight) {
                     
                
                    colEntity.cx = entity.cx + entity.width/2 + colEntity.width/2;
                    colEntity.velX = 0;
                
            }
        }
        if(top > entTop &&
            top + height < entBottom) {
            
            // Check for x coords on left collision
            if(prevRight <= entLeft &&
                right >= entLeft) {
                
                
                    colEntity.cx = entity.cx - entity.width/2 - colEntity.width/2;
                    colEntity.velX = 0;
                
            }

            // Check for x coords on right collision
            else if(prevLeft >= entRight &&
                    left <= entRight) {
                     
                
                    colEntity.cx = entity.cx + entity.width/2 + colEntity.width/2;
                    colEntity.velX = 0;
                
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
        ctx.strokeRect(e.cx - e.width/2, e.cy - e.height/2, e.width, e.height );
        //util.strokeCircle(ctx, e.posX, e.posY, e.radius);
        ctx.fillText(ID,e.cx,e.cy);    }
    ctx.strokeStyle = oldStyle;
    ctx.fillStyle = oldFill;
}

}
