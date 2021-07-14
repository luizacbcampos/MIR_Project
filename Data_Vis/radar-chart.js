/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
	////////////////// VisualCinnamon.com ///////////////////
	/////////// Inspired by the code of alangrafu ///////////
	/////////////////////////////////////////////////////////

	function RadarChart(id, className, data, options) {
		let cfg = {
			w: 600,				//Width of the circle
			h: 600,				//Height of the circle
			margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
			levels: 3,				//How many levels or inner circles should there be drawn
			maxValue: 0, 			//What is the value that the biggest circle will represent
			labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
			wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
			opacityArea: 0.35, 	//The opacity of the area of the blob
			dotRadius: 4, 			//The size of the colored circles of each blog
			opacityCircles: 0.1, 	//The opacity of the circles of each blob
			strokeWidth: 2, 		//The width of the stroke around each blob
			roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
			color: d3.scale.category10()	//Color function
		};

		//Put all of the options into a variable called cfg
		if('undefined' !== typeof options){
			for(let i in options){
				if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
			}//for i
		}//if

		//If the supplied maxValue is smaller than the actual one, replace by the max in the data
		let maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));

		let allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
			total = allAxis.length,					//The number of different axes
			radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
			Format = d3.format('%'),			 	//Percentage formatting
			angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

		//Scale for the radius
		let rScale = d3.scale.linear()
			.range([0, radius])
			.domain([0, maxValue]);

		/////////////////////////////////////////////////////////
		//////////// Create the container SVG and g /////////////
		/////////////////////////////////////////////////////////

			//Remove whatever chart with the same id/class was present before
			d3.select(id).select("svg").remove();

		//Initiate the radar chart SVG
		let svg = d3.select(id).append("svg")
			.attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
			.attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
			.attr("class", "radar"+id);
		//Append a g element		
		let g = svg.append("g")
			.attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");

		/////////////////////////////////////////////////////////
		////////// Glow filter for some extra pizzazz ///////////
		/////////////////////////////////////////////////////////

			//Filter for the outside glow
			let filter = g.append('defs').append('filter').attr('id','glow'),
			feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
			feMerge = filter.append('feMerge'),
			feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
			feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

		/////////////////////////////////////////////////////////
		/////////////// Draw the Circular grid //////////////////
		/////////////////////////////////////////////////////////

			//Wrapper for the grid & axes
			let axisGrid = g.append("g").attr("class", "axisWrapper");

		//Draw the background circles
		axisGrid.selectAll(".levels")
			.data(d3.range(1,(cfg.levels+1)).reverse())
			.enter()
			.append("circle")
			.attr("class", "gridCircle")
			.attr("r", function(d, i){return radius/cfg.levels*d;})
			.style("fill", "#CDCDCD")
			.style("stroke", "#CDCDCD")
			.style("fill-opacity", cfg.opacityCircles)
			.style("filter" , "url(#glow)");

		//Text indicating at what % each level is
		axisGrid.selectAll(".axisLabel")
			.data(d3.range(1,(cfg.levels+1)).reverse())
			.enter().append("text")
			.attr("class", "axisLabel")
			.attr("x", 4)
			.attr("y", function(d){return -d*radius/cfg.levels;})
			.attr("dy", "0.4em")
			.style("font-size", "10px")
			.attr("fill", "#737373")
			.text(function(d,i) { return Format(maxValue * d/cfg.levels); });

		/////////////////////////////////////////////////////////
		//////////////////// Draw the axes //////////////////////
		/////////////////////////////////////////////////////////

			//Create the straight lines radiating outward from the center
			let axis = axisGrid.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");
		//Append the lines
		axis.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
			.attr("class", "line")
			.style("stroke", "white")
			.style("stroke-width", "2px");

		//Append the labels at each axis
		axis.append("text")
			.attr("class", "legend")
			.style("font-size", "11px")
			.attr("text-anchor", "middle")
			.attr("dy", "0.35em")
			.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
			.text(function(d){return d})
			.call(wrap, cfg.wrapWidth);


		/////////////////////////////////////////////////////////
		///////////// Draw the radar chart blobs ////////////////
		/////////////////////////////////////////////////////////

			//The radial line function
			let radarLine = d3.svg.line.radial()
			.interpolate("linear-closed")
			.radius(function(d) { return rScale(d.value); })
			.angle(function(d,i) {	return i*angleSlice; });

		if(cfg.roundStrokes) {
			radarLine.interpolate("cardinal-closed");
		}

		//////////// Tooltip for legend with mouseover ////////////

		let tooltip = d3.select(id).data(data)
			.append("div")
		// .style("position", "absolute")
			.style("visibility", "hidden");


		let blobWrapper = g.selectAll(".radarWrapper")
			.data(data)
			.enter().append("g")
			.attr("class", "radarWrapper")


		//Append the backgrounds	
		blobWrapper
			.append("path")
			.attr("class", "radarArea")
			.attr("d", function(d,i) { return radarLine(d); })
			.style("fill", function(d,i) { return cfg.color(i); })
			.style("fill-opacity", cfg.opacityArea)
			.on('mouseover', function (d,i){
				//Dim all blobs
				d3.selectAll(".radarArea")
					.transition().duration(200)
					.style("fill-opacity", 0.1); 
				//Bring back the hovered over blob
				d3.select(this)
					.transition().duration(200)
					.style("fill-opacity", 0.7);

				tooltip
					.attr("transform", function(d, i) { return "translate(0,600)"; })
					.style("visibility", "visible")
					.style("font-size", "25px")
					.style("color", cfg.color(i))
					.text(className[i]);

			})
			.on('mouseout', function(){
				//Bring back all blobs
				d3.selectAll(".radarArea")
					.transition().duration(200)
					.style("fill-opacity", cfg.opacityArea);

				tooltip
					.style("visibility", "hidden")

			});

		//Create the outlines	
		blobWrapper.append("path")
			.attr("class", "radarStroke")
			.attr("d", function(d,i) { return radarLine(d); })
			.style("stroke-width", cfg.strokeWidth + "px")
			.style("stroke", function(d,i) { return cfg.color(i); })
			.style("fill", "none")
			.style("filter" , "url(#glow)");		

		//Append the circles
		blobWrapper.selectAll(".radarCircle")
			.data(function(d,i) { return d; })
			.enter().append("circle")
			.attr("class", "radarCircle")
			.attr("r", cfg.dotRadius)
			.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
			.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
			.style("fill", function(d,i,j) { return cfg.color(j); })
			.style("fill-opacity", 0.8);


		/////////////////////////////////////////////////////////
		/////////////////// Helper Function /////////////////////
		/////////////////////////////////////////////////////////

			//Taken from http://bl.ocks.org/mbostock/7555321
			//Wraps SVG text	
			function wrap(text, width) {
				text.each(function() {
					let text = d3.select(this),
						words = text.text().split(/\s+/).reverse(),
						word,
						line = [],
						lineNumber = 0,
						lineHeight = 1.4, // ems
						y = text.attr("y"),
						x = text.attr("x"),
						dy = parseFloat(text.attr("dy")),
						tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

					while (word = words.pop()) {
						line.push(word);
						tspan.text(line.join(" "));
						if (tspan.node().getComputedTextLength() > width) {
							line.pop();
							tspan.text(line.join(" "));
							line = [word];
							tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
						}
					}
				});
			}//wrap	

	}//RadarChart


/* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */

//////////////////////////////////////////////////////////////
//////////////////////// Set-Up //////////////////////////////
	//////////////////////////////////////////////////////////////

	let margin = {top: 100, right: 100, bottom: 100, left: 100},
	width = Math.min(700, window.innerWidth - 10) - margin.left - margin.right,
	height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);

//////////////////////////////////////////////////////////////
////////////////////////// Data //////////////////////////////
	//////////////////////////////////////////////////////////////

	let dataa = [
		[//Acousticness
			{axis:1950, value:1.0},
			{axis:1960, value:0.6672797838787767},
			{axis:1970, value:0.3435989342974485},
			{axis:1980, value:0.08448872916762595},
			{axis:1990, value:0.04283522217181529},
			{axis:2000, value:0.0},
			{axis:2010, value:0.04553289065990834}
		],
		[// Danceability
			{axis:1950, value:0.13175370879193338},
			{axis:1960, value:0.0},
			{axis:1970, value:0.32285716833360834},
			{axis:1980, value:0.7739922660031109},
			{axis:1990, value:1.0},
			{axis:2000, value:0.7744370246732508},
			{axis:2010, value:0.895459091178159}
		],
		[// energy
			{axis:1950, value:0.0},
			{axis:1960, value:0.15667530927573559},
			{axis:1970, value:0.43301420242507627},
			{axis:1980, value:0.739456235143245},
			{axis:1990, value:0.7124170781335484},
			{axis:2000, value:1.0},
			{axis:2010, value:0.8049108415406501}
		],
		[// instrumentalness
			{axis:1950, value:0.43027591727454967},
			{axis:1960, value:0.5435238673487339},
			{axis:1970, value:1.0},
			{axis:1980, value:0.458119910001678},
			{axis:1990, value:0.6071174908755317},
			{axis:2000, value:0.03663128085220363},
			{axis:2010, value:0.0}
		],
		[// liveness
			{axis:1950, value:0.3420176412109033},
			{axis:1960, value:1.0},
			{axis:1970, value:0.36983807164362226},
			{axis:1980, value:0.10348560299931986},
			{axis:1990, value:0.0},
			{axis:2000, value:0.10059190144133545},
			{axis:2010, value:0.11810797353816316}
		],
		[// speechiness
			{axis:1950, value:0.05440979579369243},
			{axis:1960, value:0.05805219208506518},
			{axis:1970, value:0.07206534041233348},
			{axis:1980, value:0.0},
			{axis:1990, value:0.5128493602344801},
			{axis:2000, value:0.7714210645001573},
			{axis:2010, value:1.0}
		],
	];
//////////////////////////////////////////////////////////////
//////////////////// Draw the Chart //////////////////////////
	//////////////////////////////////////////////////////////////

	let color = d3.scale.ordinal()
	.range(["#EDC951","#8C9699","#00A0B0", "#60BF5A", "#C592F9", "#CC333F"]);

let radarChartOptions = {
	w: width,
	h: height,
	margin: margin,
	maxValue: 0.5,
	levels: 5,
	roundStrokes: true,
	color: color
};
let className = ["Acousticness","Danceability","Energy","Instrumentalness","Liveness","Speechiness"]
//Call function to draw the Radar chart
RadarChart(".radarChart", className, dataa, radarChartOptions);
