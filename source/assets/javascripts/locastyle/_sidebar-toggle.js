var locastyle = locastyle || {};

locastyle.sidebarToggle = (function() {
  'use strict';

  function init() {
    addArrowToggle();
    sidebarToggling();
    checkCookie();
  }

  // Add arrow element in sidebar
  function addArrowToggle() {
    if( $('.ls-sidebar').length ) {
      $('.ls-sidebar').append('<span class="ls-sidebar-toggle ls-ico-chevron-left"></span>');
    }
  }

  // Check if the cookie exist to maintain the status of sidebar
  function checkCookie() {
    if (typeof $.cookie('sidebarToggled') === 'undefined'){
      maximizeSidebar();
    } else {
      minimizeSidebar();
    }
  }

  // When click in the arrrow, open ou close sidebar
  function sidebarToggling() {
    $('.ls-sidebar-toggle').on('click', function(){
      if($('html').hasClass('ls-sidebar-toggled')) {
        maximizeSidebar()
      } else {
        minimizeSidebar()
      }
    });
  }

  // minimize sidebar
  function minimizeSidebar() {
    $('html').addClass('ls-sidebar-toggled');
    $('.ls-sidebar-toggle').addClass('ls-active');
    $.cookie('sidebarToggled', 'true');
  }

  // maximize sidebar
  function maximizeSidebar() {
    $('html').removeClass('ls-sidebar-toggled');
    $('.ls-sidebar-toggle').removeClass('ls-active');
    $.removeCookie('sidebarToggled');
  }

  return {
    init: init
  };

}());
