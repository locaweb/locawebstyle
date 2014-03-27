var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

  function init() {

    // $(config.selector).each(function(i, collapse){
    //   console.log(collapse);
    // });

    showSidebar();

  }

  function showSidebar() {
    var $showHide = $('.show-sidebar');
    var $html = $('html');

    $showHide.on('touchstart click', function(evt){
      $html.toggleClass('sidebar-visible');
      evt.preventDefault();
    });
  }

  return {
    init:init
  };

}());
