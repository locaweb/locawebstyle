describe("Collapses: ", function(){

  beforeEach(function(){
    loadFixtures('collapses_fixture.html');
    locastyle.collapse.init($(document));
  });

  describe("When click in .ls-collapse", function(){
    it("should add .active in it", function(){
      $(".collapse").trigger("show.bs.collapse");
      expect($(".ls-collapse").hasClass('active')).toBeTruthy();
    });
  });

});