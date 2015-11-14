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
	console.log(this.audio);
	this.audio.play();
};

