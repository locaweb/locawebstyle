var locastyle = locastyle || {};
locastyle.btnGroup = (function() {
  'use strict';

  function init() {
    checkBreakpoint();
    bindBreakpointUpdateOnChecker();
  }

  function unbind () {
    $(document).off("breakpoint-updated");
  }

  // adiciona o bind de breakpoint-updated e chama o checker quando o evento ocorre
  function bindBreakpointUpdateOnChecker() {
    unbind();

    $(document).on("breakpoint-updated", function () {
      checkBreakpoint();
    });
  }

  // verifica se o breakpoint é para mobile, se for faz a ação para agrupar
  function checkBreakpoint() {
    if(locastyle.breakpointClass === "ls-screen-sm" || locastyle.breakpointClass === "ls-screen-xs"){
      $(".ls-regroup").each(function (index, $element) {
        group($($element).find('a, button'));
      });

      // chama os inits para os itens dentro do dropdown
      locastyle.dropdown.init();
      locastyle.modal.init();
      locastyle.general.init();
    }
  }

  // agrupa os botões em um dropdown
  function group($element){
    var list = $($element).wrap('<li class="hidden-xs hidden-sm">');
    $(".ls-regroup a[class*='ls-btn']").removeClass();
    $('.ls-regroup').html(locastyle.templates.dropdown(list));
  }

  return {
    init: init
  };

}());
