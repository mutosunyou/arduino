$(function(){ 
  resultTable();
  /*
  $('#charts').highcharts({
    chart: {
      width:500,
      height:300,
      type:'pie'
    },
    title: {
      text: "負荷試験結果",
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions:{
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: 'Questionaire',
      colorByPoint: true,
      data: 'sss'
    }]
  });//highcharts終わり
  */
  $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=analytics.csv&callback=?', function (csv) {
    $('#charts').highcharts({
      data: {
        csv: csv
      },
      title: {
        text: 'Daily visits at www.highcharts.com'
      },
      subtitle: {
        text: 'Source: Google Analytics'
      },
      xAxis: {
        tickInterval: 7 * 24 * 3600 * 1000, // one week
        tickWidth: 0,
        gridLineWidth: 1,
        labels: {
          align: 'left',
          x: 3,
          y: -3
        }
      },
      yAxis: [{ // left y axis
        title: {
          text: null
        },
        labels: {
          align: 'left',
          x: 3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }, { // right y axis
        linkedTo: 0,
        gridLineWidth: 0,
        opposite: true,
        title: {
          text: null
        },
        labels: {
          align: 'right',
          x: -3,
          y: 16,
          format: '{value:.,0f}'
        },
        showFirstLabel: false
      }],
      legend: {
        align: 'left',
        verticalAlign: 'top',
        y: 20,
        floating: true,
        borderWidth: 0
      },
      tooltip: {
        shared: true,
        crosshairs: true
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: function (e) {
                hs.htmlExpand(null, {
                  pageOrigin: {
                    x: e.pageX || e.clientX,
                    y: e.pageY || e.clientY
                  },
                  headingText: this.series.name,
                  maincontentText: Highcharts.dateFormat('%A, %b %e, %Y', this.x) + ':<br/> ' +
                    this.y + ' visits',
                  width: 200
                });
              }
            }
          },
          marker: {
            lineWidth: 1
          }
        }
      },
      series: [{
        name: 'All visits',
        lineWidth: 4,
        marker: {
          radius: 4
        }
      }, {
        name: 'New visitors'
      }]
    });
  });

  function resultTable(){
    $.post(
      "helper/lister.php",
      {
      },
      function(data){
        $('#result').html(data);
      }
    );
  }

});//スクリプト終わり

