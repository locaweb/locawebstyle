var locastyle = locastyle || {};

locastyle.charCounter = (function() {
  'use strict';

  function init(){
    countText();
  }

  function countText(){
    $('[data-ls-module="charCounter"]').each(function(index, field){
      var limit = $(field).attr('maxlength');
      $(field).removeAttr('maxlength').data().maxlength = limit;
      $(field).after('<p class="ls-help-inline"><small><strong class="ls-char-count ls-number-counter-'+index+'">'+limit+'</strong> caracteres restantes</small></p>');

      $(field).keyup(function(){
        var count = $(this).val().length;
        var limit = $(this).data().maxlength;

        if(count > limit) {
          $(this).val($(this).val().substring(0, limit));
          updateCounter(index, 0);
        } else {
          updateCounter(index, limit - count);
        }
      });

      $(field).trigger('keyup');
    });
  }

  function updateCounter(index, count){
    $('.ls-number-counter-'+index).text(count);
  }

  return {
    init: init
  };

}());
