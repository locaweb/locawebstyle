var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
    bindClickOutsideTriggers();
    ariaDropdown();
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
    console.log(el)
  }

  function setPositionVisible($target){
    var $main = $('body');
    if($main.get(0).scrollWidth > $main.width()){
      $($target).addClass('ls-pos-right');
    }
  }

  function ariaDropdown(elem) {
    $('.ls-dropdown-nav', elem).find('a').attr({ role : 'option' });
    $('[class*="ls-btn"]', elem).attr({ role : 'combobox' });

    if($(elem).hasClass('ls-active')){
      $('[class*="ls-btn"]',elem).attr({ 'aria-expanded' : 'true' });
      $('.ls-dropdown-nav').attr({ 'aria-hidden' : 'false' })
    }
    else{
      $('[class*="ls-btn"]',elem).attr({ 'aria-expanded' : 'false' });
      $('.ls-dropdown-nav', elem).attr({ 'aria-hidden' : 'true' })
    }
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  };

}());
