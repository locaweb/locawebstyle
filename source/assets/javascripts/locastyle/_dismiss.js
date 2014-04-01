var locastyle = locastyle || {};

locastyle.dismiss = (function() {
  'use strict';

  function init() {
    bindClickOnTriggers();
  }

  function bindClickOnTriggers() {
    $('[data-module=dismiss]').on('click', function() {
      checkTarget(this);
    });
  }

  function checkTarget(el) {
    var target = $(el).parents('.ls-dismissable');
    if ($(el).data('target')) {
      target = ($(el).data('target'));
    };
    dismiss(target);
  }

  function dismiss(el) {
    $(el).addClass('dismissed');
  }

  return {
    init: init
  }

}());
