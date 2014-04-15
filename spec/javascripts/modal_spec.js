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
    describe("when unbind is called in module", function() {
      it("should unbind events handled by module", function() {
        locastyle.modal.unbind();
        $('[data-ls-module="modal"]').trigger("click");
        expect($("#myModalClosed .ls-modal")).not.toHaveClass('opened');
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
