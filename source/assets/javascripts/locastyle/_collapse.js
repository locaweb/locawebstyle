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
    plugin();
    $(config.selectors.container).each(function(i, collapse) {
      var $collapse = $(this);
      bindHeader($collapse);
    });
    bindButton();
  }

  function plugin(){
    $.fn.lsCollapse = function(action) {
      if(action === 'toggle'){
        toggle(this);
      }
      if(action === 'open'){
        toggle(this, true);
      }
      if(action === 'close'){
        toggle(this, false);
      }
      if(action === 'destroy'){
        destroy(this);
      }
    };
  }

  function destroy($collapse){
    var $input = $(config.selectors.trigger, $collapse).find('input[type="radio"], input[type="checkbox"]');
    if($input[0]){
      $input.off('change.ls');
    }else{
      $(config.selectors.trigger, $collapse).off('click.ls');
    }
  }

  function bindButton() {
    $('[data-toggle-collapse]').off('click.ls').on('click.ls', function(evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var id = $(this).data('toggle-collapse');
      toggle($(id));
    });
  }

  function bindHeader($collapse) {
    if (!$collapse.hasClass(config.classes.alwaysOpen)) {
      // has input
      var $input = $(config.selectors.trigger, $collapse).find('input[type="radio"], input[type="checkbox"]');
      if($input[0]){
        $input.on('change.ls', function (evt) {
          var name = $(this).attr('name')
          $('[name="' + name + '"]').each(function (index, input) {
            var $input = $(input);
            var $collapse = $input.parents(config.selectors.container)
            $collapse.toggleClass(config.classes.open, $input.is(':checked'));
          });
        }).trigger('change.ls');
      } else {
        $(config.selectors.trigger, $collapse).off('click.ls').on('click.ls', function(evt) {
          evt.preventDefault();
          toggle($collapse);
        });
      }
    }
  }

  function toggle($collapse, open) {
    $collapse = $collapse instanceof $ ? $collapse : $($collapse);
    var $group = $collapse.parents(config.selectors.groupContainer);
    if ($group[0]) {
      $group.find(config.selectors.container).not($collapse).removeClass(config.classes.open).find(config.selectors.content).slideUp();
    }
    if(open !== undefined){
      $collapse.toggleClass(config.classes.open, open);
    } else{
      $collapse.toggleClass(config.classes.open);
    }
    return $collapse;
  }

  return {
    init: init,
    toggle: toggle
  };

}());
