const svgHeight = 800; //svg is container containing everything
const svgWidth = 1100;
var shadow = false; //shadow determines the drop shadow, not sure if implementing yet
var GFParr = [];
var hrpRarr = [];
var hrpSarr = [];
var isParsed = true; //whether the data is parsed or not
var freq = 1; //freq is current frequency
var GFPpath = null;
var hrpRpath = null;
var hrpSpath = null;
const datalength = 398; //length of data aka how many frequencies .
const datarange = .1; //how wide the data spreads
var hrpR = null; //these contain the circles that shows the data
var hrpS = null;
var GFP = null;
var focus = null;
var movable = true;
var form = d3.format("0.5f"); //formating
var form2 = d3.format("0.0f");
//svg is the svg container reference svg2 might be animation
/*const svg2 = d3.select("body").append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight); */
const svg = d3.select("#modeling-content").append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .style("opacity", 0);

// svg repositioning using jquery
//$("svg").css({top: 50, left: 200, position:'absolute'});
//$("rect").css({position:'absolute'});
//creating the graph

const graphHeight = 300;
const graphWidth = 600;
const offsety = 100; //offset of the svg from border
const offsetx = (250);
//creating interpolation function for our graph
var xScale = d3.scaleLinear().domain([0,datalength]).range([0, graphWidth]);
var xScale2 = d3.scaleLinear().domain([0,140]).range([0, graphWidth]);
var yScale = d3.scaleLinear().domain([0,datarange]).range([graphHeight, 0]);
var yScale2 = d3.scaleLinear().domain([0,1]).range([graphHeight, 0]);
//Code for text ====================================================================================================

//svg.append("text").text("Values").attr("x", graphWidth+300).attr("y", 100);
svg.append("text").text("Frequency:").attr("x", 30).attr("y", 210);
svg.append("text").text("hrpS:").attr("x", 30).attr("y", 240).attr("fill", "blue");
svg.append("text").text("hrpR:").attr("x", 30).attr("y", 270).attr("fill", "green");
svg.append("text").text("GFP:").attr("x", 30).attr("y", 300).attr("fill", "red");

var FrequencyText = svg.append("text").text("0s").attr("x", 110).attr("y", 210);
var HRPSText = svg.append("text").text("0").attr("x", 80).attr("y", 240).attr("fill", "blue");
var HRPRText = svg.append("text").text("0").attr("x", 80).attr("y", 270).attr("fill", "green");
var GFPText = svg.append("text").text("0").attr("x", 70).attr("y", 300).attr("fill", "red");


//Code for text ====================================================================================================

//Our function to convert Matrix to points on a line
const line = d3.line()
             .curve(d3.curveLinear)
             .x(function(d) {return xScale(d[0]-1);}) //since the first column is 1->data value, this extablished the domain first column basically 1,2,3,4...
             .y(function(d) {return yScale(d[freq]);});
createMovingObject();
createGraph();
parseData(); //read data and make graphs
//makeShadow(); //drop shadow
MyTransition();
//Radial Scroller Code ==============================================================================================================================
var PI2 = Math.PI*2;
var slideable = false;
var radius = 200;
for (var i = 0; i < 8; i++) {
  svg.append("line")
      .attr("x1", (radius-5)*Math.cos(i*PI2/(8*2) - Math.PI/2))
      .attr("x2", (radius+5)*Math.cos(i*PI2/(8*2) - Math.PI/2))
      .attr("y1", (radius-5)*Math.sin(i*PI2/(8*2) - Math.PI/2))
      .attr("y2", (radius+5)*Math.sin(i*PI2/(8*2) - Math.PI/2))
      .attr("stroke-width", 2)
      .attr("stroke", d3.rgb(201, 56, 67))
      .attr("transform", "translate(0, 250)");
}
var arc = d3.arc()
    .startAngle(0)
    .outerRadius((radius+3)) //centered at 125
    .innerRadius((radius-3))
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(PI2);

var CurrAngle = 0;

var arc2 = d3.arc()
    .startAngle(0)
    .outerRadius((radius+3))
    .innerRadius((radius-3))
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(0);

var RadSlider = svg.append("path")
    .attr("d", arc)
    .attr("id", "RadSlider")
    .attr("fill", d3.rgb(227, 172, 36))
    .attr("transform", "translate(0,250)");//yellowish?

var DragLine = svg.append("path")
    .attr("d", arc2)
    .attr("fill", d3.rgb(201, 56, 67)) //now reddish //blueish d3.rgb(13, 28, 56)
    .attr("transform", "translate(0,250)");

var DragObject = svg.append("circle")
  .attr("r", 10)
  .attr("cx", 0)
  .attr("cy", -150)
  .attr("transform", "translate(0,"+radius+")")
  .attr("fill", d3.rgb(201, 56, 67)); //redish

