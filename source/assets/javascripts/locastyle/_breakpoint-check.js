var locastyle = locastyle || {};

locastyle.breakpoints = (function() {
  'use strict';

  //
  // Tamanhos padrões dos breakpoints
  //
  var config = {
    windowSm: '768',
    windowMd: '992',
    windowLg: '1200'
  };

  function init(userConfig) {
    breakpointWindowWidth(userConfig);
    changeClassBreakpoint();
  }

  //
  // Coloca classe na tag html de acordo com o tamanho do breakpoint
  //
  function breakpointWindowWidth(userConfig) {
    var documentWidth;
    if (userConfig){
      documentWidth = userConfig.documentWidth;
    } else {
      documentWidth = $(document).width();
    }

    // Se for menor que 768 - xs
    if (documentWidth < config.windowSm) {
      $('html').addClass('ls-window-xs');
      locastyle.breakpointClass = "ls-window-xs";
    }

    // Se for maior ou igual a 768 e menor que 992 - sm
    else if (documentWidth >= config.windowSm && documentWidth < config.windowMd) {
      $('html').addClass('ls-window-sm').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-sm";
    }

    // Se for maior ou igual a 992 e menor que 1200 - md
    else if (documentWidth >= config.windowMd && documentWidth < config.windowLg) {
      $('html').addClass('ls-window-md').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-md";
    }

    // Se for maior ou igual a 1200 - lg
    else {
      $('html').addClass('ls-window-lg').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-lg";
    }
  }

  //
  // Alterando a classe na tag html quando é redimensionamos a janela.
  //
  function changeClassBreakpoint() {

    var changeClass;

    $(window).resize(function() {
      clearTimeout(changeClass);

      changeClass = setTimeout(function() {

        var breakpointActive = $('html').attr('class').replace(/(^|\s)ls-window-\S+/g, '');

        $('html').attr('class', breakpointActive);

        breakpointWindowWidth();

        // dispara evento para informar outros modulos que o breakpoint foi atualizado
        $.event.trigger("breakpoint-updated");
      }, 300);

    });
  }

  return {
    init: init
  };

}());
