// ========
// ENTITIES
// ========
/*

Controllable entities of various kinds.

Many of...


INSTRUCTIONS:

You need to flesh out the "Bullet.js" and "Rock.js" files,
and update the "entityManager.js" module to manage them.

I've updated "Ship.js" so that it knows how to request bullet
creation, so you don't have to worry about that side of it,
but you will have to implement the `fireBullet` function in
the entityManager.

I've also implemented all the necessary new keys e.g. "1" to
generate a new ship, "K" to kill one, "0" to toggle rendering
of the rocks.

"handleMouse.js" has been modified so that it calls a new
function called `entityManager.yoinkNearestShip`, which you'll
have to implement -- it finds the nearest ship (if any) and
pulls it towards the specified xy coords.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// ====================
// CREATE INITIAL SHIPS
// ====================

entityManager.generateShip({
    cx : 140,
    cy : 200
});

entityManager.generateShip({
    cx : 200,
    cy : 200,

   // numSubSteps : 2
});

entityManager.generateShip({
    cx : 260,
    cy : 200,

    //numSubSteps : 4
});


// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}


// =================
// UPDATE SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `update` routine handles generic stuff such as
// pausing, single-step, and time-handling.
//
// It then delegates the game-specific logic to `updateSimulation`


// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {
    
    processDiagnostics();
    
    entityManager.update(du);

    // Prevent perpetual firing!
    eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');

var KEY_K = keyCode('K');

function processDiagnostics() {

    if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
	cx : g_mouseX,
	cy : g_mouseY});

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);
}


// =================
// RENDER SIMULATION
// =================

// We take a very layered approach here...
//
// The primary `render` routine handles generic stuff such as
// the diagnostic toggles (including screen-clearing).
//
// It then delegates the game-specific logic to `gameRender`


// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    entityManager.render(ctx);

}


// =============
// PRELOAD STUFF
// =============

var g_images = {};

function requestPreloads() {

    var requiredImages = {
	ship   : "https://notendur.hi.is/~pk/308G/images/ship.png",
	rock   : "https://notendur.hi.is/~pk/308G/images/rock.png"
    };

    imagesPreload(requiredImages, g_images, preloadDone);
}

var g_sprites = {};

function preloadDone() {

    g_sprites.ship = new Sprite(g_images.ship);
    g_sprites.rock = new Sprite(g_images.rock);

    g_sprites.bullet = new Sprite(g_images.ship);
    g_sprites.bullet.scale = 0.25;

    main.init();
}

// Kick it off
requestPreloads();