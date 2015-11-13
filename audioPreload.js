// Multi-audio Preloader

"use strict";

Audio.prototype.asyncLoad = function(src, asyncCallback) {

	this.onload = asyncCallback;
    this.onerror = asyncCallback;

    console.log("requesting audio src of ", src);
    this.src = src;
}


function audioPreload(requiredAudio,
                       loadedAudio,
                       completionCallback) {

    var numAudioRequired,
        numAudioHandled = 0,
        currentName,
        currentAudio,
        preloadHandler;

    // Count our `requiredAudio` by using `Object.keys` to get all 
    // "*OWN* enumerable properties" i.e. doesn't traverse the prototype chain
    numAudioRequired = Object.keys(requiredAudio).length;

    // A handler which will be called when our required audio are finally
    // loaded (or when the fail to load).
    //
    // At the time of the call, `this` will point to an Audio object, 
    // whose `name` property will have been set appropriately.
    //
    preloadHandler = function () {

        console.log("preloadHandler called with this=", this);
        loadedAudio[this.name] = this;
        /*
        if (0 === this.width) {
            console.log("loading failed for", this.name);
        }
        */
        // Allow this handler closure to eventually be GC'd (!)
        this.onload = null;
        this.onerror = null;

        numAudioHandled += 1;

        if (numAudioHandled === numAudioRequired) {
            console.log("all preload Audio handled");
            console.log("loadedAudio=", loadedAudio);
            console.log("");
            console.log("performing completion callback");

            completionCallback();

            console.log("completion callback done");
            console.log("");
        }
    };

    // The "for..in" construct "iterates over the enumerable properties 
    // of an object, in arbitrary order." 
    // -- unlike `Object.keys`, it traverses the prototype chain
    //
    for (currentName in requiredAudio) {

        // Skip inherited properties from the prototype chain,
        // just to be safe, although there shouldn't be any...
        
        // I prefer this approach, but JSLint doesn't like "continue" :-(
        //if (!requiredAudio.hasOwnProperty(currentName)) { continue; }
        
        if (requiredAudio.hasOwnProperty(currentName)) {
            
            console.log("preloading audio", currentName);
            currentAudio = new Audio();
            currentAudio.name = currentName;

            currentAudio.asyncLoad(requiredAudio[currentName], preloadHandler);
        }
    }
}