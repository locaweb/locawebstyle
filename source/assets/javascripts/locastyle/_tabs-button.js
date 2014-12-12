var locastyle = locastyle || {};

locastyle.button = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
  }

  function unbind() {
    $("[data-ls-module=button]").off("click.button");
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindClickOnTriggers() {
    $("[data-ls-module=button]").on("click.button", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      var $buttons = '[data-ls-module=button]'
      console.log($buttons);
      deactivateElement(this, $target, $buttons);
      activateElement(this, $target);
    });
  }

  // ativa o elemento de acordo com os argumentos recebidos
  function activateElement(el, $target) {
    $(el).parents("li").addClass("ls-active");
    $target.addClass("ls-active");
    $(el).attr('aria-selected' , true);
  }

  // desativa o elemento de acordo com os argumentos recebidos
  function deactivateElement(el, $target, $buttons) {
    $(el).parents("li").siblings().removeClass("ls-active");
    $target.siblings().removeClass("ls-active");
    $(el).parents("li").siblings().find($buttons).attr('aria-selected' , false);
  }

  return {
    init: init,
    unbind: unbind
  };

}());
