describe("Tabs: ", function() {
  beforeEach(function() {
    loadFixtures('tabs_fixture.html');
    locastyle.tabs.init();
  });

  describe("Tabs toggle", function() {
    describe('when click on a tab trigger', function() {

      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-trigger-2").trigger("click");
        expect($("#track").hasClass("ls-active")).toEqual(false);
      });

      it("should activate the related target tab", function() {
        $("#tab-trigger-2").trigger("click");
        expect($("#laps").hasClass("ls-active")).toEqual(true);
      });

      it("should prevent default event", function() {
        var spyEvent = spyOnEvent('#tab-trigger-2', 'click');
        $("#tab-trigger-2").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

      it("should triggered the event tab:activated", function() {
        var spyEvent = spyOnEvent('[data-ls-module="tabs"]', 'tab:activated');
        $("#tab-trigger-2").trigger("click");
        expect(spyEvent).toHaveBeenTriggered();
      });

      it("should triggered the event tab:deactivated", function() {
        var spyEvent = spyOnEvent('[data-ls-module="tabs"]', 'tab:deactivated');
        $("#tab-trigger-2").trigger("click");
        expect(spyEvent).toHaveBeenTriggered();
      });

      it("should activate the parent li", function() {
        var $parentLi = $("#tab-trigger-2").parents("li");
        $("#tab-trigger-2").trigger("click");
        expect($($parentLi).hasClass("ls-active")).toEqual(true);
      });

      it("should deactivate the siblings of parent li", function() {
        var $siblingOfParentLi = $("#tab-trigger-1").parents("li");
        $("#tab-trigger-2").trigger("click");
        expect($siblingOfParentLi.hasClass("ls-active")).toEqual(false);
      });

      describe('and tabs is in dropdown mode', function () {
        it("should update the trigger value with the current active tab value", function () {
          $("#my-tabs-in-dropdown-shape #tab-trigger-6").trigger("click");
          expect($("#my-tabs-in-dropdown-shape .ls-dropdown-tabs > a").text()).toEqual("Laps");
        });
      });
    });

    describe("when click on element with data-ls-module without a href", function() {
      it("should use a data-target to active tab", function() {
        $('#myButtons').trigger("click");
        expect($('#myButtons').hasClass("ls-active")).toEqual(true);
      });
    });

    describe("when resolution class is .ls-window-sm or ls-window-xs", function () {
      it("should turn dropdown", function () {
        locastyle.breakpointClass = "ls-window-xs";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile').parents(".ls-dropdown-tabs").length).toEqual(1);
      });

      it("should turn dropdown", function () {
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile').parents(".ls-dropdown-tabs").length).toEqual(1);
      });

      it("should insert the active tab as link in dropdown", function () {
        var expectedContent = $("#my-tabs-in-mobile li.ls-active a").html();
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown-tabs > a').html()).toEqual(expectedContent);
      });

      it("should insert the .ls-btn css class in the dropdown trigger link", function () {
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown-tabs').find("> a").hasClass('ls-btn')).toEqual(true);
      });

      it("should insert the .in-dropdown css class in .ls-tabs-nav", function () {
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown-tabs .ls-tabs-nav').hasClass('in-dropdown')).toEqual(true);
      });

      it("should insert the .ls-dropdown-tabs-nav css class in .ls-tabs-nav", function () {
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-mobile-wrapper .ls-dropdown-tabs .ls-tabs-nav').hasClass('ls-dropdown-nav')).toEqual(true);
      });

    });

    describe("when breakpoint-updated event is fired", function () {
      it("should run the breakpoint checker", function () {
        var spy = spyOn(locastyle.tabs, "checkBreakpoint");
        $(document).trigger('breakpoint-updated');
        expect(locastyle.tabs.checkBreakpoint).toHaveBeenCalled();
      });

      it("should not run dropdownShape if it is already a dropdown", function(){
        locastyle.breakpointClass = "ls-window-sm";
        locastyle.tabs.init();
        expect($('#my-tabs-in-dropdown-shape .ls-dropdown-tabs > a').size()).toEqual(1);
      });
    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled by module", function() {
        locastyle.tabs.unbind();
        $('#tab-trigger-2').trigger("click");
        expect($('#laps').hasClass("ls-active")).toEqual(false);
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
        });
        locastyle.tabs.unbind();
        $('#tab-trigger-2').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

  describe("Tabs with wai-aria", function() {
    it(".ls-tabs-nav should has attribute role with value tablist ",function(){
      expect($('.ls-tabs-nav').attr('role')).toEqual('tablist');
    });

    it("Link tabs should has attribute role with value tab ",function(){
      expect($('.ls-tabs-nav a').attr('role')).toEqual('tab');
    });

    it("Active link tabs should has attribute aria-selected is value true ",function(){
      expect($('.ls-tabs-nav li.ls-active a').attr('aria-selected')).toEqual('true');
    });

    it(".ls-tab-content has attribute role with value tabpanel ",function(){
      expect($('.ls-tab-content').attr('role')).toEqual('tabpanel');
    });

    it("When click tab should has attribute aria-selected with value true ",function(){
      $('.ls-tabs-nav a').trigger('click');
      expect($('.ls-tabs-nav li.ls-active a').attr('aria-selected')).toEqual('true');
    });

  });

});
