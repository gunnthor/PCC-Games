
var Menu = {
    _options : [],

    render : function (ctx) {
        ctx.globalAlpha=0.1;
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
            if ((this._options[p].y >= yPos && this._options[p].y <= yPos + 30) &&(this._options[p].x <= xPos && this._options[p].x >= xPos - 100)){
                this._options[p].font = "30px Georgia,bold"; 
            }
            else{
                this._options[p].font = "20px Georgia,bold";
            }
        }
    },
    onclick : function (xPos,yPos){
        g_menu = !g_menu;

    },
    generateOption : function(descr) {
    this._options.push((descr));
    },
    init : function (){
        this.generateOption({
            text: "Begin",
            x: g_canvas.width/2,
            y: (g_canvas.height/2) - 60,
            font: "20px Georgia, bold"
        });
        this.generateOption({
            text: "Sound",
            x: g_canvas.width/2 ,
            y: (g_canvas.height/2) -30,
            font: "20px Georgia, bold"
        });
        this.generateOption({
            text: "Map",
            x: g_canvas.width/2,
            y: g_canvas.height/2,
            font: "20px Georgia, bold"
        });
    }
}