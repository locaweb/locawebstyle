describe("Locastyle in general: ", function() {

  beforeEach(function(){
    loadFixtures('general_fixture.html');
    locastyle.general.init();
  });


  describe("Submenu Toggle ", function(){

    describe("When click on any link element of ls-submenu", function(){
      it("should add .active class on self", function(){
        $(".ls-submenu > a").trigger("click");
        expect( $(".ls-submenu").hasClass("active") ).toEqual(true);
      });

      it("should remove .active class on self", function(){
        $(".ls-submenu.active > a").trigger("click");
        expect( $(".ls-submenu").hasClass("active") ).toEqual(false);
      });

    });
  });

  describe("Activation Group button toggle", function() {
    describe("When click on any .btn element inside an .ls-group-active", function() {

      it("should remove any .active class from siblings", function() {
        $("#activation_toggle_button_2").trigger("click");
        expect( $("#activation_toggle_button_1").hasClass('active') ).toEqual(false);
      });

      it("should add .active class on self", function() {
        $("#activation_toggle_button_3").trigger("click");
        expect( $("#activation_toggle_button_3").hasClass("active") ).toEqual(true);
      });

    });
  });

});

