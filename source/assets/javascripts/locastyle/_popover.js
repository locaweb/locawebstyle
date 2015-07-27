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
      created: 'popover:ready',
      clicked: 'popover:clicked',
    }
  }

  function init() {
    checkExists();
    bindPopover();
  }

  function checkExists() {
    $(config.module).each(function(index, el) {
      if(!$(config.idPopover+index).length) {
        buildPopover(index, el);
      }
    });
    $(document).trigger(config.events.created);
  }

  function buildPopover(index, el) {
    var data = {
      index        : index,
      title        : $(el).data('title'),
      content      : $(el).data('content'),
      placement    : $(el).data('placement'),
      customClasses: $(el).data('custom-class')
    }
    setTarget(index, el);
    $(config.container).append(locastyle.templates.popover(data));
    setPosition(index, el);
  }

  // Define position of popover
  function setPosition(index, el) {
    var data = {
        target    : $(el).data('target'),
        top       : $(el).offset().top,
        left      : $(el).offset().left,
        width     : $(el).outerWidth(),
        height    : $(el).outerHeight(),
        placement : $(el).data('placement')
    }
    calcPosition(data);
  }

  // Calc the position of popover called
  function calcPosition(data) {
    var style;
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

  function bindPopover() {
    $(document).on(config.events.created, function() {

      // if ( !$(config.module).attr('data-trigger', 'hover').length ){
      //   console.log('true')
      // }
      //
      // var trigger = $(config.module).data('trigger') === 'hover' ? 'mouseover' : config.trigger;

      $(config.module).on('click', function() {
        $(this).trigger(config.events.clicked);
        show($(this).data('target'));
      });
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
  }

  // Define popover target that will be called
  function setTarget(index, el) {
    $(el).attr('data-target', config.idPopover+index);
  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
