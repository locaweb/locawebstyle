var locastyle = (function() {
  'use strict';

  // Used to run scripts when the HTML is ready
  function fastInit() {
    locastyle.sidebarToggle.init();
    locastyle.sidebars.init();
  }

  // Used to run scripts that just when all things are ready
  function init() {
    locastyle.breakpoints.init();
    loadModules();
    locastyle.general.init();
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

$(window).load(function() {
  'use strict';
  locastyle.init();
});

$(document).ready(function(){
  'use strict';
  locastyle.fastInit();
});
