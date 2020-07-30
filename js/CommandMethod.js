function PreviewMethod_L1(Src, id, data, result, hint, level) {
	var x_offset = 30;
	var y_offset = 30;
	var preID = id;
	
	
	for(var i=0; i<data.length; i++) {
		//Draw hint of rectangle
		var rect = Src.select("#rect")
					.append("rect")
					.attr("id", preID)
					.attr("class", "preview")
					.attr("x", data[i].x)
					.attr("y", data[i].y)
					.attr("width", result.width)
					.attr("height", result.height)
					.attr("fill", "white")
					.attr("stroke", hint.color)
					.attr("stroke-width", 1)
					.on("click", function(d){ mouseclick_L1(Src, data, result, id, level)} )
					.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); } )
					.on("mouseout", function(d) { RevealOtherPreview(preID); } );
		
		//Text overload check
		var x_pos = data[i].x;
		var y_pos = data[i].y;
		d3.select("#stage").select("#rect")
						.selectAll("[class='preview']")
						.each( function(d,i) {
								var temp_x = parseInt( d3.select(this).attr("x") );
								var temp_y = parseInt( d3.select(this).attr("y") );
								if( temp_y == y_pos && temp_x == x_pos) {
									y_offset += 15;
									console.log(y_offset);
								}
							});
		
		
		//Draw hint of rule
		var text = Src.select("#text")
					.append("text")
					.attr("id", preID)
					.attr("class", "preview")
					.attr("x", data[i].x + x_offset)
					.attr("y", data[i].y + y_offset)
					.attr("font-family", "sans-serif")
					.attr("font-size", "14")
					.attr("fill", hint.color)
					.text(hint.message)
					.on("click", function(d){ mouseclick_L1(Src, data, result, id, level)} )
					.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); } )
					.on("mouseout", function(d) { RevealOtherPreview(preID); } );
	}
}

function PreviewMethod_L2(Src, id, data, result, hint, level) {
	var x_offset = 30;
	var y_offset = 30;
	var preID = id;
	
	var MergeHead = FindMergeHead(data);
	
	var rect = Src.select("#rect")
				.append("rect")
				.attr("id", preID)
				.attr("class", "preview")
				.attr("x", MergeHead.x)
				.attr("y", MergeHead.y)
				.attr("width", result.width)
				.attr("height", result.height)
				.attr("fill", "white")
				.attr("stroke", hint.color)
				.attr("stroke-width", 5)
				.on("click", function(d){ mouseclick_L2(Src, MergeHead, data, result, id, level)} )
				.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); })
				.on("mouseout", function(d) { RevealOtherPreview(preID); } );

	//Text overload check
	var x_pos = MergeHead.x;
	var y_pos = MergeHead.y;
	d3.select("#stage").select("#rect")
					.selectAll("[class='preview']")
					.each( function(d,i) {
							var temp_x = parseInt( d3.select(this).attr("x") );
							var temp_y = parseInt( d3.select(this).attr("y") );
							if( temp_y == y_pos && temp_x == x_pos) {
								y_offset += 15;
								console.log(y_offset);
							}
						});
				
	//Draw hint of rule
	var text = Src.select("#text")
				.append("text")
				.attr("id", preID)
				.attr("class", "preview")
				.attr("x", MergeHead.x + x_offset)
				.attr("y", MergeHead.y + y_offset)
				.attr("font-family", "sans-serif")
				.attr("font-size", "14")
				.attr("fill", hint.color)
				.text(hint.message)
				.on("click", function(d){ mouseclick_L2(Src, MergeHead, data, result, id, level)} )
				.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); })
				.on("mouseout", function(d) { RevealOtherPreview(preID); } );
}

function PreviewMethod_L3(Src, id, data, result, hint, level) {
	var x_offset = 30;
	var y_offset = 30;
	var preID = id;
	
	var MergeHead = FindMergeHead(data);
	var lineData = CalculatePath(MergeHead, result);
	
	console.log("Preview L3 MergeHead: " + MergeHead.x, MergeHead.y);
	
	var lineFunction = d3.svg.line()
					.x(function(d) { return d.x; })
					.y(function(d) { return d.y; })
					.interpolate("linear");
					
	var lineGraph_t = Src.append("path")
					.attr("id", preID)
					.attr("class", "preview")
					.attr("d", lineFunction(lineData))
					.attr("stroke", "black")
					.attr("stroke-width", 5)
					.attr("fill", "white")
					.on("click", function(d){ mouseclick_L3(Src, lineData, data, result, id, level)} )
					.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); })
					.on("mouseout", function(d) { RevealOtherPreview(preID); } );
		
	//Text overload check
	var x_pos = MergeHead.x;
	var y_pos = MergeHead.y;
	d3.select("#stage").select("#rect")
					.selectAll("[class='preview']")
					.each( function(d,i) {
							var temp_x = parseInt( d3.select(this).attr("x") );
							var temp_y = parseInt( d3.select(this).attr("y") );
							if( temp_y == y_pos && temp_x == x_pos) {
								y_offset += 15;
								console.log(y_offset);
							}
						});
		
	//Draw hint of rule
	var text = Src.select("#text")
				.append("text")
				.attr("id", preID)
				.attr("class", "preview")
				.attr("x", MergeHead.x + x_offset)
				.attr("y", MergeHead.y + y_offset)
				.attr("font-family", "sans-serif")
				.attr("font-size", "14")
				.attr("fill", hint.color)
				.text(hint.message)
				.on("click", function(d){ mouseclick_L3(Src, lineData, data, result, id, level)} )
				.on("mouseover", function(d) { ReviewRule(hint.ruleId, preID); })
				.on("mouseout", function(d) { RevealOtherPreview(preID); } );
}


