// window.addEventListener("load", function() {
window.onload = function f() {
    var origin = [200, 200], scale = 20, cubesData = [], linesData = [], front=[], end=[], alpha = 0, beta = 0, startAngle = Math.PI/6;
    var svg    = d3.select('#svgCube').call(d3.drag()
                            .on('drag', dragged)
                            .on('start', dragStart)
                            .on('end', dragEnd));
    // var svg    = d3.select('#svgCube').append('g');                        
    var color  = d3.scaleOrdinal(d3.schemeCategory20);
    var cubesGroup = svg.append('g').attr('class', 'cubes');
    var linesGroup = svg.append('g').attr('class', 'lines');
    var mx, my, mouseX, mouseY;

    var cubes3D = d3._3d()
        .shape('CUBE')
        .x(function(d){ return d.x; })
        .y(function(d){ return d.y; })
        .z(function(d){ return d.z; })
        .rotateY( startAngle)
        .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);

    var line3D = d3._3d()
        .shape('LINE_STRIP')
        .x(function(d){ return d.x; })
        .y(function(d){ return d.y; })
        .z(function(d){ return d.z; })
        .rotateY( startAngle)
        .rotateX(-startAngle)
        .origin(origin)
        .scale(scale);
    //---------------------------------------
    var max = 4, min = -max,startAngle = Math.PI/6,lines=[];
    var rn      = function(min, max){ return Math.round(d3.randomUniform(min, max + 1)()); };
    d3.range(-4, 5, 2).forEach(function(i){
        var o = [
            [ 3,      0      , i],
            [ 2, rn(min, max), i],
            [ 1, rn(min, max), i],
            [ 0, rn(min, max), i],
            [-1, rn(min, max), i],
            [-2, rn(min, max), i],
            [-3,      0      , i]
        ];
        lines.push(o);
    });
    // var line3D = d3._3d()
    //     .primitiveType('LINE_STRIP')
    //     .rotateX(-startAngle)
    //     .rotateY( startAngle)        
    //     .origin(origin)
    //     .scale(scale);
    var lines3D = line3D(lines);
    
    //---------------------------------------
    function processData(data, tt, setColor, linesdata){
        /* --------- CUBES ---------*/
        var cubes = cubesGroup.selectAll('g.cube').data(data, function(d){ return d.id });
        var ce = cubes
            .enter()
            .append('g')
            .attr('id', function(d){ return d.id })
            .attr('class', 'cube')
            .attr('fill', setColor)
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
        //----------------------------------
        /* --------- LINES ---------*/   
        var linesStrip = linesGroup.selectAll('g.line').data(linesdata);
        // console.log("line:",linesdata);
        linesStrip
            .enter()
            .append('path')
            .attr('class', 'line')
            .merge(linesStrip)
            .attr('fill', 'none')
            .attr('stroke', function(d, i){ return color(i); })
            .attr('stroke-width', 2)
            .sort(function(a, b){ return b[0].rotated.z - a[0].rotated.z; })
            .attr('d', lines3D.draw);

        linesStrip.exit().remove(); 

        // var lineData = [[50,50,10],[100,50,10],[100,100,30]];
        // var lines = cubesGroup.selectAll('path.line').data(lineData,lineData);
            
        // var line = d3.line();
        
        // cubesGroup.append("path")
        //     .attr("d", line(lineData))
        //     .attr('class', 'line')
        //     .attr("stroke", "black")
        //     .attr("stroke-width", "1px")
        //     .attr("fill", "none")
        //     .merge(lines);

        // cubesGroup.exit().remove();
        /* --------- TEXT ---------*/
        var texts = cubes.merge(ce).selectAll('text.text').data(function(d){
            var _t = d.faces.filter(function(d){
                return d.face === 'top';
            });
            return [{height: d.height, centroid: _t[0].centroid}];
        });
        // texts
        //     .enter()
        //     .append('text')
        //     .attr('class', 'text')
        //     .attr('dy', '-.7em')
        //     .attr('text-anchor', 'middle')
        //     .attr('font-family', 'sans-serif')
        //     .attr('font-weight', 'bolder')
        //     .attr('x', function(d){ return origin[0] + scale * d.centroid.x })
        //     .attr('y', function(d){ return origin[1] + scale * d.centroid.y })
        //     .classed('_3d', true)
        //     .merge(texts)
        //     .transition().duration(tt)
        //     .attr('fill', 'black')
        //     .attr('stroke', 'none')
        //     .attr('x', function(d){ return origin[0] + scale * d.centroid.x })
        //     .attr('y', function(d){ return origin[1] + scale * d.centroid.y })
        //     .tween('text', function(d){
        //         var that = d3.select(this);
        //         var i = d3.interpolateNumber(+that.text(), Math.abs(d.height));
        //         return function(t){
        //             that.text(i(t).toFixed(1));
        //         };
        //     });
        // texts.exit().remove();
        /* --------- SORT TEXT & FACES ---------*/

        ce.selectAll('._3d').sort(d3._3d().sort);

    }

    function setCube(xSize, ySize, zSize, index, dx, dy, dz, cubesData, id){
        var cnt = 0;
        var x = 0;
        var linesData = 0;
        for(var z = zSize/2; z > -zSize/2; z--){
            for(var y = ySize/2; y > -ySize/2; y--){
                for(var x = xSize/2; x > -xSize/2; x--){
                // var index = d3.randomUniform(2, 4)();
                linesData=seprateCube(x+0.5+dx, y+0.5+dy, z+0.5+dz, index); 
                // front.push(linesData[0]);
                // end.push(linesData[1]);
                front = front.concat(linesData[0]);
                end = end.concat(linesData[1]);
                console.log("front",front);
                console.log("end",end);
                var _cube = makeCube(x+0.5+dx, y+0.5+dy, z+0.5+dz, index);                 
                    _cube.id = 'cube_' + (cnt++) +'_'+id;
                    _cube.height = index;
                    cubesData.push(_cube);
                    // console.log(x+0.5, y+0.5, z+0.5);
                }
                
            }
        }        
        // front = removeDuplicates(front);
        // end = removeDuplicates(end);
        var result = [cubesData,front,end];
        return result;
    }

    function removeDuplicates(array){
        let unique = [];
        array.forEach(element => {
            if(!unique.indexOf(element)){
                unique.push(element);
            }
        });
        return unique
    }
    

    function init(){
        cubesData = [];
        linesData = [];

        cubesData = setCube(5,5,1,1,0,6,0,cubesData,'input')
        cubesData = setCube(3,3,1,1,0,6,10,cubesData[0],'filter')
        linesData = makeLines(linesData, cubesData[1], cubesData[2]);
        cubesData = setCube(1,1,1,1,0,6,20,cubesData[0],'output')        
        linesData = makeLines(linesData, cubesData[1], cubesData[2]);

        // processData(cubes3D.rotateY(startAngle).rotateX(-startAngle)(cubesData), 1000);
        processData(cubes3D.rotateY(1.0).rotateX(-0.5)(cubesData[0]), 1000, '#6beaf32f',lines3D);
        // lines3D.rotateY(1.0).rotateX(-0.5)(linesData));
        setColor('cube', '#6beaf32f', 0, '')
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
        processData(cubes3D.rotateY(beta + startAngle).rotateX(alpha - startAngle)(cubesData[0]), 0, '#6beaf32f', lines3D );
    }

    function dragEnd(){
        mouseX = d3.event.x - mx + mouseX;
        mouseY = d3.event.y - my + mouseY;
    }

    function makeCube(x, y, z, index){    
        
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
                        {x: x - index/2  , y: y + index/2 , z: z + index/2 }, // FRONT TOP LEFT
                        {x: x - index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM LEFT
                        {x: x + index/2  , y: y - index/2 , z: z + index/2 }, // FRONT BOTTOM RIGHT
                        {x: x + index/2 , y: y + index/2 , z: z + index/2 }, // FRONT TOP RIGHT
                        {x: x - index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP LEFT
                        {x: x - index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM LEFT
                        {x: x + index/2 , y: y - index/2 , z: z - index/2 }, // BACK  BOTTOM RIGHT
                        {x: x + index/2 , y: y + index/2 , z: z - index/2 }, // BACK  TOP RIGHT
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
        // console.log("frontPoint=>",frontPoint);
        // console.log("endPoint=>",endPoint);
        return [frontPoint ,endPoint]
    }

    function makeLines(linesData, fromdata, todata){
        console.log('fromdata',fromdata);
        console.log('todata',todata);
        for (var i = 0; i < fromdata.length; i++){
            for (var j = 0; j < todata.length; j++){
                linesData.push([fromdata[i],todata[j]])
            }    
        }
        console.log('linesData',linesData.length);

        return linesData
    }

    function setColor(id, chageColor, delaytime){
        d3.select(id)
            .transition()
            .duration(0)
            .delay(1000*delaytime)
            .style("fill", chageColor)
            .transition()
            .duration(1000)
            .style("fill", '#6beaf32f')
    }

    // function keepColor(id, chageColor, delaytime){
    //     d3.select(id)
    //             .transition()
    //             .duration(0)
    //             .delay(1000*delaytime)
    //             .style("fill", chageColor)
    // }

    function filter(){
        // for(var i = 0; i < 9; i++){
        //     d3.select('#cube_'+i+'_filter')
        //     .style("fill", 'blue')
        // }
        d3.select('#cube_0_filter').style("fill", 'blue')
        d3.select('#cube_1_filter').style("fill", 'blue')
        d3.select('#cube_2_filter').style("fill", 'blue')
        d3.select('#cube_3_filter').style("fill", 'blue')
        d3.select('#cube_4_filter').style("fill", 'blue')
        d3.select('#cube_5_filter').style("fill", 'blue')
        d3.select('#cube_6_filter').style("fill", 'blue')
        d3.select('#cube_7_filter').style("fill", 'blue')
        d3.select('#cube_8_filter').style("fill", 'blue')
    }

    function conv(i,delaytime){
        setColor('#cube_'+(i+0)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+1)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+2)+'_input','blue' ,delaytime);

        setColor('#cube_'+(i+5)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+6)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+7)+'_input','blue' ,delaytime);

        setColor('#cube_'+(i+10)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+11)+'_input','blue' ,delaytime);
        setColor('#cube_'+(i+12)+'_input','blue' ,delaytime);

    }  
    
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

    // strikeOne(); //set cube strike 1 
    filter(); //add color to filter
   

    

    

    
    
    

}
// },false);