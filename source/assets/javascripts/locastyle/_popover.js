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
    var setSide = left;
    var setTop = top;

    if(placement == 'top')
      setTop =  (top-height-10)

    if(placement == 'bottom')
      setTop =  (top+height+10)

    if(placement == 'left')
      //184 fix popover size
      setSide =  (left-width)-(184/2-10)

    if(placement == 'right')
      setSide =  (left+width+10)

    setPopoverPosition(setTop, setSide);
  }

  //Create a popover
  function buildPopover(element, title, content, placement){
    //Return template popover
    $(config.defaultContainer).append(locastyle.templates.popover(title, content, placement));

    //Call this method to create popover close enough of your parent
    getElementPosition(element, placement);
  }

  //Create a popover close element
  function setPopoverPosition(top, left){
    $(".ls-popover").css({'position':'absolute', 'top': top+"px", 'left': left+"px", "background": "yellow"});
  }

  //Destroy popover
  function destroyPopover(){
    $(".ls-popover").remove()
  }

  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
