var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    module    : '[data-ls-module="popover"]',
    idPopover : '#ls-popover-',
    popovers  : '.ls-popover',
    events: {
      ready  : 'popover:ready',
      clicked: 'popover:clicked',
    },
    init: {
      container : 'body',
      trigger   : 'click.ls.popover',
      uniqueId  : 0
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

    $(document).trigger(config.events.ready);
    bindPopover();
  }

  function buildPopover(index, el) {
    var elementData = {
      index : index,
      title    : $(el).data('title'),
      content  : $(el).data('content'),
      placement: $(el).data('placement')
    }

    setTarget(index, el);

    $(config.init.container).append(locastyle.templates.popover(elementData));
  }

  function setTarget(index, el) {
    $(el).attr('data-target', config.idPopover+index);
  }

  function bindPopover() {
    $(document).on(config.events.ready, function() {
      $(config.module).on('click', function() {
        $(this).trigger(config.events.clicked);
      });
    });
  }

  function setPosition(element) {
    $(config.module).on(config.events.clicked, function(event, target) {
      var element = event.target,
          target = $(element).data('target'),
          top = $(element).offset().top,
          left = $(element).offset().left
      showPopover(target);
    });
  }

  function showPopover(target) {
    hidePopover(target);
    $(target).show();
  }

  function hidePopover(target) {
    $(config.popovers+':visible' || target).hide();
  }

  return {
    init: init,
    show: showPopover,
    hide: hidePopover
  };

}());
