describe("Progress Bar:", function() {

  beforeEach(function() {
    loadFixtures('progress-bar_fixture.html');
    locastyle.progressBar.init();
  });

  describe("On load", function() {
    it("should be have a html tag span on the target element", function() {
      expect($("#first-progress-bar span").length).toEqual(1);
    });

    it("should the html span tag has attr aria-valuenow", function() {
      expect($("#first-progress-bar-2 span").attr("aria-valuenow")).toEqual("60%");
    });
  });

});
