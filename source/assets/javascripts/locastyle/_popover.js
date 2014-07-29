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
    uniqueId     : 0
  }

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
    plugin();
  }

  function plugin () {
    $.fn.lsPopover = function(action){
      if(action === undefined){
        createPopover(this);
      }
      else{
        var elementData = this.data(),
        $popover = $(config.idPopover + elementData.uniqueId);
        if(action === 'show'){
          $popover.show();
        }
        if(action === 'hide'){
          $popover.hide();
        }
        if(action === 'destroy'){
          destroy(this, $popover)
        }
      }
    }
  }

  function updateBreakpoint (argument) {
    $(window).on("breakpoint-updated", function () {
      destroy();
      init();
    });
  }

  function createPopover ($elem) {
    var elementData = $elem.data(),
        width  = $elem.outerWidth(),
        height = $elem.outerHeight();
    $elem.data('uniqueId', config.uniqueId);
    elementData.position  = elementData.container ? $elem.position() : $elem.offset() ;
    elementData.container = elementData.container || config.container;
    elementData.placement = elementData.placement || config.placement;
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
    elementData.uniqueId = config.uniqueId++;
    $(elementData.container).append(locastyle.templates.popover(elementData));
    bindActions($elem, elementData);
  }

  function bindActions ($elem, elementData) {
    var trigger = elementData.trigger == 'hover' ? config.hoverEvent : config.trigger,
        $popover = $(config.idPopover + elementData.uniqueId);
    if(trigger === config.hoverEvent){
      $elem.on({
        mouseenter: function (event) {
          event.preventDefault();
          $popover.stop().show();
        },
        mouseleave: function (event) {
          event.preventDefault();
          $popover.stop().hide();
        }
      });
    } else {
      $elem.on({
        click: function (event) {
          event.preventDefault();
          event.stopPropagation();
          $popover.stop().toggle();
        }
      });
      $(document).on('click', function (event) {
        var element = event.toElement;
        if(!$(element).parents().hasClass( config.popoverClass )){
         $('.' + config.popoverClass).hide();
        }
      })
    }    
  }

  function destroy($elem, $popover) {
    if($popover){
      var $remPopover = $popover;
    }else{
      var $remPopover = $('.' + config.popoverClass);
    }
    $remPopover.remove();
    if($elem){
      var $triggers = $elem;
    } else{
      var $triggers = $(config.module);
    }
    $triggers.each(function  (index, elem) {
      $(elem)
        .removeData('uniqueId')
        .off(config.hoverEvent)
        .off(config.trigger);
    });
  }

  return {
    init: init,
    destroyPopover: destroy
  }

}());
