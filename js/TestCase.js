/**************************************************
Stage 1 Fixed Value
***************************************************/
var RectPos_arr = [{x:910, y:200, width:100, height:50}, {x:910, y:250, width:100, height:50},

				{x:810, y:200, width:100, height:50}, {x:810, y:250, width:100, height:50}, {x:1010, y:200, width:100, height:50}, {x:1010, y:250, width:100, height:50},
				{x:710, y:200, width:100, height:50}, {x:710, y:250, width:100, height:50}, {x:1110, y:200, width:100, height:50}, {x:1110, y:250, width:100, height:50},
				{x:610, y:200, width:100, height:50}, {x:610, y:250, width:100, height:50}, {x:1210, y:200, width:100, height:50}, {x:1210, y:250, width:100, height:50},
				
				{x:910, y:300, width:100, height:50}, {x:910, y:350, width:100, height:50},
				
				{x:810, y:300, width:100, height:50}, {x:810, y:350, width:100, height:50}, 
				{x:710, y:300, width:100, height:50}, {x:710, y:350, width:100, height:50}, 
				{x:1010, y:300, width:100, height:50}, {x:1010, y:350, width:100, height:50}, 
				{x:1110, y:300, width:100, height:50}, {x:1110, y:350, width:100, height:50}, 
				{x:610, y:300, width:100, height:50}, {x:610, y:350, width:100, height:50}, 
				{x:1210, y:300, width:100, height:50}, {x:1210, y:350, width:100, height:50},
				
				{x:910, y:400, width:100, height:50}, {x:910, y:450, width:100, height:50}, 
				
				{x:810, y:400, width:100, height:50}, {x:810, y:450, width:100, height:50}, 
				{x:710, y:400, width:100, height:50}, {x:710, y:450, width:100, height:50}, 
				{x:1010, y:400, width:100, height:50}, {x:1010, y:450, width:100, height:50}, 
				{x:1110, y:400, width:100, height:50}, {x:1110, y:450, width:100, height:50}, 
				{x:610, y:400, width:100, height:50}, {x:610, y:450, width:100, height:50}, 
				{x:1210, y:400, width:100, height:50}, {x:1210, y:450, width:100, height:50},
				
				{x:910, y:500, width:100, height:50}, {x:910, y:550, width:100, height:50},
				
				{x:810, y:500, width:100, height:50}, {x:810, y:550, width:100, height:50}, 
				{x:710, y:500, width:100, height:50}, {x:710, y:550, width:100, height:50}, 
				{x:1010, y:500, width:100, height:50}, {x:1010, y:550, width:100, height:50}, 
				{x:1110, y:500, width:100, height:50}, {x:1110, y:550, width:100, height:50}, 
				{x:610, y:500, width:100, height:50}, {x:610, y:550, width:100, height:50}, 
				{x:1210, y:500, width:100, height:50}, {x:1210, y:550, width:100, height:50},
				
				{x:610, y:150, width:100, height:50},
				{x:710, y:150, width:100, height:50},
				{x:810, y:150, width:100, height:50},
				{x:910, y:150, width:100, height:50},
				{x:1010, y:150, width:100, height:50},
				{x:1110, y:150, width:100, height:50},
				{x:1210, y:150, width:100, height:50},
				{x:610, y:600, width:100, height:50},
				{x:710, y:600, width:100, height:50},
				{x:810, y:600, width:100, height:50},
				{x:910, y:600, width:100, height:50},
				{x:1010, y:600, width:100, height:50},
				{x:1110, y:600, width:100, height:50},
				{x:1210, y:600, width:100, height:50},
				
				{x:560, y:200, width:50, height:100},
				{x:560, y:300, width:50, height:100},
				{x:560, y:400, width:50, height:100},
				{x:560, y:500, width:50, height:100},
				{x:1310, y:200, width:50, height:100},
				{x:1310, y:300, width:50, height:100},
				{x:1310, y:400, width:50, height:100},
				{x:1310, y:500, width:50, height:100},
				
				{x:560, y:150, width:50, height:50},
				{x:560, y:600, width:50, height:50},
				{x:1310, y:150, width:50, height:50},
				{x:1310, y:600, width:50, height:50}];

