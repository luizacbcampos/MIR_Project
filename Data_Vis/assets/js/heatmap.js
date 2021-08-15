// Heatmap year x falsetto

// set the dimensions and margins of the graph
const margin = {top: 100, right: 25, bottom: 100, left: 40};

var viewportWidth = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
var viewportHeight = parseInt(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));



var width = parseInt((viewportWidth - margin.left - margin.right)*0.95); // Use the window's width
var height = 450 - margin.top - margin.bottom;
//parseInt((viewportHeight - margin.top - margin.bottom)*0.95); // Use the window's height


var widthValue = width + margin.left + margin.right;
var heightValue = height + margin.top + margin.bottom;

var og_ratio = height/width

// append the svg object to the body of the page
const svg = d3.select("#heatmap")
.append("svg")
.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main-isadora/Data_Vis/Heatmap/falsetto_by_year.csv").then(function(data){
  console.log("Heatmap")
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
      d3.select(this)
          .style("stroke", "black")
          .style("opacity", 1)

      TooltipMouse
          .style("stroke", "black")
          .style("opacity", 1)
  }
  const mousemove = function(event,d) {


      const matrix = this.getScreenCTM()
          .translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));

      const dx = window.pageXOffset + matrix.e;
      const dy = window.pageYOffset + matrix.f;

    TooltipMouse
      .text("Valor: " + event.count)
      .style("position", "absolute")
      .style("left", (dx + d3.mouse(this)[0] + 35) + "px")
      .style("top", (dy + d3.mouse(this)[1] - 35) + "px")

  }
  const mouseleave = function(event,d) {
      TooltipMouse
          .style("opacity", 0)
      d3.select(this)
          .style("stroke", "none")
          .style("opacity", 0.8)
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
  
  const gridSize = Math.floor(width / 25);
  const legendWidth = (gridSize/2 + 4);

  const maxNum = Math.round(d3.max(data,function(d){ return d.value; }));

  const colors = colorbrewer.RdYlGn[10];
  const colorScale = d3.scale.quantile()
      .domain([0, 10 - 1, maxNum])
      .range(colors);

  const legend = svg.selectAll(".legend")
      .data([0].concat(colorScale.quantiles()), function(d) { return d; })
      .enter().append("g")
      .attr("class", "legend");

  legend.append("rect")
    .attr("x", function(d, i) { return gridSize * 11; })
    .attr("y", function(d, i) { return (i * legendWidth + 7); })
    .attr("width", gridSize/2)
    .attr("height", gridSize/2)
    .style("fill", function(d, i) { return colors[i]; })
    .attr("class", "square");

  legend.append("text")
    .attr("class", "mono")
    .text(function(d) { return "≥ " + Math.round(d); })
    .attr("x", function(d, i) { return gridSize * 11 + 25; })
    .attr("y", function(d, i) { return (i * legendWidth + 20); })

})//AQUI





