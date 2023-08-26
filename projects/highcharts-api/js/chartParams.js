const chartParams = {
	title: {
		text: 'Gaming streaming statistics'
	},
	subtitle: {
		text: '(source: Stream Hatchet)'
	},
	chart: {
    type: 'column'
  },
	xAxis: {
    type: 'category',
    labels: {
      rotation: -45,
      style: {
        fontSize: '13px',
        fontFamily: 'Verdana, sans-serif'
      }
    }
  },
  yAxis: {
    min: 0,
    title: {
      text: 'Hours watched'
    }
  },
  legend: {
    enabled: false
  },
  series: [{
    name: 'Hours watched',
    data: [
      ['Fortnite', 3733000],
    ],
  }]
}

export default chartParams