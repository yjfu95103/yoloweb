window.addEventListener("load", function () {
  var WIDTH = '4000';
  var HEIGHT = '4000';
  var translate = 'translate(' + (WIDTH / 5) + ',' + (0) + ')'
  // ---- rotate dog image-----------------------------------------------
  dx = 0, dy = 0 + 60 * 3 * Math.sin(45 * Math.PI / 180);
  a = 1, b = 0, c = 0, d = 1;
  sin30 = -Math.sin(30 * Math.PI / 180);
  sin60 = -Math.sin(60 * Math.PI / 180);
  matrix = [a, b, c, d, dx, dy];

  //------------------------------------------------------------------    
  // svg input image
  // var svg = d3.select("#inputImg")
  //   .append("svg")
  //   .attr('id', 'conv_svg')
  //   .attr('width', WIDTH)
  //   .attr('height', HEIGHT);

  // var svgInput = svg.append('g')
  //   .attr('transform', "matrix(" + [0.1, 0.3 * sin30, 0, 0.3, 100, 200] + ")")
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', 15)
  //   .attr('height', 15)
  //   .append('svg:image')
  //   .attr('class', 'image')
  //   .attr('xlink:href', './example/data/input.jpg')
  //   .style("opacity", 1);

  //------------------------------------------------------------------    
  // svg convolution table
  var svg = d3.select("#convSingle")
    .append("svg")
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  // var svgConv = svgtable.append('g')
  //   .attr('transform', "matrix(" + [0.1, 0.3 * sin30, 0, 0.3, 100, 200] + ")")

  // for (var i = 0; i < 13; i++) {
  //   for (var j = 0; j < 13; j++) {
  //     svgConv.append('rect')
  //       .attr('x', i * 34.8)
  //       .attr('y', j * 34.8)
  //       .attr('width', 34.8 / -sin30)
  //       .attr('height', 34.8);
  //   }
  // }
  // svgConv.attr('stroke', '#000000')
  //   .attr('fill', 'none')
  //   .style("opacity", 1);

  // function convCube(x, y, width, index){

  // }


  function makeCube(startX, startY, index, color, id) {
    // console.log(100 * Math.sin(30));
    var p1 = [startX, startY], //node 1,5
      p2 = [startX + index, startY], //node 2,8
      p3 = [startX + index, startY + index], //node 3,9
      p4 = [startX, startY + index], //node 4
      p5 = [startX + 0.5 * index, startY - 0.5 * index], //node 6
      p6 = [startX + 1.5 * index, startY - 0.5 * index], //node 7,11
      p7 = [startX + 1.5 * index, startY + 0.5 * index],
      p8 = [startX + 0.5 * index, startY + 0.5 * index]; //node 10
    // console.log(p1, p2, p5, p6, index)

    // cube_light.exit().remove();
    // cube.exit().remove();

    // var data = [
    //   { x: 200, y0: 200, y1: 300 },
    //   { x: 300, y0: 200, y1: 300 },
    // ];
    // var data1 = [
    //   { x: 200, y0: 200, y1: 200 },
    //   { x: 250, y0: 200, y1: 150 },
    //   { x: 300, y0: 200, y1: 150 },
    //   { x: 350, y0: 150, y1: 150 },
    // ];
    // var data2 = [
    //   { x: 300, y0: 200, y1: 300 },
    //   { x: 350, y0: 150, y1: 250 },
    // ];
    var data = [
      { x: p1[0] + 1, y0: p1[1] + 1, y1: p1[1] + index - 1 },
      { x: p1[0] + index - 1, y0: p1[1] + 1, y1: p1[1] + index - 1 },
    ];
    var data1 = [
      { x: p1[0] + 1, y0: p1[1] - 1, y1: p1[1] - 1 },
      { x: p1[0] + index / 2 + 1, y0: p1[1] - 1, y1: p1[1] - index / 2 + 1 },
      { x: p2[0] - 1, y0: p2[1] - 1, y1: p2[1] - index / 2 },
      { x: p2[0] + index / 2 - 1, y0: p2[1] - index / 2 - 1, y1: p2[1] - index / 2 - 1 },
    ];
    var data2 = [
      { x: p2[0] + 1, y0: p2[1] + 1, y1: p2[1] + index - 1 },
      { x: p6[0] - 1, y0: p6[1] + 1, y1: p6[1] + index - 1 },
    ];

    var area = d3.area()
      .x(function (d) { return d.x; })
      .y0(function (d) { return d.y0; })
      .y1(function (d) { return d.y1; });

    svg.append('path')
      .attr('class', 'cubein')
      .attr('id', 'area' + id)
      .attr("d", area(data))
      .attr("fill", color)
    svg.append('path')
      .attr('class', 'cubein')
      .attr('id', 'area1' + id)
      .attr("d", area(data1))
      .attr("fill", color)
    svg.append('path')
      .attr('class', 'cubein')
      .attr('id', 'area2' + id)
      .attr("d", area(data2))
      .attr("fill", color)

    var lineData = [
      p1, p2, p3, p4, p1,
      p5, p6, p2, p3, p7, p6,
      // p5, p8, p7, p3, p4, p8
    ];
    var line = d3.line();
    var cube = svg.append("path")
      .attr('class', 'cubes')
      .attr('id', 'cube')
      .attr("d", line(lineData))
      .attr("stroke", "#000000")
      .attr("stroke-width", "1.5px")
      .attr("fill", "#ffffff22")
      .attr("z-index", -50)
      .style("opacity", 0.8);

    var lineData_light = [
      p5, p8, p7, p8, p4
    ];
    var cube_light = svg.append("path")
      .attr('class', 'cubes')
      .attr('id', 'cube_')
      .attr("d", line(lineData_light))
      .attr("stroke", "#00000033")
      .attr("stroke-width", "1px")
      .attr("fill", "#ffffff22")
      .attr("z-index", -50)
      .style("opacity", 0.7);

    var myText = svg.append("text")
      .attr("y", startY + 20)//magic number here
      .attr("x", startX + 20)
      .attr('text-anchor', 'middle')
      .attr("class", "myLabel")//easy to style with CSS
      .text(id.split("input")[1]);

    // cube_light.exit().remove();
    // cube.exit().remove();

  }


  function createGroupCubes(d, w, h, startX, startY, index, color, id) {
    count = 0;
    for (var k = 0; k < d; k++) {
      for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
          makeCube(startX + index * k - j * index / 2, startY + i * index + j * index / 2, index, color, id + count);
          count += 1;
        }
      }
    }
  }

  // makeCube(50, 600, 50, "#ddffee", 'nn');
  function startCanvas(inputSize, convSize, outputSize) {
    createGroupCubes(1, inputSize, inputSize, 150, 200, 30, "#ffffff22", "input")

    createGroupCubes(1, convSize, convSize, 300, 400, 30, "#D8373770", "convR")
    createGroupCubes(1, convSize, convSize, 400, 250, 30, "#6dff8a70", "convG")
    createGroupCubes(1, convSize, convSize, 500, 100, 30, "#0000ff70", "convB")


    createGroupCubes(1, outputSize, outputSize, 650, 250, 30, "#D8373770", "outputR")
    createGroupCubes(1, outputSize, outputSize, 680, 250, 30, "#6dff8a70", "outputG")
    createGroupCubes(1, outputSize, outputSize, 710, 250, 30, "#0000ff70", "outputB")
  }

  function setColor(classType, id, changeColor, originColor, delaytime) {
    d3.select('#area' + id)
      .transition()
      .duration(1000)
      .delay(delaytime)
      .style("fill", changeColor)
      .transition()
      .duration(1000)
      .style("fill", originColor)
    d3.select('#area1' + id)
      .transition()
      .duration(1000)
      .delay(delaytime)
      .style("fill", changeColor)
      .transition()
      .duration(1000)
      .style("fill", originColor)
    d3.select('#area2' + id)
      .transition()
      .duration(1000)
      .delay(delaytime)
      .style("fill", changeColor)
      .transition()
      .duration(1000)
      .style("fill", originColor)
  }

  function drawStrike2conv55() {
    conv(0, 1000, '#D8373770');
    conv(-2, 2000, '#D8373770');
    conv(14, 3000, '#D8373770');
    conv(12, 4000, '#D8373770');

    conv(0, 5000, '#6dff8a70');
    conv(-2, 6000, '#6dff8a70');
    conv(14, 7000, '#6dff8a70');
    conv(12, 8000, '#6dff8a70');

    conv(0, 9000, '#0000ff70');
    conv(-2, 10000, '#0000ff70');
    conv(14, 11000, '#0000ff70');
    conv(12, 12000, '#0000ff70');
  }

  function drawStrike1conv55() {
    conv(0, 1000, '#D8373770');
    conv(-1, 2000, '#D8373770');
    conv(-2, 3000, '#D8373770');
    conv(7, 4000, '#D8373770');
    conv(6, 5000, '#D8373770');
    conv(5, 6000, '#D8373770');
    conv(14, 7000, '#D8373770');
    conv(13, 8000, '#D8373770');
    conv(12, 9000, '#D8373770');

    conv(0, 10000, '#6dff8a70');
    conv(-1, 11000, '#6dff8a70');
    conv(-2, 12000, '#6dff8a70');
    conv(7, 13000, '#6dff8a70');
    conv(6, 14000, '#6dff8a70');
    conv(5, 15000, '#6dff8a70');
    conv(14, 16000, '#6dff8a70');
    conv(13, 17000, '#6dff8a70');
    conv(12, 18000, '#6dff8a70');

    conv(0, 19000, '#0000ff70');
    conv(-1, 20000, '#0000ff70');
    conv(-2, 21000, '#0000ff70');
    conv(7, 22000, '#0000ff70');
    conv(6, 23000, '#0000ff70');
    conv(5, 24000, '#0000ff70');
    conv(14, 25000, '#0000ff70');
    conv(13, 26000, '#0000ff70');
    conv(12, 27000, '#0000ff70');
  }

  //----- create button -----------
  var button = d3.select('body')
    .append('button')
    .attr('id', 'button')
    .text("reset")
    .attr("style", "position:absolute; left:10px; top:10px;")

  // ----- create option ----------    
  var data = ["Strike 1", "Strike 2"];
  var select = d3.select('body')
    .append('select')
    .attr('class', 'select')
    .attr('id', 'strike')
    .attr("style", "position:absolute; left:60px; top:10px;")
    .on('change', onchange)

  var options = select
    .selectAll('option')
    .data(data).enter()
    .append('option')
    .text(function (d) { return d; });
  // ----- create option ----------   
  var data2 = ["conv 5", "conv 3"];
  var select2 = d3.select('body')
    .append('select')
    .attr('class', 'select')
    .attr('id', 'convo')
    .attr("style", "position:absolute; left:140px; top:10px;")
    .on('change', onchange)

  var options2 = select2
    .selectAll('option')
    .data(data2).enter()
    .append('option')
    .text(function (d) { return d; });
  // ----- create option ----------   
  var data3 = ["input 1", "input 2"];
  var select3 = d3.select('body')
    .append('select')
    .attr('class', 'select')
    .attr('id', 'input')
    .attr("style", "position:absolute; left:215px; top:10px;")
    .on('change', onchange)

  var options3 = select3
    .selectAll('option')
    .data(data3).enter()
    .append('option')
    .text(function (d) { return d; });
  // // ---------------------------------------
  function onchange() {
    var selectValue = d3.select('#strike').property('value')
    var convValue = d3.select('#convo').property('value')
    var inputValue = d3.select('#input').property('value')
    // if (selectValue == 'Strike 1') {
    //   drawStrike1conv55();
    // } else {
    //   drawStrike2conv55();
    // }
    if (convValue == "conv 3") {
      svg.selectAll("*").remove();
      startCanvas(7, 3, 3);
      if (selectValue == 'Strike 1') {
        drawStrike1conv55();
      } else {
        drawStrike2conv55();
      }
    } else {
      svg.selectAll("*").remove();
      startCanvas(7, 5, 5);
      if (selectValue == 'Strike 1') {
        drawStrike1conv55();
      } else {
        drawStrike2conv55();
      }
    }


    d3.select("#textValue").remove()
    d3.select('body')
      .append('p')
      .attr('id', 'textValue')
      .attr("style", "position:absolute; left:10px; top:30px;")
      .text(selectValue + "," + convValue + ',' + inputValue + ' is the last selected option.')
  };

  d3.select('select').on('change', onchange);
  d3.select('#button').on("click", function () {
    console.log('reset')
    svg.selectAll("*").remove();
    // startCanvas(7, 3, 3);
    startCanvas(7, 5, 5);
  })

  startCanvas(7, 5, 5);
  // strikeOne();
  function conv(i, delaytime, changeColor) {
    setColor("", 'input' + (6 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (5 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (4 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (3 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (2 + i), changeColor, "#ffffff22", delaytime);

    setColor("", 'input' + (13 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (12 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (11 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (10 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (9 + i), changeColor, "#ffffff22", delaytime);

    setColor("", 'input' + (20 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (19 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (18 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (17 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (16 + i), changeColor, "#ffffff22", delaytime);

    setColor("", 'input' + (27 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (26 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (25 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (24 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (23 + i), changeColor, "#ffffff22", delaytime);

    setColor("", 'input' + (34 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (33 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (32 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (31 + i), changeColor, "#ffffff22", delaytime);
    setColor("", 'input' + (30 + i), changeColor, "#ffffff22", delaytime);
  }



  // drawStrike1conv55();
  drawStrike1conv55();


}, false);

