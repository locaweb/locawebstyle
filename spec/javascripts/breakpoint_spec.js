describe("Breakpoint: ", function() {
  beforeEach(function() {
    locastyle.breakpoints.init();
  });

  describe("Events:", function() {
    describe('when breakpoint changes', function() {
      it("should fire the event 'breakpoint-updated' event to tell it has changed", function() {
        jasmine.clock().install();
        var spyEvent = spyOnEvent(document, 'breakpoint-updated');
        $(window).trigger('resize');
        jasmine.clock().tick(305);
        expect(spyEvent).toHaveBeenTriggered()
        jasmine.clock().uninstall();
      });
    });
  });

});
