var locastyle = locastyle || {};

locastyle.breakpoints = (function() {
  'use strict';

  //
  // Tamanhos padrões dos breakpoints
  //
  var config = {
    screenSm: '768',
    screenMd: '992',
    screenLg: '1200'
  }

  function init() {
    breakpointWindowWidth();
    changeClassBreakpoint();
  }

  //
  // Coloca classe na tag html de acordo com o tamanho do breakpoint
  //
  function breakpointWindowWidth() {

    var documentWidth = $(document).width();


    if (documentWidth <= config.screenSm) {
      $('html').addClass('ls-screen-sm');
      locastyle.breakpointClass = "ls-screen-sm";
    }

    else if (documentWidth > config.screenSm && documentWidth <= config.screenMd) {
      $('html').addClass('ls-screen-md');
      locastyle.breakpointClass = "ls-screen-md";
    }

    else {
      $('html').addClass('ls-screen-lg');
      locastyle.breakpointClass = "ls-screen-lg";
    };
  }

  //
  // Alterando a classe na tag html quando é redimensionamos a janela.
  //
  function changeClassBreakpoint () {

    var changeClass;

    window.onresize = function() {
      clearTimeout(changeClass);
      changeClass = setTimeout(function() {

        var breakpointActive = $('html').attr('class').replace(/(^|\s)ls-screen-\S+/g, '');

        $('html').attr('class', breakpointActive);

        breakpointWindowWidth();

      }, 300);
    };
  }

  return {
    init: init
  }

}());
