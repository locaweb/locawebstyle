var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(dom_scope){
    mobileLeftBar(dom_scope);
    mobileRightBar(dom_scope);
    mobileBarOverlay(dom_scope);
    tabDropdownMobile();
    tabDropdownActions();
    sliderMobile();
    checkSidebarExist();
  }

  function checkSidebarExist() {
    if ( $(".sidebar").length ) {
      $('.control-sidebar').removeClass('hidden');
    }

    if ( $(".nav-content").length ) {
      $('.control-menu').removeClass('hidden');
    }
  }

  //
  // Insere classe left-bar que controla a abertura da sidebar da ESQUERDA nos mobiles
  //
  function mobileLeftBar(dom_scope) {
    $('.control-menu', dom_scope).on('click touchstart', function(e) {
      $('html').toggleClass('left-bar').removeClass('right-bar');
      e.preventDefault();
    });
  }

  //
  // Insere classe right-bar que controla a abertura da sidebar da DIREITA nos mobiles
  //
  function mobileRightBar(dom_scope) {
    $('.control-sidebar', dom_scope).on('click touchstart', function(e){
      $('html').toggleClass('right-bar').removeClass('left-bar');
      e.preventDefault();
    });
  }

  //
  // Insere um OVERLAY sem transparente para usar quando as sidebares forem ativadas no mobile
  //
  function mobileBarOverlay(dom_scope) {
    if ( $('.overlay-bar').length === 0 ) {
      $('body').append('<span class="overlay-bar"></span>');
    }
    $('.overlay-bar', dom_scope).on('click touchstart', function() {
      $('html').removeClass('right-bar').removeClass('left-bar');
    });
  }

  //
  // Transforma as TABS em DROPDOWN em telas pequenas
  //
  function tabDropdownMobile() {
    if (locastyle.breakpoint === 'media-mobile') {

      $('.nav').each(function(index) {

        // Texto que vai no Dropdown quando for mobile
        var dropdownItemText = $(this).find('li.active a').text();

        // Grava o estado inicial das tabs
        var navTabContent = $(this).html();

        // Muda o HTML original das Navs/Tabs para o código do Dropdown
        $(this).html('<li class="dropdown active"><a href="#" class="dropdown-toggle" data-toggle="dropdown">' + dropdownItemText + '</a><ul class="dropdown-menu" id="drop' + (index+1) +'" role="menu"></ul></li>');

        var $dropdownMenu = $(this).find('.dropdown-menu');

        // Move o código das tabs originais para a estrutura nova do Dropdown
        $dropdownMenu.html(navTabContent);

        // Chama função para mudar o texto do tab de acordo com a tab ativa
        changeTextTabActive($dropdownMenu);
      });
    }
  }

  //
  // Quando clicamos no ítem da tab do dropdown, mudamos o texto do dropdown-toggle de acordo com o ítem ativo
  //
  function changeTextTabActive($dropdownMenu) {
    $dropdownMenu.find('li a').on('click', function() {

      var dropdownItemText = $(this).text();
      $(this).parents('.dropdown').find('.dropdown-toggle').html(dropdownItemText);

      var itemTextActive = $(this).parents('.dropdown').find('.dropdown-toggle').text();

      $dropdownMenu.find('li.active').removeClass('active');

      // Mantem a classe active no elemento selecionado
      $dropdownMenu.find('li a').each(function(){
        var itemText = $(this).text();
        if(itemText === itemTextActive){
          $(this).parents('li').addClass('active');
        }
      });

    });
  }

  //
  // Transforma um grupo de ações em dropdown
  //
  function tabDropdownActions() {
    if (locastyle.breakpoint === 'media-mobile') {

      $('.actions').each(function(index) {

        // Define uma variável para que o dev possa modificar o texto padrão do dropdown menu.
        var $dataToggleText = $(this).find('.btn-group').attr('data-toggle-text') || "Ações";

        // Alinha o Actions para a direita
        $(this).addClass('pull-right');

        // Insere um divisor
        $(this).find('.btn-group').append('<li class="divider"></li>');

        // Pega todos os BTN e joga para dentro de BTN-GROUP
        $(this).find('> .btn').appendTo($(this).find('.btn-group'));

        // Pega todos os BTN e coloca um LI em volta
        $(this).find('.btn').wrap('<li></li>').removeClass('btn');

        // Envolve todo o conteúdo do BTN-GROUP em um DROPDOWN-MENU, que faz o dropdown em si.
        // E insere o dropdown-toggle que é o botão que chama o dropdown
        $(this).find('.btn-group').wrapInner('<ul class="dropdown-menu pull-right" role="menu"></ul>').prepend('<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"> '+ $dataToggleText +'</button>');

      });

    }
  }


  //
  // Configurando o slider que aparece no mobile
  //
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
    sliderMobile: sliderMobile,
    tabDropdownMobile: tabDropdownMobile
  };

}());
