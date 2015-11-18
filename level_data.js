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
			}



		}
	]	

		
}