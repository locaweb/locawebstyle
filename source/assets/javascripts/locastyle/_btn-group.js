var locastyle = locastyle || {};
locastyle.btnGroup = (function() {
  'use strict';

  function init() {
    checkBreakpoint();
    bindBreakpointUpdateOnChecker();
  }

  // adiciona o bind de breakpoint-updated e chama o checker quando o evento ocorre
  function bindBreakpointUpdateOnChecker() {
    $(document).on("breakpoint-updated", function () {
      checkBreakpoint();
    })
  }

  // verifica se o breakpoint é para mobile, se for faz a ação para agrupar
  function checkBreakpoint() {
    if(locastyle.breakpointClass == "ls-screen-sm" || locastyle.breakpointClass == "ls-screen-xs"){
      $(".ls-regroup").each(function (index, $element) {
        group($($element).find('[class*="ls-btn"]'));
      });
    }
  }

  // agrupa os botões em um dropdown
  function group($element){
    var list = $($element).wrap('<li class="hidden-xs hidden-sm">');
    $(".ls-regroup").append(locastyle.templates.dropdown(list));

    // para funcionar o dropdown
    locastyle.dropdown.init()
  }

  return {
    init: init
  };

}());
