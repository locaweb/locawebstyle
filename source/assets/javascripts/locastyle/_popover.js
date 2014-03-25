var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  function init() {
    getPopover();
  }

  function getPopover(){
    $('[data-toggle="popover"]').each(function(index, element){
      var dataTrigger = $(element).data("trigger");
      var eventType = dataTrigger == 'hover' ? 'mouseenter' : 'click'
      setAction(element, eventType);
    })
  }

  function setAction(element, eventType){
    $(element).on(eventType, function(evt){
      evt.preventDefault();
      evt.stopPropagation();
      var title = $(element).data("title");
      var content = $(element).data("content");
      var placement = $(element).data("placement");
      locastyle.templates.popover($(element), title, content, placement)
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
