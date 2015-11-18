
var Menu = {
    _options : [],

    IsStarted : false,
    textWidth : 100,

    render : function (ctx) {
        ctx.globalAlpha=0.3;
        renderSimulation(ctx);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "red";
         for (var i = 0; i < this._options.length; i++){
            this.renderoption(this._options[i],ctx);
        }
    },

    renderoption : function (option,ctx){
        ctx.font = option.font;
        ctx.fillText(option.text,option.x,option.y)
    },

    update : function (du){

    },

    onhover : function (xPos,yPos){
        for (var p = 0; p < this._options.length; p++){
            if ((this._options[p].y >= yPos && this._options[p].y < yPos + 30) &&(this._options[p].x <= xPos && this._options[p].x >= xPos - this.textWidth) && this._options[p].active){
                this._options[p].font = "30px Georgia,bold"; 
            }
            else{
                this._options[p].font = "20px Georgia,bold";
            }
        }
    },

    onclick : function (xPos,yPos){
        for (var p = 0; p < this._options.length; p++){
            if ((this._options[p].y >= yPos && this._options[p].y < yPos + 30) &&(this._options[p].x <= xPos && this._options[p].x >= xPos - this.textWidth) && this._options[p].active){
                switch(this._options[p].text){
                    case "Begin":
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
                        Sound.prototype.replayThemeSong();
                    } else {
                        Sound.prototype.pauseThemeSong();
                    }
                        break;
                    case "Effects":
                        g_muteEffects = !g_muteEffects
                        break;
                    case "Map":
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
                    default : 
                        break;
                }
            }
        }
    },

    clearOptions : function(){
        this._options.splice(0,this._options.length);
    },

    generateOption : function(descr) {
    this._options.push((descr));
    },

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

        console.log(maps.options.sharedOptions.Back.x);
        
    },

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