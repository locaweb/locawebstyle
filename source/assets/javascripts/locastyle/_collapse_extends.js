var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  function init(){
    verifyOpenedCollapse();
    addClassParentCollapse();
    removeClassParentCollapse();
  }

  // Verifica se o Collapse está aberto
  function verifyOpenedCollapse() {
    $('.collapse').each(function(){
      if ( $(this).hasClass('in') ) {
        $(this).parents('.collapse-box').addClass('active');
      }
    });
  }

  // Função que adiciona classe no elemento pai do Collapse
  function addClassParentCollapse() {
    $('.collapse').on('show.bs.collapse', function () {
      $(this).parents('.collapse-box').addClass('active')
    });
  }

  // Função que remove classe no elemento pai do Collapse
  function removeClassParentCollapse() {
    $('.collapse').on('hide.bs.collapse', function () {
      $(this).parents('.collapse-box').removeClass('active')
    });
  }

  return {
    init: init
  };

}());