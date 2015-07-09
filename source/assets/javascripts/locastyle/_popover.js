var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    container    : 'body',
    hoverEvent   : 'mouseenter.ls.popover',
    idPopover    : '#ls-popover-',
    module       : '[data-ls-module="popover"]',
    placement    : 'top',
    trigger      : 'click.ls.popover',
    popoverClass : 'ls-popover',
    activeClass  : 'ls-active',
    uniqueId     : 0
  };

  function init() {
    if(/sm|xs/.test(locastyle.breakpointClass)){
      $(config.module).attr('data-ls-module', 'modal').removeAttr('data-trigger');
      locastyle.modal.init();
    } else{
      $(config.module).each(function  (index, elem) {
        createPopover($(elem));
      });
    }
    updateBreakpoint();
  }

  function updateBreakpoint() {
    $(window).on("breakpoint-updated", function () {
      destroy();
      init();
    });
  }

  function createPopover($elem) {
    var elementData = $elem.data(),
        width  = $elem.outerWidth(),
        height = $elem.outerHeight();
    $elem.data('uniqueId', config.uniqueId);
    elementData.position  = elementData.container ? $elem.position() : $elem.offset() ;
    elementData.container = elementData.container || config.container;
    elementData.placement = elementData.placement || config.placement;
    setPositionData(elementData, width, height);
    elementData.uniqueId = config.uniqueId++;
    $(elementData.container).append(locastyle.templates.popover(elementData));
    bindActions($elem, elementData, width, height);
  }

  function setPositionData(elementData, width, height) {
    switch (elementData.placement) {
      case 'top':
        elementData.position.top -=  12;
        elementData.position.left +=  (width/2 + 4);
        break;
      case 'right':
        elementData.position.top +=  (height/2 -2);
        elementData.position.left += (width + 12);
        break;
      case 'bottom':
        elementData.position.top += (height + 12);
        elementData.position.left +=  (width/2 + 4);
        break;
      case 'left':
        elementData.position.top +=  (height/2 -2 );
        elementData.position.left -= 12;
    }
  }

  function updateElementPosition($popover, elementData) {
    $popover.css("top", elementData.position.top).css("left", elementData.position.left);
  }

  function bindActions($elem, elementData, width, height) {
    var trigger = elementData.trigger === 'hover' ? config.hoverEvent : config.trigger,
        $popover = $(config.idPopover + elementData.uniqueId);
    if(trigger === config.hoverEvent){
      $elem.on({
        mouseenter: function(event) {
          event.preventDefault();
          elementData.position = $(this).offset() ;
          setPositionData(elementData, width, height);
          updateElementPosition($popover, elementData);
          open($popover);
        },
        mouseleave: function (event) {
          event.preventDefault();
          close($popover);
        }
      });
    } else {
      $elem.on({
        click: function(event) {
          event.preventDefault();
          event.stopPropagation();
          elementData.position = $(this).offset() ;
          setPositionData(elementData, width, height);
          updateElementPosition($popover, elementData);
          if($popover.hasClass("ls-active")) {
            close($popover);
          } else {
            open($popover);
          }
        }
      });
      $(document).on('click', function(event) {
        var element = event.toElement;
        if(!$(element).parents().hasClass( config.popoverClass )){
          close($('.' + config.popoverClass));
        }
      });
    }
  }

  function open($popover) {
    $popover.addClass(config.activeClass).show();
    $popover.trigger('popover:opened');
  }

  function close($popover) {
    $popover.stop().removeClass(config.activeClass).hide();
    $popover.trigger('popover:closed');
  }

  function destroy() {
    $('.' + config.popoverClass).remove();
    $(config.module).each(function  (index, elem) {
      $(elem)
        .removeData('uniqueId')
        .off(config.hoverEvent)
        .off(config.trigger);
    });
  }

  return {
    init: init,
    destroyPopover: destroy
  };

}());
