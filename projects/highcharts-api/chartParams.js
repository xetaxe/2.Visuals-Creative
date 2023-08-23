const chartParams = {
	title: {
		text: 'Game statistics'
	},
	subtitle: {
		text: 'Source: Stream Hatchet'
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
      text: 'Hours_watched'
    }
  },
  legend: {
    enabled: false
  },
  series: [{
    name: 'Population',
    data: [
      ['Tokyo', 37.33],
      ['Delhi', 31.18],
      ['Shanghai', 27.79],
      ['Sao Paulo', 22.23],
      ['Mexico City', 21.91],
      ['Dhaka', 21.74],
      ['Cairo', 21.32],
      ['Beijing', 20.89],
      ['Mumbai', 20.67],
      ['Osaka', 19.11],
      ['Karachi', 16.45],
      ['Chongqing', 16.38],
      ['Istanbul', 15.41],
      ['Buenos Aires', 15.25],
      ['Kolkata', 14.974],
      ['Kinshasa', 14.970],
      ['Lagos', 14.86],
      ['Manila', 14.16],
      ['Tianjin', 13.79],
      ['Guangzhou', 13.64]
    ],
  }]
}

export default chartParams