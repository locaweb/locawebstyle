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

    describe("HTML tag should has class ls-window", function() {
      it("ls-window-xs", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect($('html').hasClass('ls-window-xs')).toBeTruthy();
      });

      it("ls-window-sm", function() {
        locastyle.breakpoints.init({ documentWidth: 768 });
        expect($('html').hasClass('ls-window-sm')).toBeTruthy();
      });

      it("ls-window-md", function() {
        locastyle.breakpoints.init({ documentWidth: 992 });
        expect($('html').hasClass('ls-window-md')).toBeTruthy();
      });

      it("ls-window-lg", function() {
        locastyle.breakpoints.init({ documentWidth: 1200 });
        expect($('html').hasClass('ls-window-lg')).toBeTruthy();
      });
    });

    describe("locastyle.breackpoint class value ls-window should has", function() {
      it("ls-window-xs", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect(locastyle.breakpointClass).toEqual('ls-window-xs');
      });

      it("ls-window-sm", function() {
        locastyle.breakpoints.init({ documentWidth: 768 });
        expect(locastyle.breakpointClass).toEqual('ls-window-sm');
      });

      it("ls-window-md", function() {
        locastyle.breakpoints.init({ documentWidth: 992 });
        expect(locastyle.breakpointClass).toEqual('ls-window-md');
      });

      it("ls-window-lg", function() {
        locastyle.breakpoints.init({ documentWidth: 1200 });
        expect(locastyle.breakpointClass).toEqual('ls-window-lg');
      });
    });

    describe("HTML tag should has class ls-screen", function() {
      it("ls-screen", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect($('html[class*="ls-screen"]')).toBeTruthy();
      });
    });

    describe("locastyle.breakpointScreenClass class value ls-screen should has", function() {
      it("ls-screen", function() {
        locastyle.breakpoints.init({ documentWidth: 767 });
        expect(locastyle.breakpointScreenClass).toMatch(/ls-screen/);
      });
    });
  });

});
