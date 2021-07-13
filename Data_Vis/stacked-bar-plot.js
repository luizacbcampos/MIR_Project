// Stacked bar plot year x falsetto
import loadDatav5 from './load-data.js';

export default function stacked(selector){
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

        var count_per_year = d3.nest()
        	.key(function(d) { return +d.year; })
        	.rollup(function(v) { return {count: v.length}; })
        	.entries(dataByYear);
        // anos.keys() é equivalente a por_ano.map(d => d.key)

        //const x = d3.scaleBand().domain(por_ano.map(d => d.key)).range([0, width]).padding([0.2])
        const x = d3.scaleBand().domain(nested_data.map(d => d.key)).range([0, width]).padding([0.2])
        
        svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

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

        //console.log(nested_data.map(d=>d.values))

        const color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(d3.schemeSet2);

        const stackedData = d3.stack()
        .keys(subgroups)
        (nested_data)
        

        

    }).catch(console.error)
}