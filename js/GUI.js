/*****************************************************
/	GUI functions
*****************************************************/

function New() {
	
}
/*****************************************************
					Message Function
*****************************************************/
function UpdateMessage(Src, className, text, color, x_offset, y_offset) {
	var D3Obj = d3.select("[class=" + className + "]");
	
	if( !D3Obj[0][0] ) {
		var text = Src.select("#text")
					.append("text")
					.attr("class", className)
					.attr("x", x_offset)
					.attr("y", y_offset)
					.attr("font-family", "sans-serif")
					.attr("font-size", "20")
					.attr("fill", color)
					.text(text);
	}
	else {
		D3Obj.text(text);
	}
}	

function setNewRuleLevel(param) {
	setNewRuleObjLevel(param);
}

/*****************************************************
				Add New Rule Function
*****************************************************/
function drawNewRuleMap(size) {
	var level = NewRuleObj.getLevel();

	if(!level) {
		console.log("Can not recognize new rule level.");
		return;
	}
	else {
		switch(size) {
			case 3:
				NewRuleMap_init(3, level);
				break;
			case 5:
				NewRuleMap_init(5, level);
				break;
			case 7:
				NewRuleMap_init(7, level);
				break;
		}
	}
	//console.log(NewRuleMap[5].attr("value"));
}

function NewRuleMap_init(size, level) {
	var MapSize = size * size;
	var MapCoors = [];
	var TextID = 0;
	
	var rule_x_offset = 240, rule_y_offset = 150;
	var rectOffset = 40;
	
	//Create size^2 map
	for(var i=0; i<MapSize; i++) {
		MapCoors[i] = 0;
	}
	MapCoors = CalculateMapCoors(MapCoors, rule_x_offset, rule_y_offset, rectOffset);
	
	for(var k=0; k<MapSize; k++) {
		switch(level) {
			case 1:
				var rect = ToolSVG.select("#rect")
					.append("rect")
					.attr("class", "NewRule")
					.attr("TextID", TextID)
					.attr("x", MapCoors[k].x)
					.attr("y", MapCoors[k].y)
					.attr("width", rectOffset)
					.attr("height", rectOffset)
					.attr("fill", "white")
					.attr("stroke", "black")
					.attr("stroke-width", 1)
					.attr("value", 0)
					.on("click", function(d) {
									ClearPatternEditorMessage();
									var rectElement = d3.select(this);
									var textid = parseInt(rectElement.attr("TextID"));
									var coor_x = 10 + parseInt(rectElement.attr("x"));
									var coor_y = 20 + parseInt(rectElement.attr("y"));
									
									var value = rectElement.attr("value");
									
									if(value == 0) {
										value++;
										d3.select(this).attr("value", value)
													.attr("fill", "#AAAAAA");
									}
									else if(value == 1) {
										value++;
										value = 0 + value%30;
										d3.select(this).attr("value", value)
													.attr("fill", "cyan");
									}
									else if(value == 2) {
										value++;
										value = 0 + value%30;
										d3.select(this).attr("value", value)
													.attr("fill", "#DDDDDD");
									}
									else if(value == 3) {
										value = 0;
										d3.select(this).attr("value", value)
													.attr("fill", "white");
									}
									
									//console.log(value);
									d3.selectAll("[textid='" + textid + "']").remove();
									
									var text = ToolSVG.select("#text")
													.append("text")
													.attr("class", "NewRule")
													.attr("textid", textid)
													.attr("x", coor_x)
													.attr("y", coor_y)
													.attr("font-family", "sans-serif")
													.attr("font-size", "12")
													.attr("fill", "black")
													.text(value);
								});
				TextID++;
				break;
			case 2:
				var rect = ToolSVG.select("#rect")
					.append("rect")
					.attr("class", "NewRule")
					.attr("TextID", TextID)
					.attr("x", MapCoors[k].x)
					.attr("y", MapCoors[k].y)
					.attr("width", rectOffset)
					.attr("height", rectOffset)
					.attr("fill", "#DDDDDD")
					.attr("stroke", "black")
					.attr("stroke-width", 1)
					.attr("value", 'N')
					.on("click", function(d) { 
									ClearPatternEditorMessage();
									var rectElement = d3.select(this);
									var textid = parseInt(rectElement.attr("TextID"));
									var coor_x = 10 + parseInt(rectElement.attr("x"));
									var coor_y = 20 + parseInt(rectElement.attr("y"));
									
									var value = rectElement.attr("value");
									
									if( value == 'N') {	
										//'N' --> 0
										value = 0;
										d3.select(this).attr("value", value)
													.attr("fill", "cyan");
									}
									else {
										//1 --> maxTypeID
										value++;
										value = 0 + value%30;
										var maxTypeID = Rules.getMaxTypeID();
										
										if(value > maxTypeID) {
											value = 'N';
											d3.select(this).attr("value", value)
														.attr("fill", "#DDDDDD");
										}
										else {
											d3.select(this).attr("value", value)
														.attr("fill", "cyan");
										}
									}
									//console.log(value);
									d3.selectAll("[textid='" + textid + "']").remove();
									
									var text = ToolSVG.select("#text")
													.append("text")
													.attr("class", "NewRule")
													.attr("textid", textid)
													.attr("x", coor_x)
													.attr("y", coor_y)
													.attr("font-family", "sans-serif")
													.attr("font-size", "12")
													.attr("fill", "black")
													.text(value);
								});
				TextID++;
				break;
			case 3:
				var rect = ToolSVG.select("#rect")
					.append("rect")
					.attr("class", "NewRule")
					.attr("TextID", TextID)
					.attr("x", MapCoors[k].x)
					.attr("y", MapCoors[k].y)
					.attr("width", rectOffset)
					.attr("height", rectOffset)
					.attr("fill", "#DDDDDD")
					.attr("stroke", "black")
					.attr("stroke-width", 1)
					.attr("value", 'N')
					.on("click", function(d) {  
									ClearPatternEditorMessage();
									var rectElement = d3.select(this);
									var textid = parseInt(rectElement.attr("TextID"));
									var coor_x = 10 + parseInt(rectElement.attr("x"));
									var coor_y = 20 + parseInt(rectElement.attr("y"));
									
									var value = rectElement.attr("value");
									
									if( value == 'N') {	
										//'N' --> 0
										value = 0;
										d3.select(this).attr("value", value)
													.attr("fill", "cyan");
									}
									else {
										//1 --> maxTypeID
										value++;
										value = 0 + value%30;
										var maxTypeID = Rules.getMaxTypeID();
										
										if(value > maxTypeID) {
											value = 'N';
											d3.select(this).attr("value", value)
														.attr("fill", "#DDDDDD");
										}
										else {
											d3.select(this).attr("value", value)
														.attr("fill", "cyan");
										}
									}
									//console.log(value);
									d3.selectAll("[textid='" + textid + "']").remove();
									
									var text = ToolSVG.select("#text")
													.append("text")
													.attr("class", "NewRule")
													.attr("textid", textid)
													.attr("x", coor_x)
													.attr("y", coor_y)
													.attr("font-family", "sans-serif")
													.attr("font-size", "12")
													.attr("fill", "black")
													.text(value);
								});
				TextID++;
				break;
			default:
				console.log("Error: Rule level does not match any case.");
		}//end switch
		//console.log(NewRuleMap[k].attr("value"));
	}//end for
}

