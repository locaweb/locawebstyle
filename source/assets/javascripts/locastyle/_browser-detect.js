var locastyle = locastyle || {};

locastyle.browserDetect = (function() {
  'use strict';

  var userAgent = navigator.userAgent.toLowerCase();
  function init() {
    browserClass();
  }

  var name;
  function browserName() {
    if (userAgent.match(/(firefox)/)) {
      name = userAgent.match(/(firefox)/)[1];
    } else {
      name = (userAgent.match(/(msie|phantomjs|chrome|version|rv)/))[1];
    }
    return name;
  }

  function browserVersion() {
    return parseInt((userAgent.match(/.+(?:firefox|phantomjs|msie|chrome|version|rv)[\/: ]([\d.]+)/) || [0, 0])[1].split('.')[0], 10);
  }

  function browserClass() {
    $("html").addClass('ls-browser-'+browserName());
  }

  return {
    init: init,
    browserName: browserName,
    browserVersion: browserVersion
  };

}());
