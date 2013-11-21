var locastyle = locastyle || {};

locastyle.collapse = (function() {
  'use strict';

  function init(){
    addClassParentCollapse();
  }

  // Função que adiciona classe no elemento pai do Collapse
  function addClassParentCollapse() {
    $('.collapse').on('show.bs.collapse', function () {
      $(this).parents('.collapse-box').addClass('active')
    });
  }

  return {
    init: init
  };

}());