//For Level 3
function LoadNewRuleMapInfo() {
	var map = [];
	d3.select("#toolsvg").select("#rect")
						.selectAll("rect")
						.each( function(d, i) {
								var temp = d3.select(this);
								for(var i=0; i<temp.length; i++) {
									var val = temp.attr("value");
									
									var info = {};
									info.x = parseInt(temp.attr("x"));
									info.y = parseInt(temp.attr("y"));
									
									if( val == 'N') {
										info.weight = 0;
									}
									else {
										info.weight = 1;
									}
									
									map.push(info);
								}
								//console.log(info);
							});
	//console.dir(temp);
	return map;
}

//For Level 3
function BuildNewRuleMap(MapInfo, MapIndex) {
	var Map = [];
	var MapSize = Math.sqrt(MapInfo.length);
	
	//Map initialization
	for(var i=0; i<MapSize; i++) {
		Map[i] = [];
		for(var j=0; j<MapSize; j++) {
			Map[i][j] = 0;
		}
	}
	
	for(var i=0; i<MapInfo.length; i++) {
		var TPAObj = new TPAObject();
		TPAObj.x = MapInfo[i].x;
		TPAObj.y = MapInfo[i].y;
		TPAObj.setIsBlack(MapInfo[i].weight);
		Map[MapIndex[i].x][MapIndex[i].y] = TPAObj;
	}
	
	//console.dir(Map);
	return Map;
}

