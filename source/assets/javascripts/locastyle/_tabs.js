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

  // add bind click the module and calls the methods necessary
  function bindClickOnTriggers() {
    $("[data-ls-module=tabs]").on("click.ls", function(evt) {
      evt.preventDefault();
      var $target = $($(this).attr("href") || $(this).data("target"));
      deactivateTab(this, $target);
      activateTab(this, $target);
      if(isDropdownMode($(this).parents(".ls-tabs-nav"))){
        updateTriggerLink($(this).parents(".ls-tabs-nav"));
      }
    });
  }

  // adds the bind -updated breakpoint and calls the checker when the event occurs
  function bindBreakpointUpdateOnChecker() {
    $(window).on("breakpoint-updated", function () {
      locastyle.tabs.checkBreakpoint();
    });
  }

  // checks if the tab is in dropdown mode
  function isDropdownMode(el) {
    return $(el).hasClass('in-dropdown');
  }

  // checks the breakpoint and the tab is already so droppdown
  function checkBreakpoint() {
    if(locastyle.breakpointClass === "ls-window-sm" || locastyle.breakpointClass === "ls-window-xs"){
      $(".ls-tabs-nav").each(function (index, value) {
        if(!isDropdownMode(value)){
          dropdownShape(value);
        }
      });
    }
  }

  // updated dropdowna link with value of active tab
  function updateTriggerLink(tabNav) {
    // clean trigger current
    $(tabNav).parents(".ls-dropdown-tabs").find("> a").remove();

    // updated with the new trigger
    $(tabNav).parents(".ls-dropdown-tabs").prepend($(tabNav).find("li.ls-active").html());

    // adds style class on trigger
    $(tabNav).parents(".ls-dropdown-tabs").find("> a").addClass("ls-btn");

    // resets the dropdown module to catch the new trigger
    locastyle.dropdown.init();
  }

  // changes the tab to the dropdown mode
  function dropdownShape(tabNav) {
    // puts div dropdown around the tab navigation
    $(tabNav).wrap('<div data-ls-module="dropdown" class="ls-dropdown-tabs">');

    // puts the active tab as a link dropdown
    updateTriggerLink(tabNav);

    // adds class amending style links
    $(tabNav).addClass("in-dropdown");

    // adds class used by dropdown to the toggle
    $(tabNav).addClass("ls-dropdown-nav");
  }

  // activates the flap in accordance with the received arguments
  function activateTab(el, $target) {
    $(el).parents("li").addClass("ls-active");
    $target.addClass("ls-active");
    $(el).attr('aria-selected' , true);
  }

  // off flap according to the received arguments
  function deactivateTab(el, $target) {
    $(el).parents("li").siblings().removeClass("ls-active");
    $target.siblings().removeClass("ls-active");
    $(el).parents("li").siblings().find('a').attr('aria-selected' , false);
  }

  // removes binds the own module adds
  function unbind() {
    $("[data-ls-module=tabs]").off("click.ls");
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
