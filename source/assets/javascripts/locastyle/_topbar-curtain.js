var locastyle = locastyle || {};

locastyle.topbarCurtain = (function() {
  'use strict';

  function init() {
    unbind();
    positionTarget();
    bindCloseCurtains();
    bindPreventClosing();
  }

  function unbind() {
    $("[data-ls-module='topbarCurtain']").off("click.ls");
    $(".ls-notification-list").off("click.ls");
    $("body").off("click.lsTopCurtain");
  }

  function positionTarget() {
    $("[data-ls-module='topbarCurtain']").each(function (index, item){
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
    })
  }

  function bindCloseCurtains() {
    $("body").on("click.lsTopCurtain", function () {
      hideCurtains();
    });
  }

  function bindTopCurtainTrigger(trigger) {
    $(trigger).on("click.ls", function(evt){
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

  return {
    init: init,
    hideCurtains: hideCurtains,
    unbind: unbind
  }

}());
