var locastyle = locastyle || {};

locastyle.charCounter = (function() {
  'use strict';

  function init(){
    countText();
  }

  function countText(){
    $('[data-ls-module="charCounter"]').each(function(index, field){
      var limit = $(field).attr('maxlength');
      $(field).after('<small>Máximo de '+limit+' caracteres <strong class="counter_'+index+'"></strong></small>');

      $(field).keyup(function(event){
        var count = $(this).val().length;
        if(count > limit){
          return false
        }
        showCount(index, count);
      });
    })
  }

  function showCount(index, count){
    $('.counter_'+index).text(count)
  }

  return {
    init: init
  }

}());
