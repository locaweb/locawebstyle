describe("Mobile Functions (mobile_functions.js)", function() {
  beforeEach(function() {
    loadFixtures('mobile_functions_fixture.html');
    locastyle.mobile.init();
  });

  describe("Has sidebar?", function () {
    it("verify if .sidebar exist", function () {
      expect(locastyle.passwo rdStregth.checkIt("s0mePas$")).toEqual("strong");
    });

  });

});
