// Load data in diff ways


// Loads data using D3 v5

function loadAv5(file) {
	return new Promise((resolve, reject) => {
		d3.csv(`https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/MIR/${file}`)
		.then(result => {
			// clean here
			resolve(result);
		})
		.catch(reject);
	});
	console.log("loadAv51")
}


export default function loadDatav5() {
  // const loads = [loadAv5('.csv')];
  const loads = [loadAv5('dataframe.csv')];
  console.log("loadDatav5")
  return Promise.all(loads);
}


// Loads data using D3 v3

function loadAv3(file){
	d3.csv(`https://raw.githubusercontent.com/luizacbcampos/MIR_Project/main/MIR/${file}`, function(data){
		// here's where we do stuff with the data
		var headerRow = Object.keys(data[0])
        console.log(headerRow)
        dataset = data.map(function(d) { return [ d["song_title"], d["falsetto"] ]; });
        // Do something with d3.js
    });
}


function loadDatav3(){
	const loads = [loadAv3('dataframe.csv')];
}