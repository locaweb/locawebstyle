var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(){
    mobileLeftBar();
    mobileRightBar();
    mobileBarOverlay();
    tabDropDownMobile();
    sliderMobile();
  }

  // Insere classe left-bar que controla a abertura da sidebar da ESQUERDA nos mobiles
  function mobileLeftBar() {
    $('.control-menu').on('click touchstart', function(e){
      $('html').toggleClass('left-bar').removeClass('right-bar');
      e.preventDefault();
    });
  }

  // Insere classe right-bar que controla a abertura da sidebar da DIREITA nos mobiles
  function mobileRightBar() {
    $('.control-sidebar').on('click touchstart', function(e){
      $('html').toggleClass('right-bar').removeClass('left-bar');
      e.preventDefault();
    });
  }

  // Insere um OVERLAY sem transparente para usar quando as sidebares forem ativadas no mobile
  function mobileBarOverlay() {
    $('body').append('<span class="overlay-bar"></span>');
    $('.overlay-bar').on('click touchstart', function(){
      $('html').removeClass('right-bar').removeClass('left-bar');
    });
  }

  // Cria dropdown em TABS em mobiles
  function tabDropDownMobile() {
    if (locastyle.breakpoint === 'media-mobile') {

      $('.nav').each(function(index){

        $(this).find('li').removeClass('active')

        var navContent = $(this).html();

        $(this).html('<li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">Ações</a><ul class="dropdown-menu" id="drop' + (index+1) +'" role="menu"></ul></li>');

        $(this).find('.dropdown-menu').html(navContent);

      });

    }
  }


  // Configurando o slider que aparece no mobile
  function sliderMobile() {
    var si = $('.media-mobile .shortcuts').royalSlider({
      addActiveClass: true,
      arrowsNav: false,
      startSlideId: 1,
      autoHeight: false,
      controlNavigation: 'bullets',
      autoScaleSlider: false,
      loop: false,
      fadeinLoadedSlide: true,
      globalCaption: false,
      keyboardNavEnabled: false,
      slidesSpacing: 0,
      allowCSS3: true,
      minSlideOffset: 3,
      globalCaptionInside: false,

      visibleNearby: {
        enabled: true,
        center: true,
        breakpointCenterArea: 0.14
      }
    }).data('royalSlider');
  }

  return {
    init: init,
    mobileLeftBar: mobileLeftBar,
    mobileRightBar: mobileRightBar,
    sliderMobile: sliderMobile
  };

}());
