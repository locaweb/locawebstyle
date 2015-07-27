var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    container    : 'body',
    module       : '[data-ls-module="popover"]',
    idPopover    : '#ls-popover-',
    popoverClass : '.ls-popover',
    events: {
      created: 'popover:ready',
      clicked: 'popover:clicked',
    }
  }

  function init() {
    checkExists();
    setPosition();
  }

  function checkExists() {
    $(config.module).each(function(index, el) {
      if(!$(config.idPopover+index).length) {
        buildPopover(index, el);
      }
    });
    $(document).trigger(config.events.created);
    bindPopover();
  }

  function buildPopover(index, el) {
    var elementData = {
      index        : index,
      title        : $(el).data('title'),
      content      : $(el).data('content'),
      placement    : $(el).data('placement'),
      customClasses: $(el).data('custom-class')
    }
    setTarget(index, el);
    $(config.container).append(locastyle.templates.popover(elementData));
  }

  function setTarget(index, el) {
    $(el).attr('data-target', config.idPopover+index);
  }

  function bindPopover() {
    $(document).on(config.events.created, function() {
      $(config.module).on('click', function() {
        $(this).trigger(config.events.clicked);
      });
    });
  }

  function setPosition(element) {
    $(config.module).on(config.events.clicked, function(event, target) {
      var element = event.target;
      var data = {
          target    : $(element).data('target'),
          top       : $(element).offset().top,
          left      : $(element).offset().left,
          width     : $(element).outerWidth(),
          height    : $(element).outerHeight(),
          placement : $(element).data('placement')
      }
      calcPosition(data);
      $(data.target).show();
    });
  }

  function calcPosition(data) {
    var style;
    switch (data.placement) {
      case 'top':
        style = {
          top : data.top  -=  12,
          left: data.left += (data.width/2 + 4)
        }
        break;
      case 'right':
        style = {
          top : data.top  += (data.height/2 -2),
          left: data.left += (data.width + 12)
        }
        break;
      case 'bottom':
        style = {
          top : data.top  += (data.height + 12),
          left: data.left += (data.width/2 + 4)
        }
        break;
      case 'left':
        style = {
          top : data.top  += (data.height/2 -2 ),
          left: data.left -= 12
        }
    }
    return $(data.target).css(style);
  }

  function show(target) {
    $('[data-target="' + target + '"]').trigger(config.events.clicked);
  }

  function hide(target) {
    $(target || config.popoverClass+':visible').hide();
  }

  function destroy() {
    $(config.popoverClass).remove();
  }

  return {
    init   : init,
    show   : show,
    hide   : hide,
    destroy: destroy
  };

}());
