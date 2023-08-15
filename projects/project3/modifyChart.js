async function modifyChart(chartParams, dataArray, linkParams) {

	let dataNumbers = [];

	for(let i=0; i< parseInt(dataArray.games.length); i++) {
		dataNumbers.push([dataArray.games[i].game, dataArray.games[i][linkParams.sort_by]]);
	}

	console.log(dataNumbers);

	chartParams.yAxis.title.text = linkParams.sort_by;
	chartParams.series[0]["name"] = linkParams.sort_by;
	chartParams.series[0]["data"] = dataNumbers;

}

export default modifyChart;