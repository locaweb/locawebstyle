window.themeSelector = window.themeSelector || {};

window.themeSelector.cookieManager = {
  init: function () {
    themeSelector.cookieManager.checkCookie();
  },

  checkCookie: function () {
    var cookie = themeSelector.cookieManager.readCookie();
    if (cookie) {
      var value = cookie.split("=")[1]
      return value;
    }
  },

  createCookie: function (name, value, days) {
    if (days) {
      var today = new Date();
      var date = new Date(today.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
  },

  readCookie: function () {
    var desiredCookieRegExp = new RegExp("_locastyle_sample_theme=[^ ]*");
    var cookies = document.cookie.split(';');
    for (var i=0; i<cookies.length; i++) {
      var cookie = cookies[i].match(desiredCookieRegExp);
      if (cookie) {
        return cookie[0];
      }
    }
    return -1;
  }
}

$(document).ready(function () {
  themeSelector.cookieManager.init();
});
