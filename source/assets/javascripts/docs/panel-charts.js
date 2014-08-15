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
    colors: ["#bdaa38", "#aa4643 ","#89a54e"],
    series: [{
      name: 'Total de envios contratados',
      data: [25, 50, 20, 3]
    }]
  });

  $('#panel-charts-client').highcharts({

    chart: {
      type: 'column',
      width: $('#panel-charts').width()
    },
    title: {
      text: 'Agosto/2014'
    },
    xAxis: {
      categories: [
        '29/04 a 28/05',
        '29/06 a 28/07',
        '29/08 a 28/09',
        '29/10 a 28/11'
      ]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Envios'
      }
    },
    colors: ["#bdaa38", "#aa4643 ","#89a54e"],
    series: [{
      name: 'Mensagens enviadas',
      data: [30, 15, 30, 30],
    },
    {
      name: 'Erros de recebimento',
      data: [20, 12, 14, 22]
    },
    {
      name: 'Descadastramentos',
      data: [5, 1, 5, 10]
    }]
  });

  $('#panel-charts-2').highcharts({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Agosto/2014'
    },
    xAxis: {
      categories: [
        '00h',
        '01h',
        '02h',
        '03h'
      ]
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantidade'
      }
    },
    series: [{
      name: 'envios',
      data: [55, 50, 20, 3]
    },
    {
      name: 'erros',
      data: [5, 5, 2, 3]
    }]
  });

  // Panel 2 Pie chart
  $('#panel-chart-pie').highcharts({
    chart: {
      width: $('#panel-charts-2').width(),
      plotBackgroundColor: null,
      plotBorderWidth: 1,
      plotShadow: false
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    colors: ['#25b89a', '#aa4643 ','#89a54e'],
    plotOptions: {
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
      type: 'pie',
      name: 'Browser share',
      data: [
        ['Erro 1', 15.0],
        ['Erro 2', 35.0],
        ['Erro 3', 40.0]
      ]
    }]
  });

});
