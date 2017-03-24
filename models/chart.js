var FusionCharts = require('fusioncharts');
require("fusioncharts/fusioncharts.charts")(FusionCharts);

var chart = new FusionCharts ({
	   "type": "column2d",
	   "width": "500",
	   "height": "300",
	   "dataFormat": "json",
	   "dataSource": {
		    chart:{},
		    data: [{value: 500}, {value: 600}, {value: 700}]
	 	}
	}).render("chartContainer");