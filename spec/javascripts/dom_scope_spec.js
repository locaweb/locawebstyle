describe("Dom Scope: ", function(){

  beforeEach(function(){
    loadFixtures('dom_scope_fixture.html');
  });

  describe("When using a specific scope", function(){
    it("should call functions on received scope", function(){
      locastyle.init('#myAwesomeId');
      expect($("#myAwesomeId .ls-select").hasClass('select2-offscreen')).toBeTruthy();
    });

    it("should NOT call function on NOT received scope", function(){
      locastyle.init("#myAwesomeId");
      expect($("#myNotAwesomeId .ls-select").hasClass('select2-offscreen')).toBeFalsy();
    });
  });

});