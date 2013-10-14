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
      var navLi = $('.nav > li');
      $('.nav').append('<li class="dropdown"><ul class="dropdown-menu" role="menu" aria-labelledby="myTabDrop"></ul></li>');
      navLi.clone().appendTo('.dropdown-menu');
      $('.dropdown').prepend('<a href="#" id="myTabDrop" class="dropdown-toggle" data-toggle="dropdown">OPÇÕES <b class="caret"></b></a>');
      navLi.hide()
    }
  }


  function sliderMobile() {
    var si = $('.media-mobile .sliderMobile').royalSlider({
      addActiveClass: true,
      arrowsNav: false,
      startSlideId: 1,
      controlNavigation: 'bullets',
      autoScaleSlider: true,
      // autoScaleSliderWidth: 960,
      autoScaleSliderHeight: 540,
      loop: false,
      fadeinLoadedSlide: true,
      globalCaption: false,
      keyboardNavEnabled: false,
      slidesSpacing: 0,
      globalCaptionInside: false,

      visibleNearby: {
        enabled: true,
        center: true,
        breakpoint: 150,
        breakpointCenterArea: 0.14,
        navigateByCenterClick: false
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
