//Command Object
function SupportRectCommand(Src, id, data, color) {
	var Rect_color = color;
	var groupID = id;
	var data_arr = data;			//[{ReceDataObject}, {RectDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		var rect = Src.select("#rect")
					.append("rect")
					.attr("class", groupID)
					.attr("x", data_arr.x)
					.attr("y", data_arr.y)
					.attr("width", 40)
					.attr("height", 40)
					.attr("fill", Rect_color)
					.attr("stroke", "black")
					.attr("stroke-width", 1);
	}
}

function ExplorerCommand(Src, id, level, typeid, size, data, color) {
	var Text_x_offset = 10;
	var Text_y_offset = 20;

	console.log(color);
	
	this.execute = function() {
		var rect = Src.select("#rect")
					.append("rect")
					.attr("class", "RuleExplorer")
					.attr("x", data.x)
					.attr("y", data.y)
					.attr("width", size)
					.attr("height", size)
					.attr("fill", color)
					.attr("stroke", "black")
					.attr("stroke-width", 1);
		
		if(level != 1) {
			rect_type = Src.select("#text")
						.append("text")
						.attr("class", "RuleExplorer")
						.attr("x", data.x + Text_x_offset)
						.attr("y", data.y + Text_y_offset)
						.attr("font-family", "sans-serif")
						.style("font-weight", "bold")
						.attr("font-size", "16")
						.attr("fill", "black")
						.text(typeid);
		}	
	}
}

//□
function RectCommand(Src, id, data) {
	var groupID = id;
	var data_arr = data;			//[{ReceDataObject}, {RectDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		for(var i=0; i<data_arr.length; i++) {
			var rect = Src.select("#rect")
						.append("rect")
						.attr("class", groupID)
						.attr("x", data_arr[i].x)
						.attr("y", data_arr[i].y)
						.attr("width", data_arr[i].width)
						.attr("height", data_arr[i].height)
						.attr("fill", "white")
						.attr("stroke", "black")
						.attr("stroke-width", 4)
						.style("opacity", 0)
						.transition()
						.duration(1000)
						.style("opacity", 1);
		}
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();	//SelectAll not work on Chrome
	}
}

//●
function DotCommand(Src, id, data){
	var groupID = id;
	var data_arr = data;			//[{CircleDataObject}, {CircleDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		var circles = Src.select("#dot").selectAll(".dot")
						.data(data_arr).enter()
						.append("circle")
						.attr("class", groupID);

		var circleAttributes = circles.attr("cx", function (d) { return d.cx; })
									.attr("cy", function (d) { return d.cy; })
									.attr("r", 7)
									.style("fill", "black")
									.style("opacity", 0)
									.transition()
									.duration(1000)
									.style("opacity", 1);
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();
	}
} 

//X
function CancelDotCommand(Src, data) {
	var data_arr = data;
	
	this.execute = function() {
		for(var i=0; i<data_arr.length; i++) {
			var circle = data_arr[i].transition()
								.duration(1000)
								.style("opacity", 0);
		}
	}
	
	this.undo = function() {
		for(var i=0; i<data_arr.length; i++) {
			var circle = data_arr[i].transition()
								.duration(1000)
								.style("opacity", 1);
		}
	}
}

//○
function CircleCommand(Src, id, data) {
	var groupID = id;
	var data_arr = data;			//[{CircleDataObject}, {CircleDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		for(i=0; i<data_arr.length; i++) {
			var circles = Src.selectAll(".circle")
							.data(data_arr).enter()
							.append("circle")
							.attr("class", groupID);

			var circleAttributes = circles.attr("cx", function (d) { return d.cx; })
										.attr("cy", function (d) { return d.cy; })
										.attr("r", 5)
										.style("stroke", "black")
										.style("fill", "white")
										.attr("stroke-width", 2);
			
			return circles;
		}
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();
	}
} 

//▕
function LineCommand(Src, id, data) {
	var groupID = id;
	var data_arr = data;			//[{LineDataObject}, {LineDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		for(i=0; i<data_arr.length; i++) {
			var line = Src.append("line")
						.attr("class", groupID)
						.attr("x1", data_arr[i].x1)
						.attr("y1", data_arr[i].y1)
						.attr("x2", data_arr[i].x2)
						.attr("y2", data_arr[i].y2)
						.attr("stroke", "black")
						.attr("stroke-width", 2);
		}
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();
	}
}

//Path Command
function LinePathCommand(Src, id, data) {
	var groupID = id;
	var lineData = data;			//[{LineDataObject}, {LineDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		var lineFunction = d3.svg.line()
					.x(function(d) { return d.x; })
					.y(function(d) { return d.y; })
					.interpolate("linear");
					
		var lineGraph_t = Src.select("#rect")
					.append("path")
					.attr("class", groupID)
					.attr("d", lineFunction(lineData))
					.attr("stroke", "black")
					.attr("stroke-width", 3)
					.attr("fill", "white")
					.style("opacity", 0)
					.transition()
					.duration(1000)
					.style("opacity", 1);
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();
	}
}

