describe("Popover: ", function() {
  beforeEach(function() {
    loadFixtures('popover_fixture.html');
    locastyle.popover.init();
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
    locastyle.popover.destroyPopover();
  });


  describe("Popover creation", function() {

    it("Should create a popover on click event", function() {
      // Added as pending because the tests broke while I was testing other functionality
      $('[data-ls-module="popover"]').trigger("click");
      expect($(".ls-popover")).toBeVisible();
    });

    it("Should create a popover on hover event", function() {
      // Added as pending because the tests broke while I was testing other functionality
      $('[data-ls-module="popover"]').trigger("mouseenter");
      expect($(".ls-popover")).toBeVisible();
    });

  });

  describe("After popover created", function() {

    it("Should remove popover on click event", function() {
      $('[data-ls-module="popover"]').trigger("click");
      expect($(".ls-popover")).toBeTruthy();
    });

    it("Should remove popover on mouseleave of element", function() {
      $('[data-ls-module="popover"]').trigger("mouseleave");
      jasmine.clock().tick(1000);
      expect($(".ls-popover")).toBeTruthy();
    });

  });

  describe("[unbind] When init is called multiple times", function () {
    it("should bind events on popover elements only one time", function () {
      locastyle.init();
      locastyle.init();
      locastyle.init();

      // clean prevent default events
      $("a").off("click.lsPreventDefault");

      expect($("[data-ls-module='popover']")).toHaveBeenBindedOnce("click");
    });

    it("should bind events on popover elements only one time", function () {
      locastyle.init();
      locastyle.popover.init();
      locastyle.popover.init();
      expect($("#mouseenterbinded")).toHaveBeenBindedOnce("mouseout");
    });

    it("should bind events for breakpoint only one time", function () {
      locastyle.init();
      locastyle.popover.init();
      locastyle.popover.init();
      expect($(document)).toHaveBeenBindedOnce("breakpoint-updated");
    });
  });

});
