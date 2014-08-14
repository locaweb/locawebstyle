$(function () {
  $('#panel-charts').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Agosto/2014'
    },
    xAxis: {
      categories: [
        'Joana',
        'Marcela',
        'Patricia',
        'Diego'
      ]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Envios'
      }
    },
    colors: [{
      linearGradient: [0, 300, 0, 0],
      stops: [
        [0, "rgb(189, 170, 56)"],
        [1, "rgb(155, 131, 23)"]
      ]
    }],
    series: [{
      name: 'Total de envios contratados',
      data: [25, 50, 20, 3]
    }]
  });
});
