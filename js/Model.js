//Shape Data Object
function RectDataObject(x, y, width, height) {
	this.x = x;	
	this.y = y;
	this.width = width;		
	this.height = height;
} 

function CircleDataObject(cx, cy) {
	this.cx = cx;
	this.cy = cy;
} 

function LineDataObject(x1, y1, x2, y2) {
	this.x1 = x1;		//from
	this.y1 = y1;
	this.x2 = x2;		//end
	this.y2 = y2; 
} 

function PreviewDataObject() {
	this.ruleId;
	this.message;
	this.color;
}

function ResultDataObject() {
	this.width;
	this.height;
	this.path;
	this.typeid;
}

function BaseUnitObject(isfilled, edge, x, y, typeID, isgrouped) {
	this.id;
	this.isFilled = isfilled;
	this.edge = edge;
	this.x = x;
	this.y = y;
	this.typeID = typeID;
	this.isGrouped = isgrouped;
	
	
	//Neighborhood
	var left = null;
	var top = null;
	var right = null;
	var bottom = null;
	
	this.setLeft = function(BUObj) {
		left = BUObj;
	}
	
	this.setTop = function(BUObj) {
		top = BUObj;
	}
	
	this.setRight = function(BUObj) {
		right = BUObj;
	}
	
	this.setBottom = function(BUObj) {
		bottom = BUObj;
	}
	
	this.getLeft = function() {
		return left;
	}
	
	this.getTop = function() {
		return top;
	}
	
	this.getRight = function() {
		return right;
	}
	
	this.getBottom = function() {
		return bottom;
	}
}