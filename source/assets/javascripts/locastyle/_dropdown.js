var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $("[data-module=dropdown] > a:first-child").on("click", function (evt) {
      evt.preventDefault();
      var $target = $($(this).parents("[data-module=dropdown]"));
      activateDropdown($target);
    });
  }

  function activateDropdown ($target) {
    $target.addClass('active');
  }

  return {
    init: init
  }

}());
