var locastyle = locastyle || {};

locastyle.dropdown = (function() {
  'use strict';

  var config = {
    area: 'body',
    dropdown: '.ls-dropdown',
    dropdownModule: '[data-ls-module=dropdown]',
    dropdownButton: '[class*="ls-btn"]',
    dropdownFirstLink: '[data-ls-module=dropdown] > a:first-child',
    dropdownNav: '.ls-dropdown-nav'
  }

  function init() {
    unbind();
    bindClickOnTriggers();
    bindClickOutsideTriggers();
    ariaDropdown(config.dropdown);
  }

  function unbind() {
    $(config.dropdownFirstLink).off("click.ls");
    $(config.area).off("click.ls");
  }

  function bindClickOnTriggers() {
    $(config.dropdownFirstLink).on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).parents(config.dropdownModule));
      locastyle.dropdown.toggleDropdown($target);
      ariaDropdown($target);
      locastyle.dropdown.closeDropdown($target);
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
    if($target.find('a:eq(0)').hasClass('ls-disabled')){
      return false;
    } else {
      $target.toggleClass("ls-active");
      $(config.dropdownButton).attr({ 'aria-expanded' : 'false' });
      $(config.dropdownNav).attr({ 'aria-hidden' : 'true' });
      locastyle.topbarCurtain.hideCurtains();
    }
  }

  function closeDropdown(el) {
    $(config.dropdownModule).not(el).removeClass("ls-active");
  }

  function setPositionVisible($target){
    var $main = $('body');
    if($main.get(0).scrollWidth > $main.width()){
      $($target).addClass('ls-pos-right');
    }
  }

  function ariaDropdown(el) {
    $(config.dropdownNav, el).find('a').attr({ role : 'option' });
    $(config.dropdownButton, el).attr({ role : 'combobox' });

    if($(el).hasClass('ls-active')){
      $(config.dropdownButton, el).attr({ 'aria-expanded' : 'true' });
      $(config.dropdownNav).attr({ 'aria-hidden' : 'false' });
    }
    else{
      $(config.dropdownButton, el).attr({ 'aria-expanded' : 'false' });
      $(config.dropdownNav, el).attr({ 'aria-hidden' : 'true' });
    }
  }

  return {
    init: init,
    unbind: unbind,
    toggleDropdown: toggleDropdown,
    closeDropdown: closeDropdown
  };

}());
