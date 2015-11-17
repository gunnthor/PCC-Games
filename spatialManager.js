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

spatialNet : [],

firstRegister : true,
registeredLocations : [],

blockWidth : g_canvas.width / 32,
blockHeight : g_canvas.height / 32,


// PUBLIC METHODS

initializeSpatialNet : function() {
    
    for(var i = 0; i < 32; i++) {

        this.spatialNet[i] = [];
        
        for(var n = 0; n < 32; n++) {
            
            this.spatialNet[i][n] = [];
        }
    }
},

registerInSpatialNet : function(left, right, top, bottom, spatialID) {

    // Viljum ekki registera kallana í fyrsta iteration.
    //if((spatialID === 1 || spatialID === 2) && this.firstRegister) return;
    
    for(var i = left; i <= right; i++) {
        
        for(var n = top; n <= bottom; n++) {
            
            //console.log("bla");
            this.spatialNet[i][n].push(spatialID);
            this.registeredLocations.push([i,n]);
        }
    }
    //console.log("register", this.spatialNet);
},

checkSpatialPos : function(left, right, top, bottom) {

    //console.log(left, right, top, bottom);
    //console.log("check", this.spatialNet);
    //var diff;
    //if(left > right) diff = 32 - left;
    if(left < right) right++;

    for(var i = left; i !== right; i++) {
        if(i === 32) {
            i = 0;
            // bug fix ef að hitboxið er lítið:
            if(i === right) break;
        }
        
        for(var n = top; n <= bottom; n++) {
            if(typeof this.spatialNet[i][n][0] === "number") return true;
        }
    }

    return false;
},

resetSpatialNet : function() {
    
    // Ef þetta er fyrsta skipti sem að við registeruðum, þá clearum við ekki
    // því að þá myndum við cleara burt blockana.
    //console.log("reset");
    if(this.firstRegister) {
        this.firstRegister = false;
        this.registeredLocations = [];
        return;
    }

    //console.log(this.spatialNet);
    // Clearum burt öll locations sem voru registeruð síðast.
    for(var x = 0; x < this.registeredLocations.length; x++) {
        
        var i = this.registeredLocations[x][0];
        var n = this.registeredLocations[x][1];
        //console.log(i, n);
        var last = this.spatialNet[i][n].length-1;

        this.spatialNet[i][n].splice(last,1);
    }

    this.registeredLocations = [];
},

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

    //console.log(this._grid.grid[0][0].cx);
},

getGrid : function() {

    return this._grid;
},


// BREYTA AÐEINS

register: function(entity) {
    var pos = entity.getPos();
    var dimensions = entity.getInfo();
    //var radius = entity.getRadius();

    // Sækja um spatialPositions
    var spatialPos = entity.getSpatialPos();

    // registera svo í spatial netinu
    this.registerInSpatialNet(spatialPos.leftPos, spatialPos.rightPos, spatialPos.topPos, spatialPos.bottomPos, entity._spatialID);

    var spatialID = entity.getSpatialID();
    this._entities[spatialID] =
        {cx: pos.cx,
        cy: pos.cy,
        width: dimensions.width,
        height: dimensions.height,
        friction: dimensions.friction,
        //radius: radius,
        entity : entity,
        isUndefined : false,
        isDead : entity._isDeadNow,
        spatialPos : spatialPos
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
    var spatialPos = entity.spatialPos;
    this._entities[spatialID] =
        {cx: pos.cx,
        cy: pos.cy,
        width: dimensions.width,
        height: dimensions.height,
        friction: dimensions.friction,
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

    // Náum í spatial positions á colEntity
    var left = colEntity.spatialPos.leftPos;
    var right = colEntity.spatialPos.rightPos;
    var top = colEntity.spatialPos.topPos;
    var bottom = colEntity.spatialPos.bottomPos;

    //console.log(left);

    // Notum spatialPositions hér, ef að einhver hlutur er í sama position, þá gerum við collision detection
    if(!this.checkSpatialPos(left, right, top, bottom)) return;

    //console.log(colEntity.spatialPos);

    //console.log("heh");

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

    for(var i = 1; i < this._entities.length; i++) {
        
        //if(colEntity.getSpatialID() === i) continue;

        // Get an object with the entity coords and size
        var entity = this._entities[i];
        //console.log(entity.friction);

        if (entity.isUndefined) continue;


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
                    //console.log(bottom, entTop);
                    _hitentities.push(entity);
                }
            }
        }
        
    }


    return _hitentities;

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
},

renderSpatialNet: function(ctx) {
    
    //ctx.save();
    ctx.fillStyle = "orange";

    for(var i = 0; i < this.spatialNet.length; i++) {
        
        for(var n = 0; n < this.spatialNet[i].length; n++) {
            
            var x = i*32;
            var y = n*18;
            //console.log(i, n);
            if(this.spatialNet[i][n][0] !== undefined) ctx.fillRect(x, y, 32, 18);
            //ctx.restore();
        }
    }
}

}
