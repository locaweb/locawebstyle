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
    },
    lsModal : 0
  };

  function init() {
    unbind();
    bindOpen();
    ariaModalTemplate();
  }

  function unbind() {
    $(config.open.trigger).off('click.ls');
    $(config.close.classes + ", " + config.close.trigger).off('click.ls');
  }

  function bindOpen() {
    $(config.open.trigger).on('click.ls', function() {
      locastyle.modal.open($(this).data());
      bindKeypress();
    });
  }

  function bindKeypress(){
    $(document).keyup(function(e) {
      if(e.keyCode == 27){
        locastyle.modal.close();
      }
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
      $('.ls-modal-template').focus();
    } else {
      $($element.target)
        .show()
        .addClass('opened')
        .append('<div class="ls-modal-overlay"></div>')
        .appendTo('body');
        $('body').addClass('modal-opened');
    }
    ariaModal($($element.target),'false');
    bindClose();
  }

  function close() {
    $('.ls-modal').hide().removeClass("opened").attr({ 'aria-hidden' : 'true' });
    $(".ls-modal-overlay, .ls-modal-template").remove();
    $('body').removeClass('modal-opened');
    locastyle.popover.destroyPopover();
  }

  function ariaModal($modal) {
    var idModal = $modal.find('.ls-modal-title').attr('id') || 'lsModal' + config.lsModal++;
    $modal.find('.ls-modal-title').attr('id', idModal);
    $($modal).attr({
      role: 'dialog',
      'aria-hidden' : 'false',
      'aria-labelledby' : idModal,
      tabindex : '-1'
    }).focus();
  }

  return {
    init: init,
    open: open,
    close: close,
    unbind: unbind
  };

}());
