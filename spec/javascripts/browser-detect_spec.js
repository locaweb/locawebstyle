describe("Browser Detect: ", function() {
  describe("When locawebstyle is initialized", function() {
    it("should add class with browser name on <html>", function() {
      var browserName = locastyle.browserDetect.browserName();
      locastyle.browserDetect.init();
      expect($('html').hasClass('ls-browser-'+browserName)).toEqual(true);
    });
  });
});