function ExtendNewRuleMap(Map) {
	var ExtendMap = Map;
	var ExtendMapLength = ExtendMap.length;
	var xy_offset = ExtendMap[0][1].x - ExtendMap[0][0].x;
	
	//Add column at right
	ExtendMap[0][ExtendMapLength] = [];
	
	for(var i=0; i<ExtendMapLength; i++) {
		var TPAObj = new TPAObject();
		TPAObj.x = ExtendMap[i][ExtendMapLength-1].x + xy_offset;
		TPAObj.y = ExtendMap[i][ExtendMapLength-1].y;
		TPAObj.setIsBlack(ExtendMap[i][ExtendMapLength-1].getIsBlack());
		
		ExtendMap[i][ExtendMapLength] = TPAObj;
	}
	
	//Add row at bottom
	ExtendMap[ExtendMapLength] = [];
	
	for(var i=0; i<=ExtendMapLength; i++) {
		var TPAObj = new TPAObject();
		
		if(i == ExtendMapLength) {
			TPAObj.x = ExtendMap[i-1][i-1].x + xy_offset;
			TPAObj.y = ExtendMap[i-1][i-1].y + xy_offset;
			TPAObj.setIsBlack(ExtendMap[i-1][i-1].getIsBlack());
		}
		else {
			TPAObj.x = ExtendMap[ExtendMapLength-1][i].x;
			TPAObj.y = ExtendMap[ExtendMapLength-1][i].y + xy_offset;
			TPAObj.setIsBlack(ExtendMap[ExtendMapLength-1][i].getIsBlack());
		}
		ExtendMap[ExtendMapLength][i] = TPAObj;
	}
	
	return ExtendMap;
}
/*****************************************************
					Reviewer Function
*****************************************************/
function ReviewRule(ruleid, preid) {
	var rectOffset = 40;
	var rule_x_offset = 240, rule_y_offset = 150;
	
	var id = ruleid;
	var RuleLevel = Rules.getLevel(ruleid);
	var RulePattern = Rules.getRulePattern(ruleid);
	var RulePattSize = Math.sqrt(RulePattern.length);
	
	console.log("RuleID:" + id + ", " + RulePattern);
	
	var CoorsInfo = CalculateMapCoors(RulePattern, rule_x_offset, rule_y_offset, rectOffset);
	
	ConcealOtherPreview(preid);
	drawRuleReview(RulePattern, CoorsInfo, RuleLevel);
}

function drawRuleReview(rule_patt, coors, level) {
	ClearReview();
	var RectColor = "#AAAAAA";		//default
	
	for(var i=0; i<rule_patt.length; i++) {
		var content = rule_patt[i];
		
		console.log(content);
		
		switch(level) {
			case 1:
				var ToF = RuleReview_L1(content);
				if(content == 2)
					RectColor =	"cyan";
				//else if(content == 3)
					//RectColor =	"yellow";
				else
					RectColor =	"#AAAAAA";
				break;
			case 2:
				var ToF = RuleReview_L2(content);
				RectColor =	"cyan";
				break;
			case 3:
				var ToF = RuleReview_L3(content);
				RectColor =	"cyan";
				break;
			default:
				;
		}
		
		if(!ToF) {
			;	//Do nothing;
		}
		else {
			var SupRectCmd = new SupportRectCommand(SupportSVG, "review", coors[i], RectColor);
			SupRectCmd.execute();
			SupRectCmd = undefined;
		}
		ToF = undefined;
	}
}

function RuleReview_L1(param) {
	if( !param || param == 3) {
		return false;
	}
	
	return true;
}

function RuleReview_L2(param) {
	if( param == 'N' ) {
		return false;
	}
	
	return true;
}

function RuleReview_L3(param) {
	if( param == 'N' ) {
		return false;
	}
	
	return true;
}

/*****************************************************
				Clear/Delete Function
*****************************************************/
function ClearNewRule() {
	d3.selectAll("[class='NewRule']").remove();
}

function ClearReview() {
	d3.selectAll("[class='review']").remove(); 
}

function ClearPreview() {
	d3.selectAll("[class='preview']").remove();
}

function ClearRuleExplorer() {
	d3.selectAll("[class='RuleExplorer']").remove();
}

function ClearPatternEditorMessage() {
	d3.selectAll("[class='PatternEditorMessage']").remove();
}

function DeleteStageSVG() {
	var stageSVG = d3.select("#stage").select("svg").remove();
}

