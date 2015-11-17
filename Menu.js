
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
        this.generateOption({
            text: "Music",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Effects",
            x: g_canvas.width/2 ,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Back",
            x: g_canvas.width/2,
            y: g_canvas.height/2,
            font: "20px Georgia, bold",
            active: true
        });
    },

    generateInstructions: function(){
        this.generateOption({
            text: "Buttons Player 1",
            x: (g_canvas.width/2) - 130,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "W : jump",
            x: (g_canvas.width/2) - 130,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold",
            active: false

        });
        this.generateOption({
            text: "A : move left",
            x: (g_canvas.width/2) - 130,
            y: g_canvas.height/2,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "D : move right",
            x: (g_canvas.width/2) - 130,
            y: (g_canvas.height/2) + 30,
            font: "20px Georgia, bold",
            active: false
        });

        this.generateOption({
            text: "S : shoot",
            x: (g_canvas.width/2) - 130,
            y: (g_canvas.height/2) + 60,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "E: change gun",
            x: (g_canvas.width/2) - 130,
            y: (g_canvas.height/2) + 90,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "Buttons Player 2",
            x: (g_canvas.width/2) + 60,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold",
            active: false 
        });
        this.generateOption({
            text: "I : jump",
            x: (g_canvas.width/2) + 60,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "J : move left",
            x: (g_canvas.width/2) + 60,
            y: g_canvas.height/2,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "L : move right",
            x: (g_canvas.width/2) + 60,
            y: (g_canvas.height/2) + 30,
            font: "20px Georgia, bold",
            active: false
        });

        this.generateOption({
            text: "K : shoot",
            x: (g_canvas.width/2) + 60,
            y: (g_canvas.height/2) + 60,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "O : change gun",
            x: (g_canvas.width/2) + 60,
            y: (g_canvas.height/2) + 90,
            font: "20px Georgia, bold",
            active: false
        });
        this.generateOption({
            text: "Back",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) + 120,
            font: "20px Georgia, bold",
            active: true
        });

    },

    generatePauseMenu: function(){
        this.generateOption({
            text: "Resume",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Sound",
            x: g_canvas.width/2 ,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Instructions",
            x: g_canvas.width/2,
            y: g_canvas.height/2,
            font: "20px Georgia, bold",
            active: true
        });
    },

    init : function (){
        this.generateOption({
            text: "Begin",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Sound",
            x: g_canvas.width/2 ,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Map",
            x: g_canvas.width/2,
            y: g_canvas.height/2,
            font: "20px Georgia, bold",
            active: true
        });
        this.generateOption({
            text: "Instructions",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) + 30,
            font: "20px Georgia, bold",
            active: true
        });
    }
}