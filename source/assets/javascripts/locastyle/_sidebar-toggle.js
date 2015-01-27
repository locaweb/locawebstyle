var locastyle = locastyle || {};

locastyle.sidebarToggle = (function() {
  'use strict';

  function init() {
    unbind();
    checkStatus();
    addArrowToggle();
    sidebarToggling();
  }

  // Add arrow element in sidebar
  function addArrowToggle() {
    if( $('.ls-sidebar').length ) {
      $('.ls-sidebar').append('<span class="ls-sidebar-toggle ls-ico-circle-left"></span>');
    }
  }

  // Check if the cookie exist to maintain the status of sidebar
  function checkStatus() {
    var stateSidebar = localStorage.getItem('stateSidebar');
    if (stateSidebar || $('html').hasClass('ls-sidebar-toggled')){
      minimizeSidebar();
    } else {
      maximizeSidebar();
    }
  }

  // When click in the arrrow, open ou close sidebar
  function sidebarToggling() {
    $('.ls-sidebar-toggle').on('click', function(){
      if($('html').hasClass('ls-sidebar-toggled')) {
        maximizeSidebar();
      } else {
        minimizeSidebar();
      }
    });
  }

  // minimize sidebar
  function minimizeSidebar() {
    $('html').addClass('ls-sidebar-toggled');
    $('.ls-sidebar-toggle').addClass('ls-active');
    localStorage.setItem('stateSidebar', 'minimized');
  }

  // maximize sidebar
  function maximizeSidebar() {
    $('html').removeClass('ls-sidebar-toggled');
    $('.ls-sidebar-toggle').removeClass('ls-active');
    localStorage.removeItem('stateSidebar');
  }

  function unbind() {
    $('.ls-sidebar-toggle').off('click');
  }

  return {
    init: init
  };

}());
