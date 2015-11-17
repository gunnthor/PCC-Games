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

Sound.prototype.playThemeSong = function (theme) {
	Sound.prototype.themeSong = theme;
	if(!g_muteThemeSong) {
		Sound.prototype.themeSong.play();
	}
	
};

Sound.prototype.pauseThemeSong = function (){
	//Sound.prototype.themeSong
	Sound.prototype.themeSong.pause();

};