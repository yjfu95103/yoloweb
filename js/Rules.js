function Rules() {
	var id = 0;
	var max_size = 0;		//Fixed value temporary for test case.
	var max_typeid = 0;
	var Rule_arr = [];		//[{RuleObjects}, {RuleObjects}, {RuleObjects}, ...]

	this.reset = function() {
		id = 0;
		max_size = 0;		//Fixed value temporary for test case.
		max_typeid = 0;
		Rule_arr = [];
	}
	
	this.createNewRule = function(patterns, typeid, Rect_size, r_level, path) {
		var step_temp = [];
		var path_temp;
		var t_id = typeid;
		var rule = new RuleObject();
		
		var size = Math.sqrt(patterns.length);
		
		if( t_id > max_typeid) {
			max_typeid = t_id;
		}
		
		if( size > max_size ) {
			max_size = size;
		}
		
		if( !path ) {
			console.log("Can not find path.");
		}
		else {
			path_temp = path;
		}
		
		for(var i=0; i<patterns.length; i++) {
			if( r_level == 1 ) {
				if( patterns[i] == 2 ) {
					step_temp.push(i);
				}
			}
			else if( r_level == 2 ) {
				if( patterns[i] >= 0 ) {
					step_temp.push(i);
				}
			}
			else if( r_level == 3 ) {
				if( patterns[i] >= 0 ) {
					step_temp.push(i);
				}
			}
		}
		
		rule.setId(id);
		rule.setTypeId(t_id);
		rule.setPattern(patterns);
		rule.setResultSize(Rect_size);
		rule.setPath(path_temp);
		rule.setLevel(r_level);
		rule.setStep(step_temp);
		
		Rule_arr.push(rule);
		id++;
	}
	
	this.getMaxSize = function() {
		return max_size;
	}
	
	this.getMaxTypeID = function() {
		return max_typeid;
	}
	
	this.getLength = function() {
		return Rule_arr.length;
	}

	this.getRuleId = function(param) {
		return Rule_arr[param].getId();
	}
	
	this.getTypeId = function(param) {
		return Rule_arr[param].getTypeId();
	}
	
	this.getColor = function(param) {
		return Rule_arr[param].getColor();
	}
	
	this.getResultSize = function(param) {
		return Rule_arr[param].getResultSize();
	}
	
	this.getPath = function(param) {
		return Rule_arr[param].getPath();
	}
	
	this.getLevel = function(param) {
		return Rule_arr[param].getLevel();
	}
	
	this.getSteps = function(param) {
		return Rule_arr[param].getSteps();
	}
	
	this.getRulePattern = function(param) {
		return Rule_arr[param].getPattern();
	}
	
	this.getAllRules = function() {
		return Rule_arr;
	};
}

function RuleObject() {
	//	_________	
	//	| ¡ô	¡÷ ¡÷	|	Mapping pattern example.
	//	| ¡ö	O ¡õ	|	Start at left node. end at bottom left node base on spiral routine.
	//	| ¡ö	¡ö ¡õ	|	Pattern size may be 3x3, 4x4, ...ect.
	//	¢w¢w¢w¢w¢w¢w¢w¢w¢w
	var id;					//rule id
	var size;				//rule pattern size
	var pattern;			//pattern of rule
	var typeId;				//rule type
	var width, height;
	var path = [];
	var step_of_draw = [];	//position that will be draw and update
	var level;
	
	var color = Colors.random();
	
	this.setId = function(param) {
		id = param;
	}
	
	this.setPattern = function(param) {
		pattern = param;
		size = pattern.length;
	}
	
	this.setTypeId = function(param) {
		typeId = param;
	}
	
	this.setResultSize = function(param) {
		width = param.width;
		height = param.height;
	}
	
	this.setPath = function(param) {
		path = param;
	}
	
	this.setLevel = function(param) {
		level = param;
	}
	
	this.setStep = function(param) {
		step_of_draw.push(param);
	}
	
	this.getId = function() {
		return id;
	}
	
	this.getPattern = function() {
		return pattern;
	}
	
	this.getTypeId = function() {
		return typeId;
	}
	
	this.getResultSize = function() {
		return {width: width, height: height};
	}
	
	this.getPath = function() {
		return path;
	}
	
	this.getLevel = function() {
		return level;
	}
	
	this.getColor = function() {
		return color.rgb;
	}
	
	this.getSteps = function() {
		return step_of_draw;
	}
}

