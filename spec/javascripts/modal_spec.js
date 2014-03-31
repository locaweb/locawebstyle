describe("Modal: ", function(){

  beforeEach(function(){
    loadFixtures('modal_fixture.html');
    locastyle.modal.init();
  });

  describe('When click on element with data-module="modal"', function(){
    it('should add class opened on .ls-modal', function(){
      $('[data-module="modal"]').trigger("click");
      expect($("body .ls-modal")).toHaveClass('opened');
    })
  })

  describe('When click on data-dismiss on modal', function(){
    it('should remove class opened on .ls-modal', function(){
      $('[data-dismiss="modal"]').trigger("click");
      expect($("#myModalOpened .ls-modal").hasClass('opened')).toBeFalsy();
    })
  })

});
