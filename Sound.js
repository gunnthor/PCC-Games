// ============
// SOUND STUFF
// ============

"use strict";

function Sound(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
};
Sound.prototype.themeSong;

// plays the sound effect
Sound.prototype.playSound = function() {
	if(!g_muteEffects) {
		this.audio.pause();
		var currentSound = this.audio;
		currentSound.play();
	}
};

// plays a song 
Sound.prototype.playThemeSong = function() {
	this.themeSong = this.audio;
	if(!g_muteThemeSong) {
		var playThis = this.themeSong
		playThis.play();
	}
};

// stops a song and resets it
Sound.prototype.pauseThemeSong = function() {
	this.themeSong.pause();
	this.themeSong.currentTime = 0;
};