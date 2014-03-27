var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  // Default config
  var config = {
    defaultContainer: 'body',
    defaultTrigger  : 'click',
    defaultPlacement: 'top'
  }

  function init() {
    loadElements();
  }

  function loadElements(){
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
      setElementAction(elementActions);
    })
  }

  function setElementAction(elementActions){
    var element   = elementActions.element
    var eventType = elementActions.eventType
    $(element).on(eventType, function(event){
      destroyPopover();
      event.preventDefault();
      event.stopPropagation();

      var title, content, placement, container, customClasses

      title         = $(element).data("title");
      content       = $(element).data("content");
      placement     = $(element).data("placement");
      container     = $(element).data("container");
      customClasses = $(element).data("custom-class");

      if(container == undefined){ container = config.defaultContainer; }
      if(placement == undefined){ placement = config.defaultPlacement; }

      var constructPopover = {
        'element'      : element,
        'title'        : title,
        'content'      : content,
        'placement'    : placement,
        'container'    : container,
        'customClasses': customClasses
      }

      buildPopover(constructPopover)
    });
    if(eventType == 'mouseenter'){
      $(element).on('mouseleave', function(){ destroyPopover(); })
    }
  }

  // Create a popover
  function buildPopover(constructPopover){

    var element, title, content, placement, container, customClasses

    element       = constructPopover.element
    title         = constructPopover.title
    content       = constructPopover.content
    placement     = constructPopover.placement
    container     = constructPopover.container
    customClasses = constructPopover.customClasses

    // Return template popover
    $(container).append(locastyle.templates.popover(title, content, placement, customClasses));

    var elementPosition = {
      'element'  : element,
      'placement': placement,
      'container': container
    }
    getElementPosition(elementPosition);
  }

  function getElementPosition(elementPosition){
    var elementWidth, elementHeight, top, left, setTop, setSide, leftPlacement, topPlacement, element, placement, container

    element       = elementPosition.element
    placement     = elementPosition.placement
    container     = elementPosition.container
    elementWidth  = $(element).outerWidth();
    elementHeight = $(element).outerHeight();

    if(container == 'body'){
      top  = $(element).offset().top;
      left = $(element).offset().left;
    }else{
      top  = $(element).position().top;
      left = $(element).position().left;
    }

    setSide = left;
    setTop  = top;

    if(placement == 'top'){
      topPlacement = true;
      setTop = top
    }

    if(placement == 'bottom'){
      setTop = (top+elementHeight)
    }

    if(placement == 'left'){
      leftPlacement = true;
      setSide       = left
    }

    if(placement == 'right'){
      setSide = (left+elementWidth)
    }

    var popoverPosition = {
      'setTop'       : setTop,
      'placement'    : placement,
      'setSide'      : setSide,
      'leftPlacement': leftPlacement,
      'topPlacement' : topPlacement,
      'elementWidth' : elementWidth,
      'elementHeight': elementHeight
    }

    setPopoverPosition(popoverPosition);
  }

  function setPopoverPosition(popoverPosition){

    var positionWithTop  = (popoverPosition.setTop-$(".ls-popover").height()/2+popoverPosition.elementHeight/2);
    var positionWithLeft = (popoverPosition.setSide-$(".ls-popover").width()/2+popoverPosition.elementWidth/2);

    var _default = {
      top   : {
        css   : 'top',
        value : positionWithTop,
        adjust: {'left': positionWithLeft},
        add   : {'top': (popoverPosition.setTop-$(".ls-popover").height())}
      },
      right : {
        css   : 'left',
        value : (popoverPosition.setSide),
        adjust: {'top': positionWithTop}
      },
      bottom: {
        css   : 'top',
        value : (popoverPosition.setTop),
        adjust: {'left': positionWithLeft}
      },
      left  : {
        css   : 'left',
        value : (popoverPosition.setSide-$(".ls-popover").width()),
        adjust: {'top': positionWithTop},
        add   : {'left': (popoverPosition.setSide-$(".ls-popover").width()), 'top': positionWithTop}
      }
    }

    $(".ls-popover")
                    .css(  _default[popoverPosition.placement].css , _default[popoverPosition.placement].value )
                    .css(_default[popoverPosition.placement].adjust);
    if( _default[popoverPosition.placement].add ){
      $(".ls-popover").css(  _default[popoverPosition.placement].add  );
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
