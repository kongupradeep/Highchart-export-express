//Include the exporter module
const exporter = require('highcharts-export-server');
var express = require('express'),
    pdf = require('express-pdf');
var app = express();
app.use(pdf);
//Export settings
var exportSettings = {
    type: 'png',
    options: {
        "yAxis": [
          {
            "units": "Number",
            "labels": {},
            "title": {
              "text": "Number"
            }
          },
          {
            "opposite": true,
            "units": "Seconds",
            "labels": {},
            "title": {
              "text": "Seconds"
            }
          }
        ],
        "series": [
          {
            "data": [
              {
                "id": "3g terminated call establish total time~3g terminated call establish total time~2018-06-19",
                "name": "2018-06-19",
                "y": 1444241
              },
              {
                "id": "3g terminated call establish total time~3g terminated call establish total time~2018-06-20",
                "name": "2018-06-20",
                "y": 1439158
              },
              {
                "id": "3g terminated call establish total time~3g terminated call establish total time~2018-06-21",
                "name": "2018-06-21",
                "y": 1439179
              }
            ],
            "zones": [],
            "lineWidth": 2,
            "duration": "Day",
            "kpicount": 1,
            "name": "3g terminated call establish total time",
            "datatype": "Counter",
            "id": "3g terminated call establish total time~Counter~3g terminated call establish total time",
            "color": "#E64A19",
            "type": "spline",
            "tooltip": {
              "headerFormat": "",
              "valueSuffix": "  Number"
            },
            "yAxis": 0
          },
          {
            "data": [
              {
                "id": "3G Terminated Call Establish Total Time~MER_MSS~2018-06-19",
                "name": "2018-06-19",
                "y": 1444241
              },
              {
                "id": "3G Terminated Call Establish Total Time~MER_MSS~2018-06-20",
                "name": "2018-06-20",
                "y": 1439158
              },
              {
                "id": "3G Terminated Call Establish Total Time~MER_MSS~2018-06-21",
                "name": "2018-06-21",
                "y": 1439179
              }
            ],
            "zones": [],
            "lineWidth": 2,
            "duration": "Day",
            "kpicount": 1,
            "name": "MER_MSS",
            "kpiname": "3G Terminated Call Establish Total Time",
            "datatype": "Node",
            "id": 2862361006803593,
            "color": "#E64A19",
            "type": "spline",
            "dashStyle": "shortdot",
            "tooltip": {
              "headerFormat": "",
              "valueSuffix": "  Seconds"
            },
            "yAxis": 1
          }
        ],
        "legend": {
          "maxHeight": 50
        },
        "xAxis": {
          "categories": [
            "2018-06-19",
            "2018-06-20",
            "2018-06-21"
          ],
          "type": "category"
        },
        "title": {
          "text": null
        },
        "chart": {
          "type": "spline",
          "zoomType": "xy",
          "height": null
        },
        "plotOptions": {
          "series": {
            "cursor": "pointer",
            "point": {
              "events": {}
            }
          }
        },
        "credits": {
          "enabled": false
        }
      }
};
//Set up a pool of PhantomJS workers
exporter.initPool();

app.get('/', function (req, res) {
    res.send("welcome to high chart export");
});
app.get('/export', function (req, res) {
    exporter.export(exportSettings, function (err, re) {
        exporter.killPool();
        var img = new Buffer(re.data, 'base64');
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': img.length
        });
        res.end(img);
        // res.pdfFromHTML({
        //     filename: 'generated.pdf',
        //     htmlContent: '<html><body><img src="data:image/png;base64,'+ re.data +'"/></body></html>',
        // }); 
    });
});
app.listen(3000);