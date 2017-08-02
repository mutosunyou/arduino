
$(function(){ 
  $('#charts').highcharts({
    chart: {
      width:500,
      height:300,
      type:'pie'
    },
    title: {
      text: "aaa",
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
      data: darr
    }]
  });//highcharts終わり

});//スクリプト終わり

