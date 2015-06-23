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
      deactivateTab(this, $target);
      activateTab(this, $target);
      if(isDropdownMode($(this).parents('.ls-tabs-nav'))){
        updateTriggerLink($(this).parents('.ls-tabs-nav'));
      }

      // This event return two arguments: element clicked and content target.
      $.event.trigger('tab:clicked', [$(this), $target]);
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
    // clean the current trigger
    $(tabNav).parents('.ls-dropdown-tabs').find('> a').remove();

    // update with the new trigger
    $(tabNav).parents('.ls-dropdown-tabs').prepend($(tabNav).find('li.ls-active').html());

    // add style class on trigger
    $(tabNav).parents('.ls-dropdown-tabs').find('> a').addClass('ls-btn');

    // resets the dropdown module to catch the new trigger
    locastyle.dropdown.init();
  }

  // changes the tab to the dropdown mode
  function dropdownShape(tabNav) {
    // puts div dropdown around the tab navigation
    $(tabNav).wrap('<div data-ls-module="dropdown" class="ls-dropdown-tabs">');

    // puts the active tab as link dropdown
    updateTriggerLink(tabNav);

    // adds class amending style links
    $(tabNav).addClass('in-dropdown');

    // adds class used by dropdown to the toggle
    $(tabNav).addClass('ls-dropdown-nav');
  }

  // activates the flap in accordance with the received arguments
  function activateTab(el, $target) {
    $(el).parents('li').addClass('ls-active');
    $target.addClass('ls-active');
    $(el).attr('aria-selected' , true);
  }

  // disable tab according to the received arguments
  function deactivateTab(el, $target) {
    $(el).parents('li').siblings().removeClass('ls-active');
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