var DragOverLay = svg.append("circle") //the overlay
  .attr("pointer-events", "all")
  .attr("class", "overlay")
  .attr("r", (radius+75))
  .attr("cx", 0)
  .attr("cy", 250)
  .attr("fill", "none")
  .on("mousemove", Dragging)
  .on("mousedown", mouseDrag4)
  .on("mouseup", mouseDrag2)
  .on("mouseout", mouseDrag2);

function Dragging() {
  console.log(slideable);
  if (slideable) {
    console.log(d3.mouse(document.body)); //d3.mouse(this) is current object, we want parent
    CurrAngle = Math.atan(d3.mouse(d3.select("#RadSlider").node())[1]/d3.mouse(d3.select("#RadSlider").node())[0]) + Math.PI/2; //referencing the slider as the coordinate
    console.log(CurrAngle);
    arc2.endAngle(CurrAngle);
    DragLine.attr("d", arc2);
    DragObject.transition().duration(1).attr("cx", radius*Math.cos(CurrAngle - Math.PI/2)).attr("cy", radius*Math.sin(CurrAngle - Math.PI/2) + (250-radius))
  }

}
function mouseDrag1() {
  slideable = true;
}
function mouseDrag2() {
  slideable = false;
  freq = Math.round(32*CurrAngle/Math.PI)+1; //I used round istead of floor because the simple slider uses round on axis
  console.log(freq);
  FrequencyText.text(form2(3550+freq*50) + "s");
  //if (isParsed) {
    GFPpath.transition().attr("d", line(GFParr));
    hrpSpath.transition().attr("d", line(hrpSarr));
    hrpRpath.transition().attr("d", line(hrpRarr));
  //  }
}

function mouseDrag4() {
  CurrAngle = Math.atan(d3.mouse(d3.select("#RadSlider").node())[1]/d3.mouse(d3.select("#RadSlider").node())[0]) + Math.PI/2;
  arc2.endAngle(CurrAngle);
  DragLine.attr("d", arc2);
  DragObject.transition().duration(10).attr("cx", radius*Math.cos(CurrAngle - Math.PI/2)).attr("cy", radius*Math.sin(CurrAngle - Math.PI/2) + (250-radius))
  slideable = true;
}

