var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  // Default config
  var config = {
    defaultContainer: 'body',
    defaultTrigger  : 'click',
    defaultPlacement: 'top',
    popoverClass    : '.ls-popover'
  }

  function init() {
    bindPopover();
  }

  function bindPopover(){
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
      bindAction(elementActions);
    });
  }

  function bindAction(elementActions){
    var element   = elementActions.element;
    var eventType = elementActions.eventType;
    $(element).unbind(eventType);
    $(element).on(eventType, function(evt){
      destroyPopover();
      evt.preventDefault();
      evt.stopPropagation();
      var elementData = $(element).data();
      elementData.container  =  elementData.container || config.defaultContainer;
      elementData.placement  =  elementData.placement || config.defaultPlacement;
      elementData.element    = element;
      build(elementData);
    });

    if(eventType === 'mouseenter'){
      $(element).on('mouseleave', function(){ destroyPopover(); })
    }
  }

  // Create a popover
  function build(constructPopover){
    // Return template popover
    $(constructPopover.container).append(
      locastyle.templates.popover(
        constructPopover.title,
        constructPopover.content,
        constructPopover.placement,
        constructPopover.customClasses
        )
      );

    unBindClick(constructPopover.element);

    getTriggerPosition({
      'element'  : constructPopover.element,
      'placement': constructPopover.placement,
      'container': constructPopover.container
    });
  }

  function getTriggerPosition(elementPosition){
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

    var positionWithTop  = (popoverPosition.setTop-$(config.popoverClass).height()/2+popoverPosition.elementHeight/2);
    var positionWithLeft = (popoverPosition.setSide-$(config.popoverClass).width()/2+popoverPosition.elementWidth/2);

    var _default = {
      top   : {
        css   : 'top',
        value : positionWithTop,
        adjust: {'left': positionWithLeft},
        add   : {'top': (popoverPosition.setTop-$(config.popoverClass).height())}
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
        value : (popoverPosition.setSide-$(config.popoverClass).width()),
        adjust: {'top': positionWithTop},
        add   : {'left': (popoverPosition.setSide-$(config.popoverClass).width()), 'top': positionWithTop}
      }
    }

    $(config.popoverClass)
                    .css(  _default[popoverPosition.placement].css , _default[popoverPosition.placement].value )
                    .css(_default[popoverPosition.placement].adjust);
    if( _default[popoverPosition.placement].add ){
      $(config.popoverClass).css(  _default[popoverPosition.placement].add  );
    }
  }

  function unBindClick(element){
    if($(config.popoverClass).is(":visible")){
      $(element).on('click', function(){ destroyPopover(); bindPopover(); })
    }
  }

  function destroyPopover(){
    $(config.popoverClass).remove()
  }

  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
