var locastyle = locastyle || {};

locastyle.accessibility = (function() {
  'use strict';

  function init(){
    areaAccess();
    anchorContent();
    subMenuAccess();
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

  // Submenu acessível via teclado
  function subMenuAccess(){
    $('.menu li a').on('focus', function(){
    $(this).parents('li').addClass('in');
    $(this).parents('li').find('ul').attr({
      'aria-expanded' : true,
         'aria-hidden': false
      })
    }).on('blur', function(){
      $(this).parents('li').removeClass('in');
      $(this).parents('li').find('ul').attr({
        'aria-expanded' : false,
           'aria-hidden': true
      })
    })
  }

  return {
    init: init
  }

}());
