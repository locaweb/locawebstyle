var locastyle = locastyle || {};

locastyle.topbarCurtain = (function() {
  'use strict';

  function init() {
    positionTarget();
  }

  function positionTarget() {
    $("[data-ls-module='topbarCurtain']").each(function (index, item){
      var rightDistance = $(item).position().left - $(window).width();
      var iconWidth = (22/ 2);
      var curtainWidth = $($(item).data("target")).width() / 2;

      $($(item).data("target")).css({left: rightDistance - curtainWidth + iconWidth + "px"});

      bindTopCurtainTrigger(item);
    });
  }

  function bindTopCurtainTrigger(trigger) {
    $(trigger).on("click", function(){
      showCurtain($(trigger).data("target"));
    });
  }

  function showCurtain(curtain) {
    $(curtain).addClass("active");
  }

  return {
    init: init
  }

}());
