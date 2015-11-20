
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



var g_renderSpatialDebug = false;
var g_renderSpatialNet = false;
var g_muteEffects = false;
var g_muteThemeSong = false;
var g_menu = true;

var KEY_SPATIAL = keyCode('X');
var KEY_SPATIALNET = keyCode('Z');
var KEY_MUTEEFFECT = keyCode('B');
var KEY_MUTESONG = keyCode('V');
var KEY_CODE_ESC = 27;
var KEY_MENU = KEY_CODE_ESC;


function processDiagnostics() {

    if (eatKey(KEY_MENU)) g_menu = !g_menu;
    if (eatKey(KEY_SPATIAL)) g_renderSpatialDebug = !g_renderSpatialDebug;
    if (eatKey(KEY_SPATIALNET)) g_renderSpatialNet = !g_renderSpatialNet;
    if (eatKey(KEY_MUTEEFFECT)) g_muteEffects = !g_muteEffects;
    if (eatKey(KEY_MUTESONG)) {
        g_muteThemeSong = !g_muteThemeSong;
        if(!g_muteThemeSong) {
            Sound.prototype.replayThemeSong();
        } else {
            Sound.prototype.pauseThemeSong();
        }
    }
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
function renderMenu(ctx){
    Menu.render(ctx);
}

function renderSimulation(ctx) {

    levelManager.render(ctx);
    if (!g_menu) entityManager.render(ctx);

    if (g_renderSpatialNet) spatialManager.renderSpatialNet(ctx);
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
        player1  : maps.images.player1,
        brick_blue : maps.images.brick_blue,
        background : maps.images.background,
        shotgun : maps.images.shotgun,
        healthpack : maps.images.healthpack,
        sandbackground : maps.images.sandbackground,
        brick_sand      :   maps.images.brick_sand,
        citybackground : maps.images.citybackground      
    };



    var requiredAudio = {
        pistolSound     :  maps.sounds.pistolSound,   
        pistolSound2    :  maps.sounds.pistolSound,
        shotgunSound    :  maps.sounds.shotgunSound,
        shotgunSound2   :  maps.sounds.shotgunSound,
        backgroundSong  :  maps.sounds.backgroundSong,
        backgroundSong2 :  maps.sounds.backgroundSong2,
        winsong         : maps.sounds.winsong 
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
    Sound.prototype.pauseThemeSong(g_audio.backgroundSong);

    g_sprites.brick_blue = new Sprite({
        image : g_images.brick_blue
    });
    g_sprites.brick_sand = new Sprite({
        image : g_images.brick_sand
    })

    g_sprites.healthpack = new Sprite({
        image : g_images.healthpack
    });

    g_sprites.shotgun = new Sprite({
        image : g_images.shotgun
    });
    g_sprites.background = [];
    g_sprites.background[0] = new Sprite({
        image : g_images.background
    });
    g_sprites.background[1] = new Sprite({
        image : g_images.sandbackground
    });
    g_sprites.background[2] = new Sprite({
        image : g_images.citybackground
    });


    
     g_sprites.player1  = new Sprite({
        image : g_images.player1,
        
        updateKall: function (du,isRunning,isJumping,isShooting,isDead,isShot){
            this.time += du;
            if (isDead) this.updateAnimations(this.dead);
            else if (isShot) this.updateAnimations(this.shot);
            else if (isJumping && isShooting) this.updateAnimations(this.jumpShooting);
            else if (isJumping) this.updateAnimations(this.jumping);
            else if (isShooting) this.updateAnimations(this.shooting);
            else if (isRunning) this.updateAnimations(this.running);
            else  this.updateAnimations(this.idle);

            while (this.time > (this.frame + 1) * this.timeperframe){
                this.updateFrames();
            }
        },

        idle : {
            animationstate : "idle",
            endX : 49*2,
            endY : 0,
            frameWidth : 49,
            frameHeight : 49,
            frames: 3,
            timeperframe : 60
        },
        
        running : {
            animationstate : "running",
            endX : 444.5-100,
            endY : 49,
            frameWidth : 50,
            frameHeight : 49,
            frames : 8,
            timeperframe : (SECS_TO_NOMINALS/8)/2
        },
        
        jumping : {            
            animationstate : "jumping",
            frames : 1,
            endX : 198,
            endY : 228,
            frameWidth : 49,
            frameHeight : 49,
            timeperframe : 60

        },
        
        
        jumpShooting :{
            animationstate : "jumpShooting",
            endX : 0,
            endY : 387,
            frameWidth : 49,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60
        },
        
        shooting : {
            animationstate : "shooting",
            endX : 0,
            endY : 110,
            frameWidth : 49,
            frameHeight : 49,
            frames: 1,
            timeperframe : 60

        },
        
        shot : {
            animationstate : "shot",
            endX : 49*6,
            endY : 327,
            frameWidth : 49,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60


        },
        
        dead : {
            animationstate : "dead",
            endX : 49*7,
            endY : 313,
            frameWidth : 60,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60

        }
        
        
    });

    g_sprites.player2  = new Sprite({
        image : g_images.player1,
        updateKall: function (du,isRunning,isJumping,isShooting,isDead,isShot){
            this.time += du;
            if (isDead) this.updateAnimations(this.dead);
            else if (isShot) this.updateAnimations(this.shot);
            else if(isJumping && isShooting) this.updateAnimations(this.jumpShooting);
            else if (isJumping) this.updateAnimations(this.jumping);
            else if (isShooting) this.updateAnimations(this.shooting);
            else if (isRunning) this.updateAnimations(this.running);
            else  this.updateAnimations(this.idle);

            while (this.time > (this.frame + 1) * this.timeperframe){
                this.updateFrames();
            }
        },
        idle : {
            animationstate : "idle",
            endX : 49*2,
            endY : 0,
            frameWidth : 49,
            frameHeight : 49,
            frames: 3,
            timeperframe : 60
        },
        
        running : {
            animationstate : "running",
            endX : 444.5-100,
            endY : 49,
            frameWidth : 50,
            frameHeight : 49,
            frames : 8,
            timeperframe : (SECS_TO_NOMINALS/8)/2
        },
        
        jumping : {            
            animationstate : "jumping",
            frames : 1,
            endX : 198,
            endY : 228,
            frameWidth : 49,
            frameHeight : 49,
            timeperframe : 60

        },
        
        
        jumpShooting :{
            animationstate : "jumpShooting",
            endX : 0,
            endY : 387,
            frameWidth : 49,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60
        },
        
        shooting : {
            animationstate : "shooting",
            endX : 0,
            endY : 110,
            frameWidth : 49,
            frameHeight : 49,
            frames: 1,
            timeperframe : 60

        },
        
        shot : {
            animationstate : "shot",
            endX : 49*6,
            endY : 327,
            frameWidth : 49,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60


        },
        
        dead : {
            animationstate : "dead",
            endX : 49*7,
            endY : 313,
            frameWidth : 60,
            frameHeight : 49,
            frames : 1,
            timeperframe : 60

        }
        
    });
    
    //spatialManager.init();
    //levelManager.initLevel();
    Menu.init();   
    main.init();
}

// Kick it off
requestPreloads();