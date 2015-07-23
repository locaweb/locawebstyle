describe('Toggle text: ', function() {
  beforeEach(function() {
    loadFixtures('toggle-text_fixture.html');
    locastyle.toggleText.init();
  });

  describe('When click on toggle text element', function() {
    it('should change the text', function() {
      var el = $('#toggleText1');
      var newText = el.data('toggle-text');

      el.trigger('click');

      expect(el.text()).toBe(newText);
    });

    it('should change the text at the second click too', function() {
      var el = $('#toggleText1');
      var oldText = el.text();

      // First click
      el.trigger('click');

      // Second click
      el.trigger('click');

      expect(el.text()).toBe(oldText);
    });

    it('should trigger the event toggleText:change', function() {
      var spyEvent = spyOnEvent('#toggleText1', 'toggleText:change');
      $('#toggleText1').trigger('click');
      expect('toggleText:change').toHaveBeenTriggeredOn('#toggleText1');
    });
  });

  describe('When click on toggle text element that has the data-target-text property', function() {
    it('should change the target text', function() {
      var el = $('#toggleText2');
      var target = $(el.data('target-text'));
      var newText = el.data('toggle-text');

      el.trigger('click');

      expect(target.text()).toBe(newText);
    });

    it('should change the target text at the second click too', function() {
      var el = $('#toggleText2');
      var target = $(el.data('target-text'));
      var oldText = target.text();

      // First click
      el.trigger('click');

      // Second click
      el.trigger('click');

      expect(target.text()).toBe(oldText);
    });
  });

});
