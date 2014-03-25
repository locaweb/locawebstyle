var locastyle = locastyle || {};

locastyle.templates = (function() {
  'use strict';

  var templatesPath = 'locastyle/templates/_';

  function init(){
  }

  function popover(target, title, content, placement){
    $(target).append( JST[templatesPath + 'popover']({title: title, content: content, placement: placement}) );
  }

  return {
    init: init,
    popover: popover
  }

}());
