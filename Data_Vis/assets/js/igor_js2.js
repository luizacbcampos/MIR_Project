
  const years = [
    1958, 1959, 1960, 1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968,
    1969, 1970, 1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979,
    1980, 1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012,
    2013, 2014, 2015, 2016, 2017, 2018, 2019
  ]
  
const dropdownButton1 = d3.select("#dropdown_button_years")
  .attr("id", "button1")
  .style("font-size", "20px")
  .style("background-color", "#f5b540")

const dropdownButton2 = d3.select("#dropdown_button_years2")
  .attr("id", "button2")
  .style("font-size", "20px")
  .style("background-color", "#3e72c7")

dropdownButton1 // Add a button
.selectAll('myOptions1') // Next 4 lines add 6 options = 6 colors
  .data(years)
.enter()
.append('option')
.text(function (d) { return d; }) // text showed in the menu
.attr("value", function (d) { return d; }) // corresponding value returned by the button

dropdownButton2 // Add a button
.selectAll('myOptions2') // Next 4 lines add 6 options = 6 colors
  .data(years)
.enter()
.append('option')
.text(function (d) { return d; }) // text showed in the menu
.attr("value", function (d) { return d; }) // corresponding value returned by the button

dropdownButton1.on("change", function(d) {
  // recover the option that has been chosen
  const selectedOption = d3.select(this).property("value")

  // run the updateChart function with this selected option
  //updateChart(selectedOption)
  //alert(selectedOption);
  //alert("esse agora e do outro botao:");
  const otherOption = d3.select("#button2").property("value")
  d3.selectAll(".igor").remove();
  updategraph(selectedOption, otherOption);
})

dropdownButton2.on("change", function(d) {
  // recover the option that has been chosen
  const selectedOption = d3.select(this).property("value")

  // run the updateChart function with this selected option
  //updateChart(selectedOption)
  const otherOption = d3.select("#button1").property("value")
  d3.selectAll(".igor").remove();
  updategraph(otherOption, selectedOption);
})
