describe("Select2: ", function(){
  beforeEach(function(){
    loadFixtures('select2_fixture.html');
  });

  describe("Custom select", function(){
    it("should init select2 on selects with .ls-select", function(){
      locastyle.init($(document));
      expect($("#selectToTest select").hasClass("select2-offscreen")).toBeTruthy();
    });
  });

});