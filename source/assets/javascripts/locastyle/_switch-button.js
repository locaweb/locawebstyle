var locastyle = locastyle || {};

locastyle.switchButton = (function() {
  'use strict';

  var config = {
    switchButton: '[data-ls-module=switchButton]',
    openedClass: 'ls-switch-btn-active'
  };

  function init() {
    bindEventOnChange();
    validateClassExistence();
  }

  function bindEventOnChange() {
    $(config.switchButton).on('click.ls', function(event) {
      if ($(this).find('a').length === 0) {
        toggleClass($(this));
        eventHandler($(this));
        event.stopPropagation();
      }
    });
  }

  function eventHandler(el) {
    if (el.find('input[type=checkbox]').prop('checked')) {
      el.trigger('switchButton:activated');
    } else {
      el.trigger('switchButton:deactivated');
    }
  }

  function toggleClass(el) {
    el.toggleClass(config.openedClass);
  }

  function validateClassExistence() {
    $(config.switchButton).find('input[type=checkbox]').each(function() {
      if ($(this).prop('checked')) {
        $(this).closest(config.switchButton).addClass(config.openedClass);
      }
    });
  }

  return {
    init: init
  };

}());