function Rules_init() {
	var rules = new Rules();
	/*
	//Load rules map, Fixed value of test case temporary.
	//LEVEL1
	rules.createNewRule(rule1, ruleType[0], ruleResultSize[0], ruleLevel[0], null);
	rules.createNewRule(rule2, ruleType[1], ruleResultSize[1], ruleLevel[0], null);
	rules.createNewRule(rule3, ruleType[2], ruleResultSize[2], ruleLevel[0], null);
	rules.createNewRule(rule4, ruleType[3], ruleResultSize[3], ruleLevel[0], null);
	rules.createNewRule(rule5, ruleType[4], ruleResultSize[4], ruleLevel[0], null);
	rules.createNewRule(rule6, ruleType[5], ruleResultSize[5], ruleLevel[0], null);
	rules.createNewRule(rule7, ruleType[6], ruleResultSize[6], ruleLevel[0], null);
	rules.createNewRule(rule8, ruleType[7], ruleResultSize[7], ruleLevel[0], null);
	rules.createNewRule(rule9, ruleType[8], ruleResultSize[8], ruleLevel[0], null);
	rules.createNewRule(rule10, ruleType[9], ruleResultSize[9], ruleLevel[0], null);
	rules.createNewRule(rule11, ruleType[10], ruleResultSize[10], ruleLevel[0], null);
	rules.createNewRule(rule12, ruleType[11], ruleResultSize[11], ruleLevel[0], null);
	rules.createNewRule(rule13, ruleType[12], ruleResultSize[12], ruleLevel[0], null);
	rules.createNewRule(rule14, ruleType[13], ruleResultSize[13], ruleLevel[0], null);
	rules.createNewRule(rule15, ruleType[14], ruleResultSize[14], ruleLevel[0], null);
	rules.createNewRule(rule16, ruleType[15], ruleResultSize[15], ruleLevel[0], null);
	
	//LEVEL2
	rules.createNewRule(rule17, ruleType[16], ruleResultSize[16], ruleLevel[1], null);
	rules.createNewRule(rule18, ruleType[17], ruleResultSize[17], ruleLevel[1], null);
	rules.createNewRule(rule19, ruleType[18], ruleResultSize[18], ruleLevel[1], null);
	rules.createNewRule(rule20, ruleType[19], ruleResultSize[19], ruleLevel[1], null);
	
	//LEVEL3
	rules.createNewRule(rule21, ruleType[20], ruleResultSize[20], ruleLevel[2], rule21_path);
	*/
	return rules;
}

function Mapping(Rules, level, MappingPatterns) {
	var MP, MP_size;							//Mapping Pattern, Mapping pattern size
	var RP, RP_size;							//Rule Pattern, Rule Pattern size
	var MPs_length = MappingPatterns.length;	//Total of MappingPatterns
	var RPs_length = Rules.getLength();			//Total of rules
	var result = [];
	
	for( var i=0; i<MPs_length; i++ ) {
		MP = MappingPatterns[i];
		MP_size = MappingPatterns[i].length;		//May occur error or wrong value
		//console.log("MP_size: " + MP_size);
		
		for( var j=0; j<RPs_length; j++ ) {
			var r_level = Rules.getLevel(j);

			RP = Rules.getRulePattern(j);
			RP_size = RP.length;
			
			if( MP_size == RP_size ) {
				if( !(r_level == level) ) {
					console.log("Level not match :" + j);				//Interrupt if rule level not equal to current level.
				}
				else {
					var res = ComparePatterns( MP, RP, MP_size, level );	//false or count of 2 of RP.
					R_id = Rules.getRuleId(j);
					
					if(!res) {
						//console.log( "Mapping: Rule" + R_id + " fail" );
					}
					else {
						result.push( R_id );
						//console.log( "Mapping: Rule" + R_id + " success" );
					}
				}
			}	
		}
	}
	
	return result;		//id of Rule which mapping successed.
}

