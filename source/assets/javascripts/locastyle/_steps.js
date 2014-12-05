var locastyle = locastyle || {};

locastyle.steps = (function() {
  'use strict';

  function init() {
    stepsAffix();
  }

  function stepsAffix() {
    var $steps   = $(".ls-steps-list");
    var offset    = $steps.offset();
    var marginTop = 20;
    $(window).scroll(function() {
     if ($(window).scrollTop() > offset.top) {
       $steps.stop().animate({
         marginTop: $(window).scrollTop() - offset.top + marginTop
       });
     } else {
       $steps.stop().css({
         marginTop: 0
       });
     };
    });
  }

  return {
    init: init
  };

}());
