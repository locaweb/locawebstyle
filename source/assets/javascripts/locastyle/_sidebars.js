var locastyle = locastyle || {};

locastyle.sidebars = (function() {
  'use strict';

  function init() {
    unbind();
    notificationVerification();
    bindShowSidebar();
    bindShowNotifications();
    userAccountVerification();

    prepareSubmenu();
    submenu();
    openSubmenuItemActive();
    whenSidebarToggling();
    clickAnywhereCloseSubmenu();

    ariaMenu();
    ariaSubmenu();
  }

  // add click bind and call the necessary methods
  function bindShowSidebar() {
    $('.ls-show-sidebar').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      sidebarVisibleClass();
    });
  }

  // add click bind and call the necessary methods
  function bindShowNotifications() {
    $('.ls-show-notifications').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      notificationClassVisible();
    });
  }

  // add class in HTML tag when the sidebar is visible
  function sidebarVisibleClass() {
    $('html').toggleClass('ls-sidebar-visible');
  }

  // add class in HTML tag when the notification is visible
  function notificationClassVisible() {
    $('html').toggleClass('ls-notifications-visible');
  }

  function userAccountVerification() {
    if($('.ls-sidebar .ls-area-account').length === 1){
      $('.ls-sidebar').addClass('ls-area-account-active');
    }
  }

  function notificationVerification() {
    if($('.ls-notification').length === 1){
      if($('.ls-show-notifications').length === 0){
        $('.ls-topbar').append('<span class="ls-show-notifications ls-ico-question"/>');
      }
    }
  }

  ////
  // Submenu
  // In sidebar some options of menu have a internal Submenu. Here we treat this scenario, when the menu is Minimized or Maximized.
  ////
  function prepareSubmenu() {
    var hasSubmenu = $('.ls-menu').find('ul li ul');
    $(hasSubmenu).each(function(){
      $(this).addClass('ls-submenu');
      $(this).parent('li').addClass('ls-submenu-parent');
      $(this).find('a').addClass('ls-submenu-item');
    });
  }

  // When click in menu option, open your relative submenu
  function submenu() {
    $('.ls-submenu-parent').on('click', '> a', function(evt){
      evt.preventDefault();

      if ($(this).parents('.ls-submenu-parent').hasClass('ls-active')) {
        closeSubmenu( $(this) );
      } else {
        openSubmenu( $(this) );
      }

    });
  }

  // Open Submenu
  function openSubmenu(el) {
    var $submenu = $(el).parents('.ls-submenu-parent');

    $('.ls-submenu-parent').removeClass('ls-active');
    $submenu.addClass('ls-active');

    ariaSubmenu($submenu);
  }

  // Close Submenu
  function closeSubmenu(el) {
    var $submenu = $(el).parents('.ls-submenu-parent');

    $submenu.removeClass('ls-active');

    ariaSubmenu($submenu);
  }

  // Active the submenu-parent if have a child actived.
  function openSubmenuItemActive() {
    if (!$('.ls-sidebar-toggled').length) {
      $('.ls-submenu li.ls-active').each(function(){
        openSubmenu( $(this) );
      });
    }
  }

  // When sidebar toggle, close submenu when minimized, open menu when maximize
  function whenSidebarToggling() {

    // When the user toggle sidebar, is fired two triggers: sidebar-minimize when sidebar is minimizing or sidebar-maximize when sidebar is maximizing
    $(window).on('sidebar-minimize', function(){
      $('.ls-submenu li').each(function(){
        closeSubmenu( $(this) );
      });
    });

    $(window).on('sidebar-maximize', function(){
      $('.ls-submenu li.ls-active').each(function(){
        openSubmenu( $(this) );
      });
    });
  }

  // If user click anywhere in page, close the submenu when sidebar is Toggled.
  function clickAnywhereCloseSubmenu() {
    $(document).on('click', function(evt){
      var target = $(evt.target);
      if($('.ls-sidebar-toggled').length && $('.ls-submenu-parent.ls-active').length) {
        if(!target.is('.ls-submenu-parent.ls-active *')) {
          closeSubmenu( $('.ls-submenu-parent.ls-active > a') );
        }
      }
    });
  }


  ////
  // WAI-ARIA
  ////

  // Add WAI-ARIA in menu items
  function ariaMenu() {
    var $menu = $('.ls-menu');
    $menu.attr({ role : 'navigation' });
    $menu.find('ul').attr({ role: 'menu' });
    $menu.find('a').attr({ role : 'menuitem' });

    $('.ls-submenu-parent').each(function(i,el){
       ariaSubmenu(el);
    });
  }

  // Add WAI-ARIA in submenu items
  function ariaSubmenu(el) {
    if($(el).hasClass('ls-active')){
      $(el).attr({
        'aria-expanded': 'true',
        'aria-hidden' : 'false'
      });
    } else{
      $(el).attr({
        'aria-expanded': 'false',
        'aria-hidden' : 'true'
      });
    }
  }

  // remove the binds
  function unbind() {
    $('.ls-show-sidebar').off('touchstart.ls click.ls');
    $('.ls-show-notifications').off('touchstart.ls click.ls');
    $('.ls-submenu-parent > a').off('click.ls');
  }


  return {
    init: init,
    unbind: unbind
  };

}());
