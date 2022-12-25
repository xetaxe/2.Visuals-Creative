// const chartParams = {
// 	title: {
// 		text: 'U.S Solar Employment Growth by Job Category, 2010-2020'
// 	},
// 	subtitle: {
// 		text: 'Source: <a href="https://irecusa.org/programs/solar-jobs-census/" target="_blank">IREC</a>'
// 	},
// 	yAxis: {
// 		title: {
// 			text: 'Number of Employees'
// 		},
// 		// type: "logarithmic"
// 	},
// 	xAxis: {
// 		accessibility: {
// 			rangeDescription: 'Range: 2010 to 2020'
// 		}
// 	},
// 	chart: {
// 		type: "line",
// 		events: {
// 			click: function(e) {
// 				console.log(
// 						Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
// 						e.yAxis[0].value
// 				)
// 			}
// 		}
// 	},
// 	legend: {
// 		layout: 'vertical',
// 		align: 'right',
// 		verticalAlign: 'middle'
// 	},
// 	plotOptions: {
// 		series: {
// 			label: {
// 				connectorAllowed: false
// 			},
// 			pointStart: 2010
// 		}
// 	},
// 	series: [{
// 		name: 'Installation & Developers',
// 		data: [43934, 48656, 65165, 81827, 112143, 142383,
// 			171533, 165174, 155157, 161454, 154610]
// 	}, {
// 		name: 'Manufacturing',
// 		data: [24916, 37941, 29742, 29851, 32490, 30282,
// 			38121, 36885, 33726, 34243, 31050]
// 	}, {
// 		name: 'Sales & Distribution',
// 		data: [11744, 30000, 16005, 19771, 20185, 24377,
// 			32147, 30912, 29243, 29213, 25663]
// 	}, {
// 		name: 'Operations & Maintenance',
// 		data: [null, null, null, null, null, null, null,
// 			null, 11164, 11218, 10077]
// 	}, {
// 		name: 'Other',
// 		data: [21908, 5548, 8105, 11248, 8989, 11816, 18274,
// 			17300, 13053, 11906, 10073]
// 	}],
// 	responsive: {
// 		rules: [{
// 			condition: {
// 				maxWidth: 500
// 			},
// 			chartOptions: {
// 				legend: {
// 					layout: 'horizontal',
// 					align: 'center',
// 					verticalAlign: 'bottom'
// 				}
// 			}
// 		}]
// 	}
// }

function getNewPoint() {
	var x = (new Date()).getTime(), // current time
			y = Math.random();
	
	return Math.random()*10>7.5 ? [x,y] : false;
}

const chartParams = {
	chart: {
	renderTo: 'container',
	defaultSeriesType: 'spline',
	marginRight: 10,
	events: {
		load: function() {
		// set up the updating of the chart each second
		var series = this.series[0];
		setInterval(function() {
			var point = getNewPoint();
		
			if (point)
				series.addPoint(point, true, true);
		}, 1000);
		}
	}
},
title: {
	text: 'Live random data'
},
xAxis: {
	type: 'datetime',
	tickPixelInterval: 150
},
yAxis: {
	title: {
		 text: 'Value'
	},
	plotLines: [{
		 value: 0,
		 width: 1,
		 color: '#808080'
	}]
},
tooltip: {
	formatter: function() {
						return '<b>'+ this.series.name +'</b><br/>'+
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) +'<br/>'+ 
				Highcharts.numberFormat(this.y, 2);
	}
},
legend: {
	enabled: false
},
exporting: {
	enabled: false
},
series: [{
	name: 'Random data',
	data: (function() {
		 // generate an array of random data
		 let data = [],
				time = (new Date()).getTime(),
				i;
		 
		 for (i = -19; i <= 0; i++) {
				data.push({
					 x: time + i * 1000,
					 y: Math.random()
				});
		 }
		 return data;
	})()
}]
}

export default chartParams