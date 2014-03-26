describe("Popover: ", function(){
  beforeEach(function(){
    loadFixtures('popover_fixture.html');
    locastyle.init($(document));
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });


  describe("When click on element with data-toggle[popover]", function(){
    it("Should create a popover", function(){
      $('[data-toggle="popover"]').trigger("click");
      jasmine.clock().tick(1000);
      expect($(".ls-popover")).toBeVisible();
    });
  });

});
