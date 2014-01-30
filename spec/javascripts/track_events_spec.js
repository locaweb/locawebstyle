describe("Track Events: ", function() {
  beforeEach(function() {
    loadFixtures('track_events_fixture.html');
    $("body").data("controller", "locastyle");
    $("body").data("action", "track-events-test");
    locastyle.trackEvents.init($(document));
  });

  describe("Initialization", function () {
    describe("Check ga presence before init finding functions", function () {
      it("should call findTriggers if window.ga is present", function () {
        expect(locastyle.trackEvents.gaPresent).toEqual(true);
      });

      it("should not call findTriggers if window.ga is NOT present", function () {
        window.ga = null;
        locastyle.trackEvents.init($(document));
        expect(locastyle.trackEvents.gaPresent).toEqual(false);
      });
    });
  });

  describe('When dom_scope is given', function () {
    it('should NOT bind events on elements outside dom_scope', function () {
      $("a").unbind(); //clean previous binds
      spyOn(window, "ga");
      locastyle.trackEvents.init($("#scoped_links"));
      $("#scoped_links_wrapper #outside_scope_link").trigger("click");
      expect(window.ga).not.toHaveBeenCalled();
    });

    it('should bind events on elements inside dom_scope', function () {
      spyOn(window, "ga");
      locastyle.trackEvents.init($("#scoped_links"));
      $("#scoped_links_wrapper #inside_scope_link").trigger("click");
      expect(window.ga).toHaveBeenCalled();
    });
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
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'on_page_link', 'On page link sample') arguments", function () {
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
    describe("When click on #closed_modal_sample_trigger which is a trigger to open modal", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'open_modal_#closed_modal_sample', 'Open modal') arguments", function () {
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

    describe("When closing modal", function () {
      it("by [x], it should call ga with ('send', 'event', 'locastyle#track-events-test', 'close_modal_#opened_modal_test', 'x') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "close_modal_#opened_modal_test",
          label: "x"
        }
        spyOn(window, "ga");
        $("#opened_modal_test #close_modal_sample_by_x").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });

      it("by cancel button, it should call ga with ('send', 'event', 'locastyle#track-events-test', 'close_modal_#opened_modal_test', 'close_modal') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "close_modal_#opened_modal_test",
          label: "close_modal"
        }
        spyOn(window, "ga");
        $("#opened_modal_test #close_modal_sample_by_button").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Collapses", function () {
    describe("When click on #closed_collapse_sample_trigger which is a trigger to open a collapse", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'open_collapse_#closed_collapse_sample', 'Open collapse') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_collapse_#closed_collapse_sample",
          label: "Open collapse"
        }
        spyOn(window, "ga");
        $("#closed_collapse_sample_box #closed_collapse_sample_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("When click on #opened_collapse_sample_trigger which is a trigger to close a collapse", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'close_collapse_#opened_collapse_sample_trigger', 'Close collapse') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "close_collapse_#opened_collapse_sample",
          label: "Close collapse"
        }
        spyOn(window, "ga");
        $("#opened_collapse_sample_box #opened_collapse_sample_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Dropdown", function () {
    describe("When click on #dropdown_trigger which is a trigger to toggle a dropdown", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'dropdown_toggle', 'Toggle dropdown') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "dropdown_toggle",
          label: "Toggle dropdown"
        }
        spyOn(window, "ga");
        $("#dropdown_sample_box #dropdown_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Tabs", function () {
    describe("When click on #tab_trigger which is a trigger to navigate on tabs", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'tab_navigation', 'Tab 2') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "tab_navigation",
          label: "Tab 2"
        }
        spyOn(window, "ga");
        $("#tabs_sample #tab_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Forms", function () {
    describe("When submit the #my_sample_form", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'submit_form_#my_sample_form', 'Submit') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "submit_form_#my_sample_form",
          label: "Submit"
        }
        spyOn(window, "ga");
        $("#my_sample_form").trigger("submit");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Selects", function () {
    describe("When change teh select #select_sample", function () {
      it("should call ga with ('send', 'event', 'locastyle#track-events-test', 'select_change_#select_sample', 'last_week') arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "select_change_#select_sample",
          label: "last_week"
        }
        spyOn(window, "ga");
        $("#select_sample").val("last_week");
        $("#select_sample").trigger("change");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });
});
