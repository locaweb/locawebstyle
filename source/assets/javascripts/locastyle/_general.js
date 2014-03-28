var locastyle = locastyle || {};
locastyle.general = (function() {
  'use strict';

    var events = {
  }

  function init() {
    _loadEvents();
    showSidebar();
    subMenu();
  }

  function _loadEvents () {
    $.each(events, function (eventDesc,fn) {
      var selectorEvent = eventDesc.split('|')
      $(selectorEvent[0]).on(selectorEvent[1], selectorEvent[2], function(evt){
        var $this = $(this);
        fn(evt, $this);
      });
    });
  }

  function showSidebar() {
    var $showHide = $('.show-sidebar');
    var $html = $('html');

    $showHide.on('touchstart click', function(evt){
      $html.toggleClass('sidebar-visible');
      evt.preventDefault();
    });
  }

  function subMenu() {
    $('.ls-submenu > a').on('click', function(evt){
      $(this).parent().toggleClass('active');
      evt.preventDefault();
    })
  }

  return {
    init:init
  };

}());
