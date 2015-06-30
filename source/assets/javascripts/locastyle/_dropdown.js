var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  var config = {
    area: 'body',
    dropdown: '.ls-dropdown',
    module: '[data-ls-module="dropdown"]',
    button: '[class*="ls-btn"]',
    firstLink: '[data-ls-module="dropdown"] > [class*="ls-btn"]:first-child, .ls-dropdown.ls-user-account > a:first-child',
    nav: '.ls-dropdown-nav'
  };

  function init() {
    unbind();
    bindClickOnTriggers();
    bindClickOutsideTriggers();
    ariaDropdown(config.dropdown);
  }

  function unbind() {
    $(config.firstLink).off("click.ls");
    $(config.area).off("click.ls");
  }

  function bindClickOnTriggers() {
    $(config.firstLink).on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).parents(config.module));
      locastyle.dropdown.toggleDropdown($target);
      setPositionVisible($target);
      evt.stopPropagation();
    });
  }

  function bindClickOutsideTriggers() {
    $(config.area).on("click.ls", function(){
      locastyle.dropdown.closeDropdown();
    });
  }

  function toggleDropdown($target) {
    if(!$target.find(config.button).first().hasClass('ls-disabled')){
      closeDropdown($target);
      $target.toggleClass("ls-active");
      ariaDropdown($target);
      locastyle.topbarCurtain.hideCurtains();
      eventsHandler($target);
    }
  }

  function eventsHandler(el) {
    if($(el).hasClass("ls-active")) {
      $(el).trigger('dropdown:opened');
    } else {
      $(el).trigger('dropdown:closed');
    }
  }

  function closeDropdown(el) {
    $(config.module).not(el).removeClass("ls-active");
  }

  function setPositionVisible($target){
    var $main = $(config.area);
    if($main.get(0).scrollWidth > $main.width()){
      $($target).addClass('ls-pos-right');
    }
  }

  function ariaDropdown(el) {
    $(config.button).attr({ 'aria-expanded' : 'false' });
    $(config.nav).attr({ 'aria-hidden' : 'true' });

    $(el).each(function() {
      $(config.nav).find('a').attr({ role : 'option' });
      $(config.button).attr({ role : 'combobox' });

      if($(this).hasClass('ls-active')){
        $(config.button, $(this)).attr({ 'aria-expanded' : 'true' });
        $(config.nav, $(this)).attr({ 'aria-hidden' : 'false' });
      } else {
        $(config.button, $(this)).attr({ 'aria-expanded' : 'false' });
        $(config.nav, $(this)).attr({ 'aria-hidden' : 'true' });
      }
    });
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  };

}());
