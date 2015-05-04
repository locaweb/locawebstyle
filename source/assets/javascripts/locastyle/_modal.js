var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    open: {
      trigger: '[data-ls-module="modal"]',
      dispatcherOpen: 'ls-modal-before-open',
      dispatcherOpened: 'ls-modal-before-opened'
    },
    close: {
      classes: '.ls-modal',
      trigger: '[data-dismiss="modal"]',
      dispatcherClose: 'ls-modal-before-close',
      dispatcherClosed: 'ls-modal-before-closed'
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

    $(config.close.classes + ", " + config.close.trigger).on('click.ls', function(e) {
      if (e.target !== e.currentTarget) {
        return false;
      }
      locastyle.modal.close();
    });
  }

  function open($element) {
    locastyle.eventDispatcher.trigger(config.open.dispatcherOpen);

    if (!$element.target) {
      $('body').append(locastyle.templates.modal($element));
      $('.ls-modal-template').focus();
      
      bindClose();
    } else {
      $($element.target).addClass('ls-opened');
    }
    
    ariaModal($($element.target),'false');
    
    $($element.target).each(function(i,e){
      targetEach(i, e);
    });

    locastyle.eventDispatcher.trigger(config.open.dispatcherOpened);
  }

  function targetEach(i, e) {
    if ($(e).data('modal-blocked') !== undefined) {
      $('[data-dismiss="modal"]').remove();
    } else {
      bindClose();
    }
  }

  function close() {
    locastyle.eventDispatcher.trigger(config.close.dispatcherClose);

    $('.ls-modal').removeClass('ls-opened').attr({ 'aria-hidden' : 'true' });
    $('.ls-modal-template').remove();
    locastyle.popover.destroyPopover();
    locastyle.popover.init();

    locastyle.eventDispatcher.trigger(config.close.dispatcherClosed);
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
