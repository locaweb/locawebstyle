describe('Checkbox Toggle: ', function() {

  beforeEach(function() {
    loadFixtures('checkbox-toggle_fixture.html');
    locastyle.checkboxToggle.init();
  });

  describe('when click on table main checkbox', function() {
    it('should have the ls-triggered class', function() {
      var elem = $('#lsTable [data-ls-module="checkboxToggle"]');
      elem.trigger('click.ls');
      expect(elem.hasClass('ls-triggered')).toBe(true);
    });

    it('should trigger the checkboxToggle:activated event', function() {
      var spyEvent = spyOnEvent(document, 'checkboxToggle:activated');
      $('#lsTable [data-ls-module="checkboxToggle"]').trigger('click.ls');
      expect('checkboxToggle:activated').toHaveBeenTriggeredOn(document);
    });

    it('should add the ls-checked class on all target checboxes', function() {
      $('#lsTable [data-ls-module="checkboxToggle"]').trigger('click.ls');
      $('.checkboxElementTarget').each(function() {
        expect($(this).hasClass('ls-checked')).toBe(true);
      });
    });
  });

  describe('when click on element with the ls-triggered class', function() {
    it('should trigger the checkboxToggle:deactivated event', function() {
      var spyEvent = spyOnEvent(document, 'checkboxToggle:deactivated');
      $('#toggleButton').trigger('click.ls');
      expect('checkboxToggle:deactivated').toHaveBeenTriggeredOn(document);
    });
  });

  describe('when select all target checkboxes', function() {
    it('should add the ls-triggered class on the main checkbox element', function() {
      $('.checkedElement').not('.ls-checked').trigger('click.ls');
      expect($('#uncheckedElement').hasClass('ls-triggered')).toBe(true);
    });
  });

});
