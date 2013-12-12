var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var baseNameModal = 'locastyle/templates/_';
  var $body = $('body');

  function init(){
  }

  function modal(config){
    $body.append( JST[baseNameModal + 'modal'](config) );
  }

  function button_dropdown_single(config){
    $(config.actions).each(function(ia, action){
      console.log(action )
    });
    return JST[baseNameModal + 'button_dropdown_single'](config);
  }

  return {
    modal: modal,
    button_dropdown_single: button_dropdown_single
  };

}());
