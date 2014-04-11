var locastyle = (function() {
  'use strict';

  function init() {
    var modules = getModules();
    for (var i in modules) {
      locastyle[modules[i]].init();
    }
  }

  function getModules() {
    var modules = [];
    $("[data-ls-module]").each(function () {
      var module = $(this).data("ls-module");
      if ( !( modules.indexOf(module) > -1 ) ) {
        modules.push(module);
      }
    })
    return modules;
  }

  return {
    init: init
  };

}());

$(window).load(function() {
  locastyle.init();
});
