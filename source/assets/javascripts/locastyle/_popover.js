var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    module       : '[data-ls-module="popover"]',
    idPopover    : '#ls-popover-',
    popoverClass : '.ls-popover',
    trigger      : 'click',
    events: {
      clickAnywhere: 'click.clickanywhere',
      opened: 'popover:opened',
      closed: 'popover:closed',
      destroyed: 'popover:destroyed'
    }
  }

  function init() {
    clickAnywhereClose();
    bindPopover();
    startOpened();
  }

  // When click or hover elements, show the popovers
  function bindPopover() {
    $(config.module).each(function(index, popoverTrigger) {
      var trigger = $(popoverTrigger).attr('data-trigger') === 'hover' ? 'mouseover' : config.trigger;

      // Add attr data-target to popover triggers
      $(popoverTrigger).attr('data-target', config.idPopover+index);
      var popoverTarget = $(popoverTrigger).data('target');

      $(popoverTrigger).on(trigger, function(event) {
        event.preventDefault();
        event.stopPropagation();

        if ($(popoverTarget).hasClass('ls-active')) {
          hide(popoverTarget);
        } else {
          if (!$(config.idPopover+index).length) {
            buildPopover(index, popoverTrigger);
          }

          show(popoverTarget);
          clickAnywhereClose(popoverTarget)
        }

        if (trigger === 'mouseover') {
          $(popoverTrigger).on('mouseout', function() {
            hide(popoverTarget);
          });
        }

        // Define position of popovers based on his triggers
        setPosition(popoverTrigger);
      });

      $(window).on('breakpoint-updated', function(){
        setPosition(popoverTrigger);
      });
    });

  }

  // If popover was not created, we build the HTML using a template
  function buildPopover(index, popoverTrigger) {
    var data = {
      index        : index,
      title        : $(popoverTrigger).data('title'),
      content      : $(popoverTrigger).data('content'),
      placement    : $(popoverTrigger).data('placement'),
      customClasses: $(popoverTrigger).data('custom-class')
    }

    $('body').append(locastyle.templates.popover(data));

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
        break;
      default:
      case 'top':
        $(data.target).css({
          top : data.top  -=  12,
          left: data.left += (data.width/2 + 4)
        });

    }

  }

  // Show called popover
  function show(target) {
    $(target).addClass('ls-active');
    $(target).off(config.events.closed).trigger(config.events.opened);
  }

  // Hide all or visible popovers
  function hide(target) {
    $(target || '.ls-popover.ls-active').removeClass('ls-active');
    $(target).trigger(config.events.closed).off(config.events.opened);

    if(!$('.ls-popover.ls-active').length) {
      $(document).off(config.events.clickAnywhere);
    }

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

  function clickAnywhereClose(target) {
    $(document).on(config.events.clickAnywhere, function(event){
      if(!$(event.target).parents('.ls-popover').length){
        hide(target);
      }
    });
  }

  // When open page, start popover automatically
  function startOpened() {
    $(config.module+'[data-ls-popover="open"]').each(function() {
      show($(this).data('target'));
    });
  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
