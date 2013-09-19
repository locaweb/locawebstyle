var locastyle = locastyle || {};

locastyle.bootstrap = (function() {
  'use strict';

  function init(){
    //here goes what you need to be executed at loading
    startTooltip();
  }

  function startTooltip() {
   $("[data-toggle='tooltip']").tooltip();
  }

  return {
    init: init
  };

}());
