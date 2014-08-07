describe("Topbar Curtain:", function() {

  beforeEach(function() {
    loadFixtures('topbar-curtain_fixture.html');
  });

  describe("On load", function() {
    it("should position the target element", function() {
      $("#link-clicked").css({position: "absolute", left: 600});
      $("#item-1").css({position: "absolute", left: 800, width: 280});
      var expectedPosition = ($("#link-clicked").position().left) + ($("#item-1").width()/2) + (22/2);
      locastyle.topbarCurtain.init();
      expect($("#item-1").position().left).toEqual(expectedPosition);
    });
  });

  describe("When click on top-curtain trigger module", function() {
    it("should add 'ls-active' css class to target", function() {
      locastyle.topbarCurtain.init();
      $("#link-clicked").click();
      expect($("#item-1").hasClass('ls-active')).toEqual(true);
    });

    it("should add 'ls-active' css class on trigger", function() {
      locastyle.topbarCurtain.init();
      $("#link-clicked").click();
      expect($("#link-clicked").hasClass('ls-active')).toEqual(true);
    });

    it("should remove 'ls-active' css class from any curtain", function() {
      locastyle.topbarCurtain.init();
      $("#link-clicked").click();
      expect($("#awesome-curtain").hasClass('ls-active')).toEqual(false);
    });

    it("should remove 'ls-active' css class from any trigger link", function() {
      locastyle.topbarCurtain.init();
      $("#link-clicked-2").click();
      expect($("#link-clicked-2").hasClass('ls-active')).toEqual(false);
    });

    it("should NOT add 'ls-active' css class on target if it already have it", function() {
      locastyle.topbarCurtain.init();
      $("#link-clicked-2").click();
      expect($("#item-2").hasClass('ls-active')).toEqual(false);
    });
  });

  describe("When click outside curtain", function() {
    it("should close opened curtains", function() {
      locastyle.topbarCurtain.init();
      $("#outside_element").click();
      expect($("#awesome-curtain").hasClass('ls-active')).toEqual(false);
    });

    it("should remove 'ls-active' css class of the links already clicked", function() {
      locastyle.topbarCurtain.init();
      $("#outside_element").click();
      expect($("#item-2").hasClass('ls-active')).toEqual(false);
    });
  });

  describe("When click on .ls-notification-list", function() {
    it("should not close the curtain", function() {
      locastyle.topbarCurtain.init();
      $(".ls-notification-list").trigger("click");
      expect($("#awesome-curtain").hasClass('ls-active')).toEqual(true);
    });
  });
});
