var locastyle = locastyle || {};

locastyle.accessibility = (function() {
  'use strict';

  function init(){
    areaAccess();
    anchorContent();
  }

  function areaAccess(){
    $('.area-access a').on('focus', function(){
      $(this).parent().addClass('in');
    }).on('blur', function(){
      $(this).parent().removeClass('in');
    });
  }

  function anchorContent(){
    $('.link-content').on('click',function(e){
      e.preventDefault();
      $('.title-content').attr('tabindex', '-1').focus().css('outline','none');
      $('html, body').animate({
        scrollTop: $('.title-content').offset().top
      }, 500);
    })
  }

  return {
    init: init
  }

}());
