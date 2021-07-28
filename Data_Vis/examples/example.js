//example stack

draw("#svg1", "#data1");
draw("#svg2", "#data2");

function draw(selector, url){

var data = d3.csvParse(d3.select(url).text())

var width = 500,
    height = 150;

var svg = d3.select(selector)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

var xScale = d3.scalePoint()
    .domain(data.map(function(d) {
        return d.name
    }))
    .range([50, width - 50])
    .padding(0.5);

var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {
        return d.value
    }) * 1.1])
    .range([height - 20, 6]);

var line = d3.line()
	.x(function(d){ return xScale(d.name)})
	.y(function(d){ return yScale(d.value)});
	
svg.append("path")
	.attr("d", line(data))
	.attr("stroke", "teal")
	.attr("stroke-width", "2")
	.attr("fill", "none");

var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

svg.append("g").attr("transform", "translate(0,130)")
    .attr("class", "xAxis")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(50,0)")
    .attr("class", "yAxis")
    .call(yAxis);

}