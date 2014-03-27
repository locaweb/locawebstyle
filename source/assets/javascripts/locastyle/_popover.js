var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  // Default config
  var config = {
    defaultContainer: 'body',
    defaultTrigger: 'click',
    defaultPlacement: 'top'
  }

  function init() {
    togglePopover();
  }

  function togglePopover(){
    // Get all popover with data-toggle popover
    // and send element and eventType to setAction() method
    $('[data-toggle="popover"]').each(function(index, element){
      var dataTrigger = $(element).data("trigger");

      // If element dont have data-trigger use default config
      if(dataTrigger == undefined)
        dataTrigger = config.defaultTrigger;

      // If trigger is hover set mouseenter else, set click
      var eventType = dataTrigger == 'hover' ? 'mouseenter' : 'click'

      var elementActions = {
        'element': element,
        'eventType': eventType
      }

      // setAction to element, click or hover
      setAction(elementActions);
    })
  }

  function setAction(elementActions){

    var element = elementActions.element
    var eventType = elementActions.eventType

    $(element).on(eventType, function(event){
      // Remove popover when init
      destroyPopover();
      event.preventDefault();
      event.stopPropagation();

      // Declare variables to data usage on popover
      var title, content, placement, container, customClasses

      // Assigns values to variables
      title = $(element).data("title");
      content = $(element).data("content");
      placement = $(element).data("placement");
      container = $(element).data("container");
      customClasses = $(element).data("custom-class");

      // Check is data-title exists, if doesn't exists use attribute title
      if(title == undefined)
        var title = $(element).attr("title");

      // If element dont have data-placement  use default config
      if(container == undefined)
        container = config.defaultContainer;

      // If element dont have data-placement  use default config
      if(placement == undefined)
        placement = config.defaultPlacement;

      var constructPopover = {
        'element': element,
        'title': title,
        'content': content,
        'placement': placement,
        'container': container,
        'customClasses': customClasses
      }

      buildPopover(constructPopover)
    });
    // If eventType is hover when mouse out of element call method destroyPopover()
    if(eventType == 'mouseenter'){
      $(element).on('mouseleave', function(){
        // Remove popover when mouse out
        destroyPopover();
      })
    }
  }

  // Create a popover
  function buildPopover(constructPopover){

    var element = constructPopover.element
    var title = constructPopover.title
    var content = constructPopover.content
    var placement = constructPopover.placement
    var container = constructPopover.container
    var customClasses = constructPopover.customClasses

    // Return template popover
    $(container).append(locastyle.templates.popover(title, content, placement, customClasses));

    var elementPosition = {
      'element': element,
      'placement': placement,
      'container': container
    }

    // Call this method to create popover close enough of your parent
    getElementPosition(elementPosition);
  }


  // Get position of data-toggle
  function getElementPosition(elementPosition){
    var element = elementPosition.element
    var placement = elementPosition.placement
    var container = elementPosition.container

    var width, height, top, left, setTop, setSide, leftPlacement, topPlacement

    // Get width and height of element
    // Use outer to get exactly size
    width = $(element).outerWidth();
    height = $(element).outerHeight();

    // If container is body use offset to get position
    // Else use position
    if(container == 'body'){
      top = $(element).offset().top;
      left = $(element).offset().left;
    }else{
      top = $(element).position().top;
      left = $(element).position().left;
    }

    setSide = left;
    setTop = top;
    leftPlacement;
    topPlacement;

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

    var popoverPosition = {
      'setTop': setTop,
      'setSide': setSide,
      'leftPlacement': leftPlacement,
      'topPlacement': topPlacement
    }

    // Set popover position
    setPopoverPosition(popoverPosition);
  }

  // Set popover position close element
  function setPopoverPosition(popoverPosition){
    $(".ls-popover").css({'position':'absolute', 'top': popoverPosition.setTop+"px", 'left': popoverPosition.setSide+"px", "z-index": "4"});
    if(popoverPosition.leftPlacement){
      $(".ls-popover").css({'left': (popoverPosition.setSide)-($(".ls-popover").width())+"px"});
    }
    if(popoverPosition.topPlacement){
      $(".ls-popover").css({'top': (popoverPosition.setTop)-($(".ls-popover").height())+"px"});
    }
  }

  // Destroy popover, only one popover created by time
  function destroyPopover(){
    $(".ls-popover").remove()
  }

  // Set method as public
  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
