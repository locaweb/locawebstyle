var locastyle = locastyle || {};

locastyle.dismiss = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $('[data-module=dismiss]').on('click', function() {
      dismiss(this);
    });
  }

  function dismiss(el) {
    $(el).parents('.ls-dismissable').addClass('dismissed');
  }

  return {
    init: init
  }

}());
