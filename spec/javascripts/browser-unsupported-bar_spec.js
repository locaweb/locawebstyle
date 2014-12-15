describe("Alert unsupported browser: ", function() {
  describe("When userAgent is MSIE", function() {
    it("should add .ls-browser-unsupported class on <html>", function() {
      spyOn(locastyle.templates, "browserUnsupportedBar").and.returnValue('<div class="ls-alert-blocker ls-dismissable"><span class="ls-dismiss" data-ls-module="dismiss">&times</span></div>');
      spyOn(locastyle.browserDetect, "browserName").and.returnValue('msie');
      spyOn(locastyle.browserDetect, "browserVersion").and.returnValue(7);
      $.cookie = function (arg) {
        return false;
      };
      locastyle.browserUnsupportedBar.init();

      expect($('html').hasClass('ls-browser-unsupported')).toEqual(true);

      $(".ls-alert-blocker").remove();
    });
  });

  describe("When click to close", function() {
    it("should remove .ls-browser-unsupported class on <html>", function() {
      spyOn(locastyle.templates, "browserUnsupportedBar").and.returnValue('<div class="ls-alert-blocker ls-dismissable"><span class="ls-dismiss" data-ls-module="dismiss">&times</span></div>');
      spyOn(locastyle.browserDetect, "browserName").and.returnValue('msie');
      spyOn(locastyle.browserDetect, "browserVersion").and.returnValue(7);
      $.cookie = function (arg) {
        return false;
      };

      $('body').prepend('<div class="ls-alert-blocker ls-dismissable"><span class="ls-dismiss" data-ls-module="dismiss">&times</span>Atualize seu navegador! Baixe a versão mais recente: <a href="//www.mozilla.org/en-US/firefox" target="_blank">Firefox</a>, <a href="//www.google.com/intl/en-BR/chrome/browser/" target="_blank">Chrome</a>, <a href="//windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer</a> ou <a href="//www.apple.com/safari/" target="_blank">Safari</a></div>');

      locastyle.browserUnsupportedBar.init();
      $('.ls-alert-blocker .ls-dismiss[data-ls-module=dismiss]').trigger('click');

      expect($('html').hasClass('ls-browser-unsupported')).toEqual(false);
      $(".ls-alert-blocker").remove();
    });
  });
});
