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
        expect(spyEvent).toHaveBeenTriggered();
        jasmine.clock().uninstall();
      });
    });
  });

  describe("Resizing Window", function() {

    beforeEach(function(){
      loadFixtures('breakpoint_fixture.html');
    });

    afterEach(function(){
      $('html').removeClass();
    });

    describe("HTML tag should has class", function() {

      it("ls-screen-xs", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect($('html').hasClass('ls-screen-xs')).toBeTruthy();
      });

      it("ls-screen-sm", function() {
        locastyle.breakpoints.init({ documentWidth: 768 });
        expect($('html').hasClass('ls-screen-sm')).toBeTruthy();
      });

      it("ls-screen-md", function() {
        locastyle.breakpoints.init({ documentWidth: 992 });
        expect($('html').hasClass('ls-screen-md')).toBeTruthy();
      });

      it("ls-screen-lg", function() {
        locastyle.breakpoints.init({ documentWidth: 1200 });
        expect($('html').hasClass('ls-screen-lg')).toBeTruthy();
      });
    });

    describe("locastyle.breackpoint class value should has", function() {

      it("ls-screen-xs", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect(locastyle.breakpointClass).toEqual('ls-screen-xs');
      });

      it("ls-screen-sm", function() {
        locastyle.breakpoints.init({ documentWidth: 768 });
        expect(locastyle.breakpointClass).toEqual('ls-screen-sm');
      });

      it("ls-screen-md", function() {
        locastyle.breakpoints.init({ documentWidth: 992 });
        expect(locastyle.breakpointClass).toEqual('ls-screen-md');
      });

      it("ls-screen-lg", function() {
        locastyle.breakpoints.init({ documentWidth: 1200 });
        expect(locastyle.breakpointClass).toEqual('ls-screen-lg');
      });

    });
  });

});
