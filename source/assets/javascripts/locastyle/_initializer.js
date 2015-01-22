var locastyle = (function() {
  'use strict';

  function fastInit() {
    locastyle.sidebarToggle.init();
  }

  function init() {
    locastyle.breakpoints.init();
    loadModules();
    locastyle.general.init();
    locastyle.sidebars.init();
    locastyle.btnGroup.init();
    locastyle.alert.init();
    locastyle.datepicker.init();
    locastyle.form.togglePasswordField();
    checkClassForTrack();
    locastyle.browserDetect.init();
  }

  function loadModules() {
    var modules = getModules();
    for (var i in modules) {
      locastyle[modules[i]].init();
      console.info("Locastyle: module [" + modules[i] + "] successfully initialized.");
    }
  }

  function checkClassForTrack() {
    if($("html").hasClass("ls-trackevent-on")){
      locastyle.trackEvents.init();
    }
  }

  function getModules() {
    var modules = [];
    $("[data-ls-module]").each(function () {
      var module = $(this).data("ls-module");
      if ( modules.indexOf(module) === -1 ) {
        modules.push(module);
      }
    });
    return modules;
  }

  return {
    init: init,
    fastInit: fastInit
  };

}());

var ls = locastyle;

$(window).load(function() {
  locastyle.init();
});

$(document).ready(function(){
  locastyle.fastInit();
});
