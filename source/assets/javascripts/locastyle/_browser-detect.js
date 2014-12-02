var locastyle = locastyle || {};

locastyle.browserDetect = (function() {
  'use strict';

  var userAgent = navigator.userAgent.toLowerCase();

  function init() {
    browserClass();
  }

  function browserName() {
    if (userAgent.match(/(firefox)/)) {
      var name = userAgent.match(/(firefox)/)[1];
    } else {
      var name = (userAgent.match(/(msie|chrome|version|rv)/))[1];
    };
    return name;
  }

  function browserVersion() {
    return parseInt((userAgent.match(/.+(?:firefox|msie|chrome|version|rv)[\/: ]([\d.]+)/) || [0, 0])[1].split('.')[0] );
  }

  function browserClass (argument) {
    $("html").addClass('ls-browser-'+browserName());
  }

  return {
    init: init,
    browserName: browserName,
    browserVersion: browserVersion
  };

}());