/*****************************************************
				Stage Preview Function
*****************************************************/
function RevealOtherPreview(p_id) {
	ClearReview();
	var tempB = d3.select("#stage").selectAll("[class='preview']")
						.each( function() {
								var D3Obj = d3.select(this);
								var D3ObjID = parseInt(D3Obj.attr("id"));
								if( D3ObjID != p_id )
									D3Obj.style("opacity", 1);
								else
									D3Obj.attr("stroke-width", 1);
							});
}

function ConcealOtherPreview(p_id) {
	//var tempA = d3.select("#stage").selectAll("[class='preview']").style("opacity", 0);
	//d3.select("rect:not([preID='" + p_id + "'])").style("opacity", 0);
	
	//D3.js not support multi selectAll action.
	d3.select("#stage").selectAll("[class='preview']")
						.each( function() {
								var D3Obj = d3.select(this);
								var D3ObjID = parseInt(D3Obj.attr("id"));
								if( D3ObjID != p_id )
									D3Obj.style("opacity", 0.2);
								else
									D3Obj.attr("stroke-width", 5);
							});
}

/*****************************************************
			Spiral Coordinates Function
*****************************************************/
function CalculateMapCoors(RulePattern, start_x, start_y, xy_offset) {
	var dir_ctrl = 0;
	var count_ctrl = 0;
	var PatterSize = Math.sqrt(RulePattern.length);
	
	var coor = {}, coor_x, coor_y;
	var patt_coors = [];
	var offset = xy_offset;			//

	coor_x = start_x;				//Relative Position in the future
	coor_y = start_y;
	
	coor.x = coor_x;
	coor.y = coor_y;
	
	patt_coors.push(coor);
	
	for(var i=0; i<PatterSize; count_ctrl++) {
		for(var j=0; j<=i; j++) {
			//Direction
			var coor_temp = {};
			
			if( j==(PatterSize-1) ) {
				count_ctrl = 1;				//Abandon last result and kill walker.
			}
			else {
				switch(dir_ctrl) {
					case 0:
						coor_x -= offset;
						coor_temp.x = coor_x;
						coor_temp.y = coor_y;
						patt_coors.push(coor_temp);
						break;
					case 1:	
						coor_y -= offset;
						coor_temp.x = coor_x;
						coor_temp.y = coor_y;
						patt_coors.push(coor_temp);
						break;
					case 2:
						coor_x += offset;
						coor_temp.x = coor_x;
						coor_temp.y = coor_y;
						patt_coors.push(coor_temp);
						break;
					case 3:
						coor_y += offset;
						coor_temp.x = coor_x;
						coor_temp.y = coor_y;
						patt_coors.push(coor_temp);
						break;
					default:
						;//console.log("Error: The direction of walker is wrong.");
				}//end switch(dir_ctrl)
			}
		}//end for(j)
		
		//Direction controller
		dir_ctrl++;
		if(dir_ctrl > 3)
			dir_ctrl = 0;
				
		//Count controller
		if( !(count_ctrl%2) )
			count_ctrl = 0;
		else
			i++;
		
	}//end for(i)
	
	return patt_coors;
}

function CalculateMapIndex(MapInfo) {
	var dir_ctrl = 0;
	var count_ctrl = 0;
	var MapSize = Math.sqrt(MapInfo.length);
	var init_index = Math.floor(MapSize/2);			//3x3: [1][1], 5x5:[2][2], 7x7:[3][3] ...
	var x_index = init_index, y_index = init_index;
	var MapIndex = [];
	
	//Center index
	var index = {};
	index.x = x_index;
	index.y = y_index;
	MapIndex.push(index);
	
	for(var i=0; i<MapSize; count_ctrl++) {
		for(var j=0; j<=i; j++) {
			//Direction
			if( j==(MapSize-1) ) {
				count_ctrl = 1;				//Abandon last result and kill walker.
			}
			else {
				var index = {};
				
				switch(dir_ctrl) {
					case 0:
						y_index--;
						break;
					case 1:	
						x_index--;
						break;
					case 2:
						y_index++;
						break;
					case 3:
						x_index++;
						break;
					default:
						;//console.log("Error: The direction of walker is wrong.");
				}//end switch(dir_ctrl)
				index.x = x_index;
				index.y = y_index;
				MapIndex.push(index);
			}
		}//end for(j)
		
		//Direction controller
		dir_ctrl++;
		if(dir_ctrl > 3)
			dir_ctrl = 0;
				
		//Count controller
		if( !(count_ctrl%2) )
			count_ctrl = 0;
		else
			i++;
		
	}//end for(i)
	
	//console.dir(MapIndex);
	return MapIndex;
}

