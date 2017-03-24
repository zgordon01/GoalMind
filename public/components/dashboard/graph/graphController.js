angular.module('app').controller('graphController', ['$scope', 'goalService', 'jwtHelper', '$state', 'userService', '$rootScope', 'Flash','ng-fusioncharts',function($scope, goalService, jwtHelper, $state, userService, $rootScope, flash){

              


     /*         $scope.myDataSource = {
                chart: {
                    caption: "Harry's SuperMart",
                    subCaption: "Top 5 stores in last month by revenue",
                },
                data:[{
                    label: "Bakersfield Central",
                    value: "880000"
                },
                {
                    label: "Garden Groove harbour",
                    value: "730000"
                },
                {
                    label: "Los Angeles Topanga",
                    value: "590000"
                },
                {
                    label: "Compton-Rancho Dom",
                    value: "520000"
                },
                {
                    label: "Daly City Serramonte",
                    value: "330000"
                }]
            };*/

	$scope.myDataSource = {
		chart: {
			caption: "SmartGoals Daily Achieved Points",
			subCaption: "Based On Your Entered Data",
		},
		data:[{
        	label: "Sunday",
        	value: "totalPoints"
    	},
    	{
        	label: "Monday",
        	value: "totalPoints"
    	},
    	{
        	label: "Tuesday",
        	value: "totalPoints"
    	},
    	{
        	label: "Wednesday",
        	value: "totalPoints"
    	},
    	{
        	label: "Thursday",
        	value: "totalPoints"
    	},
    	{
        	label: "Friday",
        	value: "totalPoints"
    	},
    	{
        	label: "Saturday",
        	value: "totalPoints"
    	}]
	};
}]); //end of controller

/*
Total points for the day sudo code:

if you accomplished one goal on Sunday 
you get 10 points
add 10 points to SUNDAY

Check if user has a daily goal
if yes check if user accomplished the goal for the day:
if you did a daily goal on Sunday 
yoe get 5 points
add 5 points on SUNDAY

//xml
<chart caption="Total footfall in Bakersfield Central" subcaption="Last week" xaxisname="Day" yaxisname="No. of Footfalls" linethickness="2" palettecolors="#008ee4,#6baa01" basefontcolor="#333333" basefont="Helvetica Neue,Arial" captionfontsize="14" subcaptionfontsize="14" subcaptionfontbold="0" showborder="0" showvalues="0" bgcolor="#ffffff" showshadow="0" canvasbgcolor="#ffffff" canvasborderalpha="0" divlinealpha="100" divlinecolor="#999999" divlinethickness="1" divlinedashed="1" divlinedashlen="1" showxaxisline="1" xaxislinethickness="1" xaxislinecolor="#999999" showalternatehgridcolor="0">
    <set label="Mon" value="15123" />
    <set label="Tue" value="14233" />
    <set label="Wed" value="25507" />
    <vline lineposition="0" color="#6baa01" labelhalign="left" label="National holiday" />
    <set label="Thu" value="9110" />
    <set label="Fri" value="15529" />
    <set label="Sat" value="20803" />
    <set label="Sun" value="19202" />
</chart>

//JSON
{
    "chart": {
        "caption": "Total footfall in Bakersfield Central",
        "subCaption": "Last week",
        "xAxisName": "Day",
        "yAxisName": "No. of Footfalls",
        "lineThickness": "2",
        "paletteColors": "#008ee4,#6baa01",
        "baseFontColor": "#333333",
        "baseFont": "Helvetica Neue,Arial",
        "captionFontSize": "14",
        "subcaptionFontSize": "14",
        "subcaptionFontBold": "0",
        "showBorder": "0",
        "showValues": "0",
        "bgColor": "#ffffff",
        "showShadow": "0",
        "canvasBgColor": "#ffffff",
        "canvasBorderAlpha": "0",
        "divlineAlpha": "100",
        "divlineColor": "#999999",
        "divlineThickness": "1",
        "divLineDashed": "1",
        "divLineDashLen": "1",
        "showXAxisLine": "1",
        "xAxisLineThickness": "1",
        "xAxisLineColor": "#999999",
        "showAlternateHGridColor": "0"
    },
    "data": [
        {
            "label": "Mon",
            "value": "15123"
        },
        {
            "label": "Tue",
            "value": "14233"
        },
        {
            "label": "Wed",
            "value": "25507"
        },
        {
            "vline": "true",
            "lineposition": "0",
            "color": "#6baa01",
            "labelHAlign": "left",
            "label": "National holiday"
        },
        {
            "label": "Thu",
            "value": "9110"
        },
        {
            "label": "Fri",
            "value": "15529"
        },
        {
            "label": "Sat",
            "value": "20803"
        },
        {
            "label": "Sun",
            "value": "19202"
        }
    ]
}


*/



















