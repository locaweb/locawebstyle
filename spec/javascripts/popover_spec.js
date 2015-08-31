describe('Popover: ', function() {
  beforeEach(function() {
    loadFixtures('popover_fixture.html');
    locastyle.breakpointClass = "ls-window-lg";
    locastyle.popover.init();
  });


  describe('Popover creation', function() {

    // Create popover when the trigger is binded
    it('Should create the respective popover when trigger is clicked', function() {
      $('#popoverclick').click();
      var target = $('#popoverclick').data('target');
      expect($(target)).toExist();
      locastyle.popover.hide($(target))
    });

    // Adding the attribute data-target to identify popovers and triggers
    it('Should have data-target attr on popover trigger', function() {
      expect($('#popoverclick')).toHaveAttr("data-target","#ls-popover-0");
    });

  });

  describe('Popover behavior', function() {

    // Click Opening Popover
    it("Should trigger the event popover:opened when it opens by click", function() {
      var target = $('#popoverclick').data('target');
      var spyEvent = spyOnEvent($(target), 'popover:opened');
      $('#popoverclick').click(); // and now click to open
      expect('popover:opened').toHaveBeenTriggeredOn($(target));
    });

    it('Should add ls-active class on opened popover', function() {
      $('#popoverclick2').click(); // click to open
      var target = $('#popoverclick2').data('target');
      expect($(target)).toHaveClass('ls-active');
    });

    // Click Closing Popover
    it('Should close .ls-popover removing class ls-active', function() {
      $('#popoverclick2').click(); // click to open
      var target = $('#popoverclick2').data('target');
      expect($(target).hasClass('ls-active')).toEqual(false);
    });

    it("Should trigger the event popover:closed when it closes by click", function() {
      var target = $('#popoverclick').data('target');
      var spyEvent = spyOnEvent($(target), 'popover:closed');
      $('#popoverclick').click(); // and now click to close
      expect('popover:closed').toHaveBeenTriggeredOn( $(target));
    });

    // Hover Opening Popover
    it('Should show a popover on hover event', function() {
      var target = $('#popoverhover').data('target');
      var spyEvent = spyOnEvent($(target), 'popover:opened');
      $('#popoverhover').trigger('mouseenter');
      expect($(target)).toHaveClass('ls-active');
    });

    it('Should close a popover on mouseleave event', function() {
      var target = $('#popoverhover').data('target');
      var spyEvent = spyOnEvent($(target), 'popover:closed');
      $('#popoverhover').trigger('mouseenter');
      $('#popoverhover').trigger('mouseleave');
      expect('popover:closed').toHaveBeenTriggeredOn($(target));
      expect($(target).hasClass('ls-active')).toEqual(false);
    });

    // Testing Unbind
    describe('[unbind] When init is called multiple times', function () {

      it('should bind events on popover elements only one time', function () {
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

});
