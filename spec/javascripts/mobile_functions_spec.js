describe("Mobile Functions", function() {
  beforeEach(function() {
    loadFixtures('mobile_functions_fixture.html');
    locastyle.mobile.init();
  });

  describe("checkSidebarExist() - Check if exist sidebar and nav-content. If exist we need to remove class HIDDEN of .control-sidebar and .control-menu", function () {

    it("If .sidebar exist .control-sidebar not to have .hidden", function () {
      expect($('.control-sidebar')).not.toHaveClass("hidden");
    });

    it("If .nav-content exist .control-menu not to have .hidden", function () {
      expect($('.control-menu')).not.toHaveClass("hidden");
    });

  });

  describe("mobileLeftBar() - When click on .control-menu we toggle in <html> the class .left-bar and remove the class .right-bar", function () {

    beforeEach(function() {
      $('.control-menu').trigger('click');
    });

    it("Check if we toggle class .left-bar of HTML element", function () {
      expect($('html')).toHaveClass("left-bar");
    });

    it("Check if we remove class .right-bar of HTML element", function () {
      expect($('html')).not.toHaveClass("right-bar");
    });
  });

  describe("mobileRightBar() - When click on .control-sidebar we toggle in <html> element the class .right-bar and remove the class .left-bar", function () {

    beforeEach(function() {
      $('.control-sidebar').trigger('click');
    });

    it("Verify if we toggle class .right-bar of HTML element", function () {
      expect($('html')).toHaveClass("right-bar");
    });

    it("Verify if we remove class .left-bar of HTML element", function () {
      expect($('html')).not.toHaveClass("left-bar");
    });
  });

  describe("mobileBarOverlay() - Insert a overlay to use when the sidebars in mobile are active", function () {

    it("Verify if the function append the overlay in body", function () {
      expect($('body .overlay-bar').length).toEqual(1);
    });

    it("Check if we remove .right-bar and .left-bar when click in .overlay-bar", function() {
      $('html').addClass('left-bar right-bar')
      $('.overlay-bar').trigger('click');
      expect($('html')).not.toHaveClass("left-bar");
      expect($('html')).not.toHaveClass("right-bar");
    });

  });
});
