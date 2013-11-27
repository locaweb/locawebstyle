var locastyle = locastyle || {};

locastyle.accessibility = (function() {
  'use strict';

  function init(){
    titleAccess();
    areaAccess();
    anchorContent();
    initSubMenu();
    subMenuAccess();
    accessMenu();
    focusAlert();
    ariaTabs();
    accessTab();
    modalAutoFocus();
    collapseAutoFocus();
  }

  // Exibe link acessível com a tecla Tab
  function areaAccess(){
    $('.area-access a').on('focus', function(){
      $(this).parent().addClass('in');
    }).on('blur', function(){
      $(this).parent().removeClass('in');
    });
  }

  // Rola a tela até o titulo principal, indo direto para o conteúdo
  function anchorContent(){
    $('.link-content').on('click',function(e){
      e.preventDefault();
      var $anchorTitle = $('.title-content');
      $anchorTitle.attr('tabindex', '-1').focus();
      scrollAcess($anchorTitle);
    })
  }


  // Link acessivel para ir direto ao conteudo
  function titleAccess(){
    var titleAcess = $('.title-content').size();
    var message = 'Ir para o conteúdo';
    var $htmlAcess = '<div class="area-access hidden-xs"><a href="#" class="link-content  ico-accessibility" tabindex="1">'+ message+ '</a></div>'
    if( titleAcess >= 1){
      $('.header').prepend($htmlAcess);
    }
  }

  //Funcionalidades especificas do submenu (quando existir)
  function initSubMenu(){
    $('.menu li').find('ul').addClass('submenu');
    ariaElementToggle($('.submenu'), false, true);
    $('.menu a').attr({ role : 'menuitem' });
  }


  // Submenu acessível via teclado
  function subMenuAccess(){
    $('.menu a').on('focus mouseover', function(){
      $(this).parents('li').addClass('in');
      ariaElementToggle($(this).parents('.in').find('.submenu'), true, false);

    }).on('blur mouseout', function(){
      $(this).parents('li').removeClass('in');
      ariaElementToggle($('.submenu'), false, true);
    })
  }


  // Aria genérica (para submenu, collapses e dropdown)
  function ariaElementToggle(elem, expanded, hidden){
    $(elem).attr({
      'aria-expanded' : expanded,
         'aria-hidden': hidden
    });
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

  // Dá foco visual e como leitor de tela no elemento alerta
  function focusAlert(){
    var $element = $('.alert').not('.alert-warning');
    var $size = $element.size();
    if ($size >= 1){
      scrollAcess($element);
      $element.attr('tabindex','-1').focus();
    }
  }

  //Insere Wai-aria nas Abas
  function ariaTabs(){
    $('.nav-tabs li a').attr({
      role: 'tab',
      'aria-selected': 'false',
      'aria-hidden': 'true'
    });
    $('.nav-tabs li.active a').attr('aria-selected','true').attr('aria-hidden','false');
  }

  function accessTab(){
    $('.nav-tabs a').on('shown.bs.tab', function() {
      ariaTabs();
    })
  }

  // Da foco ao elemento
  function autoFocus(scope){
    $('.auto-focus', scope).focus();
  }

  // Foco no elemento dentro do modal
  function modalAutoFocus(){
    $('.modal').on('shown.bs.modal',function(){
      autoFocus(this);
    })
  }

  // Foco no elemento dentro do collapse
  function collapseAutoFocus(){
    $('.collapse-box').on('shown.bs.collapse',function(){
      autoFocus(this);
    })
  }

  return {
    init: init,
    titleAccess: titleAccess,
    autoFocus: autoFocus
  }

}());
