var locastyle = locastyle || {};

locastyle.topbarCurtain = (function() {
  'use strict';

  function init() {
    positionTarget();
  }

  function positionTarget () {
    $("[data-ls-module='topbarCurtain']").each(function (index, item){
      var rightDistance = $(item).position().left - $(window).width();
      var iconWidth = $(item).width() / 2;
      var curtainWidth = $($(item).data("target")).width() / 2;
      $($(item).data("target")).css({left: rightDistance - curtainWidth - iconWidth + "px"});
    });
  }

  return {
    init: init
  }

}());
