var locastyle = locastyle || {};

locastyle.popover = (function() {
  'use strict';

  var config = {
    module: '[data-ls-module="popover"]',
    init: {
      $container    : $(document),
      idPopover    : '#ls-popover-',
      trigger      : 'click.ls.popover',
      popoverClass : 'ls-popover',
      activeClass  : 'ls-active',
      uniqueId     : 0
    }
  }

  function init() {
    checkExists();
  }

  function checkExists() {
    $(config.module).each(function(index, el) {

      if(!$(config.init.idPopover+index).length) {
        buildPopover(index, el);
      }

    });
  }

  function buildPopover(index, el) {
    var elementData = {
      index : index,
      title    : $(el).data('title'),
      content  : $(el).data('content'),
      placement: $(el).data('placement')
    }

    $(el).after(locastyle.templates.popover(elementData));
  }



  return {
    init: init
  };

}());
