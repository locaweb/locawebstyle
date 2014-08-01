var locastyle = (function() {
  'use strict';

  function init() {
    locastyle.breakpoints.init();
    loadModules();
    locastyle.general.init();
    locastyle.sidebars.init();
    locastyle.btnGroup.init();
    locastyle.datepicker.init();
    locastyle.form.togglePasswordField();
  }

  function loadModules() {
    var modules = getModules();
    for (var i in modules) {
      locastyle[modules[i]].init();
      // I know it is a console.log, let it to be here for a while
      console.log("Locastyle: module [" + modules[i] + "] successfully initialized.");
    }
  }

  function getModules() {
    var modules = [];
    $("[data-ls-module]").each(function () {
      modules.push($(this).data("ls-module"));
    });
    return jQuery.unique(modules);
  }

  return {
    init: init
  };

}());

var ls = locastyle;

$(window).load(function() {
  locastyle.init();
});