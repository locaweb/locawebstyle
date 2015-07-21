var locastyle = locastyle || {};

locastyle.datepicker = (function() {
  'use strict';

  var config = {
    selector: '.datepicker',
    rangeSelector: '[data-ls-daterange]',
    pikaday: {
      firstDay: 1,
      minDate: new Date('2000-01-01'),
      maxDate: new Date('2020-12-31'),
      format: 'DD/MM/YYYY',
      yearRange: [2000,2020],
      i18n: {
        previousMonth : 'Anterior',
        nextMonth     : 'Próximo',
        months        : ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        weekdays      : ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
        weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
      }
    }
  };

  function init() {
    // Datepicker without range
    $(config.selector).each(function(){
      if (!$(this).hasClass('ls-daterange')) {
        create($(this));
      }
    });

    // Datepicker with range
    $(config.rangeSelector).each(function() {
      createWithRange($(this));
    });
  }

  function create(el){
    el.pikaday(config.pikaday);
  }

  function createWithRange(el) {
    var picker1 = null;
    var picker2 = null;

    var pickerStartObj = {
      field: el[0],
      onSelect: function() {
        picker2.setMinDate(this.getDate());
      }
    };

    var pickerEndObj = {
      field: $(el.data('ls-daterange'))[0],
      onSelect: function() {
        picker1.setMaxDate(this.getDate());
      }
    };

    picker1 = new Pikaday($.extend(pickerStartObj, config.pikaday));
    picker2 = new Pikaday($.extend(pickerEndObj, config.pikaday));
  }

  function newDatepicker(selector){
   create($(selector));
  }

  return {
    init: init,
    newDatepicker: newDatepicker,
    createWithRange: createWithRange
  };

}());
