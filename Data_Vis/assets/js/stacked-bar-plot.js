// Stacked bar plot year x falsetto
import loadDatav5 from './load-data.js';

// Setting width/heigth information
const margin = {top: 50, right: 20, bottom: 65, left: 50};

var viewportWidth = parseInt(Math.max(document.documentElement.clientWidth, window.innerWidth || 0));
var viewportHeight = parseInt(Math.max(document.documentElement.clientHeight, window.innerHeight || 0));

var width = parseInt((viewportWidth - margin.left - margin.right)*0.95); // Use the window's width
var height = parseInt((viewportHeight - margin.top - margin.bottom)*0.95); // Use the window's height

var widthValue = width + margin.left + margin.right;
var heightValue = height + margin.top + margin.bottom;

var og_ratio = height/width

// This creates the chart
var svg = d3.select('#fasettoANO')
  .classed("svg-container", true)
  .append("svg") // append the svg object to the body of the page
    .attr("width", widthValue)
    .attr("height", heightValue)
    //.attr("preserveAspectRatio", "xMidYMid meet")
    //.attr("viewBox","0 0 " + widthValue + " " + heightValue)
    //.classed("svg-content-responsive", true) // Class to make it responsive.
      .append("g") //my graph
        .attr("width", widthValue)
        .attr("height", heightValue)
        .attr("transform", `translate(${margin.left},${margin.top})`);

var x = null; // setting initials
var y = null;

function scale_values(){
  // Alter the values
  viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  width = parseInt((viewportWidth - margin.left - margin.right)*0.95); // Use the window's width
  height = parseInt((viewportHeight - margin.top - margin.bottom)*0.95); // Use the window's height
  widthValue = width + margin.left + margin.right;
  heightValue = height + margin.top + margin.bottom;
}


function resize() {

  // https://gist.github.com/eyeseast/6407300
  console.log(widthValue, heightValue)
  scale_values()
  
  x.range([0, width]);
  
  d3.select(svg.node().parentNode)
    .style('height', heightValue + 'px')
    .style('width', widthValue + 'px');

  y.range([width*og_ratio, 0]) // keep ratio

}



