var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    container    : 'body',
    module       : '[data-ls-module="popover"]',
    idPopover    : '#ls-popover-',
    popoverClass : '.ls-popover',
    trigger      : 'click',
    events: {
      created: 'popover:created',
      called: 'popover:called',
      builded: 'popover:builded',
      targetSetted: 'popover:hastarget',
      checkedExistence: 'popover:exist'
    }
  }

  function init() {
    bindPopover();
    setPosition();
    setTarget();
    buildPopover();
    checkExists();
  }

  // Check if popovers exists. If not, create that.
  function checkExists() {
    $(config.module).each(function(index, el) {
      if(!$(config.idPopover+index).length) {
        $(document).trigger(config.events.checkedExistence, [index, el]);
      }
    });
  }

  // Build the HTML of popovers using a template
  function buildPopover() {
    $(document).on(config.events.checkedExistence, function(event, index, popoverTrigger){
      var data = {
        index        : index,
        title        : $(popoverTrigger).data('title'),
        content      : $(popoverTrigger).data('content'),
        placement    : $(popoverTrigger).data('placement'),
        customClasses: $(popoverTrigger).data('custom-class')
      }
      $(config.container).append(locastyle.templates.popover(data));
      $(document).trigger(config.events.builded, [index, popoverTrigger]);
    });
  }

  // Define popover target that will be called
  function setTarget() {
    $(document).on(config.events.builded, function(event, index, popoverTrigger){
      $(popoverTrigger).attr('data-target', config.idPopover+index);
      $(document).trigger(config.events.targetSetted, [popoverTrigger]);
    });
  }

  // When click or hover elements, show the popovers
  function bindPopover() {
    $(document).on(config.events.created, function(event, popoverTrigger) {

      var trigger = $(popoverTrigger).attr('data-trigger') === 'hover' ? 'mouseover' : config.trigger;

      $(popoverTrigger).on(trigger, function() {
        $(this).trigger(config.events.clicked);
        show($(this).data('target'));
      });

    });
  }

  // Define position of popovers
  function setPosition() {
    $(document).on(config.events.targetSetted, function(event, popoverTrigger){

      // Get the informations to position the popovers
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

      // Communicate that all popovers was created.
      $(document).trigger(config.events.created, [popoverTrigger]);
    });
  }


  // Show called popover
  function show(target) {
    $(target).show();
  }

  // Hide all or visible popovers
  function hide(target) {
    $(target || config.popoverClass+':visible').hide();
  }

  // Destroy all created popovers
  function destroy() {
    $(config.popoverClass).remove();

    // Unbind all events.
    $.each(config.events, function(index, event) {
      $(document).unbind(event);
    });

  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
