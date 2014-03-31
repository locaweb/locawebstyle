describe('Dismiss:', function(){
  beforeEach(function(){
    loadFixtures('dismiss_fixture.html');
    locastyle.dismiss.init();
  });

  describe("When click on .ls-dismiss", function() {
    it("should dismiss the parent data-module=dismiss", function() {
      $('#dismiss-test .ls-dismiss').trigger('click');
      expect($('#dismiss-test')).toHaveClass('dismissed');
    });
  });

});
