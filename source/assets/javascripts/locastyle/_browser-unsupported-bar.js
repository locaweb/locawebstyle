var locastyle = locastyle || {};

locastyle.browserUnsupportedBar = (function() {
  'use strict';

  function init() {
    browserDetect();
    closeBrowserUnsupportedAlert();
    console.log(navigator.appVersion);
  }

  function browserDetect() {
    if (navigator.appVersion.indexOf("MSIE 8.")!=-1 || navigator.appVersion.indexOf("MSIE 7.")!=-1 || navigator.appVersion.indexOf("MSIE 6.")!=-1) {
      $("html").addClass("ls-browser-unsupported");
      structureAlertMessage();
    } else if (navigator.appVersion.indexOf("Chrome/34")!=-1 || navigator.appVersion.indexOf("Chrome/33")!=-1) {
      $("html").addClass("ls-browser-unsupported");
      structureAlertMessage();
    } else if (navigator.appVersion.indexOf("Version/6")!=-1 || navigator.appVersion.indexOf("Version/4")!=-1) {
      $("html").addClass("ls-browser-unsupported");
      structureAlertMessage();
    } else if (navigator.appVersion.indexOf("OPR/21")!=-1 || navigator.appVersion.indexOf("OPR/20")!=-1) {
      $("html").addClass("ls-browser-unsupported");
      structureAlertMessage();
    } else if (navigator.userAgent.indexOf("Firefox/29")!=-1 || navigator.userAgent.indexOf("Firefox/29")!=-1) {
      $("html").addClass("ls-browser-unsupported");
      structureAlertMessage();
    }
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
