var manual = manual || {};

manual.forms = (function() {
  'use strict';

  function init() {
    if( $('#test-form-step-validate')[0] ){
      loadValidate();
    }
    masksForManual();
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

  function masksForManual(){
    $("#manual_data").mask("99/99/9999");
    $('#manual_telefone').mask("(99) 99999-999?9");
    $("#manual_cpf").mask("999.999.999-99");

    $("#manual_cpf2").mask("999.999.999-99",{placeholder:" "});

    $("#manual_data2").mask("99/99/9999",{completed:function(){alert("Você digitou a data: "+this.val());}});
  }

  return {
    init:init
  };

}());

$(document).ready(function(){
  manual.forms.init();
});
