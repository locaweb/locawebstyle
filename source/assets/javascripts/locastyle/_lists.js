var locastyle = locastyle || {};

locastyle.lists = (function() {
  'use strict';

  var config = {
    selectors: {
      list: '.ls-list'
    },
    isXsmall : window.innerWidth <= 767
  }

  function init (dom_scope){
    var $lists = $( config.selectors.list, dom_scope);
    $lists.each(function(il, list){
      var $list = $(list);
      itemActions($list);
    });
  }

  function itemActions ($list) {
    if( locastyle.lists.config.isXsmall ){
      var config = {
        label: 'Ações',
        addClass: 'pull-right',
        actions: []
      };
      $('.ls-list-actions a, .ls-list-actions button', $list).not('.dropdown-toggle').each(function(ia, action){
        var $action = $(action);
        var hasDanger = $action.hasClass('color-danger');
        config.actions.push( {label: $action.text(), link: $action.attr('href'), classes: ( hasDanger ? 'color-danger' : ''), hasDivider: hasDanger } )
      });
      $('.ls-list-actions', $list).html( locastyle.templates.button_dropdown_single(config) );
    }
  }

  return {
    init: init,
    config: config
  };

}());
