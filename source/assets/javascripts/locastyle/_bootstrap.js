var locastyle = locastyle || {};

locastyle.bootstrap = (function() {
  'use strict';

  function init(){
    //here goes what you need to be executed at loading
    startTooltip();
    startPopover();
  }

  function startTooltip() {
   $("[data-toggle='tooltip']").tooltip();
  }

  function startPopover() {
    $("[data-toggle='popover']").popover();
  }

  return {
    init: init
  };

}());
