describe("Tabs: ", function(){
  beforeEach(function(){
    loadFixtures('tabs_fixture.html');
    locastyle.tabs.init();
  });

  describe("Tabs toggle", function(){
    describe('when click on a tab trigger', function () {

      it("should deactivate the siblings tabs of related target tab", function(){
        $("#tab-trigger-2").trigger("click");
        expect($("#track").hasClass("active")).toEqual(false);
      });

      it("should activate the related target tab", function(){
        $("#tab-trigger-2").trigger("click");
        expect($("#laps").hasClass("active")).toEqual(true);
      });

      it("should prevent default event", function () {
        var spyEvent = spyOnEvent('#tab-trigger-2', 'click');
        $("#tab-trigger-2").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      })

      it("should activate the parent li", function(){
        var $parentLi = $("#tab-trigger-2").parents("li");
        $("#tab-trigger-2").trigger("click");
        expect($($parentLi).hasClass("active")).toEqual(true);
      });

    });
  });

});
