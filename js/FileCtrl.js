//Import
function ImportXmlFile() {
	$("#LoadFile").click();
}

function LoadXmlFile(event) {
	var file = event.target.files[0];
	
	var reader = new FileReader();
	
	reader.onload = function(e) {
		var data = new DOMParser().parseFromString(this.result, "text/xml");
		LoadXml(data);
	}
	
	reader.readAsText(file);
}

function LoadXml(xml) {
	Rules.reset();

	$(xml).find("Rule").each( function(i) {
								var level = parseInt(($(this).children("Level").text()));
								var typeId = parseInt(($(this).children("TypeID").text()));
								var pattern = ($(this).children("Pattern").text()).split(",");
								var resultSize = {};
								var path = [];
								
								for(var j=0; j<pattern.length; j++) {
									var value = pattern[j];
									
									if(value == 'N') {
										pattern[j] = 'N';
									}
									else {
										pattern[j] = parseInt(value);
									}
								}
								
								if(level == 3) {
									var temp = ($(this).children("Path").text()).split(",");
									
									resultSize.width = 0;
									resultSize.height = 0;
									
									for(var i=0; i<temp.length; i+=2) {
										var coor = {};
										coor.x = parseInt(temp[i]);
										coor.y = parseInt(temp[i+1]);
										
										path.push(coor);
									}
								}
								else{
									path = null;
									var temp = ($(this).children("ResultSize").text()).split(",");
									resultSize.width = parseInt(temp[0]);
									resultSize.height = parseInt(temp[1]);
								}
								
								//Call global Rules
								Rules.createNewRule(pattern, typeId, resultSize, level, path);
							});
}

//Export
/*
function ExportXmlFile() {
	$("#SaveFile").click();
}*/

function SaveXmlFile() {
	var str = "";
	var ruleid = 0;
	
	str += "<?xml version='1.0' encoding='UTF-8'?>\n<Rules>";
	
	for(var i=0; i<Rules.getLength(); i++) {
		var level = Rules.getLevel(i);
		var typeId = Rules.getTypeId(i);
		var pattern = Rules.getRulePattern(i);
		var resultSize = Rules.getResultSize(i);
		var path = Rules.getPath(i);
		
		str += "\n\t<Rule>";
		str += "\n\t\t<Level>" + level + "</Level>";
		str += "\n\t\t<TypeID>" + typeId + "</TypeID>";
		
		str +="\n\t\t<Pattern>" + pattern[0];
		for(var j=1; j<pattern.length; j++) {
			str += "," + pattern[j];
		}
		str += "</Pattern>";
		
		str += "\n\t\t<ResultSize>" + resultSize.width + "," + resultSize.height + "</ResultSize>";
		
		if(level == 3) {
			str += "\n\t\t<Path>" + path[0].x + "," + path[0].y;
			for(var k=1; k<path.length; k++) {
				str += "," + path[k].x + "," + path[k].y;
			}
			str += "</Path>";
		}
		else {
			str += "\n\t\t<Path>null</Path>";
		}
		
		str += "\n\t</Rule>";
	}
	str += "\n</Rules>";
	
	var blob = new Blob([str], {type: "text/xml"});
	saveAs(blob, "Rules.xml");
}

function SaveSvgFile() {
	var str = "";
	
	//Get all svg element
	var html = $('<div>').append($('#stage').clone()).html();
	str = html;
	
	var blob = new Blob([str], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "Layout.svg");
}
