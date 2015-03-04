describe("Tabs: ", function() {
  beforeEach(function() {
    loadFixtures('tabs-button_fixture.html');
    locastyle.button.init();
  });

  describe("when loading the page", function(){
    it("Should input[radio] is checked when parent LI hasClass actived", function(){
      expect($("#input-one").attr("checked")).toEqual("checked");
    });
  });

  describe("when click this button", function(){
   it("your input[radio] should is checked", function(){
      $("#tab-btn-two").trigger("click");
      expect($("#input-two").prop("checked")).toEqual(true);
    });

   it("your input[radio] should don't have attr checked", function(){
      $("#tab-btn-two").trigger("click");
      expect($("#input-one").prop("checked")).toEqual(false);
    });
  });

  describe("Tabs Button toggle", function() {
    describe('when click on a button trigger', function() {

      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-button-1").trigger("click");
        expect($("#tab2").hasClass("ls-active")).toEqual(false);
      });


      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-button-1").trigger("click");
        expect($("#tab1").hasClass("ls-active")).toEqual(true);
      });

      it("should deactivate the siblings tabs of related target tab", function() {
        $("#tab-button-2").trigger("click");
        expect($("#tab2").hasClass("ls-active")).toEqual(true);
      });

      it("should prevent default event", function() {
        var spyEvent = spyOnEvent('#tab-button-1', 'click');
        $("#tab-button-1").trigger("click");
        expect(spyEvent).toHaveBeenPrevented();
      });

      it("should activate the parent li", function() {
        var $parentLi = $("#tab-button-1").parents("li");
        $("#tab-button-1").trigger("click");
        expect($($parentLi).hasClass("ls-active")).toEqual(true);
      });

      it("should deactivate the siblings of parent li", function() {
        var $siblingOfParentLi = $("#tab-button-1").parents("li");
        $("#tab-button-2").trigger("click");
        expect($siblingOfParentLi.hasClass("ls-active")).toEqual(false);
      });

    });

  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled by module", function() {
        locastyle.button.unbind();
        $('#tab-button-2').trigger("click");
        expect($('#tab2').hasClass("ls-active")).toEqual(false);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $('#tab-button-2').on("click", function () {
          window.test.method();
        });
        locastyle.tabs.unbind();
        $('#tab-button-2').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

  describe("Tabs button with wai-aria", function() {
    it(".ls-tabs-btn-nav should has attribute role with value tablist ",function(){
      expect($('.ls-tabs-btn-nav').attr('role')).toEqual('tablist');
    });

    it("Link tabs should has attribute role with value tab ",function(){
      expect($('.ls-tabs-btn-nav .ls-btn').attr('role')).toEqual('tab');
    });

    it("Active link tabs should has attribute aria-selected is value true ",function(){
      expect($('.ls-tabs-btn-nav li.ls-active .ls-btn').attr('aria-selected')).toEqual('true');
    });

    it(".ls-tab-content has attribute role with value tabpanel ",function(){
      expect($('.ls-tabs-btn .ls-tab-content').attr('role')).toEqual('tabpanel');
    });

    it("When click tab should has attribute aria-selected with value true ",function(){
      $('.ls-tabs-btn-nav .ls-btn').trigger('click');
      expect($('.ls-tabs-btn-nav li.ls-active .ls-btn').attr('aria-selected')).toEqual('true');
    });

  });

});
