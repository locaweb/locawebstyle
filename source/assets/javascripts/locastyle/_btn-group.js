var locastyle = locastyle || {};
locastyle.btnGroup = (function() {
  'use strict';

  function init() {
    checkBreakpoint();
  }

  function checkBreakpoint() {
    $(".ls-regroup").each(function (index, $element) {
      group($($element).find('[class*="ls-btn"]'));
    });
  }

  function group($element){
    var list = $($element).wrap('<li></li>');
    $(".ls-regroup").append(locastyle.templates.dropdown(list));
  }

  return {
    init: init
  };

}());
