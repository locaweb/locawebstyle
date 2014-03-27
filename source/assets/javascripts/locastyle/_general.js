var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  function init() {
    showSidebar();
    subMenu();
  }

  function showSidebar() {
    var $showHide = $('.show-sidebar');
    var $html = $('html');

    $showHide.on('touchstart click', function(evt){
      $html.toggleClass('sidebar-visible');
      evt.preventDefault();
    });
  }

  function subMenu() {
    $('.ls-submenu > a').on('click', function(evt){
      $(this).parent().toggleClass('active');
      evt.preventDefault();
    })
  }

  return {
    init:init
  };

}());