function ClaculateL3Path(points, buobj_size, xy_offset) {
	var point_list = points;
	var first_point = point_list[0];
	var head_point = FindMergeHead(point_list);
	
	console.log("MergeHead of L3 Create: " + head_point.x, head_point.y)
	
	//Second offset value
	/*var diff_fp_hp = {};
	diff_fp_hp.x = head_point.x - first_point.x;
	diff_fp_hp.y = head_point.y - first_point.y;
	
	for(var i=0; i<point_list.length; i++) {
		point_list[i].x -= (head_point.x + diff_fp_hp.x);
		point_list[i].y -= (head_point.y + diff_fp_hp.y);
	}*/
	
	for(var i=0; i<point_list.length; i++) {
		point_list[i].x -= head_point.x;
		point_list[i].y -= head_point.y;
	}
	
	point_list = Resize(point_list, buobj_size, xy_offset);
	
	return point_list;
}

/*****************************************************
				Rule Explorer Function
*****************************************************/
function DrawRuleHints(Src) {
	var x=120, y=0;
	var text_offset = 40;
	var RectSize = 30;
	var x_offset = 200;
	
	var rect = Src.select("#rect")
				.append("rect")
				.attr("class", "RuleHints")
				.attr("x", x)
				.attr("y", y)
				.attr("width", RectSize)
				.attr("height", RectSize)
				.attr("fill", "white")
				.attr("stroke", "black")
				.attr("stroke-width", 1);
				
	var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleHints")
				.attr("x", x + text_offset)
				.attr("y", 20)
				.attr("font-family", "sans-serif")
				.attr("font-size", "18")
				.attr("fill", "black")
				.text("Unfilled");
				
	var rect = Src.select("#rect")
				.append("rect")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset)
				.attr("y", y)
				.attr("width", RectSize)
				.attr("height", RectSize)
				.attr("fill", "#AAAAAA")
				.attr("stroke", "black")
				.attr("stroke-width", 1);
				
	var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset + text_offset)
				.attr("y", 20)
				.attr("font-family", "sans-serif")
				.attr("font-size", "18")
				.attr("fill", "black")
				.text("Filled");
				
	var rect = Src.select("#rect")
				.append("rect")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*2)
				.attr("y", y)
				.attr("width", RectSize)
				.attr("height", RectSize)
				.attr("fill", "#DDDDDD")
				.attr("stroke", "black")
				.attr("stroke-width", 1);
				
	var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*2 + text_offset)
				.attr("y", 20)
				.attr("font-family", "sans-serif")
				.attr("font-size", "18")
				.attr("fill", "black")
				.text("Trivial");
	
	var rect = Src.select("#rect")
				.append("rect")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*3)
				.attr("y", y)
				.attr("width", RectSize)
				.attr("height", RectSize)
				.attr("fill", "cyan")
				.attr("stroke", "black")
				.attr("stroke-width", 1);
	
	var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*3 + text_offset)
				.attr("y", 20)
				.attr("font-family", "sans-serif")
				.attr("font-size", "18")
				.attr("fill", "black")
				.text("Will be filled");
	
	var rect = Src.select("#rect")
				.append("rect")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*4)
				.attr("y", y)
				.attr("width", RectSize)
				.attr("height", RectSize)
				.attr("fill", "cyan")
				.attr("stroke", "black")
				.attr("stroke-width", 1);
	
	var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleHints")
				.attr("x", x + x_offset*4 + 8)
				.attr("y", 20)
				.attr("font-family", "sans-serif")
				.attr("font-size", "18")
				.attr("fill", "black")
				.text("N　N=TypeID");
}

