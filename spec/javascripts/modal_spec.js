describe("Modal: ", function() {

  beforeEach(function() {
    loadFixtures('modal_fixture.html');
    locastyle.modal.init();
  });

  describe('When click on element with data-ls-module="modal"', function() {
    it('should add class opened on .ls-modal', function() {
      $('[data-ls-module="modal"]').trigger("click");
      expect($("body .ls-modal")).toHaveClass('opened');
    })
  })

  describe('When click on data-dismiss on modal', function() {
    it('should remove class opened on .ls-modal', function() {
      locastyle.modal.close();
      $('[data-dismiss="modal"]').trigger("click");
      expect($("#myModalOpened .ls-modal").hasClass('opened')).toBeFalsy();
    })
  })

  describe("Unbind:", function() {
    describe("when unbind is called in module init", function() {
      it("should prevent events from being called twice or more times", function() {
        var spy = spyOn(locastyle.modal, "open");
        locastyle.modal.init();
        locastyle.modal.init();
        $('[data-ls-module="modal"]').trigger("click");
        expect(locastyle.modal.open.calls.count()).toEqual(1);
      });

      it("should NOT unbind common events handled by other code", function() {
        window.test = {
          method: function(){
            //my fake function
          }
        };
        var spy = spyOn(window.test, "method");
        $('[data-ls-module="modal"]').on("click", function () {
          window.test.method();
        })
        locastyle.modal.unbind();
        $('[data-ls-module="modal"]').trigger("click");
        expect(window.test.method).toHaveBeenCalled();
      });
    });
  });
});
