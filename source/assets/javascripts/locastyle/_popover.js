var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  // Defaults
  var defaults = {
    trigger      : 'click.ls',
    popoverClass : '.ls-popover',
    module       : '[data-ls-module="popover"]',
    openClass         : 'ls-popover-open',
    openEvent         : 'ls.popoverOpen'
  }

  function init() {
    destroyPopover();
    bindBreakpointUpdate();
    changeModuleName();

    $(defaults.module).each(function(index, element) {
      var dataTrigger = $(element).data("trigger");
      var eventType = [ (dataTrigger == 'hover' ? 'mouseenter.ls' : defaults.trigger), defaults.openEvent].join(' ');
      bindAction({
        'element'  : element,
        'eventType': eventType
      });
      $(this).hasClass(defaults.openClass) && $(this).trigger(defaults.openEvent);
    });
  }

  // Adiciona o bind de breakpoint-updated
  function bindBreakpointUpdate() {
    $(document).off("breakpoint-updated");
    $(document).on("breakpoint-updated", function () {
      changeModuleName();
    })
  }

  // Esse método é usado quando existir um popover em dispositivos móveis.
  function changeModuleName(){
    if(locastyle.breakpointClass == "ls-screen-sm" || locastyle.breakpointClass == "ls-screen-xs"){
      $(defaults.module).attr('data-ls-module', 'modal').removeAttr('data-trigger');
      locastyle.modal.init();
    }
  }

  function bindAction(elementActions) {
    var element   = elementActions.element;
    var eventType = elementActions.eventType;

    //unbind before binding an event
    $(element).off( eventType );

    $(element).on(eventType, function(evt) {
      destroyPopover();
      evt.preventDefault();
      evt.stopPropagation();
      var elementData = $(element).data();
      elementData.container = elementData.container || 'body';
      elementData.placement = elementData.placement || 'top';
      elementData.element   = element;
      build(elementData, element);
    });

    if (eventType === 'mouseenter.ls') {
      //unbind before binding an event
      $(element).off('mouseleave.ls');

      $(element).on('mouseleave.ls', function() {
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

  function getTriggerPosition(elementData) {
    var left, top, leftPlacement, setSide, setTop, topPlacement;
    var element         = elementData.element;
    var placement       = elementData.placement;
    var container       = elementData.container;
    var elementWidth    = $(element).outerWidth();
    var elementHeight   = $(element).outerHeight();
    var elementOffset   = $(element).offset();
    var elementPosition = $(element).position();

    if (container == 'body') {
      top  = elementOffset.top;
      left = elementOffset.left;
    } else {
      top  = elementPosition.top;
      left = elementPosition.left;
    }

    var setSide = left;
    var setTop  = top;

    if(placement == 'top'){
      topPlacement = true;
      setTop       = top;
    }

    if (placement == 'bottom') {
      setTop = (top + elementHeight);
    }

    if (placement == 'left') {
      leftPlacement = true;
      setSide       = left;
    }

    if (placement == 'right') {
      setSide = (left + elementWidth);
    }

    setPopoverPosition({
      'setTop'       : setTop,
      'placement'    : placement,
      'setSide'      : setSide,
      'leftPlacement': leftPlacement,
      'topPlacement' : topPlacement,
      'elementWidth' : elementWidth,
      'elementHeight': elementHeight
    });
  }

  function setPopoverPosition(popoverPosition) {

    var positionWithTop  = (popoverPosition.setTop - $(defaults.popoverClass).height() / 2 + popoverPosition.elementHeight / 2);
    var positionWithLeft = (parseInt(popoverPosition.setSide) - $(defaults.popoverClass).width() / 2 + popoverPosition.elementWidth / 2 + 10);

    var _default = {
      top: {
        css: 'top',
        value: positionWithTop,
        adjust: {
          'left': positionWithLeft
        },
        add: {
          'top':( popoverPosition.setTop - $(defaults.popoverClass).height())
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
        value:( popoverPosition.setSide - $(defaults.popoverClass).width()),
        adjust: {
          'top': positionWithTop
        },
        add: {
          'left':( popoverPosition.setSide - $(defaults.popoverClass).width()),
          'top': positionWithTop
        }
      }
    }

    $(defaults.popoverClass)
      .css(_default[popoverPosition.placement].css, _default[popoverPosition.placement].value)
      .css(_default[popoverPosition.placement].adjust);
    if (_default[popoverPosition.placement].add) {
      $(defaults.popoverClass).css(_default[popoverPosition.placement].add);
    }
  }

  function unbindPopoverTrigger(element) {
    if ($(defaults.popoverClass).is(":visible")) {
      $(element).on('click.ls', function() {
        init();
      })
    }
  }

  function destroyPopover() {
    $(defaults.popoverClass).remove();

    // Fecha o popover se clicar fora dele
    $('html').on('click.ls', function(event){
      var element = event.toElement;
      if(!$(element).parents().hasClass('ls-popover')){
       $(defaults.popoverClass).remove();
      }
    })

  }

  return {
    init: init,
    destroyPopover: destroyPopover
  }

}());
