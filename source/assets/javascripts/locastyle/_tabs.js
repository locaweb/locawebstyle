var locastyle = locastyle || {};

locastyle.tabs = (function() {
  'use strict';

  var config = {
    tab : '.ls-tabs-nav',
    tabLink: '.ls-tabs-nav a',
    tabListActive: '.ls-tabs-nav li.ls-active a',
    tabContent: '.ls-tab-content'
  };

  function init() {
    unbind();
    bindClickOnTriggers();
    bindBreakpointUpdateOnChecker();
    checkBreakpoint();
    ariaTabs();
  }

  // bind click and call the necessary methods
  function bindClickOnTriggers() {
    $('[data-ls-module="tabs"]').on('click.ls', function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr('href') || $(this).data('target'));
      var $closestTabNav = $(this).closest('.ls-tabs-nav');

      deactivateTab(this, $target);
      activateTab(this, $target);

      if (isDropdownMode($closestTabNav)) {
        updateTriggerLink($closestTabNav);
      }
    });
  }

  // bind the breakpoint-updated event calls the checker when fired
  function bindBreakpointUpdateOnChecker() {
    $(window).on('breakpoint-updated', function () {
      locastyle.tabs.checkBreakpoint();
    });
  }

  // check if the tab is in dropdown mode
  function isDropdownMode(el) {
    return $(el).hasClass('in-dropdown');
  }

  // check the breakpoint and if the tab is already in droppdown mode
  function checkBreakpoint() {
    if(locastyle.breakpointClass === 'ls-window-sm' || locastyle.breakpointClass === 'ls-window-xs'){
      $('.ls-tabs-nav').each(function (index, value) {
        if(!isDropdownMode(value)){
          dropdownShape(value);
        }
      });
    }
  }

  // update dropdown link with value of active tab
  function updateTriggerLink(tabNav) {
    tabNav.closest('.ls-dropdown-tabs').find('> a').text(tabNav.find('li.ls-active > a').text());
  }

  // changes the tab to the dropdown mode
  function dropdownShape(el) {
    var tabNav = $(el);

    // puts div dropdown around the tab navigation and adds class amending style links used by dropdown toggle
    tabNav.addClass('in-dropdown ls-dropdown-nav').wrap('<div data-ls-module="dropdown" class="ls-dropdown-tabs">');

    // put all dropdown tabs items inside the dropdown mode
    // note this next code block will be ignored if do not exist any element with that class name inside the tab
    tabNav.find('.ls-dropdown-nav').each(function() {
      tabNav.append($(this).html());
      $(this).closest('li').remove();
    });

    // creates the link necessary to control the dropdown with the actived item text
    tabNav.parent('.ls-dropdown-tabs').prepend('<a data-ls-module="tabs" class="ls-btn">' + tabNav.find('li.ls-active > a').text() + '</a>');

    // init the tabs and dropdown modules
    locastyle.tabs.init();
    locastyle.dropdown.init();
  }

  // activates the flap in accordance with the received arguments
  function activateTab(el, $target) {
    $(el).parents('li').addClass('ls-active');
    $(el).trigger('tab:activated');
    $target.addClass('ls-active');
    $(el).attr('aria-selected' , true);
  }

  // disable tab according to the received arguments
  function deactivateTab(el, $target) {
    $(el).parents('li').siblings().removeClass('ls-active');
    $(el).trigger('tab:deactivated');
    $target.siblings().removeClass('ls-active');
    $(el).parents('li').siblings().find('a').attr('aria-selected' , false);
  }

  // remove binds added by the module itself
  function unbind() {
    $('[data-ls-module=tabs]').off('click.ls');
  }

  function ariaTabs() {
    $(config.tab).attr('role' , 'tablist');
    $(config.tabLink).attr('role' , 'tab');
    $(config.tabListActive).attr('aria-selected' , 'true');
    $(config.tabContent).attr('role' , 'tabpanel');
  }

  return {
    init: init,
    unbind: unbind,
    checkBreakpoint: checkBreakpoint
  };

}());
