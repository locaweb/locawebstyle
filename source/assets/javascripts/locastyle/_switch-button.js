var locastyle = locastyle || {};

locastyle.switchButton = (function() {
  'use strict';

  var config = {
    switchButton: '.ls-switch-btn',
    openedClass: 'ls-switch-btn-active'
  };

  function init() {
    bindEventOnChange();
  }

  function bindEventOnChange() {
    $(config.switchButton).on('click.ls', function(e) {
      eventHandler($(this));
      e.stopPropagation();
    });
  }

  function eventHandler(el) {
    if (el.find('input[type=checkbox]').prop('checked')) {
      el.trigger('switchButton:actived').addClass(config.openedClass);
    } else {
      el.trigger('switchButton:disabled').removeClass(config.openedClass);
    }
  }

  return {
    init: init
  };

})();
