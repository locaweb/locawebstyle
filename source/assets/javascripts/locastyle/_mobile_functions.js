var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(dom_scope){
    mobileLeftBar(dom_scope);
    mobileRightBar(dom_scope);
    mobileBarOverlay(dom_scope);
    tabDropdownMobile(dom_scope);
    tabDropdownActions(dom_scope);
    sliderMobile(dom_scope);
    checkSidebarExist(dom_scope);
    lwbarMobile();
    mobileGroupActions(dom_scope);
  }



  //
  // Checa se a sidebar e o nav-content existem.
  //
  function checkSidebarExist(dom_scope) {
    if ( $(".sidebar", dom_scope).length ) {
      $('.control-sidebar', dom_scope).removeClass('hidden');
    }

    if ( $(".nav-content", dom_scope).length ) {
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
    if ( $('.overlay-bar', dom_scope).length === 0 ) {
      $('body').append('<span class="overlay-bar"></span>');
    }
    $('.overlay-bar').on('click touchstart', function() {
      $('html').removeClass('right-bar').removeClass('left-bar');
    });
  }

  //
  // Transforma as TABS em DROPDOWN em telas pequenas
  //
  function tabDropdownMobile(dom_scope) {
    if (locastyle.breakpoint === 'media-mobile') {

      $('.nav', dom_scope).each(function(index) {

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
  function tabDropdownActions(dom_scope) {
    if (locastyle.breakpoint === 'media-mobile') {

      $('.actions', dom_scope).each(function(index) {

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
  function sliderMobile(dom_scope) {
    var si = $('.media-mobile .shortcuts', dom_scope).royalSlider({
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

  function lwbarMobile() {

    // Verifica se existe a barra da locaweb
    var existLwBar = $('#lwbar-header').length
    if (existLwBar){
      // Guarda o HTML da barra barra em uma variável
      var lwbarMobileHtml = '<div class="lwbar-id ico-user"><span class="lwbar-login-name"></span><span class="lwbar-plan"></span></div>';

      // Insere o HTML da barra versão mobile no nav-content
      $('.nav-content').prepend(lwbarMobileHtml);

      // Guarda o botão sair(logout) e o nome do usuário logado
      var $btnLogout = $('#lwbar-header .log-out');
      var $lwbarLoginName = $('#lwbar-header .user-name');

      // Clona e move estes dados para a versão mobile
      $($btnLogout).clone().appendTo('.nav-content').addClass('btn-logout');
      $($lwbarLoginName).clone().appendTo('.lwbar-login-name');

    }

  }


  var config = {
    selectors: {
      groupActions: '.ls-group-actions'
    },
    isMobile : window.innerWidth <= 767
  }

  function mobileGroupActions (dom_scope){
    if( locastyle.mobile.config.isMobile ){
      var $item = $( config.selectors.groupActions, dom_scope);
      $item.each(function(i, elem){
        var $elem = $(elem);
        groupActions($elem);
      });
    }
  }

  function groupActions ($elem) {
      var config = {
        label: '',
        addClass: 'pull-right',
        actions: []
      };
      $('a, button', $elem).not('.dropdown-toggle').each(function(i, action){
        var $action = $(action);
        var hasDanger = $action.hasClass('color-danger');
        config.actions.push( {label: $action.text(), link: $action.attr('href'), classes: ( hasDanger ? 'color-danger' : ''), hasDivider: hasDanger } )
      });
      var HTML = locastyle.templates.button_dropdown_single(config)
      $elem.html( locastyle.templates.button_dropdown_single(config) );
  }

  return {
    init: init,
    mobileLeftBar: mobileLeftBar,
    mobileRightBar: mobileRightBar,
    sliderMobile: sliderMobile,
    tabDropdownMobile: tabDropdownMobile,
    mobileGroupActions: mobileGroupActions,
    config: config
  };

}());
