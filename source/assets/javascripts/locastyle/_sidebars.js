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
    subMenu();
    ariaMenu();
    ariaSubmenu();
  }

  // add click bind and call the necessary methods
  function bindShowSidebar() {
    $('.ls-show-sidebar').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      sidebarAddClass();
    });
  }

  // add click bind and call the necessary methods
  function bindShowNotifications() {
    $('.ls-show-notifications').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      notificationAddClass();
    });
  }

  // add class in HTML tag
  function sidebarAddClass() {
    $('html').toggleClass('ls-sidebar-visible');
  }

  function notificationAddClass() {
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
  function subMenu() {
    $('.ls-submenu-parent').on('click', ' > a', function(evt) {
      evt.preventDefault();

      var $submenu = $(this).parent('.ls-submenu-parent');
      $submenu.addClass('ls-active');
      ariaSubmenu($submenu);
    });

    // When menu is maximized, the submenu need to be opened if one of your items have is active.
    // But, when the menu is minimized, the submenu need to be closed
    if (!$('.ls-sidebar-toggled').length) {
      if($('.ls-submenu li.ls-active')){
        $('.ls-submenu').parents('.ls-submenu-parent').addClass('ls-active');
      }
    }
  }

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
    subMenu: subMenu,
    unbind: unbind
  };

}());
