describe("Alert unsupported browser: ", function() {
  beforeEach(function() {
    loadFixtures('browser-unsupported-bar_fixture.html');
  });

  describe("When userAgent is MSIE", function() {
    it("should add .ls-browser-unsupported class on <html>", function() {
      $.cookie = function (arg) {
        return false;
      };

      var __originalLowerCase = String.prototype.toLowerCase;
      String.prototype.toLowerCase = function() {
        return "mozilla/4.0 (compatible; msie 8.0; windows nt 6.0; trident/4.0)";
      }

      locastyle.browserUnsupportedBar.init();
      expect($('html').hasClass('ls-browser-unsupported')).toEqual(true);

      String.prototype.toLowerCase = __originalLowerCase;
      $(".ls-alert-blocker").remove();
    })
  });

  describe("When click to close", function() {
    it("should remove .ls-browser-unsupported class on <html>", function() {
      $('body').prepend('<div class="ls-alert-warning ls-alert-blocker ls-dismissable"><span class="ls-dismiss" data-ls-module="dismiss">&times</span>Atualize seu navegador para visualizar corretamente este painel! Baixe a versão mais recente: <a href="//www.mozilla.org/en-US/firefox" target="_blank">Firefox</a>, <a href="//www.google.com/intl/en-BR/chrome/browser/" target="_blank">Chrome</a>, <a href="//windows.microsoft.com/en-us/internet-explorer/download-ie" target="_blank">Internet Explorer</a> ou <a href="//www.apple.com/safari/" target="_blank">Safari</a></div>');

      locastyle.browserUnsupportedBar.init();
      $('.ls-alert-blocker .ls-dismiss[data-ls-module=dismiss]').trigger('click');

      expect($('html').hasClass('ls-browser-unsupported')).toEqual(false);
      $(".ls-alert-blocker").remove();
    })
  })

});
