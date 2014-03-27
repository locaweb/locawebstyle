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
    $('[data-toggle="popover"]').each(function(index, element){
      var dataTrigger = $(element).data("trigger");

      if(dataTrigger == undefined){
        dataTrigger = config.defaultTrigger;
      }

      var eventType = dataTrigger == 'hover' ? 'mouseenter' : 'click'

      var elementActions = {
        'element': element,
        'eventType': eventType
      }

      setAction(elementActions);
    })
  }

  function setAction(elementActions){

    var element = elementActions.element
    var eventType = elementActions.eventType

    $(element).on(eventType, function(event){
      destroyPopover();
      event.preventDefault();
      event.stopPropagation();

      var title, content, placement, container, customClasses

      title = $(element).data("title");
      content = $(element).data("content");
      placement = $(element).data("placement");
      container = $(element).data("container");
      customClasses = $(element).data("custom-class");

      if(container == undefined){
        container = config.defaultContainer;
      }

      if(placement == undefined){
        placement = config.defaultPlacement;
      }

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
    if(eventType == 'mouseenter'){
      $(element).on('mouseleave', function(){
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
    getElementPosition(elementPosition);
  }

  function getElementPosition(elementPosition){
    var element = elementPosition.element
    var placement = elementPosition.placement
    var container = elementPosition.container

    var elementWidth, elementHeight, top, left, setTop, setSide, leftPlacement, topPlacement

    elementWidth = $(element).outerWidth();
    elementHeight = $(element).outerHeight();

    if(container == 'body'){
      top = $(element).offset().top;
      left = $(element).offset().left;
    }else{
      top = $(element).position().top;
      left = $(element).position().left;
    }

    setSide = left;
    setTop = top;

    if(placement == 'top'){
      topPlacement = true;
      setTop = top
    }

    if(placement == 'bottom'){
      setTop = (top+elementHeight)
    }

    if(placement == 'left'){
      leftPlacement = true;
      setSide = left
    }

    if(placement == 'right'){
      setSide = (left+elementWidth)
    }

    var popoverPosition = {
      'setTop': setTop,
      'placement': placement,
      'setSide': setSide,
      'leftPlacement': leftPlacement,
      'topPlacement': topPlacement,
      'elementWidth': elementWidth,
      'elementHeight': elementHeight
    }

    setPopoverPosition(popoverPosition);
  }

  function setPopoverPosition(popoverPosition){

    if(popoverPosition.placement == 'left'){
      $(".ls-popover").css({'left': (popoverPosition.setSide-$(".ls-popover").width())+'px'});
      fixVertical(popoverPosition);
    }

    if(popoverPosition.placement == 'top'){
      $(".ls-popover").css({'top': (popoverPosition.setTop-$(".ls-popover").height()/2+popoverPosition.elementHeight/2)+'px'});
      fixHorizontal(popoverPosition);
    }

    if(popoverPosition.placement == 'bottom'){
      $(".ls-popover").css({'top': (popoverPosition.setTop)+'px'});
      fixHorizontal(popoverPosition);
    }

    if(popoverPosition.placement == 'right'){
      $(".ls-popover").css({'left': (popoverPosition.setSide)+'px'});
      fixVertical(popoverPosition);
    }

    if(popoverPosition.topPlacement) {
      $(".ls-popover").css({'top': (popoverPosition.setTop-$(".ls-popover").height())+'px'});
    }

    if(popoverPosition.leftPlacement){
      $(".ls-popover").css({'left': (popoverPosition.setSide-$(".ls-popover").width())+'px', 'top': (popoverPosition.setTop-$(".ls-popover").height()/2+popoverPosition.elementHeight/2)+'px'});
    }
  }

  function fixVertical(popoverPosition) {
    $(".ls-popover").css({'top': (popoverPosition.setTop-$(".ls-popover").height()/2+popoverPosition.elementHeight/2)+'px'});
  }

  function fixHorizontal(popoverPosition) {
    $(".ls-popover").css({'left': (popoverPosition.setSide-$(".ls-popover").width()/2+popoverPosition.elementWidth/2)+'px'});
  }

  function destroyPopover(){
    $(".ls-popover").remove()
  }

  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
