var locastyle = locastyle || {};

locastyle.sidebarToggle = (function() {
  'use strict';

  function init() {
    unbind();
    checkStatus();
    addArrowToggle();
    sidebarToggling();
    checkStatus();
    maximizeMobile();
  }


  // Add arrow element in sidebar
  function addArrowToggle() {
    if( $('.ls-sidebar').length ) {
      $('.ls-sidebar').append('<span class="ls-sidebar-toggle ls-ico-shaft-left"></span>');
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

  // When click in the arrrow, open or close sidebar
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
    $.event.trigger('sidebar-minimize');
  }

  // maximize sidebar
  function maximizeSidebar() {
    $('html').removeClass('ls-sidebar-toggled');
    $('.ls-sidebar-toggle').removeClass('ls-active');
    localStorage.removeItem('stateSidebar');
    $.event.trigger('sidebar-maximize');
  }

  // When in Mobile, maximize sidebar
  function maximizeMobile() {
    $(window).on("breakpoint-updated", function () {
      if ($('.ls-window-xs').length) {
        maximizeSidebar();
      }
    });
  }

  function unbind() {
    $('.ls-sidebar-toggle').off('click');
  }

  return {
    init: init
  };

}());
