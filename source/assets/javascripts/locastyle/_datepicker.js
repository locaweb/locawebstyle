var locastyle = locastyle || {};

locastyle.datepicker = (function() {
  'use strict';

  var config = {
    selector: '.datepicker',
    rangeSelector: '[data-ls-daterange]',
    pikaday: {
      firstDay: 1,
      minDate: new Date('1900-01-01'),
      maxDate: new Date('2100-12-31'),
      format: 'DD/MM/YYYY',
      yearRange: [1900,2100],
      i18n: {
        previousMonth : 'Anterior',
        nextMonth     : 'Pr&oacute;ximo',
        months        : ['Janeiro','Fevereiro','Mar&ccedil;o','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
        weekdays      : ['Domingo','Segunda','Ter&ccedil;a','Quarta','Quinta','Sexta','S&aacute;bado'],
        weekdaysShort : ['Dom','Seg','Ter','Qua','Qui','Sex','S&aacute;b']
      }
    }
  };

  // This ensures the datepicker functionality to use only text inputs
  function changeTypeToText(el) {
    if (el.attr('type') !== 'text') {
      el.attr('type', 'text');
    }
  }

  function init() {
    // Datepicker without range
    $(config.selector).each(function() {
      changeTypeToText($(this));

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
    var elementDatePair = $(el.data('ls-daterange'));

    var pickerStartObj = {
      field: el[0],
      onSelect: function() {
        picker2.setMinDate(this.getDate());
      }
    };

    var pickerEndObj = {
      field: elementDatePair[0],
      onSelect: function() {
        picker1.setMaxDate(this.getDate());
      }
    };

    picker1 = new Pikaday($.extend(pickerStartObj, config.pikaday));
    picker2 = new Pikaday($.extend(pickerEndObj, config.pikaday));

    elementDatePair.attr('data-date-pair', el.attr('id'));
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