var CirclePos_arr = [{cx:910, cy:200}, {cx:1010, cy:200}, {cx:910, cy:250}, {cx:1010, cy:250}, {cx:910, cy:300}, {cx:1010, cy:300},
 
					{cx:810, cy:200}, {cx:1110, cy:200}, {cx:810, cy:250}, {cx:1110, cy:250}, {cx:810, cy:300}, {cx:1110, cy:300},
					{cx:710, cy:200}, {cx:1210, cy:200}, {cx:710, cy:250}, {cx:1210, cy:250}, {cx:710, cy:300}, {cx:1210, cy:300},
					{cx:610, cy:200}, {cx:1310, cy:200}, {cx:610, cy:250}, {cx:1310, cy:250}, {cx:610, cy:300}, {cx:1310, cy:300},
					
					{cx:910, cy:350}, {cx:1010, cy:350}, {cx:910, cy:400}, {cx:1010, cy:400},
					
					{cx:810, cy:350}, {cx:810, cy:400}, 
					{cx:710, cy:350}, {cx:710, cy:400}, 
					{cx:1110, cy:350}, {cx:1110, cy:400}, 
					{cx:1210, cy:350}, {cx:1210, cy:400}, 
					{cx:610, cy:350}, {cx:610, cy:400}, 
					{cx:1310, cy:350}, {cx:1310, cy:400}, 
					
					{cx:910, cy:450}, {cx:1010, cy:450}, {cx:910, cy:500}, {cx:1010, cy:500},
					
					{cx:810, cy:450}, {cx:810, cy:500}, 
					{cx:710, cy:450}, {cx:710, cy:500}, 
					{cx:1110, cy:450}, {cx:1110, cy:500}, 
					{cx:1210, cy:450}, {cx:1210, cy:500}, 
					{cx:610, cy:450}, {cx:610, cy:500}, 
					{cx:1310, cy:450}, {cx:1310, cy:500}, 
					
					{cx:910, cy:550}, {cx:1010, cy:550}, {cx:910, cy:600}, {cx:1010, cy:600},
					
					{cx:810, cy:550}, {cx:810, cy:600}, 
					{cx:710, cy:550}, {cx:710, cy:600}, 
					{cx:1110, cy:550}, {cx:1110, cy:600}, 
					{cx:1210, cy:550}, {cx:1210, cy:600}, 
					{cx:610, cy:550}, {cx:610, cy:600}, 
					{cx:1310, cy:550}, {cx:1310, cy:600}, 
					
					{cx:610, cy:150}, {cx:710, cy:150},
					{cx:810, cy:150}, 
					{cx:910, cy:150},
					{cx:1010, cy:150},
					{cx:1110, cy:150},
					{cx:1210, cy:150},
					{cx:1310, cy:150},
					{cx:610, cy:650}, {cx:710, cy:650},
					{cx:810, cy:650}, 
					{cx:910, cy:650}, 
					{cx:1010, cy:650}, 
					{cx:1110, cy:650}, 
					{cx:1210, cy:650}, 
					{cx:1310, cy:650}, 
					
					{cx:560, cy:200}, {cx:560, cy:300}, 
					{cx:560, cy:400}, 
					{cx:560, cy:500}, 
					{cx:560, cy:600}, 
					{cx:1360, cy:200}, {cx:1360, cy:300}, 
					{cx:1360, cy:400}, 
					{cx:1360, cy:500}, 
					{cx:1360, cy:600},
					
					{cx:560, cy:150}, 
					{cx:560, cy:650}, 
					{cx:1360, cy:150},  
					{cx:1360, cy:650}];

//var LinePos_arr = [];
var RectsOfStep = [2, 
				4, 4, 4, 
				2, 
				2, 2, 2, 2, 2, 2,
				2,
				2, 2, 2, 2, 2, 2,
				2,
				2, 2, 2, 2, 2, 2,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 1];
				
var CirclesOfStep = [6, 
					6, 6, 6,
					4, 
					2, 2, 2, 2, 2, 2,
					4, 
					2, 2, 2, 2, 2, 2,
					4, 
					2, 2, 2, 2, 2, 2,
					2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1,
					2, 1, 1, 1,	2, 1, 1, 1,
					1, 1, 1, 1];
					
var TypesOfStep = [1, 
				2, 2, 2,
				1, 
				1, 1, 1, 1, 1, 1,
				1, 
				1, 1, 1, 1, 1, 1,
				1, 
				1, 1, 1, 1, 1, 1,
				1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
				1, 1, 1, 1,	1, 1, 1, 1,
				1, 1, 1, 1];
				
var TypeOfUnit = [0, 
				1, 1, 1, 1, 1, 1,
				0, 
				1, 1, 1, 1, 1, 1,
				0, 
				1, 1, 1, 1, 1, 1,
				0, 
				1, 1, 1, 1, 1, 1,
				4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4,
				2, 2, 2, 2,	2, 2, 2, 2,
				3, 3, 3, 3];
				
