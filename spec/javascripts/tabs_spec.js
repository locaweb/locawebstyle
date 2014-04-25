describe("Tabs: ", function() {
  beforeEach(function() {
    loadFixtures('tabs_fixture.html');
    locastyle.tabs.init();
  });

  describe("Tabs toggle", function() {
    describe('when click on a tab trigger', function() {

      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-trigger-2").trigger("click");
        expect($("#track").hasClass("active")).toEqual(false);
      });

      it("should activate the related target tab", function() {
        $("#tab-trigger-2").trigger("click");
        expect($("#laps").hasClass("active")).toEqual(true);
      });

      it("should prevent default event", function() {
        var spyEvent = spyOnEvent('#tab-trigger-2', 'click');
        $("#tab-trigger-2").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

      it("should activate the parent li", function() {
        var $parentLi = $("#tab-trigger-2").parents("li");
        $("#tab-trigger-2").trigger("click");
        expect($($parentLi).hasClass("active")).toEqual(true);
      });

      it("should deactivate the siblings of parent li", function() {
        var $siblingOfParentLi = $("#tab-trigger-1").parents("li");
        $("#tab-trigger-2").trigger("click");
        expect($siblingOfParentLi.hasClass("active")).toEqual(false);
      });
    });

    describe("when click on element with data-ls-module without a href", function() {
      it("should use a data-target to active tab", function() {
        $('#myButtons').trigger("click");
        expect($('#myButtons').hasClass("active")).toEqual(true);
      });
    });

    describe("when resolution class is .ls-screen-sm", function () {
      it("should turn dropdown", function () {
        locastyle.breakpointClass = "ls-screen-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile').parents(".ls-dropdown").length).toEqual(1);
      });

      it("should insert the active tab as link in dropdown", function () {
        var expectedContent = $("#my-tabs-in-mobile li.active a").html();
        locastyle.breakpointClass = "ls-screen-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown > a').html()).toEqual(expectedContent);
      });

      it("should insert the .in-dropdown css class in .ls-tabs-nav", function () {
        locastyle.breakpointClass = "ls-screen-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown .ls-tabs-nav').hasClass('in-dropdown')).toEqual(true);
      });
    });

    describe("when breakpoint-updated event is fired", function () {
      it("should run the breakpoint checker", function () {
        var spy = spyOn(locastyle.tabs, "checkBreakpoint");
        $(document).trigger('breakpoint-updated');
        expect(locastyle.tabs.checkBreakpoint).toHaveBeenCalled();
      });

      it("should not run dropdownShape if it is already a dropdown", function(){
        locastyle.breakpointClass = "ls-screen-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-dropdown-shape .ls-dropdown > a').size()).toEqual(1);
      });
    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled by module", function() {
        locastyle.tabs.unbind();
        $('#tab-trigger-2').trigger("click");
        expect($('#laps').hasClass("active")).toEqual(false);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $('#tab-trigger-2').on("click", function () {
          window.test.method();
        })
        locastyle.tabs.unbind();
        $('#tab-trigger-2').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

});
