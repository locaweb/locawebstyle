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
        $(element).on('click.ls', function() {
          groupCollapse($(this));
          // get target
          var target = $(this).data('target');
          toggle(target);
          console.log(target);
          console.log($(this));
          // set aria's attributes
          ariaCollapse($(this));

          eventsHandler($(this),target);
        });
        // if click on ck-collapse-body no action happens
        $(config.classes.content).on('click.ls', function(event) {
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
    $(target).slideToggle(function() {
      $(target).parent().toggleClass(config.classes.opened);
    });
  }

  function eventsHandler(el, target) {
    if($(el).hasClass(config.classes.opened)) {
      $.event.trigger('collapse:opened', [$(this), $(target)]);
    } else {
      $.event.trigger('collapse:closed', [$(this), $(target)]);
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
