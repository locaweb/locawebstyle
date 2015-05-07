describe('Collapse:', function() {
  beforeEach(function() {
    loadFixtures('collapse_fixture.html');
    locastyle.collapse.init();

    window.test = {
      eventFunctionTest: function() {
        // fake function
      }
    };

    spyOnEvent(window, 'ls-collapse-open');
    spyOnEvent($('#myCollapse4 a'), 'click');
    spyOn(window.test, "eventFunctionTest");

    ls.eventDispatcher.eventSubscribe('ls-collapse-open', window.test.eventFunctionTest);

  });

  describe('When click to open collapse', function() {
    it('should target be visible', function() {
      $('#myCollapse1 [data-ls-module="collapse"]').trigger('click');
      expect($('#collapse1')).toBeVisible();
    });
  });

  describe('When collapse have a class ls-collapse-opened', function() {
    it('should target be visible', function() {
      expect($('.ls-collapse-opened #collapse2')).toBeVisible();
    });
  });

  describe('When collapse have a class ls-collapse-opened-always', function() {
    it('should target be not hidden', function() {
      $('#myCollapse3 [data-ls-module="collapse"]').trigger('click');
      expect($('.ls-collapse-opened-always #collapse3')).toBeVisible();
    });
  });

  describe('When click to open collapse', function() {
    it('should shoot eventDispatcher', function() {
      $('#myCollapse4 a').on('click', function(){
        ls.eventDispatcher.trigger('ls-collapse-open');
      });
      $('#myCollapse4 a').trigger('click');
      expect('ls-collapse-open').toHaveBeenTriggeredOn(window);
      expect(window.test.eventFunctionTest).toHaveBeenCalled()
    });
  });

  describe('Group / Accordeon', function() {

    it('open collapse, close others', function() {
      var $collapseClose = $('#collapse4');
      var $collapseCloseBody = $collapseClose.find('.ls-collapse-body');
      var $collapseOpen = $('#collapse5');
      var $collapseOpenTitle = $collapseOpen.find('.ls-collapse-body');
      $collapseOpen.trigger("click");
      expect($collapseOpen.is(':visible')).toBe(true);
      expect($collapseClose.is(':visible')).toBe(true);
      $collapseClose.trigger("click");
      expect($collapseOpen.is(':visible')).toBe(true);
      expect($collapseClose.is(':visible')).toBe(true);
    });

  });

});
