describe('Dismiss:', function() {
  beforeEach(function() {
    loadFixtures('dismiss_fixture.html');
    locastyle.dismiss.init();
  });

  describe("When click on [data-ls-module=dismiss]", function() {
    it("should dismiss the parent .ls-dismissable", function() {
      $('#dismiss-test [data-ls-module=dismiss]').trigger('click');
      expect($('#dismiss-test')).toHaveClass('ls-dismissed');
    });

    it("should dismiss the target if target is given", function() {
      $('#dismiss-test-2').trigger('click');
      expect($('#dismissable-2')).toHaveClass('ls-dismissed');
    });

    it("should trigger the event dismiss:close", function() {
      var spyEvent = spyOnEvent('.ls-dismissable', 'dismiss:close');
      $('[data-ls-module="dismiss"]').trigger('click');
      expect('dismiss:close').toHaveBeenTriggeredOn('.ls-dismissable');
    });
  });

  describe("Unbind:", function() {
    describe("when unbind is called in module", function() {
      it("should unbind events handled by module", function() {
        locastyle.dismiss.unbind();
        $('#dismiss-test-2').trigger("click");
        expect($('#dismissable-2')).not.toHaveClass('ls-dismissed');
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $('#dismiss-test-2').on("click", function () {
          window.test.method();
        });
        locastyle.dismiss.unbind();
        $('#dismiss-test-2').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });

});
