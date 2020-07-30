//function之後改名成DrawXXX
function DrawRect(Src, x, y) {
	var rect_t = Src.append("rect")
					.attr("x", x)
					.attr("y", y)
					.attr("width", 100)
					.attr("height", 50)
					.attr("fill", "white")
					.attr("stroke", "black")
					.attr("stroke-width", 2);
	return rect_t;
}

function DrawRect_T(Src, x, y, width, height) {
	var rect_t = Src.append("rect")
					.attr("x", x)
					.attr("y", y)
					.attr("width", width)
					.attr("height", height)
					.attr("fill", "white")
					.attr("stroke", "black")
					.attr("stroke-width", 2);
	return rect_t;
}

//Filled L to R
function DrawCircle_F(Src, cirData) {
	var circles = Src.selectAll(".circle")
					.data(cirData)
					.enter()
					.append("circle");

	var circleAttributes = circles.attr("cx", function (d) { return d.x; })
								.attr("cy", function (d) { return d.y; })
								.attr("r", 7)
								.style("fill", "black");
	
	return circles;
}

//Stroke
function DrawCircle_S(Src, cirData) {
	var circles = Src.selectAll(".circle")
					.data(cirData)
					.enter()
					.append("circle");
					
	var circleAttributes = circles.attr("cx", function (d) { return d.x; })
								.attr("cy", function (d) { return d.y; })
								.attr("r", 5)
								.style("stroke", "black")
								.style("fill", "white")
								.attr("stroke-width", 2);
					
	return circles;
}

function DrawLine_col(Src, x, y1, y2) {
	var line_col = Src.append("line")
					.attr("x1", x)
					.attr("y1", y1)
					.attr("x2", x)
					.attr("y2", y2)
					.attr("stroke-width", 2)
					.attr("stroke", "black");
					
	return line_col;
}

function DrawLine_row(Src, y, x1 ,x2) {
	var line_row = Src.append("line")
					.attr("x1", x1)
					.attr("y1", y)
					.attr("x2", x2)
					.attr("y2", y)
					.attr("stroke", "black")
					.attr("stroke-width", 2);
	return line_row;
}

function DrawDashline(Src, x, y1, y2) {
	var dashline_t = Src.append("line")
						.attr("x1", x)
						.attr("y1", y1)
						.attr("x2", x)
						.attr("y2", y2)
						.attr("stroke-dasharray", "20, 10")
						.attr("stroke", "black")
						.attr("stroke-width", 2);
	return dashline_t;
}

function DrawDashline_S(Src, x1, x2, y1, y2) {
	var dashline_t = Src.append("line")
						.attr("x1", x1)
						.attr("y1", y1)
						.attr("x2", x2)
						.attr("y2", y2)
						.attr("stroke-dasharray", "5, 3")
						.attr("stroke", "black")
						.attr("stroke-width", 2);
	return dashline_t;
}

function DrawLineGraph(Src, lineData) {
	//This is the accessor function
	var lineFunction = d3.svg.line()
						.x(function(d) { return d.x; })
						.y(function(d) { return d.y; })
						.interpolate("linear");
						
	var lineGraph_t = Src.append("path")
						.attr("d", lineFunction(lineData))
						.attr("stroke", "black")
						.attr("stroke-width", 2)
						.attr("fill", "none");
	
	return lineGraph_t;
}

function DrawText(Src, str, x, y) {
	var text_t = Src.append("text")
						.attr("x", x)
						.attr("y", y)
						.attr("font-family", "sans-serif")
						.attr("font-size", "24")
						.attr("fill", "black")
						.text(str);
	return text_t;
}