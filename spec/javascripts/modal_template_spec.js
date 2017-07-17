describe("Modal Template: ", function() {

  beforeEach(function() {
    loadFixtures('modal_template_fixture.html');
    locastyle.modal.init();
  });

  afterEach(function() {
    locastyle.modal.close();
  });

  describe('When click on element with data-ls-module="modal"', function() {
    beforeEach(function() {
      $('#btnModalTemplate').trigger("click");
    });
    it('the modal template is show', function() {
      expect($(".ls-modal-template").hasClass('ls-opened')).toEqual(true);
    });
  });

});
