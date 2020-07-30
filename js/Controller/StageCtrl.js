$( document ).ready(function() {
	//window.onresize = updateWindow;
	//width  = $(document).width();
	//height = $(document).height();
    stage();
});

var svgContainer, ToolSVG, SupportSVG, RuleExSVG, RuleExHeaderSVG, PalaceLayoutSVG;
var Rules, NewRuleObj;
var id;	
var CmdManager;
var LayoutMap;
var Level_sw;
var AutoAnalysis_sw, SideCorridor_sw;

function stage() {
	init();
}
/************************************************
				Initialization
*************************************************/
function init() {
	id = 0;
	Level_sw = 1;
	AutoAnalysis_sw = false;	//Auto analysis
	SideCorridor_sw = false;	//Side Corridor
	
	svgContainer = SVG_init();				//Main SVG
	ToolSVG = Toolsvg_init();
	SupportSVG = SupportSVG_init();
	RuleExSVG = RuleExBodySVG_init();
	RuleExHeaderSVG = RuleExHeaderSVG_init();
	PalaceLayoutSVG = PalaceLayoutSVG_init();
	
	//LayoutMap = LayoutMap_init();			//Original Layout Map
	//Build_4_Connected( LayoutMap );	
	
	NewRuleObj = new RuleObject();
	CmdManager = new CommandManager();
	Rules = Rules_init();
	
	var str = FormLevelMessage(Level_sw);
	UpdateMessage(svgContainer, "StageLevelCounter", str, "black", 20, 40);
	
	HotKey_init();
}

function SVG_init() {
	var w = $("#stage").width();
	var h = $("#stage").height();
	
	//Create SVG
	var svg = d3.select("#stage").append("svg")
								.attr("xmlns", "http://www.w3.org/2000/svg")
								.attr("width", w)
								.attr("height", h);
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "rect");
	svg.append("g").attr("id", "dot");
	svg.append("g").attr("id", "text");
	
	return svg;
}

function Toolsvg_init() {
	//Create SVG
	var svg = d3.select("#toolsvg").append("svg")
								.attr("width", "100%")
								.attr("height", "100%");
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "rect");
	svg.append("g").attr("id", "text");
	
	return svg;
}

function SupportSVG_init() {
	//Create SVG
	var svg = d3.select("#toolsupport").append("svg")
									.attr("width", "100%")
									.attr("height", "100%");
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "rect");
	
	return svg;
}

function RuleExHeaderSVG_init() {
//Create SVG
	var svg = d3.select("#MyModalRuleHintsSVG").append("svg")
									.attr("width", 1100)
									.attr("height", 30);
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "rect");
	svg.append("g").attr("id", "text");
	
	return svg;
}

function RuleExBodySVG_init() {
	//Create SVG
	var svg = d3.select("#MyModalAllRuleSVG").append("svg")
									.attr("width", 1100)
									.attr("height", 650);
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "rect");
	svg.append("g").attr("id", "text");
	
	return svg;
}

function PalaceLayoutSVG_init() {
	//Create SVG
	var svg = d3.select("#MyModalPalaceLayoutSVG").append("svg")
									.attr("width", 550)
									.attr("height", 500);
	
	//Reorder HTML elements.
	svg.append("g").attr("id", "img");
	svg.append("g").attr("id", "text");
	
	return svg;
}

function HotKey_init() {
	//$(document).keydown(function(e) { 
		//var code = e.keyCode || e.which;
	
		$(document).bind('keydown', "ctrl+z", undo);
		$(document).bind('keydown', "ctrl+y", redo);
		$(document).bind('keydown', "right", doNextStage);
		$(document).bind('keydown', "left", doPreviousStage);
		$(document).bind('keydown', "return", AutoAnalysisController);
		/*if(e.ctrlKey) {
			switch(code){
				case 37:
					doPreviousStage();
					break;
				case 39:
					doNextStage();
					break;
				case 89:
					redo();
					break;
				case 90:
					undo();
					break;
			}
		}
		else {
			if( code == 13 )
				AutoAnalysisController();
		}*/
		
	//});
}


/************************************************
				↓UI Events Accepter↓
*************************************************/

/************************************************
				Tool Controller
*************************************************/
/*
function setNewRuleObjLevel(param) {
	ClearNewRule();
	NewRuleObj.level = param;
}*/

