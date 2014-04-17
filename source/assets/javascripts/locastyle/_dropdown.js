var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    bindClickOutsideTriggers();
  }

  function unbind() {
    $("[data-ls-module=dropdown] > a:first-child").off("click.ls");
    $("body").off("click.ls");
  }

  function bindClickOnTriggers() {
    $("[data-ls-module=dropdown] > a:first-child").on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).parents("[data-ls-module=dropdown]"));
      locastyle.dropdown.toggleDropdown($target);
      locastyle.dropdown.closeDropdown($target);
      evt.stopPropagation();
    });
  }

  function bindClickOutsideTriggers() {
    $("body").on("click.ls", function(){
      locastyle.dropdown.closeDropdown();
    });
  }

  function toggleDropdown($target) {
    $target.toggleClass("active");
  }

  function closeDropdown(el) {
    $("[data-ls-module=dropdown]").not(el).removeClass("active");
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  }

}());
