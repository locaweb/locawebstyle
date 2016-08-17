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
    },
    event: {
      click: 'click.ls'
    }
  };

  function init() {
    $(config.trigger).each(function() {
      ariaCollapse($(this));
    });
    bind();
  }

  // bind the collapse event
  function bind() {
    $(config.trigger).each(function(index, element) {
      var collapse = $(element);

      if (!collapse.hasClass(config.classes.alwaysOpened)) {
        collapse.find(config.classes.header).on(config.event.click, function(e) {
          e.preventDefault();
          groupCollapse(collapse);
          eventsHandler(collapse);
          ariaCollapse(collapse);
        });
      }

      // trigger collapse event from another element
      if (collapse.find(config.classes.header).length === 0) {
        collapse.off(config.event.click);
        collapse.on(config.event.click, function(e) {
          e.preventDefault();
          toggle($(element).data('target'));
        });
      }
    });
  }

  // if have collapses in group "accordeon"
  function groupCollapse(collapse) {
    var $group = collapse.parents(config.classes.groupContainer);
    if ($group[0]) {
      $group.find(config.trigger).not(collapse).removeClass(config.classes.opened);
    }
  }

  // triggers events and change the collapse behavior
  function eventsHandler(el) {
    if (el.hasClass(config.classes.opened)) {
      el.removeClass(config.classes.opened);
      el.trigger('collapse:closed');
    } else {
      el.addClass(config.classes.opened);
      el.trigger('collapse:opened');
    }
  }

  // set aria's attributes
  function ariaCollapse(elem) {
    if ($(elem).hasClass(config.classes.opened)) {
      $(elem).find(config.classes.header).attr({ 'aria-expanded': true });
      $(elem).find(config.classes.content).attr({ 'aria-hidden': false });
    } else {
      $(elem).find(config.classes.header).attr({ 'aria-expanded': false });
      $(elem).find(config.classes.content).attr({ 'aria-hidden': true });
    }
  }

  // toggle collapse behavior
  function toggle(elem) {
    $(elem).prev(config.classes.header).trigger(config.event.click);
  }

  return {
    init: init,
    toggle: toggle
  };
}());