function mouseclick_L1(Src, data, result, id, level) {
	var rect_data = [];
	var Pillars = [];
	
	/*****************************
		Draw Rect, add pillars and UpdateBUObj
	*****************************/
	for(var i=0; i<data.length; i++) {
		var RectObj = new RectDataObject();
		RectObj.x = data[i].x;
		RectObj.y = data[i].y;
		RectObj.width = result.width;
		RectObj.height = result.height;
		
		rect_data.push(RectObj);
		
		CalculatePillars(RectObj, Pillars);
	}
	var RectCmd = new RectCommand(Src, id, rect_data);
	var DotCmd = new DotCommand(Src, id, Pillars);
	var UpdateBUObjCmd = new UpdateBUObjCommand(data, 0, result.typeid, 0, level);
	CmdManager.execute(RectCmd);
	CmdManager.execute(DotCmd);
	CmdManager.execute(UpdateBUObjCmd);
	
	rect_data = undefined;
	Pillars	= undefined;
	
	d3.selectAll("[class='preview']").remove(); 		//Remove all hints
	
	AutoAnalyze(AutoAnalysis_sw);
		
	//console.log(d3.mouse(this)[0], d3.mouse(this)[1]);
}

function mouseclick_L2(Src, head, data, result, id, level) {
	var rect_data = [];
	
	/*****************************
		Draw Rect and UpdateBUObj
	*****************************/
	var RectObj = new RectDataObject;
	RectObj.x = head.x;
	RectObj.y = head.y;
	RectObj.width = result.width;
	RectObj.height = result.height;
		
	rect_data.push(RectObj);
		
	var RectCmd = new RectCommand(Src, id, rect_data);
	var UpdateBUObjCmd = new UpdateBUObjCommand(data, 0, result.typeid, 0, level);
	CmdManager.execute(RectCmd);
	CmdManager.execute(UpdateBUObjCmd);
	
	/******************************
			Conceal Pillars  
	*******************************/
	
	var Cel_Pills = CalculateCancelPillars(2, head.x, head.y, head.x + result.width, head.y + result.height);
	var CancelDotCmd = new CancelDotCommand(Src, Cel_Pills);
	CmdManager.execute(CancelDotCmd);

	rect_data = undefined;
	
	d3.selectAll("[class='preview']").remove(); 		//Remove all hints
	
	AutoAnalyze(AutoAnalysis_sw);
	//console.log(d3.mouse(this)[0], d3.mouse(this)[1]);
}

function mouseclick_L3(Src, lineData, data, result, id, level) {
	var linedata = lineData;
	var LinePathCmd = new LinePathCommand(Src, id, linedata);
	var UpdateBUObjCmd = new UpdateBUObjCommand(data, 0, result.typeid, 0, level);
	var NullCmd = new NullCommand();
	CmdManager.execute(LinePathCmd);
	CmdManager.execute(UpdateBUObjCmd);
	CmdManager.execute(NullCmd);

	d3.selectAll("[class='preview']").remove(); 		//Remove all hints
	
	AutoAnalyze(AutoAnalysis_sw);
	//console.log(d3.mouse(this)[0], d3.mouse(this)[1]);
}

function AutoAnalyze(param) {
	if(!param)	
		;
	else
		doAnalyze();
}

//Level 3 start point for merge.
function FindMergeHead( Unit_list ) {
	var coor = {};
	
	coor.x = Unit_list[0].x;
	coor.y = Unit_list[0].y;
	
	for(var i=1; i<Unit_list.length; i++) {
		if(Unit_list[i].x < coor.x) {
			coor.x = Unit_list[i].x;
			coor.y = Unit_list[i].y;
		}
	}
	
	for(var i=1; i<Unit_list.length; i++) {
		if(Unit_list[i].x == coor.x && Unit_list[i].y < coor.y) {
			coor.x = Unit_list[i].x;
			coor.y = Unit_list[i].y;
		}
	}
	
	console.log("MergeHead of L3: " + coor.x, coor.y);
	
	//return Unit_list[index];
	return {x:coor.x, y:coor.y};
}

//Level 3 LinePath for merge
function CalculatePath(head, result) {
	var path_temp = [];
	
	for(var i=0; i<result.path.length; i++) {
		var coor = {};
		coor.x = head.x + result.path[i].x;
		coor.y = head.y + result.path[i].y;
		
		path_temp.push(coor);
	}
	
	return path_temp;
}

//New pillars for every Rectangle
function CalculatePillars(rectobj, pillars) {
	var dot_temp = {};
	dot_temp.cx = rectobj.x;
	dot_temp.cy = rectobj.y;
	pillars.push(dot_temp);
	
	dot_temp = {}
	dot_temp.cx = rectobj.x + rectobj.width;
	dot_temp.cy = rectobj.y;
	pillars.push(dot_temp);
	
	dot_temp = {}
	dot_temp.cx = rectobj.x + rectobj.width;
	dot_temp.cy = rectobj.y + rectobj.height;
	pillars.push(dot_temp);
	
	dot_temp = {}
	dot_temp.cx = rectobj.x
	dot_temp.cy = rectobj.y + rectobj.height;
	pillars.push(dot_temp);
}

//Get Pillars which will be Concealed.
function CalculateCancelPillars(level, x_min, y_min, x_max, y_max) {
	var temp_pills = [];
	d3.selectAll("circle").each( function(d, i) {
									switch(level) {
										case 2:
											if( (d.cx > x_min && d.cy > y_min) && ( d.cx < x_max && d.cy < y_max ) ) {
												temp_pills.push(d3.select(this));
												//temp_pills.push($(this)[0]);
												//temp_pills.push($(this));
											}
											break;
										case 3:
											
											break;
									}
								});
	return temp_pills;
}