describe("Track Events: ", function() {
  beforeEach(function() {
    loadFixtures('track-events_fixture.html');
    $("body").data("ls-te-category", "locastyle#track-events-test");
    locastyle.trackEvents.init();
  });

  describe("Initialization", function () {
    describe("Check ga presence before init finding functions", function () {
      it("should set gaPresent to TRUE when window.ga is exists", function () {
        expect(locastyle.trackEvents.gaPresent).toEqual(true);
      });

      it("should set gaPresent to FALSE when window.ga does not exists", function () {
        window.ga = null;
        locastyle.trackEvents.init($(document));
        expect(locastyle.trackEvents.gaPresent).toEqual(false);
      });
    });
  });

  describe("Common links", function () {
    describe("When click on link on #home_menu_sample", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'open_link_#/home', 'Open link sample') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_link_#/home",
          label: "Open link sample"
        }
        spyOn(window, "ga");
        $("#open_links #home_menu_sample").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

});
