var locastyle = locastyle || {};

locastyle.breakpoints = (function() {
  'use strict';

  //
  // Tamanhos padrões dos breakpoints
  //
  var config = {
    sm: '768',
    md: '992',
    lg: '1200',
    html: null
  };

  function init(userConfig) {
    config.html = $('html');

    breakpointWindowWidth(userConfig);
    breakpointScreenWidth();
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
    if (documentWidth < config.sm) {
      config.html.addClass('ls-window-xs');
      locastyle.breakpointClass = "ls-window-xs";
    }

    // Se for maior ou igual a 768 e menor que 992 - sm
    else if (documentWidth >= config.sm && documentWidth < config.md) {
      config.html.addClass('ls-window-sm').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-sm";
    }

    // Se for maior ou igual a 992 e menor que 1200 - md
    else if (documentWidth >= config.md && documentWidth < config.lg) {
      config.html.addClass('ls-window-md').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-md";
    }

    // Se for maior ou igual a 1200 - lg
    else {
      config.html.addClass('ls-window-lg').removeClass('ls-sidebar-visible ls-notifications-visible ');
      locastyle.breakpointClass = "ls-window-lg";
    }
  }

  //
  // Alterando a classe na tag html de acordo com o screen.
  //
  function breakpointScreenWidth(userConfig) {
    var screenWidth;
    
    if (userConfig){
      screenWidth = userConfig.documentWidth;
    } else {
      screenWidth = screen.width;
    }

    // Se for menor que 768 - xs
    if (screenWidth < config.sm) {
      config.html.addClass('ls-screen-xs');
      locastyle.breakpointScreenClass = "ls-screen-xs";
    }

    // Se for maior ou igual a 768 e menor que 992 - sm
    else if (screenWidth >= config.sm && screenWidth < config.md) {
      config.html.addClass('ls-screen-sm');
      locastyle.breakpointScreenClass = "ls-screen-sm";
    }

    // Se for maior ou igual a 992 e menor que 1200 - md
    else if (screenWidth >= config.md && screenWidth < config.lg) {
      config.html.addClass('ls-screen-md');
      locastyle.breakpointScreenClass = "ls-screen-md";
    }

    // Se for maior ou igual a 1200 - lg
    else {
      config.html.addClass('ls-screen-lg');
      locastyle.breakpointScreenClass = "ls-screen-lg";
    }
  }

  //
  // Alterando a classe na tag html quando redimensionamos a janela.
  //
  function changeClassBreakpoint() {

    var changeClass;

    $(window).resize(function() {
      clearTimeout(changeClass);

      changeClass = setTimeout(function() {

        var breakpointActive = config.html.attr('class').replace(/(^|\s)(ls-window-\S+)|(ls-screen-\S+)/g, '');

        config.html.attr('class', $.trim(breakpointActive));

        breakpointWindowWidth();
        breakpointScreenWidth();

        // dispara evento para informar outros modulos que o breakpoint foi atualizado
        $.event.trigger("breakpoint-updated");
      }, 300);

    });
  }

  return {
    init: init
  };

}());
