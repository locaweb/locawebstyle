describe('Collapse:', function() {
  beforeEach(function() {
    loadFixtures('collapse_fixture.html');
    locastyle.collapse.init();
  });

  describe('When click to open collapse', function() {
    it('should target be visible', function() {
      $('#myCollapse1 .ls-collapse-header').trigger('click');
      expect($('#collapse1')).toBeVisible();
    });

    it('should trigger the event collapse:opened', function() {
      var spyEvent = spyOnEvent(document, 'collapse:opened');
      $('#myCollapse1 .ls-collapse-header').trigger('click');
      expect('collapse:opened').toHaveBeenTriggeredOn(document);

      var spyEvent = spyOnEvent(document, 'collapse:closed');
      $('#myCollapse1 .ls-collapse-header').trigger('click');
      expect('collapse:closed').toHaveBeenTriggeredOn(document);
    });
  });

  describe('when the collapse is opened', function() {
    var collapse = null;
    var collapseHeader = null;
    var collapseBody = null;

    beforeEach(function() {
      collapse = $('#myCollapse1');
      collapseHeader = collapse.find('.ls-collapse-header');
      collapseBody = collapse.find('.ls-collapse-body');
      collapseHeader.trigger('click');
    });

    it('should add the aria-expanded true to collapse header', function() {
      expect(collapseHeader.attr('aria-expanded')).toBe('true');
    });

    it('should add the aria-hidden false to collapse header', function() {
      expect(collapseBody.attr('aria-hidden')).toBe('false');
    });

    describe('when the collapse is close', function() {
      beforeEach(function() {
        collapseHeader.trigger('click');
      });

      it('should add the aria-expanded false to collapse header', function() {
        expect(collapseHeader.attr('aria-expanded')).toBe('false');
      });

      it('should add the aria-hidden true to collapse header', function() {
        expect(collapseBody.attr('aria-hidden')).toBe('true');
      });
    });
  });

  describe('when use another element to trigger the collapse', function() {
    it('should toggle the collapse state', function() {
      $('#button-trigger').trigger('click');
      expect($('#myCollapse4')).toBeVisible();
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

      $collapseOpen.trigger('click');
      expect($collapseOpen.is(':visible')).toBe(true);
      expect($collapseClose.is(':visible')).toBe(true);
      $collapseClose.trigger('click');
      expect($collapseOpen.is(':visible')).toBe(true);
      expect($collapseClose.is(':visible')).toBe(true);
    });
  });
});
