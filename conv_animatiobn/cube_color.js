// window.addEventListener("load", function() {
window.onload = function f() {
    var origin = [100, 100], scale = 20, cubesData = [], linesData = [], front=[], end=[], alpha = 0, beta = 0, startAngle = Math.PI/6;
    var svg    = d3.select('#svgCube').call(d3.drag()
                            .on('drag', dragged)
                            .on('start', dragStart)
                            .on('end', dragEnd));
    // var svg    = d3.select('#svgCube').append('g');                        
    var color  = d3.scaleOrdinal(d3.schemeCategory20);
    // var cubesGroup = svg.append('g').attr('class', 'cubes');
    var mx, my, mouseX, mouseY;

    //------------------------------------------
    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function(d){ return d.x; })
        .y(function(d){ return d.y; })
        .z(function(d){ return d.z; })
        .rotateY( startAngle)
        .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);

    var lines3D= d3._3d()
        .shape('LINE_STRIP')
        .origin(origin)
        .rotateY( startAngle)
        .rotateX(-startAngle)
        .scale(scale);
    //---------------------------------------
    function processData(data, tt){
        /* --------- CUBES ---------*/
        var cubes = svg.selectAll('g.cube').data(data[0], function(d){ return d.id });
        var ce = cubes
            .enter()
            .append('g')
            .attr('id', function(d){ return d.id })
            .attr('class', '_3d cube')
            .attr('fill', function(d){ return d.color })
            .attr('stroke', 'black')
            // .attr('stroke', function(d){ return d3.color(color(d.id)).darker(2); })
            .merge(cubes);
            // .sort(cubes3D.sort);

        cubes.exit().remove();
        /* --------- FACES ---------*/
        var faces = cubes.merge(ce).selectAll('path.face').data(function(d){ return d.faces; }, function(d){ return d.face; });
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
            .attr('id', function(d, i){ return ('line_'+i);})
            .merge(lines)
            // .attr('fill', '#aaaaff00')
            .attr('stroke', '#afabff')
            .attr('stroke-width', 1)
            .attr('d', lines3D.draw);

        lines.exit().remove();

        /* ----------- Text ----------- */
        console.log(data[1].length);
       
        var lineText = svg.selectAll('text.lineText').data(data[1][0]);

        lineText
            .enter()
            .append('text')
            .attr('class', '_3d lineText')
            .attr('dx', '.7em')
            .attr('font-size', '10px')            
            .attr('text-anchor', 'middle')
            .attr('font-family', 'sans-serif')
            .attr('font-weight', 'bolder')
            .attr('fill', '#111111')
            .merge(lineText)
            .each(function(d){
                // for(var i=0; i<d)
                d.centroid = {x: d.rotated.x, y: d.rotated.y, z: d.rotated.z};
            })
            .attr('x', function(d){ return d.projected.x; })
            .attr('y', function(d){ return d.projected.y; })
            .attr('z', function(d){ return d.projected.z; })
            .text(function(d){ return d });

        lineText.exit().remove();           

        ce.selectAll('._3d').sort(d3._3d().sort);

    }

    function setCube(xSize, ySize, zSize, dx, dy, dz, cubesData, id, color){
        var cnt = 0;
        var x = 0;
        var linesData = 0;
        var index= 1;
        front =[],end=[];
        for(var z = zSize/2; z > -zSize/2; z--){
            for(var y = ySize/2; y > -ySize/2; y--){
                for(var x = xSize/2; x > -xSize/2; x--){
                // var index = d3.randomUniform(2, 4)();
                linesData=seprateCube(x+0.5+dx, y+0.5+dy, z+0.5+dz, index); 
                front = front.concat(linesData[0]);
                end = end.concat(linesData[1]);
                // console.log("front",front);
                // console.log("end",end);
                front = uniqBy(front, JSON.stringify)
                end = uniqBy(end, JSON.stringify)
                var _cube = makeCube(x+0.5+dx, y+0.5+dy, z+0.5+dz, index);                 
                    _cube.id = 'cube_' + (cnt++) +'_'+id;
                    _cube.height = index;
                    _cube.color = color;
                    cubesData.push(_cube);
                    // console.log(x+0.5, y+0.5, z+0.5);
                }
                
            }
        }        
        // console.log("front",front);
        // console.log("end",end);
        var result = [cubesData,front,end];
        return result;
    }

    function uniqBy(a, key) {
        var seen = {};
        return a.filter(function(item) {
            var k = key(item);
            return seen.hasOwnProperty(k) ? false : (seen[k] = true);
        })
    }
    

    function init(){
        cubesData = [];
        linesData = [];
        var inputfront = [],filterback=[],filterfront=[],outputback=[], linesData2 = [];;
        cubesData = setCube(5,5,1,0,6,0,cubesData,'input0','#6beaf32f')        
        cubesData = setCube(5,5,1,0,6,1,cubesData[0],'input','#6beaf32f')
        inputfront = cubesData[1];
        // console.log('input front',inputfront)
        cubesData = setCube(3,3,1,-10,6,10,cubesData[0],'filter0','#D83737dd')
        cubesData = setCube(3,3,1,0,6,10,cubesData[0],'filter1','#6dff8add')
        cubesData = setCube(3,3,1,10,6,10,cubesData[0],'filter2','#7beafedd')
        // console.log('filter back',cubesData[2])
        // console.log('filter front',cubesData[1])
        // filterback = cubesData[2];
        // filterfront = cubesData[1];
        filterback = [[2.5, 8.5, 10.5],
                        [-0.5, 8.5, 10.5],
                        [2.5, 5.5, 10.5],
                        [-0.5, 5.5, 10.5]];
        filterfront = [[2.5, 8.5, 11.5],
                        [-0.5, 8.5, 11.5],
                        [2.5, 5.5, 11.5],
                        [-0.5, 5.5, 11.5]];// lines 3,4,10,13
        // 5*5 to 3*3 set lines    
        // var lefttop = [inputfront[35],inputfront[34],inputfront[33],inputfront[29],inputfront[28],inputfront[27],inputfront[23],inputfront[22],inputfront[21]];
        // var righttip = [inputfront[32],inputfront[30],inputfront[31],inputfront[26],inputfront[24],inputfront[25],inputfront[20],inputfront[18],inputfront[19]];
        // var leftbuttom = [inputfront[17],inputfront[16],inputfront[15],inputfront[11],inputfront[9],inputfront[7],inputfront[10],inputfront[8],inputfront[6]];
        // var rightbuttom = [inputfront[14],inputfront[12],inputfront[13],inputfront[5],inputfront[1],inputfront[2],inputfront[4],inputfront[0],inputfront[3]];
        // linesData = makeCrossLines(linesData, lefttop, [filterback[3]]);
        // linesData = makeCrossLines(linesData, righttip, [filterback[2]]);
        // linesData = makeCrossLines(linesData, leftbuttom, [filterback[1]]);
        // linesData = makeCrossLines(linesData, rightbuttom, [filterback[0]]);

       //--------------------------
        // linesData = makeCrossLines(linesData, inputfront, filterback);///---

        cubesData = setCube(3,3,1,0,6,20,cubesData[0],'output','#D83737dd')  
        cubesData = setCube(3,3,1,0,6,21,cubesData[0],'output','#6dff8add') 
        cubesData = setCube(3,3,1,0,6,22,cubesData[0],'output','#7beafedd') 

        // console.log('output',cubesData[2]);  
        outputback = cubesData[2]
        
        // linesData = makeCrossLines(linesData, filterfront, outputback);///---

        // linesData2 = [[[2.5, 8.5, 11.5], [1.5, 7.5, 20.5]],
        //             [[-0.5, 8.5, 11.5], [0.5, 7.5, 20.5]],
        //             [[2.5, 5.5, 11.5], [1.5, 6.5, 20.5]],
        //             [[-0.5, 5.5, 11.5], [0.5, 6.5, 20.5]]
        //         ];   // lines from filterfront to  outputback
        // linesData = linesData.concat(linesData2);
        // console.log(linesData)
            
        var allData = [
            cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData[0]),
            lines3D.rotateY(1.0).rotateX(-0.5)(linesData)
        ];

        processData(allData , 1000);

        // processData(cubes3D.rotateY(startAngle).rotateX(-startAngle)(cubesData), 1000);
        // processData(cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData[0]), 1000, '#6beaf32f');
        // setColorAnimation('cube','cube', '#6beaf32f', 0, '')
    }

    function dragStart(){
        mx = d3.event.x;
        my = d3.event.y;
    }

    function dragged(){
        mouseX = mouseX || 0;
        mouseY = mouseY || 0;
        beta   = (d3.event.x - mx + mouseX) * Math.PI / 230 ;
        alpha  = (d3.event.y - my + mouseY) * Math.PI / 230  * (-1);

        var allData = [
            cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]), 
            lines3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(linesData)
            
        ];

        processData(allData , 0);

        // processData(cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]), 0, '#6beaf32f');
    }

    function dragEnd(){
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    function makeCube(x, y, z, index){    
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
            {x: x - index/2  , y: y + index/2 , z: z + index/2 }, // FRONT TOP LEFT
            {x: x - index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM LEFT
            {x: x + index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM RIGHT
            {x: x + index/2 , y: y + index/2 , z: z + index/2 }, // FRONT TOP RIGHT
            {x: x - index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP LEFT
            {x: x - index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM LEFT
            {x: x + index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM RIGHT
            {x: x + index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP RIGHT
        ];
    }

    function seprateCube(x, y, z, index){
        var points = [
                        [ x - index/2  , y + index/2 , z + index/2 ], // FRONT TOP LEFT
                        [ x - index/2  ,  y - index/2 ,  z + index/2 ], // FRONT BOTTOM LEFT
                        [ x + index/2  ,  y - index/2 ,  z + index/2 ], // FRONT BOTTOM RIGHT
                        [ x + index/2 ,  y + index/2 ,  z + index/2 ], // FRONT TOP RIGHT
                        [ x - index/2 ,  y + index/2 ,  z - index/2 ], // BACK  TOP LEFT
                        [ x - index/2 ,  y - index/2 ,  z - index/2 ], // BACK  BOTTOM LEFT
                        [ x + index/2 ,  y - index/2 ,  z - index/2 ], // BACK  BOTTOM RIGHT
                        [ x + index/2 ,  y + index/2 ,  z - index/2 ], // BACK  TOP RIGHT
                    ]
        var frontPoint=[],endPoint=[];
        // console.log("points.length:",points.length)

        for (var i=0;i<points.length;i++){
            if(i<4){
                frontPoint.push(points[i]);
            }else{
                endPoint.push(points[i]);
            }
        }
        return [frontPoint ,endPoint]
    }

    function makeCrossLines(linesData, fromdata, todata){
        // console.log('fromdata',fromdata);
        // console.log('todata',todata);        
        for (var i = 0; i < fromdata.length; i++){
            for (var j = 0; j < todata.length; j++){
                linesData.push([fromdata[i],todata[j]])
            }    
        }
        // console.log('linesData',linesData);

        return linesData
    }

    function setColorAnimation(classType, id, chageColor, delaytime){
        if(classType=='cube'){
            d3.select(id)
            .transition()
            .duration(0)
            .delay(1000*delaytime)
            .style("fill", chageColor)
            .transition()
            .duration(1000)
            .style("fill", '#6beaf32f')
        }
        else if(classType=='conv'){
            d3.select(id)
            .transition()
            .duration(0)
            .delay(1000*delaytime)
            .style("fill", function(d){ return color(d.id)})
            // .style("fill", chageColor)
            .transition()
            .duration(1000)
            .style("fill", '#6beaf32f')
        }else if(classType=='line'){
            d3.select(id)
            .transition()
            .duration(0)
            .delay(1000*delaytime)
            .style("stroke", function(d){ return color((Math.random() * 10))})
            // .style("stroke", '#afabff')
            // .style("stroke", chageColor)
            .transition()
            .duration(1000)
            .style("stroke", '#6beaf300')
        }else{
            d3.select(id)
            .transition()
            .duration(0)
            .delay(1000*delaytime)
            .style("stroke", '#6beaf3')
            .transition()
            .duration(1000)
            // .attr('stroke', '#afabff')
            .attr('stroke', '#6beaf3')
            console.log('ok')
        }
        
    }

    function filter(){
        // for(var i = 0; i < 9; i++){
        //     d3.select('#cube_'+i+'_filter')
        //     .style("fill", 'blue')
        // }
        d3.select('#cube_0_filter').style("fill", '#ddeedde2')
        d3.select('#cube_1_filter').style("fill", '#ddeedde2')
        d3.select('#cube_2_filter').style("fill", '#ddeedde2')
        d3.select('#cube_3_filter').style("fill", '#ddeedde2')
        d3.select('#cube_4_filter').style("fill", '#ddeedde2')
        d3.select('#cube_5_filter').style("fill", '#ddeedde2')
        d3.select('#cube_6_filter').style("fill", '#ddeedde2')
        d3.select('#cube_7_filter').style("fill", '#ddeedde2')
        d3.select('#cube_8_filter').style("fill", '#ddeedde2')
    }

    function conv(i,delaytime){
        setColorAnimation('conv','#cube_'+(i+0)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+1)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+2)+'_input','noneColor' ,delaytime);

        setColorAnimation('conv','#cube_'+(i+5)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+6)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+7)+'_input','noneColor' ,delaytime);

        setColorAnimation('conv','#cube_'+(i+10)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+11)+'_input','noneColor' ,delaytime);
        setColorAnimation('conv','#cube_'+(i+12)+'_input','noneColor' ,delaytime);
    }  

    function lines(i,delaytime){
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
    
     //--------- strike -----------------------
     function strikeOne(){
        for(var i = 0; i < 10000; i++){
            conv(12 ,1+9*i);
            conv(11 ,2+9*i);
            conv(10 ,3+9*i);
            conv(7 ,4+9*i);
            conv(6 ,5+9*i);
            conv(5 ,6+9*i);
            conv(2 ,7+9*i);
            conv(1 ,8+9*i);
            conv(0 ,9+9*i); 

            // lines(0,1+9*i);   
            // lines(1,2+9*i); 
            // lines(2,3+9*i); 
            // lines(3,4+9*i); 
            // lines(4,5+9*i); 
            // lines(5,6+9*i); 
            // lines(6,7+9*i); 
            // lines(7,8+9*i); 
            // lines(8,9+9*i); 

        }
    }

    function strikeTwo(){
        for(var i = 0; i < 10000; i++){
            conv(12 ,1+4*i);
            conv(10 ,2+4*i);
            conv(2 ,3+4*i);
            conv(0 ,4+4*i);        
        }
    }
    //----------------------------------


    //----- create button -----------
    var button = d3.select('body')
    .append('button')
        .attr('id','button')
        .text("reset")
        .attr("style", "position:absolute; left:10px; top:10px;")

    // ----- create option ----------    
    var data = ["Strike 1", "Strike 2"];
    var select = d3.select('body')
    .append('select')
        .attr('class','select')
        .attr('id','strike')
        .attr("style", "position:absolute; left:60px; top:10px;")
        .on('change',onchange)

    var options = select
        .selectAll('option')
        .data(data).enter()
        .append('option')
        .text(function (d) { return d; });
    // ----- create option ----------   
    var data2 = ["conv 1", "conv 2", "conv 3"];
    var select2 = d3.select('body')
    .append('select')
        .attr('class','select')
        .attr('id','conv')
        .attr("style", "position:absolute; left:140px; top:10px;")
        .on('change',onchange)

    var options2 = select2
        .selectAll('option')
        .data(data2).enter()
        .append('option')
        .text(function (d) { return d; }); 
    // ---------------------------------------
    function onchange() {
        var selectValue = d3.select('#strike').property('value')
        var convValue = d3.select('#conv').property('value')
        // if(selectValue=='Strike 1'){
        //     strikeOne();    
        // }else{
        //     strikeTwo();
        // }
        d3.select("#textValue").remove()
        d3.select('body')
            .append('p')
            .attr('id','textValue')
            .attr("style", "position:absolute; left:10px; top:30px;")
            .text(selectValue + "," + convValue+ ' is the last selected option.')
    };



    d3.select('select').on('change',onchange)
    d3.select('#button').on('click', init);

    init(); //main function to create svg cube 

    strikeOne(); //set cube strike 1 
    // filter(); //add color to filter
   

    

    

    
    
    

}
// },false);