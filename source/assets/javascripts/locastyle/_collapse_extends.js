var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  function init(){
    verifyOpenedCollapse();
    addClassParentCollapse();
    removeClassParentCollapse();
    collapseChecked();
    collapseRadioChecked();
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

   // Verifica se o elemento está checado e exibe o conteudo
  function collapseChecked(scope) {
    $('[data-toggle="collapse"]:checked', scope).each(function(){
      $(this).parent().find('.panel-collapse').addClass('in');
    });
  }

  // Quando checado não dispara evento ao clicar
  function collapseRadioChecked(scope) {
    $('[type="radio"][data-toggle="collapse"]', scope).each(function(i,e){
      var $elem = $(this);
      $($elem.data('target')).on('hide.bs.collapse', function(e){
        if( $elem.prop('checked') === true ){
          e.preventDefault();
        }
      })
    });
  }

  return {
    init: init
  };

}());