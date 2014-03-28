describe("Locastyle in general: ", function() {

  describe("Submenu Toggle ", function(){
    beforeEach(function(){
      loadFixtures('general_fixture.html');
      locastyle.general.init();
    });

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

});

