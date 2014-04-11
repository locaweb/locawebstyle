var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
    bindClickOutsideTriggers();
  }

  function bindClickOnTriggers() {
    $("[data-ls-module=dropdown] > a:first-child").on("click", function(evt) {
      evt.preventDefault();
      var $target = $($(this).parents("[data-ls-module=dropdown]"));
      toggleDropdown($target);
      closeDropdown($target);
      evt.stopPropagation();
    });
  }

  function toggleDropdown($target) {
    $target.toggleClass("active");
  }

  function bindClickOutsideTriggers() {
    $("body").on("click", function(){
      closeDropdown();
    });
  }

  function closeDropdown(el) {
    $("[data-ls-module=dropdown]").not(el).removeClass("active");
  }

  return {
    init: init
  }

}());