function DrawAllRulesPattern(Src, ruleObjs) {
	var rectOffset = 30;
	var rectsize = 30;
	var svgWidth = parseInt(RuleExSVG.attr("width"));
	var svgHeight = parseInt(RuleExSVG.attr("height"));
	var start_x_pos = 110, start_y_pos = 170;
	var rule_x_offset = start_x_pos, rule_y_offset = start_y_pos, divline_pos = 20;
	var space_per_rule = 285, divline_offset = 150, level_offset = 20;
	var div_linetext = "";
	
	ClearRuleExplorer();
	
	for(var j=1; j<4; j++) {
		//Draw some dividing line?
		//...
		
		if(j>1) {
			if(j==2)
				div_linetext = "2A";
			else
				div_linetext = "2B";
		}
		else {
			div_linetext = "1";
		}
			
		
		var text = Src.select("#text")
				.append("text")
				.attr("class", "RuleExplorer")
				.attr("x", start_x_pos)
				.attr("y", divline_pos)
				.attr("font-family", "sans-serif")
				.attr("font-size", "28")
				.attr("fill", "black")
				.text("--------------------------------------- Pattern Rule Stage " + div_linetext + "----------------------------------------");
				
		for(var i=0; i<ruleObjs.length; i++) {
			var RuleObj = ruleObjs[i];
			var RuleLevel = RuleObj.getLevel();
			
			if(RuleLevel == j) {
				var RuleId = RuleObj.getId();
				var RuleTypeId = RuleObj.getTypeId();
				
				var RulePattern = RuleObj.getPattern();
				
				if(rule_x_offset >= svgWidth) {
					rule_x_offset = start_x_pos;
					rule_y_offset += space_per_rule;
				}
				
				//Resize RuleExSVG size
				if(rule_y_offset >= svgHeight) {
					svgHeight += space_per_rule;
					RuleExSVG.attr("height", svgHeight);
				}
				
				var CoorsInfo = CalculateMapCoors(RulePattern, rule_x_offset, rule_y_offset, rectOffset);
				
				DrawExplorerRule(Src, RuleId, RuleTypeId, RuleLevel, rectsize, RulePattern, CoorsInfo);
				
				rule_x_offset += space_per_rule;
			}
		}
		rule_x_offset = start_x_pos;
		rule_y_offset += space_per_rule + level_offset;
		divline_pos = rule_y_offset - divline_offset;
	}
}

function DrawExplorerRule(Src, ex_id, ex_typeid, ex_level, ex_size, ex_patt, coor) {
	//ClearExplorer();
	var RectColor = "white";
	var Text_x_offset = 15;
	var Text_y_offset = 120;
	
	var text_id = Src.select("#text")
					.append("text")
					.attr("class", "RuleExplorer")
					.attr("x", coor[0].x - Text_x_offset)
					.attr("y", coor[0].y - Text_y_offset)
					.attr("font-family", "sans-serif")
					.attr("font-size", "20")
					.attr("fill", "black")
					.text("Rule " + (ex_id + 1));
	
	var text_type = Src.select("#text")
					.append("text")
					.attr("class", "RuleExplorer")
					.attr("x", coor[0].x - (Text_x_offset + 20))
					.attr("y", coor[0].y - (Text_y_offset - 20))
					.attr("font-family", "sans-serif")
					.attr("font-size", "20")
					.attr("fill", "black")
					.text("(TypeID = " + ex_typeid + ")");
	
	for(var i=0; i<ex_patt.length; i++) {
		var content = ex_patt[i];
		var content_type = null;
		
		switch(ex_level) {
			case 1:
				if(content == 1)
					RectColor =	"#AAAAAA";
				else if(content == 2)
					RectColor =	"cyan";
				else if(content == 3)
					RectColor =	"#DDDDDD";
				else
					RectColor =	"white";
				break;
			case 2:
				if(content == 'N') {
					RectColor = "#DDDDDD";
				}
				else {
					RectColor =	"cyan";
					content_type = content;
				}
				break;
			case 3:
				if(content == 'N') {
					RectColor = "#DDDDDD";
				}
				else {
					RectColor =	"cyan";
					content_type = content;
				}
				break;
			default:
				;
		}
		
		var ExCmd = new ExplorerCommand(Src, ex_id, ex_level, content_type, ex_size, coor[i], RectColor);
		ExCmd.execute();
		ExCmd = undefined;
	}
}

function DrawPalaceLayout(Src) {
	var x = 0, y = 0;
	var width = 500, height = 320;
	var svgHeight = parseInt(Src.attr("height"));
	var y_offset = 320;
	
	for(var i=0; i<4; i++) {
		var imgs = Src.select("#img")
                .append("svg:image")
                .attr("xlink:href", "img/old_cp" + (i+1) + ".jpg")
                .attr("x", x)
                .attr("y", y)
                .attr("width", width)
                .attr("height", height);
		
		y += y_offset;
		
		if(y > svgHeight) {
			svgHeight += y_offset;
			Src.attr("height", svgHeight);
		}
	}
}

/*****************************************************
					Resize Function
*****************************************************/
function Resize(src, target_size, xy_offset) {
	var t_size = target_size;
	var src_list = src;
	var offset = xy_offset;
	var NewSize;
	
	for(var i=0; i<src_list.length; i++) {
		src_list[i].x = src_list[i].x / xy_offset * target_size;
		src_list[i].y = src_list[i].y / xy_offset * target_size;
	}
	
	return src_list;
}