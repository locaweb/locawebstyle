describe("Select2", function(){
  beforeEach(function(){
    loadFixtures('select2_fixture.html');
  });

  describe("Custom select", function(){
    it("should init select2 on selects with .select2", function(){
      locastyle.init($(document));
      expect($("#selectToTest select").hasClass("select2-offscreen")).toBeTruthy();
    });
  });

});