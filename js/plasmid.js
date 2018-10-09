var imgShown = false;
var radius = 120;
var offsetx = 280;
var offsety = radius + 40;
const svg = d3.select("#plasmidContent") //container class to make it responsive
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
   .attr("preserveAspectRatio", "xMinYMin slice")
   .attr("viewBox", "0 0 600 400")
   //class to make it responsive
   .classed("svg-content-responsive", true);
var Pi2 = 2*Math.PI;
//data containing information of each arc
var data = [{"location" : Pi2/8, "color":"red", "link":"images/Plasmid/image-1.jpg", "text": "text1"},
            {"location" : 2*Pi2/8, "color":"blue", "link":"images/Plasmid/image-2.jpg", "text": "text2"},
            {"location" : 3*Pi2/8, "color":"green", "link":"images/Plasmid/image-3.jpg", "text": "text3"},
            {"location" : 4*Pi2/8, "color":"orange", "link":"images/Plasmid/image-4.jpg", "text": "text4"},
            {"location" : 5*Pi2/8, "color": d3.rgb(83, 66, 244), "link":"images/Plasmid/image-5.jpg", "text": "text5"},
            {"location" : 6*Pi2/8, "color":d3.rgb(83, 96, 244), "link":"images/Plasmid/image-6.jpg", "text": "text6"},
            {"location" : 7*Pi2/8, "color":d3.rgb(83, 66, 144), "link":"images/Plasmid/image-7.jpg", "text": "text7"},
            {"location" : Pi2, "color":"magenta", "link":"images/Plasmid/image-8.jpg", "text": "text8"}];

var data2 = [{"location" : Pi2/8, "color":"red", "link":"img/image-1.jpg", "text": "text1"},
            {"location" : 2*Pi2/8, "color":"blue", "link":"img/image-2.jpg", "text": "text2"},
            {"location" : 3*Pi2/8, "color":"green", "link":"img/image-3.jpg", "text": "text3"},
            {"location" : 4*Pi2/8, "color":"orange", "link":"img/image-4.jpg", "text": "text4"},
            {"location" : 5*Pi2/8, "color": d3.rgb(83, 66, 244), "link":"img/image-5.jpg", "text": "text5"},
            {"location" : 6*Pi2/8, "color":d3.rgb(83, 96, 244), "link":"img/image-6.jpg", "text": "text6"},
            {"location" : 7*Pi2/8, "color":d3.rgb(83, 66, 144), "link":"img/image-7.jpg", "text": "text7"},
            {"location" : Pi2, "color":"magenta", "link":"img/image-8.jpg", "text": "text8"}];
//creating the arc function
var arc = d3.arc() //regular arc
    .startAngle(function (d) {return d.location - Pi2/8;})
    .outerRadius(radius + 15)
    .innerRadius(radius + 5)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location;});
var arc2 = d3.arc() //resulting arc from clicking
    .startAngle(function (d) {return d.location - Pi2/8;})
    .outerRadius(radius + 18)
    .innerRadius(radius + 2) //this is the extended version
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location;});
var arc3 = d3.arc() //seperate single arc
    .startAngle(0)
    .outerRadius(radius + 15)
    .innerRadius(radius + 5)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(Pi2/8);
var arc4 = d3.arc() //arc for inside arc.
    .startAngle(function (d) {return d.location - Pi2/8;})
    .outerRadius(radius + 15)
    .innerRadius(radius + 5)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location;});
var Paths = svg.selectAll("path").data(data);
//creating the actual arcs

var defs = svg.append('svg:defs');
const width = 2*radius;
const height = 2*radius;
data.forEach(function(d, i) {
  defs.append("svg:pattern")
    .attr("id", "image" + i)
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", d.link)
    .attr("width", width)
    .attr("height", height)
    .attr("x", offsetx-width/2) //spend so long figuring this math out :(
    .attr("y", offsety-width/2);
  });

var image = svg.append("circle")
                .attr("cy", offsety)
                .attr("cx", offsetx)
                .attr("r", radius/8)
                .attr("opacity", 0);
var MakeArcs = Paths.enter().append("path")
                    .attr("id", function (d,i) {return "Path" + i;})
                    .attr("d", arc)
                    .attr("fill", function (d) {return d.color;})
                    .on("click", Onclick)
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .attr("transform", "translate("+offsetx+","+offsety+")");

var words = svg.selectAll("text").data(data).enter().append("text")
   .append("textPath") //append a textPath to the text element
    .attr("xlink:href",function(d, i) {return "#Path" + i;}) //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("startOffset", "25%")
    .text(function(d) {return d.text;});

function Onclick(d, i){ //interesting, you can add a data parameter without specifying it...
  MakeArcs.transition().attr("d", arc).attr("fill", function (d) {return d.color;}).attr("opacity", 1);
  d3.select(this).transition().duration(100).attr("d", arc2);
  if (!imgShown){
    image.transition().duration(200).attr("opacity", 1).attr("r", radius);
    imgShown = !imgShown;
  }
  image.style("fill", "url(#image"+ i +")"); //i is an integer value

}
function mouseover() {
  d3.select(this).attr("opacity", 0.5);

}
function mouseout(){
  d3.select(this).attr("opacity", 1);
}
