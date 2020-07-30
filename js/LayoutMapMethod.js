/*********************************************************
LayoutMap[][]:	
			BUobj, BUobj, BUobj, ...
			BUobj, BUobj, BUobj, ...
			BUobj, BUobj, BUobj, ...
			  .		 .		.
			  .		 .		.
			  .		 .		.
*********************************************************/
/*
function LayoutMap_init() {
	this.LayoutMap = [];
	
	//Load test case directly for test.
	var width = 9;
	var height = 7;
	
	for( var i=0; i<height; i++ ) {
		console.log("Start initializing Layout Map.");
		LayoutMap[i] = [];
		for( var j=0; j<width; j++ ) {
			LayoutMap[i][j] = new BaseUnitObject( LayoutMapCase[i*width+j].isFilled, LayoutMapCase[i*width+j].edge, LayoutMapCase[i*width+j].x, LayoutMapCase[i*width+j].y, LayoutMapCase[i*width+j].typeID, LayoutMapCase[i*width+j].isGrouped );
		}
		//console.log("A line of BUObj be added to Layout Map.");
	}
	console.log("Layout map initialization complete.");
	
	return LayoutMap;
}*/

function LayoutMap_init(w, h) {
	this.LayoutMap = [];
	
	//Load test case directly for test.
	var width = w, height = h;
	var original = {}, xy_offset = 100;
	original.x = 100;
	original.y = 100;
	
	var x = original.x, y = original.y;
	var svgWidth = 1170, svgHeight = 940;		//For resize SVG
	
	if(!SideCorridor_sw) {
		for( var i=0; i<height; i++ ) {
			console.log("Start initializing Layout Map.");
			LayoutMap[i] = [];
			
			for( var j=0; j<width; j++ ) {
				LayoutMap[i][j] = new BaseUnitObject( 0, false, x, y, null, null );
				
				x += xy_offset;
				
				if(x > svgWidth) {
					svgWidth += xy_offset;
					svgContainer.attr("width", svgWidth);
				}
			}
			
			x = original.x;
			y += xy_offset;
			
			if(y > svgHeight) {
				svgHeight += xy_offset;
				svgContainer.attr("height", svgHeight);
			}
			//console.log("A line of BUObj be added to Layout Map.");
		}
		DrawLayoutMapHints(LayoutMap, xy_offset);
	}
	else {
		var sub_xy_offset = 50;
		
		for( var i=0; i<height; i++ ) {
			console.log("Start initializing Layout Map.");
			LayoutMap[i] = [];
			
			for( var j=0; j<width; j++ ) {
				LayoutMap[i][j] = new BaseUnitObject( 0, false, x, y, null, null );
				
				if( j==0 || j==width-1 ) 
					x += sub_xy_offset;
				else 
					x += xy_offset;
					
				if(x > svgWidth) {
					svgWidth += xy_offset;
					svgContainer.attr("width", svgWidth);
				}
			}
			
			x = original.x;
			
			if( i==0 || i==height-1)
				y += sub_xy_offset;
			else
				y += xy_offset;
			
			if(y > svgHeight) {
				svgHeight += xy_offset;
				svgContainer.attr("height", svgHeight);
			}
			//console.log("A line of BUObj be added to Layout Map.");
		}
		DrawLayoutMapHints(LayoutMap, sub_xy_offset);
	}
	
	console.log("Layout map initialization complete.");
	
	return LayoutMap;
}

//LayoutMap dash line in the background
function DrawLayoutMapHints(layoutmap, offset) {
	var dashline_coors = [];
	var width = layoutmap[0].length;
	var height = layoutmap.length;
	
	if(!SideCorridor_sw) {
		//Horizontal
		for(var i=0; i<height-1; i++) {
			if(i==height-2) {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y + offset;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y + offset;
				dashline_coors.push(dashline_coor);
			}
			else {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y;
				dashline_coors.push(dashline_coor);
			}
		}
		
		//Vertical
		for(var j=0; j<width; j++) {
			var dashline_coor = {};
			dashline_coor.x = layoutmap[0][j].x;
			dashline_coor.y = layoutmap[0][j].y;
			dashline_coors.push(dashline_coor);
			
			var dashline_coor = {};
			dashline_coor.x = layoutmap[height-1][j].x;
			dashline_coor.y = layoutmap[height-1][j].y;
			dashline_coors.push(dashline_coor);
			
			if(j==width-1) {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[0][j].x + offset;
				dashline_coor.y = layoutmap[0][j].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[height-1][j].x + offset;
				dashline_coor.y = layoutmap[height-1][j].y;
				dashline_coors.push(dashline_coor);
			}
		}
	}
	else {
		//Horizontal
		for(var i=0; i<height-1; i++) {
			if(i==height-2) {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y + offset;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y + offset;
				dashline_coors.push(dashline_coor);
			}
			else {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][0].x;
				dashline_coor.y = layoutmap[i][0].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[i][width-1].x + offset;
				dashline_coor.y = layoutmap[i][width-1].y;
				dashline_coors.push(dashline_coor);
			}
		}
		
		//Vertical
		for(var j=0; j<width; j++) {
			var dashline_coor = {};
			dashline_coor.x = layoutmap[0][j].x;
			dashline_coor.y = layoutmap[0][j].y;
			dashline_coors.push(dashline_coor);
			
			var dashline_coor = {};
			dashline_coor.x = layoutmap[height-1][j].x;
			dashline_coor.y = layoutmap[height-1][j].y - offset;
			dashline_coors.push(dashline_coor);
			
			if(j==width-1) {
				var dashline_coor = {};
				dashline_coor.x = layoutmap[0][j].x + offset;
				dashline_coor.y = layoutmap[0][j].y;
				dashline_coors.push(dashline_coor);
				
				var dashline_coor = {};
				dashline_coor.x = layoutmap[height-1][j].x + offset;
				dashline_coor.y = layoutmap[height-1][j].y - offset;
				dashline_coors.push(dashline_coor);
			}
		}
	}
	
	
	var DashlineCmd = new DashLineCommand(svgContainer, dashline_coors);
	DashlineCmd.execute();
}
/*********************************************************
					4-Connected
*********************************************************/
//4-Neighbors relation builder
function Build_4_Connected(LayoutMap) {

	for( var i=0; i<LayoutMap.length; i++ ) {
		for( var j=0; j<LayoutMap[0].length; j++ ) {
			LayoutMap[i][j].setLeft( FindLeftNeighbor(LayoutMap, i, j) );
			LayoutMap[i][j].setTop( FindTopNeighbor(LayoutMap, i, j) );
			LayoutMap[i][j].setRight( FindRightNeighbor(LayoutMap, i, j) );
			LayoutMap[i][j].setBottom( FindBottomNeighbor(LayoutMap, i, j) );
		}
	}
}

