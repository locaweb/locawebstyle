var locastyle = locastyle || {};

locastyle.datepicker = (function() {
  'use strict';

  function init() {
    var $datepicker = $('#datepicker').pikaday({
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2000,2020],
        i18n: {
          previousMonth : 'Anterior',
          nextMonth     : 'Próximo',
          months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junnho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
          weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
          weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
        }
    });
    $datepicker.pikaday('show').pikaday('nextMonth');
  }

  return {
    init: init
  };

}());
