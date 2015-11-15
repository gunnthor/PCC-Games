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
	if(!g_mute) {
		console.log(this.audio);
		this.audio.pause();
		var currentSound = this.audio;
		currentSound.play();
	}
};