  

  // set the dimensions and margins of the graph
  const margin = {top: 200, right: 30, bottom: 50, left:150},
      width = 800 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;
  
  // append the svg object to the body of the page
  const svg = d3.select("#my_dataviz")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            `translate(${margin.left}, ${margin.top})`);
  
  function updategraph(year1, year2) {
    //read data
    d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/Data_Vis/assets/data/ridgeline_map.csv").then(function(data) {
    
      // Get the different categories and count them
      const categories = [
          "weeks_charted_all_time",
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
      const n = categories.length
      //const year1 = 1990
      //const year2 = 2015
    
      // Add X axis
      const x = d3.scaleLinear()
        .domain([-60, +60])
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    
      // Create a Y scale for densities
      const y = d3.scaleLinear()
        .domain([0, 1.2]) //////////////////////////////////////////////////////////// TODO
        .range([ height, 0]);
    
      // Create the Y axis for names
      const yName = d3.scaleBand()
        .domain(categories)
        .range([0, height]) //////////////////////////////////////////////////////////// TODO
        .paddingInner(1)
        
      svg.append("g")
        .call(d3.axisLeft(yName));
    
      // Compute kernel density estimation for each column:
      const kde = kernelDensityEstimator(kernelEpanechnikov(7), x.ticks(40)) // increase this 40 for more accurate density.
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
          .attr("transform", function(d){return(`translate(0, ${(yName(d.key)-height)})`)})
          .datum(function(d){return(d.density)})
          .attr("fill", "#6977b3")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("d",  d3.line()
              .curve(d3.curveBasis)
              .x(function(d) { return x(d[0]); })
              .y(function(d) { return y(d[1]); })
          )

      svg.selectAll("areas")
        .data(allDensity2)
        .join("path")
          .attr("transform", function(d){return(`translate(0, ${(yName(d.key)-height)})`)})
          .datum(function(d){return(d.density)})
          .attr("fill", "#b36969  ")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("d",  d3.line()
              .curve(d3.curveBasis)
              .x(function(d) { return x(d[0]); })
              .y(function(d) { return y(d[1]); })
          )
    
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

