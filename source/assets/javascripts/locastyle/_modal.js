var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    modal: '.ls-modal',
    open: {
      trigger: '[data-ls-module="modal"]'
    },
    close: {
      classes: '.ls-modal-overlay',
      trigger: '[data-dismiss="modal"]'
    },
    template: {
      classes: '.ls-modal-template'
    }
  }

  function init() {
    unbind();
    $(config.open.trigger).on('click.ls', function() {
      open($(this).data());
    });
  }

  function unbind() {
    $(config.open.trigger).off('click.ls');
  }

  function open($element) {
    if (!$element.target) {
      $('body').addClass('modal-opened').append(locastyle.templates.modal($element));
    } else {
      $($element.target)
        .addClass('opened')
        .append('<div class="ls-modal-overlay"></div>')
        .appendTo('body');
        $('body').addClass('modal-opened');
    }
    close();
  }

  function close() {
    $(config.close.classes + ", " + config.close.trigger).on('click', function() {
      $(config.modal).removeClass("opened");
      $(".ls-modal-overlay, " + config.template.classes).remove();
      $('body').removeClass('modal-opened');
    })
  }

  return {
    init: init,
    close: close,
    unbind: unbind
  };

}());
