//
// Execução de funções do Bootstrap
// Se tiver alguma função do bootstrap que precisa ser iniciada logo de cara, use aqui.
var locastyle = locastyle || {};

locastyle.bootstrap = (function() {
  'use strict';

  function init(){
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
