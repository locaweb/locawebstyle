var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(){
    mobileLeftBar();
    mobileRightBar();
    mobileBarOverlay();
  }

  function mobileLeftBar() {
    $('.control-menu').on('click touchstart', function(e){
      $('html').removeClass('right-bar').toggleClass('left-bar');
      e.preventDefault();
    });
  }

  function mobileRightBar() {
    $('.control-sidebar').on('click touchstart', function(e){
      $('html').toggleClass('right-bar').removeClass('left-bar');
      e.preventDefault();
    });
  }

  function mobileBarOverlay() {
    $('body').append('<span class="overlay-bar"></span>');

    $('.overlay-bar').on('click touchstart', function(){
      $('html').removeClass('right-bar').removeClass('left-bar');
    });

  }

  return {
    init: init,
    mobileLeftBar: mobileLeftBar,
    mobileRightBar: mobileRightBar
  };

}());
