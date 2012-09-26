window.themeSelector = window.themeSelector || {};

window.themeSelector = {
  init: function () {
    themeSelector.loadTheme();
    themeSelector.themeChangeBind();
  },

  loadTheme: function () {
    console.log("hey");
    var theme = $("#theme_selector").val();
    regexp = new RegExp("color[A-Z][^ ]*");
    oldThemeClass = $("html").attr("class").match(regexp);
    $("html").removeClass(oldThemeClass[0]);
    $("html").addClass(theme);
  },

  themeChangeBind: function () {
    $("#theme_selector").on("change", function () {
      themeSelector.loadTheme();
    });
  }
}

$(document).ready(function () {
  themeSelector.init();
});
