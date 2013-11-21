describe("Track Events", function() {
  beforeEach(function() {
    loadFixtures('track_events_fixture.html');
    $("body").data("controller", "locastyle");
    $("body").data("action", "track-events-test");
    locastyle.trackEvents.init();
  });

  describe("Common links", function () {
    describe("When click on a link on #home_menu_sample", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'open_link_#/home', 'Open link sample') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_link_#/home",
          label: "Open link sample"
        }
        spyOn(window, "ga");
        $("#open_links #home_menu_sample").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("On page links", function () {
    describe("When click on #on_page_link_to_nowhere which has the # as href attribute", function () {
      it("it should call ga with ('send', 'event', 'locastyle#track-events-test', 'on_page_link', 'On page link sample') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "on_page_link",
          label: "On page link sample"
        }
        spyOn(window, "ga");
        $("#on_page_links #on_page_link_to_nowhere").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Modal", function () {
    describe("When click on #closed_modal_sample which is a modal trigger", function () {
      it("it should call ga with ('send', 'event', 'locastyle#track-events-test', 'open_modal_#closed_modal_sample', 'Open modal') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_modal_#closed_modal_sample",
          label: "Open modal"
        }
        spyOn(window, "ga");
        $("#closed_modal_test #closed_modal_sample_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });
});
