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
    hasSubmenuItemActive();
    openSubmenuItemActive();
    deactiveSubmenu();
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
    $('.ls-submenu-parent').on('click', '> a', function(evt){
      evt.preventDefault();

      var $submenu = $(this).parents('.ls-submenu-parent')
      $submenu.toggleClass('ls-active');

      // change wai-aria in submenu
      ariaSubmenu($submenu);
    });
  }

  // Active the submenu-parent if have a child actived.
  function openSubmenuItemActive() {
    if( hasSubmenuItemActive() ) {
      $('.ls-submenu').parents('.ls-submenu-parent').addClass('ls-active');
    }
  }

  function closeSubmenu() {
    $(window).on('sidebar-status', function(){
      if( $('.ls-submenu-parent.ls-active').length ) {
        $('.ls-submenu').parents('.ls-submenu-parent').removeClass('ls-active');
      }
    });
  }

  // Alert if have the a submenu child actived
  function hasSubmenuItemActive() {
    if (!$('.ls-sidebar-toggled').length) {
      if($('.ls-submenu li.ls-active').length){
        return true
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
    openSubmenuItemActive: openSubmenuItemActive,
    unbind: unbind
  };

}());
