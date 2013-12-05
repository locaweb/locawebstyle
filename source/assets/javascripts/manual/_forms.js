manual.forms = (function() {
  'use strict';

  function init() {
    if( $('#test-form-step-validate')[0] ){
      loadValidate();
    }

  }

  function loadValidate(){
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.11.1/jquery.validate.min.js', function() {
      jQuery.extend(jQuery.validator.messages, {
        required: "Campo obrigatório."
      });
      $('.validate').validate();
    });
  }


  return {
    init:init
  };

}());

$(document).ready(function(){
  manual.forms.init();
});