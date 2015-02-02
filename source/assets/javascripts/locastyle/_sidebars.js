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

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindShowSidebar() {
    $('.ls-show-sidebar').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      sidebarAddClass();
    });
  }

  // adiciona o bind de click no modulo e chama os métodos necessários
  function bindShowNotifications() {
    $('.ls-show-notifications').on('touchstart.ls click.ls', function(evt) {
      evt.preventDefault();
      notificationAddClass();
    });
  }

  // adiciona a class de css na tag html
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

  //
  // Submenu Treatment
  //
  function prepareSubmenu() {
    var hasSubmenu = $('.ls-menu').find('ul li ul');
    $(hasSubmenu).each(function(){
      $(this).addClass('ls-submenu');
      $(this).parent('li').addClass('ls-submenu-parent');
      $(this).find('a').addClass('ls-submenu-item');
    });
  }

  function subMenu() {
    $('.ls-submenu-parent > a').on('click.ls', function(evt) {
      evt.preventDefault();

      var $submenu = $(this).parent('.ls-submenu-parent');
      $(this).parent().toggleClass('ls-active');
      ariaSubmenu($submenu);
    });
    if($('.ls-submenu').find('li').hasClass('ls-active')){
      $('.ls-submenu li.ls-active').parents('.ls-submenu-parent').addClass('ls-active');
    }
  }

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $('.ls-show-sidebar').off('touchstart.ls click.ls');
    $('.ls-show-notifications').off('touchstart.ls click.ls');
    $('.ls-submenu-parent > a').off('click.ls');
  }

  function ariaMenu() {
    var $menu = $('.ls-menu');
    $menu.attr({ role : 'navigation' });
    $menu.find('ul').attr({ role: 'menu' });
    $menu.find('a').attr({ role : 'menuitem' });

    $('.ls-submenu-parent').each(function(i,el){
       ariaSubmenu(el);
    });
  }

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

  return {
    init: init,
    subMenu: subMenu,
    unbind: unbind
  };

}());
