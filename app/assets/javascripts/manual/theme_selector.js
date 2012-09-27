window.themeSelector = window.themeSelector || {};

window.themeSelector = {
  init: function () {
    themeSelector.loadTheme();
    themeSelector.themeChangeBind();
  },

  loadTheme: function (selected_by_user) {
    var theme = themeSelector.setTheme(selected_by_user)
    console.log("cuurent theme is: " + theme);
    regexp = new RegExp("color[A-Z][^ ]*");
    oldThemeClass = $("html").attr("class").match(regexp);
    $("html").removeClass(oldThemeClass[0]);
    $("html").addClass(theme);
  },

  setTheme: function (selected_by_user) {
    var theme;
    if (selected_by_user) {
      theme = selected_by_user;
      themeSelector.cookieManager.createCookie("_locastyle_sample_theme", selected_by_user, 1);
    } else {
      theme = themeSelector.cookieManager.checkCookie();
    }
    return theme;
  },

  themeChangeBind: function () {
    $("#theme_selector").on("change", function () {
      themeSelector.loadTheme($(this).val());
    });
  }
}

$(document).ready(function () {
  themeSelector.init();
});
