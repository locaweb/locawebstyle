describe("Buttons group: ", function() {
  beforeEach(function() {
    loadFixtures('buttons_fixture.html');
    locastyle.btnGroup.init();
  });

  describe("when html has class .ls-screen-sm or .ls-screen-xs", function(){
    it("all buttons into div with class .ls-regroup transform self in dropdown", function(){
      $("html").addClass("ls-screen-xs")
      locastyle.btnGroup.init()
      expect($("#myGroupButtons").hasClass("ls-regroup")).toBe(true);
    })
  })

});
