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
        cx      :   g_canvas.width/2 -450,
        cy      :   300,
        color   :   "red",
        playerID:   1, 
        scorePosX:  10,
        scorePosY:  20,
        direction:  "right",
        KEY_LEFT:   'A'.charCodeAt(0),
        KEY_RIGHT:  'D'.charCodeAt(0),
        KEY_JUMP:   'W'.charCodeAt(0),
        KEY_FIRE:   'S'.charCodeAt(0),
        KEY_WEPS:   'E'.charCodeAt(0),
        health :    100,
        gunType:    "pistol",
        sprite : g_sprites.player1,
        audio  : g_sounds.pistolSound2

    });

    this.generateKall({
        cx      :   g_canvas.width/2 +450,
        cy      :   300,
        color   :   "green",
        playerID:   2,
        scorePosX:  g_canvas.width  - 150,
        scorePosY:  20,
        direction:  "left",
        KEY_LEFT:   'J'.charCodeAt(0),
        KEY_RIGHT:  'L'.charCodeAt(0),
        KEY_JUMP:   'I'.charCodeAt(0),
        KEY_FIRE:   'K'.charCodeAt(0),
        KEY_WEPS:   'O'.charCodeAt(0),
        health :    100,
        gunType:    "pistol", 
        sprite : g_sprites.player2,
        audio  : g_sounds.pistolSound

    });
    
    /*
    //vinstri veggur1
    this.generateBlock({
        cx : 11,
        cy : 447,
        width : 17,
        height : 65
    });

    //vinstri veggur2
    this.generateBlock({
        cx : 12,
        cy : 133,
        width : 17,
        height : 133*2
    })

    // vinstri veggs neðri rampur 1/4
    this.generateBlock({
        cx : g_canvas.width/2 - 452,
        cy : g_canvas.height - 155,
        width : 100,
        height : 14
    });
    // vinstri veggs neðri rampur 2/4
    this.generateBlock({
        cx : g_canvas.width/2 - 373,
        cy : g_canvas.height - 177,
        width : 40,
        height : 14
    });
    // vinstri veggs neðri rampur 3/4
    this.generateBlock({
        cx : g_canvas.width/2 - 325,
        cy : g_canvas.height - 197,
        width : 40,
        height : 14
    });
    // vinstri veggs neðri rampur 4/4
    this.generateBlock({
        cx : g_canvas.width/2 - 274,
        cy : g_canvas.height - 219,
        width : 40,
        height : 14
    });

    //hægri veggur1
    this.generateBlock({
        cx : g_canvas.width-11,
        cy : 447,
        width : 17,
        height : 65
    });

    //hægri veggur2
    this.generateBlock({
        cx : g_canvas.width-12,
        cy : 133,
        width : 17,
        height : 133*2
    })

    // hægri veggs neðri rampur 1/4
    this.generateBlock({
        cx : g_canvas.width/2 + 450,
        cy : g_canvas.height - 155,
        width : 100,
        height : 14
    });
    // vinstri veggs neðri rampur 2/4
    this.generateBlock({
        cx : g_canvas.width/2 + 373,
        cy : g_canvas.height - 174,
        width : 40,
        height : 14
    });
    // vinstri veggs neðri rampur 3/4
    this.generateBlock({
        cx : g_canvas.width/2 + 327,
        cy : g_canvas.height - 193,
        width : 40,
        height : 14
    });
    // vinstri veggs neðri rampur 4/4
    this.generateBlock({
        cx : g_canvas.width/2 + 283,
        cy : g_canvas.height - 214,
        width : 40,
        height : 14
    });


    //vinstra gólf
    this.generateBlock({
        cx : 210,
        cy : g_canvas.height-15,
        width : 430,
        height : 15
    });

    //hægra gólf
     this.generateBlock({
        cx : g_canvas.width - 210,
        cy : g_canvas.height-15,
        width : 430,
        height : 15
    });

     // vinstri gólf rampur 1/5
     this.generateBlock({
        cx : g_canvas.width/2 - 115,
        cy : g_canvas.height-74,
        width : 87,
        height : 100
     });
     // 2/5
     this.generateBlock({
        cx : g_canvas.width/2 -170 ,
        cy : g_canvas.height-65,
        width : 24,
        height : 80
     });
     // 3/5
     this.generateBlock({
        cx : g_canvas.width/2 -193 ,
        cy : g_canvas.height-53,
        width : 24,
        height : 60
     });
     // 4/5
     this.generateBlock({
        cx : g_canvas.width/2 -216 ,
        cy : g_canvas.height-42,
        width : 24,
        height : 43
     });
     //5/5
     this.generateBlock({
        cx : g_canvas.width/2 -239 ,
        cy : g_canvas.height-32,
        width : 24,
        height : 20
     });


     // hægri gólf rampur 1/5
     this.generateBlock({
        cx : g_canvas.width/2 + 118,
        cy : g_canvas.height-74,
        width : 87,
        height : 100
     });
     // 2/5
     this.generateBlock({
        cx : g_canvas.width/2 +174 ,
        cy : g_canvas.height-65,
        width : 24,
        height : 80
     });
     // 3/5
     this.generateBlock({
        cx : g_canvas.width/2 +196 ,
        cy : g_canvas.height-53,
        width : 24,
        height : 60
     });
     // 4/5
     this.generateBlock({
        cx : g_canvas.width/2 +219 ,
        cy : g_canvas.height-42,
        width : 24,
        height : 43
     });
     //5/5
     this.generateBlock({
        cx : g_canvas.width/2 +242 ,
        cy : g_canvas.height-32,
        width : 24,
        height : 20
     });

     //miðju pallur
     this.generateBlock({
        cx : g_canvas.width/2 + 7,
        cy : g_canvas.height/2 + 16 ,
        width : 223,
        height : 16
     });*/

    this.generateHitBoxes(1);


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
            velY : 0
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : -3.5
        }));

        this._bullets.push(new Bullet({
            cx   : cx,
            cy   : cy,
            velX : velX,
            velY : 3.5
        }));
    }
},

