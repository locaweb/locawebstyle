describe("Popover: ", function(){
  beforeEach(function(){
    loadFixtures('popover_fixture.html');
    locastyle.popover.init();
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    locastyle.popover.destroyPopover();
  });


  describe("Popover cre ation", function(){

    it("Should create a popover on click event", function(){
      $('[data-module="popover"]').trigger("click");
      jasmine.clock().tick(1000);
      expect($(".ls-popover")).toBeVisible();
    });

    it("Should create a popover on hover event", function(){
      $('[data-module="popover"]').trigger("mouseenter");
      jasmine.clock().tick(1000);
      expect($(".ls-popover")).toBeVisible();
    });

  });

  describe("After popover created", function(){

    it("Should remove popover on click event", function(){
      $('[data-module="popover"]').trigger("click");
      expect($(".ls-popover")).toBeTruthy();
    });

    it("Should remove popover on mouseleave of element", function(){
      $('[data-module="popover"]').trigger("mouseleave");
      jasmine.clock().tick(1000);
      expect($(".ls-popover")).toBeTruthy();
    });

  });

});
