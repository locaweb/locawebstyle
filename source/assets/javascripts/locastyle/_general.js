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

    $showHide.on('click touchstart', function(){
      $html.toggleClass('sidebar-visible');
    });
  }

  return {
    init:init
  };

}());
