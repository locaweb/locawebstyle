describe("Track Events: ", function() {
  beforeEach(function() {
    loadFixtures('track-events_fixture.html');
    $("body").attr("data-ls-te-category", "locastyle#track-events-test");
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
      it("should call ga with expected options as arguments", function () {
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

    describe('Unbind: When trackEvents is initialized multiple times', function () {
      it('the ga should not be called multiple times', function () {
        spyOn(window, "ga");
        locastyle.trackEvents.init();
        locastyle.trackEvents.init();
        $("#open_links #home_menu_sample").trigger("click.ls");
        expect(window.ga.calls.count()).toEqual(1);
      });
    });

    describe("Optional action and label: When click on link on #link_with_options", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "my_custom_action",
          label: "my_custom_label"
        }
        spyOn(window, "ga");
        $("#open_links #link_with_options").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe('Without data-ls-te-category on body: When click on #link_with_options', function () {
      it('should call ga with expected options as arguments', function () {
        $("body").removeAttr("data-ls-te-category");
        locastyle.trackEvents.init();
        var expectedOptions = {
          category: window.location.pathname,
          action: "my_custom_action",
          label: "my_custom_label"
        }
        spyOn(window, "ga");
        $("#open_links #link_with_options").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("On page links", function () {
      describe("When click on #on_page_link_to_nowhere which has the # as href attribute", function () {
        it("should call ga with expected iptions as arguments", function () {
          var expectedOptions = {
            category: "locastyle#track-events-test",
            action: "on_page_link_#",
            label: "On page link sample"
          }
          spyOn(window, "ga");
          $("#on_page_links #on_page_link_to_nowhere").trigger("click");
          expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
        });
      });

      describe("When click on #on_page_link_with_anchor which has the #nice-target as href attribute", function () {
        it("should call ga with expected iptions as arguments", function () {
          var expectedOptions = {
            category: "locastyle#track-events-test",
            action: "on_page_link_#nice-target",
            label: "On page link sample"
          }
          spyOn(window, "ga");
          $("#on_page_links #on_page_link_with_anchor").trigger("click");
          expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
        });
      });
    });
  });

  describe("Buttons", function () {
    describe("When click on link on #common_on_page_button", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "on_page_button_#",
          label: "On page button"
        }
        spyOn(window, "ga");
        $("#on_page_buttons #common_on_page_button").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("When click on link on #on_page_button_with_cutom_args", function () {
      it("should overwrite the action and label, and call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "my_custom_action",
          label: "my_custom_label"
        }
        spyOn(window, "ga");
        $("#on_page_buttons #on_page_button_with_cutom_args").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

    describe("When click on link on #common_on_page_button", function () {
      it("should call ga with expected options as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "on_page_button_#",
          label: "On page button"
        }
        spyOn(window, "ga");
        $("#on_page_buttons #common_on_page_button").trigger("click.ls");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Forms", function () {
    describe("When submit the #my_sample_form", function () {
      it("should call ga with expected options as arguments", function () {
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

    describe('Unbind: When trackEvents is initialized multiple times', function () {
      it('should not call ga multiple times when sending a form', function () {
        spyOn(window, "ga");
        locastyle.trackEvents.init();
        locastyle.trackEvents.init();
        $("#my_sample_form_to_tracked_once").trigger("submit");
        expect(window.ga.calls.count()).toEqual(1);
      });
    });
  });

  describe("Selects", function () {
    describe("When change teh select #select_sample", function () {
      it("should call ga with expected options as arguments", function () {
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

    describe('Unbind: When trackEvents is initialized multiple times', function () {
      it('should not call ga multiple times when changing a select', function () {
        spyOn(window, "ga");
        locastyle.trackEvents.init();
        locastyle.trackEvents.init();
        $("#select_sample_tobe_tracked_once").val("last_week");
        $("#select_sample_tobe_tracked_once").trigger("change");
        expect(window.ga.calls.count()).toEqual(1);
      });
    });
  });

  describe("Tabs", function () {
    describe("When click on #sample_tab_trigger which is a trigger to navigate on tabs", function () {
      it("should call ga with expectedOptions as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "tab_navigation",
          label: "Sample tab 2"
        }
        spyOn(window, "ga");
        $("#tabs_sample #sample_tab_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Dropdown", function () {
    describe("When click on #dropdown_trigger which is a trigger to toggle a dropdown", function () {
      it("should call ga with expectedOptions as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "dropdown_toggle",
          label: "Open dropdown sample"
        }
        spyOn(window, "ga");
        $("#dropdown_sample_box #dropdown_trigger").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });
  });

  describe("Modal", function () {
    describe("When click on #closed_modal_sample_trigger which is a trigger to open modal", function () {
      it("should call ga with expedtedOptions as arguments", function () {
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

    describe("When click on #closed_modal_sample_trigger2 which is a trigger to open modal", function () {
      it("should call ga with expedtedOptions as arguments", function () {
        var expectedOptions = {
          category: "locastyle#track-events-test",
          action: "open_modal_#closed_modal_sample2",
          label: "Open modal by link"
        }
        spyOn(window, "ga");
        $("#closed_modal_test #closed_modal_sample_trigger2").trigger("click");
        expect(window.ga).toHaveBeenCalledWith('send', 'event', expectedOptions.category, expectedOptions.action, expectedOptions.label);
      });
    });

  });

});
