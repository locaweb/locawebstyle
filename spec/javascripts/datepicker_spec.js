describe('Datepicker: ', function() {
  beforeEach(function() {
    loadFixtures('datepicker_fixture.html');
    locastyle.datepicker.init();
    locastyle.form.triggerCalendar();
  });

  afterEach(function() {
    $('.pika-single').remove();
  });

  describe('when input has class .datepicker', function() {
    it('the datepicker module init', function() {
      expect($('.pika-single')).toExist();
    });

    it('the datepicker field should have the text type', function() {
      expect($('#datepicker-1').attr('type')).toBe('text');
    });

    it('pikaday range init', function() {
      expect($('#datepicker-2').data('date-pair')).toBe('datepicker-1');
    });
  });

  describe('init by javascript', function() {
    it('pikaday should be triggered', function() {
      locastyle.datepicker.newDatepicker('#datepicker-js');
      $('#datepicker-js').trigger('click');
      expect($('.pika-single:not(.is-hidden)')).toExist();
    });
  });

  describe('When click on a data-trigger-calendar element', function() {
    it('bind the triggerCalendar function', function() {
      $('#datepicker-1-prefix').trigger('click');
      expect($('.pika-single:not(.is-hidden)')).toExist();
    });
  });
});
