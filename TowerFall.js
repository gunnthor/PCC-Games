
"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


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
    //eatKey(Ship.prototype.KEY_FIRE);
}

// GAME-SPECIFIC DIAGNOSTICS

var g_allowMixedActions = true;
var g_useGravity = false;
var g_useAveVel = true;
var g_renderSpatialDebug = false;
var g_muteEffects = false;
var g_muteThemeSong = false;

var KEY_MIXED   = keyCode('M');;
var KEY_GRAVITY = keyCode('G');
var KEY_AVE_VEL = keyCode('V');
var KEY_SPATIAL = keyCode('X');

var KEY_MUTEEFFECT = keyCode('B');
var KEY_MUTESONG = keyCode('V');

var KEY_HALT  = keyCode('H');
var KEY_RESET = keyCode('R');

var KEY_0 = keyCode('0');

var KEY_1 = keyCode('1');
var KEY_2 = keyCode('2');

var KEY_K = keyCode('K');

function processDiagnostics() {

    /*if (eatKey(KEY_MIXED))
        g_allowMixedActions = !g_allowMixedActions;

    if (eatKey(KEY_GRAVITY)) g_useGravity = !g_useGravity;

    if (eatKey(KEY_AVE_VEL)) g_useAveVel = !g_useAveVel;

    */

    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;

    if (eatKey(KEY_MUTEEFFECT)) g_muteEffects = !g_muteEffects;
    if (eatKey(KEY_MUTESONG)) {
        g_muteThemeSong = !g_muteThemeSong;
        Sound.prototype.pauseThemeSong();
        //Sound.prototype.playThemeSong();
    } 

    /*if (eatKey(KEY_HALT)) entityManager.haltShips();

    if (eatKey(KEY_RESET)) entityManager.resetShips();

    if (eatKey(KEY_0)) entityManager.toggleRocks();

    if (eatKey(KEY_1)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship});

    if (eatKey(KEY_2)) entityManager.generateShip({
        cx : g_mouseX,
        cy : g_mouseY,
        
        sprite : g_sprites.ship2
        });

    if (eatKey(KEY_K)) entityManager.killNearestShip(
        g_mouseX, g_mouseY);*/
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

    levelManager.render(ctx);
    entityManager.render(ctx);
    //spatialManager._grid.render(ctx);

    //spatialManager.renderSpatialNet(ctx);
    if (g_renderSpatialDebug) spatialManager.render(ctx);
}


// =============
// PRELOAD STUFF
// =============

var g_images = {};
var g_audio = {};

function requestPreloads() {

    var level = levelManager.getLevel();
    
    var requiredImages = {
        player1  : "Player1.png",
        brick_blue : "bricks/brick_background_1.png"        
    };



    var requiredAudio = {
        pistolSound     :  maps.levels[level-1].sounds.pistolSound,   
        pistolSound2    :  maps.levels[level-1].sounds.pistolSound,
        shotgunSound    :  maps.levels[level-1].sounds.shotgunSound,
        shotgunSound2   :  maps.levels[level-1].sounds.shotgunSound,
        backgroundSong  :  maps.levels[level-1].sounds.backgroundSong
    };

    imagesPreload(requiredImages, g_images, preloadDone);
    audioPreload(requiredAudio, g_audio, preloadDone);
}

var g_sprites = {};
var g_sounds = {};

function preloadDone() {
    g_sounds.pistolSound = new Sound({audio : g_audio.pistolSound});

    //g_sounds.pistolSound.audio.pause();
    g_sounds.pistolSound2 = new Sound({audio : g_audio.pistolSound2});
    g_sounds.shotgunSound = new Sound({audio : g_audio.shotgunSound});
    g_sounds.shotgunSound2 = new Sound({audio : g_audio.shotgunSound2});
    g_sounds.theKraken = new Sound({audio : g_audio.backgroundSong});
    //g_sounds.theKraken.audio.play();
    Sound.prototype.playThemeSong(g_audio.backgroundSong);

    g_sprites.brick_blue = new Sprite({
        image : g_images.brick_blue
    });
    
    g_sprites.player1  = new Sprite({
        image : g_images.player1,
        
        idleEndX : 49*2,
        idleEndY : 0,
        idleFrameWidth : 49,
        idleFrameHeight : 49,
        idleFrames: 3,
        
        runningEndX : 444.5-100,
        runningEndY : 49,
        runningFrameWidth : 50,
        runningFrameHeight : 49,
        runningFrames : 8,
        
        jumpingFrames : 1,
        jumpingEndX : 198,
        jumpingEndY : 228,
        jumpingFrameWidth : 49,
        jumpingFrameHeight : 49,

        jumpShootingEndX : 0,
        jumpShootingEndY : 387,
        jumpShootingFrameWidth : 49,
        jumpShootingFrameHeight : 49,
        jumpShootingFrames : 1,
        
        shootingEndX : 0,
        shootingEndY : 110,
        shootingFrameWidth : 49,
        shootingFrameHeight : 49,
        shootingFrames: 1,
        
        shotEndX : 49*6,
        shotEndY : 327,
        shotFrameWidth : 49,
        shotFrameHeight : 49,
        shotFrames : 1,

        deadEndX : 49*7,
        deadEndY : 313,
        deadFrameWidth : 60,
        deadFrameHeight : 49,
        deadFrames : 1/*,

        runShootingEndX : -5.5,
        runShootingEndY : 49,
        runShootingFrameWidth : 49,
        runShootingFrameHeight : 49,
        runShootingFrames: 1*/
    });

    g_sprites.player2  = new Sprite({
        image : g_images.player1,
        
        idleEndX : 49*2,
        idleEndY : 0,
        idleFrameWidth : 49,
        idleFrameHeight : 49,
        idleFrames: 3,
        
        runningEndX : 444.5-100,
        runningEndY : 49,
        runningFrameWidth : 50,
        runningFrameHeight : 49,
        runningFrames : 8,
        
        jumpingFrames : 1,
        jumpingEndX : 198,
        jumpingEndY : 228,
        jumpingFrameWidth : 49,
        jumpingFrameHeight : 49,
        
        jumpShootingEndX : 0,
        jumpShootingEndY : 387,
        jumpShootingFrameWidth : 49,
        jumpShootingFrameHeight : 49,
        jumpShootingFrames : 1,
        
        shootingEndX : 0,
        shootingEndY : 110,
        shootingFrameWidth : 49,
        shootingFrameHeight : 49,
        shootingFrames: 1,
        
        shotEndX : 49*6,
        shotEndY : 327,
        shotFrameWidth : 49,
        shotFrameHeight : 49,
        shotFrames : 1,

        deadEndX : 49*7,
        deadEndY : 313,
        deadFrameWidth : 60,
        deadFrameHeight : 49,
        deadFrames : 1/*,


        runShootingEndX : -5.5,
        runShootingEndY : 49,
        runShootingFrameWidth : 49,
        runShootingFrameHeight : 49,
        runShootingFrames: 1*/
    });
    
    spatialManager.init();
    levelManager.initLevel();    

    main.init();
}

// Kick it off
requestPreloads();