var manual = manual || {};

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
      $('.validate').validate({
        errorClass: "help-inline",
        errorElement: 'span',
        success: function(label) {
          label.parent(".control-group").removeClass('error').addClass('success');
        },
        errorPlacement: function(error, element) {
          element.parent(".control-group").addClass('error');
          error.appendTo( element.parent(".control-group") );
        }
      });
    });
  }


  return {
    init:init
  };

}());

$(document).ready(function(){
  manual.forms.init();
});