//fall sem setur upplýsingar um hitBoxes í fylki og generatear blocks - breyta seinna
generateHitBoxes : function(level) {
    //kalla á þetta í init functioninu hérna uppi í bili, tek inn level = 1
    //levels er 2d array þar sem fyrir hvert level er array af þeim hitboxum sem á að gera fyrir levelið, þ.e.a.s. levels[level][block]
    
    
    
    var levels = [];
    levels[1] = [];
    levels[1][0] = {cx : 11, cy : 447, width : 17, height : 65};
    levels[1][1] = {cx : 12,
        cy : 133,
        width : 17,
        height : 133*2};
    levels[1][2] = {cx : g_canvas.width/2 - 452,
        cy : g_canvas.height - 155,
        width : 100,
        height : 14};
    levels[1][3] = {cx : g_canvas.width/2 - 373,
        cy : g_canvas.height - 177,
        width : 40,
        height : 14};
    levels[1][4] = {cx : g_canvas.width/2 - 325,
        cy : g_canvas.height - 197,
        width : 40,
        height : 14};
    levels[1][5] = {cx : g_canvas.width/2 - 274,
        cy : g_canvas.height - 219,
        width : 40,
        height : 14};
    levels[1][6] = {cx : g_canvas.width-11,
        cy : 447,
        width : 17,
        height : 65};
    levels[1][7] = {cx : g_canvas.width-12,
        cy : 133,
        width : 17,
        height : 133*2};
    levels[1][8] = {cx : g_canvas.width/2 + 450,
        cy : g_canvas.height - 155,
        width : 100,
        height : 14};
    levels[1][9] = {cx : g_canvas.width/2 + 373,
        cy : g_canvas.height - 174,
        width : 40,
        height : 14};
    levels[1][10] = {cx : g_canvas.width/2 + 327,
        cy : g_canvas.height - 193,
        width : 40,
        height : 14};
    levels[1][11] = {cx : g_canvas.width/2 + 283,
        cy : g_canvas.height - 214,
        width : 40,
        height : 14};
    levels[1][12] = {cx : 210,
        cy : g_canvas.height-15,
        width : 430,
        height : 15};
    levels[1][13] = {cx : g_canvas.width - 210,
        cy : g_canvas.height-15,
        width : 430,
        height : 15};
    levels[1][14] = {cx : g_canvas.width/2 - 115,
        cy : g_canvas.height-74,
        width : 87,
        height : 100};
    levels[1][15] = {cx : g_canvas.width/2 -170 ,
        cy : g_canvas.height-65,
        width : 24,
        height : 80};
    levels[1][16] = {cx : g_canvas.width/2 -193 ,
        cy : g_canvas.height-53,
        width : 24,
        height : 60};
    levels[1][17] = {cx : g_canvas.width/2 -216 ,
        cy : g_canvas.height-42,
        width : 24,
        height : 43};
    levels[1][18] = {cx : g_canvas.width/2 -239 ,
        cy : g_canvas.height-32,
        width : 24,
        height : 20};
    levels[1][19] = {cx : g_canvas.width/2 + 118,
        cy : g_canvas.height-74,
        width : 87,
        height : 100};
    levels[1][20] = {cx : g_canvas.width/2 +174 ,
        cy : g_canvas.height-65,
        width : 24,
        height : 80};
    levels[1][21] = {cx : g_canvas.width/2 +196 ,
        cy : g_canvas.height-53,
        width : 24,
        height : 60};
    levels[1][22] = {cx : g_canvas.width/2 +219 ,
        cy : g_canvas.height-42,
        width : 24,
        height : 43};
        levels[1][23] = {cx : g_canvas.width/2 +242 ,
        cy : g_canvas.height-32,
        width : 24,
        height : 20};

        /*
        levels[1][24] = {cx : g_canvas.width/2 + 7,
        cy : g_canvas.height/2 + 16 ,
        width : 223,
        height : 16};//miðjupallur*/

        

        //þessi lykkja mun virka nákvæmlega eins þegar við erum búnir að útfæra grid
        //json gögnin eru global eins og er
        /*for(var i = 0; i < MapHitBoxes.L1.blocks.length)//hleð inn öllum upplýsingum um hitboxa úr JSON skrá(24 hitboxar í þessu tilfelli)
        {
            levels[1][i] = {cx : MapHitBoxes.L1.blocks[i].cx, cy : MapHitBoxes.L1.blocks[i].cy,
         width : MapHitBoxes.L1.blocks[i].width, height : MapHitBoxes.L1.blocks[i].height };
        }*/


        levels[1][24] = {cx : MapHitBoxes.L1.blocks[0].cx, cy : MapHitBoxes.L1.blocks[0].cy,
         width : MapHitBoxes.L1.blocks[0].width, height : MapHitBoxes.L1.blocks[0].height };

        //set inn hitbox fyrir miðjupallinn til að testa json virkni
        
    var i = 0;
    while(i < levels[level].length)
    {
        this.generateBlock({
            cx : levels[level][i].cx,
            cy : levels[level][i].cy,
            width : levels[level][i].width,
            height : levels[level][i].height
        });
        i++;
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

