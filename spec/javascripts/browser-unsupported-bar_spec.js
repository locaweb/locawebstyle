describe("Alert unsupported browser: ", function(){
  beforeEach(function(){
    loadFixtures('browser-unsupported-bar_fixture.html');
  });

  describe("When userAgent is MSIE", function(){
    it("should add .ls-browser-unsupported class on <html>", function(){
      $.cookie = function (arg) {
        return false;
      };

      var __originalLowerCase = String.prototype.toLowerCase;
      String.prototype.toLowerCase = function () {
        return "mozilla/4.0 (compatible; msie 8.0; windows nt 6.0; trident/4.0)";
      }

      locastyle.browserUnsupportedBar.init();
      expect($('html').hasClass('ls-browser-unsupported')).toEqual(true);

      String.prototype.toLowerCase = __originalLowerCase;
      $(".ls-alert-blocker").remove();
    })
  });

});
