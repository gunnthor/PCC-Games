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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue"
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
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},


				{
					x : 11,
				 	y : 30,
				 	endx : 14,
				 	endy : 31,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 12,
				 	y : 29,
				 	endx : 14,
				 	endy : 30,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 13,
				 	y : 28,
				 	endx : 14,
				 	endy : 29,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 31,
				 	endx : 25,
				 	endy : 32,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 30,
				 	endx : 23,
				 	endy : 31,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 29,
				 	endx : 22,
				 	endy : 30,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//type: iceblock/blueblock/mudblock
				},

				{
					x : 20,
				 	y : 28,
				 	endx : 21,
				 	endy : 29,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	
				},

				{
					x : 2,
				 	y : 23,
				 	endx : 11,
				 	endy : 24,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//efri pallur vinstri 
				 	
				},

				{
					x : 23,
				 	y : 23,
				 	endx : 32,
				 	endy : 24,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue" 
				 	//efri pallur hægri
				 	
				},


				{
					x : 12,
				 	y : 18,
				 	endx : 22,
				 	endy : 19,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//miðjupallur 
				 	
				},

				{
					x : 1,
					y : 14,
					endx : 8,
					endy : 15,
					width : 32,
					height : 18,
					friction : 0.7,
				 	type : "brick_blue"
					//efsti pallur vinstri
				},

				{
					x : 26,
					y : 14,
					endx : 33,
					endy : 15,
					width : 32,
					height : 18,
					friction : 0.7,
				 	type : "brick_blue"
					//efsti pallur hægri
				},


				{
					x : 12,
					y : 10,
					endx : 16,
					endy : 11,
					width : 32,
					height : 18,
					friction : 0.7,
					moving : true,
					moveDistance : 64,
					velY : 1.4,
				 	type : "brick_blue"
					//efsti miðjupallur vinstri
				},


				{
					x : 18,
					y : 14,
					endx : 22,
					endy : 15,
					width : 32,
					height : 18,
					friction : 0.7,
					moving : true,
					moveDistance : -64,
					velY : -1.4,
				 	type : "brick_blue"
				 	//efsti miðjupallur hægri					
				}		



			],

			respawns : 
			[
				

				{
					x : 50,
					y : 360
				},
				{
					x : g_canvas.width -60,
					y : 360 
				},{
					x : 50,
					y : 200 
				},
				{
					x : 50,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 130 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 130
				},
				{
					x : g_canvas.width -60,
					y : 200 
				},
				
				{
					x : g_canvas.width -60,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 450 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 450
				}
			],

			sounds : 
			{
				pistolSound     : "sounds/pistolSound.ogg",   
        		pistolSound2    : "sounds/pistolSound.ogg",
        		shotgunSound    :  "sounds/shotgunSound.ogg",
        		shotgunSound2   :  "sounds/shotgunSound.ogg",
        		backgroundSong  : "sounds/HansZimmerTheKraken.ogg"
			},


			drops : 
			[
				{
					x : 16,
				 	y : 17,
				 	endx : 17,
				 	endy : 18,
				 	width : 32,
				 	height : 18,
				 	type : "shotgun",
				 	cooldown : 2,
				 	visible : true
				 	//shotgun				 	
				},

				{
					x : 28,
				 	y : 13,
				 	endx : 29,
				 	endy : 14,
				 	width : 32,
				 	height : 18,
				 	type : "healthpack",
				 	cooldown : 2,
				 	visible : true,
				 	health : 50
				 	//healthpack				 	
				}

			]

		},
			//=====================================================================================
			//=====================================================================================
			//=====================================================================================
			//==================================MAP TVÖ!!!=========================================
			//==================================MAP TVÖ!!!=========================================
			//==================================MAP TVÖ!!!=========================================
			//=====================================================================================
			//=====================================================================================
			//=====================================================================================
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
				//floor left
				{
					x : 1,
				 	y : 32,
				 	endx : 7,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//floor - left 
				},

				{
					x : 11,
				 	y : 32,
				 	endx : 23,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//floor middle 
				},


				{
					x : 27,
				 	y : 32,
				 	endx : 33,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//floor right 
				},

				{
					x : 16,
				 	y : 18,
				 	endx : 18,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest [big] middle pillar
				},
				{
					x : 16,
				 	y : 9,
				 	endx : 18,
				 	endy : 12,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top [big] middle/1 pillar
				},
				{
					x : 15,
				 	y : 10,
				 	endx : 19,
				 	endy : 12,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top [big] middle/2 pillar
				},
				{
					x : 14,
				 	y : 11,
				 	endx : 20,
				 	endy : 12,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top [big] middle/3 pillar
				},
				{
					x : 10,
				 	y : 12,
				 	endx : 24,
				 	endy : 13,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top [big] middle [LONG] pillar
				},


				{
					x : 1,
				 	y : 27,
				 	endx : 2,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest left pillar
				},
				{
					x : 1,
				 	y : 12,
				 	endx : 2,
				 	endy : 22,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//middle left pillar
				},
				{
					x : 1,
				 	y : 0,
				 	endx : 2,
				 	endy : 7,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top left pillar
				},


				{
					x : 32,
				 	y : 27,
				 	endx : 33,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest right pillar
				},
				{
					x : 32,
				 	y : 12,
				 	endx : 33,
				 	endy : 22,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//middle right pillar
				},
				{
					x : 32,
				 	y : 0,
				 	endx : 33,
				 	endy : 7,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//top right pillar
				},
				{
					x : 5,
				 	y : 27,
				 	endx : 13,
				 	endy : 28,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest part of maze [left]
				},
				{
					x : 21,
				 	y : 27,
				 	endx : 29,
				 	endy : 28,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest part of maze [right]
				},

				{
					x : 5,
				 	y : 12,
				 	endx : 6,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest part of maze [left]
				},
				{
					x : 28,
				 	y : 12,
				 	endx : 29,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	//lowest part of maze [right]
				},
				{
					x : 13,
				 	y : 18,
				 	endx : 16,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/1 [left side]
				},
				{
					x : 12,
				 	y : 19,
				 	endx : 13,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/2 [left side]
				},
				{
					x : 11,
				 	y : 20,
				 	endx : 12,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/3 [left side]
				},
				{
					x : 10,
				 	y : 21,
				 	endx : 11,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/4 [left side]
				},
				{
					x : 9,
				 	y : 22,
				 	endx : 10,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/5 [left side]
				},

				{
					x : 18,
				 	y : 18,
				 	endx : 21,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/1 [right side]
				},
				{
					x : 20,
				 	y : 19,
				 	endx : 22,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/2 [right side]
				},
				{
					x : 21,
				 	y : 20,
				 	endx : 23,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/3 [right side]
				},
				{
					x : 22,
				 	y : 21,
				 	endx : 24,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/4 [right side]
				},
				{
					x : 23,
				 	y : 22,
				 	endx : 24,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/5 [right side]
				},
				{
					x : 24,
				 	y : 22,
				 	endx : 25,
				 	endy : 23,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// middle ramp/6(auka) [right side]
				},

				{
					x : 6,
				 	y : 12,
				 	endx : 7,
				 	endy : 13,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// SILLA [LEFT]
				},
				{
					x : 7,
				 	y : 8,
				 	endx : 10,
				 	endy : 9,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// SILLA2 [LEFT]
				},
				{
					x : 27,
				 	y : 12,
				 	endx : 28,
				 	endy : 13,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// SILLA [RIGHT]
				},
				{
					x : 24,
				 	y : 8,
				 	endx : 27,
				 	endy : 9,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_sand"
				 	// SILLA2 [LEFT]
				},


			],

			respawns : 
			[
				

				{
					x : 50,
					y : 360
				},
				{
					x : g_canvas.width -60,
					y : 360 
				},{
					x : 50,
					y : 200 
				},
				{
					x : 50,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 130 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 130
				},
				{
					x : g_canvas.width -60,
					y : 200 
				},
				
				{
					x : g_canvas.width -60,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 450 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 450
				}
			],

			


			drops : 
			[
				{
					x : 16,
				 	y : 17,
				 	endx : 17,
				 	endy : 18,
				 	width : 32,
				 	height : 18,
				 	type : "shotgun",
				 	cooldown : 2,
				 	visible : true
				 	//shotgun				 	
				},

				{
					x : 28,
				 	y : 13,
				 	endx : 29,
				 	endy : 14,
				 	width : 32,
				 	height : 18,
				 	type : "healthpack",
				 	cooldown : 2,
				 	visible : true,
				 	health : 50
				 	//healthpack				 	
				}

			]

		},
		//=====================================================================================
			//=====================================================================================
			//=====================================================================================
			//==================================MAP  3!!!=========================================
			//==================================MAP 3!!!=========================================
			//==================================MAP 3!!!=========================================
			//=====================================================================================
			//=====================================================================================
			//=====================================================================================
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
				//floor left
				{
					x : 1,
				 	y : 32,
				 	endx : 7,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//floor - left 
				},

				{
					x : 11,
				 	y : 32,
				 	endx : 23,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//floor middle 
				},


				{
					x : 27,
				 	y : 32,
				 	endx : 33,
				 	endy : 33,
				 	width : 32,
				 	height : 18,
				 	friction: 0.7,
				 	type : "brick_blue"
				 	//floor right 
				},

			],

			respawns : 
			[
				

				{
					x : 50,
					y : 360
				},
				{
					x : g_canvas.width -60,
					y : 360 
				},{
					x : 50,
					y : 200 
				},
				{
					x : 50,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 130 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 130
				},
				{
					x : g_canvas.width -60,
					y : 200 
				},
				
				{
					x : g_canvas.width -60,
					y : 520 
				},
				{
					x : g_canvas.width/2 - 110,
					y : 450 
				},
				{
					x : g_canvas.width/2 + 110,
					y : 450
				}
			],

			sounds : 
			{
				pistolSound     : "sounds/pistolSound.ogg",   
        		pistolSound2    : "sounds/pistolSound.ogg",
        		shotgunSound    :  "sounds/shotgunSound.ogg",
        		shotgunSound2   :  "sounds/shotgunSound.ogg",
        		backgroundSong  : "sounds/HansZimmerTheKraken.ogg"
			},


			drops : 
			[
				{
					x : 16,
				 	y : 17,
				 	endx : 17,
				 	endy : 18,
				 	width : 32,
				 	height : 18,
				 	type : "shotgun",
				 	cooldown : 2,
				 	visible : true
				 	//shotgun				 	
				},

				{
					x : 28,
				 	y : 13,
				 	endx : 29,
				 	endy : 14,
				 	width : 32,
				 	height : 18,
				 	type : "healthpack",
				 	cooldown : 1,
				 	visible : true,
				 	health : 50
				 	//healthpack				 	
				}

			]

		}
	],



	images :
	{	//common			
		shotgun : "drops/shotgunicon.png",
		healthpack : "drops/health_pack.png",
		player1 : "Player1.png",
		//Level 1 (dark map)
		background : "backgrounds/Background.png",
		brick_blue : "bricks/brick_background_1.png",
		//Level 2(sand map)
		sandbackground : "backgrounds/sandbackground.png",
		brick_sand :	"bricks/brick_sand.png",
		//lever 3(city map)
		citybackground : "backgrounds/CityBackground.png"		
	},
	sounds : 
		{
			pistolSound     : "sounds/pistolSound.ogg",   
        	pistolSound2    : "sounds/pistolSound.ogg",
        	shotgunSound    :  "sounds/shotgunSound.ogg",
        	shotgunSound2   :  "sounds/shotgunSound.ogg",
        	backgroundSong  : "sounds/HansZimmerTheKraken.ogg",
        	backgroundSong2 : "sounds/indianajonesthemesong.ogg",
        	winsong			: "sounds/50centWinSong.ogg"
		},


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
	            text: "Esc : access menu",
	            x: g_canvas.width/2 - 40,
	            y: (g_canvas.height/2) + 120,
	            font: "20px Georgia, bold",
	            active: false
	        },

	        {
	            text: "Back",
	            x: g_canvas.width/2,
	            y: (g_canvas.height/2) + 150,
	            font: "20px Georgia, bold",
	            active: true
	        }

        ],

        gameover1 : 
        [
        	{
        		text:"Game Over",
        		x: (g_canvas.width/2) - 160,
        		y: 80,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
        	{
        		text:"Player 1 won",
        		x: (g_canvas.width/2) - 160,
        		y: 160,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
	        {
	            text: "Play again",
            	x: g_canvas.width/2,
            	y: (g_canvas.height/2) - 60,
            	font: "20px Georgia, bold",
            	active: true
	        },

	        {
	            text: "Back to Menu",
	            x: g_canvas.width/2 ,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: true
	        }
        ],
        gameover2 : 
        [
        	{
        		text:"Game Over",
        		x: (g_canvas.width/2) - 160,
        		y: 80,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
        	{
        		text:"Player 2 won",
        		x: (g_canvas.width/2) - 160,
        		y: 160,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
	        {
	            text: "Play again",
            	x: g_canvas.width/2,
            	y: (g_canvas.height/2) - 60,
            	font: "20px Georgia, bold",
            	active: true
	        },

	        {
	            text: "Back to Menu",
	            x: g_canvas.width/2 ,
	            y: (g_canvas.height/2) -30,
	            font: "20px Georgia, bold",
	            active: true
	        }
        ],

        pauseMenu : 
        [
        	{
        		text:"Tower Fall",
        		x: (g_canvas.width/2) - 160,
        		y: 80,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
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
        		text:"Tower Fall",
        		x: (g_canvas.width/2) - 160,
        		y: 80,
        		font: "small-caps 70px Georgia,bold",
        		active: false
        	},
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