var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  function init() {
    getPopover();
  }

  function getPopover(){
    // Get all popover with data-toggle popover
    // and send element and eventType to setAction() method
    $('[data-toggle="popover"]').each(function(index, element){
      var dataTrigger = $(element).data("trigger");
      var eventType = dataTrigger == 'hover' ? 'mouseenter' : 'click'
      setAction(element, eventType);
    })
  }

  function setAction(element, eventType){
    $(element).on(eventType, function(event){
      //Hide popover when init
      hide();

      event.preventDefault();
      event.stopPropagation();

      //Declare variables to data usage on popover
      var title = $(element).data("title");
      var content = $(element).data("content");
      var placement = $(element).data("placement");

      //Return template popover
      $(element).append(locastyle.templates.popover(title, content, placement));
    }).on('mouseleave', function(){
      //Hide popover when mouse out
      hide();
    })
  }

  function show(){

  }

  function hide(){
    $(".ls-popover").hide()
  }

  return {
    init: init
  }

}());
