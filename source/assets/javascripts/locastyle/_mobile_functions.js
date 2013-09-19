var locastyle = locastyle || {};

locastyle.mobile = (function() {
  'use strict';

  function init(){
    mobileLeftBar();
    mobileRightBar();
    mobileBarOverlay();
  }

  function mobileLeftBar() {
    $('.control-menu').on('click', function(){
      $('html').removeClass('right-bar').toggleClass('left-bar');
    });
  }

  function mobileRightBar() {
    $('.control-sidebar').on('click', function(){
      $('html').toggleClass('right-bar').removeClass('left-bar');
    });
  }

  function mobileBarOverlay() {
    $('body').append('<span class="overlay-bar"></span>');

    $('.overlay-bar').on('click', function(){
      $('html').removeClass('right-bar').removeClass('left-bar');
    });

  }

  return {
    init: init,
    mobileLeftBar: mobileLeftBar,
    mobileRightBar: mobileRightBar
  };

}());
