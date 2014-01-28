var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  function init(dom_scope){
    verifyOpenedCollapse();
    addClassParentCollapse(dom_scope);
    removeClassParentCollapse(dom_scope);
    collapseChecked(dom_scope);
    collapseRadioChecked(dom_scope);
  }

  // Verifica se o Collapse está aberto
  function verifyOpenedCollapse() {
    $('.collapse.in').parents('.ls-collapse').addClass('active');
  }

  // Função que adiciona classe no elemento pai do Collapse
  function addClassParentCollapse(dom_scope) {
    $('.collapse', dom_scope).on('show.bs.collapse', function () {
      $(this).parents('.ls-collapse').addClass('active');
    });
  }

  // Função que remove classe no elemento pai do Collapse
  function removeClassParentCollapse(dom_scope) {
    $('.collapse', dom_scope).on('hide.bs.collapse', function () {
      $(this).parents('.ls-collapse').removeClass('active');
    });
  }

   // Verifica se o elemento está checado e exibe o conteudo
  function collapseChecked(dom_scope) {
    $('[data-toggle="collapse"]:checked', dom_scope).each(function(){
      $(this).parent().find('.panel-collapse').addClass('in');
    });
  }

  // Quando checado não dispara evento ao clicar
  function collapseRadioChecked(dom_scope) {
    $('[type="radio"][data-toggle="collapse"]', dom_scope).each(function(i,e){
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