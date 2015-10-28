
function Ship(descr) {

    // Common inherited setup logic from Entity
    this.setup(descr);

    this.rememberResets();
};

Ship.prototype = new Entity();