var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(){
    mobileSidebar();
  }

  function mobileSidebar() {
    $('.control-menu').on('click', function(){
      $('html').toggleClass('left-bar')
    });
  }

  return {
    init: init,
    leftBar: mobileSidebar
  };

}());
