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

});
