angular.module('app').controller('GraphController', ['$scope', '$state', '$stateParams', 'goalService', 'jwtHelper', '$state',  function($scope, $state, $stateParams, goalService, jwtHelper, $state) {
  $scope.chartSource = [];


  $scope.resetData = function()
  {
      console.log('pushed button');
      goalService.getPointHistory(function(response) {
          $scope.chartData=[];

          response.forEach(function(item)
          {
              var objkeys = (Object.values(item));
              //console.log(objkeys);
              objkeys.forEach(function(eachObject)
              {
                $scope.chartData.push(eachObject);
                //console.log($scope.chartData);
              });

          });



          //alert("HI");
          //alert($scope.chartData.length);
          for(i=0; i<$scope.chartData.length; i+=2)
          {
            //console.log("chartdata[i]: "+$scope.chartData[i]);

            $scope.chartSource.push({"label":"$scope.chartData[i]", "value":"$scope.chartData[i+1]"});
            //console.log("{label:"+$scope.chartData[i]+", value:"+$scope.chartData[i+1]+"}");
          };
          console.log($scope.chartSource);
          console.log(JSON.stringify($scope.chartSource, ['label', 'value']));
          console.log($scope.chartSource);
      });
  };
  $scope.resetData();
  $scope.updateView=function()
  {
    console.log("button");
    $scope.resetData();
  };
  console.log($scope.chartSource);

    var salesChartTest = new FusionCharts({
    type: 'bar3d',
    renderAt: 'chart-container3',
    width: '400',
    height: '300',
    dataFormat: 'json',
    dataSource: {
        "chart": {
            "caption": "Top 5 Stores by Sales",
            "subCaption": "Last month",
            "xAxisName": "Stores",
            "yAxisName": "Sales (in USD)",
            "numberPrefix": "$",
            "alignCaptionWithCanvas": "0",
            "canvasBgAlpha": "0",
            //Theme
            "theme" : "fint"
        },
        "data": [
            {
                "label": "Bakersfield Central",
                "value": "880000"
            },
            {
                "label": "Garden Groove harbour",
                "value": "730000"
            },
            {
                "label": "Los Angeles Topanga",
                "value": "590000"
            },
            {
                "label": "Compton-Rancho Dom",
                "value": "520000"
            },
            {
                "label": "Daly City Serramonte",
                "value": "330000"
            }
        ]
    }
}).render();

var apiChartData=$scope.chartSource;
console.log(apiChartData);
console.log(JSON.stringify($scope.chartSource, ['label', 'value']));
var apiChartData2 = [
  {
    "label": "Feb 4 2015",
    "value": "62.01"
  },
  {
    "label": "Mar 1, 2015",
    "value": "66.18"
  },
  {
    "label": "April 2, 2015",
    "value": "66.05"
  },
  {
    "label": "May 1, 2015",
    "value": "69.5"
  },
  {
    "label": "Jun 16, 2015",
    "value": "72.94"
  },
  {
    "label": "Jul 1, 2015",
    "value": "73.38"
  }
];
var apiChartProperties = {
  "caption": "Price of Petrol in Bangalore",
  "subCaption": "In the last 6 months",
  "xAxisName": "Petrol Price Change Date",
  "yAxisName": "Petrol Price",
  "numberPrefix": "Rs ",
  "rotatevalues": "1",
  "theme": "zune"
};
var apiChart = new FusionCharts({
  type: 'column2d',
  renderAt: 'api-chart-container',
  width: '550',
  height: '350',
  dataFormat: 'json',
  dataSource: {
    "chart": apiChartProperties,
    "data": apiChartData2
  }
});
FusionCharts.ready(function () {
  apiChart.render();
});

$scope.dataSource = {
    chart: {
        caption: "Harry's SuperMart",
        subCaption: "Top 5 stores in last month by revenue",
        numberPrefix: "$",
        theme: "ocean"
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
};

$scope.updateMyChartData = function () {

  /*
    $scope.dataSource.data[2].label = "This Label is Updated";
    $scope.dataSource.data[2].value = "420000";

    $scope.dataSource.data[3].label = "This is updated as well";
    $scope.dataSource.data[3].value = "210000"; */

    for(i=0; i<$scope.chartData.length; i=(i+2))
    {
      //console.log("chartdata[i]: "+$scope.chartData[i]);

      $scope.dataSource.data[i].label = $scope.chartData[i];
      $scope.dataSource.data[i].value = $scope.chartData[i+1];

      //console.log("{label:"+$scope.chartData[i]+", value:"+$scope.chartData[i+1]+"}");
    };
};
$scope.updateMyChartData();




}]);
