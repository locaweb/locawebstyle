var locastyle = (function() {
  'use strict';

  function init() {
    for (var module in locastyle) {
      if (locastyle.hasOwnProperty(module)) {
        module != 'init' ? locastyle[module].init() : null;
      }
    }
  }

  return {
    init: init
  };

}());

$(window).load(function() {
  locastyle.init();
});
