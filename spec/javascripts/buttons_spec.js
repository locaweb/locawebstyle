describe("Buttons group: ", function(){
  beforeEach(function(){
    loadFixtures('buttons_fixture.html');
    locastyle.btnGroup.init();
  });

  describe("when html has class .ls-window-sm or .ls-window-xs", function(){
    it("all buttons into div with class .ls-regroup transform self in dropdown", function(){
      locastyle.breakpointClass = "ls-window-xs";
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
    it("should count and comparable existing links ", function(){
      $('.ls-regroup').each(function(){
        var $this = $(this);
        var linkLength = $this.find('a, button').length -1;
        locastyle.breakpointClass = "ls-window-xs";
        locastyle.btnGroup.init();
        expect(($this).find('.ls-dropdown-nav').find('a, button')).toHaveLength(linkLength);
      });
    });

    it("should check and compare the texts of existing links and buttons", function(){
      var text1 = $('#myButtonInDropdown').text();
      var text2 = $('#myButtonInDropdown2').text();
      locastyle.breakpointClass = "ls-window-xs";
      locastyle.btnGroup.init();
      expect($('#myGroupButtons').find('.ls-dropdown-nav').find('a:first')).toHaveText(text1);
      expect($('#myGroupButtons2').find('.ls-dropdown-nav').find('a:first')).toHaveText(text2);
    });
  });

});
