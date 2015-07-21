describe('Collapse:', function() {

  beforeEach(function() {
    loadFixtures('collapse_fixture.html');
    locastyle.collapse.init();

  });

  describe('When click to open collapse', function() {
    it('should target be visible', function() {
      $('#myCollapse1 [data-ls-module="collapse"]').trigger('click');
      expect($('#collapse1')).toBeVisible();
    });

    it("should trigger the event collapse:opened", function() {
      var spyEvent = spyOnEvent(document, 'collapse:opened');
      $('#myCollapse1 [data-ls-module="collapse"]').trigger("click");
      expect('collapse:opened').toHaveBeenTriggeredOn(document);

      var spyEvent = spyOnEvent(document, 'collapse:closed');
      $('#myCollapse1 [data-ls-module="collapse"]').trigger("click");
      expect('collapse:closed').toHaveBeenTriggeredOn(document);
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
