// window.addEventListener("load", function() {
window.onload = function f() {
    var origin = [200, 100], scale = 20, cubesData = [], linesData = [], front = [], end = [], alpha = 0, beta = 0, startAngle = Math.PI / 6;
    var svg = d3.select('#svgCube').call(d3.drag()
        .on('drag', dragged)
        .on('start', dragStart)
        .on('end', dragEnd));
    // var svg = d3.select('#svgCube').append('g');
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

    var lines3D = d3._3d()
        .shape('LINE_STRIP')
        .origin(origin)
        .rotateY(startAngle)
        .rotateX(-startAngle)
        .scale(scale);
    //---------------------------------------
    function processData(data, tt) {
        /* --------- CUBES ---------*/
        var cubes = svg.selectAll('g.cube').data(data[0], function (d) { return d.id });
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
        /* --------- LINES ---------*/
        var lines = svg.selectAll('path.line').data(data[1]);
        lines
            .enter()
            .append('path')
            .attr('class', '_3d line')
            .attr('id', function (d, i) { return ('line_' + i); })
            .merge(lines)
            // .attr('fill', '#aaaaff00')
            .attr('stroke', '#afabff')
            .attr('stroke-width', 1)
            .attr('d', lines3D.draw);
        lines.exit().remove();
        /* ----------- Text ----------- */
        // var texts = cubes.merge(ce).selectAll('text.text').data(function(d){
        //     var _t = d.faces.filter(function(d){
        //         return d.face === 'top';
        //     });
        //     return [{height: d.height, centroid: _t[0].centroid}];
        // });

        // texts
        //     .enter()
        //     .append('text')
        //     .attr('class', 'text')
        //     .attr('dy', '-1.7em')
        //     .attr('text-anchor', 'middle')
        //     .attr('font-family', 'sans-serif')
        //     .attr('font-weight', 'bolder')
        //     .attr('x', function(d){ return origin[0] + scale * d.centroid.x })
        //     .attr('y', function(d){ return origin[1] + scale * d.centroid.y })
        //     .attr('z', function(d){ return origin[2] + scale * d.centroid.z })
        //     .classed('_3d', true)
        //     .merge(texts)
        //     .transition().duration(tt)
        //     .attr('fill', 'black')
        //     .attr('stroke', 'none')
        //     .attr('x', function(d){ return origin[0] + scale * d.centroid.x })
        //     .attr('y', function(d){ return origin[1] + scale * d.centroid.y })
        //     .attr('z', function(d){ return origin[2] + scale * d.centroid.z })
        //     .tween('text', function(d){
        //         var that = d3.select(this);
        //         var i = d3.interpolateNumber(+that.text(), Math.abs(d.height));
        //         return function(t){
        //             that.text(i(t).toFixed(1));
        //         };
        //     });

        // texts.exit().remove();
        /* ----------------------------------------- */
        ce.selectAll('._3d').sort(d3._3d().sort);

    }

    function setCube(xSize, ySize, zSize, dx, dy, dz, cubesData, id, color) {
        var cnt = 0;
        var x = 0;
        var linesData = 0;
        var index = 1;
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
                    _cube.color = color;
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


    function init(tensorSize, inputSize, convSize, outputSize) {
        cubesData = [];
        linesData = [];
        var inputfront = [], filterback = [], filterfront = [], outputback = [], linesData2 = [];
        // var tensorSize = 2;
        if (tensorSize == 3) {
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, -1, cubesData, 'input1', '#6beaf32f')
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, 0, cubesData[0], 'input0', '#6beaf32f')
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, 1, cubesData[0], 'input', '#6beaf32f')
        } else if (tensorSize == 2) {
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, 0, cubesData, 'input0', '#6beaf32f')
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, 1, cubesData[0], 'input', '#6beaf32f')
        } else {
            cubesData = setCube(inputSize, inputSize, 1, 0, 6, 1, cubesData, 'input', '#6beaf32f')
        }
        // cubesData = setCube(inputSize, inputSize, 1, 0, 6, 0, cubesData, 'input0', '#6beaf32f')
        // cubesData = setCube(inputSize, inputSize, 1, 0, 6, 1, cubesData[0], 'input', '#6beaf32f')
        inputfront = cubesData[1];
        // console.log('input front',inputfront)
        cubesData = setCube(convSize, convSize, 1, -10, 6, 10, cubesData[0], 'filter0', '#D83737dd')
        cubesData = setCube(convSize, convSize, 1, 0, 6, 10, cubesData[0], 'filter1', '#6dff8add')
        cubesData = setCube(convSize, convSize, 1, 10, 6, 10, cubesData[0], 'filter2', '#5555ffdd')
        // console.log('filter back',cubesData[2])
        // console.log('filter front',cubesData[1])
        // filterback = cubesData[2];
        // filterfront = cubesData[1];
        // filterback = [[2.5, 8.5, 10.5],
        // [-0.5, 8.5, 10.5],
        // [2.5, 5.5, 10.5],
        // [-0.5, 5.5, 10.5]];
        // filterfront = [[2.5, 8.5, 11.5],
        // [-0.5, 8.5, 11.5],
        // [2.5, 5.5, 11.5],
        // [-0.5, 5.5, 11.5]];
        // lines 3,4,10,13
        // 5*5 to 3*3 set lines    
        // var lefttop = [inputfront[35], inputfront[34], inputfront[33], inputfront[29], inputfront[28], inputfront[27], inputfront[23], inputfront[22], inputfront[21]];
        // var righttip = [inputfront[32], inputfront[30], inputfront[31], inputfront[26], inputfront[24], inputfront[25], inputfront[20], inputfront[18], inputfront[19]];
        // var leftbuttom = [inputfront[17], inputfront[16], inputfront[15], inputfront[11], inputfront[9], inputfront[7], inputfront[10], inputfront[8], inputfront[6]];
        // var rightbuttom = [inputfront[14], inputfront[12], inputfront[13], inputfront[5], inputfront[1], inputfront[2], inputfront[4], inputfront[0], inputfront[3]];
        // linesData = makeCrossLines(linesData, lefttop, [filterback[3]]);
        // linesData = makeCrossLines(linesData, righttip, [filterback[2]]);
        // linesData = makeCrossLines(linesData, leftbuttom, [filterback[1]]);
        // linesData = makeCrossLines(linesData, rightbuttom, [filterback[0]]);

        //--------------------------
        linesData = makeCrossLines(linesData, inputfront, filterback);///---

        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 20, cubesData[0], 'output', '#D83737dd')
        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 21, cubesData[0], 'output', '#6dff8add')
        cubesData = setCube(outputSize, outputSize, 1, 0, 6, 22, cubesData[0], 'output', '#5555ffdd')

        // console.log('output',cubesData[2]);  
        // outputback = cubesData[2]

        var allData = [
            cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData[0]),
            lines3D.rotateY(1.0).rotateX(-0.5)(linesData)
        ];

        processData(allData, 1000);

        // processData(cubes3D.rotateY(startAngle).rotateX(-startAngle)(cubesData), 1000);
        // processData(cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData[0]), 1000, '#6beaf32f');
        // setColorAnimation('cube', 'cube', '#6beaf32f', 0, '')
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

    function makeCrossLines(linesData, fromdata, todata) {
        // console.log('fromdata',fromdata);
        // console.log('todata',todata);        
        for (var i = 0; i < fromdata.length; i++) {
            for (var j = 0; j < todata.length; j++) {
                linesData.push([fromdata[i], todata[j]])
            }
        }
        // console.log('linesData',linesData);

        return linesData
    }

    function resetColor(id) {
        d3.select(id)
            .transition()
            .duration(0)
            .style("fill", '#6beaf32f')
        
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


    function lines(i, delaytime) {
        // setColorAnimation('line','#line_'+i,'noneColor',delaytime);
        // setColorAnimation('line','#line_'+(i+9),'noneColor',delaytime);
        // setColorAnimation('line','#line_'+(i+18),'noneColor',delaytime);
        // setColorAnimation('line','#line_'+(i+27),'noneColor',delaytime);

        // setColorAnimation('lines','#line_36','noneColor',delaytime);
        // setColorAnimation('lines','#line_37','noneColor',delaytime);
        // setColorAnimation('lines','#line_38','noneColor',delaytime);
        // setColorAnimation('lines','#line_39','noneColor',delaytime);
    }
    // function lines2(){
    //     setColorAnimation('lines','#line_36','noneColor','neDelaytime');
    //     setColorAnimation('lines','#line_37','noneColor','neDelaytime');
    //     setColorAnimation('lines','#line_38','noneColor','neDelaytime');
    //     setColorAnimation('lines','#line_39','noneColor','neDelaytime');
    // }

    // lines2();

    //--------- conv ----------------------- 
    function resetAllCube(){
        d3.selectAll('*').transition();
        resetColor('#cube_' +0 + '_input');
        resetColor('#cube_' +1 + '_input');
        resetColor('#cube_' +2 + '_input');
        resetColor('#cube_' +3 + '_input');
        resetColor('#cube_' +4 + '_input');
        resetColor('#cube_' +5 + '_input');
        resetColor('#cube_' +6 + '_input');
        resetColor('#cube_' +7 + '_input');
        resetColor('#cube_' +8 + '_input');
        resetColor('#cube_' +9 + '_input');
        resetColor('#cube_' +10 + '_input');
        resetColor('#cube_' +11 + '_input');
        resetColor('#cube_' +12 + '_input');
        resetColor('#cube_' +13 + '_input');
        resetColor('#cube_' +14 + '_input');
        resetColor('#cube_' +15 + '_input');
        resetColor('#cube_' +16 + '_input');
        resetColor('#cube_' +17 + '_input');
        resetColor('#cube_' +18 + '_input');
        resetColor('#cube_' +19 + '_input');
        resetColor('#cube_' +20 + '_input');
        resetColor('#cube_' +21 + '_input');
        resetColor('#cube_' +22 + '_input');
        resetColor('#cube_' +23 + '_input');
        resetColor('#cube_' +24 + '_input');
        resetColor('#cube_' +25 + '_input');
        resetColor('#cube_' +26 + '_input');
        resetColor('#cube_' +27 + '_input');
        resetColor('#cube_' +28 + '_input');
        resetColor('#cube_' +29 + '_input');
        resetColor('#cube_' +30 + '_input');
        resetColor('#cube_' +31 + '_input');
        resetColor('#cube_' +32 + '_input');
        resetColor('#cube_' +33 + '_input');
        resetColor('#cube_' +34 + '_input');
        resetColor('#cube_' +35 + '_input');
        resetColor('#cube_' +36 + '_input');
        resetColor('#cube_' +37 + '_input');
        resetColor('#cube_' +38 + '_input');
        resetColor('#cube_' +39 + '_input');
        resetColor('#cube_' +40 + '_input');
        resetColor('#cube_' +41 + '_input');
        resetColor('#cube_' +42 + '_input');
        resetColor('#cube_' +43 + '_input');
        resetColor('#cube_' +44 + '_input');
        resetColor('#cube_' +45 + '_input');
        resetColor('#cube_' +46 + '_input');
        resetColor('#cube_' +47 + '_input');
        resetColor('#cube_' +48 + '_input');
        resetColor('#cube_' +49 + '_input');
    }

    function input55conv33(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 5) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 6) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 10) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 11) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 12) + '_input', changeColor, delaytime);
    }
    function input55conv55(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 3) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 4) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 5) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 6) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 8) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 9) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 10) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 11) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 12) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 13) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 14) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 15) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 16) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 17) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 18) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 19) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 20) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 21) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 22) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 23) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 24) + '_input', changeColor, delaytime);
    }
    function input77conv33(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 8) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 9) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 14) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 15) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 16) + '_input', changeColor, delaytime);
    }
    function input77conv55(i, delaytime, changeColor) {
        setColorAnimation('conv', '#cube_' + (i + 0) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 1) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 2) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 3) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 4) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 7) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 8) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 9) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 10) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 11) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 14) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 15) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 16) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 17) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 18) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 21) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 22) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 23) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 24) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 25) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 28) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 29) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 30) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 31) + '_input', changeColor, delaytime);
        setColorAnimation('conv', '#cube_' + (i + 32) + '_input', changeColor, delaytime);
    }

    //--------- strike -----------------------   
    //input 5*5, strike 1, conv 3*3 , 3*3=9
    function draw55Strike1conv33() {
        //R
        input55conv33(12, 1, '#D83737dd'); input55conv33(11, 2, '#D83737dd'); input55conv33(10, 3, '#D83737dd');
        input55conv33(7, 4, '#D83737dd'); input55conv33(6, 5, '#D83737dd'); input55conv33(5, 6, '#D83737dd');
        input55conv33(2, 7, '#D83737dd'); input55conv33(1, 8, '#D83737dd'); input55conv33(0, 9, '#D83737dd');
        //G
        input55conv33(12, 10, '#6dff8add'); input55conv33(11, 11, '#6dff8add'); input55conv33(10, 12, '#6dff8add');
        input55conv33(7, 13, '#6dff8add'); input55conv33(6, 14, '#6dff8add'); input55conv33(5, 15, '#6dff8add');
        input55conv33(2, 16, '#6dff8add'); input55conv33(1, 17, '#6dff8add'); input55conv33(0, 18, '#6dff8add');
        //B
        input55conv33(12, 19, '#5555ffdd'); input55conv33(11, 20, '#5555ffdd'); input55conv33(10, 21, '#5555ffdd');
        input55conv33(7, 22, '#5555ffdd'); input55conv33(6, 23, '#5555ffdd'); input55conv33(5, 24, '#5555ffdd');
        input55conv33(2, 25, '#5555ffdd'); input55conv33(1, 26, '#5555ffdd'); input55conv33(0, 27, '#5555ffdd');
    }
    //input 5*5, strike 2, conv33 3*3 , 2*2=4
    function draw55Strike2conv33() {
        input55conv33(12, 1, '#D83737dd'); input55conv33(10, 2, '#D83737dd'); input55conv33(2, 3, '#D83737dd'); input55conv33(0, 4, '#D83737dd');//R
        input55conv33(12, 5, '#6dff8add'); input55conv33(10, 6, '#6dff8add'); input55conv33(2, 7, '#6dff8add'); input55conv33(0, 8, '#6dff8add');//G
        input55conv33(12, 9, '#5555ffdd'); input55conv33(10, 10, '#5555ffdd'); input55conv33(2, 11, '#5555ffdd'); input55conv33(0, 12, '#5555ffdd');//B
    }
    //input 5*5, strike 1, conv 5*5 , 1*1=1
    function draw55Strike1conv55() {
        //R
        input55conv55(0, 1, '#D83737dd');
        //G
        input55conv55(0, 2, '#6dff8add');
        //B
        input55conv55(0, 3, '#5555ffdd');
    }
    //input 7*7, strike 1, conv 3*3 , 4*4=16
    function draw77Strike1conv33() {
        //R
        input77conv33(32, 1, '#D83737dd'); input77conv33(31, 2, '#D83737dd'); input77conv33(30, 3, '#D83737dd'); input77conv33(29, 4, '#D83737dd'); input77conv33(28, 5, '#D83737dd');
        input77conv33(25, 6, '#D83737dd'); input77conv33(24, 7, '#D83737dd'); input77conv33(23, 8, '#D83737dd'); input77conv33(22, 9, '#D83737dd'); input77conv33(21, 10, '#D83737dd');
        input77conv33(18, 11, '#D83737dd'); input77conv33(17, 12, '#D83737dd'); input77conv33(16, 13, '#D83737dd'); input77conv33(15, 14, '#D83737dd'); input77conv33(14, 15, '#D83737dd');
        input77conv33(11, 16, '#D83737dd'); input77conv33(10, 17, '#D83737dd'); input77conv33(9, 18, '#D83737dd'); input77conv33(8, 19, '#D83737dd'); input77conv33(7, 20, '#D83737dd');
        input77conv33(4, 21, '#D83737dd'); input77conv33(3, 22, '#D83737dd'); input77conv33(2, 23, '#D83737dd'); input77conv33(1, 24, '#D83737dd'); input77conv33(0, 25, '#D83737dd');
        //G 
        var i = 25;
        input77conv33(32, 1 + i, '#6dff8add'); input77conv33(31, 2 + i, '#6dff8add'); input77conv33(30, 3 + i, '#6dff8add'); input77conv33(29, 4 + i, '#6dff8add'); input77conv33(28, 5 + i, '#6dff8add');
        input77conv33(25, 6 + i, '#6dff8add'); input77conv33(24, 7 + i, '#6dff8add'); input77conv33(23, 8 + i, '#6dff8add'); input77conv33(22, 9 + i, '#6dff8add'); input77conv33(21, 10 + i, '#6dff8add');
        input77conv33(18, 11 + i, '#6dff8add'); input77conv33(17, 12 + i, '#6dff8add'); input77conv33(16, 13 + i, '#6dff8add'); input77conv33(15, 14 + i, '#6dff8add'); input77conv33(14, 15 + i, '#6dff8add');
        input77conv33(11, 16 + i, '#6dff8add'); input77conv33(10, 17 + i, '#6dff8add'); input77conv33(9, 18 + i, '#6dff8add'); input77conv33(8, 19 + i, '#6dff8add'); input77conv33(7, 20 + i, '#6dff8add');
        input77conv33(4, 21 + i, '#6dff8add'); input77conv33(3, 22 + i, '#6dff8add'); input77conv33(2, 23 + i, '#6dff8add'); input77conv33(1, 24 + i, '#6dff8add'); input77conv33(0, 25 + i, '#6dff8add');
        //B
        i = 50;
        input77conv33(32, 1 + i, '#5555ffdd'); input77conv33(31, 2 + i, '#5555ffdd'); input77conv33(30, 3 + i, '#5555ffdd'); input77conv33(29, 4 + i, '#5555ffdd'); input77conv33(28, 5 + i, '#5555ffdd');
        input77conv33(25, 6 + i, '#5555ffdd'); input77conv33(24, 7 + i, '#5555ffdd'); input77conv33(23, 8 + i, '#5555ffdd'); input77conv33(22, 9 + i, '#5555ffdd'); input77conv33(21, 10 + i, '#5555ffdd');
        input77conv33(18, 11 + i, '#5555ffdd'); input77conv33(17, 12 + i, '#5555ffdd'); input77conv33(16, 13 + i, '#5555ffdd'); input77conv33(15, 14 + i, '#5555ffdd'); input77conv33(14, 15 + i, '#5555ffdd');
        input77conv33(11, 16 + i, '#5555ffdd'); input77conv33(10, 17 + i, '#5555ffdd'); input77conv33(9, 18 + i, '#5555ffdd'); input77conv33(8, 19 + i, '#5555ffdd'); input77conv33(7, 20 + i, '#5555ffdd');
        input77conv33(4, 21 + i, '#5555ffdd'); input77conv33(3, 22 + i, '#5555ffdd'); input77conv33(2, 23 + i, '#5555ffdd'); input77conv33(1, 24 + i, '#5555ffdd'); input77conv33(0, 25, '#5555ffdd');
    }
    //input 7*7, strike 2, conv 3*3 , 3*3=9
    function draw77Strike2conv33() {
        //R
        var i = 0
        input77conv33(32, 1 + i, '#D83737dd'); input77conv33(30, 2 + i, '#D83737dd'); input77conv33(28, 3 + i, '#D83737dd');
        input77conv33(18, 4 + i, '#D83737dd'); input77conv33(16, 5 + i, '#D83737dd'); input77conv33(14, 6 + i, '#D83737dd');
        input77conv33(4, 7 + i, '#D83737dd'); input77conv33(2, 8 + i, '#D83737dd'); input77conv33(0, 9 + i, '#D83737dd');
        //G 
        i = 9;
        input77conv33(32, 1 + i, '#6dff8add'); input77conv33(30, 2 + i, '#6dff8add'); input77conv33(28, 3 + i, '#6dff8add');
        input77conv33(18, 4 + i, '#6dff8add'); input77conv33(16, 5 + i, '#6dff8add'); input77conv33(14, 6 + i, '#6dff8add');
        input77conv33(4, 7 + i, '#6dff8add'); input77conv33(2, 8 + i, '#6dff8add'); input77conv33(0, 9 + i, '#6dff8add');
        i = 18;
        input77conv33(32, 1 + i, '#5555ffdd'); input77conv33(30, 2 + i, '#5555ffdd'); input77conv33(28, 3 + i, '#5555ffdd');
        input77conv33(18, 4 + i, '#5555ffdd'); input77conv33(16, 5 + i, '#5555ffdd'); input77conv33(14, 6 + i, '#5555ffdd');
        input77conv33(4, 7 + i, '#5555ffdd'); input77conv33(2, 8 + i, '#5555ffdd'); input77conv33(0, 9 + i, '#5555ffdd');

    }
    //input 7*7, strike 1, conv 5*5 , 3*3=9
    function draw77Strike1conv55() {
        var i = 0
        input77conv55(16, 1 + i, '#D83737dd'); input77conv55(15, 2 + i, '#D83737dd'); input77conv55(14, 3 + i, '#D83737dd');
        input77conv55(9, 4 + i, '#D83737dd'); input77conv55(8, 5 + i, '#D83737dd'); input77conv55(7, 6 + i, '#D83737dd');
        input77conv55(2, 7 + i, '#D83737dd'); input77conv55(1, 8 + i, '#D83737dd'); input77conv55(0, 9 + i, '#D83737dd');
        //G 
        i = 9;
        input77conv55(16, 1 + i, '#6dff8add'); input77conv55(15, 2 + i, '#6dff8add'); input77conv55(14, 3 + i, '#6dff8add');
        input77conv55(9, 4 + i, '#6dff8add'); input77conv55(8, 5 + i, '#6dff8add'); input77conv55(7, 6 + i, '#6dff8add');
        input77conv55(2, 7 + i, '#6dff8add'); input77conv55(1, 8 + i, '#6dff8add'); input77conv55(0, 9 + i, '#6dff8add');
        i = 18;
        input77conv55(16, 1 + i, '#5555ffdd'); input77conv55(15, 2 + i, '#5555ffdd'); input77conv55(14, 3 + i, '#5555ffdd');
        input77conv55(9, 4 + i, '#5555ffdd'); input77conv55(8, 5 + i, '#5555ffdd'); input77conv55(7, 6 + i, '#5555ffdd');
        input77conv55(2, 7 + i, '#5555ffdd'); input77conv55(1, 8 + i, '#5555ffdd'); input77conv55(0, 9 + i, '#5555ffdd');
    }
    //input 7*7, strike 2, conv 5*5 , 2*2=4
    function draw77Strike2conv55() {
        var i = 0
        input77conv55(16, 1 + i, '#D83737dd'); input77conv55(14, 2 + i, '#D83737dd');
        input77conv55(2, 3 + i, '#D83737dd'); input77conv55(0, 4 + i, '#D83737dd');
        //G 
        i = 4;
        input77conv55(16, 1 + i, '#6dff8add'); input77conv55(14, 2 + i, '#6dff8add');
        input77conv55(2, 3 + i, '#6dff8add'); input77conv55(0, 4 + i, '#6dff8add');
        i = 8;
        input77conv55(16, 1 + i, '#5555ffdd'); input77conv55(14, 2 + i, '#5555ffdd');
        input77conv55(2, 3 + i, '#5555ffdd'); input77conv55(0, 4 + i, '#5555ffdd');
    }
    //----------------------------------


    //----- create button -----------
    var button = d3.select('body')
        .append('button')
        .attr('id', 'reset')
        .text("reset")
        .attr("style", "position:absolute; left:15px; top:20px;")

    // d3.select('body')
    //     .append('button')
    //     .attr('id', 'clear')
    //     .text("clear")
    //     .attr("style", "position:absolute; left:10px; top:40px;")

    // ----- create text ---------------
    var resetbox = svg.append('rect')
        .attr('id', 'Box')
        .attr('stroke', '#333333')
        .attr('fill', '#dddddd')
        .attr('stroke-width', '1')
        .attr('x', 1)
        .attr('y', 5)
        .attr('width', 60)
        .attr('height', 90);

    var buttonbox = svg.append('rect')
        .attr('id', 'Box')
        .attr('stroke', '#333333')
        .attr('fill', '#dddddd')
        .attr('stroke-width', '1')
        .attr('x', 75)
        .attr('y', 5)
        .attr('width', 520)
        .attr('height', 90);

    var buttonboxleft = svg.append('rect')
        .attr('id', 'Box')
        .attr('stroke', '#333333')
        .attr('fill', '#dddddd')
        .attr('stroke-width', '1')
        .attr('x', 80)
        .attr('y', 10)
        .attr('width', 250)
        .attr('height', 80);
    var buttonboxright = svg.append('rect')
        .attr('id', 'Box')
        .attr('stroke', '#333333')
        .attr('fill', '#dddddd')
        .attr('stroke-width', '1')
        .attr('x', 340)
        .attr('y', 10)
        .attr('width', 250)
        .attr('height', 80);

    var animationbox = svg.append('rect')
        .attr('id', 'Box')
        .attr('stroke', '#333333')
        .attr('fill', '#dddddd32')
        .attr('stroke-width', '1')
        .attr('x', 1)
        .attr('y', 100)
        .attr('width', 800)
        .attr('height', 500);

    d3.select('body')
        .append('p')
        .attr('id', 'texttensor')
        .attr("style", "position:absolute; left:100px; top:5px;")
        .text('輸入張量參數')
    d3.select('body')
        .append('p')
        .attr('id', 'texttensor')
        .attr("style", "position:absolute; left:100px; top:30px;")
        .text('張量尺寸:')
    d3.select('body')
        .append('p')
        .attr('id', 'textinput')
        .attr("style", "position:absolute; left:100px; top:55px;")
        .text('張量厚度:')
    
    d3.select('body')
        .append('p')
        .attr('id', 'textinput')
        .attr("style", "position:absolute; left:360px; top:5px;")
        .text('卷積核參數')
    d3.select('body')
        .append('p')
        .attr('id', 'textinput')
        .attr("style", "position:absolute; left:360px; top:30px;")
        .text('卷積核尺寸:')
    d3.select('body')
        .append('p')
        .attr('id', 'textinput')
        .attr("style", "position:absolute; left:360px; top:55px;")
        .text('卷積核步伐:')

    // ----- create option ----------   
    var data3 = ["input 7x7", "input 5x5"];
    var select3 = d3.select('body')
        .append('select')
        .attr('class', 'select')
        .attr('id', 'input')
        .attr("style", "position:absolute; left:230px; top:50px;")
        .on('change', onchange)
    var options3 = select3
        .selectAll('option')
        .data(data3).enter()
        .append('option')
        .text(function (d) { return d; });
    // ----- create option ----------   
    // var data4 = ["tensor 1", "tensor 2", "tensor 3"];
    var data4 = ["tensor 1"];
    var select4 = d3.select('body')
        .append('select')
        .attr('class', 'select')
        .attr('id', 'tensor')
        .attr("style", "position:absolute; left:230px; top:75px;")
        .on('change', onchange)
    var options4 = select4
        .selectAll('option')
        .data(data4).enter()
        .append('option')
        .text(function (d) { return d; });
    // ----- create option ----------   
    var data2 = ["conv 5x5", "conv 3x3"];
    var select2 = d3.select('body')
        .append('select')
        .attr('class', 'select')
        .attr('id', 'conv')
        .attr("style", "position:absolute; left:500px; top:50px;")
        .on('change', onchange)
    var options2 = select2
        .selectAll('option')
        .data(data2).enter()
        .append('option')
        .text(function (d) { return d; });
    // ----- create option ----------    
    var data = ["Strike 1", "Strike 2"];
    var select = d3.select('body')
        .append('select')
        .attr('class', 'select')
        .attr('id', 'strike')
        .attr("style", "position:absolute; left:500px; top:75px;")
        .on('change', onchange)

    var options = select
        .selectAll('option')
        .data(data).enter()
        .append('option')
        .text(function (d) { return d; });
    // // ---------------------------------------
    function recreate() {
        d3.selectAll('*').transition();
        // d3.selectAll("_3d cube")
        //         .transition()
        //         .duration(0)
        //         .delay(0)
        //         .style("fill", "#6beaf32f")
    }

    function onchange() {
        // d3.selectAll('cubes')
        //     .transition()
        //     .duration( 0 );
        var selectValue = d3.select('#strike').property('value')
        var convValue = d3.select('#conv').property('value')
        var inputValue = d3.select('#input').property('value')
        var tensorValue = d3.select('#tensor').property('value')
        var ten = 1;
        if (tensorValue == 'tensor 1') {
            ten = 1;
        } else if(tensorValue == 'tensor 2'){
            ten = 2;
        }else{
            ten=3;
        }

        if (inputValue == "input 7x7" && convValue == "conv 5x5") {
            // recreate();
            // init(7, 5, 3);
            if (selectValue == 'Strike 1') {
                resetAllCube();
                init(ten, 7, 5, 3);
                draw77Strike1conv55();
            } else {
                resetAllCube();
                init(ten, 7, 5, 2);
                draw77Strike2conv55();
            }
        } else if (inputValue == "input 7x7" && convValue == "conv 3x3") {
            // init(ten ,  7, 3, 2);
            if (selectValue == 'Strike 1') {
                resetAllCube();
                init(ten, 7, 3, 5);
                draw77Strike1conv33()
            } else {
                resetAllCube();
                init(ten, 7, 3, 3);
                draw77Strike2conv33();
            }
        } else if (inputValue == "input 5x5" && convValue == "conv 5x5") {
            // recreate();
            // init(ten ,  5, 5, 1);
            if (selectValue == 'Strike 1') {
                resetAllCube();
                init(ten, 5, 5, 1);
                draw55Strike1conv55();
            } else {
                resetAllCube();
                init(ten, 5, 5, 1);
                alert("此大小輸入的卷積無法兩步法運算!");
            }
        } else if (inputValue == "input 5x5" && convValue == "conv 3x3") {
            // recreate();
            // init(ten ,  5, 3, 3);
            if (selectValue == 'Strike 1') {
                resetAllCube();
                init(ten, 5, 3, 3);
                draw55Strike1conv33();
            } else {
                resetAllCube();
                init(ten, 5, 3, 2);
                draw55Strike2conv33();
            }
        }
        d3.select("#textValue").remove()
        d3.select('body')
            .append('p')
            .attr('id', 'textValue')
            .attr("style", "position:absolute; left:10px; top:80px;")
        // .text(ten + " , " + inputValue + "," + selectValue + "," + convValue + ' is the last selected option.')
    };

    d3.select('select').on('change', onchange)
    // d3.select('#button').on('click', init);
    d3.select('#reset').on("click", function () {
        resetAllCube();
        init(1, 7, 5, 3);
        draw77Strike1conv55();
        console.log('reset')
    })

    d3.select('#clear').on("click", function () {
        d3.selectAll('*').transition();
        d3.selectAll('_3d cube').remove();
        console.log('clear')
    })

    init(1, 7, 5, 3);
    draw77Strike1conv55();





}
// },false);