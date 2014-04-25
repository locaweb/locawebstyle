var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    bindBreakpointUpdateOnChecker();
    checkBreakpoint();
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindClickOnTriggers() {
    $("[data-ls-module=tabs]").on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      deactivateTab(this, $target);
      activateTab(this, $target);
      if(isDropdownMode($(this).parents(".ls-tabs-nav"))){
        updateTriggerLink($(this).parents(".ls-tabs-nav"));
      }
    });
  }

  // adiciona o bind de breakpoint-updated e chama o checker quando o evento ocorre
  function bindBreakpointUpdateOnChecker() {
    $(document).on("breakpoint-updated", function () {
      locastyle.tabs.checkBreakpoint();
    })
  }

  // checa se a tab está em modo dropdown
  function isDropdownMode(el) {
    return $(el).hasClass('in-dropdown');
  }

  // verifica o breakpoint e se a tab já está em modo droppdown
  function checkBreakpoint() {
    if(locastyle.breakpointClass == "ls-screen-sm"){
      $(".ls-tabs-nav").each(function (index, value) {
        if(!isDropdownMode(value)){
          dropdownShape(value);
        };
      });
    }
  }

  // atualiza o link do dropdowna com valor da aba ativa
  function updateTriggerLink(tabNav) {
    //limpa trigger o atual
    $(tabNav).parents(".ls-dropdown").find("> a").remove();

    //atualiza com o novo trigger
    $(tabNav).parents(".ls-dropdown").prepend($(tabNav).find("li.active").html());

    // adiciona classe de estilo no trigger
    $(tabNav).parents(".ls-dropdown").find("> a").addClass("ls-btn");

    // reinicializa o módulo de dropdown para pegar o novo trigger
    locastyle.dropdown.init();
  }

  // altera a tab para o modo dropdown
  function dropdownShape(tabNav) {
    // coloca a div de dropdown em volta da navegação de abas
    $(tabNav).wrap('<div data-ls-module="dropdown" class="ls-dropdown">');

    // coloca a aba ativa como link do dropdown
    updateTriggerLink(tabNav);

    // adiciona a classe que altera o estilo dos links
    $(tabNav).addClass("in-dropdown");
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
    unbind: unbind,
    checkBreakpoint: checkBreakpoint
  }

}());
