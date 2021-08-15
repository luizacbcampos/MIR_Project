// set the dimensions and margins of the graph
const margin = {top: 20, right: 30, bottom: 0, left: 10},
	width = 800 - margin.left - margin.right,
	height = 600 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#Rio")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		`translate(${margin.left}, ${margin.top})`);

// Parse the Data
//d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv").then(function(data) {
d3.csv("https://gist.githubusercontent.com/brunomaletta/e60ff6ec1644ffd34b89ff7c2629e5f3/raw/79d72bdb18c536da9625272a249ffd109754ac5e/values.csv").then(function(data) {

	// List of groups = header of the csv files
	const keys = data.columns.slice(1)

	// Add X axis
	const x = d3.scaleLinear()
		.domain(d3.extent(data, function(d) { return d.Ano; }))
		.range([ 0, width ]);
	svg.append("g")
		.attr("transform", `translate(0, ${height*0.8})`)
		.call(d3.axisBottom(x).tickSize(-height*.7).tickValues([1960, 1970, 1980, 1990, 2000, 2010])
			.tickFormat(d3.format("d")))
		.select(".domain").remove()
	// Customization
	svg.selectAll(".tick line").attr("stroke", "#b8b8b8")

	// Add X axis label:
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", width)
		.attr("y", height-30 )
		.text("Ano");

	// Add Y axis
	const y = d3.scaleLinear()
		.domain([-3, 3])
		.range([ height, 0 ]);

	const y2 = d3.scaleLinear()
		.domain([-1.5, 1.5])
		.range([ 3*height/4, height/4 ]);

	// Add Y axis label:
	svg.append("text")
		.attr("text-anchor", "end")
		.attr("x", 25)
		.attr("y", 45 )
		//.text("Amount of falsetto, on average, per year")
		.text("Quantidade de falsete, em média, por ano")
		.attr("text-anchor", "start")

	// color palette
	const color = d3.scaleOrdinal()
		.domain(keys)
		.range([d3.schemeSet3[4], d3.schemeSet3[5]]);

	//stack the data?
	const stackedData = d3.stack()
		.offset(d3.stackOffsetSilhouette)
		.keys(keys)
		(data)

	// create a tooltip
	const Tooltip = svg
		.append("text")
		.attr("x", 0)
		.attr("y", margin.top/2)
		.style("font-size", 17)
		.text("")

//	const TooltipMouse = d3.select("#Rio")
//		.append("div")
//		.style("opacity", 0)
//		.attr("class", "tooltip")
//		.style("background-color", "white")
//		.style("border", "solid")
//		.style("border-width", "2px")
//		.style("border-radius", "5px")
//		.style("padding", "5px")

	// Three function that change the tooltip when user hover / move / leave a cell
	const mouseover = function(event,d) {
		d3.selectAll(".myArea").style("opacity", .2)
		d3.select(this)
			.style("stroke", "black")
			.style("opacity", 1)

//		TooltipMouse
//			.style("stroke", "black")
//			.style("opacity", 1)
	}
	const mousemove = function(event,d,i) {
		Tooltip
			.text(data.columns[d+1])
			.style("stroke", color(keys[d]))

//		const matrix = this.getScreenCTM()
//			.translate(+ this.getAttribute("cx"), + this.getAttribute("cy"));
//
//		const dx = window.pageXOffset + matrix.e;
//		const dy = window.pageYOffset + matrix.f;
//
//		TooltipMouse
//			.text(data.columns[d+1])
//			.style("position", "absolute")
//			.style("left", (dx + d3.mouse(this)[0] + 10) + "px")
//			.style("top", (dy + d3.mouse(this)[1] - 10) + "px")
	}
	const mouseleave = function(event,d) {
		Tooltip.text("")
		d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")

//		TooltipMouse
//			.style("opacity", 0)
	}

	// Area generator
	const area = d3.area()
		.x(function(d) { return x(d.data.Ano); })
		.y0(function(d) { return y(d[0]); })
		.y1(function(d) { return y(d[1]); })

	// Show the areas
	svg
		.selectAll("mylayers")
		.data(stackedData)
		.join("path")
		.attr("class", "myArea")
		.style("fill", function(d) { return color(d.key); })
		.attr("d", area)
		.on("mouseover", mouseover)
		.on("mousemove", mousemove)
		.on("mouseleave", mouseleave)

	svg.append("g")
		.attr("transform", `translate(${width}, 0)`)
		.call(d3.axisRight(y2).ticks(5))

})
