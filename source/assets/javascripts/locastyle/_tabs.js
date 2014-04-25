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

  // verifica qual é o breakpoint e altera o modo para dropdoown se necessário
  function checkBreakpointClass() {
    if(locastyle.breakpointClass == "ls-screen-sm"){
      $(".ls-tabs-nav").each(function (index, value) {
        // coloca a div de dropdown em volta da navegação de abas
        $(value).wrap('<div data-ls-module="dropdown" class="ls-dropdown">');

        // coloca a aba ativa como link do dropdown
        $(value).parents(".ls-dropdown").prepend($(value).find("li.active").html());

        // adiciona a classe que altera o estilo dos links
        $(value).addClass("in-dropdown");
      })

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
