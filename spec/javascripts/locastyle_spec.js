describe("Locastyle in general: ", function() {
  beforeEach(function() {
    loadFixtures('locastyle_general_fixture.html');
    locastyle.init();
  });

  describe("Activation toggle", function () {
    describe("When click on any .btn element inside an .activation-toggle", function() {

      it("should remove any .active class from siblings", function() {
        $("#activation_toggle_button_2").trigger("click");
        expect( $("#activation_toggle_button_1").hasClass('active') ).toBeFalsy();
      });

      it("should add .active class on self", function() {
        $("#activation_toggle_button_3").trigger("click");
        expect( $("#activation_toggle_button_3").hasClass("active") ).toBeTruthy();
      });

    });
  });

});