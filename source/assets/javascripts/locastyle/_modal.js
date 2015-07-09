var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    open: {
      trigger: '[data-ls-module="modal"]',
      triggerOpen: 'modal:open',
      triggerOpened: 'modal:opened'
    },
    close: {
      classes: '.ls-modal',
      trigger: '[data-dismiss="modal"]',
      triggerClosed: 'modal:closed'
    },
    classes: {
      open: 'ls-overflow-hidden'
    },
    lsModal : 0
  };

  function init() {
    unbind();
    bindOpen();
  }

  function unbindClose() {
    $(document).off('keyup.ls-esc');
    $(config.close.classes + ", " + config.close.trigger).off('click.ls');
  }

  function unbind() {
    $(config.open.trigger).off('click.ls');
    unbindClose();
  }

  function bindOpen() {
    $(config.open.trigger).on('click.ls', function() {
      locastyle.modal.open($(this));
    });

    if ($('.ls-opened').length > 0) {
      modalBlocked("#" + $('.ls-opened').attr('id'));
    }
  }

  function bindClose() {
    $(document).one('keyup.ls-esc', function (e) {
      if(e.keyCode === 27 && $('.ls-opened')){
        locastyle.modal.close();
      }
    });

    $(config.close.classes + ", " + config.close.trigger).on('click.ls', function(e) {
      if (e.target !== e.currentTarget) {
        return true;
      }
      locastyle.modal.close();
    });
  }

  function open($this) {
    var $element = $this.data();
    
    $('body').addClass(config.classes.open);

    if (!$element.target) {
      var $template = $(locastyle.templates.modal($element));
      $('body').append($template);
      fadeIn($template, $this);
      $('.ls-modal-template').focus();
      bindClose();
    } else {
      fadeIn($($element.target), $this);
    }

    ariaModal($($element.target));
    modalBlocked($element.target);
  }

  function close() {
    $('body').removeClass(config.classes.open);
    $('.ls-modal.ls-opened').attr('aria-hidden', true);
    fadeOut();
    unbindClose();

    locastyle.popover.destroyPopover(); //add trigger on popover
    locastyle.popover.init(); ///add trigger on popover
  }

  function fadeIn($target, $this) {
    $.event.trigger(config.open.triggerOpen, [$this, $target]);

    $target.fadeIn({queue: false, duration: 500, complete: function(){
      $(this).addClass('ls-opened');

      $.event.trigger(config.open.triggerOpened, [$this, $(this)]);
    }});
  }

  function fadeOut() {
    $('.ls-modal.ls-opened').fadeOut({queue: false, duration: 500, complete: function(){
      $.event.trigger(config.close.triggerClosed, [$(this)]);

      $(this).removeClass('ls-opened');

      if($(this).hasClass('ls-modal-template')) {
        $(this).remove();
      }
    }});
  }

  function modalBlocked($target) {
    $($target).each(function(i,e){
      if ($(e).data('modal-blocked') !== undefined) {
        $('[data-dismiss="modal"]').remove();
      } else {
        bindClose();
      }
    });
  }

  function ariaModal($modal) {
    var idModal = $modal.find('.ls-modal-title').attr('id') || 'lsModal' + config.lsModal++;
    $modal.find('.ls-modal-title').attr('id', idModal);

    $modal.attr({
      role: 'dialog',
      'aria-hidden' : false,
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
