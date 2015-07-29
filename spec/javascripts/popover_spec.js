describe('Popover: ', function() {
  beforeEach(function() {
    loadFixtures('popover_fixture.html');
    locastyle.breakpointClass = "ls-window-lg";
    locastyle.popover.destroy();
    locastyle.popover.init();
  });

  describe('Popover creation', function() {

    // Create popover to each trigger elements
    it('Should create one popover for each trigger', function() {
      var elems    = document.querySelectorAll('[data-ls-module="popover"]').length;
      var popovers = document.querySelectorAll('.ls-popover').length;
      expect(elems).toEqual(popovers);
    });

    // Adding the attribute data-target to identify popovers and triggers
    it('Should have data-target attr on popover trigger', function() {
      expect($('#popoverclick')).toHaveAttr("data-target","#ls-popover-0");
    });

  });

  describe('Popover behavior', function() {

    // Click Opening Popover
    it("Should trigger the event popover:opened when it opens by click", function() {
      var id = $('.ls-popover').eq(0).attr("id");
      var popoverToOpen = "#" + id;
      var spyEvent = spyOnEvent(popoverToOpen, 'popover:opened');
      $('#popoverclick').click(); // click to open
      expect('popover:opened').toHaveBeenTriggeredOn(popoverToOpen);
    });

    it('Should add ls-active class on opened popover', function() {
      $('#popoverclick').click(); // click to open
      expect($('.ls-popover').eq(0)).toHaveClass('ls-active');
    });

    // Click Closing Popover
    it('Should close .ls-popover removing class ls-active', function() {
      $('#popoverclick').click(); // click to open
      $('#popoverclick').click(); // and now click to close
      expect($('.ls-popover').eq(0).hasClass('ls-active')).toEqual(false);
    });

    it("Should trigger the event popover:closed when it closes by click", function() {
      var id = $('.ls-popover').eq(0).attr("id");
      var popoverToOpen = "#" + id;
      var spyEvent = spyOnEvent(popoverToOpen, 'popover:closed');
      $('#popoverclick').click(); // click to open
      $('#popoverclick').click(); // and now click to close
      expect('popover:closed').toHaveBeenTriggeredOn(popoverToOpen);
    });

    // Hover Opening Popover
    it('Should show a popover on hover event', function() {
      $('#popoverhover').trigger('mouseenter');
      expect($('.ls-popover').eq(1)).toHaveClass('ls-active');
    });

    it("Should trigger the event popover:opened when it opens by mouseenter", function() {
      var id = $('.ls-popover').eq(1).attr("id");
      var popoverToOpen = "#" + id;
      var spyEvent = spyOnEvent(popoverToOpen, 'popover:opened');
      $('#popoverhover').trigger('mouseenter');
      expect('popover:opened').toHaveBeenTriggeredOn(popoverToOpen);
    });

    it('Should close a popover on mouseleave event', function() {
      $('#popoverhover').trigger('mouseleave');
      expect($('.ls-popover').eq(1).hasClass('ls-active')).toEqual(false);
    });

    it("Should trigger the event popover:closed when it closes by mouseout", function() {
      var id = $('.ls-popover').eq(1).attr("id");
      var popoverToClose = "#" + id;
      var spyEvent = spyOnEvent(popoverToClose, 'popover:closed');
      $('#popoverhover').trigger('mouseenter');
      $('#popoverhover').trigger('mouseleave');
      expect('popover:closed').toHaveBeenTriggeredOn(popoverToClose);
    });
  });

  // Testing Unbind
  describe('[unbind] When init is called multiple times', function () {

    it('should bind events on popover elements only one time', function () {
      locastyle.init();
      locastyle.init();
      locastyle.init();
      var $popoverTrigger = $('#popoverclick');
      var $popover = $('#ls-popover-' + $popoverTrigger.data('idPopover'));
      $popover.hide();
      $popoverTrigger.click();
      $popoverTrigger.click();
      expect( $popover ).not.toBeVisible();
    });
  });

});
