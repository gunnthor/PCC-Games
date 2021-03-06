
var Menu = {
    _options : [],

    IsStarted : false,
    textWidth : 100,

    //renders the Menu
    render : function (ctx) {
        renderSimulation(ctx);
        ctx.fillStyle = "red";
         for (var i = 0; i < this._options.length; i++){
            this.renderoption(this._options[i],ctx);
        }
    },

    // renders the generated optinos based on data
    renderoption : function (option,ctx){
        ctx.font = option.font;
        ctx.fillText(option.text,option.x,option.y)
    },

    // makes active options pop up when the mouse hovers over them
    onhover : function (xPos,yPos){
        for (var p = 0; p < this._options.length; p++){
            if ((this._options[p].y >= yPos && this._options[p].y < yPos + 30) &&(this._options[p].x <= xPos && this._options[p].x >= xPos - this.textWidth) && this._options[p].active){
                this._options[p].font = "30px Georgia,bold"; 
            }
            else if (this._options[p].active){
                this._options[p].font = "20px Georgia,bold";
            }
        }
    },

    // changes things based on what was clicked on in the menu
    onclick : function (xPos,yPos){
        for (var p = 0; p < this._options.length; p++){
            if ((this._options[p].y >= yPos && this._options[p].y < yPos + 30) &&(this._options[p].x <= xPos && this._options[p].x >= xPos - this.textWidth) && this._options[p].active){
                switch(this._options[p].text){
                    case "Begin":
                        g_muteThemeSong = false;
                        g_sounds.themesong[levelManager.getLevel()-1].playThemeSong();
                        spatialManager.init();
                        levelManager.initLevel();
                        this.clearOptions();
                        this.generatePauseMenu();
                        this.IsStarted = true;
                        g_menu = !g_menu;
                        break;
                    case "Resume":
                        g_menu = !g_menu;
                        break;
                    case "Sound":
                        this.clearOptions();
                        this.generateSoundOptions();
                        break;
                    case "Music":
                        g_muteThemeSong = !g_muteThemeSong;
                        if(!g_muteThemeSong) {
                            g_sounds.themesong[levelManager.getLevel()-1].playThemeSong();
                        } else {
                            g_sounds.themesong[levelManager.getLevel()-1].pauseThemeSong();
                        }
                        break;
                    case "Effects":
                        g_muteEffects = !g_muteEffects
                        break;
                    case "Map":
                        g_sounds.themesong[levelManager.getLevel()-1].playThemeSong();
                        g_muteThemeSong = true;
                        g_sounds.themesong[levelManager.getLevel()-1].pauseThemeSong();
                        levelManager.nextLevel();
                        break;
                    case "Instructions":
                        this.clearOptions();
                        this.generateInstructions();
                        break;
                    case "Back" :
                        this.clearOptions();
                        if(this.IsStarted){
                            this.generatePauseMenu();
                        }
                        else{
                            this.init();
                        }
                        break;
                    case "Back to Menu" :
                        g_muteThemeSong = true;
                        g_sounds.winsong.pauseThemeSong();
                        levelManager.clear();
                        this.clearOptions();
                        this.IsStarted = false;
                        this.init();
                        break;
                    case "Play again":
                        g_muteThemeSong = true;
                        g_sounds.winsong.pauseThemeSong();
                        g_muteThemeSong = false;
                        g_sounds.themesong[levelManager.getLevel()-1].playThemeSong();
                        levelManager.clear();
                        spatialManager.init();
                        levelManager.initLevel();
                        g_menu = !g_menu;
                        this.clearOptions();
                        this.generatePauseMenu();
                        break;
                    default : 
                        break;
                }
            }
        }
    },

    // clears the menu
    clearOptions : function(){
        this._options.splice(0,this._options.length);
    },

    // generates an option in the menu
    generateOption : function(descr) {
    this._options.push((descr));
    },

    // generate options for the sound
    generateSoundOptions: function(){
        
        for(var i = 0; i<maps.options.soundOptions.length; i++)
        {
            this.generateOption({
                text : maps.options.soundOptions[i].text,
                x : maps.options.soundOptions[i].x,
                y : maps.options.soundOptions[i].y,
                font : maps.options.soundOptions[i].font,
                active : maps.options.soundOptions[i].active,
            });
        }

        //console.log(maps.options.sharedOptions.Back.x);
        
    },
    //generates the options for game over if player one won 
    generateGameOver1 : function(){
        for (var i = 0; i < maps.options.gameover1.length ; i++)
        {
            this.generateOption({
                text : maps.options.gameover1[i].text,
                x : maps.options.gameover1[i].x,
                y : maps.options.gameover1[i].y,
                font : maps.options.gameover1[i].font,
                active : maps.options.gameover1[i].active,
            });
        }
    },

    //generates the options for game over if player two won 
    generateGameOver2 : function(){
        for (var i = 0; i < maps.options.gameover2.length ; i++)
        {
            this.generateOption({
                text : maps.options.gameover2[i].text,
                x : maps.options.gameover2[i].x,
                y : maps.options.gameover2[i].y,
                font : maps.options.gameover2[i].font,
                active : maps.options.gameover2[i].active,
            });
        }
    },

    // generates the text explaining the button layout
    generateInstructions: function(){
        
        for(var i = 0; i<maps.options.instructions.length; i++)
        {
            this.generateOption({
                text : maps.options.instructions[i].text,
                x : maps.options.instructions[i].x,
                y : maps.options.instructions[i].y,
                font : maps.options.instructions[i].font,
                active : maps.options.instructions[i].active,
            });
        }
    },

    //generates the pause menu
    generatePauseMenu: function(){
        
        for(var i = 0; i<maps.options.pauseMenu.length; i++)
        {
            this.generateOption({
                text : maps.options.pauseMenu[i].text,
                x : maps.options.pauseMenu[i].x,
                y : maps.options.pauseMenu[i].y,
                font : maps.options.pauseMenu[i].font,
                active : maps.options.pauseMenu[i].active,
            });
        }
    },

    // generates the Main menu
    init : function (){
        
        for(var i = 0; i<maps.options.startMenu.length; i++)
        {
            this.generateOption({
                text : maps.options.startMenu[i].text,
                x : maps.options.startMenu[i].x,
                y : maps.options.startMenu[i].y,
                font : maps.options.startMenu[i].font,
                active : maps.options.startMenu[i].active,
            });
        }

    
    }
}