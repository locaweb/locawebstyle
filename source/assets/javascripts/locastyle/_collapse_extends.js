var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  function init(){
    verifyOpenedCollapse();
    addClassParentCollapse();
    removeClassParentCollapse();
    collapseChecked();
  }

  // Verifica se o Collapse está aberto
  function verifyOpenedCollapse() {
    $('.collapse.in').parents('.collapse-box').addClass('active');
  }

  // Função que adiciona classe no elemento pai do Collapse
  function addClassParentCollapse() {
    $('.collapse').on('show.bs.collapse', function () {
      $(this).parents('.collapse-box').addClass('active');
    });
  }

  // Função que remove classe no elemento pai do Collapse
  function removeClassParentCollapse() {
    $('.collapse').on('hide.bs.collapse', function () {
      $(this).parents('.collapse-box').removeClass('active');
    });
  }

  function collapseChecked(scope) {
    $('[data-toggle="collapse"]:checked', scope).each(function(){
      $(this).parent().find('.panel-collapse').addClass('in');
    })
  }

  return {
    init: init
  };

}());