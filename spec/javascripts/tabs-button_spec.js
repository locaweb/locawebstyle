describe("Tabs: ", function() {
  beforeEach(function() {
    loadFixtures('tabs-button_fixture.html');
    locastyle.button.init();
  });

  describe("Tabs Button toggle", function() {
    describe('when click on a button trigger', function() {

      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-button-1").trigger("click");
        expect($("#tab2").hasClass("ls-active")).toEqual(false);
      });


      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-button-1").trigger("click");
        expect($("#tab1").hasClass("ls-active")).toEqual(true);
      });

      // it("should activate the related target tab", function() {
      //   $("#tab-trigger-2").trigger("click");
      //   expect($("#laps").hasClass("ls-active")).toEqual(true);
      // });

      // it("should prevent default event", function() {
      //   var spyEvent = spyOnEvent('#tab-trigger-2', 'click');
      //   $("#tab-trigger-2").trigger("click");
      //   expect(spyEvent).toHaveBeenPrevented();
      // });

      // it("should activate the parent li", function() {
      //   var $parentLi = $("#tab-trigger-2").parents("li");
      //   $("#tab-trigger-2").trigger("click");
      //   expect($($parentLi).hasClass("ls-active")).toEqual(true);
      // });

      // it("should deactivate the siblings of parent li", function() {
      //   var $siblingOfParentLi = $("#tab-trigger-1").parents("li");
      //   $("#tab-trigger-2").trigger("click");
      //   expect($siblingOfParentLi.hasClass("ls-active")).toEqual(false);
      // });

      // describe('and tabs is in dropdown mode', function () {
      //   it("should update the trigger value with the current active tab value", function () {
      //     $("#my-tabs-in-dropdown-shape #tab-trigger-6").trigger("click");
      //     expect($("#my-tabs-in-dropdown-shape .ls-dropdown-tabs > a").text()).toEqual("Laps");
      //   });
      // });
    });

    // describe("when click on element with data-ls-module without a href", function() {
    //   it("should use a data-target to active tab", function() {
    //     $('#myButtons').trigger("click");
    //     expect($('#myButtons').hasClass("ls-active")).toEqual(true);
    //   });
    // });


  });

  // describe("Unbind:", function() {
  //   describe("when unbind is called in module", function() {
  //     it("should unbind events handled by module", function() {
  //       locastyle.tabs.unbind();
  //       $('#tab-trigger-2').trigger("click");
  //       expect($('#laps').hasClass("ls-active")).toEqual(false);
  //     });

  //     it("should NOT unbind common events handled by other code", function() {
  //       window.test = {
  //         method: function(){
  //           //my fake function
  //         }
  //       };
  //       var spy = spyOn(window.test, "method");
  //       $('#tab-trigger-2').on("click", function () {
  //         window.test.method();
  //       });
  //       locastyle.tabs.unbind();
  //       $('#tab-trigger-2').trigger("click");
  //       expect(window.test.method).toHaveBeenCalled();
  //     });
  //   });
  // });

  // describe("Tabs with wai-aria", function() {
  //   it(".ls-tabs-nav should has attribute role with value tablist ",function(){
  //     expect($('.ls-tabs-nav').attr('role')).toEqual('tablist');
  //   });

  //   it("Link tabs should has attribute role with value tab ",function(){
  //     expect($('.ls-tabs-nav a').attr('role')).toEqual('tab');
  //   });

  //   it("Active link tabs should has attribute aria-selected is value true ",function(){
  //     expect($('.ls-tabs-nav li.ls-active a').attr('aria-selected')).toEqual('true');
  //   });

  //   it(".ls-tab-content has attribute role with value tabpanel ",function(){
  //     expect($('.ls-tab-content').attr('role')).toEqual('tabpanel');
  //   });

  //   it("When click tab should has attribute aria-selected with value true ",function(){
  //     $('.ls-tabs-nav a').trigger('click');
  //     expect($('.ls-tabs-nav li.ls-active a').attr('aria-selected')).toEqual('true');
  //   });

  // });

});
