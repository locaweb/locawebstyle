describe("Topbar Curtain:", function() {

  beforeEach(function() {
    loadFixtures('topbar-curtain_fixture.html');
  });

  describe("On load", function() {
    it("should position the target element", function() {
      $("#link-clicked").css({position: "absolute", left: 600, width: 22});
      $("#item-1").css({position: "absolute", left: 800, width: 280});
      var expectedPosition = ($("#link-clicked").position().left - $(window).width()) - ($("#item-1").width()/2) - ($("#link-clicked").width()/2);
      locastyle.topbarCurtain.init();
      expect($("#item-1").position().left).toEqual(expectedPosition);
    });
  });

});
