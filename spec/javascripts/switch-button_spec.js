describe('Swicth Button: ', function() {

  beforeEach(function() {
    loadFixtures('switch-button_fixture.html');
    locastyle.switchButton.init();
  });

  describe('When click on switch button', function() {
    it('should add the active button class', function() {
      $('#button1').trigger('click');
      expect($('#button1').hasClass('ls-switch-btn-active')).toEqual(true);
    });

    it('should remove the active button class', function() {
      $('#button2').trigger('click');
      expect($('#button2').hasClass('ls-switch-btn-active')).toEqual(false);
    });

    it('should trigger the switchButton:activated event', function() {
      var spyEvent = spyOnEvent(document, 'switchButton:activated');
      $('#button1 input[type=checkbox]').trigger('click');
      expect('switchButton:activated').toHaveBeenTriggeredOn(document);
    });

    it('should trigger the switchButton:deactivated event', function() {
      var spyEvent = spyOnEvent('#button2', 'switchButton:deactivated');
      $('#button2 input[type=checkbox]').trigger('click');
      expect('switchButton:deactivated').toHaveBeenTriggeredOn('#button2');
    });
  });

  describe('When the page load', function() {
    it('should validate all the checked buttons and add the active class', function() {
      expect($('#button2').hasClass('ls-switch-btn-active')).toEqual(true);
    });
  });

});
