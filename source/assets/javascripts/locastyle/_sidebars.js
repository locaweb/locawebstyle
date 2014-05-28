var locastyle = locastyle || {};

locastyle.sidebars = (function() {
  'use strict';

  function init() {
    unbind();
    bindShowSidebar();
    bindShowNotifications();
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

  // remove os binds que o próprio modulo adiciona
  function unbind() {
    $('.ls-show-sidebar').off('touchstart.ls click.ls');
    $('.ls-show-notifications').off('touchstart.ls click.ls');
  }

  return {
    init: init,
    unbind: unbind
  }

}());