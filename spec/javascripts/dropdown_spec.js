describe("Dropdown: ", function(){
  beforeEach(function(){
    loadFixtures('dropdown_fixture.html');
    locastyle.dropdown.init();
  });

  describe("Dropdown toggle", function(){
    describe('when click on a dropdown trigger', function () {

      it("should activate a disabled related dropdown module", function(){
        $("#dropdown-test > a:first-child").trigger("click");
        expect($("#dropdown-test").hasClass("active")).toEqual(true);
      });

      it("should disable an active related dropdown module", function() {
        $("#dropdown-test-2 > a:first-child").trigger("click");
        expect($("#dropdown-test-2").hasClass("active")).toEqual(false);
      });

      it("should prevent default event on dropdown module", function () {
        var spyEvent = spyOnEvent('#dropdown-test > a:first-child', 'click');
        $("#dropdown-test > a:first-child").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

    });
  });

});