//Radial Scroller Code ==============================================================================================================================
//all functions
function parseData() { //asynchronous thing
  //creates an array of arrays with arr[time][data]
  d3.csv("/js/modelingData/GFP.csv", function(data) {
    GFParr.push(Object.values(data));
    if (GFParr.length == datalength+1) {
      //console.log(arr); testing
      GFPpath = svg.append("path").attr("d", line(GFParr))
                        .attr("stroke", "red")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        .style("filter", function() { return shadow ? "url(#drop-shadow)" : "" ;})
                        .attr("transform", "translate("+offsetx+","+ offsety+")");
    }
  });
  d3.csv("/js/modelingData/hrpS.csv", function(data) {
    hrpSarr.push(Object.values(data));
    if (hrpSarr.length == datalength+1) {
      //console.log(arr); testing
      hrpSpath = svg.append("path").attr("d", line(hrpSarr))
                        .attr("stroke", "blue")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        .style("filter", function() { return shadow ? "url(#drop-shadow)" : "" ;})
                        .attr("transform", "translate("+offsetx+","+ offsety+")");
    }
  });
  d3.csv("/js/modelingData/hrpR.csv", function(data) {
    hrpRarr.push(Object.values(data));
    if (hrpRarr.length == datalength+1) {
      //console.log(arr); testing
      hrpRpath = svg.append("path").attr("d", line(hrpRarr))
                        .attr("stroke", "green")
                        .attr("stroke-width", 1)
                        .attr("fill", "none")
                        .style("filter", function() { return shadow ? "url(#drop-shadow)" : "" ;})
                        .attr("transform", "translate("+offsetx+","+ offsety+")");
    }
  });
}
function createGraph() { //creates the shape of the graph
  var x_axis = d3.axisBottom().scale(xScale2).ticks(20);
  var y_axis = d3.axisLeft().scale(yScale);
  var x_title = svg.append("text").text("Minutes").attr("x", svgWidth/2 -50).attr("y", graphHeight+offsety+50);
  //overlay that determines points
  svg.append("rect")
     .attr("pointer-events", "all")
     .attr("class", "overlay")
     .attr("x", offsetx)
     .attr("y", offsety)
     .attr("width", graphWidth)
     .attr("height", graphHeight)
     .attr("fill", "none")//you can also set color
     .on("mouseover", mouseOver)
     .on("mouseout", mouseOut)
     .on("click", mouseClick)
     .on("mousemove", mouseMove);
  for (let i = 1; i<11 ; i++) {
    svg.append("line")
       .style("stroke", "grey")
       .style("stroke-dasharray", "8,8")
       .style("opacity", 0.3)
       .attr("x1", offsetx)
       .attr("y1", yScale2(0.1*i)+offsety)
       .attr("x2", graphWidth + offsetx)
       .attr("y2", yScale2(0.1*i)+offsety);

  }
  svg.append("g")
     .call(y_axis)
     .attr("transform", "translate(" + offsetx + ","+ offsety +")");
  svg.append("g")
     .call(x_axis)
     .attr("transform", "translate("+offsetx +"," + (graphHeight+offsety) + ")");
}
function createMovingObject() {
  focus = svg.append("g") //focus is our object that moves
                 .attr("class", "focus")
                 .raise()
                 .style("display", "none");
  focus.append("line")
       .style("stroke", "black")
       .attr("x1", 0)
       .attr("y1", offsety)
       .attr("x2", 0)
       .attr("y2", offsety+graphHeight);
  GFP = focus.append("circle")
       .attr("r", 5)
       .attr("fill", "red")
       .attr("stroke", "white");
  hrpR = focus.append("circle")
       .attr("r", 5)
       .attr("fill", "green")
       .attr("stroke", "white");
  hrpS = focus.append("circle")
       .attr("r", 5)
       .attr("fill", "blue")
       .attr("stroke", "white");
}
function mouseClick() {
  movable = !movable;
}
function mouseMove() {
  if (movable) {
    focus.select("line").attr("transform", "translate(" + d3.mouse(this)[0] + ",0)");
    console.log(GFParr[Math.round(xScale.invert(d3.mouse(this)[0] - offsetx))][freq]);

    let xVAL = xScale.invert(d3.mouse(this)[0] - offsetx);
    let xRound = Math.floor(xVAL);
    let GFPyValue = (yScale(GFParr[xRound+1][freq]) - yScale(GFParr[xRound][freq]))*(xVAL-xRound)+offsety+yScale(GFParr[xRound][freq]);
    let hrpSyValue = (yScale(hrpSarr[xRound+1][freq]) - yScale(hrpSarr[xRound][freq]))*(xVAL-xRound)+offsety+yScale(hrpSarr[xRound][freq]);
    let hrpRyValue = (yScale(hrpRarr[xRound+1][freq]) - yScale(hrpRarr[xRound][freq]))*(xVAL-xRound)+offsety+yScale(hrpRarr[xRound][freq]);
    //let yVAL = (yScale(arr[Math.round(xScale.invert(d3.mouse(this)[0] - offsetx))][freq])+offsety);
    //d3.select("#value").text("GFP = " + GFPyValue + ", hrpS = " + hrpSyValue + ", hrpR = " + hrpRyValue);
    HRPSText.text(form((hrpSarr[xRound][freq])));
    HRPRText.text(form(hrpRarr[xRound][freq]));
    GFPText.text(form(GFParr[xRound][freq]));

    GFP.attr("transform", "translate(" + d3.mouse(this)[0] + "," + GFPyValue + ")");
    hrpS.attr("transform", "translate(" + d3.mouse(this)[0] + "," + hrpSyValue + ")");
    hrpR.attr("transform", "translate(" + d3.mouse(this)[0] + "," + hrpRyValue + ")");
  }

  //focus.select("rect").attr("transform", "translate(" + d3.mouse(this)[0] + "," + GFPyValue + ")"); originally wanted moving rect.
}
function mouseOut() {
  if (movable) {
    focus.style("display", "none");
  }

}
function mouseOver() {
  if (movable) {
    focus.style("display", null);
  }
}
function MyTransition() {
  svg.transition().delay(1000).duration(1000).style("opacity", 1);
}
function makeShadow() {
  if (shadow) {
    let defs = svg.append("defs");
    let stdDeviation = 3;
    let filter = defs.append("filter")
                     .attr("id", "drop-shadow")
                     .attr("height", "130%")
                     .attr("filterUnits","userSpaceOnUse");
    filter.append("feColorMatrix")
          .attr("result", "offOut")
          .attr("in", "offOut")
          .attr("type", "matrix")
          .attr("values", "1 1 1 1 1 " +
                          "0 0 0 0 0 " +
                          "0 0 0 0 0 " +
                          "0 0 0 1 0");
    filter.append("feGaussianBlur")
            .attr("in", "SourceGraphic") //SourceAlpha for black shadow/ matrixOut for color / graphic for its own color
            .attr("stdDeviation", stdDeviation)
            .attr("result", "blur");
    filter.append("feOffset")
          .attr("in", "blur")
          .attr("dx", stdDeviation)
          .attr("dy", stdDeviation)
          .attr("result", "offsetBlur");
    let feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in","offsetBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");
  }
}