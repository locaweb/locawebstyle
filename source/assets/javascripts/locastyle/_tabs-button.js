var locastyle = locastyle || {};

locastyle.button = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    ariaTabs();
  }

  function unbind() {
    $("[data-ls-module=button]").off("click.button");
  }

  function bindClickOnTriggers() {
    $("[data-ls-module=button]").on("click.button", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      var $buttons = '[data-ls-module=button]'
      deactivateElement(this, $target, $buttons);
      activateElement(this, $target);
    });
  }

  function activateElement(el, $target) {
    $(el).parents("li").addClass("ls-active");
    $target.addClass("ls-active");
    $(el).attr('aria-selected' , true);
  }

  function deactivateElement(el, $target, $buttons) {
    $(el).parents("li").siblings().removeClass("ls-active");
    $target.siblings().removeClass("ls-active");
    $(el).parents("li").siblings().find($buttons).attr('aria-selected' , false);
  }

  function ariaTabs() {
    $('.ls-tabs-btn-nav').attr('role' , 'tablist');
    $('.ls-tabs-btn-nav .ls-btn').attr('role' , 'tab');
    $('.ls-tabs-btn-nav .ls-active .ls-btn').attr('aria-selected' , 'true');
    $('.ls-tabs-btn .ls-tab-content').attr('role' , 'tabpanel');
  }

  return {
    init: init,
    unbind: unbind
  };

}());
