var locastyle = locastyle || {};

locastyle.datepicker = (function() {
  'use strict';

  function init() {
    var $datepicker = $('#datepicker').pikaday({
        firstDay: 1,
        minDate: new Date('2000-01-01'),
        maxDate: new Date('2020-12-31'),
        yearRange: [2000,2020]
    });
    // chain a few methods for the first datepicker, jQuery style!
    $datepicker.pikaday('show').pikaday('nextMonth');
  }

  return {
    init: init
  }

}());
