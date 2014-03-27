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

      if(dataTrigger == undefined)
        dataTrigger = config.defaultTrigger;

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

      if(container == undefined)
        container = config.defaultContainer;

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

    var width, height, top, left, setTop, setSide, leftPlacement, topPlacement

    width = $(element).outerWidth();
    height = $(element).outerHeight();

    if(container == 'body'){
      top = $(element).offset().top;
      left = $(element).offset().left;
    }else{
      top = $(element).position().top;
      left = $(element).position().left;
    }

    setSide = left;
    setTop = top;

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

    setPopoverPosition(popoverPosition);
  }

  function setPopoverPosition(popoverPosition){
    $(".ls-popover").css({'top': popoverPosition.setTop+"px", 'left': popoverPosition.setSide+"px"});
    if(popoverPosition.leftPlacement){
      $(".ls-popover").css({'left': (popoverPosition.setSide)-($(".ls-popover").width())+"px"});
    }
    if(popoverPosition.topPlacement){
      $(".ls-popover").css({'top': (popoverPosition.setTop)-($(".ls-popover").height())+"px"});
    }
  }

  function destroyPopover(){
    $(".ls-popover").remove()
  }

  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