//LayoutMap[x][y]
function FindLeftNeighbor(LayoutMap, x, y) {
	if(y==0)
		return null;
	else
		return LayoutMap[x][y-1];
}

function FindTopNeighbor(LayoutMap, x, y) {
	if(x==0)
		return null;
	else
		return LayoutMap[x-1][y];
}

function FindRightNeighbor(LayoutMap, x, y) {
	if(y==LayoutMap[0].length - 1)
		return null;
	else
		return LayoutMap[x][y+1];
}

function FindBottomNeighbor(LayoutMap, x, y) {
	if(x==LayoutMap.length - 1)
		return null;
	else
		return LayoutMap[x+1][y];
}

/*********************************************************
						Analysis
*********************************************************/
function AnalyzeLayoutMap(rules, center, curr_level, footprint) {
	var Walker_result =  BuildMappingPatterns(rules, center, curr_level, footprint);
	
	return Walker_result;
}

function DrawHints(rules, ids, level, footprint) {
	var ft_length = footprint.length;
	var ft_list = footprint[ft_length - 1];		//Get last one. 3x3 or 5x5 are the same format with different size.
	
	for(var i=0; i<ids.length; i++) {
		var BUObj_list = [];
		var rule_id = ids[i];							//rule: id
		var type_id = rules.getTypeId(rule_id);			//rule: type id
		var color_v = rules.getColor(rule_id);			//rule: color
		var Result_size = rules.getResultSize(rule_id);	//rule: width, height
		var Result_path = rules.getPath(rule_id);
		var steps = rules.getSteps(rule_id);			//rule: step of draw
		steps = steps[0];								//[[1, 2, 3], [4, 5, 6], ...etc.] --> [1, 2, 3, ...etc.]
		
		for(var j=0; j<steps.length; j++) {
			var step = steps[j];
			var BUObj = ft_list[step];
			BUObj_list.push(BUObj);
		}
		var ResultObj = new ResultDataObject();
		ResultObj.width = Result_size.width;
		ResultObj.height = Result_size.height;
		ResultObj.path = Result_path;
		ResultObj.typeid = type_id;
		
		var PreviewObj = new PreviewDataObject();
		var str = "Rule" + (rule_id+1);
		PreviewObj.ruleId = rule_id;
		PreviewObj.message = str;
		PreviewObj.color = color_v;
		
		//console.log("Color code: " + color_v);

		var PreviewCmd = new PreviewCommand(svgContainer, id, BUObj_list, PreviewObj, ResultObj, level);
		PreviewCmd.execute();
		PreviewCmd = undefined;
		
		id++;
	}
}

/*
function FindBaseUnit(LayoutMap, x, y) {
	var pos = {};		//Position in LayoutMap array.
	
	//console.log(LayoutMap.length);
	
	for( var i=0; i<LayoutMap.length; i++ ) {
		if(LayoutMap[i][0].y == y) {
			pos.row = i;
			for( var j=0; j<LayoutMap[0].length; j++ ) {
				if(LayoutMap[0][j].x == x) {
					pos.col = j;
					return pos;
				}
			}
		}
	}
	return false;
}*/

/**********************************************************
TypeID:
		0 = ¢p	<-- Main
		1 = ¢p	<-- Sub
		2 = ¢d
		3 = ¢m
		4 = ¡½
		
		5 = ¢p
			¢p
			
		6 = ¢p¢p¢p¢p¢p  <-- Merge
		
		7 = ¢p¢p¢p¢p¢p
			¢p¢p¢p¢p¢p
***********************************************************/