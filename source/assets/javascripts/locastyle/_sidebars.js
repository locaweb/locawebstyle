var locastyle = locastyle || {};

locastyle.sidebars = (function() {
  'use strict';

  function init() {
    unbind();
    notificationVerification();
    bindShowSidebar();
    bindShowNotifications();
    userAccountVerification();
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
    var userAccount = $('.ls-sidebar .ls-area-account').length
    if(userAccount === 1){
      $('.ls-sidebar').addClass('ls-area-account-active')
    }
  }

  function notificationVerification() {
    var notificationBar = $('.ls-notification');

    if(notificationBar.length === 1){
      $('.ls-topbar').append('<span class="ls-show-notifications ls-ico-question"/>')
    }
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
