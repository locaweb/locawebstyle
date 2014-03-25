var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  function init(dom_scope) {
    getPopover();
  }

  function getPopover(){
    $('[data-toggle="popover"]').each(function(i,e){
      var dataTrigger = $(this).data("trigger");
      var eventType = dataTrigger == 'hover' ? 'mouseenter' : 'click'
      $(e).on(eventType, function(e){
        e.preventDefault();

        var title = $(this).data("title");
        var content = $(this).data("content");
        locastyle.templates.popover($(this), title, content);

      })
    })
  }

  function show(){

  }

  function hide(){

  }

  return {
    init: init
  }

}());
