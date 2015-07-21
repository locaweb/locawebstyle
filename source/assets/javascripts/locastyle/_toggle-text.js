var locastyle = locastyle || {};

locastyle.toggleText = (function() {
  'use strict';

  var config = {
    trigger: '[data-ls-module=toggleText]',
    triggerChange: 'toggleText:change'
  };

  function eventHandler(el, target, text) {
    el.trigger(config.triggerChange, [target, text]);
  }

  function bindToggle(el) {
    var $target      = el.data('target-text') ? $(el.data('target-text')) : el;
    var textChange   = el.data('toggle-text');
    var textOriginal = $target.text();

    el.data('toggle-text', textOriginal);
    $target.text(textChange);

    eventHandler(el, $target, textChange);
  }

  function bindEventOnClick() {
    $(config.trigger).on('click.ls', function(event) {
      event.preventDefault();
      bindToggle($(this));
      event.stopPropagation();
    });
  }

  function unbind() {
    $(config.trigger).off('click.ls');
  }

  function init() {
    unbind();
    bindEventOnClick();
  }

  return {
    init: init
  };

}());
