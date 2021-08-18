// Density

// set the dimensions and margins of the graph
const margin = {top: 100, right: 170, bottom:70, left:170},
    width = 1000 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#density")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left}, ${margin.top})`);

// Get the different categories and count them
const categories = [
    //"weeks_charted_all_time",
    "falsetto",
    "spoken",
    "acousticness",
    "danceability",
    //"tempo",
    "energy",
    "instrumentalness",
    "liveness",
    "loudness",
    "speechiness",
    "valence"    
]

function updategraph(year1, year2) {
  //read data
  d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/Data_Vis/assets/data/normalized_ridgeline_map.csv").then(function(data) {

    const n = categories.length
    //const year1 = 1990
    //const year2 = 2015
  
    // Add X axis
    const x = d3.scaleLinear()
      .domain([-5, 5])
      .range([ 0, width ]);

    svg.append("g")
      .style("font-size", 13)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
  
    // Create a Y scale for densities
    const y = d3.scaleLinear()
      .domain([0, 7]) //////////////////////////////////////////////////////////// TODO
      .range([ height, 0]);
  
    // Create the Y axis for names
    const yName = d3.scaleBand()
      .domain(categories)
      .range([0, height]) //////////////////////////////////////////////////////////// TODO
      .paddingInner(1)

    svg.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (3*margin.top / 4))
      .attr("text-anchor", "middle")  
      .style("font-size", "25px") 
      .style("text-decoration", "bold")  
      .text("Densidade dos atributos por ano selecionado");
      
    svg.append("g")
    .style("font-size", 15)
      .call(d3.axisLeft(yName));
  
    // Compute kernel density estimation for each column:
    const kde = kernelDensityEstimator(kernelEpanechnikov(1), x.ticks(50)) // increase this 40 for more accurate density.
    const allDensity1 = []
    const allDensity2 = []
    for (i = 0; i < n; i++) {
        key1 = categories[i] + "_" + year1
        density_1 = kde( data.map(function(d){  return d[key1]; }) )

        key2 = categories[i] + "_" + year2
        density_2 = kde( data.map(function(d){  return d[key2]; }) )
        
        key = categories[i]
        allDensity1.push({key: key, density: density_1})
        allDensity2.push({key: key, density: density_2})
    }
  
    // Add areas
    svg.selectAll("areas")
      .data(allDensity1)
      .join("path")
	  .attr("class", "igor")
        .attr("transform", function(d){return(`translate(0, ${(yName(d.key)-height)})`)})
        .datum(function(d){return(d.density)})
        .attr("fill", d3.schemeSet3[6])//"#f5b540") 
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        )

    svg.selectAll("areas")
      .data(allDensity2)
      .join("path")
	  .attr("class", "igor")
        .attr("transform", function(d){return(`translate(0, ${(yName(d.key)-height)})`)})
        .datum(function(d){return(d.density)})
        .attr("fill", d3.schemeSet3[9]) //"#3e72c7")
        .attr("stroke", "#000")
        .attr("stroke-width", 0.5)
        .attr("d",  d3.line()
            .curve(d3.curveBasis)
            .x(function(d) { return x(d[0]); })
            .y(function(d) { return y(d[1]); })
        )

    // Y axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left/1.2)
        .attr("x", 0 - (height/ 2)+30)
        .style("fill", "grey")
        .style("font-size", "18px")
        .text("Métricas")
  
  })
}
updategraph(1958, 1958);


// This is what I need to compute kernel density estimation
function kernelDensityEstimator(kernel, X) {
  return function(V) {
    return X.map(function(x) {
      return [x, d3.mean(V, function(v) { return kernel(x - v); })];
    });
  };
}
function kernelEpanechnikov(k) {
  return function(v) {
    return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
  };
}

