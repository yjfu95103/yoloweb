// window.addEventListener("load", function() {
window.onload = function f() {
    var origin = [100, 100], scale = 20, alpha = 0, beta = 0, startAngle = Math.PI / 6;
    // var svg    = d3.select('#svgCube').call(d3.drag()
    //                         .on('drag', dragged)
    //                         .on('start', dragStart)
    //                         .on('end', dragEnd));
    var svg = d3.select('#svgCube').append('g');
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    // var cubesGroup = svg.append('g').attr('class', 'cubes');
    var mx, my, mouseX, mouseY;

    //------------------------------------------
    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function (d) { return d.x; })
        .y(function (d) { return d.y; })
        .z(function (d) { return d.z; })
        .rotateY(startAngle)
        .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);

    //---------------------------------------
    function processData(data, tt) {
        /* --------- CUBES ---------*/
        var cubes = svg.selectAll('g.cube').data(data, function (d) { return d.id });
        var ce = cubes
            .enter()
            .append('g')
            .attr('id', function (d) { return d.id })
            .attr('class', '_3d cube')
            .attr('fill', function (d) { return d.color })
            .attr('stroke', 'black')
            // .attr('stroke', function(d){ return d3.color(color(d.id)).darker(2); })
            .merge(cubes);
        // .sort(cubes3D.sort);

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

        ce.selectAll('._3d').sort(d3._3d().sort);

    }

    function setCube(xSize, ySize, zSize, dx, dy, dz, cubesData, id, color) {
        var cnt = 0;
        var x = 0;
        var index = 1;
        for (var z = zSize / 2; z > -zSize / 2; z--) {
            for (var y = ySize / 2; y > -ySize / 2; y--) {
                for (var x = xSize / 2; x > -xSize / 2; x--) {
                    var _cube = makeCube(x + 0.5 + dx, y + 0.5 + dy, z + 0.5 + dz, index);
                    _cube.id = 'cube_' + (cnt++) + '_' + id;
                    _cube.height = index;
                    _cube.color = color;
                    cubesData.push(_cube);
                    // console.log(x+0.5, y+0.5, z+0.5);
                }

            }
        }

        return cubesData;
    }


    function init(inputSize, convSize, outputSize) {
        cubesData = [];
        // cubesData = setCube(5,5,1,0,6,0,cubesData,'input','#6beaf32f')        

        // cubesData = setCube(3,3,1,-10,6,10,cubesData,'filter0','#D83737dd')
        // cubesData = setCube(3,3,1,0,6,10,cubesData,'filter1','#6dff8add')
        // cubesData = setCube(3,3,1,10,6,10,cubesData,'filter2','#0000ffdd')

        // cubesData = setCube(3,3,1,0,6,20,cubesData,'output','#D83737dd')  
        // cubesData = setCube(3,3,1,0,6,21,cubesData,'output','#6dff8add') 
        // cubesData = setCube(3,3,1,0,6,22,cubesData,'output','#0000ffdd') 

        cubesData = setCube(inputSize, inputSize, 1, 0, 6, 0, cubesData, 'input', '#6beaf32f')

        cubesData = setCube(convSize, convSize, 1, -10, 6, 10, cubesData, 'filter0', '#D83737dd')
        cubesData = setCube(convSize, convSize, 1, 0, 6, 10, cubesData, 'filter1', '#6dff8add')
        cubesData = setCube(convSize, convSize, 1, 10, 6, 10, cubesData, 'filter2', '#0000ffdd')

        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 20, cubesData, 'output', '#D83737dd')
        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 21, cubesData, 'output', '#6dff8add')
        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 22, cubesData, 'output', '#0000ffdd')
        processData(cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData), 1000);

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
            cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]),
            lines3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(linesData)

        ];

        processData(allData, 0);

        // processData(cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]), 0, '#6beaf32f');
    }

    function dragEnd() {
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    function makeCube(x, y, z, index) {

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

    function setColorAnimation(classType, id, chageColor, delaytime) {
        if (classType == 'cube') {
            d3.select(id)
                .transition()
                .duration(0)
                .delay(1000 * delaytime)
                .style("fill", chageColor)
                .transition()
                .duration(1000)
                .style("fill", '#6beaf32f')
        }
        else if (classType == 'conv') {
            d3.select(id)
                .transition()
                .duration(0)
                .delay(1000 * delaytime)
                // .style("fill", function(d){ return color(d.id)})
                .style("fill", chageColor)
                .transition()
                .duration(1000)
                .style("fill", '#6beaf32f')
        } else if (classType == 'line') {
            d3.select(id)
                .transition()
                .duration(0)
                .delay(1000 * delaytime)
                .style("stroke", function (d) { return color((Math.random() * 10)) })
                // .style("stroke", '#afabff')
                // .style("stroke", chageColor)
                .transition()
                .duration(1000)
                .style("stroke", '#6beaf300')
        } else {
            d3.select(id)
                .transition()
                .duration(0)
                .delay(1000 * delaytime)
                .style("stroke", '#6beaf3')
                .transition()
                .duration(1000)
                // .attr('stroke', '#afabff')
                .attr('stroke', '#6beaf3')
            console.log('ok')
        }
    }

    // function filter() {
    //     d3.select('#cube_0_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_1_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_2_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_3_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_4_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_5_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_6_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_7_filter').style("fill", '#ddeedde2')
    //     d3.select('#cube_8_filter').style("fill", '#ddeedde2')
    // }

    function conv33(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);

        setColorAnimation('conv', '#cube_' + (i + 5) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 6) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);

        setColorAnimation('conv', '#cube_' + (i + 10) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 11) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 12) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 3) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 4) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 8) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 9) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 10) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 11) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 14) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 15) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 16) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 17) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 18) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 21) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 22) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 23) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 24) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 25) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 28) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 29) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 30) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 31) + '_input', changeColor, delaytime);
        // setColorAnimation('conv', '#cube_' + (i + 32) + '_input', changeColor, delaytime);
    }
    function conv44(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);

        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);

        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);

        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
    }
    //--------- strike -----------------------
    function strikeOne(convValue, inputValue) {
        for (var i = 0; i < 10000; i++) {
            var times = i + 1;
            // console.log(times%3);
            var changeColor = '000000'
            if (times % 3 == 0) {
                changeColor = '#D83737dd';
            } else if (times % 3 == 1) {
                changeColor = '#6dff8add';
            } else if (times % 3 == 2) {
                changeColor = '#0000ff';
            }
            // conv(16, 1 + 9 * i, changeColor);
            // conv(15, 2 + 9 * i, changeColor);
            // conv(14, 3 + 9 * i, changeColor);
            // conv(9, 8 + 9 * i, changeColor);
            // conv(8, 9 + 9 * i, changeColor);
            // conv(7, 10 + 9 * i, changeColor);
            // conv(2, 15 + 9 * i, changeColor);
            // conv(1, 16 + 9 * i, changeColor);
            // conv(0, 17 + 9 * i, changeColor);
            if (convValue == "conv 3") {
                conv33(12, 1 + 9 * i, changeColor);
                conv33(11, 2 + 9 * i, changeColor);
                conv33(10, 3 + 9 * i, changeColor);
                conv33(7, 4 + 9 * i, changeColor);
                conv33(6, 5 + 9 * i, changeColor);
                conv33(5, 6 + 9 * i, changeColor);
                conv33(2, 7 + 9 * i, changeColor);
                conv33(1, 8 + 9 * i, changeColor);
                conv33(0, 9 + 9 * i, changeColor);
            }
            if (convValue == "conv 2") {
                conv44(18, 1 + 16 * i, changeColor);
                conv44(17, 2 + 16 * i, changeColor);
                conv44(16, 3 + 16 * i, changeColor);
                conv44(15, 4 + 16 * i, changeColor);
                conv44(13, 5 + 16 * i, changeColor);
                conv44(12, 6 + 16 * i, changeColor);
                conv44(11, 7 + 16 * i, changeColor);
                conv44(10, 8 + 16 * i, changeColor);
                conv44(8, 9 + 16 * i, changeColor);
                conv44(7, 10 + 16 * i, changeColor);
                conv44(6, 11 + 16 * i, changeColor);
                conv44(5, 12 + 16 * i, changeColor);
                conv44(3, 13 + 16 * i, changeColor);
                conv44(2, 14 + 16 * i, changeColor);
                conv44(1, 15 + 16 * i, changeColor);
                conv44(0, 16 + 16 * i, changeColor);
            }


        }
    }

    function strikeTwo(convValue, inputValue) {
        for (var i = 0; i < 10000; i++) {
            var times = i + 1;
            // console.log(times%3);
            var changeColor = '000000'
            if (times % 3 == 0) {
                changeColor = '#D83737dd';
            } else if (times % 3 == 1) {
                changeColor = '#6dff8add';
            } else if (times % 3 == 2) {
                changeColor = '#0000ff';
            }
            if (convValue == "conv 3") {
                conv33(12, 1 + 4 * i, changeColor);
                conv33(10, 2 + 4 * i, changeColor);
                conv33(2, 3 + 4 * i, changeColor);
                conv33(0, 4 + 4 * i, changeColor);
            }
            if (convValue == "conv 2") {
                conv44(24, 1 + 9 * i, changeColor);
                conv44(22, 2 + 9 * i, changeColor);
                conv44(20, 3 + 9 * i, changeColor);
                conv44(14, 4 + 9 * i, changeColor);
                conv44(12, 5 + 9 * i, changeColor);
                conv44(10, 6 + 9 * i, changeColor);
                conv44(4, 7 + 9 * i, changeColor);
                conv44(2, 8 + 9 * i, changeColor);
                conv44(0, 9 + 9 * i, changeColor);
            }

        }
    }
    //----------------------------------


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
    var data2 = ["conv 3", "conv 2"];
    var select2 = d3.select('body')
        .append('select')
        .attr('class', 'select')
        .attr('id', 'conv')
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
        var convValue = d3.select('#conv').property('value')
        var inputValue = d3.select('#input').property('value')

        if (selectValue == 'Strike 1') {
            // strikeOne(convValue, inputValue);
        } else {
            // strikeTwo(convValue, inputValue);
        }
        d3.select("#textValue").remove()
        d3.select('body')
            .append('p')
            .attr('id', 'textValue')
            .attr("style", "position:absolute; left:10px; top:30px;")
            .text(selectValue + "," + convValue + ',' + inputValue + ' is the last selected option.')
    };



    d3.select('select').on('change', onchange)
    // d3.select('#button').on('click', init);
    d3.select('#button').on("click", function () {
        init(5, 3, 3);
        console.log('reset')
    })


    init(5, 3, 3); //main function to create svg cube 

    // strikeOne("conv 2", "input 1"); //set cube strike 1 
    // filter(); //add color to filter










}
// }, false);