function TheoPavlidisAlgorithmForBoundaryPoints() {
	var TPABug = {};			//Hero in this Algorithm
	var MapContour = [];
	var Map_4_Connected;		//Target Map
	
	this.CrawlMapContour = function() {
		var aw_counter = 0, step_counter = 0;
		var stop_signal = false, stop_counter = 1;
		var entrance_info = FindTPAEntranceIndex(Map_4_Connected);
		var trend = entrance_info.trend;		//trend: 0=up, 1=down.
		var entrance = Map_4_Connected[entrance_info.y_index][entrance_info.x_index];
		
		var xy_offset = Map_4_Connected[0][1].x - Map_4_Connected[0][0].x;
		
		//Let bug get into map
		TPABug.body = entrance;
		TPABug.lastCrawl = entrance_info.crawl_dir;
		
		//First step
		var BP_info = {};
		if(!trend) {	//up
			switch(TPABug.lastCrawl) {
				case 0:
					BP_info.x = TPABug.body.x;
					BP_info.y = TPABug.body.y + xy_offset;
					break;
				case 1:
					BP_info.x = TPABug.body.x;
					BP_info.y = TPABug.body.y + xy_offset;
					break;
				case 2:
					BP_info.x = TPABug.body.x;
					BP_info.y = TPABug.body.y;
					break;
				case 3:
					console.log("TPAFBP: Error, impossible lastCrawl in trend = 0(up).");
					break;
			}
		}
		else {		//down
			switch(TPABug.lastCrawl) {
				case 0:
					BP_info.x = TPABug.body.x + xy_offset;
					BP_info.y = TPABug.body.y + xy_offset;
					break;
				case 1:
					console.log("TPAFBP: Error, impossible lastCrawl in trend = 1(down).");
					break;
				case 2:
					BP_info.x = TPABug.body.x + xy_offset;
					BP_info.y = TPABug.body.y;
					break;
				case 3:
					BP_info.x = TPABug.body.x + xy_offset;
					BP_info.y = TPABug.body.y;
					break;
			}
		}
		
		MapContour.push(BP_info);
		
		console.log("Start from: " + entrance_info.y_index, entrance_info.x_index);
		
		//Start Crawling
		while(stop_counter) {
			if(!trend) {
				switch(TPABug.lastCrawl) {
					case 0://Face left
						console.log("Bug: face left side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getLeft();
						if( p2 ) {
							p1 = p2.getBottom();
							p3 = p2.getTop();
							
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}
						//else {
						//	;	//Let p1_w, p2_w and p3_w still null.
						//}
						
						if( p1_w ) {
							aw_counter = 0;
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: P1. Trend change to " + trend);
							
							console.log("Bug: Wait for changing of trend.");
						}
						else if( p2_w ) {
							aw_counter = 0;
							//Just crawl to left.
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to left.");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 0;

							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							//Crawl to up and one more step left.
							console.log("Next Destination: P3.");
							
							console.log("Bug: Crawl to up(face up side temporary).");
							
							TPABug.body = TPABug.body.getTop();
							TPABug.lastCrawl = 1;
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to left.");
							
							TPABug.body = p3;
							TPABug.lastCrawl = 0;
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							console.log("Next Destination: None.");
							
							console.log("Bug: turn to face up.");
							
							//Turn to face up
							TPABug.lastCrawl = 1;
						}
						
						console.log("TPA: Finish an action.");
						break;
					case 1://Face up
						console.log("Bug: face up side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getTop();
						
						if( p2 ) {
							p1 = p2.getLeft();
							p3 = p2.getRight();
						
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}
						
						if( p1_w ) {
							aw_counter = 0;
							//Crawl to up and one more step left.
							console.log("Next Destination: P1.");
							
							console.log("Bug: Crawl to up");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 1;
							//Crawl to up and take bottom point(relative to rectangle original point).
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);

							console.log("Bug: Crawl to left and face left side.");
							
							var BP_info = {};
							TPABug.body = p1;
							TPABug.lastCrawl = 0;		//Bug turn to face left side.
							//Crawl to left and take bottom point(relative to rectangle original point).
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else if( p2_w ) {
							aw_counter = 0;
							//Just crawl to up.
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to up");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 1;
							//Crawl to up and take bottom point(relative to rectangle original point).
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							//Crawl to right and one more step up.
							console.log("Next Destination: P3.");
							
							console.log("Bug: Add RP and crawl to right(face right side temporary).");
							
							//First add rectangle original point to contour routine.
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
							//Crawl to right (face right side temporary.) and take rectangle original point.
							TPABug.body = TPABug.body.getRight();
							TPABug.lastCrawl = 2;
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to up.");
							
							//Crawl to up and take bottom point(relative to rectangle original point).
							TPABug.body = p3;
							TPABug.lastCrawl = 1;
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							console.log("Next Destination: None. AW_counter = " + aw_counter);
							
							console.log("Bug: Add RP and turn to face right.");
	
							//First add rectangle original point to contour routine.
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
							//Turn to face right
							TPABug.lastCrawl = 2;
						}
						
						console.log("TPA: Finish an action.");
						break;
					case 2:	//Face right
						console.log("Bug: face right side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getRight();
						
						if( p2 ) {
							p1 = p2.getTop();
							p3 = p2.getBottom();
							
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}
						
						if( p1_w ) {
							aw_counter = 0;
							//Crawl to right and one more step up.
							console.log("Next Destination: P1.");
							
							console.log("Bug: Crawl to right(face right side temporary).");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 2;
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);

							console.log("Bug: Crawl to up and face up side.");
							
							var BP_info = {};
							TPABug.body = p1;
							TPABug.lastCrawl = 1;
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else if( p2_w ) {
							aw_counter = 0;
							//Just crawl to right.
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to right.");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 2;
							
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: P3. Trend change to " + trend);
							
							console.log("Bug: Add right point and wait for changing of trend.");
							
							TPABug.lastCrawl = 2;
							var BP_info = {};
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: None. Trend change to " + trend);
							
							console.log("Bug: Add right point, turn to face down and wait for changing of trend.");
							
							TPABug.lastCrawl = 3;
							var BP_info = {};
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						
						console.log("TPA: Finish an action.");
						break;
					case 3://Face down
						console.log("TPAFBP: Error, impossible lastCrawl in trend = 0(up).");
						break;
				}//end switch
				
				console.log("--------------Bug Position:" + TPABug.body.x, TPABug.body.y + "--------------");
				
			}//end if
			else {
				switch(TPABug.lastCrawl) {
					case 0://Face left
						console.log("Bug: face left side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getLeft();
						
						if( p2 ) {
							p1 = p2.getBottom();
							p3 = p2.getTop();
							
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}

						if( p1_w ) {
							aw_counter = 0;
							console.log("Next Destination: P1.");
							
							console.log("Bug: Crawl to left(face left side temporary).");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 0;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to down and face down side.");
							
							var BP_info = {};
							TPABug.body = p1;
							TPABug.lastCrawl = 3;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
						}
						else if( p2_w ) {
							aw_counter = 0;
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to left.");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 0;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: None. Trend change to " + trend);
							
							console.log("Bug: Add bottom point and wait for changing of trend.");
							
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: None. Trend change to " + trend);
							
							console.log("Bug: Add bottom point, turn to face up and wait for changing of trend.");
							
							TPABug.lastCrawl = 1;
							var BP_info = {};
							BP_info.x = TPABug.body.x;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
						}
						
						console.log("TPA: Finish an action.");
						break;
					case 1:
						console.log("TPAFBP: Error, impossible lastCrawl in trend = 1(down).");
						break;
					case 2://Face right
						console.log("Bug: face right side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getRight();
						
						if( p2 ) {
							p1 = p2.getTop();
							p3 = p2.getBottom();
							
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}

						if( p1_w ) {
							aw_counter = 0;
							if(!trend)
								trend++;
							else
								trend--;
								
							console.log("Next Destination: P1. Trend change to " + trend);
							
							console.log("Bug: Wait for changing of trend.");
						}
						else if( p2_w ) {
							aw_counter = 0;
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to right.");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 2;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							console.log("Next Destination: P3.");
							
							console.log("Bug: Crawl to down(face down side temporary).");
							
							var BP_info = {};
							TPABug.body = TPABug.body.getBottom();
							TPABug.lastCrawl = 3;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to right and face right side.");
							
							var BP_info = {};
							TPABug.body = p3;
							TPABug.lastCrawl = 2;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							console.log("Next Destination: None.");
							
							console.log("Bug: turn to face down.");
							
							//Turn to face up
							TPABug.lastCrawl = 3;
						}
						
						console.log("TPA: Finish an action.");
						break;
					case 3://Face down
						console.log("Bug: face down side.");
						var p1, p2, p3;
						var p1_w = null, p2_w = null, p3_w = null;
						p2 = TPABug.body.getBottom();
						
						if( p2 ) {
							p1 = p2.getRight();
							p3 = p2.getLeft();
							
							if( p1 )
								p1_w = p1.getIsBlack();
							if( p2 )
								p2_w = p2.getIsBlack();
							if( p3 )
								p3_w = p3.getIsBlack();
						}
						
						if( p1_w ) {
							aw_counter = 0;
							console.log("Next Destination: P1.");
							
							console.log("Bug: Crawl to down(face right side temporary).");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 3;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to right and face right side.");
							
							var BP_info = {};
							TPABug.body = p1;
							TPABug.lastCrawl = 2;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else if( p2_w ) {
							aw_counter = 0;
							console.log("Next Destination: P2.");
							
							console.log("Bug: Crawl to down.");
							
							var BP_info = {};
							TPABug.body = p2;
							TPABug.lastCrawl = 3;
							
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else if( p3_w ) {
							aw_counter = 0;
							console.log("Next Destination: P3.");
							
							console.log("Bug: Add right-bottom point, crawl to left(face left side temporary).");
							
							var BP_info = {};
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
							
							var BP_info = {};
							TPABug.body = TPABug.body.getLeft();
							TPABug.lastCrawl = 0;
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
							
							console.log("Bug: Crawl to down and face down side.");
							
							var BP_info = {};
							TPABug.body = p3;
							TPABug.lastCrawl = 3;
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y;
							MapContour.push(BP_info);
						}
						else {
							aw_counter++;
							console.log("Next Destination: None.");
							
							console.log("Bug: Add right-bottom point, turn to face left side.");
							
							var BP_info = {};
							BP_info.x = TPABug.body.x + xy_offset;
							BP_info.y = TPABug.body.y + xy_offset;
							MapContour.push(BP_info);
							
							TPABug.lastCrawl = 0;
						}
						console.log("TPA: Finish an action.");
						break;
				}//end switch
				
				console.log("--------------Bug Position:" + TPABug.body.x, TPABug.body.y + "--------------");
				
			}//end else
			step_counter++;
			
			if(!stop_signal)
				stop_signal = CheckStopSignal(entrance, TPABug, aw_counter, step_counter);
			else
				stop_counter--;		//Do one more action when back to entrance.
				
		}//end while
		
		TPABug = undefined;
		Map_4_Connected = undefined;
		
		console.log(MapContour);
		return MapContour;
	}//end function
		
	//console.log(entrance.y_index, entrance.x_index, entrance.trend);
	
	function CheckStopSignal(ent, obj, aw_con, step_con) {
		if( ((obj.body.x == ent.x) && (obj.body.y == ent.y)) && step_con >= 3)
			return true;
		else if(aw_con >= 3)
			return true;
		else
			return false;
	}
	
	function FindTPAEntranceIndex(map_4_connected) {
		var map = map_4_connected;
		var map_length = map.length;
		var break_sw = false;
		
		//Search bottom row
		for(var j=map_length-1; j>= 0; j--) {
			for(var i=0; i<map_length; i++ ) {
				//Check Black or White
				var BoW = map[j][i].getIsBlack();
				
				if(!BoW) {
					;	//Do next
				}
				else {
					break_sw = true;
					var entrance = map[j][i];
					var left_neighbor = entrance.getLeft();
					
					if( left_neighbor ) {
						if(!left_neighbor.getIsBlack())
							return {y_index: j, x_index: i, trend: 0, crawl_dir: 1};
					}
					else {
						;	//Do next
					}
				}
			}//end for j
			
			if(break_sw)
				j = -1;
		}//end for i
		
		//Reset break_sw
		break_sw = false;
		//Search left column
		for(var i=0; i<map_length; i++) {
			for(var j=0; j<map_length; j++ ) {			
				//Check Black or White
				var BoW = map[j][i].getIsBlack();
				
				if(!BoW) {
					;	//Do next
				}
				else {
					break_sw = true;
					var entrance = map[j][i];
					var top_neighbor = entrance.getTop();
					
					if(top_neighbor) {
						if(!top_neighbor.getIsBlack())
							return {y_index: j, x_index: i, trend: 0, crawl_dir: 2};
					}
					else {
						;	//Do next
					}
				}
			}//end for j
			
			if(break_sw)
				i = map_length;
		}//end for i
		
		//Reset break_sw
		break_sw = false;
		//Search top row
		for(var j=0; j<map_length; j++) {
			for(var i=0; i<map_length; i++ ) {
				//Check Black or White
				var BoW = map[j][i].getIsBlack();
				
				if(!BoW) {
					;	//Do next
				}
				else {
					break_sw = true;
					var entrance = map[j][i];
					var right_neighbor = entrance.getRight();
					
					if(right_neighbor) {
						if(!right_neighbor.getIsBlack())
							return {y_index: j, x_index: i, trend: 1, crawl_dir: 2};
					}
					else {
						;	//Do next
					}
				}
			}//end for j
			
			if(break_sw)
				j = map_length;
		}//end for i
		
		//Reset break_sw
		break_sw = false;
		//Search right column
		for(var i=map_length-1; i>=0; i--) {
			for(var j=0; j<map_length; j++ ) {
				//Check Black or White
				var BoW = map[j][i].getIsBlack();
				
				if(!BoW) {
					;	//Do next
				}
				else {
					break_sw = true;
					var entrance = map[j][i];
					var bottom_neighbor = entrance.getBottom();
					
					if(bottom_neighbor) {
						if(!bottom_neighbor.getIsBlack())
							return {y_index: j, x_index: i, trend: 1, crawl_dir: 0};
					}
					else {
						;	//Do next
					}
				}
			}//end for j
			
			if(break_sw)
				i = -1;
		}//end for i
		
		console.log("TPAFBP: Can not find any entrance.");

		//If there are black all around the map boundary. Set entrance is left-bottom forcely.
		console.log("TPAFBP: There are blacks all around the map boundary.");
		return {y_index: map_length-1, x_index: 0, trend: 0, crawl_dir: 1};
	}
	
	//SET
	this.setMap_4_Connected = function(param) {
		Map_4_Connected = param;
	}
}

function TPAObject() {
	this.x = 0;						//Coordinates, default = (0, 0);
	this.y = 0;

	var isBlack = 0;				//Default
	
	var Left_Neighbor = null;
	var Top_Neighbor = null;
	var Right_Neighbor = null;
	var Bottom_Neighbor = null;
	
	//SET
	this.setIsBlack = function(ToF) {
		isBlack = ToF;
	}
	
	this.setLeft = function(TPAObj) {
		Left_Neighbor = TPAObj;
	}
	
	this.setTop = function(TPAObj) {
		Top_Neighbor = TPAObj;
	}
	
	this.setRight = function(TPAObj) {
		Right_Neighbor = TPAObj;
	}
	
	this.setBottom = function(TPAObj) {
		Bottom_Neighbor = TPAObj;
	}
	
	//GET
	this.getIsBlack = function() {
		return isBlack;
	}
	
	this.getLeft = function() {
		return Left_Neighbor;
	}
	
	this.getTop = function() {
		return Top_Neighbor;
	}
	
	this.getRight = function() {
		return Right_Neighbor;
	}
	
	this.getBottom = function() {
		return Bottom_Neighbor;
	}
}