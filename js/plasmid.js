var imgShown = false;
var innerIMGshown = false;
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
var data = [{"location" : Pi2/8, "color":"none", "link":"images/Plasmid/image-1.jpg", "text": "Plasmid Kit Usage"}, //image 1 isn't used
            {"location" : 2*Pi2/8, "color":"blue", "link":"images/Plasmid/image-2.jpg", "text": "Splash At Cornell"},
            {"location" : 3*Pi2/8, "color":"green", "link":"images/Plasmid/image-3.jpg", "text": "State Fair"},
            {"location" : 4*Pi2/8, "color":"orange", "link":"images/Plasmid/image-4.jpg", "text": "4H Career Exploration"},
            {"location" : 5*Pi2/8, "color": d3.rgb(83, 66, 244), "link":"images/Plasmid/image-5.jpg", "text": "Ithaca Activity Center"},
            {"location" : 6*Pi2/8, "color":d3.rgb(83, 96, 244), "link":"images/Plasmid/image-6.jpg", "text": "Ithaca High School"},
            {"location" : 7*Pi2/8, "color":d3.rgb(83, 66, 144), "link":"images/Plasmid/image-7.jpg", "text": "Y.O.U.R.S."},
            {"location" : Pi2, "color":"magenta", "link":"images/Plasmid/image-8.jpg", "text": "Members at State Fair"}];

var data2 = [{"location" : Pi2/8, "color":"red", "link":"images/Plasmid/image-9.jpg", "text": "Plasmid Kit"},
            {"location" : 2*Pi2/8, "color":"blue", "link":"images/Plasmid/image-10.jpg", "text": "Plasmid Girl"},
            {"location" : 3*Pi2/8, "color":"green", "link":"images/Plasmid/image-11.jpg", "text": "State Fair Girl"},
            {"location" : 4*Pi2/8, "color":"orange", "link":"images/Plasmid/image-12.jpg", "text": "Whiteboard"},
            {"location" : 5*Pi2/8, "color": d3.rgb(83, 66, 244), "link":"images/Plasmid/image-13.jpg", "text": "Development"},
            {"location" : 6*Pi2/8, "color":d3.rgb(83, 96, 244), "link":"images/Plasmid/image-14.jpg", "text": "CloseUp"},
            {"location" : 7*Pi2/8, "color":d3.rgb(83, 66, 144), "link":"images/Plasmid/image-15.jpg", "text": "Scratch"},
            {"location" : Pi2, "color":"magenta", "link":"images/Plasmid/image-16.jpg", "text": "Collaboration"}];
//creating the arc function
var arc = d3.arc() //regular arc
    .startAngle(function (d) {return d.location - Pi2/8;})
    .outerRadius(radius + 25)
    .innerRadius(radius + 15)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location;});
var arc2 = d3.arc() //resulting arc from clicking
    .startAngle(function (d) {return d.location - Pi2/8;})
    .outerRadius(radius + 28)
    .innerRadius(radius + 12) //this is the extended version
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location;});
var arc3 = d3.arc() //seperate single arc
    .startAngle(0)
    .outerRadius(radius + 25)
    .innerRadius(radius + 15)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(Pi2/8);
var arc4 = d3.arc() //arc for inside arc.
    .startAngle(function (d) {return d.location - Pi2/16;})
    .outerRadius(radius + 13)
    .innerRadius(radius)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location + Pi2/16;});
var arc5 = d3.arc() //arc for inside arc when clicked.
    .startAngle(function (d) {return d.location - Pi2/16;})
    .outerRadius(radius+ 12)
    .innerRadius(radius - 7)
    .cornerRadius(2)
    .padAngle(0.005)
    .endAngle(function (d) {return d.location + Pi2/16;});
var Paths = svg.selectAll("path").data(data);
// Inner arcs ===============================================================================================================

//inner arcs

var InnerArcs = svg.append("g").selectAll("path").data(data2).enter().append("path")
                    .attr("id", function (d,i) {return "InnerPath" + i;})
                    .attr("d", arc)
                    .attr("fill", function (d) {return d.color;})
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("click", OnClickInnerPic)
                    .attr("transform", "translate("+offsetx+","+offsety+")")
                    .attr("opacity", 0);

var InnerArcsText = svg.append("g").selectAll("text").data(data2).enter().append("text")
    .attr("dy", 13)
    .append("textPath") //append a textPath to the text element
    .attr("xlink:href",function(d, i) {return "#InnerPath" + i;}) //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("startOffset", "25%")
    .attr("class", "plasmid-text")
    .text(function(d) {return d.text;})
    .on("click", OnClickInnerPic)
    .attr("display", "none");
// Inner arcs ===============================================================================================================


//creating the actual arcs
var defs = svg.append('svg:defs');
const width = 2*radius;
const height = 2*radius;

for (i = 1; i < 17; i ++) {
  defs.append("svg:pattern")
    .attr("id", "images/Plasmid/image-" + i + ".jpg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("patternUnits", "userSpaceOnUse")
    .append("svg:image")
    .attr("xlink:href", "images/Plasmid/image-"+i+".jpg")
    .attr("width", width)
    .attr("height", height)
    .attr("x", offsetx-width/2) //spend so long figuring this math out :(
    .attr("y", offsety-width/2);
}

/* not viable anymore
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
*/
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
//button controlling inner arcs #make the clicks and hov
var arcbutton = svg.append("path")
                    .attr("id", "arcButton")
                    .attr("d", arc3)
                    .attr("fill", "red")
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("click", OnClickInner)
                    .attr("transform", "translate("+offsetx+","+offsety+")");

var words1 = svg.append("g").selectAll("text").data(data).enter().append("text")
    .append("textPath") //append a textPath to the text element
    .attr("xlink:href",function(d, i) {return "#Path" + i;}) //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("startOffset", "25%")
    .attr("class", "plasmid-text")
    .text(function(d) {return d.text;});



function Onclick(d, i){ //interesting, you can add a data parameter without specifying it...
  MakeArcs.transition().attr("d", arc).attr("fill", function (d) {return d.color;}).attr("opacity", 1);
  d3.select(this).transition().duration(100).attr("d", arc2);
  arcbutton.transition().attr("fill", "red");
  if (!imgShown){
    image.transition().duration(200).attr("opacity", 1).attr("r", radius);
    imgShown = true;
    innerIMGshown = false;
  }
  image.style("fill", "url(#"+d.link+")"); //i is an integer value

  InnerArcs.transition().duration(200).attr("d", arc).attr("opacity", 0);
  InnerArcsText.transition().attr("display", "none");
}

function OnClickInner() {

  arcbutton.transition().attr("fill", d3.rgb(142, 11, 22));
  MakeArcs.transition().attr("d", arc).attr("fill", function (d) {return d.color;}).attr("opacity", 1);
  InnerArcs.transition().attr("d", arc4).attr("opacity", 1);
  InnerArcsText.transition().delay(150).attr("display", "null");

  imgShown = false;
  innerIMGshown = false;

  image.transition().duration(600).attr("opacity", 0).attr("r", radius/8);
}

function OnClickInnerPic(d) {
  if (!innerIMGshown){
    image.transition().duration(200).attr("opacity", 1).attr("r", radius);
    innerIMGshown = true;
  }
  image.style("fill", "url(#"+d.link+")");
}

function mouseover() {
  d3.select(this).attr("opacity", 0.5);

}
function mouseout(){
  d3.select(this).attr("opacity", 1);
}
