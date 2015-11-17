// ============
// SOUND STUFF
// ============

"use strict";

function Sound(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }
};

Sound.prototype.playSound = function() {
	if(!g_muteEffects) {
		this.audio.pause();
		var currentSound = this.audio;
		currentSound.play();
	}
};

Sound.prototype.playThemeSong = function () {
	var themeSong = this.audio;
	
}

Sound.prototype.pauseThemeSong = function (){

}