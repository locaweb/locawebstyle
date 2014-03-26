var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    defaultContainer: 'body'
  }

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
      //Remove popover when init
      destroyPopover();

      event.preventDefault();
      event.stopPropagation();

      //Declare variables to data usage on popover
      var title = $(element).data("title");
      var content = $(element).data("content");
      var placement = $(element).data("placement");

      buildPopover(element, title, content, placement)

    });
    if(eventType == 'mouseenter'){
      $(element).on('mouseleave', function(){
        // Remove popover when mouse out
        destroyPopover();
      })
    }
  }

  // Get position of data-toggle
  function getElementPosition(element, placement){
    var width = $(element).width();
    var height = $(element).height();
    var top = $(element).position().top;
    var left = $(element).position().left;
    var setTop = placement == 'top' ? (top-height-10) : (top+height+10)
    setPosition(setTop, left);
  }

  function buildPopover(element, title, content, placement){
    //Return template popover
    $(config.defaultContainer).append(locastyle.templates.popover(title, content, placement));
    getElementPosition(element, placement);
  }

  function setPosition(top, left){
    $(".ls-popover").css({'position':'absolute', 'top': top+"px", 'left': left+"px", "background": "yellow"});
  }



  //Destroy popover
  function destroyPopover(){
    $(".ls-popover").remove()
  }

  return {
    init: init
  }

}());
