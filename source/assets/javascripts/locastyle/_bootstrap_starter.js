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
    var $popovers = $("[data-toggle='popover']");
    $popovers.on('show.bs.popover', function (e) {
      var popover = $(this).data('bs.popover');
      var inheritedProperty = $(this).data('inherit');
      var inheritedValue = $(this).css(inheritedProperty);
      popover.$tip.find('.popover-title').css('color', inheritedValue );
    });
    $popovers.popover();
  }

  return {
    init: init
  };

}());
