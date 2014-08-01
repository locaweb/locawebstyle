var locastyle = locastyle || {};

locastyle.dismiss = (function() {
  'use strict';

  function init() {
    unbind();
    bindClickOnTriggers();
  }

  function unbind() {
    $('[data-ls-module=dismiss]').off('click.ls');
  }

  function bindClickOnTriggers() {
    $('[data-ls-module=dismiss]').on('click.ls', function() {
      checkTarget(this);
      locastyle.topbarCurtain.updateStatusCounter()
    });
  }

  function checkTarget(el) {
    var target = $(el).parents('.ls-dismissable');
    if ($(el).data('target')) {
      target = ($(el).data('target'));
    }
    dismiss(target);
  }

  function dismiss(el) {
    $(el).addClass('dismissed');
  }

  return {
    init: init,
    unbind: unbind
  }

}());
