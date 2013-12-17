var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var baseNameModal = 'locastyle/templates/_';
  var $body = $('body');

  function init(){
  }

  function modal(container, config, idModal){
    config.idModal = idModal || 'template-modal';
    $(container).append( JST[baseNameModal + 'modal'](config) );
    var $modal = $('#' + config.idModal);
    $(config.footer.actions).each(function(ia, action){
      if( $.isFunction(action.click) ){
        $modal.find('.modal-footer button:contains("' + action.label + '")' ).on('click', function(evt){
          action.click();
        });
      }
    });
    return $modal;
  }

  function button_dropdown_single(config){
    $(config.actions).each(function(ia, action){
    });
    return JST[baseNameModal + 'button_dropdown_single'](config);
  }

  function form(config){
    return JST[baseNameModal + 'form'](config);
  }

  return {
    modal: modal,
    form: form,
    button_dropdown_single: button_dropdown_single
  };

}());
