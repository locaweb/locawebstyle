describe("Dropdown: ", function() {
  beforeEach(function() {
    loadFixtures('dropdown_fixture.html');
    locastyle.dropdown.init();
  });

  describe("Dropdown toggle", function() {
    describe('when click on a dropdown trigger', function() {
      it("should prevent default event on dropdown module", function() {
        var spyEvent = spyOnEvent('#dropdown-test > a:first-child', 'click');
        $("#dropdown-test > a:first-child").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

      describe('And dropdown is closed', function() {
        it("should activate a disabled related dropdown module", function() {
          $("#dropdown-test > a:first-child").trigger("click");
          expect($("#dropdown-test").hasClass("ls-active")).toEqual(true);
        });

        it("should trigger the event dropdown:opened", function() {
          var spyEvent = spyOnEvent("#dropdown-test-7", 'dropdown:opened');
          $("#dropdown-test-7 > a").trigger("click");
          expect('dropdown:opened').toHaveBeenTriggeredOn("#dropdown-test-7");
        });
      });

      describe("And dropdown is opened", function() {
        it("should disable an active related dropdown module", function() {
          $("#dropdown-test-2 > a:first-child").trigger("click");
          expect($("#dropdown-test-2").hasClass("ls-active")).toEqual(false);
        });

        it("should close any opened dropdown", function() {
          $("#dropdown-test-4 #dropdown-default > a:first-child").trigger("click");
          expect($("#dropdown-test-4 #dropdown-active").hasClass("ls-active")).toEqual(false);
        });

        it("should trigger the event dropdown:opened", function() {
          var spyEvent = spyOnEvent(document, 'dropdown:closed');
          $("#dropdown-test-8 > a").trigger("click");
          expect('dropdown:closed').toHaveBeenTriggeredOn(document)
        });
      });
    });

    describe("When click outside dropdown click", function() {
      it("should close opened dropdown", function() {
        $("#fake-body").trigger("click");
        expect($("#dropdown-test-3").hasClass("ls-active")).toEqual(false);
      });
    });

    describe("When dropdown is disabled", function() {
      it("the parent should not have .ls-active", function() {
        $("#dropdown-test-5 .ls-btn-primary").trigger("click");
        expect($("#dropdown-test-5").hasClass("ls-active")).toEqual(false);
      });
    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module init", function() {
      it("should prevent toggleDropdown from being called twice or more times", function() {
        var spy = spyOn(locastyle.dropdown, "toggleDropdown");
        locastyle.dropdown.init();
        locastyle.dropdown.init();
        $("#dropdown-test > a:first-child").trigger("click");
        expect(locastyle.dropdown.toggleDropdown.calls.count()).toEqual(1);
      });

      it("should prevent closeDropdown from being called twice or more times", function() {
        var spy = spyOn(locastyle.dropdown, "closeDropdown");
        locastyle.dropdown.init();
        locastyle.dropdown.init();
        $("#fake-body").trigger("click");
        expect(locastyle.dropdown.closeDropdown.calls.count()).toEqual(1);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $("#dropdown-test > a:first-child").on("click", function () {
          window.test.method();
        });
        locastyle.dropdown.unbind();
        $("#dropdown-test > a:first-child").trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

  describe("Dropdown with waia-ria", function() {
    it("Button should has attr role with value combobox", function() {
      expect($('#dropdown-test-6 > .ls-btn-primary').attr('role')).toEqual('combobox');
    });

    it("Links should has attr role with value option", function() {
      expect($('#dropdown-test-6 > .ls-dropdown-nav').find('a').attr('role')).toEqual('option');
    });

    it("Button should has attr aria-expanded with value false", function() {
      expect($('#dropdown-test-6 > .ls-btn-primary').attr('aria-expanded')).toEqual('false');
    });

    it("Nav links should has attr aria-hidden with value true", function() {
      expect($('.ls-dropdown-nav').attr('aria-hidden')).toEqual('true');
    });

    it("When click the button should has attr aria-expanded with value true", function() {
      $('#dropdown-test-6.ls-dropdown').find('.ls-btn-primary').trigger('click');
      expect($('#dropdown-test-6 > .ls-btn-primary').attr('aria-expanded')).toEqual('true');
    });

    it("When click the nav links should has attr aria-hidden with value false", function() {
      $('#dropdown-test-6').find('.ls-btn-primary').trigger('click');
      expect($('#dropdown-test-6 > .ls-dropdown-nav').attr('aria-hidden')).toEqual('false');
    });

    it("When click in dropdown should has attr aria-hidden with value true in others dropdowns", function() {
      $('#dropdown-test-6').find('.ls-btn-primary').trigger('click');
      expect($('#dropdown-test-5 > .ls-dropdown-nav').attr('aria-hidden')).toEqual('true');
    });

    it("When click in dropdown should has attr aria-expanded with value false in others dropdowns", function() {
      $('#dropdown-test-6').find('.ls-btn-primary').trigger('click');
      expect($('#dropdown-test-5 > .ls-btn-primary').attr('aria-expanded')).toEqual('false');
    });
  });

});