function setNewRuleLevelAndTypeID(param1, param2) {
	ClearNewRule();
	NewRuleObj = new RuleObject();
	NewRuleObj.setLevel(param1);
	NewRuleObj.setTypeId(param2);
	
	var NewLevel = NewRuleObj.getLevel();
	var NewLevelInfoMsg = "";
	
	
	if(NewLevel > 1) {
		if(NewLevel == 2)
			NewLevelInfoMsg = "2A";
		else
			NewLevelInfoMsg = "2B";
	}
	else {
		NewLevelInfoMsg = "1";
	}
	
	$("#ToolSettingMsg").text("Info：Stage=" + NewLevelInfoMsg + ", TypeID=" + NewRuleObj.getTypeId()).css({ 'font-size': "16px" });
	
}

function setNewRuleObjSize(param) {
	ClearNewRule();
	drawNewRuleMap(param);
}

function CreateNewRule() {
	var ResultSize = {};
	var BUObjSize = 100;
	var NewRuleLevel = NewRuleObj.getLevel();
	var NewRulePattenr = MapToPattern();
	var ToolMsg_x_offset = 20;
	var ToolMsg_y_offset = 30;
	//console.log(NewRuleMap);
	//NewRuleObj.setTypeId( CalculateNewRuleTypeID(Rules) );
	
	switch(NewRuleLevel) {
		case 1:
			var NewRulePattenr = MapToPattern();
			if( !CheckIllegal_L1(NewRulePattenr) ) {
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Fail! Map must contains marker '2'.", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			}else {
				ResultSize.width = BUObjSize;
				ResultSize.height = BUObjSize;
				NewRuleObj.setResultSize(ResultSize);
				NewRuleObj.setPattern(NewRulePattenr);
				Rules.createNewRule(NewRuleObj.getPattern(), NewRuleObj.getTypeId(), NewRuleObj.getResultSize(), NewRuleLevel, null);
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Success.", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			}
			break;
		case 2:
			var NewRulePattenr = MapToPattern();
			ResultSize = CalculateNewRuleSize_L2(NewRulePattenr);
			if(!ResultSize) {
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Fail! Map which will be formed must be a rectangle.", "red", ToolMsg_x_offset, ToolMsg_y_offset);
				//console.log("Create new rule: Failed!");
			}
			else {
				NewRuleObj.setResultSize(ResultSize);
				NewRuleObj.setPattern(NewRulePattenr);
				Rules.createNewRule(NewRuleObj.getPattern(), NewRuleObj.getTypeId(), NewRuleObj.getResultSize(), NewRuleLevel, null);
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Success!", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			}
			break;
		case 3:
			//Load and transfer data to 2-D array contains TPAObjs
			var NewRuleMapInfo = LoadNewRuleMapInfo();
			var NewRuleMapIndex = CalculateMapIndex(NewRuleMapInfo);
			var NewRuleMap = BuildNewRuleMap(NewRuleMapInfo, NewRuleMapIndex);
			
			//Build 4-connected map
			Build_4_Connected(NewRuleMap);
			
			//Run TPAFBP.
			var TPAFBP = new TheoPavlidisAlgorithmForBoundaryPoints();
			TPAFBP.setMap_4_Connected(NewRuleMap);
			var MapContourPoints = TPAFBP.CrawlMapContour();

			//Prepare to create L3 rule.
			if(MapContourPoints) {
				//Get offset per rect.
				var xy_offset = NewRuleMap[0][1].x - NewRuleMap[0][0].x;
				
				var NewRulePattenr = MapToPattern();
				var NewRulePath = ClaculateL3Path(MapContourPoints, BUObjSize, xy_offset);
				
				console.log(NewRulePath);
				
				NewRuleObj.setPath(NewRulePath);
				NewRuleObj.setPattern(NewRulePattenr);
				Rules.createNewRule(NewRuleObj.getPattern(), NewRuleObj.getTypeId(), {width:0, height:0}, NewRuleLevel, NewRuleObj.getPath());
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Success!", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			}
			else {
				UpdateMessage(ToolSVG, "PatternEditorMessage", "Failed! Illedgal shape. Can not find contour.", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			}
				
			//TPAFBP = undefined;
			//MapContourPoints = undefined;
			//UpdateMessage(ToolSVG, "PatternEditorMessage", "Not support level 3 rule editor in this version.", "red", ToolMsg_x_offset, ToolMsg_y_offset);
			break;
	}
	
}


/************************************************
				ActionBar Controller
*************************************************/
function CreateNewLayoutMap() {
	var new_width = parseInt($("input[name='NewLayoutWidth']").val()); 
	var new_height = parseInt($("input[name='NewLayoutHeight']").val());
	
	if(new_width > 2 && new_height > 2) {
		DeleteStageSVG();
		
		//Reinitial stage
		svgContainer = SVG_init();
		var str = FormLevelMessage(Level_sw);
		UpdateMessage(svgContainer, "StageLevelCounter", str, "black", 20, 40);
		
		if(AutoAnalysis_sw)
			AutoAnalysisController();
		
		console.log(new_width, new_height);
		LayoutMap = LayoutMap_init(new_width, new_height);
		Build_4_Connected( LayoutMap );
	}
	else {
		console.log("new_width and new_height must more than 3.");
	}
	
}

function SideCorridorController() {
	$('input[name="SideCorridor"]').click(function(){
										if($(this).is(":checked")){
											SideCorridor_sw = true;
										}
										else {
											SideCorridor_sw = false;
										}
									});
}

function AutoAnalysisController() {
	if(!AutoAnalysis_sw) {
		AutoAnalysis_sw = true;
		$("#Analysis_sw").text("Analyze_On").css({ 'font-size': "16px" });
		doAnalyze();
	}
	else {
		ClearPreview();
		ClearReview();
		AutoAnalysis_sw = false;
		$("#Analysis_sw").text("Analyze_Off").css({ 'font-size': "16px" });
	}
	
}

function doAnalyze() {
	ClearPreview();

	var Footprint = [];
	var height = LayoutMap.length;
	var width = LayoutMap[0].length;
	
	for( var i=0; i<height; i++ ) {
		for( var j=0; j<width; j++ ) {
			var BU_Patterns = AnalyzeLayoutMap( Rules, LayoutMap[i][j], Level_sw, Footprint );
			
			console.log("[" + i + "][" + j + "]: " + BU_Patterns);
	
			if(!BU_Patterns) {
				;//console.log("LayoutMapMethod.js: LayoutMap[" + i + "][" + j + "] interrupt walker due to null. ");
			}
			else {
				var MatchRuleIDs = Mapping( Rules, Level_sw, BU_Patterns );
				
				if(!MatchRuleIDs)
					;//console.log("LayoutMapMethod.js: LayoutMap[" + i + "][" + j + "] Can not Match any rule. ");
				else
					DrawHints( Rules, MatchRuleIDs, Level_sw, Footprint );
			}
		}
	}
	
	Footprint = undefined;
	BU_Patterns = undefined;
	MatchRuleIDs = undefined;
}

function doNextStage() {
	if(AutoAnalysis_sw)
		AutoAnalysisController();

	ClearPreview();
	if(Level_sw < 3)
		Level_sw++;
	
	var str = FormLevelMessage(Level_sw);
	
	UpdateMessage(svgContainer, "StageLevelCounter", str, "black", 20, 40);
	console.log("Current stage : " + Level_sw);
}

function doPreviousStage() {
	if(AutoAnalysis_sw)
		AutoAnalysisController();

	ClearPreview();
	if(Level_sw > 1)
		Level_sw--;
	
	var str = FormLevelMessage(Level_sw);
	
	UpdateMessage(svgContainer, "StageLevelCounter", str, "black", 20, 40);
	console.log("Current stage : " + Level_sw);
}

function FormLevelMessage(level) {
	switch(level) {
		case 1:
			return "Stage：1　Form layout with 「Main/Sub Space」 and 「Side Corridor」. 間與副階";
			break;
		case 2:
			return "Stage：2A　Merge 「Main/Sub Space」 into 「Rectangle Compartment」. 分槽";
			break;
		case 3:
			return "Stage：2B　Merge 「Rectangle Compartment」 into 「Polygon Compartment」. 分槽";
			break;
	}
}

function undo() {
	if(AutoAnalysis_sw)
		AutoAnalysisController();
		
	ClearPreview();
	for(var i=0; i<3 ; i++) {		//Rect + Dot
		CmdManager.undo();
	}
}

function redo() {
	if(AutoAnalysis_sw)
		AutoAnalysisController();
		
	ClearPreview();
	for(var i=0; i<3 ; i++) {		//Rect + Dot
		CmdManager.redo();
	}
}

function ShowPalaceLayout() {
	DrawPalaceLayout(PalaceLayoutSVG);
}

function ShowAllRules() {
	//var AllRuleObjs = jQuery.extend({}, Rules.getAllRules());
	var AllRuleObjs = Rules.getAllRules();
	
	DrawRuleHints(RuleExHeaderSVG);
	DrawAllRulesPattern(RuleExSVG, AllRuleObjs);
}