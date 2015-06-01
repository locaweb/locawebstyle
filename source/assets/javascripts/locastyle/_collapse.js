var locastyle = locastyle || {};
locastyle.collapse = (function() {
  'use strict';

  // general config
  var config = {
    trigger: '[data-ls-module="collapse"]',
    classes: {
      header        : '.ls-collapse-header',
      content       : '.ls-collapse-body',
      groupContainer: '.ls-collapse-group',
      open          : 'ls-collapse-open',
      close         : 'ls-collapse-close',
      opened        : 'ls-collapse-opened',
      alwaysOpened  : 'ls-collapse-opened-always'
    }, dispatcherOpen: {
      open  : 'ls-collapse-open',
      opened: 'ls-collapse-opened'
    }, dispatcherClose: {
      close : 'ls-collapse-close',
      closed: 'ls-collapse-closed'
    }
  };

  function init() {
    // set attributes from all collapses on load
    $(config.classes.header).each(function() {
      ariaCollapse($(this));
    });
    bind();
  }

  function bind() {
    $(config.trigger).each(function(index, element) {
      if (!$(element).hasClass(config.classes.alwaysOpened)) {
        $(element).on('click.ck', function() {
          groupCollapse($(this));
          // get target
          var target = $(this).data('target');
          toggle(target);
          // set aria's attributes
          ariaCollapse($(this));
        });
        // if click on ck-collapse-body no action happens
        $(config.classes.content).on('click.ck', function(event) {
          event.stopPropagation();
        });
      }
    });
  }

  // if have collapses in group "accordeon"
  function groupCollapse($collapse) {
    var $group = $($collapse).parents(config.classes.groupContainer);
    if ($group[0]) {
      $group.find(config.trigger).not($($collapse)).removeClass(config.classes.opened).find(config.classes.content).slideUp();
    }
  }

  function toggle(target) {
    checkVisible(target, config.dispatcherClose.close, config.dispatcherOpen.open);
    $(target).slideToggle(function() {
      $(target).parent().toggleClass(config.classes.opened);
      checkVisible(target, config.dispatcherOpen.opened, config.dispatcherClose.closed);
    });
  }

  // Set dispatchet according state
  function checkVisible(target, dispatcher1, dispatcher2) {
    if($(target).is(':visible')) {
      locastyle.eventDispatcher.trigger(dispatcher1);
    }else{
      locastyle.eventDispatcher.trigger(dispatcher2);
    }
  }

  function ariaCollapse(elem) {
    if($(elem).hasClass('ls-collapse-open')){
      $(config.classes.header).attr({ 'aria-expanded' : true });
      $(config.classes.content).attr({ 'aria-hidden' : false });
    }else{
      $(config.classes.header).attr({ 'aria-expanded' : false });
      $(config.classes.content).attr({ 'aria-hidden' : true });
    }
  }

  return {
    init: init,
    toggle: toggle
  };

}());
