var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    modal: '.ls-modal',
    effetct: 'fade',
    open: {
      trigger: '[data-module="modal"]'
    },
    close: {
      trigger: '[data-dismiss="modal"]'
    }
  }

  function init() {
    _open();
    _close();
  }

  function _open(){
    $(config.open.trigger).on('click', function(){
      $('body').append(
        $(config.modal).addClass("opened "+config.effetct).show()
      );
      $('body').append( '<div class="ls-modal-overlay"></div>');
    })
  }

  function _close(){
    $(config.close.trigger).on('click', function(){
      $(config.modal).removeClass("opened").hide();
      $(".ls-modal-overlay").remove()
    })
  }

  return {
    init: init
  };

}());
