var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    open: {
      trigger: '[data-ls-module="modal"]'
    },
    close: {
      classes: '.ls-modal-overlay',
      trigger: '[data-dismiss="modal"]'
    }
  }

  function init() {
    unbind();
    bindOpen();
  }

  function unbind() {
    $(config.open.trigger).off('click.ls');
    $(config.close.classes + ", " + config.close.trigger).off('click.ls');
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
        .show()
        .addClass('opened')
        .append('<div class="ls-modal-overlay"></div>')
        .appendTo('body');
        $('body').addClass('modal-opened');
    }
    bindClose();
  }

  function close() {
    $('.ls-modal').hide().removeClass("opened");
    $(".ls-modal-overlay, .ls-modal-template").remove();
    $('body').removeClass('modal-opened');
    locastyle.popover.destroyPopover();
  }

  return {
    init: init,
    open: open,
    close: close,
    unbind: unbind
  };

}());