function stacked(selector){	
  console.log("Stacked")
  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/Data_Vis/assets/data/falsetto_by_year.csv").then( function(data) {

	  //data = data.remove("0");
	  //data = data.remove(0);
	  //data.splice(1, 1);
    
    const subgroups = data.columns.slice(1); // List of subgroups = header of csv
    var combined = [];
    var sum = 0;
    var avg = 0;
    data.map(function(d) { 
      sum = d3.sum([d['0'],d['1'],d['2'],d['3'],d['4'],d['5'],d['6'],d['7'],d['8'],d['9'],d['10']])
      sum = d3.sum([d['1'],d['2'],d['3'],d['4'],d['5'],d['6'],d['7'],d['8'],d['9'],d['10']]) //sem 0
      avg = d3.sum([d['1'],2*d['2'],3*d['3'],4*d['4'],5*d['5'],6*d['6'],7*d['7'],8*d['8'],9*d['9'],10*d['10']])/sum
      combined.push(avg)
    } );
    console.log(combined)


    const subgroupsSemZero = data.columns.slice(1);
    subgroupsSemZero.splice(0, 1);
    const years = data.map(d => d.year) // List of years = value of the first column called group
    console.log(years)

	  function update(){

		  // For each check box:
		  d3.selectAll(".btn-check").each(function(d){
			  // If the box is check, I show the group
			  if(this.checked){

				  d3.selectAll(".myRect")
					  .remove();

				  d3.selectAll(".eixoY").remove();

					y = d3.scaleLinear()
					  .domain([0, 600])
					  .range([ height, 0 ]);
					svg.append("g")
					  .attr("class", "eixoY")
					  .call(d3.axisLeft(y));

				 // GRAFICO COM O ZERO

					// Show the bars
					svg.append("g")
					  .selectAll("g")
					  .data(stackedData) // Enter in the stack data = loop key per key = group per group
					  .join("g")
						.attr("fill", d => color(d.key))
						.attr("class", d => "myRect a_" + d.key ) // Add a class to each subgroup: a_ + their name
						.selectAll("rect")
						.data(d => d) // enter a second time = loop subgroup per subgroup to add all rectangles
						.join("rect")
						  .attr("x", d => x(d.data.year))
						  .attr("y", d => y(d[1]))
						  .attr("height", d => y(d[0]) - y(d[1]))
						  .attr("width",x.bandwidth())
						  .attr("stroke", "grey") // What happens when user hover a bar
						  .on("mouseover", function (event,d) { 

							  TooltipMouse2
								  .style("stroke", "black")
								  .style("opacity", 1)

							const subGroupName = d3.select(this.parentNode).datum().key // what subgroup are we hovering?
							
							// Reduce opacity of all rect to 0.2
							d3.selectAll(".myRect").style("opacity", 0.2)  

							// Highlight all rects of this subgroup with opacity 1. We select them bc they have a specific class = their name.

							d3.selectAll(".a_"+subGroupName).style("opacity",1)
						  }) .on("mouseleave", function (event,d) { // When user do not hover anymore
							  TooltipMouse2
								  .style("opacity", 0)

							d3.selectAll(".myRect")
							.style("opacity",1) // Back to normal opacity: 1
						})
				  			.on("mousemove", function (event,d) {


								const matrix = this.getScreenCTM()
									.translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));


								const dx = window.pageXOffset + matrix.e;
								const dy = window.pageYOffset + matrix.f;

								//console.log(event[0]);

								TooltipMouse2
									.text("Valor: " + (event[1] - event[0]))
									.style("position", "absolute")
									.style("font-size", "15px")
									.style("left", (d3.mouse(this)[0] + 100) + "px")
									.style("top", (d3.mouse(this)[1]) + "px")

						})

				  // Otherwise I hide it
			  } else{

				  d3.selectAll(".myRect")
					  .remove();

				  d3.selectAll(".eixoY").remove();

					y = d3.scaleLinear()
					  .domain([0, 150])
					  .range([ height, 0 ]);
					svg.append("g")
					  .attr("class", "eixoY")
					  .call(d3.axisLeft(y));

//					y = d3.scaleLinear()
//					  .domain([0, 300])
//					  .range([ height, 0 ]);
//					svg.append("g")
//					  .call(d3.axisLeft(y));


				 // GRAFICO SEM O ZERO

					// Show the bars
					svg.append("g")
					  .selectAll("g")
					  .data(stackedDataSemZero) // Enter in the stack data = loop key per key = group per group
					  .join("g")
						.attr("fill", d => color(d.key))
						.attr("class", d => "myRect a_" + d.key ) // Add a class to each subgroup: a_ + their name
						.selectAll("rect")
						.data(d => d) // enter a second time = loop subgroup per subgroup to add all rectangles
						.join("rect")
						  .attr("x", d => x(d.data.year))
						  .attr("y", d => y(d[1]))
						  .attr("height", d => 1 * (y(d[0]) - y(d[1])))
						  .attr("width",x.bandwidth())
						  .attr("stroke", "grey") // What happens when user hover a bar
						  .on("mouseover", function (event,d) { 

							  TooltipMouse2
								  .style("stroke", "black")
								  .style("opacity", 1)

							const subGroupName = d3.select(this.parentNode).datum().key // what subgroup are we hovering?
							
							// Reduce opacity of all rect to 0.2
							d3.selectAll(".myRect").style("opacity", 0.2)  

							// Highlight all rects of this subgroup with opacity 1. We select them bc they have a specific class = their name.

							d3.selectAll(".a_"+subGroupName).style("opacity",1)
						  }) .on("mouseleave", function (event,d) { // When user do not hover anymore
							  TooltipMouse2
								  .style("opacity", 0)

							d3.selectAll(".myRect")
							.style("opacity",1) // Back to normal opacity: 1
						})
				  			.on("mousemove", function (event,d) {


								const matrix = this.getScreenCTM()
									.translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));

								const dx = window.pageXOffset + matrix.e;
								const dy = window.pageYOffset + matrix.f;

								//console.log(event[0]);

								TooltipMouse2
									.text("Valor: " + (event[1] - event[0]))
									.style("position", "absolute")
									.style("font-size", "15px")
									.style("left", (d3.mouse(this)[0] + 100) + "px")
									.style("top", (d3.mouse(this)[1]) + "px")
						})
			  }
		  })
	  }

    // When a button change, I run the update function
    d3.selectAll(".btn-check").on("change",update);

    // Add X axis
    x = d3.scaleBand()
        .domain(years)
        .range([0, width])
        .padding([0.2])      
    svg.append("g")
      .style("font-size", 13)
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll("text")
        .attr("dy", "0.5em")
        .attr("dx", "-1.8em")
        .attr("transform", "rotate(-65)");

    // Add Y axis
    y = d3.scaleLinear()
      .domain([0, 600])
      .range([ height, 0 ]);
    svg.append("g")
	  .attr("class", "eixoY")
      .call(d3.axisLeft(y));

    // Add X axis label:
    svg.append("text")
    	.attr("transform", "translate(" + (width/2) + " ," + (height + margin.top+10) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "15px")
    	.text("Ano");
    
    // Y axis label:
    svg.append("text")
    	.attr("text-anchor", "end")
    	.attr("transform", "rotate(-90)")
    	.attr("y", -margin.left+12)
      .attr("x", 0 - (height/ 2)+margin.bottom)
      .style("font-size", "15px")
    	.text("Quantidade de músicas")

    svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 0 - (margin.top / 2))
        .attr("text-anchor", "middle")  
        .style("font-size", "30px") 
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

    //stack the data? --> stack per subgroup
    const stackedDataSemZero = d3.stack()
      .keys(subgroupsSemZero)
      (data)

    // ----------------
    // Highlight a specific subgroup when hovered
    // ----------------

		// And I initialize it at the beginning
		update()


	  // create a tooltip
	  const TooltipMouse2 = d3.select("#fasettoANO")
		  .append("div")
		  .style("opacity", 0)
		  .attr("class", "tooltip2")
		  .style("background-color", "white")
		  .style("border", "solid")
		  .style("border-width", "2px")
		  .style("border-radius", "5px")
		  .style("padding", "5px")

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

        //console.log(nested_data)

        // anos.keys() é equivalente a por_ano.map(d => d.key)

        //const x = d3.scaleBand().domain(por_ano.map(d => d.key)).range([0, width]).padding([0.2])
        const x = d3.scaleBand().domain(nested_data.map(d => d.key)).range([0, width]).padding([0.2])
        
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

        //console.log("prox")

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

        //console.log("above")

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

export default { stacked, resize };
