var locastyle = locastyle || {};

locastyle.browserUnsupportedBar = (function() {
  'use strict';

  function init() {
    browserDetect();
    hideBrowserUnsupportedAlert();
  }

  function browserDetect() {
    var version            = locastyle.browserDetect.browserVersion();
    var name               = locastyle.browserDetect.browserName();
    var minBrowserVersions = {
      'chrome' : 34,
      'firefox': 29,
      'version':  5, // Safari
      'msie'   :  8 // Internet Explorer
      // 'rv'  : 11  // Internet Explorer 11+
    };

    if (!$.cookie('hideBrowserUnsupportedAlert')) {
      if (version <=  minBrowserVersions[name]) {
        openUsupportedBrowserAlert();
      }
    }

  }

  function openUsupportedBrowserAlert() {
    $('html').addClass('ls-browser-unsupported');
    $('body').prepend(locastyle.templates.browserUnsupportedBar());
  }

  function hideBrowserUnsupportedAlert() {
    $('.ls-dismiss[data-ls-module=dismiss]').on('click', function() {
      $('html').removeClass('ls-browser-unsupported');
      $('html .ls-unsupported-bar').remove();
      $.cookie('hideBrowserUnsupportedAlert', true, { expires: 1 });

    });
  }

  return {
    init: init
  };

}());
