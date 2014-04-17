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
    bindOpen();
  }

  function unbind() {
    $(config.open.trigger).off('click.ls');
  }

  function bindOpen() {
    $(config.open.trigger).on('click.ls', function() {
      locastyle.modal.open($(this).data());
    });
  }

  function bindClose(){
    $(config.close.classes + ", " + config.close.trigger).on('click.ls', function() {
      locastyle.modal.close();
    });
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
    bindClose();
  }

  function close() {
    $(config.modal).removeClass("opened");
    $(".ls-modal-overlay, " + config.template.classes).remove();
    $('body').removeClass('modal-opened');
  }

  return {
    init: init,
    open: open,
    close: close,
    unbind: unbind
  };

}());
