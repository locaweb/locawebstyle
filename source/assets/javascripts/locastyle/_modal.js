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
    $(document).one('keyup.ls', function (e) {
      if(e.keyCode === 27){
        locastyle.modal.close();
      }
    });
    $(config.close.classes + ", " + config.close.trigger).on('click.ls', function() {
      locastyle.modal.close();
    });
  }

  function open($element) {
    if (!$element.target) {
      $('body').addClass('modal-opened').append(locastyle.templates.modal($element));
      $('.ls-modal-template').focus();
      bindClose();
    } else {
      $($element.target)
        .show()
        .addClass('opened')
        .append('<div class="ls-modal-overlay"></div>')
        .appendTo('body');
        $('body').addClass('modal-opened');
    }
    ariaModal($($element.target),'false');
    $($element.target).each(function(i,e){
      if($(e).data('modal-blocked') !== undefined){
        $('[data-dismiss="modal"]').remove();
      }else{
        bindClose();
      }
    });
  }

  function close() {
    $('.ls-modal').hide().removeClass("opened").attr({ 'aria-hidden' : 'true' });
    $(".ls-modal-overlay, .ls-modal-template").remove();
    $('body').removeClass('modal-opened');
    locastyle.popover.destroyPopover();
    locastyle.popover.init();
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
