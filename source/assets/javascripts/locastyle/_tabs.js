var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    checkBreakpointClass();
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindClickOnTriggers() {
    $("[data-ls-module=tabs]").on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      deactivateTab(this, $target);
      activateTab(this, $target);
    });
  }

  //  verifica qual é o breakpoint e altera o modo para dropdoown se necessário
  function checkBreakpointClass() {
    if(locastyle.breakpointClass == "ls-screen-sm"){
      $(".ls-tabs-nav").wrap('<div data-ls-module="dropdown" class="ls-dropdown">');
      $(".ls-dropdown").prepend('<a class="ls-btn-primary" href="#track">Aba 1</a>');
      $(".ls-tabs-nav").addClass("in-dropdown");
      locastyle.dropdown.init();
    }
  }

  // ativa a aba de acordo com os argumentos recebidos
  function activateTab(el, $target) {
    $(el).parents("li").addClass("active");
    $target.addClass("active");
  }

  // desativa a aba de acordo com os argumentos recebidos
  function deactivateTab(el, $target) {
    $(el).parents("li").siblings().removeClass("active");
    $target.siblings().removeClass("active");
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $("[data-ls-module=tabs]").off("click.ls");
  }

  return {
    init: init,
    unbind: unbind
  }

}());
