var locastyle = locastyle || {};
locastyle.btnGroup = (function() {
  'use strict';

  function init() {
    checkBreakpoint();
    bindBreakpointUpdateOnChecker();
  }

  function unbind () {
    $(document).off("breakpoint-updated");
  }

  // adds the bind -updated breakpoint and calls the checker when the event occurs
  function bindBreakpointUpdateOnChecker() {
    unbind();

    $(document).on("breakpoint-updated", function () {
      checkBreakpoint();
    });
  }

  // checks whether the breakpoint is for mobile, if the action is to group
  function checkBreakpoint() {
    if(locastyle.breakpointClass === "ls-window-sm" || locastyle.breakpointClass === "ls-window-xs"){
      $(".ls-regroup").each(function (index, $element) {
        group($($element).find('a, button'));
      });

      // calls inits for the items in the dropdown
      locastyle.dropdown.init();
      locastyle.modal.init();
      locastyle.general.init();
    }
  }

  // groups the buttons on a dropdown
  function group($element){
    var list = $($element).wrap('<li class="hidden-xs hidden-sm">');
    $element.parents('.ls-regroup').find('a[class*="ls-btn"]').removeClass();
    $element.parents('.ls-regroup').html(locastyle.templates.dropdown(list));
  }

  return {
    init: init
  };

}());
