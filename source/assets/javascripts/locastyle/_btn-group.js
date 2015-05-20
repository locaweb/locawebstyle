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

  // bind the breakpoint-updated event calls the checker when fired
  function bindBreakpointUpdateOnChecker() {
    unbind();

    $(document).on("breakpoint-updated", function () {
      checkBreakpoint();
    });
  }

  // checks if the breakpoint is mobile, if yes the action is to group
  function checkBreakpoint() {
    if(locastyle.breakpointClass === "ls-window-sm" || locastyle.breakpointClass === "ls-window-xs"){
      $(".ls-regroup").each(function (index, $element) {
        group($($element).find('a, button'));
      });

      // call init in the modules used by dropdown
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
