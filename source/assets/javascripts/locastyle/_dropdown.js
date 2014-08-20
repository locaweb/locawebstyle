var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    bindClickOutsideTriggers();
    ariaDropdown('.ls-dropdown');
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
      ariaDropdown($target)
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
    if($target.find('a:eq(0)').hasClass('ls-disabled')){
      return false;
    } else {
      $target.toggleClass("ls-active");
      locastyle.topbarCurtain.hideCurtains();
    }
  }

  function closeDropdown(el) {
    $("[data-ls-module=dropdown]").not(el).removeClass("ls-active");
  }

  function setPositionVisible($target){
    var $main = $('body');
    if($main.get(0).scrollWidth > $main.width()){
      $($target).addClass('ls-pos-right');
    }
  }

  function ariaDropdown(el) {
    $('.ls-dropdown-nav', el).find('a').attr({ role : 'option' });
    $('[class*="ls-btn"]', el).attr({ role : 'combobox' });

    if($(el).hasClass('ls-active')){
      $('[class*="ls-btn"]',el).attr({ 'aria-expanded' : 'true' });
      $('.ls-dropdown-nav').attr({ 'aria-hidden' : 'false' })
    }
    else{
      $('[class*="ls-btn"]',el).attr({ 'aria-expanded' : 'false' });
      $('.ls-dropdown-nav', el).attr({ 'aria-hidden' : 'true' })
    }
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  };

}());
