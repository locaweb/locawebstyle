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
    $(config.open.trigger).on('click', function() {
      open($(this).data());
    })
  }

  function open($element) {
    if (!$element.target) {
      $('body').append(locastyle.templates.modal($element));
    } else {
      $($element.target)
        .addClass("opened")
        .append('<div class="ls-modal-overlay"></div>');
    }
    close();
  }

  function close() {
    $(config.close.classes + ", " + config.close.trigger).on('click', function() {
      $(config.modal).removeClass("opened");
      $(config.template.classes).remove();
      $(".ls-modal-overlay").remove();
    })
  }

  return {
    init: init,
    close: close
  };

}());
