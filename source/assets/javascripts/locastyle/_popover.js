var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    module       : '[data-ls-module="popover"]',
    idPopover    : '#ls-popover-',
    popoverClass : '.ls-popover',
    trigger      : 'click',
    events: {
      opened: 'popover:opened',
      closed: 'popover:closed',
      destroyed: 'popover:destroyed'
    }
  }

  function init() {
    buildPopover();
    bindPopover();
  }

  // When click or hover elements, show the popovers
  function bindPopover() {
    $(config.module).each(function(index, popoverTrigger) {
      var trigger = $(popoverTrigger).attr('data-trigger') === 'hover' ? 'mouseover' : config.trigger;

      $(popoverTrigger).on(trigger, function() {
        var popoverTarget = $(popoverTrigger).data('target');

        if ($(popoverTarget).hasClass('ls-active')) {
          hide(popoverTarget);
        } else {
          setTimeout(function(){
            show(popoverTarget)
          },100);
          clickAnywhereClose(popoverTarget);
        }
        if (trigger === 'mouseover') {
          $(popoverTrigger).on('mouseout', function() {
            hide(popoverTarget);
          });
        }

      });
    });

  }

  // If popover was not created, we build the HTML using a template
  function buildPopover() {
    $(config.module).each(function(index, popoverTrigger) {

      // Add attr data-target to popover triggers
      $(popoverTrigger).attr('data-target', config.idPopover+index);

      if (!$(config.idPopover+index).length) {
        var data = {
          index        : index,
          title        : $(popoverTrigger).data('title'),
          content      : $(popoverTrigger).data('content'),
          placement    : $(popoverTrigger).data('placement'),
          customClasses: $(popoverTrigger).data('custom-class')
        }

        $('body').append(locastyle.templates.popover(data));

        // Define position of popovers based on his triggers
        setPosition(popoverTrigger);
      }
    });
  }

  // Define position of popovers
  function setPosition(popoverTrigger) {
    var data = {
        target    : $(popoverTrigger).data('target'),
        top       : $(popoverTrigger).offset().top,
        left      : $(popoverTrigger).offset().left,
        width     : $(popoverTrigger).outerWidth(),
        height    : $(popoverTrigger).outerHeight(),
        placement : $(popoverTrigger).data('placement')
    }

    // Define the position of popovers and your elements triggers
    switch (data.placement) {
      case 'top':
        $(data.target).css({
          top : data.top  -=  12,
          left: data.left += (data.width/2 + 4)
        });
        break;
      case 'right':
        $(data.target).css({
          top : data.top  += (data.height/2 -2),
          left: data.left += (data.width + 12)
        });
        break;
      case 'bottom':
        $(data.target).css({
          top : data.top  += (data.height + 12),
          left: data.left += (data.width/2 + 4)
        });
        break;
      case 'left':
        $(data.target).css({
          top : data.top  += (data.height/2 -2 ),
          left: data.left -= 12
        });
    }

  }

  function clickAnywhereClose(popoverTarget) {
    $(document).on('click.ls', function(evt){
      if ($(popoverTarget).is(':visible') && !$(evt.target).parents(popoverTarget).length) {
        hide('.ls-popover.ls-active');
      }
    });
  }

  // Show called popover
  function show(target) {
    $(target).addClass('ls-active');
    $(target).trigger(config.events.opened);
  }

  // Hide all or visible popovers
  function hide(target) {
    $(target || config.popoverClass+':visible').removeClass('ls-active');
    $(target).trigger(config.events.closed).unbind(config.events.opened);
  }

  // Destroy all created popovers
  function destroy() {
    $(config.popoverClass).remove();

    // Unbind all events.
    $.each(config.events, function(index, event) {
      $(document).unbind(event);
    });

    $(document).trigger(config.events.destroyed);
  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
