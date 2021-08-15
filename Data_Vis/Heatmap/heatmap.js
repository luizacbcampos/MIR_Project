// set the dimensions and margins of the graph
const margin = {top: 80, right: 25, bottom: 100, left: 40},
width = 1850 - margin.left - margin.right,
height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main-isadora/Data_Vis/Heatmap/falsetto_by_year.csv").then(function(data) {

// Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
const myGroups = Array.from(new Set(data.map(d => d.year)))
const myVars = Array.from(new Set(data.map(d => d.falsetto)))

console.log(myVars)

// Build X scales and axis:
const x = d3.scaleBand()
  .range([ 0, width ])
  .domain(myGroups)
  .padding(0.05);
svg.append("g")
  .style("font-size", 13)
  .attr("transform", `translate(0, ${height})`)
  // .attr("transform", function(d, i) { return "rotate(90)"; })
  // .attr("transform", "rotate(90)")
  .call(d3.axisBottom(x).tickSize(d3.timeMonth))
  .selectAll("text")
    .attr("dy", "1.2em")
    .attr("dx", "-1.5em")
    .attr("transform", "rotate(-65)")
  .select(".domain").remove()
  // .attr("transform", "rotate(90)");


// Build Y scales and axis:
const y = d3.scaleBand()
  .range([ height, 0 ])
  .domain(myVars)
  .padding(0.05);
svg.append("g")
  .style("font-size", 15)
  .call(d3.axisLeft(y).tickSize(0))
  .select(".domain").remove()

// Build color scale
const myColor = d3.scaleSequential()
  .interpolator( d3.interpolateRdYlBu)
  .domain([0, 200])

// create a tooltip
const TooltipMouse = d3.select("#heatmap")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")

// Three function that change the tooltip when user hover / move / leave a cell
const mouseover = function(event,d) {
  TooltipMouse
    .style("stroke", "black")
    .style("opacity", 1)
}
const mousemove = function(event,d) {



  TooltipMouse
    .text(d.count)
    .style("position", "absolute")
    .style("left", (d3.mouse(this)[0] + 10) + "px")
    .style("top", (d3.mouse(this)[1] - 10) + "px")

}
const mouseleave = function(event,d) {
  TooltipMouse
          .style("opacity", 0)
}

// console.log(function(d) { return x(d.year) })

// add the squares
svg.selectAll()
  .data(data, function(d) {return d.year+':'+d.falsetto;})
  .join("rect")
    .attr("x", function(d) { return x(d.year) })
    .attr("y", function(d) { return y(d.falsetto) })
    .attr("rx", 4)
    .attr("ry", 4)
    .attr("width", x.bandwidth() )
    .attr("height", y.bandwidth() )
    // console.log(width)
    .style("fill", function(d) { return myColor(d.count)} )
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave)
})

// Add title to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -50)
      .attr("text-anchor", "left")
      .style("font-size", "22px")
      .text("A d3.js heatmap");

// Add subtitle to graph
svg.append("text")
      .attr("x", 0)
      .attr("y", -20)
      .attr("text-anchor", "left")
      .style("font-size", "14px")
      .style("fill", "grey")
      .style("max-width", 400)
      .text("A short description of the take-away message of this chart.");
