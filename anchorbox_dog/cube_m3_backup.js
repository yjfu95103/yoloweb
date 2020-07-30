// window.addEventListener("load", function() {
window.onload = function f() {
    var origin = [600, 410], scale = 20, cubesData = [], linesData = [], front = [], end = [], alpha = 0, beta = 0, startAngle = Math.PI / 6;
    // var svg    = d3.select('#svgCube').call(d3.drag()
    //                         .on('drag', dragged)
    //                         .on('start', dragStart)
    //                         .on('end', dragEnd));
    var svg = d3.select('#svgCube').append('g');
    // var color  = d3.scaleOrdinal(d3.schemeCategory20);
    // var cubesGroup = svg.append('g').attr('class', 'cubes');
    var mx, my, mouseX, mouseY;

    //------------------------------------------
    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        .z(function (d) { return d.z; })
        // .rotateY( startAngle)
        // .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);

    var lines3D = d3._3d()
        .shape('LINE_STRIP')
        .origin(origin)
        .rotateY(startAngle)
        .rotateX(-startAngle)
        .scale(scale);
    //---------------------------------------
    function processData(data, tt, setColor) {
        /* --------- CUBES ---------*/
        var cubes = svg.selectAll('g.cube').data(data[0], function (d) { return d.id });
        var ce = cubes
            .enter()
            .append('g')
            .attr('id', function (d) { return d.id })
            .attr('class', '_3d cube')
            .attr('fill', setColor)
            .attr('stroke', 'black')
            .merge(cubes);

        cubes.exit().remove();
        /* --------- FACES ---------*/
        var faces = cubes.merge(ce).selectAll('path.face').data(function (d) { return d.faces; }, function (d) { return d.face; });
        // console.log("faces:",faces)
        faces.enter()
            .append('path')
            .attr('class', 'face')
            .attr('fill-opacity', 0.95)
            .classed('_3d', true)
            .merge(faces)
            .transition().duration(tt)
            .attr('d', cubes3D.draw);

        faces.exit().remove();
        /* --------- LINES ---------*/
        var lines = svg.selectAll('path.line').data(data[1]);

        lines
            .enter()
            .append('path')
            .attr('class', '_3d line')
            .attr('id', function (d, i) { return ('line_' + i); })
            .merge(lines)
            .attr('fill', '#aaaaff00')
            // .attr('stroke', '#afabff')
            .attr('stroke-width', 1)
            .attr('d', lines3D.draw);

        lines.exit().remove();

        ce.selectAll('._3d').sort(d3._3d().sort);

    }


    function setCube(xSize, ySize, zSize, index, dx, dy, dz, cubesData, id) {
        var cnt = 0;
        var x = 0;
        var linesData = 0;
        front = [], end = [];
        for (var z = zSize / 2; z > -zSize / 2; z--) {
            for (var y = ySize / 2; y > -ySize / 2; y--) {
                for (var x = xSize / 2; x > -xSize / 2; x--) {
                    // var index = d3.randomUniform(2, 4)();
                    linesData = seprateCube(x + 0.5 + dx, y + 0.5 + dy, z + 0.5 + dz, index);
                    front = front.concat(linesData[0]);
                    end = end.concat(linesData[1]);
                    // console.log("front",front);
                    // console.log("end",end);
                    front = uniqBy(front, JSON.stringify)
                    end = uniqBy(end, JSON.stringify)
                    var _cube = makeCube(x + 0.5 + dx, y + 0.5 + dy, z + 0.5 + dz, index);
                    _cube.id = 'cube_' + (cnt++) + '_' + id;
                    _cube.height = index;
                    cubesData.push(_cube);
                    // console.log(x+0.5, y+0.5, z+0.5);
                }

            }
        }
        // console.log("front",front);
        // console.log("end",end);
        var result = [cubesData, front, end];
        return result;
    }

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function (item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }


    function init() {
        cubesData = [];
        linesData = [];
        var inputfront = [], filterback = [], filterfront = [], outputback = [], linesData2 = [];;
        cubesData = setCube(13, 13, 1, 1, 0, 0, 0, cubesData, 'input')

        var allData = [
            cubes3D.rotateY(0).rotateX(0)(cubesData[0]),
            // cubes3D.rotateY(2.5).rotateX(0.3)(cubesData[0]),
            lines3D.rotateY(2.5).rotateX(-0.1)(linesData)
        ];
        processData(allData, 0, '#6beaf32f');
    }

    function dragStart() {
        mx = d3.event.x;
        my = d3.event.y;
    }

    function dragged() {
        mouseX = mouseX || 0;
        mouseY = mouseY || 0;
        beta = (d3.event.x - mx + mouseX) * Math.PI / 230;
        alpha = (d3.event.y - my + mouseY) * Math.PI / 230 * (-1);

        var allData = [
            // cubes3D(cubesData[0]), 
            cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]),
            lines3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(linesData)

        ];

        processData(allData, 0, '#6beaf32f');

        // processData(cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]), 0, '#6beaf32f');
    }

    function dragEnd() {
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    function makeCube(x, y, z, index) {
        // console.log(
        //     {x: x - index/2  , y: y + index/2 , z: z + index/2 }, // FRONT TOP LEFT
        //     {x: x - index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM LEFT
        //     {x: x + index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM RIGHT
        //     {x: x + index/2 , y: y + index/2 , z: z + index/2 }, // FRONT TOP RIGHT
        //     {x: x - index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP LEFT
        //     {x: x - index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM LEFT
        //     {x: x + index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM RIGHT
        //     {x: x + index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP RIGHT
        // );

        return [
            { x: x - index / 2, y: y + index / 2, z: z + index / 2 }, // FRONT TOP LEFT
            { x: x - index / 2, y: y - index / 2, z: z + index / 2 }, // FRONT BOTTOM LEFT
            { x: x + index / 2, y: y - index / 2, z: z + index / 2 }, // FRONT BOTTOM RIGHT
            { x: x + index / 2, y: y + index / 2, z: z + index / 2 }, // FRONT TOP RIGHT
            { x: x - index / 2, y: y + index / 2, z: z - index / 2 }, // BACK  TOP LEFT
            { x: x - index / 2, y: y - index / 2, z: z - index / 2 }, // BACK  BOTTOM LEFT
            { x: x + index / 2, y: y - index / 2, z: z - index / 2 }, // BACK  BOTTOM RIGHT
            { x: x + index / 2, y: y + index / 2, z: z - index / 2 }, // BACK  TOP RIGHT
        ];
    }

    function seprateCube(x, y, z, index) {
        var points = [
            [x - index / 2, y + index / 2, z + index / 2], // FRONT TOP LEFT
            [x - index / 2, y - index / 2, z + index / 2], // FRONT BOTTOM LEFT
            [x + index / 2, y - index / 2, z + index / 2], // FRONT BOTTOM RIGHT
            [x + index / 2, y + index / 2, z + index / 2], // FRONT TOP RIGHT
            [x - index / 2, y + index / 2, z - index / 2], // BACK  TOP LEFT
            [x - index / 2, y - index / 2, z - index / 2], // BACK  BOTTOM LEFT
            [x + index / 2, y - index / 2, z - index / 2], // BACK  BOTTOM RIGHT
            [x + index / 2, y + index / 2, z - index / 2], // BACK  TOP RIGHT
        ]
        var frontPoint = [], endPoint = [];
        // console.log("points.length:",points.length)

        for (var i = 0; i < points.length; i++) {
            if (i < 4) {
                frontPoint.push(points[i]);
            } else {
                endPoint.push(points[i]);
            }
        }
        return [frontPoint, endPoint]
    }


    function conv(i, delaytime) {
        setColor('conv', '#cube_' + (i + 0) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 1) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 2) + '_input', 'noneColor', delaytime);

        setColor('conv', '#cube_' + (i + 5) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 6) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 7) + '_input', 'noneColor', delaytime);

        setColor('conv', '#cube_' + (i + 10) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 11) + '_input', 'noneColor', delaytime);
        setColor('conv', '#cube_' + (i + 12) + '_input', 'noneColor', delaytime);
    }

    function imageSet() {
        // dx = 0, dy = 0 + 60 * 3* Math.sin(45 * Math.PI/180);
        // a = 1, b = 0, c = 0, d = 1;
        // b = -Math.sin(30 * Math.PI/180);
        // b2 = -Math.sin(60 * Math.PI/180);
        // matrix = [a, b, c, d, dx, dy];
        svg.append('g')
            // .attr('class', 'convImg')
            // .attr('id', 'conv'+layer+'_'+id)
            .attr('transform', "matrix(" + [0.226, 0, 0, 0.34, 80, 300] + ")")
            .attr('x', 1)
            .attr('y', 1)
            .attr('width', 10)
            .attr('height', 10)
            .append('svg:image')
            .attr('class', 'anchorImg')
            .attr('id', 'anchorImg')
            .attr('xlink:href', 'input.jpg')
            .style("opacity", 0.8);
    }


    function table() {
        var svg_table_conv = svg.append('g')
            .attr('transform', "matrix(" + [0.5, 0, 0, 0.5, 80, 300] + ")")

        for (var i = 0; i < 13; i++) {
            for (var j = 0; j < 13; j++) {
                var svg_table_box = svg_table_conv.append('rect')
                    .attr('class', 'tableRect')
                    .attr('id', 'rect_' + i + '_' + j)
                    .attr('stroke', '#aafaaa')
                    .attr('fill', '#aafaaa00')
                    .attr('x', i * 40)
                    .attr('y', j * 40)
                    .attr('width', 40)
                    .attr('height', 40)
            }
        }
        svg_table_conv.attr('stroke', '#aafaaa')
            .attr('fill', 'none')
            .style("opacity", 1);
    }


    //----- create button -----------
    // var button = d3.select('body')
    //     .append('button')
    //     .attr('id', 'button')
    //     .text("reset")
    //     .attr("style", "position:absolute; left:10px; top:10px;")

    // ----- create option ----------    
    // var data = ["Strike 1", "Strike 2"];
    // var select = d3.select('body')
    // .append('select')
    //     .attr('class','select')
    //     .attr('id','strike')
    //     .attr("style", "position:absolute; left:60px; top:10px;")
    //     .on('change',onchange)

    // var options = select
    //     .selectAll('option')
    //     .data(data).enter()
    //     .append('option')
    //     .text(function (d) { return d; });
    // // ----- create option ----------   
    // var data2 = ["conv 1", "conv 2", "conv 3"];
    // var select2 = d3.select('body')
    // .append('select')
    //     .attr('class','select')
    //     .attr('id','conv')
    //     .attr("style", "position:absolute; left:140px; top:10px;")
    //     .on('change',onchange)

    // var options2 = select2
    //     .selectAll('option')
    //     .data(data2).enter()
    //     .append('option')
    //     .text(function (d) { return d; }); 
    // ---------------------------------------
    // function onchange() {
    //     var selectValue = d3.select('#strike').property('value')
    //     var convValue = d3.select('#conv').property('value')
    //     d3.select("#textValue").remove()
    //     d3.select('body')
    //         .append('p')
    //         .attr('id', 'textValue')
    //         .attr("style", "position:absolute; left:10px; top:30px;")
    //         .text(selectValue + "," + convValue + ' is the last selected option.');
    // d3.select("#anchorText").remove()
    // d3.select('body')
    //     .append('p')
    //     .attr('id', 'anchorText')
    //     .attr("style", "position:absolute; left:10px; top:40px;")
    //     .text(selectValue + "," + convValue + ' is the last selected option.');
    // };




    d3.select('select').on('change', onchange);
    d3.select('#button').on('click', init);

    init(); //main function to create svg cube 
    imageSet();
    table();
    var anchor_box_data = [14.661888, 17.341056,
        47.986176, 52.800768,
        85.463808, 140.143104,
        201.800192, 90.311168,
        250.125312, 234.707968];
    
    var centerX = 50, centerY = 50;

    var anchor_box_1 = svg.append('rect')
        .attr('id', 'anchorBox_1')
        .attr('stroke', '#ff0000')
        .attr('fill', 'none')
        .attr('stroke-width', '3')
        .attr('x', 30)
        .attr('y', 90)
        .attr('width', anchor_box_data[0])
        .attr('height', anchor_box_data[1]);
    var anchor_box_2 = svg.append('rect')
        .attr('id', 'anchorBox_2')
        .attr('stroke', '#00ffff')
        .attr('fill', 'none')
        .attr('stroke-width', '3')
        .attr('x', 70)
        .attr('y', 70)
        .attr('width', anchor_box_data[2])
        .attr('height', anchor_box_data[3]);
    var anchor_box_3 = svg.append('rect')
        .attr('id', 'anchorBox_3')
        .attr('stroke', '#0000ff')
        .attr('fill', 'none')
        .attr('stroke-width', '3')
        .attr('x', 140)
        .attr('y', 30)
        .attr('width', anchor_box_data[4])
        .attr('height', anchor_box_data[5]);
    var anchor_box_4 = svg.append('rect')
        .attr('id', 'anchorBox_4')
        .attr('stroke', '#ffff00')
        .attr('fill', 'none')
        .attr('stroke-width', '3')
        .attr('x', 250)
        .attr('y', 50)
        .attr('width', anchor_box_data[6])
        .attr('height', anchor_box_data[7]);
    var anchor_box_5 = svg.append('rect')
        .attr('id', 'anchorBox_5')
        .attr('stroke', '#ff00ff')
        .attr('fill', 'none')
        .attr('stroke-width', '3')
        .attr('x', 490)
        .attr('y', 10)
        .attr('width', anchor_box_data[8])
        .attr('height', anchor_box_data[9]);

    var toggleSelected = true;
    
    function anchor_box(left_rect, right_rect){
        // d3.selectAll("#rect_3_7 , #cube_74_input")
        d3.selectAll('#'+left_rect, '#'+right_rect)
        .on("click", function () {
            if (toggleSelected == true) {
                toggleSelected = false;
                msa = d3.select(this).attr('id');
                // var coor = d3.mouse(this)
                // console.log(coor[0], coor[1]);
                anchor_box_1
                    .transition()
                    .duration(1000)
                    // .attr('x', 150 - anchor_box_data[0] / 2)
                    // .attr('y', 450 - anchor_box_data[1] / 2);
                anchor_box_2
                    .transition()
                    .duration(1000)
                    // .attr('x', 150 - anchor_box_data[2] / 2)
                    // .attr('y', 450 - anchor_box_data[3] / 2);
                anchor_box_3
                    .transition()
                    .duration(1000)
                    .attr('x', 150 - anchor_box_data[4] / 2)
                    .attr('y', 450 - anchor_box_data[5] / 2);
                anchor_box_4
                    .transition()
                    .duration(1000)
                    // .attr('x', 150 - anchor_box_data[6] / 2)
                    // .attr('y', 450 - anchor_box_data[7] / 2);
                anchor_box_5
                    .transition()
                    .duration(1000)
                    // .attr('x', 150 - anchor_box_data[8] / 2)
                    // .attr('y', 450 - anchor_box_data[9] / 2);
                console.log(d3.event);
                d3.select('body')
                    .append('p')
                    .attr('id', 'anchor1Text')
                    .attr("style", "position:absolute; left:10px; top:600px;")
                    .text('1'+'dx:' + 112 + ' dy:' + 236.8 + ' dw:' + anchor_box_data[0] + ' dh:' + anchor_box_data[1]+' '+'0,0,0,0,0,0,0,0,0,0...,0,0');
                d3.select('body')
                    .append('p')
                    .attr('id', 'anchor2Text')
                    .attr("style", "position:absolute; left:10px; top:620px;")
                    .text('2'+'dx:' + 112 + ' dy:' + 236.8 + ' dw:' + anchor_box_data[2] + ' dh:' + anchor_box_data[3]+' '+'0,0,0,0,0,0,0,0,0,0...,0,0');
                d3.select('body')
                    .append('p')
                    .attr('id', 'anchor3Text')
                    .attr("style", "position:absolute; left:10px; top:640px;")
                    .text('3'+'dx:' + 112 + ' dy:' + 236.8 + ' dw:' + anchor_box_data[4] + ' dh:' + anchor_box_data[5]+' '+'0,0,0,86.5%,0,0,0,0,0,0...,0,0');
                d3.select('body')
                    .append('p')
                    .attr('id', 'anchor4Text')
                    .attr("style", "position:absolute; left:10px; top:660px;")
                    .text('4'+'dx:' + 112 + ' dy:' + 236.8 + ' dw:' + anchor_box_data[6] + ' dh:' + anchor_box_data[7]+' '+'0,0,0,0,0,0,0,0,0,0...,0,0');
                d3.select('body')
                    .append('p')
                    .attr('id', 'anchor5Text')
                    .attr("style", "position:absolute; left:10px; top:680px;")
                    .text('5'+'dx:' + 112 + ' dy:' + 236.8 + ' dw:' + anchor_box_data[8] + ' dh:' + anchor_box_data[9]+' '+'0,0,0,0,0,0,0,0,0,0...,0,0');

            } else {
                toggleSelected = true;
                msa = d3.select(this).attr('id');
                console.log(msa);
                if (msa == "cube_74_input") {

                } else {
                    d3.select(this)
                        .attr('stroke', '#aafaaa')
                        .attr('fill', '#aafaaa00')
                }
                anchor_box_1.transition()
                    .duration(1000)
                    .attr('x', 30)
                    .attr('y', 90);
                anchor_box_2.transition()
                    .duration(1000)
                    .attr('x', 70)
                    .attr('y', 70);
                anchor_box_3
                    .transition()
                    .duration(1000)
                    .attr('x', 140)
                    .attr('y', 30);
                anchor_box_4
                    .transition()
                    .duration(1000)
                    .attr('x', 250)
                    .attr('y', 50);
                anchor_box_5
                    .transition()
                    .duration(1000)
                    .attr('x', 490)
                    .attr('y', 10);
                d3.select("#anchor1Text").remove()
                d3.select("#anchor2Text").remove()
                d3.select("#anchor3Text").remove()
                d3.select("#anchor4Text").remove()
                d3.select("#anchor5Text").remove()
            }

        })
    };
    // anchor_box();
    anchor_box("rect_3_7" , "cube_74_input")

    // d3.csv("http://localhost:3000/output.csv", function(data) {
    //     console.log(data);
    // });

    d3.text("anchor.txt", function(error, text) {
        if (error) throw error;
        console.log(text); // Hello, world!
      });


}
// },false);