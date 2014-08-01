var locastyle = locastyle || {};

locastyle.charCounter = (function() {
  'use strict';

  function init(){
    countText();
  }

  function countText(){
    $('[data-ls-module="charCounter"]').each(function(index, field){
      var fieldText = $(field).val().length;
      var limit = $(field).attr('maxlength');
      $(field).after('<p class="ls-help-inline"><small><strong class="ls-char-count ls-number-counter-'+index+'">'+limit+'</strong> caracteres restantes</small></p>');

      var calc = limit-fieldText;
      updateCounter(index, calc);

      $(field).keyup(function(event){
        var count = limit - $(this).val().length;
        updateCounter(index, count);
      });
    });
  }

  function updateCounter(index, count){
    $('.ls-number-counter-'+index).text(count);
  }

  return {
    init: init
  };

}());
