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
var data = [{"location" : Pi2/8, "color":"none", "link":"http://2018.igem.org/wiki/images/9/96/T--Cornell--image-1.jpg", "text": "Plasmid Kit Usage", "id": "image-1"}, //image 1 isn't used
            {"location" : 2*Pi2/8, "color":"#2E86AB", "link":"http://2018.igem.org/wiki/images/0/09/T--Cornell--image-2.png", "text": "Splash! At Cornell", "id": "image-2"},
            {"location" : 3*Pi2/8, "color":"#C93843", "link":"http://2018.igem.org/wiki/images/2/2e/T--Cornell--image-3.png", "text": "State Fair", "id": "image-3"},
            {"location" : 4*Pi2/8, "color":"#E8B023", "link":"http://2018.igem.org/wiki/images/8/88/T--Cornell--image-4.png", "text": "4H Career Exploration", "id": "image-4"},
            {"location" : 5*Pi2/8, "color":"#D741A7", "link":"http://2018.igem.org/wiki/images/e/e1/T--Cornell--image-5.png", "text": "Ithaca Activity Center", "id": "image-5"},
            {"location" : 6*Pi2/8, "color":"#498467", "link":"http://2018.igem.org/wiki/images/2/2e/T--Cornell--image-6.png", "text": "Ithaca High School", "id": "image-6"},
            {"location" : 7*Pi2/8, "color": "#2E86AB", "link":"http://2018.igem.org/wiki/images/2/26/T--Cornell--image-7.png", "text": "Y.O.U.R.S.", "id": "image-7"},
            {"location" : Pi2, "color":"#C93843", "link":"http://2018.igem.org/wiki/images/d/dd/T--Cornell--image-8.jpg", "text": "Members at State Fair", "id": "image-8"}];

var data2 = [{"location" : Pi2/8, "color":"#D741A7", "link":"http://2018.igem.org/wiki/images/f/f3/T--Cornell--image-9.png", "text": "Plasmid Kit", "id": "image-9"},
            {"location" : 2*Pi2/8, "color":"#498467", "link":"http://2018.igem.org/wiki/images/b/b8/T--Cornell--image-10.png", "text": "Plasmid Girl", "id": "image-10"},
            {"location" : 3*Pi2/8, "color":"#2E86AB", "link":"http://2018.igem.org/wiki/images/9/96/T--Cornell--image-11.png", "text": "State Fair Girl", "id": "image-11"},
            {"location" : 4*Pi2/8, "color":"#C93843", "link":"http://2018.igem.org/wiki/images/0/00/T--Cornell--image-12.png", "text": "Whiteboard", "id": "image-12"},
            {"location" : 5*Pi2/8, "color":"#E8B023", "link":"http://2018.igem.org/wiki/images/d/d3/T--Cornell--image-13.png", "text": "Development", "id": "image-13"},
            {"location" : 6*Pi2/8, "color":"#D741A7", "link":"http://2018.igem.org/wiki/images/6/65/T--Cornell--image-14.png", "text": "CloseUp", "id": "image-14"},
            {"location" : 7*Pi2/8, "color":"#498467", "link":"http://2018.igem.org/wiki/images/8/8c/T--Cornell--image-15.png", "text": "Scratch", "id": "image-15"},
            {"location" : Pi2, "color":"#2E86AB", "link":"http://2018.igem.org/wiki/images/5/58/T--Cornell--image-16.png", "text": "Collaboration", "id": "image-16"}];
var image = svg.append("rect")
                .attr("y", offsety-radius)
                .attr("x", offsetx-radius)
                .attr("width", radius*2)
                .attr("height", radius*2)
                .attr("opacity", 0);
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

data.forEach(function(d) {
  defs.append("svg:pattern")
    .attr("id", d.id)
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
data2.forEach(function(d) {
  defs.append("svg:pattern")
    .attr("id", d.id)
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
                    .attr("fill", "#E8B023")
                    .on("mouseover", mouseover)
                    .on("mouseout", mouseout)
                    .on("click", OnClickInner)
                    .attr("transform", "translate("+offsetx+","+offsety+")");

var words1 = svg.append("g").selectAll("text").data(data).enter().append("text")
    .append("textPath") //append a textPath to the text element
    .attr("xlink:href",function(d, i) {return "#Path" + i;}) //place the ID of the path here
    .style("text-anchor","middle") //place the text halfway on the arc
    .attr("fill", "white")
    .attr("startOffset", "25%")
    .attr("class", "plasmid-text")
    .text(function(d) {return d.text;});



function Onclick(d, i){ //interesting, you can add a data parameter without specifying it...
  MakeArcs.transition().attr("d", arc).attr("fill", function (d) {return d.color;}).attr("opacity", 1);
  d3.select(this).transition().duration(100).attr("d", arc2);
  arcbutton.transition().attr("fill", "#E8B023");
  if (!imgShown){
    image.transition().duration(200).attr("opacity", 1).attr("r", radius);
    imgShown = true;
    innerIMGshown = false;
  }
  image.style("fill", "url(#"+d.id+")"); //i is an integer value

  InnerArcs.transition().duration(200).attr("d", arc).attr("opacity", 0);
  InnerArcsText.transition().attr("display", "none");
}

function OnClickInner() {

  arcbutton.transition().attr("fill", "#E8B023");
  MakeArcs.transition().attr("d", arc).attr("fill", function (d) {return d.color;}).attr("opacity", 1);
  InnerArcs.transition().attr("d", arc4).attr("opacity", 1);
  InnerArcsText.transition().delay(150).attr("display", "null").attr("fill", "white");

  imgShown = false;
  innerIMGshown = false;

  image.transition().duration(600).attr("opacity", 0).attr("r", radius/8);
}

function OnClickInnerPic(d) {
  if (!innerIMGshown){
    image.transition().duration(200).attr("opacity", 1).attr("r", radius);
    innerIMGshown = true;
  }
  image.style("fill", "url(#"+d.id+")");
}

function mouseover() {
  d3.select(this).attr("opacity", 0.5);

}
function mouseout(){
  d3.select(this).attr("opacity", 1);
}
