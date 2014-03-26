var locastyle = locastyle || {};
locastyle.collapse = (function() {
  'use strict';

  var config = {
    selectors: {
      container: '.ls-collapse',
      trigger: '.ls-collapse-title',
      content: '.ls-collapse-body',
      groupContainer: '.ls-collapse-group'
    },
    classes: {
      open: 'ls-collapse-open',
      alwaysOpen: 'ls-collapse-always-open'
    }

  };

  function init() {
    $(config.selectors.container).each(function(i, collapse){
      var $collapse = $(this);
      toggleCollapse($collapse);
    });

    toggleCollapseButton();
  }

  function toggleCollapseButton(){
    $('[data-toggle-collapse]').on('click', function (evt) {
      evt.preventDefault();
      evt.stopPropagation();
      var id = $(this).data('#toggle-collapse');
      console.log(id);
    });
  }

  function toggleCollapse($collapse){
    $(config.selectors.trigger, $collapse).on('click', function(evt){
      evt.preventDefault();
      // if( $collapse.hasClass(config.classes.alwaysOpen) ){
      //   return;
      // }
      var $group = $collapse.parents(config.selectors.groupContainer);
      if( $group[0] ){
        console.log('grupo');
        $group.find(config.selectors.container).not($collapse).removeClass(config.classes.open).find(config.selectors.content).slideUp();
      }
      $collapse.toggleClass(config.classes.open)//.find(config.selectors.content).slideToggle(300, 'linear');
    });
  }


  return {
    init:init
  };

}());