var LayoutMapCase = [{isFilled: 0, edge: true, x:160, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:210, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:310, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:410, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:510, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:610, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:710, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:810, y:150, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:150, typeID:null, isGrouped:false}, 
					{isFilled: 0, edge: true, x:160, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:210, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:310, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:410, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:510, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:610, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:710, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:810, y:200, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:200, typeID:null, isGrouped:false}, 
					{isFilled: 0, edge: true, x:160, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:210, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:310, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:410, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:510, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:610, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:710, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:810, y:300, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:300, typeID:null, isGrouped:false}, 
					{isFilled: 0, edge: true, x:160, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:210, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:310, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:410, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:510, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:610, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:710, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:810, y:400, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:400, typeID:null, isGrouped:false}, 
					{isFilled: 0, edge: true, x:160, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:210, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:310, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:410, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:510, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:610, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:710, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:810, y:500, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:500, typeID:null, isGrouped:false},
					{isFilled: 0, edge: true, x:160, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:210, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:310, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:410, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:510, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:610, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:710, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: false, x:810, y:600, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:600, typeID:null, isGrouped:false},
					{isFilled: 0, edge: true, x:160, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:210, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:310, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:410, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:510, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:610, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:710, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:810, y:700, typeID:null, isGrouped:false}, {isFilled: 0, edge: true, x:910, y:700, typeID:null, isGrouped:false}];
					
//0=unfilled, 1=filled, 2=will be filled.
//var rule1 = [2, 0, 0, 0, 0, 0, 0, 0, 0];
//var rule2 = [1, 0, 0, 0, 0, 0, 0, 2, 0];
//var rule3 = [1, 2, 0, 0, 0, 2, 0, 0, 0];
//var rule4 = [1, 1, 0, 0, 0, 0, 0, 1, 2];
//var rule5 = [1, 0, 0, 0, 0, 1, 2, 1, 0];
//var rule6 = [1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//0=must unfilled, 1=must filled, 2=must unfilled and will be filled, 3=not my business
var rule1 = [2, 0, 0, 0, 0, 0, 0, 0, 0];
var rule2 = [1, 3, 3, 3, 3, 3, 0, 2, 0];
var rule3 = [1, 2, 0, 3, 0, 2, 0, 3, 0];
var rule4 = [1, 1, 3, 3, 3, 3, 3, 1, 2];
var rule5 = [1, 3, 3, 3, 3, 1, 2, 1, 3];
var rule6 = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
var rule7 = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0];
var rule8 = [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0];
var rule9 = [1, 3, 3, 2, 3, 3, 3, 1, 3];
var rule10 = [1, 3, 3, 1, 3, 3, 3, 2, 3];
var rule11 = [1, 2, 3, 1, 1, 1, 1, 1, 3];
var rule12 = [1, 1, 1, 1, 3, 2, 3, 1, 1];
var rule13 = [1, 1, 2, 1, 1, 1, 1, 1, 1];
var rule14 = [1, 1, 1, 1, 1, 1, 1, 1, 2];
var rule15 = [1, 1, 1, 1, 2, 1, 1, 1, 1];
var rule16 = [1, 1, 1, 1, 1, 1, 2, 1, 1];

//var rule17 = [0, 1, 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N'];
var rule17 = [1, 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N'];
var rule18 = ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 1, 0, 1, 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
var rule19 = ['N', 'N', 'N', 'N', 'N', 'N', 1, 0, 1, 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
var rule20 = [0, 1, 1, 0, 1, 1, 'N', 'N', 'N', 'N', 1, 1, 'N', 'N', 'N', 'N', 'N', 1, 1, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];

var rule21 = ['N', 'N', 'N', 'N', 'N', 'N', 6, 6, 6, 6, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 6, 'N', 'N', 'N', 'N', 'N', 'N', 6, 5, 5, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 5, 5, 6, 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'];
var rule21_path = [{x:0, y:0}, {x:0, y:300}, {x:700, y:300}, {x:700, y:0}, {x:600, y:0}, {x:600, y:200}, {x:100, y:200}, {x:100, y:0}];

var ruleType = [0, 0, 1, 1, 1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 6, 6, 7, 8];
var ruleLevel = [1, 2, 3];
var ruleResultSize = [{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100}, 
					{width:100, height:100},
					{width:100, height:50},
					{width:100, height:50},
					{width:50, height:100},
					{width:50, height:100},
					{width:50, height:50},
					{width:50, height:50},
					{width:50, height:50},
					{width:50, height:50},
					{width:100, height:200},
					{width:700, height:100},
					{width:700, height:100},
					{width:500, height:200},
					{width:0, height:0}];