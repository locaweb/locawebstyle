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

    });
  });

});
