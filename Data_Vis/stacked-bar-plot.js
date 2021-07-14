// Stacked bar plot year x falsetto
import loadDatav5 from './load-data.js';

export default function stacked(selector){
	    
	const margin = {top: 50, right: 30, bottom: 50, left: 50};
	var width = 1800 - margin.left - margin.right,
		height = 900 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(selector)
    	.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);	
  // Parse the Data
  d3.csv("falsetto_by_year.csv").then( function(data) {

    // List of subgroups = header of the csv files = soil condition here
    const subgroups = data.columns.slice(1)

    // List of years = species here = value of the first column called group -> I show them on the X axis
    const years = data.map(d => d.year)
    console.log(years)

    // Add X axis
    const x = d3.scaleBand()
        .domain(years)
        .range([0, width])
        .padding([0.2])
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 600])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add X axis label:
    svg.append("text")
    	.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 10) + ")")
    	.style("text-anchor", "middle")
    	.text("Ano");
    // Y axis label:
    svg.append("text")
    	.attr("text-anchor", "end")
    	.attr("transform", "rotate(-90)")
    	.attr("y", -margin.left+10)
    	.attr("x", 0 - (height/ 2)+margin.bottom)
    	.text("Quantidade de músicas")

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "20px") 
        .style("text-decoration", "bold")  
        .text("Valor de falsetto por ano");

    // color palette = one color per subgroup
    const color = d3.scaleOrdinal()
      .domain(subgroups)
      .range(d3.schemeSet3);

    // LEGEND
    var n = Math.ceil(subgroups.length/2);
    
    var itemWidth = 40;
    var itemHeight = 20;

    var legend = svg.selectAll(".legend")
    	.data(subgroups)
    	.enter()
    	.append("g")
    	.attr("transform", function(d,i) {
    		return "translate("+(i%n * itemWidth + width/2 - 105) + "," + Math.floor(i/n) * itemHeight + ")"; })
    	.attr("class","legend");

    var rects = legend.append('rect')
    	.attr("width",15)
    	.attr("height",15)
    	.attr("fill", function(d,i) { return color(i); });

    var text = legend.append('text')
		.attr("x", 15)
		.attr("y",15)
		.text(function(d) { return d.toString(); });

    //stack the data? --> stack per subgroup
    const stackedData = d3.stack()
      .keys(subgroups)
      (data)

    // ----------------
    // Highlight a specific subgroup when hovered
    // ----------------

    // Show the bars
    svg.append("g")
      .selectAll("g")
      // Enter in the stack data = loop key per key = group per group
      .data(stackedData)
      .join("g")
        .attr("fill", d => color(d.key))
        .attr("class", d => "myRect a_" + d.key ) // Add a class to each subgroup: their name
        .selectAll("rect")
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(d => d)
        .join("rect")
          .attr("x", d => x(d.data.year))
          .attr("y", d => y(d[1]))
          .attr("height", d => y(d[0]) - y(d[1]))
          .attr("width",x.bandwidth())
          .attr("stroke", "grey")
          .on("mouseover", function (event,d) { // What happens when user hover a bar

            // what subgroup are we hovering?
            const subGroupName = d3.select(this.parentNode).datum().key 
            
            // Reduce opacity of all rect to 0.2
             d3.selectAll(".myRect").style("opacity", 0.2)  
            
            // Highlight all rects of this subgroup with opacity 1. 
            //It is possible to select them since they have a specific class = their name.

            //convert to string first
             d3.selectAll(".a_"+subGroupName).style("opacity",1) 
          })
          .on("mouseleave", function (event,d) { // When user do not hover anymore
            
            // Back to normal opacity: 1
            d3.selectAll(".myRect")
            .style("opacity",1) 
        })

  })
}




function old(selector){
    var margin = {top: 10, right: 30, bottom: 20, left: 50},
    	width = 1800 - margin.left - margin.right,
    	height = 900 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select(selector)
    	.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      loadDatav5().then(result => {
        var data = result[0];
        var headerRow = Object.keys(data[0])
        //console.log(headerRow)


        // Plotar

        var dataByYear = data.sort(function(a, b) {return d3.ascending(+a.year, +b.year);})
        var anos = d3.map(dataByYear, d => +d.year)

        var por_ano = d3.nest().key(function(d) { return +d.year; }).sortKeys(d3.ascending).entries(data)
        var por_ano_falsetto = d3.nest()
            .key(function(d) { return +d.year; })
            .sortKeys(d3.ascending)
            .key(function(d) { return +d.falsetto; })
            .sortKeys(d3.ascending)
            .entries(data)
        //console.log(por_ano_falsetto)

        // rollup to count leaves
        var nested_data = d3.nest()
	        .key(function(d) { return +d.year; })
	        .key(function(d) { return +d.falsetto; })
	        .rollup(function(leaves) { return +leaves.length} )
	        .entries(dataByYear);

        console.log(nested_data)

        // anos.keys() é equivalente a por_ano.map(d => d.key)

        //const x = d3.scaleBand().domain(por_ano.map(d => d.key)).range([0, width]).padding([0.2])
        const x = d3.scaleBand().domain(nested_data.map(d => d.key)).range([0, width]).padding([0.2])
        
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

        console.log("prox")

        const subgroups = d3.nest()
        	.key(function(d) { return +d.falsetto; })
	        .key(function(d) { return +d.year; })
	        .rollup(function(leaves) { return +leaves.length} )
	        .entries(data.sort(function(a, b) {return d3.ascending(+a.falsetto, +b.falsetto);}))
	        .map(d => d.key);

        console.log(subgroups)
        
        // rollup to count leaves
        const y = d3.scaleLinear().domain([0, 600]).range([ height, 0 ]);
      
        svg.append("g").call(d3.axisLeft(y));

        const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeSet2);

        //var unnest = nested_data

        //console.log(mapped_nested)

        console.log("above")

    }).catch(console.error)
}


function transformData(dataset) {
  var newData = [];
  
  data.forEach(function(d) {
    for (key in d) {
      if (key !== 'date' && newData.indexOf(key) === -1) {
        newData.push({
          name: key,
          number: d[key],
          date: d.date
        });
      }
    }
  });
  
  return newData;
}

function counter_per_year(dataByYear){
	
	var count_per_year = d3.nest()
		.key(function(d) { return +d.year; })
        .rollup(function(v) { return {count: v.length}; })
        .entries(dataByYear);
    return count_per_year;
}