//﹉
function DashLineCommand(Src, data) {
	var groupID = id;
	var data_arr = data;			//[{LineDataObject}, {LineDataObject}, ...]
	
	//Feature 
	//...
	
	//Execute
	this.execute = function() {
		for(i=0; i<data_arr.length; i+=2) {
			var dashline = Src.append("line")
						.attr("class", "LayoutMapHints")
						.attr("x1", data_arr[i].x)
						.attr("y1", data_arr[i].y)
						.attr("x2", data_arr[i+1].x)
						.attr("y2", data_arr[i+1].y)
						.attr("stroke-dasharray", "20, 10")
						.attr("stroke", "#BBBBBB")
						.attr("stroke-width", 1);
		}
	}
	
	//Undo
	this.undo = function(){
		d3.selectAll("[class='" + groupID + "']").remove();
	}
}

function PreviewCommand(Src, id, data, preObj, resObj, level) {
	//Feature 
	//...
	
	//Execute
	this.execute = function(){
		switch(level) {
			case 1:
				PreviewMethod_L1(Src, id, data, resObj, preObj, level);
				break;
			case 2:
				PreviewMethod_L2(Src, id, data, resObj, preObj, level);
				break;
			case 3:
				PreviewMethod_L3(Src, id, data, resObj, preObj, level);
				break;
		}
		
	}
}

//Update BaseUnitObject info.
//variables like edge, x and y are fixed value. Maybe change in the future.
function UpdateBUObjCommand(BUObj_arr, isfdata, typedata, groupdata, level) {
	var stage_level = level;
	var BUObj_src = [];					//original reference
	var BUObj_backup = [];				//BUObj backup
	
	//var isFilled_arr = isfdata;
	var typeID = typedata;
	//var groupID_arr = groupdata;

	for(var i=0; i<BUObj_arr.length; i++) {
		BUObj_src[i] = BUObj_arr[i];
		
		//edge, x and y will not change after update.
		BUObj_backup[i] = new BaseUnitObject(BUObj_arr[i].isFilled, BUObj_arr[i].edge, BUObj_arr[i].x, BUObj_arr[i].y, BUObj_arr[i].typeID, BUObj_arr[i].isGrouped);
	}	
	
	//Execute
	this.execute = function() {
		switch(stage_level) {
			case 1:
				for(var i=0; i<BUObj_arr.length; i++) {
					BUObj_src[i].isFilled = 1;							//Directly change reference.
					BUObj_src[i].typeID = typeID;						//reference = new value
				
					console.log("(execute):BaseUnitObject[" + BUObj_src[i].x + "][" + BUObj_src[i].y +"] Updated.");
				}
				break;
			case 2:
				for(var i=0; i<BUObj_arr.length; i++) {
					BUObj_src[i].typeID = typeID;						//reference = new value
					BUObj_src[i].isGrouped = true;
				
					console.log("(execute):BaseUnitObject[" + BUObj_src[i].x + "][" + BUObj_src[i].y +"] Updated.");
				}
				break;
			case 3:
				for(var i=0; i<BUObj_arr.length; i++) {
					BUObj_src[i].typeID = typeID;						//reference = new value
					BUObj_src[i].isGrouped = true;
				
					console.log("(execute):BaseUnitObject[" + BUObj_src[i].x + "][" + BUObj_src[i].y +"] Updated.");
				}
				break;
		}
		
	}
	
	//Undo
	this.undo = function() {
		switch(stage_level) {
			case 1:
				for(var j=0; j<BUObj_arr.length; j++) {
					BUObj_src[j].isFilled = 0;							//Directly change reference.
					BUObj_src[j].typeID = BUObj_backup[j].typeID;		//reference = original value
				
					console.log("(undo)BaseUnitObject[" + BUObj_src[j].x + "][" + BUObj_src[j].y +"] Updated.");
				}
				break;
			case 2:
				for(var j=0; j<BUObj_arr.length; j++) {
					BUObj_src[j].typeID = BUObj_backup[j].typeID;		//reference = original value
					BUObj_src[j].isGrouped = false;
				
					console.log("(undo)BaseUnitObject[" + BUObj_src[j].x + "][" + BUObj_src[j].y +"] Updated.");
				}
				break;
			case 3:
				for(var j=0; j<BUObj_arr.length; j++) {
					BUObj_src[j].typeID = BUObj_backup[j].typeID;		//reference = original value
					BUObj_src[j].isGrouped = true;
				
					console.log("(undo)BaseUnitObject[" + BUObj_src[j].x + "][" + BUObj_src[j].y +"] Updated.");
				}
				break;
		}
	}
}

function NullCommand() {
	this.execute = function() {
		;	//Do nothing
	}
	
	this.undo = function() {
		;	//Do nothing
	}
}