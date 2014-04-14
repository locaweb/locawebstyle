var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  // Default config
  var config = {
    defaultContainer: 'body',
    defaultTrigger: 'click',
    defaultPlacement: 'top',
    popoverClass: '.ls-popover',
    trigger: '[data-ls-module="popover"]'
  }

  function init() {
    unbind();
    $(config.trigger).each(function(index, element) {
      var dataTrigger = $(element).data("trigger");
      dataTrigger = dataTrigger || config.defaultTrigger
      bindAction({
        'element': element,
        'eventType': dataTrigger == 'hover' ? 'mouseenter.ls' : 'click.ls'
      });
    });
  }

  function bindAction(elementActions) {
    var element = elementActions.element;
    var eventType = elementActions.eventType;

    $(element).unbind(eventType);

    $(element).on(eventType, function(evt) {
      destroyPopover();
      evt.preventDefault();
      evt.stopPropagation();
      var elementData = $(element).data();
      elementData.container = elementData.container || config.defaultContainer;
      elementData.placement = elementData.placement || config.defaultPlacement;
      elementData.element = element;
      build(elementData, element);
    });

    if (eventType === 'mouseenter') {
      $(element).on('mouseleave', function() {
        destroyPopover();
      })
    }
  }

  // Create a popover
  function build(elementData, element) {
    // Return template popover
    $(elementData.container).append(locastyle.templates.popover(elementData));

    unbindPopoverTrigger(element);
    getTriggerPosition(elementData);
  }

  function getTriggerPosition(elementPosition) {
    var left,
    top,
    leftPlacement,
    setSide,
    setTop,
    topPlacement
    var element = elementPosition.element
    var placement = elementPosition.placement
    var container = elementPosition.container
    var elementWidth = $(element).outerWidth();
    var elementHeight = $(element).outerHeight();

    if (container == 'body') {
      top = $(element).offset().top;
      left = $(element).offset().left;
    } else {
      top = $(element).position().top;
      left = $(element).position().left;
    }


    var setSide = left;
    var setTop  = top;

    if(placement == 'top'){
      topPlacement = true;
      setTop = top
    }

    if (placement == 'bottom') {
      setTop = (top + elementHeight)
    }

    if (placement == 'left') {
      leftPlacement = true;
      setSide = left
    }

    if (placement == 'right') {
      setSide = (left + elementWidth)
    }

    setPopoverPosition({
      'setTop': setTop,
      'placement': placement,
      'setSide': setSide,
      'leftPlacement': leftPlacement,
      'topPlacement': topPlacement,
      'elementWidth': elementWidth,
      'elementHeight': elementHeight
    });
  }

  function setPopoverPosition(popoverPosition) {

    var positionWithTop = (popoverPosition.setTop - $(config.popoverClass).height() / 2 + popoverPosition.elementHeight / 2);
    var positionWithLeft = (popoverPosition.setSide - $(config.popoverClass).width() / 2 + popoverPosition.elementWidth / 2);

    var _default = {
      top: {
        css: 'top',
        value: positionWithTop,
        adjust: {
          'left': positionWithLeft
        },
        add: {
          'top':( popoverPosition.setTop - $(config.popoverClass).height())
        }
      },
      right: {
        css: 'left',
        value:( popoverPosition.setSide),
        adjust: {
          'top': positionWithTop
        }
      },
      bottom: {
        css: 'top',
        value:( popoverPosition.setTop),
        adjust: {
          'left': positionWithLeft
        }
      },
      left: {
        css: 'left',
        value:( popoverPosition.setSide - $(config.popoverClass).width()),
        adjust: {
          'top': positionWithTop
        },
        add: {
          'left':( popoverPosition.setSide - $(config.popoverClass).width()),
          'top': positionWithTop
        }
      }
    }

    $(config.popoverClass)
    .css(_default[popoverPosition.placement].css, _default[popoverPosition.placement].value)
    .css(_default[popoverPosition.placement].adjust);
    if (_default[popoverPosition.placement].add) {
      $(config.popoverClass).css(_default[popoverPosition.placement].add);
    }
  }

  function unbindPopoverTrigger(element) {
    if ($(config.popoverClass).is(":visible")) {
      $(element).on('click.ls', function() {
        destroyPopover();
        init();
      })
    }
  }

  function destroyPopover() {
    $(config.popoverClass).remove()
  }

  function unbind(){
    $(config.trigger).off('click.ls')
    $(config.trigger).off('mouseenter.ls')
  }

  return {
    init: init,
    destroyPopover: destroyPopover,
    unbind: unbind
  }

}());
