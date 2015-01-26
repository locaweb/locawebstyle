 describe("Minimize or Maximize sidebar: ", function() {

  beforeEach(function() {
    loadFixtures('sideba-toggle_fixture.html');
    locastyle.sidebarToggle.init();

    $.cookie = function(arg) {
      return false;
    };

  });

  describe("Add Arrow in Sidebar", function() {
    it("should add a span.ls-sidebar-toggle element in .ls-sidebar element", function() {
      expect($('.ls-sidebar .ls-sidebar-toggle').length).toEqual(1);
    });
  });

  describe("When Minimize Sidebar", function() {
//    beforeEach(function(){
//      $('html').removeClass('ls-sidebar-toggled');
//      $('.ls-sidebar-toggle').removeClass('ls-active');
//    });
    it("should add a .ls-sidebar-toggled in <html> element", function() {
      $('.ls-sidebar-toggle').trigger('click');
      expect($('html').hasClass('ls-sidebar-toggled')).toBe(true);
    });
    it("should add a .ls-active in .ls-sidebar-toggle element", function() {
      expect($('.ls-sidebar-toggle').hasClass('ls-active')).toEqual(true);
    });
  });

  describe("Maximize Sidebar", function() {
    beforeEach(function(){
      $('.ls-sidebar-toggle').trigger('click');
    });
    it("when the .ls-sidebar-toggle is clicked, should remove a .ls-sidebar-toggled of <html> element", function() {
      expect($('html').hasClass('ls-sidebar-toggled')).toEqual(false);
    });
    it("should remove a .ls-active of .ls-sidebar-toggle element", function() {
      expect($('.ls-sidebar-toggle').hasClass('ls-active')).toEqual(false);
    });
  });

});
