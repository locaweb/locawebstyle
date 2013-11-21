var locastyle = locastyle || {};

locastyle.accessibility = (function() {
  'use strict';

  function init(){
    titleAccess();
    areaAccess();
    anchorContent();
    subMenuAccess();
    accessMenu();
    focusAlert();
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
      scrollAcess($('.title-content'));
    })
  }

  function titleAccess(){
    var $titleAcess = $('.title-content').size();
    var message = 'Ir para o conteúdo';
    var $htmlAcess = '<div class="area-access"><a href="#" class="link-content ico-accessibility" tabindex="1">'+ message+ '</a></div>'
    if( $titleAcess >= 1){
      $('.header').prepend($htmlAcess);
    }
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

  // Rola a tela até o elemento
  function scrollAcess(elem){
    $('html, body').animate({
      scrollTop: $(elem).offset().top
    }, 500);
  }


  // Atalho para links onde apenas leitor acessam
  function accessMenu(){
    $('.header').prepend('<nav class="menu-access" />');
    $('[data-access]').each(function(){
      var  href = $(this).attr('href');
      var  text = $(this).text();
      $('.menu-access').append('<a class="sr-only" role="menuitem" tabindex="1" href="'  + href + '">' + text + '</a>');
    })
  }

  function focusAlert(){
    var $element = $('.alert').not('.alert-warning');
    var $size = $element.size();
    if ($size >= 1){
      scrollAcess($element);
      $element.attr('tabindex','-1').focus();
    }
  }

  return {
    init: init,
    titleAccess: titleAccess
  }

}());
