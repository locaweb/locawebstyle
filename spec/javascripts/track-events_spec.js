describe("Track Events: ", function() {
  beforeEach(function() {
    loadFixtures('track-events_fixture.html');
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

});
