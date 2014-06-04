// @todo: prevent-open
// @todo: hash init
// @todo: hash change
// @todo: toggle hover ?

var locastyle = locastyle || {};
locastyle.collapse = (function() {
  'use strict';

  var config = {
    selectors: {
      container: '[data-ls-module="collapse"]', // .ls-collapse
      trigger: '.ls-collapse-header',
      content: '.ls-collapse-body',
      groupContainer: '.ls-collapse-group'
    },
    classes: {
      open: 'ls-collapse-open',
      alwaysOpen: 'ls-collapse-open-always'
    }
  };

  function init() {
    $(config.selectors.container).each(function(i, collapse) {
      var $collapse = $(this);
      bindHeader($collapse);
    });
    bindButton();
  }

  function bindButton() {
    // unbind
    $('[data-toggle-collapse]').off('click.ls'); // <- unbind
    $('[data-toggle-collapse]').on('click.ls', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var id = $(this).data('toggle-collapse');
      toggle($(id));
    });
  }

  function bindHeader($collapse) {
    if (!$collapse.hasClass(config.classes.alwaysOpen)) {
      $(config.selectors.trigger, $collapse).off('click.ls'); // <- unbind
      $(config.selectors.trigger, $collapse).on('click.ls', function(evt) {
        evt.preventDefault();
        toggle($collapse);
      });
    }
  }

  function toggle($collapse) {
    $collapse = $collapse instanceof $ ? $collapse : $($collapse);
    var $group = $collapse.parents(config.selectors.groupContainer);
    if ($group[0]) {
      $group.find(config.selectors.container).not($collapse).removeClass(config.classes.open).find(config.selectors.content).slideUp();
    }
    $collapse.toggleClass(config.classes.open);
    // $collapse.find(config.selectors.content).slideToggle(300, 'linear', function(){
    //   $collapse.toggleClass(config.classes.open);
    // });
    return $collapse;
  }

  return {
    init: init,
    toggle: toggle
  };

}());