function ComparePatterns(mp, rp, size, level) {
	switch(level) {
		case 1:
			return CompareMethod_L1( mp, rp, size );
		case 2:
			return CompareMethod_L2( mp, rp, size );
		case 3:
			return CompareMethod_L2( mp, rp, size );		//Same as level 2
		default:
			console.log("Error: Level dose not exist in current design.")
	}
}

function CompareMethod_L1(mp, rp, size) {
	for(var i=0; i<size; i++) {
		if( mp[i] == rp[i] ) {
			
			if( (i == (size-1)) )
				return true;
			//else
				//Do next
		}
		else {
			if( mp[i] == 0 && rp[i] == 1 ) {
				return false;
			}
			else if( mp[i] == 1 && rp[i] == 0 ) {
				return false;
			}
			else if( mp[i] == 1 && rp[i] == 2 ) {
				return false;
			}
			else {
				if( (i == (size-1)) )
					return true;
				//else
					//Do next
			}
		}
	}
}

function CompareMethod_L2(mp, rp, size) {
	for(var i=0; i<size; i++) {
		if( mp[i] == rp[i] ) {						//TypeID matched
			
			if( (i == (size-1)) )
				return true;
			//else
				//Do next
		}
		else {
			if( mp[i] < 0 && rp[i] != 'N') {
				return false;
			}
			else if( mp[i] >= 0 && rp[i] != 'N' ) {
				return false;
			}
			else {
				if( (i == (size-1)) )
					return true;
				//else
					//Do next
			}
		}
	}
}

function BuildMappingPatterns(Rules, BUObj, level, Footprint) {
	var max_size = Rules.getMaxSize();
	var curr_size = 3;					//From 1 to max_size
	var patterns = [];					//[{3x3}, {5x5}, {7x7}, ...]
	
	//Walk BUObj's neighbors in LayoutMap. Until all size done.
	for(var c=curr_size; c<=max_size; c+=2) {
		var pattern = Layout_Walker(BUObj, c, level, Footprint);
		if(!pattern) {
			if(!patterns.length)
				return false;
			else
				return patterns;
		}
		else {
			patterns.push( pattern );
		}
	}
	
	return patterns;
}

function Layout_Walker(center, size, level, footprint) {
	var walker = center;				//Center of 3x3, 5x5, ...etc.
	var result = [];					//Result of walk through routine
	var dir_control = 0;				//Direction controller, 0=left, 1=top, 2=right, 3=bottom
	var footstage = 0;
	var WT_history = [];				//Walking through history.
	
	if( level ==1 )
		result.push(walker.isFilled);	//Center unit info.
	else
		result.push(walker.typeID);
		
	WT_history.push(walker);
	
	//Spiral routine
	for( var i=0; i<size; footstage++ ) {
		for( var j=0; j<=i; j++ ) {
			//Direction
			switch(dir_control) {
				case 0:	
					if(!walker) {
						return false;					//break if encounter null
					}
					else {
						walker = walker.getLeft();
						WT_history.push(walker);
						break;
					}
				case 1:	
					if(!walker) {
						return false;
					}
					else {
						walker = walker.getTop();
						WT_history.push(walker);
						break;
					}
				case 2:
					if(!walker) {
						return false;
					}
					else {
						walker = walker.getRight();
						WT_history.push(walker);
						break;
					}
				case 3:
					if(!walker) {
						return false;
					}
					else {
						walker = walker.getBottom();
						WT_history.push(walker);
						break;
					}
				default:
					;//console.log("Error: The direction of walker is wrong.");
			}
			
			if( j==(size-1) ) {
				footstage = 1;						//Abandon last result and kill walker.
				//console.log("Result pattern complete(size: " + size + ")");
				//console.log(result);
			}
			else {
				if( level == 1 ) {
					//Get current value. Stage 1 check filled or not.
					if(!walker)
						result.push(0);					//null equal to 0.
					else
						result.push(walker.isFilled);
				}
				else if( level == 2 ) {
					if(!walker) {
						result.push(-1);					//why zero before??
					}	
					else {
						if(!walker.isFilled) {
							result.push(-1);				//-1 = unfilled
						}
						else {
							result.push(walker.typeID);		//Get typeID value
						}
					}
				}
				else if( level == 3 ) {
					if(!walker) {
						result.push(-1);	
					}
					else {
						if(!walker.isGrouped) {
							result.push(-1);
						}
						else {
							result.push(walker.typeID);		//Get typeID value
						}
					}
				}
 			}
		}
		
		//Direction controller
		dir_control++;
		if(dir_control > 3)
			dir_control = 0;
				
		//Footstage controller
		if( !(footstage%2) )
			footstage = 0;
		else
			i++;
	}

	footprint.push( WT_history );
	
	return result;
}

