var locastyle = locastyle || {};

locastyle.browserUnsupportedBar = (function() {
  'use strict';

  function init() {
    browserDetect();
    hideBrowserUnsupportedAlert();
  }

  function browserDetect() {
    var userAgent = navigator.userAgent.toLowerCase();

    var browserName = function() {
      var name = (userAgent.match(/(firefox|msie|chrome|version)/))[1];
      return name;
    }

    var browserVersion = function() {
      var version = (userAgent.match(/.+(?:firefox|msie|chrome|version|opr)[\/: ]([\d.]+)/) || [0, 0])[1];
      if(version === 0) {
        // IE
        version = (userAgent.match(/.+rv:([\d.]+)/) || 0)[1];
      }
      return version;
    };

    if (!$.cookie("hideBrowserUnsupportedAlert")) {
      // Expect browser should be chrome and version minor 34
      if (browserName() === 'chrome' && browserVersion() < '34'){
        openUsupportedBrowserAlert();
      };

      // Expect browser should be firefox and version minor 29
      if (browserName() === 'firefox' && browserVersion() < '29') {
        openUsupportedBrowserAlert();
      };

      // Expect browser should be safari and version minor 5
      if (browserName() === 'version' && browserVersion() < '5') {
        openUsupportedBrowserAlert();
      };

      // Expect browser should be Internet Explorer and version minor 5
      if (browserName() === 'msie' && browserVersion() < '9') {
        openUsupportedBrowserAlert();
      };

    };
  }

  function structureAlertMessage() {
    $("body").prepend("<div class='ls-alert-warning ls-alert-blocker ls-dismissable'><span class='ls-dismiss' data-ls-module='dismiss'>&times</span>A versão do seu navegador web não suporta o Locastyle. Por favor, atualize o seu navegador. :)</div>")
  }

  function closeBrowserUnsupportedAlert() {
    $(".ls-dismiss[data-ls-module=dismiss]").on("click", function() {
      $("html").removeClass("ls-browser-unsupported");
    });
  }

  return {
    init: init
  }

}());
