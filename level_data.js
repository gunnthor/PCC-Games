var maps =
{ levels : 
	[
		{
			// =================
			// BLOCKS
			// teikna kubba frá x til endx og y til endy, þar sem að x og y eru kubbastaðsetningar
			//(þ.e.a.s. kubbur númer x í átt x og kubbur númer y í átt y) en ekki x og y hnit í canvas
			// 
			//  
			// =================
			blocks :
			[
				{
					x : 1,
				 	y : 32,
				 	endx : 14,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//row 1 - left side 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 1,
				 	y : 15,
				 	endx : 2,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//wall - left side 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 32,
				 	y : 15,
				 	endx : 33,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//wall - right side 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 1,
				 	y : 1,
				 	endx : 2,
				 	endy : 10,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//wall_top - left side 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 32,
				 	y : 1,
				 	endx : 33,
				 	endy : 10,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//wall_top - right side 
				 	//type: iceblock/blueblock/mudblock
				},





				{
					x : 20,
				 	y : 32,
				 	endx : 32,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//row 1 - right side
				 	//type: iceblock/blueblock/mudblock
				},


				{
					x : 9,
				 	y : 31,
				 	endx : 14,
				 	endy : 32,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},


				{
					x : 11,
				 	y : 30,
				 	endx : 14,
				 	endy : 31,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 12,
				 	y : 29,
				 	endx : 14,
				 	endy : 30,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 13,
				 	y : 28,
				 	endx : 14,
				 	endy : 29,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 31,
				 	endx : 25,
				 	endy : 32,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 30,
				 	endx : 23,
				 	endy : 31,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 29,
				 	endx : 22,
				 	endy : 30,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 28,
				 	endx : 21,
				 	endy : 29,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 2,
				 	y : 23,
				 	endx : 11,
				 	endy : 24,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//efri pallur vinstri 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 23,
				 	y : 23,
				 	endx : 32,
				 	endy : 24,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7 
				 	//efri pallur hægri
				 	//type: iceblock/blueblock/mudblock
				},


				{
					x : 12,
				 	y : 18,
				 	endx : 22,
				 	endy : 19,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7
				 	//miðjupallur 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 1,
					y : 14,
					endx : 8,
					endy : 15,
					width : 32,
					height : 18,
					friction : 0.7
					//efsti pallur vinstri
				},

				{
					x : 26,
					y : 14,
					endx : 33,
					endy : 15,
					width : 32,
					height : 18,
					friction : 0.7
					//efsti pallur hægri
				},


				{
					x : 12,
					y : 10,
					endx : 16,
					endy : 11,
					width : 32,
					height : 18,
					friction : 0.7
					//efsti miðjupallur vinstri
				},


				{
					x : 18,
					y : 10,
					endx : 22,
					endy : 11,
					width : 32,
					height : 18,
					friction : 0.7
					//efsti miðjupallur hægri
				}

			],

			images :
			{				
				background : "backgrounds/Background.png",
				player1 : "Player1.png",
				brick_blue : "bricks/brick_background_1.png"				
			},


			sounds : 
			{
				pistolSound     : "sounds/pistolSound.ogg",   
        		pistolSound2    : "sounds/pistolSound.ogg",
        		shotgunSound    :  "sounds/shotgunSound.ogg",
        		shotgunSound2   :  "sounds/shotgunSound.ogg",
        		backgroundSong  : "sounds/HansZimmerTheKraken.ogg"
			},




		}
	],


	options :
	{
		sharedOptions :
		{
			Back : 
			{
	            text: "Back",
	            x: g_canvas.width/2,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: true
            }
		},


		soundOptions : 
		[
			{
				text: "Music",
            	x: g_canvas.width/2,
            	y: (g_canvas.height/2) - 60,
            	font: "20px Georgia, bold",
            	active: true
			},

			{
	            text: "Effects",
	            x: g_canvas.width/2 ,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: true
            },

            {
	            text: "Back",
	            x: g_canvas.width/2,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: true
            }           

        ],

        instructions : 
        [
        	{
	            text: "Buttons Player 1",
	            x: (g_canvas.width/2) - 130,
	            y: (g_canvas.height/2) - 60,
	            font: "20px Georgia, bold",
	            active: false
            },

	        {
	            text: "W : jump",
	            x: (g_canvas.width/2) - 130,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: false

	        },

	        {
	            text: "A : move left",
	            x: (g_canvas.width/2) - 130,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "D : move right",
	            x: (g_canvas.width/2) - 130,
	            y: (g_canvas.height/2) + 30,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "S : shoot",
	            x: (g_canvas.width/2) - 130,
	            y: (g_canvas.height/2) + 60,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "E: change gun",
	            x: (g_canvas.width/2) - 130,
	            y: (g_canvas.height/2) + 90,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "Buttons Player 2",
	            x: (g_canvas.width/2) + 60,
	            y: (g_canvas.height/2) - 60,
	            font: "20px Georgia, bold",
	            active: false 
	        },

	        {
	            text: "I : jump",
	            x: (g_canvas.width/2) + 60,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "J : move left",
	            x: (g_canvas.width/2) + 60,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "L : move right",
	            x: (g_canvas.width/2) + 60,
	            y: (g_canvas.height/2) + 30,
	            font: "20px Georgia, bold",
	            active: false
	        },


	        {
	            text: "K : shoot",
	            x: (g_canvas.width/2) + 60,
	            y: (g_canvas.height/2) + 60,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "O : change gun",
	            x: (g_canvas.width/2) + 60,
	            y: (g_canvas.height/2) + 90,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "Back",
	            x: g_canvas.width/2,
	            y: (g_canvas.height/2) + 120,
	            font: "20px Georgia, bold",
	            active: true
	        }

        ],

        pauseMenu : 
        [
	        {
	            text: "Resume",
	            x: g_canvas.width/2,
	            y: (g_canvas.height/2) - 60,
	            font: "20px Georgia, bold",
	            active: true
	        },

	        {
	            text: "Sound",
	            x: g_canvas.width/2 ,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: true
	        },

	        {
	            text: "Instructions",
	            x: g_canvas.width/2,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: true
	        }

        ],

        startMenu : 
        [
	        {
	            text: "Begin",
            	x: g_canvas.width/2,
            	y: (g_canvas.height/2) - 60,
            	font: "20px Georgia, bold",
            	active: true
	        },

	        {
	            text: "Sound",
	            x: g_canvas.width/2 ,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: true
	        },

		    {
	            text: "Map",
	            x: g_canvas.width/2,
	            y: g_canvas.height/2,
	            font: "20px Georgia, bold",
	            active: true
	        },

	        {
	           text: "Instructions",
	            x: g_canvas.width/2,
	            y: (g_canvas.height/2) + 30,
	            font: "20px Georgia, bold",
	            active: true
	        }

        ]




	}


		
}