var locastyle = locastyle || {};

locastyle.carousel = (function() {
  'use strict';

  function init(){
    counter();
  }

  function counter() {
    $.each($(".carousel"), function() {
      var items = $(".carousel-inner", this).children().size();
      $(".carousel-nav i", this).html(items);
      $(this).on('slid', function() {
        $(this).find(".carousel-nav b").html($(this).find(".active").index() + 1);
      });
    });
  }

  return {
    init: init
  };

}());
