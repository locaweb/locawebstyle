describe("Buttons group: ", function(){
  beforeEach(function(){
    loadFixtures('buttons_fixture.html');
    locastyle.btnGroup.init();
  });

  describe("when html has class .ls-screen-sm or .ls-screen-xs", function(){
    it("all buttons into div with class .ls-regroup transform self in dropdown", function(){
      locastyle.breakpointClass = "ls-screen-xs";
      locastyle.btnGroup.init();
      expect($("#myButtonInDropdown").closest(".ls-dropdown").hasClass("ls-dropdown")).toBe(true);
    });
  });

  describe("Unbind", function() {
    it("should bind breakpoint-updated only one time on the $(document)", function() {
      locastyle.btnGroup.init();
      locastyle.btnGroup.init();
      expect($(document)).toHaveBeenBindedOnce('breakpoint-updated');
    });

  });

  describe("Regroup mobile", function(){
    it("Dropdown should have the same amount of links while on desktop", function(){
      $('.ls-regroup').each(function(){
        var $this = $(this)
        var linkLength = $this.find('a, button').length -1
        locastyle.breakpointClass = "ls-screen-xs";
        locastyle.btnGroup.init();
        expect(($this).find('.ls-dropdown-nav').find('a,button')).toHaveLength(linkLength);
      });
    });
  });

});
