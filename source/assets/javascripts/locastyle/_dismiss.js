var locastyle = locastyle || {};

locastyle.dismiss = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $('[data-module=dismiss] .ls-dismiss').on('click', function() {
      dismiss(this);
    });
  }

  function dismiss(el) {
    $(el).parents('[data-module=dismiss]').addClass('dismissed');
  }

  return {
    init: init
  }

}());
