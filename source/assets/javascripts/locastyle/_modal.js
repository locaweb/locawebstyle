var locastyle = locastyle || {};
locastyle.modal = (function() {
  'use strict';

  var config = {
    modal: '.ls-modal',
    open: {
      trigger: '[data-module="modal"]'
    },
    close: {
      trigger: '[data-dismiss="modal"]'
    }
  }

  function init() {
    $(config.open.trigger).on('click', function(){
      open($(this).data('target'));
    })
  }

  function open(target){
    $(target).addClass("opened");
    $('body').append( '<div class="ls-modal-overlay"></div>');
    close();
  }

  function close(){
    $(".ls-modal-overlay, " + config.close.trigger).on('click', function(){
      $(config.modal).removeClass( "opened");
      $(".ls-modal-overlay").remove()
    })
  }

  return {
    init: init,
    close: close
  };

}());
