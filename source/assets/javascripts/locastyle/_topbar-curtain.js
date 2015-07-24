var locastyle = locastyle || {};

locastyle.topbarCurtain = (function() {
  'use strict';

  var config = {
    module: '[data-ls-module="topbarCurtain"]'
  };

  function init() {
    unbind();
    positionTarget();
    bindCloseCurtains();
    bindPreventClosing();
    repositionOnResize();
    updateStatusCounter();
    cloneDropdownToSidebar();
  }

  function unbind() {
    $(config.module).off("click.ls, ls.toggleTopCurtain");
    $(".ls-notification-list").off("click.ls");
    $("body").off("click.lsTopCurtain");
  }

  function updateStatusCounter(){
    $(config.module).each(function(index, element){
      var elem = $(element).data('target');
      var _counter = $(elem+ ' .ls-dismissable:not(.ls-dismissed)').length;
      if(_counter !== 0) {
        $('[data-target="'+elem+'"]').attr('data-counter', _counter);
      }
      if(_counter === 0){
        $('[data-target="'+elem+'"]').removeAttr('data-counter');
        $(elem + ' .ls-no-notification-message').addClass('active');
      }
    });
  }

  function positionTarget() {
    $(config.module).each(function (index, item){
      var leftDistance = $(item).position().left;
      var iconWidth = (22/ 2);
      var curtainWidth = $($(item).data("target")).width() / 2;

      var ua = window.navigator.userAgent;
      var msie = ua.indexOf('MSIE ');
      var trident = ua.indexOf('Trident/');

      if (msie > 0 || trident > 0) {
        $($(item).data("target")).css({left: (leftDistance + iconWidth) - curtainWidth  + "px", top: "60px"});
      } else {
        $($(item).data("target")).css({left: (leftDistance + iconWidth) + curtainWidth  + "px"});
      }

      bindTopCurtainTrigger(item);
    });
  }

  function bindPreventClosing() {
    $(".ls-notification-list").on("click.ls", function(evt) {
      evt.stopPropagation();
    });
  }

  function bindCloseCurtains() {
    $("body").on("click.lsTopCurtain", function () {
      hideCurtains();
    });
  }

  function bindTopCurtainTrigger(trigger) {
    $(trigger).on("click.ls, ls.toggleTopCurtain", function(evt){
      evt.stopPropagation();
      var targetState = $($(trigger).data("target")).hasClass("ls-active");
      hideCurtains();
      if(!targetState) {
        $(trigger).addClass("ls-active");
        showCurtain($(trigger).data("target"));
      }
    });
  }

  function showCurtain(curtain) {
    $(curtain).addClass("ls-active");
    locastyle.dropdown.closeDropdown();
  }

  function hideCurtains() {
    $("[data-ls-module='topbarCurtain']").removeClass("ls-active");
    $(".ls-notification-list").removeClass("ls-active");
  }

  function repositionOnResize() {
    var repositionTarget;
    $(window).resize(function() {
      clearTimeout(repositionTarget);
      repositionTarget = setTimeout(function() {
        unbind();
        positionTarget();
        bindCloseCurtains();
        bindPreventClosing();
      }, 300);
    });
  }

  function cloneDropdownToSidebar() {
    var $userAccountTopbar = $('.ls-topbar .ls-user-account');
    if ( !$('.ls-sidebar .ls-user-account').length ) {
      $userAccountTopbar.clone().prependTo('.ls-sidebar');
    }
  }

  return {
    init: init,
    hideCurtains: hideCurtains,
    unbind: unbind,
    updateStatusCounter: updateStatusCounter
  };

}());
