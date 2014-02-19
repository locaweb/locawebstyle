var locastyle = locastyle || {};

locastyle.accessibility = (function() {
  'use strict';

  function init(dom_scope){
    titleAccess(dom_scope);
    areaAccess(dom_scope);
    anchorContent(dom_scope);
    initSubMenu(dom_scope);
    subMenuAccess(dom_scope);
    accessMenu(dom_scope);
    focusAlert(dom_scope);
    ariaTabs(dom_scope);
    accessTab(dom_scope);
    modalAutoFocus(dom_scope);
    collapseAutoFocus(dom_scope);
  }

  // Exibe link acessível com a tecla Tab
  function areaAccess(dom_scope){
    $('.area-access a', dom_scope).on('focus', function(){
      $(this).parent().addClass('in');
    }).on('blur', function(){
      $(this).parent().removeClass('in');
    });
  }

  // Rola a tela até o titulo principal, indo direto para o conteúdo
  function anchorContent(dom_scope){
    $('.link-content', dom_scope).on('click',function(e){
      e.preventDefault();
      var $anchorTitle = $('.title-content');
      $anchorTitle.attr('tabindex', '-1').focus();
      scrollAcess($anchorTitle);
    })
  }


  // Link acessivel para ir direto ao conteudo
  function titleAccess(dom_scope){
    var titleAcess = $('.title-content', dom_scope).size();
    var message = 'Ir para o conteúdo';
    var $htmlAcess = '<div class="area-access hidden-xs"><a href="#" class="link-content  ico-accessibility" tabindex="1">'+ message+ '</a></div>'
    if(titleAcess >= 1){
      $('.header').prepend($htmlAcess);
    }
  }

  //Funcionalidades especificas do submenu (quando existir)
  function initSubMenu(dom_scope){
    $('.menu li', dom_scope).find('ul').addClass('submenu');
    ariaElementToggle($('.submenu', dom_scope), false, true);
    $('.menu a', dom_scope).attr({ role : 'menuitem' });
  }


  // Submenu acessível via teclado
  function subMenuAccess(dom_scope){
    $('.menu a', dom_scope).on('focus mouseover', function(){
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
  function accessMenu(dom_scope){
    $('.header', dom_scope).prepend('<nav class="menu-access" />');
    $('[data-access]', dom_scope).each(function(){
      var  href = $(this).attr('href');
      var  text = $(this).text();
      $('.menu-access').append('<a class="sr-only" role="menuitem" tabindex="1" href="'  + href + '">' + text + '</a>');
    })
  }

  // Dá foco visual e como leitor de tela no elemento alerta
  function focusAlert(dom_scope){
    var $element = $('.alert-focus', dom_scope);
    var size = $element.size();
    if (size >= 1){
      scrollAcess($element);
      $element.attr('tabindex','-1').focus();
    }
  }

  //Insere Wai-aria nas Abas
  function ariaTabs(dom_scope){
    $('.nav-tabs li a', dom_scope).attr({
      role: 'tab',
      'aria-selected': 'false',
      'aria-hidden': 'true'
    });
    $('.nav-tabs li.active a', dom_scope).attr('aria-selected','true').attr('aria-hidden','false');
  }

  function accessTab(dom_scope){
    $('.nav-tabs a', dom_scope).on('shown.bs.tab', function() {
      ariaTabs(dom_scope);
    })
  }

  // Da foco ao elemento
  function autoFocus(scope){
    $('.auto-focus', scope).first().focus();
  }

  // Foco no elemento dentro do modal
  function modalAutoFocus(dom_scope){
    $('.modal', dom_scope).on('shown.bs.modal',function(){
      autoFocus(this);
    })
  }

  // Foco no elemento dentro do collapse
  function collapseAutoFocus(dom_scope){
    $('.ls-collapse', dom_scope).on('shown.bs.collapse',function(){
      autoFocus(this);
    })
  }

  return {
    init: init,
    titleAccess: titleAccess,
    autoFocus: autoFocus
  }

}());
