var manual = manual || {};

manual.forms = (function() {
  'use strict';

  function init() {
    masksForManual();
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
