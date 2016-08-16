var locastyle = locastyle || {};
locastyle.collapse = (function() {
  'use strict';

  // general config
  var config = {
    trigger: '[data-ls-module="collapse"]',
    classes: {
      header: '.ls-collapse-header',
      content: '.ls-collapse-body',
      groupContainer: '.ls-collapse-group',
      open: 'ls-collapse-open',
      close: 'ls-collapse-close',
      opened: 'ls-collapse-opened',
      alwaysOpened: 'ls-collapse-opened-always'
    }
  };

  function init() {
    // set attributes from all collapses on load
    $(config.trigger).each(function() {
      ariaCollapse($(this));
    });
    bind();
  }

  function bind() {
    $(config.trigger).each(function(index, element) {
      if (!$(element).hasClass(config.classes.alwaysOpened)) {
        $(element).find(config.classes.header).on('click.ls', function() {
          groupCollapse($(element));
          // get target
          var target = $(element).data('target');
          // set event
          eventsHandler($(element));
          // set aria's attributes
          ariaCollapse($(element));
        });
      }
    });
  }

  // if have collapses in group "accordeon"
  function groupCollapse(collapse) {
    var $group = collapse.parents(config.classes.groupContainer);
    if ($group[0]) {
      $group.find(config.trigger).not(collapse).removeClass(config.classes.opened).find(config.classes.content).slideUp();
    }
  }

  function eventsHandler(el) {
    if (el.hasClass(config.classes.opened)) {
      el.removeClass(config.classes.opened);
      el.trigger('collapse:closed');
    } else {
      el.addClass(config.classes.opened);
      el.trigger('collapse:opened');
    }
  }


  function ariaCollapse(elem) {
    if ($(elem).hasClass(config.classes.opened)) {
      $(elem).find(config.classes.header).attr({ 'aria-expanded': true });
      $(elem).find(config.classes.content).attr({ 'aria-hidden': false });
    } else {
      $(elem).find(config.classes.header).attr({ 'aria-expanded': false });
      $(elem).find(config.classes.content).attr({ 'aria-hidden': true });
    }
  }

  return {
    init: init
  };
}());