/***********************************
		New Rule Function
***********************************/
function MapToPattern() {
	var map = [];
	d3.select("#toolsvg").select("#rect")
						.selectAll("rect")
						.each( function(d, i) {
								var temp = d3.select(this);
								for(var i=0; i<temp.length; i++) {
									var val = temp.attr("value");
									if( val == 'N') {
										map.push(val);
									}
									else {
										map.push(parseInt(val));
									}
								}
								//console.log(temp);
							});

	return map;
}

function CalculateNewRuleTypeID(rules) {
	return (rules.getMaxTypeID() + 1);
}

function CalculateNewRuleSize_L2() {
	var RectCoors = [];
	d3.select("#toolsvg").select("#rect")
						.selectAll("rect")
						.each( function(d, i) {
								var coor = {};
								var temp = d3.select(this);
								
								var val = temp.attr("value");
								if( val == 'N') {
									;//Do nothing;
								}
								else {
									var coor_x = parseInt(temp.attr("x"));
									var coor_y = parseInt(temp.attr("y"));
									coor.x = coor_x;
									coor.y = coor_y;
									RectCoors.push(coor);
								}
								console.log(temp);
							});
							
	var resultsize = FindNewRuleResultAxis_L2(RectCoors);
	
	return resultsize;
}

function FindNewRuleResultAxis_L2(r_coors) {
	var x_min = 9999, x_max = 0, y_min = 9999, y_max = 0;
	var width, height;
	var unitsOfx, unitsOfy;
	
	//Find two points  (x_min, y_min) and (x_max, y_max)
	for(var i=0; i<r_coors.length; i++) {
		if( r_coors[i].y < y_min)
			y_min = r_coors[i].y;
		if( r_coors[i].y > y_max )
			y_max = r_coors[i].y;
		if( r_coors[i].x < x_min )
			x_min = r_coors[i].x;
		if( r_coors[i].x > x_max )
			x_max = r_coors[i].x;
	}
	
	var offset_x = x_max - x_min;
	var offset_y = y_max - y_min;
	//40 is basic rect size in toolsvg
	if( offset_x >= 40 || offset_y >= 40) {
		unitsOfx = 1 + offset_x / 40;		// a---*---b---  , so start from 1
		unitsOfy = 1 + offset_y / 40;
		
		if( r_coors.length !=  unitsOfx*unitsOfy ) {
			console.log("Pattern Shape does not match limitation of level 2. It must be completely vertical or horizontal.");
			return false;
		}
	}
	else {
		return false;
	}
	
	
	//100 is basic BUObj size in stage
	width = unitsOfx * 100;
	height = unitsOfy * 100;
	
	
		
	console.log(width, height);
	
	return {width: width, height: height};
}

function CalculateNewRuleSize_L3() {
	
}

/****************************************
			Check Function
****************************************/
function CheckIllegal_L1(target) {
	for(var i=0; i<target.length; i++) {
		if(target[i] == 2)
			return true;
	}
	return false;
}