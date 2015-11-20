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

Sound.prototype.playSound = function() {
	if(!g_muteEffects) {
		this.audio.pause();
		var currentSound = this.audio;
		currentSound.play();
	}
};

Sound.prototype.playThemeSong = function() {
	this.themeSong = this.audio;
	if(!g_muteThemeSong) {
		var playThis = this.themeSong
		playThis.play();
	}
};

Sound.prototype.pauseThemeSong = function() {
	//Sound.prototype.themeSong
	this.themeSong.pause();
};

Sound.prototype.replayThemeSong = function () {
	this.themeSong.play();
};