const titleConversion = {
	"hours_watched": "Hours watched",
	"unique_channels": "Unique channels",
	"average_viewers": "Average viewers",
	"average_channels": "Average channels",
	"peak_viewers": "Peak viewers",
	"peak_channels": "Peak channels",
	"airtime_hours": "Airtime hours",
	"average_channels": "Average channels"
}

async function modifyChart(chartParams, dataArray, linkParams) {

	let dataNumbers = [];

	for(let i=0; i<parseInt(dataArray.games.length); i++) {
		dataNumbers.push([dataArray.games[i].game, dataArray.games[i][linkParams.sort_by]]);
	}

	chartParams.yAxis.title.text = titleConversion[linkParams.sort_by];
	chartParams.series[0]["name"] = titleConversion[linkParams.sort_by];
	chartParams.series[0]["data"] = dataNumbers;

}

export default modifyChart;