var lsexample = (function() {
  'use strict';

  function init() {
    activeMenu();
  }

  function activeMenu() {
    var $itemActive = $( '[href="' + window.location.pathname + '"]', '.ls-menu' );
    $itemActive.parents('.ls-submenu').children('a').trigger('click');
    $itemActive.parent('li').addClass('ls-active');
  }

  return {
    init:init
  };

}());

$(window).load(function() {
  lsexample.init();
});
