var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    open: {
      trigger: '[data-ls-module="modal"]',
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

  function modalAppendTo(el) {
    var dataAppend = $(el).data('append-to');
    var dataTarget = $(el).data('target');

    if (dataAppend) {
      $(dataTarget).appendTo(dataAppend);
    }
  }

  function open(el) {
    var target = null;

    $('body').addClass(config.classes.open);

    if (!$(el).data('target') && typeof el === 'object') {
      target = $(locastyle.templates.modal($(el).data()));
      $('body').append(target);
      $('.ls-modal-template').focus();
      bindClose();
    } else {
      target = $(el).data('target') ? $(el.data('target')) : $(el);
      modalAppendTo(el);
    }

    $(target).addClass('ls-opened');

    // This event return two arguments: element clicked and target.
    target.trigger(config.open.triggerOpened, el);

    ariaModal(el);
    modalBlocked(el);
  }

  function close() {
    var $this = $('.ls-modal.ls-opened');

    $('body').removeClass(config.classes.open);

    $this.attr('aria-hidden', true);
    $this.removeClass('ls-opened');

    unbindClose();

    // This event return one argument: element target.
    $this.trigger(config.close.triggerClosed);

    if($this.hasClass('ls-modal-template')) {
      $this.remove();
    }
  }

  function modalBlocked(el) {
    var target = $(el).data('target') ? $(el.data('target')) : $(el);
    target.each(function(i,e){
      if ($(e).data('modal-blocked') !== undefined) {
        $(e).find('[data-dismiss="modal"]').remove();
      } else {
        bindClose();
      }
    });
  }

  function ariaModal(el) {
    var modal = $(el).data('target') ? $(el.data('target')) : $(el);
    var idModal = modal.find('.ls-modal-title').attr('id') || 'lsModal' + config.lsModal++;
    modal.find('.ls-modal-title').attr('id', idModal);

    modal.attr({
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
