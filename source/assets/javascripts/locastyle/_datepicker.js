var locastyle = locastyle || {};

locastyle.datepicker = (function() {
  'use strict';

  var config = {
    selector: '.datepicker'
  }

  function init() {
    $(config.selector).each(function(index, elem){
      datepicker( $(elem) )
    });
    plugin();
  }

  function datepicker($elem){
    var $datepicker = $elem.pikaday({
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
  }

  function plugin(){
    $.fn.lsDatepicker = function(action) {
      if(action === undefined){
        datepicker(this);
      } else{
        var picker = new Pikaday({ field: this[0] });
        if(action === 'destroy'){
          picker.destroy()
        }
      }
    };
  }

  return {
    init: init
  }

}());
