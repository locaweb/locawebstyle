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
      setPositionVisible($target);
      evt.stopPropagation();
    });
  }

  function bindClickOutsideTriggers() {
    $("body").on("click.ls", function(){
      locastyle.dropdown.closeDropdown();
    });
  }

  function toggleDropdown($target) {
    $target.toggleClass("ls-active");
    locastyle.topbarCurtain.hideCurtains();
  }

  function closeDropdown(el) {
    $("[data-ls-module=dropdown]").not(el).removeClass("ls-active");
  }

  function setPositionVisible($target){
    var $main = $('.ls-main');
    if($main.get(0).scrollWidth > $main.width()){
      $($target).addClass('ls-pos-right')
    }
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  }

}());
