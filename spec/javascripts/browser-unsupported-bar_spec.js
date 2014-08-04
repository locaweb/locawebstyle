describe("Alert unsupported browser: ", function(){
  beforeEach(function(){
    loadFixtures('browser-unsupported-bar_fixture.html');
  });

  describe("When userAgent is MSIE", function(){
    it("should add .ls-browser-unsupported class on <html>", function(){
      navigator.__defineGetter__('userAgent', function () {
        return 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0)';
      });
      locastyle.browserUnsupportedBar.init();
      expect($('html').hasClass('ls-browser-unsupported')).toEqual(true);
      $('.ls-alert-blocker').remove();
    })
  });

});
