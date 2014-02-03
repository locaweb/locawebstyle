describe("Mobile Functions: ", function() {

  describe('When dom_scope is given', function () {
    beforeEach(function() {
      loadFixtures('mobile_functions_domscope_fixture.html');
      locastyle.mobile.init($("#scoped_tags"));
    });

    it('should NOT bind events on elements outside dom_scope', function () {
      expect($('#outside_scope_control.control-sidebar').hasClass('hidden')).toBeTruthy();
    });

    it('should bind events on elements inside dom_scope', function () {
      expect($('#inside_scope_control.control-sidebar').hasClass('hidden')).toBeFalsy();
    });
  });

  describe('Common', function () {
    beforeEach(function() {
      loadFixtures('mobile_functions_fixture.html');
      locastyle.mobile.init($(document));
    });

    describe("checkSidebarExist() - Check if exist sidebar and nav-content. If exist we need to remove class HIDDEN of .control-sidebar and .control-menu", function () {

      it("If .sidebar exist .control-sidebar not to have .hidden", function () {
        expect($('.control-sidebar').hasClass('hidden')).toBeFalsy();
      });

      it("If .nav-content exist .control-menu not to have .hidden", function () {
        expect($('.control-menu').hasClass('hidden')).toBeFalsy();
      });

    });

    describe("mobileLeftBar() - When click on .control-menu we toggle in <html> the class .left-bar and remove the class .right-bar", function () {

      beforeEach(function() {
        $('.control-menu').trigger('click');
      });

      it("Check if we toggle class .left-bar of HTML element", function () {
        expect($('html').hasClass("left-bar")).toBeTruthy();
      });

      it("Check if we remove class .right-bar of HTML element", function () {
        expect($('html').hasClass("right-bar")).toBeFalsy();
      });
    });

    describe("mobileRightBar() - When click on .control-sidebar we toggle in <html> element the class .right-bar and remove the class .left-bar", function () {

      beforeEach(function() {
        $('.control-sidebar').trigger('click');
      });

      it("Verify if we toggle class .right-bar of HTML element", function () {
        expect($('html').hasClass("right-bar")).toBeTruthy();
      });

      it("Verify if we remove class .left-bar of HTML element", function () {
        expect($('html').hasClass("left-bar")).toBeFalsy();
      });
    });

    describe("mobileBarOverlay() - Insert a overlay to use when the sidebars in mobile are active", function () {

      it("Verify if the function append the overlay in body", function () {
        expect($('body .overlay-bar').length > 0).toEqual(true);
      });

      it("Check if we remove .left-bar when click in .overlay-bar", function() {
        $('html').addClass('left-bar')
        $('.overlay-bar').trigger('click');
        expect($('html').hasClass("left-bar")).toBeFalsy();
      });

      it("Check if we remove .right-bar when click in .overlay-bar", function() {
        $('html').addClass('right-bar')
        $('.overlay-bar').trigger('click');
        expect($('html').hasClass("right-bar")).toBeFalsy();
      });
    });

  });

});
