describe('Dismiss:', function(){
  beforeEach(function(){
    loadFixtures('dismiss_fixture.html');
    locastyle.dismiss.init();
  });

  describe("When click on [data-module=dismiss]", function() {
    it("should dismiss the parent .ls-dismissable", function() {
      $('#dismiss-test [data-module=dismiss]').trigger('click');
      expect($('#dismiss-test')).toHaveClass('dismissed');
    });
  });

});
