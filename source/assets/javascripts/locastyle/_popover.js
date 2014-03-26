var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    defaultContainer: '.popovers'
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
    var width = $(element).outerWidth();
    var height = $(element).outerHeight();
    var top = $(element).position().top;
    var left = $(element).position().left;
    var setSide = left;
    var setTop = top;
    var leftPlacement = false;
    var topPlacement = false;


    if(placement == 'top')
      topPlacement = true;
      setTop = top

    if(placement == 'bottom')
      setTop = (top+height)

    if(placement == 'left')
      leftPlacement = true;
      setSide = left

    if(placement == 'right')
      setSide = (left+width)

    setPopoverPosition(setTop, setSide, leftPlacement, topPlacement);
  }

  //Create a popover
  function buildPopover(element, title, content, placement){
    //Return template popover
    $(config.defaultContainer).append(locastyle.templates.popover(title, content, placement));

    //Call this method to create popover close enough of your parent
    getElementPosition(element, placement);
  }

  //Create a popover close element
  function setPopoverPosition(top, left, leftPlacement, topPlacement){
    $(".ls-popover").css({'position':'absolute', 'top': top+"px", 'left': left+"px", "background": "purple", "z-index": "4"});
    if(leftPlacement){
      $(".ls-popover").css({'left': (left)-($(".ls-popover").width())+"px"});
    }
    if(topPlacement){
      $(".ls-popover").css({'top': (top)-($(".ls-popover").height())+"px"});
    }
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
